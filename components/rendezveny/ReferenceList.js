import { EVENT_CATEGORIES } from "@/constants/rendezveny/categories";

/**
 * Sűrű referencialista — a háromszintű rendszer 3. szintje (terv 3.2).
 *
 * Ez bizonyítja a volument oldalépítés nélkül. Az `year`/`location`
 * mezők csak akkor jelennek meg, ha ki vannak töltve, tehát a lista
 * félkész adatokkal is rendben néz ki.
 */
export default function ReferenceList({ items, moreCount }) {
  if (!items?.length) return null;

  return (
    <>
      <ul
        className="grid gap-x-10 border-t sm:grid-cols-2 lg:grid-cols-3"
        style={{ borderColor: "var(--ev-line)" }}
      >
        {items.map((ref, i) => {
          const cat = EVENT_CATEGORIES[ref.category];
          const meta = [ref.year, ref.location].filter(Boolean).join(" · ");

          return (
            <li
              key={`${ref.name}-${i}`}
              className="flex items-baseline gap-3 border-b py-3.5"
              style={{ borderColor: "var(--ev-line)" }}
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 translate-y-[-1px] rounded-full"
                style={{ background: cat?.soft ?? "var(--ev-line-2)" }}
              />
              <span className="flex-1">
                <span className="block text-sm">{ref.name}</span>
                {meta && (
                  <span className="ev-mono mt-0.5 block">{meta}</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>

      {typeof moreCount === "number" && moreCount > 0 && (
        <p className="mt-6 text-sm text-[var(--ev-ink-3)]">
          …és még {moreCount} rendezvény.
        </p>
      )}
    </>
  );
}
