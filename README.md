# Sinar Surya Auto Care — Landing Page

Landing page satu halaman untuk **Sinar Surya Auto Care**, bengkel mobil & cuci hidrolik di Jl. Cijagra No.8, Bojongsoang, Kabupaten Bandung.

Dibangun dengan [Astro](https://astro.build) — HTML statis murni, tanpa framework JS di sisi klien (hanya beberapa baris vanilla JS untuk hamburger, slider ulasan, dan status jam operasional realtime).

**Domain**: [bengkelmobilbandung.biz.id](https://bengkelmobilbandung.biz.id)

## Fitur

- **Status jam operasional realtime** per layanan (servis mobil & cuci hidrolik) dari jam device pengunjung
- **Slider ulasan Google** yang real (auto-geser, multi-kartu) + CTA tulis ulasan
- **17 tombol WhatsApp** dengan template pesan berbeda per konteks (booking, konsultasi, reservasi, tanya harga, per layanan)
- **SEO lokal lengkap**: JSON-LD `AutoRepair` + `FAQPage`, Open Graph/Twitter card, sitemap, geo meta
- **Galeri foto asli bengkel** (WebP, lazy-load)
- **Caching Vercel agresif** (`vercel.json`): aset ber-hash immutable, gambar stale-while-revalidate

## Struktur

```
src/
├── data/          # Sumber data tunggal (site.ts, hours.ts, layanan.ts, testimoni.ts)
├── components/    # 1 komponen per section halaman
├── layouts/       # BaseLayout (head, SEO meta, JSON-LD, font)
├── styles/        # tokens.css (design system "Industrial Garage")
└── pages/         # index.astro (komposisi section)
scripts/           # crop-images.mjs (sharp, crop aset per slot)
public/            # gambar webp, og-image, favicon, robots, sitemap
```

## Perintah

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Build produksi ke `dist/` |
| `npm run preview` | Preview hasil build |
| `node scripts/crop-images.mjs` | Regenerasi crop gambar per slot |

## Konfigurasi

- Data bisnis (telepon, WA, alamat, sosmed, koordinat): `src/data/site.ts`
- Jam operasional per layanan: `src/data/hours.ts`
- Domain & canonical: `SITE_URL` di `src/data/site.ts`

## Deploy

Statis — siap deploy ke Vercel/Netlify/Cloudflare Pages. `vercel.json` sudah berisi cache headers & security headers.
