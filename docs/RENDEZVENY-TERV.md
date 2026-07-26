# Rendezvény-oldal — teljes fejlesztési terv

**Cél:** `kovacsbalintfoto.hu/rendezveny` — önálló arculatú, világos, színes, prémium rendezvény-fotó/videó oldal a meglévő domain alatt, a meglévő e-mail címmel.
**Terv verziója:** 1.3 · 2026-07-26
*v1.1: e-mail EmailJS → Resend. v1.2: Cloudinary kivezetve; Higgsfield valós kredit-árakkal. **v1.3: a design sötét „SIGNAL"-ból világos, pasztell „PRIZMA"-ra fordult a tényleges képanyag alapján; hat kategória; a hero teljesen generált, görgetés-vezérelt.***
**Kódbázis:** `/Volumes/Samsung 1TB SSD/Weboldalak/kalacs` (Next.js 16.0.10, App Router + Pages Router hibrid)

---

## 0. Vezetői összefoglaló

Egy **második, teljesen külön arculatú oldalt** építünk ugyanabba a Next.js projektbe, a `/rendezveny` útvonal alá. Nem külön repó, nem aldomain — így a domain-tekintély, a Netlify deploy, az e-mail és a Supabase fiók mind közös marad, de a látogató úgy érzi, egy másik márka oldalára lépett.

> **A rendezvényes oldal nem használ Cloudinaryt.** A `lib/cloudinary.js` és az ügyfélgaléria-integráció érintetlenül marad arra az esetre, ha később újra elővennéd — de minden rendezvényes kép és rövid videó a repóból, a Netlify CDN-jéről szolgál ki. Ezzel egy külső szolgáltatás, egy sávszélesség-korlát és egy kockázati tétel esik ki a tervből.

**A három legfontosabb döntés, amit a terv meghoz:**

1. **Technikai szeparáció route group-pal.** A jelenlegi fotós fejléc/lábléc kikerül a gyökér layoutból egy `app/(foto)/` csoportba, a `/rendezveny` pedig saját layoutot, saját navigációt, saját fontokat és saját színpalettát kap. Az URL-ek **nem változnak**, a meglévő oldal vizuálisan **nem sérül**. (Ellenőriztem: a gyökér layout az egyetlen fájl az `app/`-ban, ami relatív szülő-importot használ — a refaktor kockázata minimális.)

2. **A "rengeteg rendezvény" problémára háromszintű tartalomrendszer.** Nem eseményenként építünk oldalt (kezelhetetlen), hanem: **8–12 kiemelt esettanulmány** (ezek adnak el) + **kategóriánkénti válogatott galéria** (ezek mutatják a stílust) + **korlátlan hosszú referencialista** (ez mutatja a volument). Ezzel a 100+ rendezvényből kb. 3 nap tartalommunka lesz, nem 3 hónap.

3. **A vásárló szerint tagolunk, nem esemény szerint.** Egy konferenciát marketinges vesz, gólyabált HÖK-ös, offroad futamot szervező/szponzor, szülinapot magánszemély. Négy különböző nyelv, négy különböző bizonyíték, négy különböző ár. Ezért a gerinc: **kategória-landing oldalak**, mindegyik saját ajánlattal, saját GYIK-kel, saját CTA-val.

**Terjedelem:** ~14 oldal, ~25 új komponens, 1 API végpont, 1 Supabase tábla, 6–9 Higgsfield motion asset (~800 kredit az 1000-ből).
**Becsült építési idő:** 10 fázis, fázisonként 1–2 munkamenet.

---

## 1. Kiindulási állapot — technikai audit

Amit a jelenlegi projektben találtam, és ami a tervet befolyásolja.

### 1.1 Stack

| Elem | Verzió / állapot |
|---|---|
| Next.js | 16.0.10, App Router (`app/`) + Pages Router (`pages/`) hibrid |
| React | 19.2.3 |
| Nyelv | **JavaScript** (nincs TypeScript), `jsconfig.json` `@/*` aliasszal |
| Tailwind | 3.4.17 |
| Animáció | framer-motion 12.23.22 |
| Ikonok | lucide-react |
| Lightbox | `yet-another-react-lightbox` 3.21.7 — **már telepítve, újrahasznosítjuk** |
| Kép/videó tár | Cloudinary (`lib/cloudinary.js`) — **kizárólag az ügyfélgalériához. A rendezvényes oldal nem használja, de a kód érintetlen marad.** |
| Adatbázis | Supabase (`galleries`, `velemenyek` táblák) |
| E-mail | EmailJS — kliensoldali (`emailjs-com` a `Contact.js`-ben, `@emailjs/browser` a `ClientGallery.jsx`-ben). A `@emailjs/nodejs` telepítve, de **sehol nincs használva**. → **Lecseréljük Resendre**, ld. 9. fejezet |
| Hosting | Netlify, `@netlify/plugin-nextjs` 5.15.1, `publish = ".next"` → **SSR és route handler működik** |
| Git | `main`, tiszta munkafa |

### 1.2 Jelenlegi arculat (amitől el kell térni)

| Token | Jelenlegi érték | Hangulat |
|---|---|---|
| Háttér | `#F9F5F1` krém | meleg, lágy |
| Szöveg | `#5A4A42` barna | romantikus |
| Akcent | `#C79C8D` rosé | esküvői |
| Sötét felület | `#261F1D` | lábléc |
| Display font | Akaya Kanadaka (kézírásos) | organikus |
| Forma | `rounded-3xl`, `rounded-full` pirulagombok | lágy |

A rendezvényes oldal ettől **határozottan elkülönül**: meleg papír-fehér alap, mély tintakék-lila szöveg, hat kategória-pasztell, modern grotesque tipográfia. Nem sötétebb — hanem **színesebb és nyitottabb**. Részletek a 4. fejezetben.

### 1.3 Konkrét leletek, amiket a terv kezel

| # | Lelet | Következmény |
|---|---|---|
| L1 | **Két Tailwind config** (`tailwind.config.js` és `.mjs`). Tailwind v3 a `.js`-t találja meg elsőként → a `.mjs` halott fájl. | Az új tokenek **csak a `tailwind.config.js`-be** mennek. A `.mjs`-t töröljük. |
| L2 | **Két PostCSS config** (`.js` és `.mjs`). A `.js` nyer (ez tartalmazza az autoprefixert). | A `.mjs`-t töröljük. |
| L3 | `app/layout.js` a gyökér layout **és** ez hordozza a Navbart/Footert → minden `app/` útvonal megkapja. | Route group refaktor kell (2. és 6. fejezet). |
| L4 | `globals.css`: `html, body { overflow-y: scroll !important; }` | A `Navbar.js` mobilmenü `body.style.overflow = "hidden"` görgetészárja **jelenleg nem működik** (az `!important` felülírja). Az új `EventNav`-ban `position: fixed` alapú zárat használunk. |
| L5 | `app/layout.js`: `Geist({ subsets: ["latin"] })` — a `latin` subset **nem tartalmazza az ő/ű** betűket. **Bizonyítva:** végignéztem a `.next/static/media/` alá cache-elt 11 Geist woff2 fájlt — egyikben sincs U+0151 (ő) és U+0171 (ű). Az oldal jelenleg **tartalék fonttal** rendereli ezt a két betűt. | Minden `next/font` hívásnál `subsets: ["latin", "latin-ext"]`. A meglévőt is javítani kell. |
| L6 | **`.git` mérete 1,9 GB**, miközben a `public/images` csak 85 MB → a history tele van nagy binárisokkal (nyers JPEG-ek ismételt commitjaiból). | A rendezvényes képek a repóba kerülnek, de **szigorú méretkorláttal és build-time őrrel** (7.1). Nyers/eredeti fájl soha nem megy be. |
| L7 | Nincs Node-verzió rögzítve (`.nvmrc`/`netlify.toml`). Lokálisan Node 25, a Next 16 minimum Node 20.9. | `netlify.toml`-ba `NODE_VERSION = "22"` — enélkül egy Netlify-oldali default-váltás bármikor eltörheti a buildet. |
| L8 | EmailJS azonosítók **hardkódolva, kliensoldalon** a `components/Contact.js` 62–65. sorában. Bárki, aki megnyitja az oldal forrását, küldhet leveleket a nevedben, a te keretedből. | Váltás Resendre: az API kulcs szerveroldalon marad (9. fejezet). |
| L9 | `lib/supabaseClient.js` `console.log`-ol kulcs-részletet build közben. | Takarítás a Fázis 0-ban (kozmetikai, de zajos). |
| L10 | `next.config.mjs`: `formats: ['image/avif','image/webp']` már beállítva. | A rendezvényes képekhez nincs config-teendő (helyi fájlok). |
| L11 | ffmpeg 8.1.2 lokálisan elérhető. | A videó-tömörítési pipeline azonnal futtatható. |
| L12 | `scripts/optimize-images.mjs` **`sharp`-ot importál, de a `sharp` nincs a `node_modules`-ban** → jelenleg elszállna. Ráadásul a `ROOT` **abszolút útvonalra van drótozva** (`/Volumes/Samsung 1TB SSD/...`), ami lecsatolt meghajtón vagy másik gépen azonnal hibázik. | `npm i -D sharp`; az új rendezvényes képscript **relatív** útvonalat használ (7.1). |
| L13 | **Duplázódó oldalcímek.** A gyökér layout `template: '%s \| Kovács Bálint Fotó'`-t használ, de az aloldalak a saját `title`-jükbe **is** beleírják ugyanezt. Éles buildben mérve: `/contact` → `Kapcsolat \| Kovács Bálint Fotó \| Kovács Bálint Fotó`. Ugyanez a `/velemenyek` és a `/szolgaltatasok/*` oldalakon. A `main` branchen is így volt. | A címek megvágása az aloldalakon (a template úgyis hozzáteszi a márkanevet). **Fázis 9** (SEO). A Fázis 0 szándékosan nem nyúlt hozzá, mert ott a cél a viselkedés változatlansága volt. |
| L14 | **Egymásba ágyazott `<main>`.** A layout `<main>`-je és az `app/(foto)/page.js` saját `<main className="…">`-je egymásba kerül → érvénytelen HTML. Szintén régi. | A `page.js`-ben `<main>` → `<div>`. **Fázis 9**, kozmetikai. |
| L15 | A `package.json` `lint` scriptje `next lint`-et hív, amit a **Next 16 megszüntetett** → `npm run lint` hibával áll le („Invalid project directory: …/lint”). | A script cseréje `eslint .`-re. **Fázis 0 utáni apró javítás**, vagy amikor legközelebb hozzányúlunk. |

---

## 2. Stratégia — kinek adunk el és mit

### 2.1 Négy vásárlói típus

| Kategória | Ki dönt | Mit akar valójában | Mire érzékeny | Költségkeret-jelleg |
|---|---|---|---|---|
| **Konferencia / céges** | marketing- vagy eseménymenedzser | belső riport + social + sajtóanyag, gyors átadás | **határidő**, megbízhatóság, számlaképesség, diszkréció | fix keret, projektalapú |
| **Egyetemi** (gólyatábor, gólyabál, ballagás) | HÖK / rendezvényfelelős / osztály | sok kép, gyors megosztás, jó hangulat | ár/fő, gyorsaság, letölthetőség | szűk, de sokszor ismétlődő |
| **Offroad / motorsport** | szervező, csapat, szponzor | látványos, "eladható" kép a szponzornak | dinamika, nyers erő, akciófotó | változó, szponzorpénz |
| **Magánünnep** (szülinap, évforduló) | magánszemély | emlék, jó közérzet a fotós körül | ár, kedvesség, feszengésmentesség | alacsonyabb, egyszeri |

### 2.2 Három szolgáltatási pillér (ez adja el a legtöbbet)

Ez a legfontosabb pozicionálási üzenet: **nem "rendezvényfotós" vagy, hanem tartalomgyártó, aki eseményen dolgozik.** Ez emeli ki a mezőnyből és ez emeli az árat.

1. **FOTÓ** — riportfotó, portré, terem/dekor, szponzorfal, csoportkép, sajtókép
2. **VIDEÓ** — aftermovie, highlight, teljes előadás rögzítése, interjúk
3. **TARTALOM** — 9:16 social csomag (reels/shorts/TikTok), motion grafika, **VSL** (értékesítési videó)

A hub oldalon ez a három pillér külön, egyenrangú blokkot kap. A VSL külön terméklap a `/rendezveny/video` oldalon, mert az nem rendezvényhez kötött, magasabb értékű szolgáltatás.

### 2.3 A központi ígéret (headline-irány)

Három javaslat, ezek közül válassz egyet a hub H1-ének:

- **„A rendezvényed nem ér véget a záró tapssal."** — a tartalom-pozicionálás legerősebb megfogalmazása
- **„Konferenciától a sárig."** — a lefedettség egyetlen mondatban, karakteres
- **„Ott vagyok, ahol történik."** — semleges, biztonságos

Az alcím mindig konkrét: *„Fotó, videó és social tartalom rendezvényekre — konferenciáktól gólyabálon át az offroad futamokig. [X]+ esemény, országosan."*

---

## 3. Információs architektúra

### 3.1 Oldaltérkép

```
/rendezveny                              Hub — a fő belépőpont
/rendezveny/konferencia                  Konferencia, céges rendezvény, gála, díjátadó, könyvbemutató
/rendezveny/egyetemi                     Gólyatábor, duális tábor, gólyabál, ballagás, diplomaosztó
/rendezveny/offroad                      Offroad, terepverseny, motorsport
/rendezveny/sport                        Sportesemény, bajnokság, kupa, verseny
/rendezveny/kultura                      Koncert, tánc, színpadi és kulturális esemény
/rendezveny/maganunnep                   Szülinap, évforduló, közösségi és élményprogram
/rendezveny/video                        Videó, aftermovie, social csomag, VSL, motion grafika
/rendezveny/munkaim                      Referencia-index (szűrhető)
/rendezveny/munkaim/[slug]               Egy rendezvény esettanulmánya
/rendezveny/csomagok                     Csomagok és árazás
/rendezveny/rolam                        Rólam — rendezvényes fókusszal
/rendezveny/ajanlatkeres                 Brief űrlap (fő konverziós pont)
/rendezveny/koszonjuk                    Visszaigazoló oldal (konverziómérés)
```

