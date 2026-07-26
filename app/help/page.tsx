"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTitle from "@/components/shared/PageTitle";
import { Search, Crown, User, ChevronRight, ChevronDown, Mail, Send, CheckCircle2 } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Where does my order actually go?",
    answer:
      "Nowhere in particular. Once you place an order it enters a holding pattern between the restaurant and your address, kept aloft entirely by vibes. The tracking screen is real; the progress is not. Rahim Vai is doing his best.",
  },
  {
    question: "Why does \"Place Order\" seem to do nothing?",
    answer:
      "Because it did exactly what it was built to do: play a satisfying animation and stop there. No kitchen was notified, no rider was dispatched. That button is decorative, and we think it's very well designed.",
  },
  {
    question: "I sent a support request. What happens to it?",
    answer:
      "It gets filed, carefully and permanently, into a folder nobody opens. Our support team is Rahim Vai, and he is currently tying his shoelaces. Both of them. Slowly. Thank you for your patience, which you will need indefinitely.",
  },
];

const HELP_LINKS = [
  { icon: Crown, label: "Turtle Pro", href: "/turtle-pro" },
  { icon: User, label: "My account", href: "/profile" },
];

const SUPPORT_EMAIL = "foodturtle@gmail.com";

export default function HelpPage() {
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const filteredFaq = FAQ_ITEMS.filter((f) => f.question.toLowerCase().includes(query.toLowerCase()));
  const filteredLinks = HELP_LINKS.filter((l) => l.label.toLowerCase().includes(query.toLowerCase()));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Help request from ${name || "a Food Turtle user"}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <>
      <PageTitle title="Help Center · Food Turtle" />
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
            Note: if you&apos;re trying to search for anything related to your ongoing orders, use the questions below.
          </p>
        </div>

        {/* FAQ accordion */}
        {filteredFaq.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100 overflow-hidden mb-4">
            {filteredFaq.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={item.question}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-turtle-gray transition-colors text-left"
                  >
                    <span className="text-sm text-turtle-dark font-medium flex-1">{item.question}</span>
                    <ChevronDown
                      size={16}
                      className={`text-turtle-gray-2 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 -mt-1 animate-fade-in">
                      <p className="text-sm text-turtle-gray-2 leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Remaining help links */}
        {filteredLinks.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100 overflow-hidden mb-6">
            {filteredLinks.map(({ icon: Icon, label, href }) => (
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
        )}

        {/* Contact form */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-1">
            <Mail size={18} className="text-turtle-pink" />
            <p className="font-bold text-turtle-dark">Still stuck? Email us</p>
          </div>
          <p className="text-xs text-turtle-gray-2 mb-4">
            Send a message to {SUPPORT_EMAIL} and Rahim Vai will get to it, eventually.
          </p>

          {sent ? (
            <div className="flex items-center gap-2 text-turtle-green bg-green-50 rounded-lg p-3">
              <CheckCircle2 size={18} className="shrink-0" />
              <p className="text-sm font-medium">
                Opening your email app now. If nothing happened, email us directly at {SUPPORT_EMAIL}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-turtle-pink"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-turtle-pink"
              />
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What do you need help with?"
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-turtle-pink resize-none h-24"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 bg-turtle-pink text-white py-3 rounded-full text-sm font-bold hover:bg-turtle-pink-light transition-colors"
              >
                <Send size={16} />
                Send message
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
