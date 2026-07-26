import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import Reveal from "@/components/rendezveny/Reveal";
import MonoLabel from "@/components/rendezveny/MonoLabel";
import GalleryMasonry from "@/components/rendezveny/GalleryMasonry";
import CaseCard from "@/components/rendezveny/CaseCard";
import FaqAccordion from "@/components/rendezveny/FaqAccordion";

import {
  EVENT_CATEGORIES,
  EVENT_CATEGORY_LIST,
  EVENT_CATEGORY_SLUGS,
} from "@/constants/rendezveny/categories";
import { EVENT_SITE, EVENT_CTA } from "@/constants/rendezveny/site";
import { READY_CASES } from "@/constants/rendezveny/cases";
import { getCategoryImages, getEventImages } from "@/lib/eventMedia";

const SECTION = "mx-auto max-w-ev px-5 md:px-10 lg:px-16";
const BASE = EVENT_SITE.baseUrl;

/** Csak a hat ismert kategória épül le; minden más 404. */
export async function generateStaticParams() {
  return EVENT_CATEGORY_SLUGS.map((kategoria) => ({ kategoria }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { kategoria } = await params;
  const data = EVENT_CATEGORIES[kategoria];
  if (!data) return {};

  return {
    title: data.seo.title,
    description: data.seo.description || data.tagline,
    keywords: data.seo.keywords,
    alternates: { canonical: `/rendezveny/${data.slug}` },
    openGraph: {
      title: data.seo.title,
      description: data.seo.description || data.tagline,
      url: `${BASE}/rendezveny/${data.slug}`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { kategoria } = await params;
  const data = EVENT_CATEGORIES[kategoria];
  if (!data) return notFound();

  const images = getCategoryImages(data.galleryDir);
  const relatedCases = READY_CASES.filter((c) => c.category === data.slug);
  const answeredFaq = (data.faq || []).filter((f) => f.answer?.trim());
  const others = EVENT_CATEGORY_LIST.filter((c) => c.slug !== data.slug);

  // --- Strukturált adat ---
  // A LocalBusiness node-ot NEM definiáljuk újra, csak hivatkozunk rá,
  // hogy a Google egy entitásként kezelje (terv 10.3).
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: data.title,
    name: data.seo.title,
    description: data.seo.description || data.tagline,
    provider: { "@id": BASE },
    areaServed: { "@type": "Country", name: "Magyarország" },
    url: `${BASE}/rendezveny/${data.slug}`,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Kezdőlap", item: BASE },
      { "@type": "ListItem", position: 2, name: "Rendezvény", item: `${BASE}/rendezveny` },
      { "@type": "ListItem", position: 3, name: data.navTitle, item: `${BASE}/rendezveny/${data.slug}` },
    ],
  };

  const faqLd =
    answeredFaq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: answeredFaq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    // A kategória saját színe felülírja a globális --ev-cat változókat,
    // így a linkek aláhúzása, a GYIK ikonja és a jelzések automatikusan
    // ebbe a színbe váltanak.
    <div style={{ "--ev-cat": data.soft, "--ev-cat-deep": data.deep }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}

      {/* ═══ HERO ═══
          Statikus pasztell színmező -- itt SZÁNDÉKOSAN nincs videó
          (terv 8.8: az egyetlen mozgó elem a hub hero-ja). */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(70% 90% at 15% 15%, ${data.soft} 0%, transparent 68%),
              radial-gradient(60% 80% at 88% 40%, ${data.soft} 0%, transparent 62%),
              var(--ev-bg)
            `,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(250,250,248,0.35) 0%, rgba(250,250,248,0.85) 100%)",
          }}
        />

        <div className={`${SECTION} pb-16 pt-36 md:pb-24 md:pt-44`}>
          <Reveal>
            <nav aria-label="Morzsamenü">
              <ol className="ev-mono flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/rendezveny" className="hover:text-[var(--ev-ink)]">
                    Rendezvény
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li style={{ color: data.deep }}>{data.navTitle}</li>
              </ol>
            </nav>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="ev-display ev-d-l mt-6 max-w-[16ch]">{data.title}</h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="ev-body-l mt-6 max-w-[46ch] text-[var(--ev-ink-2)]">
              {data.tagline}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href={`${EVENT_CTA.href}?tipus=${data.slug}`}
                className="ev-btn ev-btn-primary"
              >
                {EVENT_CTA.label}
                <ArrowRight size={18} />
              </Link>
              {images.length > 0 && (
                <span className="ev-mono">{images.length} kép a galériában</span>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ PROBLÉMA → MEGOLDÁS ═══ */}
      {(data.problem || data.solution) && (
        <section className={`${SECTION} py-20 md:py-28`}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {data.problem && (
              <Reveal>
                <MonoLabel>A tipikus helyzet</MonoLabel>
                <p className="ev-display mt-5 text-xl leading-snug md:text-2xl">
                  {data.problem}
                </p>
              </Reveal>
            )}
            {data.solution && (
              <Reveal delay={80}>
                <MonoLabel>Ahogy én csinálom</MonoLabel>
                <p className="mt-5 leading-relaxed text-[var(--ev-ink-2)]">
                  {data.solution}
                </p>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* ═══ MIT KAPSZ ═══ */}
      {data.deliverables?.length > 0 && (
        <section className="py-20 md:py-28" style={{ background: "var(--ev-surface)" }}>
          <div className={SECTION}>
            <Reveal>
              <MonoLabel>Mit kapsz</MonoLabel>
              <h2 className="ev-display ev-d-m mt-5 max-w-[18ch]">
                Ez kerül át hozzád.
              </h2>
            </Reveal>

            <ul className="mt-10 grid gap-x-10 sm:grid-cols-2">
              {data.deliverables.map((item, i) => (
                <Reveal as="li" key={item} delay={i * 60}>
                  <span
                    className="flex items-start gap-3 border-b py-4"
                    style={{ borderColor: "var(--ev-line)" }}
                  >
                    <Check
                      size={18}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0"
                      style={{ color: data.deep }}
                    />
                    <span className="text-[0.98rem]">{item}</span>
                  </span>
                </Reveal>
              ))}
            </ul>

            {data.priceFrom && (
              <Reveal>
                <p className="mt-10 text-lg">
                  <span className="text-[var(--ev-ink-2)]">Ártól: </span>
                  <span className="ev-display text-2xl" style={{ color: data.deep }}>
                    {data.priceFrom}
                  </span>
                </p>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* ═══ GALÉRIA ═══ */}
      {images.length > 0 && (
        <section className={`${SECTION} py-20 md:py-28`}>
          <Reveal>
            <MonoLabel>Galéria</MonoLabel>
            <h2 className="ev-display ev-d-m mt-5 max-w-[20ch]">
              Válogatás a {data.navTitle.toLowerCase()} munkáimból.
            </h2>
          </Reveal>

          <div className="mt-12">
            <GalleryMasonry images={images} accent={data.soft} />
          </div>
        </section>
      )}

      {/* ═══ KAPCSOLÓDÓ ESETTANULMÁNY ═══ */}
      {relatedCases.length > 0 && (
        <section className="py-20 md:py-28" style={{ background: "var(--ev-surface)" }}>
          <div className={SECTION}>
            <Reveal>
              <MonoLabel>Közelebbről</MonoLabel>
              <h2 className="ev-display ev-d-m mt-5 max-w-[18ch]">
                Egy rendezvény, végigkövetve.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {relatedCases.slice(0, 2).map((item, i) => {
                const imgs = getEventImages(item.event);
                return (
                  <Reveal key={item.slug} delay={i * 80}>
                    <CaseCard item={item} image={imgs[0]} imageCount={imgs.length} />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══ GYIK ═══ */}
      {answeredFaq.length > 0 && (
        <section className={`${SECTION} py-20 md:py-28`}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <MonoLabel>Gyakori kérdések</MonoLabel>
              <h2 className="ev-display ev-d-m mt-5 max-w-[14ch]">
                {data.navTitle} — amit kérdezni szoktak.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <FaqAccordion items={answeredFaq} />
            </Reveal>
          </div>
        </section>
      )}

      {/* ═══ TOVÁBBI KATEGÓRIÁK ═══ */}
      <section className="py-20 md:py-28" style={{ background: "var(--ev-surface)" }}>
        <div className={SECTION}>
          <Reveal>
            <MonoLabel>További területek</MonoLabel>
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((cat, i) => (
              <Reveal as="li" key={cat.slug} delay={i * 50}>
                <Link
                  href={`/rendezveny/${cat.slug}`}
                  className="group flex h-full items-center justify-between gap-3 rounded-ev p-5 transition-transform duration-500 ease-ev-out hover:-translate-y-1"
                  style={{ background: cat.soft }}
                >
                  <span className="text-sm font-medium">{cat.navTitle}</span>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: cat.deep }}
                  />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ ZÁRÓ CTA ═══ */}
      <section className={`${SECTION} py-20 md:py-28`}>
        <Reveal>
          <div
            className="relative overflow-hidden rounded-ev px-7 py-14 text-center md:px-16 md:py-20"
            style={{ background: data.soft }}
          >
            <h2 className="ev-display ev-d-m mx-auto max-w-[18ch]">
              {data.navTitle} rendezvényed lesz? Kérj rá ajánlatot.
            </h2>
            <p className="mx-auto mt-5 max-w-[46ch] text-[var(--ev-ink-2)]">
              Írd meg a dátumot, a helyszínt és azt, hogy mire van szükséged.
              {" "}
              {EVENT_SITE.contact.responseTime}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href={`${EVENT_CTA.href}?tipus=${data.slug}`}
                className="ev-btn ev-btn-primary"
              >
                {EVENT_CTA.label}
                <ArrowRight size={18} />
              </Link>
              <a href={EVENT_SITE.contact.phoneHref} className="ev-btn ev-btn-ghost">
                {EVENT_SITE.contact.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
