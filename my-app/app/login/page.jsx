"use client";
import { Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AlreadyAuthenticated from "../components/LoggedIn";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Login failed");
        return;
      }

      const { data } = result;
      localStorage.setItem("accessToken", data.access.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
        }),
      );

      if (data.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong!");
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
    // Added a cleaner font-family and slightly better padding
    <div className="min-h-screen px-20 flex bg-white font-sans antialiased">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col justify-center items-start px-20">
        <h1 className="text-3xl font-bold mb-2 tracking-tight text-gray-900">
          Welcome to Cou Lost & Found
        </h1>
        <p className="text-gray-500 mb-8 text-lg">Sign into your account</p>

        <form onSubmit={handleLogin} className="w-full flex flex-col space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email address"
              className="pl-11 pr-4 w-full h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="pl-11 pr-4 w-full h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
              "Sign In"
            )}
          </button>
        </form>

        <Link
          href="/forgot-password"
          className="text-blue-600 mt-4 text-sm font-medium hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex justify-center items-center">
        <img
          src="/login.jpg"
          alt="Login Hero"
          className="max-w-lg transition-transform duration-500 hover:scale-[1.02]"
        />
      </div>
    </div>
  );
}
