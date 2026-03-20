import EskuvoClient from "./EskuvoClient";

export const metadata = {
  title: "Esküvői Fotózás | Kovács Bálint Fotó",
  description: "Prémium esküvői fotózás Zalaegerszegen és országosan. Örökítsd meg életed legszebb napját őszinte, elegáns és művészi fotókon feszengés nélkül.",
  openGraph: {
    title: "Esküvői Fotózás | Kovács Bálint",
    description: "Prémium esküvői fotózás. Őszinte pillanatok feszengés nélkül.",
    images: ["/images/Eskuvo2026-3.webp"],
  },
};

export default function EskuvoPage() {
  return <EskuvoClient />;
}