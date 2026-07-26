import Reveal from "@/components/rendezveny/Reveal";

/**
 * Ügyfélvélemények.
 *
 * Ha nincs valós vélemény, a komponens NEM renderel semmit — sem
 * placeholdert, sem „hamarosan" feliratot. Üres szekció jobb, mint
 * kitalált idézet.
 */
export default function TestimonialRow({ items }) {
  if (!items?.length) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((t, i) => (
        <Reveal key={i} delay={i * 80}>
          <figure
            className="flex h-full flex-col rounded-ev p-7"
            style={{ background: "var(--ev-surface)", boxShadow: "var(--tw-shadow, none)" }}
          >
            <blockquote className="flex-1 text-[0.98rem] leading-relaxed">
              &bdquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 border-t pt-4" style={{ borderColor: "var(--ev-line)" }}>
              <span className="block text-sm font-semibold">{t.name}</span>
              {(t.role || t.org) && (
                <span className="ev-mono mt-1 block">
                  {[t.role, t.org].filter(Boolean).join(" · ")}
                </span>
              )}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
