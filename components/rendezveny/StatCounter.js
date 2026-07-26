"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Számláló, ami a képernyőre érve felszámol az értékig.
 *
 * A `value` szabad szöveg lehet ("180+", "48 óra", "6") — a komponens
 * kiszedi belőle a vezető számot, azt animálja, a maradékot (utótagot)
 * változatlanul kiírja. Ha nincs benne szám, egyszerűen kiírja.
 */
export default function StatCounter({ value, label, duration = 1200 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(null);

  const match = String(value).match(/^(\d[\d\s]*)(.*)$/);
  const target = match ? parseInt(match[1].replace(/\s/g, ""), 10) : null;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        const start = performance.now();
        let raf;
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          // easeOutExpo — gyorsan indul, lágyan áll meg
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          setDisplay(Math.round(target * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return (
    <div ref={ref}>
      <dt className="ev-mono">{label}</dt>
      <dd className="ev-display mt-1.5 text-3xl tabular-nums md:text-4xl">
        {target === null ? value : `${display ?? 0}${suffix}`}
      </dd>
    </div>
  );
}
