"use client";

import { useEffect, useSyncExternalStore } from "react";
import Script from "next/script";

/**
 * Google Analytics 4, hozzájárulás mögé kötve (Consent Mode v2).
 *
 * Miért így és nem egyszerűbben: a GA4 sütit helyez el, ahhoz pedig az ePrivacy
 * irányelv szerint előzetes hozzájárulás kell. A Consent Mode v2 megoldása az,
 * hogy a mérés ELINDUL, de alapból minden tárolási jelző `denied` — ilyenkor a
 * Google süti és azonosító nélkül, névtelen jelzésekből becsül. Elfogadás után
 * kapcsol át teljes mérésre.
 *
 * FONTOS a sorrend: a `consent default` hívásnak a `config` ELŐTT kell lefutnia,
 * különben az első oldalletöltés még hozzájárulás nélkül is sütizne. Ezért van
 * a két Script külön, és ezért a beágyazott szkript az első.
 *
 * Az oldal hibrid (app/ és pages/ router is él), ezért ez a komponens KÉT helyre
 * kerül be: app/layout.js és pages/_app.js. Enélkül a jogi lapokon és a
 * galériákon nem futna mérés.
 */
const GA_ID = "G-MQFN0PVM0E";
const KEY = "kbf-consent";
const EVT = "kbf-consent-change";

function readConsent() {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null; // privát mód: nem tudunk dönteni, marad a kérdés
  }
}
function subscribe(cb) {
  addEventListener(EVT, cb);
  addEventListener("storage", cb);
  return () => { removeEventListener(EVT, cb); removeEventListener("storage", cb); };
}
const noop = () => () => {};

export default function Analytics() {
  /* useSyncExternalStore, hogy a szerveren és az első kliens-rendereléskor is
     `null` legyen: enélkül a sáv felvillanna azoknál is, akik már döntöttek. */
  const consent = useSyncExternalStore(subscribe, readConsent, () => null);
  const ready = useSyncExternalStore(noop, () => true, () => false);

  useEffect(() => {
    if (!ready || !consent) return;
    const v = consent === "granted" ? "granted" : "denied";
    window.gtag?.("consent", "update", {
      analytics_storage: v, ad_storage: v, ad_user_data: v, ad_personalization: v,
    });
  }, [ready, consent]);

  const decide = (v) => {
    try { localStorage.setItem(KEY, v); } catch { /* privát mód */ }
    dispatchEvent(new Event(EVT));
  };

  return (
    <>
      <Script id="ga-consent" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />

      {ready && consent === null && (
        <div
          role="dialog"
          aria-label="Sütik és mérés"
          className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-[max(16px,env(safe-area-inset-bottom))]"
        >
          <div className="mx-auto flex max-w-[680px] flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border border-white/10 bg-[#261F1D]/95 px-5 py-4 text-[0.9rem] leading-relaxed text-[#F9F5F1] shadow-2xl backdrop-blur-md">
            <span className="min-w-[220px] flex-1">
              Mérem, hányan és honnan érkeznek az oldalra, hogy tudjam, mi működik. Rendben van?{" "}
              <a href="/cookie" className="text-[#C79C8D] underline underline-offset-2">Részletek</a>
            </span>
            <span className="flex gap-2">
              <button
                type="button"
                onClick={() => decide("denied")}
                className="min-h-10 rounded-full border border-white/20 px-4 text-[0.88rem] font-semibold text-[#F9F5F1]/85 transition-colors hover:border-[#F9F5F1] hover:text-[#F9F5F1]"
              >
                Nem
              </button>
              <button
                type="button"
                onClick={() => decide("granted")}
                className="min-h-10 rounded-full bg-[#C79C8D] px-5 text-[0.88rem] font-bold text-[#261F1D] transition-colors hover:bg-[#F9F5F1]"
              >
                Rendben
              </button>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
