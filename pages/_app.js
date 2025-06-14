// pages/_app.js

// FONTOS: Ellenőrizd, hogy a globális stíluslapod hol található!
// Általában 'app/globals.css' vagy 'styles/globals.css'. Igazítsd a sösvényt, ha szükséges.
import '@/app/globals.css'; 

function MyApp({ Component, pageProps }) {
  // Ez a komponens fogja "becsomagolni" az összes oldalt a 'pages' mappában,
  // így mindegyik megkapja a globális stílusokat.
  return <Component {...pageProps} />;
}

export default MyApp;