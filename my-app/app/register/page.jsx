"use client";
import {
  IdCard,
  Lock,
  Mail,
  User,
  UserPlus,
  Phone,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AlreadyAuthenticated from "../components/LoggedIn";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // New State
  const [universityId, setUniversityId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Error: Passwords do not match." });
      return;
    }

    // Updated validation check
    if (!fullName || !email || !phone || !password) {
      setMessage({
        type: "error",
        text: "Error: Please fill in all required fields.",
      });
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone, // Added to API body
          universityId,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      router.push(`/register/verify-otp?email=${email}`);
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Registration failed" });
    } finally {
      setIsLoading(false);
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

  return (
    <div className="min-h-screen px-20 flex bg-white font-sans antialiased">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col justify-center items-start px-20">
        <h1 className="text-3xl font-bold mb-2 flex items-center tracking-tight text-gray-900">
          <UserPlus className="w-8 h-8 mr-3 text-blue-600" />
          Register as a new user
        </h1>
        <p className="text-gray-500 mb-8 text-lg">
          Create your account to get started
        </p>

        <form
          onSubmit={handleRegister}
          className="w-full flex flex-col space-y-4"
        >
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              className="pl-11 pr-4 w-full h-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email address"
              className="pl-11 pr-4 w-full h-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone Number Field */}
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              placeholder="Phone Number"
              className="pl-11 pr-4 w-full h-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="pl-11 pr-4 w-full h-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="pl-11 pr-4 w-full h-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 w-40 h-11 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-sm font-medium ${message.type === "error" ? "text-red-500" : "text-green-600"}`}
          >
            {message.text}
          </p>
        )}

        <p className="text-sm text-gray-600 mt-6">
          Already have an account?
          <Link
            href="/login"
            className="text-blue-600 font-bold hover:underline ml-1"
          >
            Sign in here
          </Link>
        </p>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex justify-center items-center">
        <img
          src="/register.jpg"
          alt="Registration Illustration"
          className="max-w-lg transition-transform duration-500 hover:scale-[1.02]"
        />
      </div>
    </div>
  );
}
