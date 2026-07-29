"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useUser } from "@/context/UserContext";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const { login } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError("Please enter your name"); return; }
    if (!email.trim() || !email.includes("@")) { setError("Please enter a valid email"); return; }
    login(name.trim(), email.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-sm sm:rounded-2xl rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="" className="w-10 h-10 object-contain shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-turtle-dark">Sign in</h2>
              <p className="text-xs text-turtle-gray-2 mt-0.5">to Food Turtle</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-turtle-gray rounded-full">
            <X size={18} className="text-turtle-gray-2" />
          </button>
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
  );
}
