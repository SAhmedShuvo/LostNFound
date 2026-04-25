"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock,
  Inbox,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";
import { useRouter } from "next/navigation";
import AdminRestricted from "../components/NotForAdmin";

const BASE_URL = "http://localhost:5000";

const MyMessagesPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [role, setRole] = useState(null);

  // Get User Role on Mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      setRole(user?.role);
    }
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const res = await fetch(
          `${BASE_URL}/user/myMessage?page=${page}&limit=12`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (!res.ok) throw new Error("Failed to fetch messages");

        const data = await res.json();
        setMessages(data.messages);
        setTotalPage(data.totalPages);
      } catch (err) {
        console.error("Message fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (role !== "admin") {
      fetchMessages();
    }
  }, [page, role]);

  if (role === "admin") {
    return <AdminRestricted />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium tracking-tight font-sans">
          Syncing inbox...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      <header className="sticky top-[64px] z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-[98%] mx-auto px-2 py-3">
          <button
            onClick={() => router.back()}
            className="group flex items-center text-slate-600 hover:text-indigo-600 transition-all px-4 py-2 rounded-xl hover:bg-slate-100/50"
          >
            <ArrowLeft
              size={20}
              className="mr-2 group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-xs font-black uppercase tracking-[0.2em]">
              Back
            </span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-16">
        {messages.length > 0 && (
          <div className="mb-8 flex justify-end">
            <div className="bg-slate-900 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-200">
              {messages.length} Active Notifications
            </div>
          </div>
        )}

        {messages.length === 0 ? (
          <div className="bg-white rounded-[3rem] border-2 border-dashed border-slate-200 p-24 text-center flex flex-col items-center">
            <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6 border border-slate-100 shadow-inner">
              <Inbox size={48} className="text-slate-200" />
            </div>
            <h3 className="text-slate-900 font-bold text-xl tracking-tight">
              Your inbox is clear
            </h3>
            <p className="text-slate-400 text-sm mt-2 max-w-[240px] leading-relaxed">
              Updates on your reports and community alerts will land here.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-10">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 transition-all duration-500"
                >
                  <div className="p-10">
                    <div className="flex items-start justify-between mb-10">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-[1.25rem] bg-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-2xl shadow-indigo-200 transform hover:scale-105 transition-transform cursor-default">
                          {msg.sender?.name?.charAt(0) || "L"}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-black text-slate-900 text-xl tracking-tight">
                              {/* REPLACE 'System Core' with 'Lost&Found' */}
                              {msg.sender?.name || "Lost&Found"}
                            </p>
                            <ShieldCheck
                              size={20}
                              className="text-indigo-500"
                            />
                          </div>
                          <p className="text-[10px] text-slate-400 font-black mt-1.5 tracking-[0.25em] uppercase">
                            Official Channel
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center justify-end gap-2 text-slate-900 font-black text-xs uppercase tracking-tighter">
                          <Clock size={14} className="text-indigo-500" />
                          {new Date(msg.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="relative pl-8">
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                      <div className="bg-slate-50/80 rounded-[2rem] p-8 border border-slate-100">
                        <p className="text-slate-700 text-base leading-[1.8] whitespace-pre-line font-medium italic">
                          "{msg.message}"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="px-10 py-6 bg-slate-50/40 border-t border-slate-100 flex justify-between items-center">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-500/20"></div>
                      <div className="w-2 h-2 rounded-full bg-indigo-500/40"></div>
                      <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">
                      Security Hash: {msg._id.slice(-12).toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= PAGINATION UI ================= */}
            {totalPage > 1 && (
              <div className="mt-16 flex flex-col items-center gap-6">
                <div className="inline-flex items-center gap-2 bg-white border border-slate-100 p-2 rounded-[2rem] shadow-xl shadow-slate-200/50">
                  <button
                    disabled={page === 1}
                    onClick={() => {
                      setPage(page - 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 
                      disabled:opacity-30 disabled:cursor-not-allowed
                      hover:bg-slate-50 text-slate-600 active:scale-90"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-8 h-8 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-indigo-100">
                      <span className="text-xs font-black">{page}</span>
                    </div>

                    <div className="flex flex-col items-start leading-none">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
                        Inbox Page
                      </span>
                      <span className="text-[11px] font-bold text-slate-600">
                        of {totalPage}
                      </span>
                    </div>
                  </div>

                  <button
                    disabled={page === totalPage}
                    onClick={() => {
                      setPage(page + 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-600 text-white transition-all duration-200 
                      disabled:bg-slate-100 disabled:text-slate-300 disabled:cursor-not-allowed
                      hover:bg-slate-900 shadow-lg shadow-indigo-100 active:scale-90"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 flex items-center gap-2">
                  <Layers size={12} /> Syncing Page {page} of {totalPage}
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default MyMessagesPage;
