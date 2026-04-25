"use client";
import { useState } from "react";
import {
  MinusCircle,
  Tag,
  MapPin,
  Calendar,
  ScrollText,
  CheckCircle,
  Upload,
  AlertCircle,
  ArrowRight,
  Phone, // Added Phone icon
} from "lucide-react";
import AdminRestricted from "@/app/components/NotForAdmin";

const InputField = ({
  icon: Icon,
  label,
  name,
  type = "text",
  required = true,
  placeholder,
  children,
  className = "",
  value,
  onChange,
  disabled,
}) => (
  <div className={`space-y-2 ${className}`}>
    <label
      htmlFor={name}
      className="block text-xs font-black uppercase tracking-widest text-slate-400 ml-1"
    >
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
        <Icon size={20} />
      </div>
      {children || (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 font-medium text-slate-700 placeholder:text-slate-300 shadow-sm"
        />
      )}
    </div>
  </div>
);

export default function ReportLostItemForm() {
  const initialFormState = {
    name: "",
    category: "",
    location: "",
    phoneNumber: "", // 1. Added to state
    description: "",
    date: new Date().toISOString().split("T")[0],
    imageFile: null,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const categories = [
    "Electronics",
    "Wallet",
    "Keys",
    "Textbook",
    "Clothing",
    "Jewelry",
    "Bags/Backpacks",
    "Documents",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile" && files?.length > 0) {
      setFormData((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMessage({ type: "error", text: "Please login first." });
        setIsSubmitting(false);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("itemName", formData.name);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("phoneNumber", formData.phoneNumber); // 2. Added to submission
      formDataToSend.append("description", formData.description);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("status", "Lost");

      if (formData.imageFile) {
        formDataToSend.append("photos", formData.imageFile);
      }

      const res = await fetch("http://localhost:5000/report/lostItem", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");

      setMessage({ type: "success", text: "Report submitted successfully!" });
      setFormData(initialFormState);
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Submission failed." });
    } finally {
      setIsSubmitting(false);
    }
  };

  let role = null;
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("user"));
    role = user?.role;
  }

  if (role == "admin") {
    return <AdminRestricted />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-6 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        {/* Header Branding */}
        <div className="bg-slate-900 p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <MinusCircle size={120} />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 text-rose-300 rounded-full mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest">
                Lost Property Report
              </span>
            </div>
            <h1 className="text-4xl font-black tracking-tight">
              Report a Missing Item
            </h1>
            <p className="text-slate-400 mt-2 font-medium">
              Help our community by providing accurate details about what you've
              lost.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputField
              icon={Tag}
              label="Item Name"
              name="name"
              placeholder="e.g., Black Leather Wallet"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
            />

            <InputField icon={Tag} label="Category" name="category">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700 appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </InputField>

            <InputField
              icon={MapPin}
              label="Last Known Location"
              name="location"
              placeholder="e.g., Library 3rd Floor"
              value={formData.location}
              onChange={handleChange}
              disabled={isSubmitting}
            />

            <InputField
              icon={Phone}
              label="Your Phone Number"
              name="phoneNumber"
              type="tel"
              placeholder="e.g., +1 (555) 000-0000"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={isSubmitting}
            />

            <InputField
              icon={Calendar}
              label="Date Lost"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              disabled={isSubmitting}
              className="md:col-span-2" // Set to col-span-2 to keep the grid looking balanced
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Detailed Description <span className="text-rose-500">*</span>
            </label>
            <div className="relative group">
              <ScrollText
                className="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
                size={20}
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                disabled={isSubmitting}
                placeholder="Include colors, brand names, or unique marks..."
                className="w-full bg-slate-50 border border-slate-100 rounded-[1.5rem] p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700 placeholder:text-slate-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Visual Reference (Optional)
            </label>
            <div className="relative border-2 border-dashed border-slate-200 p-8 rounded-[1.5rem] flex flex-col items-center justify-center bg-slate-50 group hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors mb-3">
                <Upload size={24} />
              </div>
              <p className="text-sm font-bold text-slate-600">
                {formData.imageFile
                  ? formData.imageFile.name
                  : "Click or drag to upload photo"}
              </p>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</p>
              <input
                name="imageFile"
                type="file"
                accept="image/*"
                onChange={handleChange}
                disabled={isSubmitting}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {message && (
            <div
              className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
                message.type === "error"
                  ? "bg-rose-50 text-rose-600 border border-rose-100"
                  : "bg-emerald-50 text-emerald-600 border border-emerald-100"
              }`}
            >
              {message.type === "error" ? (
                <AlertCircle size={20} />
              ) : (
                <CheckCircle size={20} />
              )}
              <p className="font-bold text-sm">{message.text}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full h-14 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-100 active:scale-95
              ${isSubmitting ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-slate-900"}`}
          >
            {isSubmitting ? "Processing..." : "Submit Report"}
            {!isSubmitting && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
}
