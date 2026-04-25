"use client";

import React, { use, useState, useEffect } from "react";
import {
  Upload,
  X,
  MapPin,
  Tag,
  Calendar,
  CheckCircle,
  AlertCircle,
  FileText,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const ClaimItemPage = ({ params }) => {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);

  // States for form and submission
  const [claimText, setClaimText] = useState("");
  const [proofImages, setProofImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`http://localhost:5000/item/details/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const newData = await res.json();
        setItem(newData.data || newData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchItem();
  }, [id]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + proofImages.length > 3) {
      alert("Maximum 3 images allowed");
      return;
    }
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setProofImages([...proofImages, ...imageFiles]);
    e.target.value = null;
  };

  const removeImage = (index) => {
    setProofImages(proofImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!claimText.trim()) return;

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("claimText", claimText);
      proofImages.forEach((img) => formData.append("proofImages", img));

      const res = await fetch(`http://localhost:5000/report/claimItem/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Claim failed");
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-indigo-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!item)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center p-12 bg-white rounded-3xl shadow-xl max-w-md border border-gray-100">
          <AlertCircle className="w-20 h-20 text-rose-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Item Not Found
          </h2>
          <Link
            href="/items"
            className="text-indigo-800 font-bold hover:underline"
          >
            Back to Catalog
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Claiming: {item.itemName}
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN - Item Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
              <div className="h-80 md:h-96 bg-slate-100">
                <img
                  src={
                    item.photos?.[0] ||
                    "https://placehold.co/800x600/4F46E5/FFFFFF?text=Item"
                  }
                  alt={item.itemName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-indigo-800" />
                Found Item Details
              </h3>
              <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 text-slate-600 leading-relaxed">
                {item.description}
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <InfoCard icon={Tag} label="Category" value={item.category} />
                <InfoCard
                  icon={MapPin}
                  label="Location"
                  value={item.location}
                />
                <InfoCard icon={Calendar} label="Date" value={item.date} />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Form or Simple Text */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8 sticky top-8 min-h-[400px] flex flex-col justify-center">
              {isSubmitted ? (
                /* SUCCESS TEXT VIEW */
                <div className="text-center animate-in fade-in duration-500">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                    Claim Submitted
                  </h2>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    Success! We have received your ownership proof for this
                    item. Our administration team will review your submission
                    and contact you shortly with an update.
                  </p>
                </div>
              ) : (
                /* FORM VIEW */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-2xl font-black text-slate-900 mb-2">
                    Prove Ownership
                  </h2>
                  <p className="text-sm text-slate-500 mb-6 font-medium">
                    Please provide specific details to verify ownership.
                  </p>

                  <div>
                    <label
                      htmlFor="claimText"
                      className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3"
                    >
                      Proof Description <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="claimText"
                      rows={5}
                      value={claimText}
                      onChange={(e) => setClaimText(e.target.value)}
                      className="w-full border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-indigo-800 focus:ring-4 focus:ring-indigo-50 transition-all resize-none shadow-sm"
                      placeholder="Serial numbers, content descriptions, identifying marks..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                      Photos ({proofImages.length}/3)
                    </label>
                    <div className="relative group">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                        disabled={proofImages.length >= 3}
                      />
                      <div
                        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${proofImages.length >= 3 ? "border-slate-100 bg-slate-50" : "border-slate-200 bg-white group-hover:border-indigo-400"}`}
                      >
                        <Upload
                          className={`w-6 h-6 mx-auto mb-2 ${proofImages.length >= 3 ? "text-slate-300" : "text-indigo-600"}`}
                        />
                        <p className="text-[10px] font-black text-slate-400 uppercase">
                          Upload proof
                        </p>
                      </div>
                    </div>

                    {proofImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {proofImages.map((file, idx) => (
                          <div
                            key={idx}
                            className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group"
                          >
                            <img
                              src={URL.createObjectURL(file)}
                              alt="Proof"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute top-1 right-1 bg-rose-500 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !claimText.trim()}
                    className="w-full bg-indigo-800 text-white py-4 rounded-2xl font-black text-sm hover:bg-indigo-900 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <CheckCircle size={18} />
                    )}
                    {isSubmitting ? "Submitting..." : "Submit Claim"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
      <div className="flex items-center gap-2 mb-1">
        <Icon size={14} className="text-indigo-600" />
        <p className="text-[10px] font-black uppercase tracking-tighter text-slate-400">
          {label}
        </p>
      </div>
      <p className="text-sm font-bold text-slate-800 truncate">{value}</p>
    </div>
  );
}

export default ClaimItemPage;
