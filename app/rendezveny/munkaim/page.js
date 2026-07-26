import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Reveal from "@/components/rendezveny/Reveal";
import MonoLabel from "@/components/rendezveny/MonoLabel";
import ReferenceList from "@/components/rendezveny/ReferenceList";
import MunkaimClient from "./MunkaimClient";

import { ALL_CASES } from "@/constants/rendezveny/cases";
import { EVENT_REFERENCES, TOTAL_EVENTS_BEYOND_LIST } from "@/constants/rendezveny/references";
import { EVENT_SITE, EVENT_CTA } from "@/constants/rendezveny/site";
import { getEventImages, TOTAL_IMAGE_COUNT } from "@/lib/eventMedia";

const SECTION = "mx-auto max-w-ev px-5 md:px-10 lg:px-16";
const BASE = EVENT_SITE.baseUrl;

export const metadata = {
  title: "Munkáim",
  description:
    "Rendezvényfotós és videós referenciák: konferencia, egyetemi események, offroad, sport, kultúra és magánünnepek.",
  alternates: { canonical: "/rendezveny/munkaim" },
};

export default function MunkaimPage() {
  // A képek a manifestből jönnek, ezért a szűréshez a tag-eket is
  // ide gyűjtjük össze (pl. a Foci sport-kategóriás, de egyetemi címkés).
  // A képet és a címkéket SZERVER oldalon oldjuk fel, és kész adatként
  // adjuk át — így a manifest nem kerül bele a kliens JS-csomagjába.
  const cases = ALL_CASES.map((c) => {
    const images = getEventImages(c.event);
    return {
      ...c,
      image: images[0] ?? null,
      imageCount: images.length,
      tags: Array.from(new Set(images.flatMap((i) => i.tags ?? []))),
    };
  });

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Kezdőlap", item: BASE },
      { "@type": "ListItem", position: 2, name: "Rendezvény", item: `${BASE}/rendezveny` },
      { "@type": "ListItem", position: 3, name: "Munkáim", item: `${BASE}/rendezveny/munkaim` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <section className={`${SECTION} pb-14 pt-36 md:pt-44`}>
        <Reveal>
          <MonoLabel>Munkáim</MonoLabel>
          <h1 className="ev-display ev-d-l mt-6 max-w-[16ch]">
            Rendezvények, amiken dolgoztam.
          </h1>
          <p className="ev-body-l mt-6 max-w-[52ch] text-[var(--ev-ink-2)]">
            Szűrj kategóriára, vagy görgess végig. Alul a teljes
            referencialista — abban minden rendezvény szerepel, nem csak
            azok, amikhez galéria is tartozik.
          </p>
        </Reveal>
      </section>

      <section className={`${SECTION} pb-24 md:pb-32`}>
        <MunkaimClient cases={cases} />
      </section>

      <section className="py-24 md:py-32" style={{ background: "var(--ev-surface)" }}>
        <div className={SECTION}>
          <Reveal>
            <MonoLabel>Teljes referencialista</MonoLabel>
            <h2 className="ev-display ev-d-m mt-5 max-w-[20ch]">
              Minden rendezvény, egy helyen.
            </h2>
            <p className="mt-5 max-w-[52ch] text-sm text-[var(--ev-ink-2)]">
              Jelenleg {TOTAL_IMAGE_COUNT} kép szerepel az oldalon.
            </p>
          </Reveal>

          <div className="mt-12">
            <ReferenceList
              items={EVENT_REFERENCES}
              moreCount={TOTAL_EVENTS_BEYOND_LIST}
            />
          </div>
        </div>
      </section>

      <section className={`${SECTION} py-20 md:py-28`}>
        <Reveal>
          <div
            className="rounded-ev px-7 py-14 text-center md:px-16"
            style={{ background: "var(--ev-brand-soft)" }}
          >
            <h2 className="ev-display ev-d-m mx-auto max-w-[18ch]">
              A tiéd lehet a következő.
            </h2>
            <Link href={EVENT_CTA.href} className="ev-btn ev-btn-primary mt-8">
              {EVENT_CTA.label}
              <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
