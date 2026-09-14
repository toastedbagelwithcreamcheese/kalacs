import { HUSVET_FAQ } from "@/constants/mini-fotozasok";

const baseUrl = "https://kovacsbalintfoto.hu";

export const metadata = {
  title: "Húsvéti mini fotózás",
  description: "Húsvéti hangulatú mini családi és gyerekfotózás Zalaegerszegen. Rövid, megfizethető tavaszi fotósorozat.",
  alternates: {
    canonical: "/mini-fotozasok/husvet",
  },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: "https://kovacsbalintfoto.hu/mini-fotozasok/husvet",
    title: "Húsvéti mini fotózás Zalaegerszegen",
    description:
      "Húsvéti hangulatú mini családi és gyerekfotózás Zalaegerszegen. Rövid, megfizethető tavaszi fotósorozat.",
    images: ["/images/_BF_2915.webp"],
  },
};

/* A GYIK-válaszok a lap legegyedibb szövegei; mostantól a HTML-ben is ott
   vannak, így a FAQPage séma is fedezettel bír. */
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
          name: "Húsvéti mini fotózás",
          item: `${baseUrl}/mini-fotozasok/husvet`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: HUSVET_FAQ.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function HusvetLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
