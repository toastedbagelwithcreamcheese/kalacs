import manifest from "@/constants/rendezveny/manifest.json";

/**
 * Rendezvényes képek beolvasása a generált manifestből.
 *
 * A manifestet a scripts/build-media-manifest.mjs írja: minden képhez
 * tartalmazza a tényleges width/height értéket (hogy a next/image betöltés
 * előtt le tudja foglalni a helyet -- nulla CLS), a leíró magyar alt-szöveget
 * és az esemény-címkéket.
 *
 * Nincs futásidejű lekérés és nincs külső szolgáltató: a képek a repóból,
 * a Netlify CDN-jéről szolgálnak ki.
 */

const ALL = Object.entries(manifest).map(([src, meta]) => ({ src, ...meta }));

/**
 * Egy kategória galériája.
 * @param {string} dir - a kategória galleryDir értéke (pl. "konferencia")
 */
export function getCategoryImages(dir) {
  const prefix = `/images/rendezveny/${dir}/`;
  return ALL.filter((img) => img.src.startsWith(prefix));
}

/** Egy kategória első N képe -- előnézetekhez, kártyákhoz. */
export function getCategoryPreview(dir, count = 4) {
  return getCategoryImages(dir).slice(0, count);
}

/** Egy konkrét esemény képei, eseményen belül (pl. "foci"). */
export function getEventImages(eventSlug) {
  return ALL.filter((img) => img.event === eventSlug);
}

/** Egy konkrét kép metaadata, ha ismert. */
export function getImageMeta(src) {
  return manifest[src] ?? null;
}

/** Kategóriánkénti darabszám -- a hub rácsához és a szűrőhöz. */
export function getCategoryCounts() {
  const counts = {};
  for (const img of ALL) {
    const dir = img.src.split("/")[3];
    counts[dir] = (counts[dir] || 0) + 1;
  }
  return counts;
}

export const TOTAL_IMAGE_COUNT = ALL.length;
