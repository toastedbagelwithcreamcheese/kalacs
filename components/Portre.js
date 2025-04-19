"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import PortreGallery from "@/components/portregallery";
import "yet-another-react-lightbox/styles.css";
import Link from "next/link";


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

export default function PortreFotozas() {

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
          Portré fotózás Zalaegerszegen – Egyedi és Profi Képek Rólad
        </h1>
      </div>
      <div className="my-8 text-left text-2xl space-y-6 text-[#C79984] font-serif" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}> 
    <h2 className="text-2xl font-semibold text-[#C79984]">Miért válaszd a portré fotózást Zalaegerszegen?</h2>
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold">1. Önbizalom-növelés</h3>
        <p className="text-lg  text-gray-700">
          Egy profi portréval újra felfedezheted magad. A képek nemcsak a külsődet mutatják meg, hanem azokat az érzéseket és erőt, amelyek belőled áradnak. A fotózás során olyan képek készülnek, amelyek magabiztossággal és büszkeséggel töltenek el.
        </p>
      </div>
      <div>
        <h3 className="font-semibold">2. Üzleti portrék – Profi megjelenés</h3>
        <p className="text-lg text-gray-700">
          Debreceni stúdiómban modern és elegáns üzleti portrék készülnek, amelyek tökéletesek LinkedIn profilhoz, céges bemutatkozáshoz vagy önéletrajzhoz. A képek professzionális megjelenést biztosítanak, kiemelve a stílusodat és magabiztosságodat.
        </p>
      </div>
      <div>
        <h3 className="font-semibold">3. Ajándék magadnak vagy szeretteidnek</h3>
        <p className="text-lg text-gray-700">
          Egy szép portré tökéletes meglepetés születésnapra, évfordulóra, vagy egyszerűen csak azért, hogy megajándékozd magad egy különleges élménnyel. Egyedi és személyre szabott képek, amelyek örökre emlékek maradnak.
        </p>
      </div>
      <div>
        <h3 className="font-semibold">4. A nőiesség megünneplése</h3>
        <p className="text-lg text-gray-700">
          A portré fotózás a nőiesség és egyediség ünnepléséről szól. Finom fények, elegáns beállítások és a legjobb oldalad megmutatása a cél. Legyen szó romantikus vagy modern stílusról, a végeredmény mindig harmonikus és természetes.
        </p>
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
            Portré fotózás Csomagajánlatok
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
          <PortreGallery />
          </div>
      </div>
  );
}
