import PortfolioClient from "./PortfolioClient";

export const metadata = {
  title: "Portfólió | Kovács Bálint Fotográfia",
  description: "Válogatás a legjobb munkáimból. Esküvői, portré, családi és autófotózás Zalaegerszegen és országosan. Lapozd át a referenciáimat!",
  keywords: [
    "Kovács Bálint portfólió",
    "legjobb esküvői fotók",
    "profi portrék",
    "zalaegerszeg fotós referenciák"
  ],
  openGraph: {
    title: "Portfólió - Kovács Bálint Fotográfia",
    description: "Nézd meg a kedvenc felvételeimet egy lenyűgöző, szűrhető galériában!",
    images: ["/images/Eskuvo2026-3.webp"],
  }
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}