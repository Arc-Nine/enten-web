/**
 * Data presentasi company profile (beranda).
 * Sumber kebenaran tunggal: company.ts (teks perusahaan & kontak)
 * dan content.ts (daftar varian). File ini hanya menambahkan
 * lapisan presentasi: warna ambient, fase linimasa, dan gambar.
 */
import { products } from './content.ts';
import { company, contacts } from './company.ts';

export interface Variant {
  id: string;
  name: string;
  note: string;
  image: string;
  width: number;
  height: number;
  /** Warna ambient latar saat panel aktif (mode gelap). */
  ambient: string;
  /** Aksen tipis untuk garis & indeks kartu. */
  accent: string;
}

export const tagline = "It's About A Choice.";

const variantSkin: Record<string, { ambient: string; accent: string }> = {
  'kunyit-asem': { ambient: '#7a5c1e', accent: '#f2e3bd' },
  'beras-kencur': { ambient: '#6b4a41', accent: '#e7d4cc' },
  'pokak-jahe': { ambient: '#55603c', accent: '#d9ddca' },
  'mpon-mpon': { ambient: '#6a4a2c', accent: '#e6d7c5' },
  'lemon-jahe': { ambient: '#4f6157', accent: '#d7e2dc' },
  'sari-asem': { ambient: '#7a4a33', accent: '#e9c9a8' },
};

export const variants: Variant[] = products.map((p) => ({
  id: p.id,
  name: p.name,
  note: p.note,
  image: p.image,
  width: p.width,
  height: p.height,
  ambient: variantSkin[p.id].ambient,
  accent: variantSkin[p.id].accent,
}));

export const variantMeta = {
  size: '270 ml',
  storage: 'Simpan dalam lemari pendingin · Kocok dahulu sebelum diminum',
};

export const navLinks = [
  { href: '#profil', label: 'Profil' },
  { href: '#sejarah', label: 'Sejarah' },
  { href: '#produksi', label: 'Produksi' },
  { href: '#kemitraan', label: 'Kemitraan' },
  { href: '#kontak', label: 'Kontak' },
];

export const about = {
  lead: company.about.lead,
  paragraphs: company.about.paragraphs,
};

export const vision = { quote: company.visi };
export const mission = { quote: company.misi };

export const licensing = [
  { title: 'Perijinan Usaha', detail: 'Nomor Induk Berusaha — Perizinan Berusaha Berbasis Risiko' },
  { title: 'Perijinan Merk dari HAKI', detail: 'Sertifikat Merk “ENTEN” terdaftar' },
  { title: 'Perijinan Halal', detail: 'Sertifikasi Produk Halal — Halal Indonesia' },
];

const phases = ['Awal & Merintis', 'Tumbuh', 'Hari Ini & Selanjutnya'];
export const history = company.sejarah.map((s, i) => ({
  phase: phases[i],
  title: s.title,
  text: s.text,
}));

export const production = {
  text: `${company.about.paragraphs[1]} ${company.about.paragraphs[2]}`,
  image: '/images/profile/prod.jpeg',
  imageAlt:
    'Dokumentasi proses produksi Enten: bahan rimpang segar tersortir, mesin pengolahan UMKM, perebusan, pembotolan, dan penyimpanan dingin.',
};

export const events = {
  text: company.event,
  image: '/images/profile/event-1.jpg',
  imageAlt:
    'Suasana bazar Enten: pengunjung mendatangi booth di tenda, banner logo Enten dengan kode pindai, serta cooler box berisi botol siap jual.',
  captions: ['Bazar di kantor BKN', 'Bazar Fun Run HARRIS Share The Miles 2026'],
};

export const specialPackaging = {
  text: 'Untuk event-event khusus, Enten hadir dalam kemasan khusus: karton genggam, besek anyaman, pita, dan tag ucapan — siap menjadi suguhan maupun hantaran.',
  image: '/images/profile/kemasan-khusus.jpg',
  imageAlt:
    'Kemasan khusus Enten untuk event: karton genggam berjendela, besek anyaman berpita, dan tag logo Enten.',
};

export const partnership = {
  text: company.mitra,
  sectors: company.mitraTypes,
  image: '/images/profile/partner.jpg',
  imageAlt:
    'Kolase titik mitra Enten: display botol di Balaikota Prov. DKI Jakarta, Masjid Fatahillah Balikota, RS. Hermina Bekasi, toko Omil, dan Apartemen Pancoran Riverside.',
};

export const delivery = {
  text: company.pengiriman,
  image: '/images/profile/delivery.jpg',
  imageAlt:
    'Gerobak distribusi Enten berisi botol-botol siap antar, dengan panel kontak WhatsApp, Instagram, dan situs.',
};

export const contact = {
  ...contacts,
  instagramUrl: `https://instagram.com/${contacts.instagram.replace('@', '')}`,
  tiktokUrl: `https://tiktok.com/${contacts.tiktok}`,
  whatsappNote:
    'Angka pada halaman kontak resmi company profile. Foto gerobak menampilkan 0877-8245-7781; menunggu konfirmasi final owner.',
};

export function createWhatsAppUrl(message: string): string {
  return `https://wa.me/${contacts.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
