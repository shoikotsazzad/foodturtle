"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useUser } from "@/context/UserContext";
import PageTitle from "@/components/shared/PageTitle";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError("Please enter your name"); return; }
    if (!email.trim() || !email.includes("@")) { setError("Please enter a valid email"); return; }
    login(name.trim(), email.trim());
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-turtle-gray flex items-center justify-center px-4 py-10">
      <PageTitle title="Sign in · Food Turtle" />
      <div className="w-full max-w-sm">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-turtle-gray-2 hover:text-turtle-dark mb-4">
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-5">
            <img src="/logo.png" alt="" className="w-10 h-10 object-contain shrink-0" />
            <div>
              <h1 className="text-lg font-bold text-turtle-dark">Sign in</h1>
              <p className="text-xs text-turtle-gray-2 mt-0.5">to Food Turtle</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs font-medium text-turtle-gray-2 block mb-1">Your name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(""); }}
                placeholder="e.g. Rahim"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink"
                autoFocus
              />
            </div>
            <div>
              <label className="text-xs font-medium text-turtle-gray-2 block mb-1">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="your@email.com"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink"
              />
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-turtle-pink text-white py-3 rounded-full text-sm font-bold hover:bg-turtle-pink-light transition-colors"
            >
              Sign In
            </button>
          </form>

          <p className="text-[11px] text-turtle-gray-2 text-center mt-4 leading-relaxed">
            By continuing, you agree that your food will never arrive.
          </p>
        </div>
      </div>
    </div>
  );
}
