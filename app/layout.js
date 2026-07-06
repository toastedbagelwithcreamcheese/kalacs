import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import NavbarClient from "../components/NavbarClient";
import GlassFilter from "../components/GlassFilter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  // Amint megvan az éles domained (pl. https://kovacsbalintfoto.hu), ide írd be azt!
  metadataBase: new URL('https://kovacsbalintfoto.hu'), 
  
  title: {
    default: 'Kovács Bálint Fotográfia | Zalaegerszeg és környéke',
    template: '%s | Kovács Bálint Fotó'
  },
  description: 'Prémium fotózás Zalaegerszegen és országosan. Természetes fények, őszinte pillanatok. Esküvői fotózás, portré, családi és autófotózás kompromisszumok nélkül.',
  keywords: [
    'fotós Zalaegerszeg', 'esküvői fotós Zalaegerszeg', 'esküvői fotós', 
    'portré fotózás', 'családi fotózás', 'kismama fotózás', 'autó fotózás', 
    'Kovács Bálint fotó', 'Zala megye fotós'
  ],
  authors: [{ name: 'Kovács Bálint' }],
  creator: 'Kovács Bálint',
  publisher: 'Kovács Bálint Fotográfia',
  alternates: {
    canonical: '/',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'hu_HU',
    url: 'https://kovacsbalintfoto.hu',
    title: 'Kovács Bálint Fotográfia | Őszinte pillanatok',
    description: 'Prémium fotózás Zalaegerszegen és országosan. Fedezd fel a portfóliómat!',
    siteName: 'Kovács Bálint Fotográfia',
    // Ez a kép jelenik meg, ha megosztod a linkedet Facebookon/Messengeren
    images: [
      {
        url: '/images/_MG_0315-2.webp',
        width: 1200,
        height: 630,
        alt: 'Kovács Bálint Fotográfia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kovács Bálint Fotográfia | Őszinte pillanatok',
    description: 'Prémium fotózás Zalaegerszegen és országosan. Fedezd fel a portfóliómat!',
    images: ['/images/_MG_0315-2.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
      { rel: "android-chrome", url: "/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "android-chrome", url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "PhotographyService"],
    "name": "Kovács Bálint Fotográfia",
    "image": "https://kovacsbalintfoto.hu/images/profilkep.webp", // A saját profilképed
    "@id": "https://kovacsbalintfoto.hu",
    "url": "https://kovacsbalintfoto.hu",
    "telephone": "+36308723777", // TIPP: Írd át a saját telefonszámodra!
    "priceRange": "14900 HUF - 150000+ HUF",
    "description": "Prémium esküvői, portré, családi és autófotózás Zalaegerszegen és Budapesten. Őszinte pillanatok feszengés nélkül.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Zalaegerszeg",
      "addressCountry": "HU"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Zalaegerszeg"
      },
      {
        "@type": "City",
        "name": "Budapest"
      }
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
      "reviewCount": "24" // Ezt a számot frissítheted, ha gyűlnek a vélemények
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
    <html lang="hu">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GlassFilter />
        <NavbarClient />
        {/* A pt-[80px] eltávolítva, hogy a transzparens Navbar és a teljes képernyős Hero tökéletesen fedjék egymást */}
        <main>{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}