import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/rendezveny/Reveal";

/**
 * A három szolgáltatási pillér: FOTÓ / VIDEÓ / TARTALOM.
 *
 * Ez a legfontosabb pozicionálási üzenet (terv 2.2): nem „rendezvényfotós",
 * hanem tartalomgyártó, aki eseményen dolgozik. Ezért kap mindhárom
 * egyenrangú, azonos súlyú blokkot — nem a fotó a nagy és a többi kicsi.
 */
export default function PillarBlock({ pillars }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-ev" style={{ background: "var(--ev-line)" }}>
      <div className="grid gap-px md:grid-cols-3" style={{ background: "var(--ev-line)" }}>
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.key} delay={i * 80}>
            <div
              className="flex h-full flex-col p-8 lg:p-10"
              style={{ background: "var(--ev-surface)" }}
            >
              <p className="ev-mono" style={{ color: pillar.color }}>
                {pillar.key}
              </p>

              <h3 className="ev-display mt-6 text-2xl">{pillar.title}</h3>

              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-[var(--ev-ink-2)]">
                {pillar.body}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {pillar.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-ev-sm px-2.5 py-1 text-xs"
                    style={{ background: "var(--ev-sunk)", color: "var(--ev-ink-2)" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>

              {pillar.href && (
                <Link
                  href={pillar.href}
                  className="ev-link mt-7 inline-flex w-fit items-center gap-1.5 text-sm font-semibold"
                  style={{ color: pillar.color }}
                >
                  {pillar.linkLabel}
                  <ArrowUpRight size={15} />
                </Link>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
