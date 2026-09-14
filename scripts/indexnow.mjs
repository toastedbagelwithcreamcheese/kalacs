/**
 * IndexNow-bejelentés build után.
 *
 * Csak ÉLES Netlify-buildből fut. A NETLIFY==="true" az egyetlen megbízható
 * jelző: a CLI-ből indított draft deploynál a CONTEXT is "production"-t mutat,
 * a DEPLOY_PRIME_URL pedig szintén félrevezet.
 *
 * A Google nem tagja az IndexNow-nak — ez a Bingnek, a Yandexnek, a Seznamnak
 * és a Naver-nek szól. A Bing előbb meg akarja tudni, hogy a domain a miénk:
 * amíg a Bing Webmaster Toolsban nincs igazolva a tulajdon, 403-at ad
 * (UserForbiddedToAccessSite) — az nem a kulcs hibája.
 */
const KEY = "d217f3b8c40b455bbf75acdc8ff045dc";
const HOST = "kovacsbalintfoto.hu";
const ORIGIN = `https://${HOST}`;

if (process.env.NETLIFY !== "true" || process.env.CONTEXT !== "production") {
  console.log("[indexnow] kihagyva (nem éles Netlify-build)");
  process.exit(0);
}

const res = await fetch(`${ORIGIN}/sitemap.xml`);
if (!res.ok) {
  console.log(`[indexnow] sitemap nem érhető el (HTTP ${res.status}) — kihagyva`);
  process.exit(0);
}
const xml = await res.text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) {
  console.log("[indexnow] a sitemap üres — kihagyva");
  process.exit(0);
}

const r = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `${ORIGIN}/${KEY}.txt`,
    urlList,
  }),
});
const body = await r.text();
// A szolgáltatás saját hibakódját írjuk ki, ne a mi értelmezésünket:
// a 403 lehet domain-jogosultság és lehet kulcsprobléma is.
console.log(`[indexnow] HTTP ${r.status} ${body.slice(0, 300)} (${urlList.length} URL)`);
