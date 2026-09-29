# Enten — local prototype design QA

Date: 2026-09-29. Scope: local interactive draft, not public-release approval.

## Source visual truth

`C:/Users/mocha/.codex/generated_images/01a0ec81-dda3-7081-bebb-cad4a8fa8f76/exec-9ef4d6b8-9d7b-4def-92b7-42dfd7f9e660.png`

Source: 972 × 1619 px wireframe. Subsequent explicit user changes supersede its static illustration: use the ultra-realistic 10-second hero and the five generated bottle concepts, and add mock wording, posts, ordering, and Q&A.

## Rendered evidence

Implementation URL: http://127.0.0.1:4173/

- `D:/project/AI/enten/qa/desktop-reference-width-final.png` — CSS viewport 972 × 1000, screenshot content 957 × 4030.
- `D:/project/AI/enten/qa/desktop-full.png` — CSS viewport 1440 × 1000, screenshot content 1425 × 4346.
- `D:/project/AI/enten/qa/desktop-hero.png` — content 1425 × 990.
- `D:/project/AI/enten/qa/mobile-hero.png` — CSS viewport 390 × 844, content 375 × 812.
- `D:/project/AI/enten/qa/mobile-products.png` — same mobile viewport, Kunyit Asem expanded.
- `D:/project/AI/enten/qa/mobile-full.png` — content 375 × 6843.
- `D:/project/AI/enten/qa/tablet-products-final.png` — CSS viewport 768 × 1024, content 753 × 1004.

Browser devicePixelRatio was 1. Browser captures exclude the 15 px scrollbar; compare content regions rather than interpreting the scrollbar difference as drift. No image stretching or density upscaling. Source and final full-page capture were emitted together in one comparison input. The source is a compact wireframe; filled copy, requested posting section, six FAQ entries, and working message composer intentionally increase total page height. This is not a pixel-identical screenshot clone.

## Comparison history and findings

1. Initial desktop composition preserved the editorial header/hero/story/product/pair/ordering/FAQ/closing structure. Photo assets replace wireframe illustration by request. In the 972 px comparison, the hero minimum height was too large and paired editorial panels unnecessarily stacked their internal image/text regions. Classified P2.
2. Corrected 761–1100 px hero proportions, reduced story padding, retained image/text splits in the editorial cards, and reduced product-card height from 520 to 460 px. Re-captured at the same reference-width viewport. See `desktop-reference-width.png` before and `desktop-reference-width-final.png` after.
3. Mobile hero text crossed bright ingredients; strengthened the solid dark overlay. Final evidence: `mobile-hero.png`. Headline remains readable, CTA separated, image stays visible.
4. Focused mobile and tablet product screenshots verified that bottle images are not stretched, labels for collapsed cards remain readable, and the open detail/CTA fits. Final tablet panel clientHeight and scrollHeight both 373 px; mobile settled panel both 380 px. No horizontal document overflow at 390, 768, 972, or 1440 px.

No remaining actionable P0/P1/P2 visual issues for the explicitly labeled local draft. Publication blockers below remain and are not waived by this prototype pass.

## Required fidelity surfaces

- **Typography:** locally bundled Cormorant Garamond and DM Sans preserve serif editorial headings and compact sans body copy. These are a close stylistic interpretation, not a verified font match to the generated wireframe. Hero title and CTA preserved. Mobile headings and vertical desktop product labels checked visually.
- **Spacing/layout:** split story, expanding five-card row, paired editorial panels, ruled FAQ and burgundy closing preserved. Mobile uses vertical accordion. Extra posting/composer sections are requested functional additions. No clipped main controls at tested sizes.
- **Colors/tokens:** original nine-color palette retained as CSS variables. Cream base, burgundy CTAs, olive hero/editorial, muted variant cards. Mobile hero contrast improved. This is visual contrast review, not a full automated WCAG audit.
- **Images:** supplied AI assets optimized to WebP; 10-second MP4/WebM hero uses a poster, loops, and has pause/play. Images loaded successfully in browser. Generated packaging is expressly not production-accurate; disclosure is present.
- **Copy/content:** exact five product names and hero title retained. Three sample posts with captions, six Q&A entries, and editorial mock copy added. No invented price/contact/shipping/shelf-life data is treated as official.

## Interaction verification

- Kunyit Asem initially expanded.
- Every other product opened through its named button; previously selected product collapsed.
- Enter opens/closes the focused product; closing all yields zero expanded controls and zero visible detail panels. Solid keyboard focus outline observed.
- Hidden product panels use the hidden attribute and do not expose their CTAs.
- Mobile Menu opens; choosing Produk navigates and closes the menu.
- Product CTA preselects Lemon Jahe in the composer.
- Three bottles and Bekasi produce the correct message; no order is sent.
- Copy message button reports successful clipboard write.
- FAQ opens through its visible summary.
- Hero duration reads 10 seconds; pause/play both verified through UI and media state.
- Video pauses outside viewport; returning to hero resumes unless manually paused.
- Browser error log empty on the inspected page.
- No public deployment or social post was performed.

