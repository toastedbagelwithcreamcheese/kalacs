/**
 * Végtelen görgetősáv (bizalmi sáv, referencianevek).
 *
 * A tartalmat kétszer rendereljük, és -50%-ig animáljuk: így a ciklus
 * varrat nélkül záródik. A második példány aria-hidden, hogy a
 * képernyőolvasó ne olvassa fel duplán.
 */
export default function Marquee({ items, duration = 42, className = "" }) {
  const row = (hidden) => (
    <div className="ev-marquee-row flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className="px-6 text-sm text-[var(--ev-ink-2)]">{item}</span>
          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full"
            style={{ background: "var(--ev-line-2)" }}
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`ev-marquee-wrap relative overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <div
        className="ev-marquee"
        style={{ "--ev-marquee-duration": `${duration}s` }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
