"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

const ADMIN_EMAIL = "admin@foodturtle.com";
const ADMIN_PASSWORD = "turtle@1234";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 600)); // fake delay

    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("ft_admin_session", JSON.stringify({ email, loginAt: Date.now() }));
      router.push("/admin");
    } else {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-turtle-gray flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Image src="/logo.png" alt="Food Turtle" width={140} height={48} className="h-12 w-auto object-contain mb-2" />
          <span className="text-xs text-turtle-gray-2 font-medium tracking-wide uppercase">Admin Panel</span>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-turtle-gray-2 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="admin@foodturtle.com"
              required
              autoFocus
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-turtle-gray-2 block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2.5 pr-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-turtle-gray-2 hover:text-turtle-dark"
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-turtle-pink text-white py-3 rounded-full text-sm font-bold hover:bg-turtle-pink-light transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 p-3 bg-turtle-gray rounded-xl text-center">
          <p className="text-xs text-turtle-gray-2 font-medium mb-1">Demo credentials</p>
          <p className="text-xs text-turtle-dark font-mono">admin@foodturtle.com</p>
          <p className="text-xs text-turtle-dark font-mono">turtle@1234</p>
        </div>
      </div>
    </div>
  );
}
