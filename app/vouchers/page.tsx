"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTitle from "@/components/shared/PageTitle";
import { useVouchers } from "@/lib/hooks";
import { Ticket, Info } from "lucide-react";

export default function VouchersPage() {
  const vouchers = useVouchers();
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied((c) => (c === code ? null : c)), 1500);
  };

  return (
    <>
      <PageTitle title="Vouchers · Food Turtle" />
      <Navbar />
      <main className="max-w-4xl mx-auto w-full px-4 py-6 pb-20 sm:pb-6">
        <h1 className="text-2xl font-bold text-turtle-dark mb-6">Vouchers &amp; offers</h1>

        {vouchers.length === 0 ? (
          <div className="text-center py-20">
            <Ticket size={40} className="text-turtle-gray mx-auto mb-3" />
            <p className="text-sm text-turtle-gray-2">No vouchers available right now.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {vouchers.map((v) => (
              <div
                key={v.id}
                className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-4"
              >
                <div className="w-11 h-11 rounded-full bg-turtle-pink-bg flex items-center justify-center shrink-0">
                  <Ticket size={20} className="text-turtle-pink" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-turtle-dark">
                    {v.discount_type === "percent" ? `${v.discount_value}% off` : `Tk ${v.discount_value} off`}
                  </p>
                  <p className="text-xs text-turtle-gray-2 flex items-center gap-1 mt-0.5">
                    Code: <span className="font-mono font-semibold text-turtle-dark">{v.code}</span>
                    <Info size={11} />
                  </p>
                  <p className="text-xs text-turtle-gray-2 mt-1">
                    Min. order Tk {v.min_order} · Use by {v.expires_at}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(v.code)}
                  className="shrink-0 text-sm font-bold text-turtle-pink border border-turtle-pink rounded-full px-4 py-2 hover:bg-turtle-pink-bg transition-colors"
                >
                  {copied === v.code ? "Copied!" : "Use now"}
                </button>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-turtle-gray-2 mt-6 text-center italic">
          These vouchers apply beautifully at checkout and change absolutely nothing about your total.
        </p>
      </main>
      <Footer />
    </>
  );
}
