import React, { useState } from "react";
import Link from "next/link";
// Added X and ChevronRight to the imports
import {
  User,
  Package,
  MessageSquare,
  FileText,
  LogOut,
  Moon,
  AlertCircle,
  X,
  ChevronRight,
} from "lucide-react";

// 1. Keeping your original Modal to ensure no logic breaks
const LogoutConfirmModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-96 p-8 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          Confirm Logout
        </h3>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Are you sure you want to logout? You'll need to sign in again to
          access your account.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-shadow shadow-lg shadow-red-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Main ProfileMenu Component
const ProfileMenu = ({ open, onClose, user, onLogout }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Kept your exact labels and hrefs
  const menuItems = [
    { icon: User, label: "My Profile", href: "/profile" },
    { icon: FileText, label: "My Claims", href: "/my-claims" },
    { icon: Package, label: "My Items", href: "/my-item" },
    { icon: MessageSquare, label: "Messages", href: "/messages", badge: 3 },
  ];

  const handleLogoutClick = () => setShowLogoutModal(true);

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    onClose();
    onLogout();
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Using your variable 'open' */}
      <div
        className={`fixed top-0 right-0 h-screen w-80 bg-white z-50 flex flex-col
        transform transition-transform duration-500 ease-in-out shadow-2xl
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header with Close Button */}
        <div className="px-6 py-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Account
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info - Smarter Layout */}
        <div className="px-6 pb-6 border-b border-slate-50">
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-100 flex-shrink-0">
              {(user?.name || "U")[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-slate-900 truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Menu Links */}
        <div className="px-4 py-6 space-y-1 flex-grow overflow-y-auto">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link
                key={i}
                href={item.href}
                onClick={onClose}
                className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-indigo-50 transition-all"
              >
                <div className="p-2 rounded-lg bg-white border border-slate-100 text-slate-500 group-hover:text-indigo-600 group-hover:border-indigo-100 shadow-sm transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-slate-600 font-semibold text-sm group-hover:text-indigo-700">
                  {item.label}
                </span>

                {item.badge ? (
                  <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight className="ml-auto w-4 h-4 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                )}
              </Link>
            );
          })}

          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-slate-50 transition-all mt-4">
            <div className="p-2 rounded-lg bg-white border border-slate-100 text-slate-500">
              <Moon className="w-5 h-5" />
            </div>
            <span className="text-slate-600 font-semibold text-sm">
              Dark Mode
            </span>
          </button>
        </div>

        {/* Logout Section at bottom */}
        <div className="p-6 border-t border-slate-50">
          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold transition-all border border-rose-100"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <LogoutConfirmModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default ProfileMenu;
