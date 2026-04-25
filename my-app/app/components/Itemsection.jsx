"use client";
import React, { useState, useEffect } from "react";
import Card from "./card";
import { ChevronLeft, ChevronRight, Hash, Layers } from "lucide-react";

const ItemSection = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/item/all?page=${page}&limit=12`,
        );
        const data = await res.json();
        setItems(data.items);
        setTotalPage(data.totalPages);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  return (
    <div className="min-h-screen bg-[#F9F8F6] px-6 py-12">
      {/* --- Item Cards Display --- */}
      <div className="flex justify-center items-start flex-wrap gap-8 max-w-7xl mx-auto">
        {loading ? (
          // Simple Loading State
          <div className="flex flex-col items-center py-20 text-slate-400">
            <div className="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest">
              Loading Catalog...
            </p>
          </div>
        ) : (
          items.map((item) => <Card key={item._id} item={item} />)
        )}
      </div>

      {/* --- Refined Pagination UI --- */}
      {!loading && (
        <div className="flex justify-center mt-16">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-100 p-2 rounded-[2rem] shadow-xl shadow-slate-200/50">
            {/* Previous Button */}
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 
                disabled:opacity-30 disabled:cursor-not-allowed
                hover:bg-slate-50 text-slate-600 active:scale-90"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Page Info Wrapper */}
            <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-indigo-100">
                <span className="text-xs font-black">{page}</span>
              </div>

              <div className="flex flex-col items-start leading-none">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
                  Showing Page
                </span>
                <span className="text-[11px] font-bold text-slate-600">
                  of {totalPage} total
                </span>
              </div>
            </div>

            {/* Next Button */}
            <button
              disabled={page === totalPage}
              onClick={() => setPage(page + 1)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-600 text-white transition-all duration-200 
                disabled:bg-slate-100 disabled:text-slate-300 disabled:cursor-not-allowed
                hover:bg-slate-900 shadow-lg shadow-emerald-100 active:scale-90"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      <div className="text-center mt-6">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 flex items-center justify-center gap-2">
          <Layers size={12} /> {items.length} Items on this page
        </p>
      </div>
    </div>
  );
};

export default ItemSection;
