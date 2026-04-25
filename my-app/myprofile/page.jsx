"use client";

import { useEffect, useState } from "react";
import { User, Mail, ShieldCheck, Calendar, Pencil } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  // 🔹 Later replace with API call
  //   useEffect(() => {
  //     const storedUser = localStorage.getItem("user");
  //     if (storedUser) {
  //       setUser(JSON.parse(storedUser));
  //     }
  //   }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow border">
        {/* ===== HEADER ===== */}
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold">
              {user.name[0].toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {user.name}
              </h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100">
            <Pencil size={16} />
            Edit Profile
          </button>
        </div>

        {/* ===== BODY ===== */}
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Left Info */}
          <div className="space-y-4">
            <InfoRow
              icon={<User size={18} />}
              label="Full Name"
              value={user.name}
            />

            <InfoRow
              icon={<Mail size={18} />}
              label="Email"
              value={user.email}
            />

            <InfoRow
              icon={<ShieldCheck size={18} />}
              label="Role"
              value={user.role}
            />

            <InfoRow
              icon={<Calendar size={18} />}
              label="Joined"
              value="12 Jan 2025"
            />
          </div>

          {/* Right Summary */}
          <div className="bg-gray-50 rounded-lg p-5 border space-y-4">
            <h3 className="font-semibold text-gray-900">Activity Summary</h3>

            <Stat label="Lost Items Posted" value="5" />
            <Stat label="Found Items Posted" value="3" />
            <Stat label="Claims Submitted" value="4" />
            <Stat label="Approved Claims" value="1" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Reusable Components ===== */

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 border rounded-lg p-4">
      <div className="text-indigo-600">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex justify-between items-center bg-white border rounded-lg p-3">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}