**D4 eldöntve: hat kategória** — a koncert/kultúra és a sport is önálló oldalt kap, mert van hozzájuk anyag.

#### A meglévő képanyag leképezése

A `07-20_Weboldalamra_Kepek/Rendezvények` mappa alapján — **91 kép**, ennyi van jelenleg válogatva:

| Kategória | Forrásmappa | Kép |
|---|---|---|
| Konferencia & céges | `LR` (9) + `Egyed_Viktor` (3) | **12** |
| Egyetemi & campus | `Pannon/Dualis_Tabor` (14) + `Ballagás` (7) | **21** |
| Offroad & motorsport | `Offroad` (23) | **23** |
| Sport | `Pannon/Foci` (11) | **11** |
| Kultúra & színpad | `Anna_Tanc` (5) | **5** |
| Magánünnep & közösségi | `Pannon/Fozes` (10) + `Pannon/Kutyusok` (9) | **19** |

> **Feltételezés, amit erősíts meg:** a `Pannon` mappát Pannon Egyetem-es eseményeknek olvasom (duális tábor, foci, főzés, kutyusok). Ha a `Foci` és a `Fozes`/`Kutyusok` valójában nem egyetemi, szólj — a besorolás egy sor átírása az adatfájlban.

> **Ami hiányzik:** a **Kultúra** kategóriához 5 kép kevés egy meggyőző galériához, és a **Konferencia** 12 képe is szűkös — pedig épp ez a legmagasabb értékű vásárlói szegmens. Ha van még anyagod, ide érdemes elsőként pótolni. Kategóriánként 20–30 kép az, ahol egy galéria „telinek” hat.

**Routing figyelmeztetés:** a kategóriaoldalak egy dinamikus `[kategoria]` szegmensre épülnek. A Next.js a statikus szegmenst (`video`, `csomagok`, `munkaim`, `rolam`, `ajanlatkeres`, `koszonjuk`) mindig előbb illeszti, tehát nem ütköznek — **de kategóriát soha ne nevezz el ezekkel a szavakkal.**

### 3.2 A "sok rendezvény" háromszintű rendszere

Ez a válasz arra, hogy **hogyan építsd fel**, ha már 100+ eseményt fotóztál.

#### 1. szint — Kiemelt esettanulmány (8–12 db, `/rendezveny/munkaim/[slug]`)

Ezek adnak el. Csak olyan eseményt válassz ide, ahol **van sztori vagy szám**. Kategóriánként 2–3 db.

Egy esettanulmány kötelező tartalma:
- 1 hero kép + 12–20 válogatott kép
- Metaadat-sáv: dátum · helyszín · megrendelő · létszám · szolgáltatás · átfutási idő
- „A feladat" (2–3 mondat) → „Hogyan oldottam meg" (3–4 mondat) → „Eredmény" (számokkal: *„430 kép 48 órán belül, 12 db reels, 1 db 90 mp-es aftermovie"*)
- 1 ügyfélidézet (ha van)
- 1 videó (ha van)

#### 2. szint — Kategóriánkénti válogatott galéria (20–40 kép / kategória)

**Nem eseményenként, hanem kategóriánként a legjobb képek.** Ez mutatja a stílust és a következetességet. Egy jó offroad-galéria többet ér, mint 15 különálló futam-galéria.

#### 3. szint — Referencialista (korlátlan)

Egyszerű, sűrű lista vagy logófal: `Esemény neve · Év · Helyszín · Típus · Létszám`. Egy adatfájlból generálva, ~30 másodperc új sort felvenni. **Ez bizonyítja a volument** anélkül, hogy oldalt kellene építeni hozzá. Ha van írásos engedélyed logóhasználatra, a céges logók külön "bizalmi sáv" a hub oldalon.

> **Miért működik:** a látogató nem 100 galériát akar átnézni. Azt akarja látni, hogy (a) tudsz jó képet csinálni az ő típusú eseményén, (b) csináltál már sokat, (c) megbízható vagy. Ez a három szint pont ezt a hármat fedi le, minimális munkával.

### 3.3 Konverziós útvonalak

```
Hub ──► Kategória ──► Esettanulmány ──► Ajánlatkérés
 │          │                              ▲
 │          └──────────────────────────────┤
 └──► Videó/VSL ──► Csomagok ──────────────┘
```

Minden oldal alján ugyanaz a záró CTA-blokk. Mobilon **sticky alsó sáv** (Ajánlatkérés + telefon), ami a hero elhagyása után úszik be.

---

## 4. Design rendszer — „PRIZMA"

### 4.1 Koncepció

**Világos, levegős, színes — de fegyelmezett.** A háttér meleg papír-fehér, a szöveg mély tintakék-lila (nem fekete), és minden kategória kap egy **saját pasztell színt, amit a te fényképeidből mintáztunk**. A színek nem trend-palettából jönnek, hanem a saját munkáidból — ezért illeszkednek a képeidhez, és ezért nem néz ki sablonos AI-oldalnak.

#### Miért fordult a terv sötétből világosba

Az 1.2-es verzió sötét, filmes irányt javasolt narancs akcenttel. A képanyag átnézése után ez **hibás irány** lett volna, és nem csak ízlés kérdése:

| Amit a fotóidban látok | Mit jelent a designra |
|---|---|
| **LR** — természetes fény, magenta és rózsaszín ruhák, zöld növények, fehér terek, nevető emberek | meleg, világos, emberközpontú — sötét háttéren „gyászos” lenne |
| **Egyed Viktor** — mély kék LED-fal, arany tipográfia, lila-magenta színpadfény, fehér színpad | maga a fotó hozza a színt; a UI ne versenyezzen vele |
| **Offroad** — arany hajnali fény, szalmasárga fű, poros kék ég, olívazöld terepjárók | földszínek és meleg fény, nem neon |

Egy közel fekete oldal **elnyomná** ezeket a képeket, a rikító narancs pedig pont azt a hatást keltené, amit el akarsz kerülni. A világos, pasztell alap **kiemeli** a fotókat: a kép lesz a legtelítettebb elem a képernyőn, nem a UI.

**Kulcs-kontrasztok a fő oldalhoz képest** (mert továbbra is másik márkának kell látszania):

| | Fő oldal (fotográfia) | Rendezvény oldal |
|---|---|---|
| Alap | krém `#F9F5F1`, egyetlen rosé akcent | meleg papír `#FAFAF8`, **hat kategória-szín** |
| Tinta | meleg barna `#5A4A42` | mély tintakék-lila `#191723` |
| Sarkok | `rounded-3xl`, pirulagombok | `6–8px`, lágy de nem pirula |
| Felületek | árnyékos kártyák | **színes wash-mezők**, hajszálvonalak, alig árnyék |
| Tipó | kézírásos display (Akaya) | modern grotesque + mono metaadat |
| Hangulat | romantikus, intim | **élénk, nyitott, professzionális** |

### 4.2 Színpaletta

#### Semleges alap — a felület 90%-a

```
--ev-bg:        #FAFAF8   /* meleg papír, nem steril fehér */
--ev-surface:   #FFFFFF   /* kártya, emelt felület */
--ev-sunk:      #F2F1EE   /* besüllyesztett mező, kódblokk */
--ev-line:      rgba(25,23,35,0.10)
--ev-line-2:    rgba(25,23,35,0.20)

--ev-ink:       #191723   /* elsődleges szöveg — mély tinta, LILA árnyalattal, nem fekete */
--ev-ink-2:     #5A5568   /* másodlagos szöveg */
--ev-ink-3:     #8B8698   /* halvány / mono címke */
```

> A tinta szándékosan `#191723` és nem `#000000`: van benne egy csepp lila, ami rokonságot teremt a kategória-színekkel. Egy tiszta fekete idegen testként ülne a pasztellek között — ez az a részlet, amitől „megtervezettnek” és nem „alapértelmezettnek” hat.

#### Márka-horgony — a műveletek színe

```
--ev-brand:     #2E2A6B   /* mély indigó — gombok, linkek, aktív állapot */
--ev-brand-ink: #FFFFFF
--ev-brand-soft:#EBEAF5   /* halvány indigó háttér */
```

Ez a **komolyság horgonya**. A pasztellek adják az életet, de minden kattintható dolog ugyanazt a mély indigót viseli — így a felület színes marad, a működés viszont kiszámítható és üzletszerű. Kontraszt a papír-háttéren ≈ **12,8:1** (AAA).

#### Kategória-spektrum — a felület 5%-a, de ez adja az életet

Mindegyik szín **a te fotóidból mintázva**:

| Kategória | Honnan a szín | Pasztell (wash) | Mély (szöveg, badge) |
|---|---|---|---|
| Konferencia & céges | Egyed Viktor LED-fala | `#C6CEF7` | `#3B4BB8` |
| Egyetemi & campus | campus-zöld, növények | `#C2E4D3` | `#2C7A5B` |
| Offroad & motorsport | szalmasárga fű, hajnali fény | `#F0DCB6` | `#96681C` |
| Sport | poros kék ég | `#C2DEF0` | `#236D95` |
| Kultúra, koncert, tánc | színpadi lila-magenta | `#DFC8EE` | `#79489C` |
| Magánünnep & közösségi | LR magenta ruha | `#F5CDD9` | `#B24870` |

**Használati szabály — ez tartja komolyan:**
- A **pasztell** csak nagy, nyugodt felületeken: szekció-háttér, kategória-kártya wash, hero-mező. Soha nem szövegszín.
- A **mély változat** csak apró jelzésen: badge felirat, kategória-címke, hover-aláhúzás, ikon. Kontrasztja papíron mind ≥ 4,5:1.
- Egy nézetben **legfeljebb két** kategória-szín látszik egyszerre. A hub kategória-rácsa a kivétel — ott a hat szín együtt épp a lényeg.
- A globális UI (gomb, link, form) **mindig** a mély indigó. A kategória-szín soha nem lesz gombszín.

#### Sötét mód

Nem fekete, hanem **mély szilva-szén** `#151320`, felület `#1E1B2B`. A pasztellek itt telítettebb, világító változatban jelennek meg (kb. +12% telítettség, −8% világosság), a márka-indigó pedig felvilágosodik `#8B86E8`-ra, hogy sötéten is AA legyen.

### 4.3 Tipográfia

| Szerep | Font | Forrás | Használat |
|---|---|---|---|
| Display | **Schibsted Grotesk** (variable) | `next/font/google`, `subsets: ["latin","latin-ext"]` | H1–H3, nagy címek, `tracking-tight` |
| Szövegtörzs | **Geist** | már betöltve a gyökér layoutban | bekezdés, UI |
| Mono / metaadat | **Geist Mono** | már betöltve | dátum, helyszín, létszám, címkék |

Csak **egy** új fontcsalád tölt be. A Schibsted Grotesk skandináv eredetű, meleg-modern grotesque: professzionális, de van karaktere — és nem tartozik a túlhasznált „biztonságos” fontok közé (Inter, Poppins, Space Grotesk), amiktől egy oldal azonnal sablonosnak hat.

> **Amit szándékosan NEM használunk:** Playfair Display (a ui-ux-pro-max adatbázis ezt javasolta) — ez a leggyakoribb AI-generált „luxus” font, azonnal felismerhető. Ugyanígy kimarad a Poppins és az Inter is.
> **Alternatíva**, ha kevésbé semlegeset szeretnél: `Familjen Grotesk` (karakteresebb, kicsit játékosabb) vagy `Outfit` (geometrikusabb, barátságosabb).

**Skála (mobil → desktop, `clamp`):**

```
display-xl : clamp(2.75rem, 9vw, 7.5rem)    /* hero H1 */
display-l  : clamp(2rem, 5.5vw, 4.5rem)     /* szekció H2 */
display-m  : clamp(1.5rem, 3vw, 2.5rem)     /* H3 */
body-l     : clamp(1.05rem, 1.4vw, 1.25rem)
body       : 1rem
mono-label : 0.6875rem / uppercase / 0.2em letter-spacing
```

### 4.4 Térköz, rács, forma

- Konténer: `max-w-[1440px]`, oldalpadding `px-5 md:px-10 lg:px-16`
- Rács: 12 oszlop, `gap-6 lg:gap-8`; **aszimmetrikus, editorial elrendezések** (pl. 7/5, 4/8 osztás), nem középre igazított dobozok
- Szekció-térköz: `py-24 md:py-32 lg:py-40` — a nagy levegő adja a prémium hatást
- Radius: `--ev-radius: 8px` (kártya, gomb), `4px` képeken — lágy, de nem pirula, tehát a fő oldaltól így is elkülönül
- Elválasztók: 1px `--ev-line`; a színes szekciókat **pasztell wash-mező** választja el, nem vonal
- Árnyék: nagyon visszafogott és **színezett** — `0 12px 32px -16px rgba(46,42,107,0.18)`, azaz az indigóból származó, nem szürke. Szürke drop shadow tilos: az teszi olcsóvá a világos felületeket

### 4.5 Mozgás-nyelv

