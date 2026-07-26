"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { EVENT_SITE, EVENT_CTA } from "@/constants/rendezveny/site";

/**
 * Mobil alsó CTA-sáv. A hero elhagyása után úszik be (terv 3.3).
 * Desktopon nem jelenik meg -- ott a navbar CTA-ja mindig látszik.
 */
export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t p-3 backdrop-blur-md transition-transform duration-500 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{
        background: "rgba(250,250,248,0.92)",
        borderColor: "var(--ev-line)",
        paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
      }}
    >
      <a
        href={EVENT_SITE.contact.phoneHref}
        className="ev-btn ev-btn-ghost shrink-0"
        aria-label={`Telefonhívás: ${EVENT_SITE.contact.phone}`}
      >
        <Phone size={18} />
      </a>
      <Link href={EVENT_CTA.href} className="ev-btn ev-btn-primary flex-1">
        {EVENT_CTA.label}
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}
