"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Package,
  Users,
  ClipboardList,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  Clock,
  CheckCircle2,
  ChevronRight,
  Activity,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
} from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:5000/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Unauthorized");
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#fbfcfd]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-14 w-14 border-[5px] border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            Analyzing Architecture
          </p>
        </div>
      </div>
    );

  if (error || !data)
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#fbfcfd]">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">{error || "Failed to load dashboard"}</p>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );

  const { users, items, claims } = data;

  // --- ANALYTICS DERIVATION (guard division by zero) ---
  const returnRate = items?.total ? ((items.returned / items.total) * 100).toFixed(1) : "0";
  const trustScore = users?.total ? ((users.verified / users.total) * 100).toFixed(1) : "0";
  const backlogFactor = (items?.pending ?? 0) + (claims?.pending ?? 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 lg:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200">
              <Zap size={24} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                System Intelligence
              </h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Node-01 Live Data
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={fetchDashboardData}
              className="p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all border border-slate-100"
            >
              <RefreshCw size={20} />
            </button>
            <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={16} className="text-indigo-400" />
              Admin Verified
            </div>
          </div>
        </div>

        {/* PRIMARY STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Lost Issues"
            value={items?.total ?? 0}
            sub={`${items?.pending ?? 0} Unverified`}
            icon={<Package />}
            color="indigo"
          />
          <StatCard
            title="Total Claims"
            value={claims?.total ?? 0}
            sub={`${claims?.pending ?? 0} Pending`}
            icon={<ClipboardList />}
            color="blue"
          />
          <StatCard
            title="Verified Users"
            value={users?.verified ?? 0}
            sub={`Out of ${users?.total ?? 0}`}
            icon={<Users />}
            color="emerald"
          />
          <StatCard
            title="Total Returned"
            value={items?.returned ?? 0}
            sub={`${returnRate}% Success`}
            icon={<CheckCircle2 />}
            color="rose"
          />
        </div>

        {/* DEEP ANALYSIS BENTO BOXES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Analysis Card: Trust & Verification */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-widest mb-6">
              Trust Ecosystem
            </h3>
            <div className="flex items-end gap-4">
              <span className="text-5xl font-black text-slate-900">
                {trustScore}%
              </span>
              <div className="flex items-center text-emerald-500 font-bold text-sm mb-2">
                <ArrowUpRight size={16} /> Verfied Ratio
              </div>
            </div>
            <p className="text-slate-500 text-xs mt-4 leading-relaxed font-medium">
              The platform verification rate is{" "}
              {trustScore > 70 ? "High" : "Improving"}. Higher verification
              reduces fraudulent claims by 40%.
            </p>
            <div className="absolute right-[-10%] bottom-[-10%] text-slate-50 opacity-10">
              <ShieldCheck size={160} />
            </div>
          </div>

          {/* Analysis Card: Operational Backlog */}
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
            <h3 className="font-black text-slate-500 text-[10px] uppercase tracking-widest mb-6">
              Action Queue
            </h3>
            <div className="flex items-end gap-4">
              <span className="text-5xl font-black">{backlogFactor}</span>
              <div className="flex items-center text-rose-400 font-bold text-sm mb-2">
                <Clock size={16} className="mr-1" /> Critical Tasks
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-[10px] font-black text-slate-400 uppercase">
                  Claims
                </p>
                <p className="text-xl font-bold">{claims?.pending ?? 0}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-[10px] font-black text-slate-400 uppercase">
                  Items
                </p>
                <p className="text-xl font-bold">{items?.pending ?? 0}</p>
              </div>
            </div>
          </div>

          {/* Analysis Card: Item Flow */}
          <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white relative overflow-hidden group">
            <h3 className="font-black text-indigo-200 text-[10px] uppercase tracking-widest mb-6">
              Success Target
            </h3>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <Target size={32} className="text-indigo-200" />
                <span className="text-4xl font-black">{items.returned}</span>
              </div>
              <p className="text-sm font-bold text-indigo-100">
                Confirmed Item Returns
              </p>
              <button className="mt-8 w-full py-3 bg-white text-indigo-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all">
                Generate Report
              </button>
            </div>
            <Activity className="absolute right-[-20px] top-[-20px] text-white opacity-5 w-40 h-40" />
          </div>
        </div>
        {/* DYNAMIC FEED SECTION */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* RECENT ISSUES (POSTS) */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs flex items-center gap-2">
                <Package size={18} className="text-indigo-600" /> Recent Issues
              </h3>
              <span className="text-[10px] font-bold text-slate-400">
                Live Posts
              </span>
            </div>
            <div className="p-4 space-y-3">
              {data.recentItems?.length > 0 ? (
                data.recentItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-rose-500">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-700">
                          {item.itemName}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                          {item.type} •{" "}
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-300" />
                  </div>
                ))
              ) : (
                <div className="p-10 text-center text-slate-400 text-xs italic">
                  No recent issues found.
                </div>
              )}
            </div>
          </div>

          {/* RECENT CLAIMS */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs flex items-center gap-2">
                <ClipboardList size={18} className="text-blue-600" /> Recent
                Claims
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {data.recentClaims?.length > 0 ? (
                data.recentClaims.map((claim) => (
                  <div
                    key={claim._id}
                    className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-10 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`w-full h-full ${claim.status === "pending" ? "bg-amber-400" : "bg-emerald-400"}`}
                        ></div>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-700">
                          {claim.itemId?.itemName || "Unknown Item"}
                        </p>
                        <p className="text-[10px] font-black text-slate-300 uppercase">
                          By: {claim.claimedBy?.name || "User"}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase ${
                        claim.status === "pending"
                          ? "bg-amber-50 text-amber-600 border border-amber-100"
                          : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      }`}
                    >
                      {claim.status}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center text-slate-400 text-xs italic">
                  No recent claims found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// REUSABLE STAT COMPONENT
function StatCard({ title, value, sub, icon, color }) {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600",
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    rose: "bg-rose-50 text-rose-600",
  };

  return (
    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
      <div
        className={`${colors[color]} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}
      >
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
        {title}
      </p>
      <div className="flex items-end justify-between mt-1">
        <h3 className="text-4xl font-black text-slate-900">{value}</h3>
        <div className="text-[10px] font-black text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
          {sub}
        </div>
      </div>
    </div>
  );
}
