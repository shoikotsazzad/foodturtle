"use client";

import { useRef, useState } from "react";
import { Send } from "lucide-react";

interface TurtleReceiptProps {
  orderTotal: number;
  orderId: string;
  riderName: string;
  lang: "en" | "bn";
}

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "12px 28px", gap: "8px" }}>
      <div style={{ flex: 1, height: "1px", backgroundColor: "#FFCCE8" }} />
      <span style={{ fontSize: "14px" }}>🐢</span>
      <div style={{ flex: 1, height: "1px", backgroundColor: "#FFCCE8" }} />
    </div>
  );
}

export default function TurtleReceipt({ orderTotal, orderId, riderName, lang }: TurtleReceiptProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  const now = new Date();
  const formattedDate =
    now.toLocaleDateString("en-BD", { day: "2-digit", month: "short" }) +
    ", " +
    now.toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit", hour12: true });

  const downloadImage = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "foodturtle-receipt.png";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerateAndShare = async () => {
    if (!cardRef.current) return;
    setBusy(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/png", 1.0));
      if (!blob) return;

      const file = new File([blob], "foodturtle-receipt.png", { type: "image/png" });
      const shareText =
        lang === "bn"
          ? "আমি Food Turtle এ অর্ডার দিলাম, খাবার আসলো না 😂 foodturtle.com 🐢"
          : "I ordered on Food Turtle and the food never came 😂 foodturtle.com 🐢";

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], text: shareText });
          return;
        } catch (err) {
          if ((err as Error)?.name !== "AbortError") downloadImage(blob);
          return;
        }
      }
      downloadImage(blob);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      {/* Off-screen card captured by html2canvas */}
      <div
        ref={cardRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "400px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #EEEEEE",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          fontFamily: "Inter, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "28px 28px 16px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" width={32} height={32} alt="Food Turtle" crossOrigin="anonymous" style={{ objectFit: "contain" }} />
          <div>
            <p style={{ color: "#FF2B85", fontWeight: 700, fontSize: "18px", margin: 0 }}>FOOD TURTLE</p>
            <p style={{ color: "#9E9E9E", fontSize: "11px", letterSpacing: "2px", margin: 0 }}>DELIVERY RECEIPT</p>
          </div>
        </div>

        {/* Success badge */}
        <div style={{ padding: "0 28px 16px" }}>
          <div
            style={{
              backgroundColor: "#F0FFF4",
              border: "1px solid #86EFAC",
              borderRadius: "8px",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "16px" }}>✅</span>
            <span style={{ color: "#22C55E", fontWeight: 600, fontSize: "14px" }}>
              {lang === "bn" ? "লেনদেন সফল হয়েছে" : "Transaction Successful"}
            </span>
          </div>
        </div>

        {/* Order details */}
        {[
          { label: lang === "bn" ? "অর্ডার আইডি" : "Order ID", value: `#${orderId}` },
          { label: lang === "bn" ? "তারিখ" : "Date", value: formattedDate },
          { label: lang === "bn" ? "রাইডার" : "Rider", value: riderName },
        ].map((row, i) => (
          <div
            key={row.label}
            style={{ display: "flex", justifyContent: "space-between", padding: "11px 28px", backgroundColor: i % 2 === 0 ? "#ffffff" : "#F8F8F8" }}
          >
            <span style={{ color: "#9E9E9E", fontSize: "13px" }}>{row.label}</span>
            <span style={{ color: "#1A1A2E", fontSize: "13px", fontWeight: 500 }}>{row.value}</span>
          </div>
        ))}

        <Divider />

        {/* Payment breakdown */}
        {[
          { label: lang === "bn" ? "অর্ডারের মোট" : "Items ordered", value: `Tk ${orderTotal.toLocaleString()}`, highlight: false },
          { label: lang === "bn" ? "ডেলিভারি ফি" : "Delivery fee", value: "Tk 0", highlight: false },
          { label: lang === "bn" ? "পরিশোধিত" : "Amount paid", value: "Tk 0", highlight: true },
        ].map((row, i) => (
          <div
            key={row.label}
            style={{ display: "flex", justifyContent: "space-between", padding: "11px 28px", backgroundColor: i % 2 === 0 ? "#ffffff" : "#F8F8F8" }}
          >
            <span style={{ color: "#9E9E9E", fontSize: "13px" }}>{row.label}</span>
            <span style={{ fontSize: row.highlight ? "15px" : "13px", fontWeight: row.highlight ? 700 : 500, color: row.highlight ? "#FF2B85" : "#1A1A2E" }}>
              {row.value}
            </span>
          </div>
        ))}

        <Divider />

        {/* Achievement stats */}
        <div style={{ backgroundColor: "#FFF0F7", padding: "12px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#FF2B85", fontSize: "14px", fontWeight: 600 }}>
            💰 {lang === "bn" ? "আপনি বাঁচালেন" : "You saved"}
          </span>
          <span style={{ color: "#FF2B85", fontSize: "16px", fontWeight: 700 }}>Tk {orderTotal.toLocaleString()}</span>
        </div>

        {[
          { emoji: "🍽️", label: lang === "bn" ? "থালাবাসন ধোয়া" : "Dishes washed", value: "0" },
          { emoji: "😔", label: lang === "bn" ? "অনুশোচনা" : "Regrets", value: "0" },
          { emoji: "📖", label: lang === "bn" ? "গল্প অর্জিত" : "Stories gained", value: "1" },
        ].map((row, i) => (
          <div
            key={row.label}
            style={{ display: "flex", justifyContent: "space-between", padding: "10px 28px", backgroundColor: i % 2 === 0 ? "#F8F8F8" : "#ffffff" }}
          >
            <span style={{ color: "#9E9E9E", fontSize: "13px" }}>
              {row.emoji} {row.label}
            </span>
            <span style={{ color: "#1A1A2E", fontSize: "13px", fontWeight: 500 }}>{row.value}</span>
          </div>
        ))}

        <Divider />

        {/* Tagline */}
        <div style={{ padding: "16px 32px", textAlign: "center" }}>
          <p style={{ color: "#9E9E9E", fontSize: "12px", fontStyle: "italic", lineHeight: "1.6", margin: 0 }}>
            <span style={{ color: "#FF2B85" }}>&quot;</span>
            {lang === "bn"
              ? "একমাত্র ডেলিভারি অ্যাপ যা কখনো হতাশ করে না, কারণ আমরা কখনো ডেলিভারি দিই না।"
              : "The only delivery app that never disappoints, because we never deliver."}
            <span style={{ color: "#FF2B85" }}>&quot;</span>
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "12px 28px 28px",
            borderTop: "1px solid #EEEEEE",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" width={20} height={20} alt="Food Turtle" crossOrigin="anonymous" style={{ objectFit: "contain" }} />
          <span style={{ color: "#9E9E9E", fontSize: "12px" }}>foodturtle.com</span>
        </div>
      </div>

      {/* Visible share button */}
      <button
        onClick={handleGenerateAndShare}
        disabled={busy}
        className="w-full flex items-center justify-center gap-1.5 bg-turtle-pink text-white py-3 rounded-full text-sm font-bold hover:bg-turtle-pink-light transition-colors disabled:opacity-70"
      >
        <Send size={16} />
        {busy ? (lang === "bn" ? "তৈরি হচ্ছে..." : "Preparing...") : lang === "bn" ? "রিসিট শেয়ার করুন" : "Share Receipt"}
      </button>
    </div>
  );
}
