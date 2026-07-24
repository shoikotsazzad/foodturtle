"use client";

import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import PageTitle from "@/components/shared/PageTitle";
import { FileText } from "lucide-react";

const SECTIONS = [
  {
    title: "1. Acceptance of terms",
    body: "By creating an account or placing an order on Food Turtle, you agree to these terms. If you don't agree, the good news is you were never going to receive anything anyway, so no harm done.",
  },
  {
    title: "2. The service",
    body: "Food Turtle is a satirical delivery experience. Every restaurant, shop, product, rider, and order status you see is simulated for entertainment purposes. No real food, groceries, or goods are prepared, purchased, or delivered at any point, ever.",
  },
  {
    title: "3. Orders and payments",
    body: "All checkout flows — cash on delivery, Turtle Pay Wallet, and card — are fully simulated. No real payment is processed, no card details are transmitted anywhere, and no money changes hands. Order totals, discounts, and \"savings\" shown after checkout are for comedic effect only.",
  },
  {
    title: "4. Accounts",
    body: "Signing in only stores a name and email locally in your browser to personalize your experience (favourites, order history, saved address). We don't run a real authentication system, so please don't use a password you use anywhere else — there's nowhere to type one here in the first place.",
  },
  {
    title: "5. Prohibited use",
    body: "Don't use Food Turtle to impersonate a real business, to scrape data for spam, or to convince anyone that an order is actually on its way. The entire premise depends on nobody being deceived past the point of the joke landing.",
  },
  {
    title: "6. Limitation of liability",
    body: "Food Turtle is provided as-is, for laughs. We're not liable for hunger, disappointment, or any dishes you didn't have to wash. Your mileage on \"mood improvement\" may vary.",
  },
  {
    title: "7. Changes to these terms",
    body: "We may update these terms as the app grows. Continued use after a change means you accept the update — much like continued use of Food Turtle means you accept that dinner isn't coming.",
  },
  {
    title: "8. Contact",
    body: "Questions about these terms can go through the Help Center. Questions about your actual dinner should probably go to an app that delivers.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageTitle title="Terms and Conditions · Food Turtle" />
      <Navbar />
      <main className="max-w-3xl mx-auto w-full px-4 py-10 pb-20 sm:pb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-xl bg-turtle-pink-bg flex items-center justify-center shrink-0">
            <FileText size={20} className="text-turtle-pink" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-turtle-dark">Terms and Conditions</h1>
            <p className="text-xs text-turtle-gray-2">Last updated July 2026</p>
          </div>
        </div>
        <p className="text-sm text-turtle-gray-2 mt-4 mb-8">
          Read this before you place an order you already know won&apos;t arrive.
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
