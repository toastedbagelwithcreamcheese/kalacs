"use client";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";

/**
 * A lightbox külön modulban él, hogy a GalleryMasonry dinamikusan,
 * csak az első kattintáskor töltse be. Így a könyvtár és a CSS-e nem
 * terheli a kezdeti oldalbetöltést.
 */
export default function GalleryLightbox({ images, index, onClose }) {
  return (
    <Lightbox
      index={index}
      open={index >= 0}
      close={onClose}
      slides={images.map((img) => ({
        src: img.src,
        alt: img.alt,
        width: img.width,
        height: img.height,
      }))}
      plugins={[Zoom, Counter]}
      controller={{ closeOnBackdropClick: true }}
      styles={{ container: { backgroundColor: "rgba(25,23,35,0.94)" } }}
    />
  );
}
