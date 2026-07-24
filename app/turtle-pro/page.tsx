"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import PageTitle from "@/components/shared/PageTitle";
import { ChevronDown, Bike, Percent, ShoppingBag as ShoppingBagIcon } from "lucide-react";

const PERKS = [
  {
    icon: Bike,
    title: "Free delivery",
    tag: "Unlimited free deliveries up to Tk. 40",
    detail: "Unlimited free delivery for all restaurant orders above Tk 350 and Turtlemart & Shops orders above Tk 999.",
  },
  {
    icon: Percent,
    title: "20% off restaurants",
    tag: "Unlimited",
    detail: "Up to 20% off at selected restaurants with varying minimum spend. Not valid with other promo discounts.",
  },
  {
    icon: Percent,
    title: "20% off groceries",
    tag: "Unlimited",
    detail: "Up to 20% off selected Turtlemart grocery items.",
  },
  {
    icon: ShoppingBagIcon,
    title: "35% off pick-up orders",
    tag: "Unlimited",
    detail: "Up to 35% off pick-up at selected restaurants with varying minimum spends.",
  },
];

const PLANS = [
  { key: "1m", label: "1 month", perMonth: 99, billed: "Tk 99 billed every month" },
  { key: "6m", label: "6 months", perMonth: 83, billed: "Tk 499 billed every 6 months" },
  { key: "12m", label: "12 months", perMonth: 50, billed: "Tk 599 billed every 12 months", best: true },
];

const FAQ = [
  { q: "What is Turtle Pro?", a: "Turtle Pro is a subscription plan that offers exclusive deals like free delivery and discounts on food, groceries, and more, for as long as an order never actually arrives." },
  { q: "How do I use my Turtle Pro perks?", a: "Once you're a Pro, your perks are added to your account automatically. Free delivery is applied at checkout, and other vouchers can be selected there too." },
  { q: "When can I enjoy my Turtle Pro perks?", a: "As soon as you subscribe. Just make sure you meet the minimum spend where required." },
  { q: "What are surprise perks?", a: "Occasional bonus discounts we drop on Pro members. No surprises about the delivery time though, that part stays exactly as slow as ever." },
];

export default function TurtleProPage() {
  const router = useRouter();
  const [openPerk, setOpenPerk] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PageTitle title="Turtle Pro · Food Turtle" />
      <Navbar />
      <main className="w-full pb-20 sm:pb-6">
        {/* Hero */}
        <div className="bg-gradient-to-br from-purple-700 to-purple-500 px-4 py-14">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <img src="/logo.png" alt="" className="w-16 h-16 object-contain mb-4 rounded-xl bg-white/10 p-2" />
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-1">Unlimited free delivery</h1>
              <p className="text-white/80 text-sm">No hidden charges. Unsubscribe anytime.</p>
            </div>
            <button
              onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}
              className="shrink-0 bg-white text-turtle-pink font-bold px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
            >
              Choose your plan
            </button>
          </div>
        </div>

        {/* Monthly perks */}
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-xl font-bold text-turtle-dark mb-4">Monthly perks</h2>
          <div className="space-y-2">
            {PERKS.map((p, i) => (
              <div key={p.title} className="border border-gray-100 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setOpenPerk(openPerk === i ? null : i)}
                  className="w-full flex items-center gap-3 p-4 text-left"
                >
                  <p.icon size={20} className="text-turtle-pink shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-turtle-dark text-sm">{p.title}</p>
                    <span className="inline-block text-[11px] bg-turtle-gray text-turtle-gray-2 px-2 py-0.5 rounded-full mt-0.5">
                      {p.tag}
                    </span>
                  </div>
                  <ChevronDown size={16} className={`text-turtle-gray-2 shrink-0 transition-transform ${openPerk === i ? "rotate-180" : ""}`} />
                </button>
                {openPerk === i && (
                  <p className="px-4 pb-4 text-sm text-turtle-gray-2">{p.detail}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div id="plans" className="max-w-3xl mx-auto px-4 py-8 scroll-mt-24">
          <h2 className="text-xl font-bold text-turtle-dark mb-4">Choose your plan</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {PLANS.map((plan) => (
              <div key={plan.key} className="border border-gray-100 rounded-xl p-5 bg-white flex flex-col">
                <p className="font-bold text-turtle-dark mb-1">{plan.label}</p>
                <p className="text-2xl font-extrabold text-turtle-dark mb-1">
                  Tk {plan.perMonth}<span className="text-sm font-normal text-turtle-gray-2">/mo.</span>
                </p>
                <p className="text-xs text-turtle-gray-2 mb-4 flex-1">{plan.billed}</p>
                <button
                  onClick={() => router.push(`/turtle-pro/payment?plan=${plan.key}`)}
                  className="w-full bg-turtle-pink text-white font-bold py-2.5 rounded-full text-sm hover:bg-turtle-pink-light transition-colors"
                >
                  Select plan
                </button>
              </div>
            ))}
          </div>
          <div className="bg-turtle-pink-bg rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">🏷️</span>
            <div>
              <p className="font-bold text-turtle-dark text-sm">Subscribe now and save 40%</p>
              <p className="text-xs text-turtle-gray-2">Promotion ends Jul 31, 2026. This pricing continues to apply on renewal.</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-xl font-bold text-turtle-dark mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {FAQ.map((f, i) => (
              <div key={f.q} className="border border-gray-100 rounded-xl bg-white overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-semibold text-turtle-dark text-sm">{f.q}</span>
                  <ChevronDown size={16} className={`text-turtle-gray-2 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && <p className="px-4 pb-4 text-sm text-turtle-gray-2">{f.a}</p>}
              </div>
            ))}
          </div>
          <p className="text-xs text-turtle-gray-2 mt-4">
            I accept Turtle Pro terms and conditions. A Tk 5 verification hold may apply and is refunded within 7-10 days. Cancel anytime.
          </p>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
