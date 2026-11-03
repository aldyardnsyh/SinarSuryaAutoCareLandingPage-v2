// ============================================================
// seo.ts — pembangun JSON-LD untuk halaman-halaman layanan.
// Schema AutoRepair bisnis didefinisikan di BaseLayout dengan
// @id `${SITE_URL}/#business`; schema di sini cukup mereferensikan
// lewat provider.@id agar tidak ada duplikasi data bisnis.
// ============================================================
import { SITE_URL } from './site';

/** Skema Service untuk satu halaman layanan. */
export function serviceSchema(p: {
  path: string;
  name: string;
  serviceType?: string;
  description: string;
  images: string[];
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: p.name,
    serviceType: p.serviceType ?? p.name,
    description: p.description,
    url: `${SITE_URL}${p.path}`,
    image: p.images.map((src) => `${SITE_URL}${src}`),
    areaServed: ['Bandung', 'Kabupaten Bandung', 'Bojongsoang', 'Dayeuhkolot', 'Baleendah', 'Buahbatu'],
    provider: { '@id': `${SITE_URL}/#business` },
  };
}

/** Skema BreadcrumbList. Item pertama selalu Beranda. */
export function breadcrumbSchema(
  items: { name: string; path: string }[],
): Record<string, unknown> {
  const all = [{ name: 'Beranda', path: '/' }, ...items];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** Skema BlogPosting untuk satu artikel blog.
 *  Penulis dan penerbit merujuk entitas bisnis di BaseLayout. */
export function articleSchema(p: {
  path: string;
  headline: string;
  description: string;
  image: string; // path relatif, mis. '/og-image.jpg'
  datePublished: string; // ISO 8601
}): Record<string, unknown> {
  const url = `${SITE_URL}${p.path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.headline,
    description: p.description,
    image: `${SITE_URL}${p.image}`,
    url,
    datePublished: p.datePublished,
    dateModified: p.datePublished,
    inLanguage: 'id-ID',
    author: { '@type': 'Organization', name: 'Sinar Surya Auto Care', url: SITE_URL },
    publisher: { '@id': `${SITE_URL}/#business` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}
