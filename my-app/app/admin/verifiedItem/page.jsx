"use client";

import { Eye, Loader2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:5000";

const VerifiedItemsPage = () => {
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [actionResultId, setActionResultId] = useState(null);
  const [actionResultMsg, setActionResultMsg] = useState("");

  // ================= FETCH VERIFIED ITEMS =================
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("accessToken");

        const res = await fetch(`${BASE_URL}/item/all?page=${page}&limit=9`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch items");

        const data = await res.json();

        setItems(data.items); // ✅ FIXED
        setTotalPages(data.totalPages); // ✅ NEW
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [page]);

  // ================= DELETE HANDLER =================
  const handleDelete = async (id) => {
    setActionLoadingId(id);
    setActionResultId(null);

    try {
      const token = localStorage.getItem("accessToken");

      const res = await fetch(`${BASE_URL}/admin/rejectItem/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Delete failed");

      setItems((prev) => prev.filter((item) => item._id !== id));

      setActionResultId(id);
      setActionResultMsg("Item Deleted");
    } catch (err) {
      console.error(err);

      setActionResultId(id);
      setActionResultMsg("Delete failed");
    } finally {
      setActionLoadingId(null);
    }
  };

  // ================= LOADING =================
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 animate-pulse">
        Loading items...
      </div>
    );

  // ================= EMPTY =================
  if (items.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-gray-600">No items found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Verified Items</h1>

      {/* ================= ITEMS GRID ================= */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
          >
            {/* Image */}
            <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
              {item.photos?.length > 0 ? (
                <img
                  src={
                    item.photos[0].startsWith("http")
                      ? item.photos[0]
                      : `${BASE_URL}${item.photos[0]}`
                  }
                  alt={item.itemName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>

            {/* Info */}
            <div className="p-4 space-y-2">
              <h2 className="font-bold text-lg text-gray-800">
                {item.itemName}
              </h2>

              <p className="text-gray-600 text-sm">
                Category: <span className="font-medium">{item.category}</span>
              </p>

              <p className="text-gray-600 text-sm">
                Location: <span className="font-medium">{item.location}</span>
              </p>

              <p className="text-gray-600 text-sm">
                Posted by:{" "}
                <span className="font-medium">{item.postedBy?.name}</span>
              </p>
            </div>

            {/* Buttons */}
            <div className="p-4 flex gap-2 justify-between">
              <button
                onClick={() => handleDelete(item._id)}
                disabled={actionLoadingId === item._id}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-white font-bold ${
                  actionLoadingId === item._id
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {actionLoadingId === item._id ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <XCircle size={18} />
                )}
                Delete
              </button>

              <button
                onClick={() => router.push(`/admin/itemDetails/${item._id}`)}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold"
              >
                <Eye size={18} /> Details
              </button>
            </div>

            {/* Result message */}
            {actionResultId === item._id && actionResultMsg && (
              <p className="text-center text-sm text-gray-800 font-medium py-2">
                {actionResultMsg}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VerifiedItemsPage;
