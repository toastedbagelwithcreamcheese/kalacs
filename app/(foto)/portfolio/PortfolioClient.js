"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Camera } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import TiltCard from "@/components/TiltCard";

// --- A LEGJOBB KÉPEID (Minden kategóriából válogatva) ---
// Ide tényleg csak a "Wow" faktoros képeket tedd!
const portfolioImages = [
  // --- Legfrissebb munkák ---
  { src: "/images/portre/_42A1096.webp", category: "Portré", alt: "Nyaralós portré a tengerparti sziklákon" },
  { src: "/images/portre/_42A2167.webp", category: "Portré", alt: "Naplementés hintázós portré a tengerparti strandon" },
  { src: "/images/autok/_BF_0069.webp", category: "Autók", alt: "Fekete Dodge Challenger a nyári mezőn, oldalnézetben" },
  { src: "/images/portre/_42A2591.webp", category: "Portré", alt: "Fekete-fehér portré a sziklákon, hosszú expozíciós tengerrel" },
  { src: "/images/portre/_42A2900.webp", category: "Portré", alt: "Naplementés parti fotó a tengerparti sziklákon" },
  { src: "/images/portre/_42A3880.webp", category: "Portré", alt: "Fehér ruhás portré a tengerre néző pavilon boltíve alatt" },
  { src: "/images/eskuvo/_42A9125-2.webp", category: "Esküvő", alt: "Meghitt fekete-fehér pillanat a menyasszony és a vőlegény között" },
  { src: "/images/baba_reveal/_BF_2013.webp", category: "Család/Kismama", alt: "Babavárás bejelentés: babacipő és ultrahangkép a leendő apuka vállán" },
  { src: "/images/portre/_42A5667.webp", category: "Portré", alt: "Esti utcai portré fehér szettben" },
  { src: "/images/autok/_BF_0084.webp", category: "Autók", alt: "Izomautó a dombos táj és a szénabálák előtt" },
  { src: "/images/portre/_42A5704.webp", category: "Portré", alt: "Kreatív esti portré meleg fényekkel és mozgáselmosódással" },
  { src: "/images/portre/_42A5787.webp", category: "Portré", alt: "Szimmetrikus, minimalista portré a fehér lépcsősor perspektívájában" },
  { src: "/images/portre/_42A5832.webp", category: "Portré", alt: "Éjszakai portré teliholddal a háttérben" },
  { src: "/images/portre/_42A5880.webp", category: "Portré", alt: "Esti séta a kivilágított sétányon" },
  { src: "/images/portre/_42A5908-2.webp", category: "Portré", alt: "Fekete-fehér portré a város éjszakai fényei felett" },
  { src: "/images/autok/_BF_0143.webp", category: "Autók", alt: "Audi limuzin a naplementében, aranyló tarlón" },
  { src: "/images/portre/_42A5910.webp", category: "Portré", alt: "Vidám portré a város esti fényeinek panorámájával" },
  { src: "/images/portre/_42A5934.webp", category: "Portré", alt: "Fekete-fehér éjszakai portré a korlátnál" },
  { src: "/images/portre/_42A5952-2.webp", category: "Portré", alt: "Éjszakai portré a hold és a városi fények alatt" },
  { src: "/images/portre/_42A6811.webp", category: "Portré", alt: "Elegáns esti portré bordó ruhában" },
  { src: "/images/autok/_BF_0177.webp", category: "Autók", alt: "Autó sziluettje a lemenő nap fényében" },
  { src: "/images/portre/_42A6948.webp", category: "Portré", alt: "Kreatív portré egy utcai domború tükör tükröződésében" },
  { src: "/images/eskuvo/_42A9328.webp", category: "Esküvő", alt: "Boldog ifjú pár a szertartás után" },
  { src: "/images/baba_reveal/_BF_2053.webp", category: "Család/Kismama", alt: "DAD és MOM feliratú sapkák az ultrahangképpel a leendő szülők kezében" },
  { src: "/images/portre/_42A7071-2.webp", category: "Portré", alt: "Éjszakai utcai portré elmosódott lámpafényekkel" },
  { src: "/images/portre/_42A7077-3.webp", category: "Portré", alt: "Fekete-fehér portré az út közepén, lámpasor perspektívájával" },
  { src: "/images/portre/_42A7077.webp", category: "Portré", alt: "Éjszakai portré az út közepén, a városi lámpák fényében" },
  { src: "/images/autok/_BF_0180.webp", category: "Autók", alt: "Aranyóra hangulatú autós fotó a nyári mezőn" },
  { src: "/images/portre/_42A7095.webp", category: "Portré", alt: "Laza fekete-fehér utcai portré napszemüvegben" },
  { src: "/images/portre/_42A8195.webp", category: "Portré", alt: "Portré világos, minimál stúdiós enteriőrben" },
  { src: "/images/portre/_42A8253.webp", category: "Portré", alt: "Stúdiós divatportré növényes díszlettel" },
  { src: "/images/portre/_42A8458.webp", category: "Portré", alt: "Természetes fényű portré világos stúdióháttér előtt" },
  { src: "/images/portre/_42A8494.webp", category: "Portré", alt: "Minimalista egészalakos portré fehér téglafal előtt" },
  { src: "/images/autok/_42A0238.webp", category: "Autók", alt: "Fekete izomautó részletfotó a lemenő nap fényében" },
  { src: "/images/portre/_42A8687.webp", category: "Portré", alt: "Portré a nagy ablak természetes fényében" },
  { src: "/images/portre/_BF_0142.webp", category: "Portré", alt: "Városi divatportré árnyékos utcarészleten" },
  { src: "/images/portre/_BF_0318.webp", category: "Portré", alt: "Elegáns városi portré csipke felsőben" },
  { src: "/images/eskuvo/_42A9386-2.webp", category: "Esküvő", alt: "Csók és a frissen felhúzott jegygyűrűk közeli fotója" },
  { src: "/images/baba_reveal/_BF_2096.webp", category: "Család/Kismama", alt: "Babavárás bejelentés kellékei: sapkák, babacipő és ultrahangkép" },
  { src: "/images/portre/_BF_0408.webp", category: "Portré", alt: "Ellenfényes portré egy városi átjáróban" },
  { src: "/images/autok/_42A0246.webp", category: "Autók", alt: "Autó belső tér: kormány és váltó részletfotó" },
  { src: "/images/portre/_BF_0441.webp", category: "Portré", alt: "Napsütötte lifestyle portré a sétálóutcán" },
  { src: "/images/portre/_BF_0529.webp", category: "Portré", alt: "Mozgás közben készült portré a belvárosi téren" },
  { src: "/images/portre/_BF_0530.webp", category: "Portré", alt: "Városi séta közben elkapott portré" },
  { src: "/images/portre/_BF_0635-ret.webp", category: "Portré", alt: "Kávézós portré, játékos napszemüveges pillanat" },
  { src: "/images/autok/_42A0253.webp", category: "Autók", alt: "Krómozott tanksapka közeli részletfotó" },
  { src: "/images/portre/_BF_0655.webp", category: "Portré", alt: "Hangulatos portré a kávézó kirakata előtt" },
  { src: "/images/portre/_BF_0674.webp", category: "Portré", alt: "Városi portré itallal a kezében, esti fényben" },
  { src: "/images/portre/_BF_0899.webp", category: "Portré", alt: "Életkép a vidámparkban, mozgalmas háttérrel" },
  { src: "/images/portre/_BF_0994-2.webp", category: "Portré", alt: "Lifestyle portré a vidámpark színes forgatagában" },
  { src: "/images/portre/_BF_1249.webp", category: "Portré", alt: "Laza, utcai stílusú portré a vidámparkban" },
  { src: "/images/autok/_42A0273.webp", category: "Autók", alt: "Autó utastere naplementében, ellenfényes hangulatban" },
  { src: "/images/portre/_BF_1310.webp", category: "Portré", alt: "Páros portré stúdiós, klubhangulatú díszletben" },
  { src: "/images/eskuvo/_BF_9464.webp", category: "Esküvő", alt: "Ifjú pár portréja a kastély épülete előtt" },
  { src: "/images/baba_reveal/_BF_2122.webp", category: "Család/Kismama", alt: "Leendő apuka DAD feliratú sapkában, babacipővel a vállán" },
  { src: "/images/portre/_BF_8904.webp", category: "Portré", alt: "Tavaszi portré napfényes lombok között" },
  { src: "/images/portre/_BF_8931.webp", category: "Portré", alt: "Természetes fényű tavaszi portré farmerdzsekiben" },
  { src: "/images/portre/_BF_8946.webp", category: "Portré", alt: "Közeli tavaszi portré lágy, természetes fényben" },
  { src: "/images/autok/_42A0281.webp", category: "Autók", alt: "Hátsó szárny sziluettje a naplemente színei előtt" },
  { src: "/images/portre/_BF_9108.webp", category: "Portré", alt: "Portré a park fái között, tavaszi hangulatban" },
  { src: "/images/portre/_BF_9126.webp", category: "Portré", alt: "Egészalakos portré a napsütötte parkban" },
  { src: "/images/_BF_8173.webp", category: "Család/Kismama", alt: "Nagycsaládi csoportkép a keszthelyi Festetics-kastély parkjában" },
  { src: "/images/_BF_8479.webp", category: "Család/Kismama", alt: "Meghitt pillanat a szülők között a kastélykert fái alatt" },
  { src: "/images/_BF_8065.webp", category: "Család/Kismama", alt: "Vidám gyermekportré a kastélypark zöld gyepén" },
  { src: "/images/_BF_8791.webp", category: "Család/Kismama", alt: "Kisgyermek önfeledt játéka a Festetics-kastély udvarán" },
  { src: "/images/_BF_9706.webp", category: "Család/Kismama", alt: "Érzelmes ölelés és családi szeretet a fotózás közben" },
  { src: "/images/_BF_9604.webp", category: "Család/Kismama", alt: "Az egész család a Festetics-kastély impozáns épülete előtt" },
  { src: "/images/_BF_8606.webp", category: "Család/Kismama", alt: "Séta a napsütötte réten a nagyszülőkkel és az unokákkal" },
  { src: "/images/_BF_9511.webp", category: "Család/Kismama", alt: "A nagymama és unokája közötti különleges, szeretteljes pillanat" },
  { src: "/images/_BF_9139.webp", category: "Család/Kismama", alt: "Bohókás gyermekkép a kastélykert színes virágai között" },
  { src: "/images/_BF_8266.webp", category: "Család/Kismama", alt: "Profi családi fotózás Keszthelyen a történelmi parkban" },
  { src: "/images/_BF_0299.webp", category: "Portré", alt: "Művészi esti portré a keszthelyi móló kivilágított korlátjánál" },
  { src: "/images/_BF_0300.webp", category: "Portré", alt: "Hangulatos éjszakai fotó a Balaton-parton, sejtelmes fényekkel" },
  { src: "/images/_BF_0306.webp", category: "Portré", alt: "Közeli portré fotó esti fényben a móló végénél" },
  { src: "/images/_BF_9914.webp", category: "Portré", alt: "Tavaszi portré fotózás színes tulipánmező közepén" },
  { src: "/images/_BF_9914-2.webp", category: "Portré", alt: "Művészi távlati kép a virágzó tulipánok között" },
  { src: "/images/_BF_0167.webp", category: "Portré", alt: "Életkép a tulipánszüret idején készült tavaszi fotózásról" },
  { src: "/images/_BF_0167-2.webp", category: "Portré", alt: "Vidám női portré a végtelen tulipánsorok között" },
  { src: "/images/_BF_0180.webp", category: "Portré", alt: "Természetes fényekkel készült fotó a virágzó mezőn" },
  { src: "/images/_BF_0180-2.webp", category: "Portré", alt: "Romantikus hangulatú közeli portré a tulipánok ölelésében" },
  { src: "/images/_BF_0185.webp", category: "Portré", alt: "Napsütötte tavaszi portré a színes virágoskertben" },
  { src: "/images/_BF_0185-2.webp", category: "Portré", alt: "Kreatív kompozíció a tulipánmezőn készült fotósorozatból" },
  { src: "/images/_BF_0190.webp", category: "Portré", alt: "Profi kültéri portré a tavaszi virágzás idején" },
  { src: "/images/_BF_0195.webp", category: "Portré", alt: "Érzelmes pillanat a tulipánok között, lágy tónusokkal" },
  { src: "/images/_BF_0195-2.webp", category: "Portré", alt: "Fókuszált tekintet és virágos háttér a tavaszi mezőn" },
  { src: "/images/_BF_0772.webp", category: "Motorok", alt: "Vagány motoros portré a MOL Campus modern üvegfalai előtt" },
  { src: "/images/_BF_0678.webp", category: "Motorok", alt: "Városi motorozás életérzés a Kopaszi-gát épületei között" },
  { src: "/images/_BF_0640.webp", category: "Motorok", alt: "Stílusos motorkerékpár parkol Budapest legmagasabb irodaházánál" },
  { src: "/images/_BF_0718.webp", category: "Motorok", alt: "Lifestyle motoros fotózás a Duna-parti modern negyedben" },
  { src: "/images/_BF_0796-2.webp", category: "Motorok", alt: "Részletgazdag közeli fotó a motorosról és a gépről" },
  { src: "/images/_BF_0795-2.webp", category: "Motorok", alt: "Dinamikus motoros kompozíció a Kopaszi-gát sétányának közelében" },
  { src: "/images/_BF_0795.webp", category: "Motorok", alt: "Profi motoros portré fotózás Budapest modern építészeti környezetében" },
  { src: "/images/_BF_0796.webp", category: "Motorok", alt: "Fekete ruhás motoros pózol a futurisztikus MOL Campus tövében" },
  { src: "/images/_BF_0656.webp", category: "Motorok", alt: "Motoros pihenő a budapesti felhőkarcoló árnyékában" },
  { src: "/images/_BF_0852.webp", category: "Motorok", alt: "Egyedi épített motor és a modern városi táj találkozása" },
  { src: "/images/_BF_0573.webp", category: "Motorok", alt: "Városi motoros kaland a 11. kerület új városközpontjában" },
  { src: "/images/_BF_0560.webp", category: "Motorok", alt: "Brutális motorkerékpár a Kopaszi-gát minimalista hátterével" },
  { src: "/images/_BF_0547.webp", category: "Motorok", alt: "Esti fények és króm: motoros fotózás a MOL székháznál" },
  { src: "/images/_BF_0535.webp", category: "Motorok", alt: "Szabadság két keréken a Duna-parthoz közeli modern utcákon" },
  { src: "/images/_BF_0511.webp", category: "Motorok", alt: "Művészi motoros életkép Budapest legújabb negyedéből" },
  { src: "/images/_BF_0488.webp", category: "Motorok", alt: "Portré fotó a motorossal a Kopaszi-gát üvegépületei előtt" },
  { src: "/images/Eskuvo2026-3.webp", category: "Esküvő", alt: "Esküvői főkép" },
  { src: "/images/_MG_0315-2.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/_BF_7632.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/karacsony_patriek/_47A2095.webp", category: "Család/Kismama", alt: "Karácsonyi családi pillanat" },
  { src: "/images/_BF_6727.webp", category: "Esküvő", alt: "Esküvői pillanat" },
  { src: "/images/_BF_6726.webp", category: "Esküvő", alt: "Esküvői pillanat" },
  { src: "/images/asdf.webp", category: "Esküvő", alt: "Esküvői pillanat" },
  { src: "/images/_MG_5347.webp", category: "Kutyusok", alt: "Kutyás akciófotó" },
  { src: "/images/_BF_7627.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/_BF_2535.webp", category: "Esküvő", alt: "Esküvői portré" },
  { src: "/images/kata_kismama/_47A9158-2.webp", category: "Család/Kismama", alt: "Kismama fotó" },
  { src: "/images/_MG_4270festettV5.webp", category: "Portré", alt: "Művészi portré" },
  { src: "/images/_BF_2915.webp", category: "Esküvő", alt: "Esküvői pillanat" },
  { src: "/images/_BF_7732.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/Virag_BP/6.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/_BF_3127.webp", category: "Esküvő", alt: "Esküvői kreatív" },
  { src: "/images/_MG_8762.webp", category: "Család/Kismama", alt: "Családi fotó a réten" },
  { src: "/images/_BF_7664.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/Virag_BP/1_1.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/anna_varosliget/_47A7016.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/anna_varosliget/_47A7180.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/Virag_BP/_MG_2456.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/Eskuvo2026.webp", category: "Esküvő", alt: "Vicces esküvői fotó" },
  { src: "/images/karacsony_patriek/_47A2250.webp", category: "Család/Kismama", alt: "Családi ölelés a fa alatt" },
  { src: "/images/_MG_5324.webp", category: "Kutyusok", alt: "Kutya portré" },
  { src: "/images/Virag_BP/10.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/_BF_7636.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/_BF_6908.webp", category: "Autók", alt: "Autó fotó" },
  { src: "/images/Virag_BP/8.webp", category: "Portré", alt: "Kreatív portré" },
  { src: "/images/_BF_6906.webp", category: "Autók", alt: "Kreatív Autó fotó" },
  { src: "/images/_BF_6913.webp", category: "Autók", alt: "Kreatív Autó fotó" },
  { src: "/images/_BF_6916.webp", category: "Autók", alt: "Autó fotó" },
  { src: "/images/_MG_0390.webp", category: "Portré", alt: "Portré fotó" },
  { src: "/images/kata_kismama/_47A9146-2.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_0045.webp", category: "Autók", alt: "Autó fotó" },
  { src: "/images/_MG_8620.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_4462.webp", category: "Portré", alt: "Portré fotó" },
  { src: "/images/Rendszamnelkul-7580.webp", category: "Autók", alt: "Autó fotó" },
  { src: "/images/kata_kismama/_47A8248-2.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_7633.webp", category: "Autók", alt: "Autó fotó" },
  { src: "/images/_MG_0586-2.webp", category: "Portré", alt: "Portré fotó" },
  { src: "/images/kata_kismama/_47A9191-2.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_0031.webp", category: "Autók", alt: "Autó fotó" },
  { src: "/images/_MG_8842.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_0274.webp", category: "Portré", alt: "Portré fotó" },
  { src: "/images/kata_kismama/_47A9009-2.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_0003.webp", category: "Autók", alt: "Autó fotó" },
  { src: "/images/_MG_9335.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_0568.webp", category: "Portré", alt: "Portré fotó" },
  { src: "/images/Rendszamnelkul-7651.webp", category: "Autók", alt: "Autó fotó" },
  { src: "/images/kata_kismama/_47A8484-2.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_0490.webp", category: "Portré", alt: "Portré fotó" },
  { src: "/images/_MG_8992.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_7636.webp", category: "Autók", alt: "Autó fotó" },
  { src: "/images/kata_kismama/_47A8279-2.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_1136.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_0097-2.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/kata_kismama/_47A9104-2.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_9219.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/kata_kismama/B56E8960-7048-4562-BD9A-C27C2E6FEE1A.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_0017-2.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_8775.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
  { src: "/images/_MG_8634.webp", category: "Család/Kismama", alt: "Családi vagy kismama fotó" },
];

const categories = ["Összes", "Esküvő", "Portré", "Család/Kismama", "Autók", "Kutyusok", "Motorok"];

export default function PortfolioClient() {
  const [activeCategory, setActiveCategory] = useState("Összes");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Képek szűrése az aktív kategória alapján
  const filteredImages = portfolioImages.filter(
    (img) => activeCategory === "Összes" || img.category === activeCategory
  );

  return (
    <main className="bg-[#F9F5F1] min-h-screen pt-32 pb-24 selection:bg-[#C79C8D] selection:text-white">
      
      {/* 1. HEADER (Nagyon letisztult, elegáns) */}
      <section className="container mx-auto px-6 text-center mb-16 max-w-4xl">
        <motion.p 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-[#C79C8D] font-bold uppercase tracking-[0.3em] text-xs mb-6"
        >
          Mestermunkák
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold font-akaya text-[#5A4A42] mb-8"
        >
          A pillanatok, <br/> <span className="text-shimmer italic">amiket megőrzök.</span>
        </motion.h1>
      </section>

      {/* 2. SZOLID SZŰRŐ (Minimalista, szöveges navigáció) */}
      <section className="container mx-auto px-6 mb-16">
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 border-b border-[#5A4A42]/10 pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="relative text-sm md:text-base font-medium tracking-wide pb-2 transition-colors duration-300"
            >
              <span className={activeCategory === category ? "text-[#5A4A42] font-bold" : "text-[#5A4A42]/50 hover:text-[#C79C8D]"}>
                {category}
              </span>
              {/* Finom animált vonal az aktív elem alatt */}
              {activeCategory === category && (
                <motion.div 
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C79C8D]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* 3. MASONRY GALÉRIA (Rács elrendezés lágy animációkkal) */}
      <section className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          layout 
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, index) => (
              <motion.div
                layout
                key={img.src} // A kulcs nagyon fontos az animációhoz!
                initial={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(12px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                transition={{ duration: 0.6, delay: Math.min(index * 0.03, 0.4), ease: "easeOut" }}
                style={{ perspective: 800 }}
                className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow"
                onClick={() => setLightboxIndex(portfolioImages.indexOf(img))} // Eredeti indexet keresünk a Lightboxhoz
              >
                <TiltCard tiltStrength={6} glare={false}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={1200}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={90}
                  />

                  {/* Finom hover effektus (Kamera ikon + Kategória név) */}
                  <div className="absolute inset-0 bg-[#5A4A42]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                     <Camera className="text-white w-8 h-8 mb-3 drop-shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300" />
                     <span className="text-white text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                       {img.category}
                     </span>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Ha üres lenne egy kategória (bár a mostani listában nincs ilyen) */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20 text-[#5A4A42]/50 font-light">
            Ebben a kategóriában jelenleg nincsenek feltöltve képek.
          </div>
        )}
      </section>

      {/* 4. LIGHTBOX (Képnagyító) */}
      <Lightbox
        index={lightboxIndex}
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        // Itt a teljes listát adjuk át, hogy a nagyítóban lehessen lapozni is
        slides={portfolioImages.map(img => ({ src: img.src, alt: img.alt }))}
        plugins={[Zoom]}
        styles={{ container: { backgroundColor: "rgba(38, 31, 29, 0.98)" } }}
      />
    </main>
  );
}