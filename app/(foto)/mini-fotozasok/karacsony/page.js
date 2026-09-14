import Szezonalis from "@/components/mini-fotozasok";
import { KARACSONY_CSOMAGOK } from "@/constants/mini-fotozasok";
import '@/app/globals.css';

const baseUrl = "https://kovacsbalintfoto.hu";

export const metadata = {
  title: "Karácsonyi mini fotózás Zalaegerszegen",
  description: "Karácsonyi mini fotózás Zalaegerszegen: 25-90 perces ünnepi családi és gyerekfotózás berendezett díszletben, 30.000 Ft-tól. Foglalható október és december között.",
  alternates: {
    canonical: "/mini-fotozasok/karacsony",
  },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: "https://kovacsbalintfoto.hu/mini-fotozasok/karacsony",
    title: "Karácsonyi mini fotózás Zalaegerszegen",
    description:
      "25-90 perces ünnepi családi és gyerekfotózás berendezett díszletben, 30.000 Ft-tól.",
    images: ["/images/_BF_2915.webp"],
  },
};

/* A három csomag konkrét árral szerepel a lapon, de gépi olvasásra eddig
   semmi nem mondta ki őket. Az ár a látható szövegből jön — a kettő nem
   tud szétcsúszni, mert ugyanabból a modulból olvassuk. */
function forintba(szoveg) {
  const szam = Number(String(szoveg).replace(/[^\d]/g, ""));
  return Number.isFinite(szam) && szam > 0 ? szam : null;
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Kezdőlap", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Szolgáltatások", item: `${baseUrl}/szolgaltatasok` },
        {
          "@type": "ListItem",
          position: 3,
          name: "Karácsonyi mini fotózás",
          item: `${baseUrl}/mini-fotozasok/karacsony`,
        },
      ],
    },
    {
      "@type": "Service",
      name: "Karácsonyi mini fotózás",
      serviceType: "Ünnepi családi és gyerekfotózás",
      url: `${baseUrl}/mini-fotozasok/karacsony`,
      provider: { "@id": `${baseUrl}/#kovacs-balint` },
      areaServed: [
        { "@type": "City", name: "Zalaegerszeg" },
        { "@type": "City", name: "Budapest" },
      ],
      offers: KARACSONY_CSOMAGOK.map((cs) => ({
        "@type": "Offer",
        name: cs.title,
        price: forintba(cs.price),
        priceCurrency: "HUF",
        description: [cs.duration, ...(cs.features || [])].join(" · "),
        availability: "https://schema.org/InStock",
        url: `${baseUrl}/mini-fotozasok/karacsony#ajanlatok`,
      })),
    },
  ],
};

const SzezonalisPage = () => {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Szezonalis />
    </div>
  );
};

export default SzezonalisPage;