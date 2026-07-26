/**
 * Mono metaadat-címke: `KONFERENCIA / 2024 / BUDAPEST`
 *
 * A számozás/eyebrow csak akkor kap sorszámot, ha a tartalom tényleg
 * sorrendet hordoz (pl. folyamat lépései) -- díszítésnek nem használjuk.
 */
export default function MonoLabel({ children, index, className = "", ...rest }) {
  return (
    <p className={`ev-mono flex items-center gap-2 ${className}`} {...rest}>
      {typeof index === "number" && (
        <span
          aria-hidden="true"
          style={{ color: "var(--ev-cat-deep)" }}
        >
          {String(index).padStart(2, "0")}
        </span>
      )}
      <span>{children}</span>
    </p>
  );
}
