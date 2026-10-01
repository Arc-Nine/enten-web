# Enten Herbal Drink

Website konsep lokal: Astro, TypeScript, CSS native. Tidak ada backend, pelacakan, pembayaran, atau pengiriman pesanan.

## Menjalankan (PowerShell, Node 22.12+)

```powershell
$env:ASTRO_TELEMETRY_DISABLED='1'
npm ci
npm run dev -- --host 127.0.0.1 --port 4173
```

Preview: http://127.0.0.1:4173

```powershell
npm run check
npm test
npm run build
```

Tidak ada script lint; Astro check memeriksa tipe dan komponen. Lockfile menyimpan dependency terpilih. Script dev/check/build/preview menggunakan CLI Astro standar sehingga tidak bergantung pada wrapper lokal di tools/ yang tidak masuk Git. Biarkan Astro memilih compiler sesuai platform melalui optionalDependencies; jangan memasang binding wasm32 sebagai dependency wajib atau menggunakan --force. Jika Application Control Windows memblokir compiler native, jalankan verifikasi di lingkungan yang diizinkan (misalnya Linux/CI); jangan melemahkan kebijakan keamanan.

## Konten dan komponen

- `src/data/content.ts`: lima varian, contoh deskripsi rasa, posting dan caption, FAQ, pembuat pesan pemesanan.
- `src/components/`: section terpisah.
- `src/styles/global.css`: palet dan layout responsif.
- `src/scripts/site.ts`: accordion, menu, video, pembuat pesan.
- `public/images/`: gambar WebP terpilih dan poster.
- `public/video/`: hero 10 detik, MP4/WebM.
- `tests/content.test.ts`: validasi konten dan pesan.

## Keputusan visual

Mengikuti wireframe editorial pilihan ketiga. Perubahan eksplisit terbaru: hero fotorealistis bergerak 10 detik dan foto konsep botol AI. Section Catatan Enten berisi tiga contoh posting sesuai permintaan terbaru. Kartu desktop melebar saat diklik; mobile membuka ke bawah.

## Batasan sebelum publikasi

- Seluruh gambar botol adalah konsep AI, bukan reproduksi label resmi. Beberapa gambar memuat ukuran atau tulisan rekaan. Banner dan catatan aset mengungkapkan ini; jangan menganggapnya foto katalog resmi.
- Ganti dengan foto kemasan asli yang disetujui sebelum publikasi.
- Copy cerita, karakter rasa, dan posting merupakan draft editorial untuk ditinjau Enten, bukan fakta riwayat brand atau komposisi.
- Harga, ukuran, komposisi, masa simpan, petunjuk penyimpanan, stok, pengiriman, dan kontak pemesanan memerlukan konfirmasi.
- Formulir hanya membentuk pesan secara lokal. Tidak mengirim, menyimpan data, atau membuat pesanan. Instagram dibuka melalui URL publik yang diberikan user; bukan integrasi DM otomatis.
- Meta robots masih `noindex, nofollow`. Tidak ada deployment publik.
- Hero memiliki tombol jeda dan menghormati reduced motion; animasi berhenti saat di luar layar.
- Jangan mengubah AGENTS.md atau AGENTS.override.md.

## Referensi

- Instagram yang diberikan user: https://www.instagram.com/enten.herbaldrink/
- Mockup: `C:/Users/mocha/.codex/generated_images/01a0ec81-dda3-7081-bebb-cad4a8fa8f76/exec-9ef4d6b8-9d7b-4def-92b7-42dfd7f9e660.png`
- Font berlisensi OFL melalui Fontsource: Cormorant Garamond dan DM Sans. Ikon Phosphor.

## Hero berbasis scroll (revisi terbaru)

`src/scripts/hero-scroll.ts` mengendalikan frame video dari posisi scroll, bukan waktu playback. `hero-progress.ts` berisi pemetaan yang diuji. Tidak ada autoplay atau loop. Hero sticky satu viewport memberi ruang untuk zoom kamera 1.00–1.32; scroll balik mengembalikan frame. Kontrol gerak bisa dinonaktifkan. Reduced motion/no-JS mempertahankan hero statis tanpa lintasan sticky panjang.

Aset aktif adalah `public/video/hero-scroll.mp4` (10 detik, 30fps, 1280×720, sekitar 8.11 MB). Reproduksi dengan `tools/render_hero_scroll.py` memakai still fotorealistis yang sudah disetujui. Gerak berupa kamera pada gambar, bukan masing-masing rempah. Keterangan pause/play loop sebelumnya adalah perilaku versi lama.

### Koreksi terbaru: tanpa sticky

Hero kembali bergerak dalam alur halaman biasa. Zoom dianimasikan langsung pada `/images/hero-poster.jpg` berdasarkan jarak scroll (skala 1–1.32). Tidak ada pin/sticky, ruang scroll tambahan, autoplay, video seeking, atau durasi waktu playback. Aset video 10 detik disimpan sebagai versi sebelumnya, tidak dimuat oleh homepage. Tombol hanya membekukan zoom, tidak menahan scroll halaman.
