"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Masonry from "react-masonry-css";

// A lightbox (és a hozzá tartozó CSS) CSAK akkor töltődik le, amikor a
// látogató először rákattint egy képre. Ez ~30 KB-tal csökkenti a
// kezdeti JS-csomagot minden kategória- és esettanulmány-oldalon,
// miközben a galéria maga azonnal használható marad (terv 11.1).
const GalleryLightbox = dynamic(() => import("./GalleryLightbox"), {
  ssr: false,
});

const BREAKPOINTS = {
  default: 3,
  1024: 3,
  768: 2,
  520: 1,
};

/**
 * Kategória-galéria masonry elrendezésben.
 *
 * A képek méretét a manifestből kapjuk (width/height), így a next/image
 * betöltés előtt lefoglalja a helyet -- a masonry oszlopok nem ugrálnak.
 *
 * A nyitóelem <button>, tehát billentyűzettel is elérhető; a lightbox
 * maga Esc-re zár és nyilakkal léptet.
 */
export default function GalleryMasonry({ images, accent }) {
  const [index, setIndex] = useState(-1);
  // Amíg nem volt kattintás, a lightbox modult el sem kérjük.
  const [wantsLightbox, setWantsLightbox] = useState(false);

  if (!images?.length) return null;

  const open = (i) => {
    setWantsLightbox(true);
    setIndex(i);
  };

  return (
    <>
      <Masonry
        breakpointCols={BREAKPOINTS}
        className="flex w-auto gap-3"
        columnClassName="flex flex-col gap-3"
      >
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => open(i)}
            aria-label={`${img.alt} — nagyítás`}
            className="group relative block w-full overflow-hidden rounded-ev-sm"
            style={{ background: accent }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(max-width: 520px) 100vw, (max-width: 768px) 50vw, 33vw"
              loading={i < 6 ? "eager" : "lazy"}
              className="w-full transition-transform duration-700 ease-ev-out group-hover:scale-[1.03]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: "rgba(25,23,35,0.12)" }}
            />
          </button>
        ))}
      </Masonry>

      {wantsLightbox && (
        <GalleryLightbox
          images={images}
          index={index}
          onClose={() => setIndex(-1)}
        />
      )}
    </>
  );
}
