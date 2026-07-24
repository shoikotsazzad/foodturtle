"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import PageTitle from "@/components/shared/PageTitle";
import { ChevronLeft, Wallet, CreditCard } from "lucide-react";

const PLANS = [
  { key: "1m", label: "1 month plan", price: 99, billed: "Tk 99 billed every month" },
  { key: "6m", label: "6 month plan", price: 499, billed: "Tk 499 billed every 6 months" },
  { key: "12m", label: "12 month plan", price: 599, billed: "Tk 599 billed every 12 months" },
];

function PaymentForm() {
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan") === "6m" ? "6m" : searchParams.get("plan") === "12m" ? "12m" : "1m";
  const [planKey, setPlanKey] = useState(initialPlan);
  const [method, setMethod] = useState<"wallet" | "card">("wallet");
  const [accepted, setAccepted] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const plan = PLANS.find((p) => p.key === planKey)!;

  if (confirmed) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <img src="/logo.png" alt="Food Turtle" className="w-24 h-24 object-contain mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-turtle-dark mb-2">You&apos;re a Turtle Pro member!</h1>
        <p className="text-sm text-turtle-gray-2 mb-1">Your free deliveries begin the moment your first order arrives.</p>
        <p className="text-sm text-turtle-gray-2 mb-8">So — never. But hey, unlimited 0% of nothing is still unlimited.</p>
        <Link
          href="/"
          className="inline-block bg-turtle-pink text-white font-bold px-6 py-3 rounded-full hover:bg-turtle-pink-light transition-colors"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/turtle-pro" className="inline-flex items-center gap-1 text-sm font-semibold text-turtle-dark mb-4 hover:text-turtle-pink">
        <ChevronLeft size={16} /> Back
      </Link>
      <h1 className="text-3xl font-extrabold text-turtle-dark mb-1">Complete your payment</h1>
      <p className="text-turtle-gray-2 mb-8">You&apos;re one step closer!</p>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="font-bold text-turtle-dark mb-3">Choose a plan for renewal</p>
            <div className="space-y-2">
              {PLANS.map((p) => (
                <label
                  key={p.key}
                  className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition-colors ${
                    planKey === p.key ? "border-turtle-pink" : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    checked={planKey === p.key}
                    onChange={() => setPlanKey(p.key)}
                    className="accent-turtle-pink"
                  />
                  <div>
                    <p className="font-semibold text-turtle-dark text-sm">{p.label}</p>
                    <p className="text-xs text-turtle-gray-2">{p.billed}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="font-bold text-turtle-dark mb-3">Payment method</p>
            <div className="space-y-2">
              <label className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition-colors ${method === "wallet" ? "border-turtle-pink" : "border-gray-200"}`}>
                <input type="radio" name="method" checked={method === "wallet"} onChange={() => setMethod("wallet")} className="accent-turtle-pink" />
                <Wallet size={18} className="text-turtle-pink" />
                <span className="text-sm text-turtle-dark">Turtle Pay Wallet</span>
              </label>
              <label className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition-colors ${method === "card" ? "border-turtle-pink" : "border-gray-200"}`}>
                <input type="radio" name="method" checked={method === "card"} onChange={() => setMethod("card")} className="accent-turtle-pink" />
                <CreditCard size={18} className="text-turtle-dark" />
                <span className="text-sm text-turtle-dark">Credit or debit card</span>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5 h-fit sticky top-24">
          <p className="font-bold text-turtle-dark mb-3">Review your plan</p>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-turtle-dark font-medium">Turtle Pro — {plan.label}</span>
          </div>
          <p className="text-xs text-turtle-gray-2 mb-4">{plan.billed}</p>
          <div className="border-t border-gray-100 pt-3 flex items-center justify-between mb-4">
            <span className="font-bold text-turtle-dark">Total</span>
            <span className="font-bold text-turtle-dark">Tk {plan.price}</span>
          </div>
          <label className="flex items-start gap-2 mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="accent-turtle-pink mt-0.5"
            />
            <span className="text-xs text-turtle-gray-2">
              I accept Turtle Pro terms and conditions. A Tk 5 verification hold may apply and is refunded within 7-10 days. Cancel anytime.
            </span>
          </label>
          <button
            onClick={() => setConfirmed(true)}
            disabled={!accepted}
            className={`w-full py-3 rounded-full text-sm font-bold transition-colors ${
              accepted ? "bg-turtle-pink text-white hover:bg-turtle-pink-light" : "bg-gray-200 text-turtle-gray-2 cursor-not-allowed"
            }`}
          >
            Confirm to subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TurtleProPaymentPage() {
  return (
    <>
      <PageTitle title="Complete your payment — Turtle Pro" />
      <Navbar />
      <main className="w-full pb-20 sm:pb-6">
        <Suspense fallback={null}>
          <PaymentForm />
        </Suspense>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
