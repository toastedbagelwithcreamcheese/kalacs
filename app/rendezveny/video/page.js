import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

import Reveal from "@/components/rendezveny/Reveal";
import MonoLabel from "@/components/rendezveny/MonoLabel";
import VideoFacade from "@/components/rendezveny/VideoFacade";
import ReelWall from "@/components/rendezveny/ReelWall";
import FaqAccordion from "@/components/rendezveny/FaqAccordion";

import { EVENT_SITE, EVENT_CTA } from "@/constants/rendezveny/site";
import {
  SHOWREEL,
  VIDEO_PRODUCTS,
  VSL,
  VIDEO_FAQ,
} from "@/constants/rendezveny/video";
import { getImageMeta } from "@/lib/eventMedia";

const SECTION = "mx-auto max-w-ev px-5 md:px-10 lg:px-16";
const BASE = EVENT_SITE.baseUrl;

export const metadata = {
  title: "Videó, aftermovie és VSL",
  description:
    "Aftermovie, social media rövidvideók, előadásrögzítés és értékesítő videó (VSL). Rendezvényekre és szolgáltatóknak.",
  keywords: [
    "aftermovie készítés",
    "rendezvény videós",
    "VSL videó készítés",
    "social media tartalomgyártás",
    "reels készítés",
    "előadás rögzítés",
  ],
  alternates: { canonical: "/rendezveny/video" },
};

/** Poszterkép feloldása útvonalból (a manifestből jön a méret). */
function poster(src, alt) {
  const meta = getImageMeta(src);
  return meta ? { src, alt, ...meta } : null;
}

