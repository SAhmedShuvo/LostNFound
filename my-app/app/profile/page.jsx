"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  ShieldCheck,
  Calendar,
  Pencil,
  Package,
  MapPin,
  CheckCircle,
  Clock,
  ChevronRight,
  Activity,
  Camera,
  Loader2,
} from "lucide-react";
import AdminRestricted from "../components/NotForAdmin";

export default function ProfilePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const fetchMyProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:5000/user/myProfile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProfile();
  }, []);

  // Handler for uploading the image to your /setAvatar API
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setUploading(true);
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:5000/user/setAvatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Note: Do not set Content-Type header when sending FormData
        },
        body: formData,
      });

      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.message || "Upload failed");

      // Refresh the profile data to show the new avatar
      await fetchMyProfile();
    } catch (err) {
      console.error("Upload error:", err);
      alert(err.message || "Failed to upload image.");
    } finally {
      setUploading(false);
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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  const { user, stats, recentActivity } = data;

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* 1. MINIMIZED TOP BANNER */}
      <div className="h-32 md:h-40 bg-gradient-to-r from-indigo-600 via-violet-700 to-purple-800 w-full" />

      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER SECTION */}
        <div className="relative -mt-12 md:-mt-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            {/* AVATAR BOX WITH UPLOAD LOGIC */}
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] md:rounded-[3rem] bg-white p-2 md:p-3 shadow-2xl">
                <div className="relative w-full h-full rounded-[2rem] md:rounded-[2.2rem] bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center text-4xl md:text-5xl font-black border-4 border-white overflow-hidden">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user.name?.[0].toUpperCase()
                  )}

                  {/* Loading Overlay */}
                  {uploading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 animate-spin text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Trigger Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute bottom-1 right-1 p-2.5 bg-white border border-slate-200 text-indigo-600 rounded-2xl shadow-lg hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
              >
                <Camera size={20} />
              </button>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="text-center md:text-left mb-1">
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                {user.name}
              </h1>
              <div className="flex items-center gap-2 text-slate-500 mt-1 font-medium justify-center md:justify-start">
                <Mail size={16} className="text-indigo-500" />
                <span className="text-sm md:text-base">{user.email}</span>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3.5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold shadow-sm hover:shadow-xl transition-all active:scale-95 mb-1">
            <Pencil size={18} className="text-indigo-600" />
            <span className="text-sm md:text-base">Edit Profile</span>
          </button>
        </div>

        {/* 2. MAIN CONTENT GRID */}
        <div className="grid lg:grid-cols-12 gap-8 mt-10">
          {/* LEFT COLUMN: INFO + STATS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                <User className="w-4 h-4" /> Personal Info
              </h3>
              <div className="space-y-8">
                <DetailItem
                  icon={ShieldCheck}
                  label="Account Role"
                  value={user.role}
                  badge
                />
                <DetailItem
                  icon={Calendar}
                  label="Member Since"
                  value={new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                />
                <DetailItem
                  icon={MapPin}
                  label="Location"
                  value="Main Campus, CoU"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Statistics
              </h3>
              <StatCardHorizontal
                icon={Package}
                label="Lost Posts"
                value={stats.lost}
                color="rose"
              />
              <StatCardHorizontal
                icon={MapPin}
                label="Found Posts"
                value={stats.found}
                color="emerald"
              />
              <StatCardHorizontal
                icon={CheckCircle}
                label="Solved Cases"
                value={stats.solved}
                color="indigo"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: RECENT ACTIVITY */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 h-full overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Recent Activity Feed
                </h3>
                <span className="text-[10px] font-black bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-400 uppercase">
                  Live History
                </span>
              </div>

              <div className="divide-y divide-slate-50">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="p-7 hover:bg-indigo-50/30 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                          <Clock size={22} />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                            {activity.title}
                          </p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-[10px] font-black uppercase px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                              {activity.activityType}
                            </span>
                            <span className="text-xs text-slate-400 font-bold">
                              {new Date(activity.date).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-24 text-center">
                    <Activity className="w-16 h-16 text-slate-100 mx-auto mb-4" />
                    <p className="text-slate-400 font-black uppercase tracking-widest text-sm">
                      No activity recorded
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value, badge }) {
  return (
    <div className="flex gap-5 items-center">
      <div className="p-3 rounded-2xl bg-slate-50 text-indigo-500 shadow-sm">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
          {label}
        </p>
        {badge ? (
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-black uppercase border border-indigo-100">
            {value}
          </span>
        ) : (
          <p className="text-sm font-bold text-slate-700">{value}</p>
        )}
      </div>
    </div>
  );
}

function StatCardHorizontal({ icon: Icon, label, value, color }) {
  const themes = {
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
  };
  return (
    <div
      className={`flex items-center justify-between p-5 bg-white border ${themes[color].split(" ")[2]} rounded-[1.8rem] shadow-sm hover:shadow-md transition-all group`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl ${themes[color].split(" ").slice(0, 2).join(" ")} flex items-center justify-center group-hover:rotate-12 transition-transform`}
        >
          <Icon size={22} />
        </div>
        <p className="text-xs font-black text-slate-500 uppercase tracking-tight">
          {label}
        </p>
      </div>
      <p className="text-2xl font-black text-slate-900">
        {value < 10 ? `0${value}` : value}
      </p>
    </div>
  );
}
