// Globális szövegek és elérhetőség a rendezvényes oldalhoz.
// Egy helyen szerkeszthető -- a nav, a lábléc és a CTA-blokkok innen olvasnak.

export const EVENT_SITE = {
  baseUrl: "https://kovacsbalintfoto.hu",
  basePath: "/rendezveny",

  brand: {
    name: "Kovács Bálint",
    suffix: "Rendezvény",
    tagline: "Fotó, videó és social tartalom rendezvényekre",
  },

  // TODO: valós számokra cserélni, amint megvannak (terv 15. fejezet)
  stats: [
    { value: "180+", label: "Rendezvény" },
    { value: "6", label: "Év tapasztalat" },
    { value: "48 óra", label: "Átlagos átfutás" },
  ],

  contact: {
    email: "kapcsolat@kovacsbalintfoto.hu",
    phone: "+36 30 872 3777",
    phoneHref: "tel:+36308723777",
    area: "Zalaegerszeg, Budapest és egész Magyarország",
    responseTime: "Munkanapokon 24 órán belül válaszolok.",
  },

  social: {
    instagram: "https://www.instagram.com/k_balintfoto/",
    facebook: "https://www.facebook.com/profile.php?id=61577861518379",
  },

  // A fotós oldalra visszamutató link -- mindkét irányba linkelünk (terv 10.5)
  photoSite: {
    href: "/",
    label: "Fotográfia",
  },
};

// A navigáció fő pontjai (a kategóriák külön, a categories.js-ből jönnek)
export const EVENT_NAV = [
  { href: "/rendezveny/munkaim", label: "Munkáim" },
  { href: "/rendezveny/video", label: "Videó & VSL" },
  { href: "/rendezveny/csomagok", label: "Csomagok" },
  { href: "/rendezveny/rolam", label: "Rólam" },
];

export const EVENT_CTA = {
  href: "/rendezveny/ajanlatkeres",
  label: "Ajánlatkérés",
};
