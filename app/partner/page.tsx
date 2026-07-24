"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import PageTitle from "@/components/shared/PageTitle";
import { Handshake, CheckCircle2, TrendingUp, Users, ShieldCheck } from "lucide-react";

const BENEFITS = [
  { icon: Users, title: "Reach every browser tab", body: "Get discovered by everyone scrolling past on their way to a real delivery app." },
  { icon: TrendingUp, title: "Zero fulfillment pressure", body: "No order ever needs to actually leave your kitchen. Your prep time stays exactly where it is: zero." },
  { icon: ShieldCheck, title: "No commission, ever", body: "We don't take a cut of orders that don't happen. That's a 0% commission rate, guaranteed." },
];

const FAQ = [
  { q: "Do you deliver my actual food?", a: "No. Nothing on Food Turtle is ever delivered, to anyone, ever. That's the whole idea." },
  { q: "Is there a fee to list my restaurant or shop?", a: "No fees. There's also no real listing, but the enthusiasm is genuine." },
  { q: "Can I remove my business later?", a: "Since nothing is a real listing, there's nothing to remove — but reach out through the form below and we'll follow up." },
];

export default function PartnerPage() {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const nameValid = name.trim().length > 0;
  const businessValid = business.trim().length > 0;
  const emailValid = /^\S+@\S+\.\S+$/.test(email.trim());
  const formValid = nameValid && businessValid && emailValid;

  const handleSubmit = () => {
    if (!formValid) {
      setAttempted(true);
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      <PageTitle title="Partner with Us · Food Turtle" />
      <Navbar />
      <main className="w-full pb-20 sm:pb-6">
        <div className="bg-gradient-to-br from-turtle-pink to-turtle-pink-light px-4 py-14">
          <div className="max-w-3xl mx-auto text-center">
            <Handshake size={36} className="text-white mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Partner with Food Turtle</h1>
            <p className="text-white/85 text-sm max-w-lg mx-auto">
              List your restaurant or shop and reach customers who love the idea of food more than the wait.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-white rounded-xl border border-gray-100 p-5">
                <b.icon size={20} className="text-turtle-pink mb-3" />
                <p className="font-bold text-turtle-dark text-sm mb-1">{b.title}</p>
                <p className="text-xs text-turtle-gray-2">{b.body}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 mb-10">
            {submitted ? (
              <div className="text-center py-6">
                <CheckCircle2 size={40} className="text-turtle-green mx-auto mb-3" />
                <p className="font-bold text-turtle-dark mb-1">Thanks, {name}!</p>
                <p className="text-sm text-turtle-gray-2">
                  We&apos;ve noted your interest in listing {business}. Nobody will call you, because we have no
                  sales team, but we appreciate the enthusiasm.
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-bold text-turtle-dark mb-4">Tell us about your business</h2>
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none ${
                        attempted && !nameValid ? "border-red-400" : "border-gray-200 focus:border-turtle-pink"
                      }`}
                    />
                    {attempted && !nameValid && <p className="text-xs text-red-500 mt-1">Required</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                      placeholder="Business name"
                      className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none ${
                        attempted && !businessValid ? "border-red-400" : "border-gray-200 focus:border-turtle-pink"
                      }`}
                    />
                    {attempted && !businessValid && <p className="text-xs text-red-500 mt-1">Required</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none ${
                        attempted && !emailValid ? "border-red-400" : "border-gray-200 focus:border-turtle-pink"
                      }`}
                    />
                    {attempted && !emailValid && <p className="text-xs text-red-500 mt-1">Enter a valid email</p>}
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-turtle-pink text-white py-3 rounded-full text-sm font-bold hover:bg-turtle-pink-light transition-colors"
                  >
                    Submit interest
                  </button>
                </div>
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
