import PortfolioClient from "./PortfolioClient";
import { PORTFOLIO_IMAGES } from "@/constants/portfolio";

const baseUrl = "https://kovacsbalintfoto.hu";

export const metadata = {
  alternates: { canonical: "/portfolio" },
  title: "Portfólió",
  description: "Válogatás a legjobb munkáimból. Esküvői, portré, családi és autófotózás Zalaegerszegen és országosan. Lapozd át a referenciáimat!",
  keywords: [
    "Kovács Bálint portfólió",
    "legjobb esküvői fotók",
    "profi portrék",
    "zalaegerszeg fotós referenciák"
  ],
  openGraph: {
    title: "Portfólió - Kovács Bálint Fotó",
    description: "Nézd meg a kedvenc felvételeimet egy lenyűgöző, szűrhető galériában!",
    images: ["/images/Eskuvo2026-3.webp"],
  }
};

/* A Google Képek önálló belépési pont egy fotósnál, de csak akkor, ha a kép
   mellé odakerül, kihez tartozik és mit ábrázol. Az ImageObject ezt mondja ki;
   a leírás az `alt`-ból jön, hogy a kettő soha ne térjen el. */
function imageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Kovács Bálint Fotó — portfólió",
    url: `${baseUrl}/portfolio`,
    author: { "@id": `${baseUrl}/#kovacs-balint` },
    associatedMedia: PORTFOLIO_IMAGES.map((img) => ({
      "@type": "ImageObject",
      contentUrl: `${baseUrl}${img.src}`,
      name: img.alt,
      description: img.alt,
      genre: img.category,
      creator: { "@id": `${baseUrl}/#kovacs-balint` },
      copyrightHolder: { "@id": `${baseUrl}/#kovacs-balint` },
      creditText: "Kovács Bálint Fotó",
      license: `${baseUrl}/aszf`,
      acquireLicensePage: `${baseUrl}/contact`,
    })),
  };
}

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageJsonLd()) }}
      />
      <PortfolioClient />
    </>
  );
}
