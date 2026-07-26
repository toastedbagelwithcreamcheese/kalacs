/**
 * Build-time média-őr.
 *
 *   node scripts/check-media-budget.mjs
 *
 * A package.json `prebuild` scriptjéből fut, tehát MINDEN build előtt.
 * Nem nulla kilépési kóddal áll le, ha:
 *   - bármelyik rendezvényes kép > 250 KB
 *   - a public/images/rendezveny/ összesen > 70 MB
 *   - a public/video/rendezveny/ összesen > 12 MB
 *
 * Miért: a .git már 1,9 GB a korábban becommitolt nagy binárisoktól (L6).
 * Ez az őr teszi lehetetlenné, hogy véletlenül újra elszabaduljon --
 * a build bukik, mielőtt a repó elhízna.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  LIMIT_PER_IMAGE_BYTES,
  LIMIT_IMAGES_TOTAL_BYTES,
  LIMIT_VIDEO_TOTAL_BYTES,
} from "./event-images.config.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES_ROOT = path.join(REPO_ROOT, "public/images/rendezveny");
const VIDEO_ROOT = path.join(REPO_ROOT, "public/video/rendezveny");

const mb = (b) => `${(b / 1024 / 1024).toFixed(1)} MB`;
const kb = (b) => `${(b / 1024).toFixed(0)} KB`;

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
    else if (!e.name.startsWith(".")) files.push(full);
  }
  return files;
}

async function sizeOf(files) {
  let total = 0;
  const sized = [];
  for (const f of files) {
    const { size } = await fs.stat(f);
    total += size;
    sized.push({ file: f, size });
  }
  return { total, sized };
}

async function main() {
  const errors = [];

  const images = await sizeOf(await walk(IMAGES_ROOT));
  const videos = await sizeOf(await walk(VIDEO_ROOT));

  const oversized = images.sized
    .filter((f) => f.size > LIMIT_PER_IMAGE_BYTES)
    .sort((a, b) => b.size - a.size);

  if (oversized.length) {
    errors.push(
      `${oversized.length} kép túllépi a ${kb(LIMIT_PER_IMAGE_BYTES)} korlátot:`
    );
    oversized.slice(0, 10).forEach((f) =>
      errors.push(`    ${kb(f.size).padStart(8)}  ${path.relative(REPO_ROOT, f.file)}`)
    );
    if (oversized.length > 10) errors.push(`    … és még ${oversized.length - 10} db`);
    errors.push(`  Megoldás: node scripts/prep-event-images.mjs --force`);
  }

  if (images.total > LIMIT_IMAGES_TOTAL_BYTES) {
    errors.push(
      `A képmappa ${mb(images.total)} — a korlát ${mb(LIMIT_IMAGES_TOTAL_BYTES)}.`
    );
  }
  if (videos.total > LIMIT_VIDEO_TOTAL_BYTES) {
    errors.push(
      `A videómappa ${mb(videos.total)} — a korlát ${mb(LIMIT_VIDEO_TOTAL_BYTES)}.`
    );
  }

  const pct = (v, lim) => `${((v / lim) * 100).toFixed(0)}%`;

  console.log("Média-költségvetés:");
  console.log(
    `  képek   ${String(images.sized.length).padStart(4)} db  ${mb(images.total).padStart(9)}  / ${mb(LIMIT_IMAGES_TOTAL_BYTES)}  (${pct(images.total, LIMIT_IMAGES_TOTAL_BYTES)})`
  );
  console.log(
    `  videók  ${String(videos.sized.length).padStart(4)} db  ${mb(videos.total).padStart(9)}  / ${mb(LIMIT_VIDEO_TOTAL_BYTES)}  (${pct(videos.total, LIMIT_VIDEO_TOTAL_BYTES)})`
  );

  const largest = images.sized.sort((a, b) => b.size - a.size)[0];
  if (largest) {
    console.log(
      `  legnagyobb kép: ${kb(largest.size)} — ${path.relative(REPO_ROOT, largest.file)}`
    );
  }

  if (errors.length) {
    console.error("\n✗ MÉDIA-KÖLTSÉGVETÉS TÚLLÉPVE\n");
    errors.forEach((e) => console.error("  " + e));
    console.error("");
    process.exit(1);
  }

  console.log("  ✓ minden korlát rendben");
}

main().catch((err) => {
  console.error("Hiba:", err.message);
  process.exit(1);
});
