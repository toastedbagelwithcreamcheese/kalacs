// pages/impresszum.js
import Head from "next/head";
import LegalPageLayout from "@/components/LegalPageLayout";
import {
  szolgaltato,
  tarhelyszolgaltato,
  bekeltetoTestulet,
  hatalyosDatum,
} from "@/constants/legal";

const ImpresszumPage = () => {
  return (
    <>
      <Head>
        <title>Impresszum | Kovács Bálint Fotó</title>
        <meta
          name="description"
          content="A kovacsbalintfoto.hu weboldal üzemeltetőjének, a szolgáltatónak és a tárhelyszolgáltatónak az adatai."
        />
        <link rel="canonical" href="https://kovacsbalintfoto.hu/impresszum" />
      </Head>
      <LegalPageLayout title="Impresszum" effectiveDate={hatalyosDatum}>
        <p>
          A jelen impresszum az elektronikus kereskedelmi szolgáltatásokról szóló 2001. évi
          CVIII. törvény 4. §-a alapján tartalmazza a szolgáltató adatait.
        </p>

        <h2>1. A szolgáltató adatai</h2>
        <ul>
          <li><strong>Név:</strong> {szolgaltato.nev}</li>
          <li><strong>Vállalkozási forma:</strong> {szolgaltato.forma}</li>
          <li><strong>Székhely:</strong> {szolgaltato.szekhely}</li>
          <li>
            <strong>{szolgaltato.nyilvantartasiSzamMegnevezes}:</strong>{" "}
            {szolgaltato.nyilvantartasiSzam}
          </li>
          <li><strong>Adószám:</strong> {szolgaltato.adoszam}</li>
          <li><strong>Adózási státusz:</strong> {szolgaltato.afaStatusz}</li>
          <li><strong>E-mail:</strong> {szolgaltato.email}</li>
          <li><strong>Telefonszám:</strong> {szolgaltato.telefon}</li>
          <li><strong>Weboldal:</strong> {szolgaltato.weboldal}</li>
        </ul>
        <p>
          A szolgáltatás <strong>{szolgaltato.markanev}</strong> néven jelenik meg. A weboldalon
          látható fotókat <strong>{szolgaltato.szerzo}</strong> készíti; a szerződés és a
          számlázás a fent megnevezett szolgáltatóval jön létre.
        </p>

        <h2>2. Tárhelyszolgáltató</h2>
        <ul>
          <li><strong>Név:</strong> {tarhelyszolgaltato.nev}</li>
          <li><strong>Székhely:</strong> {tarhelyszolgaltato.szekhely}</li>
          <li><strong>Weboldal:</strong> {tarhelyszolgaltato.weboldal}</li>
        </ul>

        <h2>3. Adatbázis- és képtárolás</h2>
        <ul>
          <li>
            <strong>Adatbázis:</strong> Supabase, Inc. — ügyfélgaléria-rendszer és a rendezvényes
            ajánlatkérések adatai, EU-s régió
          </li>
          <li>
            <strong>Képtárolás:</strong> Cloudinary, Inc. — az ügyfélgaléria fotóinak tárolása
          </li>
        </ul>

        <h2>4. Panaszkezelés, fogyasztói jogviták</h2>
        <p>
          Panaszát a fenti e-mail címen vagy telefonszámon jelezheti. A panaszt a beérkezéstől
          számított 30 napon belül kivizsgálom és írásban megválaszolom.
        </p>
        <p>
          Ha a panasz kezelésével nem ért egyet, fogyasztóként a lakóhelye vagy tartózkodási helye
          szerinti békéltető testülethez fordulhat. A szolgáltató székhelye szerint illetékes
          testület:
        </p>
        <ul>
          <li><strong>Név:</strong> {bekeltetoTestulet.nev}</li>
          <li><strong>Cím:</strong> {bekeltetoTestulet.cim}</li>
          <li><strong>Telefon:</strong> {bekeltetoTestulet.telefon}</li>
          <li><strong>E-mail:</strong> {bekeltetoTestulet.email}</li>
          <li><strong>Weboldal:</strong> {bekeltetoTestulet.weboldal}</li>
        </ul>
        <p>{bekeltetoTestulet.megjegyzes}</p>
        <p>
          Fogyasztóvédelmi eljárást a lakóhelye szerint illetékes fővárosi vagy vármegyei
          kormányhivatalnál kezdeményezhet.
        </p>

        <h2>5. Jogi dokumentumok</h2>
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
