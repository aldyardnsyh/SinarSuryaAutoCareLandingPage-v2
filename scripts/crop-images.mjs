// Crop foto asli bengkel per-slot agar proporsional (jalankan: node scripts/crop-images.mjs)
// "attention" = sharp memusatkan crop pada objek utama foto.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');

const jobs = [
  // [sumber, output, lebar, tinggi, keterangan]
  ['bengkel-cuci-mobil-hidrolik-bojongsoang-lift.jpg', 'hero-bengkel-cuci-hidrolik-bojongsoang.jpg', 1600, 900, 'hero: mobil di lift hidrolik (sudah landscape)'],
  ['bengkel-servis-mobil-bojongsoang-area-detail.jpg', 'split-bengkel-servis-mobil.jpg', 1400, 1000, 'split kiri: servis/detailing'],
  ['cuci-mobil-hidrolik-bojongsoang-busa.jpg', 'split-cuci-mobil-hidrolik.jpg', 1400, 1000, 'split kanan: cuci busa'],
  ['bengkel-cuci-mobil-hidrolik-bojongsoang-lift.jpg', 'galeri-lift-hidrolik.jpg', 1200, 750, 'galeri: lift hidrolik'],
  ['cuci-mobil-hidrolik-bojongsoang-busa.jpg', 'galeri-cuci-busa.jpg', 1200, 750, 'galeri: cuci busa'],
  ['area-bengkel-mobil-bojongsoang.jpg', 'galeri-area-bengkel.jpg', 1200, 750, 'galeri: area bengkel'],
  ['bengkel-servis-mobil-bojongsoang-area-detail.jpg', 'galeri-detailing.jpg', 1200, 750, 'galeri: detailing'],
];

for (const [src, out, w, h, note] of jobs) {
  const info = await sharp(join(dir, src))
    .resize(w, h, { fit: 'cover', position: sharp.strategy.attention })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(dir, out));
  console.log(`${out}  ${info.width}x${info.height}  (${Math.round(info.size / 1024)} KB)  ${note}`);
}
