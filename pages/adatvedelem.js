// pages/adatvedelem.js
import LegalPageLayout from "@/components/LegalPageLayout";
import Link from "next/link";

const AdatvedelemPage = () => {
  return (
    <LegalPageLayout title="Adatvédelmi Irányelvek">
      <p>Jelen Adatvédelmi Irányelvek célja, hogy tájékoztatást nyújtson a kovacsbalintfoto.hu weboldal által végzett adatkezelési gyakorlatokról, az Európai Parlament és a Tanács (EU) 2016/679 rendelete (GDPR) alapján.</p>
      
      <h2>1. Az Adatkezelő Adatai</h2>
      <p>Az adatok kezelője megegyezik az ÁSZF-ben megjelölt Szolgáltatóval.</p>
      <ul>
        <li><strong>Név:</strong> Kovács Bálint</li>
        <li><strong>E-mail cím:</strong> kapcsolat@kovacsbalintfoto.hu</li>
      </ul>

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

      <h2>3. Az Adatkezelés Időtartama</h2>
      <p>A személyes adatokat a szerződéses kapcsolat fennállásáig, valamint a számviteli és jogi kötelezettségek teljesítéséhez szükséges ideig (jellemzően a szerződés megszűnését követő 5-8 évig) kezelem. A hozzájáruláson alapuló adatkezelés esetén az adatokat a hozzájárulás visszavonásáig kezelem.</p>

      <h2>4. Adatfeldolgozók</h2>
      <p>A Szolgáltatásaim nyújtásához az alábbi adatfeldolgozókat veszem igénybe:</p>
      <ul>
        <li><strong>Tárhelyszolgáltató:</strong> Netlify, Inc. (A weboldal hosztolása)</li>
        <li><strong>Adatbázis-szolgáltató:</strong> Supabase, Inc. (Az ügyfélgaléria rendszer adatainak tárolása)</li>
        <li><strong>Képtárolás:</strong> Cloudinary, Inc. (A fotók tárolása)</li>
        <li><strong>Email-küldő szolgáltató:</strong> EmailJS (Automatikus emailek küldése)</li>
      </ul>

      <h2>5. Az Ön Jogai</h2>
      <p>Ön bármikor jogosult tájékoztatást kérni személyes adatai kezeléséről, kérheti azok helyesbítését, törlését vagy kezelésének korlátozását, valamint tiltakozhat az adatkezelés ellen. Ezen jogait az 1. pontban megadott elérhetőségeken gyakorolhatja.</p>

      <h2>6. Jogorvoslati Lehetőségek</h2>
      <p>Amennyiben úgy véli, hogy adatkezelésem nem felel meg a jogszabályi előírásoknak, panasszal élhet a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH).</p>
      <p><em>Hatályos: 2025. július 1.</em></p>
    </LegalPageLayout>
  );
};

export default AdatvedelemPage;