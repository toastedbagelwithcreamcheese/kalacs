// pages/impresszum.js
import Head from "next/head";
import LegalPageLayout from "@/components/LegalPageLayout";
import LegalPlaceholder from "@/components/LegalPlaceholder";

const ImpresszumPage = () => {
  return (
    <>
      <Head>
        <title>Impresszum | Kovács Bálint Fotó</title>
        <meta name="description" content="A kovacsbalintfoto.hu weboldal üzemeltetőjének és tárhelyszolgáltatójának adatai." />
        <link rel="canonical" href="https://kovacsbalintfoto.hu/impresszum" />
      </Head>
      <LegalPageLayout title="Impresszum">
        <h2>Szolgáltató adatai</h2>
        <ul>
          <li><strong>Név:</strong> Kovács Bálint</li>
          <li><strong>Vállalkozási forma:</strong> <LegalPlaceholder>kitöltendő</LegalPlaceholder></li>
          <li><strong>Székhely:</strong> Zalaszentiván, <LegalPlaceholder>pontos cím kitöltendő</LegalPlaceholder></li>
          <li><strong>Nyilvántartási szám:</strong> <LegalPlaceholder>kitöltendő</LegalPlaceholder></li>
          <li><strong>Adószám:</strong> <LegalPlaceholder>kitöltendő</LegalPlaceholder></li>
          <li><strong>E-mail:</strong> kapcsolat@kovacsbalintfoto.hu</li>
          <li><strong>Telefonszám:</strong> +36 30 872 3777</li>
          <li><strong>Weboldal:</strong> kovacsbalintfoto.hu</li>
        </ul>

        <h2>Tárhelyszolgáltató</h2>
        <ul>
          <li><strong>Név:</strong> Netlify, Inc.</li>
          <li><strong>Székhely:</strong> 512 2nd Street, Suite 200, San Francisco, CA 94107, USA</li>
          <li><strong>Weboldal:</strong> netlify.com</li>
        </ul>

        <h2>Adatbázis- és képtárolás</h2>
        <ul>
          <li><strong>Adatbázis:</strong> Supabase, Inc. — ügyfélgaléria-rendszer és a rendezvényes ajánlatkérések adatai, EU-s régió</li>
          <li><strong>Képtárolás:</strong> Cloudinary, Inc. — az ügyfélgaléria fotóinak tárolása</li>
        </ul>

        <h2>Jogi dokumentumok</h2>
        <ul>
          <li><a href="/aszf">Általános Szerződési Feltételek</a></li>
          <li><a href="/adatvedelem">Adatvédelmi Irányelvek</a></li>
          <li><a href="/cookie">Cookie Szabályzat</a></li>
        </ul>
      </LegalPageLayout>
    </>
  );
};

export default ImpresszumPage;
