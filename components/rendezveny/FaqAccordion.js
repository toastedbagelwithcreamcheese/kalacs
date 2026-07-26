"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

/**
 * GYIK harmonika.
 *
 * A válasz nélküli kérdéseket KIHAGYJA — így félkész tartalom nem
 * kerülhet ki az oldalra, akkor sem, ha az adatfájlban még TODO van.
 */
export default function FaqAccordion({ items }) {
  const baseId = useId();
  const [open, setOpen] = useState(null);

  const ready = (items || []).filter((i) => i.answer?.trim());
  if (ready.length === 0) return null;

  return (
    <div className="border-t" style={{ borderColor: "var(--ev-line)" }}>
      {ready.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;

        return (
          <div key={i} className="border-b" style={{ borderColor: "var(--ev-line)" }}>
            <h3>
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="text-[1.05rem] font-medium">{item.question}</span>
                <Plus
                  size={20}
                  aria-hidden="true"
                  className="shrink-0 transition-transform duration-300 ease-ev-out"
                  style={{
                    color: "var(--ev-cat-deep)",
                    transform: isOpen ? "rotate(45deg)" : "none",
                  }}
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="pb-6 pr-10"
            >
              <p className="max-w-[62ch] leading-relaxed text-[var(--ev-ink-2)]">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
