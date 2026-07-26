"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, Tag, Banknote, Wallet, CreditCard } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { useVouchers } from "@/lib/hooks";
import PageTitle from "@/components/shared/PageTitle";
import AddressModal from "@/components/shared/AddressModal";
import { finalizePendingOrder, savePendingOrder, type PaymentMethod } from "@/lib/orders";
import { SHOPS } from "@/lib/shops-data";
import type { CartItem } from "@/types";

function vendorHref(restaurantId: string, slug: string) {
  if (restaurantId === "turtlemart") return "/turtlemart";
  if (SHOPS.some((s) => s.id === restaurantId)) return `/shops/${restaurantId}`;
  return `/restaurant/${slug}`;
}

const TIP_OPTIONS = [0, 10, 20, 30, 50];

export default function CheckoutPage() {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const { items, total, clearCart } = useCart();
  const { user, updateUser } = useUser();
  const vouchers = useVouchers();

  const [showAddress, setShowAddress] = useState(false);
  const [noteToRider, setNoteToRider] = useState("");
  const [contactless, setContactless] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState<"standard" | "priority">("standard");
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.name.split(" ")[0] || "");
  const [lastName, setLastName] = useState(user.name.split(" ").slice(1).join(" ") || "");
  const [mobile, setMobile] = useState(user.phone);
  const [showPersonalDetails, setShowPersonalDetails] = useState(
    !(email && firstName && lastName && mobile)
  );
  const [tip, setTip] = useState(0);
  const [saveTip, setSaveTip] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [appliedVoucherId, setAppliedVoucherId] = useState<string | null>(null);

  const personalRef = useRef<HTMLDivElement>(null);

  const SERVICE_FEE = 5;
  const PRIORITY_FEE = 37;
  const extraFee = deliveryOption === "priority" ? PRIORITY_FEE : 0;

  const appliedVoucher = vouchers.find((v) => v.id === appliedVoucherId) ?? null;
  const voucherDiscount = appliedVoucher
    ? appliedVoucher.discount_type === "percent"
      ? Math.round(total * (appliedVoucher.discount_value / 100))
      : appliedVoucher.discount_value
    : 0;

  const grandTotal = Math.max(0, total + SERVICE_FEE + tip + extraFee - voucherDiscount);

  const toggleVoucher = (voucherId: string) => {
    setAppliedVoucherId((current) => (current === voucherId ? null : voucherId));
  };

  const emailValid = /^\S+@\S+\.\S+$/.test(email.trim());
  const firstNameValid = firstName.trim().length > 0;
  const lastNameValid = lastName.trim().length > 0;
  const mobileValid = mobile.replace(/\D/g, "").length >= 10;
  const personalDetailsValid = emailValid && firstNameValid && lastNameValid && mobileValid;
  const addressValid = user.address.trim().length > 0;

  const restaurantNameEn = items[0]?.restaurant_name_en || "";
  const restaurantNameBn = items[0]?.restaurant_name_bn || "";

  // Items can come from more than one restaurant/shop/Turtlemart at once —
  // group them so the summary shows exactly where each item came from.
  const vendorGroups = useMemo(() => {
    const map = new Map<string, { nameEn: string; nameBn: string; restaurantId: string; slug: string; items: CartItem[] }>();
    for (const item of items) {
      if (!map.has(item.restaurant_id)) {
        map.set(item.restaurant_id, {
          nameEn: item.restaurant_name_en,
          nameBn: item.restaurant_name_bn,
          restaurantId: item.restaurant_id,
          slug: item.restaurant_slug,
          items: [],
        });
      }
      map.get(item.restaurant_id)!.items.push(item);
    }
    return Array.from(map.values());
  }, [items]);

  const handleSaveDetails = () => {
    if (!personalDetailsValid) {
      setAttemptedSubmit(true);
      return;
    }
    updateUser({
      name: `${firstName} ${lastName}`.trim(),
      email,
      phone: mobile,
    });
    setShowPersonalDetails(false);
  };

  const handlePlaceOrder = () => {
    if (!personalDetailsValid) {
      setAttemptedSubmit(true);
      setShowPersonalDetails(true);
      personalRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!addressValid) {
      setShowAddress(true);
      return;
    }

    updateUser({ name: `${firstName} ${lastName}`.trim(), email, phone: mobile });

    savePendingOrder({
      items: [...items],
      restaurantNameEn,
      restaurantNameBn,
      address: user.address,
      city: user.city,
      noteToRider,
      contactless,
      deliveryOption,
      tip,
      subtotal: total,
      serviceFee: SERVICE_FEE,
      priorityFee: extraFee,
      grandTotal,
      paymentMethod,
      email,
      name: `${firstName} ${lastName}`.trim(),
      mobile,
    });

    if (paymentMethod === "cod") {
      setPlacingOrder(true);
      finalizePendingOrder(clearCart);
      router.replace("/order-placed");
    } else {
      router.push(`/checkout/pay/${paymentMethod}`);
    }
  };

  if (items.length === 0 && !placingOrder) {
    return (
      <>
        <PageTitle title="Checkout · Food Turtle" />
        <Navbar />
        <div className="max-w-7xl mx-auto w-full px-4 py-20 text-center">
          <img src="/logo.png" alt="Food Turtle" className="w-16 h-16 object-contain mb-4 opacity-60 mx-auto" />
          <h1 className="text-xl font-bold text-turtle-dark">{t("checkout_cart_empty_title")}</h1>
          <Link href="/" className="mt-4 inline-block bg-turtle-pink text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-turtle-pink-light">
            {t("find_restaurants_cta")}
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageTitle title="Checkout · Food Turtle" />
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 lg:px-4 py-6 pb-28 lg:pb-6">
        <h1 className="text-2xl font-bold text-turtle-dark mb-6">{t("checkout_title")}</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column */}
          <div className="flex-1 space-y-4">
            {/* Delivery Address */}
            <section className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm lg:shadow-none">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-turtle-dark">{t("checkout_delivery_address")}</h2>
                <button
                  onClick={() => setShowAddress(true)}
                  className="text-sm text-turtle-pink font-medium hover:underline"
                >
                  {t("checkout_change")}
                </button>
              </div>
              {addressValid ? (
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-turtle-pink mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-turtle-dark">{user.address}</p>
                    <p className="text-xs text-turtle-gray-2">{user.city}</p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAddress(true)}
                  className="flex items-center gap-2 text-sm text-red-500 font-medium"
                >
                  <MapPin size={16} />
                  Add a delivery address to continue
                </button>
              )}
              <textarea
                value={noteToRider}
                onChange={(e) => setNoteToRider(e.target.value)}
                placeholder={t("checkout_note_rider_placeholder")}
                className="mt-3 w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-turtle-pink resize-none h-20"
              />
              <label className="flex items-center gap-2 mt-3 cursor-pointer">
                <button
                  onClick={() => setContactless(!contactless)}
                  className={`w-10 h-5 rounded-full transition-colors ${contactless ? "bg-turtle-pink" : "bg-gray-200"}`}
                />
                <span className="text-sm text-turtle-dark">{t("checkout_contactless")}</span>
              </label>
            </section>

            {/* Delivery Options */}
            <section className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm lg:shadow-none">
              <h2 className="font-bold text-turtle-dark mb-3">{t("checkout_delivery_options")}</h2>
              <div className="space-y-2">
                <label className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                  deliveryOption === "standard" ? "border-turtle-pink bg-turtle-pink-bg" : "border-gray-200"
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      value="standard"
                      checked={deliveryOption === "standard"}
                      onChange={() => setDeliveryOption("standard")}
                      className="accent-turtle-pink"
                    />
                    <div>
                      <p className="text-sm font-semibold text-turtle-dark">{t("checkout_standard")}</p>
                      <p className="text-xs text-turtle-gray-2">{t("checkout_standard_time")}</p>
                    </div>
                  </div>
                </label>
                <label className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                  deliveryOption === "priority" ? "border-turtle-pink bg-turtle-pink-bg" : "border-gray-200"
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      value="priority"
                      checked={deliveryOption === "priority"}
                      onChange={() => setDeliveryOption("priority")}
                      className="accent-turtle-pink"
                    />
                    <div>
                      <p className="text-sm font-semibold text-turtle-dark">{t("checkout_priority")}</p>
                      <p className="text-xs text-turtle-gray-2">
                        {t("checkout_priority_time")} · {t("checkout_priority_note")}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-turtle-pink">+ Tk {PRIORITY_FEE}</span>
                </label>
              </div>
            </section>

            {/* Personal Details */}
            <section ref={personalRef} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm lg:shadow-none">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-turtle-dark">{t("checkout_personal_details")}</h2>
                {!showPersonalDetails && (
                  <button
                    onClick={() => setShowPersonalDetails(true)}
                    className="text-sm text-turtle-pink font-medium hover:underline"
                  >
                    Edit
                  </button>
                )}
                {showPersonalDetails && personalDetailsValid && (
                  <button
                    onClick={() => setShowPersonalDetails(false)}
                    className="text-sm text-turtle-gray-2 font-medium hover:underline"
                  >
                    {t("checkout_cancel")}
                  </button>
                )}
              </div>
              {showPersonalDetails ? (
                <div className="space-y-3">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("checkout_email")}
                      className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none ${
                        attemptedSubmit && !emailValid ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-turtle-pink"
                      }`}
                    />
                    {attemptedSubmit && !emailValid && (
                      <p className="text-xs text-red-500 mt-1">Enter a valid email address</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder={t("checkout_first_name")}
                        className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none ${
                          attemptedSubmit && !firstNameValid ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-turtle-pink"
                        }`}
                      />
                      {attemptedSubmit && !firstNameValid && (
                        <p className="text-xs text-red-500 mt-1">Required</p>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder={t("checkout_last_name")}
                        className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none ${
                          attemptedSubmit && !lastNameValid ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-turtle-pink"
                        }`}
                      />
                      {attemptedSubmit && !lastNameValid && (
                        <p className="text-xs text-red-500 mt-1">Required</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder={t("checkout_mobile")}
                      className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none ${
                        attemptedSubmit && !mobileValid ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-turtle-pink"
                      }`}
                    />
                    {attemptedSubmit && !mobileValid && (
                      <p className="text-xs text-red-500 mt-1">Enter a valid mobile number (at least 10 digits)</p>
                    )}
                  </div>
                  <button
                    onClick={handleSaveDetails}
                    className="w-full bg-gray-100 text-turtle-dark py-2.5 rounded-lg text-sm font-medium hover:bg-turtle-gray transition-colors"
                  >
                    {t("checkout_save")}
                  </button>
                </div>
              ) : (
                <div className="text-sm text-turtle-gray-2">
                  <p>{user.email}</p>
                  <p>{user.name}</p>
                  <p>{user.phone}</p>
                </div>
              )}
            </section>

            {/* Tip your rider */}
            <section className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm lg:shadow-none">
              <h2 className="font-bold text-turtle-dark mb-1">{t("checkout_tip_title")}</h2>
              <p className="text-xs text-turtle-gray-2 mb-3">{t("checkout_tip_subtitle")}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {TIP_OPTIONS.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setTip(amount)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                      tip === amount
                        ? "border-turtle-pink bg-turtle-pink text-white"
                        : "border-gray-200 text-turtle-dark hover:border-turtle-pink"
                    }`}
                  >
                    {amount === 0 ? t("checkout_tip_not_now") : `Tk ${amount}`}
                    {amount === 20 && (
                      <span className="block text-[10px] opacity-70">{t("checkout_tip_most_common")}</span>
                    )}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveTip}
                  onChange={() => setSaveTip(!saveTip)}
                  className="accent-turtle-pink"
                />
                <span className="text-sm text-turtle-dark">{t("checkout_tip_save_next")}</span>
              </label>
            </section>

            {/* Payment method */}
            <section className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm lg:shadow-none">
              <h2 className="font-bold text-turtle-dark mb-3">Payment method</h2>
              <div className="space-y-2">
                {(
                  [
                    { key: "cod" as const, icon: Banknote, label: "Cash on Delivery", sub: "Pay with cash when your order arrives" },
                    { key: "wallet" as const, icon: Wallet, label: "Turtle Pay Wallet", sub: "Pay instantly with your mobile wallet" },
                    { key: "card" as const, icon: CreditCard, label: "Credit or Debit Card", sub: "Visa, Mastercard and more" },
                  ]
                ).map((opt) => (
                  <label
                    key={opt.key}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                      paymentMethod === opt.key ? "border-turtle-pink bg-turtle-pink-bg" : "border-gray-100"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={paymentMethod === opt.key}
                      onChange={() => setPaymentMethod(opt.key)}
                      className="accent-turtle-pink"
                    />
                    <opt.icon size={18} className="text-turtle-dark shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-turtle-dark">{opt.label}</p>
                      <p className="text-xs text-turtle-gray-2">{opt.sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            {/* Place order button — desktop only; mobile relies on the single sticky footer CTA below */}
            <button
              onClick={handlePlaceOrder}
              disabled={placingOrder}
              className="hidden lg:block w-full bg-turtle-pink text-white py-4 rounded-full text-base font-bold hover:bg-turtle-pink-light transition-colors disabled:opacity-70"
            >
              {placingOrder
                ? "Placing order..."
                : paymentMethod === "cod"
                ? t("checkout_place_order")
                : "Continue to payment"}
            </button>
            <p className="text-xs text-turtle-gray-2 text-center">{t("checkout_terms")}</p>
          </div>

          {/* Right column */}
          <div className="lg:w-80 space-y-4">
            {/* Order summary */}
            <section className="bg-white rounded-xl border border-gray-100 p-4 lg:sticky lg:top-24">
              <h2 className="font-bold text-turtle-dark mb-3">{t("checkout_your_order")}</h2>

              <div className="space-y-4 mb-4">
                {vendorGroups.map((group) => (
                  <div key={group.restaurantId}>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <p className="text-sm text-turtle-pink font-medium truncate">
                        {lang === "bn" ? group.nameBn : group.nameEn}
                      </p>
                      <Link
                        href={vendorHref(group.restaurantId, group.slug)}
                        className="text-xs text-turtle-pink hover:underline shrink-0"
                      >
                        {t("checkout_add_items")}
                      </Link>
                    </div>
                    <div className="space-y-1.5">
                      {group.items.map((item) => {
                        const name = lang === "bn" ? item.name_bn : item.name_en;
                        return (
                          <div key={item.id} className="flex justify-between gap-2 text-sm">
                            <span className="text-turtle-dark truncate min-w-0">
                              {item.quantity} × {name}
                            </span>
                            <span className="text-turtle-dark font-medium shrink-0">Tk {item.price * item.quantity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Vouchers */}
              {vouchers.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-turtle-dark">{t("checkout_vouchers")}</p>
                    <button className="text-xs text-turtle-pink">{t("checkout_view_all")}</button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {vouchers.map((v, i) => {
                      const eligible = total >= v.min_order;
                      const isApplied = appliedVoucherId === v.id;
                      return (
                        <div
                          key={v.id}
                          className={`border rounded-xl p-3 transition-colors ${i > 0 ? "hidden lg:block" : ""} ${
                            isApplied ? "border-turtle-pink bg-turtle-pink-bg" : "border-gray-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <Tag size={12} className="text-turtle-pink" />
                            <span className="text-xs font-bold text-turtle-dark">{v.code}</span>
                            <span className="text-xs text-turtle-pink">
                              {v.discount_type === "percent" ? `${v.discount_value}% off` : `Tk ${v.discount_value} off`}
                            </span>
                          </div>
                          <p className="text-[10px] text-turtle-gray-2 mb-2">
                            {eligible ? t("checkout_voucher_eligible") : t("checkout_voucher_add_more", { amount: Math.max(0, v.min_order - total) })}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-turtle-gray-2">
                              Min. Tk {v.min_order} · {v.expires_at}
                            </span>
                            <button
                              onClick={() => toggleVoucher(v.id)}
                              disabled={!eligible}
                              className={`text-xs font-medium ${
                                !eligible
                                  ? "text-turtle-gray-2 cursor-not-allowed"
                                  : isApplied
                                  ? "text-turtle-green"
                                  : "text-turtle-pink hover:underline"
                              }`}
                            >
                              {isApplied ? `✓ ${t("checkout_voucher_applied")}` : t("checkout_voucher_apply")}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Price breakdown */}
              <div className="space-y-2 border-t border-gray-100 pt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-turtle-gray-2">Subtotal</span>
                  <span className="text-turtle-dark font-medium">Tk {total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-turtle-gray-2">Standard delivery</span>
                  <span className="text-turtle-green font-medium">Free</span>
                </div>
                {deliveryOption === "priority" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-turtle-gray-2">Priority fee</span>
                    <span className="text-turtle-dark font-medium">Tk {PRIORITY_FEE}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-turtle-gray-2">Service fee</span>
                  <span className="text-turtle-dark font-medium">Tk {SERVICE_FEE}</span>
                </div>
                {appliedVoucher && voucherDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-turtle-gray-2">
                      {t("checkout_voucher_discount_label")} ({appliedVoucher.code})
                    </span>
                    <span className="text-turtle-green font-medium">- Tk {voucherDiscount}</span>
                  </div>
                )}
                {tip > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-turtle-gray-2">Tip</span>
                    <span className="text-turtle-dark font-medium">Tk {tip}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-baseline border-t border-gray-100 pt-3 mt-2">
                <div>
                  <p className="font-bold text-turtle-dark">Total</p>
                  <p className="text-[10px] text-turtle-gray-2">(incl. fees and tax)</p>
                </div>
                <p className="text-xl font-bold text-turtle-pink">Tk {grandTotal}</p>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={placingOrder}
                className="hidden lg:block w-full bg-turtle-pink text-white py-3 rounded-full text-sm font-bold mt-4 hover:bg-turtle-pink-light transition-colors disabled:opacity-50"
              >
                {placingOrder ? "Placing..." : paymentMethod === "cod" ? t("checkout_place_order") : "Continue to payment"}
              </button>
            </section>
          </div>
        </div>
      </main>

      {/* Sticky mobile CTA — desktop already has an in-flow/sticky summary button */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-gray-100 px-6 pt-3 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] text-turtle-gray-2 leading-none mb-0.5">Total</p>
            <p className="text-base font-bold text-turtle-pink leading-none">Tk {grandTotal}</p>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={placingOrder}
            className="flex-1 max-w-[65%] bg-turtle-pink text-white py-3 rounded-full text-sm font-bold hover:bg-turtle-pink-light transition-colors disabled:opacity-70"
          >
            {placingOrder
              ? "Placing order..."
              : paymentMethod === "cod"
              ? t("checkout_place_order")
              : "Continue to payment"}
          </button>
        </div>
      </div>

      {showAddress && <AddressModal onClose={() => setShowAddress(false)} />}
    </>
  );
}
