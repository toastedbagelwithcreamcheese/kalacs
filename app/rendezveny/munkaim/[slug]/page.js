import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";

import Reveal from "@/components/rendezveny/Reveal";
import MonoLabel from "@/components/rendezveny/MonoLabel";
import CaseMetaBar from "@/components/rendezveny/CaseMetaBar";
import GalleryMasonry from "@/components/rendezveny/GalleryMasonry";

import { EVENT_CATEGORIES } from "@/constants/rendezveny/categories";
import { ALL_CASES, CASE_SLUGS, getCase } from "@/constants/rendezveny/cases";
import { EVENT_SITE, EVENT_CTA } from "@/constants/rendezveny/site";
import { getEventImages } from "@/lib/eventMedia";

const SECTION = "mx-auto max-w-ev px-5 md:px-10 lg:px-16";
const BASE = EVENT_SITE.baseUrl;

export async function generateStaticParams() {
  return CASE_SLUGS.map((slug) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) return {};

  const cat = EVENT_CATEGORIES[item.category];
  const images = getEventImages(item.event);

  return {
    title: item.title,
    description:
      item.brief?.trim() ||
      `${item.title} — ${cat?.title ?? "rendezvény"} fotózás. ${images.length} kép a galériában.`,
    alternates: { canonical: `/rendezveny/munkaim/${item.slug}` },
    openGraph: {
      title: item.title,
      url: `${BASE}/rendezveny/munkaim/${item.slug}`,
      images: images[0] ? [{ url: images[0].src }] : undefined,
    },
  };
}

