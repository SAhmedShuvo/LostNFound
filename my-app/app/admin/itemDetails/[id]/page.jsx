"use client";

import {
  ArrowLeft,
  Package,
  User,
  Calendar,
  MapPin,
  Tag,
  Info,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:5000";

const ItemDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`${BASE_URL}/item/details/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to load item");
        const data = await res.json();
        setItem(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading item profile...</p>
        </div>
      </div>
    );

  if (!item)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-gray-600">Item not found</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-indigo-600 hover:underline flex items-center"
        >
          <ArrowLeft size={16} className="mr-1" /> Return to list
        </button>
      </div>
    );

  const photos = item.photos || [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="group flex items-center text-slate-600 hover:text-indigo-600 transition-colors font-medium"
          >
            <ArrowLeft
              size={20}
              className="mr-2 group-hover:-translate-x-1 transition-transform"
            />
            Back to Inventory
          </button>

          <div className="flex items-center gap-4">
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border ${
                item.status === "pending"
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : item.status === "approved"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-rose-50 text-rose-700 border-rose-200"
              }`}
            >
              • {item.status}
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-6 mt-6">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT: Image Gallery & Description (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Visuals Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <Package size={20} className="text-indigo-600" />
                  Item Visuals
                </div>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-tighter">
                  {photos.length} Total Image{photos.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="p-6">
                {photos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {photos.map((img, i) => {
                      const src = img.startsWith("http")
                        ? img
                        : `${BASE_URL}${img.startsWith("/") ? "" : "/"}${img}`;
                      return (
                        <div
                          key={i}
                          className={`relative overflow-hidden rounded-2xl border border-slate-100 group ${i === 0 && photos.length % 2 !== 0 ? "md:col-span-2" : ""}`}
                        >
                          <img
                            src={src}
                            alt={`View ${i + 1}`}
                            className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="h-64 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200 text-slate-400">
                    <Package size={48} className="mb-2 opacity-20" />
                    <p>No images available for this item</p>
                  </div>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center gap-2 mb-6 text-slate-400 font-bold text-xs uppercase tracking-widest">
                <Info size={14} />
                General Information
              </div>

              <h1 className="text-3xl font-black text-slate-900 mb-2">
                {item.itemName}
              </h1>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                  <Tag size={14} className="mr-1.5 text-indigo-500" />{" "}
                  {item.category}
                </div>
                <div className="flex items-center text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                  <MapPin size={14} className="mr-1.5 text-indigo-500" />{" "}
                  {item.location}
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <h3 className="text-sm font-bold text-slate-800 uppercase mb-3">
                  Item Description
                </h3>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100 italic">
                  {item.description || "No description provided for this item."}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Metadata Sidebar (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Poster Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800">Origin Account</h3>
                <User size={18} className="text-slate-300" />
              </div>

              <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-indigo-200">
                  {item.postedBy?.name?.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-slate-900 truncate">
                    {item.postedBy?.name}
                  </p>
                  <p className="text-xs text-indigo-600 font-medium truncate">
                    {item.postedBy?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* System Details */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl shadow-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
                System Records
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">
                      Record Created
                    </p>
                    <p className="text-sm text-slate-200 font-medium">
                      {new Date(
                        item.createdAt || Date.now(),
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                    <Tag size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">
                      Entry Type
                    </p>
                    <p className="text-sm text-slate-200 font-medium capitalize">
                      {item.type || "Standard Entry"}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 mt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                      Verified Status
                    </span>
                    {item.isVerified ? (
                      <span className="text-xs font-black text-emerald-400">
                        VERIFIED
                      </span>
                    ) : (
                      <span className="text-xs font-black text-slate-500">
                        UNVERIFIED
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
              <p className="text-[11px] leading-relaxed text-blue-600 font-medium">
                This page is in{" "}
                <span className="font-bold uppercase underline">ReadOnly</span>{" "}
                mode. System administrators can view full audit history in the
                main console logs.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ItemDetailsPage;
