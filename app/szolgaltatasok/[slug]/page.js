import { notFound } from "next/navigation";
import { SERVICES_DATA } from "@/constants/services";
import ServiceClient from "./ServiceClient";

const baseUrl = "https://kovacsbalintfoto.hu";

// SEO Metadata generálása a szerveren
export async function generateMetadata({ params }) {
  // ÚJDONSÁG: Be kell várni a params-t a Next.js legújabb verziójában
  const resolvedParams = await params;
  const data = SERVICES_DATA[resolvedParams.slug];

  if (!data) return {};

  return {
    title: `${data.title} - Kovács Bálint Fotó`,
    description: data.description,
    alternates: {
      canonical: `/szolgaltatasok/${resolvedParams.slug}`,
    },
    openGraph: {
      title: `${data.title} - Kovács Bálint`,
      description: data.description,
      images: [data.heroImage],
    },
  };
}

// Fő oldal komponens (Szerver oldali)
// ÚJDONSÁG: A függvénynek 'async'-nak kell lennie
export default async function ServicePage({ params }) {
  // ÚJDONSÁG: Be kell várni a params-t
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = SERVICES_DATA[slug];

  // Ha rossz URL-t írnak be (pl. /szolgaltatasok/akarmi), adjunk 404-et
  if (!data) return notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Kezdőlap", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Szolgáltatások", item: `${baseUrl}/portfolio` },
      { "@type": "ListItem", position: 3, name: data.title, item: `${baseUrl}/szolgaltatasok/${slug}` },
    ],
  };

  const faqJsonLd = data.faq && data.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } : null;

  // Ha megvan az adat, átadjuk a kliens oldali UI komponensnek
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <ServiceClient data={data} />
    </>
  );
}