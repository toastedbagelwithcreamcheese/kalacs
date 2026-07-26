"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

/**
 * 9:16 rövidvideó-fal telefon-arányú keretekben.
 *
 * Ugyanaz a facade-elv, mint a VideoFacade-nál: kattintásig semmilyen
 * YouTube-erőforrás nem töltődik be. Ha nincs egyetlen kitöltött elem
 * sem, a komponens nem renderel semmit.
 */
export default function ReelWall({ items }) {
  const [active, setActive] = useState(null);

  const ready = (items || []).filter((i) => i.youtubeId);
  if (ready.length === 0) return null;

  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
      {ready.map((reel, i) => (
        <li key={reel.youtubeId}>
          <div
            className="relative overflow-hidden rounded-ev"
            style={{ aspectRatio: "9/16", background: "var(--ev-sunk)" }}
          >
            {active === i ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${reel.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={reel.title}
                allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${reel.title} — lejátszás`}
                className="group absolute inset-0 h-full w-full"
              >
                {reel.poster && (
                  <Image
                    src={reel.poster.src}
                    alt={reel.poster.alt ?? ""}
                    width={reel.poster.width}
                    height={reel.poster.height}
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="h-full w-full object-cover transition-transform duration-700 ease-ev-out group-hover:scale-[1.04]"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ background: "rgba(25,23,35,0.25)" }}
                />
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                  style={{ background: "rgba(255,255,255,0.92)" }}
                >
                  <Play size={16} fill="currentColor" className="ml-0.5" style={{ color: "var(--ev-brand)" }} />
                </span>
              </button>
            )}
          </div>
          {reel.title && (
            <p className="ev-mono mt-2 truncate">{reel.title}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
