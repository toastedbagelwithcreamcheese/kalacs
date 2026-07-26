/**
 * Rendezvényes képek előkészítése a webre.
 *
 *   node scripts/prep-event-images.mjs [--source <útvonal>] [--force]
 *
 * Mit csinál:
 *   forrás (nyers JPEG)  →  átméretez (max 1800px hosszabb él)
 *                        →  WebP q72 (ha > 220 KB, újra q64-gyel)
 *                        →  public/images/rendezveny/<kategória>/
 *
 * A kimeneti fájlnév determinisztikus: <forrás-slug>-<eredeti név>.webp
 * Így újrafuttatáskor nincs átszámozás, és minden kép visszakövethető.
 *
 * FONTOS: relatív útvonalakkal dolgozik (a repó gyökeréhez képest), NEM
 * drótozott abszolúttal -- ellentétben a régi optimize-images.mjs-sel (L12).
 * A forrásmappa az egyetlen kivétel, mert az a repón kívül van; azt a
 * configból vagy a --source kapcsolóból veszi.
 */

import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  SOURCE_ROOT,
  IMAGE_MAP,
  MAX_EDGE,
  QUALITY_PRIMARY,
  QUALITY_FALLBACK,
  RETRY_ABOVE_BYTES,
} from "./event-images.config.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_ROOT = path.join(REPO_ROOT, "public/images/rendezveny");

const RASTER = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"]);

const args = process.argv.slice(2);
const sourceRoot = args.includes("--source")
  ? args[args.indexOf("--source") + 1]
  : SOURCE_ROOT;
const force = args.includes("--force");

/** Ékezet- és szóközmentes, URL-barát név. */
function slugify(input) {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const kb = (b) => `${(b / 1024).toFixed(0)} KB`;

async function listImages(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return null; // a mappa nem létezik
  }
  return entries
    .filter((e) => e.isFile() && RASTER.has(path.extname(e.name).toLowerCase()))
    .map((e) => path.join(dir, e.name))
    .sort();
}

async function main() {
  console.log(`Forrás: ${sourceRoot}`);
  console.log(`Cél:    public/images/rendezveny/\n`);

  let written = 0;
  let skipped = 0;
  let totalBytes = 0;
  const missing = [];
  const perCategory = {};
  const tight = []; // a lépcső alján sem fért a keretbe

  for (const entry of IMAGE_MAP) {
    const srcDir = path.join(sourceRoot, entry.from);
    const files = await listImages(srcDir);

    if (files === null) {
      missing.push(entry.from);
      continue;
    }
    if (files.length === 0) {
      console.log(`  ⚠ ${entry.from} — nincs benne kép`);
      continue;
    }

    const outDir = path.join(OUT_ROOT, entry.to);
    await fs.mkdir(outDir, { recursive: true });

    for (const file of files) {
      const base = slugify(path.basename(file, path.extname(file)));
      const outName = `${entry.slug}-${base}.webp`;
      const outPath = path.join(outDir, outName);

      if (!force) {
        try {
          await fs.access(outPath);
          skipped++;
          const st = await fs.stat(outPath);
          totalBytes += st.size;
          perCategory[entry.to] = (perCategory[entry.to] || 0) + 1;
          continue;
        } catch {
          /* nincs még meg, megyünk tovább */
        }
      }

      // .rotate() EXIF-orientáció szerint forgat -- enélkül a portré
      // képek egy része oldalra dőlve kerülne ki.
      const encode = (edge, quality) =>
        sharp(file)
          .rotate()
          .resize({ width: edge, height: edge, fit: "inside", withoutEnlargement: true })
          .webp({ quality })
          .toBuffer();

      // Fokozatos visszalépés, amíg a fájl a keretbe nem fér. A részletgazdag
      // képek (por, fű, lombkorona) rosszul tömöríthetők -- ott egyetlen
      // minőség-visszalépés kevés, ezért kell a lépcső, végül a méret is.
      const LADDER = [
        [MAX_EDGE, QUALITY_PRIMARY],
        [MAX_EDGE, QUALITY_FALLBACK],
        [MAX_EDGE, 56],
        [1600, 60],
        [1600, 52],
        [1400, 55],
        [1400, 48],
        [1280, 52],
      ];

      let buf = null;
      let usedEdge = MAX_EDGE;
      let quality = QUALITY_PRIMARY;

      for (const [edge, q] of LADDER) {
        buf = await encode(edge, q);
        usedEdge = edge;
        quality = q;
        if (buf.length <= RETRY_ABOVE_BYTES) break;
      }

      await fs.writeFile(outPath, buf);
      written++;
      totalBytes += buf.length;
      perCategory[entry.to] = (perCategory[entry.to] || 0) + 1;
      if (buf.length > RETRY_ABOVE_BYTES) tight.push({ outName, size: buf.length });

      const note = usedEdge === MAX_EDGE ? `q${quality}` : `q${quality} @${usedEdge}px`;
      console.log(
        `  ✓ ${entry.to}/${outName.padEnd(38)} ${kb(buf.length).padStart(7)}  ${note}`
      );
    }
  }

  console.log("\n─────────────────────────────────────────────");
  for (const [cat, n] of Object.entries(perCategory).sort()) {
    console.log(`  ${cat.padEnd(14)} ${String(n).padStart(3)} kép`);
  }
  console.log("─────────────────────────────────────────────");
  console.log(`  Új: ${written} · Kihagyva (már megvolt): ${skipped}`);
  console.log(`  Összméret: ${(totalBytes / 1024 / 1024).toFixed(1)} MB`);

  if (tight.length) {
    console.log(`\n  ⚠ ${tight.length} kép a lépcső alján sem fért ${kb(RETRY_ABOVE_BYTES)} alá:`);
    tight
      .sort((a, b) => b.size - a.size)
      .slice(0, 8)
      .forEach((t) => console.log(`      ${kb(t.size).padStart(8)}  ${t.outName}`));
    console.log(`    Ezek nagyon részletgazdag képek. Ha az őr elbukik rajtuk,`);
    console.log(`    bővítsd a LADDER-t, vagy vedd ki őket a válogatásból.`);
  }

  if (missing.length) {
    console.log(`\n  ⚠ Nem talált forrásmappa:`);
    missing.forEach((m) => console.log(`      ${m}`));
    console.log(`    (Csatlakoztatva van a külső meghajtó?)`);
  }

  console.log(`\n  Következő lépés: node scripts/build-media-manifest.mjs`);
}

main().catch((err) => {
  console.error("Hiba:", err.message);
  process.exit(1);
});
