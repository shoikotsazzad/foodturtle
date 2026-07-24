"use client";

import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import PageTitle from "@/components/shared/PageTitle";
import { Shield } from "lucide-react";

const SECTIONS = [
  {
    title: "Information we collect",
    body: "When you sign in, we store your name, email, and phone number in your browser's local storage so your profile, favourites, and order history persist between visits. We don't run this through a real server-side account system.",
  },
  {
    title: "Order and cart data",
    body: "Items you add to cart, addresses you save, and orders you \"place\" are stored locally in your browser. Because nothing is actually fulfilled, there's no shipping or payment data to hand off to a courier or payment processor.",
  },
  {
    title: "Analytics",
    body: "We track basic, anonymous usage data (page views, an anonymous visitor ID, roughly how many people are browsing at once, and how many fake orders and signups happen) to understand how the app is used and to keep the admin dashboard honest. This data isn't tied to your name or email, and no advertising profile is built from it.",
  },
  {
    title: "Cookies and local storage",
    body: "We use your browser's local storage (not third-party tracking cookies) to remember your language preference, cart, and login state. Clearing your browser data resets all of it.",
  },
  {
    title: "Third-party services",
    body: "Restaurant, menu, and voucher data is served from Firebase (Google Cloud). Firebase's own privacy practices apply to that infrastructure; no personal data is sold or shared with advertisers.",
  },
  {
    title: "Your rights",
    body: "You can delete your account and all locally stored data at any time from Profile → Account Management → Delete my account. Since nothing lives on our servers tied to you personally, that's effectively a full deletion.",
  },
  {
    title: "Changes to this policy",
    body: "If this policy changes, we'll update this page. We won't email you about it, because we don't have a real notification system, only the honesty to keep this page current.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageTitle title="Privacy Policy · Food Turtle" />
      <Navbar />
      <main className="max-w-3xl mx-auto w-full px-4 py-10 pb-20 sm:pb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-xl bg-turtle-pink-bg flex items-center justify-center shrink-0">
            <Shield size={20} className="text-turtle-pink" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-turtle-dark">Privacy Policy</h1>
            <p className="text-xs text-turtle-gray-2">Last updated July 2026</p>
          </div>
        </div>
        <p className="text-sm text-turtle-gray-2 mt-4 mb-8">
          Short version: we keep very little, and what we keep never leaves your browser.
        </p>

        <div className="space-y-6">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="font-bold text-turtle-dark mb-1.5">{s.title}</h2>
              <p className="text-sm text-turtle-gray-2 leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
