import { notFound } from "next/navigation";
import { SERVICES_DATA } from "@/constants/services";
import ServiceClient from "./ServiceClient";

// SEO Metadata generálása a szerveren
export async function generateMetadata({ params }) {
  // ÚJDONSÁG: Be kell várni a params-t a Next.js legújabb verziójában
  const resolvedParams = await params;
  const data = SERVICES_DATA[resolvedParams.slug];
  
  if (!data) return {};

  return {
    title: `${data.title} - Kovács Bálint Fotó`,
    description: data.description,
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

  // Ha megvan az adat, átadjuk a kliens oldali UI komponensnek
  return <ServiceClient data={data} />;
}