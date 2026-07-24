"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import PageTitle from "@/components/shared/PageTitle";
import { Utensils, Search, Calendar, CheckCircle2 } from "lucide-react";

const STEPS = [
  { title: "Search a restaurant", body: "Pick a place, a party size, and a time that works for you." },
  { title: "Reserve your table", body: "We hold the table. No queue, no waiting at the door." },
  { title: "Show up and eat", body: "The only step in Food Turtle that involves food actually arriving." },
];

const FAQ = [
  { q: "Is this different from delivery?", a: "Completely. Dine-in is the one part of Food Turtle where the food is real, because you're the one picking it up in person, from the restaurant, with your own hands." },
  { q: "Can I still order it here and never get it?", a: "That's the delivery and pickup tabs. Dine-in is our one honest feature." },
  { q: "Is reservation free?", a: "Yes, reserving a table costs nothing." },
];

export default function DineInPage() {
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [notified, setNotified] = useState(false);

  const emailValid = /^\S+@\S+\.\S+$/.test(email.trim());

  const handleNotify = () => {
    if (!emailValid) {
      setAttempted(true);
      return;
    }
    setNotified(true);
  };

  return (
    <>
      <PageTitle title="Dine-in · Food Turtle" />
      <Navbar />
      <main className="w-full pb-20 sm:pb-6">
        <div className="bg-gradient-to-br from-turtle-dark to-gray-800 px-4 py-14">
          <div className="max-w-2xl mx-auto text-center">
            <Utensils size={36} className="text-turtle-pink mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Dine-in</h1>
            <p className="text-white/75 text-sm">
              Reserve a table and eat at the restaurant. Yes, this is the one feature where food actually shows up.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-10 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-turtle-gray-2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Restaurant or area"
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-turtle-pink"
              />
            </div>
            <button className="bg-turtle-pink text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-turtle-pink-light transition-colors flex items-center justify-center gap-1.5 shrink-0">
              <Calendar size={15} /> Find a table
            </button>
          </div>
          {query && (
            <p className="text-xs text-turtle-gray-2 -mt-8 mb-10">
              Reservations for &quot;{query}&quot; aren&apos;t live yet, leave your email below and we&apos;ll let you know when they are.
            </p>
          )}

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {STEPS.map((s, i) => (
              <div key={s.title} className="bg-white rounded-xl border border-gray-100 p-5">
                <span className="w-7 h-7 rounded-full bg-turtle-pink-bg text-turtle-pink text-sm font-bold flex items-center justify-center mb-3">
                  {i + 1}
                </span>
                <p className="font-bold text-turtle-dark text-sm mb-1">{s.title}</p>
                <p className="text-xs text-turtle-gray-2">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="bg-turtle-pink-bg rounded-xl p-5 mb-10">
            {notified ? (
              <div className="flex items-center gap-3">
                <CheckCircle2 size={22} className="text-turtle-green shrink-0" />
                <p className="text-sm font-semibold text-turtle-dark">You&apos;re on the list, we&apos;ll email you when table reservations open up.</p>
              </div>
            ) : (
              <>
                <p className="font-bold text-turtle-dark text-sm mb-1">Get notified when reservations open</p>
                <p className="text-xs text-turtle-gray-2 mb-3">We&apos;ll only email you about this. Probably.</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`flex-1 px-3 py-2.5 text-sm border rounded-lg focus:outline-none ${
                      attempted && !emailValid ? "border-red-400" : "border-gray-200 focus:border-turtle-pink"
                    }`}
                  />
                  <button
                    onClick={handleNotify}
                    className="bg-turtle-pink text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-turtle-pink-light transition-colors shrink-0"
                  >
                    Notify me
                  </button>
                </div>
                {attempted && !emailValid && <p className="text-xs text-red-500 mt-1">Enter a valid email</p>}
              </>
            )}
          </div>

          <h2 className="text-lg font-bold text-turtle-dark mb-4">Frequently asked questions</h2>
          <div className="space-y-2">
            {FAQ.map((f) => (
              <div key={f.q} className="border border-gray-100 rounded-xl bg-white p-4">
                <p className="font-semibold text-turtle-dark text-sm mb-1">{f.q}</p>
                <p className="text-sm text-turtle-gray-2">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
