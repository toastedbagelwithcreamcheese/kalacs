import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { EVENT_CATEGORIES } from "@/constants/rendezveny/categories";

/**
 * Esettanulmány-kártya — tisztán megjelenítő komponens.
 *
 * SZÁNDÉKOSAN nem olvassa be maga a manifestet: a hívó (szerver oldali)
 * komponens adja át a kész `image` objektumot. Így a kártya kliens
 * oldalon is használható anélkül, hogy a 91 bejegyzéses manifest
 * bekerülne a JS-csomagba.
 */
export default function CaseCard({ item, image, imageCount = 0, large = false }) {
  const cat = EVENT_CATEGORIES[item.category];

  return (
    <Link
      href={`/rendezveny/munkaim/${item.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-ev"
      style={{ background: "var(--ev-surface)" }}
    >
      {image && (
        <span
          className={`relative block overflow-hidden ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={large ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
            className="h-full w-full object-cover transition-transform duration-700 ease-ev-out group-hover:scale-[1.03]"
          />
        </span>
      )}

      <span className="flex flex-1 flex-col p-6 lg:p-7">
        <span className="ev-mono" style={{ color: cat?.deep }}>
          {cat?.navTitle}
        </span>

        <span className={`ev-display mt-3 ${large ? "text-2xl lg:text-3xl" : "text-xl"}`}>
          {item.title}
        </span>

        {item.brief ? (
          <span className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--ev-ink-2)]">
            {item.brief}
          </span>
        ) : (
          imageCount > 0 && (
            <span className="mt-3 text-sm text-[var(--ev-ink-2)]">
              {imageCount} kép a galériában
            </span>
          )
        )}

        {item.metrics?.length > 0 && (
          <span className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
            {item.metrics.slice(0, 3).map((m) => (
              <span key={m.label}>
                <span className="ev-mono block">{m.label}</span>
                <span className="ev-display mt-0.5 block text-lg">{m.value}</span>
              </span>
            ))}
          </span>
        )}

        <span
          className="mt-6 flex items-center gap-1.5 text-sm font-semibold"
          style={{ color: cat?.deep }}
        >
          Esettanulmány
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </span>
    </Link>
  );
}
