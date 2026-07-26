import { Schibsted_Grotesk } from "next/font/google";
import "./rendezveny.css";
import EventNav from "@/components/rendezveny/EventNav";
import EventFooter from "@/components/rendezveny/EventFooter";
import StickyCta from "@/components/rendezveny/StickyCta";
import { EVENT_SITE } from "@/constants/rendezveny/site";

// latin-ext KÖTELEZŐ: az ő (U+0151) és ű (U+0171) csak abban van benne.
const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Rendezvényfotós és videós | Kovács Bálint",
    template: "%s | Kovács Bálint Rendezvény",
  },
  description:
    "Fotó, videó és social tartalom rendezvényekre — konferenciáktól gólyabálon át az offroad futamokig. Zalaegerszeg, Budapest és egész Magyarország.",
  keywords: [
    "rendezvényfotós", "rendezvény fotózás", "eseményfotós", "rendezvény videós",
    "konferencia fotós", "céges rendezvény fotózás", "aftermovie készítés",
  ],
  alternates: {
    canonical: "/rendezveny",
  },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: `${EVENT_SITE.baseUrl}${EVENT_SITE.basePath}`,
    siteName: "Kovács Bálint Rendezvény",
    title: "Rendezvényfotós és videós | Kovács Bálint",
    description:
      "Fotó, videó és social tartalom rendezvényekre — konferenciáktól gólyabálon át az offroad futamokig.",
  },
};

export default function RendezvenyLayout({ children }) {
  return (
    <div className={`ev-root ${schibsted.variable}`}>
      <EventNav />
      <main>{children}</main>
      <EventFooter />
      <StickyCta />
    </div>
  );
}
