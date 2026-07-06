import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = "/Volumes/Samsung 1TB SSD/Weboldalak/kalacs/public/images";
const MAX_DIM = 2000;
const QUALITY_PRIMARY = 78;
const QUALITY_FALLBACK = 65;
const FALLBACK_THRESHOLD_BYTES = 600 * 1024;
const SIZE_THRESHOLD_BYTES = 400 * 1024;

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
  const targets = allFiles.filter(
    (f) => path.extname(f).toLowerCase() === ".webp"
  );

  let processed = 0;
  let skippedSmall = 0;
  let totalOld = 0;
  let totalNew = 0;
  let failed = [];

  for (const file of targets) {
    const oldStat = await fs.stat(file);
    if (oldStat.size <= SIZE_THRESHOLD_BYTES) {
      skippedSmall++;
      continue;
    }

    try {
      const meta = await sharp(file, { failOn: "none" }).metadata();

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

      // Only overwrite if we actually shrank it.
      if (buffer.length < oldStat.size) {
        await fs.writeFile(file, buffer);
        totalNew += buffer.length;
      } else {
        totalNew += oldStat.size;
      }
      totalOld += oldStat.size;
      processed++;
    } catch (err) {
      failed.push({ file, error: String(err) });
    }
  }

  console.log(`Processed (re-encoded): ${processed}`);
  console.log(`Skipped (already <=400KB): ${skippedSmall}`);
  console.log(`Failed: ${failed.length}`);
  if (failed.length) console.log(JSON.stringify(failed, null, 2));
  console.log(`Total old size (processed set): ${(totalOld / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Total new size (processed set): ${(totalNew / 1024 / 1024).toFixed(1)} MB`);
}

main();
