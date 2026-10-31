// Testimoni dari ulasan Google Maps yang real (listing "Sinar Surya Auto Care").
// HANYA ulasan asli. Sumber: tab Ulasan di listing Google Maps bengkel
// (dicek 31 Okt 2025). Tambahkan ulasan bagus baru di sini kalau ada;
// slider otomatis mengikuti jumlah entri. Set SHOW_TESTIMONI = false
// bila section ini tidak ingin ditayangkan.
//
// Catatan: Google hanya menampilkan 5 ulasan terbaru di web tanpa login,
// jadi entri tanpa nama berasal dari kutipan unggulan di ringkasan listing.

export interface Testimoni {
  nama: string; // kosong = kutipan unggulan tanpa nama di listing
  quote: string;
  info: string;
}

export const SHOW_TESTIMONI = true;

export const TESTIMONI: Testimoni[] = [
  {
    nama: 'Triwi Triwibowo',
    quote: 'Tempat cuci mobil terbersih selama yang saya rasakan, pokoknya hasilnya memuaskan dibandingkan yang lain.',
    info: 'Ulasan Google, 5 bintang',
  },
  {
    nama: 'Luthfi Lathifuddin',
    quote: 'Tempat nyaman, ada mushola dan toilet, bayar bisa pakai QRIS.',
    info: 'Ulasan Google, 5 bintang',
  },
  {
    nama: 'B.C. Andriyono',
    quote: 'Lokasi strategis. Petugasnya ramah dan welcome.',
    info: 'Ulasan Google, 5 bintang',
  },
  {
    nama: '',
    quote: 'Tempat cuci mobil favorit dengan pelayanan bagus dan harga terjangkau.',
    info: 'Kutipan unggulan ulasan Google',
  },
];
