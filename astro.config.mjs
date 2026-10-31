// @ts-check
import { defineConfig } from 'astro/config';

// Domain sementara untuk canonical/sitemap — ganti setelah domain client aktif.
// Catatan: sitemap dibuat statis di public/sitemap-index.xml — integrasi
// @astrojs/sitemap error di Windows (path absolut ditolak paket `sitemap`).
// Untuk situs 1 halaman, sitemap statis sudah cukup; ganti domain di file XML
// saat domain client aktif.
export const SITE_URL = 'https://sinarsuryaautocare.com';

export default defineConfig({
  site: SITE_URL,
});
