"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

/**
 * YouTube-beágyazás facade-dal.
 *
 * Kattintásig CSAK egy poszterkép és egy gomb van a DOM-ban — a YouTube
 * iframe-je, scriptjei és sütijei egyáltalán nem töltődnek be. Egy sima
 * <iframe> ~1 MB-nyi third-party JS-t és több tucat kérést hozna magával
 * minden oldalbetöltéskor, akkor is, ha senki nem indítja el a videót.
 *
 * A youtube-nocookie.com domaint használjuk: az sem tesz le követő sütit,
 * amíg a látogató el nem indítja a lejátszást.
 */
export default function VideoFacade({
  youtubeId,
  poster,
  title,
  aspect = "16/9",
}) {
  const [playing, setPlaying] = useState(false);

  if (!youtubeId) return null;

  return (
    <div
      className="relative overflow-hidden rounded-ev"
      style={{ aspectRatio: aspect, background: "var(--ev-sunk)" }}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`${title} — lejátszás`}
          className="group absolute inset-0 h-full w-full"
        >
          {poster && (
            <Image
              src={poster.src}
              alt={poster.alt ?? ""}
              width={poster.width}
              height={poster.height}
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="h-full w-full object-cover transition-transform duration-700 ease-ev-out group-hover:scale-[1.03]"
            />
          )}

          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "rgba(25,23,35,0.28)" }}
          />

          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform duration-300 ease-ev-out group-hover:scale-110 md:h-20 md:w-20"
            style={{ background: "var(--ev-brand)" }}
          >
            <Play
              size={26}
              fill="currentColor"
              className="ml-1"
              style={{ color: "var(--ev-brand-ink)" }}
            />
          </span>

          <span className="absolute inset-x-0 bottom-0 p-5 text-left md:p-7">
            <span className="ev-display block text-lg text-white md:text-xl">
              {title}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