| Elem | Szabály |
|---|---|
| Easing | belépés `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out), kilépés `cubic-bezier(0.7, 0, 0.84, 0)` |
| Időtartam | belépés 700–900 ms, hover 200–250 ms, oldalátmenet 400 ms |
| Belépés | **maszkos feltárulás** (`clip-path: inset(100% 0 0 0)` → `inset(0)`), nem sima opacity-fade |
| Stagger | 60–80 ms elemenként, max. 6 elem, utána egyszerre |
| Görgetés | sticky szekció-fejlécek, vízszintes görgetésű galéria, számláló counterek, marquee |
| **Szín-átúszás** | a szekciók háttere görgetésre **lágyan átúszik** az aktuális kategória pasztelljébe (`--ev-cat` interpoláció, 800 ms) — ez a „PRIZMA” védjegye, és ez adja az „élettel teli” érzetet mozgó videó nélkül is |
| Kurzor | desktopon egyedi kurzor a galériákon („MEGNÉZ" / húzás-jelző) |
| Kép-hover | 1.03 scale + kategória-színű vonal + mono felirat becsúszása |

**Kötelező:** minden animáció `useReducedMotion()` mögött. A `globals.css` már tartalmaz globális `prefers-reduced-motion` szabályt, de a JS-vezérelt mozgásokat külön is le kell kapcsolni.

---

## 5. Oldalankénti terv (wireframe + tartalom)

### 5.1 `/rendezveny` — Hub

| # | Szekció | Tartalom | Motion |
|---|---|---|---|
| 1 | **Hero** | H1 (ld. 2.3), alcím, 2 CTA („Ajánlatot kérek" / „Munkáim"), alsó mono adatcsík: `[X]+ RENDEZVÉNY · [Y] ÉV · ORSZÁGOSAN` | **teljesen generált, görgetés-vezérelt absztrakt animáció — saját fotó és videó nélkül**, ld. 5.1.1 |
| 2 | **Bizalmi sáv** | Logófal (ha van engedély) vagy 3 nagy szám: rendezvények / átadott képek / átlagos átfutási idő | végtelen marquee, számláló counter |
| 3 | **Három pillér** | FOTÓ / VIDEÓ / TARTALOM — 3 egyenrangú blokk, mindegyik 1 mondat + link | egymás után csúszó feltárulás |
| 4 | **Kategóriák** | 4 nagy kártya, kategória-színnel, hover-en rövid videó/kép csere | hover videó, akcentvonal |
| 5 | **Kiemelt munkák** | 3 esettanulmány nagy editorial blokkban (kép + cím + 1 eredményszám) | sticky szám + parallax kép |
| 6 | **Aftermovie kiemelés** | 1 beágyazott videó facade-dal + „Így néz ki egy rendezvényed 90 másodpercben" | fekete-be úsztatás, sticky |
| 7 | **Folyamat** | 4 lépés: Egyeztetés → Forgatás → Utómunka → Átadás, mindegyiknél **konkrét határidővel** | vízszintes vonal rajzolódik ki görgetésre |
| 8 | **Vélemények** | 3–5 idézet, névvel és szervezettel | egyszerű fade |
| 9 | **Referencialista** | sűrű, sokoszlopos névlista + „és még [N] esemény" | — |
| 10 | **GYIK** | 6–8 kérdés (ld. 5.9) | accordion |
| 11 | **Záró CTA** | nagy akcentblokk + űrlap-előnézet | fényudvar-pulzálás |

### 5.1.1 A hero — teljesen generált, görgetés-vezérelt

**Döntés: a hero-ba nem kerül saját fotó és nem kerül saját videó.** Az indok jó: egy célzottan a felülethez generált absztrakt animáció technikailag tisztább (pontos arány, pontos színek, semmi zavaró részlet a szöveg mögött), és nem „használ el” egy erős fotót olyan helyen, ahol amúgy is elmosódna a szöveg alatt. A fotóid ott dolgoznak, ahol a legjobbak: a galériákban és az esettanulmányokban.

#### Mit látunk

Egy lassan sodródó, **prizmatikus pasztell fény-mező**: lágy színszóródás, üvegen megtört fény, finom filmszemcse. A hat kategória-szín ugyanabban a kompozícióban jelenik meg — a hero **maga a névjegye a PRIZMA rendszernek**, és egyben megelőlegezi a lentebb következő hat kategóriát.

#### Hogyan mozog — a görgetés vezérli

```
scrollYProgress 0 → 1  (a hero magasságán belül)
  ├─ a generált szekvencia lejátszási pozíciója            (fő effekt)
  ├─ a H1 maszkos feltárulása és finom felfelé úszása
  ├─ a színmező skálája 1.0 → 1.08                          (mélységérzet)
  └─ átúszás a következő szekció papír-hátterébe
```

A megvalósítás a **görgetéshez kötött lejátszás** (scroll-scrubbing): a generált klip nem magától fut, hanem a görgetés pozíciója állítja a `currentTime`-ját. Ettől érzi a látogató, hogy ő irányítja a képet — ez az a hatás, ami prémiumnak és „extra látványosnak” hat, és amit a motionsites.ai-n is a scroll-vezérelt hero-k képviselnek.

#### Teljesítmény-korlátok (ezek nélkül a scroll-scrubbing akadozik)

| Szabály | Miért |
|---|---|
| A szekvencia **≤ 4 mp, 1600×900, ~2 MB**, `preload="auto"` | a scrubbinghoz a teljes klipnek a memóriában kell lennie |
| A `currentTime` állítása **`requestAnimationFrame`-ben**, throttle-ölve | különben a fő szál befullad |
| **Statikus poszter az LCP**, `priority` | a videó soha nem LCP elem |
| `< 768 px`-en **nincs scrubbing** — helyette a poszter + CSS gradiens-animáció | mobilon a videó-seek megbízhatatlan és drága |
| `prefers-reduced-motion` → **statikus poszter**, semmi mozgás | akadálymentesség |
| Tartalék: ha a `canplaythrough` 2 mp-en belül nem jön meg → poszter marad | lassú kapcsolat |

A kategória-oldalak hero-ja **nem** kap scrubbinget — ott elég egy statikus generált pasztell mező a kategória saját színében. Egyetlen nehéz effekt van az oldalon, és az a hub hero-ja.

### 5.2 `/rendezveny/[kategoria]` — Kategória sablon (1 komponens, 6 adatkészlet)

1. **Hero** — a kategória pasztell színmezője (statikus generált kép, nem videó), H1 = kategória, alcím = mit old meg
2. **Probléma → megoldás** — *„A legtöbb konferenciáról 300 használhatatlan kép marad. Nálam kapsz 40 olyat, amit tényleg kirakhatsz."*
3. **Mit kapsz** — konkrét deliverable-lista: darabszám, formátum (vízszintes + 9:16), átadási határidő, felhasználási jog
4. **Galéria** — 20–40 kép, masonry vagy vízszintes görgetés, lightbox
5. **Esettanulmány-kiemelés** — 1–2 db ebből a kategóriából
6. **Csomag / ártól** — 2–3 opció, „egyedi ajánlat" gombbal
7. **Kategória-specifikus GYIK** — 4–6 kérdés
8. **CTA** — az űrlap előre kitöltött kategóriával (`?tipus=konferencia`)

### 5.3 `/rendezveny/munkaim` — Referencia-index

- Fejléc + szűrő: kategória / év / szolgáltatás (fotó, videó, social)
- Rács: esettanulmány-kártyák elöl, alattuk a rövid referencia-bejegyzések
- Kliensoldali szűrés (nincs szerver-lekérés), URL-ben `?kat=offroad` állapottal

### 5.4 `/rendezveny/munkaim/[slug]` — Esettanulmány

1. Hero kép, teljes szélesség + cím
2. Mono metaadat-sáv: `DÁTUM · HELYSZÍN · MEGRENDELŐ · LÉTSZÁM · SZOLGÁLTATÁS`
3. Feladat / Megoldás / Eredmény (számokkal)
4. Galéria (lightbox)
5. Videó (ha van)
6. Ügyfélidézet
7. „Következő projekt →" navigáció + CTA

### 5.5 `/rendezveny/video` — Videó, social, VSL

Ez a legmagasabb értékű oldal. Külön figyelmet érdemel.

1. **Hero** — showreel (facade, kattintásra indul)
2. **Aftermovie** — mi ez, mennyi idő, példa, ártól
3. **Social csomag** — 9:16 példák telefon-mockupban, görgetésre váltakozva; *„10 db reels a rendezvényről, 72 órán belül"*
4. **Előadásrögzítés** — multicam/1 kamera, hang, prezentáció-bevágás (ha vállalod)
5. **VSL — külön termékblokk:**
   - Mi az és kinek (szolgáltatók, oktatók, ügynökségek)
   - Folyamat: kutatás → szkript → forgatás → vágás → motion → thumbnail → A/B
   - Mit kapsz: 1 fő videó + 3 hook-változat + 5 rövid vágás + feliratozás
   - Példa + ár
6. **Motion grafika** — a Higgsfield-del készített saját anyagok bemutatása; ez **egyszerre dísz és portfólió**
7. CTA

### 5.6 `/rendezveny/csomagok`

- 3 fő csomag (**Alap / Kiemelt / Teljes**) kártyaként, középső kiemelve
- Alatta à la carte tábla: fotó óradíj, aftermovie, social csomag, VSL, előadásrögzítés
- Extrák: gyorsított átadás (24 h), helyszíni élő átadás, drón, második fotós, nyomtatás
- „Nem találod, ami kell?" → egyedi ajánlat CTA
- **Javaslat:** mutass „-tól" árakat. Ez kiszűri a nem valós érdeklődőt, és bizalmat épít. Az árak a `constants/rendezveny/packages.js`-ben, egy helyen szerkeszthetők.

### 5.7 `/rendezveny/rolam`

Rövid, rendezvényes fókusszal: ki vagy, miért bízhat benned egy szervező (megbízhatóság, diszkréció, tempó), felszerelés (kamerák, objektívek, világítás, tartalék), biztosítás/számlaképesség, területi lefedettség. 1 jó portré rólad munka közben. Link vissza a fotós oldalra.

### 5.8 `/rendezveny/ajanlatkeres` — 3 lépéses brief

**1. lépés — Mit szeretnél?**
- Szolgáltatás (többszörös): Fotó / Videó / Social csomag / VSL / Előadásrögzítés
- Rendezvény típusa (kategória)

**2. lépés — A rendezvény**
- Dátum (vagy „még nem fix")
- Helyszín / város
- Várható létszám (sávok)
- Időtartam (óra / egész nap / többnapos)
- Mikorra kell az anyag (24 h / 72 h / 1 hét / ráérős)
- Költségkeret sáv (opcionális, de nagyon hasznos)

**3. lépés — Kapcsolat**
- Név*, E-mail*, Telefon, Szervezet/cég
- Üzenet
- Honnan hallottál rólam
- ☑ Adatkezelési hozzájárulás (link az `/adatvedelem`-re)
- Rejtett: honeypot mező + időbélyeg + `forras_url` + UTM

Progress bar felül, lépésenkénti validáció, „vissza" gomb. Sikeres küldés → `/rendezveny/koszonjuk`.

### 5.9 GYIK — kiindulási készlet

Általános: Mennyibe kerül? · Mennyi idő alatt kapom meg az anyagot? · Országosan vállalod? · Van biztosításod / számlaképes vagy? · Mi van, ha rossz idő van / elmarad? · Kié a felhasználási jog? · Vállalsz több napos rendezvényt? · Tudsz még aznap képet adni social-ra?

Konferencia: Vállalsz-e élő közvetítést? · Diszkréten mozogsz-e előadás közben? · Tudsz-e sajtókész képet adni még a helyszínen?
Egyetemi: Mennyi kép várható? · Hogyan kapja meg a sok résztvevő? · Van diákbarát ár?
Offroad: Van-e terepjáród / hogyan jutsz ki a pályára? · Vállalsz-e szponzor-igényeket?
Magánünnep: Kell-e vaku, zavarni fog-e? · Meddig maradsz?

---

## 6. Technikai architektúra

### 6.1 Route group refaktor (Fázis 0 magja)

**Előtte:**
```
app/layout.js          → <html><body> + GlassFilter + Navbar + Footer + LocalBusiness JSON-LD
app/page.js, about/, portfolio/, szolgaltatasok/, ...
```

**Utána:**
```
app/
  layout.js              [MÓDOSUL]  <html><body> + globals.css + fontok + metadataBase + icons.  SEMMI chrome.
  globals.css            [marad]
  favicon.ico            [marad]
  robots.js  sitemap.js  [marad, sitemap bővül]
  (foto)/
    layout.js            [ÚJ]  GlassFilter + NavbarClient + Footer + LocalBusiness JSON-LD + fotós metadata
    page.js              [ÁTHELYEZVE  app/page.js]
    about/  admin/  contact/  elszamolas/  mini-fotozasok/
    portfolio/  szolgaltatasok/  velemenyek/  velemeny-iras/     [ÁTHELYEZVE]
  rendezveny/
    layout.js            [ÚJ]  EventNav + EventFooter + Bricolage font + rendezveny.css + event metadata
    ...
