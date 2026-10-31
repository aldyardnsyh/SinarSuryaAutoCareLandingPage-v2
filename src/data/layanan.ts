// Daftar layanan — sumber tunggal untuk section Layanan, footer & JSON-LD.
// Layanan motor (cuci motor hidrolik) DIHAPUS: bengkel hanya melayani mobil.

export interface Layanan {
  id: string;
  nama: string;
  deskripsi: string;
  group: 'servis' | 'cuci';
}

export const LAYANAN: Layanan[] = [
  // Grup A — Servis & Perbaikan
  {
    id: 'servis-rutin',
    nama: 'Servis Rutin & Tune Up',
    deskripsi: 'Perawatan berkala supaya mesin tetap sehat dan bahan bakar lebih hemat.',
    group: 'servis',
  },
  {
    id: 'ganti-oli',
    nama: 'Ganti Oli & Filter',
    deskripsi: 'Kuras dan ganti oli mesin, oli matic, sampai filter sesuai tipe mobil Anda.',
    group: 'servis',
  },
  {
    id: 'service-ac',
    nama: 'Service AC Mobil',
    deskripsi: 'Cuci AC, isi freon, sampai perbaikan supaya kabin dingin lagi.',
    group: 'servis',
  },
  {
    id: 'kaki-kaki',
    nama: 'Kaki-kaki & Rem',
    deskripsi: 'Suspensi, shockbreaker, dan rem diperiksa serta diperbaiki dengan teliti.',
    group: 'servis',
  },
  {
    id: 'kelistrikan',
    nama: 'Kelistrikan & Aki',
    deskripsi: 'Cek kelistrikan, aki, dan lampu supaya mobil siap jalan setiap pagi.',
    group: 'servis',
  },
  // Grup B — Cuci Hidrolik & Steam
  {
    id: 'cuci-mobil-hidrolik',
    nama: 'Cuci Mobil Hidrolik',
    deskripsi: 'Mobil diangkat dengan lift hidrolik sehingga bagian bawah ikut tercuci bersih.',
    group: 'cuci',
  },
  {
    id: 'steam-wash',
    nama: 'Steam Wash Interior',
    deskripsi: 'Interior dibersihkan dengan steam sehingga higienis dan tidak lembap.',
    group: 'cuci',
  },
  {
    id: 'vacuum-detailing',
    nama: 'Vacuum & Detailing',
    deskripsi: 'Vakum menyeluruh dan detailing untuk tampilan mobil yang kembali rapi.',
    group: 'cuci',
  },
];

export const GRUP_A = LAYANAN.filter((l) => l.group === 'servis');
export const GRUP_B = LAYANAN.filter((l) => l.group === 'cuci');
