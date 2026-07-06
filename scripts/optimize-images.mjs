import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = "/Volumes/Samsung 1TB SSD/Weboldalak/kalacs/public/images";
const MAX_DIM = 2000;
const QUALITY_PRIMARY = 78;
const QUALITY_FALLBACK = 65;
const FALLBACK_THRESHOLD_BYTES = 600 * 1024;
// Confirmed via grep: unreferenced duplicate, the .jpeg sibling is what's actually used in code.
const SKIP = new Set([
  "kata_kismama/_47A9056-2.jpg",
]);

const RASTER_EXT = new Set([".jpg", ".jpeg", ".png"]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(await walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const allFiles = await walk(ROOT);
  const targets = allFiles.filter((f) => RASTER_EXT.has(path.extname(f).toLowerCase()));

  const usedNewPaths = new Set();
  const mapping = [];
  let totalOld = 0;
  let totalNew = 0;
  let skipped = 0;
  let failed = [];

  // Deterministic order so collision-disambiguation is stable across runs.
  targets.sort();

  for (const file of targets) {
    const rel = path.relative(ROOT, file);
    if (SKIP.has(rel)) {
      skipped++;
      continue;
    }

    const dir = path.dirname(file);
    const ext = path.extname(file);
    const base = path.basename(file, ext);
    let newBase = base;
    let newFile = path.join(dir, `${newBase}.webp`);

    if (usedNewPaths.has(newFile)) {
      newBase = `${base}__${ext.slice(1).toLowerCase()}`;
      newFile = path.join(dir, `${newBase}.webp`);
    }
    usedNewPaths.add(newFile);

    try {
      const oldStat = await fs.stat(file);
      const img = sharp(file, { failOn: "none" });
      const meta = await img.metadata();

      let pipeline = sharp(file, { failOn: "none" }).rotate();
      if (meta.width && meta.height && Math.max(meta.width, meta.height) > MAX_DIM) {
        pipeline = pipeline.resize({
          width: meta.width >= meta.height ? MAX_DIM : null,
          height: meta.height > meta.width ? MAX_DIM : null,
          fit: "inside",
          withoutEnlargement: true,
        });
      }

      let buffer = await pipeline.webp({ quality: QUALITY_PRIMARY }).toBuffer();
      if (buffer.length > FALLBACK_THRESHOLD_BYTES) {
        let pipeline2 = sharp(file, { failOn: "none" }).rotate();
        if (meta.width && meta.height && Math.max(meta.width, meta.height) > MAX_DIM) {
          pipeline2 = pipeline2.resize({
            width: meta.width >= meta.height ? MAX_DIM : null,
            height: meta.height > meta.width ? MAX_DIM : null,
            fit: "inside",
            withoutEnlargement: true,
          });
        }
        buffer = await pipeline2.webp({ quality: QUALITY_FALLBACK }).toBuffer();
      }

      await fs.writeFile(newFile, buffer);
      if (newFile !== file) {
        await fs.unlink(file);
      }

      totalOld += oldStat.size;
      totalNew += buffer.length;
      mapping.push({
        old: `/images/${rel.split(path.sep).join("/")}`,
        new: `/images/${path.relative(ROOT, newFile).split(path.sep).join("/")}`,
      });
    } catch (err) {
      failed.push({ file, error: String(err) });
    }
  }

  await fs.writeFile(
    "/private/tmp/claude-501/-Users-balintkovacs/0f87c276-2e71-4dda-9cf7-4a3ea29d89d6/scratchpad/image-mapping.json",
    JSON.stringify(mapping, null, 2)
  );

  console.log(`Converted: ${mapping.length}`);
  console.log(`Skipped (unreferenced dup): ${skipped}`);
  console.log(`Failed: ${failed.length}`);
  if (failed.length) console.log(JSON.stringify(failed, null, 2));
  console.log(`Total old size: ${(totalOld / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Total new size: ${(totalNew / 1024 / 1024).toFixed(1)} MB`);
}

main();
