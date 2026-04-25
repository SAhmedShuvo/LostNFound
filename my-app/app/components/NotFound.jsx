"use client";
import React from "react";
import Link from "next/link";
import {
  ShieldX,
  ChevronLeft,
  Home,
  LockKeyhole,
  Search,
  Fingerprint,
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Animated Icon Section */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full" />
          <div className="relative bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 ring-1 ring-slate-100">
            <div className="relative">
              <ShieldX
                size={80}
                className="text-rose-500 mx-auto"
                strokeWidth={1.5}
              />
              <div className="absolute -right-2 -bottom-2 bg-slate-900 text-white p-2 rounded-xl">
                <LockKeyhole size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
              Error 404 • Restricted Access
            </span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight pt-2">
              Unauthorized Entry
            </h1>
          </div>
          <p className="text-slate-500 font-medium leading-relaxed">
            It looks like you’ve wandered into a restricted area. This page is
            either missing or requires admin privileges you don't currently
            have.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-3 pt-4">
          <Link
            href="/"
            className="group h-16 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-100 active:scale-95"
          >
            <Home
              size={18}
              className="group-hover:-translate-y-0.5 transition-transform"
            />
            Return to Dashboard
          </Link>

          <button
            onClick={() => window.history.back()}
            className="h-16 bg-white border border-slate-200 text-slate-600 rounded-[1.5rem] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all hover:bg-slate-50 active:scale-95"
          >
            <ChevronLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Subtle Footer Helper */}
        <div className="pt-8 flex flex-col items-center gap-4">
          <div className="h-px w-12 bg-slate-200" />
          <div className="flex items-center gap-6 text-slate-300">
            <div className="flex items-center gap-2">
              <Fingerprint size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Auth_Log_ID: 404
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Search size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Report Issue
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
