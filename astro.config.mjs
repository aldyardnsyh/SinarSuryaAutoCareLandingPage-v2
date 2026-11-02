// @ts-check
import { defineConfig } from 'astro/config';

// Domain resmi: situs dilayani di www (non-www redirect 308 ke www), jadi
// semua URL internal (canonical, og, schema, sitemap) memakai www.
// Catatan: sitemap dibuat statis di public/sitemap-index.xml — integrasi
// @astrojs/sitemap error di Windows (path absolut ditolak paket `sitemap`).
// Sitemap statis cukup; update daftar URL di file XML saat ada halaman baru.
export const SITE_URL = 'https://www.bengkelmobilbandung.biz.id';

export default defineConfig({
  site: SITE_URL,
});
