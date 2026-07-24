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
import { ChevronLeft, Wallet, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";

type Step = "phone" | "pin" | "processing" | "success";

export default function WalletPaymentPage() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [pending, setPending] = useState<PendingOrder | null>(null);
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const p = getPendingOrder();
    if (!p || p.paymentMethod !== "wallet") {
      router.replace("/checkout");
      return;
    }
    setPending(p);
  }, [router]);

  const phoneValid = /^01\d{9}$/.test(phone);
  const pinValid = pin.length === 5;

  const handlePhoneNext = () => {
    if (!phoneValid) {
      setAttempted(true);
      return;
    }
    setAttempted(false);
    setStep("pin");
  };

  const handlePinConfirm = () => {
    if (!pinValid) {
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
      <PageTitle title="Turtle Pay Wallet · Food Turtle" />
      <Navbar />
      <main className="w-full pb-20 sm:pb-6">
        <div className="max-w-md mx-auto px-4 py-10">
          {(step === "phone" || step === "pin") && (
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
                <Wallet size={20} className="text-turtle-pink" />
              </div>
              <div>
                <p className="font-bold text-turtle-dark">Turtle Pay Wallet</p>
                <p className="text-xs text-turtle-gray-2">Simulated payment, nothing is actually charged</p>
              </div>
            </div>

            <div className="border-t border-gray-100 my-4" />

            {step === "phone" && (
              <>
                <p className="text-sm font-semibold text-turtle-dark mb-1">Enter your wallet number</p>
                <p className="text-xs text-turtle-gray-2 mb-4">You&apos;ll pay Tk {pending.grandTotal} to Food Turtle</p>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                  placeholder="01XXXXXXXXX"
                  className={`w-full px-4 py-3 text-sm border rounded-lg focus:outline-none tracking-wide ${
                    attempted && !phoneValid ? "border-red-400" : "border-gray-200 focus:border-turtle-pink"
                  }`}
                  autoFocus
                />
                {attempted && !phoneValid && (
                  <p className="text-xs text-red-500 mt-1">Enter a valid 11-digit wallet number (e.g. 01812345678)</p>
                )}
                <button
                  onClick={handlePhoneNext}
                  className="w-full bg-turtle-pink text-white py-3 rounded-full text-sm font-bold mt-5 hover:bg-turtle-pink-light transition-colors"
                >
                  Next
                </button>
              </>
            )}

            {step === "pin" && (
              <>
                <p className="text-sm font-semibold text-turtle-dark mb-1">Enter your PIN</p>
                <p className="text-xs text-turtle-gray-2 mb-4">
                  For {phone} · this is a fake PIN, any 5 digits work
                </p>
                <input
                  type="password"
                  inputMode="numeric"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  placeholder="•••••"
                  className={`w-full px-4 py-3 text-center text-2xl tracking-[0.6em] border rounded-lg focus:outline-none ${
                    attempted && !pinValid ? "border-red-400" : "border-gray-200 focus:border-turtle-pink"
                  }`}
                  autoFocus
                />
                {attempted && !pinValid && (
                  <p className="text-xs text-red-500 mt-1 text-center">Enter your 5-digit PIN</p>
                )}
                <button
                  onClick={handlePinConfirm}
                  className="w-full bg-turtle-pink text-white py-3 rounded-full text-sm font-bold mt-5 hover:bg-turtle-pink-light transition-colors"
                >
                  Confirm payment · Tk {pending.grandTotal}
                </button>
                <div className="flex items-center gap-1.5 justify-center mt-3 text-turtle-gray-2">
                  <ShieldCheck size={12} />
                  <span className="text-[11px]">Simulated payment, no real money moves</span>
                </div>
              </>
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
                <p className="text-sm text-turtle-gray-2 mb-1">Tk {pending.grandTotal} paid via Turtle Pay Wallet</p>
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
