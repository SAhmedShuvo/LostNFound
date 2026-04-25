import React from "react";
import Link from "next/link";
import {
  Shield,
  Search,
  CheckCircle,
  Handshake,
  Mail,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

const AboutPage = () => {
  const workflowSteps = [
    {
      id: "01",
      icon: Search,
      title: "Report & Discover",
      description:
        "Submit details (description, images, location) for any item you've lost or found. All reports are immediately searchable.",
      color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
    {
      id: "02",
      icon: ShieldCheck,
      title: "Claim with Proof",
      description:
        "Found your item? Submit a claim with specific proof of ownership to verify you are the rightful owner.",
      color: "bg-rose-50 text-rose-600 border-rose-100",
    },
    {
      id: "03",
      icon: Shield,
      title: "Admin Verification",
      description:
        "Dedicated campus administrators review all proofs to ensure security and prevent fraudulent collection attempts.",
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      id: "04",
      icon: Handshake,
      title: "Connect & Arrange",
      description:
        "Once approved, contact details are shared securely so parties can arrange the physical handover themselves.",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Maximum Security",
      description:
        "Personal contact details are never exposed. All communication is mediated by the admin team.",
    },
    {
      icon: Zap,
      title: "Real-Time Tracking",
      description:
        "Track your report or claim status (Reported, Approved, Returned) instantly from your dashboard.",
    },
    {
      icon: Search,
      title: "Efficient Recovery",
      description:
        "A centralized database significantly increases the speed of finding your property.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* 1. HERO SECTION - Clean & Airy */}
        <header className="relative pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-700">
              Campus Integrity System
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight">
            Reuniting What's Lost, <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              Building Trust at CoU
            </span>
          </h1>
          <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            The CoU Lost & Found is a dedicated digital bridge bringing
            transparency and security to the recovery of property on campus.
          </p>

          <Link href="/item">
            <button className="mt-10 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-indigo-600 transition-all active:scale-95 flex items-center gap-2 mx-auto">
              Start Your Search Now <ArrowRight size={18} />
            </button>
          </Link>
        </header>

        {/* 2. CORE WORKFLOW - The Bento Step Guide */}
        <section className="py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                The Recovery Process
              </h2>
              <p className="text-slate-500 font-medium">
                Securely getting your items back in four simple steps.
              </p>
            </div>
            <div className="h-px flex-grow bg-slate-100 mx-8 hidden md:block"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {workflowSteps.map((step) => (
              <div
                key={step.id}
                className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${step.color} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                >
                  <step.icon size={26} />
                </div>
                <span className="text-5xl font-black text-slate-50 absolute top-8 right-8 group-hover:text-slate-100 transition-colors">
                  {step.id}
                </span>
                <h3 className="text-xl font-black text-slate-800 mb-3 relative z-10">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed relative z-10">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. BENEFITS - Horizontal Bento */}
        <div className="grid md:grid-cols-3 gap-6 py-10">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-5 bg-white p-8 rounded-[2rem] border border-slate-50 shadow-sm"
            >
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <benefit.icon size={24} />
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-800 mb-1">
                  {benefit.title}
                </h4>
                <p className="text-sm text-slate-500 font-medium">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 4. SUPPORT - The Final Callout */}
        <section className="bg-indigo-600 rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>

          <h3 className="text-2xl md:text-4xl font-black mb-6 relative z-10">
            Need Support or Assistance?
          </h3>
          <p className="text-indigo-100 max-w-2xl mx-auto mb-10 font-medium relative z-10">
            We focus on digital verification and secure communication. For claim
            status or technical help, reach out to our admin team.
            <span className="block mt-2 font-bold opacity-80 underline decoration-indigo-300">
              Note: We do not manage physical storage of items.
            </span>
          </p>

          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-2 pl-6 rounded-2xl relative z-10">
            <Mail size={20} className="text-indigo-200" />
            <span className="font-mono font-bold text-lg">
              lostandfound@cou.edu
            </span>
            <a
              href="mailto:lostandfound@cou.edu"
              className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-black text-sm hover:bg-indigo-50 transition-colors"
            >
              Email Us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
