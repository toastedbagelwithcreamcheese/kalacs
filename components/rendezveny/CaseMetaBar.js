import { EVENT_CATEGORIES } from "@/constants/rendezveny/categories";

const SERVICE_LABELS = {
  foto: "Fotó",
  video: "Videó",
  social: "Social csomag",
  vsl: "VSL",
  eloadas: "Előadásrögzítés",
};

/**
 * Mono metaadat-sáv az esettanulmány tetején.
 *
 * Csak a kitöltött mezőket jeleníti meg — így félkész adatokkal is
 * rendben néz ki, nem lesz tele „—" jelekkel.
 */
export default function CaseMetaBar({ item, imageCount }) {
  const cat = EVENT_CATEGORIES[item.category];

  const rows = [
    ["Kategória", cat?.navTitle],
    ["Dátum", item.date],
    ["Helyszín", item.location],
    ["Megrendelő", item.client],
    ["Létszám", item.attendees],
    [
      "Szolgáltatás",
      item.services?.map((s) => SERVICE_LABELS[s] ?? s).join(", "),
    ],
    ["Képanyag", imageCount ? `${imageCount} kép` : null],
  ].filter(([, value]) => Boolean(value));

  if (rows.length === 0) return null;

  return (
    <dl
      className="grid gap-x-10 gap-y-5 border-y py-7 sm:grid-cols-2 lg:grid-cols-4"
      style={{ borderColor: "var(--ev-line)" }}
    >
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt className="ev-mono">{label}</dt>
          <dd className="mt-1.5 text-[0.95rem]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