## Technical verification

- Astro check: 0 errors, 0 warnings, 0 hints (15 files).
- Unit tests: 5/5 passing.
- Production static build: successful.
- npm audit --omit=dev: zero vulnerabilities at verification time.
- Astro 7.3.5 runs with the official WASM compiler; Node prints an experimental WASI notice. The operating system security policy and TLS verification remain unchanged.
- AGENTS.md hash unchanged: F394938772323ED70F20A080E8CE921935B33259181DB25C3D0E4C409361BDCC.

## Open questions / publication blockers

- Replace or approve actual bottle photography: AI images contain unverified label text and volume markings.
- Brand owner must approve all mock copy and provide official composition, prices, sizes, storage instructions, fulfillment information, and transaction channel.
- Prototype has noindex/nofollow and explicit demo notices. No real checkout or order transmission.
- User has not yet approved the coded result.

## Follow-up / residual coverage

- Reduced-motion CSS and matchMedia logic are implemented and source-reviewed; OS preference emulation was not available through this browser capability, so that preference path has not been exercised in-browser.
- No cross-browser or physical-device testing, full automated accessibility audit, or Lighthouse run claimed.
- Minor P3: review final typography and spacing after official copy replaces drafts.

## Implementation checklist

- [x] Preserve selected design hierarchy with requested asset updates.
- [x] Implement product interaction and responsive navigation.
- [x] Add mock copy, posting, order message preparation, and Q&A.
- [x] Run checks, tests, build, security audit, and browser QA.
- [x] Keep preview local; protect agent instruction files.
- [ ] Obtain user approval and verified business assets before publication.

final result: passed

## Revisi hero scroll — 2026-09-29

Permintaan terbaru: gerakan lebih prominent, mengikuti scroll, tanpa loop. Hero kini menjadi viewport sticky selama lintasan scroll normal (80vh desktop/tablet, 65vh mobile). Ini sengaja membuat hero lebih tinggi daripada versi awal; section lain tidak diubah.

- Aset baru: `public/video/hero-scroll.mp4`, H.264 1280×720, 30fps, 10 detik, 8.11 MB; keyframe setiap 6 frame untuk seek.
- Kamera bergerak monoton dari skala 1.00 ke 1.32; bukan gerak independen bahan atau video generatif baru.
- Scroll memetakan posisi ke currentTime; video selalu paused, tanpa autoplay/loop. Posisi terakhir dibatasi ke frame terakhir, bukan reset ke awal.
- Browser: desktop scroll y=440 -> 4.013529s; pemeriksaan berikutnya tetap 4.013529s saat diam. Mobile y=300 -> 3.351722s, reverse ke y=200 -> 1.536300s. CTA menuju #racikan berhasil.
- Tampilan 1440, 768, 390px diperiksa; tidak ada overflow horizontal. Screenshot terbaru: `qa/hero-scroll-middle.png`, `qa/hero-scroll-tablet.png`, `qa/hero-scroll-mobile.png`. Screenshot hero lama di atas bersifat historis.
- Tombol mengaktifkan/menonaktifkan scrub, bukan play/pause. Reduced-motion memakai layout statis tanpa lintasan panjang dan tidak memuat video pada kunjungan awal. Jalur preferensi OS tetap source-reviewed, belum diuji dengan emulasi browser.
- Pemeriksaan Astro 18 files: 0 errors/warnings/hints; 7/7 tests; production build berhasil. AGENTS.md hash tetap sama.
- Ukuran aset dan kelancaran seek perlu diuji lagi pada perangkat mobile fisik/jaringan lambat. Browser lokal bukan jaminan performa semua perangkat.

Status revisi: implementasi selesai, verifikasi lokal lulus; menunggu review user. Batasan draft/AI/izin publikasi sebelumnya tetap berlaku.

## Koreksi perilaku scroll normal — 2026-09-29

Menggantikan revisi sticky di atas sesuai feedback user: hero kembali ke tinggi responsif semula, position relative, tanpa pin/sticky atau tambahan tinggi track. Scroll halaman dan zoom gambar berjalan bersamaan. Animasi memakai transform gambar poster secara langsung; tidak memutar atau melakukan seek MP4 sehingga tidak bergantung pada kesiapan decoder video. Video 10 detik sebelumnya tetap tersimpan tetapi tidak dipakai halaman. Gerakan tidak lagi memiliki durasi waktu; kemajuannya murni jarak scroll.

Bukti browser: desktop y=0 hero top=117.84375 scale=1; y=200 hero top=-82.15625 scale=1.09678. Saat tombol gerak dinonaktifkan, y berubah 85 ke 185 tetapi scale tetap 1.04113. Mobile y=150 hero top=-34.625 scale=1.06527. Gambar loaded naturalWidth=1280, tidak ada horizontal overflow. Screenshot `qa/hero-flow-desktop.png` dan `qa/hero-flow-mobile.png` menggantikan bukti sticky. Reduced-motion tetap source-reviewed, belum emulasi OS. Section lain tidak diubah.

Status: verifikasi lokal lulus; review user masih diperlukan.
