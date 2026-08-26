/**
 * Converts the PNG/JPG source art in public/ to WebP.
 *
 * The banners come out of design tools as ~2MB PNGs; WebP cuts them by ~90%
 * with no visible loss, which is the single biggest win for page weight.
 *
 *   node scripts/optimize-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const projectsDir = path.join(publicDir, "projects");

const jobs = [
  { src: "profile.png", out: "profile.webp", width: 900, quality: 84 },
  ...fs
    .readdirSync(projectsDir)
    .filter((f) => /\.(png|jpe?g)$/i.test(f))
    .map((f) => ({
      src: path.join("projects", f),
      out: path.join("projects", f.replace(/\.(png|jpe?g)$/i, ".webp")),
      width: 1600,
      quality: 80,
    })),
];

let saved = 0;

for (const job of jobs) {
  const srcPath = path.join(publicDir, job.src);
  const outPath = path.join(publicDir, job.out);
  if (!fs.existsSync(srcPath)) continue;

  const before = fs.statSync(srcPath).size;
  await sharp(srcPath)
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality, effort: 6 })
    .toFile(outPath);

  const after = fs.statSync(outPath).size;
  saved += before - after;

  console.log(
    `${job.out.padEnd(32)} ${(before / 1024 / 1024).toFixed(2)}MB -> ${(
      after / 1024
    ).toFixed(0)}KB  (-${Math.round((1 - after / before) * 100)}%)`
  );
}

console.log(`\nTotal saved: ${(saved / 1024 / 1024).toFixed(2)}MB`);
