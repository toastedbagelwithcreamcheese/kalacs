import EskuvoClient from "./EskuvoClient";

const baseUrl = "https://kovacsbalintfoto.hu";

export const metadata = {
  title: "Esküvői Fotózás | Kovács Bálint Fotó",
  description: "Prémium esküvői fotózás Zalaegerszegen és országosan. Örökítsd meg életed legszebb napját őszinte, elegáns és művészi fotókon feszengés nélkül.",
  alternates: {
    canonical: "/szolgaltatasok/eskuvo",
  },
  openGraph: {
    title: "Esküvői Fotózás | Kovács Bálint",
    description: "Prémium esküvői fotózás. Őszinte pillanatok feszengés nélkül.",
    images: ["/images/Eskuvo2026-3.webp"],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Kezdőlap", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Szolgáltatások", item: `${baseUrl}/portfolio` },
    { "@type": "ListItem", position: 3, name: "Esküvői Fotózás", item: `${baseUrl}/szolgaltatasok/eskuvo` },
  ],
};

export default function EskuvoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <EskuvoClient />
    </>
  );
}