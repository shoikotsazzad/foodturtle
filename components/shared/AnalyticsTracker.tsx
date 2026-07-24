"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageview, heartbeat } from "@/lib/analytics";

const HEARTBEAT_MS = 30000;

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageview(pathname);
  }, [pathname]);

  useEffect(() => {
    const tick = () => {
      if (document.visibilityState === "visible") heartbeat(pathname);
    };
    tick();
    const id = setInterval(tick, HEARTBEAT_MS);
    return () => clearInterval(id);
  }, [pathname]);

  return null;
}
