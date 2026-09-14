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

export default function HusvetLayout({ children }) {
  return children;
}
