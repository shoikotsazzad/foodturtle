"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import PageTitle from "@/components/shared/PageTitle";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { getPendingOrder, finalizePendingOrder, type PendingOrder } from "@/lib/orders";
import { ChevronLeft, Wallet, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";

type Step = "phone" | "pin" | "processing" | "success";

export default function WalletPaymentPage() {
  const router = useRouter();
  const { t } = useLanguage();
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
              <ChevronLeft size={16} /> {t("pay_back_to_checkout")}
            </Link>
          )}

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-full bg-turtle-pink-bg flex items-center justify-center shrink-0">
                <Wallet size={20} className="text-turtle-pink" />
              </div>
              <div>
                <p className="font-bold text-turtle-dark">{t("pay_wallet_heading")}</p>
                <p className="text-xs text-turtle-gray-2">{t("pay_simulated_note")}</p>
              </div>
            </div>

            <div className="border-t border-gray-100 my-4" />

            {step === "phone" && (
              <>
                <p className="text-sm font-semibold text-turtle-dark mb-1">{t("pay_enter_wallet_number")}</p>
                <p className="text-xs text-turtle-gray-2 mb-4">{t("pay_will_pay", { amount: `Tk ${pending.grandTotal}` })}</p>
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
                  <p className="text-xs text-red-500 mt-1">{t("pay_wallet_number_invalid")}</p>
                )}
                <button
                  onClick={handlePhoneNext}
                  className="w-full bg-turtle-pink text-white py-3 rounded-full text-sm font-bold mt-5 hover:bg-turtle-pink-light transition-colors"
                >
                  {t("pay_next")}
                </button>
              </>
            )}

            {step === "pin" && (
              <>
                <p className="text-sm font-semibold text-turtle-dark mb-1">{t("pay_enter_pin")}</p>
                <p className="text-xs text-turtle-gray-2 mb-4">
                  {t("pay_pin_for", { phone })}
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
                  <p className="text-xs text-red-500 mt-1 text-center">{t("pay_pin_invalid")}</p>
                )}
                <button
                  onClick={handlePinConfirm}
                  className="w-full bg-turtle-pink text-white py-3 rounded-full text-sm font-bold mt-5 hover:bg-turtle-pink-light transition-colors"
                >
                  {t("pay_confirm_amount", { amount: `Tk ${pending.grandTotal}` })}
                </button>
                <div className="flex items-center gap-1.5 justify-center mt-3 text-turtle-gray-2">
                  <ShieldCheck size={12} />
                  <span className="text-[11px]">{t("pay_wallet_no_money_note")}</span>
                </div>
              </>
            )}

            {step === "processing" && (
              <div className="py-10 text-center">
                <Loader2 size={36} className="animate-spin text-turtle-pink mx-auto mb-4" />
                <p className="text-sm font-semibold text-turtle-dark">{t("pay_processing")}</p>
                <p className="text-xs text-turtle-gray-2 mt-1">{t("pay_dont_close")}</p>
              </div>
            )}

            {step === "success" && (
              <div className="py-6 text-center">
                <CheckCircle2 size={48} className="text-turtle-green mx-auto mb-4" />
                <p className="text-lg font-bold text-turtle-dark mb-1">{t("pay_success")}</p>
                <p className="text-sm text-turtle-gray-2 mb-1">{t("pay_wallet_paid", { amount: `Tk ${pending.grandTotal}` })}</p>
                <p className="text-xs text-turtle-gray-2 mb-6">{t("pay_order_id", { id: orderId })}</p>
                <button
                  onClick={() => router.replace("/order-placed")}
                  className="w-full bg-turtle-pink text-white py-3 rounded-full text-sm font-bold hover:bg-turtle-pink-light transition-colors"
                >
                  {t("pay_continue")}
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
