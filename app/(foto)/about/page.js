import AboutClient from "./AboutClient";

export const metadata = {
  title: "Rólam - Kovács Bálint Fotográfus | Budapest & Zalaegerszeg",
  description: "Ismerd meg Kovács Bálint fotográfust! Prémium esküvői, portré és családi fotózás Budapesten, Zalaegerszegen és országosan. Valódi érzelmek, pózok nélkül.",
  keywords: [
    "Kovács Bálint fotós",
    "fotós Budapest",
    "fotós Zalaegerszeg",
    "esküvői fotós Budapest",
    "portré fotós Budapest",
    "családi fotózás Zalaegerszeg",
    "profi fotós"
  ],
  openGraph: {
    title: "Rólam - Kovács Bálint Fotográfus",
    description: "Két bázisom van: Zalaegerszeg és Budapest. Célom a valódi érzelmek megörökítése.",
    images: ["/images/profilkep.webp"],
  }
};

export default function AboutPage() {
  return <AboutClient />;
}