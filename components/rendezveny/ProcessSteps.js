import Reveal from "@/components/rendezveny/Reveal";

/**
 * A folyamat négy lépése.
 *
 * A sorszám itt VALÓDI információt hordoz — ez tényleg egy sorrend,
 * nem díszítés. Ezért kap számot, és ezért fut végig a vonal.
 */
export default function ProcessSteps({ steps }) {
  return (
    <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {/* Összekötő vonal desktopon */}
      <span
        aria-hidden="true"
        className="absolute left-0 right-0 top-[0.6rem] hidden h-px lg:block"
        style={{ background: "var(--ev-line)" }}
      />

      {steps.map((step, i) => (
        <li key={step.title} className="relative">
          <Reveal delay={i * 100}>
            <span
              aria-hidden="true"
              className="relative block h-[1.2rem] w-[1.2rem] rounded-full"
              style={{
                background: step.color,
                // A háttérszínű gyűrű kitakarja alatta a vonalat,
                // így a pötty ráül a vonalra, nem alá kerül.
                boxShadow: "0 0 0 5px var(--ev-bg)",
              }}
            />

            <p className="ev-mono mt-5">
              {String(i + 1).padStart(2, "0")}
            </p>

            <h3 className="ev-display mt-2 text-xl">{step.title}</h3>

            <p className="mt-2.5 max-w-[34ch] text-sm leading-relaxed text-[var(--ev-ink-2)]">
              {step.body}
            </p>

            {step.note && (
              <p
                className="mt-3 text-sm font-semibold"
                style={{ color: step.color }}
              >
                {step.note}
              </p>
            )}
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
