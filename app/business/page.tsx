"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import PageTitle from "@/components/shared/PageTitle";
import { Building2, CheckCircle2, Receipt, Clock, Users } from "lucide-react";

const BENEFITS = [
  { icon: Receipt, title: "Expense-report friendly", body: "Every order generates a clean, itemized receipt for reports, even though nothing was actually delivered." },
  { icon: Clock, title: "Zero wait, zero arrival", body: "Team lunches that build anticipation, not appetites. Perfect for meetings that were going to run long anyway." },
  { icon: Users, title: "Bulk ordering", body: "Place one big order for the whole team and watch the same countdown together, in solidarity." },
];

const FAQ = [
  { q: "Can we actually feed our team through this?", a: "No. Food Turtle for Business is exactly as fictional as regular Food Turtle, just with a nicer invoice." },
  { q: "Do you offer corporate accounts?", a: "We offer a form below. Fill it out and we'll follow up, in spirit." },
  { q: "Is there a minimum order size for teams?", a: "None. Order for one person or a hundred, the outcome is identical." },
];

export default function BusinessPage() {
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const companyValid = company.trim().length > 0;
  const contactValid = contact.trim().length > 0;
  const emailValid = /^\S+@\S+\.\S+$/.test(email.trim());
  const teamSizeValid = teamSize.trim().length > 0;
  const formValid = companyValid && contactValid && emailValid && teamSizeValid;

  const handleSubmit = () => {
    if (!formValid) {
      setAttempted(true);
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      <PageTitle title="Food Turtle for Business · Food Turtle" />
      <Navbar />
      <main className="w-full pb-20 sm:pb-6">
        <div className="bg-gradient-to-br from-turtle-dark to-gray-800 px-4 py-14">
          <div className="max-w-2xl mx-auto text-center">
            <Building2 size={36} className="text-turtle-pink mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Food Turtle for Business</h1>
            <p className="text-white/75 text-sm">Corporate ordering that never disrupts your afternoon, because nothing arrives to disrupt it.</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-10">
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
                <p className="font-bold text-turtle-dark mb-1">Thanks, {contact}!</p>
                <p className="text-sm text-turtle-gray-2">
                  We&apos;ve logged {company}&apos;s interest for a team of {teamSize}. No sales rep will reach out, but the enthusiasm has been recorded.
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-bold text-turtle-dark mb-4">Talk to sales</h2>
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Company name"
                      className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none ${
                        attempted && !companyValid ? "border-red-400" : "border-gray-200 focus:border-turtle-pink"
                      }`}
                    />
                    {attempted && !companyValid && <p className="text-xs text-red-500 mt-1">Required</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="Your name"
                      className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none ${
                        attempted && !contactValid ? "border-red-400" : "border-gray-200 focus:border-turtle-pink"
                      }`}
                    />
                    {attempted && !contactValid && <p className="text-xs text-red-500 mt-1">Required</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Work email"
                      className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none ${
                        attempted && !emailValid ? "border-red-400" : "border-gray-200 focus:border-turtle-pink"
                      }`}
                    />
                    {attempted && !emailValid && <p className="text-xs text-red-500 mt-1">Enter a valid email</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      placeholder="Team size (e.g. 25)"
                      className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none ${
                        attempted && !teamSizeValid ? "border-red-400" : "border-gray-200 focus:border-turtle-pink"
                      }`}
                    />
                    {attempted && !teamSizeValid && <p className="text-xs text-red-500 mt-1">Required</p>}
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-turtle-pink text-white py-3 rounded-full text-sm font-bold hover:bg-turtle-pink-light transition-colors"
                  >
                    Request a demo
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
