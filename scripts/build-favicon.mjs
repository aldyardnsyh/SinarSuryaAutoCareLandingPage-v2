// Render public/favicon.svg menjadi paket ikon lengkap agar tampil rapi di
// hasil pencarian Google (favicon SERP), tab browser, dan home-screen iOS.
// Jalankan: node scripts/build-favicon.mjs
// Output di public/: favicon.ico (16/32/48), favicon-48.png,
// apple-touch-icon.png (180), logo-512.png (dipakai schema logo JSON-LD).
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const svg = join(publicDir, 'favicon.svg');

async function renderPng(size, name) {
  const out = join(publicDir, name);
  await sharp(svg, { density: 300 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`${name}  ${size}x${size}`);
}

// Ikon PNG tunggal: fallback SERP (Google menghendaki >=48px kelipatan 48),
// apple-touch-icon untuk home-screen iOS, logo besar untuk JSON-LD.
await renderPng(48, 'favicon-48.png');
await renderPng(180, 'apple-touch-icon.png');
await renderPng(512, 'logo-512.png');

// favicon.ico multi-ukuran: file pertama yang diminta browser & Googlebot.
const frames = await Promise.all(
  [16, 32, 48].map((size) =>
    sharp(svg, { density: 300 }).resize(size, size).png().toBuffer(),
  ),
);
const ico = await pngToIco(frames);
const icoOut = join(publicDir, 'favicon.ico');
await (await import('node:fs/promises')).writeFile(icoOut, ico);
console.log(`favicon.ico  16/32/48  (${ico.length} bytes)`);
