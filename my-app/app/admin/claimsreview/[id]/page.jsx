"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  ArrowLeft,
  Package,
  User,
  FileText,
  Image as ImageIcon,
  Loader2,
  ShieldCheck,
} from "lucide-react";

const BASE_URL = "http://localhost:5000";

const ClaimDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // Tracks which specific button is loading
  const [actionResult, setActionResult] = useState("");

  // ================= FETCH CLAIM =================
  useEffect(() => {
    if (!id) return;

    const fetchClaim = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`${BASE_URL}/admin/claim/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to load claim");
        const data = await res.json();
        setClaim(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClaim();
  }, [id]);

  // ================= ACTION HANDLER =================
  const handleAction = async (endpoint, statusText) => {
    setActionLoading(true);
    setPendingAction(statusText); // Set the specific action being performed
    setActionResult("");
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}/admin/${endpoint}/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Action failed");

      setClaim((prev) => ({ ...prev, status: statusText.toLowerCase() }));
      setActionResult(`Claim ${statusText} successfully`);
    } catch (err) {
      console.error(err);
      setActionResult("Failed to process action");
    } finally {
      setActionLoading(false);
      setPendingAction(null);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 animate-pulse font-medium">
        Retrieving claim details...
      </div>
    );

  if (!claim)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-gray-600">Claim not found</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-blue-600 hover:underline flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Go back
        </button>
      </div>
    );

  const { itemId: item, claimedBy: claimant, postedBy: poster } = claim;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 transition font-medium"
          >
            <ArrowLeft size={20} className="mr-2" /> Back to Claims
          </button>
          <div className="flex gap-3">
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border ${
                claim.status === "pending"
                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                  : claim.status === "approved"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
              }`}
            >
              Status: {claim.status}
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto p-6 mt-4">
        <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">
          Review Claim Request
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Item Information */}
            <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center mb-6 text-blue-600 font-bold">
                <Package size={22} className="mr-2" />
                <h2 className="text-lg">Item Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {item?.photos?.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Item Gallery
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {item.photos.map((img, i) => (
                        <img
                          key={i}
                          src={`${img}`}
                          alt="Item"
                          className="aspect-square w-full object-cover rounded-2xl border bg-gray-50"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Item Name
                    </label>
                    <p className="text-gray-900 font-bold text-xl">
                      {item.itemName}
                    </p>
                  </div>
                  <div className="flex gap-8">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Category
                      </label>
                      <p className="text-gray-700 font-medium">
                        {item.category}
                      </p>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Location
                      </label>
                      <p className="text-gray-700 font-medium">
                        {item.location}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Finder's Description
                    </label>
                    <p className="text-gray-600 text-sm leading-relaxed italic border-l-4 border-gray-100 pl-4">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Proof Section */}
            <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center mb-6 text-purple-600 font-bold">
                <FileText size={22} className="mr-2" />
                <h2 className="text-lg">Claimant's Proof</h2>
              </div>
              <div className="bg-purple-50 text-purple-900 p-6 rounded-2xl mb-8 font-medium border border-purple-100">
                "{claim.proofDescription}"
              </div>

              {claim.photos?.length > 0 && (
                <div>
                  <div className="flex items-center mb-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                    <ImageIcon size={14} className="mr-2" /> Proof Attachments
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-4">
                    {claim.photos.map((img, i) => {
                      const proofSrc =
                        typeof img === "string" && img.startsWith("http")
                          ? img
                          : `${BASE_URL}${String(img).startsWith("/") ? "" : "/uploads/"}${img}`;
                      return (
                        <img
                          key={i}
                          src={proofSrc}
                          alt="Proof"
                          className="h-40 w-60 shrink-0 object-cover rounded-2xl border shadow-sm hover:scale-[1.02] transition-transform"
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </section>
          </div>

          <div className="space-y-6">
            {/* Claimant Info */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center">
                <User size={14} className="mr-2 text-green-600" /> Claimant
                Identity
              </h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center font-black text-xl">
                    {claimant?.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-gray-900">{claimant?.name}</p>
                    <p className="text-xs text-gray-500 font-medium">
                      {claimant?.email}
                    </p>
                  </div>
                </div>
                <div className="pt-5 border-t border-gray-50">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                    Item Posted By
                  </p>
                  <p className="text-sm font-bold text-gray-700">
                    {poster?.name}
                  </p>
                  <p className="text-xs text-gray-500">{poster?.email}</p>
                </div>
              </div>
            </div>

            {/* Action Card - UPDATED TO LIGHT THEME AND SELECTIVE LOADING */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">
                Administrative Decision
              </h3>

              {claim.status === "pending" ? (
                <div className="grid gap-3">
                  <button
                    onClick={() => handleAction("approveClaim", "approved")}
                    disabled={actionLoading}
                    className="w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-black py-4 rounded-2xl transition-all shadow-sm active:scale-95"
                  >
                    {pendingAction === "approved" ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <CheckCircle size={20} className="mr-2" />
                    )}
                    <span className="ml-2">Approve Claim</span>
                  </button>
                  <button
                    onClick={() => handleAction("rejectClaim", "rejected")}
                    disabled={actionLoading}
                    className="w-full flex items-center justify-center bg-rose-600 hover:bg-rose-700 disabled:bg-rose-300 text-white font-black py-4 rounded-2xl transition-all shadow-sm active:scale-95"
                  >
                    {pendingAction === "rejected" ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <XCircle size={20} className="mr-2" />
                    )}
                    <span className="ml-2">Reject Claim</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-4 animate-in fade-in zoom-in duration-500">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      claim.status === "approved"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-rose-100 text-rose-600"
                    }`}
                  >
                    {claim.status === "approved" ? (
                      <ShieldCheck size={32} />
                    ) : (
                      <XCircle size={32} />
                    )}
                  </div>
                  <p className="font-black text-gray-900 text-lg uppercase tracking-tight">
                    Decision Recorded
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    This claim was marked as{" "}
                    <span className="font-bold">{claim.status}</span>. No
                    further actions can be taken.
                  </p>
                </div>
              )}

              {actionResult && (
                <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200 text-[10px] text-center font-bold text-gray-500">
                  {actionResult}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClaimDetailsPage;
