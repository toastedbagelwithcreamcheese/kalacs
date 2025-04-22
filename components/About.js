"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CircleCheck } from "lucide-react";

const About = () => {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 py-16 relative">
        {/* Fejléc */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-4xl font-bold text-[#C1947C]"
        >
          Kovács Bálint – Bálint Fotó
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-lg text-gray-600 mt-2"
        >
          Zalaegerszegi fotós, aki emlékeket teremt
        </motion.p>

        {/* Tartalom */}
        <div className="mt-12 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 flex justify-center"
          >
            <Image
              src="/images/zsirii-2212.jpg"
              alt="Kovács Bálint"
              width={500}
              height={500}
              className="rounded-full shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-gray-700"
          >
            {" "}
            <p className="mb-4">
              {" "}
              Üdvözöllek! Kovács Bálint vagyok, a <strong>
                Bálint Fotó
              </strong>{" "}
              zalaegerszegi fotósa. Szenvedéllyel és elhivatottsággal azon
              dolgozom, hogy megörökítsem életed legszebb és legfontosabb
              pillanatait. Legyen szó esküvőről, meghitt családi eseményről vagy
              kifejező portréfotózásról, számomra a legfontosabb, hogy a képeim
              visszaadják az őszinte érzelmeket és az események valódi
              hangulatát.{" "}
            </p>{" "}
            <p className="mb-4">
              {" "}
              <strong>
                {" "}
                Miért válassz engem, ha Zalaegerszegen keresel fotóst?{" "}
              </strong>{" "}
              <br /> 2023 óta foglalkozom fotózással, és ez idő alatt
              elköteleztem magam amellett, hogy folyamatosan fejlődjek és a
              maximumot nyújtsam. Minden megbízás egy új lehetőség számomra,
              hogy valami egyedit alkossak, mindig az ügyfeleim elképzeléseit és
              igényeit helyezve előtérbe.{" "}
            </p>{" "}
            <p className="mb-4">
              {" "}
              Munkám során a természetességre és az őszinteségre helyezem a
              hangsúlyt. Hiszem, hogy az elkapott, spontán pillanatok, a valódi
              mosolyok és a meghitt érzelmek azok, amelyek igazán különlegessé
              és időtállóvá teszik a fotókat.{" "}
            </p>{" "}
            <p className="mb-4">
              {" "}
              <strong>
                Képek, amelyek hosszú éveken át mesélnek
              </strong> <br /> Egy jól elkészített fotó segítségével bármikor
              újraélheted a legdrágább pillanatokat. Szolgáltatásaim célja, hogy
              ne csupán képeket kapj, hanem olyan kézzelfogható emlékeket,
              amelyek generációkon átívelve is megőrzik az élményeidet és
              mesélnek Rólad, Rólatok.{" "}
            </p>{" "}
            <p className="mb-4">
              {" "}
              Modern, professzionális fotós felszereléssel dolgozom, és
              folyamatosan képzem magam, hogy mindig a lehető legjobb minőséget
              biztosíthassam. Az utómunka során nagy gondot fordítok arra, hogy
              a képek színei, tónusai és részletei tökéletes összhangban
              legyenek, valamint igazodjanak a te stílusodhoz.{" "}
            </p>{" "}
            <p className="mb-4">
              {" "}
              <strong>Keress bizalommal!</strong> <br /> Ha esküvői fotózást
              tervezel, családi képeket szeretnél, vagy egyedi portréfotózásra
              vágysz Zalaegerszegen vagy környékén, vedd fel velem a
              kapcsolatot! Örömmel segítek megvalósítani az elképzeléseidet,
              hogy együtt hozhassunk létre maradandó emlékeket.{" "}
            </p>{" "}
          </motion.div>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center text-4xl font-akaya mt-16 text-[#c79c8d]"
        >
          Minden, amire szükséged lehet az emlékek megörökítéséhez
        </motion.h3>
      </section>

      {/* A teljes szélességű háttér */}
      <div className="w-full bg-pattern bg-cover bg-center mt-0 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
          {[
            { title: "Fotózás", desc: "Emlékek örökre.", icon: "📸" },
            { title: "Videózás", desc: "Élő pillanatok.", icon: "🎥" },
            { title: "Fotónyomtatás", desc: "Azonnal kézben.", icon: "🖼️" },
            {
              title: "Fotóautomata",
              desc: "Szórakozás könnyedén.",
              icon: "📷",
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-200"
            >
              <div className="text-4xl">{service.icon}</div>
              <h4 className="text-lg font-semibold mt-4">{service.title}</h4>
              <p className="text-gray-500">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <section className="bg-[#EAEAEA] py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
          {/* Bal oldal - Szöveg */}
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-[#C79984] mb-6">
              Miért válassz{" "}
              <span className="text-[#C79984] font-bold">Engem?</span>
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Mert a pillanatok megörökítése nem csupán a munkám, hanem a
              szenvedélyem!
            </p>

            <ul className="space-y-4">
              {[
                {
                  title: "Személyre szabott figyelem",
                  text: "Minden ügyfél egyedi, és ezt tiszteletben tartom.",
                },
                {
                  title: "Profi minőség",
                  text: "Évek tapasztalatával, a legjobb eszközökkel dolgozom.",
                },
                {
                  title: "Rugalmasság",
                  text: "Hozzád igazodom, legyen szó időpontról vagy elképzelésekről.",
                },
                {
                  title: "Életre szóló emlékek",
                  text: "Minden kép egy történetet mesél el.",
                },
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <CircleCheck className="text-[#C79984]" size={28} />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Jobb oldal - Képek */}
          <motion.div
            className="md:w-1/2 grid grid-cols-3 gap-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              "/images/BogyoLightGelPortraits-3.jpg",
              "/images/FavBogyorol--2.jpg",
              "/images/FavBogyorol-.jpg",
              "/images/FavBogyorolCOLOR--2.jpg",
              "/images/FavBogyorolCOLOR-.jpg",
              "/images/KekPirosBogy-.jpg",
              "/images/zsirii-2212.jpg",
              "/images/BogyoLightGelPortraits-3.jpg",
              "/images/zsirii-2212.jpg",
            ].map((src, index) => (
              <motion.img
                key={index}
                src={src}
                alt={`Galéria kép ${index + 1}`}
                className="w-full rounded-lg shadow-md"
                whileHover={{ scale: 1.05 }}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
