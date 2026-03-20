import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import NavbarClient from "../components/NavbarClient";

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
        src: '/images/_MG_0315-2.webp', 
        width: 1200,
        height: 630,
        alt: 'Kovács Bálint Fotográfia',
      },
    ],
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
  return (
    <html lang="hu">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NavbarClient />
        {/* A pt-[80px] eltávolítva, hogy a transzparens Navbar és a teljes képernyős Hero tökéletesen fedjék egymást */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}