import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import Reveal from "@/components/rendezveny/Reveal";
import MonoLabel from "@/components/rendezveny/MonoLabel";
import Marquee from "@/components/rendezveny/Marquee";
import StatCounter from "@/components/rendezveny/StatCounter";
import PillarBlock from "@/components/rendezveny/PillarBlock";
import ProcessSteps from "@/components/rendezveny/ProcessSteps";
import CaseCard from "@/components/rendezveny/CaseCard";
import TestimonialRow from "@/components/rendezveny/TestimonialRow";
import ReferenceList from "@/components/rendezveny/ReferenceList";
import FaqAccordion from "@/components/rendezveny/FaqAccordion";

import { EVENT_CATEGORY_LIST } from "@/constants/rendezveny/categories";
import { EVENT_SITE, EVENT_CTA } from "@/constants/rendezveny/site";
import { EVENT_FAQ } from "@/constants/rendezveny/faq";
import { EVENT_TESTIMONIALS } from "@/constants/rendezveny/testimonials";
import { EVENT_REFERENCES, TOTAL_EVENTS_BEYOND_LIST } from "@/constants/rendezveny/references";
import { FEATURED_CASES } from "@/constants/rendezveny/cases";
import { getCategoryPreview, getCategoryCounts, getEventImages } from "@/lib/eventMedia";

// A hero itt még CSS-gradienssel közelíti a PRIZMA fénymezőt; a végleges,
// görgetés-vezérelt generált szekvencia a Fázis 8-ban kerül be (terv 5.1.1).

const PILLARS = [
  {
    key: "Fotó",
    color: "#3B4BB8",
    title: "Riportfotó, ami használható",
    body: "Nem mindenből csinálok képet, hanem abból, amit utána tényleg kiraksz. Előadó, közönség, dekoráció, szponzorfal, és a pillanatok a hivatalos program között.",
    items: ["Riport", "Portré", "Csoportkép", "Sajtókép"],
    href: "/rendezveny/munkaim",
    linkLabel: "Munkáim",
  },
  {
    key: "Videó",
    color: "#79489C",
    title: "Aftermovie és előadásrögzítés",
    body: "Egy 60–90 másodperces aftermovie többet mond a rendezvényedről, mint száz kép. Teljes előadásokat is rögzítek, ha az anyagot később is használni akarod.",
    items: ["Aftermovie", "Highlight", "Előadásrögzítés", "Interjú"],
    href: "/rendezveny/video",
    linkLabel: "Videó és VSL",
  },
  {
    key: "Tartalom",
    color: "#B24870",
    title: "Social csomag és VSL",
    body: "Függőleges vágások reelsre és shortsra, motion grafikával. Ha értékesítő videóra van szükséged, a szkripttől a kész anyagig végigviszem.",
    items: ["Reels & Shorts", "Motion grafika", "VSL", "Feliratozás"],
    href: "/rendezveny/video",
    linkLabel: "Tartalomgyártás",
  },
];

const PROCESS = [
  {
    title: "Egyeztetés",
    body: "Átbeszéljük, mi a rendezvény célja, mire kell az anyag, és mikorra. Ebből lesz a forgatási terv.",
    color: "#C6CEF7",
  },
  {
    title: "Forgatás",
    body: "A helyszínen vagyok az első vendég előtt. Végigdolgozom a napot, és nem zavarom a programot.",
    color: "#C2E4D3",
  },
  {
    title: "Utómunka",
    body: "Válogatás és retus. Csak az kerül átadásra, ami tényleg jó — a selejtezés az én dolgom, nem a tiéd.",
    color: "#F0DCB6",
  },
  {
    title: "Átadás",
    body: "Online galéria, letölthető anyag, vízszintes és függőleges vágásban is.",
    color: "#DFC8EE",
  },
];

const SECTION = "mx-auto max-w-ev px-5 md:px-10 lg:px-16";

