// components/LegalPageLayout.js
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NavbarClient from "./NavbarClient";
import Footer from "./Footer";

const LegalPageLayout = ({ title, effectiveDate, children }) => {
  return (
    <>
      <Head>
        <title>{`${title} – Kovács Bálint Fotó`}</title>
      </Head>
      <NavbarClient />
      <div className="bg-[#F9F5F1] pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#5A4A42]/50 hover:text-[#C79C8D] text-xs font-bold uppercase tracking-[0.2em] transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Vissza a főoldalra
          </Link>

          <h1 className="text-4xl sm:text-5xl font-bold font-akaya text-[#5A4A42] mb-2">
            {title}
          </h1>
          {effectiveDate && (
            <p className="text-[#5A4A42]/40 text-xs font-light tracking-wide mb-10">
              Hatályos: {effectiveDate}
            </p>
          )}

          <div
            className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-sm border border-[#5A4A42]/5 mt-10
              prose prose-lg max-w-none
              prose-headings:font-akaya prose-headings:text-[#5A4A42] prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-[#5A4A42]/10 first:prose-h2:mt-0
              prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
              prose-p:text-[#5A4A42]/70 prose-p:font-light prose-p:leading-relaxed
              prose-li:text-[#5A4A42]/70 prose-li:font-light
              prose-strong:text-[#5A4A42] prose-strong:font-semibold
              prose-a:text-[#C79C8D] prose-a:no-underline hover:prose-a:underline
              prose-em:text-[#5A4A42]/50"
          >
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LegalPageLayout;
