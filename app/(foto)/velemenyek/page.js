import ReviewsClient from "./ReviewsClient";
import { getApprovedReviews, ratingSummary } from "@/lib/reviews";

/**
 * A vélemények oldal SZERVEROLDALON tölti be az adatot, és itt — és kizárólag
 * itt — kerül ki az értékelés strukturált adata.
 *
 * Korábban a layout minden lapra kitette az `aggregateRating`-et 5,0/24
 * értékkel, miközben az adatbázisban hat jóváhagyott vélemény van, és a
 * lapokon egy sem látszott. A Google szabályzata szerint az értékelés csak
 * olyan oldalon jelölhető, ahol a vélemények láthatóan ott vannak, és a szám
 * valós véleményekből kell származzon. Most mindkettő teljesül: az átlag és a
 * darabszám az adatbázisból számolódik, és minden véleményhez saját `Review`
 * elem tartozik.
 */
export default async function Page() {
  const reviews = await getApprovedReviews();
  const osszegzes = ratingSummary(reviews);

  const ld = osszegzes
    ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://kovacsbalintfoto.hu#business",
        name: "Kovács Bálint Fotó",
        url: "https://kovacsbalintfoto.hu",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: String(osszegzes.value),
          reviewCount: String(osszegzes.count),
          bestRating: "5",
          worstRating: "1",
        },
        review: reviews.map((r) => ({
          "@type": "Review",
          /* Csak a keresztnév + vezetéknév megy ki, ahogy a lapon is látszik.
             Az e-mail-cím az adatbázisban van, de ide SOHA nem kerülhet. */
          author: { "@type": "Person", name: r.name },
          datePublished: r.created_at ? r.created_at.slice(0, 10) : undefined,
          reviewBody: r.review_text,
          reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5", worstRating: "1" },
        })),
      }
    : null;

  return (
    <>
      <ReviewsClient reviews={reviews} />
      {ld && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      )}
    </>
  );
}
