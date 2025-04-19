"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Link from "next/link";
import ParosGallery from "@/components/parosjegyesgallery";

const packages = [
  {
    title: "Alap csomag",
    price: "29.900 Ft",
    duration: "30 perc fotózás",
    features: [
      "10-15 profi retusált kép",
      "1 helyszín",
      "Összes kép digitálisan elküldve",
    ],
  },
  {
    title: "Normál csomag",
    price: "34.900 Ft",
    duration: "60 perc fotózás",
    features: [
      "20-25 profi retusált kép",
      "1 helyszín",
      "Összes kép digitálisan elküldve",
    ],
  },
  {
    title: "Maxi csomag",
    price: "44.900 Ft",
    duration: "90 perc fotózás",
    features: [
      "25-30 profi retusált kép",
      "Akár 2 helyszín is",
      "Összes kép digitálisan elküldve",
    ],
  },
  {
    title: "Prémium csomag",
    price: "54.900 Ft",
    duration: "120 perc fotózás",
    features: [
      "Összes kép resutálva digitálisan elküldve",
      "Akármennyi helyszín",
      "Összes kép digitálisan elküldve",
    ],
  },
];

const faqData = [
  {
    question: "Mi a különbség a páros és a jegyesfotózás között?",
    answer: `
          <p><strong>Jegyesfotózás</strong> kifejezetten az esküvő előtti időszakhoz kapcsolódik, és gyakran a meghívók, dekorációk vagy vendégkönyvek készítéséhez használják a képeket. Ez egy jó alkalom arra is, hogy megismerjük egymást, és megszokjátok a kamerát, így az esküvő napján sokkal felszabadultabbak lehettek.</p>
          <p><strong>Páros fotózás</strong> ezzel szemben bármikor kérhető. Nem kell hozzá különleges alkalom – egyszerűen csak szeretnétek megörökíteni szerelmeteket. Gyakran választják évfordulók, Valentin-nap, születésnapok vagy romantikus meglepetés alkalmával. Mindkét típus célja, hogy életre szóló emléket teremtsen a legszebb pillanataitokról.</p>
        `,
  },
  {
    question: "Hol történik az autófotózás?",
    answer:
      "Az autófotózás történhet kültéren, vagy akár egy előre egyeztetett, különleges helyszínen is, amely illik az autó karakteréhez.",
  },
  {
    question: "Mennyi ideig tart egy fotózás?",
    answer:
      "Az autófotózás időtartama a csomagtól és a helyszíntől függ, általában 1-2 órát vesz igénybe.",
  },
  {
    question: "Milyen időjárási körülmények ideálisak a fotózáshoz?",
    answer:
      "A legjobb fényviszonyokat naplementekor vagy felhős időben lehet elérni. Esős időben is lehet különleges hangulatú képeket készíteni.",
  },
  {
    question: "Lehet-e éjszakai vagy mozgás közbeni fotókat is készíteni?",
    answer:
      "Természetesen lehetséges, de ez esetben több előzetes egyeztetésre van szükséges, például ha utcán szeretnél mozgás közbeni képeket, akkor szükség lesz egy kísérő autóra is.",
  },
  {
    question: "Mikor kapom meg a kész képeket?",
    answer:
      "A képek kidolgozása és retusálása általában 1 hetet vesz igénybe. Ha sürgős, természetesen megpróbálok alkalmazkodni.",
  },
  {
    question: "Van lehetőség több autó fotózására is egy időpontban?",
    answer:
      "Természetesen! Ha több autóról szeretnél képeket, előre egyeztetjük a részleteket és a csomagot ennek megfelelően alakítjuk ki.",
  },
];