```

**Miért biztonságos:**
- A route group `(foto)` **nem jelenik meg az URL-ben** → egyetlen link, canonical vagy sitemap-bejegyzés sem változik.
- Ellenőriztem: az `app/` alatt **kizárólag a `layout.js`** használ relatív szülő-importot (`../components/...`). Áthelyezéskor ezt a hármat `@/components/...`-ra írjuk át, és kész.
- Minden más fájl `@/`-alapú importot használ → mozgatás után is működik.
- A `pages/` router (galéria, ÁSZF, adatvédelem, thank-you) érintetlen.
- A `middleware.js` matchere `/admin/:path*` — a route group nem változtatja az URL-t, tehát **továbbra is véd**.

**Tartalék terv**, ha bármi gond lenne: hagyjuk a gyökér layoutot, és a `NavbarClient`/`Footer` köré teszünk egy `usePathname()`-alapú feltételt, ami `/rendezveny` alatt nem rendel. Rondább (a rossz nav JS-e is letöltődik), de 10 perc alatt visszavonható.

### 6.2 Stílus-szeparáció (nulla regresszió garancia)

Két rétegben szigeteljük:

1. **Tailwind tokenek névtérrel.** A `tailwind.config.js`-be `colors.ev.*`, `fontFamily.evDisplay` stb. — semmi meglévő kulcs nem íródik felül.
2. **Scoped CSS változók.** Az `app/rendezveny/rendezveny.css` minden custom osztálya `.ev-` prefixű, és minden változó a `.ev-root` alatt él:

```css
.ev-root {
  --ev-bg: #FAFAF8;
  --ev-ink: #191723;
  --ev-brand: #2E2A6B;
  --ev-cat: #C6CEF7;        /* kategóriánként felülírva */
  --ev-cat-deep: #3B4BB8;
  /* ... */
  background: var(--ev-bg);
  color: var(--ev-ink);
}
```

A `rendezveny/layout.js` egyetlen `<div className="ev-root">`-ba csomagol mindent. Ha valami elszabadul, az csak a `/rendezveny` alatt látszik.

### 6.3 Célfájl-lista

```
app/
  layout.js                                   MÓDOSÍT
  (foto)/layout.js                            ÚJ
  (foto)/**                                   ÁTHELYEZ (10 mappa/fájl)
  rendezveny/layout.js                        ÚJ
  rendezveny/rendezveny.css                   ÚJ
  rendezveny/page.js                          ÚJ   hub
  rendezveny/[kategoria]/page.js              ÚJ   szerver: metadata + JSON-LD
  rendezveny/[kategoria]/CategoryClient.js    ÚJ   kliens: UI
  rendezveny/munkaim/page.js                  ÚJ
  rendezveny/munkaim/MunkaimClient.js         ÚJ
  rendezveny/munkaim/[slug]/page.js           ÚJ
  rendezveny/munkaim/[slug]/CaseClient.js     ÚJ
  rendezveny/video/page.js                    ÚJ
  rendezveny/csomagok/page.js                 ÚJ
  rendezveny/rolam/page.js                    ÚJ
  rendezveny/ajanlatkeres/page.js             ÚJ
  rendezveny/koszonjuk/page.js                ÚJ
  api/rendezveny-ajanlat/route.js             ÚJ   POST végpont
  sitemap.js                                  MÓDOSÍT

components/rendezveny/
  EventNav.js          fix fejléc + mobil overlay (fixed-body zárral, ld. L4)
  EventFooter.js       sötét lábléc, link vissza a fotós oldalra
  EventHero.js         hero sablon (poster + videó + cím)
  MotionBackdrop.js    videó-háttér motor (IO, reduced-motion, saveData)
  Reveal.js            maszkos feltárulás wrapper
  MonoLabel.js         `[01] — CÍMKE` mono felirat
  Marquee.js           végtelen görgetősáv
  StatCounter.js       számláló
  CategoryCard.js
  PillarBlock.js       FOTÓ / VIDEÓ / TARTALOM
  CaseCard.js
  CaseMetaBar.js
  GalleryMasonry.js    react-masonry-css + lightbox
  HorizontalScroller.js
  ProcessSteps.js
  PackageCards.js
  FaqAccordion.js
  VideoFacade.js       poszter → kattintásra tölti a lejátszót
  ReelWall.js          9:16 mockup fal
  TestimonialRow.js
  ReferenceList.js
  BriefForm.js         3 lépéses űrlap
  StickyCta.js         mobil alsó sáv
  CustomCursor.js      desktop galéria-kurzor (dynamic import, ssr:false)

constants/rendezveny/
  site.js              globális szövegek, elérhetőség, számok
  categories.js        4 kategória teljes adata
  cases.js             8–12 esettanulmány
  references.js        referencialista
  packages.js          csomagok + à la carte + extrák
  faq.js               általános + kategóriánkénti GYIK
  testimonials.js      vélemények

lib/
  supabaseAdmin.js     ÚJ  service-role kliens (csak szerveroldal!)
  eventMedia.js        ÚJ  galéria-manifest olvasó + méret-lekérdezés
  resend.js            ÚJ  Resend kliens + küldési helper (csak szerveroldal!)

emails/                ÚJ  React Email sablonok, verziókövetve
  RendezvenyBrief.jsx        belső értesítő neked
  RendezvenyVisszaigazolas.jsx  automatikus válasz az ügyfélnek

scripts/
  prep-event-images.mjs  ÚJ  sharp: átméretez, WebP, méretkorlát, RELATÍV útvonal
  build-media-manifest.mjs ÚJ  minden képhez width/height → constants/rendezveny/manifest.json
  check-media-budget.mjs   ÚJ  build-time őr: buktatja a buildet túllépésnél
  encode-video.sh          ÚJ  ffmpeg tömörítés + poster
  loopify.sh               ÚJ  zökkenőmentes loop keresztúsztatással

public/images/rendezveny/     ÚJ  MINDEN rendezvényes kép (hero, OG, galériák)
  hero/ · konferencia/ · egyetemi/ · offroad/ · maganunnep/ · case/<slug>/
public/video/rendezveny/      ÚJ  a 6–9 motion asset (≤ 9 MB összesen)
```

### 6.4 Adatréteg mintája

A meglévő `constants/services.js` mintáját követjük (ismerős, nincs CMS-függés):

```js
// constants/rendezveny/categories.js
export const EVENT_CATEGORIES = {
  konferencia: {
    slug: "konferencia",
    order: 1,
    title: "Konferencia és céges rendezvény",
    navTitle: "Konferencia",
    tagline: "Előadás, gála, díjátadó, termékbemutató",
    accent: "#5AA9FF",
    heroPoster: "/images/rendezveny/hero/konferencia-poster.webp",
    heroVideo: "hero-konferencia",                // public/video/rendezveny/ alatti alapnév
    galleryDir: "konferencia",                    // public/images/rendezveny/konferencia/
    problem: "…",
    solution: "…",
    deliverables: [
      "150–400 retusált kép, vízszintes és 9:16 vágásban",
      "Válogatott sajtókész csomag 24 órán belül",
      "…",
    ],
    priceFrom: "TODO Ft-tól",
    faq: [/* … */],
    seo: {
      title: "Konferencia fotós | …",
      description: "…",
      keywords: ["konferencia fotós", "céges rendezvény fotózás", "…"],
    },
  },
  // egyetemi, offroad, maganunnep …
};
```

Az esettanulmányok (`cases.js`) hasonlóan, `category`, `slug`, `date`, `location`, `client`, `attendees`, `services[]`, `metrics[]`, `quote`, `galleryDir`, `video` mezőkkel.

A képek méretét **nem kézzel írjuk be**: a `scripts/build-media-manifest.mjs` végigjárja a `public/images/rendezveny/` mappát, és minden fájlhoz kiírja a `width`/`height` értéket egy `manifest.json`-ba. A `lib/eventMedia.js` ezt olvassa, így a `next/image` mindig pontos méretet kap → **nulla CLS**, és soha nem kell kézzel karbantartani egy képlistát. Új kép feltöltése = script futtatás.

### 6.5 Renderelési stratégia

| Oldal | Mód | Indok |
|---|---|---|
| Hub, kategória, csomagok, rólam, video | statikus (SSG) | tartalom adatfájlból, ritkán változik |
| Esettanulmány | **teljesen statikus** | a galéria helyi fájlokból épül → nincs futásidejű lekérés, nem kell `revalidate` |
| Munkáim index | statikus + kliensoldali szűrés | gyors |
| Ajánlatkérés | statikus + kliens űrlap | — |
| `/api/rendezveny-ajanlat` | Netlify function (dinamikus) | POST |

Minden dinamikus szegmensnél `generateStaticParams()` + `export const dynamicParams = false` → ismeretlen slug 404, nem futásidejű hiba.

**Next.js 16 emlékeztető:** a `params` **Promise** — `const { kategoria } = await params;`. A kódbázis már így csinálja (`app/szolgaltatasok/[slug]/page.js`), tehát követjük a meglévő mintát.

---

## 7. Média-pipeline

> **Alapelv: nincs külső médiaszolgáltató.** Minden rendezvényes kép és rövid videó a repóban él, és a Netlify CDN-jéről szolgál ki. A hosszú videók YouTube unlisted linkre kerülnek, facade-dal. Nulla API kulcs, nulla dashboard, nulla sávszélesség-cliff.

### 7.1 Képek

Minden rendezvényes kép ide kerül:

```
public/images/rendezveny/
  hero/             hero posterek és OG képek (~15 db)
  konferencia/      válogatott galéria (25–40 db)
  egyetemi/
  offroad/
  maganunnep/
  case/<slug>/      esettanulmány-galériák (12–20 db / eset)
```

#### Mennyi ez valójában?

**Megszámoltam a tényleges anyagot** a `07-20_Weboldalamra_Kepek/Rendezvények` mappában:

| Tétel | Darab | Átlag | Összesen |
|---|---|---|---|
| A meglévő válogatás (6 kategória, 3.1) | **91** | ~150 KB | **~14 MB** |
| Generált hero + kategória-színmezők + OG | ~15 | ~200 KB | ~3 MB |
| Tartalék bővítésre (ha pótolsz anyagot) | +100 | ~150 KB | ~15 MB |
| **Reális felső határ** | **~205 kép** | | **~32 MB** |

> A terv korábbi verziója ~325 képpel és 50 MB-tal számolt — ez **túlbecslés** volt. A valóság ennek kb. a fele, tehát a repó-kockázat még kisebb, mint gondoltam. A 70 MB-os build-time keret így bőven elég, akkor is, ha később duplájára bővíted az anyagot.

Ez **egyszeri, végleges** hozzáadás a repóhoz. A `.git` azért 1,9 GB, mert nyers JPEG-ek **ismételt** commitjai halmozódtak (L6) — itt viszont már optimalizált WebP-t teszünk be, egyszer, és soha nem szerkesztjük őket helyben.

#### Miért elég egyetlen forrásfájl képenként

A `next/image` a Netlify Image CDN-en keresztül **menet közben** generálja a reszponzív méreteket és az AVIF/WebP változatokat (a `next.config.mjs` már `formats: ['image/avif','image/webp']`-re van állítva). Nem kell tehát több méretet tárolnunk — egy jól méretezett forrás elég, a többit a CDN intézi.

#### A feldolgozó pipeline

| Script | Mit csinál |
|---|---|
| `scripts/prep-event-images.mjs` | sharp: hosszabb él **max 1800 px**, WebP **q72**; ha a fájl így is > 220 KB, újrapróba q64-gyel; **relatív útvonal**, nem drótozott abszolút (L12) |
| `scripts/build-media-manifest.mjs` | végigjárja a mappát, minden képhez kiírja a `width`/`height`-ot a `manifest.json`-ba → a `next/image` pontos méretet kap, **nulla CLS** |
| `scripts/check-media-budget.mjs` | **build-time őr** — hibával leáll, ha bármelyik kép > 250 KB, vagy a `public/images/rendezveny/` összesen > 70 MB, vagy a `public/video/rendezveny/` > 12 MB |

Az őr bekerül a `package.json` `prebuild` scriptjébe, tehát **nem lehet véletlenül túllépni** a keretet — a build megbukik, mielőtt a repó elhízna.

> **Kemény szabály:** nyers vagy eredeti fájl (JPEG a fényképezőből, PSD, TIFF) **soha nem kerül a repóba.** Azok a repón kívül maradnak, a `kalacs-image-originals/` mappában. A `.gitignore`-ba felveszünk egy védősort a gyakori nyers kiterjesztésekre.

**Alt-szövegek:** minden képnek magyar, leíró alt kell (SEO + akadálymentesség). Sablon: *„{kategória} fotó — {esemény} {helyszín}, {év}"*.

### 7.2 Videó — hol tároljuk

| Anyag | Hol | Miért |
|---|---|---|
| Hero loopok, seam-effektek, logo sting | `public/video/rendezveny/` | egyszerű, gyors, nincs külső függés; ≤ 9 MB összesen |
| Aftermovie, showreel, VSL (hosszú) | **YouTube unlisted + facade** | ingyenes, adaptív. A facade miatt a YouTube JS **nem** töltődik be, amíg nem kattintanak → nincs teljesítmény-büntetés |
| Ha a YouTube-branding zavar | Bunny Stream vagy Vimeo Pro (2. fázis) | tiszta lejátszó, saját branding, olcsó |

**Netlify sávszélesség:** az ingyenes keret 100 GB/hó. A `MotionBackdrop` beépített korlátai miatt (poster először, mobilon és lassú kapcsolaton egyáltalán nem tölt videót, képernyőn kívül megáll) a tényleges fogyasztás töredéke az elméleti maximumnak. Egy 2 MB-os hero loop akkor is csak ~10 GB-ot jelentene 5 000 tényleges lejátszásnál — bőven a kereten belül.

### 7.3 ffmpeg receptek

`scripts/encode-video.sh`:

```bash
#!/usr/bin/env bash
# Használat: ./scripts/encode-video.sh nyers.mp4 hero-main
set -euo pipefail
IN="$1"; NAME="$2"; OUT="public/video/rendezveny"
mkdir -p "$OUT"

# 1) Desktop H.264 — széles támogatás
ffmpeg -y -i "$IN" -an -vf "scale=1920:-2,fps=25" \
  -c:v libx264 -profile:v high -crf 26 -preset slow -pix_fmt yuv420p \
  -movflags +faststart "$OUT/$NAME.mp4"

# 2) Modern böngésző VP9/WebM — jellemzően 30-40%-kal kisebb
ffmpeg -y -i "$IN" -an -vf "scale=1920:-2,fps=25" \
  -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 "$OUT/$NAME.webm"

# 3) Mobil változat
ffmpeg -y -i "$IN" -an -vf "scale=1080:-2,fps=25" \
  -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p \
  -movflags +faststart "$OUT/$NAME-mobile.mp4"

