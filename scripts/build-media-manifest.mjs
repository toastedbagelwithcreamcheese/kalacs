/**
 * Kép-manifest építése.
 *
 *   node scripts/build-media-manifest.mjs
 *
 * Végigjárja a public/images/rendezveny/ mappát, és minden képhez kiírja a
 * tényleges width/height értéket a constants/rendezveny/manifest.json-be.
 *
 * Miért kell: a next/image csak akkor tud helyet foglalni a képnek betöltés
 * előtt, ha ismeri az arányát. Enélkül ugrálna az elrendezés (CLS). Kézzel
 * karbantartani több száz kép méretét kizárt -- ezért generáljuk.
 */

import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { IMAGE_MAP } from "./event-images.config.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES_ROOT = path.join(REPO_ROOT, "public/images/rendezveny");
const OUT_FILE = path.join(REPO_ROOT, "constants/rendezveny/manifest.json");

async function walk(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (/\.(webp|jpg|jpeg|png|avif)$/i.test(e.name)) files.push(full);
  }
  return files;
}

async function main() {
  const files = (await walk(IMAGES_ROOT)).sort();

  if (files.length === 0) {
    console.log("Nincs kép a public/images/rendezveny/ alatt.");
    console.log("Futtasd előbb: node scripts/prep-event-images.mjs");
  }

  const manifest = {};
  const counts = {};
  let unmatched = 0;

  for (const file of files) {
    const rel = path.relative(path.join(REPO_ROOT, "public"), file);
    const url = "/" + rel.split(path.sep).join("/");
    const { width, height } = await sharp(file).metadata();
    const { size } = await fs.stat(file);

    // A fájlnév előtagjából visszakeressük a forráseseményt, és a
    // manifestbe írjuk a leíró alt-szöveget + a címkéket. Így az
    // alkalmazás-kódnak nem kell a build-scriptekre hivatkoznia.
    const base = path.basename(file);
    const source = IMAGE_MAP
      .filter((m) => base.startsWith(`${m.slug}-`))
      .sort((a, b) => b.slug.length - a.slug.length)[0];

    if (!source) unmatched++;

    manifest[url] = {
      width,
      height,
      bytes: size,
      alt: source ? source.label : "Rendezvényfotó",
      event: source ? source.slug : null,
      ...(source?.tags?.length ? { tags: source.tags } : {}),
    };

    const group = path.relative(IMAGES_ROOT, path.dirname(file)) || ".";
    counts[group] = (counts[group] || 0) + 1;
  }

  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(manifest, null, 2) + "\n");

  console.log(`Manifest kész: constants/rendezveny/manifest.json`);
  console.log(`  ${files.length} kép\n`);
  for (const [group, n] of Object.entries(counts).sort()) {
    console.log(`  ${group.padEnd(16)} ${String(n).padStart(3)}`);
  }
  if (unmatched) {
    console.log(
      `\n  ⚠ ${unmatched} képhez nem találtam forrásbejegyzést az IMAGE_MAP-ban.`
    );
    console.log(`    Ezek általános alt-szöveget kaptak.`);
  }
}

main().catch((err) => {
  console.error("Hiba:", err.message);
  process.exit(1);
});
