"use client";

import { Mail, ArrowLeft, Loader2, ShieldQuestion } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.replace("/");
    }
  }, [router]);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address" });
      return;
    }

    try {
      setIsLoading(true);
      setMessage(null);

      const res = await fetch("http://localhost:5000/user/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      sessionStorage.setItem("resetEmail", email);
      router.push("/reset-password");
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Failed to send OTP. Try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F8FAFC] px-4">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50 to-transparent -z-10" />

      <div className="w-full max-w-[440px]">
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 border border-blue-100">
              <ShieldQuestion className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight italic">
              Forgot Password?
            </h1>
            <p className="text-gray-500 text-sm mt-2 text-center max-w-[280px]">
              No worries! Enter your email and we'll send you a verification
              code.
            </p>
          </div>

          <form onSubmit={handleSendOtp} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 h-14 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all text-gray-900 font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 h-14 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-70 shadow-lg shadow-blue-200"
            >
              <div className="flex items-center justify-center gap-2">
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span>Send OTP Code</span>
                )}
              </div>
            </button>
          </form>

          {message && (
            <div
              className={`mt-6 p-4 rounded-xl text-sm font-medium border animate-in fade-in slide-in-from-top-2 ${
                message.type === "error"
                  ? "bg-red-50 text-red-600 border-red-100"
                  : "bg-green-50 text-green-600 border-green-100"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-50 flex justify-center">
            <Link
              href="/login"
              className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