# 4) Poster (ez lesz az LCP kép!)
ffmpeg -y -i "$OUT/$NAME.mp4" -vframes 1 -q:v 2 "/tmp/$NAME-poster.jpg"
cwebp -q 80 "/tmp/$NAME-poster.jpg" -o "public/images/rendezveny/$NAME-poster.webp"

ls -lh "$OUT/$NAME."* "public/images/rendezveny/$NAME-poster.webp"
```

`scripts/loopify.sh` — zökkenőmentes loop (az utolsó F másodpercet átúsztatja az elejére):

```bash
#!/usr/bin/env bash
# Használat: ./scripts/loopify.sh nyers.mp4 kimenet.mp4 [keresztuszt_mp]
set -euo pipefail
IN="$1"; OUT="$2"; F="${3:-0.6}"
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$IN")
OFFSET=$(awk -v d="$D" -v f="$F" 'BEGIN{printf "%.3f", d - 2*f}')
ffmpeg -y -i "$IN" -filter_complex \
"[0]split[body][pre];\
 [body]trim=start=$F,setpts=PTS-STARTPTS[b];\
 [pre]trim=duration=$F,setpts=PTS-STARTPTS[p];\
 [b][p]xfade=transition=fade:duration=$F:offset=$OFFSET[v]" \
 -map "[v]" -an "$OUT"
echo "Kész: $OUT (eredeti ${D}s → ~$(awk -v d="$D" -v f="$F" 'BEGIN{printf "%.1f", d-f}')s)"
```

**Méret-ellenőrzés minden asset után:**
```bash
ffprobe -v error -show_entries format=size,duration -of default=noprint_wrappers=1 fajl.mp4
```

### 7.4 Teljes motion asset költségvetés

| Asset | Típus | Cél | Hossz | Célméret |
|---|---|---|---|---|
| **hero-prizma** | **videó** | hub hero, görgetés-vezérelt | 4 s | ≤ 2,0 MB |
| 6 kategória-színmező | **kép** | kategória-hero háttér | — | ≤ 200 KB / db |
| seam-prizma | videó | szekció-átmenet | 2 s | ≤ 300 KB |
| logo-sting | videó | videók eleje | 2 s | ≤ 350 KB |
| social-bg × 3 | videó | 9:16 sablonok (nem az oldalon) | 5 s | — |

**Videó összesen az oldalon: ≤ 3 MB.** Ez a korábbi ~9 MB harmada, mert hat kategória-videó helyett hat állókép kell. Egy látogató a hub-on max. 2 MB videót tölt, minden más oldalon **nulla**. A `check-media-budget.mjs` őr 12 MB-nál buktatja a buildet — bőven van fejtér.

> **Forrás vs. kiszállított méret:** a fenti célméretek a **kiszállított** fájlra vonatkoznak. A Higgsfield-forrás ennél jóval nagyobb felbontású lehet (akár 4K) — a lekicsinyítés 1920 px-re önmagában javítja a tömörítés minőségét, mert elrejti a generatív modellek finom zaját. Ezért éri meg 4K-ban generálni ott, ahol az ára megengedi (8.4).

---

## 8. Higgsfield — motion asset gyártás

**Keret: 1000 kredit / hó, Plus csomag.** Cél a lehető legjobb látvány — de a legjobb látvány *nem* a legdrágább modell vak választása, hanem a megfelelő munkafolyamat.

### 8.1 Valós kredit-árak

Minden árat `get_cost: true` preflighttal kérdeztem le, tényleges generálás nélkül. **Videó, 16:9, néma:**

| Modell | Beállítás | 8 mp | kredit/mp |
|---|---|---|---|
| Cinema Studio 3.0 | **4K** | **192** | 24,0 |
| Veo 3.1 | ultra, preview | 87,2 | 10,9 |
| Cinema Studio 3.0 | 1080p | 80 | 10,0 |
| Seedance 2.0 | 1080p std, high bitrate | 72 | 9,0 |
| Veo 3.1 | high, preview | 58 | 7,25 |
| **Kling 3.0** | **4K** | **48** | **6,0** |
| **Kling 3.0** | **pro** | **14** | **1,75** |

**Kép:**

| Modell | Beállítás | kredit |
|---|---|---|
| **Soul Cinema** | 2K | **0,12** |
| Cinema Studio Image 2.5 | 4K | 4 |
| Nano Banana Pro | 4K | 4 |

#### Amit ezekből tudni kell

**A drágább nem automatikusan jobb.** A Cinema Studio 3.0 négy K-ban egyetlen 8 másodperces klipért 192 kreditet kér — a havi keret **19%-át**. Ha vakon a legdrágábbat választanánk, öt klip után elfogyna a hónap, iteráció nélkül. Kling 3.0 ugyanabban a felbontásban 48 kredit: **négyszeres különbség**.

**Egy állókép gyakorlatilag ingyen van.** Soul Cinema 2K-ban 0,12 kredit. Ez a terv sarokköve.

### 8.2 A munkafolyamat: kép először

Ahelyett, hogy vakon szöveg-alapú videót generálnánk és reménykednénk, **előbb az állóképet rendezzük meg**, és csak a győztes kockát animáljuk. Így a drága videó-kredit már egy jóváhagyott képre megy, nem találgatásra.

```
A. ART DIRECTION  (olcsó, sok iteráció)
   soul_cinematic 2K, 0,12 kr/db
   → kompozíció, fény, szín, hangulat véglegesítése assetenként
   → tipikusan 20–40 kocka, amíg pontosan az lesz, amit akarunk

B. A NYERTES KOCKA 4K-BAN  (start frame)
   cinematic_studio_2_5 4K, 4 kr
   → ugyanaz a prompt, nagy felbontásban → éles start_image

C. ANIMÁCIÓ  (drága, kevés próba)
   generate_video(model, medias:[{role:'start_image', value:<job_id>}])
   → a kép már adott, a modellnek csak mozgatnia kell

D. UTÓMUNKA
   letöltés → scripts/loopify.sh → scripts/encode-video.sh
   → public/video/rendezveny/ + poster a public/images/rendezveny/hero/-ba

E. BEÉPÍTÉS
   <MotionBackdrop poster=… sources=… />
```

### 8.3 Az asset-lista — sokkal kevesebb videó kell

A PRIZMA irány és a „csak a hub hero mozog” döntés **átírja a listát**. Korábban hét videó kellett; most **egy** videó a lényeg, a többi állókép:

| Asset | Típus | Hol | Megjegyzés |
|---|---|---|---|
| **hero-prizma** | **videó**, 4 mp, 1600×900 | hub hero, görgetés-vezérelt | **ez a zászlóshajó** — ide megy a költségvetés zöme |
| 6 kategória-színmező | **állókép**, 4K | kategória-hero háttér | statikus, nincs mozgás |
| seam-prizma | videó, 2–3 mp | szekció-átmenet | opcionális |
| logo-sting | videó, 3 mp | videók elején | opcionális |
| 3 social 9:16 sablon | videó, 5 mp | reels-háttér, nem az oldalon | marketing |

Mivel csak **egyetlen** kulcsvideó van, megengedhetjük magunknak, hogy azon **tényleg maximalizáljunk** — több jelölt, több iteráció, legmagasabb minőségi fokozat.

### 8.4 Hero bake-off — négy jelölt

Ugyanazt a jóváhagyott 4K start frame-et átfuttatjuk **négy** csúcsmodellen, és egymás mellett döntünk. 4 mp-es klipnél:

| Jelölt | Beállítás | Kredit |
|---|---|---|
| Kling 3.0 | 4K, néma | 24 |
| Seedance 2.0 | 1080p std, high bitrate | 36 |
| Veo 3.1 | ultra, preview | 44 |
| Cinema Studio 3.0 | **4K**, néma | 96 |
| | **Bake-off összesen** | **200** |

Korábban a Cinema Studio 3.0 4K-t kizártam az ára miatt (192 kredit egy 8 mp-es klipért). **Négy másodpercnél 96 kredit** — és mivel most csak egyetlen videó kell az egész oldalra, ez belefér. A legjobb minőség kipróbálása így nem luxus, hanem a helyes döntés.

### 8.5 Kredit-költségvetés

| Szakasz | Modell | Egységár | Db | Kredit |
|---|---|---|---|---|
| A. Art direction (állóképek) | soul_cinematic 2K | 0,12 | ~250 | **30** |
| B. 6 kategória-színmező 4K-ban | cinematic_studio_2_5 4K | 4 | 6 | **24** |
| C. Hero start frame 4K-ban | cinematic_studio_2_5 4K | 4 | 3 | **12** |
| D. Hero bake-off | 4 modell (8.4) | — | 4 | **200** |
| E. Hero véglegesítés | a győztes, 4 további próba | 24–96 | 4 | **~100–380** |
| F. seam + logo sting (3 mp) | kling3_0 pro | 5,25 | 4 | **21** |
| G. 3 db 9:16 social sablon (5 mp) | kling3_0 pro | 8,75 | 3 | **26** |
| | | | **Részösszeg** | **~410–690** |
| H. Tartalék | | | | **~310–590** |
| | | | **Keret** | **1000** |

> A korábbi tervhez képest **jelentősen több marad tartalékban**, mert hat kategória-videó helyett hat állókép kell. Ezt a megtakarítást a hero minőségére költjük — ott, ahol egyedül számít.

**Szabályok, hogy a keret tartson:**
- `get_cost: true` **minden** generálás előtt — soha nem indítunk vakon
- a `balance` ellenőrzése minden szakasz elején
- audio mindenhol **kikapcsolva** (`sound: 'off'` / `generate_audio: false`)
- ha egy asset négy próbából sem jó, **megállunk és újratervezzük a promptot**

### 8.5 A generálás menete

A Higgsfield MCP a Claude Code-ból közvetlenül hívható: `balance`, `models_explore`, `generate_image`, `generate_video`, `job_status`, `show_generations`.

A `start_image` átadása a **job_id**-vel történik (nem URL-lel): a `generate_image` visszaadott azonosítója közvetlenül beadható a `generate_video` `medias: [{role: 'start_image', value: <job_id>}]` mezőjébe.

### 8.6 Konkrét promptok (angolul — a modellek erre pontosabbak)

Ezek a promptok **mindkét szakaszban** használhatók: előbb az állókép megrendezéséhez (A. szakasz), majd — a mozgásra vonatkozó résszel kiegészítve — az animációhoz (C. szakasz).

#### A zászlóshajó — hero-prizma

```
Abstract prismatic light field on a warm off-white background. Soft chromatic
dispersion through frosted glass, pastel spectrum ribbons in periwinkle blue,
sage green, warm sand, dusty sky blue, soft orchid and blush pink, drifting
and gently refracting into one another. Airy, luminous, high-key, generous
negative space in the centre. Delicate 35mm film grain, subtle bloom.
Extremely slow, calm lateral drift. Editorial, premium, optimistic,
professional. No people, no objects, no text, no logos.
```

**Miért ez a prompt:**
- `warm off-white background` — ellentéte a korábbi `pure black`-nek; ez adja a világos alapot
- a felsorolt hat szín **pontosan a hat kategória-pasztell** → a hero előrevetíti a lentebbi kategóriákat
- `generous negative space in the centre` — ide kerül a H1, tehát kell a nyugodt középmező
- `extremely slow, calm lateral drift` — görgetés-vezérelt lejátszásnál a lassú mozgás néz ki jól; a gyors ideges lesz
- `high-key, luminous` — hogy ne süllyedjen szürkébe a világos oldalon

#### A hat kategória-színmező (állókép, nem videó)

Ugyanaz a váz, csak a domináns szín cserélődik:

```
Abstract prismatic light field on a warm off-white background, dominated by
{SZÍN}. Soft chromatic dispersion through frosted glass, gentle gradient wash,
airy and luminous, high-key, generous negative space on the left third.
Delicate film grain, subtle bloom. Editorial, premium, professional.
No people, no objects, no text.
```

| Kategória | `{SZÍN}` |
|---|---|
| Konferencia | `soft periwinkle blue with a hint of indigo` |
| Egyetemi | `soft sage green` |
| Offroad | `warm sand and pale ochre` |
| Sport | `dusty sky blue` |
| Kultúra | `soft orchid violet` |
| Magánünnep | `blush pink with warm rose` |

#### Kiegészítők

| Asset | Prompt |
|---|---|
| **seam-prizma** | `Soft prismatic light sweep across a warm off-white background, gentle pastel chromatic aberration, airy and clean, 2 seconds, loopable, no text` |
| **logo-sting** | Statikus wordmark-képet adj be referenciának: `Minimal wordmark reveal on warm off-white, a soft prismatic light band passes across and the letters emerge, refined and calm, 2 seconds` |

**Prompt-szabályok a konzisztenciáért:**
- mindig `warm off-white background`, `high-key`, `luminous` — ez tartja együtt a családot és illeszti a világos oldalhoz
- mindig `no people, no objects, no text` — generált arcok és feliratok zavaróak és félrevezetőek
- mindig `slow` / `gentle` — görgetés mellett a gyors mozgás kellemetlen és rosszul tömöríthető
- egységes `delicate film grain, subtle bloom` — a szemcse az, ami a generált pasztellt megmenti attól, hogy „digitális gradiensnek” hasson; enélkül néz ki olcsó AI-háttérnek

### 8.7 `MotionBackdrop` komponens szerződése

Minden videó ezen keresztül megy. A szabályok kódba vannak égetve, így nem lehet elrontani:

```jsx
<MotionBackdrop
  poster="/images/rendezveny/hero/prizma-poster.webp"  // ez az LCP kép, priority
  sources={{
    webm:   "/video/rendezveny/hero-prizma.webm",
    mp4:    "/video/rendezveny/hero-prizma.mp4",
  }}
  mode="scrub"              // scrub | loop | static
  scrollTarget={heroRef}    // csak mode="scrub" esetén
  overlay="wash"            // wash | scrim | none