export default function VideoPage() {
  const showreelPoster = poster(SHOWREEL.posterFrom, "Showreel előnézet");

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Kezdőlap", item: BASE },
      { "@type": "ListItem", position: 2, name: "Rendezvény", item: `${BASE}/rendezveny` },
      { "@type": "ListItem", position: 3, name: "Videó és VSL", item: `${BASE}/rendezveny/video` },
    ],
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Rendezvényvideó, aftermovie és értékesítő videó",
    provider: { "@id": BASE },
    areaServed: { "@type": "Country", name: "Magyarország" },
    url: `${BASE}/rendezveny/video`,
  };

  const answeredFaq = VIDEO_FAQ.filter((f) => f.answer?.trim());
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
    <div style={{ "--ev-cat": "#DFC8EE", "--ev-cat-deep": "#79489C" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(65% 80% at 18% 18%, #DFC8EE 0%, transparent 66%),
              radial-gradient(55% 70% at 86% 44%, #C6CEF7 0%, transparent 62%),
              var(--ev-bg)
            `,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(250,250,248,0.35) 0%, rgba(250,250,248,0.9) 100%)",
          }}
        />

        <div className={`${SECTION} pb-16 pt-36 md:pb-24 md:pt-44`}>
          <Reveal>
            <MonoLabel>Videó &amp; tartalomgyártás</MonoLabel>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="ev-display ev-d-l mt-6 max-w-[17ch]">
              Amit a rendezvény után is használni fogsz.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="ev-body-l mt-6 max-w-[52ch] text-[var(--ev-ink-2)]">
              Aftermovie, social rövidvideók, előadásrögzítés — és külön
              termékként értékesítő videó (VSL) szolgáltatóknak és
              oktatóknak.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <Link href={EVENT_CTA.href} className="ev-btn ev-btn-primary mt-9">
              {EVENT_CTA.label}
              <ArrowRight size={18} />
            </Link>
          </Reveal>

          {/* Csak akkor jelenik meg, ha van feltöltött showreel. */}
          {SHOWREEL.youtubeId && (
            <Reveal delay={320}>
              <div className="mt-14">
                <VideoFacade
                  youtubeId={SHOWREEL.youtubeId}
                  poster={showreelPoster}
                  title={SHOWREEL.title}
                />
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ═══ HÁROM TERMÉK ═══ */}
      <section className={`${SECTION} py-20 md:py-28`}>
        <Reveal>
          <MonoLabel>Rendezvényhez</MonoLabel>
          <h2 className="ev-display ev-d-m mt-5 max-w-[18ch]">
            Három anyag, három célra.
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-16 lg:gap-24">
          {VIDEO_PRODUCTS.map((product, i) => {
            const p = poster(product.posterFrom, `${product.label} előnézet`);
            const flip = i % 2 === 1;

            return (
              <Reveal key={product.key}>
                <div
                  className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                    flip ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <MonoLabel index={i + 1} style={{ color: product.color }}>
                      {product.label}
                    </MonoLabel>
                    <h3 className="ev-display mt-4 text-2xl md:text-3xl">
                      {product.headline}
                    </h3>
                    <p className="mt-4 max-w-[46ch] leading-relaxed text-[var(--ev-ink-2)]">
                      {product.body}
                    </p>

                    <ul className="mt-7 flex flex-col gap-2.5">
                      {product.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-[0.95rem]">
                          <Check
                            size={17}
                            aria-hidden="true"
                            className="mt-0.5 shrink-0"
                            style={{ color: product.color }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {product.priceFrom && (
                      <p className="mt-7">
                        <span className="text-[var(--ev-ink-2)]">Ártól: </span>
                        <span className="ev-display text-xl" style={{ color: product.color }}>
                          {product.priceFrom}
                        </span>
                      </p>
                    )}
                  </div>

                  <div>
                    {product.youtubeId ? (
                      <VideoFacade
                        youtubeId={product.youtubeId}
                        poster={p}
                        title={product.headline}
                      />
                    ) : (
                      p && (
                        // Videó híján a saját fotó áll helyette -- nem
                        // törött lejátszó, nem placeholder-grafika.
                        <div
                          className="overflow-hidden rounded-ev"
                          style={{ background: "var(--ev-sunk)" }}
                        >
                          <Image
                            src={p.src}
                            alt={p.alt}
                            width={p.width}
                            height={p.height}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ═══ REELS FAL — csak ha van feltöltött rövidvideó ═══ */}
      <section className={`${SECTION} pb-4`}>
        <ReelWall items={[]} />
      </section>

      {/* ═══ VSL ═══ */}
      <section className="py-20 md:py-28" style={{ background: "var(--ev-surface)" }}>
        <div className={SECTION}>
          <Reveal>
            <MonoLabel>{VSL.eyebrow}</MonoLabel>
            <h2 className="ev-display ev-d-l mt-5 max-w-[16ch]">{VSL.headline}</h2>
            <p className="ev-body-l mt-6 max-w-[56ch] text-[var(--ev-ink-2)]">
              {VSL.intro}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <Reveal>
              <h3 className="ev-mono">Kinek készül</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {VSL.audience.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-[0.95rem]">
                    <Check size={17} aria-hidden="true" className="mt-0.5 shrink-0" style={{ color: "#79489C" }} />
                    {a}
                  </li>
                ))}
              </ul>

              <h3 className="ev-mono mt-10">Mit kapsz</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {VSL.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-[0.95rem]">
                    <Check size={17} aria-hidden="true" className="mt-0.5 shrink-0" style={{ color: "#79489C" }} />
                    {d}
                  </li>
                ))}
              </ul>

              {VSL.priceFrom && (
                <p className="mt-9">
                  <span className="text-[var(--ev-ink-2)]">Ártól: </span>
                  <span className="ev-display text-2xl" style={{ color: "#79489C" }}>
                    {VSL.priceFrom}
                  </span>
                </p>
              )}
            </Reveal>

            <Reveal delay={80}>
              <h3 className="ev-mono">A folyamat</h3>
              <ol className="mt-4">
                {VSL.process.map((step, i) => (
                  <li
                    key={step.title}
                    className="grid grid-cols-[2.5rem_1fr] gap-4 border-b py-4"
                    style={{ borderColor: "var(--ev-line)" }}
                  >
                    <span className="ev-mono pt-0.5" style={{ color: "#79489C" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-semibold">{step.title}</span>
                      <span className="mt-1 block text-sm text-[var(--ev-ink-2)]">
                        {step.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          {VSL.youtubeId && (
            <Reveal>
              <div className="mt-14">
                <VideoFacade
                  youtubeId={VSL.youtubeId}
                  poster={poster(VSL.posterFrom, "VSL példa")}
                  title="VSL példa"
                />
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ═══ MOTION GRAFIKA ═══ */}
      <section className={`${SECTION} py-20 md:py-28`}>
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <MonoLabel>Motion grafika</MonoLabel>
              <h2 className="ev-display ev-d-m mt-5 max-w-[16ch]">
                Mozgó grafika, ami nem sablonból van.
              </h2>
            </div>
            <p className="leading-relaxed text-[var(--ev-ink-2)]">
              Feliratok, kiemelések, animált nyitó- és zárókép, magyarázó
              grafikák. Ezeket az anyagokat egyedileg készítem, nem
              előre gyártott sablonokból — így a videód nem néz ki
              ugyanúgy, mint a többi.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ═══ GYIK ═══ */}
      {answeredFaq.length > 0 && (
        <section className="py-20 md:py-28" style={{ background: "var(--ev-surface)" }}>
          <div className={SECTION}>
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
              <Reveal>
                <MonoLabel>Gyakori kérdések</MonoLabel>
                <h2 className="ev-display ev-d-m mt-5 max-w-[14ch]">
                  Videóval kapcsolatban.
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <FaqAccordion items={answeredFaq} />
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ═══ CTA ═══ */}
      <section className={`${SECTION} py-20 md:py-28`}>
        <Reveal>
          <div
            className="rounded-ev px-7 py-14 text-center md:px-16 md:py-20"
            style={{ background: "#DFC8EE" }}
          >
            <h2 className="ev-display ev-d-m mx-auto max-w-[18ch]">
              Videóra van szükséged? Beszéljük át.
            </h2>
            <p className="mx-auto mt-5 max-w-[46ch] text-[var(--ev-ink-2)]">
              {EVENT_SITE.contact.responseTime}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href={EVENT_CTA.href} className="ev-btn ev-btn-primary">
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
