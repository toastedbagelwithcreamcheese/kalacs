// pages/_app.js
import Head from 'next/head'; // 1. FONTOS: Head komponens importálása a next/head-ből
import '@/app/globals.css'; // Feltételezve, hogy a globális stíluslapod továbbra is itt található

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* 2. A Head komponens használata a globális meta adatokhoz */}
      <Head>
        {/* Az `export const metadata = { title: "..." }` megfelelője: */}
        <title>Kovács Bálint Fotó</title>

        {/* Az `icons: { icon: "..." }` megfelelője: */}
        <link rel="icon" href="/images/favicon.ico" />
        
        {/* Hozzáadtam pár további hasznos meta taget is az oldaladhoz */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Professzionális fotózás Zalaegerszegen: esküvő, portré, család, páros, autó és kutyus fotózás." />
        {/* Ide jöhetnek majd további SEO-val kapcsolatos meta tagek is a jövőben */}
      </Head>
      
      {/* A tényleges oldal komponens, ami megjelenik */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;