/>
```

A `mode="scrub"` a hub hero-ja (5.1.1): a görgetés állítja a `currentTime`-ot `requestAnimationFrame`-ben. A `mode="static"` a kategória-oldalaké — ott csak a generált állókép jelenik meg, videó nélkül.

Beépített viselkedés:
1. A **poster `next/image priority`**-vel renderel → **a videó soha nem az LCP elem**
2. `<video preload="none" autoPlay muted playsInline loop disablePictureInPicture aria-hidden="true">`
3. A videó `opacity-0`, és csak a `canplaythrough` esemény után úszik be 600 ms alatt
4. `scrub` módban a `currentTime` **kizárólag `requestAnimationFrame`-ben** állítódik, throttle-ölve
5. IntersectionObserver: képernyőn kívül `pause()`, és `scrub` módban leáll a rAF-hurok
6. `prefers-reduced-motion: reduce` → **a videó be sem töltődik**, marad a poster
7. `navigator.connection.saveData` vagy `effectiveType ∈ {slow-2g, 2g, 3g}` → csak poster
8. `< 768 px` képernyőn **nincs scrubbing** — poster + CSS gradiens-animáció
9. Ha a `canplaythrough` 2 mp-en belül nem érkezik meg → marad a poster, a scrubbing nem indul
10. Fölötte mindig **világos wash-réteg** (`rgba(250,250,248,0.55)` gradiens), hogy a mély tinta szöveg kontrasztja garantált legyen

### 8.8 Hol NE legyen videó

**A teljes oldalon egyetlen videó van: a hub hero-ja.** Minden más helyen generált állókép vagy CSS-animáció dolgozik.

- A kategória-oldalak hero-ja **statikus** generált színmező — nincs videó
- Az esettanulmány-galériákban nincs videó-háttér (a fotó a főszereplő)
- Az űrlap oldalon nincs mozgó háttér (elvonja a figyelmet a konverzióról)
- A láblécben nincs
- Kategória-kártya hoverre: **CSS-alapú** szín- és skála-átmenet, nem videó

> Ez a korlátozás nem szegényíti az oldalt. Az „élettel teli” érzetet a **szín-átúszás görgetésre** (4.5), a maszkos feltárulások és a pasztell wash-mezők adják — mindez CSS-ből, nulla hálózati költséggel.

---

## 9. Lead-kezelés

### 9.1 Folyamat

```
BriefForm (kliens)
   └─POST /api/rendezveny-ajanlat          (szerveroldal, Netlify function)
        1. honeypot üres? + kitöltési idő ≥ 3 s?   → ha nem: 200 OK, de eldobjuk
        2. mezők validálása (email formátum, kötelezők, hosszkorlátok)
        3. Supabase INSERT  → rendezveny_leadek        ← a lead SOHA nem vész el
        4. Resend  → értesítés neked + automatikus visszaigazolás az ügyfélnek
        5. a Resend message_id visszaírása a lead sorába
        6. { ok: true }  →  redirect /rendezveny/koszonjuk
```

A 3. lépés a lényeg: **először mentünk, utána küldünk.** Ha az e-mail bármiért elhal, a megkeresés akkor is megvan az adatbázisban — a 4. lépés hibája nem buktatja a kérést, csak `email_statusz = 'hiba'` lesz a soron.

### 9.2 Supabase séma

```sql
create table public.rendezveny_leadek (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  nev               text not null,
  email             text not null,
  telefon           text,
  szervezet         text,
  esemeny_tipus     text not null,
  szolgaltatasok    text[] not null default '{}',
  esemeny_datum     date,
  datum_bizonytalan boolean default false,
  helyszin          text,
  varhato_letszam   text,
  idotartam         text,
  atadasi_hatarido  text,
  koltsegkeret      text,
  honnan_talalt     text,
  uzenet            text,
  statusz           text not null default 'uj',
  email_statusz     text not null default 'fuggoben',  -- fuggoben | elkuldve | hiba
  resend_message_id text,
  forras_url        text,
  utm               jsonb
);

alter table public.rendezveny_leadek enable row level security;
-- Szándékosan NINCS anon policy: csak a service-role kulcs írhat/olvashat,
-- azt pedig kizárólag a szerveroldali route handler ismeri.
create index rendezveny_leadek_created_idx on public.rendezveny_leadek (created_at desc);
```

**Új környezeti változó:** `SUPABASE_SERVICE_ROLE_KEY`
⚠️ **Soha ne `NEXT_PUBLIC_` előtaggal!** Ha kliensre kerül, bárki hozzáfér az összes táblához. Új fájl: `lib/supabaseAdmin.js`, ami `import 'server-only'`-lal kezdődik, hogy a build hibát dobjon, ha véletlenül kliensbe importálódik.

Netlify oldalon is fel kell venni: Site settings → Environment variables.

### 9.3 E-mail: Resend (EmailJS helyett)

**Döntés: átállunk Resendre.** Az indoklás és a migrációs terv alább.

#### Miért érdemes

| Szempont | EmailJS (jelenleg) | Resend |
|---|---|---|
| **Biztonság** | a kulcsok **kliensoldalon, hardkódolva** (L8) — bárki küldhet a nevedben | API kulcs kizárólag szerveroldalon |
| **Sablonok** | webes felületen szerkesztve, nincs verziókövetés, **darabszám-limit** | React Email → a levél a **repóban él**, lokálisan előnézhető, korlátlan |
| **Ingyenes keret** | 200 levél / hó | 3 000 levél / hó, 100 / nap |
| **Kézbesíthetőség** | a csatolt fiókon át megy, gyenge aláírás | saját SPF + DKIM → lényegesen jobb inbox-arány |
| **Visszajelzés** | nincs | webhook: kézbesítve / bounce / spam-panasz → visszaírható a leadhez |
| **Kód** | kliens SDK, nehezen tesztelhető | egy `await resend.emails.send({...})` a route handlerben |

A legfontosabb gyakorlati érv: az **automatikus visszaigazoló** az, ami EmailJS-en át gyakran spambe esik. Ha egy szervező nem kapja meg a visszaigazolást, azt hiszi, el sem ment a megkeresés.

#### A kritikus rész: a meglévő e-mailedhez nem nyúlunk

Ez a leggyakoribb félelem, ezért külön kiemelem:

> A Resendet **aldomainre** állítjuk be — `send.kovacsbalintfoto.hu` —, nem a gyökérdomainre.
> A `kapcsolat@kovacsbalintfoto.hu` postafiókod MX- és SPF-rekordjaihoz **egyáltalán nem nyúlunk hozzá.** Nulla kockázat a meglévő leveleződre.

Küldési fejlécek:

```
From:     Kovács Bálint <ajanlat@send.kovacsbalintfoto.hu>
Reply-To: kapcsolat@kovacsbalintfoto.hu
```

Ha az ügyfél a visszaigazolásra válaszol, az a **megszokott postafiókodba** érkezik. Ő ebből semmit nem lát.

#### Beállítás (kb. 30 perc + DNS propagáció)

1. Resend fiók, `send.kovacsbalintfoto.hu` domain felvétele
2. A Resend által kiadott **3 DNS rekord** felvétele a domain szolgáltatódnál: DKIM (TXT/CNAME), SPF (TXT), és ajánlott egy DMARC (TXT, `p=none` kezdésnek)
3. Verifikáció megvárása (percek–órák)
4. `RESEND_API_KEY` env változó lokálisan (`.env.local`) **és** Netlifyn
5. `npm i resend @react-email/components`

⚠️ **Ne a gyökérdomainre tegyél második SPF rekordot** — ha már van egy (a mostani levelezéshez), két SPF rekord elrontja a hitelesítést. Az aldomaines megoldás ezt eleve kizárja.

#### A két levél

**Neked (belső brief):** tárgy `[RENDEZVÉNY] {kategória} · {dátum} · {név}`. Törzsben minden mező táblázatosan, felül a három legfontosabb adat (típus, dátum, keret), hogy egy pillantással eldöntsd, érdekel-e. Alul egy „Válasz az ügyfélnek" gomb `mailto:` linkkel.

**Az ügyfélnek (visszaigazolás):** *„Megkaptam a megkeresésed"* + amit rögzítettél, visszaolvasva + mikor válaszolsz (pl. 24 óra munkanapokon) + 2 link: portfólió és a hozzá tartozó kategóriaoldal.

Mindkettő React Email komponens az `emails/` mappában, a rendezvényes arculat sötét stílusában — az e-mail is a márka része.

#### Migráció két lépésben

| Lépés | Mikor | Mi történik |
|---|---|---|
| **1.** | most, a rendezvényes oldallal (Fázis 7) | Az új brief űrlap Resenden megy. **Az EmailJS-hez nem nyúlunk** — a meglévő kapcsolati űrlap és a galéria-értesítő változatlanul működik. |
| **2.** | később, külön feladatként | `components/Contact.js` és `components/ClientGallery.jsx` átállítása ugyanarra a route handlerre → EmailJS teljesen kivehető, 3 npm csomag (`emailjs-com`, `@emailjs/browser`, `@emailjs/nodejs`) törölhető, a hardkódolt kulcsok eltűnnek. |

Így ha a Resend bármiért nem jön össze (pl. nem férsz hozzá a DNS-hez), a meglévő oldal **érintetlen marad**, és a rendezvényes űrlap ideiglenesen visszaállítható EmailJS-re.

#### Tartalék terv

Ha a DNS hozzáférés hiányzik vagy csúszik: a route handler ugyanúgy elmenti a leadet Supabase-be, és **e-mail helyett** a `/admin/rendezveny-leadek` oldalon látod. Egyetlen megkeresés sem vész el, csak nem kapsz róla azonnal levelet. Ez a Fázis 7 blokkolás nélküli indításához elég.

### 9.4 Spamvédelem

1. Honeypot mező (`<input name="webpage">`, CSS-sel elrejtve, nem `display:none`, hanem képernyőn kívül)
2. Minimum kitöltési idő 3 s (rejtett timestamp)
3. Egyszerű IP-alapú korlát: 5 küldés / óra (memóriában, serverless-en best effort)
4. Mezőhossz-korlátok + link-számláló az üzenetben (3+ URL → gyanús jelölés, nem eldobás)
5. **Nem** teszünk captchát — rontja a konverziót, és a fenti négy elég egy ilyen forgalomnál

### 9.5 GDPR

- Kötelező checkbox, link az `/adatvedelem` oldalra
- Az `/adatvedelem` oldalt **ki kell egészíteni** a rendezvényes űrlap adatkezelésével: milyen adatokat gyűjtünk, meddig tároljuk (javaslat: 24 hónap), hol (Supabase EU régió), kihez lehet fordulni törléssel
- A tárolt adat között ne legyen felesleges (pl. IP-t nem tárolunk)

### 9.6 Admin lead-nézet (Fázis 7, nem opcionális)

`app/(foto)/admin/rendezveny-leadek/page.js` — a meglévő `middleware.js` basic auth **automatikusan védi** (matcher `/admin/:path*`, a route group nem változtat URL-t). Egyszerű táblázat, státusz-váltás (új / ajánlat kiment / nyert / vesztett), az `email_statusz` oszlop jelzi, ha egy értesítő nem ment ki, CSV export (`xlsx` már telepítve).

Azért került előre a tervben: ez a **Resend tartalék terve** is egyben. Amíg a DNS nem áll össze, ezen az oldalon látod a beérkező megkereséseket.

---

## 10. SEO és AI-felfedezhetőség

### 10.1 Metadata

Minden oldal saját `generateMetadata()`-t vagy `metadata` exportot kap: egyedi `title`, `description`, `alternates.canonical`, `openGraph` (saját 1200×630 kép kategóriánként), `twitter`.

A `rendezveny/layout.js` saját címsablont ad: `template: "%s | Kovács Bálint Rendezvény"` — ez felülírja a gyökér `"%s | Kovács Bálint Fotó"` sablont.

### 10.2 Kulcsszó-térkép

| Oldal | Elsődleges | Másodlagos |
|---|---|---|
| `/rendezveny` | rendezvényfotós, rendezvény fotózás | eseményfotós, rendezvény videós, rendezvényfotózás árak |
| `/konferencia` | konferencia fotós, céges rendezvény fotózás | vállalati rendezvény fotós Budapest, gála fotózás, díjátadó fotós |
| `/egyetemi` | gólyabál fotós, ballagás fotózás | gólyatábor fotós, egyetemi bál fotózás, diplomaosztó fotós |
| `/offroad` | offroad fotós, terepverseny fotózás | motorsport fotós, autós rendezvény fotózás |
| `/maganunnep` | szülinapi fotózás, évforduló fotós | családi rendezvény fotózás, keresztelő fotós |
| `/video` | aftermovie készítés, rendezvény videó | VSL videó készítés, social media tartalomgyártás, reels készítés |

Helyi horgonyok minden oldalon: **Zalaegerszeg, Zala megye, Budapest, országosan**.

### 10.3 Strukturált adat (JSON-LD)

Fontos: a gyökér `LocalBusiness` node `@id`-je `https://kovacsbalintfoto.hu`. A rendezvényes oldalak **ne definiálják újra**, hanem hivatkozzanak rá — így a Google egy entitásként kezeli:

```js
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Konferencia fotózás",
  "provider": { "@id": "https://kovacsbalintfoto.hu" },
  "areaServed": { "@type": "Country", "name": "Magyarország" },
  "url": "https://kovacsbalintfoto.hu/rendezveny/konferencia"
}
```

Oldaltípusonként:
- Minden aloldal: `BreadcrumbList`
- Kategóriaoldal: `Service` + `FAQPage`
- Esettanulmány: `ImageGallery` vagy `CreativeWork`
- `/video`: `VideoObject` (thumbnail, feltöltés dátuma, hossz — a Google videó-találatokhoz kell)
- Hub: `CollectionPage`

