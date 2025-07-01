// components/LegalPageLayout.js
import Head from "next/head";

const LegalPageLayout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{`${title} – Kovács Bálint Fotó`}</title>
      </Head>
      <div className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-amber-500" style={{ fontFamily: "Noto Serif Armenian, sans-serif" }}>
            {title}
          </h1>
          <div className="prose prose-lg max-w-none text-gray-700">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default LegalPageLayout;