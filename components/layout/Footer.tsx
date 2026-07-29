"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname.startsWith("/admin") || pathname.startsWith("/order-placed")) return null;

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top row */}
        <div className="flex items-center justify-center sm:justify-start gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Food Turtle" width={100} height={34} className="h-8 w-auto object-contain" />
          </div>
          <span className="text-turtle-gray-2 text-sm">·</span>
          <span className="text-turtle-gray-2 text-sm">Zero Delivery Inc.</span>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-sm text-left sm:text-center">
          {[
            { label: t("footer_help"), href: "/help" },
            { label: t("footer_terms"), href: "/terms" },
            { label: t("footer_privacy"), href: "/privacy" },
            { label: t("footer_partner"), href: "/partner" },
            { label: t("footer_dine"), href: "/dine-in" },
            { label: t("footer_careers"), href: "/careers" },
            { label: t("footer_business"), href: "/business" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-turtle-gray-2 hover:text-turtle-pink transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center gap-1.5 pt-5 border-t border-gray-100 text-center">
          <p className="text-xs text-turtle-gray-2">{t("footer_copy")}</p>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-turtle-gray-2 italic">Built with</span>
            <Image src="/logo.png" alt="Food Turtle" width={16} height={16} className="w-4 h-4 object-contain" />
            <span className="text-xs text-turtle-gray-2 italic">and zero actual food.</span>
          </div>
          <p className="text-xs text-turtle-gray-2">
            Designed &amp; developed by{" "}
            <a
              href="https://www.linkedin.com/in/shoikotsazzad/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-turtle-pink font-semibold hover:underline"
            >
              @Shoikot Sazzad
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
