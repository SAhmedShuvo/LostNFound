"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Calendar,
  User,
  Info,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import AdminRestricted from "../components/NotForAdmin";

const BASE_URL = "http://localhost:5000";

const MyClaims = () => {
  const [myClaims, setMyClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyClaims = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`${BASE_URL}/user/myClaims`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch claims");
        const data = await res.json();
        setMyClaims(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyClaims();
  }, []);

  // Updated Delete Function with API call
  const deleteClaim = async (id) => {
    if (!window.confirm("Are you sure you want to remove this claim request?"))
      return;

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}/user/deleteClaim/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        // Optimistically update UI
        setMyClaims((prev) => prev.filter((claim) => claim._id !== id));
      } else {
        alert("Failed to delete the claim. Please try again.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("An error occurred while deleting.");
    }
  };

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return {
          icon: CheckCircle2,
          color: "text-emerald-600",
          bg: "bg-emerald-50",
          border: "border-emerald-100",
        };
      case "rejected":
        return {
          icon: XCircle,
          color: "text-rose-600",
          bg: "bg-rose-50",
          border: "border-rose-100",
        };
      default:
        return {
          icon: Clock,
          color: "text-amber-600",
          bg: "bg-amber-50",
          border: "border-amber-100",
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">
          Retrieving your claims...
        </p>
      </div>
    );
  }
  let role = null;
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("user"));
    role = user?.role;
  }

  if (role == "admin") {
    return <AdminRestricted />;
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            My Claims
          </h1>
          <p className="text-slate-500 mt-1">
            Track the status of items you've identified as yours.
          </p>
        </header>

        <div className="space-y-6">
          {myClaims.map((claim) => {
            const status = getStatusConfig(claim.status);
            const StatusIcon = status.icon;
            const isApproved = claim.status?.toLowerCase() === "approved";

            return (
              <div
                key={claim._id}
                className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Status Bar on Top */}
                <div
                  className={`h-1.5 w-full ${status.bg.replace("50", "500")} opacity-60`}
                />

                <div className="flex flex-col md:flex-row">
                  {/* LEFT: ITEM DETAILS */}
                  <div className="w-full md:w-1/3 p-5 border-r border-slate-50">
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 shadow-inner bg-slate-100 border border-slate-100">
                      <img
                        src={
                          claim.itemId?.photos?.[0] ||
                          "https://placehold.co/400x300/e2e8f0/64748b?text=No+Item+Photo"
                        }
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                        alt="item"
                      />
                      <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur text-[10px] font-bold rounded-lg shadow-sm border border-slate-100">
                        ORIGINAL POST
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-800 truncate text-lg">
                      {claim.itemId?.itemName || "Unknown Item"}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {claim.itemId?.description}
                    </p>
                  </div>

                  {/* RIGHT: CLAIM DETAILS */}
                  <div className="w-full md:w-2/3 p-6 flex flex-col justify-between bg-gradient-to-br from-white to-slate-50/30">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${status.bg} ${status.border} ${status.color}`}
                        >
                          <StatusIcon className="w-4 h-4" />
                          <span className="text-[11px] font-black uppercase tracking-widest">
                            {claim.status}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          {/* CONDITIONAL DELETE BUTTON - Only if NOT approved */}
                          {!isApproved && (
                            <button
                              onClick={() => deleteClaim(claim._id)}
                              className="p-2.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all border border-transparent hover:border-rose-100"
                              title="Delete Claim"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}

                          <Link href={`/item/${claim.itemId?._id}`}>
                            <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all border border-transparent hover:border-indigo-100">
                              <ExternalLink className="w-5 h-5" />
                            </button>
                          </Link>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-2 tracking-widest">
                            <Info className="w-3 h-3 text-indigo-400" /> Your
                            Submitted Proof
                          </h4>
                          <p className="text-sm text-slate-700 leading-relaxed italic font-medium">
                            "{claim.proofDescription}"
                          </p>
                        </div>

                        {/* Proof Photos */}
                        {claim.photos?.length > 0 && (
                          <div className="flex gap-3 mt-2">
                            {claim.photos.map((url, i) => (
                              <div key={i} className="relative group/photo">
                                <img
                                  src={url}
                                  className="w-20 h-20 rounded-xl object-cover border-2 border-white shadow-md transition-transform hover:scale-110"
                                  alt="Proof Attachment"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Meta Info */}
                    <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                            Posted By
                          </p>
                          <p className="text-xs font-bold text-slate-700 truncate">
                            {claim.postedBy?.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                            Submitted On
                          </p>
                          <p className="text-xs font-bold text-slate-700">
                            {new Date(claim.createdAt).toLocaleDateString(
                              "en-GB",
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {myClaims.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info className="text-slate-300 w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">No claims yet</h2>
            <p className="text-slate-500">Items you claim will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyClaims;
