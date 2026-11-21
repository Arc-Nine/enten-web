/**
 * Data perusahaan Sabrang Malsico — bersumber dari company profile PDF resmi
 * VERSI 2 (reference/sabrang_malsico_v2.pdf, transkripsi text layer:
 * reference/wording-extract-v2.md). Penyuntingan hanya merapikan tampilan
 * tanpa mengubah makna.
 */

export const company = {
  name: 'Sabrang Malsico',
  brand: 'ENTEN Herbal Drink',
  location: 'Kota Bekasi',
  about: {
    lead: 'Sabrang Malsico adalah perusahaan perorangan yang memulai usahanya dengan memproduksi minuman herbal tradisional dengan merek ENTEN.',
    paragraphs: [
      'Melalui ENTEN kami mengembangkan beragam pilihan minuman herbal yang terinspirasi dari kekayaan racikan tradisional Indonesia. Dengan mengedepankan nilai kemanfaatan, kemitraan, dan pengembangan usaha berkelanjutan, Sabrang Malsico berkomitmen untuk terus mengembangkan produk serta memperluas jangkauan kerja sama dalam berbagai segmen pasar.',
      'Berlokasi di Bekasi, Sabrang Malsico didukung oleh fasilitas produksi yang menggunakan peralatan semiotomatis untuk menunjang proses pengolahan minuman herbal.',
      'Penggunaan peralatan tersebut merupakan bagian dari upaya perusahaan dalam mendukung kelancaran proses produksi, pengembangan kapasitas, serta penerapan praktik kebersihan dalam kegiatan operasional.',
    ],
  },
  sejarah: [
    {
      title: 'Semangat yang memberi manfaat',
      text: 'Sabrang Malsico dibangun atas semangat untuk menghadirkan usaha yang memberikan manfaat bagi masyarakat dan lingkungan. Berangkat dari bidang kuliner dan pertanian, perusahaan kemudian mengembangkan fokus usahanya pada produksi minuman herbal tradisional. Pengembangan usaha ini dilandasi oleh nilai spiritual, semangat kemandirian, serta keyakinan bahwa kegiatan bisnis perlu memberi kebermanfaatan seluasnya.',
    },
    {
      title: 'Menjangkau segmen pelanggan',
      text: 'Seiring perkembangan usaha, ENTEN mulai menjangkau berbagai segmen pelanggan melalui kegiatan penjualan dan kemitraan. Pengalaman tersebut menjadi landasan bagi Sabrang Malsico untuk terus memperkuat pengembangan produk, memperluas jaringan distribusi, serta membangun hubungan kerja sama yang saling memberikan manfaat.',
    },
    {
      title: 'Memperluas kemitraan',
      text: 'Ke depan, perusahaan berupaya memperluas peluang kemitraan dengan tetap menjunjung tinggi prinsip ukhuwah, kemaslahatan, dan kebermanfaatan.',
    },
  ],
  visi: 'Terwujudnya Korporasi yang Sehat, Kuat, Manfaat, Berkah',
  misi: 'Membangun, Memperbaiki dan Mengembangkan Korporasi secara Berkelanjutan',
  mitra:
    'Kami telah menjalin kerjasama-kerjasama kemitraan dengan Koperasi, Minimarket, Rumah Sakit, Klinik, Cafe, Bakery, Car Wash, Kantin dll, baik yang berlokasi di kantor-kantor Kementerian, Pemda, BUMN, Kampus dan Swasta. Patut disyukuri bahwa kerjasama yang terjalin berjalan baik.',
  mitraTypes: [
    'Koperasi',
    'Minimarket',
    'Rumah Sakit',
    'Klinik',
    'Cafe',
    'Bakery',
    'Car Wash',
    'Kantin',
  ],
  mitraLocations: ['Kantor-kantor Kementerian', 'Pemda', 'BUMN', 'Kampus', 'Swasta'],
  pengiriman:
    'Kami memiliki dan menggunakan kurir internal guna mendistribusikan produk ke mitra-mitra kerjasama, serta kurir eksternal guna mendistribusikan pesanan dari media sosial, marketplace, aplikasi dan pemesanan via online lainnya.',
  event:
    'Guna memperluas publikasi dan pemasaran, kami telah berpartisipasi aktif dalam event bazar dan pameran, baik yang diselenggarakan di kantor-kantor Pemerintahan, Pemda, BUMN, Rumah Sakit, dan Swasta, serta dalam kesempatan event-event lainnya.',
  eventCaptions: ['Bazar di kantor BKN', 'Bazar Fun Run HARRIS Share The Miles 2026'],
};

export const contacts = {
  whatsappDisplay: '0877-8243-7781',
  whatsappNumber: '6287782437781',
  email: 'entencorp@gmail.com',
  instagram: '@enten.herbaldrink',
  tiktok: '@entenjamu',
  location: 'Kota Bekasi',
};

// export const whatsappGreeting = 'Selamat Datang di Enten Herbal Drink ❤️\nAda yang bisa kami bantu hari ini kak?';
// export const whatsappGreeting = 'Selamat Datang di Enten Herbal Drink \u2764\nAda yang bisa kami bantu hari ini kak?';
export const whatsappGreeting = 'Halo Enten, saya ingin mengenal Enten dan peluang kemitraan Sabrang Malsico.';

// Gunakan api.whatsapp.com/send, bukan wa.me: redirect wa.me merusak emoji
// menjadi U+FFFD (). encodeURIComponent tetap dipakai tepat satu kali.
export const whatsappUrl = `https://api.whatsapp.com/send?phone=${contacts.whatsappNumber}&text=${encodeURIComponent(whatsappGreeting)}`;
export const mailtoUrl = `mailto:${contacts.email}`;
export const instagramUrl = `https://instagram.com/${contacts.instagram.replace('@', '')}`;
export const tiktokUrl = `https://tiktok.com/${contacts.tiktok}`;
