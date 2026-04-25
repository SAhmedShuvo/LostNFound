"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Tag,
  MapPin,
  Calendar,
  Trash2,
  Eye,
  Plus,
  AlertCircle,
} from "lucide-react";
import AdminRestricted from "../components/NotForAdmin";

const BASE_URL = "http://localhost:5000";

const MyItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`${BASE_URL}/user/myItems`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyItems();
  }, []);

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this post? This action cannot be undone.",
      )
    )
      return;
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}/items/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              My Posted Items
            </h1>
            <p className="text-slate-500 mt-1 font-medium">
              Manage and track your reports.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {items.length > 0 ? (
            items.map((item) => {
              const canDelete =
                item.status?.toLowerCase() === "pending" ||
                item.status?.toLowerCase() === "rejected";

              return (
                <div
                  key={item._id}
                  className="group bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row min-h-[240px]"
                >
                  {/* 1. Image or Initial Placeholder Section */}
                  <div className="relative h-48 w-full md:h-56 md:w-56 flex-shrink-0 overflow-hidden rounded-[2rem] shadow-inner bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {item.photos?.length > 0 ? (
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        src={`${BASE_URL}${item.photos[0]}`}
                        alt={item.itemName}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <span className="text-6xl font-black text-white uppercase drop-shadow-md">
                          {item.itemName?.charAt(0) || "?"}
                        </span>
                      </div>
                    )}

                    <div
                      className={`absolute top-4 left-4 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border backdrop-blur-md shadow-sm 
                      ${item.type === "lost" ? "bg-rose-50/80 text-rose-600 border-rose-100" : "bg-emerald-50/80 text-emerald-600 border-emerald-100"}`}
                    >
                      {item.type}
                    </div>
                  </div>

                  {/* 2. Content Section */}
                  <div className="flex flex-col flex-grow px-0 md:px-10 mt-6 md:mt-0 justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">
                          {item.itemName}
                        </h3>
                        <div
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter border 
                          ${
                            item.status === "pending"
                              ? "bg-amber-50 text-amber-600 border-amber-100"
                              : item.status === "rejected"
                                ? "bg-rose-50 text-rose-600 border-rose-100"
                                : "bg-indigo-50 text-indigo-600 border-indigo-100"
                          }`}
                        >
                          {item.status}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                        <div className="flex items-center text-sm text-slate-400 font-bold uppercase tracking-wider">
                          <Tag className="w-4 h-4 mr-2 text-indigo-500" />
                          {item.category}
                        </div>
                        <div className="flex items-center text-sm text-slate-500 font-medium">
                          <MapPin className="w-4 h-4 mr-2 text-rose-500" />
                          {item.location}
                        </div>
                        <div className="flex items-center text-sm text-slate-500 font-medium">
                          <Calendar className="w-4 h-4 mr-2 text-amber-500" />
                          {new Date(item.date).toLocaleDateString("en-GB")}
                        </div>
                      </div>

                      <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed italic border-l-2 border-slate-100 pl-4">
                        "{item.description}"
                      </p>
                    </div>

                    {/* 3. Bottom Actions Section */}
                    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-50">
                      <Link
                        href={`/item/${item._id}`}
                        className="flex-1 max-w-[180px]"
                      >
                        <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl text-xs font-bold transition-all active:scale-95 shadow-md shadow-slate-200">
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </Link>

                      {/* CONDITIONAL DELETE BUTTON */}
                      {canDelete && (
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="flex items-center gap-2 px-6 py-3.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-2xl text-xs font-bold transition-all active:scale-95 border border-rose-100"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Post
                        </button>
                      )}

                      {!canDelete && (
                        <div className="text-[10px] font-bold text-slate-300 uppercase italic tracking-widest px-4">
                          Post Locked (Approved)
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="text-slate-300 w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                No items found
              </h2>
              <p className="text-slate-500 mt-2">
                Items you post will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyItems;
