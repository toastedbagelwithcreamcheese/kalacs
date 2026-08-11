import Footer from "@/components/Footer";
import NavbarClient from "@/components/NavbarClient";
import GlassFilter from "@/components/GlassFilter";

// A fotós oldal chrome-ja és metaadatai. Ez a route group ("(foto)") NEM
// jelenik meg az URL-ben -- minden útvonal pontosan ott maradt, ahol volt.
// A /rendezveny saját layoutot kap, így nem örökli ezt a fejlécet/láblécet.
export const metadata = {
  title: {
    default: "Kovács Bálint Fotográfia | Zalaegerszeg és környéke",
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
  publisher: "Kovács Bálint Fotográfia",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: "https://kovacsbalintfoto.hu",
    title: "Kovács Bálint Fotográfia | Őszinte pillanatok",
    description: "Prémium fotózás Zalaegerszegen és országosan. Fedezd fel a portfóliómat!",
    siteName: "Kovács Bálint Fotográfia",
    images: [
      {
        url: "/images/_MG_0315-2.webp",
        width: 1200,
        height: 630,
        alt: "Kovács Bálint Fotográfia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kovács Bálint Fotográfia | Őszinte pillanatok",
    description: "Prémium fotózás Zalaegerszegen és országosan. Fedezd fel a portfóliómat!",
    images: ["/images/_MG_0315-2.webp"],
  },
};

export default function FotoLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "PhotographyService"],
    "name": "Kovács Bálint Fotográfia",
    "image": "https://kovacsbalintfoto.hu/images/profilkep.webp",
    "@id": "https://kovacsbalintfoto.hu",
    "url": "https://kovacsbalintfoto.hu",
    "telephone": "+36308723777",
    "priceRange": "30000 HUF - 150000+ HUF",
    "description": "Prémium esküvői, portré, családi és autófotózás Zalaegerszegen és Budapesten. Őszinte pillanatok feszengés nélkül.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Zalaegerszeg",
      "addressCountry": "HU"
    },
    "areaServed": [
      { "@type": "City", "name": "Zalaegerszeg" },
      { "@type": "City", "name": "Budapest" }
    ],
    "founder": {
      "@type": "Person",
      "name": "Kovács Bálint",
      "jobTitle": "Fotográfus"
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61577861518379",
      "https://www.instagram.com/k_balintfoto/"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "24"
    },
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

  return (
    <>
      <GlassFilter />
      <NavbarClient />
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
