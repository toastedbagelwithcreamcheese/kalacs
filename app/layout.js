import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// FONTOS: a "latin" subset NEM tartalmazza az ő (U+0151) és ű (U+0171) betűket --
// azok a "latin-ext"-ben vannak. Enélkül a magyar szövegben ez a két karakter
// tartalék fonttal renderelődik, ami látszik is a szóképen.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

// Ez a gyökér layout SZÁNDÉKOSAN nem tartalmaz fejlécet/láblécet.
// A fotós oldal chrome-ja az app/(foto)/layout.js-ben él, a rendezvényes
// oldalé pedig az app/rendezveny/layout.js-ben -- így a két aloldal
// teljesen külön arculatot kaphat ugyanazon a domainen.
export const metadata = {
  metadataBase: new URL("https://kovacsbalintfoto.hu"),

  // Szándékosan sima sztring, NEM { default, template }: egy gyökér-szintű
  // template ráragadna a gyermek layoutok saját default címére is
  // (pl. "... | Kovács Bálint Fotó | Kovács Bálint"). A címsablont az
  // (foto) és a rendezveny layout külön-külön definiálja.
  title: "Kovács Bálint Fotográfia",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
        {children}
      </body>
    </html>
  );
}
