"use client";
import React from "react";
import Link from "next/link";
import {
  UserCheck,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  ArrowRight,
  Fingerprint,
} from "lucide-react";

export default function AlreadyAuthenticated() {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Subtile Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50" />

      <div className="w-full max-w-2xl relative z-10">
        {/* Minimal Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-emerald-100">
            <UserCheck size={32} />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-slate-200" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">
              Session Verified
            </span>
            <div className="h-[1px] w-8 bg-slate-200" />
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight text-center">
            You are already logged in.
          </h1>
          <p className="mt-6 text-slate-500 font-medium text-lg text-center max-w-md">
            You're currently signed in. To switch accounts or create a new one,
            please sign out of your current session.
          </p>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
          <Link
            href="/"
            className="group flex flex-col items-start p-6 bg-slate-900 text-white rounded-3xl transition-all hover:bg-emerald-600 active:scale-95 shadow-2xl shadow-slate-200"
          >
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-10 group-hover:bg-white/20 transition-colors">
              <LayoutDashboard size={20} />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
                Return to
              </span>
              <h3 className="font-bold text-lg flex items-center gap-2">
                Home Dashboard <ArrowRight size={18} />
              </h3>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            className="group flex flex-col items-start p-6 bg-white border border-slate-100 rounded-3xl transition-all hover:border-rose-200 hover:bg-rose-50/30 active:scale-95"
          >
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-10 group-hover:bg-rose-100 group-hover:text-rose-600 transition-colors">
              <LogOut size={20} />
            </div>
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Exit Current
              </span>
              <h3 className="font-bold text-lg text-slate-800 group-hover:text-rose-600">
                Sign Out Account
              </h3>
            </div>
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-slate-50 pt-8">
          <div className="flex items-center gap-6 text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} />
              <span className="text-[9px] font-bold uppercase tracking-widest">
                Secure Connection
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Fingerprint size={14} />
              <span className="text-[9px] font-bold uppercase tracking-widest">
                ID: {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
