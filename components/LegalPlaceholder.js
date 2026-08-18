// components/LegalPlaceholder.js
// Kiemelt jelölés a jogi oldalakon még kitöltendő, ügyféltől/hivatalos
// nyilvántartásból várt adatokhoz.
const LegalPlaceholder = ({ children }) => (
  <span className="not-prose inline bg-amber-100 text-amber-800 border border-amber-200 rounded px-1.5 py-0.5 text-[0.9em] font-medium not-italic">
    {children}
  </span>
);

export default LegalPlaceholder;
