import Link from "next/link";
import { Search, ArrowRight, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] flex flex-col md:flex-row items-center justify-between py-12 px-6 md:px-20 overflow-hidden bg-white">
      {/* Background Decoration */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-60 -z-10" />
      <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-amber-50 rounded-full blur-3xl opacity-60 -z-10" />

      {/* LEFT SIDE – TEXT */}
      <div className="max-w-2xl space-y-8 z-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-2xl text-indigo-600 text-xs font-black uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4" />
          Trusted Campus Network
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
          Lost it? <br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 bg-clip-text text-transparent">
            Find it.
          </span>
          <br />
          Recover it.
        </h1>

        <p className="text-slate-500 text-lg md:text-xl max-w-lg leading-relaxed font-medium">
          The official <span className="text-slate-900 font-bold">CoU</span>{" "}
          platform to bridge the gap between lost belongings and their rightful
          owners. Fast, secure, and campus-wide.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/item" className="w-full sm:w-auto">
            <button className="group w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 active:scale-95">
              <Search className="w-5 h-5" />
              Start Exploring
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          <Link href="/report/lost" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border-2 border-slate-100 rounded-2xl font-bold hover:border-indigo-200 hover:text-indigo-600 transition-all active:scale-95">
              Report an Item
            </button>
          </Link>
        </div>

        {/* Stats / Trust Marks */}
        <div className="pt-8 flex items-center gap-8 justify-center md:justify-start">
          <div>
            <p className="text-2xl font-black text-slate-900">100%</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
              Verified Claims
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE – IMAGE */}
      <div className="relative mt-12 md:mt-0 group">
        {/* Floating card effect */}
        {/*  */}

        <div className="relative rounded-[3rem] overflow-hidden">
          <img
            src="/heroimg.png"
            alt="Lost and Found"
            className="w-[450px] md:w-[550px] object-contain transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
