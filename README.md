---
author: Bálint
contributor: Bálint
---

# Kovács Bálint Fotográfia — kovacsbalintfoto.hu

Fotós portfólió és lead-generáló weboldal Next.js 16 (App Router) + Pages Router hibrid felépítéssel, Tailwind CSS-sel és Framer Motion animációkkal.

## Stack

- **Next.js 16** (App Router: `app/`, legacy Pages Router: `pages/` a galéria és jogi oldalakhoz)
- **Supabase** — ügyfélgaléria adatok (`galleries`, `velemenyek` táblák), jelszavas hozzáférés
- **Cloudinary** — nyers/válogatható galéria képek tárolása és lekérdezése
- **EmailJS** — automatikus email küldés (ajánlatkérés, visszaigazolás)
- **Tailwind CSS**, **Framer Motion**, **lucide-react**, **yet-another-react-lightbox**

## Szerkezet

- `app/szolgaltatasok/[slug]` — dinamikus szolgáltatás oldalak (`constants/services.js` az adatforrás: portré, kismama, család, autó, kutya)
- `app/szolgaltatasok/eskuvo` — statikus esküvői oldal (külön, mert a legnagyobb konverziós súlyú szolgáltatás)
- `pages/galeria/[galleryId]` — jelszóval védett ügyfélgaléria (Supabase + Cloudinary), NEM publikus, `robots.txt`-ben tiltva
- `app/admin/*` — belső admin felület (vélemények moderálása, vászonkép árazás), `noindex`
- `app/robots.js`, `app/sitemap.js`, `public/llms.txt` — SEO és AI-discoverability

## Fejlesztés

```bash
npm run dev
```

Nyisd meg: [http://localhost:3000](http://localhost:3000)

## Képoptimalizálás

Az összes portfólió kép WebP-be van konvertálva (`scripts/optimize-images.mjs`, `scripts/optimize-existing-webp.mjs`, max 2000px, minőség ~78). Új képek feltöltésekor futtasd újra ezeket a scripteket a `public/images/` mappára a repó méretének alacsonyan tartásához.
