import Footer from "@/components/Footer";
/* A Navbar KÖZVETLENÜL importálva, nem `dynamic(..., { ssr: false })`-on át.
   Mérve: az ssr:false miatt a kiszolgált HTML-ben nem volt sem <nav>, sem
   egyetlen menülink — így a Google-nak nem volt belső crawl-útja a
   szolgáltatásoldalakhoz (2026-09-14-én 18 URL-ből 14 "unknown to Google"),
   az AI-robotok pedig — amelyek nem futtatnak JavaScriptet — navigáció
   nélküli oldalt láttak. A Navbar "use client", de attól még előrenderelődik
   a szerveren; a window-hoz csak useEffect-ben nyúl, ami böngészőben fut. */
import Navbar from "@/components/Navbar";
import GlassFilter from "@/components/GlassFilter";

// A fotós oldal chrome-ja és metaadatai. Ez a route group ("(foto)") NEM
// jelenik meg az URL-ben -- minden útvonal pontosan ott maradt, ahol volt.
// A /rendezveny saját layoutot kap, így nem örökli ezt a fejlécet/láblécet.
export const metadata = {
  title: {
    default: "Kovács Bálint Fotó | Zalaegerszeg és környéke",
    template: "%s | Kovács Bálint Fotó",
  },
  description:
    "Prémium fotózás Zalaegerszegen és országosan. Természetes fények, őszinte pillanatok. Esküvői fotózás, portré, családi és autófotózás kompromisszumok nélkül.",
  keywords: [
    "fotós Zalaegerszeg", "esküvői fotós Zalaegerszeg", "esküvői fotós",
    "portré fotózás", "családi fotózás", "kismama fotózás", "autó fotózás",
    "Kovács Bálint fotó", "Zala megye fotós",
  ],
  authors: [{ name: "Kovács Bálint" }],
  creator: "Kovács Bálint",
  publisher: "Kovács Bálint Fotó",
  /* SZÁNDÉKOSAN nincs itt `alternates.canonical`: a layout-szintű érték
     minden felül nem író oldalra átszivárog. Minden lap a SAJÁT
     page.js-ében/layout.js-ében adja meg a canonicalját. */
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: "https://kovacsbalintfoto.hu",
    title: "Kovács Bálint Fotó | Őszinte pillanatok",
    description: "Prémium fotózás Zalaegerszegen és országosan. Fedezd fel a portfóliómat!",
    siteName: "Kovács Bálint Fotó",
    images: [
      {
        url: "/images/_MG_0315-2.webp",
        width: 1200,
        height: 630,
        alt: "Kovács Bálint Fotó",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kovács Bálint Fotó | Őszinte pillanatok",
    description: "Prémium fotózás Zalaegerszegen és országosan. Fedezd fel a portfóliómat!",
    images: ["/images/_MG_0315-2.webp"],
  },
};

export default function FotoLayout({ children }) {
  /* Az AI-asszisztensek személyt keresnek („ki fotóz kutyákat Zalaegerszegen?"),
     nem cégnevet. Eddig csak a LocalBusiness létezett, a founder pedig egy
     önálló azonosító nélküli töredék volt — így semmi sem mondta ki gépi
     olvasásra, hogy milyen témákban vagyok releváns. */
  const person = {
    "@type": "Person",
    "@id": "https://kovacsbalintfoto.hu/#kovacs-balint",
    "name": "Kovács Bálint",
    "jobTitle": "Fotográfus",
    "image": "https://kovacsbalintfoto.hu/images/profilkep.webp",
    "url": "https://kovacsbalintfoto.hu/about",
    "telephone": "+36308723777",
    "worksFor": { "@id": "https://kovacsbalintfoto.hu" },
    "knowsAbout": [
      "Esküvői fotózás",
      "Portréfotózás",
      "Családi fotózás",
      "Kismama fotózás",
      "Autófotózás",
      "Motorfotózás",
      "Rolling shot fotózás",
      "Kutyafotózás",
    ],
    "homeLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Zalaegerszeg",
        "addressCountry": "HU",
      },
    },
    "sameAs": [
      "https://maps.google.com/?cid=2686351091748372696",
      "https://www.facebook.com/profile.php?id=61577861518379",
      "https://www.instagram.com/k_balintfoto/",
    ],
  };

  const business = {
    "@type": ["LocalBusiness", "PhotographyService"],
    /* A Google Cégprofilon ez a név szerepel; a Google a névegyezésből
       is dolgozik, ezért itt is ez a fő alak. */
    "name": "Kovács Bálint Fotó",
    "alternateName": "Kovács Bálint Fotográfia",
    "image": "https://kovacsbalintfoto.hu/images/profilkep.webp",
    "@id": "https://kovacsbalintfoto.hu",
    "url": "https://kovacsbalintfoto.hu",
    "telephone": "+36308723777",
    "email": "kapcsolat@kovacsbalintfoto.hu",
    "knowsLanguage": "hu",
    "logo": "https://kovacsbalintfoto.hu/images/profilkep.webp",
    /* A Google a priceRange-ben rövid, szimbolikus jelzést vár ($–$$$$);
       a konkrét árak a szolgáltatásoldalak Offer-jeiben vannak. */
    "priceRange": "$$",
    "description": "Prémium esküvői, portré, családi és autófotózás Zalaegerszegen és Budapesten. Őszinte pillanatok feszengés nélkül.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Zalaegerszeg",
      "addressRegion": "Zala",
      "addressCountry": "HU"
    },
    /* Zalaegerszeg városközpontja, NEM a lakcím. Kiszállással dolgozó
       vállalkozásnál ez a szokásos megoldás: a séma addressLocality-je is
       Zalaegerszeg, tehát a kettő fedi egymást. A Cégprofil megosztott
       linkjében szereplő 46.8798, 17.7334 SZÁNDÉKOSAN nincs itt — az a
       kiszolgált terület számított középpontja (valahol a Balatonnál),
       nem a székhely. */
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 46.8417,
      "longitude": 16.8416
    },
    "hasMap": "https://maps.google.com/?cid=2686351091748372696",
    "areaServed": [
      { "@type": "City", "name": "Zalaegerszeg" },
      { "@type": "City", "name": "Budapest" }
    ],
    "founder": { "@id": "https://kovacsbalintfoto.hu/#kovacs-balint" },
    /* A Google Cégprofil stabil hivatkozása (cid). Ez köti össze a Google
       szemében a weboldalt és a céget. */
    "sameAs": [
      "https://maps.google.com/?cid=2686351091748372696",
      "https://www.facebook.com/profile.php?id=61577861518379",
      "https://www.instagram.com/k_balintfoto/"
    ],
    /* Az `aggregateRating` SZÁNDÉKOSAN nincs itt. Korábban a layoutból mind a
       17 lapra kiment 5,0/24 értékkel, miközben az adatbázisban hat jóváhagyott
       vélemény van, és a legtöbb lapon egy sem látszott — ez a Google strukturált
       adat szabályzatába ütközik. Az értékelés mostantól kizárólag a
       /velemenyek oldalon jelenik meg, valós, adatbázisból számolt adattal. */
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Esküvői Fotózás",
          "url": "https://kovacsbalintfoto.hu/szolgaltatasok/eskuvo"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Portré Fotózás",
          "url": "https://kovacsbalintfoto.hu/szolgaltatasok/portre"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Kismama Fotózás",
          "url": "https://kovacsbalintfoto.hu/szolgaltatasok/kismama"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Családi Fotózás",
          "url": "https://kovacsbalintfoto.hu/szolgaltatasok/family-sessions"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Autó, motoros Fotózás",
          "url": "https://kovacsbalintfoto.hu/szolgaltatasok/autok"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Kutyafotózás",
          "url": "https://kovacsbalintfoto.hu/szolgaltatasok/kutyusok"
        }
      }
    ]
  };

  const website = {
    "@type": "WebSite",
    "@id": "https://kovacsbalintfoto.hu/#website",
    url: "https://kovacsbalintfoto.hu",
    name: "Kovács Bálint Fotó",
    inLanguage: "hu-HU",
    publisher: { "@id": "https://kovacsbalintfoto.hu" },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [business, person, website],
  };

  return (
    <>
      <GlassFilter />
      <Navbar />
      {/* Nincs pt-[80px]: a transzparens Navbar és a teljes képernyős Hero
          szándékosan fedik egymást. */}
      <main>{children}</main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