export default function PortreFotozas() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="max-w-6xl mx-auto p-6 text-center">
      <div className="flex items-center my-6">
        <Image
          src="/images/zsirii-2212.jpg"
          width={200}
          height={200}
          className="rounded-full mr-4"
          alt="Portré fotózás"
        />
        <h1 className="text-4xl font-bold text-[#C79984]">
          Páros vagy Jegyesfotózás– Örökítsétek Meg Szerelmetek Legszebb
          Pillanatait
        </h1>
      </div>
      <div className="my-8 text-left text-2xl space-y-6 text-[#C79984]">
        <p className="text-base  text-gray-700">
          A páros és jegyesfotózás egy gyönyörű módja annak, hogy megörökítsétek
          kapcsolatotok legszebb pillanatait. Legyen szó egy romantikus sétáról
          a természetben, egyedi helyszínekről vagy éppen Debrecen hangulatos
          utcáiról, a célom, hogy a fotók visszaadják szerelmetek történetét.
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-semibold text-[#C79984 font-[NotoSerifArmenian]">
              Miért érdemes páros vagy jegyesfotózást választani?
            </h3>
            <ul className="list-disc ml-4 text-[16px] text-[#7A7A7A]">
              <li>
                <strong>Jegyesfotózás</strong>: Az esküvő előtti fotózás nemcsak
                arra jó, hogy gyönyörű emlékeket készítsetek, hanem segít
                megszokni a kamerát, így az esküvő napján még felszabadultabbak
                lehettek. Ezeket a képeket felhasználhatjátok az esküvői
                meghívókhoz, dekorációhoz vagy vendégkönyvhöz.
              </li>
              <li>
                <strong>Páros fotózás</strong>: Nem kell különleges alkalom,
                hogy megünnepeljétek szerelmeteket. Az évfordulók, közös
                utazások vagy egyszerű hétköznapok is megérdemlik, hogy
                emlékezetessé váljanak.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-[#C79984 font-[NotoSerifArmenian]">
              A tökéletes helyszínek Zalaegerszeg és környékén
            </h3>
            <ul className="list-disc ml-4 text-[16px] text-[#7A7A7A]">
              <li>
                <strong>Szabadtéri helyszínek</strong>: A Nagyerdő, a Hortobágy
                vagy a Vekeri-tó ideális hátteret biztosítanak a természetes és
                meghitt képekhez.
              </li>
              <li>
                <strong>Stúdiófotózás</strong>: Ha intimebb, művészibb képeket
                szeretnétek, a stúdió nyugodt, kreatív környezetet kínál.
              </li>
              <li>
                <strong>Egyedi helyszínek</strong>: Van egy különleges
                helyszínötletetek? Szívesen megvalósítom az elképzeléseiteket,
                hogy a fotók igazán egyediek legyenek.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <motion.section
        className=" py-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#C79984]">
            Páros fotózás Csomagajánlatok
          </h1>
          <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
            Válaszd ki a számodra tökéletes csomagot!
          </p>
          <p className="text-[#8b614e] font-bold mt-1 max-w-3xl mx-auto text-xl">
            Minden csomag teljesen testreszabható a Te igyéneid szerint! Egyedi
            ajánlatokkal keress nyugodtan Emailen vagy telefonon!
          </p>
        </div>

        <div className="container mx-auto mt-12 px-6 grid md:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-semibold text-[#C79984]">
                {pkg.title}
              </h3>
              <p>{pkg.price} </p>
              <p className="text-gray-700 mt-2">{pkg.duration}</p>
              <ul className="mt-4 text-gray-700 space-y-2 text-left">
                {pkg.features.map((feature, i) => (
                  <li key={i}>✔ {feature}</li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-block mt-4 px-6 py-2 border border-[#646C5E] text-[#646C5E] rounded-lg font-semibold hover:text-black hover:border-black transition-all duration-200 transform hover:scale-105"
              >
                Foglalj időpontot!
              </Link>
            </motion.div>
          ))}
        </div>
        {/* Piros csillagos magyarázatok */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-4 p-4 border-t border-gray-300 text-center mx-auto max-w-md text-sm"
        >
          <p className="text-gray-700">
            <span className="font-bold">
              Helyszín<span className="text-red-500">*</span>:
            </span>
            Természetesen ez is bármikor testreszabható, nem feltétlen kell egy
            helyszínen fotózni ha belefér az időbe.
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-bold">
              Időtartam<span className="text-red-500">*</span>:
            </span>{" "}
            A fotózás hossza rugalmasan módosítható az igényeid szerint.
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-bold">
              Ár<span className="text-red-500">*</span>:
            </span>
            Az ügyfeleim elégedettsége számomra a legfontosabb, ezért ha az ár
            magasnak tűnik, bátran jelezd, és igyekszünk megtalálni a megfelelő
            megoldást!
          </p>
        </motion.div>
      </motion.section>
      <div>
        <ParosGallery />
      </div>
      {/* GYIK */}
      <div className="max-w-3xl mx-auto mt-7">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Gyakran Ismétlődő Kérdések
        </h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-gray-300 pb-2">
              <button
                className="w-full text-left font-semibold text-lg text-gray-700 flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {item.question}
                <span>{openIndex === index ? "▲" : "▼"}</span>
              </button>
              {openIndex === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 text-gray-600 text-justify"
                  dangerouslySetInnerHTML={{ __html: item.answer }} // HTML renderelés
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
