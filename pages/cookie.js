// pages/cookie.js
import Head from "next/head";
import LegalPageLayout from "@/components/LegalPageLayout";

const CookiePage = () => {
  return (
    <>
      <Head>
        <title>Cookie Szabályzat | Kovács Bálint Fotó</title>
        <meta name="description" content="Tájékoztató a kovacsbalintfoto.hu weboldalon használt sütikről." />
        <link rel="canonical" href="https://kovacsbalintfoto.hu/cookie" />
      </Head>
      <LegalPageLayout title="Cookie Szabályzat">
        <p>
          A kovacsbalintfoto.hu weboldal jelenleg <strong>kizárólag egyetlen, technikailag
          elengedhetetlen sütit</strong> használ — statisztikai, hirdetési vagy remarketing célú
          süti (pl. Google Analytics, Meta Pixel) az oldalon nem fut, ezért ehhez cookie-elfogadó
          sávra sincs szükség.
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
          A weboldal jelen dokumentum közzétételekor <strong>nem használ</strong> statisztikai
          (pl. Google Analytics) vagy marketing/remarketing (pl. Meta Pixel, Google Ads) sütiket.
          Ha ez a jövőben változik, a jelen Cookie Szabályzat frissül, és a weboldalon
          cookie-elfogadó sáv jelenik meg a hozzájárulás bekéréséhez.
        </p>

        <h2>4. Sütik kezelése, letiltása</h2>
        <p>
          A <code>gallery-auth</code> süti a böngésző beállításain keresztül bármikor törölhető —
          ez azzal jár, hogy az adott galériába újra be kell jelentkezni a jelszóval.
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
