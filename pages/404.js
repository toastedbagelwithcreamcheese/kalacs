import Link from "next/link";
import Head from "next/head";

/* A pages/ útvonalak (jogi oldalak, galéria) nem az app/not-found.js-t kapják,
   ezért ugyanaz a 404 itt is kell — különben a gyári angol lap jön vissza. */
const LINKS = [
  { href: "/", label: "Kezdőlap" },
  { href: "/szolgaltatasok", label: "Szolgáltatások" },
  { href: "/portfolio", label: "Portfólió" },
  { href: "/velemenyek", label: "Vélemények" },
  { href: "/about", label: "Rólam" },
  { href: "/contact", label: "Kapcsolat" },
];

export default function Custom404() {
  return (
    <>
      <Head>
        <title>A keresett oldal nem található | Kovács Bálint Fotográfia</title>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <main className="min-h-screen bg-[#F9F5F1] flex items-center justify-center px-6 py-24">
        <div className="max-w-xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C79C8D] mb-6">
            404
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-[#5A4A42] mb-6">
            Ez az oldal nincs meg
          </h1>
          <p className="text-[#5A4A42]/75 leading-relaxed font-light mb-10">
            Lehet, hogy elírtad a címet, vagy időközben átkerült máshova. Alább
            megtalálod a főbb oldalakat — ha konkrétan keresel valamit, írj
            nyugodtan.
          </p>
          <nav className="flex flex-wrap justify-center gap-3">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-5 py-2.5 rounded-full bg-white border border-[#5A4A42]/10 text-sm font-bold text-[#5A4A42] hover:text-[#C79C8D] hover:border-[#C79C8D] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </main>
    </>
  );
}
