"use client";

import { Lock, Key, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import AlreadyAuthenticated from "../components/LoggedIn";

function ResetPasswordContent() {
  const router = useRouter();

  const [email, setEmail] = useState(null);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔐 Block logged-in users and get email from sessionStorage
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) router.replace("/");

    const storedEmail = sessionStorage.getItem("resetEmail");
    if (!storedEmail) router.replace("/forgot-password");
    else setEmail(storedEmail);
  }, [router]);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!otp || !password) {
      setMessage({ type: "error", text: "Please fill in all fields" });
      return;
    }

    if (password.length < 8) {
      setMessage({
        type: "error",
        text: "Password must be at least 8 characters",
      });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const res = await fetch("http://localhost:5000/user/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword: password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage({
        type: "success",
        text: "Success! Your password has been updated.",
      });

      // Clear session
      sessionStorage.removeItem("resetEmail");

      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Reset failed. Check OTP.",
      });
    } finally {
      setLoading(false);
    }
  };
  let role = null;
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("user"));
    role = user?.role;
  }

  if (role) {
    return <AlreadyAuthenticated />;
  }

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 font-medium animate-pulse">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F8FAFC] px-4">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50 to-transparent -z-10" />

      <div className="w-full max-w-[440px]">
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 border border-blue-100">
              <Key className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight italic">
              Set New Password
            </h1>
            <p className="text-gray-500 text-sm mt-3 text-center">
              We've sent a code to <br />
              <span className="inline-block mt-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-bold text-xs border border-blue-100">
                {email}
              </span>
            </p>
          </div>

          <form onSubmit={handleReset} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Verification Code
              </label>
              <div className="relative group">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  className="w-full pl-12 pr-4 h-14 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all text-gray-900 font-bold tracking-[0.3em]"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                New Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 h-14 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all text-gray-900 font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || message?.type === "success"}
              className={`group relative w-full h-14 rounded-2xl font-bold text-lg transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 ${
                message?.type === "success"
                  ? "bg-emerald-500 text-white shadow-emerald-200"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
              } disabled:opacity-70`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : message?.type === "success" ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Password Updated</span>
                </>
              ) : (
                <span>Update Password</span>
              )}
            </button>
          </form>

          {message && (
            <div
              className={`mt-6 p-4 rounded-xl text-sm font-medium border flex items-start gap-3 animate-in fade-in slide-in-from-top-2 ${
                message.type === "error"
                  ? "bg-red-50 text-red-600 border-red-100"
                  : "bg-emerald-50 text-emerald-600 border-emerald-100"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              ) : (
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <span className="text-[10px]">!</span>
                </div>
              )}
              <p>{message.text}</p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-50 flex justify-center">
            <Link
              href="/forgot-password"
              className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Resend OTP
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-gray-400 font-medium tracking-wide">
          Secured by your custom Auth System &copy; 2026
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gray-400 font-medium animate-pulse">
          Loading Reset Security...
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