export default async function CasePage({ params }) {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) return notFound();

  const cat = EVENT_CATEGORIES[item.category];
  const images = getEventImages(item.event);
  const hero = images[0];
  const rest = images.slice(1);

  const idx = ALL_CASES.findIndex((c) => c.slug === item.slug);
  const next = ALL_CASES[(idx + 1) % ALL_CASES.length];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Kezdőlap", item: BASE },
      { "@type": "ListItem", position: 2, name: "Rendezvény", item: `${BASE}/rendezveny` },
      { "@type": "ListItem", position: 3, name: "Munkáim", item: `${BASE}/rendezveny/munkaim` },
      { "@type": "ListItem", position: 4, name: item.title, item: `${BASE}/rendezveny/munkaim/${item.slug}` },
    ],
  };

  const galleryLd = images.length
    ? {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        name: item.title,
        url: `${BASE}/rendezveny/munkaim/${item.slug}`,
        image: images.slice(0, 12).map((i) => `${BASE}${i.src}`),
      }
    : null;

  return (
    <div style={{ "--ev-cat": cat?.soft, "--ev-cat-deep": cat?.deep }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {galleryLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryLd) }} />
      )}

      {/* ═══ FEJLÉC ═══ */}
      <section className={`${SECTION} pb-10 pt-36 md:pt-44`}>
        <Reveal>
          <nav aria-label="Morzsamenü">
            <ol className="ev-mono flex flex-wrap items-center gap-2">
              <li>
                <Link href="/rendezveny" className="hover:text-[var(--ev-ink)]">
                  Rendezvény
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/rendezveny/munkaim" className="hover:text-[var(--ev-ink)]">
                  Munkáim
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li style={{ color: cat?.deep }}>{cat?.navTitle}</li>
            </ol>
          </nav>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="ev-display ev-d-l mt-6 max-w-[18ch]">{item.title}</h1>
        </Reveal>
      </section>

      {/* ═══ HERO KÉP ═══ */}
      {hero && (
        <section className={`${SECTION} pb-12`}>
          <Reveal>
            <div className="overflow-hidden rounded-ev" style={{ background: cat?.soft }}>
              <Image
                src={hero.src}
                alt={hero.alt}
                width={hero.width}
                height={hero.height}
                priority
                sizes="(max-width: 1440px) 100vw, 1440px"
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        </section>
      )}

      {/* ═══ METAADAT ═══ */}
      <section className={`${SECTION} pb-16`}>
        <Reveal>
          <CaseMetaBar item={item} imageCount={images.length} />
        </Reveal>
      </section>

      {/* ═══ FELADAT / MEGOLDÁS / EREDMÉNY ═══
          Csak a kitöltött blokkok jelennek meg. */}
      {(item.brief || item.approach || item.metrics?.length > 0) && (
        <section className="py-16 md:py-24" style={{ background: "var(--ev-surface)" }}>
          <div className={SECTION}>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              {item.brief && (
                <Reveal>
                  <MonoLabel>A feladat</MonoLabel>
                  <p className="ev-display mt-5 text-xl leading-snug md:text-2xl">
                    {item.brief}
                  </p>
                </Reveal>
              )}
              {item.approach && (
                <Reveal delay={80}>
                  <MonoLabel>Ahogy megoldottam</MonoLabel>
                  <p className="mt-5 leading-relaxed text-[var(--ev-ink-2)]">
                    {item.approach}
                  </p>
                </Reveal>
              )}
            </div>

            {item.metrics?.length > 0 && (
              <Reveal>
                <dl className="mt-14 flex flex-wrap gap-x-16 gap-y-8">
                  {item.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="ev-mono">{m.label}</dt>
                      <dd
                        className="ev-display mt-1.5 text-3xl"
                        style={{ color: cat?.deep }}
                      >
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* ═══ GALÉRIA ═══ */}
      {rest.length > 0 && (
        <section className={`${SECTION} py-16 md:py-24`}>
          <Reveal>
            <MonoLabel>Galéria</MonoLabel>
            <h2 className="ev-display ev-d-m mt-5">
              {images.length} kép erről a rendezvényről.
            </h2>
          </Reveal>
          <div className="mt-10">
            <GalleryMasonry images={rest} accent={cat?.soft} />
          </div>
        </section>
      )}

      {/* ═══ ÜGYFÉLIDÉZET ═══ */}
      {item.quote && (
        <section className="py-16 md:py-24" style={{ background: "var(--ev-surface)" }}>
          <div className={SECTION}>
            <Reveal>
              <figure className="mx-auto max-w-[46ch] text-center">
                <blockquote className="ev-display text-xl leading-snug md:text-2xl">
                  &bdquo;{item.quote.text}&rdquo;
                </blockquote>
                <figcaption className="ev-mono mt-6">
                  {[item.quote.name, item.quote.org].filter(Boolean).join(" · ")}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>
      )}

      {/* ═══ NAVIGÁCIÓ + CTA ═══ */}
      <section className={`${SECTION} py-16 md:py-24`}>
        <div
          className="flex flex-col gap-6 border-t pt-10 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "var(--ev-line)" }}
        >
          <Link
            href="/rendezveny/munkaim"
            className="ev-mono flex items-center gap-2 hover:text-[var(--ev-ink)]"
          >
            <ArrowLeft size={14} />
            Összes munkám
          </Link>

          {next && next.slug !== item.slug && (
            <Link
              href={`/rendezveny/munkaim/${next.slug}`}
              className="group flex items-center gap-3 text-right"
            >
              <span>
                <span className="ev-mono block">Következő projekt</span>
                <span className="ev-display mt-1 block text-lg">{next.title}</span>
              </span>
              <ArrowRight
                size={20}
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: cat?.deep }}
              />
            </Link>
          )}
        </div>

        <Reveal>
          <div
            className="mt-14 rounded-ev px-7 py-14 text-center md:px-16"
            style={{ background: cat?.soft }}
          >
            <h2 className="ev-display ev-d-m mx-auto max-w-[18ch]">
              Hasonló rendezvényed lesz?
            </h2>
            <Link
              href={`${EVENT_CTA.href}?tipus=${item.category}`}
              className="ev-btn ev-btn-primary mt-8"
            >
              {EVENT_CTA.label}
              <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
