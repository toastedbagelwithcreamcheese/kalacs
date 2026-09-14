import "server-only";

/**
 * Jóváhagyott ügyfélvélemények, SZERVEROLDALON betöltve.
 *
 * Miért nem a böngészőben, ahogy eddig: a vélemények kizárólag kliensoldali
 * Supabase-lekérésből jelentek meg, ezért a kiszolgált HTML-ben egyetlen sor
 * sem volt belőlük. Két kár származott ebből:
 *
 *  1. A hat valódi, öt csillagos vélemény — ebből négy családi, portré és
 *     kismama témájú, tele pontosan azokkal a szavakkal, amiket a leendő
 *     ügyfelek is beírnak — láthatatlan volt a kereső és az AI-asszisztensek
 *     számára. Az AI-robotok nem futtatnak JavaScriptet.
 *  2. A strukturált adat 5,0-s átlagot és 24 értékelést állított, miközben a
 *     lapon nulla vélemény látszott. A Google szabályzata szerint az értékelés
 *     csak olyan lapon jelölhető, ahol a vélemények láthatóan ott vannak.
 *
 * Az `email` mezőt SOHA nem adjuk tovább: az adatbázisban benne van, de sem a
 * HTML-be, sem a strukturált adatba nem kerülhet.
 */
const URL_ = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function parseList(v) {
  if (Array.isArray(v)) return v;
  if (typeof v !== "string" || !v.trim() || v === "None") return [];
  try {
    return JSON.parse(v.replace(/'/g, '"')) || [];
  } catch {
    return [];
  }
}

export async function getApprovedReviews() {
  if (!URL_ || !KEY) return [];
  try {
    const r = await fetch(
      `${URL_}/rest/v1/velemenyek?select=id,created_at,name,rating,collection,review_text,profile_image_url,product_image_urls&status=eq.jovahagyva&order=created_at.desc`,
      {
        headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
        /* Óránként frissül: a vélemények ritkán változnak, a statikus lap
           viszont így nem avul el egy új jóváhagyás után sem. */
        next: { revalidate: 3600 },
      },
    );
    if (!r.ok) return [];
    const sorok = await r.json();
    return sorok.map((x) => ({
      id: String(x.id),
      name: (x.name || "").trim(),
      rating: Number(x.rating) || 5,
      collection: x.collection || "",
      review_text: (x.review_text || "").trim(),
      created_at: x.created_at || null,
      profile_image_url: x.profile_image_url && x.profile_image_url !== "None" ? x.profile_image_url : null,
      product_image_urls: parseList(x.product_image_urls),
    }));
  } catch {
    return []; // a mérés és a vélemények sosem törhetik el az oldalt
  }
}

/** Átlag és darabszám a valós adatból — kézzel beírt szám helyett. */
export function ratingSummary(reviews) {
  if (!reviews.length) return null;
  const sum = reviews.reduce((a, r) => a + (Number(r.rating) || 0), 0);
  return {
    count: reviews.length,
    value: Math.round((sum / reviews.length) * 10) / 10,
  };
}
