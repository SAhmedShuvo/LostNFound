"use client";

import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= FETCH ALL USERS =================
  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("accessToken");

      const res = await fetch("http://localhost:5000/user/all", {
        headers: {
          Authorization: `Bearer ${token}`, // if protected
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch users");

      setUsers(data.data || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= SEARCH USER BY EMAIL (POST BODY) =================
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchEmail.trim()) {
      fetchAllUsers();
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("accessToken");

      const res = await fetch("http://localhost:5000/admin/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: searchEmail, // ✅ MATCHES BACKEND
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "User not found");

      // ✅ backend sends { user: {...} }
      setUsers([data.user]); // wrap into array for table
    } catch (err) {
      setUsers([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= LOAD ALL USERS ON PAGE LOAD =================
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // ================= UI =================
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      {/* 🔍 SEARCH BAR */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="email"
          placeholder="Search by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="border px-4 py-2 rounded w-80"
        />

        <button className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700">
          Search
        </button>

        <button
          type="button"
          onClick={() => {
            setSearchEmail("");
            fetchAllUsers();
          }}
          className="border px-4 py-2 rounded"
        >
          Reset
        </button>
      </form>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>
      )}

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* USERS TABLE */}
      {!loading && users.length > 0 && (
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, i) => (
                <tr key={u._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 capitalize">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && users.length === 0 && !error && <p>No users found.</p>}
    </div>
  );
}
