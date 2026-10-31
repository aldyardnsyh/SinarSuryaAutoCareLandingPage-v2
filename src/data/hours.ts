// Jam operasional per layanan — sumber tunggal untuk status realtime.
// Jadwal final per layanan (konfirmasi pemilik bengkel):
// - Servis mobil : Senin-Sabtu 08.00-17.00, Minggu TUTUP
// - Cuci hidrolik: Senin-Sabtu 07.00-17.00, Minggu 08.00-16.00
// Ubah hanya di sini kalau jadwal berubah.

export interface JamHarian {
  open: string; // "HH.MM"
  close: string;
}

export interface JamLayanan {
  seninSabtu: JamHarian;
  minggu: JamHarian | null; // null = tutup di hari Minggu
  label: string;
}

export const JAM: Record<'servis' | 'cuci', JamLayanan> = {
  servis: {
    seninSabtu: { open: '08.00', close: '17.00' },
    minggu: null,
    label: 'Senin-Sabtu 08.00-17.00, Minggu tutup',
  },
  cuci: {
    seninSabtu: { open: '07.00', close: '17.00' },
    minggu: { open: '08.00', close: '16.00' },
    label: 'Senin-Sabtu 07.00-17.00, Minggu 08.00-16.00',
  },
};

/** "08.30" -> 510 menit sejak tengah malam. */
function keMenit(hhmm: string): number {
  const [h, m] = hhmm.split('.').map(Number);
  return h * 60 + m;
}

export interface StatusLayanan {
  buka: boolean;
  jamHariIni: JamHarian | null;
  teks: string; // contoh: "buka s.d. 17.00" / "tutup - buka Senin 08.00" / "buka 08.00-16.00"
}

const NAMA_HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

/** Hitung status satu layanan pada waktu tertentu (dari device user). */
export function statusLayanan(layanan: JamLayanan, now: Date): StatusLayanan {
  const hari = now.getDay(); // 0 = Minggu
  const menit = now.getHours() * 60 + now.getMinutes();
  const jamHariIni = hari === 0 ? layanan.minggu : layanan.seninSabtu;

  if (!jamHariIni) {
    // tutup hari ini: cari jam buka berikutnya (Senin bila hari ini Minggu)
    return {
      buka: false,
      jamHariIni: null,
      teks: `tutup hari ini, buka Senin ${layanan.seninSabtu.open}`,
    };
  }

  const bukaSekarang = menit >= keMenit(jamHariIni.open) && menit < keMenit(jamHariIni.close);
  if (bukaSekarang) {
    return { buka: true, jamHariIni, teks: `buka s.d. ${jamHariIni.close}` };
  }
  if (menit < keMenit(jamHariIni.open)) {
    return { buka: false, jamHariIni, teks: `buka hari ini ${jamHariIni.open}` };
  }
  // sudah lewat jam tutup
  const besok = NAMA_HARI[(hari + 1) % 7];
  const jamBesok = (hari + 1) % 7 === 0 ? layanan.minggu : layanan.seninSabtu;
  return {
    buka: false,
    jamHariIni,
    teks: jamBesok ? `tutup, buka ${besok} ${jamBesok.open}` : `tutup, buka Senin ${layanan.seninSabtu.open}`,
  };
}

/** Jam lokal device dalam "HH.MM". */
export function jamLokal(now: Date): string {
  return `${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}`;
}

/** Teks pendek untuk chip status (tanpa kalimat, gaya papan telemetri). */
export function teksChip(layanan: JamLayanan, now: Date): { buka: boolean; teks: string } {
  const hari = now.getDay();
  const menit = now.getHours() * 60 + now.getMinutes();
  const jamHariIni = hari === 0 ? layanan.minggu : layanan.seninSabtu;

  if (!jamHariIni) {
    return { buka: false, teks: `TUTUP · BUKA SENIN ${layanan.seninSabtu.open}` };
  }
  const bukaSekarang = menit >= keMenit(jamHariIni.open) && menit < keMenit(jamHariIni.close);
  if (bukaSekarang) {
    return { buka: true, teks: `BUKA · S.D. ${jamHariIni.close}` };
  }
  if (menit < keMenit(jamHariIni.open)) {
    return { buka: false, teks: `TUTUP · BUKA ${jamHariIni.open}` };
  }
  const besok = NAMA_HARI[(hari + 1) % 7];
  const jamBesok = (hari + 1) % 7 === 0 ? layanan.minggu : layanan.seninSabtu;
  return {
    buka: false,
    teks: jamBesok ? `TUTUP · BUKA ${besok.toUpperCase()} ${jamBesok.open}` : `TUTUP · BUKA SENIN ${layanan.seninSabtu.open}`,
  };
}
