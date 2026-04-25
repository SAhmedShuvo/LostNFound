"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Search,
  ClipboardCheck,
  Users,
  Menu,
} from "lucide-react";
import Link from "next/link";
import NotFound from "../components/NotFound";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
    },
    {
      id: "verified",
      label: "Verified Items",
      icon: Package,
      href: "/admin/verifiedItem",
    },
    {
      id: "pending",
      label: "Pending Items",
      icon: Search,
      href: "/admin/pendingItem",
    },
    {
      id: "claims",
      label: "Claims",
      icon: ClipboardCheck,
      href: "/admin/claimsreview",
    },
    { id: "users", label: "Users", icon: Users, href: "/admin/users" },
  ];
  let role = null;

  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("user"));
    role = user?.role;
  }

  if (role !== "admin") {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed top-0 left-0 h-screen z-50 shadow-md transition-all duration-300 border-r 
          bg-indigo-800 text-white
          ${isOpen ? "w-64" : "w-16"}
        `}
      >
        {/* Top Section */}
        <div className="flex items-center justify-between p-4 border-b border-indigo-500">
          <h1
            className={`font-bold text-lg transition-all duration-200
              ${isOpen ? "opacity-100" : "opacity-0 w-0"}
            `}
          >
            Admin Panel
          </h1>

          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.href}>
              <div className="flex items-center p-4 cursor-pointer hover:bg-indigo-700 transition">
                <item.icon className="w-5 h-5 text-white" />
                <span
                  className={`ml-3 font-medium transition-all duration-200
                    ${isOpen ? "opacity-100" : "opacity-0 w-0 hidden"}
                  `}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main
        className={`transition-all duration-300 min-h-screen p-6 text-gray-900
          ${isOpen ? "ml-64" : "ml-16"}
        `}
      >
        {children}
      </main>
    </div>
  );
}
