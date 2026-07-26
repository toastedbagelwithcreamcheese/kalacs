"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { EVENT_CATEGORY_LIST } from "@/constants/rendezveny/categories";
import { EVENT_SITE, EVENT_NAV, EVENT_CTA } from "@/constants/rendezveny/site";

export default function EventNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Útvonalváltásra minden nyitott réteg zár.
  useEffect(() => {
    setMobileOpen(false);
    setCatOpen(false);
  }, [pathname]);

  /* --- Görgetészár (L4) ------------------------------------------------
     A globals.css `overflow-y: scroll !important` szabálya kiüti a
     body.style.overflow = "hidden" megoldást, ezért position: fixed
     alapú zárat használunk, és a scroll pozíciót kézzel állítjuk vissza. */
  useEffect(() => {
    if (!mobileOpen) return;

    const y = window.scrollY;
    document.body.classList.add("ev-scroll-lock");
    document.body.style.top = `-${y}px`;

    return () => {
      document.body.classList.remove("ev-scroll-lock");
      document.body.style.top = "";
      window.scrollTo(0, y);
    };
  }, [mobileOpen]);

  // Esc-re zár + fókuszcsapda a mobil panelen.
  useEffect(() => {
    if (!mobileOpen) return;

    closeBtnRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const isActive = (href) =>
    href === "/rendezveny" ? pathname === href : pathname.startsWith(href);

  const wordmark = (
    <Link
      href="/rendezveny"
      className="group flex shrink-0 flex-col leading-none"
      onClick={() => setMobileOpen(false)}
    >
      <span className="ev-display text-xl tracking-tight">
        {EVENT_SITE.brand.name}
      </span>
      <span
        className="ev-mono mt-1 transition-colors group-hover:text-[var(--ev-brand)]"
        style={{ letterSpacing: "0.3em" }}
      >
        {EVENT_SITE.brand.suffix}
      </span>
    </Link>
  );

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
        style={{
          background: scrolled || mobileOpen ? "rgba(250,250,248,0.88)" : "transparent",
          backdropFilter: scrolled || mobileOpen ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled || mobileOpen ? "blur(14px)" : "none",
          borderBottom: `1px solid ${scrolled && !mobileOpen ? "var(--ev-line)" : "transparent"}`,
          paddingTop: scrolled ? "0.75rem" : "1.4rem",
          paddingBottom: scrolled ? "0.75rem" : "1.4rem",
        }}
      >
        <div className="mx-auto flex max-w-ev items-center justify-between gap-6 px-5 md:px-10 lg:px-16">
          {wordmark}

          <nav aria-label="Rendezvény menü" className="hidden lg:block">
            <ul className="flex items-center gap-7 text-[0.95rem]">
              <li
                className="relative"
                onMouseEnter={() => setCatOpen(true)}
                onMouseLeave={() => setCatOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1.5 py-2"
                  aria-expanded={catOpen}
                  onClick={() => setCatOpen((v) => !v)}
                >
                  Kategóriák
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-300 ${catOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {catOpen && (
                  <div
                    className="absolute -left-4 top-full w-72 overflow-hidden rounded-ev border shadow-ev-lg"
                    style={{
                      background: "var(--ev-surface)",
                      borderColor: "var(--ev-line)",
                    }}
                  >
                    <ul className="py-2">
                      {EVENT_CATEGORY_LIST.map((cat) => (
                        <li key={cat.slug}>
                          <Link
                            href={`/rendezveny/${cat.slug}`}
                            className="flex items-center gap-3 px-5 py-2.5 transition-colors hover:bg-[var(--ev-sunk)]"
                          >
                            <span
                              aria-hidden="true"
                              className="h-3 w-3 shrink-0 rounded-full"
                              style={{ background: cat.soft }}
                            />
                            <span className="flex flex-col">
                              <span className="text-sm font-medium">{cat.navTitle}</span>
                              <span className="text-xs text-[var(--ev-ink-3)]">
                                {cat.tagline}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>

              {EVENT_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="ev-link py-2"
                    data-active={isActive(item.href)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href={EVENT_SITE.photoSite.href}
              className="ev-mono flex items-center gap-1 transition-colors hover:text-[var(--ev-brand)]"
            >
              {EVENT_SITE.photoSite.label}
              <ArrowUpRight size={13} />
            </Link>
            <Link href={EVENT_CTA.href} className="ev-btn ev-btn-primary">
              {EVENT_CTA.label}
            </Link>
          </div>

          <button
            type="button"
            className="-mr-2 p-2 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Menü bezárása" : "Menü megnyitása"}
            ref={mobileOpen ? closeBtnRef : undefined}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* --- Mobil panel --- */}
      {mobileOpen && (
        <div
          ref={panelRef}
          id="ev-mobile-menu"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto px-5 pb-10 pt-28 lg:hidden"
          style={{ background: "var(--ev-bg)" }}
        >
          <nav aria-label="Rendezvény menü (mobil)">
            <p className="ev-mono mb-4">Kategóriák</p>
            <ul className="mb-9 flex flex-col">
              {EVENT_CATEGORY_LIST.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/rendezveny/${cat.slug}`}
                    className="flex items-center gap-3 border-b py-3.5"
                    style={{ borderColor: "var(--ev-line)" }}
                  >
                    <span
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 rounded-full"
                      style={{ background: cat.soft }}
                    />
                    <span className="ev-display text-2xl">{cat.navTitle}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="flex flex-col gap-1">
              {EVENT_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="ev-display block py-2 text-3xl">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pt-10">
            <Link href={EVENT_CTA.href} className="ev-btn ev-btn-primary w-full">
              {EVENT_CTA.label}
            </Link>
            <Link
              href={EVENT_SITE.photoSite.href}
              className="ev-mono mt-6 flex items-center justify-center gap-1"
            >
              {EVENT_SITE.photoSite.label}
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