export default function RendezvenyHub() {
  const counts = getCategoryCounts();

  return (
    <>
      {/* ═══ 1. HERO ═══ */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(60% 55% at 12% 22%, #C6CEF7 0%, transparent 62%),
              radial-gradient(52% 48% at 82% 16%, #DFC8EE 0%, transparent 60%),
              radial-gradient(58% 50% at 92% 68%, #F5CDD9 0%, transparent 62%),
              radial-gradient(55% 52% at 68% 92%, #F0DCB6 0%, transparent 60%),
              radial-gradient(50% 46% at 26% 88%, #C2E4D3 0%, transparent 60%),
              radial-gradient(46% 44% at 48% 46%, #C2DEF0 0%, transparent 66%),
              var(--ev-bg)
            `,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(250,250,248,0.55) 0%, rgba(250,250,248,0.35) 45%, rgba(250,250,248,0.92) 100%)",
          }}
        />

        <div className={`${SECTION} w-full pb-20 pt-36`}>
          <Reveal>
            <MonoLabel>{EVENT_SITE.brand.tagline}</MonoLabel>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="ev-display ev-d-xl mt-6 max-w-[15ch]">
              A rendezvényed nem ér véget a záró tapssal.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="ev-body-l mt-8 max-w-[52ch] text-[var(--ev-ink-2)]">
              Fotó, videó és social tartalom rendezvényekre — konferenciáktól
              gólyabálon át az offroad futamokig. Zalaegerszeg, Budapest és
              egész Magyarország.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={EVENT_CTA.href} className="ev-btn ev-btn-primary">
                {EVENT_CTA.label}
                <ArrowRight size={18} />
              </Link>
              <Link href="/rendezveny/munkaim" className="ev-btn ev-btn-ghost">
                Munkáim
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 2. BIZALMI SÁV ═══ */}
      <section
        className="border-y"
        style={{ borderColor: "var(--ev-line)", background: "var(--ev-surface)" }}
      >
        <div className={`${SECTION} py-12`}>
          <dl className="flex flex-wrap gap-x-14 gap-y-8">
            {EVENT_SITE.stats.map((stat) => (
              <StatCounter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </dl>
        </div>
        <div className="border-t py-5" style={{ borderColor: "var(--ev-line)" }}>
          <Marquee items={EVENT_REFERENCES.map((r) => r.name)} />
        </div>
      </section>

      {/* ═══ 3. HÁROM PILLÉR ═══ */}
      <section className={`${SECTION} py-24 md:py-32`}>
        <Reveal>
          <MonoLabel>Három pillér</MonoLabel>
          <h2 className="ev-display ev-d-l mt-5 max-w-[20ch]">
            Nem csak fotós. Tartalomgyártó, aki eseményen dolgozik.
          </h2>
          <p className="mt-6 max-w-[58ch] text-[var(--ev-ink-2)]">
            A legtöbb rendezvényről készül képanyag, aztán elfekszik egy
            meghajtón. A cél az, hogy amit forgatunk, azt utána tényleg
            használni tudd — sajtóban, socialon, értékesítésben.
          </p>
        </Reveal>

        <div className="mt-14">
          <PillarBlock pillars={PILLARS} />
        </div>
      </section>

      {/* ═══ 4. KATEGÓRIÁK ═══ */}
      <section
        className="py-24 md:py-32"
        style={{ background: "var(--ev-surface)" }}
      >
        <div className={SECTION}>
          <Reveal>
            <MonoLabel>Amit vállalok</MonoLabel>
            <h2 className="ev-display ev-d-l mt-5 max-w-[18ch]">
              Hat terület, hat külön nyelv.
            </h2>
            <p className="mt-6 max-w-[56ch] text-[var(--ev-ink-2)]">
              Egy konferenciát marketinges vesz, gólyabált a HÖK, offroad
              futamot a szervező. Más igény, más tempó, más ár — ezért
              mindegyik saját oldalt kap.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EVENT_CATEGORY_LIST.map((cat, i) => {
              const preview = getCategoryPreview(cat.galleryDir, 1)[0];
              const count = counts[cat.galleryDir] ?? 0;

              return (
                <Reveal key={cat.slug} delay={i * 60}>
                  <Link
                    href={`/rendezveny/${cat.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-ev transition-transform duration-500 ease-ev-out hover:-translate-y-1"
                    style={{ background: cat.soft }}
                  >
                    {preview && (
                      <span className="relative block aspect-[4/3] overflow-hidden">
                        <Image
                          src={preview.src}
                          alt={preview.alt}
                          width={preview.width}
                          height={preview.height}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="h-full w-full object-cover transition-transform duration-700 ease-ev-out group-hover:scale-[1.04]"
                        />
                      </span>
                    )}

                    <span className="flex flex-1 flex-col p-6">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="ev-display text-xl text-[var(--ev-ink)]">
                          {cat.navTitle}
                        </span>
                        <span className="ev-mono shrink-0" style={{ color: cat.deep }}>
                          {count} kép
                        </span>
                      </span>

                      <span className="mt-2 block text-sm text-[var(--ev-ink-2)]">
                        {cat.tagline}
                      </span>

                      <span
                        className="mt-5 flex items-center gap-1.5 text-sm font-semibold"
                        style={{ color: cat.deep }}
                      >
                        Megnézem
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 5. KIEMELT MUNKÁK ═══
          Csak akkor jelenik meg, ha van kész esettanulmány (cases.js). */}
      {FEATURED_CASES.length > 0 && (
        <section className={`${SECTION} py-24 md:py-32`}>
          <Reveal>
            <MonoLabel>Kiemelt munkák</MonoLabel>
            <h2 className="ev-display ev-d-l mt-5 max-w-[18ch]">
              Néhány rendezvény, közelről.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {FEATURED_CASES.slice(0, 3).map((item, i) => {
              const imgs = getEventImages(item.event);
              return (
                <Reveal key={item.slug} delay={i * 80}>
                  <CaseCard item={item} image={imgs[0]} imageCount={imgs.length} />
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <Link
              href="/rendezveny/munkaim"
              className="ev-btn ev-btn-ghost mt-10"
            >
              Összes munkám
              <ArrowRight size={18} />
            </Link>
          </Reveal>
        </section>
      )}

      {/* ═══ 6. FOLYAMAT ═══ */}
      <section
        className="py-24 md:py-32"
        style={{ background: "var(--ev-surface)" }}
      >
        <div className={SECTION}>
          <Reveal>
            <MonoLabel>Hogyan dolgozom</MonoLabel>
            <h2 className="ev-display ev-d-l mt-5 max-w-[18ch]">
              Négy lépés, kiszámítható tempóban.
            </h2>
          </Reveal>

          <div className="mt-16">
            <ProcessSteps steps={PROCESS} />
          </div>
        </div>
      </section>

      {/* ═══ 7. VÉLEMÉNYEK ═══
          Nem jelenik meg, amíg nincs valós vélemény (testimonials.js). */}
      {EVENT_TESTIMONIALS.length > 0 && (
        <section className={`${SECTION} py-24 md:py-32`}>
          <Reveal>
            <MonoLabel>Vélemények</MonoLabel>
            <h2 className="ev-display ev-d-l mt-5 max-w-[18ch]">
              Amit a megrendelők mondanak.
            </h2>
          </Reveal>
          <div className="mt-14">
            <TestimonialRow items={EVENT_TESTIMONIALS} />
          </div>
        </section>
      )}

      {/* ═══ 8. REFERENCIALISTA ═══ */}
      <section className={`${SECTION} py-24 md:py-32`}>
        <Reveal>
          <MonoLabel>Referenciák</MonoLabel>
          <h2 className="ev-display ev-d-l mt-5 max-w-[20ch]">
            Ahol eddig dolgoztam.
          </h2>
        </Reveal>

        <div className="mt-12">
          <ReferenceList
            items={EVENT_REFERENCES}
            moreCount={TOTAL_EVENTS_BEYOND_LIST}
          />
        </div>
      </section>

      {/* ═══ 9. GYIK ═══ */}
      <section
        className="py-24 md:py-32"
        style={{ background: "var(--ev-surface)" }}
      >
        <div className={SECTION}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <MonoLabel>Gyakori kérdések</MonoLabel>
              <h2 className="ev-display ev-d-m mt-5 max-w-[14ch]">
                Amit a legtöbben megkérdeznek.
              </h2>
              <p className="mt-5 max-w-[38ch] text-sm text-[var(--ev-ink-2)]">
                Nem találod a kérdésed? Írj nyugodtan — általában{" "}
                {EVENT_SITE.contact.responseTime.toLowerCase()}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <FaqAccordion items={EVENT_FAQ} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 10. ZÁRÓ CTA ═══ */}
      <section className={`${SECTION} py-24 md:py-32`}>
        <Reveal>
          <div
            className="relative overflow-hidden rounded-ev px-7 py-16 text-center md:px-16 md:py-24"
            style={{ background: "var(--ev-brand-soft)" }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10"
              style={{
                background: `
                  radial-gradient(50% 60% at 18% 20%, #C6CEF7 0%, transparent 65%),
                  radial-gradient(46% 55% at 84% 78%, #DFC8EE 0%, transparent 65%)
                `,
                opacity: 0.75,
              }}
            />

            <h2 className="ev-display ev-d-l mx-auto max-w-[16ch]">
              Van egy rendezvényed. Beszéljünk róla.
            </h2>
            <p className="mx-auto mt-6 max-w-[48ch] text-[var(--ev-ink-2)]">
              Írd meg, mikor és hol lesz, és mire van szükséged. Küldök rá
              konkrét ajánlatot.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href={EVENT_CTA.href} className="ev-btn ev-btn-primary">
                {EVENT_CTA.label}
                <ArrowRight size={18} />
              </Link>
              <a
                href={EVENT_SITE.contact.phoneHref}
                className="ev-btn ev-btn-ghost"
              >
                {EVENT_SITE.contact.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
