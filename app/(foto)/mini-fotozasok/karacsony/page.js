import Szezonalis from "@/components/mini-fotozasok";
import '@/app/globals.css';

export const metadata = {
  title: "Karácsonyi mini fotózás",
  description: "Karácsonyi hangulatú mini családi és gyerekfotózás Zalaegerszegen. Rövid, megfizethető ünnepi fotósorozat.",
  alternates: {
    canonical: "/mini-fotozasok/karacsony",
  },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: "https://kovacsbalintfoto.hu/mini-fotozasok/karacsony",
    title: "Karácsonyi mini fotózás Zalaegerszegen",
    description:
      "Karácsonyi hangulatú mini családi és gyerekfotózás Zalaegerszegen. Rövid, megfizethető ünnepi fotósorozat.",
    images: ["/images/_BF_2915.webp"],
  },
};

const SzezonalisPage = () => {
  return (
    
    <div>
      <Szezonalis />
    </div>
  );
};

export default SzezonalisPage;