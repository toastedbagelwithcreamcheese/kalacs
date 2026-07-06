// pages/aszf.js
import Head from "next/head";
import LegalPageLayout from "@/components/LegalPageLayout";
import Link from "next/link";
import { motion } from "framer-motion";
import { Hourglass, ArrowLeft } from "lucide-react";

// --- VEZÉRLŐ KAPCSOLÓ ---
// Ha elkészültél a végleges szöveggel és a jogi ellenőrzéssel,
// egyszerűen csak írd át ezt az értéket `true`-ra!
const isAszfLive = false;

const ASZFPage = () => {
  // --- NÉZET 1: AMÍG AZ OLDAL NINCS KÉSZ ---
  // Ha a kapcsoló 'false', akkor ezt a nézetet mutatjuk a látogatóknak.
  if (!isAszfLive) {
    return (
      <>
        <Head>
          <title>Feltöltés alatt... | Kovács Bálint Fotó</title>
          <meta name="robots" content="noindex, follow" />
        </Head>
        <LegalPageLayout title="Feltöltés alatt...">
        <motion.div
          className="text-center py-10 sm:py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Hourglass
            className="mx-auto w-16 h-16 text-amber-500 mb-6"
            strokeWidth={1.5}
          />
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Ez az oldal jelenleg szerkesztés alatt áll.
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Hamarosan itt lesznek elérhetőek a részletes Általános Szerződési
            Feltételek. Köszönöm a türelmedet! Addig is, ha kérdésed van,
            keress bizalommal.
          </p>
          <Link href="/" legacyBehavior>
            <a className="inline-flex items-center bg-gray-800 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-md">
              <ArrowLeft size={20} className="mr-2" /> Vissza a Főoldalra
            </a>
          </Link>
        </motion.div>
        </LegalPageLayout>
      </>
    );
  }

  // --- NÉZET 2: A VÉGLEGES, ÉLES OLDAL ---
  // Ha az 'isAszfLive' értéke 'true', akkor ez a rész fog megjelenni.
  return (
    <>
      <Head>
        <title>Általános Szerződési Feltételek | Kovács Bálint Fotó</title>
        <meta name="description" content="Kovács Bálint Fotográfia Általános Szerződési Feltételei: időpontfoglalás, képek átadása, szerzői jogok, lemondási feltételek." />
        <link rel="canonical" href="https://kovacsbalintfoto.hu/aszf" />
      </Head>
      <LegalPageLayout title="Általános Szerződési Feltételek (ÁSZF)">
      {/* Itt van a te eredeti, teljes ÁSZF kódod, változatlanul. */}
      <h2>1. A Szolgáltató Adatai</h2>
      <ul>
        <li><strong>Név:</strong> Kovács Bálint</li>
        <li><strong>Vállalkozási forma:</strong> - </li>
        <li><strong>Székhely:</strong> Zalaszentiván</li>
        <li><strong>Nyilvántartási szám:</strong> [A Te Nyilvántartási Számod]</li>
        <li><strong>Adószám:</strong> [A Te Adószámod]</li>
        <li><strong>E-mail cím:</strong> [A Te Email Címed]</li>
        <li><strong>Telefonszám:</strong> +36 30 872 3777</li>
        <li><strong>Weboldal:</strong> https://kovacsbalintfoto.hu</li>
      </ul>

      <h2>2. A Szerződés Tárgya</h2>
      <p>Jelen ÁSZF a Szolgáltató által a Weboldalon kínált fotós szolgáltatások (továbbiakban: Szolgáltatás) igénybevételének feltételeit szabályozza. A Szolgáltatások részletes leírása és díjazása a Weboldal megfelelő aloldalain található.</p>

      <h2>3. Időpontfoglalás és Megrendelés</h2>
      <p>A Szolgáltatás megrendelése a Weboldalon található kapcsolatfelvételi űrlapon, e-mailben vagy telefonon keresztül történik. A megrendelés a Szolgáltató írásos visszaigazolásával, valamint – amennyiben a Szolgáltató előleget (foglalót) kér – annak megfizetésével válik véglegessé. Az előleg mértéke az egyedi ajánlatban kerül meghatározásra.</p>

      <h2>4. Képek Kiválasztása és Átadása</h2>
      <p>A fotózást követően a Szolgáltató egy jelszóval védett online galériához biztosít hozzáférést az Ügyfél számára. Az Ügyfél ezen a felületen keresztül tudja kiválasztani azokat a képeket, amelyeket retusálásra és végleges átadásra kér. A végleges, retusált digitális képek átadása szintén online, letöltési linken keresztül történik, az egyedi ajánlatban vagy a csomag leírásában szereplő határidőn belül.</p>

      <h2>5. Szerzői Jogok és Felhasználás</h2>
      <p>A fotózáson készült összes fotó szerzői joga a Szolgáltatót (Kovács Bálint) illeti. Az Ügyfél az átadott, retusált képekre vonatkozóan teljes körű, nem kizárólagos, időben korlátlan **magáncélú felhasználási jogot** szerez. Ez magában foglalja a képek közösségi médiában való megosztását (a Szolgáltató forrásként való megjelölésével), valamint a képek privát célú nyomtatását.</p>
      <p>A képek bármilyen üzleti, kereskedelmi vagy marketing célú felhasználása kizárólag a Szolgáltató előzetes írásos engedélyével lehetséges.</p>
      <p><strong>A Szolgáltató a fotózáson készült képeket saját portfóliójában (weboldal, közösségi média) kizárólag az Ügyfél előzetes, egyértelmű és írásos hozzájárulásával használhatja fel.</strong> Az Ügyfél bármikor dönthet úgy, hogy nem járul hozzá a képek publikálásához.</p>

      <h2>6. Lemondási Feltételek</h2>
      <p>Az Ügyfél a lefoglalt időpontot a fotózás előtt 72 órával díjmentesen lemondhatja. 72 órán belüli lemondás esetén a befizetett előleg (foglaló) nem visszatérítendő. Amennyiben a fotózás a Szolgáltató hibájából hiúsul meg, a befizetett előleg teljes egészében visszajár.</p>

      <h2>7. Záró Rendelkezések</h2>
      <p>A jelen ÁSZF-ben nem szabályozott kérdésekben a Polgári Törvénykönyvről szóló 2013. évi V. törvény és az egyéb vonatkozó magyar jogszabályok az irányadók.</p>
      <p><em>Hatályos: 2025. július 1.</em></p>
      </LegalPageLayout>
    </>
  );
};

export default ASZFPage;