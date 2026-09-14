// pages/cookie.js
import Head from "next/head";
import LegalPageLayout from "@/components/LegalPageLayout";
import { cookieHatalyosDatum } from "@/constants/legal";

const CookiePage = () => {
  return (
    <>
      <Head>
        <title>Cookie Szabályzat | Kovács Bálint Fotó</title>
        <meta name="description" content="Tájékoztató a kovacsbalintfoto.hu weboldalon használt sütikről." />
        <link rel="canonical" href="https://kovacsbalintfoto.hu/cookie" />
      </Head>
      <LegalPageLayout title="Cookie Szabályzat" effectiveDate={cookieHatalyosDatum}>
        <p>
          A kovacsbalintfoto.hu weboldal egy <strong>technikailag elengedhetetlen</strong> sütit,
          valamint — <strong>kizárólag az Ön hozzájárulása esetén</strong> — látogatottság-mérési
          sütiket használ. Hirdetési és remarketing süti (pl. Meta Pixel, Google Ads) az oldalon
          nem fut. A mérésről az oldal alján megjelenő sávon dönthet; a döntés bármikor
          megváltoztatható a böngésző tárolt adatainak törlésével.
        </p>

        <h2>1. Mi az a süti (cookie)?</h2>
        <p>A sütik kis szöveges fájlok, amelyeket a weboldal a látogató böngészőjében tárol, hogy megjegyezze a beállításokat és javítsa a felhasználói élményt.</p>

        <h2>2. Az általunk használt süti</h2>
        <table>
          <thead>
            <tr><th>Név</th><th>Cél</th><th>Jogalap</th><th>Lejárat</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>gallery-auth-&#123;galériaAzonosító&#125;</code></td>
              <td>Bejelentkezés fenntartása a jelszóval védett ügyfélgalériákhoz — enélkül minden oldalbetöltésnél újra be kellene lépni a galéria jelszavával.</td>
              <td>Szerződés teljesítése / a szolgáltatás igénybevételéhez elengedhetetlen (GDPR 6. cikk (1) b), ePrivacy 5. cikk (3) — technikailag szükséges süti, elfogadás nélkül is beállítható)</td>
              <td>24 óra</td>
            </tr>
            <tr>
              <td><code>_ga</code>, <code>_ga_MQFN0PVM0E</code></td>
              <td>Google Analytics 4: megkülönbözteti az egyes látogatókat és munkameneteket, hogy
              összesített látogatottsági statisztika készülhessen (hány látogató, mely oldalak,
              milyen forrásból). Egyéni azonosítására nem használjuk.</td>
              <td>Hozzájárulás (GDPR 6. cikk (1) a), ePrivacy 5. cikk (3) — <strong>csak elfogadás
              után</strong> kerül elhelyezésre)</td>
              <td>2 év</td>
            </tr>
          </tbody>
        </table>
        <p>
          A süti <code>httpOnly</code> és <code>SameSite=Strict</code> beállítással kerül
          elhelyezésre, tehát JavaScript-ből nem olvasható ki, és csak a kovacsbalintfoto.hu
          oldalról induló kéréseknél kerül elküldésre. A süti kizárólag azt jelzi, hogy a
          látogató korábban megadta az adott galéria jelszavát — más személyes adatot nem tárol.
        </p>

        <h2>3. Statisztikai és marketing sütik</h2>
        <p>
          A weboldal a <strong>Google Analytics 4</strong> szolgáltatást használja a látogatottság
          mérésére (üzemeltető: Google Ireland Limited). A mérés úgynevezett hozzájárulási módban
          (Consent Mode v2) fut: <strong>elutasítás esetén</strong> a Google süti és azonosító
          nélkül, névtelen jelzésekből számol összesített becslést — az Ön böngészőjében ilyenkor
          nem marad mérési süti. <strong>Elfogadás esetén</strong> a fenti táblázatban felsorolt két
          süti kerül elhelyezésre. Az IP-cím anonimizálva továbbítódik.
        </p>
        <p>
          Hirdetési és remarketing sütit (pl. Meta Pixel, Google Ads) a weboldal
          <strong>nem használ</strong>. Ha ez a jövőben változik, a jelen Cookie Szabályzat frissül,
          és a hozzájárulást külön kérjük be.
        </p>

        <h2>4. Sütik kezelése, letiltása</h2>
        <p>
          A <code>gallery-auth</code> süti a böngésző beállításain keresztül bármikor törölhető —
          ez azzal jár, hogy az adott galériába újra be kell jelentkezni a jelszóval. A mérésre adott
          hozzájárulása szintén a böngészőben tárolódik (<code>kbf-consent</code> néven, a böngésző
          helyi tárolójában); ennek törlésével a döntés visszavonható, és az oldal újra rákérdez.
        </p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/hu/kb/sutik-engedelyezese-es-tiltasa" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/hu-hu/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
          <li><a href="https://support.microsoft.com/hu-hu/microsoft-edge" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
        </ul>

        <h2>5. Kapcsolat</h2>
        <p>Kérdés esetén: kapcsolat@kovacsbalintfoto.hu</p>
        <p><em>Hatályos: 2026. augusztus 18.</em></p>
      </LegalPageLayout>
    </>
  );
};

export default CookiePage;
