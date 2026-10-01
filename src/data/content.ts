export interface Product {
  id: string; name: string; note: string; description: string; color: string; image: string;
}
// Flavor descriptions are proposed copy, not verified product specifications.
export const products: Product[] = [
  { id: 'kunyit-asem', name: 'Kunyit Asem', note: 'Segar, dengan sentuhan nostalgia.', description: 'Bayangkan pertemuan rasa asam yang cerah dan karakter kunyit yang khas. Sebuah jeda kecil di tengah hari yang panjang.', color: '#ead6ab', image: '/images/kunyit-asem.webp' },
  { id: 'beras-kencur', name: 'Beras Kencur', note: 'Rasa akrab. Momen yang dekat.', description: 'Karakter lembut dengan aroma kencur yang mengingatkan pada rumah. Untuk menemani percakapan dan waktu senggangmu.', color: '#e7d4cc', image: '/images/beras-kencur.webp' },
  { id: 'pokak-jahe', name: 'Pokak Jahe', note: 'Hangat dalam setiap cerita.', description: 'Karakter jahe yang tegas, untuk kamu yang menyukai rasa rempah. Teman menikmati sore tanpa perlu terburu-buru.', color: '#d9ddca', image: '/images/pokak-jahe.webp' },
  { id: 'mpon-mpon', name: 'Mpon Mpon', note: 'Kaya rempah, dekat dengan tradisi.', description: 'Sebuah ajakan berkenalan lagi dengan ragam rasa rimpang Nusantara. Berkarakter dan penuh cerita.', color: '#e6d7c5', image: '/images/mpon-mpon.webp' },
  { id: 'lemon-jahe', name: 'Lemon Jahe', note: 'Cerahnya lemon, khasnya jahe.', description: 'Perpaduan kesan citrus yang cerah dan karakter jahe. Pilihan untuk memberi warna berbeda pada ritual harianmu.', color: '#d7e2dc', image: '/images/lemon-jahe.webp' },
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

// Business contact explicitly supplied by the owner.
export const whatsappNumber = '6281316362769';
export function createWhatsAppUrl(message: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
