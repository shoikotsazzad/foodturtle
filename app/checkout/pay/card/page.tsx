"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import PageTitle from "@/components/shared/PageTitle";
import { useCart } from "@/context/CartContext";
import { getPendingOrder, finalizePendingOrder, type PendingOrder } from "@/lib/orders";
import { ChevronLeft, CreditCard, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";

type Step = "form" | "processing" | "success";

function formatCardNumber(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function CardPaymentPage() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [pending, setPending] = useState<PendingOrder | null>(null);
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const p = getPendingOrder();
    if (!p || p.paymentMethod !== "card") {
      router.replace("/checkout");
      return;
    }
    setPending(p);
  }, [router]);

  const nameValid = name.trim().length > 1;
  const cardDigits = cardNumber.replace(/\D/g, "");
  const cardValid = cardDigits.length === 16;
  const expiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry);
  const cvvValid = cvv.length === 3;
  const formValid = nameValid && cardValid && expiryValid && cvvValid;

  const handlePay = () => {
    if (!formValid) {
      setAttempted(true);
      return;
    }
    setStep("processing");
    setTimeout(() => {
      const order = finalizePendingOrder(clearCart);
      setOrderId(order?.id || "");
      setStep("success");
    }, 1700);
  };

  if (!pending) return null;

  return (
    <>
      <PageTitle title="Pay by card · Food Turtle" />
      <Navbar />
      <main className="w-full pb-20 sm:pb-6">
        <div className="max-w-md mx-auto px-4 py-10">
          {step === "form" && (
            <Link
              href="/checkout"
              className="inline-flex items-center gap-1 text-sm font-semibold text-turtle-dark mb-6 hover:text-turtle-pink"
            >
              <ChevronLeft size={16} /> Back to checkout
            </Link>
          )}

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-full bg-turtle-pink-bg flex items-center justify-center shrink-0">
                <CreditCard size={20} className="text-turtle-pink" />
              </div>
              <div>
                <p className="font-bold text-turtle-dark">Pay by card</p>
                <p className="text-xs text-turtle-gray-2">Simulated payment, nothing is actually charged</p>
              </div>
            </div>

            <div className="border-t border-gray-100 my-4" />

            {step === "form" && (
              <div className="space-y-3">
                <p className="text-xs text-turtle-gray-2 -mt-1 mb-1">
                  You&apos;ll pay <span className="font-semibold text-turtle-dark">Tk {pending.grandTotal}</span> to Food Turtle
                </p>
                <div>
                  <label className="text-xs font-medium text-turtle-gray-2 block mb-1">Cardholder name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name on card"
                    className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none ${
                      attempted && !nameValid ? "border-red-400" : "border-gray-200 focus:border-turtle-pink"
                    }`}
                  />
                  {attempted && !nameValid && <p className="text-xs text-red-500 mt-1">Required</p>}
                </div>
                <div>
                  <label className="text-xs font-medium text-turtle-gray-2 block mb-1">Card number</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none tracking-wide ${
                      attempted && !cardValid ? "border-red-400" : "border-gray-200 focus:border-turtle-pink"
                    }`}
                  />
                  {attempted && !cardValid && <p className="text-xs text-red-500 mt-1">Enter a 16-digit card number</p>}
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs font-medium text-turtle-gray-2 block mb-1">Expiry</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      placeholder="MM/YY"
                      className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none ${
                        attempted && !expiryValid ? "border-red-400" : "border-gray-200 focus:border-turtle-pink"
                      }`}
                    />
                    {attempted && !expiryValid && <p className="text-xs text-red-500 mt-1">MM/YY</p>}
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-medium text-turtle-gray-2 block mb-1">CVV</label>
                    <input
                      type="password"
                      inputMode="numeric"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                      placeholder="123"
                      className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none ${
                        attempted && !cvvValid ? "border-red-400" : "border-gray-200 focus:border-turtle-pink"
                      }`}
                    />
                    {attempted && !cvvValid && <p className="text-xs text-red-500 mt-1">3 digits</p>}
                  </div>
                </div>
                <button
                  onClick={handlePay}
                  className="w-full bg-turtle-pink text-white py-3 rounded-full text-sm font-bold mt-2 hover:bg-turtle-pink-light transition-colors"
                >
                  Pay Tk {pending.grandTotal}
                </button>
                <div className="flex items-center gap-1.5 justify-center mt-1 text-turtle-gray-2">
                  <ShieldCheck size={12} />
                  <span className="text-[11px]">Simulated payment, no real card data is sent anywhere</span>
                </div>
              </div>
            )}

            {step === "processing" && (
              <div className="py-10 text-center">
                <Loader2 size={36} className="animate-spin text-turtle-pink mx-auto mb-4" />
                <p className="text-sm font-semibold text-turtle-dark">Processing your payment...</p>
                <p className="text-xs text-turtle-gray-2 mt-1">Please don&apos;t close this window</p>
              </div>
            )}

            {step === "success" && (
              <div className="py-6 text-center">
                <CheckCircle2 size={48} className="text-turtle-green mx-auto mb-4" />
                <p className="text-lg font-bold text-turtle-dark mb-1">Payment successful</p>
                <p className="text-sm text-turtle-gray-2 mb-1">Tk {pending.grandTotal} paid by card ending in {cardDigits.slice(-4)}</p>
                <p className="text-xs text-turtle-gray-2 mb-6">Order {orderId}</p>
                <button
                  onClick={() => router.replace("/order-placed")}
                  className="w-full bg-turtle-pink text-white py-3 rounded-full text-sm font-bold hover:bg-turtle-pink-light transition-colors"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
