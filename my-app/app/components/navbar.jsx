"use client";

import { New_Rocker } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation"; // To detect current page
import { useState, useEffect } from "react";
import ProfileMenu from "./profileSidebar";

const newRocker = New_Rocker({
  subsets: ["latin"],
  weight: "400",
});

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // current path

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setUser(null);
    setMenuOpen(false);
  };

  // Helper function for active link styling
  const getLinkStyle = (path) => {
    const isActive = pathname === path;
    return `relative px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
      isActive
        ? "text-indigo-600 bg-indigo-50 shadow-sm"
        : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
    }`;
  };

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-3 flex justify-between items-center sticky top-0 z-50">
        {/* Logo */}
        <Link href="/" className="group transition-transform active:scale-95">
          <h1
            className={`text-2xl md:text-3xl ${newRocker.className} bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:opacity-80`}
          >
            CoU Lost & Found
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          <Link className={getLinkStyle("/item")} href="/item">
            Items
            {pathname === "/item" && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full" />
            )}
          </Link>

          <Link className={getLinkStyle("/about")} href="/about">
            About
          </Link>

          <Link className={getLinkStyle("/report/lost")} href="/report/lost">
            Report Lost
          </Link>

          <Link className={getLinkStyle("/report/found")} href="/report/found">
            Report Found
          </Link>

          <div className="h-6 w-[1px] bg-slate-200 mx-2 hidden md:block" />

          {!user ? (
            <div className="flex items-center gap-2">
              <Link
                className="px-5 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
                href="/register"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="px-5 py-2 text-sm font-bold bg-indigo-600 text-white rounded-xl hover:bg-black transition-all shadow-md shadow-indigo-100 active:scale-95"
              >
                Login
              </Link>
            </div>
          ) : (
            /* User Profile Trigger */
            <button
              onClick={() => setMenuOpen(true)}
              className="ml-2 w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-100 hover:rotate-3 transition-transform active:scale-90 border-2 border-white"
            >
              {user.name?.[0].toUpperCase() || "U"}
            </button>
          )}
        </div>
      </nav>

      {/* Profile Sidebar */}
      {user && (
        <ProfileMenu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          user={user}
          onLogout={logout}
        />
      )}
    </>
  );
};

export default Navbar;
