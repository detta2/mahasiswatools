/* ============================================================
   konten-tool.js — Konten statis KHAS per tool untuk halaman SEO.
   Setiap entri ditulis berdasarkan fungsi NYATA tool di app.js
   (label kolom, placeholder, tombol, dan keluaran sebenarnya).
   buka    : paragraf pembuka khas tool (±60–100 kata)
   langkah : 4–6 langkah penggunaan yang menyebut kolom/tombol nyata
   faq     : 2 pasang tanya–jawab yang hanya relevan untuk tool ini
   ============================================================ */
module.exports = {

/* ================= ANTI ================= */
aidetect: {
  buka: "Pendeteksi ini menganalisis teks yang kamu tempel dengan tiga pendekatan statistik lokal: burstiness (seberapa bervariasi panjang kalimatmu dari satu kalimat ke kalimat berikutnya), kekayaan kosakata, dan keberadaan frasa klise yang sangat sering muncul pada keluaran model bahasa. Hasilnya adalah skor risiko beserta grafik panjang kalimat per kalimat dan sentence heatmap yang menunjukkan bagian mana yang terdengar paling monoton atau paling generik. Karena analisisnya heuristik dan berjalan 100% di browser, skor ini adalah bahan refleksi sebelum naskah dibaca dosen — bukan vonis, dan bukan pengganti penilaian manusia terhadap tulisanmu.",
  langkah: [
    "Tempel teks yang ingin diperiksa pada area kerja di atas — satu bab penuh atau beberapa paragraf yang paling kamu khawatirkan.",
    "Tekan tombol 🤖 Analisis Gaya Tulisan dan tunggu skor risiko beserta rinciannya muncul.",
    "Perhatikan 🌡️ Sentence Heatmap: kalimat yang ditandai monoton atau penuh klise adalah prioritas untuk ditulis ulang dengan bahasamu sendiri.",
    "Cek juga 📊 Grafik Panjang Kalimat — tulisan manusia biasanya bergelombang (campuran kalimat pendek dan panjang), bukan datar.",
    "Bila perlu, tekan 📋 Copy Laporan untuk menyimpan hasilnya, atau lanjut ke tombol 🪶 Perbaiki di Humanizer untuk mengedit kalimat yang ditandai."
  ],
  faq: [
    ["Apakah skor di sini sama dengan skor Turnitin AI atau GPTZero?", "Tidak. Tool ini memakai analisis heuristik lokal (variasi kalimat, kosakata, dan klise) dan sama sekali tidak terhubung ke Turnitin maupun GPTZero. Skor tinggi di sini adalah sinyal untuk memperbaiki tulisanmu, bukan jaminan hasil yang sama di layanan lain."],
    ["Mengapa tulisan saya sendiri bisa mendapat skor risiko tinggi?", "Tulisan yang sangat formal, monoton, dan penuh frasa baku memang bisa mirip pola statistik teks AI. Itu sebabnya hasil dilengkapi heatmap per kalimat — kamu bisa melihat persis bagian mana yang perlu diberi variasi dan sentuhan gaya menulismu sendiri."]
  ]
},
humanizer: {
  buka: "Humanizer ini adalah editor per kalimat, bukan alat pemutar kata otomatis. Teks yang kamu tempel dipecah menjadi kalimat-kalimat terpisah; kamu lalu mengedit tiap kalimat sambil dibantu analisis ritme (pola panjang kalimat) dan kamus klik-ganti berisi 50+ kata serta frasa klise khas AI beserta sinonim alaminya — satu klik mengganti kata klise dengan pilihan yang lebih manusiawi. Setelah semua kalimat dirapikan, gabungkan kembali menjadi teks utuh yang siap disalin. Alat ini membantu kamu menulis ulang dengan tanganmu sendiri, bukan menyamarkan teks hasil AI agar lolos detektor.",
  langkah: [
    "Tempel paragraf yang mau dirapikan ritmenya pada kolom yang tersedia.",
    "Tekan 🪶 Muat ke Editor Kalimat — teksmu dipecah menjadi daftar kalimat yang bisa diedit satu per satu.",
    "Baca bagian 🎵 Analisis Ritme untuk melihat pola panjang kalimatmu, lalu sunting kalimat yang terlalu seragam.",
    "Klik saran dari kamus klise (misalnya pasangan kata → sinonimnya) untuk mengganti kata yang terdengar generik.",
    "Tekan ✅ Gabungkan Hasil, lalu 📋 Copy Teks Hasil untuk memindahkan teks final ke naskahmu."
  ],
  faq: [
    ["Apakah Humanizer mengubah teks saya secara otomatis?", "Tidak. Tool ini menyediakan editor, analisis ritme, dan saran pengganti kata — tetapi keputusan dan penulisan ulangnya tetap kamu yang melakukan per kalimat. Hasil akhirnya adalah tulisanmu sendiri, bukan keluaran parafrase mesin."],
    ["Apa isi kamus klik-ganti di dalam tool ini?", "Kamus berisi 50+ kata dan frasa yang sangat sering muncul pada teks hasil AI (misalnya frasa pembuka yang klise) beserta usulan sinonim yang lebih wajar. Mengklik satu saran langsung mengganti kata tersebut di kalimat yang sedang kamu edit."]
  ]
},
scrubber: {
  buka: "Teks hasil salin-tempel dari chatbot AI sering membawa penumpang gelap yang tidak terlihat mata: karakter zero-width, spasi non-breaking (NBSP), sisa format markdown seperti tanda bintang dan pagar, serta artefak lain yang membuat dokumen terlihat janggal saat diperiksa dosen atau saat diformat di Word. Pembersih ini memindai teksmu, melaporkan jumlah dan jenis artefak yang ditemukan, lalu menghapus semuanya dalam satu klik. Hasilnya adalah teks bersih yang bisa disalin atau diunduh sebagai berkas .txt — isi dan kata-katamu sendiri tidak diubah sama sekali.",
  langkah: [
    "Tempel teks hasil copy-paste pada kolom bertanda ‘Tempel teks hasil copy-paste di sini…’.",
    "Tekan 🔍 Pindai Artefak dan baca 🧾 Laporan Artefak: berapa artefak ditemukan dan jenisnya apa saja.",
    "Tekan 🧽 Bersihkan Semuanya untuk menghapus seluruh artefak yang terdeteksi.",
    "Salin hasilnya dengan 📋 Copy Teks Bersih, atau simpan lewat ⬇️ Download .txt.",
    "Tempel teks bersih itu ke dokumenmu — format ulang seperlunya (font, spasi) sesuai template kampus."
  ],
  faq: [
    ["Karakter apa saja yang dibersihkan tool ini?", "Karakter zero-width (seperti U+200B), spasi non-breaking (NBSP), dan sisa markdown dari hasil salin-tempel LLM seperti tanda **, ##, atau ``` yang tertinggal. Semua yang dihapus dilaporkan dulu jumlahnya di laporan artefak sebelum kamu membersihkannya."],
    ["Apakah kata-kata dalam teks saya ikut berubah?", "Tidak. Tool ini hanya menghapus karakter tak kasatmata dan artefak format; susunan kata, kalimat, dan makna tulisanmu tetap persis sama seperti sebelum dibersihkan."]
  ]
},
sitasi: {
  buka: "Model AI terkenal sering mengarang referensi: nama penulis terdengar nyata, judulnya meyakinkan, tetapi jurnalnya tidak pernah ada. Verifikator ini mengecek setiap baris daftar pustakamu langsung ke basis data Crossref — registri metadata jurnal ilmiah dunia — dan menilai kemiripan judul yang ditemukan dengan sitasi yang kamu tulis. Setiap sitasi diberi status: terverifikasi bila judulnya cocok kuat dengan rekaman Crossref, meragukan bila kemiripannya rendah, atau tidak ditemukan bila tidak ada rekaman yang mirip sama sekali. Tool ini adalah satu-satunya di kategori ini yang memakai internet, karena datanya memang harus dicek ke sumber aslinya.",
  langkah: [
    "Tempel daftar pustakamu pada kolom Daftar Pustaka — satu sitasi penuh dalam satu baris, seperti format di Bab Daftar Pustaka skripsimu.",
    "Tekan 🔎 Verifikasi Semua ke Crossref dan tunggu prosesnya; tiap baris dicek satu per satu ke basis data Crossref.",
    "Baca status tiap sitasi: terverifikasi, kemiripan rendah, atau tidak ditemukan.",
    "Untuk sitasi yang meragukan atau tidak ditemukan, telusuri ulang sumber aslimu — cek DOI, ejaan nama penulis, tahun, dan judul di Google Scholar atau situs jurnalnya.",
    "Perbaiki atau ganti sitasi yang terbukti tidak ada sebelum naskahmu dikumpulkan."
  ],
  faq: [
    ["Sitasi saya berstatus ‘tidak ditemukan’ — pasti palsu?", "Belum tentu. Crossref kuat untuk jurnal internasional ber-DOI, tetapi banyak jurnal lokal, buku, dan prosiding Indonesia tidak terindeks di sana. Status itu berarti ‘tidak terbukti ada di Crossref’ — gunakan sebagai daftar prioritas untuk kamu telusuri manual, bukan vonis akhir."],
    ["Mengapa tool ini butuh internet padahal tool lain tidak?", "Karena keaslian referensi hanya bisa dipastikan dengan membandingkannya ke basis data ilmiah sungguhan. Pengecekannya dikirim langsung dari browsermu ke API publik Crossref (gratis, tanpa kunci API) — tidak melalui server MahasiswaTools."]
  ]
},
ceksitasi: {
  buka: "Dua kesalahan sitasi yang paling sering dicoret penguji adalah: mengutip sumber di dalam teks tetapi lupa memasukkannya ke daftar pustaka, dan sebaliknya — daftar pustaka berisi sumber yang ternyata tidak pernah dikutip di naskah. Pengecek ini membandingkan dua arah sekaligus: ia membaca semua sitasi dalam teksmu (pola seperti (Pranata, 2024) maupun Sari (2023)) dan semua entri daftar pustakamu, lalu mencocokkannya berdasarkan nama penulis dan tahun. Hasilnya adalah daftar selisih dua arah yang jelas, sehingga kamu tahu persis sitasi mana yang yatim dan entri mana yang tidak terpakai.",
  langkah: [
    "Tempel isi naskahmu (Bab 1–5 yang memuat sitasi) pada kolom Isi Naskah.",
    "Tempel daftar pustaka lengkapmu pada kolom Daftar Pustaka (format APA: Nama, I. (Tahun). Judul…).",
    "Tekan 🔍 Cocokkan Dua Arah dan tunggu hasil perbandingan muncul.",
    "Periksa kelompok pertama: sitasi yang dikutip di teks tetapi tidak ada di daftar pustaka — tambahkan entri lengkapnya.",
    "Periksa kelompok kedua: entri daftar pustaka yang tidak pernah dikutip — kutip di tempat yang tepat atau hapus dari daftar."
  ],
  faq: [
    ["Format sitasi seperti apa yang bisa dikenali tool ini?", "Sitasi kurung seperti (Pranata, 2024), sitasi naratif seperti Pranata (2024), dan bentuk et al. seperti (Pranata et al., 2024). Pencocokan dilakukan berdasarkan nama belakang penulis dan tahun terbit, lalu dibandingkan dengan entri di daftar pustakamu."],
    ["Apakah tool ini mengecek kebenaran isi jurnalnya juga?", "Tidak — tugas itu ada di tool Cek Daftar Pustaka Asli atau Palsu. Tool ini khusus memeriksa konsistensi dua arah antara yang kamu kutip di teks dan yang kamu daftarkan di daftar pustaka."]
  ]
},
deklarasi: {
  buka: "Semakin banyak kampus dan jurnal mewajibkan penulis menyatakan secara terbuka bagaimana AI dipakai dalam penulisan karya ilmiah. Generator ini menyusun pernyataan etis itu untukmu dalam dua versi sekaligus: versi Bahasa Indonesia dengan redaksi yang lazim untuk skripsi kampus, dan versi Bahasa Inggris bergaya jurnal internasional (Scopus/IEEE style) untuk kebutuhan publikasi. Kamu cukup mengisi identitas karya dan bentuk bantuan AI yang benar-benar kamu gunakan, lalu deklarasi rapi dihasilkan sebagai teks siap salin atau berkas .doc dwibahasa yang bisa langsung dilampirkan pada naskah.",
  langkah: [
    "Isi identitasmu pada kolom yang tersedia: nama lengkap, NIM, judul lengkap karya, dan nama universitas.",
    "Pilih/isi bentuk penggunaan AI yang benar-benar terjadi dalam proses penulisanmu — jujur apa adanya, karena inilah isi deklarasinya.",
    "Tekan 📜 Buat Deklarasi (ID + EN) untuk menghasilkan kedua versi sekaligus.",
    "Baca hasilnya di bagian 🇮🇩 Versi Skripsi Kampus dan 🌍 International Journal Version, sesuaikan bila ada detail yang kurang pas.",
    "Salin versi yang dibutuhkan dengan 📋 Copy Versi ID atau 📋 Copy English Version, atau unduh keduanya lewat ⬇️ Download .doc (2 Bahasa)."
  ],
  faq: [
    ["Apakah deklarasi dari tool ini otomatis sesuai aturan kampus saya?", "Tidak otomatis — tiap kampus punya redaksi dan kebijakan sendiri. Gunakan hasil tool ini sebagai draf pernyataan yang jujur, lalu cocokkan dengan pedoman integritas akademik kampusmu atau arahan dosen pembimbing sebelum dilampirkan."],
    ["Kapan saya memakai versi Bahasa Inggrisnya?", "Versi Inggris ditujukan untuk naskah yang akan dikirim ke jurnal atau konferensi internasional, yang umumnya meminta disclosure statement penggunaan AI. Untuk skripsi kampus, versi Bahasa Indonesia biasanya sudah mencukupi."]
  ]
},
buktiketik: {
  buka: "Editor ini merekam proses mengetikmu yang sesungguhnya — ketukan, koreksi, penghapusan, dan peristiwa tempel — selagi kamu menulis, lalu merangkumnya menjadi sertifikat bukti penulisan mandiri. Berbeda dari dokumen biasa yang hanya menunjukkan hasil akhir, linimasa pengerjaan dan snapshot berkala di editor ini memperlihatkan bahwa naskahmu tumbuh kata demi kata dari tanganmu sendiri. Bukti proses semacam ini berguna bila suatu saat keaslian tulisanmu dipertanyakan: kamu bisa menunjukkan perjalanan penulisannya, lengkap dengan statistik ketikan yang tersimpan otomatis di browser selama kamu bekerja.",
  langkah: [
    "Tulis judul dokumen pada kolom judul (misalnya ‘BAB I — Pendahuluan’), dan unggah logo kampus lewat 📤 Upload / Ganti Logo bila ingin tampil di sertifikat.",
    "Mulai mengetik langsung di area editor — teks dan statistik prosesmu tersimpan otomatis, jadi aman ditinggal dan dilanjutkan nanti.",
    "Tulis seperti biasa: mengoreksi dan menghapus tidak masalah, justru itulah bukti proses menulis yang alami dan tercatat di linimasa.",
    "Sesekali periksa bagian Linimasa Pengerjaan (Snapshot Berkala) untuk melihat riwayat pertumbuhan naskahmu.",
    "Bila selesai, tekan 🏅 Ekspor Sertifikat Bukti (.doc) untuk mengunduh sertifikat bukti penulisanmu."
  ],
  faq: [
    ["Apa persisnya yang direkam oleh editor ini?", "Statistik proses mengetik: jumlah ketukan, koreksi/penghapusan, dan peristiwa tempel (paste), beserta snapshot berkala isi tulisan. Bila kamu menempel teks dalam jumlah besar, peristiwa itu tercatat apa adanya — jadi menulis langsung di editor ini memberi bukti proses yang paling kuat."],
    ["Bagaimana bila saya ingin mulai dokumen baru?", "Gunakan tombol 🗑️ Reset Bukti & Mulai Dokumen Baru — riwayat dokumen lama akan dibersihkan dan pencatatan dimulai dari nol. Pastikan sertifikat dokumen sebelumnya sudah kamu ekspor bila masih diperlukan."]
  ]
},

/* ================= TULIS ================= */
dapus: {
  buka: "Pembuat daftar pustaka ini memformat entri referensimu mengikuti empat gaya sitasi yang paling umum diminta kampus: APA 7th, MLA 9th, Harvard, dan Vancouver. Kamu mengisi data sumbernya sekali — penulis, tahun, judul, dan penerbit/jurnal — lalu tool menyusunnya dengan aturan gaya yang dipilih, memberi huruf miring otomatis pada judul karya, dan mengurutkan seluruh daftarmu A–Z. Entri tersimpan di browser sehingga daftar pustaka bisa dibangun bertahap selama berbulan-bulan masa skripsi, lalu disalin dengan format miringnya utuh atau diunduh sebagai berkas .doc maupun .txt.",
  langkah: [
    "Pilih Gaya Sitasi di bagian atas: APA 7th, MLA 9th, Harvard, atau Vancouver — sesuaikan dengan pedoman kampusmu.",
    "Isi kolom penulis (misalnya ‘Santoso, Budi & Wulandari, Sari’), tahun terbit, judul karya, dan nama jurnal atau penerbit.",
    "Tekan ➕ Tambah ke Daftar — entri langsung diformat dan ditempatkan pada urutan A–Z yang benar.",
    "Ulangi untuk semua sumbermu; entri tersimpan otomatis sehingga bisa dilanjutkan kapan saja.",
    "Tekan 📋 Copy (dengan format italic) untuk menempel ke Word dengan huruf miringnya utuh, atau unduh lewat tombol ⬇️ Download .doc / .txt."
  ],
  faq: [
    ["Apakah daftar pustaka saya harus diurutkan manual?", "Tidak. Setiap entri yang kamu tambahkan otomatis disisipkan mengikuti urutan abjad A–Z berdasarkan nama penulis, sesuai kaidah daftar pustaka. Kamu juga bisa menghapus entri satu per satu bila ada sumber yang batal dipakai."],
    ["Mengapa huruf miring bisa hilang saat ditempel ke Word biasa?", "Penyalinan teks polos membuang format. Karena itu tool ini menyediakan tombol Copy khusus yang membawa format italic-nya, serta unduhan .doc — dua cara itu menjaga judul jurnal/buku tetap miring sesuai gaya sitasi."]
  ]
},
k16: {
  buka: "Template ini menghasilkan berkas Word .docx asli — bukan sekadar teks — berisi kerangka makalah/skripsi lengkap dari halaman sampul sampai Bab V, dengan margin 4-4-3-3 (atas 4 cm, kiri 4 cm, bawah 3 cm, kanan 3 cm) yang menjadi standar umum penulisan karya ilmiah di Indonesia. Berkas dibangun sebagai OOXML sungguhan melalui JSZip langsung di browser, lengkap dengan tempat judul, identitas penulis, dan struktur bab yang tinggal kamu isi. Cocok untuk memulai naskah tanpa berurusan dengan pengaturan margin dan halaman dari nol.",
  langkah: [
    "Isi nama kamu, NIM, program studi (misalnya Pendidikan Ekonomi), dan fakultas pada kolom yang tersedia.",
    "Lengkapi pula judul dan identitas lain yang diminta formulir sesuai naskahmu.",
    "Tekan ⬇️ Generate & Download .docx untuk menghasilkan berkas Word-nya.",
    "Buka berkas di Microsoft Word, WPS, atau LibreOffice — margin 4-4-3-3 dan struktur dari sampul sampai Bab V sudah tertata.",
    "Mulai menulis dengan mengganti teks penanda di tiap bab dengan isi naskahmu sendiri."
  ],
  faq: [
    ["Mengapa marginnya 4-4-3-3?", "Itu konvensi format karya ilmiah yang paling umum di kampus Indonesia: atas 4 cm, kiri 4 cm (memberi ruang jilid), bawah 3 cm, dan kanan 3 cm. Bila kampusmu memakai ukuran berbeda, ubah sekali di Word lewat menu Layout → Margins dan simpan sebagai template-mu sendiri."],
    ["Apakah .docx hasil unduhan benar-benar bisa diedit di Word?", "Bisa. Berkasnya adalah dokumen OOXML asli yang dibangun per bagian (bukan gambar atau PDF), jadi semua teks, judul bab, dan pengaturannya dapat diedit, ditambah, dan diformat ulang seperti dokumen Word biasa."]
  ]
},
proposal: {
  buka: "Generator proposal ini menyusun dokumen proposal utuh dalam format .docx asli untuk tiga kebutuhan yang berbeda: proposal penelitian/skripsi, proposal kegiatan mahasiswa (acara/UKM), dan proposal magang/PKL — masing-masing dengan struktur isi yang sesuai jenisnya. Proposal dilengkapi halaman sampul berlogo, sistematika bab yang lazim diminta pembimbing atau kemahasiswaan, dan tabel RAB (rencana anggaran biaya) yang totalnya terhitung otomatis dari item yang kamu masukkan. Hasilnya bisa diunduh sebagai dokumen Word untuk disunting lebih lanjut, atau disalin sebagai teks bila hanya kerangkanya yang dibutuhkan.",
  langkah: [
    "Pilih jenis proposal: 🔬 Penelitian / Skripsi, 🎪 Kegiatan Mahasiswa (Acara/UKM), atau 💼 Magang / PKL.",
    "Isi judul lengkap proposal, nama lengkap, NIM, dan program studi atau nama organisasi pengusul.",
    "Lengkapi bagian isi dan item RAB (nama kebutuhan beserta biayanya) — total anggaran terhitung otomatis.",
    "Unggah logo institusi bila ingin tampil di sampul, sesuai pengaturan logo bersama aplikasi.",
    "Tekan ⬇️ Download Proposal .docx (Asli) untuk dokumen jadinya, atau 📋 Copy Teks Proposal bila cukup versi teksnya."
  ],
  faq: [
    ["Apa beda isi ketiga jenis proposal di tool ini?", "Strukturnya menyesuaikan jenisnya: proposal penelitian menonjolkan latar belakang, rumusan masalah, dan metode; proposal kegiatan menonjolkan susunan acara, kepanitiaan, dan RAB; proposal magang menonjolkan profil tempat magang dan rencana kegiatan. Karena itu pilih jenis yang benar sebelum mengisi."],
    ["Bagaimana RAB otomatisnya bekerja?", "Setiap item biaya yang kamu masukkan ke daftar anggaran dijumlahkan otomatis ke total RAB dan ditampilkan dalam tabel anggaran di dokumen. Mengubah atau menambah item lalu mengunduh ulang akan memperbarui totalnya."]
  ]
},
similarity: {
  buka: "Pengecek kemiripan lokal ini membandingkan dua teks yang kamu tempel sendiri — misalnya paragraf sumber asli dan hasil parafrasemu — dengan algoritma Jaccard atas potongan 3-gram (rangkaian tiga kata). Kamu mendapat persentase kemiripan beserta sorotan (highlight) pada frasa yang masih sama persis, sehingga ketahuan bagian parafrase yang masih terlalu menempel pada kalimat sumber. Tool ini sengaja bekerja sepenuhnya lokal tanpa basis data internet: gunanya adalah memeriksa kualitas parafrasemu sendiri sebelum menulis ulang dengan kalimat yang benar-benar baru, bukan memprediksi skor perangkat lunak pendeteksi plagiarisme.",
  langkah: [
    "Tempel teks sumber asli pada kolom pertama (paragraf jurnal atau buku yang kamu kutip).",
    "Tempel teks hasil parafrasemu pada kolom kedua.",
    "Tekan 🛡️ Bandingkan Kemiripan untuk menghitung skor Jaccard 3-gram kedua teks.",
    "Baca persentase kemiripan dan perhatikan bagian yang tersorot — itu rangkaian kata yang masih identik dengan sumber.",
    "Tulis ulang bagian tersorot dengan struktur kalimatmu sendiri, lalu bandingkan lagi sampai kemiripannya turun wajar."
  ],
  faq: [
    ["Apakah skor di sini memprediksi skor Turnitin saya?", "Tidak. Turnitin membandingkan naskahmu dengan basis data raksasa berisi jurnal, repositori, dan tugas mahasiswa lain. Tool ini hanya membandingkan dua teks yang kamu tempel, jadi gunanya untuk melatih parafrase — bukan mengukur risiko plagiarisme dari sumber lain."],
    ["Kemiripan berapa yang dianggap aman untuk parafrase?", "Tidak ada angka resmi. Yang lebih penting dari angka adalah tidak adanya rangkaian frasa panjang yang identik — tepatnya itulah yang ditunjukkan sorotan 3-gram di hasil perbandingan, dan ide sumbernya tetap wajib kamu sitasi."]
  ]
},
jurnal: {
  buka: "Pencari jurnal ini terhubung ke OpenAlex, basis data terbuka berisi ratusan juta karya ilmiah, untuk membantumu menemukan referensi yang benar-benar ada. Kamu bisa mencari berdasarkan kata kunci topik, atau mengambil metadata resmi sebuah artikel dari DOI-nya — lalu menyimpan temuan ke rak referensi pribadi. Dari rak itu kamu bisa menyalin sitasi format APA, mengunduh daftar pustaka APA 7 sebagai berkas .doc, atau mengekspor BibTeX (.bib) untuk dipakai di pengelola referensi. Karena datanya ditarik langsung dari OpenAlex, risiko referensi karangan seperti hasil buatan AI bisa dihindari sejak awal.",
  langkah: [
    "Ketik kata kunci topik pada kolom pencarian (misalnya ‘media sosial prestasi belajar’), lalu tekan 🔎 Cari.",
    "Telusuri hasil dari OpenAlex: judul, penulis, tahun, dan nama jurnal ditampilkan untuk tiap karya.",
    "Klik Ambil Sitasi pada karya yang relevan, atau tekan ➕ Rak untuk menyimpannya dulu ke rak referensi.",
    "Bila kamu sudah punya DOI, tempel DOI-nya (format 10.xxxx/…) untuk mengambil sitasi resminya secara langsung.",
    "Dari rak, tekan 📋 Copy Sitasi APA, ⬇️ Daftar Pustaka APA 7 (.doc), atau ⬇️ BibTeX (.bib) sesuai kebutuhanmu."
  ],
  faq: [
    ["Dari mana data jurnal di tool ini berasal?", "Dari OpenAlex, katalog ilmiah terbuka yang mengindeks jurnal, prosiding, dan repositori di seluruh dunia. Pengecekan dan pengunduhan sitasi dikirim dari browsermu langsung ke API OpenAlex, jadi tool ini memerlukan koneksi internet."],
    ["DOI yang saya masukkan tidak ditemukan — kenapa?", "Periksa lagi penulisannya: DOI diawali angka 10. diikuti kode penerbit dan akhiran unik, tanpa spasi atau awalan ‘doi:’ ganda. Bila tetap tidak ada, karya tersebut kemungkinan memang tidak terindeks OpenAlex — coba cari lewat kata kunci judulnya."]
  ]
},
kisikisi: {
  buka: "Kisi-kisi instrumen adalah tabel wajib di Bab 3 yang memetakan variabel penelitian menjadi indikator, lalu menjadi nomor-nomor butir soal — termasuk pembagian butir favorable (pernyataan positif) dan unfavorable (pernyataan negatif). Generator ini menyusun tabel itu secara otomatis dari variabel dan indikator yang kamu masukkan, sehingga penomoran butir konsisten dan tidak ada indikator yang tertinggal. Hasilnya bisa diunduh sebagai berkas .doc berisi Tabel Bab 3 yang siap ditempel ke naskah, dan tersedia contoh isian untuk melihat format akhirnya sebelum kamu mengisi data penelitianmu sendiri.",
  langkah: [
    "Isi variabel penelitianmu beserta indikator-indikatornya sesuai petunjuk kolom (ikuti pola pada Contoh Isian bila ragu).",
    "Tentukan jumlah butir untuk tiap indikator dan tandai mana yang favorable dan mana yang unfavorable.",
    "Tekan 🧩 Susun Tabel Kisi-Kisi untuk menghasilkan tabel pemetaannya.",
    "Periksa hasilnya: setiap indikator harus terwakili nomor butir, dan sebaran favorable–unfavorable seimbang.",
    "Tekan ⬇️ Download .doc (Tabel Bab 3) untuk memindahkan tabel ke naskah Bab 3 kamu."
  ],
  faq: [
    ["Apa beda butir favorable dan unfavorable?", "Butir favorable adalah pernyataan positif yang skornya berjalan normal (sangat setuju = skor tertinggi), sedangkan unfavorable adalah pernyataan negatif yang skornya dibalik. Pembagian keduanya mengurangi bias responden yang asal memilih jawaban yang sama terus-menerus."],
    ["Di bab mana tabel hasil tool ini ditempatkan?", "Di Bab 3 (metode penelitian), pada sub-bab instrumen penelitian — biasanya tepat sebelum penjelasan uji validitas dan reliabilitas. Kisi-kisi inilah yang menjadi dasar daftar pernyataan di kuesionermu."]
  ]
},
imrad: {
  buka: "Konverter ini mengubah ringkasan skripsimu menjadi draf artikel jurnal berformat IMRAD — struktur baku publikasi ilmiah: Introduction, Methods, Results, and Discussion. Kamu memasukkan ringkasan tiap bab (latar belakang dari Bab 1, teori dari Bab 2, metode dari Bab 3, hasil dari Bab 4, pembahasan dari Bab 5), dan tool menyusunnya ulang mengikuti proporsi artikel jurnal sambil memeriksa jumlah kata tiap bagian terhadap proporsi idealnya. Keluaran berupa berkas .doc (tersedia pilihan tata letak 1 kolom atau 2 kolom gaya jurnal SINTA) yang menjadi titik awal realistis untuk publikasi dari skripsimu.",
  langkah: [
    "Isi judul artikel (boleh sama dengan judul skripsi) dan baris penulis beserta afiliasi universitasmu.",
    "Tempel ringkasan latar belakang, rumusan masalah, dan tujuan dari Bab 1; teori dan penelitian terdahulu dari Bab 2; metode dari Bab 3; hasil dari Bab 4; serta pembahasan dan simpulan dari Bab 5 pada kolom masing-masing.",
    "Pilih tata letak keluaran: 1 kolom, atau 2 kolom (gaya jurnal SINTA).",
    "Tekan 📐 Susun Draf IMRAD & Cek Proporsi, lalu baca laporan proporsi kata tiap bagian — bagian yang terlalu gemuk atau terlalu kurus ditandai.",
    "Unduh lewat ⬇️ Download .doc (IMRAD) atau salin dengan 📋 Copy Draf, lalu poles mengikuti gaya selingkung jurnal tujuanmu."
  ],
  faq: [
    ["Mengapa proporsi kata tiap bagian IMRAD penting?", "Jurnal menilai keseimbangan artikel: pendahuluan yang kepanjangan atau hasil yang terlalu ringkas adalah alasan revisi yang umum. Pemeriksaan proporsi di tool ini membandingkan jumlah kata bagianmu dengan kisaran yang lazim pada artikel jurnal, sehingga kamu tahu bagian mana yang harus dipangkas atau ditambah."],
    ["Apakah draf hasil konversi bisa langsung dikirim ke jurnal?", "Belum — anggap sebagai draf kerja yang strukturnya sudah benar. Kamu tetap harus menyesuaikan gaya selingkung jurnal tujuan (format sitasi, batas kata, template resmi) dan memoles bahasanya sebelum benar-benar disubmit."]
  ]
},
judul: {
  buka: "Generator ini merakit puluhan pola judul skripsi dari bahan yang kamu berikan: variabel X, variabel Y (boleh dikosongkan untuk penelitian satu variabel), lokasi atau subjek penelitian, dan jenis metode. Polanya mengikuti rumusan yang lazim dipakai pada skripsi kuantitatif (pengaruh, hubungan, perbandingan), kualitatif (studi kasus, fenomenologi), pengembangan (R&D), penelitian tindakan kelas, sampai evaluasi. Hasilnya adalah daftar ide judul yang bisa diklik untuk dipilih — bahan mentah yang jauh lebih konkret untuk dibawa ke dosen pembimbing daripada bertanya ‘judul apa yang bagus’ tanpa membawa usulan apa pun.",
  langkah: [
    "Isi variabel X pada kolom pertama (misalnya ‘Penggunaan Media Sosial’).",
    "Isi variabel Y pada kolom kedua (misalnya ‘Prestasi Belajar’) — kosongkan bila penelitianmu hanya satu variabel.",
    "Isi lokasi atau subjek penelitian (misalnya ‘Siswa SMA Negeri 1 Lahat’).",
    "Pilih jenis metode: Kuantitatif Pengaruh/Hubungan, Eksperimen/Perbandingan, Kualitatif, Pengembangan (R&D), PTK, atau Evaluasi/Analisis.",
    "Tekan 💡 Buat Ide Judul, lalu klik judul yang paling sesuai untuk menyalin dan membawanya ke pembimbing."
  ],
  faq: [
    ["Bolehkah judul hasil generator dipakai persis apa adanya?", "Boleh sebagai usulan, tetapi keputusan akhir selalu di tangan kamu dan dosen pembimbing. Periksa juga apakah judul serupa sudah pernah diteliti di kampusmu — pembimbing biasanya meminta penyesuaian pada variabel atau lokasinya."],
    ["Mengapa kolom variabel Y boleh kosong?", "Karena tidak semua penelitian punya dua variabel: studi kasus, penelitian deskriptif, dan sebagian R&D hanya meneliti satu variabel atau satu fenomena. Bila Y kosong, pola judul yang dihasilkan menyesuaikan ke bentuk satu variabel."]
  ]
},
singkatan: {
  buka: "Pembuat daftar singkatan ini memindai naskah yang kamu tempel dan mengekstrak semua akronim berbentuk huruf kapital — seperti BPS, UMKM, atau SPSS — lalu menyusunnya menjadi daftar singkatan terurut A–Z untuk halaman depan skripsimu. Untuk tiap akronim kamu tinggal mengisi kepanjangannya pada kolom yang disediakan (misalnya BPS = Badan Pusat Statistik), dan daftar finalnya bisa diunduh sebagai .doc atau disalin sebagai teks. Cara ini jauh lebih aman daripada menyusun daftar secara manual, yang rawan melewatkan akronim yang hanya muncul sekali di tengah bab.",
  langkah: [
    "Tempel naskahmu pada kolom yang tersedia — boleh sebagian bab dulu, tidak harus seluruh skripsi.",
    "Tekan 🔤 Ekstrak Singkatan; semua akronim huruf kapital yang ditemukan dikumpulkan dan diurutkan A–Z.",
    "Isi kepanjangan resmi tiap akronim pada kolom Kepanjangan di sampingnya.",
    "Periksa ulang ejaan kepanjangan — gunakan nama resmi lembaga atau istilah bakunya.",
    "Tekan ⬇️ Download Daftar Singkatan .doc atau 📋 Copy Teks untuk menempel hasilnya ke halaman depan naskahmu."
  ],
  faq: [
    ["Akronim seperti apa yang dikenali tool ini?", "Rangkaian huruf kapital yang berdiri sebagai kata tersendiri di dalam teks — umumnya singkatan lembaga, metode, dan istilah teknis. Kata awal kalimat yang kebetulan kapital tidak ikut terekstrak karena polanya berbeda dari akronim."],
    ["Apakah kepanjangan akronim diisi otomatis?", "Tidak — tool mengekstrak dan mengurutkan akronimnya, tetapi kepanjangannya kamu isi sendiri agar akurat. Nama resmi lembaga kadang berubah dan satu akronim bisa punya dua arti berbeda tergantung bidangnya, jadi keputusanmu yang dipakai."]
  ]
},
k17: {
  buka: "Matriks sintesis adalah tabel perbandingan penelitian terdahulu yang menjadi tulang punggung tinjauan pustaka di Bab 2: tiap baris satu jurnal atau skripsi terdahulu, dengan kolom penulis dan tahun, judul, metode, serta temuan kunci. Tool ini menyediakan formulir tambah baris yang terstruktur untuk membangun matriks itu sedikit demi sedikit, lalu mengekspornya sebagai berkas .doc (Word) atau CSV. Dengan format matriks, persamaan dan perbedaan antarpenelitian — dan celah yang diisi penelitianmu — terlihat jelas, bukan terkubur dalam paragraf panjang yang sulit dibandingkan.",
  langkah: [
    "Isi data satu penelitian terdahulu: penulis dan tahun (misalnya ‘Rahmawati (2022)’), judul, metode (misalnya ‘Kuantitatif, survei, n=120’), dan temuan kuncinya.",
    "Tekan ➕ Tambah Baris untuk memasukkan penelitian itu ke matriks.",
    "Ulangi sampai semua penelitian terdahulu yang kamu kutip di Bab 2 masuk — umumnya 5–10 penelitian.",
    "Tinjau matriksnya: kolom temuan adalah bahanmu menulis persamaan, perbedaan, dan celah penelitian.",
    "Tekan ⬇️ Download .doc (Word) untuk menempel tabel ke Bab 2, atau ⬇️ Download CSV bila ingin mengolahnya di Excel."
  ],
  faq: [
    ["Berapa penelitian terdahulu yang ideal di matriks sintesis?", "Tidak ada angka baku dari tool ini, tetapi kebanyakan skripsi memakai 5–10 penelitian yang paling relevan dan mutakhir. Yang dinilai penguji bukan jumlahnya, melainkan apakah matriksmu dipakai untuk menunjukkan posisi penelitianmu di antara penelitian sebelumnya."],
    ["Apa beda ekspor .doc dan CSV di tool ini?", "Berkas .doc berisi tabel yang sudah terformat untuk langsung ditempel ke naskah Bab 2. CSV adalah data mentah baris-kolom yang cocok dibuka di Excel bila kamu ingin mengurutkan, menyaring, atau menggabungkan matriks dari beberapa sumber."]
  ]
},
pengesahan: {
  buka: "Generator ini membuat dua lembar administratif penutup skripsi dalam satu berkas .doc: lembar pengesahan (halaman persetujuan pembimbing dan penguji setelah sidang) dan surat pernyataan bebas plagiat bermaterai. Kamu mengisi data yang diminta — identitas mahasiswa, judul, nama-nama pejabat beserta NIP, kota dan tanggal — dan dokumen tersusun dalam format resmi yang lazim dipakai kampus, lengkap dengan kotak tempat menempel materai pada surat pernyataan. Tinggal cetak, tempel materai, dan kumpulkan untuk ditandatangani pihak-pihak terkait sesuai alur fakultasmu.",
  langkah: [
    "Isi identitas dan judul skripsimu pada kolom yang tersedia.",
    "Isi nama beserta gelar dan NIP dosen pembimbing, penguji, dan pejabat yang menandatangani (ikuti contoh format pada placeholder, misalnya ‘Nama, gelar — NIP. …’).",
    "Isi kota dan tanggal penandatanganan (misalnya ‘Palembang, 21 Oktober 2026’).",
    "Tekan ⬇️ Download .doc (Pengesahan + Pernyataan) untuk mengunduh kedua lembar sekaligus.",
    "Cetak, tempel materai pada kotak yang disediakan di surat pernyataan, lalu mintakan tanda tangan sesuai urutan di kampusmu."
  ],
  faq: [
    ["Apakah materainya ikut tercetak dari tool ini?", "Tidak — yang disediakan adalah kotak penanda posisi materai pada surat pernyataan. Materai fisik (atau e-meterai, bila kampusmu menerimanya) tetap kamu tempel dan tandatangani menimpa materai setelah dokumen dicetak."],
    ["Bagaimana bila format lembar pengesahan kampus saya berbeda?", "Unduh .doc-nya lalu sesuaikan di Word: dokumen hasil tool ini adalah kerangka resmi yang umum dipakai; perbedaan antar kampus biasanya hanya pada susunan penanda tangan dan kop, yang mudah diubah sebelum dicetak."]
  ]
},
ojskit: {
  buka: "OJS Kit menyiapkan dua dokumen pendamping terpenting saat mengirim artikel ke jurnal berbasis Open Journal Systems: surat pengantar (cover letter) untuk editor, dan matriks tanggapan reviewer untuk menjawab komentar penelaah poin demi poin. Kamu mengisi nama jurnal, judul artikel, nama penulis, dan afiliasi, lalu memilih bahasa dokumen (Indonesia atau English). Hasilnya satu berkas .doc berisi surat dan matriks yang siap diisi detail tanggapannya, atau suratnya saja disalin sebagai teks untuk ditempel ke kolom submission di situs jurnal.",
  langkah: [
    "Isi nama jurnal tujuan (misalnya ‘Jurnal Ilmu Ekonomi & Studi Pembangunan’), judul artikel yang disubmit, nama kamu, dan universitas asal.",
    "Pilih bahasa dokumen: Bahasa Indonesia atau English, mengikuti bahasa jurnal tujuan.",
    "Tekan ⬇️ Download .doc (Surat + Matriks) untuk mendapatkan cover letter beserta matriks tanggapan reviewer dalam satu berkas.",
    "Isi matriks tanggapan: tulis komentar reviewer pada kolomnya, tanggapanmu, dan lokasi perubahan di naskah.",
    "Bila hanya suratnya yang diminta sistem OJS, tekan 📋 Copy Surat dan tempel ke formulir submission."
  ],
  faq: [
    ["Apa fungsi matriks tanggapan reviewer?", "Matriks itu memetakan setiap komentar reviewer ke tanggapanmu dan perubahan yang kamu buat di naskah (halaman/barisnya). Editor dan reviewer memakai dokumen ini untuk memeriksa apakah semua masukan sudah ditindaklanjuti, jadi matriks yang rapi mempercepat ronde review berikutnya."],
    ["Kapan cover letter benar-benar dibutuhkan?", "Banyak jurnal OJS meminta atau menyediakan kolom cover letter saat submission. Surat ini memperkenalkan artikelmu ke editor: kebaruan temuan, kesesuaian dengan ruang lingkup jurnal, dan pernyataan bahwa naskah belum diterbitkan di tempat lain."]
  ]
},
bimbingan: {
  buka: "Lembar bimbingan atau kartu kendali adalah bukti konsultasimu dengan dosen pembimbing yang biasanya wajib dilampirkan dan diperiksa sebelum pendaftaran sidang. Tool ini membantumu mencatat setiap sesi bimbingan secara digital — tanggal, pembimbing ke berapa, materi yang dibahas, dan statusnya — lalu mengekspornya menjadi berkas .doc berkop logo dalam format kartu kendali resmi. Setiap sesi yang kamu simpan menumpuk menjadi riwayat lengkap, sehingga tidak ada lagi kartu kertas hilang atau catatan bimbingan yang tercecer menjelang sidang.",
  langkah: [
    "Isi nama kamu, NIM, dan nama beserta gelar Pembimbing 1 dan Pembimbing 2 pada kolom identitas.",
    "Setiap selesai bimbingan, catat sesinya: pilih pembimbingnya, isi tanggal dan materi konsultasi, lalu status hasilnya (Revisi, Lanjut, atau ACC).",
    "Tekan + Simpan Sesi untuk menambahkan catatan itu ke kartu kendalimu.",
    "Ulangi untuk setiap sesi berikutnya — riwayat sesimu tersimpan dan terus bertambah.",
    "Menjelang sidang, tekan ⬇️ Download Kartu Kendali Bimbingan .doc untuk mencetak kartu resmi berkop logo dan membawanya untuk ditandatangani."
  ],
  faq: [
    ["Apakah data sesi bimbingan saya tersimpan?", "Ya, catatan sesi yang kamu simpan tersimpan di browser perangkatmu, sehingga kartu kendali bisa diisi bertahap sepanjang masa bimbingan. Gunakan perangkat dan browser yang sama agar riwayatnya berlanjut."],
    ["Apakah kartu hasil unduhan menggantikan tanda tangan dosen?", "Tidak. Berkas .doc dari tool ini adalah kartu kendali yang sudah terisi rapi; tanda tangan dan paraf dosen tetap dimintakan secara fisik (atau sesuai mekanisme kampusmu) pada kartu cetaknya setiap sesi atau di akhir masa bimbingan."]
  ]
},
revisi: {
  buka: "Setelah sidang, daftar revisi dari para penguji sering datang sebagai catatan lisan dan coretan yang mudah terlupa. Manajer revisi ini mengubahnya menjadi checklist terstruktur per penguji: setiap poin revisi dicatat beserta halaman lama dan halaman baru tempat perbaikannya, lalu progres keseluruhanmu terlihat dalam persentase selesai. Di akhir, tool mengekspor Lembar Revisi resmi dalam format .doc — dokumen yang umumnya harus ditandatangani penguji sebagai bukti revisimu sudah diterima — plus ringkasan teks untuk dibagikan ke grup atau pembimbing.",
  langkah: [
    "Isi nama kamu, tanggal sidang, judul skripsi, dan nama penguji (misalnya ‘Dr. Ani Wijaya, M.Si.’).",
    "Tuliskan tiap poin revisi dari penguji tersebut, lalu tekan + Tambahkan ke Daftar.",
    "Kerjakan revisinya satu per satu; untuk tiap poin yang selesai, isi kolom ‘Hal. baru’ dengan nomor halaman hasil perbaikan di naskah finalmu.",
    "Pantau progresmu — poin yang belum terisi halaman barunya berarti belum tuntas.",
    "Setelah semua selesai, tekan ⬇️ Download Lembar Revisi .doc (Resmi) untuk dicetak dan ditandatangani penguji, atau 📋 Copy Ringkasan untuk dibagikan."
  ],
  faq: [
    ["Mengapa kolom halaman baru penting diisi?", "Lembar revisi adalah peta bagi penguji untuk menemukan perbaikanmu tanpa membaca ulang seluruh naskah. Mencantumkan halaman baru tiap poin membuktikan revisi benar-benar dikerjakan dan memudahkan penguji memberi tanda tangan persetujuan."],
    ["Bisakah satu berkas lembar revisi memuat banyak penguji?", "Ya — tambahkan poin revisi per penguji dengan mengisi nama pengujinya untuk tiap kelompok catatan. Lembar resmi yang diekspor mengelompokkan revisi berdasarkan penguji, mengikuti format yang lazim diminta fakultas."]
  ]
},
pdffix: {
  buka: "Menyalin teks dari PDF jurnal hampir selalu menghasilkan teks rusak: kalimat terpotong enter di tengah, baris-baris pendek menumpuk, dan spasi ganda di mana-mana — melelahkan untuk dirapikan manual sebelum bisa dikutip. Pembersih ini memperbaiki kerusakan khas itu secara otomatis: menyambung kembali baris yang terpotong, merapikan spasi berlebih, dan menghasilkan teks bersih yang enak dibaca dan diolah. Hasilnya bisa langsung disalin atau diunduh sebagai .txt. Ingat, merapikan teks kutipan tidak menghapus kewajiban mencantumkan sumbernya pada naskahmu.",
  langkah: [
    "Salin teks dari PDF jurnal seperti biasa, lalu tempel pada area kerja di atas.",
    "Tekan 🧹 Rapikan Teks — baris terpotong disambung dan spasi ganda dirapikan otomatis.",
    "Baca hasilnya sekilas untuk memastikan tidak ada potongan kalimat yang tersambung keliru, terutama di sekitar daftar atau tabel.",
    "Tekan 📋 Copy Teks Rapi untuk menempelnya ke dokumenmu, atau ⬇️ Download (.txt) untuk menyimpannya sebagai berkas."
  ],
  faq: [
    ["Apa beda tool ini dengan Pembersih Karakter Tersembunyi di Teks AI?", "Pembersih ini khusus memperbaiki kerusakan salin-tempel dari PDF: enter terpotong dan spasi ganda. Pembersih Karakter Tersembunyi menangani karakter tak kasatmata (zero-width, NBSP) dan sisa markdown dari teks hasil chatbot. Teks dari PDF yang juga penuh artefak bisa dilewatkan ke keduanya berurutan."],
    ["Apakah angka dan sitasi di dalam teks ikut berubah?", "Tidak. Perapiannya hanya menyangkut pemotongan baris dan spasi; kata, angka, tahun, dan tanda baca di teksmu dipertahankan apa adanya."]
  ]
},
italic: {
  buka: "Kaidah penulisan ilmiah mewajibkan kata asing dan istilah Latin ditulis miring — in vivo, et al., opportunity cost, dan sejenisnya. Tool ini memindai teksmu, mengenali kata asing serta istilah ilmiah dari kamus internalnya, lalu memiringkannya secara otomatis. Sekalian, tool ini menghitung kata yang paling sering berulang di teksmu (10 teratas) sebagai bahan evaluasi gaya bahasa. Hasilnya diberikan sebagai HTML yang bisa disalin sehingga format miringnya ikut terbawa saat ditempel ke pengolah kata, atau diunduh sebagai berkas .html.",
  langkah: [
    "Tempel teks yang ingin diperiksa pada area kerja di atas.",
    "Tekan 🔤 Proses Italic & Cek Kata Berulang.",
    "Baca bagian ‘Hasil (kata asing sudah dimiringkan)’ dan periksa kata-kata yang dimiringkan — pastikan sesuai konteks kalimatmu.",
    "Cek juga daftar 🔁 Frekuensi Kata (10 teratas) untuk menemukan kata yang terlalu sering kamu ulang.",
    "Tekan 📋 Copy Hasil (HTML) agar huruf miringnya terbawa saat ditempel, atau ⬇️ Download .html untuk menyimpannya."
  ],
  faq: [
    ["Mengapa hasil harus disalin sebagai HTML?", "Teks polos tidak membawa format apa pun. Menyalin sebagai HTML membuat tanda miring pada kata asing ikut terbawa saat kamu menempel hasilnya ke Microsoft Word atau Google Docs, jadi kamu tidak perlu memiringkan ulang satu per satu."],
    ["Apakah semua kata asing pasti terdeteksi?", "Tidak selalu — pengenalan didasarkan pada kamus kata asing dan istilah Latin yang umum dalam tulisan akademik. Istilah yang sangat spesifik bidangmu mungkin belum ada di kamus, jadi tetap periksa hasil akhirnya secara manual."]
  ]
},
eydcase: {
  buka: "Menulis judul karya ilmiah ada kaidahnya: menurut EYD, huruf kapital dipakai pada awal setiap kata dalam judul kecuali kata tugas seperti di, ke, dari, yang, dan, atau, serta terhadap yang berada di tengah judul. Konverter ini menerapkan aturan itu secara otomatis pada judul yang kamu ketik — kata penting dikapitalkan, kata hubung dan kata depan tetap huruf kecil, dan kata pertama judul selalu dikapitalkan apa pun jenis katanya. Hasilnya bisa disalin atau diunduh sebagai .txt, cocok untuk judul skripsi, makalah, artikel, sampai judul bab dan subbab.",
  langkah: [
    "Ketik atau tempel judulmu pada kolom yang tersedia (boleh huruf kecil semua, misalnya ‘pengaruh media sosial terhadap prestasi belajar siswa di era digital’).",
    "Tekan ✒️ Ubah ke Title Case EYD.",
    "Baca hasilnya di bagian ‘Hasil Title Case EYD’ dan periksa kata-kata khusus seperti nama lembaga atau akronim yang mungkin perlu kamu sesuaikan.",
    "Tekan 📋 Copy Hasil untuk menempelnya ke naskah, atau ⬇️ Download .txt untuk menyimpannya."
  ],
  faq: [
    ["Kata apa saja yang tetap huruf kecil di tengah judul?", "Kata depan dan kata hubung seperti di, ke, dari, pada, yang, dan, atau, serta terhadap — kecuali bila kata itu kebetulan menjadi kata pertama judul, karena kata pertama selalu ditulis kapital dalam judul."],
    ["Bagaimana dengan akronim seperti BPS atau UMKM di judul?", "Akronim yang memang ditulis kapital penuh sebaiknya kamu periksa setelah konversi; tuliskan kembali dalam bentuk kapital penuhnya bila konverter mengubahnya menjadi kapital awal saja."]
  ]
},
wordfreq: {
  buka: "Penguji mudah menangkap tulisan yang miskin kosakata: kata yang sama muncul puluhan kali dalam satu bab. Pengecek frekuensi ini menghitung setiap kata dalam naskah yang kamu tempel, menampilkan kata yang paling sering muncul (pilihan 15, 25, atau 40 teratas), dengan panjang kata minimum yang bisa diatur, serta opsi menyaring kata sambung umum agar daftar tidak dipenuhi kata seperti ‘yang’ dan ‘dan’. Tersedia pula unduhan CSV berisi hitungan lengkap semua kata — bahan konkret untuk merevisi gaya bahasa dan memperkaya variasi kata di naskahmu.",
  langkah: [
    "Tempel paragraf atau satu bab skripsimu pada kolom yang tersedia.",
    "Atur tampilannya: jumlah kata teratas (15/25/40) dan panjang kata minimum (3/4/5 huruf).",
    "Aktifkan opsi ‘saring kata sambung umum’ bila ingin fokus pada kata bermakna saja.",
    "Tekan 🔁 Analisis Frekuensi Kata dan baca kata-kata teratas beserta jumlah kemunculannya.",
    "Untuk data lengkapnya, tekan ⬇️ Download CSV Lengkap dan buka di Excel untuk diurutkan sesuai kebutuhanmu."
  ],
  faq: [
    ["Mengapa ada opsi menyaring kata sambung?", "Kata seperti ‘yang’, ‘dan’, ‘di’ pasti selalu terbanyak di teks Bahasa Indonesia mana pun. Menyaringnya menyisakan kata-kata isi — kata kerja dan kata benda — yang pengulangannya benar-benar terasa mengganggu gaya bahasa."],
    ["Apa bedanya dengan pengecekan kata berulang di tool Auto-Italic?", "Tool ini adalah analisis frekuensi yang lengkap: jumlah teratas bisa dipilih, panjang kata minimum diatur, dan seluruh hitungan bisa diunduh sebagai CSV. Auto-Italic hanya menampilkan ringkasan 10 kata teratas sebagai fitur pendamping pemiringan kata asing."]
  ]
},
k21: {
  buka: "Sorter ini merapikan daftar istilah dan singkatan untuk glosarium atau daftar istilah skripsimu: susunannya diurutkan A–Z secara otomatis, entri yang ganda dideteksi, dan entri yang belum punya definisi ditandai agar tidak ada istilah kosong yang lolos ke naskah final. Hasil rapihannya bisa disalin atau diunduh sebagai .txt maupun .doc. Tool ini berguna di tahap akhir penulisan, saat daftar istilah yang dikumpulkan berbulan-bulan dari berbagai bab perlu disatukan menjadi satu daftar resmi yang konsisten.",
  langkah: [
    "Tempel daftar istilahmu — satu entri per baris beserta definisinya, mengikuti pola yang dicontohkan di tool.",
    "Tekan 🔠 Urutkan A–Z untuk menyusun ulang daftar mengikuti urutan abjad.",
    "Periksa tanda pada entri duplikat dan entri tanpa definisi; perbaiki atau lengkapi langsung di daftar hasil.",
    "Tekan 📋 Copy Hasil untuk menempel ke naskah, atau unduh lewat ⬇️ Download .txt / .doc sesuai kebutuhan formatmu."
  ],
  faq: [
    ["Apa yang terjadi pada entri yang terdeteksi duplikat?", "Entri duplikat ditandai agar kamu bisa memutuskan sendiri mana definisi yang dipertahankan — tool tidak menghapus otomatis karena dua entri sejenis kadang memang merujuk konteks berbeda yang perlu kamu gabungkan manual."],
    ["Apakah daftar dari tool ini sama dengan Daftar Singkatan otomatis?", "Berbeda. Pembuat Daftar Singkatan mengekstrak akronim langsung dari naskahmu, sedangkan sorter ini merapikan daftar istilah yang sudah kamu susun sendiri — termasuk istilah yang bukan singkatan — menjadi urutan A–Z yang bersih."]
  ]
},
k18: {
  buka: "Academic Phrasebank adalah bank berisi 34+ kalimat akademik siap pakai yang dikelompokkan menurut fungsinya dalam tulisan ilmiah: menyatakan argumen, mengutip pendapat ahli, membandingkan hasil, menunjukkan kesenjangan penelitian, sampai menyusun kesimpulan. Setiap kalimat adalah kerangka baku yang tinggal kamu lengkapi dengan isi penelitianmu. Kamu bisa mencari kalimat dengan kata kunci, menyaringnya per kategori, mengklik kalimat untuk menyalinnya, dan mengumpulkan favoritmu menjadi koleksi pribadi yang tersimpan serta bisa diunduh sebagai .txt — bekal praktis saat menatap halaman kosong di tengah penulisan bab.",
  langkah: [
    "Gunakan kolom ‘Ketik kata kunci…’ untuk mencari kalimat berdasarkan kebutuhanmu, atau saring lewat pilihan kategori (argumen, kutipan, perbandingan, kesimpulan, dan lainnya).",
    "Klik kalimat yang cocok untuk menyalinnya ke papan klip.",
    "Tempel ke naskahmu dan lengkapi bagian kerangkanya dengan data, nama ahli, dan temuan penelitianmu sendiri.",
    "Klik 💾 Simpan Koleksi pada kalimat-kalimat andalanmu agar terkumpul menjadi koleksi pribadi.",
    "Tekan 📋 Copy Koleksi atau ⬇️ Download .txt untuk mengunduh seluruh koleksimu sekaligus."
  ],
  faq: [
    ["Apakah memakai kalimat dari phrasebank termasuk menjiplak?", "Tidak, selama kamu melengkapinya dengan isi dan data penelitianmu sendiri. Kalimat-kalimat ini adalah kerangka retoris umum yang memang dipakai bersama oleh komunitas akademik — yang dinilai dari tulisanmu adalah argumen dan datanya, bukan frasa penghubungnya."],
    ["Apakah koleksi simpanan saya hilang bila halaman ditutup?", "Koleksi yang kamu simpan melalui tombol 💾 Simpan Koleksi tersimpan di browser perangkatmu, jadi tetap ada saat kamu kembali — selama memakai perangkat dan browser yang sama dan data browser tidak dibersihkan."]
  ]
},
k19: {
  buka: "Generator abstrak ini merakit abstrak dwibahasa dari unsur-unsur yang kamu isikan: latar dan masalah penelitian, tujuan, metode, hasil terpenting beserta angkanya, dan simpulan. Dari bahan itu tersusun abstrak Bahasa Indonesia yang runtut, disertai kerangka versi Bahasa Inggris (ABSTRACT) yang mengikuti urutan yang sama. Format ini mengikuti kebiasaan abstrak skripsi Indonesia yang wajib tampil dalam dua bahasa, sehingga kamu tidak perlu menyusun dua kali dari nol — cukup mengisi unsur penelitiannya sekali, lalu memoles kedua hasil akhirnya.",
  langkah: [
    "Isi kolom konteks dan masalah penelitianmu (latar belakang singkat).",
    "Isi tujuan penelitian (misalnya ‘mengetahui pengaruh media sosial terhadap prestasi belajar siswa’).",
    "Isi metode yang kamu pakai, lalu temuan terpenting beserta angkanya bila ada, dan simpulan akhir penelitianmu.",
    "Tekan 🌐 Generate Abstrak ID + EN.",
    "Baca hasil di bagian 🇮🇩 ABSTRAK dan 🇬🇧 ABSTRACT, poles redaksinya, lalu tekan 📋 Copy Keduanya atau ⬇️ Download .txt."
  ],
  faq: [
    ["Apakah versi Inggrisnya terjemahan final yang siap pakai?", "Versi Inggris dihasilkan sebagai kerangka terjemahan yang mengikuti abstrak Indonesianya. Untuk naskah resmi, tetap periksa kembali pilihan katanya — terutama istilah teknis bidangmu — atau mintakan koreksi ke dosen bahasa/pembimbing, karena abstrak adalah bagian yang paling sering dibaca penguji."],
    ["Berapa panjang abstrak yang dihasilkan?", "Panjangnya mengikuti bahan yang kamu masukkan. Abstrak skripsi pada umumnya berkisar 150–250 kata; bila hasilmu jauh lebih panjang, pangkas latar belakangnya dan pertahankan tujuan, metode, hasil, dan simpulan sebagai inti."]
  ]
},
k22: {
  buka: "Tabel untuk jurnal tidak boleh memakai gaya tabel Excel atau Word biasa: standar booktabs yang dipakai jurnal ilmiah hanya memakai garis horizontal — di atas header, di bawah header, dan di bawah tabel — tanpa satu pun garis vertikal. Generator ini mengubah data yang kamu tempel dari Excel menjadi tabel booktabs yang bersih, lengkap dengan baris keterangan sumber (misalnya ‘Sumber: Data diolah peneliti (2026)’). Hasilnya bisa disalin sebagai tabel HTML yang mempertahankan format saat ditempel, atau diunduh sebagai .doc untuk langsung masuk ke naskah artikelmu.",
  langkah: [
    "Salin rentang sel dari Excel (termasuk baris judul kolomnya), lalu tempel pada kolom ‘Paste dari Excel (baris pertama = header kolom)’.",
    "Isi keterangan sumber tabel pada kolomnya (misalnya ‘Sumber: Data diolah peneliti (2026)’).",
    "Tekan 📋 Buat Tabel Jurnal dan periksa pratinjau tabel booktabs yang dihasilkan.",
    "Tekan 📋 Copy Tabel (HTML) untuk menempelnya ke Word dengan format utuh, atau unduh lewat tombol ⬇️ Download .doc."
  ],
  faq: [
    ["Mengapa tabel jurnal tidak boleh ada garis vertikal?", "Itu konvensi booktabs yang diadopsi banyak jurnal: garis vertikal dianggap mengganggu keterbacaan dan membuat tabel terlihat seperti lembar kerja. Garis horizontal secukupnya memberi struktur tanpa membuat mata lelah — dan pengelola jurnal sering mengembalikan tabel bergaris lengkap untuk diperbaiki."],
    ["Apakah angka di tabel saya ikut diformat ulang?", "Tidak, isi sel dipertahankan seperti yang kamu tempel dari Excel. Yang dibangun tool ini adalah kerangka dan gaya tabelnya; pastikan angka serta desimalmu sudah benar di Excel sebelum ditempel."]
  ]
},
kerangkabab: {
  buka: "Generator kerangka ini menyusun struktur Bab I sampai Bab V yang disesuaikan dengan metode penelitianmu — kuantitatif (survei/eksperimen/korelasi), kualitatif (studi kasus/fenomenologi/wawancara), penelitian & pengembangan (R&D), atau penelitian tindakan kelas (PTK) — dan dengan jenis dokumennya: skripsi, proposal skripsi, atau makalah. Setiap sub-bab dilengkapi panduan isi singkat yang menjelaskan apa yang seharusnya ditulis di sana, sehingga kerangka ini berfungsi sebagai peta kerja, bukan sekadar daftar judul. Hasilnya dapat disalin, dibagikan, atau diunduh sebagai .doc untuk dijadikan tulang punggung naskahmu.",
  langkah: [
    "Isi judul penelitianmu pada kolom yang tersedia (misalnya ‘Pengaruh Media Sosial terhadap Prestasi Belajar’).",
    "Pilih metode penelitian: Kuantitatif, Kualitatif, R&D, atau PTK — struktur bab mengikuti pilihan ini.",
    "Pilih jenis dokumen: Skripsi, Proposal Skripsi, atau Makalah.",
    "Tekan 🗂️ Generate Kerangka Bab I–V dan baca kerangka beserta panduan isi tiap sub-babnya.",
    "Tekan 📋 Copy Kerangka atau ⬇️ Download .doc untuk menjadikannya dokumen kerja, atau 📤 Bagikan untuk mengirimnya ke teman satu bimbingan."
  ],
  faq: [
    ["Mengapa struktur bab berbeda menurut metode?", "Karena logika penelitiannya berbeda: skripsi kuantitatif punya sub-bab hipotesis dan uji instrumen, kualitatif punya fokus penelitian dan keabsahan data, R&D punya tahap pengembangan produk, sedangkan PTK tersusun atas siklus-siklus tindakan. Kerangka yang salah metode akan langsung dikoreksi pembimbing."],
    ["Apakah panduan isi di tiap sub-bab harus diikuti persis?", "Panduan itu ringkasan konvensi umum agar kamu tidak mulai dari halaman kosong. Susunan resmi tetap mengikuti pedoman penulisan kampusmu dan arahan pembimbing — sesuaikan nama sub-babnya bila kampusmu memakai istilah berbeda."]
  ]
},
k20: {
  buka: "Kalkulator ini mengubah target besar yang menakutkan — misalnya skripsi 15.000 kata — menjadi rencana harian yang terukur. Kamu menentukan total target kata, rentang tanggal pengerjaan, dan berapa hari libur per minggu yang kamu izinkan untuk dirimu sendiri (0 hari berarti gas setiap hari). Tool lalu menghitung target kata realistis per hari dan menyusun milestone tanggal penyelesaian per bab, sehingga kamu tahu persis posisi yang seharusnya sudah dicapai hari ini. Rencana akhirnya bisa disalin atau diunduh sebagai .txt untuk ditempel di tempat yang terlihat setiap hari.",
  langkah: [
    "Isi total target kata naskahmu dan rentang tanggal pengerjaan (mulai sampai deadline yang kamu tetapkan).",
    "Pilih jumlah hari libur per minggu: 0 hari (gas tiap hari), 1 hari, atau 2 hari.",
    "Tekan ⏱️ Buat Rencana Menulis.",
    "Baca target kata per harimu dan bagian 🗓️ Milestone per Bab — estimasi tanggal selesai untuk tiap bab.",
    "Tekan 📋 Copy Rencana atau ⬇️ Download .txt, lalu tempel di dinding atau jadikan pengingat harian."
  ],
  faq: [
    ["Bagaimana milestone per bab ditentukan?", "Total target kata dibagi ke bab-bab sesuai proporsi lazim naskah skripsi, lalu dipetakan ke hari-hari kerja yang tersedia (di luar hari libur mingguanmu) sampai deadline. Hasilnya adalah tanggal patokan kasar — bila satu bab molor, bab berikutnya otomatis terasa lebih berat, dan di situlah rencananya perlu disusun ulang."],
    ["Target kata per hari saya terlihat sangat besar — salah hitung?", "Biasanya bukan salah hitung, melainkan tanda rentang waktunya terlalu pendek untuk target katanya. Perpanjang deadline atau naikkan hari kerja per minggu, dan angka hariannya akan turun ke tingkat yang masuk akal."]
  ]
},
bacawaktu: {
  buka: "Kalkulator ini menjawab pertanyaan sederhana yang sering salah jawab: ‘naskah sepanjang ini butuh berapa menit untuk dibacakan?’ Kamu menempel naskah bicaramu, memilih kecepatan bicara — dari 110 kata per menit untuk sidang yang tegang sampai 170 kata per menit untuk bicara cepat — dan menyebutkan target durasimu. Tool menghitung estimasi durasi bacamu dan, bila tidak sesuai target, memberi saran berapa kata yang perlu dipotong atau ditambah. Sangat berguna untuk menyiapkan presentasi sidang yang alokasi waktunya ketat dan tidak boleh meleset jauh.",
  langkah: [
    "Tempel naskah yang akan kamu bacakan pada kolom yang tersedia.",
    "Pilih kecepatan bicara yang paling jujur menggambarkan caramu bicara: 🐢 110 (sangat tenang), 🎤 130 (presentasi normal), 💬 150 (mengalir), atau ⚡ 170 kata/menit (cepat).",
    "Isi target durasi dalam menit (misalnya 10) pada kolom target.",
    "Tekan ⏱️ Hitung Durasi Bicara dan baca estimasi durasimu beserta saran penyesuaian katanya.",
    "Pangkas atau tambah naskah sesuai saran, lalu hitung ulang sampai estimasinya masuk ke target."
  ],
  faq: [
    ["Kecepatan berapa yang sebaiknya saya pilih untuk sidang?", "Untuk sidang skripsi, pilihan 🐢 110 atau 🎤 130 kata per menit adalah yang paling realistis — gugup cenderung membuat orang bicara lebih cepat dari rencana, jadi menyisakan ruang dari kecepatan normalmu membuat durasi lebih aman."],
    ["Apakah estimasi ini memperhitungkan jeda dan perpindahan slide?", "Estimasi murni berasal dari jumlah kata dibagi kecepatan bicara. Jeda, minum, dan perpindahan slide menambah waktu nyata, jadi anggap hasil hitungan sebagai batas bawah dan sisakan cadangan satu-dua menit dari alokasi resminya."]
  ]
}
,

/* ================= DATA ================= */
gformclean: {
  buka: "Hasil unduhan Google Form mentah terkenal berantakan untuk diolah: judul kolomnya berupa kalimat pertanyaan yang sangat panjang, dan jawaban kuesionernya masih berupa teks (Sangat Setuju, Setuju, dan seterusnya). Pembersih ini mengubah berkas Excel hasil Google Form menjadi .xlsx siap olah data — judul kolom panjang diringkas menjadi kode item seperti X1_1, jawaban teks dikonversi menjadi skor angka 1–5, dan total skor per variabel dihitung. Ada opsi membuang kolom Timestamp dan Email responden, serta pilihan menyatukan semua item sebagai satu variabel atau membaginya per jumlah item.",
  langkah: [
    "Unggah berkas Excel hasil unduhan tanggapan Google Form-mu.",
    "Tentukan pembagian variabelnya: ‘Semua item = 1 variabel (X1)’ atau ‘Bagi per jumlah item’ bila kuesionermu memuat beberapa variabel.",
    "Aktifkan opsi ‘Buang kolom Timestamp & Email’ bila dua kolom itu tidak dibutuhkan dalam analisis.",
    "Periksa pemetaan kode kolomnya (pertanyaan panjang menjadi kode item seperti X1_1) pada pratinjau.",
    "Tekan ✨ Bersihkan & Unduh .xlsx Siap Olah — berkas hasilnya tinggal dibuka di Excel atau diimpor ke SPSS."
  ],
  faq: [
    ["Bagaimana jawaban teks diubah menjadi skor 1–5?", "Jawaban skala persetujuan dipetakan ke angka mengikuti urutan skalanya — jawaban paling positif mendapat 5 dan paling negatif mendapat 1 — sehingga kolom yang tadinya teks berubah menjadi angka yang bisa dijumlah dan diuji statistik."],
    ["Apakah file asli Google Form saya berubah?", "Tidak. Tool membaca berkas yang kamu unggah dan menghasilkan berkas .xlsx baru; berkas aslimu tetap utuh di perangkatmu untuk cadangan."]
  ]
},
validitas: {
  buka: "Tool ini menjalankan dua pengujian wajib instrumen kuesioner sekaligus: uji validitas butir dengan korelasi Pearson (r hitung tiap item dibandingkan dengan r tabel), dan uji reliabilitas dengan Cronbach's Alpha untuk keseluruhan skala. Kamu menempelkan skor jawaban responden per item, dan tool menghitung status valid tidaknya tiap butir, nilai Alpha beserta kategorinya, dan — yang paling menghemat waktu — menyusun narasi Bab 4 otomatis yang menyatakan hasil pengujian dalam kalimat akademik yang siap disalin. Tersedia tombol Isi Data Contoh untuk mencoba format datanya sebelum memakai data aslimu.",
  langkah: [
    "Tempel data skor kuesionermu: tiap baris satu responden, tiap kolom satu butir item, mengikuti format pada data contoh.",
    "Bila belum yakin formatnya, tekan Isi Data Contoh dulu dan jalankan sekali untuk melihat bentuk keluarannya.",
    "Tekan 🧮 Hitung Validitas & Reliabilitas.",
    "Baca tabel hasil: periksa r hitung dan status valid tiap butir, serta nilai Cronbach's Alpha dan kategorinya.",
    "Tekan 📋 Copy Narasi untuk menyalin auto-narasi Bab 4, atau ⬇️ Download Hasil (.txt) untuk menyimpan seluruh laporannya."
  ],
  faq: [
    ["Butir saya dinyatakan tidak valid — harus diapakan?", "Butir dengan r hitung di bawah r tabel dianggap tidak mengukur konstruk yang sama dengan skor totalnya. Dalam praktik skripsi, butir seperti itu diperbaiki redaksinya atau dibuang dari instrumen, lalu pengujian diulang — keputusan akhirnya mengikuti arahan pembimbingmu."],
    ["Berapa nilai Cronbach's Alpha yang dianggap reliabel?", "Acuan yang paling umum dipakai dalam skripsi adalah Alpha di atas 0,60 (cukup) atau 0,70 (baik). Narasi otomatis dari tool ini menyebutkan kategori nilai Alphamu, tetapi batas yang berlaku tetap mengikuti pedoman kampus dan pembimbingmu."]
  ]
},
regresi: {
  buka: "Tool ini menghitung regresi linear berganda dengan satu sampai empat variabel bebas (X1–X4) terhadap variabel terikat (Y), lengkap dengan uji asumsi klasik yang biasanya diminta penguji: multikolinearitas lewat nilai VIF, heteroskedastisitas lewat uji Glejser, dan normalitas residual. Kamu mendapat persamaan regresi, koefisien tiap variabel beserta signifikansinya, nilai R Square, dan narasi Bab 4 otomatis yang menafsirkan pengaruh tiap variabel dalam kalimat. Semua dihitung lokal dengan metode kuadrat terkecil yang sama seperti perangkat lunak statistik umumnya.",
  langkah: [
    "Pilih jumlah variabel bebas lewat pilihan ‘1 variabel (regresi sederhana)’ sampai ‘4 variabel (X1–X4)’.",
    "Tempel data tiap variabel sesuai kolom yang muncul — satu baris untuk satu responden, urutan antar variabel harus sejajar.",
    "Tekan 📈 Hitung Regresi + Uji Asumsi Klasik.",
    "Baca hasilnya: persamaan regresi, koefisien dan signifikansi tiap X, R Square, lalu hasil VIF, Glejser, dan normalitas residual.",
    "Tekan 📋 Copy Narasi Bab 4 untuk menyalin tafsir hasil dalam bentuk kalimat ke naskahmu."
  ],
  faq: [
    ["Apa arti nilai VIF pada hasil uji asumsi klasik?", "VIF menunjukkan seberapa kuat variabel bebas saling berkorelasi. VIF di bawah 10 umumnya dianggap aman dari multikolinearitas serius; bila ada variabel dengan VIF tinggi, pertimbangkan apakah dua variabelmu sebenarnya mengukur hal yang hampir sama."],
    ["Bisakah regresi logistik atau regresi dengan variabel dummy dihitung di sini?", "Tool ini menghitung regresi linear berganda biasa (OLS) untuk variabel terikat berskala angka. Regresi logistik dan teknik lanjutan lain berada di luar cakupannya — gunakan perangkat statistik penuh seperti SPSS atau JASP untuk kebutuhan itu."]
  ]
},
deskriptif: {
  buka: "Statistik deskriptif adalah fondasi Bab 4: sebelum uji hipotesis apa pun, pembaca harus dikenalkan pada gambaran data lewat mean, median, kuartil, dan simpangan baku. Tool ini menghitung semuanya dari skor yang kamu tempel, menyusun tabel distribusi frekuensi, dan membuat kategorisasi skor (rendah–sedang–tinggi) dengan dua pendekatan: empiris berdasarkan mean dan SD data aslimu, atau ideal berdasarkan skor minimum dan maksimum teoretis instrumen — misalnya 20 item berskala 1–5 berarti rentang ideal 20 sampai 100. Narasi Bab 4 otomatisnya mengubah angka-angka itu menjadi paragraf deskripsi yang siap disalin.",
  langkah: [
    "Tempel angka skor responden pada kolom yang tersedia — dipisah spasi, koma, atau baris baru, salah satu saja konsisten.",
    "Isi nama variabelnya (misalnya ‘Motivasi Belajar’) agar narasi hasil menyebut variabelmu dengan benar.",
    "Isi skor minimum dan maksimum teoretis instrumenmu (misalnya 20 dan 100 untuk 20 item skala 1–5).",
    "Pilih dasar kategorisasi: ‘Empiris — berdasarkan Mean ± SD data’ atau ‘Ideal — berdasarkan skor min & maks teoretis’.",
    "Tekan 📊 Hitung Statistik Deskriptif, baca tabel frekuensi dan kategorinya, lalu tekan 📋 Copy Narasi Bab 4."
  ],
  faq: [
    ["Apa beda kategorisasi empiris dan ideal?", "Kategorisasi empiris membagi responden mengikuti sebaran data aslimu (mean ± simpangan baku), sedangkan kategorisasi ideal membagi berdasarkan rentang skor teoretis instrumen. Keduanya sah dipakai; sebutkan dengan jelas di Bab 3 pendekatan mana yang kamu gunakan."],
    ["Apakah satu responden boleh diwakili lebih dari satu angka?", "Tidak — setiap angka adalah skor total satu responden untuk variabel itu. Bila datamu masih per item, jumlahkan dulu skor item tiap responden (atau pakai tool olah data lain di kategori ini) sebelum ditempel ke sini."]
  ]
},
formulabldr: {
  buka: "Generator ini menyusunkan rumus Excel untuk empat kasus yang paling sering dibutuhkan mahasiswa dan asisten dosen: mengubah nilai angka menjadi huruf mutu (A/AB/B/BC/C/D/E), mencari data antar-tabel (VLOOKUP, XLOOKUP, atau INDEX+MATCH), merekap bersyarat (COUNTIFS dan AVERAGEIFS), dan mengkategorikan skor menjadi Tinggi/Sedang/Rendah dari mean dan simpangan baku. Kamu cukup menjawab pertanyaan sederhana — sel mana, rentang mana, ambang berapa — lalu rumus jadi disusun dengan pemisah titik koma atau koma mengikuti bahasa Excel-mu, lengkap dengan simulasi uji agar kamu yakin rumus bekerja sebelum ditempel.",
  langkah: [
    "Pilih kasus yang kamu butuhkan: 🎓 Nilai Angka → Huruf Mutu, 🔎 Pencarian Data Antar-Tabel, 🧮 Rekap Bersyarat, atau 📊 Kategorisasi Skor.",
    "Isi kolom yang muncul sesuai kasusnya — misalnya sel nilai, sel kunci (NIM), rentang tabel sumber, dan nomor kolom yang diambil.",
    "Untuk VLOOKUP, pilih fungsi yang cocok dengan Excel-mu: VLOOKUP (semua versi), XLOOKUP (Excel 365), atau INDEX + MATCH (paling fleksibel).",
    "Pilih pemisah rumus: titik koma (;) untuk Excel Indonesia atau koma (,) untuk Excel Inggris.",
    "Periksa hasil simulasi ujinya, lalu tekan 📋 Salin Rumus dan tempel ke sel tujuan di lembar Excel-mu."
  ],
  faq: [
    ["Mengapa rumus dari internet sering error saat ditempel ke Excel saya?", "Penyebab terbanyak adalah pemisah argumen: Excel berbahasa Indonesia memakai titik koma (;) sedangkan Excel Inggris memakai koma (,). Generator ini menyesuaikan pemisahnya sejak awal, jadi pilih pengaturan yang sama dengan bahasa Excel di perangkatmu."],
    ["Mana yang sebaiknya dipilih: VLOOKUP, XLOOKUP, atau INDEX+MATCH?", "XLOOKUP paling ringkas tetapi hanya ada di Excel 365. VLOOKUP didukung semua versi tetapi kolom kunci harus di paling kiri. INDEX + MATCH bekerja di semua versi dan tidak peduli posisi kolom kunci — itu sebabnya ditandai paling fleksibel di tool ini."]
  ]
},
xlstemplate: {
  buka: "Berbeda dari berkas Excel berisi angka tempel, template dari tool ini berisi rumus Excel asli yang hidup: begitu berkas .xlsx dibuka, total, r-hitung, saldo, dan nilai akhir langsung terhitung — dan ikut berubah setiap datamu diganti. Ada empat pilihan template: tabulasi kuesioner lengkap dengan r-hitung tiap item (CORREL) dan cek valid terhadap r-tabel, pembukuan kas UKM/KKN dengan saldo berjalan, tabel amortisasi pinjaman dengan angsuran PMT per bulan, dan rekap nilai kelas dengan bobot Tugas/UTS/UAS beserta huruf mutu dan status lulusnya.",
  langkah: [
    "Pilih jenis template: 🧪 Tabulasi Kuesioner + r-Hitung, 💰 Pembukuan Kas UKM / KKN, 🏦 Tabel Amortisasi & Anggaran, atau 🎓 Rekap Nilai Kelas Asisten Dosen.",
    "Bila memilih amortisasi, isi pokok pinjaman, bunga % per tahun, dan tenor dalam bulan pada kolom yang tersedia.",
    "Tekan 📗 Buat & Unduh Template .xlsx.",
    "Buka berkasnya di Excel atau WPS — perhatikan sel-selnya berisi rumus yang langsung menghitung dari data contoh.",
    "Ganti data contoh dengan datamu sendiri baris demi baris; semua total dan kesimpulan akan menyesuaikan otomatis."
  ],
  faq: [
    ["Apa maksudnya rumus ‘hidup’ di template ini?", "Sel hasil tidak berisi angka ketikan, melainkan rumus asli seperti CORREL, SUM, dan PMT. Mengganti nilai data akan menghitung ulang semua turunannya — persis seperti bila kamu menyusun rumusnya sendiri di Excel, tanpa risiko salah ketik rumus."],
    ["Apakah template aman dibuka di Excel Indonesia maupun Inggris?", "Aman. Di dalam berkas .xlsx, rumus selalu disimpan dalam format internasional dan Excel-mu yang menampilkannya sesuai bahasa antarmuka — penjelasan itu juga tertulis di dalam tool agar kamu tidak bingung melihat nama fungsi berbahasa Inggris."]
  ]
},
sampel: {
  buka: "Kalkulator sampel ini menghitung ukuran sampel minimum penelitianmu dengan dua rumus yang paling sering diterima pembimbing: Slovin dan Isaac & Michael (Lemeshow). Kamu memasukkan jumlah populasi dan memilih taraf kesalahan — 1% untuk sangat teliti, 5% yang menjadi standar skripsi, atau 10% yang lebih longgar — lalu menerima bukan hanya angka sampelnya, tetapi juga rincian langkah perhitungan yang diformat siap salin ke Bab 3. Rincian itu penting, karena penguji hampir selalu menelusuri dari mana angka sampelmu berasal.",
  langkah: [
    "Isi jumlah populasi penelitianmu (N) — misalnya jumlah seluruh siswa, nasabah, atau warga yang menjadi populasi.",
    "Pilih taraf kesalahan: 1% (sangat teliti), 5% (standar skripsi), atau 10% (longgar).",
    "Tekan 🎯 Hitung Sampel dan baca hasil kedua rumus yang ditampilkan.",
    "Periksa bagian 📝 Langkah Perhitungan — urutan memasukkan angka ke rumus sampai hasil akhir, siap tempel ke Bab 3.",
    "Tekan 📋 Copy Langkah Rumus atau ⬇️ Download (.txt) untuk menyimpan rincian perhitungannya."
  ],
  faq: [
    ["Hasil Slovin dan Isaac & Michael berbeda — mana yang dipakai?", "Keduanya diterima luas; Isaac & Michael umumnya menghasilkan angka sedikit berbeda karena berbasis tabel chi-kuadrat. Pilih satu dan sebutkan namanya secara eksplisit di Bab 3 — yang tidak boleh adalah mencampur langkah dari dua rumus berbeda."],
    ["Taraf kesalahan 5% artinya apa?", "Artinya kamu menerima peluang meleset sebesar 5% dari nilai populasi sebenarnya. Makin kecil taraf kesalahannya, makin besar sampel yang dibutuhkan — 1% bisa berarti hampir seluruh populasi harus diteliti."]
  ]
},
kuesioner: {
  buka: "Pembuat kuesioner ini menyusun angket penelitian yang rapi dari nol: halaman identitas responden, petunjuk pengisian, dan daftar pernyataan atau pertanyaan dalam tiga bentuk — skala Likert, pilihan ganda, dan isian terbuka. Kamu mengisi judul penelitian, identitas peneliti, dan kolom identitas responden yang dibutuhkan (dipisahkan koma), lalu menyusun item-itemnya. Hasilnya dapat diunduh sebagai berkas .doc berisi kuesioner siap cetak, atau disalin sebagai teks terstruktur yang tinggal ditempel untuk membangun Google Form dengan cepat.",
  langkah: [
    "Isi judul skripsi atau penelitianmu dan identitas peneliti (misalnya ‘Detta Pranata — 2018141001’).",
    "Tulis kolom identitas responden yang kamu perlukan, dipisahkan koma — misalnya nama, kelas, jenis kelamin — yang akan menjadi kolom isian identitas.",
    "Susun item kuesionermu: tambahkan pernyataan Likert, pertanyaan pilihan ganda, atau pertanyaan terbuka sesuai instrumen penelitianmu.",
    "Periksa susunan akhirnya: identitas, petunjuk pengisian, lalu item-itemnya.",
    "Tekan ⬇️ Download Kuesioner .doc untuk versi cetaknya, atau 📋 Copy Teks untuk Google Form untuk versi daringnya."
  ],
  faq: [
    ["Apa beda keluaran .doc dan teks Google Form?", "Berkas .doc adalah kuesioner cetak yang sudah terformat untuk dibagikan langsung atau dilampirkan di skripsi. Teks untuk Google Form adalah susunan item dalam format teks yang memudahkanmu menyalin bagian demi bagian ke formulir daring tanpa mengetik ulang."],
    ["Apakah item dari kisi-kisi instrumen saya bisa langsung dipakai di sini?", "Bisa — susun item mengikuti kisi-kisimu (gunakan tool Buat Kisi-Kisi Instrumen & Operasionalisasi Variabel bila belum punya), lalu masukkan pernyataan favorable dan unfavorable sesuai nomor butir di kisi-kisi agar pengujian validitasnya nyambung."]
  ]
},
inferens: {
  buka: "Paket uji inferensial ini memuat lima analisis yang paling sering menjadi inti Bab 4 skripsi kuantitatif: uji normalitas Jarque-Bera untuk satu kelompok data, uji-t independen untuk dua kelompok berbeda, uji-t berpasangan untuk data sebelum–sesudah, ANOVA satu arah untuk tiga kelompok atau lebih, dan regresi linear sederhana beserta korelasinya. Kamu memilih jenis uji, menempel data sesuai format contoh untuk mode itu, dan menerima statistik uji, keputusan signifikansi, serta narasi Bab 4 otomatis yang menafsirkannya dalam kalimat akademik.",
  langkah: [
    "Pilih jenis uji dari daftar: Normalitas (Jarque-Bera), Uji-t Independen, Uji-t Berpasangan, ANOVA Satu Arah, atau Regresi Linear Sederhana + Korelasi.",
    "Tempel datamu mengikuti format contoh pada mode terpilih — misalnya format ‘Kelompok A: 80, 82, …’ per baris untuk ANOVA, atau pasangan angka untuk regresi.",
    "Isi keterangan desain penelitianmu bila diminta (misalnya ‘Kelompok eksperimen vs kontrol’).",
    "Tekan 📈 Hitung Uji Statistik dan baca nilai statistik, nilai p, serta keputusan signifikansinya.",
    "Tekan 📋 Copy Narasi Bab 4 untuk menyalin penafsiran hasilnya ke naskahmu."
  ],
  faq: [
    ["Uji mana yang tepat untuk desain penelitian saya?", "Satu kelompok yang diuji sebarannya: normalitas. Dua kelompok berbeda: uji-t independen. Subjek yang sama diukur dua kali: uji-t berpasangan. Tiga kelompok atau lebih: ANOVA. Hubungan pengaruh satu X ke satu Y: regresi sederhana. Bila data tidak berdistribusi normal, pertimbangkan padanan non-parametriknya di tool Uji Statistik Non-Parametrik."],
    ["Format tempel data untuk tiap uji sama atau berbeda?", "Berbeda, karena struktur datanya memang berbeda — data berpasangan harus terbaca sebagai pasangan, data ANOVA sebagai kelompok-kelompok. Setiap mode menampilkan contoh formatnya sendiri; ikuti persis contoh pada mode yang kamu pilih."]
  ]
},
nonpar: {
  buka: "Ketika data penelitianmu tidak berdistribusi normal atau berbentuk skala ordinal, uji parametrik tidak sah dipakai — di situlah empat uji non-parametrik ini bekerja: Mann-Whitney U untuk dua kelompok berbeda, Wilcoxon Signed-Rank untuk data sebelum–sesudah, Kruskal-Wallis untuk tiga kelompok atau lebih, dan korelasi Spearman untuk hubungan dua variabel. Tiap uji dijalankan dari peringkat (rank) data, bukan nilai mentahnya. Kamu menempel data, memilih ujinya, dan menerima statistik uji, keputusan signifikansi, dan narasi Bab 4 otomatis yang siap disalin.",
  langkah: [
    "Pilih uji yang sesuai desainmu: Mann-Whitney U, Wilcoxon Signed-Rank, Kruskal-Wallis, atau Korelasi Spearman.",
    "Tempel datamu pada kolom yang tersedia — untuk Spearman, kelompok kedua adalah variabel Y; untuk Kruskal-Wallis, tulis tiap kelompok pada barisnya sendiri mengikuti contoh format.",
    "Isi keterangan singkat datamu (misalnya ‘skor motivasi kelompok eksperimen vs kontrol’) agar narasinya tepat.",
    "Tekan 📉 Hitung Uji Non-Parametrik dan baca statistik beserta keputusan signifikansinya.",
    "Tekan 📋 Copy Narasi Bab 4 untuk menempelkan tafsir hasilnya ke naskahmu."
  ],
  faq: [
    ["Kapan saya wajib memakai uji non-parametrik?", "Bila uji normalitas menunjukkan datamu tidak berdistribusi normal, atau datamu berskala ordinal (misalnya skor Likert per item). Memaksakan uji-t atau ANOVA pada data seperti itu adalah kesalahan metodologi yang sering ditangkap penguji."],
    ["Apakah hasil uji non-parametrik lebih lemah dari parametrik?", "Sedikit — uji peringkat memang punya kuasa statistik lebih rendah karena membuang informasi jarak antar nilai. Tetapi uji yang sah dengan kuasa lebih rendah selalu lebih baik daripada uji kuat yang asumsinya dilanggar."]
  ]
},
likert: {
  buka: "Setelah menyebar kuesioner Google Form, jawaban yang terkumpul masih berupa teks: Sangat Setuju, Setuju, Ragu-ragu, Tidak Setuju, Sangat Tidak Setuju. Konverter ini mengubah jawaban teks dalam jumlah besar sekaligus menjadi skor angka 1–5 yang siap diolah, dengan dua arah penskoran: favorable untuk pernyataan positif (SS=5 sampai STS=1) dan unfavorable untuk pernyataan negatif yang skornya dibalik (SS=1 sampai STS=5). Hasil konversinya tersusun sebagai tabel yang bisa langsung ditempel ke Excel atau diunduh sebagai CSV.",
  langkah: [
    "Salin kolom jawaban kuesionermu dari lembar tanggapan, lalu tempel pada area kerja di atas — satu jawaban per sel/baris mengikuti susunan datamu.",
    "Pilih arah penskoran: Favorable untuk pernyataan positif, atau Unfavorable / pernyataan negatif untuk item yang kalimatnya negatif.",
    "Tekan 🔢 Konversi ke Angka dan periksa hasil skornya.",
    "Tekan 📋 Copy Hasil (siap paste ke Excel) untuk menempelnya sebagai tabel angka, atau ⬇️ Download CSV untuk menyimpannya sebagai berkas."
  ],
  faq: [
    ["Item favorable dan unfavorable harus dikonversi terpisah?", "Ya — karena arah skornya berlawanan. Konversikan dulu semua item favorable dalam satu kelompok, lalu item unfavorable dalam kelompok sendiri, dan gabungkan hasilnya di Excel mengikuti nomor butir aslinya."],
    ["Label jawaban saya memakai bahasa lain, misalnya ‘Agree’ — bisa?", "Pemetaan didasarkan pada label skala persetujuan standar yang dipakai kuesioner Indonesia (SS/S/RG/TS/STS dan bentuk panjangnya). Bila labelmu berbeda jauh dari pola itu, samakan dulu labelnya di lembar tanggapan agar terbaca sebagai skala yang sama."]
  ]
},
tabelstat: {
  buka: "Tabel statistik cetak punya kelemahan klasik: barisnya hanya tersedia untuk N atau derajat bebas tertentu yang bulat, padahal responden penelitian nyata jarang bulat — misalnya N=137. Generator ini menghitung nilai kritis yang eksak untuk N atau df berapa pun, untuk empat distribusi: r product moment, t, F, dan chi-square (χ²). Ada dua mode: satu nilai kritis beserta pembanding terhadap nilai hitungmu (langsung ketahuan signifikan atau tidak), atau rentang tabel klasik untuk dilampirkan. Hasilnya bisa disalin sebagai teks atau sebagai tabel TSV.",
  langkah: [
    "Pilih distribusi yang kamu butuhkan: r — Korelasi Product Moment, t, F, atau χ² — Chi-Square.",
    "Pilih mode: ‘Satu nilai + pembanding’ untuk keputusan cepat, atau ‘Rentang tabel (klasik)’ untuk membuat tabel berisi banyak baris.",
    "Isi parameter yang diminta (misalnya N=137 untuk tabel r) dan nilai hitungmu (misalnya 0,31) bila memakai mode pembanding.",
    "Tekan 📊 Hitung Nilai Kritis dan baca nilai kritis eksaknya beserta kesimpulan perbandingannya.",
    "Tekan 📋 Copy Hasil atau 📋 Copy Tabel (TSV) untuk memindahkan hasilnya ke naskah atau Excel."
  ],
  faq: [
    ["Mengapa disebut nilai tabel ‘eksak’?", "Karena nilai kritisnya dihitung langsung dari fungsi distribusi statistiknya untuk N atau df yang kamu minta — bukan hasil interpolasi atau pembulatan ke baris terdekat seperti pada tabel cetak. Untuk N=137 kamu mendapat nilai tabel untuk 137, bukan untuk 135 atau 140."],
    ["Untuk apa mode pembanding nilai hitung?", "Mode itu menjawab pertanyaan sidang yang paling umum: apakah r hitungmu lebih besar dari r tabel? Masukkan nilai hitungmu dan tool langsung menyatakan perbandingannya, lengkap dengan nilai kritis pembandingnya."]
  ]
},
mediasi: {
  buka: "Tool ini melayani dua analisis jalur lanjutan dalam dua tab. Tab pertama adalah Sobel test untuk uji mediasi: kamu memasukkan koefisien jalur X→Z dan Z→Y beserta galat bakunya (atau menghitung koefisiennya dari data), dan tool menghitung statistik z Sobel, signifikansinya, serta kesimpulan apakah mediasinya penuh atau parsial — lengkap dengan diagram jalur. Tab kedua adalah regresi moderasi (MRA) yang menguji apakah variabel moderator memperkuat atau memperlemah pengaruh X terhadap Y. Keduanya menghasilkan narasi Bab 4 otomatis yang siap disalin.",
  langkah: [
    "Untuk mediasi, buka 💧 Tab 1 — Sobel Test (Mediasi) dan beri nama variabelmu: X, mediator (Z), dan Y (misalnya Kualitas Layanan → Kepuasan → Loyalitas).",
    "Masukkan koefisien jalur a (X→Z) dan b (Z→Y) beserta standard error-nya dari hasil regresimu — atau tekan Hitung Koefisien dari Data untuk memperolehnya dari data mentah.",
    "Tekan 💧 Hitung Sobel Test dan baca nilai z, signifikansi, serta kesimpulan mediasi penuh atau parsialnya.",
    "Untuk moderasi, buka 🎚️ Tab 2 — Moderasi (MRA), masukkan data X, moderator, dan Y, lalu tekan 🎚️ Jalankan Regresi Moderasi.",
    "Tekan 📋 Copy Narasi untuk menyalin tafsir hasil tab yang aktif ke Bab 4 naskahmu."
  ],
  faq: [
    ["Apa beda mediasi penuh dan parsial?", "Mediasi penuh berarti pengaruh X ke Y habis tersalurkan lewat mediator (jalur langsung tidak lagi signifikan), sedangkan mediasi parsial berarti sebagian pengaruh tetap berjalan langsung. Kesimpulan itu dibaca dari signifikansi jalur langsung setelah mediator dimasukkan — persis yang dinyatakan narasi otomatis tool ini."],
    ["Dari mana saya mendapat koefisien a, b, dan standard error untuk Sobel test?", "Dari dua regresi biasa: regresikan Z pada X untuk mendapat jalur a, lalu regresikan Y pada X dan Z untuk mendapat jalur b beserta galat bakunya. Bila kamu punya data mentahnya, tombol Hitung Koefisien dari Data di tab Sobel menghitung kedua regresi itu untukmu."]
  ]
},
k25: {
  buka: "Pembuat bagan ini mengubah model penelitianmu menjadi gambar kerangka berpikir yang baku untuk Bab 2: kotak-kotak variabel dengan panah hubungan X menuju Y, yang bisa dikembangkan dengan variabel ketiga berperan sebagai mediasi (X → Z → Y) atau moderasi. Kamu cukup mengetikkan nama variabelnya — hasilnya berupa bagan yang bisa diunduh sebagai PNG untuk ditempel ke naskah, disertai narasi kerangka berpikir siap salin yang menjelaskan arah hubungan antarvariabel dalam kalimat akademik. Bagan dan narasi dibuat dari isian yang sama, jadi keduanya tidak akan saling bertentangan.",
  langkah: [
    "Isi nama variabel X dan variabel Y penelitianmu pada kolom yang tersedia.",
    "Bila ada variabel ketiga, isi namanya (misalnya ‘Motivasi Belajar (Z)’) dan pilih perannya: Mediasi/Intervening (X → Z → Y) atau Moderasi (memperkuat/memperlemah X → Y); pilih ‘— Tidak ada —’ untuk model sederhana.",
    "Tekan 🗺️ Buat Bagan + Narasi.",
    "Periksa bagan yang dihasilkan: arah panah harus sesuai dengan logika penelitianmu.",
    "Tekan ⬇️ Download Bagan (PNG) untuk gambarnya dan 📋 Copy Narasi untuk teks kerangka berpikir Bab 2."
  ],
  faq: [
    ["Bisakah bagan ini memuat dua variabel X sekaligus?", "Bagan ini dirancang untuk model satu X, satu Y, dan paling banyak satu variabel antara (Z) — model yang paling umum di skripsi. Model yang lebih kompleks dari itu sebaiknya digambar dengan perangkat diagram khusus agar panahnya tidak bertumpuk."],
    ["Narasi yang dihasilkan menjelaskan apa saja?", "Narasi menguraikan hubungan yang digambarkan panah: bagaimana X memengaruhi Y, dan bila ada Z, melalui jalur apa (mediasi) atau dalam kondisi apa pengaruh itu berubah (moderasi) — kalimatnya mengikuti persis model yang kamu gambar."]
  ]
},
k26: {
  buka: "Grafik untuk Bab 4 punya musuh yang jarang disadari: mesin fotokopi. Diagram warna yang cantik di layar akan berubah menjadi abu-abu yang nyaris tak terbaca bedanya saat skripsi dicetak dan digandakan hitam-putih. Generator ini membuat diagram batang atau diagram pie dengan pola arsiran berbeda untuk tiap kategori — garis miring, titik, silang, dan sebagainya — sehingga setiap kategori tetap dapat dibedakan dalam cetakan hitam-putih. Hasilnya diunduh sebagai PNG tajam yang siap ditempel ke naskah Bab 4.",
  langkah: [
    "Masukkan data kategorimu beserta frekuensi atau persentasenya mengikuti format isian di tool.",
    "Pilih jenis grafik: 📊 Diagram Batang untuk perbandingan antarkategori, atau 🥧 Diagram Pie untuk komposisi bagian dari keseluruhan.",
    "Tekan 📊 Buat Grafik Arsiran dan periksa hasilnya — tiap kategori tampil dengan pola arsir yang berbeda.",
    "Bila susunan atau urutannya kurang pas, ubah datanya lalu tekan 🔄 Gambar Ulang.",
    "Tekan ⬇️ Download PNG untuk menyimpan grafik final dan menempelnya ke Bab 4."
  ],
  faq: [
    ["Mengapa tidak memakai warna saja seperti grafik Excel?", "Karena naskah skripsi dicetak dan sering difotokopi hitam-putih; dua warna yang kontras di layar bisa menjadi abu-abu yang sama di kertas. Pola arsiran adalah solusi klasik penerbitan ilmiah agar kategori tetap terbedakan tanpa warna."],
    ["Diagram batang atau pie — mana yang lebih tepat?", "Batang lebih baik untuk membandingkan nilai antarkategori (perbedaan tinggi mudah dibaca), sedangkan pie hanya tepat bila kategorimu adalah bagian-bagian dari satu keseluruhan yang jumlahnya 100%."]
  ]
},
k23: {
  buka: "Generator ini membuat data kuesioner simulasi untuk latihan mengolah data: kamu menentukan jumlah responden, jumlah item, skala jawaban (1–5 atau 1–4), dan target reliabilitasnya, lalu tool membangkitkan data jawaban yang — ini bagian pentingnya — diverifikasi benar-benar mencapai Cronbach's Alpha pada target yang kamu pilih (≥ 0,60, ≥ 0,70, atau ≥ 0,80). Data hasil unduhan CSV-nya cocok untuk berlatih uji validitas, reliabilitas, dan regresi sebelum menyentuh data asli. Data ini fiktif dan hanya untuk belajar, bukan pengganti pengumpulan data penelitian.",
  langkah: [
    "Tentukan jumlah responden dan jumlah item kuesioner simulasi yang kamu inginkan.",
    "Pilih skala jawaban: Skala 5 (1–5) atau Skala 4 (1–4).",
    "Pilih target reliabilitasnya: ≥ 0,60 (cukup), ≥ 0,70 (baik), atau ≥ 0,80 (sangat baik).",
    "Tekan 🧪 Generate Data Simulasi dan tunggu data dibangkitkan lalu diverifikasi mencapai target Alphanya.",
    "Tekan ⬇️ Download CSV untuk berkas datanya, atau 📋 Copy CSV untuk menempelnya langsung ke Excel atau SPSS."
  ],
  faq: [
    ["Bolehkah data simulasi ini dipakai sebagai data skripsi?", "Tidak boleh. Data ini dibangkitkan komputer untuk latihan analisis — memakainya sebagai data penelitian adalah fabrikasi data, pelanggaran etika penelitian yang serius. Gunakan untuk berlatih dan memahami prosedur uji, lalu olah data responden aslimu sendiri."],
    ["Mengapa datanya bisa dijamin mencapai Alpha target?", "Karena pembangkitnya menyusun pola jawaban antar item dengan korelasi yang diatur, lalu memeriksa Alpha hasilnya sebelum menyerahkan data kepadamu. Target yang lebih tinggi (≥ 0,80) berarti jawaban antar item dibuat lebih konsisten satu sama lain."]
  ]
},
k24: {
  buka: "Transkrip wawancara mentah dari aplikasi perekam biasanya penuh sampah: cap waktu di setiap baris, kata pengisi seperti ‘anu’, ‘eee’, dan ‘hmm’, serta kata yang terucap ganda (‘saya saya’). Pembersih ini merapikan ketiganya dengan saklar yang bisa kamu atur sendiri — hapus cap waktu, hapus kata pengisi, gabungkan pengulangan kata — lalu menampilkan transkrip bersih yang siap dianalisis. Sebagai bonus analisis awal, tool ini menghitung frekuensi kata 15 teratas dari ucapan narasumber, yang membantumu melihat tema dominan sebelum masuk ke tahap koding kualitatif.",
  langkah: [
    "Tempel transkrip wawancara mentahmu pada area kerja di atas.",
    "Atur tiga saklar pembersihan sesuai kebutuhan: Hapus cap waktu, Hapus kata pengisi (anu, eee, hmm…), dan Gabung pengulangan kata (saya saya → saya).",
    "Tekan 🎧 Bersihkan Transkrip.",
    "Baca transkrip bersihnya dan periksa bagian 📊 Frekuensi Kata (15 teratas) untuk gambaran tema yang sering muncul dari narasumber.",
    "Tekan 📋 Copy Transkrip Bersih atau ⬇️ Download .txt untuk menyimpan hasil yang siap dikoding."
  ],
  faq: [
    ["Apakah kata pengisi selalu aman dihapus?", "Untuk analisis isi (koding tema) umumnya aman. Tetapi bila penelitianmu menganalisis cara bicara itu sendiri — misalnya analisis wacana — keraguan dan pengulangan bisa jadi data penting; matikan saklarnya dan bersihkan cap waktunya saja."],
    ["Untuk apa daftar frekuensi kata setelah transkrip dibersihkan?", "Daftar itu adalah peta awal isi wawancara: kata yang paling sering diucapkan narasumber biasanya menandai tema terpenting baginya. Gunakan sebagai calon tema saat kamu menyusun kode di tool Koding Kualitatif Transkrip."]
  ]
},
koding: {
  buka: "Koding adalah jantung analisis kualitatif: membaca transkrip, memecahnya menjadi segmen-segmen ucapan, dan memberi label tema (kode) pada tiap segmen. Tool ini menata proses manual itu: transkrip dipecah menjadi segmen berdasarkan baris kosong, kamu membuat kode-kode temamu sendiri (misalnya ‘Manfaat Ekonomi’), lalu menandai segmen per segmen. Hasilnya adalah tabel koding yang bisa diunduh sebagai .doc, plus ringkasan frekuensi tema yang menunjukkan tema mana yang paling dominan di data wawancaramu — bahan langsung untuk menulis Bab 4 kualitatif.",
  langkah: [
    "Tempel transkripmu pada kolom yang tersedia — pisahkan tiap segmen (satu jawaban atau satu ucapan) dengan BARIS KOSONG.",
    "Tekan ✂️ Pecah Jadi Segmen dan periksa hasil pecahannya.",
    "Buat kode pertamamu: tulis nama kode (misalnya ‘Manfaat Ekonomi’) lalu tekan + Kode.",
    "Tandai tiap segmen dengan kode yang sesuai; buat kode baru setiap muncul tema yang belum terwakili.",
    "Baca Ringkasan Frekuensi Tema untuk melihat tema dominanmu, lalu tekan ⬇️ Download Tabel Koding .doc atau 📋 Copy Ringkasan Tema."
  ],
  faq: [
    ["Apa yang dimaksud satu segmen dalam tool ini?", "Satu segmen adalah satu potongan ucapan narasumber yang dipisahkan baris kosong dari potongan berikutnya — biasanya satu jawaban atas satu pertanyaan. Pemecahan yang rapi sejak awal menentukan kualitas koding, karena kode ditempelkan per segmen."],
    ["Bagaimana frekuensi tema membantu penulisan Bab 4?", "Frekuensi menunjukkan tema mana yang paling banyak muncul di data — tema dominan layak dibahas paling dalam, tema yang jarang muncul bisa menjadi temuan pendukung atau kejutan. Ringkasan frekuensinya bisa dikutip sebagai gambaran awal sebelum kamu membahas tiap tema dengan kutipan ucapan."]
  ]
},
consent: {
  buka: "Lembar persetujuan responden (informed consent) adalah dokumen etika yang membuktikan partisipan penelitianmu bersedia terlibat secara sukarela dan paham tujuan, prosedur, serta kerahasiaan datanya. Generator ini menyusun lembar itu dalam format resmi berkop logo, siap tanda tangan: kamu mengisi judul penelitian, nama peneliti utama, program studi dan universitas, serta kontak yang bisa dihubungi responden. Hasilnya diunduh sebagai .doc yang tinggal dicetak dan dibawa saat pengambilan data — satu eksemplar ditandatangani responden, satu lagi kamu simpan sebagai arsip etik penelitianmu.",
  langkah: [
    "Isi judul lengkap penelitianmu pada kolom Judul Penelitian.",
    "Isi nama peneliti utama, program studi beserta universitas (misalnya ‘S1 Ekonomi — Universitas …’), dan kontak untuk pertanyaan responden.",
    "Periksa susunan lembarnya: penjelasan tujuan, prosedur, kerahasiaan, dan kesukarelaan responden harus terbaca jelas.",
    "Tekan ⬇️ Download .doc (Siap Tanda Tangan) untuk berkas jadinya, atau 📋 Copy Teks bila hanya memerlukan isinya.",
    "Cetak dan mintakan tanda tangan responden sebelum pengambilan data dimulai."
  ],
  faq: [
    ["Apakah lembar ini wajib untuk semua penelitian?", "Untuk penelitian yang melibatkan manusia sebagai subjek — survei, wawancara, eksperimen — persetujuan responden adalah syarat etika dasar, dan banyak kampus serta jurnal mewajibkannya. Penelitian data sekunder murni biasanya tidak memerlukannya, tetapi konfirmasikan ke pembimbingmu."],
    ["Unsur apa saja yang membuat informed consent sah secara etika?", "Penjelasan tujuan dan prosedur penelitian, pernyataan kesukarelaan (boleh mundur tanpa sanksi), jaminan kerahasiaan identitas dan data, serta kontak peneliti — unsur-unsur itulah yang tersusun di lembar hasil tool ini dan menjadi dasar tanda tangan responden."]
  ]
},
federer: {
  buka: "Dalam penelitian eksperimen, jumlah ulangan tidak boleh ditebak: rumus Federer memberi batas minimalnya lewat kaidah (t−1)(r−1) ≥ 15, dengan t jumlah perlakuan dan r jumlah ulangan. Kalkulator ini menghitung ulangan minimal untuk rancanganmu, menambah cadangan drop-out agar sampel tidak kurang di tengah jalan, lalu — bagian yang paling melelahkan bila manual — mengacak penempatan unit percobaan ke kelompok perlakuan mengikuti Rancangan Acak Lengkap (RAL) atau Rancangan Acak Kelompok (RAK) dari daftar unit yang kamu masukkan.",
  langkah: [
    "Isi jumlah perlakuan (t) eksperimenmu, lalu tekan 🧪 Hitung Ulangan Minimal untuk mendapat jumlah ulangan (r) menurut rumus Federer beserta cadangan drop-out-nya.",
    "Siapkan daftar unit percobaanmu, satu nama per baris (misalnya Tikus-01, Tikus-02, dan seterusnya) sesuai jumlah total dari perhitungan tadi.",
    "Pilih rancangannya: RAL — Rancangan Acak Lengkap, atau RAK — Rancangan Acak Kelompok (blok).",
    "Tekan 🎲 Acak Penempatan untuk membagi unit ke kelompok perlakuan secara acak.",
    "Tekan 📋 Copy Hasil Acak untuk mendokumentasikan pembagiannya ke catatan atau laporan penelitianmu."
  ],
  faq: [
    ["Apa arti kaidah (t−1)(r−1) ≥ 15 pada rumus Federer?", "Perkalian itu adalah derajat bebas galat minimum yang dianggap cukup agar uji statistik eksperimen punya ketelitian wajar. Makin banyak perlakuan, makin sedikit ulangan minimum yang dituntut rumus — dan sebaliknya."],
    ["Kapan memilih RAK dan kapan RAL?", "Pilih RAL bila unit percobaanmu homogen dan kondisi lingkungan seragam. Pilih RAK bila ada faktor pengganggu yang bisa dikelompokkan — misalnya ukuran awal, lokasi rak, atau batch — agar pengaruh faktor itu tidak mencemari perbandingan antar perlakuan."]
  ]
}
,
decksidang: {
  buka: "Generator ini mengubah isi skripsimu menjadi deck presentasi sidang .pptx asli berisi 11 slide: sampul berlogo, slide agenda dengan penanda (badge) urutan, lalu materi Bab 1 sampai Bab 5 termasuk slide tabel hasil penelitian. Kamu mengisi data terstruktur per bab sekali saja, memilih satu dari lima tema akademik (Navy Formal, Emerald Sains, Maroon Hukum, Slate Modern, atau Gold Ekonomika), dan file PowerPoint jadi terunduh — lengkap dengan catatan pembicara (speaker notes) otomatis di tiap slide yang membantumu tahu harus bicara apa saat slide itu tampil.",
  langkah: [
    "Isi judul skripsimu, nama beserta NIM, program studi dan universitas, serta nama dosen pembimbing pada kolom identitas.",
    "Isi ringkasan terstruktur tiap bab: latar belakang dan rumusan masalah (Bab 1), teori kunci (Bab 2), metode (Bab 3), temuan utama (Bab 4), dan simpulan (Bab 5).",
    "Masukkan data hasil penelitianmu pada bagian tabel hasil agar tampil sebagai tabel di slide hasil.",
    "Pilih tema warnanya: 🔵 Navy Formal, 🟢 Emerald Sains, 🔴 Maroon Hukum, ⚪ Slate Modern, atau 🟡 Gold Ekonomika.",
    "Tekan 🎓 Buat Deck .pptx Sidang, unduh berkasnya, lalu baca catatan pembicara di tiap slide saat kamu berlatih."
  ],
  faq: [
    ["Apa isi catatan pembicara yang dibuat otomatis?", "Catatan pembicara berisi panduan bicara yang disusun dari isianmu sendiri untuk tiap slide — pembuka, poin yang wajib diucapkan, dan pengantar ke slide berikutnya. Baca lewat tampilan Presenter View di PowerPoint saat latihan agar penyampaianmu tidak keluar jalur."],
    ["Bisakah deck hasil unduhan diubah lagi di PowerPoint?", "Bisa — berkasnya adalah .pptx asli, bukan gambar. Kamu bebas mengganti teks, menambah slide, atau menyesuaikan warna di PowerPoint, Keynote, maupun WPS sebelum hari sidang."]
  ]
},
pptxextract: {
  buka: "Slide dosen biasanya padat dan tidak bersahabat untuk dibaca ulang. Pengekstrak ini membuka berkas .pptx materi kuliahmu dan menuangkan seluruh isinya ke tiga bentuk yang lebih berguna: rangkuman Word (.doc) yang mengalir sebagai teks bacaan, handout PDF dengan kolom catatan kosong di samping tiap materi untuk dicoret-coret saat kuliah, dan kuis latihan yang soal-soalnya dibuat otomatis dari isi slide itu sendiri. Satu unggahan mengubah tumpukan slide menjadi bahan belajar yang lengkap.",
  langkah: [
    "Unggah berkas .pptx materi dari dosenmu melalui area kerja di atas.",
    "Tunggu proses ekstraksi membaca teks dari semua slide.",
    "Tekan 📄 Rangkuman Word (.doc) untuk versi bacaan teksnya.",
    "Tekan 📝 Handout PDF (kolom catatan) untuk versi cetak berisi ruang catatan di tiap bagian.",
    "Tekan 🧠 Buat Kuis dari Materi Ini untuk menghasilkan soal latihan beserta kuncinya dari isi slide, lalu kerjakan sebagai uji pemahaman."
  ],
  faq: [
    ["Bagaimana kuis bisa dibuat otomatis dari slide?", "Tool membaca kalimat-kalimat materi di slide dan menyusunnya menjadi soal latihan — misalnya mengubah pernyataan penting menjadi pertanyaan. Kualitas soalnya mengikuti kejelasan kalimat di slide dosenmu, jadi gunakan sebagai latihan awal, bukan satu-satunya sumber belajar."],
    ["Apakah gambar dan diagram di slide ikut terekstrak?", "Yang diekstrak adalah konten teks slide. Gambar dan diagram tetap berada di berkas .pptx aslimu — buka berkas asli berdampingan dengan rangkuman bila materi kuliahmu banyak mengandalkan visual."]
  ]
},
xls2chart: {
  buka: "Konverter ini mengubah tabel data menjadi satu slide presentasi .pptx yang berisi grafik vektor asli PowerPoint — bukan tempelan gambar — lengkap dengan tabel datanya. Kamu menempel atau mengunggah tabel, memilih bentuk grafik (batang, garis, lingkaran, atau donat), dan menulis kesimpulan singkat temuanmu yang akan tampil mendampingi grafik. Karena grafiknya objek asli PowerPoint, warnanya bisa diubah, angkanya bisa dikoreksi, dan tampilannya tetap tajam sebesar apa pun slide diperbesar di layar sidang.",
  langkah: [
    "Tempel tabel datamu (salin dari Excel) atau unggah berkasnya melalui area kerja di atas.",
    "Pilih bentuk grafik: 📊 Batang (Bar), 📈 Garis (Line), 🥧 Lingkaran (Pie), atau 🍩 Donat (Doughnut).",
    "Tulis kesimpulan singkat temuanmu pada kolom yang tersedia — kalimat ini yang menjelaskan ‘jadi apa’ dari grafikmu.",
    "Tekan 📊 Buat Slide .pptx dan unduh berkas slidenya.",
    "Sisipkan slide ke deck presentasimu; sesuaikan warna grafik di PowerPoint bila perlu mengikuti tema deck-mu."
  ],
  faq: [
    ["Mengapa grafik vektor lebih baik daripada screenshot grafik Excel?", "Grafik vektor adalah objek asli PowerPoint: bisa diedit datanya, diganti warnanya, dan tetap tajam saat ditampilkan besar. Screenshot adalah gambar mati yang pecah saat diperbesar dan tidak bisa diperbaiki bila ada angka yang salah ketik."],
    ["Grafik mana untuk data hasil penelitian saya?", "Batang untuk membandingkan nilai antark kelompok atau kategori, garis untuk perubahan dari waktu ke waktu, dan lingkaran/donat hanya bila data adalah bagian-bagian dari satu keseluruhan (jumlah 100%)."]
  ]
},
pptxpress: {
  buka: "Penyebab file PowerPoint membengkak hampir selalu sama: foto beresolusi kamera penuh disisipkan apa adanya ke slide. Kompresor ini mengecilkan file .pptx-mu dengan men-downscale dan mengompresi ulang gambar-gambar di dalamnya lewat canvas — kamu memilih resolusi maksimum (1920, 1280, atau 960 piksel) dan kualitas hasil (85%, 75%, atau 60%) — sementara teks, bentuk, dan animasi slide dibiarkan utuh. Hasilnya adalah .pptx yang jauh lebih ringan dan lolos batas unggah SIAKAD atau LMS kampus tanpa mengorbankan isi presentasi.",
  langkah: [
    "Unggah berkas .pptx yang ukurannya membengkak melalui area kerja di atas.",
    "Pilih resolusi maksimum gambar: 1920px (tajam), 1280px (seimbang), atau 960px (paling ringan).",
    "Pilih kualitas kompresinya: 85% (tajam), 75% (seimbang), atau 60% (ringan).",
    "Tekan 🗜️ Kompres Sekarang dan tunggu gambar-gambar di dalam slide diproses ulang.",
    "Unduh .pptx hasil kompresi dan bandingkan ukurannya dengan berkas asli sebelum mengunggahnya ke SIAKAD/LMS."
  ],
  faq: [
    ["Apakah animasi dan transisi slide saya hilang setelah dikompres?", "Tidak. Yang diproses ulang hanyalah berkas gambar di dalam paket .pptx; teks, bentuk, animasi, dan transisi tidak disentuh. Itu sebabnya ukuran turun drastis tetapi presentasi berjalan persis seperti sebelumnya."],
    ["Pengaturan mana yang sebaiknya saya pilih?", "Untuk sidang yang ditampilkan di proyektor, 1280px dengan kualitas 75% adalah titik seimbang yang aman. Pilih 1920px/85% bila banyak foto detail yang harus tetap tajam, dan 960px/60% hanya bila batas unggah sistem kampusmu sangat kecil."]
  ]
},
k27: {
  buka: "Konverter ini mengubah outline atau poin-poin makalah menjadi berkas presentasi .pptx asli: setiap bagian outline menjadi slide dengan judul dan poin-poinnya, mengikuti urutan bab makalahmu. Kamu menempelkan poin per bab, mengisi nama dan keterangan kelas atau universitas, lalu file PowerPoint terstruktur langsung terunduh. Cara ini jauh lebih cepat daripada menyalin poin satu per satu ke slide kosong, dan hasil akhirnya tetap bisa dipoles bebas di PowerPoint karena formatnya berkas presentasi sungguhan.",
  langkah: [
    "Susun outline makalahmu sebagai poin-poin per bab mengikuti format isian di tool — satu bagian untuk satu rangkaian slide.",
    "Isi nama kamu dan keterangan kelas/universitas (misalnya ‘Universitas Contoh — Kelas A’) untuk slide sampulnya.",
    "Tekan 🖥️ Generate File .pptx.",
    "Unduh berkasnya dan buka di PowerPoint untuk memeriksa urutan slide mengikuti outline-mu.",
    "Tambahkan gambar, ganti tema, dan atur desainnya di PowerPoint sesuai selera presentasimu."
  ],
  faq: [
    ["Bagaimana outline saya dipetakan menjadi slide?", "Setiap judul bagian pada outline menjadi slide judul/isi dan poin-poin di bawahnya menjadi isi slide tersebut. Karena itu, outline yang rapi hierarkinya — bab, sub-bab, poin — menghasilkan deck yang rapi pula."],
    ["Apakah saya masih perlu PowerPoint setelah memakai tool ini?", "Untuk menampilkan dan memoles, ya — tool ini menghasilkan berkas .pptx awal yang terstruktur dari outline-mu. Penyuntingan lanjutan seperti tema warna dan sisipan gambar memang paling nyaman dilakukan di PowerPoint atau WPS."]
  ]
},
teleprompter: {
  buka: "Teleprompter ini menggulirkan naskah bicaramu secara otomatis dengan kecepatan yang bisa diatur, disertai pewaktu latihan dan estimasi kata per menit — persis alat bantu yang dipakai presenter untuk menjaga tempo. Ada pula mode cermin yang membalik tampilan teks, untuk dipakai bersama kaca atau tablet reflektor ala prompter sungguhan. Untuk persiapan sidang, alat ini melatihmu menyampaikan materi dalam durasi yang ditentukan tanpa terpaku membaca slide, karena matamu dilatih mengikuti teks berjalan dengan kecepatan tetap.",
  langkah: [
    "Tempel naskah atau poin bicara sidangmu pada kolom ‘Tempel naskah / poin bicara sidang kamu di sini…’.",
    "Atur kecepatan gulir teks sampai terasa sama dengan tempo bicaramu yang natural.",
    "Aktifkan 🪞 Mode Cermin hanya bila kamu memakai perangkat reflektor; biarkan nonaktif untuk latihan biasa di layar.",
    "Tekan ▶️ Mulai Latihan dan sampaikan materimu mengikuti teks yang berjalan; tekan ⏮ Ulang untuk memulai dari awal.",
    "Gunakan ⏱ Mulai pada pewaktu untuk mencatat durasi latihanmu dan sesuaikan kecepatan sampai pas dengan alokasi waktu sidang."
  ],
  faq: [
    ["Apa gunanya mode cermin?", "Mode cermin membalik teks secara horizontal agar terbaca benar saat dipantulkan lewat kaca teleprompter atau permukaan reflektif — teknik yang dipakai studio televisi. Untuk latihan di HP atau laptop tanpa reflektor, mode ini tidak perlu dinyalakan."],
    ["Bagaimana menentukan kecepatan gulir yang pas?", "Mulai dari tempo bicara normalmu (sekitar 130 kata per menit) dan naikkan atau turunkan sedikit demi sedikit sampai kamu bisa mengikuti teks tanpa mengeja. Bila kamu sering tertinggal, teksnya berjalan terlalu cepat — atau naskahmu perlu dipadatkan."]
  ]
},
k28: {
  buka: "Simulator ini meniru momen paling menegangkan dari sidang: pertanyaan penguji yang tidak terduga. Di dalamnya ada bank berisi 18+ pertanyaan jebakan yang paling sering diajukan penguji — tentang alasan memilih judul, kelemahan metode, sampai tindak lanjut penelitian — masing-masing dilengkapi kerangka jawaban yang menunjukkan struktur menjawab yang baik, plus pewaktu agar latihanmu realistis. Kamu mengambil pertanyaan secara acak per kategori atau acak semua, menjawab dengan suara lantang, lalu menilai sendiri jawabanmu sebelum lanjut ke pertanyaan berikutnya.",
  langkah: [
    "Pilih mode soal: 🎲 Acak Semua Kategori, atau satu kategori pertanyaan tertentu yang ingin kamu latih.",
    "Tekan 🎲 Beri Saya Pertanyaan dan baca pertanyaan yang muncul.",
    "Jawab dengan suara lantang mengikuti pewaktu yang berjalan — perlakukan seperti sidang sungguhan, jangan berhenti di tengah.",
    "Setelah menjawab, tekan 👁 Lihat Kerangka Jawaban dan bandingkan struktur jawabanmu dengan kerangkanya.",
    "Tekan ✅ Sudah Saya Jawab — Lanjut untuk mengambil pertanyaan berikutnya, dan ulangi sampai semua kategori pernah kamu hadapi."
  ],
  faq: [
    ["Apakah kerangka jawaban boleh dihafalkan kata per kata?", "Jangan dihafalkan verbatim — kerangka menunjukkan struktur berpikirnya: akui inti pertanyaan, jawab dengan data skripsimu, tutup dengan keyakinan atau keterbatasan yang jujur. Jawaban hafalan yang tidak nyambung dengan bunyi pertanyaan justru mudah ditangkap penguji."],
    ["Pertanyaan di bank soal ini berasal dari mana?", "Dari pola pertanyaan yang paling umum muncul di sidang skripsi lintas program studi — alasan pemilihan topik, pertahanan metode, keaslian data, kelemahan penelitian, dan rencana tindak lanjut. Pertanyaan spesifik bidangmu tetap harus kamuantisipasi bersama pembimbing."]
  ]
},
tanyajawab: {
  buka: "Berbeda dari bank soal umum, prediktor ini menyusun pertanyaan sidang dari abstrak skripsimu sendiri. Kamu menempelkan abstrak lengkap — latar, tujuan, metode, hasil, kesimpulan — menyebutkan variabel-variabelmu, dan memilih jenis penelitiannya (kuantitatif, kualitatif, campuran, R&D, studi kasus, atau eksperimen). Tool lalu membaca klaim-klaim yang kamu buat di abstrak dan menyusun daftar pertanyaan yang paling mungkin dilontarkan penguji untuk menguji klaim itu, masing-masing disertai kerangka cara menjawabnya. Seluruh daftar bisa disalin sekaligus sebagai bahan latihan terstruktur.",
  langkah: [
    "Isi variabel-variabel penelitianmu (misalnya X: ‘Kualitas Layanan’, Y: ‘Kepuasan Pengguna’) pada kolom yang tersedia.",
    "Tempel abstrak lengkap skripsimu — harus memuat latar, tujuan, metode, hasil, dan kesimpulan.",
    "Pilih jenis penelitianmu: Kuantitatif, Kualitatif, Campuran (Mixed Methods), R&D / Pengembangan, Studi Kasus, atau Eksperimen.",
    "Tekan 🎯 Susun Prediksi Pertanyaan dan baca daftar pertanyaan beserta kerangka jawabannya.",
    "Tekan 📋 Copy Semua (untuk latihan) dan jadikan daftar itu daftar cek latihanmu sampai hari sidang."
  ],
  faq: [
    ["Apa beda tool ini dengan Simulasi Pertanyaan Penguji?", "Simulasi Pertanyaan Penguji memakai bank soal umum yang sama untuk semua orang. Tool ini membaca abstrakmu, jadi pertanyaannya menempel pada klaim, angka, dan metode yang benar-benar kamu tulis — lebih spesifik dan lebih mirip yang akan ditanya penguji yang membaca abstrakmu."],
    ["Abstrak saya belum final — bisakah tetap memakai tool ini?", "Bisa, dan justru berguna: pertanyaan yang muncul dari draf abstrak menunjukkan klaim mana yang terdengar lemah atau berlebihan, sehingga kamu bisa memperbaikinya di abstrak sebelum naskah diserahkan ke penguji."]
  ]
},
k46: {
  buka: "Mind map generator ini menggambar peta konsep radial dari topik dan cabang-cabang yang kamu masukkan: satu topik pusat, cabang-cabang utama berwarna berbeda, dan sub-topik yang dipisahkan koma di tiap cabang. Hasilnya adalah gambar SVG yang bisa diunduh sebagai PNG untuk ditempel ke laporan, slide, atau ringkasan belajar — plus salinan outline teks dari struktur yang sama untuk dipakai di dokumen. Peta konsep seperti ini membantu melihat hubungan antarbagian materi sekaligus, sesuatu yang sulit didapat dari catatan linear biasa.",
  langkah: [
    "Tulis topik pusat mind map-mu pada kolom topik.",
    "Isi cabang pertama: nama cabang dan sub-topiknya (pisahkan tiap sub-topik dengan koma).",
    "Tekan ➕ Tambah Cabang untuk menambah cabang berikutnya, dan ulangi sampai semua cabang utama materi masuk.",
    "Tekan 🧠 Gambar Mind Map dan periksa susunan radialnya — cabang tampil dengan warna berbeda.",
    "Tekan ⬇️ Download Mind Map (PNG) untuk gambarnya, atau 📋 Copy Outline Teks untuk versi teks terstrukturnya."
  ],
  faq: [
    ["Berapa cabang dan sub-topik yang ideal dalam satu mind map?", "Sekitar 4–7 cabang utama dengan 2–5 sub-topik per cabang adalah kisaran yang tetap terbaca. Lebih dari itu, pecah materi menjadi dua mind map agar hubungan antarbagian tetap terlihat jelas."],
    ["Untuk apa salinan outline teksnya?", "Outline teks adalah struktur mind map-mu dalam bentuk daftar bertingkat — berguna ditempel ke dokumen atau catatan sebagai versi yang bisa dicari kata-katanya, sesuatu yang tidak bisa dilakukan pada gambar PNG."]
  ]
},
k47: {
  buka: "Tool belajar ini mengubah catatanmu menjadi dua alat latihan: kuis pilihan ganda dengan pengecoh (distraktor) yang dibuat otomatis dari jawaban soal-soal lain, dan flashcard bolak-balik untuk menghafal istilah dan konsep. Kamu menyusun daftar soal beserta jawabannya dari catatan kuliah, lalu bergantian berlatih dalam mode flashcard (membalik kartu untuk memeriksa ingatan) atau mode kuis (memilih jawaban di antara pengecoh). Ada pengacakan urutan, navigasi soal sebelumnya/berikutnya, dan daftar soal yang bisa diunduh untuk dibagikan ke teman belajar.",
  langkah: [
    "Masukkan daftar soal dan jawaban dari catatanmu mengikuti format isian di tool — satu pasangan soal–jawaban untuk satu butir.",
    "Pilih mode latihan: 🃏 Mode Flashcard untuk menghafal, atau 🎯 Mode Kuis Pilihan Ganda untuk menguji.",
    "Pada mode flashcard, baca pertanyaannya, tebak jawabannya dalam hati, lalu balik kartu untuk memeriksa.",
    "Pada mode kuis, pilih jawabanmu di antara pilihan yang diberi — pengecohnya diambil dari jawaban soal lain di daftarmu.",
    "Pakai 🔀 Acak Urutan untuk menghindari hafalan urutan, dan unduh daftar soal lewat tombol ⬇️ Download Daftar bila ingin menyimpan atau membagikannya."
  ],
  faq: [
    ["Dari mana asal pilihan pengecoh pada kuisnya?", "Pengecoh diambil dari jawaban benar milik soal-soal lain dalam daftarmu sendiri. Karena semua pilihan berasal dari materi yang sama, kuisnya terasa masuk akal dan benar-benar menguji pemahaman, bukan sekadar tebakan acak."],
    ["Mode mana yang lebih baik untuk persiapan ujian?", "Keduanya saling melengkapi: flashcard efektif untuk membangun ingatan awal istilah dan definisi, sedangkan kuis pilihan ganda melatihmu dalam format yang mirip ujian sesungguhnya — termasuk mengelola pilihan yang mirip-mirip."]
  ]
},
k48: {
  buka: "Generator ini menerapkan Metode Cornell pada catatan belajarmu: halaman dibagi menjadi kolom isyarat (kata kunci dan pertanyaan pemicu) di kiri, kolom catatan inti di kanan, dan ringkasan di bagian bawah — format yang terbukti membantu proses mengingat ulang. Kamu mengisi judul catatan, daftar isyarat satu per baris, catatan inti yang sejajar dengannya, dan satu-dua kalimat ringkasan. Catatan tersimpan di browser dan bisa dibuka kembali, diunduh sebagai .doc, atau dilihat pratinjau tata letaknya untuk memastikan susunannya benar sebelum dicetak.",
  langkah: [
    "Isi judul catatanmu (misalnya ‘Bab 3 — Metode Penelitian Kuantitatif’).",
    "Tulis kolom isyarat: satu isyarat atau pertanyaan per baris (misalnya ‘Apa itu populasi?’, ‘Rumus Slovin’).",
    "Tulis catatan intinya sejajar dengan isyarat — baris catatan ke-n menjelaskan isyarat ke-n.",
    "Tulis ringkasan satu-dua kalimat yang merangkum seluruh catatan ini dengan bahasamu sendiri.",
    "Tekan 💾 Simpan Catatan, lalu 👁 Pratinjau Tata Letak untuk memeriksa hasilnya, atau ⬇️ Download .doc untuk versi dokumennya."
  ],
  faq: [
    ["Mengapa isyarat dan catatan harus sejajar barisnya?", "Itulah inti Metode Cornell: saat mengulang, kamu menutup kolom catatan dan mencoba menjawab hanya dari isyarat di kiri. Kesejajaran baris memastikan setiap isyarat berpasangan tepat dengan penjelasannya."],
    ["Apakah catatan Cornell saya tersimpan untuk dibuka lagi?", "Ya — catatan yang disimpan lewat tombol 💾 Simpan Catatan tersimpan di browser dan muncul kembali di daftar catatanmu pada kunjungan berikutnya di perangkat yang sama."]
  ]
},
k49: {
  buka: "Timer Pomodoro ini memadukan teknik fokus 25 menit kerja dan 5 menit istirahat dengan pembangkit suara latar prosedural: white noise, brown noise, dan suara hujan yang dibuat langsung oleh Web Audio API — bukan memutar berkas audio — sehingga tetap ringan dan tidak menghabiskan kuota. Kamu bisa mengatur durasi fokus dan istirahat sendiri dalam menit, menyalakan suara latar dengan volume yang diatur, dan membiarkan siklus berjalan selama sesi belajarmu. Kombinasi batas waktu yang tegas dan suara latar yang stabil membantu otak masuk ke mode fokus lebih cepat.",
  langkah: [
    "Atur durasi fokus dan istirahatmu (bawaan teknik Pomodoro: 25 menit fokus, 5 menit istirahat) memakai pilihan menit yang tersedia, lalu tekan Set.",
    "Pilih suara latar yang kamu sukai dari bagian 🎧 Suara Latar — white noise, brown noise, atau hujan — dan atur volumenya.",
    "Tekan ▶️ Mulai Fokus untuk memulai hitung mundur sesi pertamamu.",
    "Saat pewaktu selesai, beristirahatlah sungguhan selama sesi istirahat — jauhkan mata dari layar.",
    "Pakai ↺ Reset untuk mengulang sesi, dan ⏹ Matikan Suara untuk menghentikan suara latar tanpa menghentikan pewaktu."
  ],
  faq: [
    ["Mengapa suara latarnya ‘dibuat langsung’ dan bukan berkas audio?", "Tool ini membangkitkan suara dengan Web Audio API di browsermu, jadi tidak ada berkas yang diunduh atau di-streaming: suaranya mulai seketika, tidak putus karena jaringan, dan pola acaknya tidak berulang seperti rekaman pendek yang diputar berputar."],
    ["Bolehkah durasi diubah dari pola 25/5?", "Boleh — 25/5 hanyalah pola klasik Pomodoro. Untuk tugas berat yang butuh pendalaman, banyak orang memakai 50/10. Yang penting adalah komitmen pada batasnya: fokus penuh saat sesi berjalan, istirahat sungguhan saat sesi selesai."]
  ]
},
k29: {
  buka: "Roda undian ini menentukan urutan presentasi kelompok secara adil dan transparan di depan kelas: kamu memasukkan daftar nama (satu nama per baris), memuatnya ke roda putar, lalu memutar roda untuk memilih nama berikutnya. Nama yang sudah terpilih bisa dihapus dari roda agar tidak terpilih dua kali, dan urutan hasil undian tercatat berurutan — sampai akhirnya kamu mendapatkan urutan final lengkap yang bisa disalin. Karena prosesnya terlihat oleh semua orang, tidak ada lagi perdebatan siapa tampil duluan.",
  langkah: [
    "Tempel daftar nama pada kolom yang tersedia — satu nama per baris.",
    "Tekan 🎡 Muat ke Roda untuk menampilkan semua nama pada roda undian.",
    "Tekan ▶️ PUTAR! dan tunggu roda berhenti di satu nama — itulah urutan berikutnya.",
    "Tekan tombol hapus pemenang (‘Hapus … & Lanjut Undi’) agar nama itu keluar dari roda, lalu putar lagi untuk urutan selanjutnya.",
    "Setelah semua nama terundi, tekan tombol 📋 Copy Urutan Final untuk menyalin urutan lengkapnya."
  ],
  faq: [
    ["Apakah hasil putaran roda ini benar-benar acak?", "Ya — pemilihannya acak, dan nama yang sudah keluar dapat dihapus dari roda sehingga setiap nama mendapat tepat satu giliran. Urutan yang terbentuk tercatat di bagian ‘Urutan Sejauh Ini’ selama proses berlangsung."],
    ["Bisakah roda dipakai untuk keperluan selain urutan presentasi?", "Bisa — pemilihan acak apa pun bisa memakai pola yang sama: membagi topik diskusi, menentukan penanya pertama, atau mengundi hadiah kecil di kelas. Masukkan saja daftar pilihannya satu per baris."]
  ]
},
k55: {
  buka: "Flashcard cetak ini menyusun kartu-kartu belajarmu ke lembaran A4 dua sisi yang tercermin (duplex): halaman depan berisi pertanyaan, halaman belakang berisi definisi — diposisikan tepat terbalik di belakang pertanyaan pasangannya bila dicetak putar sisi panjang. Kamu mengisi pasangan kartu, dan tool menata grid kartu per halaman beserta urutan halamannya. Hasilnya dapat diunduh sebagai berkas .html lembar cetak (dan daftar teksnya) untuk dicetak di kertas A4 lalu digunting menjadi set flashcard fisik.",
  langkah: [
    "Masukkan pasangan kartu belajarmu — pertanyaan beserta definisinya — mengikuti format isian di tool.",
    "Tekan 🖨 Buat Lembar Cetak (Depan–Belakang) untuk menyusun grid A4-nya.",
    "Periksa hasilnya: halaman depan berisi kartu pertanyaan, halaman belakang berisi definisi yang tercermin posisinya.",
    "Tekan ⬇️ Download Lembar Cetak (.html), buka berkasnya, dan cetak dua sisi dengan pengaturan putar pada sisi panjang (flip on long edge).",
    "Gunting mengikuti garis grid kartu — set flashcard fisikmu siap dipakai dan dibawa ke mana-mana."
  ],
  faq: [
    ["Mengapa halaman belakang harus ‘tercermin’?", "Karena kertas dibalik pada sisi panjangnya saat pencetakan duplex: tanpa pencerminan, definisi akan jatuh di belakang pertanyaan yang salah. Tool ini sudah mengatur pencerminannya, yang harus kamu samakan hanyalah pengaturan cetak dua sisi di printer (putar sisi panjang)."],
    ["Apa beda unduhan lembar cetak dan daftar teks?", "Lembar cetak (.html) adalah tata letak A4 siap gunting. Daftar teks adalah isi kartu dalam bentuk teks biasa — berguna untuk memeriksa ejaan semua pasangan kartu atau memindahkannya ke aplikasi flashcard digital."]
  ]
},
cloze: {
  buka: "Soal rumpang (cloze) adalah cara klasik mengubah bacaan menjadi latihan aktif: kata-kata penting dihilangkan dari paragraf dan pembaca harus mengisinya kembali dari pemahaman. Generator ini membuat soal itu otomatis dari teks materi kuliah yang kamu tempel, dengan dua strategi pengosongan: mode Kata Kunci yang mengosongkan satu kata penting per kalimat, atau mode Berkala yang mengosongkan kata yang layak setiap N kata. Soal dan kunci jawabannya dihasilkan terpisah — soal bisa langsung dibagikan ke teman sekelas, kuncinya kamu simpan sendiri.",
  langkah: [
    "Tempel paragraf materi kuliahmu pada kolom ‘Tempel paragraf materi kuliah di sini…’.",
    "Pilih strateginya: ‘Kata Kunci — 1 kata penting per kalimat’ untuk latihan istilah, atau ‘Berkala — tiap N kata yang layak’ untuk latihan membaca menyeluruh.",
    "Tekan ✏️ Buat Soal Rumpang.",
    "Periksa bagian SOAL LATIHAN (RUMPANG) — kata yang dikosongkan tampil sebagai titik-titik bernomor.",
    "Tekan 📋 Copy Soal untuk membagikan soalnya, dan tombol 📋 Copy Kunci untuk menyimpan kunci jawabannya terpisah."
  ],
  faq: [
    ["Mengapa kunci jawaban dibuat terpisah dari soal?", "Agar soal bisa langsung dibagikan tanpa membocorkan jawabannya — pola yang sama seperti lembar soal dan kunci pada ujian. Kamu membagikan salinan soal ke teman atau siswa, dan kunci tetap di tanganmu untuk pemeriksaan."],
    ["Mode kata kunci memilih kata berdasarkan apa?", "Mode itu menyasar kata yang paling bermakna di tiap kalimat — umumnya istilah teknis atau kata benda inti — karena mengosongkan kata itulah yang menguji pemahaman, bukan mengosongkan kata sambung yang mudah ditebak dari tata bahasa."]
  ]
},

/* ================= KELOMPOK ================= */
k35: {
  buka: "Generator sertifikat massal ini membuat sertifikat untuk banyak penerima sekaligus dari satu desain: kamu menulis daftar nama (satu nama per baris) dan tool menghasilkan satu sertifikat per nama — dibundel sebagai ZIP berisi PNG, atau ZIP berisi PDF. Tersedia pilihan peran yang tercetak di sertifikat (Peserta, Panitia, Pemateri, Moderator, Juara), tiga tema desain (Klasik Emas, Biru Korporat, Hijau Alam), kolom nama ketua panitia atau pimpinan untuk tanda tangan, dan opsi menampilkan teks peran serta nama acara di bawah nama penerima. Urusan yang biasanya makan waktu satu malam selesai dalam sekali proses.",
  langkah: [
    "Isi nama acara dan pilih peran yang akan tercetak: Peserta, Panitia, Pemateri, Moderator, atau Juara.",
    "Pilih tema desainnya: 🏆 Klasik Emas, 🔵 Biru Korporat, atau 🟢 Hijau Alam.",
    "Isi nama ketua panitia/rektor pada kolom penanda tangan, dan aktifkan opsi tampilan teks peran & nama acara di bawah nama bila diinginkan.",
    "Tempel daftar nama penerima — satu nama per baris, sertifikat dibuat untuk SEMUA nama sekaligus.",
    "Tekan 👁 Pratinjau Sertifikat untuk memeriksa satu contoh hasilnya, lalu ⬇️ Download Semua (ZIP PNG) atau ⬇️ Download Semua (ZIP PDF)."
  ],
  faq: [
    ["Apa beda keluaran ZIP PNG dan ZIP PDF?", "Keduanya berisi satu berkas per nama penerima. PNG adalah gambar per sertifikat — praktis untuk dibagikan lewat WhatsApp. PDF adalah dokumen per sertifikat — lebih cocok untuk dicetak dan diarsipkan resmi oleh panitia."],
    ["Ejaan nama penerima salah satu — harus mengulang semua?", "Perbaiki ejaan nama itu pada daftar namamu, lalu proses ulang: pembuatan sertifikatnya cepat karena otomatis. Memeriksa ejaan dari daftar hadir resmi sebelum memproses adalah langkah yang sangat disarankan, karena kesalahan nama di sertifikat selalu ketahuan setelah dibagikan."]
  ]
},
k31: {
  buka: "Logbook harian adalah dokumen wajib magang dan KKN yang paling sering ditunda sampai menumpuk di akhir kegiatan. Tool ini membuatmu mencatatnya hari demi hari: setiap entri berisi tanggal, kegiatan yang dilakukan, dan hasil atau keterangan capaiannya, tersusun dalam format logbook formal berkop yang dilengkapi ruang paraf pembimbing lapangan dan DPL. Kumpulan entri dapat diunduh sebagai berkas .doc siap serah, atau sebagai CSV untuk rekap digital. Karena dicatat harian, isinya jujur dan rinci — bukan karangan kilat semalam sebelum pengumpulan.",
  langkah: [
    "Isi identitasmu: nama, desa atau instansi tempat magang/KKN, dan nama program kegiatannya.",
    "Setiap hari, tambahkan entri baru: tanggal, kegiatan yang dilakukan (misalnya ‘Sosialisasi program kerja kepada warga’), dan hasilnya (misalnya ‘25 warga hadir, materi tersampaikan’).",
    "Tekan ➕ Tambah Entri Logbook untuk menyimpan catatan hari itu ke daftar.",
    "Ulangi setiap hari selama kegiatan berlangsung — entri tersusun kronologis otomatis.",
    "Di akhir periode, tekan ⬇️ Download Logbook .doc untuk dokumen resminya, atau ⬇️ CSV untuk rekap datanya."
  ],
  faq: [
    ["Apakah logbook hasil unduhan memuat tempat tanda tangan?", "Ya — format .doc-nya adalah logbook formal berkop dengan ruang paraf pembimbing lapangan/DPL pada susunan entrinya, mengikuti format yang umumnya diminta kampus untuk laporan magang dan KKN."],
    ["Kegiatan saya terlewat dicatat beberapa hari — bagaimana sebaiknya?", "Tetap catat dengan tanggal sebenarnya dan isi berdasarkan ingatan serta bukti kegiatan (foto, notulen, daftar hadir) selagi masih segar. Logbook yang diisi dari bukti nyata jauh lebih bisa dipertanggungjawabkan daripada diisi seragam di akhir."]
  ]
},
kelompok: {
  buka: "Pengacak kelompok ini membagi daftar nama menjadi kelompok-kelompok yang ukurannya merata, dan — fitur yang membedakannya dari undian biasa — dapat menyeimbangkan komposisi laki-laki dan perempuan antar kelompok bila nama diberi penanda gender. Ketidakadilan klasik seperti satu kelompok berisi semua mahasiswa paling aktif atau semua berjenis kelamin sama dapat dihindari. Hasil pembagian dapat disalin seluruhnya, diacak ulang bila kurang sreg, atau diunduh sebagai .txt untuk ditempel ke pengumuman kelas.",
  langkah: [
    "Tempel daftar nama yang akan dibagi — satu nama per baris; tambahkan penanda L/P di nama bila ingin keseimbangan gender dipakai.",
    "Tentukan jumlah kelompok atau ukuran tiap kelompok yang kamu inginkan pada pengaturan di tool.",
    "Aktifkan opsi ‘Seimbangkan L/P antar kelompok (bila ada tag)’ bila penanda gender sudah dipasang.",
    "Tekan 🎲 Acak & Bagi Kelompok dan periksa komposisi tiap kelompok pada hasilnya.",
    "Bila ada kelompok yang terasa timpang, tekan 🔀 Acak Ulang; bila sudah pas, tekan 📋 Copy Semua Kelompok atau ⬇️ Download .txt."
  ],
  faq: [
    ["Bagaimana cara menandai gender pada nama?", "Ikuti pola penanda pada petunjuk di tool — penanda L atau P ditulis bersama nama peserta pada barisnya. Tanpa penanda, pembagian berjalan acak murni tanpa mempertimbangkan gender."],
    ["Ukuran kelompok tidak bisa sama persis — bagaimana pembagiannya?", "Sisa peserta disebar satu-satu ke kelompok-kelompok pertama sehingga selisih ukuran antar kelompok paling banyak satu orang. Itu pembagian paling merata yang secara matematis mungkin."]
  ]
},
splitter: {
  buka: "Splitter patungan ini menyelesaikan soal klasik setelah makan bersama atau belanja kelompok: siapa harus mentransfer berapa kepada siapa agar semua impas. Kamu memasukkan daftar anggota beserta pengeluaran yang sudah dibayar masing-masing, dan tool menghitung total, jatah rata-rata per orang, lalu daftar transfer penyelesaian — siapa membayar ke siapa dan berapa — dengan jumlah transfer sesedikit mungkin. Rinciannya dapat disalin (siap tempel ke grup WhatsApp) atau diunduh sebagai .txt, sehingga tidak ada lagi perdebatan hitungan di akhir acara.",
  langkah: [
    "Masukkan nama tiap anggota beserta jumlah yang sudah dikeluarkannya untuk keperluan bersama.",
    "Tekan 💸 Hitung Penyelesaian.",
    "Baca hasilnya: total pengeluaran, jatah per orang, dan daftar 🤝 Transfer Penyelesaian — siapa mentransfer ke siapa berapa.",
    "Tekan 📋 Copy Rincian untuk menempel penyelesaiannya ke grup, atau ⬇️ Download .txt untuk arsip bendahara.",
    "Setiap anggota menyelesaikan transfernya persis seperti daftar — setelah itu semua impas, tidak ada sisa utang."
  ],
  faq: [
    ["Mengapa jumlah transfernya bisa lebih sedikit dari jumlah anggota?", "Karena tool menghitung penyelesaian bersih: anggota yang membayar jauh di atas jatah langsung menerima dari yang paling kurang bayar, tanpa rantai perantara. Secara matematis, kelompok berisi n orang selalu bisa impas dengan paling banyak n−1 transfer."],
    ["Bagaimana bila ada pengeluaran yang hanya untuk sebagian anggota?", "Tool ini menganggap semua pengeluaran dibagi rata ke seluruh anggota. Untuk patungan dengan peserta berbeda-beda per item, hitung tiap kelompok pengeluaran secara terpisah dengan daftar anggotanya masing-masing."]
  ]
},
lpj: {
  buka: "Tool ini menyusun Laporan Pertanggungjawaban (LPJ) kegiatan UKM atau organisasi dari dua sisi yang selalu dibandingkan bendahara dan kampus: RAB (rencana anggaran biaya) yang diajukan di awal, dan realisasi pengeluaran yang benar-benar terjadi. Kamu memasukkan mata anggaran RAB, memuatnya ke tabel realisasi, lalu mengisi realisasi per item — selisih dan sisa dana terhitung otomatis per item maupun total. Hasilnya diekspor sebagai berkas .doc LPJ resmi berjudul lengkap, siap dilampiri bukti-bukti transaksi kegiatanmu.",
  langkah: [
    "Isi identitas kegiatan: nama acara (misalnya ‘Seminar Nasional Kewirausahaan 2026’), nama organisasi, dan tanggal pelaksanaan.",
    "Susun RAB-nya: masukkan tiap mata anggaran beserta nominal rencananya (misalnya ‘Transport narasumber — 100000’).",
    "Tekan 📥 Muat RAB ke Tabel Realisasi untuk memindahkan rencana menjadi kerangka tabel realisasi.",
    "Isi nominal realisasi tiap item sesuai pengeluaran sebenarnya, lalu tekan 🔄 Hitung Ulang untuk melihat selisih dan sisa dana.",
    "Tekan ⬇️ Download LPJ .doc (Resmi) untuk dokumen laporan pertanggungjawabannya."
  ],
  faq: [
    ["Apa yang ditunjukkan perbandingan RAB vs realisasi?", "Untuk tiap mata anggaran terlihat apakah realisasi di bawah rencana (sisa), pas, atau melebihi rencana (defisit item) — beserta total sisa dana kegiatan. Inilah inti yang diperiksa pembina dan kemahasiswaan saat LPJ diserahkan."],
    ["Apakah LPJ ini menggantikan kwitansi dan nota kegiatan?", "Tidak — LPJ adalah laporannya, sedangkan kwitansi dan nota adalah bukti pendukung yang dilampirkan padanya. Untuk membuat kwitansi resmi ber-terbilang, gunakan tool Kwitansi & Nota LPJ di kategori yang sama."]
  ]
},
k32: {
  buka: "Kwitansi resmi punya dua titik rawan: nominal angka dan terbilangnya tidak sama, serta formatnya tidak meyakinkan. Pembuat kwitansi ini mengatasi keduanya — kamu mengisi pihak penerima, keperluan pembayaran, dan nominalnya; angka itu otomatis dituliskan sebagai terbilang berbahasa Indonesia yang benar di badan kwitansi yang digambar pada canvas. Tersedia tiga tema tampilan (Biru Klasik, Hijau Toska, Hitam Brutalist). Hasilnya diunduh sebagai PNG yang siap dicetak atau dilampirkan pada LPJ, dan ringkasannya bisa disalin sebagai teks.",
  langkah: [
    "Isi nama pihak yang menerima uang (misalnya ‘Bendahara Kelompok KKN 12’) pada kolom penerima.",
    "Isi keperluan pembayarannya (misalnya ‘Konsumsi kegiatan sosialisasi posyandu’) dan nama pihak yang menyerahkan uang.",
    "Masukkan nominalnya dalam angka — terbilangnya tersusun otomatis, tidak perlu kamu ketik.",
    "Pilih tema kwitansi: 🔵 Biru Klasik, 🟢 Hijau Toska, atau ⚫ Hitam Brutalist.",
    "Tekan 🧾 Buat Kwitansi, periksa kesesuaian angka dan terbilangnya, lalu ⬇️ Download Kwitansi (PNG) atau 📋 Copy Ringkasan."
  ],
  faq: [
    ["Mengapa terbilang penting di kwitansi?", "Terbilang adalah pengaman hukum sederhana: nominal dalam huruf jauh lebih sulit diubah daripada angka, sehingga kwitansi selalu mencantumkan keduanya dan keduanya harus sama persis. Tool ini menyusun terbilang dari angkamu otomatis untuk menghilangkan risiko salah tulis."],
    ["Apakah kwitansi PNG bisa dipakai untuk LPJ resmi?", "Umumnya bisa sebagai lampiran bukti pembayaran, terutama untuk transaksi internal kelompok dan KKN. Untuk transaksi besar atau ke pihak eksternal, ikuti ketentuan kampusmu — sebagian meminta kwitansi bermaterai atau nota resmi dari penjual."]
  ]
},
k30: {
  buka: "Menemukan jam kosong yang sama untuk seluruh anggota kelompok biasanya berakhir dengan rentetan chat ‘kamu bisanya kapan?’ yang tak berujung. Pencari jadwal ini memecahkannya dengan irisan himpunan: tiap anggota mengisi jadwal sibuknya pada kisi jam yang sama, dan tool menghitung irisan jam kosong seluruh anggota — jam-jam yang bebas untuk semua orang — yang ditandai jelas pada kisi. Tanpa login dan tanpa akun: semua diisi di satu perangkat, hasilnya berupa daftar jam kosong bersama yang siap disalin ke grup.",
  langkah: [
    "Tambahkan anggota pertama lewat tombol ➕ Tambah dan isi namanya (misalnya ‘Sari’).",
    "Tandai jam-jam sibuk anggota itu pada kisi jadwal (kuliah, kerja, kegiatan rutin).",
    "Tambahkan anggota berikutnya satu per satu dan isi jadwal sibuk masing-masing dengan cara yang sama.",
    "Perhatikan kisi hasilnya: sel bertanda ✓ dan bagian 🟢 Jam Kosong Bersama menampilkan jam yang kosong untuk SEMUA anggota.",
    "Tekan 📋 Copy Jam Kosong untuk mengirim daftar jam yang cocok ke grup kalian."
  ],
  faq: [
    ["Mengapa semua jadwal diisi di satu perangkat?", "Tool ini dirancang tanpa login dan tanpa server: irisan jadwal dihitung langsung dari isian di halaman yang sama. Praktiknya, satu orang mengumpulkan jadwal anggota (dari chat atau saat berkumpul) dan mengisikannya ke tool dalam sekali duduk."],
    ["Tidak ada jam kosong bersama sama sekali — apa artinya?", "Artinya irisan jadwal kelompokmu kosong pada rentang yang ditampilkan: selalu ada minimal satu anggota yang sibuk di tiap jam. Solusinya bukan memaksa tool, melainkan meninjau ulang — kadang satu anggota bisa menggeser kegiatan fleksibelnya, atau pertemuan dipecah menjadi dua sesi."]
  ]
},
peerassess: {
  buka: "Penilaian antar-teman (peer assessment) adalah cara objektif mengukur kontribusi tiap anggota kelompok: setiap anggota menilai kontribusi semua anggota lain, dan tool ini mengolah matriks skor itu menjadi persentase kontribusi per orang. Anggota yang bekerja paling banyak akan tampak angkanya, dan free-rider — yang namanya tercantum tetapi nyaris tidak berkontribusi — akan ketahuan dari skor rendah yang konsisten dari semua penilai. Hasilnya dapat diunduh sebagai berkas .doc lampiran untuk dosen, cocok sebagai bukti pendukung pembagian nilai tugas kelompok.",
  langkah: [
    "Tekan 🧾 Buat Template Matriks Penilaian untuk membuat matriks berisi nama-nama anggota kelompokmu sebagai penilai dan yang dinilai.",
    "Isi skor kontribusi pada tiap sel matriks — tiap anggota menilai kontribusi semua anggota lain (dan lazimnya juga dirinya sendiri) mengikuti skala pada template.",
    "Tekan ⚖️ Hitung Kontribusi dan baca hasil persentase kontribusi tiap anggota.",
    "Periksa pola skornya: anggota dengan skor rendah dari hampir semua penilai adalah sinyal free-rider yang perlu dibicarakan dengan data, bukan tuduhan.",
    "Tekan ⬇️ Download .doc (Lampiran Dosen) untuk menjadikan hasilnya lampiran resmi laporan kelompokmu."
  ],
  faq: [
    ["Bagaimana persentase kontribusi dihitung?", "Dari matriks skor antar-teman: skor yang diterima tiap anggota dari seluruh penilai dirata-rata lalu dinyatakan sebagai bagian dari total kontribusi kelompok. Karena semua anggota menilai semua, hasil akhirnya mencerminkan penilaian kolektif, bukan pendapat satu orang."],
    ["Apakah hasil tool ini langsung menentukan nilai tiap anggota?", "Tool memberi bukti kuantitatifnya; keputusan nilai tetap wewenang dosen. Justru karena itu hasilnya disediakan sebagai lampiran .doc — dosenmu yang mempertimbangkan persentase ini bersama kualitas laporan kelompoknya."]
  ]
},
prorata: {
  buka: "Membagi tagihan kos sama rata itu tidak adil bila ada kamar yang dihuni hanya setengah bulan, atau kamar dengan AC dan kulkas yang menyedot listrik jauh lebih besar. Splitter pro-rata ini membagi tagihan kos — listrik, WiFi, air — secara proporsional menurut dua faktor: jumlah hari huni tiap kamar dalam periode tagihan, dan beban alat elektronik yang dipakai tiap kamar. Kamu memasukkan total tagihan dan data tiap kamar, dan menerima rincian pembayaran per kamar beserta ringkasan rapi yang bisa langsung diteruskan ke grup WhatsApp kos.",
  langkah: [
    "Masukkan total tagihan yang akan dibagi (listrik, WiFi, dan/atau air) beserta periodenya.",
    "Isi data tiap kamar: penghuni, jumlah hari huni pada periode itu, dan alat elektronik berdaya besar yang dipakai (misalnya AC, kulkas, pemanas air).",
    "Tekan 🧾 Hitung Pembagian dan baca rincian nominal per kamar beserta dasar proporsinya.",
    "Tekan 📋 Copy Ringkasan (untuk grup WA kos) dan tempel ke grup — setiap penghuni bisa melihat dasar hitungan kamarnya sendiri."
  ],
  faq: [
    ["Mengapa hari huni dan alat elektronik yang jadi faktor pembagi?", "Karena keduanya penyebab nyata besar-kecilnya konsumsi: penghuni yang hanya tinggal 10 hari tidak memakai listrik sebanyak penghuni sebulan penuh, dan kamar ber-AC memakai daya berkali-kali lipat kamar berkipas. Pro-rata membuat tiap kamar membayar sedekat mungkin dengan pemakaiannya."],
    ["Bagaimana memperlakukan kamar yang kosong total sebulan?", "Kamar dengan nol hari huni mendapat porsi konsumsi nol untuk tagihan berbasis pemakaian seperti listrik dan air. Untuk biaya tetap bersama seperti WiFi, kesepakatan penghuni biasanya tetap membaginya — sesuaikan isianmu dengan kesepakatan kos kalian."]
  ]
},
hadir: {
  buka: "Generator dokumen kegiatan ini menghasilkan dua berkas resmi yang selalu diminta setiap acara kampus: daftar hadir peserta yang siap cetak dengan kolom tanda tangan, dan berita acara kegiatan yang meresmikan jalannya acara. Kamu mengisi nama kegiatan, penyelenggara, hari dan tanggal, serta jam dan tempatnya sekali, lalu memilih dokumen yang dibutuhkan. Keluaran berupa berkas .doc terformat resmi — daftar hadirnya tinggal dicetak dan diedarkan saat registrasi, berita acaranya tinggal dilengkapi dan ditandatangani setelah acara selesai.",
  langkah: [
    "Isi nama kegiatan (misalnya ‘Seminar Nasional Kewirausahaan 2026’), penyelenggara (misalnya ‘HIMA Ekonomi — Universitas Contoh’), hari dan tanggal, serta jam dan tempat pelaksanaan.",
    "Pilih dokumen yang akan dibuat: 📋 Daftar Hadir Kegiatan atau 📰 Berita Acara Kegiatan.",
    "Tekan ⬇️ Download .doc untuk mengunduh dokumen pilihannya.",
    "Untuk daftar hadir: cetak sebanyak perkiraan peserta dan edarkan saat acara. Untuk berita acara: lengkapi isi jalannya acara dan mintakan tanda tangan penanggung jawab setelah kegiatan selesai."
  ],
  faq: [
    ["Apa beda daftar hadir dan berita acara?", "Daftar hadir adalah bukti siapa saja yang datang, dibuktikan tanda tangan peserta. Berita acara adalah dokumen resmi yang menyatakan kegiatan telah dilaksanakan — waktu, tempat, penyelenggara, dan garis besar jalannya acara — dan biasanya ditandatangani penanggung jawab kegiatan."],
    ["Apakah kedua dokumen bisa dibuat dari isian yang sama?", "Ya — identitas kegiatan yang kamu isi dipakai bersama. Buat daftar hadirnya sebelum acara untuk dicetak, lalu buat berita acaranya setelah acara dari halaman yang sama tanpa mengisi ulang datanya."]
  ]
},
k33: {
  buka: "Perencana ini menyusun program kerja KKN atau kepanitiaan menjadi bagan Gantt: tiap program tampil sebagai baris dengan bar linimasa yang membentang di minggu-minggu pelaksanaannya, lengkap dengan penanggung jawab atau divisinya. Kamu menambahkan program satu per satu, menetapkan total minggu kegiatan, dan melihat seluruh proker dalam satu peta waktu — bentrok jadwal dan minggu yang kosong langsung terlihat. Bagan final dapat diunduh sebagai PNG untuk proposal dan laporan, dan matriksnya bisa disalin sebagai teks untuk dibagikan ke grup posko.",
  langkah: [
    "Tetapkan total minggu kegiatanmu lewat tombol 💾 Set Total Minggu (sesuai masa KKN atau periode kepanitiaan).",
    "Tambahkan program pertama: isi nama program kerja dan penanggung jawabnya (misalnya ‘Divisi Acara / nama orang’), lalu tekan ➕ Tambah Program.",
    "Atur rentang minggu pelaksanaan program itu pada barisnya di matriks.",
    "Ulangi untuk semua program kerja, dan periksa tumpang tindihnya pada bagan yang terbentuk.",
    "Tekan ⬇️ Download Gantt (PNG) untuk bagan finalnya, atau 📋 Copy Matriks Teks untuk membagikan jadwalnya sebagai teks."
  ],
  faq: [
    ["Apa gunanya melihat proker dalam bentuk Gantt, bukan daftar biasa?", "Daftar biasa menyembunyikan bentrok waktu. Pada bagan Gantt, dua program besar yang jatuh di minggu yang sama terlihat menumpuk dengan jelas — kamu bisa menggeser salah satunya sebelum minggu itu benar-benar kacau di lapangan."],
    ["Apakah penanggung jawab ikut tampil di bagan?", "Ya — nama divisi atau orang yang kamu isi tampil bersama programnya, sehingga bagan ini sekaligus menjadi matriks pembagian tugas: siapa mengerjakan apa, dan kapan."]
  ]
},
k34: {
  buka: "Pembuat bagan ini menyusun struktur organisasi posko KKN atau kepanitiaan menjadi diagram hierarki yang rapi: dari pembina di puncak, koordinator posko, sampai divisi-divisi beserta koordinator dan anggotanya. Kamu menambahkan divisi satu per satu — nama divisi, koordinatornya, dan daftar anggota yang dipisahkan koma — lalu bagan organisasi terbentuk otomatis mengikuti hierarki baku posko. Hasilnya bisa diunduh sebagai PNG untuk ditempel di dinding posko dan dilampirkan ke proposal, atau disalin sebagai struktur teks.",
  langkah: [
    "Isi jenjang puncaknya: pembina/DPL dan koordinator posko sesuai struktur organisasimu.",
    "Tambahkan divisi pertama: nama divisi, nama koordinatornya, dan anggotanya (pisahkan dengan koma), lalu tekan ➕ Tambah Divisi.",
    "Ulangi untuk semua divisi — acara, humas, konsumsi, dokumentasi, dan lainnya.",
    "Tekan 🏛️ Buat Bagan Organisasi dan periksa hierarki yang terbentuk.",
    "Tekan ⬇️ Download Bagan (PNG) untuk mencetak dan menempelnya, atau 📋 Copy Struktur Teks untuk versi teksnya."
  ],
  faq: [
    ["Apakah bagan mengikuti struktur baku posko KKN?", "Strukturnya mengikuti hierarki umum posko: pembina atau DPL di atas, koordinator posko di bawahnya, lalu divisi-divisi sejajar dengan koordinator dan anggota masing-masing. Bila poskomu punya jabatan khusus, tambahkan sebagai divisi atau jenjang sesuai kebutuhan."],
    ["Berapa banyak divisi yang bisa dimuat?", "Sebanyak divisi yang benar-benar ada di organisasimu — bagan digambar ulang mengikuti jumlah divisi yang kamu tambahkan. Untuk keterbacaan saat dicetak, struktur yang terlalu gemuk biasanya dipecah per bidang dalam dokumen laporannya."]
  ]
},
k36: {
  buka: "Program fisik KKN seperti pembuatan plang jalan, plang masjid, atau penanda taman baca membutuhkan desain sebelum pengecatan dimulai. Desainer plang ini membantumu memvisualisasikannya di canvas: pilih tema permukaan (Hijau Desa, Biru Kampus, Kayu Klasik, atau Merah Bata), pilih ikon penanda (antara lain padi, masjid, sekolah, taman baca), tulis teks plangnya, dan nyalakan opsi tiang serta tanah untuk melihat pratinjau jadinya seperti plang sungguhan yang berdiri. Desain final diunduh sebagai PNG — acuan visual yang dibawa ke tukang atau lokasi pengecatan.",
  langkah: [
    "Pilih tema permukaan plang: 🌿 Hijau Desa, 💙 Biru Kampus, 🪵 Kayu Klasik, atau 🧱 Merah Bata.",
    "Pilih ikon yang sesuai dengan fungsi plangnya — misalnya 🕌 Masjid, 🏫 Sekolah, 📚 Taman Baca, atau 🌾 Padi.",
    "Tulis teks yang akan tampil di plang (nama jalan, nama tempat, atau pesan edukasi desa).",
    "Aktifkan opsi ‘Tampilkan tiang & tanah’ untuk melihat pratinjau plang dalam keadaan terpasang.",
    "Tekan 🪧 Buat Desain Plang, lalu ⬇️ Download Desain Plang (PNG) untuk dijadikan acuan pembuatan fisiknya."
  ],
  faq: [
    ["Apakah desain ini langsung dipakai untuk mencetak plang?", "Desain PNG ini adalah acuan visual: ukuran, warna tema, ikon, dan teksnya menjadi pedoman saat plang dibuat atau dicetak oleh penyedia jasa. Untuk plang permanen, sampaikan juga ukuran fisik yang diinginkan ke pembuatnya."],
    ["Mengapa ada opsi tiang dan tanah?", "Agar panitia dan perangkat desa bisa membayangkan hasil jadi di lokasi sebenarnya, bukan sekadar papan datar. Pratinjau terpasang membantu memutuskan ukuran dan ketinggian tiang sebelum bahan dibeli."]
  ]
}
,
pdfsign: {
  buka: "Tool ini membubuhkan tanda tangan dan materai ke berkas PDF tanpa perlu mencetak dan memindai ulang. Kamu mengunggah PDF-nya, menggambar tanda tanganmu langsung di layar (dengan tetikus atau jari), atau membuat stempel dan kotak materai; lalu memilih elemen yang akan dibubuhkan — TTD, stempel, atau materai — menentukannya di halaman yang dipilih, mengatur posisinya, dan mengunduh PDF final yang sudah bertanda tangan. Seluruh pemrosesan PDF berjalan lokal di browser, jadi dokumen sensitif seperti kontrak magang atau surat perjanjian tidak pernah meninggalkan perangkatmu.",
  langkah: [
    "Unggah berkas PDF yang akan ditandatangani melalui area kerja di atas.",
    "Buat tanda tanganmu: gambar coretannya pada kanvas yang disediakan, lalu tekan ✅ Pakai TTD Ini (ulangi dengan 🧹 Hapus Coretan bila belum mirip).",
    "Bila perlu, buat juga stempel lewat 🔵 Buat/Perbarui Stempel dan kotak materai lewat 🧾 Buat Kotak Materai.",
    "Pilih elemen yang dibubuhkan (✍️ TTD / 🔵 Stempel / 🧾 Materai), pilih halaman tujuannya, dan letakkan pada posisi yang benar di halaman itu.",
    "Tekan 📥 Terapkan & Unduh PDF Bertanda Tangan untuk mendapatkan PDF finalnya."
  ],
  faq: [
    ["Di halaman mana tanda tangan bisa diletakkan?", "Di halaman mana pun yang kamu pilih dari daftar halaman PDF-mu — umumnya halaman terakhir tempat kolom tanda tangan berada. Kamu memilih elemen, halaman, dan posisi penempatannya sebelum PDF final dibuat."],
    ["Apakah tanda tangan gambar seperti ini sah untuk dokumen resmi?", "Untuk banyak keperluan administrasi kampus dan magang, tanda tangan basah hasil pindai/gambar diterima sebagai kelengkapan berkas. Tetapi dokumen yang mensyaratkan tanda tangan elektronik tersertifikasi (misalnya kontrak tertentu) memerlukan penyedia TTE resmi — tool ini tidak menerbitkan sertifikat elektronik."]
  ]
},
pdforg: {
  buka: "Pengatur PDF ini menampilkan semua halaman dokumenmu sebagai thumbnail yang bisa diperiksa satu per satu — lalu kamu memutar halaman yang miring, menggeser urutan halaman, dan menghapus halaman kosong atau ganda sisa hasil pindai. Setiap halaman yang ditandai hapus masih bisa diurungkan sebelum final, dan tidak ada perubahan yang diterapkan sampai kamu menekan tombol unduh. Hasilnya adalah satu PDF rapi yang urutannya persis seperti yang kamu susun, diproses sepenuhnya lokal di browser.",
  langkah: [
    "Unggah berkas PDF yang halamannya berantakan melalui area kerja di atas.",
    "Periksa thumbnail semua halaman yang tampil — temukan halaman yang miring, kosong, atau salah urutan.",
    "Putar halaman yang miring dengan tombol ⟳ Putar pada halaman itu.",
    "Geser urutan halaman sampai susunannya benar, dan tandai halaman kosong/ganda dengan tombol 🗑️ Hapus (bisa diurungkan dengan ↩️ Urungkan).",
    "Tekan 📥 Unduh PDF Hasil Pengaturan untuk menyimpan PDF final yang sudah rapi."
  ],
  faq: [
    ["Apakah kualitas isi halaman berubah setelah diatur ulang?", "Pengaturan ini hanya mengubah urutan, rotasi, dan keberadaan halaman — isi tiap halaman dipertahankan seperti aslinya. Karena itu tool ini berbeda dari kompresor: tujuannya kerapian susunan, bukan mengecilkan ukuran berkas."],
    ["Halaman yang terhapus bisa dikembalikan?", "Selama belum menekan unduh, penandaan hapus bisa dibatalkan dengan tombol ↩️ Urungkan pada halaman itu. Berkas aslimu juga tidak pernah diubah — hasil unduhan selalu berkas PDF baru."]
  ]
},
pdftab2xls: {
  buka: "Tabel di dalam PDF — seperti laporan keuangan BEI atau publikasi statistik BPS — tidak bisa disalin begitu saja ke Excel tanpa berantakan. Ekstraktor ini menarik struktur tabel dari PDF-mu dan menuangkannya menjadi berkas .xlsx, dengan pembersihan angka khas Indonesia dan akuntansi: pemisah ribuan titik, desimal koma, serta format kurung diubah menjadi angka numerik asli yang bisa langsung dijumlah dan diolah di Excel. Kamu tinggal mengunggah PDF-nya, mengekstrak tabelnya, dan mengunduh hasil konversinya — tanpa mengetik ulang satu angka pun.",
  langkah: [
    "Unggah berkas PDF yang berisi tabel (misalnya laporan BEI atau publikasi BPS) melalui area kerja di atas.",
    "Aktifkan opsi ‘Bersihkan angka ID/akuntansi’ agar angka berformat Indonesia diubah menjadi numerik asli.",
    "Tekan 🔍 Ekstrak Tabel dan tunggu struktur tabelnya dibaca dari halaman PDF.",
    "Periksa hasil ekstraksinya sepintas — pastikan kolom-kolom tabel terbaca pada posisi yang benar.",
    "Tekan 📗 Unduh sebagai .xlsx dan buka di Excel untuk mulai mengolah angkanya."
  ],
  faq: [
    ["Angka ‘1.234,56’ dan ‘(500)’ akan menjadi apa di Excel?", "Dengan opsi pembersih aktif, format Indonesia dibaca sebagaimana maksudnya: 1.234,56 menjadi angka 1234.56, dan format akuntansi dalam kurung diperlakukan sebagai nilai negatif — semuanya sebagai angka asli yang bisa dihitung, bukan teks."],
    ["Mengapa hasil ekstraksi dari PDF hasil scan bisa berantakan?", "Karena PDF hasil pindai sesungguhnya hanya gambar — tidak ada struktur teks dan kolom untuk dibaca. Ekstraktor ini bekerja paling baik pada PDF digital yang tabelnya berupa teks, seperti laporan resmi BEI dan BPS."]
  ]
},
xlsmerger: {
  buka: "Penggabung ini menyatukan banyak berkas Excel dan CSV yang berserakan menjadi satu keluaran rapi, dengan dua mode yang melayani dua kebutuhan berbeda: menumpuk baris dari semua berkas menjadi satu sheet master (cocok untuk rekap bulanan, cabang, atau kelas yang strukturnya sama), atau menggabungkan menjadi satu workbook multi-tab di mana tiap berkas menjadi tab sheet-nya sendiri. Kamu mengunggah berkas-berkasnya sekaligus, memilih modenya, dan mengunduh satu .xlsx gabungan — tanpa buka-tutup berkas dan salin-tempel manual yang rawan salah baris.",
  langkah: [
    "Unggah semua berkas Excel/CSV yang ingin digabungkan melalui area kerja di atas — bisa banyak berkas sekaligus.",
    "Aktifkan opsi ‘Gabung Sheet (Multi-Tab)’ bila tiap berkas harus menjadi tab sendiri; biarkan nonaktif bila baris-barisnya harus ditumpuk menjadi satu sheet master.",
    "Tekan 🗂️ Gabungkan & Unduh .xlsx.",
    "Buka berkas hasilnya dan periksa: pada mode tumpuk, semua baris dari seluruh berkas harus hadir berurutan; pada mode multi-tab, tiap tab bernama sesuai berkas asalnya."
  ],
  faq: [
    ["Mode tumpuk atau multi-tab — kapan memakai yang mana?", "Mode tumpuk untuk berkas-berkas berstruktur kolom sama yang memang satu dataset (misalnya rekap penjualan 12 bulan menjadi satu tabel tahunan). Mode multi-tab untuk berkas yang saling berkaitan tetapi strukturnya berbeda dan perlu tetap terpisah dalam satu workbook."],
    ["Apakah kolom antar berkas harus persis sama pada mode tumpuk?", "Sebaiknya ya. Penumpukan menyelaraskan baris mengikuti struktur kolom berkas-berkasnya; berkas yang kolomnya berbeda urutan atau jumlah akan menghasilkan tabel yang tidak rapi dan perlu kamu periksa ulang setelah digabung."]
  ]
},
xls2pdf: {
  buka: "Mencetak tabel Excel lebar selalu bermasalah: kolom kanan terpotong ke halaman lain dan judul kolom hilang di halaman kedua. Konverter ini mengubah tabel Excel menjadi PDF siap cetak yang dipaskan (fit) ke satu lebar halaman A4 atau F4 — berapa pun banyaknya kolom — dengan baris header yang berulang otomatis di setiap halaman. Kamu mengunggah berkasnya, memberi judul laporan, memilih ukuran kertas dan orientasinya, dan menerima PDF yang rapi untuk dicetak atau dilampirkan pada laporan.",
  langkah: [
    "Unggah berkas Excel yang tabelnya akan dicetak melalui area kerja di atas.",
    "Isi judul laporannya (misalnya ‘Rekap Data Responden’) pada kolom judul.",
    "Pilih ukuran kertas: A4 (210×297mm) atau F4 / Folio (215×330mm), dan orientasinya: Landscape atau Portrait.",
    "Tekan 🖨️ Buat PDF Siap Cetak.",
    "Unduh PDF-nya dan periksa: tabel harus pas satu lebar halaman dengan header yang muncul lagi di tiap halaman baru."
  ],
  faq: [
    ["Bagaimana tabel yang sangat lebar bisa muat satu halaman tanpa terpotong?", "Seluruh tabel diskalakan mengikuti lebar halaman yang kamu pilih — konsekuensinya huruf menjadi lebih kecil pada tabel yang amat lebar. Untuk tabel semacam itu, orientasi Landscape dan kertas F4 memberi ruang paling lapang."],
    ["Mengapa header harus berulang di setiap halaman?", "Agar halaman kedua dan seterusnya tetap bisa dibaca: tanpa header, angka di halaman lanjutan kehilangan keterangan kolomnya. Pengulangan header adalah standar dokumen laporan dan diterapkan otomatis oleh tool ini."]
  ]
},
bibtex: {
  buka: "Konverter ini menjembatani dua dunia sitasi: berkas pertukaran dari pengelola referensi (BibTeX .bib dan RIS .ris dari Mendeley/Zotero) dan daftar pustaka terbaca manusia dalam gaya APA 7, IEEE, atau Vancouver — dan sebaliknya. Kamu menempel atau mengunggah koleksi sitasi, memilih format sumbernya (atau biarkan terdeteksi otomatis), memilih gaya keluaran, dan mendapat daftar pustaka terformat dalam sekali konversi, plus pilihan mengunduh ulang hasilnya sebagai .bib, .ris, atau .txt. Sangat menghemat waktu saat berpindah aplikasi atau menyesuaikan gaya jurnal tujuan.",
  langkah: [
    "Tempel isi berkas BibTeX/RIS-mu atau unggah berkasnya melalui area kerja di atas.",
    "Pilih format sumber: Otomatis (deteksi), BibTeX (.bib), atau RIS (.ris).",
    "Pilih gaya keluaran daftar pustakanya: APA 7, IEEE, atau Vancouver.",
    "Tekan 🔄 Konversi ke Daftar Pustaka dan periksa hasilnya — terutama nama penulis dan tahun tiap entri.",
    "Tekan 📋 Copy Semua untuk menempel hasilnya, atau unduh sebagai ⬇️ .bib / .ris / .txt sesuai kebutuhan alur kerjamu."
  ],
  faq: [
    ["Dari mana berkas BibTeX dan RIS biasanya diperoleh?", "Dari fitur ekspor pengelola referensi seperti Mendeley dan Zotero, atau tombol ‘export citation’ di Google Scholar dan situs jurnal. Berkas itulah yang dikonversi tool ini menjadi daftar pustaka bergaya APA, IEEE, atau Vancouver."],
    ["Bisakah arah sebaliknya — dari daftar pustaka menjadi .bib?", "Bisa: hasil konversi dapat diunduh sebagai .bib atau .ris untuk diimpor kembali ke pengelola referensi. Periksa selalu nama penulis dan tahun setelah konversi massal, karena kesalahan kecil di data sumber ikut terbawa."]
  ]
},
poster: {
  buka: "Pembuat poster ini menyusun poster ilmiah untuk seminar dan PKM dalam resolusi tinggi: judul penelitian atau pengabdian, nama-nama penulis, afiliasi universitas dan program studi, isi bagian-bagiannya (abstrak, metode, temuan), serta kode QR yang mengarah ke tautan dokumentasimu (misalnya Linktree penelitian). Tersedia pilihan orientasi potret (poster berdiri) dan lanskap beserta templat tampilannya. Hasil akhirnya diunduh sebagai PNG resolusi tinggi yang tajam saat dicetak ukuran poster — tanpa perlu menguasai aplikasi desain.",
  langkah: [
    "Isi judul penelitian/pengabdian, daftar nama penulis, dan universitas/program studi asalmu.",
    "Isi konten tiap bagian poster — abstrak, metode, dan temuan — ringkas dan padat; poster dibaca dari jarak satu-dua meter.",
    "Isi tautan dokumentasimu (misalnya https://linktr.ee/penelitianku) untuk dijadikan kode QR di poster.",
    "Pilih orientasi poster: Potret (poster berdiri) atau Lanskap, sesuai ketentuan acara.",
    "Tekan ⬇️ Download Poster (PNG Resolusi Tinggi) dan periksa hasilnya sebelum dibawa ke percetakan."
  ],
  faq: [
    ["Mengapa poster disediakan sebagai PNG, bukan PDF?", "PNG resolusi tinggi dari tool ini dicetak tajam pada ukuran poster seminar dan diterima semua percetakan. Simpan berkas aslinya tanpa dikompres ulang lewat aplikasi chat, karena kompresi chat akan menurunkan ketajamannya."],
    ["Ke mana kode QR di poster mengarah?", "Ke tautan persis yang kamu isi — umumnya halaman dokumentasi, repositori data, atau Linktree penelitianmu. Uji dengan memindai hasil unduhan memakai HP sebelum mencetak, untuk memastikan tidak ada kesalahan ketik pada tautannya."]
  ]
},
k37: {
  buka: "Tool pas foto ini mengganti latar foto menjadi warna resmi berkas — merah #DB1514 untuk standar ijazah dan CPNS, biru #0054A6 untuk standar berkas kampus, atau putih — sekaligus memotongnya ke ukuran pas foto baku pada resolusi 300 DPI: 3×4 cm (354×472 piksel), 4×6 cm (472×709 piksel), atau 2×3 cm (236×354 piksel). Kamu mengunggah foto, memilih ukuran dan warna latar, memprosesnya, lalu mengunduh PNG yang siap dicetak atau diunggah ke sistem pendaftaran — tanpa pergi ke studio foto untuk sekadar ganti latar.",
  langkah: [
    "Unggah fotomu melalui area kerja di atas — foto wajah menghadap kamera dengan pencahayaan rata memberi hasil ganti latar terbaik.",
    "Pilih ukuran keluaran: 3 × 4 cm, 4 × 6 cm, atau 2 × 3 cm (semua pada 300 DPI).",
    "Pilih warna latarnya: 🔴 Merah (standar ijazah/CPNS), 🔵 Biru #0054A6 (standar berkas kampus), ⚪ Putih, atau Biarkan Asli.",
    "Tekan 🖼 Proses Pas Foto dan periksa tepi rambut serta bahu pada hasil ganti latarnya.",
    "Tekan ⬇️ Download PNG untuk menyimpan pas foto finalmu."
  ],
  faq: [
    ["Mengapa ukuran pikselnya persis 354×472 dan sebagainya?", "Karena ukuran itu adalah konversi ukuran centimeter ke piksel pada 300 DPI — standar ketajaman cetak. Pas foto yang pikselnya sesuai ukuran cetak tidak akan pecah atau dipotong sepihak oleh sistem unggah berkas."],
    ["Foto saya memakai hijab/berlatar ramai — apakah ganti latarnya rapi?", "Penggantian latar bekerja mengikuti kontras tepi subjek; foto dengan latar polos dan jarak jelas antara wajah dan latar memberi tepi paling rapi. Bila tepi rambut masih bergerigi, ulangi dengan foto berlatar tembok polos."]
  ]
},
k43: {
  buka: "Penggabung PDF ini menyatukan banyak berkas PDF menjadi satu file utuh — misalnya KTP, ijazah, transkrip, dan sertifikat yang harus diunggah sebagai satu lampiran. Kamu mengunggah berkas-berkasnya, mengatur urutannya, dan menggabungkannya dalam sekali proses yang berjalan lokal. Tool ini sekaligus menyediakan fungsi sebaliknya: mengambil halaman tertentu dari satu PDF dengan format rentang seperti 1-3,5,8. Keduanya adalah operasi yang paling sering dibutuhkan saat menyiapkan berkas pendaftaran dan administrasi.",
  langkah: [
    "Untuk menggabungkan: unggah semua berkas PDF yang akan disatukan melalui area kerja di atas.",
    "Susun urutan berkasnya sesuai urutan dokumen yang diminta (urutan berkas menentukan urutan halaman akhir).",
    "Tekan tombol Gabungkan PDF dan unduh satu berkas gabungannya.",
    "Untuk mengambil halaman: buka bagian ✂️ Ambil Halaman Tertentu dari PDF, unggah satu PDF, dan tulis rentangnya (misalnya 1-3,5,8).",
    "Tekan Pisahkan Halaman untuk mendapatkan PDF berisi halaman pilihanmu saja."
  ],
  faq: [
    ["Apa beda tool ini dengan Ekstrak Halaman PDF Tertentu (splitpdf)?", "Tool ini berfokus menggabungkan banyak berkas menjadi satu, dengan pemisahan halaman sebagai fungsi pendamping. Tool splitpdf khusus didedikasikan untuk mengekstrak halaman dari PDF besar. Hasil keduanya sama-sama PDF baru; pilih sesuai pekerjaan utamamu."],
    ["Apakah ukuran berkas gabungan sama dengan jumlah ukuran asal?", "Kurang lebih ya — penggabungan menyatukan halaman apa adanya tanpa kompresi. Bila berkas gabungan terlalu besar untuk batas unggah, kecilkan dulu berkas-berkas besar dengan tool Kompresor File."]
  ]
},
splitpdf: {
  buka: "Ekstraktor halaman ini mengambil hanya halaman yang kamu butuhkan dari sebuah PDF besar — misalnya halaman 1-3 dan 5 dari laporan 200 halaman — dan menjadikannya PDF baru yang ramping. Kamu cukup mengunggah PDF-nya dan menulis rentang halaman dengan format yang sama seperti dialog cetak: koma untuk halaman lepas, tanda hubung untuk rentang (contoh: 1-3,5,8). Berkas asal tidak diubah, dan seluruh proses berjalan lokal di browser sehingga aman untuk dokumen berisi data pribadi.",
  langkah: [
    "Unggah berkas PDF besar yang halamannya akan diambil melalui area kerja di atas.",
    "Tulis halaman yang dibutuhkan pada kolom rentang, misalnya ‘1-3,5,8’ untuk halaman 1, 2, 3, 5, dan 8.",
    "Tekan ✂️ Ekstrak Halaman dan tunggu PDF baru dibuat dari halaman pilihanmu.",
    "Unduh hasilnya dan buka untuk memastikan halaman yang terkumpul sudah tepat sebelum berkas dikirim."
  ],
  faq: [
    ["Bagaimana cara menulis rentang halamannya?", "Ikuti pola pada contoh: angka tunggal untuk satu halaman (5), tanda hubung untuk rentang berurutan (1-3), dan koma untuk menggabungkan beberapa pilihan (1-3,5,8). Formatnya sama seperti kolom ‘pages’ saat kamu mencetak dokumen."],
    ["Apakah halaman di PDF asal ikut terhapus?", "Tidak. Ekstraksi membuat berkas PDF baru yang hanya berisi halaman pilihan; berkas asalmu tetap lengkap dan tidak tersentuh."]
  ]
},
imgpdf: {
  buka: "Konverter ini merangkai kumpulan foto dokumen — misalnya hasil memotret berkas-berkas pendaftaran satu per satu — menjadi satu berkas PDF A4 yang rapi, satu foto untuk satu halaman. Kamu memilih ukuran halaman (A4, F4/Folio, atau mengikuti ukuran gambar) dan ketebalan marginnya (normal 12,7 mm, tipis 6,4 mm, atau penuh tanpa margin). Susunan halaman mengikuti urutan foto yang kamu unggah, sehingga PDF hasil akhirnya langsung berurutan seperti berkas fisiknya.",
  langkah: [
    "Unggah semua foto dokumen yang akan dirangkai melalui area kerja di atas — urutan unggah menentukan urutan halaman.",
    "Pilih ukuran halamannya: A4 (210×297 mm), F4/Folio (210×330 mm), atau Ikuti ukuran gambar.",
    "Pilih marginnya: Normal (12,7 mm), Tipis (6,4 mm), atau Tanpa margin (penuh).",
    "Tekan 🖨️ Buat PDF dari Gambar dan unduh PDF hasil rangkaiannya.",
    "Buka PDF-nya untuk memeriksa urutan dan orientasi tiap foto sebelum berkas dikirim."
  ],
  faq: [
    ["Foto saya ada yang terbalik (landscape/potrait tercampur) — bagaimana hasil PDF-nya?", "Setiap foto ditempatkan pada halamannya mengikuti ukuran dan orientasi aslinya. Pilihan ‘Ikuti ukuran gambar’ membuat tiap halaman menyesuaikan foto itu sendiri — paling aman untuk kumpulan foto dengan orientasi campuran."],
    ["Mengapa margin perlu diatur?", "Margin menentukan seberapa penuh foto tampil di halaman: margin penuh membuat dokumen hasil pindaian tampak maksimal, sedangkan margin normal memberi tepi putih rapi seperti fotokopi — pilih mengikuti syarat berkas yang kamu tuju."]
  ]
},
k44: {
  buka: "Kompresor serbaguna ini memperkecil tiga jenis berkas yang paling sering ditolak sistem unggah karena kegemukan: gambar, PDF, dan dokumen .docx. Cara kerjanya menargetkan penyebab berat yang sesungguhnya — gambar-gambar di dalam berkas — dengan pilihan batas lebar (Asli, 1920, 1280, atau 800 piksel). Kamu mengunggah berkas, menekan tombol kompres, melihat perbandingan ukuran sebelum dan sesudah, lalu mengunduh hasilnya. Semua diproses lokal di browser, tanpa antre unggah ke server kompres daring.",
  langkah: [
    "Unggah berkas gambar, PDF, atau .docx yang terlalu besar melalui area kerja di atas.",
    "Pilih batas lebar gambar di dalamnya: Asli (tanpa ubah resolusi), 1920, 1280, atau 800 piksel — makin kecil, makin ringan berkasnya.",
    "Tekan 🗜 Kompres Sekarang dan tunggu pemrosesan ulang gambar-gambar di dalam berkasmu.",
    "Bandingkan ukuran sebelum dan sesudah yang ditampilkan untuk memastikan sudah di bawah batas unggah tujuanmu.",
    "Tekan ⬇️ Download Hasil Kompresi dan gunakan berkas baru itu untuk diunggah."
  ],
  faq: [
    ["Mengapa mengecilkan gambar bisa mengecilkan PDF dan DOCX begitu banyak?", "Karena teks hampir tidak berbobot — berat PDF dan DOCX hampir seluruhnya berasal dari foto dan gambar yang disisipkan di dalamnya, sering kali beresolusi kamera penuh. Mengecilkan gambar-gambar itu ke lebar yang wajar memangkas ukuran berkas tanpa mengubah isi tulisannya."],
    ["Apakah isi dokumen saya berubah setelah dikompres?", "Isi teks dan susunan dokumen dipertahankan; yang berubah adalah resolusi gambar di dalamnya. Untuk dokumen yang akan dicetak besar, pilihan 1920 piksel menjaga ketajaman; untuk sekadar unggah berkas, 1280 atau 800 umumnya sudah cukup."]
  ]
},
pdfstamp: {
  buka: "Tool ini membubuhkan dua elemen penanda ke seluruh halaman PDF-mu sekaligus: nomor halaman dan cap watermark teks (misalnya DRAFT, RAHASIA, atau nama kamu). Kamu mengetik teks capnya, memilih posisi nomor halaman — bawah-tengah, bawah-kanan, bawah-kiri, atas-kanan, atau atas-tengah — dan format penomorannya: angka biasa (1, 2, 3), bentuk ‘Halaman 1’, atau ‘1 dari N’ yang menunjukkan total halaman. Hasilnya adalah PDF baru yang sudah bernomor dan berwatermark, siap dilampirkan pada naskah atau dokumen resmi.",
  langkah: [
    "Unggah berkas PDF yang akan diberi nomor dan cap melalui area kerja di atas.",
    "Tulis teks watermark pada kolomnya (misalnya ‘DRAFT / Nama Kamu / RAHASIA’).",
    "Pilih posisi nomor halaman: Bawah — Tengah, Bawah — Kanan, Bawah — Kiri, Atas — Kanan, atau Atas — Tengah.",
    "Pilih format nomornya: ‘1, 2, 3 …’, ‘Halaman 1’, atau ‘1 dari N’.",
    "Tekan 🔢 Proses & Download PDF dan periksa hasilnya pada beberapa halaman."
  ],
  faq: [
    ["Apakah nomor halaman dan watermark harus dipasang bersamaan?", "Keduanya bisa dipasang dalam satu proses penghemat waktu, dan konfigurasinya diterapkan merata ke seluruh halaman. Bila kamu hanya memerlukan salah satunya, isian yang lain dapat disesuaikan mengikuti pilihan pada tool sebelum memproses."],
    ["Bisakah watermark dipakai untuk menandai kepemilikan naskah?", "Bisa — menulis nama atau keterangan pada cap (misalnya nama dan NIM) membuat salinan naskahmu tertandai pemiliknya. Ingat cap ini menempel sebagai bagian halaman, jadi simpan juga salinan asli tanpa cap untuk kebutuhan resmi."]
  ]
},
k41: {
  buka: "Generator QR ini membuat kode QR permanen dari tautan atau teks apa pun — paling sering dipakai untuk link kuesioner penelitian — dengan tiga pilihan ukuran (512, 1024, atau 2048 piksel) dan tiga tingkat koreksi kesalahan: M (15%), Q (25%), dan H (30%, paling awet). Kamu juga bisa menyisipkan logo di tengah kode dan menambahkan keterangan di bawahnya. Karena kode ini mengenkode tautanmu secara langsung (bukan lewat layanan pemendek yang bisa berhenti beroperasi), QR yang tercetak di poster dan kuesioner akan tetap berfungsi selama tautan tujuannya hidup.",
  langkah: [
    "Tempel tautan atau teks yang akan dikodekan (misalnya link Google Form kuesionermu) pada kolom isi QR.",
    "Isi keterangan yang tampil mendampingi QR bila perlu (misalnya ‘Scan untuk isi kuesioner penelitian saya’).",
    "Pilih ukuran hasil: 512 px untuk layar, 1024 atau 2048 px untuk cetak.",
    "Pilih level koreksi kesalahannya: M — 15%, Q — 25%, atau H — 30% (paling awet, wajib bila menyisipkan logo).",
    "Sisipkan logo di tengah bila diinginkan, tekan 🔳 Generate QR Code, lalu ⬇️ Download QR (PNG) — dan uji pindai dulu memakai HP sebelum QR dibagikan."
  ],
  faq: [
    ["Mengapa QR disebut ‘permanen’ di tool ini?", "Karena isi QR adalah tautanmu sendiri yang dikodekan langsung. Banyak layanan QR gratis menyelipkan tautan perantara milik mereka yang bisa dinonaktifkan sewaktu-waktu; QR dari tool ini tidak punya perantara, jadi masa berlakunya sama dengan masa berlaku tautan tujuanmu."],
    ["Level koreksi mana yang harus dipilih bila memakai logo?", "Pilih H (30%): artinya kode tetap terbaca meskipun 30% permukaannya tertutup atau rusak — persis yang dibutuhkan bila bagian tengahnya ditimpa logo. Logo yang terlalu besar tetap bisa mengganggu, jadi uji pindai setelah membuat."]
  ]
},
k42: {
  buka: "OCR (optical character recognition) ini mengubah foto halaman buku atau catatan menjadi teks yang bisa disalin, memakai mesin Tesseract.js yang berjalan lokal di browser dengan dukungan Bahasa Indonesia dan English. Kamu mengunggah foto halamannya, memilih bahasa teks aslinya, menjalankan OCR, lalu menyalin teks hasilnya atau mengunduhnya sebagai .txt. Cara ini menghemat pengetikan ulang kutipan panjang dari buku cetak — dengan catatan teks hasil tetap perlu kamu periksa kata per katanya sebelum dikutip.",
  langkah: [
    "Unggah foto halaman buku atau catatan melalui area kerja di atas — foto tegak, terang merata, dan fokus penuh memberi hasil terbaik.",
    "Pilih bahasa teks aslinya: 🇮🇩 Bahasa Indonesia atau 🇬🇧 English.",
    "Tekan 🔍 Jalankan OCR dan tunggu mesin membaca huruf-huruf pada gambarmu.",
    "Baca teks hasil konversi dan perbaiki kata yang salah terbaca — terutama nama asing, istilah Latin, dan angka.",
    "Tekan 📋 Copy Teks untuk menempelnya ke naskah, atau ⬇️ Download .txt untuk menyimpannya."
  ],
  faq: [
    ["Mengapa ada kata yang salah terbaca oleh OCR?", "OCR menebak huruf dari bentuk piksel; foto miring, bayangan, huruf kecil, atau kertas menguning menurunkan ketepatannya. Foto tegak lurus dengan cahaya merata dan halaman yang rata adalah perbaikan terbesar yang bisa kamu lakukan sebelum memindai."],
    ["Apakah OCR ini bisa membaca tulisan tangan?", "Mesin Tesseract dirancang untuk teks cetak. Tulisan tangan — apalagi yang sambung dan miring — umumnya tidak terbaca dengan andal; untuk catatan tangan, hasil terbaik tetap dari teks yang diketik atau dicetak."]
  ]
},
k39: {
  buka: "Penyusun grid ini merangkai banyak foto dokumentasi kegiatan — lengkap dengan keterangan (caption) untuk tiap foto — menjadi satu gambar lampiran yang rapi dalam susunan 2, 3, atau 4 kolom. Daripada melampirkan belasan berkas foto terpisah pada laporan atau LPJ, satu gambar grid dengan keterangan membuat lampiranmu terlihat profesional dan mudah dibaca pemeriksa. Kamu mengunggah foto-fotonya, menulis keterangan tiap foto, memilih jumlah kolom, dan menyusun grid-nya dalam sekali proses.",
  langkah: [
    "Unggah foto-foto dokumentasi yang akan dijadikan lampiran melalui area kerja di atas.",
    "Isi keterangan untuk tiap foto pada kolom ‘Keterangan foto’ yang menyertainya (misalnya nama kegiatan dan momennya).",
    "Pilih jumlah kolom grid: 2 kolom (foto besar), 3 kolom (seimbang), atau 4 kolom (banyak foto).",
    "Tekan 🧩 Susun Grid Lampiran dan periksa susunan serta keterbacaan keterangan pada hasilnya.",
    "Unduh gambar grid finalnya dan lampirkan pada laporan atau LPJ kegiatanmu."
  ],
  faq: [
    ["Berapa kolom yang sebaiknya dipilih?", "Tergantung jumlah dan kepentingan foto: 2 kolom bila foto sedikit dan detailnya penting, 3 kolom untuk lampiran kegiatan umum, 4 kolom bila foto banyak dan hanya perlu terbaca sebagai bukti rangkaian kegiatan."],
    ["Mengapa lampiran dibuat satu gambar, bukan banyak berkas foto?", "Satu gambar grid menjaga urutan dan keterangan foto tetap menyatu dengan gambarnya — pemeriksa laporan tidak perlu mencocokkan nama berkas dengan daftar keterangan, dan tidak ada foto yang tercecer saat berkas dipindah-pindah."]
  ]
},
k40: {
  buka: "Tool ini menempelkan cap waktu dan lokasi ala kamera lapangan (seperti aplikasi timestamp camera yang dipakai petugas survei) ke foto tugasmu: teks waktu serta keterangan lokasi dan koordinat yang kamu isikan, misalnya ‘Balai Desa Sukamaju, Kec. Ilir Timur (-2.97, 104.77)’. Ada tiga gaya penempatan: strip hitam di bawah foto, teks di kiri bawah, atau teks di kanan bawah. Hasilnya diunduh sebagai JPG — format bukti dokumentasi yang lazim diminta untuk laporan KKN, survei, dan kegiatan lapangan.",
  langkah: [
    "Unggah foto yang akan diberi cap melalui area kerja di atas.",
    "Isi keterangan waktu dan lokasi/geotag yang akan ditempel (misalnya nama tempat beserta koordinatnya).",
    "Pilih gaya capnya: Strip hitam di bawah foto, Teks kiri bawah, atau Teks kanan bawah.",
    "Tekan 🕒 Tempel Timestamp dan periksa keterbacaan teks cap pada hasil pratinjaunya.",
    "Tekan ⬇️ Download Foto Ber-timestamp (JPG) untuk menyimpan foto buktinya."
  ],
  faq: [
    ["Untuk apa foto diberi timestamp dan geotag seperti ini?", "Sebagai bukti dokumentasi: cap waktu dan lokasi pada foto menunjukkan kapan dan di mana kegiatan dilakukan — format yang lazim diminta dosen dan instansi untuk laporan KKN, survei lapangan, dan pendataan. Karena itu isilah waktu dan lokasi sesuai keadaan sebenarnya."],
    ["Gaya cap mana yang paling aman untuk foto dokumentasi?", "Strip hitam di bawah foto tidak menutupi isi foto sama sekali, sehingga bukti visualnya tetap utuh. Gaya teks di sudut cocok bila strip tambahan membuat ukuran foto tidak sesuai syarat laporanmu."]
  ]
},
k38: {
  buka: "Pembuat tanda tangan transparan ini mengubah foto tanda tangan di atas kertas menjadi berkas PNG berlatar transparan: latar kertas dibuang berdasarkan luminansi (kecerahan) — bagian kertas yang terang menjadi transparan, goresan tinta yang gelap dipertahankan. Kamu bisa memilih warna tinta hasilnya: asli dari foto, hitam pekat, atau biru bolpoin. PNG transparan ini kemudian bisa ditempel di atas dokumen Word atau PDF mana pun dan tampak seperti tanda tangan yang ditulis langsung di dokumen itu.",
  langkah: [
    "Foto tanda tanganmu di kertas putih polos dari jarak dekat, lalu unggah melalui area kerja di atas — kertas seputih dan serata mungkin memberi tepi paling bersih.",
    "Pilih perlakuan warna tintanya: Asli dari foto, Hitam pekat, atau Biru bolpoin.",
    "Tekan ✍️ Buang Background Kertas dan periksa hasilnya: latar harus transparan dan goresan tinta tetap utuh.",
    "Bila masih ada sisa bayangan kertas, ulangi dengan foto yang cahayanya lebih merata.",
    "Tekan ⬇️ Download PNG Transparan dan tempel berkasnya di dokumen yang perlu ditandatangani."
  ],
  faq: [
    ["Mengapa foto kertas putih yang rata sangat menentukan hasil?", "Pemisahan latar bekerja dengan kecerahan: piksel terang dianggap kertas, piksel gelap dianggap tinta. Bayangan, lipatan, atau kertas kekuningan membuat sebagian latar ikut terbaca sebagai tinta sehingga tepi tanda tangan tampak kotor."],
    ["Apa beda PNG ini dengan menggambar tanda tangan di tool Tanda Tangan & Stempel di PDF?", "Tool ini menyiapkan aset tanda tangannya saja (PNG transparan) untuk ditempel berulang kali di banyak dokumen. Tool Tanda Tangan & Stempel di PDF adalah alur lengkapnya: menggambar atau memakai tanda tangan lalu membubuhkannya ke halaman PDF tertentu."]
  ]
},

/* ================= KARIR ================= */
k53: {
  buka: "Pembuat CV ini menyusun curriculum vitae satu kolom yang aman dibaca sistem ATS (applicant tracking system) perusahaan — tanpa tabel rumit, tanpa grafik batang keahlian, tanpa dua kolom yang membuat parser salah membaca. Kamu mengisi data diri (nama sesuai KTP, posisi target, email, nomor HP) dan bagian-bagian CV seperti biasa, lalu tool menghasilkan CV sekaligus skor cek struktur instan yang menandai bagian penting yang belum lengkap. Hasilnya dapat diunduh sebagai .doc atau disalin sebagai versi teks polos untuk ditempel ke formulir lamaran daring.",
  langkah: [
    "Isi data dirimu: nama sesuai KTP, posisi yang kamu lamar (misalnya ‘Staff Administrasi’), email aktif, dan nomor HP.",
    "Lengkapi bagian pengalaman, pendidikan, dan keahlianmu mengikuti kolom-kolom yang disediakan.",
    "Tekan 📄 Generate CV + Skor ATS dan baca skor strukturnya — perhatikan bagian mana yang ditandai belum lengkap.",
    "Perbaiki isian yang ditandai skor, lalu buat ulang CV-nya sampai strukturnya lengkap.",
    "Tekan ⬇️ Download CV (.doc) untuk berkas jadinya, atau 📋 Copy Versi Teks Polos untuk formulir lamaran online."
  ],
  faq: [
    ["Apa sebenarnya yang dinilai oleh skor ATS di tool ini?", "Kelengkapan dan keterbacaan struktur: apakah bagian wajib CV (kontak, posisi target, pengalaman, pendidikan, keahlian) ada dan tersusun dalam format satu kolom yang bisa dibaca mesin. Skor ini menilai struktur, bukan kualitas pengalamanmu — dan bukan jaminan lolos seleksi perusahaan."],
    ["Mengapa CV satu kolom lebih aman untuk ATS?", "Sistem ATS membaca dokumen baris demi baris. Tata letak dua kolom, tabel bersarang, dan ikon grafik sering membuat urutan bacanya kacau atau datanya hilang. Satu kolom teks bersih adalah format yang paling konsisten dibaca semua sistem."]
  ]
},
k50: {
  buka: "Generator surat ini menyediakan 15 jenis surat resmi yang paling sering dibutuhkan mahasiswa dan pencari kerja: motivation letter beasiswa berbahasa Inggris, surat lamaran kerja, surat pengantar magang, permohonan izin penelitian, keringanan UKT, cuti akademik, permohonan beasiswa, sponsorship, surat rekomendasi, surat kuasa, dan lainnya. Kamu memilih jenisnya, mengisi nama, keperluan dan tujuan surat, instansi tujuan, serta profil singkatmu (jurusan, universitas, IPK atau prestasi relevan) — lalu surat tersusun lengkap dengan kop, isi, dan penutup formalnya, siap disalin atau diunduh sebagai .doc.",
  langkah: [
    "Pilih jenis surat dari daftar 15 jenis yang tersedia — misalnya 🎓 Motivation Letter Beasiswa (Bahasa Inggris), 💼 Surat Lamaran Kerja, 🧑‍🎓 Surat Pengantar Magang, 🔬 Izin Penelitian, atau 💸 Keringanan UKT.",
    "Isi nama kamu dan keperluan/tujuan suratnya (misalnya ‘Beasiswa Unggulan 2026’ atau posisi ‘Staff Administrasi’).",
    "Isi instansi tujuannya (misalnya ‘Kemendikbudristek / PT Maju Bersama’).",
    "Tulis profil singkatmu dalam 2–3 kalimat: jurusan, universitas, dan IPK atau prestasi yang relevan dengan tujuan surat.",
    "Tekan ✉️ Generate Surat, baca ulang hasilnya, lalu 📋 Copy Surat atau unduh lewat tombol ⬇️ Download .doc."
  ],
  faq: [
    ["Apakah kop dan nomor suratnya mengikuti instansi saya?", "Kamu tetap perlu menyesuaikan kop, nomor surat, dan tembusan dengan format resmi instansi atau kampusmu sebelum mengirim — generator menyusun isi suratnya secara lengkap dan formal, tetapi identitas kop adalah kekhasan tiap instansi."],
    ["Motivation letter-nya langsung dalam Bahasa Inggris?", "Ya — jenis 🎓 Motivation Letter — Beasiswa memang dihasilkan dalam Bahasa Inggris, mengikuti konvensi surat pengantar beasiswa internasional. Tetap baca ulang dan sesuaikan detail prestasimu sebelum dipakai."]
  ]
},
chatdosen: {
  buka: "Mengirim pesan ke dosen ada etikanya, dan generator ini menyusunnya untukmu dalam tiga bentuk sekaligus: pesan chat WhatsApp yang sopan dan ringkas, versi email, dan surat izin resmi. Kamu memilih keperluannya — bimbingan skripsi, izin tidak masuk karena sakit atau kepentingan, minta tanda tangan, menanyakan nilai, atau konsultasi judul skripsi — mengisi nama, NIM, kelas/program studi, dan nama dosen, lalu salam pembukanya menyesuaikan jam pengiriman secara otomatis (pagi, siang, sore, malam) atau bisa kamu atur manual. Tinggal salin dan kirim, tanpa lagi menatap layar kosong.",
  langkah: [
    "Pilih keperluan pesanmu: 📚 Bimbingan Skripsi, 🤒 Izin Tidak Masuk (Sakit/Kepentingan), ✍️ Minta Tanda Tangan, 📊 Menanyakan Nilai, atau 💡 Konsultasi Judul Skripsi.",
    "Isi nama kamu, NIM, kelas dan program studi (misalnya ‘S1 Ekonomi, Kelas A Semester 7’), serta nama dosen beserta gelarnya (misalnya ‘Dr. Budi Santoso, M.Si.’).",
    "Atur salam waktunya: 🕐 Otomatis (sesuai jam sekarang) atau pilih manual Pagi/Siang dan seterusnya.",
    "Tekan ✉️ Buat Pesan Sopan dan baca hasilnya — pastikan nama, gelar dosen, dan keperluanmu sudah benar.",
    "Tekan 📋 Copy Pesan WA untuk chat, 📋 Copy Email untuk surel, atau 📋 Copy Surat / ⬇️ Download Surat .doc bila memerlukan versi surat resmi."
  ],
  faq: [
    ["Apa beda versi WA, email, dan surat dari tool ini?", "Isi pesannya sama, kemasannya berbeda: versi WA ringkas untuk percakapan, versi email menambahkan subjek dan salam formal, dan versi surat adalah dokumen resmi lengkap berkop untuk keperluan administratif seperti izin tertulis."],
    ["Mengapa salam waktu dibuat otomatis?", "Karena ‘Selamat pagi’ yang terkirim pukul sembilan malam adalah kesalahan kecil yang sangat sering terjadi dan mudah dihindari. Mode otomatis membaca jam perangkatmu saat pesan dibuat; mode manual berguna bila pesan disiapkan malam ini untuk dikirim besok pagi."]
  ]
},
ipk: {
  buka: "Simulator target IPK ini menjawab pertanyaan klasik menjelang semester baru: ‘IP semester ini harus berapa agar IPK akhirku mencapai target?’ Kamu memasukkan IPK saat ini, jumlah SKS yang sudah ditempuh, SKS yang akan diambil semester depan, dan target IPK akhirmu — tool lalu menghitung IP minimum yang harus kamu capai semester depan beserta skenario IPK akhir pada beberapa tingkat capaian. Proyeksi ini membantu menetapkan target belajar yang realistis jauh sebelum KRS ditutup, bukan sekadar berharap di akhir semester.",
  langkah: [
    "Isi IPK kamu saat ini dan jumlah SKS yang sudah kamu tempuh sampai semester lalu.",
    "Isi jumlah SKS yang akan kamu ambil semester depan serta target IPK akhir yang kamu kejar (misalnya untuk syarat cum laude).",
    "Tekan 📈 Hitung Kebutuhan IP.",
    "Baca hasilnya: IP minimum yang harus dicapai semester depan dan bagian ‘Skenario IPK Akhir’ untuk melihat hasil pada berbagai capaian IP.",
    "Tekan 📋 Copy Hasil untuk menyimpan proyeksinya sebagai pengingat target semestermu."
  ],
  faq: [
    ["Hasilnya mengatakan IP yang dibutuhkan melebihi 4,00 — artinya apa?", "Artinya target IPK akhirmu mustahil dicapai hanya dalam satu semester dengan sisa SKS itu — secara matematis perlu IP sempurna pun tidak cukup. Solusinya adalah menurunkan target atau menyebarkan perbaikan ke beberapa semester dan perbaikan nilai mata kuliah."],
    ["Apakah simulator memperhitungkan perbaikan nilai (mengulang mata kuliah)?", "Perhitungan dasarnya memakai rata-rata tertimbang SKS dari IPK berjalan dan IP semester depan. Kebijakan perbaikan nilai berbeda-beda per kampus (ada yang mengganti, ada yang merata-rata); untuk skenario mengulang, sesuaikan angka masukanmu dengan kebijakan kampusmu."]
  ]
},
transkrip: {
  buka: "Kalkulator transkrip ini menghitung IPK dari daftar nilai mata kuliah yang kamu tempel dalam format sederhana: satu mata kuliah per baris, ditulis ‘Nama; SKS; Huruf Mutu; Semester’ (misalnya ‘Pengantar Ekonomi; 3; A; 1’). Dari data itu tool menghitung IPK keseluruhan, IPS untuk tiap semester, predikat kelulusanmu, dan memeriksa syarat cum laude — termasuk menanyakan apakah kamu pernah mengulang mata kuliah, karena riwayat mengulang adalah salah satu syarat yang menggugurkan predikat itu di banyak kampus. Semua dihitung lokal dari teks tempelanmu.",
  langkah: [
    "Siapkan daftar nilaimu dan tempel dengan format persis: Nama Mata Kuliah; SKS; Huruf; Semester — satu mata kuliah per baris (contoh: Statistika; 3; AB; 1).",
    "Jawab pertanyaan riwayat mengulang: pilih ‘Tidak pernah’ atau ‘Pernah’ sesuai riwayat studimu.",
    "Tekan 🎓 Hitung IPK & Cek Predikat.",
    "Baca hasilnya: IPK keseluruhan, IPS per semester, predikat kelulusan, dan status syarat cum laude-mu beserta bagian mana yang belum terpenuhi.",
    "Perbaiki baris yang salah bila ada nilai yang terbaca keliru, lalu hitung ulang."
  ],
  faq: [
    ["Mengapa format tempelnya harus persis memakai titik koma?", "Karena titik koma adalah pemisah antar kolom (nama, SKS, huruf, semester). Nama mata kuliah yang mengandung koma tetap aman justru karena pemisahnya titik koma — ikuti contoh format pada placeholder agar setiap baris terbaca sebagai satu mata kuliah."],
    ["Syarat cum laude apa saja yang diperiksa tool ini?", "Syarat yang lazim berlaku: IPK mencapai ambang cum laude, lulus dalam batas masa studi yang ditentukan, dan tidak pernah mengulang mata kuliah. Ambang dan batas persisnya berbeda antar kampus — tool menyatakan bagian mana yang perlu kamu konfirmasi ke fakultas."]
  ]
},
targetnilai: {
  buka: "Kalkulator target nilai ini membalik cara berpikir mahasiswa pada umumnya: bukan ‘dapat nilai berapa’, melainkan ‘UAS harus dapat berapa agar mata kuliah ini A?’ Kamu menambahkan komponen-komponen penilaian mata kuliah (tugas, UTS, UAS, praktikum, dan sebagainya) beserta bobot dan nilai yang sudah kamu peroleh; tool lalu menghitung nilai minimum komponen yang tersisa — biasanya UAS — untuk mencapai target hurufmu. Setiap mata kuliah bisa disimpan, dan tool membuatkan Kartu Target dalam bentuk PNG sebagai pengingat belajar yang bisa kamu tempel atau bagikan.",
  langkah: [
    "Isi nama mata kuliahnya (misalnya ‘Statistika Ekonomi’) dan tentukan target hurufmu.",
    "Tekan + Tambah Komponen untuk tiap unsur penilaian: tulis nama komponen, bobot persennya, dan nilainya bila sudah ada (kosongkan komponen yang belum dinilai, misalnya UAS).",
    "Pastikan jumlah bobot semua komponen tepat 100%.",
    "Baca hasil hitungan: nilai minimum pada komponen tersisa yang harus kamu capai untuk target huruf itu.",
    "Tekan 💾 Simpan Mata Kuliah Ini untuk menyimpan targetnya, dan 🖼️ Unduh Kartu Target (PNG) untuk pengingat visualnya."
  ],
  faq: [
    ["Hasilnya menunjukkan nilai yang dibutuhkan di atas 100 — apa artinya?", "Target huruf itu sudah tidak terjangkau secara matematis dari nilai komponenmu yang sudah terkunci. Angka itu tetap berguna: kamu jadi tahu target realistis berikutnya (turun satu huruf) dan berapa nilai yang dibutuhkan untuk mencapainya."],
    ["Bisakah satu mata kuliah punya komponen lebih dari tiga?", "Bisa — tambahkan komponen sebanyak unsur penilaian di silabusmu (kuis, tugas, UTS, UAS, praktikum, proyek). Kuncinya hanya satu: total bobotnya harus 100% agar hitungan nilai minimumnya sah."]
  ]
},
k45: {
  buka: "Pembuat wallpaper ini mengubah jadwal kuliahmu menjadi gambar latar HP berukuran 1080×1920 — jadwal selalu terlihat setiap kamu membuka kunci layar, tanpa perlu membuka aplikasi. Kamu mengisi nama, menambahkan mata kuliah satu per satu (hari, jam seperti 08:00–09:40, nama mata kuliah, dan ruang seperti R. 3.2), lalu memilih satu dari empat tema warna: Biru Kampus, Ungu Senja, Hijau Toska, atau Gelap Elegan. Hasilnya diunduh sebagai gambar siap pasang menjadi wallpaper layar kunci maupun layar utama.",
  langkah: [
    "Isi nama kamu pada kolom nama untuk tampil di wallpaper.",
    "Tekan ➕ Tambah Matkul dan isi mata kuliah pertama: hari, jam kuliah (misalnya 08:00–09:40), nama mata kuliah, dan ruangnya (misalnya R. 3.2).",
    "Ulangi untuk semua mata kuliah satu semester penuh.",
    "Pilih tema warnanya: 💙 Biru Kampus, 💜 Ungu Senja, 💚 Hijau Toska, atau 🖤 Gelap Elegan.",
    "Tekan 🖼 Buat Wallpaper HP, lalu ⬇️ Download Wallpaper (1080×1920) dan pasang sebagai wallpaper HP-mu."
  ],
  faq: [
    ["Mengapa ukurannya 1080×1920?", "Itu resolusi Full HD vertikal yang menjadi ukuran baku wallpaper mayoritas HP Android. Pada HP dengan resolusi berbeda, gambar ini tetap terpasang proporsional mengikuti layar."],
    ["Jadwal saya berubah di tengah semester — harus buat ulang dari nol?", "Data mata kuliah yang kamu masukkan tersimpan selama sesi pengisian di perangkatmu; ubah entri yang berubah, lalu buat ulang wallpapernya. Prosesnya singkat karena kamu hanya mengedit bagian yang berubah."]
  ]
},
k54: {
  buka: "Checklist ini memuat 14+ syarat kelulusan yang lazim diminta kampus menjelang yudisium dan sidang — dari bebas pustaka, unggah repositori, sampai berita acara — sebagai daftar centang yang progresnya tersimpan otomatis di browser. Kamu bisa menghapus syarat bawaan yang tidak berlaku di kampusmu dan menambahkan syarat khusus fakultasmu sendiri lewat kolom tambah syarat. Di akhir, daftar yang sudah tercentang maupun sisanya dapat diunduh sebagai berkas .txt untuk dibagikan atau dicetak sebagai panduan pengumpulan berkas.",
  langkah: [
    "Telusuri daftar 14+ syarat bawaan dan centang yang sudah kamu penuhi — progresmu tersimpan otomatis setiap kali mencentang.",
    "Hapus syarat yang tidak berlaku di kampusmu dengan tombol ✕ pada syarat itu.",
    "Tambahkan syarat khusus kampusmu lewat kolom ‘Tambah syarat khusus kampusmu…’ lalu tekan ➕ Tambah Syarat.",
    "Kerjakan syarat yang belum tercentang berdasarkan urutan tenggatnya, bukan urutan daftar.",
    "Tekan ⬇️ Download Ceklis (.txt) untuk menyimpan salinan daftar beserta statusnya; gunakan ↺ Reset Semua hanya bila ingin memulai daftar dari nol."
  ],
  faq: [
    ["Apakah centang saya hilang bila browser ditutup?", "Tidak — progres checklist tersimpan otomatis di penyimpanan lokal browser, jadi tetap ada saat kamu kembali di perangkat dan browser yang sama. Membersihkan data situs akan menghapusnya, jadi unduh salinan .txt-nya sebagai cadangan."],
    ["Syarat di kampus saya berbeda dari daftar bawaan — apakah daftar ini masih berguna?", "Justru untuk itu ada fitur tambah dan hapus syarat: daftar bawaan adalah titik awal syarat-syarat yang paling umum, dan kamu menyesuaikannya sampai identik dengan daftar resmi fakultasmu, lalu menggunakannya sebagai satu-satunya daftar kendali."]
  ]
},
k52: {
  buka: "Kalender akademik ini adalah papan kendali tenggat pribadimu: kamu menambahkan kegiatan dan batas waktu (UAS, batas kumpul laporan, sidang, dan lainnya) ke kalender, mengelompokkannya per jenis — Deadline, Ujian/Sidang, Kuliah/Kelas, atau Libur/Acara — dan tool menampilkan daftar ‘Deadline & Kegiatan Terdekat’ lengkap dengan hitung mundur H-x untuk yang paling dekat. Setiap kegiatan juga bisa diekspor sebagai berkas .ics untuk diimpor ke Google Calendar, sehingga pengingatnya ikut muncul di HP seperti agenda sungguhan.",
  langkah: [
    "Tekan ➕ Tambah ke Kalender dan isi nama kegiatannya (misalnya ‘UAS Statistika / Batas kumpul laporan’).",
    "Tentukan tanggalnya dan pilih jenisnya: 🔴 Deadline, 🟣 Ujian/Sidang, 🔵 Kuliah/Kelas, atau 🟢 Libur/Acara.",
    "Ulangi untuk semua tenggat semestermu — gunakan panah ⬅️ ➡️ untuk berpindah bulan pada tampilannya.",
    "Pantau bagian ⏳ Deadline & Kegiatan Terdekat untuk melihat hitung mundur H-x dari tenggatmu yang paling dekat.",
    "Tekan ⬇️ Export .ics (Google Calendar) untuk mengunduh berkas agenda dan mengimpornya ke kalender HP-mu."
  ],
  faq: [
    ["Apa itu berkas .ics dan bagaimana cara memakainya?", "ICS adalah format agenda universal: berkas hasil ekspor tool ini bisa diimpor ke Google Calendar, Outlook, dan aplikasi kalender HP, sehingga semua tenggat yang kamu catat di sini menjadi acara beringat di kalendermu sehari-hari."],
    ["Apakah hitung mundur H-x berubah otomatis?", "Ya — hitung mundur dihitung dari tanggal hari ini setiap halaman dibuka, jadi angka H-x yang kamu lihat pada daftar kegiatan terdekat selalu menunjukkan sisa hari yang sebenarnya."]
  ]
},
masastudi: {
  buka: "Kalkulator ini menghitung sisa masa studimu secara jujur: dari semester yang sedang berjalan (misalnya semester 7), SKS yang sudah ditempuh, total SKS syarat lulus, dan batas masa studi kampus, tool menghitung sisa semester yang tersedia, jumlah SKS yang masih harus diselesaikan, dan tempo minimum SKS per semester agar kamu lulus tepat waktu — beserta penilaian seberapa besar risiko DO (drop out) bila tempo itu tidak terpenuhi. Angka-angkanya adalah bahan diskusi konkret dengan dosen wali, bukan sekadar pengingat bahwa waktu terus berjalan.",
  langkah: [
    "Isi semester yang sedang kamu jalani saat ini (misalnya 7) pada kolom semester.",
    "Isi total SKS yang sudah kamu tempuh dan lulus, serta total SKS syarat lulus program studimu.",
    "Isi batas masa studi maksimum yang berlaku di kampusmu (untuk S1 umumnya 14 semester, sesuaikan dengan aturan fakultasmu).",
    "Tekan ⏳ Hitung Sisa Masa Studi.",
    "Baca hasilnya: sisa semestermu, SKS tersisa, tempo minimal SKS per semester yang harus kamu ambil dan luluskan, serta tingkat risiko DO-mu."
  ],
  faq: [
    ["Kapan risiko DO dinyatakan tinggi oleh kalkulator ini?", "Ketika SKS yang tersisa dibagi sisa semester menghasilkan beban per semester yang melebihi beban wajar yang bisa diambil dan diluluskan (umumnya sekitar 24 SKS). Artinya, secara hitungan kamu harus sempurna setiap semester — situasi yang harus segera didiskusikan dengan dosen wali."],
    ["Apakah menghitung SKS yang ditempuh atau yang lulus?", "Yang menentukan kelulusan adalah SKS yang LULUS. Mata kuliah yang belum lulus dan harus diulang tetap termasuk sisa bebanmu, jadi masukkan angka SKS lulus agar tempo hitungannya tidak menipu."]
  ]
},
sks: {
  buka: "Konverter SKS MBKM ini menyetarakan kegiatan Kampus Merdeka di luar kampus — magang, KKN tematik, studi independen — menjadi satuan SKS mengikuti ketentuan umum: 1 SKS setara 170 menit kegiatan per minggu selama 16 minggu, atau sekitar 45 jam total, dan penyetaraan penuh satu semester di luar kampus umumnya maksimal 20 SKS (sekitar 900 jam). Kamu bisa menghitung dari jadwal (jam kerja per hari × hari per minggu × jumlah minggu) atau langsung dari total jam logbook, lalu membandingkannya dengan target penyetaraan yang kamu ajukan ke program studi.",
  langkah: [
    "Pilih cara hitungmu: isi jadwal kegiatan (Jam Kerja per Hari, Hari Kerja per Minggu, Durasi Kegiatan dalam minggu), ATAU isi ‘Total Jam dari Logbook’ untuk menimpa hitungan jadwal.",
    "Isi Target Penyetaraan (SKS) yang kamu ajukan ke prodi.",
    "Hasil terhitung otomatis saat kamu mengetik: total jam kegiatan, nilai setara SKS-nya, dan kekurangannya terhadap target.",
    "Bila masih kurang, baca estimasi minggu tambahan yang dibutuhkan pada jadwalmu saat ini untuk menutup kekurangan jam itu.",
    "Bawa hasil hitungan ini saat berdiskusi dengan dosen wali atau prodi — kebijakan penyetaraan tiap kampus bisa berbeda dari ketentuan umum."
  ],
  faq: [
    ["Dari mana angka 45 jam per SKS berasal?", "Dari ketentuan umum pembelajaran: 1 SKS adalah 170 menit kegiatan per minggu selama satu semester 16 minggu — 170 × 16 menit ≈ 45 jam. Angka itulah yang menjadi dasar penyetaraan kegiatan MBKM ke dalam SKS."],
    ["Mengapa hasil dari logbook bisa berbeda dari hitungan jadwal?", "Karena jadwal adalah rencana dan logbook adalah realisasi. Mengisi total jam logbook menimpa hitungan jadwal, sehingga penyetaraan dihitung dari jam yang benar-benar terlaksana — angka yang pada akhirnya dinilai oleh prodi."]
  ]
},
biaya: {
  buka: "Kalkulator biaya kuliah ini mengubah total biaya sisa kuliahmu — yang angkanya terasa abstrak — menjadi target tabungan yang konkret per bulan, per minggu, bahkan per hari. Kamu memasukkan UKT/SPP per semester dan sisa semestermu, tabungan yang sudah terkumpul, target waktu pengumpulan dalam bulan, serta biaya-biaya sekali bayar di luar UKT (KKN, cetak dan jilid skripsi, wisuda dan toga) dalam format ‘Nama | Jumlah’ per baris. Hasilnya terhitung langsung saat kamu mengetik: total kebutuhan, kekurangan yang harus dikejar, dan jatah menabung berkala beserta persen terkumpulnya.",
  langkah: [
    "Isi ‘UKT / SPP per Semester (Rp)’ dan ‘Sisa Semester (termasuk semester ini)’.",
    "Isi ‘Tabungan yang Sudah Terkumpul (Rp)’ dan ‘Target Terkumpul Dalam (bulan)’.",
    "Tulis biaya lain sekali bayar pada kolomnya, satu biaya per baris dengan format Nama | Jumlah (misalnya ‘KKN | 1500000’, ‘Wisuda & toga | 750000’).",
    "Baca hasil yang terhitung otomatis: Total Kebutuhan, rincian UKT untuk sisa semestermu, jumlah kekurangan, dan target menabung per bulan, per minggu, serta per hari.",
    "Nilai sendiri realistis tidaknya angka per hari itu terhadap uang saku dan penghasilanmu, lalu sesuaikan target bulannya bila perlu."
  ],
  faq: [
    ["Mengapa biaya sekali bayar dipisahkan dari UKT?", "Karena sifatnya berbeda: UKT berulang tiap semester dan jumlahnya pasti, sedangkan biaya seperti KKN dan wisuda muncul sekali pada momen tertentu. Memisahkannya membuat total kebutuhanmu akurat dan kamu bisa menyiapkan pos besar itu sejak jauh hari."],
    ["Format penulisan biaya lain harus persis ‘Nama | Jumlah’?", "Ya — tanda garis tegak (|) adalah pemisah antara nama biaya dan nominalnya, satu biaya dalam satu baris. Nominal cukup ditulis angkanya saja; tool yang akan menguraikan dan menjumlahkannya ke total kebutuhan."]
  ]
},
combo55: {
  buka: "Tool gabungan ini memuat dua keperluan anak kos dan bendahara kegiatan dalam satu halaman. Tab 💰 Budget Anak Kos menghitung jatah aman belanja harianmu dari uang bulanan (kiriman dan penghasilan) setelah dikurangi target tabungan dan pengeluaran tetap — kos/kontrakan, listrik dan air, kuota internet dan pulsa, serta transport tetap — lalu memberi status apakah jatah harianmu longgar, cukup, atau ketat. Tab 🔢 Terbilang & Romawi mengubah nominal angka menjadi ejaan terbilang Rupiah (untuk kwitansi dan LPJ) dan mengonversi angka 1–3999 menjadi angka Romawi, keduanya terhitung otomatis saat kamu mengetik.",
  langkah: [
    "Untuk budget: buka tab 💰 Budget Anak Kos dan isi Uang Bulanan (kiriman + penghasilan) serta Target Tabungan per Bulan.",
    "Isi pengeluaran tetapmu: Kos / Kontrakan, Listrik & Air, Kuota Internet & Pulsa, dan Transport Tetap & Lain-lain.",
    "Tekan 🍜 Hitung Budget Aman dan baca jatah sisa untuk makan dan kebutuhan harianmu: angka per hari dan per minggu beserta statusnya.",
    "Untuk terbilang: buka tab 🔢 Terbilang & Romawi, ketik nominal pada ‘Nominal Angka (Rupiah)’ — ejaan terbilangnya muncul otomatis untuk disalin ke kwitansi.",
    "Untuk romawi: ketik angka 1–3999 pada kolom ‘Angka → Romawi’ dan salin hasil konversinya."
  ],
  faq: [
    ["Bagaimana jatah harian pada Budget Anak Kos dihitung?", "Uang bulananmu dikurangi dulu tabungan dan semua pengeluaran tetap; sisanya adalah ruang belanja yang dibagi 30 hari untuk jatah per hari dan diskalakan untuk jatah per minggu. Statusnya menilai jatah itu: longgar di atas kisaran aman, dan ketat bila jatah harianmu sangat kecil."],
    ["Mengapa angka Romawi dibatasi 1–3999?", "Karena angka Romawi standar tidak punya simbol untuk nol dan nilai di atas 3999 memerlukan notasi garis atas (vinculum) yang jarang dipakai dalam penomoran bab dan lampiran. Untuk keperluan dokumen mahasiswa, rentang 1–3999 sudah mencakup seluruh kebutuhan lazim."]
  ]
},
k51: {
  buka: "Simulator wawancara kerja ini melatihmu menjawab pertanyaan perilaku dengan metode STAR (Situation, Task, Action, Result) di bawah tekanan waktu: setiap pertanyaan diberi pewaktu 90 detik, meniru jatah bicara realistis di wawancara sungguhan. Kamu bisa mengambil pertanyaan acak dari semua kategori atau fokus pada satu kategori, menjawab dengan suara lantang selama pewaktu berjalan, lalu membuka kerangka STAR untuk memeriksa apakah jawabanmu memuat situasi, tugas, tindakan, dan hasil secara runtut — struktur yang dicari rekruter saat menilai pengalaman kandidat.",
  langkah: [
    "Pilih sumber pertanyaannya: 🎲 Acak Semua, atau satu kategori pertanyaan yang ingin kamu latih.",
    "Tekan 🎤 Mulai Pertanyaan dan baca pertanyaan yang muncul.",
    "Jawab dengan suara lantang sebelum pewaktu 90 detik habis — susun jawabanmu mengikuti urutan STAR selagi berbicara.",
    "Tekan 👁 Lihat Kerangka dan bandingkan: apakah jawabanmu menyebut situasinya, tugasmu, tindakanmu sendiri, dan hasilnya?",
    "Tekan ✅ Selesai — Pertanyaan Berikutnya untuk melanjutkan latihan ke soal berikutnya."
  ],
  faq: [
    ["Apa itu metode STAR dan mengapa rekruter menyukainya?", "STAR adalah kerangka jawaban pertanyaan perilaku: Situation (konteksnya), Task (tanggung jawabmu), Action (tindakan spesifik yang kamu ambil), Result (hasil terukurnya). Kerangka ini membuat jawabanmu konkret dan bisa dinilai, berbeda dengan jawaban umum seperti ‘saya pekerja keras’ tanpa bukti cerita."],
    ["Mengapa dibatasi 90 detik per jawaban?", "Karena jawaban wawancara yang efektif memang singkat: lebih dari dua menit tanpa struktur membuat pewawancara kehilangan inti ceritamu. Pewaktu 90 detik melatihmu menyampaikan satu cerita STAR secara padat dan berhenti pada hasil."]
  ]
},
/* ================= PAKET ACARA KAMPUS ================= */
twibbon: {
  buka: "Twibbon adalah bingkai foto khas kampanye dan acara kampus: foto peserta dibingkai desain resmi kegiatan, lalu dibagikan ke media sosial sebagai tanda dukungan. Tool ini menggambar bingkainya langsung di canvas 1080×1080: pilih satu dari lima template bawaan (Pita Sudut, Blok Bawah, Lingkaran Tengah, Klasik Pita, atau Diagonal) lalu ganti warna temanya, atau unggah bingkai PNG transparan buatan desainer acaramu sendiri. Setelah foto dimuat, geser dengan mouse atau jari dan atur zoom-nya sampai pas, lalu unduh hasil akhir sebagai PNG resolusi penuh yang siap diunggah ke Instagram, WhatsApp, atau TikTok.",
  langkah: [
    "Pilih bingkai dari daftar Template Bingkai, atau pilih Upload PNG Transparan lalu muat berkas bingkai dari desainer acaramu.",
    "Bila memakai template, sesuaikan Warna Tema — nama acara pada template ikut berganti saat kamu mengetik kolom Nama Acara.",
    "Tekan kolom Upload Foto Peserta dan pilih foto yang akan dipasang ke bingkai.",
    "Geser foto dengan mouse/jari untuk mengatur posisi wajah, lalu pakai slider Zoom Foto sampai komposisinya pas di dalam bingkai.",
    "Tekan tombol Download Twibbon (PNG 1080×1080) — berkas hasil akhir langsung tersimpan dan siap dibagikan."
  ],
  faq: [
    ["Bingkai dari desainer acara saya formatnya apa?", "Gunakan PNG berukuran 1080×1080 dengan bagian tengah transparan (alpha). Tool menggambar fotomu di bawah bingkai itu persis seperti aplikasi twibbon pada umumnya, dan hasil unduhannya PNG 1080×1080 penuh."],
    ["Foto saya terpotong atau terlalu kecil di dalam bingkai?", "Itu wajar karena foto menutupi seluruh kanvas (mode cover). Geser foto untuk memilih bagian yang tampil dan naikkan Zoom Foto untuk memperbesar; untuk twibbon, pastikan wajah berada di area tengah yang tidak tertutup ornamen bingkai."]
  ]
},
idcard: {
  buka: "Menjelang acara, ID card panitia selalu jadi pekerjaan mendesak: puluhan nama harus masuk kartu satu per satu. Tool ini membalik prosesnya — kamu cukup mengetik daftar nama beserta jabatan dalam format ‘Nama | Jabatan’, memilih tema (Klasik Emas, Biru Korporat, atau Hijau Alam, selaras dengan Generator Sertifikat Massal), lalu seluruh kartu ukuran standar 85,6×54 mm orientasi tegak digambar otomatis lengkap dengan lingkaran inisial nama. Kartu pertama dari daftarmu tampil sebagai pratinjau langsung. Hasilnya bisa diunduh sebagai ZIP berisi PNG per kartu, atau PDF A4 berisi banyak kartu yang tinggal dicetak, digunting, dan dimasukkan ke holder.",
  langkah: [
    "Isi Nama Acara dan Organisasi / Kepanitiaan yang akan tercetak di kepala setiap kartu.",
    "Pilih salah satu dari tiga Tema Kartu — pratinjau Kartu Pertama langsung berubah mengikuti pilihanmu.",
    "Ketik daftar panitia pada kolom Daftar Nama & Jabatan, satu orang per baris dengan format Nama | Jabatan (jabatan boleh dikosongkan).",
    "Periksa pratinjau kartu pertama; bila daftar berubah, pratinjau ikut diperbarui seketika.",
    "Tekan Download ZIP (PNG per kartu) untuk dibagikan digital, atau Download PDF A4 untuk dicetak — kartu tersusun rapi beberapa per halaman."
  ],
  faq: [
    ["Ukuran kartunya sesuai holder ID card standar?", "Ya, kartu digambar mengikuti rasio kartu standar 85,6×54 mm (seukuran kartu ATM) dalam orientasi tegak, dan pada PDF A4 ukurannya dicetak pada skala sebenarnya — gunakan pengaturan cetak 100% / ukuran aktual agar tidak menyusut."],
    ["Bisakah memakai foto asli tiap panitia, bukan inisial?", "Versi ini sengaja memakai lingkaran inisial nama agar pembuatan massal tetap satu langkah untuk puluhan orang. Bila acaramu mewajibkan foto asli, kumpulkan foto terpisah dan pasangkan manual — kebanyakan kepanitiaan kampus menerima kartu berinisial untuk keperluan identifikasi di lokasi."]
  ]
},
sertsatuan: {
  buka: "Generator Sertifikat Massal unggul untuk ratusan penerima, tetapi kadang kamu hanya butuh SATU sertifikat istimewa — untuk pemateri, juri, atau pembicara tamu — yang tata letaknya ingin kamu atur sendiri. Desainer ini adalah editor canvas lanskap rasio A4: pilih latar dari tiga tema yang sama dengan sertifikat massal (Klasik Emas, Biru Korporat, Hijau Alam) atau unggah gambar latar rancanganmu sendiri, lalu atur lima elemen teksnya — nama penerima, peran, nama acara, kota & tanggal, dan blok penandatangan. Setiap elemen bisa diklik dan digeser bebas di atas kanvas, dan ukuran serta warna hurufnya diatur dari panel. Hasil akhir diekspor sebagai PNG resolusi tinggi atau PDF A4 siap cetak.",
  langkah: [
    "Isi Nama Penerima, Peran, Nama Acara, Kota & Tanggal, serta Nama dan Jabatan Penandatangan pada kolom-kolomnya — kanvas langsung berubah.",
    "Pilih Latar Sertifikat: salah satu dari tiga tema bawaan, atau Upload Gambar Latar rancanganmu sendiri (gunakan gambar landscape sekitar 1400×990 piksel).",
    "Klik elemen teks mana pun langsung di atas sertifikat untuk memilihnya — elemen terpilih tampil dengan garis putus-putus — lalu geser ke posisi yang kamu inginkan.",
    "Atur Ukuran Huruf dengan slider dan Warna Teks dengan pemilih warna pada panel Atur Elemen Teks sampai komposisinya seimbang.",
    "Tekan Download PNG untuk berkas gambar, atau Download PDF (A4) untuk berkas siap cetak."
  ],
  faq: [
    ["Apa bedanya dengan Generator Sertifikat Massal?", "Sertifikat Massal mengolah daftar banyak penerima menjadi ZIP sertifikat bertema tetap. Desainer Satuan mengolah satu sertifikat dengan kebebasan penuh: latar gambar sendiri dan posisi tiap teks bisa digeser manual — cocok untuk sertifikat khusus seperti narasumber atau juri."],
    ["Saya mengunggah latar sendiri, mengapa judul SERTIFIKAT tidak muncul?", "Memang disengaja: pada latar unggahan sendiri, tool hanya menggambar elemen teks (nama, peran, acara, tanggal, penandatangan) di atas gambarmu, karena judul dan ornamen biasanya sudah menjadi bagian dari rancangan latar itu sendiri. Bila latar polos, pakai salah satu tema bawaan yang sudah lengkap dengan bingkai dan judul."]
  ]
},
rundown: {
  buka: "Satu tool untuk tiga dokumen yang selalu diminta setiap acara kampus. Bagian Rundown menyusun susunan acara dari baris-baris Jam–Kegiatan–Penanggung Jawab yang bisa ditambah dan dihapus bebas, lengkap dengan pratinjau tabel dan unduhan .docx. Bagian Kata Sambutan menulis naskah sambutan utuh berbahasa Indonesia yang baik untuk tiga jenis pemberi sambutan — Ketua Panitia, Ketua Organisasi, atau Pembina/Dosen — dari data acara yang sama, termasuk poin ucapan terima kasih yang kamu daftar sendiri. Bagian Naskah MC menghasilkan naskah pembawa acara dari pembuka sampai penutup, mengikuti susunan rundown-mu, dalam gaya formal atau semiformal. Ketiganya berbagi satu isian data acara, jadi kamu tidak mengetik nama acara berulang kali.",
  langkah: [
    "Isi data acara sekali di bagian atas: Nama Acara, Tema Acara, Hari/Tanggal, Tempat, dan Penyelenggara — ketiga bagian memakai data ini.",
    "Susun rundown: ubah isi tiap baris Jam, Kegiatan, dan Penanggung Jawab, tambah baris dengan tombol Tambah Baris Rundown atau hapus dengan tanda ✕; pratinjau tabel di bawahnya selalu mutakhir.",
    "Unduh rundown sebagai .docx untuk dibagikan ke panitia, atau cetak langsung dari tombol Cetak Rundown.",
    "Di bagian Kata Sambutan, pilih Jenis Sambutan dan isi nama serta jabatan pemberi sambutan dan poin ucapan terima kasih (satu per baris), lalu tekan Buat Kata Sambutan — salin atau unduh hasilnya.",
    "Di bagian Naskah MC, pilih gaya Formal atau Semiformal lalu tekan Buat Naskah MC — naskahnya menyusun kalimat peralihan mengikuti urutan rundown yang kamu buat."
  ],
  faq: [
    ["Apakah naskah sambutan dan MC-nya boleh diubah lagi?", "Tentu — keluaran tool ini adalah naskah awal yang rapi, bukan teks saklek. Setelah disalin atau diunduh sebagai dokumen, sesuaikan dengan gaya bicara pemberi sambutan dan MC-mu: tambah sapaan untuk tamu khusus, selipkan pantun, atau ubah nama yang disebut."],
    ["Mengapa rundown diunduh sebagai .docx, bukan .doc seperti tool lain?", "Rundown berisi tabel Jam–Kegiatan–Penanggung Jawab; format .docx menjaga tabel itu tetap rapi saat dibuka di Word, WPS, maupun Google Docs, termasuk saat panitia lain perlu mengedit susunannya menjelang hari-H."]
  ]
},
banneracara: {
  buka: "Banner adalah wajah pertama sebuah acara: terbentang di gerbang, panggung, dan latar foto peserta. Tool ini menggambar desain bannermu di canvas mengikuti ukuran cetak yang kamu pilih — 2×1, 3×1, 4×1, atau 1×1 meter — dengan enam tema warna dan dua gaya latar (gradasi miring beraksen lingkaran atau polos bersih). Ketik judul acara, subjudul/tema, tanggal dan tempat, serta penyelenggara; semua teks tersusun otomatis dengan ukuran huruf yang menyesuaikan panjang teks, dan logo organisasimu bisa ditempatkan di pojok bila diunggah. Ekspor PNG-nya selebar 3000 piksel — cukup tajam untuk diserahkan ke percetakan — atau sebagai PDF vektor-berbasis-gambar untuk dicetak pada ukuran sebenarnya.",
  langkah: [
    "Pilih Ukuran Banner sesuai kebutuhan cetakmu: 2×1 atau 3×1 meter untuk spanduk umum, 4×1 meter untuk backdrop panggung, 1×1 meter untuk X-banner mini atau umbul persegi.",
    "Tentukan Tema Warna dan Gaya Latar — pratinjau canvas berubah seketika setiap pilihan diganti.",
    "Isi Judul Acara (usahakan singkat dan terbaca dari jauh), Subjudul/Tema, Tanggal & Tempat, dan Penyelenggara.",
    "Bila punya logo organisasi, unggah pada kolom Logo — logo tampil di pojok kiri atas dan teks bergeser menyesuaikan.",
    "Tekan Download PNG untuk berkas gambar lebar 3000 piksel, atau Download PDF sesuai ukuran meter pilihanmu, lalu serahkan ke percetakan."
  ],
  faq: [
    ["Apakah PNG 3000 piksel cukup tajam untuk banner 4 meter?", "Untuk banner yang dilihat dari jarak beberapa meter, 3000 piksel pada sisi lebar adalah standar praktis yang diterima percetakan digital printing (setara ±19 DPI pada 4 meter) dan hasilnya tajam untuk jarak pandang normal. Bila percetakanmu meminta berkas vektor murni, gunakan desain ini sebagai acuan final untuk didesain ulang — posisikan ekspektasi sejak awal."],
    ["Judul acara saya panjang, apakah teksnya muat?", "Tool membungkus judul menjadi beberapa baris dan otomatis mengecilkan ukuran huruf bila barisnya terlalu banyak, dan subjudul serta info dibatasi dua baris. Tetap usahakan judul sesingkat mungkin — banner yang baik terbaca dalam tiga detik dari kejauhan."]
  ]
},
presensi: {
  buka: "Daftar hadir adalah bukti administratif yang selalu dilampirkan di LPJ dan laporan pertanggungjawaban acara — dan yang paling sering dibuat asal-asalan menjelang acara dimulai. Generator ini menyusun lembar presensi A4 resmi: kop berisi nama kegiatan, instansi, hari/tanggal, dan tempat; tabel bernomor berisi nama peserta beserta kolom identitas (NIM, Kelas, atau Instansi); dan kolom Tanda Tangan ganda yang diisi berselang-seling (zig-zag) persis seperti format presensi yang lazim dipakai di Indonesia, supaya peserta tidak menandatangani baris yang salah. Daftarkan nama peserta bila sudah ada, atau hasilkan lembar berisi baris kosong sejumlah yang kamu butuhkan untuk dicetak dan diisi tulis tangan di lokasi.",
  langkah: [
    "Isi Nama Kegiatan, Instansi/Organisasi, Hari/Tanggal, dan Tempat — keempatnya menjadi kop lembar presensimu.",
    "Pilih Judul Kolom Identitas: NIM untuk peserta mahasiswa, Kelas, Instansi, atau tanpa kolom identitas sama sekali.",
    "Ketik Daftar Nama Peserta satu per baris dengan format Nama | NIM bila daftarnya sudah ada; kosongkan bila ingin lembar kosong.",
    "Tentukan jumlah Baris Kosong Tambahan untuk peserta susulan yang mendaftar di tempat — pratinjau lembar langsung menunjukkan hasil akhirnya.",
    "Tekan Download PDF (A4) untuk berkas siap cetak (tabel panjang otomatis berlanjut ke halaman berikutnya), atau Cetak untuk mencetak langsung."
  ],
  faq: [
    ["Mengapa kolom tanda tangannya ada dua dan terisi bergantian?", "Itu format presensi standar Indonesia: nomor ganjil menandatangani kolom kiri, nomor genap kolom kanan. Pola zig-zag ini menghemat lebar kertas dan mengurangi salah baris saat peserta menandatangani dengan cepat di meja registrasi."],
    ["Apa bedanya dengan Daftar Hadir pada tool Generator Surat & Dokumen Kegiatan?", "Tool lama itu menghasilkan daftar hadir sederhana sebagai berkas .doc yang menyatu dengan berita acara. Generator ini khusus presensi siap cetak format A4/PDF dengan kolom tanda tangan zig-zag, pilihan kolom NIM/Kelas/Instansi, dan mode baris kosong terukur untuk dicetak sebelum nama peserta final."]
  ]
}

};
