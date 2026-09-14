// pages/aszf.js
import Head from "next/head";
import LegalPageLayout from "@/components/LegalPageLayout";
import {
  szolgaltato,
  tarhelyszolgaltato,
  bekeltetoTestulet,
  hatalyosDatum,
} from "@/constants/legal";

const ASZFPage = () => {
  return (
    <>
      <Head>
        <title>Általános Szerződési Feltételek | Kovács Bálint Fotó</title>
        <meta
          name="description"
          content="Kovács Bálint Fotográfia Általános Szerződési Feltételei: időpontfoglalás, foglaló, képátadás, szerzői jogok, lemondás és elállási jog."
        />
        <link rel="canonical" href="https://kovacsbalintfoto.hu/aszf" />
      </Head>
      <LegalPageLayout
        title="Általános Szerződési Feltételek"
        effectiveDate={hatalyosDatum}
      >
        <p>
          Jelen Általános Szerződési Feltételek (a továbbiakban: <strong>ÁSZF</strong>) a
          {" "}{szolgaltato.nev} által {szolgaltato.markanev} néven nyújtott fotós szolgáltatások
          igénybevételének feltételeit szabályozzák.
        </p>

        <h2>1. A Szolgáltató adatai</h2>
        <ul>
          <li><strong>Név:</strong> {szolgaltato.nev}</li>
          <li><strong>Vállalkozási forma:</strong> {szolgaltato.forma}</li>
          <li><strong>Székhely és levelezési cím:</strong> {szolgaltato.szekhely}</li>
          <li>
            <strong>{szolgaltato.nyilvantartasiSzamMegnevezes}:</strong>{" "}
            {szolgaltato.nyilvantartasiSzam}
          </li>
          <li><strong>Adószám:</strong> {szolgaltato.adoszam}</li>
          <li><strong>Adózási státusz:</strong> {szolgaltato.afaStatusz}</li>
          <li><strong>E-mail cím:</strong> {szolgaltato.email}</li>
          <li><strong>Telefonszám:</strong> {szolgaltato.telefon}</li>
          <li><strong>Weboldal:</strong> {szolgaltato.weboldalUrl}</li>
          <li><strong>Tárhelyszolgáltató:</strong> {tarhelyszolgaltato.nev}, {tarhelyszolgaltato.szekhely}</li>
        </ul>
        <p>
          A fotókat <strong>{szolgaltato.szerzo}</strong> készíti. A szerződés az Ügyfél és a fent
          megnevezett Szolgáltató között jön létre, a számlát a Szolgáltató állítja ki.
        </p>

        <h2>2. Az ÁSZF hatálya és elfogadása</h2>
        <p>
          Az ÁSZF a Szolgáltató és az Ügyfél között létrejövő valamennyi fotós szolgáltatásra
          vonatkozó szerződésre kiterjed, kivéve, ha a felek írásban ettől eltérően állapodnak meg.
          Eltérés esetén az egyedi megállapodás az irányadó.
        </p>
        <p>
          Az Ügyfél a megrendelés leadásával — az ajánlat írásbeli elfogadásával, a foglaló
          megfizetésével vagy a fotózáson való megjelenéssel — kijelenti, hogy az ÁSZF-et
          megismerte és elfogadja.
        </p>
        <p>
          A Szolgáltató az ÁSZF-et egyoldalúan módosíthatja. A módosítás a weboldalon való
          közzététellel lép hatályba, és a már visszaigazolt megrendelésekre nem hat ki: azokra a
          megrendelés visszaigazolásakor hatályos ÁSZF alkalmazandó.
        </p>

        <h2>3. Fogalmak</h2>
        <ul>
          <li><strong>Szolgáltató:</strong> az 1. pontban megnevezett vállalkozás.</li>
          <li><strong>Ügyfél:</strong> az a természetes vagy jogi személy, aki a Szolgáltatást megrendeli.</li>
          <li>
            <strong>Fogyasztó:</strong> a szakmája, önálló foglalkozása vagy üzleti tevékenysége
            körén kívül eljáró természetes személy. A jelen ÁSZF fogyasztókra vonatkozó
            rendelkezései kizárólag rájuk alkalmazandók.
          </li>
          <li><strong>Szolgáltatás:</strong> a Szolgáltató által nyújtott fotós szolgáltatás és a hozzá kapcsolódó képfeldolgozás, képátadás.</li>
          <li><strong>Nyers kép:</strong> a fotózáson készült, válogatásra szánt, nem retusált felvétel.</li>
          <li><strong>Retusált kép:</strong> a kiválasztott, a Szolgáltató által szerkesztett, átadásra kerülő digitális fotó.</li>
          <li><strong>Ügyfélgaléria:</strong> a weboldalon elérhető, jelszóval védett online felület, ahol az Ügyfél a képeket kiválasztja, illetve letölti.</li>
        </ul>

        <h2>4. A Szolgáltatás tárgya</h2>
        <p>
          A Szolgáltató portré-, kismama-, családi-, esküvői-, autós és motoros, valamint
          kisállat-fotózást és rendezvényfotózást vállal. Az egyes szolgáltatások tartalma és
          díjszabása a weboldal vonatkozó aloldalain, illetve az egyedi árajánlatban található.
        </p>
        <p>
          A Szolgáltatás eredménye <strong>digitálisan átadott, retusált fotó</strong>. A
          Szolgáltató a weboldalon keresztül nyomtatott terméket (vászonkép, album, papírkép) nem
          értékesít; ilyen igény esetén a felek külön, egyedi megállapodást kötnek.
        </p>

        <h2>5. Időpontfoglalás, a szerződés létrejötte</h2>
        <p>
          A megrendelés a weboldal kapcsolatfelvételi űrlapján, e-mailben vagy telefonon történik.
          A Szolgáltató a megkeresésre egyedi ajánlatot ad, amely tartalmazza a fotózás időpontját,
          helyszínét, hozzávetőleges időtartamát, az átadandó retusált képek számát, az átadási
          határidőt és a díjat.
        </p>
        <p>
          A szerződés a Szolgáltató <strong>írásbeli visszaigazolásával</strong>, illetve — ha a
          Szolgáltató foglalót kér — a foglaló megfizetésével jön létre. A telefonon egyeztetett
          feltételeket a Szolgáltató e-mailben is megerősíti; a szerződés tartalmára ez az e-mail
          az irányadó.
        </p>
        <p>
          A felek a szerződést távollévők között, elektronikus úton kötik. A szerződés nyelve
          magyar. A Szolgáltató a szerződést nem iktatja, az utóbb nem hozzáférhető; a felek
          közötti e-mail-váltás a szerződés tartalmát igazolja.
        </p>

        <h2>6. Díjak és fizetési feltételek</h2>
        <p>
          A weboldalon és az ajánlatban feltüntetett díjak forintban értendők.{" "}
          <strong>A Szolgáltató alanyi adómentes, ezért a díjak ÁFA-t nem tartalmaznak, és a
          számla áthárított általános forgalmi adót nem tartalmaz.</strong>
        </p>
        <p>
          A díj a fotózás elvégzését és az ajánlatban meghatározott számú retusált kép átadását
          foglalja magában. Az azon felül kért további retusált képek díja a weboldalon, illetve az
          ajánlatban feltüntetett egységár szerint kerül felszámításra.
        </p>
        <p>
          A fizetés — eltérő megállapodás hiányában — banki átutalással vagy készpénzben történik.
          A Szolgáltató a teljesítésről számlát állít ki. A weboldalon online fizetési lehetőség
          nincs.
        </p>
        <p>
          A fotózás helyszínére történő utazás költsége az ajánlatban szereplő esetekben külön
          kerül felszámításra; ennek mértékét a Szolgáltató minden esetben előre, tételesen közli.
        </p>

        <h2>7. Foglaló</h2>
        <p>
          A Szolgáltató az időpont lekötéséhez foglalót kérhet, amelynek mértékét az egyedi ajánlat
          tartalmazza. A foglaló a Polgári Törvénykönyvről szóló 2013. évi V. törvény (Ptk.)
          6:185. §-a szerinti foglalónak minősül, amit a felek a megrendelés visszaigazolásában
          kifejezetten rögzítenek.
        </p>
        <p>Ennek megfelelően:</p>
        <ul>
          <li>a foglaló a Szolgáltatás díjába beszámít;</li>
          <li>
            ha a teljesítés olyan okból hiúsul meg, amelyért az <strong>Ügyfél</strong> felelős, az
            Ügyfél a foglalót elveszti;
          </li>
          <li>
            ha a teljesítés olyan okból hiúsul meg, amelyért a <strong>Szolgáltató</strong> felelős,
            a Szolgáltató a foglalót kétszeres összegben köteles visszatéríteni;
          </li>
          <li>
            ha a meghiúsulásért egyik fél sem felelős, vagy mindkét fél felelős, a foglaló
            visszajár.
          </li>
        </ul>

        <h2>8. A fotózás lebonyolítása</h2>
        <p>
          A fotózás a megállapodott időpontban és helyszínen történik. Az Ügyfél a megbeszélt
          időpontban jelenik meg; a késés a fotózás időtartamát csökkenti, a díjat nem.
        </p>
        <p>
          Szabadtéri fotózás esetén a Szolgáltató alkalmatlan időjárás (tartós eső, viharos szél,
          veszélyes útviszonyok) miatt kezdeményezheti az időpont áthelyezését. Ilyenkor a felek
          közösen új időpontot egyeztetnek, a foglaló pedig az új időpontra vonatkozik.
        </p>
        <p>
          A Szolgáltató a fotózás szakmai kivitelezésében — helyszín, beállítás, fényviszonyok,
          képkivágás — szabad kezet kap; a leadott képek válogatása és a szerkesztési stílus
          meghatározása a Szolgáltató alkotói döntése. A Szolgáltató törekszik az Ügyfél
          elképzeléseinek figyelembevételére.
        </p>
        <p>
          Kiskorú részvétele esetén a fotózáson végig jelen kell lennie a törvényes képviselőnek,
          aki a kiskorú nevében a jelen ÁSZF szerinti nyilatkozatokat megteszi.
        </p>

        <h2>9. Képválogatás, retusálás és átadás</h2>
        <p>
          A fotózást követően a Szolgáltató a nyers képeket jelszóval védett Ügyfélgalériában teszi
          elérhetővé, ahol az Ügyfél kiválasztja a retusálásra kért képeket. A galéria elérhetősége
          határozott ideig áll fenn; ennek időtartamáról a Szolgáltató a hozzáférés megküldésekor
          tájékoztat.
        </p>
        <p>
          Az Ügyfél a válogatást az egyeztetett határidőn belül végzi el. Ha a válogatás elmarad, a
          Szolgáltató — figyelmeztetést követően — maga választja ki az ajánlatban szereplő számú
          képet.
        </p>
        <p>
          A retusálás a Szolgáltató szerkesztési stílusa szerinti színkezelést, fénykorrekciót és
          általános szépítést jelent. A testalkat átalakítására, illetve a valóságtól lényegesen
          eltérő módosításra irányuló kérést a Szolgáltató nem köteles teljesíteni.
        </p>
        <p>
          A retusált képeket a Szolgáltató digitálisan, letöltési linken vagy az Ügyfélgalérián
          keresztül adja át, az ajánlatban megjelölt határidőn belül. Nyers, szerkesztetlen képet a
          Szolgáltató nem ad ki.
        </p>

        <h2>10. Tárolás, archiválás</h2>
        <p>
          Az Ügyfél a képek letöltéséről és biztonsági mentéséről maga gondoskodik. A Szolgáltató
          az átadást követően az anyag határozatlan idejű megőrzésére nem vállal kötelezettséget;
          az archívumból való utólagos pótlásra — ha az még lehetséges — külön díj ellenében
          kerülhet sor.
        </p>

        <h2>11. Szerzői jogok és felhasználás</h2>
        <p>
          A fotózáson készült valamennyi felvétel a szerzői jogról szóló 1999. évi LXXVI. törvény
          (Szjt.) védelme alatt álló mű. A művek <strong>szerzője {szolgaltato.szerzo}</strong>; a
          szerzői jog a szerzőt illeti. A Szolgáltató a szerző hozzájárulásával jogosult a jelen
          ÁSZF szerinti felhasználási engedélyek megadására.
        </p>
        <p>
          Az Ügyfél az átadott retusált képekre <strong>nem kizárólagos, területi és időbeli
          korlátozás nélküli, magáncélú felhasználási jogot</strong> szerez. Ez magában foglalja a
          képek magáncélú nyomtatását, családi és baráti körben való megosztását, valamint a saját
          közösségi média felületein való közzétételét.
        </p>
        <p>
          A képek <strong>üzleti, kereskedelmi, reklám- vagy marketingcélú felhasználása</strong> —
          ideértve a viszonteladást, adatbázisba szervezést és mesterséges intelligencia
          betanítására való felhasználást — kizárólag a Szolgáltató előzetes írásbeli engedélyével
          megengedett.
        </p>
        <p>
          Az átadott képek <strong>átszerkesztése, kivágása, színezése, szűrőzése</strong>, illetve
          a szerző nevének eltávolítása a mű integritását sérti, ezért nem megengedett. A képek
          harmadik személynek történő továbbadása szerkesztés céljából szintén nem megengedett.
        </p>
        <p>
          Az Ügyfél a képek közzétételekor — ha ez a felület jellege alapján lehetséges —
          feltünteti a szerző nevét vagy a {szolgaltato.markanev} megjelölést.
        </p>

        <h2>12. A képek felhasználása a Szolgáltató részéről</h2>
        <p>
          <strong>A Szolgáltató a fotózáson készült képeket saját referenciájában — weboldal,
          közösségi média, portfólió, pályázat — kizárólag az Ügyfél előzetes, kifejezett és
          írásbeli hozzájárulásával használja fel.</strong> A hozzájárulás megtagadása a
          Szolgáltatás díját és teljesítését nem érinti.
        </p>
        <p>
          A hozzájárulás bármikor, indokolás nélkül visszavonható a Szolgáltató e-mail címén. A
          visszavonás a jövőre nézve hatályos: a Szolgáltató a képet a saját felületeiről ésszerű
          határidőn belül eltávolítja, de a már megjelent nyomtatott anyagokért, illetve harmadik
          személyek által korábban átvett tartalmakért felelősséget nem tud vállalni.
        </p>

        <h2>13. Időpont-módosítás és lemondás</h2>
        <p>
          Az Ügyfél a lefoglalt időpontot a fotózás megkezdése előtt <strong>legkésőbb 72 órával
          </strong> díjmentesen lemondhatja vagy áthelyezheti; a foglaló ilyenkor az új időpontra
          vonatkozik, illetve visszajár.
        </p>
        <p>
          A 72 órán belüli lemondás, valamint a fotózáson való meg nem jelenés esetén a foglalóra a
          7. pont szabályai alkalmazandók.
        </p>
        <p>
          Ha a fotózás a Szolgáltató érdekkörében felmerült okból marad el, a Szolgáltató elsősorban
          új időpontot ajánl fel; ha ez az Ügyfélnek nem felel meg, a 7. pont szerint jár el.
        </p>

        <h2>14. Elállási jog (fogyasztókra vonatkozó rendelkezés)</h2>
        <p>
          A távollévők között kötött szerződésekre a fogyasztó és a vállalkozás közötti
          szerződések részletes szabályairól szóló 45/2014. (II. 26.) Korm. rendelet irányadó.
          Fogyasztónak minősülő Ügyfél a szerződéstől főszabály szerint 14 napon belül indokolás
          nélkül elállhat.
        </p>
        <p>
          <strong>Az elállási jog azonban a jelen Szolgáltatás jellegéből adódóan több esetben
          nem gyakorolható.</strong> A 45/2014. Korm. rendelet 29. § (1) bekezdése alapján a
          fogyasztót nem illeti meg az elállási jog:
        </p>
        <ul>
          <li>
            <strong>l) pont:</strong> szabadidős tevékenységekhez kapcsolódó szolgáltatásra
            irányuló szerződés esetén, ha a felek meghatározott teljesítési határnapot vagy
            határidőt kötöttek ki — a konkrét naptári napra lefoglalt fotózás ilyen szerződés;
          </li>
          <li>
            <strong>a) pont:</strong> a szolgáltatás egészének teljesítését követően, ha a
            Szolgáltató a teljesítést a fogyasztó kifejezett előzetes beleegyezésével kezdte meg,
            és a fogyasztó tudomásul vette, hogy a teljesítés befejezésével elveszíti elállási
            jogát;
          </li>
          <li>
            <strong>m) pont:</strong> a nem tárgyi adathordozón nyújtott digitális tartalom
            (a retusált fotók letöltése) tekintetében, ha a Szolgáltató a fogyasztó kifejezett
            előzetes hozzájárulásával kezdte meg a teljesítést, és a fogyasztó e hozzájárulásával
            egyidejűleg nyilatkozott arról, hogy tudomásul veszi elállási joga elvesztését.
          </li>
        </ul>
        <p>
          A Szolgáltató a megrendelés visszaigazolásában külön felhívja a fogyasztó figyelmét ezekre
          a körülményekre, és a fenti nyilatkozatokat kifejezetten bekéri. Ahol az elállási jog
          fennáll, azt a fogyasztó a Szolgáltató e-mail címére küldött egyértelmű nyilatkozattal
          gyakorolhatja; ilyen esetben a Szolgáltató a fogyasztó által teljesített fizetést
          haladéktalanul, de legkésőbb 14 napon belül visszatéríti.
        </p>
        <p>
          A 13. pont szerinti lemondási feltételek a fogyasztót a fentieken túl megillető
          kedvezmények, és nem korlátozzák a jogszabály alapján esetlegesen fennálló elállási
          jogot.
        </p>

        <h2>15. Hibás teljesítés, kellékszavatosság</h2>
        <p>
          A Szolgáltató hibásan teljesít, ha a Szolgáltatás nem felel meg a szerződésben vagy
          jogszabályban megállapított követelményeknek. Az Ügyfél a hibát a felfedezésétől számított
          lehető legrövidebb időn belül közli; fogyasztó esetén a hiba felfedezésétől számított két
          hónapon belül közölt kifogás kellő időben közöltnek minősül.
        </p>
        <p>
          Kifogás esetén az Ügyfél elsősorban kijavítást — a képek ismételt szerkesztését, indokolt
          esetben a fotózás megismétlését — kérhet. Ha a kijavítás nem lehetséges vagy a
          Szolgáltató azt nem vállalja, az Ügyfél arányos díjleszállítást igényelhet, vagy a
          szerződéstől elállhat.
        </p>
        <p>
          A Szolgáltató nem felel a képek olyan tulajdonságaiért, amelyek a Szolgáltató előre közölt
          és az Ügyfél által elfogadott alkotói stílusából, illetve a fotózás körülményeiből (fény,
          időjárás, helyszín adottságai, a résztvevők együttműködése) következnek.
        </p>

        <h2>16. Vis maior</h2>
        <p>
          Egyik fél sem felel a szerződés teljesítésének elmaradásáért, ha azt olyan elháríthatatlan
          külső körülmény okozta, amely a szerződéskötéskor nem volt előre látható — így különösen
          természeti katasztrófa, járvány, hatósági intézkedés, súlyos betegség vagy baleset.
        </p>
        <p>
          Vis maior esetén a felek elsősorban új időpontban állapodnak meg. Ha ez nem lehetséges, a
          foglaló visszajár, és a felek további követeléssel nem élnek egymással szemben. A
          Szolgáltató betegsége vagy elháríthatatlan akadályoztatása esetén — lehetőség szerint —
          helyettes fotóst ajánl fel; ennek elfogadása az Ügyfél döntése.
        </p>

        <h2>17. Felelősség</h2>
        <p>
          A Szolgáltató a szerződésszegéssel okozott kárért a Ptk. szabályai szerint felel. A
          Szolgáltató felelőssége — a szándékosan okozott, továbbá emberi életet, testi épséget vagy
          egészséget megkárosító szerződésszegés kivételével — a Szolgáltatás díjának összegéig
          terjed.
        </p>
        <p>
          A Szolgáltató nem felel a fotózás helyszínén az Ügyfél vagy a résztvevők vagyontárgyaiban
          keletkezett kárért, sem az Ügyfél által megadott hibás adatokból (időpont, helyszín,
          elérhetőség) eredő következményekért.
        </p>

        <h2>18. Adatkezelés</h2>
        <p>
          A Szolgáltató a személyes adatokat a mindenkor hatályos{" "}
          <a href="/adatvedelem">Adatvédelmi Irányelvek</a> szerint kezeli. A weboldal sütikkel
          kapcsolatos gyakorlatát a <a href="/cookie">Cookie Szabályzat</a> ismerteti.
        </p>

        <h2>19. Panaszkezelés és jogviták</h2>
        <p>
          Panaszát a Szolgáltató e-mail címén vagy telefonszámán jelezheti. A Szolgáltató a panaszt
          kivizsgálja, és a beérkezéstől számított 30 napon belül írásban válaszol.
        </p>
        <p>
          Ha a panasz kezelésével nem ért egyet, fogyasztóként a lakóhelye vagy tartózkodási helye
          szerinti békéltető testülethez fordulhat. A Szolgáltató székhelye szerint illetékes
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
          A Szolgáltatót a békéltető testületi eljárásban együttműködési kötelezettség terheli.
          Fogyasztóvédelmi eljárás a lakóhely szerint illetékes fővárosi vagy vármegyei
          kormányhivatalnál kezdeményezhető. Az Ügyfél bírósághoz is fordulhat.
        </p>

        <h2>20. Záró rendelkezések</h2>
        <p>
          A jelen ÁSZF-ben nem szabályozott kérdésekben a Ptk., a szerzői jogról szóló 1999. évi
          LXXVI. törvény, az elektronikus kereskedelmi szolgáltatásokról szóló 2001. évi CVIII.
          törvény, a fogyasztóvédelemről szóló 1997. évi CLV. törvény, valamint a 45/2014.
          (II. 26.) Korm. rendelet rendelkezései az irányadók.
        </p>
        <p>
          Ha az ÁSZF bármely rendelkezése érvénytelennek bizonyul, az a többi rendelkezés
          érvényességét nem érinti.
        </p>
      </LegalPageLayout>
    </>
  );
};

export default ASZFPage;
