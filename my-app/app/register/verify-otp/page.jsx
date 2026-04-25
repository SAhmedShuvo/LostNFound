"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Mail, ShieldCheck } from "lucide-react";

export default function VerifyOtpPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // ✅ get email from query
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const [resendTimer, setResendTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);

  // ✅ countdown timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // if user opens page without email
  useEffect(() => {
    if (!email) {
      router.push("/register");
    }
  }, [email, router]);

  // ✅ VERIFY OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage({ type: "error", text: "Please enter OTP" });
      return;
    }

    try {
      setIsVerifying(true);
      setMessage(null);

      // 🔴 CONNECT YOUR BACKEND HERE
      const res = await fetch("http://localhost:5000/user/register/verifyOTP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // demo success
      setTimeout(() => {
        router.push("/login"); // after successful verification
      }, 800);
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Invalid OTP" });
    } finally {
      setIsVerifying(false);
    }
  };

  // ✅ RESEND OTP
  const handleResendOtp = async () => {
    try {
      setIsResending(true);
      setMessage(null);

      // 🔴 CONNECT YOUR BACKEND HERE
      await fetch("http://localhost:5000/user/register/resendOTP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      setResendTimer(60);
      setMessage({ type: "success", text: "OTP resent to your email" });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to resend OTP" });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[420px]">
        <h1 className="text-2xl font-semibold mb-2 flex items-center justify-center">
          <ShieldCheck className="w-7 h-7 mr-2 text-green-600" />
          OTP Verification
        </h1>

        <p className="text-sm text-gray-600 mb-5 text-center flex items-center justify-center">
          <Mail className="w-4 h-4 mr-1" />
          {email}
        </p>

        {/* OTP Input */}
        <input
          type="text"
          maxLength={6}
          placeholder="Enter 6 digit OTP"
          className="w-full h-11 border rounded-lg px-3 text-center tracking-widest text-lg focus:ring-2 focus:ring-blue-400"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} // only numbers
        />

        {/* Verify Button */}
        <button
          onClick={handleVerifyOtp}
          disabled={isVerifying}
          className="mt-4 w-full bg-green-500 h-11 text-white rounded-lg hover:bg-green-600 disabled:opacity-60"
        >
          {isVerifying ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Message */}
        {message && (
          <p
            className={`mt-3 text-sm text-center ${
              message.type === "error" ? "text-red-500" : "text-green-600"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* Resend Section */}
        <div className="mt-5 text-center text-sm">
          {resendTimer > 0 ? (
            <p className="text-gray-500">
              Resend OTP in <b>{resendTimer}s</b>
            </p>
          ) : (
            <button
              onClick={handleResendOtp}
              disabled={isResending}
              className="text-blue-600 hover:underline disabled:opacity-60"
            >
              {isResending ? "Sending..." : "Resend OTP"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
