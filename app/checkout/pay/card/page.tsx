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
  const { t } = useLanguage();
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
              <ChevronLeft size={16} /> {t("pay_back_to_checkout")}
            </Link>
          )}

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-full bg-turtle-pink-bg flex items-center justify-center shrink-0">
                <CreditCard size={20} className="text-turtle-pink" />
              </div>
              <div>
                <p className="font-bold text-turtle-dark">{t("pay_card_title")}</p>
                <p className="text-xs text-turtle-gray-2">{t("pay_simulated_note")}</p>
              </div>
            </div>

            <div className="border-t border-gray-100 my-4" />

            {step === "form" && (
              <div className="space-y-3">
                <p className="text-xs text-turtle-gray-2 -mt-1 mb-1">
                  {t("pay_will_pay", { amount: `Tk ${pending.grandTotal}` })}
                </p>
                <div>
                  <label className="text-xs font-medium text-turtle-gray-2 block mb-1">{t("pay_cardholder_name")}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("pay_name_on_card_placeholder")}
                    className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none ${
                      attempted && !nameValid ? "border-red-400" : "border-gray-200 focus:border-turtle-pink"
                    }`}
                  />
                  {attempted && !nameValid && <p className="text-xs text-red-500 mt-1">{t("pay_required")}</p>}
                </div>
                <div>
                  <label className="text-xs font-medium text-turtle-gray-2 block mb-1">{t("pay_card_number")}</label>
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
                  {attempted && !cardValid && <p className="text-xs text-red-500 mt-1">{t("pay_card_number_invalid")}</p>}
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs font-medium text-turtle-gray-2 block mb-1">{t("pay_expiry")}</label>
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
                    {attempted && !expiryValid && <p className="text-xs text-red-500 mt-1">{t("pay_expiry_invalid")}</p>}
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-medium text-turtle-gray-2 block mb-1">{t("pay_cvv")}</label>
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
                    {attempted && !cvvValid && <p className="text-xs text-red-500 mt-1">{t("pay_cvv_invalid")}</p>}
                  </div>
                </div>
                <button
                  onClick={handlePay}
                  className="w-full bg-turtle-pink text-white py-3 rounded-full text-sm font-bold mt-2 hover:bg-turtle-pink-light transition-colors"
                >
                  {t("pay_amount", { amount: `Tk ${pending.grandTotal}` })}
                </button>
                <div className="flex items-center gap-1.5 justify-center mt-1 text-turtle-gray-2">
                  <ShieldCheck size={12} />
                  <span className="text-[11px]">{t("pay_card_no_data_note")}</span>
                </div>
              </div>
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
                <p className="text-sm text-turtle-gray-2 mb-1">
                  {t("pay_card_paid", { amount: `Tk ${pending.grandTotal}`, last4: cardDigits.slice(-4) })}
                </p>
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
