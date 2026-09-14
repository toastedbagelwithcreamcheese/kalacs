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

/** Űrlapokból hívható eseményküldés. Ha a gtag még nem töltött be, némán elszáll. */
export function track(name, params = {}) {
  try {
    window.gtag?.("event", name, params);
    /* A Meta saját szótárat használ: az ajánlatkérés náluk „Lead". */
    if (name === "ajanlatkeres") window.fbq?.("track", "Lead", params);
  } catch { /* a mérés soha nem törheti el az űrlapot */ }
}
/* Meta Pixel. Környezeti változóból jön, hogy a kód akkor is helyes maradjon,
   amíg nincs pixel: ha nincs beállítva, egyetlen Meta-kérés sem indul.
   Beállítás: Netlify → Site configuration → Environment variables →
   NEXT_PUBLIC_META_PIXEL_ID = <a pixel 15-16 jegyű azonosítója>. */
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

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

  /* Konverziómérés. A GA4-ben csak akkor lesz „kulcsesemény", ha egyáltalán
     érkezik ilyen esemény — eddig egy sem volt: a mérés a látogatók számát
     tudta, azt nem, hányan hívnak vagy írnak. Delegált figyelő, mert a tel:
     és mailto: hivatkozások öt különböző komponensben élnek. */
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        window.gtag?.("event", "phone_click", { link_url: href, page_path: location.pathname });
      } else if (href.startsWith("mailto:")) {
        window.gtag?.("event", "email_click", { link_url: href, page_path: location.pathname });
      }
    };
    addEventListener("click", onClick, true);
    return () => removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!ready || !consent) return;
    const v = consent === "granted" ? "granted" : "denied";

    /* BUKTATÓ: a gtag és az fbq `afterInteractive` szkriptekből jön, azok
       viszont a hidratálás UTÁN kerülnek a lapra. Ez a hatás korábban fut,
       mint ahogy a `window.fbq` létezne, és az optional chaining némán
       elnyelné a hívást — a Meta Pixel emiatt „revoke" állapotban ragadna,
       és egyetlen eseményt sem küldene el. Ezért megvárjuk. */
    let tries = 0;
    const apply = () => {
      const hasGtag = typeof window.gtag === "function";
      const hasFbq = typeof window.fbq === "function";
      if (hasGtag) {
        window.gtag("consent", "update", {
          analytics_storage: v, ad_storage: v, ad_user_data: v, ad_personalization: v,
        });
      }
      /* A Meta saját kapcsolója: amíg „revoke", a könyvtár sorba teszi az
         eseményeket, és egyet sem küld el. */
      if (hasFbq) window.fbq("consent", v === "granted" ? "grant" : "revoke");
      return hasGtag && (hasFbq || !META_PIXEL_ID);
    };

    if (apply()) return;
    const t = setInterval(() => {
      tries += 1;
      if (apply() || tries > 40) clearInterval(t); // legfeljebb ~10 másodperc
    }, 250);
    return () => clearInterval(t);
  }, [ready, consent]);

  const decide = (v) => {
    try { localStorage.setItem(KEY, v); } catch { /* privát mód */ }
    dispatchEvent(new Event(EVT));
  };

  return (
    <>
      <Script id="ga-consent" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
var kbfC=(function(){try{return localStorage.getItem('${KEY}')}catch(e){return null}})();var kbfV=kbfC==='granted'?'granted':'denied';
gtag('consent','default',{analytics_storage:kbfV,ad_storage:kbfV,ad_user_data:kbfV,ad_personalization:kbfV,wait_for_update:500});
gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />

      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('consent',(function(){try{return localStorage.getItem('${KEY}')==='granted'?'grant':'revoke'}catch(e){return 'revoke'}})());
fbq('init','${META_PIXEL_ID}');
fbq('track','PageView');`}
        </Script>
      )}

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