A `LocalBusiness` `makesOffer` tömbjét is érdemes kiegészíteni a rendezvényes szolgáltatásokkal (`app/(foto)/layout.js`).

### 10.4 Sitemap, robots, llms.txt

- `app/sitemap.js`: hozzáadni a 12 rendezvényes útvonalat; a kategóriák és esettanulmányok az adatfájlokból generálva (mint most a `SERVICES_DATA`). Prioritások: hub 0.9, kategóriák 0.8, video 0.8, esettanulmányok 0.6, csomagok 0.7.
- `app/robots.js`: nincs teendő (a `/` engedélyezett, a `/rendezveny` alá esik).
- `public/llms.txt`: új „Rendezvény" szekció a szolgáltatásokkal és linkekkel — a mostani szerkezetet követve.

### 10.5 Kereszthivatkozás (fontos!)

Enélkül a legjobb oldal is láthatatlan marad:

1. **Fő navigációba** kerüljön egy „Rendezvény" link, vizuálisan megkülönböztetve (pl. akcentszínű keret) — jelezve, hogy más világba visz
2. **Fő oldal kezdőlapján** egy szekció: *„Rendezvényed van? Van egy külön oldalam rá."*
3. **Fő lábléc** link
4. A rendezvényes navban és láblécben visszalink: „Fotográfia →"
5. Belső linkelés a rendezvényes oldalak között (kategória ↔ esettanulmány ↔ csomagok)
6. **Google Business Profile**: vedd fel a rendezvényfotózást szolgáltatásként, és linkeld a `/rendezveny`-t
7. Instagram/Facebook bio linkbe a `/rendezveny` (ha rendezvényes tartalmat posztolsz)

---

## 11. Teljesítmény- és akadálymentességi költségvetés

### 11.1 Célszámok (mobil, Lighthouse)

| Metrika | Cél | Hogyan |
|---|---|---|
| LCP | ≤ 2,5 s | a hero **poster kép** az LCP, `priority`, WebP, ≤ 180 KB |
| CLS | ≤ 0,05 | minden médiának fix `aspect-ratio` konténer |
| INP | ≤ 200 ms | a scroll-listenerek `passive`-ak, throttle-ölve; nehéz effektek `dynamic(ssr:false)` |
| Első JS payload | ≤ 200 KB gzip | oldalankénti dynamic import, a lightbox csak kattintásra |
| Videó a viewportban | max. 1 | `MotionBackdrop` kényszeríti |
| Teljes oldalsúly első nézetnél | ≤ 1,2 MB | a videó a poster után, aszinkron |
| Lighthouse Performance | ≥ 90 mobil | — |
| Lighthouse Accessibility | ≥ 95 | — |

### 11.2 Akadálymentesség — kötelező elemek

- Minden interaktív elem billentyűzettel elérhető, látható fókuszgyűrű (`outline: 2px solid var(--ev-accent); outline-offset: 3px`)
- Dekoratív videó `aria-hidden="true"`, sosem tartalmaz információt
- Minden képnek értelmes magyar `alt`; a tisztán dekoratív képeknél `alt=""`
- Szövegkontraszt: törzs ≥ 4,5:1, nagy cím ≥ 3:1 — a 4.2 paletta ezt teljesíti
- `prefers-reduced-motion` minden animációnál (`useReducedMotion()`)
- Az űrlap minden mezőjének `<label>`-je van, a hibaüzenet `aria-live="polite"`-ban jelenik meg
- A mobil menü nyitáskor fókuszcsapdát kap, `Esc`-re zár
- Nyelv: a `<html lang="hu">` már megvan

### 11.3 Görgetészár javítása (L4)

A `globals.css` `overflow-y: scroll !important` szabálya miatt a `body.style.overflow = "hidden"` **nem működik**. Az `EventNav` ezt használja helyette:

```js
// nyitáskor
const y = window.scrollY;
document.body.dataset.scrollY = String(y);
document.body.style.position = 'fixed';
document.body.style.top = `-${y}px`;
document.body.style.width = '100%';
// záráskor
const y = Number(document.body.dataset.scrollY || 0);
document.body.style.position = '';
document.body.style.top = '';
document.body.style.width = '';
window.scrollTo(0, y);
```

---

## 12. Építési fázisok

Minden fázis végén futtatandó: `npm run build` és `npm run lint`. A fázisok külön commitokat kapnak, hogy bármelyik visszavonható legyen.

### Fázis 0 — Előkészítés és refaktor
**Cél:** biztonságos alap, nulla vizuális változás a meglévő oldalon.
- `git checkout -b rendezveny`
- `tailwind.config.mjs` és `postcss.config.mjs` törlése (L1, L2)
- `netlify.toml` kiegészítése: `[build.environment] NODE_VERSION = "22"` (L7)
- `.nvmrc` létrehozása (`22`)
- Route group refaktor (6.1): `app/(foto)/` létrehozása, 10 útvonal áthelyezése, `(foto)/layout.js` a chrome-mal, gyökér `layout.js` lecsupaszítása
- A 3 relatív import `@/components/...`-ra
- `subsets: ["latin","latin-ext"]` javítás a Geist fontoknál (L5)
- `lib/supabaseClient.js` console.log-ok törlése (L9)
- `npm i -D sharp` (L12) + `.gitignore` védősor a nyers képkiterjesztésekre

**Elfogadási kritérium:** `npm run build` hibátlan; `npm run dev`-ben a `/`, `/portfolio`, `/szolgaltatasok/eskuvo`, `/szolgaltatasok/portre`, `/about`, `/contact`, `/velemenyek`, `/galeria/...`, `/admin/velemenyek` **pixelre ugyanúgy** néz ki, mint előtte; az `/admin` továbbra is jelszót kér.

### Fázis 1 — Design rendszer és shell
- `tailwind.config.js` bővítése `ev.*` tokenekkel
- `app/rendezveny/rendezveny.css` a `.ev-root` változókkal
- `app/rendezveny/layout.js`: Bricolage font, `ev-root` wrapper, metadata sablon
- `EventNav`, `EventFooter`, `MonoLabel`, `Reveal`, `Marquee`, `StickyCta`
- `app/rendezveny/page.js` ideiglenes tartalommal

**Elfogadási kritérium:** `/rendezveny` sötét, saját navval és lábléccel tölt be; a `/` változatlan; a mobil menü nyílik-zár, a görgetés zárul (11.3).

### Fázis 2 — Adatréteg és képek
- `constants/rendezveny/*` fájlok kitöltése valós tartalommal
- `scripts/prep-event-images.mjs`, `build-media-manifest.mjs`, `check-media-budget.mjs` megírása; a `prebuild` bekötése a `package.json`-ba
- A nyers válogatások átfuttatása a pipeline-on → `public/images/rendezveny/` mappaszerkezet
- `lib/eventMedia.js` (manifest-olvasó)

**Elfogadási kritérium:** minden adatfájl valós szöveggel (nem lorem ipsum); a `manifest.json` minden képhez tartalmaz `width`/`height`-ot; a `check-media-budget.mjs` **zölden fut** (egyetlen kép sem > 250 KB, a mappa < 70 MB); szándékosan bedobott túlméretes képre viszont **elbukik** a build.

### Fázis 3 — Hub oldal
- Az 5.1 szerinti 11 szekció, `MotionBackdrop` nélkül (placeholder poster képekkel)
- `PillarBlock`, `CategoryCard`, `StatCounter`, `ProcessSteps`, `TestimonialRow`, `ReferenceList`, `FaqAccordion`

**Elfogadási kritérium:** a hub végiggörgethető mobilon és desktopon, minden link a helyére mutat (a még nem létező oldalak ideiglenes `#`-re), Lighthouse perf ≥ 90.

### Fázis 4 — Kategóriaoldalak
- `[kategoria]/page.js` + `CategoryClient.js`, `generateStaticParams`, `dynamicParams = false`
- `GalleryMasonry` + lightbox
- 4 kategória feltöltése

**Elfogadási kritérium:** mind a 4 URL statikusan generálódik; ismeretlen slug 404; a galéria lightboxa működik billentyűzettel is.

### Fázis 5 — Munkáim + esettanulmány
- Index szűrővel, esettanulmány sablon (teljesen statikus — nincs `revalidate`, a galéria helyi fájlokból épül)
- 8–12 eset feltöltése

**Elfogadási kritérium:** a szűrő URL-be ír és megosztható; minden eset megnyílik és 404 nélkül épül.

### Fázis 6 — Videó / social / VSL oldal
- `VideoFacade`, `ReelWall`
- YouTube unlisted videók feltöltése és bekötése

**Elfogadási kritérium:** a YouTube JS **csak kattintás után** töltődik (Network fülön ellenőrizve).

### Fázis 7 — Csomagok, ajánlatkérés, backend
- `PackageCards`, `BriefForm` (3 lépés)
- `app/api/rendezveny-ajanlat/route.js`
- Supabase tábla + `lib/supabaseAdmin.js` + `SUPABASE_SERVICE_ROLE_KEY` (lokál és Netlify)
- **Resend:** fiók, `send.kovacsbalintfoto.hu` domain, 3 DNS rekord, `RESEND_API_KEY`
- `emails/RendezvenyBrief.jsx` és `emails/RendezvenyVisszaigazolas.jsx` (React Email)
- `/rendezveny/koszonjuk`
- `/admin/rendezveny-leadek` (a tartalék terv miatt már itt, nem később)
- `/adatvedelem` kiegészítése

> **Párhuzamosítható:** a DNS-verifikáció órákig tarthat. Indítsd el a Resend domain-felvételt a Fázis 6 elején, hogy mire idáig érsz, már kész legyen.

**Elfogadási kritérium:** teszt-küldés végigmegy: sor jelenik meg a Supabase táblában, `email_statusz = 'elkuldve'`, **és** két levél megérkezik (a visszaigazoló **a beérkezőbe, nem spambe**); honeypot kitöltve nem jön létre sor; a Resend API kulcs szándékos elrontásával a lead **akkor is elmentődik**, `email_statusz = 'hiba'` értékkel.

### Fázis 8 — Higgsfield motion assetek
A 8. fejezet szerint, szigorúan ebben a sorrendben — a kredit-keret így tartható:

1. **A. Art direction** — Soul Cinema állóképek assetenként, amíg a keret pontosan jó (~30 kredit összesen)
2. **B.** A nyertes kockák 4K-ban, start frame-nek (~32 kredit)
3. **C. Hero bake-off** — a fő hero start frame-je három modellen, döntés a győztesről (215 kredit)
4. **D–G.** A maradék asset a győztes modellel; seam, sting, 9:16 sablonok Kling pro-val
5. **Utómunka:** `loopify.sh` → `encode-video.sh` → `public/video/rendezveny/` + poster
6. `MotionBackdrop` bekötése a hero-kba, seam-effektek, `CustomCursor`

**Elfogadási kritérium:** minden hero videó a 7.4 méretkorláton belül; `prefers-reduced-motion` bekapcsolva **egyetlen** videó sem tölt le (Network fül); a Lighthouse perf nem esett 90 alá; a `balance` szerint **maradt legalább 150 kredit** tartalékban.

### Fázis 9 — SEO
- Minden oldal metadata + OG képek
- JSON-LD minden típusra
- `sitemap.js` bővítés, `llms.txt` bővítés
- Kereszthivatkozások (10.5) mindkét irányban

**Elfogadási kritérium:** a `/sitemap.xml` tartalmazza az összes új URL-t; a Rich Results Test hibátlan a kategória- és esettanulmány-oldalakon.

### Fázis 10 — QA és élesítés
- 13. fejezet szerinti teljes checklist
- Netlify deploy preview, majd élesítés
- Google Search Console: sitemap újraküldése, a `/rendezveny` indexelés kérése

---

## 13. QA checklist (élesítés előtt)

**Regresszió a meglévő oldalon**
- [ ] `/`, `/portfolio`, `/about`, `/contact`, `/velemenyek`, `/velemeny-iras`, `/szolgaltatasok/eskuvo` és mind az 5 dinamikus szolgáltatás változatlan
- [ ] `/galeria/[id]` bejelentkezés és válogatás működik
- [ ] `/admin/*` továbbra is basic authot kér
- [ ] `/adatvedelem`, `/aszf`, `/thank-you` rendben
- [ ] A meglévő kapcsolati űrlap küld

**Új oldal**
- [ ] Mind a 12+ URL 200-as választ ad, ismeretlen slug 404
- [ ] Mobil (375 px), tablet (768 px), desktop (1440 px), széles (1920 px)
- [ ] Nincs vízszintes görgetés egyetlen töréspontnál sem
- [ ] Safari iOS: videó autoplay működik (`muted` + `playsInline`), a `backdrop-filter` nem törik
- [ ] Billentyűzetes bejárás minden oldalon, látható fókusz
- [ ] `prefers-reduced-motion` bekapcsolva minden olvasható és nem tölt videót
- [ ] Lightbox: nyílik, zár, nyilazható, `Esc`
- [ ] Űrlap: validáció, hibaüzenetek, sikeres küldés, Supabase sor, 2 e-mail
- [ ] A visszaigazoló levél **a beérkezőbe** érkezik Gmailben és Freemailen is (ne spambe)
- [ ] A levélre adott válasz a `kapcsolat@kovacsbalintfoto.hu` fiókba fut be (Reply-To)
- [ ] A meglévő kapcsolati űrlap és a galéria-értesítő továbbra is küld (EmailJS érintetlen)
- [ ] 404-oldal a `/rendezveny` alatt is a sötét arculatot kapja (`app/rendezveny/not-found.js`)

