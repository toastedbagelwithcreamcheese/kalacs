module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        akaya: ["Akaya Kanadaka", "sans-serif"],
        anton: ["Anton", "san-serif"],

        // --- Rendezvényes oldal (NOIR) ---
        evDisplay: ["var(--font-bebas)", "var(--font-schibsted)", "sans-serif"],
        evBody: ["var(--font-jakarta)", "sans-serif"],
        evMono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        'pattern': "url('/liquid-cheese.svg')", // Háttérminta betöltése
      },

      // === RENDEZVÉNYES OLDAL — „NOIR" ===
      // Minden kulcs "ev" névtérben, hogy a fotós oldal tokenjeit ne érintse.
      // Az igazi forrás a rendezveny.css változó-blokkja; ez csak a
      // Tailwind-oldali tükre, hogy szükség esetén osztályból is elérhető.
      colors: {
        ev: {
          bg: "#08060F",        // mély, enyhén lila fekete -- NEM tiszta #000
          surface: "#0E0B1A",
          sunk: "#151024",
          line: "rgba(255,255,255,0.09)",
          line2: "rgba(255,255,255,0.20)",

          ink: "#F6F4FC",
          ink2: "rgba(246,244,252,0.66)",
          ink3: "rgba(246,244,252,0.40)",

          brand: "#FFFFFF",     // sötét alapon a fehér a legerősebb művelet
          brandSoft: "rgba(255,255,255,0.08)",
          glow: "#A855F7",

          // Kategória-spektrum sötét változatban. A `deep` a világító
          // akcentus (szöveg, ikon, glow), a `soft` a halvány tónus-alap.
          konferencia: { soft: "rgba(109,139,255,0.16)", deep: "#6D8BFF" },
          egyetemi: { soft: "rgba(52,211,153,0.16)", deep: "#34D399" },
          offroad: { soft: "rgba(245,165,36,0.16)", deep: "#F5A524" },
          sport: { soft: "rgba(56,189,248,0.16)", deep: "#38BDF8" },
          kultura: { soft: "rgba(168,85,247,0.16)", deep: "#A855F7" },
          maganunnep: { soft: "rgba(244,114,182,0.16)", deep: "#F472B6" },
        },
      },
      transitionTimingFunction: {
        "ev-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ev-in": "cubic-bezier(0.7, 0, 0.84, 0)",
        "ev-cine": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      maxWidth: {
        ev: "1440px",
      },
      borderRadius: {
        ev: "16px",
        "ev-sm": "10px",
      },
      boxShadow: {
        // Sötét alapon a mély, tág árnyék adja a lebegést; a színes
        // "glow"-t az akcentus külön rétegben viszi (.ev-glow-spot).
        ev: "0 25px 50px -12px rgba(0,0,0,0.7)",
        "ev-lg": "0 40px 90px -30px rgba(0,0,0,0.9)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
