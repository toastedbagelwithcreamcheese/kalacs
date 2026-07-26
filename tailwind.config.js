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

        // --- Rendezvényes oldal (PRIZMA) ---
        evDisplay: ["var(--font-schibsted)", "sans-serif"],
        evBody: ["var(--font-geist-sans)", "sans-serif"],
        evMono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        'pattern': "url('/liquid-cheese.svg')", // Háttérminta betöltése
      },

      // === RENDEZVÉNYES OLDAL — „PRIZMA" ===
      // Minden kulcs "ev" névtérben, hogy a fotós oldal tokenjeit ne érintse.
      // Forrás: docs/RENDEZVENY-TERV.md 4.2
      colors: {
        ev: {
          bg: "#FAFAF8",        // meleg papír
          surface: "#FFFFFF",
          sunk: "#F2F1EE",
          line: "rgba(25,23,35,0.10)",
          line2: "rgba(25,23,35,0.20)",

          ink: "#191723",       // mély tinta, lila árnyalattal -- NEM fekete
          ink2: "#5A5568",
          ink3: "#8B8698",

          brand: "#2E2A6B",     // mély indigó: minden művelet színe
          brandSoft: "#EBEAF5",

          // Kategória-spektrum. A pasztell csak nagy felületen,
          // a "deep" csak apró jelzésen (badge, vonal, ikon).
          konferencia: { soft: "#C6CEF7", deep: "#3B4BB8" },
          egyetemi: { soft: "#C2E4D3", deep: "#2C7A5B" },
          offroad: { soft: "#F0DCB6", deep: "#96681C" },
          sport: { soft: "#C2DEF0", deep: "#236D95" },
          kultura: { soft: "#DFC8EE", deep: "#79489C" },
          maganunnep: { soft: "#F5CDD9", deep: "#B24870" },
        },
      },
      transitionTimingFunction: {
        "ev-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ev-in": "cubic-bezier(0.7, 0, 0.84, 0)",
      },
      maxWidth: {
        ev: "1440px",
      },
      borderRadius: {
        ev: "8px",
        "ev-sm": "4px",
      },
      boxShadow: {
        // Színezett, az indigóból származó árnyék. Szürke drop shadow tilos:
        // az teszi olcsóvá a világos felületeket.
        ev: "0 12px 32px -16px rgba(46,42,107,0.18)",
        "ev-lg": "0 24px 60px -24px rgba(46,42,107,0.22)",
      },
    },
  },
  plugins: [],
};