**Teljesítmény és SEO**
- [ ] Lighthouse mobil ≥ 90 perf, ≥ 95 a11y minden fő oldalon
- [ ] Egyik oldal sem tölt 2,5 MB-nál többet az első nézetben
- [ ] `check-media-budget.mjs` zölden fut (kép ≤ 250 KB, `images/rendezveny/` ≤ 70 MB, `video/rendezveny/` ≤ 12 MB)
- [ ] A `.git` növekménye a Fázis 2 után nem több ~55 MB-nál (`git count-objects -vH`)
- [ ] Minden oldalnak egyedi title + description + canonical
- [ ] OG kép minden oldalon (Facebook Sharing Debugger + LinkedIn Post Inspector)
- [ ] `sitemap.xml` és `llms.txt` frissült
- [ ] Rich Results Test hibátlan

---

## 14. Kockázatok és buktatók

| # | Kockázat | Valószínűség | Kezelés |
|---|---|---|---|
| R1 | A route group refaktor eltör valamit a meglévő oldalon | alacsony (csak 3 import érintett) | külön branch, fázisonkénti commit, Fázis 0 elfogadási kritérium; tartalék terv a 6.1-ben |
| R2 | Higgsfield-videók nem loopolnak zökkenőmentesen | **magas** | `loopify.sh` keresztúsztatás; sötét, absztrakt, lassú tartalom választása, ahol a vágás láthatatlan |
| R3 | ~~Cloudinary sávszélesség-túllépés~~ | **kiesett** | A rendezvényes oldal nem használ Cloudinaryt (7. fejezet). Netlify: 100 GB/hó ingyenes keret, a `MotionBackdrop` korlátai miatt a tényleges fogyasztás ennek töredéke. |
| R3b | Higgsfield kredit-keret elfogy a hónap közepén | közepes | `get_cost` **minden** generálás előtt; kép-először munkafolyamat (8.2); a 8.4 költségvetés ~200 kredit tartalékkal számol; „három próba után újratervezünk” szabály |
| R4 | Resend DNS-verifikáció csúszik vagy nincs hozzáférés a DNS-hez | közepes | 9.3 tartalék terv: a lead Supabase-be megy, az admin nézetben látod. Nem blokkolja a Fázis 7-et. Indítsd a domain-felvételt a Fázis 6 elején. |
| R4b | SPF-ütközés a meglévő levelezéssel | **alacsony, de súlyos lenne** | Kizárólag **aldomain** (`send.kovacsbalintfoto.hu`), a gyökér MX/SPF rekordokhoz nem nyúlunk (9.3) |
| R5 | Netlify Node-verzió váltás eltöri a buildet | alacsony, de fájdalmas | `NODE_VERSION = "22"` + `.nvmrc` a Fázis 0-ban |
| R6 | A repó mérete tovább nő (már 1,9 GB a `.git`) | közepes | `check-media-budget.mjs` **build-time őr** (250 KB/kép, 70 MB összesen, 12 MB videó) + `.gitignore` védősor a nyers kiterjesztésekre + szabály: eredeti fájl soha nem megy be. Várható növekmény: **egyszeri ~50 MB** (7.1). |
| R7 | Sok mozgás → gyenge mobil teljesítmény | közepes | `MotionBackdrop` beépített korlátai + 11.1 költségvetés + fázisonkénti Lighthouse mérés |
| R8 | Tartalomhiány (nincs elég válogatott anyag) | **magas** — ez a leggyakoribb csúszások oka | 15. fejezet: a tartalomgyűjtés a Fázis 2-vel párhuzamosan, nem utána |
| R9 | Kategória-slug ütközik statikus szegmenssel | alacsony | tiltólista: `video`, `csomagok`, `munkaim`, `rolam`, `ajanlatkeres`, `koszonjuk` |
| R10 | Service-role kulcs kliensre szivárog | alacsony, de súlyos | `import 'server-only'` a `lib/supabaseAdmin.js` tetején → build-time hiba |

---

## 15. Amit tőled kérek (tartalom-input)

Ez a terv legfontosabb gyakorlati része: enélkül a legjobb kód is üres marad. Érdemes a Fázis 0–1 alatt elkezdeni gyűjteni.

### 15.1 Képek — prioritás szerint

| Mit | Mennyit | Megjegyzés |
|---|---|---|
| Kategóriánkénti válogatás | 25–40 kép × 4 kategória | a **legjobbak**, nem az összes; stílusban egységes |
| Esettanulmány-galériák | 12–20 kép × 8–12 eset | eseményenként külön mappa |
| Hero képek | 1 db / kategória + 1 hub | fekvő, sötét, van benne hely a szövegnek |
| Portré rólad munka közben | 1–2 db | a `/rolam` oldalra |
| Behind the scenes | 3–5 db | opcionális, de nagyon jól működik |

**Hogyan add át:** egyszerűen másold a válogatásokat egy mappába kategóriánként/eseményenként, **nyers minőségben** (ahogy exportálod). Ne foglalkozz a mérettel vagy a formátummal — a `prep-event-images.mjs` átméretezi, WebP-be konvertálja és a keretbe szorítja mindet. Az eredetik a repón kívül maradnak.

### 15.2 Adatok esettanulmányonként

Egy egyszerű táblázat is elég (Google Sheets), oszlopok: `esemény neve · dátum · helyszín · megrendelő (nyilvános-e?) · résztvevők száma · mit csináltam (fotó/videó/social) · átadott képek száma · átfutási idő · 2 mondat a feladatról · 2 mondat az eredményről`.

### 15.3 Referencialista

Ugyanaz a táblázat, csak minimum adattal: `esemény · év · helyszín · típus`. Ide **minden** mehet, amit fotóztál. Minél hosszabb, annál meggyőzőbb.

### 15.4 Egyéb

- [ ] 3–5 **ügyfélvélemény** névvel és szervezettel (kérd el e-mailben, egy mondat is elég)
- [ ] **Logóhasználati engedély** — kiírhatod-e a cégek/egyetemek nevét és logóját? (Ha nem: „egy hazai gyógyszeripari konferencia" típusú megfogalmazás is működik)
- [ ] **Árak** — csomagonként és à la carte; ha nem akarsz konkrétumot, akkor „-tól" árak
- [ ] **Határidő-vállalások** — mennyi idő alatt adsz át? Ez erős konverziós érv, ha konkrét
- [ ] **Videó anyagok** — 1 showreel, 2–3 aftermovie, 1 VSL példa (YouTube unlisted feltöltésre)
- [ ] **Felszerelés-lista** a `/rolam` oldalra
- [ ] **Jogi**: számlaképesség, felelősségbiztosítás, felhasználási jogok szövege
- [ ] **DNS hozzáférés** a `kovacsbalintfoto.hu` domainhez (a Resend 3 rekordjához) — hol vezeted a domaint? Ha nem szeretnél hozzáférést adni, elég, ha felveszed a rekordokat, amiket megadok

### 15.5 Döntések, amiket kérlek erősíts meg

| # | Kérdés | Javaslatom |
|---|---|---|
| D1 | ~~Akcentszín~~ | **Eldöntve, átdolgozva:** nincs erős narancs. Világos papír-alap + mély indigó `#2E2A6B` a műveletekre + **hat kategória-pasztell a fotóidból mintázva** (4.2). |
| D2 | Display font | **Schibsted Grotesk** — modern, meleg, professzionális, nem túlhasznált. Alternatíva: `Familjen Grotesk` (karakteresebb) vagy `Outfit` (geometrikusabb). **Playfair Display és Poppins szándékosan kizárva** — ezek a legfelismerhetőbb AI-klisék. |
| D3 | Hub headline | **„A rendezvényed nem ér véget a záró tapssal."** |
| D4 | ~~Ötödik kategória~~ | **Eldöntve: hat kategória** — a sport és a kultúra/koncert is önálló oldalt kap (3.1). |
| D5 | Árak megjelenítése | **Igen, „-tól" árakkal.** Kiszűri a nem valós érdeklődőt |
| D6 | Hosszú videók | **YouTube unlisted + facade** az 1. fázisban (ingyenes). Bunny Streamre bármikor válthatunk |
| D7 | Admin lead-nézet | **Építsük meg a Fázis 7-ben** — ez egyben a Resend tartalék terve is |
| D8 | E-mail: Resend | **Igen, váltsunk** (9.3). Amit hozzá kérek: hozzáférés a domain DNS-beállításaihoz. A meglévő postafiókodhoz nem nyúlunk. |
| D9 | Régi űrlapok migrálása | Külön feladat a rendezvényes oldal után — nem keverjük ide |
| D10 | ~~Médiatár~~ | **Eldöntve:** nincs Cloudinary a rendezvényes oldalon. Minden a repóból, Netlify CDN-ről (7. fejezet). A `lib/cloudinary.js` és a galéria érintetlen. |
| D11 | ~~Higgsfield stratégia~~ | **Eldöntve:** kép-először munkafolyamat + négyjelöltes hero bake-off. Az új asset-mix miatt ~410–690 kredit elég, marad ~310–590 tartalék (8.5). |
| D12 | ~~Hero tartalma~~ | **Eldöntve:** teljesen generált, görgetés-vezérelt absztrakt animáció. Se saját fotó, se saját videó nem kerül a hero-ba (5.1.1). |
| D13 | Pannon-mappa besorolása | **Erősítsd meg:** a `Foci`, `Fozes`, `Kutyusok` tényleg egyetemi/Pannon-os események? Ha nem, a besorolás egy sor az adatfájlban (3.1). |
| D14 | Hiányzó képanyag | A **Kultúra** (5 kép) és a **Konferencia** (12 kép) galéria szűkös. Van még anyagod ezekhez? A konferencia a legértékesebb szegmens, oda éri meg legelőször pótolni. |

---

## 16. Későbbi bővítések (nem az első körben)

- **Rendezvény-galéria átadás** — a meglévő `pages/galeria/[galleryId]` jelszavas rendszer kiterjeszthető rendezvényekre, akár nyilvános, letölthető galériaként résztvevőknek (ez erős értékesítési érv egyetemi rendezvényeknél)
- **Automatikus árkalkulátor** — a briefből azonnali becsült ártartomány
- **Naptár / foglaltság** — mely napok foglaltak
- **Analitika** — Plausible vagy GA4 + konverziókövetés a köszönjük oldalon
- **Angol nyelvű változat** — nemzetközi konferenciákhoz (`/en/events`)
- **Blog / tudástár** — *„Mit kérdezz meg a rendezvényfotósodtól?"* típusú tartalom SEO-ra
- **Ügyfélportál** — státusz, letöltés, számla
- **Resend webhookok** — kézbesítve / bounce / spam-panasz visszaírása a leadhez, hogy lásd, ha egy visszaigazoló nem ért célba
- **EmailJS teljes kivezetése** — a `Contact.js` és a `ClientGallery.jsx` átállítása Resendre (9.3, 2. lépés)

---

## Függelék A — Konkrét fájlváltoztatások a Fázis 0-ban

```
TÖRLÉS
  tailwind.config.mjs
  postcss.config.mjs

ÚJ
  .nvmrc                          → "22"
  app/(foto)/layout.js

TELEPÍTÉS
  npm i -D sharp                  → az optimize-images.mjs és az új képscriptek függősége (L12)

MÓDOSÍTÁS
  netlify.toml                    → [build.environment] NODE_VERSION = "22"
  app/layout.js                   → chrome eltávolítása, fontok latin-ext-tel
  lib/supabaseClient.js           → console.log-ok törlése
  .gitignore                      → védősor: *.CR2 *.NEF *.ARW *.dng *.psd *.tif *.tiff
                                    (nyers fájl soha nem kerülhet a repóba)

ÁTHELYEZÉS (git mv, tartalom változatlan)
  app/page.js            → app/(foto)/page.js
  app/about/             → app/(foto)/about/
  app/admin/             → app/(foto)/admin/
  app/contact/           → app/(foto)/contact/
  app/elszamolas/        → app/(foto)/elszamolas/
  app/mini-fotozasok/    → app/(foto)/mini-fotozasok/
  app/portfolio/         → app/(foto)/portfolio/
  app/szolgaltatasok/    → app/(foto)/szolgaltatasok/
  app/velemenyek/        → app/(foto)/velemenyek/
  app/velemeny-iras/     → app/(foto)/velemeny-iras/

HELYBEN MARAD
  app/globals.css, app/favicon.ico, app/robots.js, app/sitemap.js
  pages/**, components/**, constants/**, lib/**, middleware.js
```

## Függelék B — Tailwind token-kiegészítés

```js
// tailwind.config.js — theme.extend
colors: {
  ev: {
    bg:       '#FAFAF8',
    surface:  '#FFFFFF',
    sunk:     '#F2F1EE',
    line:     'rgba(25,23,35,0.10)',
    line2:    'rgba(25,23,35,0.20)',
    ink:      '#191723',
    ink2:     '#5A5568',
    ink3:     '#8B8698',
    brand:    '#2E2A6B',
    brandSoft:'#EBEAF5',
    // kategória-spektrum (4.2)
    konferencia:  { soft: '#C6CEF7', deep: '#3B4BB8' },
    egyetemi:     { soft: '#C2E4D3', deep: '#2C7A5B' },
    offroad:      { soft: '#F0DCB6', deep: '#96681C' },
    sport:        { soft: '#C2DEF0', deep: '#236D95' },
    kultura:      { soft: '#DFC8EE', deep: '#79489C' },
    maganunnep:   { soft: '#F5CDD9', deep: '#B24870' },
  },
},
fontFamily: {
  evDisplay: ['var(--font-schibsted)', 'sans-serif'],
  evBody:    ['var(--font-geist-sans)', 'sans-serif'],
  evMono:    ['var(--font-geist-mono)', 'monospace'],
},
transitionTimingFunction: {
  'ev-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
  'ev-in':  'cubic-bezier(0.7, 0, 0.84, 0)',
},
maxWidth: { 'ev': '1440px' },
```

---

**A terv kész. A következő lépés: erősítsd meg a 15.5 döntéseket, és indulhat a Fázis 0.**
