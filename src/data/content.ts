export interface Product {
  id: string; name: string; note: string; description: string; color: string; image: string; width: number; height: number;
}
// Deskripsi lima varian bersumber dari company profile PDF v2 (hal. 05).
// Keputusan owner (2026-11-14): situs menampilkan lima varian sesuai PDF v2;
// Sari Asem tidak lagi ditampilkan.
export const products: Product[] = [
  { id: 'kunyit-asem', name: 'Kunyit Asem', note: 'Segar, dengan sentuhan nostalgia.', description: 'Perpaduan kunyit, Asem Jawa dan Rempah menghasilkan cita rasa yang khas dan menyegarkan untuk menemani segala aktivitas.', color: '#ead6ab', image: '/images/kunyit-asem.webp', width: 1131, height: 1600 },
  { id: 'beras-kencur', name: 'Beras Kencur', note: 'Rasa akrab. Momen yang dekat.', description: 'Racikan Beras Kencur menghadirkan sensasi unik, lembut dan gurih di tiap tegukannya.', color: '#e7d4cc', image: '/images/beras-kencur.webp', width: 794, height: 1123 },
  { id: 'pokak-jahe', name: 'Pokak Jahe', note: 'Hangat dalam setiap cerita.', description: 'Perpaduan Jahe dan Rempah-rempah pilihan menghasilkan cita rasa hangat dengan aroma yang menggugah selera.', color: '#d9ddca', image: '/images/pokak-jahe.webp', width: 1120, height: 1400 },
  { id: 'mpon-mpon', name: 'Mpon Mpon', note: 'Kaya rempah, dekat dengan tradisi.', description: 'Kombinasi Rempah dengan berbagai rimpang seperti Temulawak, Kunyit, Jahe dan kencur menyajikan cita rasa herbal Nusantara.', color: '#e6d7c5', image: '/images/mpon-mpon.webp', width: 1120, height: 1400 },
  { id: 'lemon-jahe', name: 'Lemon Jahe', note: 'Cerahnya lemon, khasnya jahe.', description: 'Segarnya Lemon dan hangatnya Jahe bertemu wangi Sereh, menggugah selera untuk menjadi teman di semua aktivitas.', color: '#d7e2dc', image: '/images/lemon-jahe.webp', width: 794, height: 1123 },
];
export const faqs = [
  ['Apa saja pilihan racikan Enten?', 'Ada lima pilihan: Kunyit Asem, Beras Kencur, Pokak Jahe, Mpon Mpon, dan Lemon Jahe. Buka kartu racikan untuk menjelajahi masing-masing varian.'],
  ['Bagaimana cara memesan?', 'Pilih racikan, tentukan jumlah, lalu siapkan pesan melalui formulir di atas. Klik Lanjut ke WhatsApp untuk membuka percakapan dengan Enten. Periksa pesan lalu kirim sendiri di WhatsApp. Harga, stok, dan pengiriman dikonfirmasi bersama tim Enten.'],
  ['Berapa harga dan ukuran botolnya?', 'Harga dan ukuran resmi sedang menunggu konfirmasi tim Enten. Angka pada gambar botol AI bukan acuan pembelian. Tanyakan daftar produk terbaru sebelum memesan.'],
  ['Bagaimana penyimpanan dan masa simpannya?', 'Ikuti petunjuk pada kemasan asli dan konfirmasikan kepada tim Enten. Kami belum menampilkan suhu penyimpanan atau masa simpan karena informasinya perlu diverifikasi.'],
  ['Apakah tersedia pengiriman ke daerah saya?', 'Ketersediaan, area layanan, jadwal, dan ongkir perlu dikonfirmasi sebelum pemesanan. Sebutkan kota tujuan saat menghubungi Enten.'],
  ['Di mana saya bisa melihat komposisinya?', 'Komposisi lengkap dan informasi alergen perlu dicek pada label asli atau ditanyakan langsung kepada tim Enten. Gambar rempah dan deskripsi rasa di demo ini bukan daftar komposisi resmi.'],
];
export const posts = [
  { title: 'Satu jeda, banyak cerita.', category: 'RITUAL SEHARI-HARI', image: '/images/kunyit-asem.webp', text: 'Tutup sebentar layar. Tarik napas. Beri ruang untuk rasa yang akrab. Bersama Enten, momen sederhana pun layak dinikmati.', caption: 'Satu jeda, banyak cerita. Beri ruang untuk rasa yang akrab di tengah harimu. Racikan mana yang ingin kamu kenali lebih dekat? #Enten #TemanKeseharian' },
  { title: 'Kenalan lagi dengan rempah.', category: 'CERITA RASA', image: '/images/rempah.webp', text: 'Dari kunyit sampai jahe, setiap bahan punya karakter. Mari menjelajahi kekayaan rasa yang begitu dekat dengan keseharian Indonesia.', caption: 'Dari kunyit sampai jahe, setiap rempah punya cerita. Yuk, kenalan lagi dengan rasa-rasa Nusantara lewat Lima Racikan Enten. #Enten #CeritaRempah' },
  { title: 'Apa racikan pilihanmu?', category: 'LIMA RACIKAN', image: '/images/lemon-jahe.webp', text: 'Suka karakter rempah yang tegas atau kesan citrus yang cerah? Mulai dari rasa yang paling membuatmu penasaran.', caption: 'Lima racikan, lima cara menikmati jeda. Kunyit Asem, Beras Kencur, Pokak Jahe, Mpon Mpon, atau Lemon Jahe—mana yang ingin kamu coba? #Enten #ItsAboutAChoice' },
];
export function createOrderMessage(name: string, quantity: number, city: string): string {
  if (!products.some(p => p.name === name)) throw new Error('Pilih racikan yang tersedia.');
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) throw new Error('Jumlah harus 1–99 botol.');
  return `Halo Enten, saya ingin menanyakan pesanan:\nRacikan: ${name}\nJumlah: ${quantity} botol\nKota tujuan: ${city.trim() || 'Belum diisi'}\nMohon info harga, ukuran, ketersediaan, ongkir, dan cara pembayaran. Terima kasih.`;
}

// Business contact explicitly supplied by the owner (company profile PDF, halaman Kontak).
export const whatsappNumber = '6287782437781';
export function createWhatsAppUrl(message: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
