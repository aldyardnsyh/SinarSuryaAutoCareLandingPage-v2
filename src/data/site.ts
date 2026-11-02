// ============================================================
// site.ts — SATU-SATUNYA tempat data bisnis.
// Sumber data: listing Google Maps resmi "Sinar Surya Auto Care"
// (dicek 31 Okt 2025): alamat, telepon, jam, koordinat pin.
// ============================================================

export const SITE = {
  name: 'Sinar Surya Auto Care',
  shortName: 'SSAC',
  tagline: 'Bengkel Mobil & Cuci Hidrolik',
  // Nomor telepon/WA AKTIF satu-satunya (konfirmasi client 31 Okt 2026;
  // nomor lama 022-7502999 sudah tidak aktif) — dipakai di semua lini
  phone: '0812-2022-203',
  phoneIntl: '+628122022203',
  whatsapp: '628122022203',
  whatsappDisplay: '0812-2022-203',
  mobileIntl: '+628122022203',

  address: {
    full: 'Jl. Cijagra No.8, Bojongsoang, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40288',
    short: 'Jl. Cijagra No.8, Bojongsoang',
    street: 'Jl. Cijagra No.8',
    city: 'Bojongsoang, Kab. Bandung',
    region: 'Jawa Barat',
    postalCode: '40288',
    plusCode: '2J8M+35 Bojongsoang',
  },

  // Koordinat pin bengkel dari link Google Maps resmi
  geo: { lat: -6.9848264, lng: 107.6329325 },

  // Jam operasional per layanan ada di src/data/hours.ts (data-driven, dipakai
  // juga oleh status realtime di TopInfoBar & Hero).

  // Link Google Maps resmi bengkel
  mapsShortLink: 'https://maps.app.goo.gl/q5tPToCPzbebyi2z8',

  // Data rating dari ulasan Google (real, tampil sebagai ringkasan + link)
  rating: { score: '4,7', total: 96 },

  // Sosial media bengkel (halaman lokasi Instagram + halaman Facebook bengkel)
  social: {
    facebook: 'https://www.facebook.com/pages/Sinar-Surya-Auto-Care/154461098013280',
    instagram: 'https://www.instagram.com/explore/locations/270770150/sinar-surya-auto-care/',
  },
} as const;

// Domain resmi, deploy di Vercel. Situs dilayani di www (non-www redirect
// 308 ke www), jadi SEMUA URL internal (canonical, og, schema, sitemap,
// robots.txt) wajib memakai www agar konsisten.
export const SITE_URL = 'https://www.bengkelmobilbandung.biz.id';

// Embed peta listing resmi bengkel (query nama + alamat supaya pin
// "Sinar Surya Auto Care" tampil tepat di tengah bingkai).
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  'Sinar Surya Auto Care, Jl. Cijagra No.8, Bojongsoang',
)}&hl=id&z=17&output=embed`;

/**
 * Template pesan WhatsApp. Setiap pesan selalu diawali nama bengkel
 * dan letaknya, baru isi permintaan pelanggan.
 */
export function waLink(message: string = 'saya mau tanya soal servis mobil saya.'): string {
  const template = `Halo Sinar Surya Auto Care yang lokasinya di ${SITE.address.street}, Bojongsoang. `;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(template + message)}`;
}

/** Link tanya harga per layanan (pengganti pricelist).
 *  Pesan spesifik per layanan agar admin langsung tahu yang dimaksud. */
export function waLayanan(namaLayanan: string): string {
  return waLink(
    `untuk ${namaLayanan}, kira-kira estimasi biayanya berapa ya? Mobil saya [merek/tipe mobil].`,
  );
}

/** Link tel: dari nomor telepon kantor. */
export function telLink(): string {
  return `tel:${SITE.phoneIntl}`;
}
