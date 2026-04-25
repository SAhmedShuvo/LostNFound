"use client";
import React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  LayoutDashboard,
  ArrowLeft,
  Settings,
  Lock,
  ExternalLink,
} from "lucide-react";

export default function AdminRestricted() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-6">
      {/* Background Decorative Element - Admin specific grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("radial-gradient(#4f46e5 1px, transparent 1px)")`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="w-full max-w-3xl relative z-10">
        <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="md:flex">
            {/* Sidebar Branding - Admin Identity */}
            <div className="bg-slate-900 md:w-1/3 p-10 flex flex-col justify-between text-white">
              <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <ShieldAlert size={24} />
              </div>
              <div className="mt-20 md:mt-0">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-2">
                  System Guard
                </p>
                <h2 className="text-xl font-bold leading-tight">
                  Administrative Override Required
                </h2>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-10 md:p-14 md:w-2/3">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-full border border-amber-100">
                  <Lock size={12} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Access Restricted
                  </span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                    Public Routes are Hidden.
                  </h1>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    You are currently logged in as an{" "}
                    <span className="text-indigo-600 font-bold">
                      Administrator
                    </span>
                    . Public forms and user routes are disabled to prevent data
                    conflicts. Please use the management console for all
                    actions.
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-6 space-y-4">
                  <Link
                    href="/admin/dashboard"
                    className="w-full h-16 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all hover:bg-slate-900 shadow-xl shadow-indigo-100 active:scale-95"
                  >
                    <LayoutDashboard size={18} />
                    Back to Admin Console
                  </Link>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => window.history.back()}
                      className="h-14 bg-slate-50 border border-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-white transition-all"
                    >
                      <ArrowLeft size={14} />
                      Go Back
                    </button>
                    <Link
                      href="/admin/settings"
                      className="h-14 bg-slate-50 border border-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-white transition-all"
                    >
                      <Settings size={14} />
                      Settings
                    </Link>
                  </div>
                </div>

                {/* Bottom Verification */}
                <div className="pt-8 border-t border-slate-50 flex items-center justify-between text-slate-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">
                      Admin Session Active
                    </span>
                  </div>
                  <ExternalLink size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
