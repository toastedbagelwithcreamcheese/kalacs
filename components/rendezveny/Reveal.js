"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Maszkos feltárulás görgetésre (terv 4.5).
 *
 * Szándékosan NEM framer-motion: a CSS már megvan a rendezveny.css-ben,
 * egy IntersectionObserver pedig töredék annyi JS-t jelent. Így a
 * rendezvényes oldalak alap JS-csomagja kicsi marad.
 *
 * A `data-shown` attribútum kapcsolja a .ev-reveal osztály végállapotát.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  ...rest
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Ha a felhasználó csökkentett mozgást kér, azonnal megmutatjuk.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect(); // egyszer tárul fel, nem oda-vissza
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-shown={shown}
      className={`ev-reveal ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
