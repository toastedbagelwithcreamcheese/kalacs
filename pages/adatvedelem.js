// pages/adatvedelem.js
import Head from "next/head";
import LegalPageLayout from "@/components/LegalPageLayout";
import { szolgaltato, naih, hatalyosDatum } from "@/constants/legal";
import Link from "next/link";

const AdatvedelemPage = () => {
  return (
    <>
      <Head>
        <title>Adatvédelmi Irányelvek | Kovács Bálint Fotó</title>
        <meta name="description" content="Kovács Bálint Fotográfia adatvédelmi tájékoztatója a GDPR alapján: kezelt adatok köre, célja, jogalapja és az adatfeldolgozók listája." />
        <link rel="canonical" href="https://kovacsbalintfoto.hu/adatvedelem" />
      </Head>
      <LegalPageLayout title="Adatvédelmi Irányelvek" effectiveDate={hatalyosDatum}>
      <p>Jelen Adatvédelmi Irányelvek célja, hogy tájékoztatást nyújtson a kovacsbalintfoto.hu weboldal által végzett adatkezelési gyakorlatokról, az Európai Parlament és a Tanács (EU) 2016/679 rendelete (GDPR) alapján.</p>
      
      <h2>1. Az Adatkezelő Adatai</h2>
      <p>Az adatok kezelője megegyezik az ÁSZF-ben megjelölt Szolgáltatóval.</p>
      <ul>
        <li><strong>Név:</strong> {szolgaltato.nev}</li>
        <li><strong>Vállalkozási forma:</strong> {szolgaltato.forma}</li>
        <li><strong>Székhely:</strong> {szolgaltato.szekhely}</li>
        <li>
          <strong>{szolgaltato.nyilvantartasiSzamMegnevezes}:</strong>{" "}
          {szolgaltato.nyilvantartasiSzam}
        </li>
        <li><strong>Adószám:</strong> {szolgaltato.adoszam}</li>
        <li><strong>E-mail cím:</strong> {szolgaltato.email}</li>
        <li><strong>Telefonszám:</strong> {szolgaltato.telefon}</li>
      </ul>
      <p>
        A szolgáltatás {szolgaltato.markanev} néven jelenik meg; a fotókat{" "}
        {szolgaltato.szerzo} készíti. Adatvédelmi tisztviselő kijelölésére az adatkezelés
        jellege és terjedelme alapján nem kerül sor.
      </p>

      <h2>2. A Kezelt Személyes Adatok Köre, Célja és Jogalapja</h2>
      <p>A Szolgáltatásaim igénybevételéhez kapcsolódóan az alábbi személyes adatokat kezelem:</p>
      
      <h3>2.1. Kapcsolatfelvétel során megadott adatok</h3>
      <ul>
        <li><strong>Kezelt adatok:</strong> Név, e-mail cím, telefonszám (ha megadásra kerül), az üzenet tartalma.</li>
        <li><strong>Az adatkezelés célja:</strong> Kapcsolatfelvétel, ajánlatadás, a megrendeléssel kapcsolatos kommunikáció.</li>
        <li><strong>Az adatkezelés jogalapja:</strong> Az Ön hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont), valamint a szerződéskötést megelőző lépések megtétele (GDPR 6. cikk (1) bekezdés b) pont).</li>
      </ul>

      <h3>2.2. Ügyfélgaléria Rendszerhez kapcsolódó adatok</h3>
      <ul>
        <li><strong>Kezelt adatok:</strong> Az Ügyfél e-mail címe.</li>
        <li><strong>Az adatkezelés célja:</strong> Az Ügyfél számára egyedi, jelszóval védett hozzáférés biztosítása a fotózáson készült nyers képeket tartalmazó online galériához, ahol az Ügyfél elvégezheti a retusálásra szánt képek kiválasztását.</li>
        <li><strong>Az adatkezelés jogalapja:</strong> A szerződés teljesítése (GDPR 6. cikk (1) bekezdés b) pont), mivel ez a folyamat a megrendelt szolgáltatás elengedhetetlen része.</li>
      </ul>
      <p><strong>Kijelentem, hogy az Ügyfeleim e-mail címén kívül más személyes adatot a válogató galéria rendszerben nem tárolok, és az e-mail címet kizárólag a galériához való hozzáférés és a kapcsolódó kommunikáció céljából használom.</strong></p>

      <h3>2.3. Rendezvényes ajánlatkérő űrlap</h3>
      <ul>
        <li><strong>Kezelt adatok:</strong> Név, e-mail cím, telefonszám (opcionális), szervezet vagy cég neve (opcionális), valamint a rendezvényre vonatkozó adatok: a rendezvény típusa, kért szolgáltatások, tervezett időpont, helyszín, várható létszám, időtartam, kért átadási határidő, költségkeret-sáv, az üzenet szövege, és az az információ, hogy Ön honnan hallott rólam. Rögzítem továbbá annak az oldalnak a címét, ahonnan az űrlapot elküldte.</li>
        <li><strong>Az adatkezelés célja:</strong> A megkeresés megválaszolása, egyedi árajánlat készítése, és a megrendeléssel kapcsolatos kommunikáció.</li>
        <li><strong>Az adatkezelés jogalapja:</strong> Az Ön kifejezett hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont), amelyet az űrlap elküldése előtti jelölőnégyzet bejelölésével ad meg, valamint a szerződéskötést megelőző lépések megtétele (GDPR 6. cikk (1) bekezdés b) pont).</li>
        <li><strong>Az adatkezelés időtartama:</strong> A megkeresés adatait <strong>24 hónapig</strong> őrzöm meg, ezt követően törlöm. Ha a megkeresésből megrendelés lesz, az adatokra a 3. pontban írt általános időtartam vonatkozik.</li>
        <li><strong>Az adatok tárolási helye:</strong> Supabase, EU-s régió.</li>
      </ul>
      <p><strong>Az űrlapon megadott adatokat kizárólag a megkeresés megválaszolására használom. Nem adom tovább harmadik félnek, nem használom hírlevélküldésre, és nem készítek belőlük profilt. IP-címet nem tárolok.</strong></p>

      <h2>3. Az Adatkezelés Időtartama</h2>
      <p>A személyes adatokat a szerződéses kapcsolat fennállásáig, valamint a számviteli és jogi kötelezettségek teljesítéséhez szükséges ideig (jellemzően a szerződés megszűnését követő 5-8 évig) kezelem. A hozzájáruláson alapuló adatkezelés esetén az adatokat a hozzájárulás visszavonásáig kezelem.</p>

      <h2>4. Adatfeldolgozók</h2>
      <p>A Szolgáltatásaim nyújtásához az alábbi adatfeldolgozókat veszem igénybe:</p>
      <ul>
        <li><strong>Tárhelyszolgáltató:</strong> Netlify, Inc. (A weboldal hosztolása)</li>
        <li><strong>Adatbázis-szolgáltató:</strong> Supabase, Inc. (Az ügyfélgaléria rendszer és a rendezvényes ajánlatkérések adatainak tárolása, EU-s régió)</li>
        <li><strong>Képtárolás:</strong> Cloudinary, Inc. (Az ügyfélgaléria fotóinak tárolása)</li>
        <li><strong>Email-küldő szolgáltató:</strong> EmailJS (A fotós oldal automatikus e-mailjei)</li>
        <li><strong>Email-küldő szolgáltató:</strong> Resend, Inc. (A rendezvényes ajánlatkérő automatikus e-mailjei)</li>
      </ul>

      <h2>5. Az Ön Jogai</h2>
      <p>Ön bármikor jogosult tájékoztatást kérni személyes adatai kezeléséről, kérheti azok helyesbítését, törlését vagy kezelésének korlátozását, valamint tiltakozhat az adatkezelés ellen. Ezen jogait az 1. pontban megadott elérhetőségeken gyakorolhatja.</p>

      <h2>6. Jogorvoslati Lehetőségek</h2>
      <p>
        Kérésével elsősorban forduljon hozzám az 1. pontban megadott elérhetőségeken: a
        megkeresést legkésőbb egy hónapon belül megválaszolom.
      </p>
      <p>
        Ha úgy véli, hogy az adatkezelésem nem felel meg a jogszabályi előírásoknak, panasszal
        élhet a felügyeleti hatóságnál:
      </p>
      <ul>
        <li><strong>Név:</strong> {naih.nev}</li>
        <li><strong>Cím:</strong> {naih.cim}</li>
        <li><strong>Postacím:</strong> {naih.postacim}</li>
        <li><strong>Telefon:</strong> {naih.telefon}</li>
        <li><strong>E-mail:</strong> {naih.email}</li>
        <li><strong>Weboldal:</strong> {naih.weboldal}</li>
      </ul>
      <p>
        Jogainak megsértése esetén bírósághoz is fordulhat. A per — választása szerint — a
        lakóhelye vagy tartózkodási helye szerinti törvényszék előtt is megindítható.
      </p>
      </LegalPageLayout>
    </>
  );
};

export default AdatvedelemPage;