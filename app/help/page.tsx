"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import PageTitle from "@/components/shared/PageTitle";
import { Search, ShoppingBag, Package2, MessageSquare, Crown, User, ChevronRight } from "lucide-react";

const TOPICS = [
  { icon: Package2, label: "Get help with my order", href: "/orders" },
  { icon: ShoppingBag, label: "I'm having trouble placing an order", href: "/" },
  { icon: MessageSquare, label: "My support requests", href: "/help" },
  { icon: Crown, label: "Turtle Pro", href: "/turtle-pro" },
  { icon: User, label: "My account", href: "/profile" },
];

export default function HelpPage() {
  const [query, setQuery] = useState("");

  return (
    <>
      <PageTitle title="Help Center — Food Turtle" />
      <Navbar />
      <main className="max-w-2xl mx-auto w-full px-4 py-6 pb-20 sm:pb-6">
        <div className="bg-turtle-pink rounded-2xl p-6 mb-6">
          <p className="text-white font-bold text-lg mb-3">How can we help?</p>
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-turtle-gray-2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Press enter to search (Eg: "Account")'
              className="w-full pl-10 pr-4 py-3 rounded-full text-sm focus:outline-none"
            />
          </div>
          <p className="text-xs text-white/85 mt-3">
            Note: if you&apos;re trying to search for anything related to your ongoing orders, use &quot;Get help with my order&quot; below.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100 overflow-hidden">
          {TOPICS.filter((tpc) => tpc.label.toLowerCase().includes(query.toLowerCase())).map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-3 px-4 py-3.5 hover:bg-turtle-gray transition-colors"
            >
              <Icon size={18} className="text-turtle-gray-2 shrink-0" />
              <span className="text-sm text-turtle-dark flex-1">{label}</span>
              <ChevronRight size={16} className="text-turtle-gray-2 shrink-0" />
            </a>
          ))}
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
