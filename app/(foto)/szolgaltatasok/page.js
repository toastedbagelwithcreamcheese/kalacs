import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SERVICES_DATA } from "@/constants/services";

const baseUrl = "https://kovacsbalintfoto.hu";

/* A menü és a kenyérmorzsa is ide mutat „Szolgáltatások" néven — eddig
   ez az oldal nem létezett, a morzsa a /portfolio-ra hazudott. */
export const metadata = {
  title: "Fotózás Zalaegerszegen — szolgáltatások",
  description:
    "Esküvő, portré, kismama, család, autó-motor és kutyás fotózás Zalaegerszegen, Budapesten és országosan. Nézd meg, melyik fotózás illik hozzád, és mit tartalmaz.",
  alternates: { canonical: "/szolgaltatasok" },
  openGraph: {
    title: "Fotózás Zalaegerszegen — szolgáltatások",
    description:
      "Esküvő, portré, kismama, család, autó-motor és kutyás fotózás Zalaegerszegen, Budapesten és országosan.",
    images: ["/images/_BF_0185_hero.webp"],
  },
};

const ORDER = ["eskuvo", "portre", "family-sessions", "kismama", "autok", "kutyusok"];

export default function SzolgaltatasokPage() {
  const services = ORDER.filter((slug) => SERVICES_DATA[slug]).map((slug) => ({
    slug,
    ...SERVICES_DATA[slug],
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Kezdőlap", item: baseUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Szolgáltatások",
            item: `${baseUrl}/szolgaltatasok`,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Fotózás Zalaegerszegen — szolgáltatások",
        url: `${baseUrl}/szolgaltatasok`,
        about: services.map((s) => ({
          "@type": "Service",
          name: s.title,
          serviceType: s.title,
          url: `${baseUrl}/szolgaltatasok/${s.slug}`,
          provider: { "@type": "Person", name: "Kovács Bálint" },
          areaServed: [
            { "@type": "City", name: "Zalaegerszeg" },
            { "@type": "City", name: "Budapest" },
            { "@type": "Country", name: "Magyarország" },
          ],
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-36 pb-16 md:pt-44 md:pb-20 container mx-auto px-6">
        <nav aria-label="Morzsamenü" className="mb-8 text-xs uppercase tracking-widest text-gray-400">
          <Link href="/" className="hover:text-[#C79C8D] transition-colors">
            Kezdőlap
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#5A4A42]">Szolgáltatások</span>
        </nav>

        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold font-akaya text-[#5A4A42] mb-6">
            Fotózás Zalaegerszegen
          </h1>
          <p className="text-lg md:text-xl text-[#5A4A42]/80 font-light leading-relaxed">
            Hatféle fotózást vállalok — az esküvőtől a családi portrén át az
            autó- és motorfotózásig. Két bázisom Zalaegerszeg és Budapest, de
            egy izgalmas projektért az ország bármely pontjára elutazom.
            Válaszd ki, melyik fotózás illik hozzád: minden oldalon
            megtalálod, mit tartalmaz, mennyibe kerül, és mikor kapod meg a
            képeket.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32 container mx-auto px-6">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none p-0">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/szolgaltatasok/${s.slug}`}
                className="group block h-full rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F9F5F1]">
                  <Image
                    src={s.heroImage}
                    alt={`${s.title} — Kovács Bálint fotós, Zalaegerszeg és Budapest`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold font-akaya text-[#5A4A42] mb-2">
                    {s.title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed font-light mb-4">
                    {s.seoDescription ?? s.heroSubtitle}
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C79C8D]">
                    Részletek <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
