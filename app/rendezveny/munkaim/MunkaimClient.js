"use client";

import { useEffect, useMemo, useState } from "react";
import CaseCard from "@/components/rendezveny/CaseCard";
import Reveal from "@/components/rendezveny/Reveal";
import { EVENT_CATEGORY_LIST } from "@/constants/rendezveny/categories";

/**
 * Szűrhető munkák-index.
 *
 * SZÁNDÉKOSAN nem `useSearchParams`-szal dolgozik: az Suspense-t
 * követelne, aminek a fallbackje kerülne a statikus HTML-be — vagyis a
 * kártyák hiányoznának a forrásból (rossz SEO, JS nélkül üres oldal).
 *
 * Helyette: a szerver minden kártyát legenerál, a kliens pedig
 * hidratálás után olvassa ki az URL-t és szűr. A statikus HTML így
 * teljes, a megosztható `?kat=` link mégis működik.
 */
export default function MunkaimClient({ cases }) {
  const [active, setActive] = useState(null);

  // Induláskor átvesszük az URL-ben lévő szűrőt (megosztott link esetén).
  useEffect(() => {
    const kat = new URLSearchParams(window.location.search).get("kat");
    if (kat) setActive(kat);
  }, []);

  const matches = (c, slug) =>
    c.category === slug || (c.tags ?? []).includes(slug);

  const filtered = useMemo(
    () => (active ? cases.filter((c) => matches(c, active)) : cases),
    [cases, active]
  );

  const apply = (slug) => {
    setActive(slug);
    const url = new URL(window.location.href);
    if (slug) url.searchParams.set("kat", slug);
    else url.searchParams.delete("kat");
    // replaceState: nem szemeteli tele a history-t, de a link megosztható marad
    window.history.replaceState(null, "", url);
  };

  // Csak azok a kategóriák jelennek meg szűrőként, amikhez van munka.
  const available = EVENT_CATEGORY_LIST.filter((cat) =>
    cases.some((c) => matches(c, cat.slug))
  );

  const chip = (label, slug, count, color) => {
    const isActive = active === slug;
    return (
      <li key={slug ?? "all"}>
        <button
          type="button"
          onClick={() => apply(slug)}
          aria-pressed={isActive}
          className="flex items-center gap-2 rounded-ev border px-4 py-2 text-sm transition-colors duration-200"
          style={{
            borderColor: isActive ? "var(--ev-brand)" : "var(--ev-line-2)",
            background: isActive ? "var(--ev-brand)" : "transparent",
            color: isActive ? "var(--ev-brand-ink)" : "var(--ev-ink)",
          }}
        >
          {color && (
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: color }}
            />
          )}
          {label}
          <span className="tabular-nums opacity-60">{count}</span>
        </button>
      </li>
    );
  };

  return (
    <>
      <ul className="flex flex-wrap gap-2">
        {chip("Mind", null, cases.length, null)}
        {available.map((cat) =>
          chip(
            cat.navTitle,
            cat.slug,
            cases.filter((c) => matches(c, cat.slug)).length,
            cat.soft
          )
        )}
      </ul>

      <p aria-live="polite" className="ev-mono mt-6">
        {filtered.length} munka
      </p>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <Reveal key={item.slug} delay={i * 60}>
              <CaseCard
                item={item}
                image={item.image}
                imageCount={item.imageCount}
              />
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-[var(--ev-ink-2)]">
          Ebben a kategóriában még nincs feltöltött munka.
        </p>
      )}
    </>
  );
}
