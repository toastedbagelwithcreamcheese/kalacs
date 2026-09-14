# Jogi dokumentumok — állapot és nyitott kérdések

Utoljára frissítve: 2026. szeptember 14.

## Hol vannak az adatok

Minden cégadat egy helyen: **`constants/legal.js`**. A négy jogi oldal
(`pages/impresszum.js`, `pages/aszf.js`, `pages/adatvedelem.js`,
`pages/cookie.js`) ebből olvas, tehát adatváltozáskor csak ezt az egy fájlt
kell módosítani.

## Kitöltött adatok és a forrásuk

| Mező | Érték | Forrás |
|---|---|---|
| Szolgáltató neve | Kovács Szabolcs e.v. | MKIK egyenlegközlő, KNYR/781674-1/2026 |
| Vállalkozási forma | egyéni vállalkozó | a 66-tal kezdődő adószám és a kamarai nyilvántartás alapján |
| Székhely | 8921 Zalaszentiván, Deák Ferenc utca 3. | MKIK egyenlegközlő |
| Kamarai nyilvántartási szám | ZA66203276 | MKIK egyenlegközlő |
| Adószám | 66203276-1-40 | MKIK egyenlegközlő |
| Adózási státusz | alanyi adómentes (AAM) | az adószám középső jegye (1), a tulajdonos megerősítette |

A weboldal marketinges oldalai (főoldal, Rólam, szolgáltatások) szándékosan
**Kovács Bálint** néven maradtak — a jogi dokumentumokban viszont a valós
szerződő fél és számlakibocsátó, Kovács Szabolcs e.v. szerepel. A szerzői
jogi pontokban Kovács Bálint mint a fotók szerzője van nevesítve.

## Amit még pótolni érdemes

1. **Egyéni vállalkozói nyilvántartási szám.** Jelenleg a kamarai
   nyilvántartási szám (ZA66203276) szerepel nyilvántartási számként. Az
   Ekertv. szerinti impresszumhoz pontosabb lenne az EV-nyilvántartási szám,
   ami a vállalkozói igazolványon vagy a Belügyminisztérium
   EV-nyilvántartásában található. Ha megvan, a `constants/legal.js`
   `nyilvantartasiSzam` és `nyilvantartasiSzamMegnevezes` mezőit kell átírni.

2. **Ügyvédi átnézés.** Az ÁSZF teljes szövege és az adatvédelmi
   tájékoztató kiegészítései sablon nélkül, a weboldal tényleges működése
   alapján készültek, de **nem ügyvéd írta és nem is nézte át.** Élesítés
   előtt érdemes jogásszal átnézetni, különösen a 7. (foglaló), a 14.
   (elállási jog) és a 17. (felelősség) pontot.

3. **A foglaló, mint jogintézmény.** Az ÁSZF 7. pontja a Ptk. 6:185. §
   szerinti **foglalóról** szól, nem előlegről. A különbség lényeges: a
   foglalót a megrendelő a saját hibájából történő meghiúsuláskor elveszti,
   viszont ha a fotós hibájából marad el a fotózás, akkor azt
   **kétszeresen** kell visszafizetni. Ha ez utóbbi kockázatot nem vállalod,
   a 7. pontot előlegre kell átírni — de akkor a késői lemondásnál az összeg
   nem tartható vissza.

4. **A megrendelés-visszaigazolás szövege.** Az ÁSZF 14. pontja arra épül,
   hogy a visszaigazoló e-mail kifejezetten bekéri a fogyasztótól a
   45/2014. Korm. rendelet 29. § (1) a) és m) pontja szerinti nyilatkozatot
   (hozzájárulás a teljesítés megkezdéséhez + az elállási jog elvesztésének
   tudomásulvétele). Enélkül ez a két kivétel nem hivatkozható. Az e-mail
   sablont ehhez igazítani kell.

5. **Publikálási hozzájárulás írásban.** Az ÁSZF 12. pontja szerint a képek
   referenciaként való felhasználásához előzetes írásbeli hozzájárulás kell.
   Érdemes ezt a szerződésben/visszaigazolóban egy külön jelölőnégyzetként
   bekérni, hogy visszakereshető legyen.

## Amit szándékosan NEM tartalmaznak

- **Nincs hivatkozás az EU online vitarendezési (ODR) platformjára.** Az
  platform a 2024/3228/EU rendelet alapján 2025. július 20-án véglegesen
  megszűnt, ezért a legtöbb régi ÁSZF-sablonban szereplő ODR-link ma már
  hibás információ.
- **Nincs nyomtatott termék értékesítése.** A weboldalon keresztül csak
  digitális képátadás történik; a `lib/canvasPrices.js` és az
  `app/(foto)/admin/vaszonkep` belső árazó eszköz. Ha később mégis lesz
  vászonkép-értékesítés, az ÁSZF 4. pontját ki kell egészíteni, és az
  elállási jognál meg kell jeleníteni az egyedi gyártás miatti kivételt
  (45/2014. 29. § (1) c)).

## Békéltető testület — figyelem

A békéltető testületek 2024-től regionálisan működnek. Zala vármegyei
lakóhelyű fogyasztók ügyeiben a **Győr-Moson-Sopron Vármegyei Békéltető
Testület** jár el (9021 Győr, Szent István út 10/A), amely Zalaegerszegen is
tart személyes meghallgatást. A korábbi „Zala Megyei Békéltető Testület,
Zalaegerszeg, Petőfi u. 24." cím sok sablonban még szerepel, de már nem ez az
eljáró szerv.
