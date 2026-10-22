try{if(localStorage.getItem("mt_theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}
;

/* ============================================================
   MahasiswaTools — katalog 55 tools + shell portal
   ============================================================ */
const CATS = [
  { k: "fav", n: "⭐ Favorit Saya" },
  { k: "all", n: "🔥 Semua Tools" },
  { k: "anti", n: "🤖 Kit Anti-AI & Keaslian" },
  { k: "tulis", n: "📝 Penulisan & Skripsi" },
  { k: "data", n: "📊 Olah Data & Penelitian" },
  { k: "present", n: "🎤 Presentasi & Sidang" },
  { k: "kelompok", n: "👥 Tugas Kelompok & KKN" },
  { k: "dokumen", n: "📄 Dokumen, PDF & Gambar" },
  { k: "karir", n: "🎓 Akademik, Karir & Harian" }
];
const CATNAME = { anti: "Kit Anti-AI & Keaslian", tulis: "Penulisan & Skripsi", data: "Olah Data & Penelitian", present: "Presentasi & Sidang", kelompok: "Tugas Kelompok & KKN", dokumen: "Dokumen, PDF & Gambar", karir: "Akademik, Karir & Harian" };

const TOOLS = [
  { id: "aidetect", n: "Pendeteksi Gaya Tulisan AI (Burstiness)", c: "anti", i: "🤖", d: "Skor risiko deteksi AI lokal: variasi kalimat, kekayaan kosakata, klise LLM + heatmap.", aktif: 1 },
  { id: "humanizer", n: "Humanizer & Editor Variasi Kalimat", c: "anti", i: "🪶", d: "Editor per kalimat + saran ritme + kamus klik-ganti 50+ kata klise AI.", aktif: 1 },
  { id: "scrubber", n: "Pembersih Jejak & Karakter Tersembunyi AI", c: "anti", i: "🧽", d: "Hapus zero-width, NBSP, markdown sisa & artefak copy-paste LLM dalam 1 klik.", aktif: 1 },
  { id: "sitasi", n: "Verifikator Keaslian Daftar Pustaka (Crossref)", c: "anti", i: "🔎", d: "Cek tiap sitasi ke Crossref: jurnal asli atau potensi halusinasi AI.", aktif: 1 },
  { id: "ceksitasi", n: "Pengecek Sitasi In-Text vs Daftar Pustaka", c: "anti", i: "🔍", d: "Cek dua arah: sitasi yang kamu kutip di teks tapi tidak ada di daftar pustaka (dan sebaliknya) langsung ketahuan.", aktif: 1 },
  { id: "deklarasi", n: "Generator Deklarasi Penggunaan AI", c: "anti", i: "📜", d: "Pernyataan etis penggunaan AI versi skripsi kampus & jurnal internasional.", aktif: 1 },
  { id: "buktiketik", n: "Editor Bukti Ketikan Mandiri (Authorship Proof)", c: "anti", i: "⌨️", d: "Rekam proses mengetikmu (ketukan, koreksi, paste) → sertifikat bukti penulisan.", aktif: 1 },
  { id: "dapus", n: "Daftar Pustaka Otomatis (APA/MLA/Harvard/Vancouver)", c: "tulis", i: "📚", d: "Format sitasi instan, italic otomatis, urut A–Z, tersimpan.", aktif: 1 },
  { id: "k16", n: "Template Makalah & Skripsi (.docx)", c: "tulis", i: "📄", d: "Dokumen Word asli margin 4-4-3-3 (OOXML via JSZip): cover sampai Bab V.", fmt: "DOCX", aktif: 1 },
  { id: "proposal", n: "Generator Proposal", c: "tulis", i: "📑", d: "Proposal penelitian/kegiatan/magang: cover berlogo, RAB otomatis, .docx asli.", fmt: "DOCX", aktif: 1 },
  { id: "similarity", n: "Pre-Turnitin Similarity Checker (Lokal)", c: "tulis", i: "🔍", d: "Jaccard 3-gram: bandingkan teks asli vs parafrase + highlight.", aktif: 1 },
  { id: "jurnal", n: "Pencari & Rak Jurnal", c: "tulis", i: "📚", d: "Cari jurnal (OpenAlex), sitasi dari DOI, rak referensi APA & BibTeX.", aktif: 1 },
  { id: "kisikisi", n: "Generator Kisi-Kisi & Operasionalisasi Variabel", c: "tulis", i: "🧩", d: "Susun tabel kisi-kisi instrumen Bab 3 (variabel–indikator–nomor item favorable/unfavorable) otomatis.", aktif: 1 },
  { id: "imrad", n: "Konverter Skripsi ke Jurnal (IMRAD)", c: "tulis", i: "📰", d: "Ubah ringkasan skripsimu (Bab 1–5) jadi draf artikel jurnal format IMRAD + cek proporsi kata ideal tiap bagian.", aktif: 1 },
  { id: "judul", n: "Generator Ide Judul Skripsi", c: "tulis", i: "💡", d: "Puluhan pola judul dari variabel X, Y, lokasi & metode.", aktif: 1 },
  { id: "singkatan", n: "Pembuat Daftar Singkatan Otomatis", c: "tulis", i: "🔤", d: "Ekstrak akronim dari naskah jadi daftar singkatan A–Z.", aktif: 1 },
  { id: "k17", n: "Matriks Sintesis Jurnal Bab 2", c: "tulis", i: "🧾", d: "Tabel perbandingan jurnal untuk tinjauan pustaka, ekspor .doc/CSV.", aktif: 1 },
  { id: "pengesahan", n: "Lembar Pengesahan & Pernyataan Bebas Plagiat", c: "tulis", i: "🖋️", d: "Buat lembar pengesahan skripsi & surat pernyataan bebas plagiat (ada kotak materai) — tinggal tanda tangan.", aktif: 1 },
  { id: "ojskit", n: "OJS Kit: Cover Letter & Matriks Reviewer Jurnal", c: "tulis", i: "✉️", d: "Siap submit jurnal: buat cover letter untuk editor OJS & matriks tanggapan reviewer dalam satu .doc.", aktif: 1 },
  { id: "bimbingan", n: "Lembar Bimbingan Skripsi", c: "tulis", i: "📔", d: "Kartu kendali konsultasi dosen, ekspor .doc berkop logo.", aktif: 1 },
  { id: "revisi", n: "Manajer Revisi Pasca-Sidang", c: "tulis", i: "🖊️", d: "Checklist revisi per penguji, progres, ekspor Lembar Revisi resmi.", aktif: 1 },
  { id: "pdffix", n: "Pembersih Teks Copy-Paste PDF", c: "tulis", i: "🧹", d: "Hapus enter terpotong & spasi ganda dari teks jurnal PDF.", aktif: 1 },
  { id: "italic", n: "Auto-Italic Kata Asing & Latin", c: "tulis", i: "🇮", d: "Deteksi kata asing/ilmiah lalu miringkan sesuai kaidah.", aktif: 1 },
  { id: "eydcase", n: "Case Converter EYD Judul", c: "tulis", i: "🔠", d: "Title Case Bahasa Indonesia: kata hubung tetap huruf kecil.", aktif: 1 },
  { id: "wordfreq", n: "Pengecek Kata Berulang (Word Frequency)", c: "tulis", i: "🔁", d: "Hitung kata yang terlalu sering diulang dalam naskahmu.", aktif: 1 },
  { id: "k21", n: "Glosarium & Singkatan Sorter (A–Z)", c: "tulis", i: "🔤", d: "Urutkan istilah A–Z, deteksi duplikat & entri tanpa definisi.", aktif: 1 },
  { id: "k18", n: "Academic Phrasebank (34+ Kalimat Akademik)", c: "tulis", i: "🗣️", d: "Bank kalimat ilmiah: argumen, kutipan, perbandingan, kesimpulan.", aktif: 1 },
  { id: "k19", n: "Generator Abstrak Dwibahasa", c: "tulis", i: "🌐", d: "Rakit abstrak ID + kerangka EN dari latar, tujuan, metode, hasil.", aktif: 1 },
  { id: "k22", n: "Generator Tabel Jurnal (Booktabs)", c: "tulis", i: "📋", d: "Tabel bersih standar jurnal tanpa garis vertikal, siap paste Word.", aktif: 1 },
  { id: "kerangkabab", n: "Generator Kerangka Bab & Sub-Bab Skripsi", c: "tulis", i: "🗂️", d: "Kerangka Bab I–V sesuai metode penelitianmu + panduan isi.", aktif: 1 },
  { id: "k20", n: "Kalkulator Target Kata & Deadline Skripsi", c: "tulis", i: "🎯", d: "Target kata per hari realistis + milestone tanggal per bab.", aktif: 1 },
  { id: "bacawaktu", n: "Kalkulator Waktu Baca Presentasi", c: "tulis", i: "⏱️", d: "Jumlah kata naskah → estimasi durasi bicara + saran potong kata.", aktif: 1 },
  { id: "gformclean", n: "Pembersih & Perapih Excel Google Form", c: "data", i: "🧹", d: "Upload hasil Google Form: header panjang jadi kode X1_1, jawaban teks jadi skor 1–5, total per variabel — unduh .xlsx siap olah.", fmt: "XLSX", aktif: 1 },
  { id: "validitas", n: "Uji Validitas Pearson & Reliabilitas Alpha", c: "data", i: "📊", d: "Korelasi butir + Cronbach's Alpha + narasi Bab 4 otomatis.", aktif: 1 },
  { id: "regresi", n: "Regresi Berganda & Uji Asumsi Klasik", c: "data", i: "📈", d: "Regresi 2–4 variabel X + VIF, Glejser, normalitas residual.", aktif: 1 },
  { id: "deskriptif", n: "Statistik Deskriptif & Distribusi Frekuensi", c: "data", i: "📊", d: "Mean, median, kuartil, tabel frekuensi & kategorisasi skor + narasi.", aktif: 1 },
  { id: "formulabldr", n: "Generator Rumus Excel Bahasa Manusia", c: "data", i: "ƒx", d: "Pilih kasus (nilai ke huruf, VLOOKUP, COUNTIFS, kategorisasi) → rumus Excel jadi, pilihan pemisah ; atau , + simulasi uji.", fmt: "XLSX", aktif: 1 },
  { id: "xlstemplate", n: "Generator Template Excel Ber-Rumus Hidup", c: "data", i: "📐", d: "Unduh .xlsx berisi rumus aktif: tabulasi kuesioner + r-hitung, kas UKM, amortisasi, rekap nilai kelas.", fmt: "XLSX", aktif: 1 },
  { id: "sampel", n: "Kalkulator Sampel (Slovin, Isaac & Lemeshow)", c: "data", i: "🧮", d: "Ukuran sampel minimal lengkap dengan rincian rumus Bab 3.", aktif: 1 },
  { id: "kuesioner", n: "Pembuat Kuesioner Penelitian", c: "data", i: "📝", d: "Susun angket Likert/PG/terbuka, ekspor .doc & teks Google Form.", aktif: 1 },
  { id: "inferens", n: "Uji Statistik Inferensial", c: "data", i: "📈", d: "Normalitas, uji-t, ANOVA, regresi + narasi Bab 4 otomatis.", aktif: 1 },
  { id: "nonpar", n: "Uji Statistik Non-Parametrik", c: "data", i: "📉", d: "Mann-Whitney, Wilcoxon, Kruskal-Wallis, Spearman + narasi Bab 4.", aktif: 1 },
  { id: "likert", n: "Konverter Skala Likert Massal", c: "data", i: "🔢", d: "Teks jawaban kuesioner ↔ skor angka 1–5 secara massal.", aktif: 1 },
  { id: "tabelstat", n: "Generator Tabel Statistik Eksak (r, t, F, χ²)", c: "data", i: "📊", d: "Nilai tabel r/t/F/χ² eksak untuk N atau df berapa pun (misal N=137) + pembanding nilai hitungmu.", aktif: 1 },
  { id: "mediasi", n: "Uji Mediasi (Sobel) & Moderasi (MRA)", c: "data", i: "💧", d: "Uji Sobel untuk mediasi + regresi moderasi (MRA) dengan diagram jalur & narasi Bab 4 otomatis.", aktif: 1 },
  { id: "k25", n: "Pembuat Bagan Kerangka Berpikir (X → Y)", c: "data", i: "🗺️", d: "Kotak variabel + panah hubungan + narasi, ekspor PNG.", aktif: 1 },
  { id: "k26", n: "Generator Grafik Bab 4 Arsiran (Batang & Pie)", c: "data", i: "📈", d: "Diagram arsiran hitam-putih, tetap jelas saat difotokopi.", aktif: 1 },
  { id: "k23", n: "Dummy Data Kuesioner Generator (Auto-Valid)", c: "data", i: "🧪", d: "Data simulasi latihan yang diverifikasi lolos Alpha target.", aktif: 1 },
  { id: "k24", n: "Pembersih Transkrip Wawancara & Analisis Teks", c: "data", i: "🎧", d: "Rapikan transkrip kualitatif + frekuensi kata narasumber.", aktif: 1 },
  { id: "koding", n: "Koding Kualitatif Transkrip", c: "data", i: "🏷️", d: "Beri kode segmen wawancara, hitung frekuensi tema, ekspor tabel.", aktif: 1 },
  { id: "consent", n: "Lembar Persetujuan Responden", c: "data", i: "🤝", d: "Informed consent etika penelitian, berkop logo, siap tanda tangan.", aktif: 1 },
  { id: "federer", n: "Kalkulator Sampel Eksperimen (Federer)", c: "data", i: "🧪", d: "Hitung sampel eksperimen (rumus Federer) + koreksi drop-out + pengacak kelompok perlakuan RAL/RAK.", aktif: 1 },
  { id: "decksidang", n: "Generator Deck PPT Sidang Skripsi (Bab 1–5)", c: "present", i: "🎓", d: "Isi terstruktur Bab 1–5 → deck .pptx 11 slide: cover berlogo, badge agenda, tabel hasil, 5 tema akademik + catatan pembicara otomatis.", fmt: "PPTX", aktif: 1 },
  { id: "pptxextract", n: "Pengekstrak Materi PPT Dosen", c: "present", i: "📤", d: "Upload .pptx dosen → rangkuman .doc, handout PDF berkollom catatan, dan kuis latihan otomatis dari isi slide.", fmt: "PPTX", aktif: 1 },
  { id: "xls2chart", n: "Konverter Data Excel ke Slide Grafik PPT", c: "present", i: "📊", d: "Tempel/upload tabel → pilih grafik (batang/garis/lingkaran) → slide .pptx dengan grafik vektor asli + tabel data.", fmt: "PPTX", aktif: 1 },
  { id: "pptxpress", n: "Kompresor Ukuran File PowerPoint", c: "present", i: "🗜️", d: "Kecilkan .pptx bengkak: gambar di-downscale & dikompresi ulang via canvas, teks & animasi utuh — siap upload SIAKAD/LMS.", fmt: "PPTX", aktif: 1 },
  { id: "k27", n: "Outline Makalah ke PowerPoint (.pptx)", c: "present", i: "🖥️", d: "Poin makalah → file presentasi .pptx asli per bab.", fmt: "PPTX", aktif: 1 },
  { id: "teleprompter", n: "Teleprompter & Timer Sidang", c: "present", i: "🎤", d: "Teks berjalan otomatis + estimasi kata per menit.", aktif: 1 },
  { id: "k28", n: "Simulasi Pertanyaan Penguji Sidang (18+ Soal)", c: "present", i: "🎓", d: "Bank soal jebakan penguji + kerangka jawaban + timer.", aktif: 1 },
  { id: "tanyajawab", n: "Prediksi Pertanyaan Sidang dari Abstrak", c: "present", i: "🎯", d: "Tempel abstrak skripsimu — keluar daftar pertanyaan yang paling mungkin ditanya penguji + kerangka cara menjawabnya.", aktif: 1 },
  { id: "k46", n: "Mind Map Generator (SVG Radial)", c: "present", i: "🧠", d: "Topik + sub-topik → peta konsep bercabang warna, unduh PNG.", aktif: 1 },
  { id: "k47", n: "Kuis Pilihan Ganda & Flashcard Otomatis", c: "present", i: "🎯", d: "Catatan → kuis berpengecoh otomatis + flashcard bolak-balik.", aktif: 1 },
  { id: "k48", n: "Cornell Notes Generator", c: "present", i: "📓", d: "Catatan metode Cornell: isyarat, catatan, ringkasan.", aktif: 1 },
  { id: "k49", n: "Pomodoro Timer + Suara Fokus Web Audio", c: "present", i: "🍅", d: "Timer 25/5 + white/brown noise & hujan prosedural.", aktif: 1 },
  { id: "k29", n: "Roda Undian Urutan Presentasi", c: "present", i: "🎡", d: "Spin wheel pengundi giliran kelompok presentasi.", aktif: 1 },
  { id: "k55", n: "Flashcard Cetak (Duplex A4)", c: "present", i: "🃏", d: "Lembar A4 depan–belakang tercermin, siap cetak & gunting.", aktif: 1 },
  { id: "cloze", n: "Generator Soal Rumpang (Cloze)", c: "present", i: "✏️", d: "Soal isian titik-titik otomatis dari teks materi + kunci.", aktif: 1 },
  { id: "k35", n: "Generator Sertifikat Massal (ZIP)", c: "kelompok", i: "🏆", d: "Sertifikat untuk banyak nama sekaligus: ZIP PNG atau PDF.", aktif: 1 },
  { id: "k31", n: "Logbook Harian Magang / KKN", c: "kelompok", i: "📓", d: "Catatan harian formal, ekspor .doc berkop paraf & DPL.", aktif: 1 },
  { id: "kelompok", n: "Smart Group Generator (Pengacak Adil)", c: "kelompok", i: "👥", d: "Bagi nama ke kelompok merata, seimbang gender bila ditandai.", aktif: 1 },
  { id: "splitter", n: "Splitter Kas & Patungan Kelompok", c: "kelompok", i: "💸", d: "Hitung patungan + siapa transfer ke siapa agar impas.", aktif: 1 },
  { id: "lpj", n: "LPJ & Kas Kegiatan UKM", c: "kelompok", i: "🧾", d: "Realisasi anggaran vs RAB + sisa dana, ekspor LPJ resmi.", aktif: 1 },
  { id: "k32", n: "Kwitansi & Nota LPJ Ber-Terbilang", c: "kelompok", i: "🧾", d: "Kwitansi canvas resmi, angka otomatis jadi terbilang.", aktif: 1 },
  { id: "k30", n: "Pencari Jadwal Kosong Bersama", c: "kelompok", i: "🗓️", d: "Irisan jam kosong seluruh anggota tanpa login.", aktif: 1 },
  { id: "peerassess", n: "Peer-Assessment & Kontribusi Kelompok", c: "kelompok", i: "⚖️", d: "Hitung kontribusi tiap anggota kelompok dari penilaian antar-teman — ketahuan siapa yang free-rider.", aktif: 1 },
  { id: "prorata", n: "Splitter Tagihan Kos Pro-Rata", c: "kelompok", i: "🧾", d: "Bagi tagihan kos (listrik/WiFi/air) adil menurut hari huni & beban alat elektronik tiap kamar.", aktif: 1 },
  { id: "hadir", n: "Daftar Hadir & Berita Acara", c: "kelompok", i: "🖊️", d: "Daftar hadir siap cetak & berita acara kegiatan resmi.", aktif: 1 },
  { id: "k33", n: "Gantt Chart & Matriks Proker KKN", c: "kelompok", i: "📅", d: "Linimasa program kerja mingguan, ekspor PNG.", aktif: 1 },
  { id: "k34", n: "Bagan Struktur Organisasi Posko KKN", c: "kelompok", i: "🏛️", d: "Hierarki posko/desa dari pembina sampai divisi, PNG.", aktif: 1 },
  { id: "k36", n: "Desain Plang Jalan & Edukasi Desa (Bonus)", c: "kelompok", i: "🪧", d: "Desain plang canvas 4 tema untuk program fisik KKN.", aktif: 1 },
  { id: "pdfsign", n: "Penanda Tangan & Stempel PDF", c: "dokumen", i: "✍️", d: "Gambar tanda tangan di layar, tambah stempel/materai, letakkan di halaman PDF yang dipilih, unduh PDF final.", fmt: "PDF", aktif: 1 },
  { id: "pdforg", n: "Pengatur Ulang, Pemutar & Penghapus Halaman PDF", c: "dokumen", i: "📑", d: "Lihat thumbnail semua halaman: putar yang miring, geser urutan, hapus yang kosong — unduh PDF rapi.", fmt: "PDF", aktif: 1 },
  { id: "pdftab2xls", n: "Ekstraktor Tabel PDF ke Excel", c: "dokumen", i: "🧾", d: "Tarik tabel dari PDF (laporan BEI, publikasi BPS) jadi .xlsx; angka format Indonesia/akuntansi dibersihkan jadi numerik asli.", fmt: "PDF", aktif: 1 },
  { id: "xlsmerger", n: "Penggabung Banyak File Excel / CSV", c: "dokumen", i: "🗂️", d: "Gabung banyak file: tumpuk baris jadi 1 sheet master, atau satukan jadi 1 workbook multi-tab.", fmt: "XLSX", aktif: 1 },
  { id: "xls2pdf", n: "Konverter Excel ke PDF Siap Cetak (Fit-Page)", c: "dokumen", i: "🖨️", d: "Tabel Excel jadi PDF yang 100% pas 1 lebar halaman A4/F4 — tanpa kolom kanan terpotong, header berulang tiap halaman.", fmt: "XLSX", aktif: 1 },
  { id: "bibtex", n: "Konverter Sitasi BibTeX/RIS ↔ APA/IEEE", c: "dokumen", i: "🔄", d: "Ubah file sitasi BibTeX/RIS (Mendeley/Zotero) jadi daftar pustaka APA/IEEE/Vancouver — dan sebaliknya.", aktif: 1 },
  { id: "poster", n: "Pembuat Poster Ilmiah Seminar/PKM", c: "dokumen", i: "🖼️", d: "Buat poster ilmiah seminar/PKM resolusi tinggi: abstrak, metode, temuan, QR code — unduh PNG siap cetak.", aktif: 1 },
  { id: "k37", n: "Pas Foto & Ganti Background", c: "dokumen", i: "🖼️", d: "Background merah #DB1514 / biru #0054A6, ukuran 300 DPI.", aktif: 1 },
  { id: "k43", n: "Penggabung PDF (Merger)", c: "dokumen", i: "🔗", d: "Gabungkan banyak PDF berkas jadi satu file utuh.", fmt: "PDF", aktif: 1 },
  { id: "splitpdf", n: "Ekstrak Halaman PDF Tertentu", c: "dokumen", i: "✂️", d: "Ambil halaman pilihan (mis. 1-3,5) dari PDF besar.", aktif: 1 },
  { id: "imgpdf", n: "Konverter Gambar ke PDF", c: "dokumen", i: "🖨️", d: "Kumpulan foto dokumen → satu PDF A4 rapi per halaman.", fmt: "PDF", aktif: 1 },
  { id: "k44", n: "Kompresor File (Gambar / PDF / DOCX)", c: "dokumen", i: "🗜️", d: "Perkecil gambar, PDF, dan .docx langsung di browser.", aktif: 1 },
  { id: "pdfstamp", n: "Nomor Halaman & Watermark PDF", c: "dokumen", i: "🔢", d: "Beri nomor halaman & cap watermark pada PDF yang di-upload.", fmt: "PDF", aktif: 1 },
  { id: "k41", n: "Generator QR Code Permanen (+ Logo)", c: "dokumen", i: "🔳", d: "QR link kuesioner ECC-H, bisa sisip logo di tengah.", aktif: 1 },
  { id: "k42", n: "OCR Gambar Buku / Catatan ke Teks", c: "dokumen", i: "🔍", d: "Foto halaman → teks bisa copy (Tesseract.js, ID/EN).", aktif: 1 },
  { id: "k39", n: "Grid Foto Dokumentasi Lampiran", c: "dokumen", i: "🧩", d: "Banyak foto + caption → satu gambar lampiran rapi.", aktif: 1 },
  { id: "k40", n: "Timestamp & Geotagging Foto", c: "dokumen", i: "🕒", d: "Tempel waktu & lokasi ala kamera lapangan ke foto tugas.", aktif: 1 },
  { id: "k38", n: "Pembuat Tanda Tangan Transparan PNG", c: "dokumen", i: "✍️", d: "Buang latar kertas via luminansi → PNG transparan.", aktif: 1 },
  { id: "k53", n: "CV ATS-Friendly Builder + Skor Struktural", c: "karir", i: "📄", d: "CV 1 kolom aman ATS + skor cek struktur instan.", aktif: 1 },
  { id: "k50", n: "Pembuat Surat Resmi & Motivation Letter", c: "karir", i: "✉️", d: "15 jenis surat: izin penelitian, UKT, cuti, sponsorship, undangan, rekomendasi, kuasa, dll.", aktif: 1 },
  { id: "chatdosen", n: "Generator Chat & Surat Izin Dosen (Bonus)", c: "karir", i: "💬", d: "Template chat sopan ke dosen + surat izin resmi.", aktif: 1 },
  { id: "ipk", n: "Simulator Target IPK (GPA Planner)", c: "karir", i: "🎓", d: "Proyeksi IP semester depan untuk target cumlaude.", aktif: 1 },
  { id: "transkrip", n: "Kalkulator IPK Transkrip & Cek Cum Laude", c: "karir", i: "🎓", d: "Tempel nilai mata kuliahmu — keluar IPK, IPS per semester, predikat kelulusan, dan cek syarat cum laude.", aktif: 1 },
  { id: "targetnilai", n: "Kalkulator Target Nilai Mata Kuliah", c: "karir", i: "🎯", d: "Hitung nilai UAS minimal untuk target A/B/C dari bobot penilaian.", aktif: 1 },
  { id: "k45", n: "Wallpaper Jadwal Kuliah / KRS (Bonus)", c: "karir", i: "📱", d: "Jadwal kuliah jadi wallpaper HP 1080×1920.", aktif: 1 },
  { id: "k54", n: "Checklist Syarat Yudisium & Sidang", c: "karir", i: "✅", d: "14+ syarat kelulusan, progres tersimpan otomatis.", aktif: 1 },
  { id: "k52", n: "Kalender Akademik & Pengingat Deadline (Bonus)", c: "karir", i: "📆", d: "Kalender + hitung mundur H-x + ekspor .ics.", aktif: 1 },
  { id: "masastudi", n: "Kalkulator Sisa Masa Studi & Risiko DO", c: "karir", i: "⏳", d: "Hitung sisa SKS & sisa semestermu: tempo minimal per semester supaya lulus tepat waktu — dan seberapa besar risiko DO-mu.", aktif: 1 },
  { id: "sks", n: "Konverter SKS MBKM / Kampus Merdeka", c: "karir", i: "🔄", d: "Konversi jam magang/KKN/studi independen ke penyetaraan SKS.", aktif: 1 },
  { id: "biaya", n: "Kalkulator Target Biaya Kuliah", c: "karir", i: "🎯", d: "Total sisa biaya kuliah jadi target tabungan per bulan.", aktif: 1 },
  { id: "combo55", n: "Budget Anak Kos + Terbilang & Romawi", c: "karir", i: "💰", d: "Jatah aman makan harian + konverter terbilang & angka Romawi.", aktif: 1 },
  { id: "k51", n: "Simulasi Wawancara Kerja (Metode STAR)", c: "karir", i: "🤝", d: "Latihan wawancara + timer 90 detik + kerangka STAR.", aktif: 1 }
];

/* ---------------- state & helper ---------------- */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { if (typeof toast === "function") toast("⚠️ Penyimpanan browser penuh — data terakhir mungkin tidak tersimpan. Segera Backup Data di footer."); } }
};
let favs = new Set(store.get("mt_favs", []));
let curCat = "all", curQuery = "", curTool = null;
function saveFavs() { store.set("mt_favs", [...favs]); }
function toast(msg) { const t = $("#toast"); t.textContent = msg; t.style.opacity = "1"; clearTimeout(t._h); t._h = setTimeout(() => t.style.opacity = "0", 2600); }
async function copyText(txt, msg) {
  try { await navigator.clipboard.writeText(txt); toast(msg || "Berhasil disalin ✅"); return true; }
  catch (e) {
    const ta = document.createElement("textarea"); ta.value = txt; document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); toast(msg || "Berhasil disalin ✅"); } catch (e2) { toast("Gagal menyalin — salin manual ya."); }
    ta.remove(); return false;
  }
}
function download(name, content, mime) {
  const blob = content instanceof Blob ? content : new Blob([content], { type: mime || "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = "MahasiswaTools_" + name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  toast("File MahasiswaTools_" + name + " diunduh ⬇️");
}
function field(label, inner, hint) {
  return '<label class="block mb-4"><span class="block text-sm font-bold mb-1.5">' + label + '</span>' + inner + (hint ? '<span class="block text-xs text-slate-500 dark:text-slate-400 mt-1">' + hint + "</span>" : "") + "</label>";
}
const IN = "w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 dark:text-slate-100 px-3 py-2.5 text-sm outline-none focus:ring-4 ring-indigo-500/15 focus:border-indigo-500 transition";
const BTN = "inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-semibold px-4 py-2.5 transition shadow-sm";
const BTN2 = "inline-flex items-center gap-1.5 rounded-lg bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 border border-slate-300 dark:border-slate-600 text-[13px] font-semibold px-4 py-2.5 transition";
const OUT = "mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 dark:text-slate-100 p-4 text-sm";
function outBox(id) { return '<div id="' + id + '"></div>'; }

/* ---------------- tema ---------------- */
function toggleTheme() {
  const dark = document.documentElement.classList.toggle("dark");
  store.set("mt_theme", dark ? "dark" : "light");
}

/* ---------------- tabs & grid ---------------- */
function renderTabs() {
  if (!$("#catTabs")) return;
  $("#catTabs").innerHTML = CATS.map((c) => {
    const count = c.k === "fav" ? favs.size : c.k === "all" ? TOOLS.length : TOOLS.filter((t) => t.c === c.k).length;
    const on = curCat === c.k;
    return '<button onclick="setCat(\'' + c.k + '\')" class="shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition border ' + (on ? "bg-indigo-600 text-white border-indigo-600 shadow-sm" : "bg-white dark:bg-slate-900 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600") + '">' + c.n + ' <span class="opacity-70 font-semibold">' + count + "</span></button>";
  }).join("");
}
function setCat(k) { curCat = k; hideRoadmap(); renderTabs(); renderGrid(); if (typeof loadCat === "function" && CATNAME[k]) loadCat(k); }
const MONO = { aidetect: "DA", humanizer: "HU", scrubber: "PJ", sitasi: "VK", deklarasi: "DK", buktiketik: "BK", k16: "TS", dapus: "DP", k17: "MS", k18: "PB", k19: "AB", k20: "TK", k21: "GL", k22: "TJ", pdffix: "PT", italic: "AI", eydcase: "EY", similarity: "SM", wordfreq: "WF", bacawaktu: "WB", kerangkabab: "KB", validitas: "UV", likert: "LK", sampel: "SP", k23: "DD", k24: "TW", k26: "GB", k25: "XY", k27: "PP", teleprompter: "TP", k28: "PU", k46: "MM", k47: "PG", k48: "CN", k49: "PM", k29: "RU", k55: "FC", kelompok: "KG", splitter: "SK", k30: "JK", k31: "LB", k32: "KW", k33: "GC", k34: "SO", k35: "ST", k36: "PL", k37: "PF", k38: "TT", k39: "GF", k40: "TG", k41: "QR", k42: "OC", k43: "MP", k44: "KF", imgpdf: "IP", splitpdf: "EP", k53: "CV", k50: "ML", k51: "WK", ipk: "IPK", k54: "YD", targetnilai: "TN", revisi: "RV", singkatan: "DS", lpj: "LP", regresi: "RB", sks: "SK", bimbingan: "LB", deskriptif: "SD", pdfstamp: "WM", nonpar: "NP", consent: "IC", koding: "KQ", judul: "GJ", hadir: "DH", biaya: "TB", cloze: "CL", inferens: "US", kuesioner: "KU", jurnal: "JU", proposal: "PR", combo55: "55", k52: "KA", k45: "WP", chatdosen: "CD", imrad: "IM", ojskit: "OJ", tabelstat: "RT", mediasi: "MD", kisikisi: "KK", federer: "FD", bibtex: "BX", poster: "PI", pengesahan: "LP", peerassess: "PA", prorata: "SB", tanyajawab: "PS", ceksitasi: "CS", masastudi: "DO", transkrip: "TR" };
function monoOf(t) { return MONO[t.id] || t.n.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase(); }
/* ---------- ikon SVG per tool (Opsi 1: tile lembut warna kategori, pilihan detta 2026-10-21) ---------- */
const ICONS = {
/* data */
validitas: '<path d="M4 20V11M10 20V5M16 20v-6"/><path d="M2.5 20h19"/><path d="M14.8 5.2l2 2 3.7-3.7"/>',
sampel: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.1" fill="currentColor"/>',
kuesioner: '<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4a3 3 0 0 1 6 0M9 11h6M9 15.5h4"/>',
regresi: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
inferens: '<path d="M12 3.5c2.8 0 3.3 6.5 5.7 9.7 1.2 1.6 2 2.8 3.3 2.8H3c1.3 0 2.1-1.2 3.3-2.8C8.7 10 9.2 3.5 12 3.5z"/><path d="M12 9v11.5"/>',
deskriptif: '<path d="M5 20v-6M11 20V6M17 20v-9"/><path d="M2.5 20h19"/>',
nonpar: '<path d="M6.5 4v12.5M6.5 16.5L4 13.5M6.5 16.5L9 13.5M17.5 20V7.5M17.5 7.5L15 10.5M17.5 7.5L20 10.5"/>',
likert: '<path d="M4 8h9.5M19.5 8H21M4 16h3.5M13.5 16H21"/><circle cx="16.5" cy="8" r="2.3"/><circle cx="10.5" cy="16" r="2.3"/>',
tabelstat: '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M3 9.3h18M3 14.6h18M9 4v16M15 4v16"/>',
mediasi: '<circle cx="5" cy="6" r="2.4"/><circle cx="19" cy="6" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M7.4 6h9.2M6.2 8.1l4.1 7.5M17.8 8.1l-4.1 7.5"/>',
k25: '<rect x="2.5" y="5" width="7" height="6" rx="1"/><rect x="14.5" y="5" width="7" height="6" rx="1"/><rect x="8.5" y="15" width="7" height="6" rx="1"/><path d="M9.5 8h5M12 11v4"/>',
k26: '<path d="M4 20v-7M8.5 20V6"/><path d="M2.5 20h19"/><circle cx="16.5" cy="8.5" r="4.6"/><path d="M16.5 3.9v4.6l3.4 2.2"/>',
k23: '<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
k24: '<rect x="9" y="2.5" width="6" height="11.5" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/>',
koding: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5"/>',
consent: '<path d="M6 2h8l4 4v16H6z"/><path d="M14 2v4h4"/><path d="M9 15.5l2 2 4-4.2"/>',
federer: '<path d="M10 2.5h4M10.6 2.5v5.3L5.2 17.7A2.3 2.3 0 0 0 7.3 21h9.4a2.3 2.3 0 0 0 2.1-3.3L13.4 7.8V2.5"/><path d="M7.6 14h8.8"/>',
/* tulis */
dapus: '<path d="M12 6.5C10.6 4.8 8 4.3 4 4.3v13.9c4 0 6.6.5 8 2.2 1.4-1.7 4-2.2 8-2.2V4.3c-4 0-6.6.5-8 2.2v13.7"/>',
k16: '<path d="M6 2h8l4 4v16H6z"/><path d="M14 2v4h4M9.5 12h5M9.5 16h5"/>',
proposal: '<rect x="8" y="8" width="12.5" height="13" rx="1.5"/><path d="M5 15.5H4.3A1.8 1.8 0 0 1 2.5 13.7V4.8A1.8 1.8 0 0 1 4.3 3h10.2"/>',
similarity: '<path d="M17 4.5L7 19.5"/><circle cx="7.2" cy="7.2" r="2.4"/><circle cx="16.8" cy="16.8" r="2.4"/>',
jurnal: '<path d="M4 4.5h13.5V19H4z"/><path d="M17.5 9H20v8.5a2 2 0 0 1-2 2"/><path d="M7 8.5h7M7 12h7M7 15.5h4"/>',
kisikisi: '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M3 9.5h18M9.5 4v16M15 9.5V20"/>',
imrad: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M7 7h10M7 11h4.5M7 15h4.5M13.5 11H18M13.5 15H18M7 19h11"/>',
judul: '<path d="M9.6 18h4.8M10.6 21h2.8"/><path d="M12 3a6 6 0 0 1 3.4 10.9c-.6.5-.9 1-1 2.1H9.6c-.1-1.1-.4-1.6-1-2.1A6 6 0 0 1 12 3z"/>',
singkatan: '<path d="M3.5 17.5L8 5.5l4.5 12M5.2 13.8h5.6"/><path d="M14 17.5h6.8L14 9h6.3"/>',
k17: '<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>',
pengesahan: '<path d="M9.7 10.3a2.4 2.4 0 1 1 4.6 0c.3 1.9 1.6 2.6 1.6 4.2H8.1c0-1.6 1.3-2.3 1.6-4.2z"/><path d="M4.5 21h15M4.5 17.3h15V21h-15z"/>',
ojskit: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 7.2L12 13l8.5-5.8"/>',
bimbingan: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M8.5 3v4M15.5 3v4"/><path d="M8.6 16.4l2.2 2.2 4.3-4.3"/>',
revisi: '<path d="M9.5 6H20M9.5 12H20M9.5 18H20"/><path d="M3.4 6l1.1 1.1L6.2 5.2M3.4 12l1.1 1.1 1.7-1.9M3.4 18l1.1 1.1 1.7-1.9"/>',
pdffix: '<path d="M4 6h13M4 11h9.5"/><path d="M14.5 16.8H20M17.2 14l2.8 2.8-2.8 2.8"/><path d="M4 17.5c2-1 4 1 6 0"/>',
italic: '<path d="M11 4.5h7.5M5.5 19.5H13M14.8 4.5l-4.8 15"/>',
eydcase: '<path d="M3.5 17.5L8.2 5.8l4.7 11.7M5.2 13.8h6"/><path d="M13.8 17.5l3.4-7.6 3.4 7.6M14.9 14.9h4.6"/>',
wordfreq: '<path d="M4 20V9.5M9.3 20V4M14.6 20v-7.5M19.9 20V7"/><path d="M2 20h20"/>',
k21: '<path d="M12 6.5C10.6 4.8 8 4.3 4 4.3v13.9c4 0 6.6.5 8 2.2 1.4-1.7 4-2.2 8-2.2V4.3c-4 0-6.6.5-8 2.2"/><path d="M17.8 20.5l2.4 2.4M20.4 15.8a3.3 3.3 0 1 0 .1 0z"/>',
k18: '<path d="M20.5 11.8a8 8 0 0 1-11.7 7.1L3.5 20.5l1.6-5.3A8 8 0 1 1 20.5 11.8z"/><path d="M8.2 8h2.6v2.8c0 2-1 3.3-2.4 3.9M13.9 8h2.6v2.8c0 2-1 3.3-2.4 3.9"/>',
k19: '<path d="M4 5.5h8.5M8.2 3.5v2c0 3.6-1.8 6.4-4.7 8M5.8 9c1.3 2.3 3.6 4.2 6.2 5.2"/><path d="M13 20.5l4.3-9.7 4.3 9.7M14.6 16.8h5.4"/>',
k22: '<path d="M3 4.5h18M3 19.5h18"/><path d="M3 9.3h18M3 14.7h18" opacity=".5"/><path d="M6 11.8h4M14 11.8h4"/>',
kerangkabab: '<path d="M10 5.5h10.5M10 12h10.5M10 18.5h10.5"/><circle cx="5" cy="5.5" r="1.6"/><circle cx="5" cy="12" r="1.6"/><circle cx="5" cy="18.5" r="1.6"/><path d="M5 7.1v3.3"/>',
k20: '<path d="M5.5 21.5v-17"/><path d="M5.5 4.8H18l-2.6 3.7L18 12.2H5.5"/>',
bacawaktu: '<circle cx="12" cy="12" r="8.8"/><path d="M12 7v5.2l3.4 2"/>',
/* anti */
aidetect: '<path d="M12 2.8l7 2.8v5.2c0 4.8-3.4 8-7 9.4-3.6-1.4-7-4.6-7-9.4V5.6z"/><path d="M8.8 11.8l2.2 2.2 4.2-4.4"/>',
humanizer: '<path d="M20.2 3.8C14.5 3.4 8.6 6.9 6.7 13.4L4 20l1.4.6z"/><path d="M20.2 3.8c.7 5.6-2.1 11-7.4 13.4M7.2 16.8c2-4.4 5.4-7.4 9.8-8.9"/>',
scrubber: '<path d="M5.5 15.2L14.7 6a2 2 0 0 1 2.8 0l1.9 1.9a2 2 0 0 1 0 2.8L13 17H7.8z"/><path d="M9 21h11.5M5.5 15.2L3.8 17a1.8 1.8 0 0 0 1.3 3h4.4"/>',
sitasi: '<circle cx="12" cy="12" r="9"/><path d="M8.4 12.3l2.5 2.5 4.7-5"/>',
ceksitasi: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="M20.3 20.3l-4.9-4.9"/><path d="M8.2 10.8l1.9 1.9 3.4-3.4"/>',
deklarasi: '<path d="M3.8 18.8c2.4-5.6 4.3 1.4 6.8-2.6 1.3-2 3-.9 3 .9 0 1.6 2 1.6 3.1.2"/><path d="M3 21.3h18"/>',
buktiketik: '<rect x="2.5" y="6" width="19" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9.2 14h5.6" stroke-linecap="round"/>',
/* karir */
k53: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10.8" r="2.4"/><path d="M5.7 17.3c.6-1.8 1.8-2.7 3.3-2.7s2.7.9 3.3 2.7M15 9.3h4M15 12.8h4M15 16.3h2.6"/>',
k50: '<path d="M6 2.8h9L19.5 7v13.7H6z"/><path d="M14.8 2.8V7h4.7"/><circle cx="15.3" cy="15.8" r="2.2"/><path d="M14.2 17.6l-.7 2.7 1.9-1.1 1.8 1.1-.7-2.7"/>',
chatdosen: '<path d="M20.8 11.3a8.6 8.6 0 0 1-12.5 7.6L3 20.8l1.9-5.3a8.6 8.6 0 1 1 15.9-4.2z"/><path d="M8.3 10.3h7.4M8.3 13.6h4.2"/>',
ipk: '<path d="M4.5 15a7.8 7.8 0 1 1 15 0"/><path d="M12 15l4.3-4.3"/><path d="M2.8 19h18.4"/>',
transkrip: '<path d="M2.5 9.3L12 4.8l9.5 4.5L12 13.8z"/><path d="M6.2 11.3v4.5c0 1.6 2.6 3 5.8 3s5.8-1.4 5.8-3v-4.5M21.5 9.3v5.2"/>',
targetnilai: '<circle cx="12" cy="12" r="8.6"/><circle cx="12" cy="12" r="4.6"/><path d="M12 2.6v3M12 18.4v3M2.6 12h3M18.4 12h3"/>',
k45: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M10.4 5h3.2M9.8 10h4.4M9.8 13.5h4.4M9.8 17h2.8"/>',
k54: '<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4a3 3 0 0 1 6 0"/><path d="M8.8 15.8l2.2 2.2 4.2-4.5"/>',
k52: '<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M7.2 14.6h.01M11 14.6h.01M14.8 14.6h.01M7.2 17.9h.01M11 17.9h.01" stroke-linecap="round"/>',
masastudi: '<path d="M6 2.8h12M6 21.2h12"/><path d="M7.6 2.8v3.4c0 2.1 1.9 2.9 3.1 4.1-1.2 1.2-3.1 2-3.1 4.1v3.4M16.4 2.8v3.4c0 2.1-1.9 2.9-3.1 4.1 1.2 1.2 3.1 2 3.1 4.1v3.4"/>',
sks: '<path d="M3.5 8h13.5M13.8 4.3L17.5 8l-3.7 3.7M20.5 16H7M10.2 12.3L6.5 16l3.7 3.7"/>',
biaya: '<rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10h18M16.5 15h.01" stroke-linecap="round"/>',
combo55: '<rect x="5" y="2.8" width="14" height="18.4" rx="2"/><path d="M8.5 6.8h7"/><path d="M8.5 11.8h.01M12 11.8h.01M15.5 11.8h.01M8.5 15.3h.01M12 15.3h.01M15.5 15.3h.01" stroke-linecap="round"/>',
k51: '<circle cx="10" cy="7.8" r="3.4"/><path d="M3.8 20c.8-3.3 3.1-5.1 6.2-5.1 1.4 0 2.7.4 3.7 1.2"/><rect x="14" y="13" width="7" height="6.2" rx="1.4"/><path d="M15.7 13v-1.1a1.8 1.8 0 0 1 1.8-1.8 1.8 1.8 0 0 1 1.8 1.8V13"/>',
/* dokumen */
bibtex: '<path d="M6.8 3.5V17M6.8 17L3.5 13.7M6.8 17l3.3-3.3M17.2 20.5V7M17.2 7l-3.3 3.3M17.2 7l3.3 3.3"/>',
poster: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M21 16.5l-5-5-9 9"/>',
k37: '<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M6.4 19.2c1-2.9 3-4.2 5.6-4.2s4.6 1.3 5.6 4.2"/>',
k43: '<circle cx="6" cy="5" r="2.3"/><circle cx="6" cy="19" r="2.3"/><circle cx="18" cy="12" r="2.3"/><path d="M6 7.3v9.4M7.9 6.3c3 1.7 5.1 3.2 7.9 4.6"/>',
splitpdf: '<circle cx="6" cy="6" r="2.3"/><circle cx="6" cy="18" r="2.3"/><path d="M7.9 7.9L20 19M7.9 16.1L20 5"/>',
imgpdf: '<rect x="3" y="4" width="13.5" height="12" rx="2"/><circle cx="7.6" cy="8.6" r="1.5"/><path d="M16.5 13.5L13 10l-6.5 6.5"/><path d="M18 15.5v5.5M15.2 18.2l2.8 2.8 2.8-2.8"/>',
k44: '<path d="M9.8 3.8L3.8 9.8M3.8 3.8v6h6M14.2 20.2l6-6M20.2 14.2v6h-6"/>',
pdfstamp: '<path d="M9.2 3L7.2 21M16.8 3l-2 18M4 8.2h17M3 15.8h17"/>',
k41: '<rect x="3.5" y="3.5" width="7" height="7" rx="1"/><rect x="13.5" y="3.5" width="7" height="7" rx="1"/><rect x="3.5" y="13.5" width="7" height="7" rx="1"/><path d="M13.5 13.5h3v3h-3zM20.5 13.5h.01M13.5 20.5h.01M17.2 17.2h3.3v3.3h-3.3z" stroke-linecap="round"/>',
k42: '<path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16"/><path d="M7.5 9.8h9M7.5 13.4h6"/>',
k39: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M12 3.5V12M3.5 12H12M12 12h8.5M12 12v8.5M3.5 12v8.5"/>',
k40: '<path d="M4 7.5h2.8l2-2.5h6.4l2 2.5H20a1.5 1.5 0 0 1 1.5 1.5v9.5A1.5 1.5 0 0 1 20 20H4a1.5 1.5 0 0 1-1.5-1.5V9A1.5 1.5 0 0 1 4 7.5z"/><circle cx="12" cy="13.8" r="3.4"/>',
k38: '<path d="M4 20l1.2-4.2L16.6 4.4a2.1 2.1 0 0 1 3 3L8.2 18.8z"/><path d="M14.6 6.4l3 3M3 21.5h18"/>',
/* present */
k27: '<rect x="3" y="3.8" width="18" height="12.2" rx="1.5"/><path d="M12 16v2.8M8 21.2l4-2.4 4 2.4"/><path d="M7 12.2l3.2-3.2 2.4 2L16 7.8"/>',
teleprompter: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M10.4 8.4l4.6 2.8-4.6 2.8z"/><path d="M9.5 20.8h5M12 17v3.8"/>',
k28: '<circle cx="12" cy="12" r="9"/><path d="M9.4 9.4a2.7 2.7 0 1 1 2.6 3v1"/><path d="M12 17.2h.01" stroke-width="2.8" stroke-linecap="round"/>',
tanyajawab: '<path d="M20.8 11.3a8.6 8.6 0 0 1-12.5 7.6L3 20.8l1.9-5.3a8.6 8.6 0 1 1 15.9-4.2z"/><path d="M9.7 9.3a2.4 2.4 0 1 1 2.3 2.8v.8"/><path d="M12 16.4h.01" stroke-width="2.8" stroke-linecap="round"/>',
k46: '<circle cx="12" cy="12" r="2.6"/><circle cx="5" cy="5.5" r="1.9"/><circle cx="19" cy="5.5" r="1.9"/><circle cx="5" cy="18.5" r="1.9"/><circle cx="19" cy="18.5" r="1.9"/><path d="M10.3 10.3L6.7 7.1M13.7 10.3l3.6-3.2M10.3 13.7l-3.6 3.2M13.7 13.7l3.6 3.2"/>',
k47: '<rect x="3.5" y="6" width="15" height="13.5" rx="2"/><path d="M7.5 6V5A2 2 0 0 1 9.5 3h9A2 2 0 0 1 20.5 5v9.5a2 2 0 0 1-2 2h-.5"/><path d="M7.8 11h6.5M7.8 14.8h4"/>',
k48: '<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M10.5 3v13.5M5 16.5h14"/>',
k49: '<circle cx="12" cy="13" r="7.6"/><path d="M12 9.4V13l2.6 1.9M9.6 2.8h4.8M12 2.8v2.6"/>',
k29: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="1.7"/><path d="M12 3v7.3M12 13.7V21M3 12h7.3M13.7 12H21"/>',
k55: '<path d="M7 8V3.5h10V8"/><rect x="4" y="8" width="16" height="8" rx="2"/><path d="M7 13.5h10V21H7z"/>',
cloze: '<path d="M5 6h14M5 12h5.5M16.8 12H19M5 18h14"/><rect x="11.6" y="9.6" width="4.2" height="4.8" rx="1"/>',
/* kelompok */
k35: '<circle cx="12" cy="9" r="5.5"/><path d="M8.8 13.4L7 21l5-2.6L17 21l-1.8-7.6"/><path d="M9.8 9l1.6 1.6L14.6 7.4"/>',
k31: '<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M7 14h4.5M7 17.5h7"/>',
kelompok: '<circle cx="9" cy="8" r="3.5"/><path d="M2.8 20c.5-3.4 3-5.4 6.2-5.4s5.7 2 6.2 5.4M15.7 5a3.5 3.5 0 0 1 0 6M17.8 14.9c2 .7 3.2 2.4 3.5 5.1"/>',
splitter: '<circle cx="12" cy="12" r="9"/><path d="M12 3v9l6.6 5.6M12 12L5.2 17.2"/>',
lpj: '<path d="M5 3h14v18l-2.3-1.5L14.3 21l-2.3-1.5L9.7 21 7.4 19.5 5 21z"/><path d="M8.5 8h7M8.5 12h7"/>',
k32: '<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.9"/><path d="M6 9.6h.01M18 14.4h.01" stroke-linecap="round"/>',
k30: '<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/><circle cx="12" cy="15.2" r="2.7"/><path d="M12 13.7v1.5l1.1 1"/>',
peerassess: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5 1.2 0 2.3.3 3.2.8"/><path d="M14.3 17.6l2 2 3.9-3.9"/>',
prorata: '<path d="M12 3.5V21M8 21h8"/><path d="M12 3.5L5.8 5.9M12 3.5l6.2 2.4"/><path d="M3.3 13.2l2.5-6 2.5 6a3 3 0 0 1-5 0zM15.7 13.2l2.5-6 2.5 6a3 3 0 0 1-5 0z"/>',
hadir: '<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4a3 3 0 0 1 6 0"/><circle cx="12" cy="12.3" r="2"/><path d="M8.7 18.4c.7-1.5 1.9-2.2 3.3-2.2s2.6.7 3.3 2.2"/>',
k33: '<path d="M4 3.5V20.5h16.5"/><path d="M7.5 7.5h6.5M10.5 11.8h8M8 16.2h5"/>',
k34: '<rect x="9" y="2.8" width="6" height="4.6" rx="1"/><rect x="2.8" y="16.6" width="6" height="4.6" rx="1"/><rect x="9" y="16.6" width="6" height="4.6" rx="1"/><rect x="15.2" y="16.6" width="6" height="4.6" rx="1"/><path d="M12 7.4v3.1M5.8 10.5h12.4M5.8 10.5v6.1M12 10.5v6.1M18.2 10.5v6.1"/>',
k36: '<path d="M12 21V9.5"/><path d="M5 3.8h13.2L15.6 6.4l2.6 2.6H5z"/><path d="M3.8 21h16.4"/>'
};
console.log(Object.keys(ICONS).length);
function iconOf(t) { const p = ICONS[t.id]; if (!p) return '<span style="font-weight:800;font-size:13px">' + monoOf(t) + "</span>"; return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + "</svg>"; }
function paintTic(el, t) { if (el && t) el.classList.add("tic-" + t.c); }
function paintTics() { document.querySelectorAll(".tic").forEach((el) => { if (/tic-(anti|tulis|data|present|kelompok|dokumen|karir)/.test(el.className)) return; const host = el.closest("[onclick]"); if (!host) return; const m = /openTool\('([^']+)'\)/.exec(host.getAttribute("onclick") || ""); if (!m) return; const t = TOOLS.find((x) => x.id === m[1]); if (t) el.classList.add("tic-" + t.c); }); }
/* pewarnaan tile ikon setelah render daftar */
if (typeof renderGrid === "function") { const _rgI = renderGrid; renderGrid = function () { _rgI(); paintTics(); }; }
if (typeof renderRecent === "function") { const _rrI = renderRecent; renderRecent = function () { _rrI(); paintTics(); }; }
if (typeof showRoadmap === "function") { const _srI = showRoadmap; showRoadmap = function () { _srI(); paintTics(); }; }

/* ---------------- tampilan grid/ringkas, recent, peta jalan ---------------- */
let viewMode = store.get("mt_view", "bento"); if (!["bento", "periodik", "situasi"].includes(viewMode)) viewMode = "bento";
let roadmapOn = false;
function toolRow(t) {
  const fav = favs.has(t.id);
  return '<article class="relative flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-3 cursor-pointer transition hover:border-slate-300 dark:hover:border-slate-600" onclick="openTool(\'' + t.id + '\')">'
    + '<div class="tic tic-sm shrink-0">' + iconOf(t) + "</div>"
    + '<div class="flex-1 min-w-0"><h3 class="font-bold text-[13.5px] leading-tight truncate text-slate-900 dark:text-white">' + esc(t.n) + "</h3>"
    + '<p class="text-[12px] text-slate-500 dark:text-slate-400 truncate mt-0.5">' + esc(t.d) + "</p></div>"
    + fmtBadge(t)
    + '<span class="text-[10.5px] font-semibold text-slate-400 dark:text-slate-500 hidden md:block shrink-0">' + CATNAME[t.c] + "</span>"
    + '<button onclick="event.stopPropagation();toggleFav(\'' + t.id + '\')" title="Pin ke Favorit" class="shrink-0 w-7 h-7 grid place-items-center ' + (fav ? "text-amber-500" : "text-slate-300 dark:text-slate-600 hover:text-amber-500") + ' transition">' + (fav ? "★" : "☆") + "</button></article>";
}
const FMT_CLS = { XLSX: "text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/40", PPTX: "text-orange-700 bg-orange-100 dark:text-orange-300 dark:bg-orange-900/40", PDF: "text-rose-700 bg-rose-100 dark:text-rose-300 dark:bg-rose-900/40", DOCX: "text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/40" };
function fmtBadge(t, big) { if (!t.fmt) return ""; return '<span class="font-extrabold tracking-wide rounded-md ' + (big ? "text-[11px] px-2 py-1" : "text-[9.5px] px-1.5 py-0.5") + " " + (FMT_CLS[t.fmt] || "") + '">' + t.fmt + "</span>"; }
function setView(v) { viewMode = v; store.set("mt_view", v); syncViewBtns(); renderGrid(); }
function syncViewBtns() {
  const map = { bento: "#viewBentoBtn", periodik: "#viewPeriodikBtn", situasi: "#viewSituasiBtn" };
  const base = "text-[11.5px] font-semibold px-2.5 py-1.5 rounded-lg border transition ";
  const on = "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white";
  const off = "bg-white text-slate-500 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700";
  Object.entries(map).forEach(([k, sel]) => { const el = $(sel); if (el) el.className = base + (viewMode === k ? on : off); });
  document.querySelectorAll("[data-dockmode]").forEach((el) => { el.classList.toggle("dock-on", el.dataset.dockmode === viewMode); });
}
function scrollToGrid() { const el = $("#catTabs"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }
function quickSearch(q) { const inp = $("#searchInput"); if (inp) inp.value = q; curQuery = q; hideRoadmap(); renderGrid(); scrollToGrid(); }
function pushRecent(id) {
  let r = store.get("mt_recent", []); if (!Array.isArray(r)) r = [];
  r = [id].concat(r.filter((x) => x !== id)).slice(0, 6);
  store.set("mt_recent", r); renderRecent();
}
function renderRecent() {
  const sec = $("#recentSec"), row = $("#recentRow"); if (!sec || !row) return;
  const r = store.get("mt_recent", []); if (!Array.isArray(r)) return;
  const items = r.map((id) => TOOLS.find((t) => t.id === id)).filter(Boolean);
  if (!items.length) { sec.classList.add("hidden"); return; }
  sec.classList.remove("hidden");
  row.innerHTML = items.map((t) => '<button onclick="openTool(\'' + t.id + '\')" class="shrink-0 flex items-center gap-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-2 pr-3.5 py-2 text-left hover:border-slate-300 dark:hover:border-slate-600 transition"><span class="tic tic-sm">' + iconOf(t) + '</span><span class="min-w-0"><span class="block text-[12.5px] font-bold leading-tight max-w-[160px] truncate text-slate-800 dark:text-slate-100">' + esc(t.n) + '</span><span class="block text-[10.5px] text-slate-400 mt-0.5">' + CATNAME[t.c] + "</span></span></button>").join("");
}
const ROADMAP = [
  { t: "Tahap 1 — Cari Ide & Proposal (Bab 1–3)", d: "Tentukan judul, kumpulkan jurnal, susun matriks & kerangka berpikir, hitung sampel, dan buat proposalnya.", ids: ["judul", "jurnal", "k17", "k25", "sampel", "kuesioner", "proposal"] },
  { t: "Tahap 2 — Olah Data & Pembahasan (Bab 4–5)", d: "Konversi data mentah, uji instrumen, jalankan analisis utama, dan buat grafik untuk Bab 4.", ids: ["likert", "deskriptif", "validitas", "regresi", "nonpar", "k26"] },
  { t: "Tahap 3 — Cek Keaslian & Rapikan Format", d: "Pastikan naskah orisinal, sitasi asli, dan format dokumen rapi sebelum dikumpulkan ke pembimbing.", ids: ["aidetect", "humanizer", "sitasi", "dapus", "singkatan", "pdfstamp"] },
  { t: "Tahap 4 — Persiapan Sidang & Pasca-Sidang", d: "Siapkan slide dan latihan menjawab penguji; setelah sidang urus revisi, yudisium, sampai CV untuk melamar kerja.", ids: ["k27", "k28", "teleprompter", "bimbingan", "revisi", "k54", "k37", "k53"] }
];
function showRoadmap() {
  const v = $("#roadmapView"); if (!v) return;
  roadmapOn = true;
  v.innerHTML = '<div class="flex items-center gap-3 mb-4"><span class="text-[22px]">🧭</span><div><h2 class="font-extrabold text-lg leading-tight">Peta Jalan Skripsi</h2><p class="text-[12.5px] text-slate-500 dark:text-slate-400">Empat tahap dari Bab 1 sampai sidang — klik tool untuk langsung membukanya.</p></div><button onclick="hideRoadmap();renderGrid()" class="ml-auto text-[12px] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 shrink-0">✕ Tutup</button></div>'
    + ROADMAP.map((s, idx) => '<div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 mb-3.5"><div class="flex items-center gap-3"><span class="w-8 h-8 rounded-full bg-indigo-600 text-white grid place-items-center font-extrabold text-sm shrink-0">' + (idx + 1) + '</span><h3 class="font-bold text-[15px]">' + s.t + '</h3></div><p class="text-[13px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">' + s.d + '</p><div class="flex flex-wrap gap-2 mt-3.5">' + s.ids.map((id) => { const t = TOOLS.find((x) => x.id === id); if (!t) return ""; return '<button onclick="openTool(\'' + id + '\')" class="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-full pl-1.5 pr-3 py-1.5 text-[12.5px] font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-500 transition"><span class="tic tic-xs">' + iconOf(t) + "</span>" + esc(t.n) + "</button>"; }).join("") + "</div></div>").join("");
  v.classList.remove("hidden");
  const g = $("#grid"); if (g) g.classList.add("hidden");
  const gi = $("#gridInfo"); if (gi) gi.classList.add("hidden");
  const ge = $("#gridEmpty"); if (ge) ge.classList.add("hidden");
  v.scrollIntoView({ behavior: "smooth", block: "start" });
}
function hideRoadmap() {
  if (!roadmapOn) return;
  roadmapOn = false;
  const v = $("#roadmapView"); if (v) v.classList.add("hidden");
  const g = $("#grid"); if (g) g.classList.remove("hidden");
  const gi = $("#gridInfo"); if (gi) gi.classList.remove("hidden");
}

function toolCard(t) {
  const fav = favs.has(t.id);
  return '<article class="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 cursor-pointer transition duration-200 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-[0_12px_28px_-8px_rgba(79,70,229,0.12)] hover:-translate-y-0.5" onclick="openTool(\'' + t.id + '\')">'
    + '<button onclick="event.stopPropagation();toggleFav(\'' + t.id + '\')" title="Pin ke Favorit" class="absolute top-3 right-3 w-8 h-8 grid place-items-center text-lg ' + (fav ? "text-amber-500" : "text-slate-300 dark:text-slate-600 hover:text-amber-500") + ' transition">' + (fav ? "★" : "☆") + "</button>"
    + '<div class="tic mb-3.5">' + iconOf(t) + "</div>"
    + '<h3 class="font-bold text-[15px] leading-snug pr-5 text-slate-900 dark:text-white">' + esc(t.n) + "</h3>"
    + '<p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">' + esc(t.d) + "</p>"
    + '<div class="mt-4 flex items-center gap-2">'
    + '<span class="text-[10px] font-bold tracking-wide text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 rounded-full px-2 py-0.5">● AKTIF</span>'
    + fmtBadge(t)
    + '<span class="text-[11px] font-semibold text-slate-400 dark:text-slate-500">' + CATNAME[t.c] + "</span></div></article>";
}
function renderGrid() {
  if (!$("#grid")) return;
  let list = TOOLS.slice();
  if (curCat === "fav") list = list.filter((t) => favs.has(t.id));
  else if (curCat !== "all") list = list.filter((t) => t.c === curCat);
  if (curQuery) { const q = curQuery.toLowerCase(); list = list.filter((t) => (t.n + " " + t.d + " " + CATNAME[t.c]).toLowerCase().includes(q)); }
  list.sort((a, b) => (favs.has(b.id) - favs.has(a.id)) || ((b.aktif || 0) - (a.aktif || 0)));
  const cardFn = viewMode === "list" ? toolRow : toolCard;
  const wrapCls = viewMode === "list" ? "flex flex-col gap-2" : "grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5";
  if (curCat === "all" && !curQuery && viewMode === "bento") { $("#grid").innerHTML = renderBento(list); }
  else if (curCat === "all" && !curQuery && viewMode === "periodik") { $("#grid").innerHTML = renderPeriodik(list); }
  else if (curCat === "all" && !curQuery && viewMode === "situasi") { $("#grid").innerHTML = renderSituasi(list); }
  else if (curCat === "all" && !curQuery) {
    $("#grid").innerHTML = CATS.filter((c) => c.k !== "fav" && c.k !== "all").map((c) => {
      const items = list.filter((t) => t.c === c.k);
      if (!items.length) return "";
      return '<div class="mb-9"><div class="flex items-center gap-3 mb-3"><h2 class="text-[13px] font-bold tracking-wide text-slate-700 dark:text-slate-200">' + c.n + '</h2><span class="text-[11px] font-bold text-slate-400">' + items.length + ' tool</span><span class="flex-1 h-px bg-slate-200 dark:bg-slate-800"></span></div><div class="' + wrapCls + '">' + items.map(cardFn).join("") + "</div></div>";
    }).join("");
  } else {
    $("#grid").innerHTML = '<div class="' + wrapCls + '">' + list.map(cardFn).join("") + "</div>";
  }
  $("#gridEmpty").classList.toggle("hidden", list.length > 0);
  $("#gridInfo").textContent = curCat === "fav" && !favs.size ? "Belum ada favorit — klik ikon ☆ pada kartu tool untuk mem-pin di sini." : (curCat === "all" && !curQuery && viewMode === "bento" ? " 🧩 Mode Bento: 7 rak kategori — 3 flagship tampil besar, sisanya pill yang bisa digeser ↔ atau dibentangkan. Tanpa scroll panjang!" : curCat === "all" && !curQuery && viewMode === "periodik" ? " 🧪 Mode Tabel Periodik: " + TOOLS.length + " unsur dalam 1 layar — arahkan/ketuk unsur untuk inspeksi, klik ke-2 / tombol Buka untuk menjalankan." : curCat === "all" && !curQuery && viewMode === "situasi" ? " 🧭 Mode Meja Situasi: pilih situasimu, kerjakan tool-nya berurutan langkah demi langkah." : "Menampilkan " + list.length + " dari " + TOOLS.length + " tools" + (curQuery ? ' untuk pencarian "' + curQuery + '"' : "") + ". Semua tool berstatus AKTIF dan siap dipakai.");
}

/* ===== SMART ACADEMIC OS: Bento Swimlanes, Tabel Periodik, Meja Situasi, Dock, Dropzone ===== */
const CAT_ACCENT = { anti: "#E11D48", tulis: "#2563EB", data: "#059669", present: "#D97706", kelompok: "#7C3AED", dokumen: "#0284C7", karir: "#4F46E5" };
function pillHTML(t) {
  return '<button onclick="openTool(\'' + t.id + '\')" class="shrink-0 flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full pl-1.5 pr-3 py-1.5 text-[12.5px] font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-500 transition snap-start"><span class="tic tic-xs">' + iconOf(t) + "</span>" + esc(t.n) + (t.fmt ? ' <span class="text-[8.5px] font-extrabold px-1 py-px rounded ' + (FMT_CLS[t.fmt] || "") + '">' + t.fmt + "</span>" : "") + "</button>";
}
function renderBento(list) {
  return CATS.filter((c) => c.k !== "fav" && c.k !== "all").map((c) => {
    const items = list.filter((t) => t.c === c.k);
    if (!items.length) return "";
    const flag = items.slice(0, 3), rest = items.slice(3);
    return '<section class="mb-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-4 sm:p-5">'
      + '<div class="flex items-center gap-2.5 mb-3.5"><span class="w-2.5 h-2.5 rounded-full shrink-0" style="background:' + CAT_ACCENT[c.k] + '"></span><h2 class="text-[14px] font-extrabold tracking-wide text-slate-800 dark:text-slate-100">' + c.n + '</h2><span class="text-[11px] font-bold text-slate-400">' + items.length + ' tool</span><span class="flex-1 h-px bg-slate-200 dark:bg-slate-800"></span>'
      + (rest.length ? '<button onclick="laneScroll(\'' + c.k + '\',-1)" class="w-7 h-7 grid place-items-center rounded-full border border-slate-300 dark:border-slate-700 text-slate-500 hover:bg-white dark:hover:bg-slate-800 transition" title="Geser kiri">‹</button><button onclick="laneScroll(\'' + c.k + '\',1)" class="w-7 h-7 grid place-items-center rounded-full border border-slate-300 dark:border-slate-700 text-slate-500 hover:bg-white dark:hover:bg-slate-800 transition" title="Geser kanan">›</button>' : "")
      + '</div>'
      + '<div class="grid sm:grid-cols-3 gap-3.5">' + flag.map(toolCard).join("") + '</div>'
      + (rest.length ? '<div id="lane-' + c.k + '" class="flex gap-2 overflow-x-auto pb-1.5 mt-3.5 noscroll snap-x">' + rest.map(pillHTML).join("") + '</div>'
        + '<button id="laneBtn-' + c.k + '" onclick="laneExpand(\'' + c.k + '\')" class="mt-2 text-[12px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline">▾ Bentangkan Semua ' + items.length + ' Tool ' + c.n.replace(/^[^A-Za-z]+/, "") + '</button>'
        + '<div id="laneAll-' + c.k + '" class="hidden grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-3.5">' + items.map(toolCard).join("") + '</div>' : "")
      + '</section>';
  }).join("");
}
function laneScroll(cat, dir) { const el = document.getElementById("lane-" + cat); if (el) el.scrollBy({ left: dir * 340, behavior: "smooth" }); }
function laneExpand(cat) {
  const box = document.getElementById("laneAll-" + cat), btn = document.getElementById("laneBtn-" + cat);
  if (!box) return;
  const openNow = box.classList.toggle("hidden");
  if (btn) btn.textContent = openNow ? btn.textContent.replace("▴ Tutup", "▾ Bentangkan") : btn.textContent.replace(/▾ Bentangkan Semua \d+ Tool/, "▴ Tutup");
  if (!openNow) paintTics();
}
let ptSel = null;
function ptInspectorHTML(t) {
  if (!t) return '<p class="text-sm text-slate-400">Arahkan kursor / ketuk satu unsur untuk menginspeksinya di sini.</p>';
  return '<div class="flex items-start gap-3.5"><span class="tic shrink-0">' + iconOf(t) + '</span><div class="min-w-0 flex-1"><div class="flex items-center gap-2 flex-wrap"><h3 class="font-extrabold text-[16px] text-slate-900 dark:text-white leading-tight">' + esc(t.n) + '</h3>' + fmtBadge(t, 1) + '</div>'
    + '<p class="text-[11px] font-bold tracking-wide mt-0.5" style="color:' + CAT_ACCENT[t.c] + '">' + CATNAME[t.c].toUpperCase() + " • UNSUR #" + (TOOLS.indexOf(t) + 1) + '</p>'
    + '<p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">' + esc(t.d) + '</p></div>'
    + '<button onclick="openTool(\'' + t.id + '\')" class="shrink-0 bg-indigo-600 hover:bg-indigo-500 text-white text-[13px] font-bold px-4 py-2.5 rounded-xl transition">🚀 Buka Tool</button></div>';
}
function renderPeriodik(list) {
  if (!ptSel || !list.some((t) => t.id === ptSel)) ptSel = list[0] ? list[0].id : null;
  const sel = list.find((t) => t.id === ptSel);
  return '<section class="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">'
    + '<div id="ptInspector" class="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 px-4 py-3.5 mb-4 min-h-[86px]">' + ptInspectorHTML(sel) + '</div>'
    + '<div class="pgrid">' + list.map((t) => { const n = TOOLS.indexOf(t) + 1; return '<button class="ptile pt-' + t.c + (t.id === ptSel ? " pt-on" : "") + '" data-pt="' + t.id + '" title="' + esc(t.n) + '" onmouseenter="ptHover(\'' + t.id + '\')" onclick="ptTap(\'' + t.id + '\')"><span class="pt-num">' + n + '</span><span class="pt-mono">' + monoOf(t) + '</span>' + (t.fmt ? '<span class="pt-fmt">' + t.fmt + '</span>' : "") + '</button>'; }).join("") + '</div>'
    + '<div class="flex flex-wrap gap-x-3 gap-y-1.5 mt-3.5">' + CATS.filter((c) => c.k !== "fav" && c.k !== "all").map((c) => '<span class="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400"><span class="w-2.5 h-2.5 rounded" style="background:' + CAT_ACCENT[c.k] + '"></span>' + c.n.replace(/^[^A-Za-z]+/, "") + '</span>').join("") + '</div>'
    + '</section>';
}
function ptHover(id) { const t = TOOLS.find((x) => x.id === id); const box = document.getElementById("ptInspector"); if (t && box) box.innerHTML = ptInspectorHTML(t); paintTic(box ? box.querySelector(".tic") : null, t); }
function ptTap(id) { if (ptSel === id) { openTool(id); return; } ptSel = id; document.querySelectorAll(".ptile").forEach((el) => el.classList.toggle("pt-on", el.dataset.pt === id)); ptHover(id); }
const SITUATIONS = [
  { e: "🔥", n: "Kebut Bab 1–3 & Proposal", d: "Dari judul sampai proposal siap diajukan ke pembimbing.", ids: ["judul", "kisikisi", "proposal", "dapus", "k16"] },
  { e: "📊", n: "Olah Data Kuesioner & Bab 4", d: "Alur SPSS killer: bersihkan → uji → regresi → mediasi → grafik.", ids: ["gformclean", "validitas", "regresi", "mediasi", "xls2chart"] },
  { e: "🤖", n: "Sterilisasi AI & Cek Jurnal", d: "Pastikan naskahmu aman dari jejak AI dan sitasi halusinasi.", ids: ["aidetect", "humanizer", "scrubber", "sitasi", "similarity", "dapus"] },
  { e: "🎤", n: "Persiapan Sempro & Sidang", d: "Deck otomatis, latihan ditanya penguji, sampai revisi beres.", ids: ["decksidang", "tanyajawab", "teleprompter", "revisi", "k27"] },
  { e: "📄", n: "Beresin File PDF, Excel & PPT", d: "Segitiga Emas: tanda tangan, atur halaman, ekstrak, konversi.", ids: ["pdfsign", "pdforg", "pptxextract", "xls2pdf", "pdftab2xls"] },
  { e: "⛺", n: "Urusan KKN, Kelompok & UKM", d: "Logbook, proposal & RAB, LPJ, kwitansi, sertifikat, absensi.", ids: ["k31", "proposal", "lpj", "k32", "k35", "hadir"] },
  { e: "🎓", n: "Persiapan Yudisium & Karir", d: "Pas foto, ceklis yudisium, IPK, CV ATS, sampai wawancara.", ids: ["k37", "k54", "transkrip", "k53", "k50", "k51"] }
];
let sitIdx = 0;
function setSituasi(i) { sitIdx = i; renderGrid(); }
function renderSituasi() {
  const sit = SITUATIONS[sitIdx];
  const chips = '<div class="flex gap-2 overflow-x-auto pb-2 mb-4 noscroll">' + SITUATIONS.map((x2, i) => '<button onclick="setSituasi(' + i + ')" class="shrink-0 px-3.5 py-2 rounded-full text-[12.5px] font-bold border transition ' + (i === sitIdx ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900" : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300") + '">' + x2.e + " " + x2.n + "</button>").join("") + "</div>";
  const steps = sit.ids.map((id, i) => { const t = TOOLS.find((x) => x.id === id); if (!t) return ""; return (i ? '<div class="self-center text-slate-300 dark:text-slate-600 font-black text-lg shrink-0 px-0.5">→</div>' : "")
    + '<button onclick="openTool(\'' + id + '\')" class="relative shrink-0 w-[218px] text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-lg transition"><span class="absolute -top-2.5 left-3 text-[10px] font-extrabold tracking-wide bg-indigo-600 text-white rounded-full px-2 py-0.5">LANGKAH ' + (i + 1) + '</span><span class="tic tic-sm mb-2">' + iconOf(t) + '</span><span class="block font-bold text-[13.5px] leading-snug text-slate-900 dark:text-white">' + esc(t.n) + '</span><span class="block text-[12px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">' + esc(t.d) + "</span>" + (t.fmt ? '<span class="block mt-2">' + fmtBadge(t) + "</span>" : "") + "</button>"; }).join("");
  return chips + '<section class="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-4 sm:p-5"><h3 class="font-extrabold text-[16px]">' + sit.e + " " + sit.n + '</h3><p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1 mb-4">' + sit.d + ' Kerjakan berurutan dari Langkah 1 — klik kartu untuk membuka tool-nya.</p><div class="flex gap-2 overflow-x-auto pb-2 pt-2 noscroll">' + steps + "</div></section>";
}
function mtDockInit() {
  if (document.getElementById("mtDock") || !document.getElementById("grid")) return;
  const d = document.createElement("div");
  d.id = "mtDock";
  d.className = "fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 bg-slate-900/90 dark:bg-white/95 backdrop-blur-md rounded-full pl-2 pr-2 py-1.5 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.45)]";
  const btn = "flex flex-col items-center gap-px px-3 py-1 rounded-full text-[15px] leading-none transition ";
  const lbl = "text-[9px] font-bold tracking-wide";
  d.innerHTML = '<button class="' + btn + 'text-slate-200 dark:text-slate-600" data-dockmode="bento" onclick="setView(\'bento\');window.scrollTo({top:0,behavior:\'smooth\'})">🏠<span class="' + lbl + '">Bento</span></button>'
    + '<button class="' + btn + 'text-slate-200 dark:text-slate-600" data-dockmode="periodik" onclick="setView(\'periodik\');scrollToGrid()">🧪<span class="' + lbl + '">Periodik</span></button>'
    + '<button class="' + btn + 'text-slate-200 dark:text-slate-600" onclick="showRoadmap()">🧭<span class="' + lbl + '">Peta</span></button>'
    + '<button class="' + btn + 'text-slate-200 dark:text-slate-600" onclick="setCat(\'fav\');scrollToGrid()">⭐<span class="' + lbl + '">Favorit</span></button>'
    + '<button class="' + btn + 'text-slate-200 dark:text-slate-600" onclick="focusSearch()">🔍<span class="' + lbl + '">Cari</span></button>';
  document.body.appendChild(d);
  document.body.style.paddingBottom = "84px";
  syncViewBtns();
}
function dzHandleFile(f) {
  if (!f) return;
  const ext = (f.name.split(".").pop() || "").toLowerCase();
  const box = document.getElementById("dzResult");
  const act = (label, id) => '<button onclick="openTool(\'' + id + '\')" class="text-[12.5px] font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-3.5 py-2 transition">' + label + "</button>";
  let acts = null;
  if (["xlsx", "xls", "csv"].includes(ext)) acts = [["🧹 Bersihkan GForm", "gformclean"], ["🖨️ Ubah ke PDF Anti-Potong", "xls2pdf"], ["📊 Buat Grafik PPT", "xls2chart"], ["🧪 Uji Validitas", "validitas"], ["📈 Regresi", "regresi"]];
  else if (ext === "pptx") acts = [["📤 Ekstrak jadi Catatan/Kuis", "pptxextract"], ["🗜️ Kompres Ukuran PPTX", "pptxpress"], ["🎓 Buat Deck Sidang", "decksidang"]];
  else if (ext === "pdf") acts = [["✍️ Tanda Tangan & Stempel", "pdfsign"], ["🧾 Ekstrak Tabel ke Excel", "pdftab2xls"], ["📑 Putar/Urutkan Halaman", "pdforg"], ["🔢 Nomor Halaman & Watermark", "pdfstamp"], ["🧩 Gabung PDF", "k43"]];
  else if (["bib", "ris"].includes(ext)) { openTool("bibtex"); toast("File ." + ext + " terdeteksi — Konverter Sitasi BibTeX/RIS dibuka."); return; }
  if (!acts) { toast("Format ." + ext + " belum didukung dropzone — coba .xlsx, .pptx, .pdf, atau .bib ya."); return; }
  if (box) { box.classList.remove("hidden"); box.innerHTML = '<p class="text-[13px] text-slate-300 mb-2.5">📄 <b class="text-white">' + esc(f.name) + '</b> (' + ext.toUpperCase() + ') — mau diapakan? Klik aksi, lalu upload file-nya di dalam tool:</p><div class="flex flex-wrap gap-2">' + acts.map((a) => act(a[0], a[1])).join("") + "</div>"; box.scrollIntoView({ behavior: "smooth", block: "center" }); }
}
function dzInit() {
  const z = document.getElementById("dropZone"); if (!z || z.dataset.init) return; z.dataset.init = "1";
  const stop = (e) => { e.preventDefault(); e.stopPropagation(); };
  ["dragenter", "dragover"].forEach((ev) => z.addEventListener(ev, (e) => { stop(e); z.classList.add("dz-on"); }));
  ["dragleave", "drop"].forEach((ev) => z.addEventListener(ev, (e) => { stop(e); z.classList.remove("dz-on"); }));
  z.addEventListener("drop", (e) => { const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]; dzHandleFile(f); });
  z.addEventListener("click", () => { const inp = document.getElementById("dzFile"); if (inp) inp.click(); });
  const inp = document.getElementById("dzFile");
  if (inp) inp.addEventListener("change", () => { dzHandleFile(inp.files[0]); inp.value = ""; });
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => { mtDockInit(); dzInit(); }) : (mtDockInit(), dzInit());

function toggleFav(id) {
  if (favs.has(id)) { favs.delete(id); toast("Dihapus dari Favorit"); } else { favs.add(id); toast("Dipin ke Favorit ⭐"); }
  saveFavs(); renderTabs(); renderGrid();
  if (curTool === id) syncWsFav();
}
function focusSearch() { const i = $("#searchInput"); i.focus(); i.scrollIntoView({ behavior: "smooth", block: "center" }); }
const _si = $("#searchInput"); if (_si) _si.addEventListener("input", (e) => { curQuery = e.target.value.trim(); hideRoadmap(); renderGrid(); });
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); focusSearch(); }
  if (e.key === "Escape") closeWS();
});

/* ---------------- workspace modal ---------------- */
function openTool(id) {
  const t = TOOLS.find((x) => x.id === id); if (!t) return;
  curTool = id;
  pushRecent(id);
  $("#wsIcon").innerHTML = iconOf(t); paintTic($("#wsIcon"), t); $("#wsTitle").textContent = t.n; $("#wsDesc").textContent = t.d;
  syncWsFav();
  const showPanel = () => {
    $("#wsWrap").classList.remove("hidden");
    try { history.replaceState(null, "", "#" + id); } catch (e) {}
    document.body.style.overflow = "hidden";
    const p = $("#wsPanel"); p.style.opacity = "0"; p.style.transform = "translateY(14px)";
    requestAnimationFrame(() => { p.style.opacity = "1"; p.style.transform = "none"; });
  };
  if (t.aktif && !UI[id] && typeof loadCat === "function") {
    const body = $("#wsBody");
    body.innerHTML = '<div class="text-center py-10 fadein"><div class="text-4xl mb-3 animate-pulse">⏳</div><p class="font-bold text-sm">Memuat tool…</p><p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5">Partisi kategori ini dimuat sekali saja — berikutnya instan.</p></div>';
    showPanel();
    loadCat(t.c).then((ok) => {
      if (curTool !== id) return;
      if (ok) fillToolBody(id);
      else body.innerHTML = '<div class="text-center py-8 fadein"><p class="font-bold">⚠️ Gagal memuat tool.</p><p class="text-sm text-slate-500 dark:text-slate-400 mt-2">Periksa koneksi internetmu, lalu tutup dan buka lagi tool ini.</p></div>';
    });
    return;
  }
  fillToolBody(id);
  showPanel();
}
function fillToolBody(id) {
  const t = TOOLS.find((x) => x.id === id); if (!t) return;
  const body = $("#wsBody"); if (!body) return;
  if (t.aktif && UI[id]) UI[id](body);
  else {
    body.innerHTML = '<div class="text-center py-8 fadein"><div class="text-6xl mb-4">' + t.i + '</div>'
      + '<span class="text-[11px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 rounded-full px-3 py-1">📚 MASUK KATALOG — TAHAP BERIKUTNYA</span>'
      + '<p class="mt-4 text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">' + esc(t.d) + '</p>'
      + '<p class="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">Tool ini sudah terdaftar resmi di katalog MahasiswaTools dan akan diaktifkan pada tahap pengembangan berikutnya. Pin ke favorit agar tidak ketinggalan saat rilis.</p>'
      + '<button class="mt-6 ' + BTN + '" onclick="toggleFav(\'' + t.id + '\')">' + (favs.has(t.id) ? "★ Sudah di Favorit" : "⭐ Pin ke Favorit Saya") + "</button></div>";
  }
}
function syncWsFav() { $("#wsFav").textContent = favs.has(curTool) ? "★" : "☆"; $("#wsFav").style.color = favs.has(curTool) ? "#F59E0B" : ""; }
const _wf = $("#wsFav"); if (_wf) _wf.addEventListener("click", () => { if (curTool) toggleFav(curTool); });
function closeWS() {
  if ($("#wsWrap").classList.contains("hidden")) return;
  if (typeof window._teleStop === "function") window._teleStop();
  $("#wsWrap").classList.add("hidden");
  document.body.style.overflow = "";
  curTool = null;
}
const _wsc = $("#wsScrim"); if (_wsc) _wsc.addEventListener("click", closeWS);
const _wsWrapEl = $("#wsWrap");
if (_wsWrapEl) _wsWrapEl.addEventListener("click", (e) => { if (!e.target.closest("#wsPanel")) closeWS(); });
const UI = {};

;

/* ============================================================
   TOOLS 1–5
   ============================================================ */
function parseMatrix(text) {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length);
  if (!lines.length) return null;
  const rows = lines.map((l) => l.includes("\t") ? l.split("\t") : l.includes(";") ? l.split(";") : l.includes(",") ? l.split(",") : l.split(/\s+/));
  const isNum = (v) => v !== "" && !isNaN(Number(String(v).replace(",", ".")));
  let header = null, data = rows;
  if (rows.length > 1 && rows[0].some((c) => !isNum(c))) { header = rows[0].map((c) => c.trim()); data = rows.slice(1); }
  const nums = data.map((r) => r.map((c) => Number(String(c).trim().replace(",", ".")))).filter((r) => r.length >= 2 && r.every((v) => !isNaN(v)));
  if (!nums.length) return null;
  const k = Math.min(...nums.map((r) => r.length));
  return { header, data: nums.map((r) => r.slice(0, k)) };
}
const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
function sdS(a) { const m = mean(a); return Math.sqrt(a.reduce((x, y) => x + (y - m) * (y - m), 0) / (a.length - 1)); }
function pearson(x, y) {
  const mx = mean(x), my = mean(y); let num = 0, dx = 0, dy = 0;
  for (let i = 0; i < x.length; i++) { num += (x[i] - mx) * (y[i] - my); dx += (x[i] - mx) ** 2; dy += (y[i] - my) ** 2; }
  return dx && dy ? num / Math.sqrt(dx * dy) : 0;
}
function tCrit975(df) { const z = 1.959964; return z + (z ** 3 + z) / (4 * df) + (5 * z ** 5 + 16 * z ** 3 + 3 * z) / (96 * df * df); }
function rCrit(n) { const df = n - 2; if (df < 1) return 1; const t = tCrit975(df); return t / Math.sqrt(t * t + df); }
const f3 = (x) => (Math.round(x * 1000) / 1000).toFixed(3).replace(".", ",");

/* ============================================================
   HELPER BERSAMA LINTAS KATEGORI (wajib di core, bukan partisi)
   ============================================================ */
const _libs = {};
function loadLib(url, globalName) {
  if (window[globalName]) return Promise.resolve(true);
  if (_libs[url]) return _libs[url];
  _libs[url] = new Promise((res) => {
    const s = document.createElement("script"); s.src = url;
    s.onload = () => res(!!window[globalName]);
    s.onerror = () => res(false);
    document.head.appendChild(s);
  });
  return _libs[url];
}

/* ===== SEGITIGA EMAS: XLSX + PDF.js LAZY & HELPER GLOBAL ===== */
function head(icon, title, desc) { return '<div class="fadein"><p class="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">' + desc + '</p>'; }
const LIB_XLSX = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
const LIB_PDFJS = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
function loadXLSX() { return loadLib(LIB_XLSX, "XLSX"); }
async function loadPdfJs() {
  const ok = await loadLib(LIB_PDFJS, "pdfjsLib");
  if (ok && !pdfjsLib.GlobalWorkerOptions.workerSrc) pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  return ok;
}
async function mtReadExcelFile(file) {
  if (!await loadXLSX()) throw new Error("Library Excel gagal dimuat — periksa koneksi internet.");
  const buf = await file.arrayBuffer();
  const wb = XLSX.read(buf, { type: "array" });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "", raw: true });
  while (rows.length && rows[rows.length - 1].every((c) => c === "")) rows.pop();
  return { rows, sheetNames: wb.SheetNames, wb };
}
function mtRowsToTSV(rows) { return rows.map((r) => r.map((c) => c == null ? "" : String(c)).join("\t")).join("\n"); }
async function mtExportExcel(sheetsData, filename) {
  if (!await loadXLSX()) { toast("Library Excel gagal dimuat — periksa koneksi."); return false; }
  const wb = XLSX.utils.book_new();
  sheetsData.forEach((sh) => {
    const rows = (sh.rows || []).map((r) => r.map((c) => c === undefined ? "" : c));
    const ws = XLSX.utils.aoa_to_sheet(rows);
    const widths = [];
    rows.forEach((r) => r.forEach((c, i) => { const L = String(c == null ? "" : c).length; widths[i] = Math.min(55, Math.max(widths[i] || 10, L + 2)); }));
    ws["!cols"] = widths.map((w) => ({ wch: w || 12 }));
    XLSX.utils.book_append_sheet(wb, ws, String(sh.name || "Sheet").slice(0, 31));
  });
  XLSX.writeFile(wb, "MahasiswaTools_" + filename + ".xlsx");
  return true;
}
function mtCellText(td) {
  const inp = td.querySelector("input, textarea, select");
  if (inp) return inp.value;
  return td.textContent.trim().replace(/\s+/g, " ");
}
function mtScrapeTables(root) {
  const out = [];
  (root || document).querySelectorAll("table").forEach((tb, ti) => {
    let title = "Tabel " + (ti + 1);
    let el = tb;
    for (let k = 0; k < 4 && el; k++) { el = el.parentElement; if (!el) break; const h = el.querySelector(":scope > h3, :scope > h4, :scope > .font-bold, :scope > p.font-semibold"); if (h && h.textContent.trim()) { title = h.textContent.trim().slice(0, 60); break; } }
    const rows = [];
    tb.querySelectorAll("tr").forEach((tr) => { const cells = [...tr.children].map(mtCellText); if (cells.some((c) => c !== "")) rows.push(cells); });
    if (rows.length) out.push({ title, rows });
  });
  return out;
}
function mtScrapeNarrative(root) {
  const texts = [];
  (root || document).querySelectorAll("p, .whitespace-pre-line").forEach((p) => {
    const t = p.textContent.trim().replace(/\s+/g, " ");
    if (t.length > 70 && !/Contoh format|pisahkan kolom/i.test(t)) texts.push(t);
  });
  return [...new Set(texts)].slice(0, 6);
}
async function mtTablesToPPT(toolName, tables, narrative) {
  const ok = await loadLib("https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js", "PptxGenJS");
  if (!ok) { toast("Library PPT gagal dimuat — periksa koneksi."); return; }
  const pptx = new PptxGenJS(); pptx.defineLayout({ name: "W", width: 13.33, height: 7.5 }); pptx.layout = "W";
  const ACC = "4F46E5", DARK = "0B0F19";
  let s = pptx.addSlide(); s.background = { color: DARK };
  s.addText(toolName, { x: 0.7, y: 2.6, w: 12, fontSize: 34, bold: true, color: "FFFFFF" });
  s.addText("Hasil Olah Data • MahasiswaTools • " + new Date().toLocaleDateString("id-ID"), { x: 0.7, y: 3.5, w: 12, fontSize: 15, color: "A5B4FC" });
  tables.slice(0, 6).forEach((tb) => {
    const sl = pptx.addSlide();
    sl.addText(tb.title, { x: 0.5, y: 0.3, w: 12.3, fontSize: 19, bold: true, color: DARK });
    const rows = tb.rows.map((r, ri) => r.map((c) => ({ text: String(c), options: ri === 0 ? { bold: true, fill: { color: "E0E7FF" } } : {} })));
    sl.addTable(rows, { x: 0.5, y: 0.95, w: 12.3, fontSize: 11, border: { pt: 0.5, color: "CBD5E1" }, colW: tb.rows[0].map(() => 12.3 / tb.rows[0].length) });
  });
  if (narrative && narrative.length) {
    const sl = pptx.addSlide();
    sl.addText("Kesimpulan (Narasi Bab 4)", { x: 0.5, y: 0.3, w: 12.3, fontSize: 19, bold: true, color: DARK });
    sl.addText(narrative.join("\n\n"), { x: 0.5, y: 1.0, w: 12.3, h: 6, fontSize: 13, color: "334155", valign: "top" });
  }
  await pptx.writeFile({ fileName: "MahasiswaTools_" + toolName.replace(/[^a-zA-Z0-9]+/g, "-") + ".pptx" });
  toast("Slide PPT terunduh 🎉");
}
/* Enhancer Segitiga Emas: tombol Upload Excel / Unduh Excel / Jadikan PPT di tool statistik & keuangan */
const MT_XLS_TOOLS = { validitas: 1, deskriptif: 1, inferens: 1, nonparam: 1, regresi: 1, likert: 1, k23: 1, proposal: 1, lpj: 1 };
const MT_XLS_NOFILL = { proposal: 1, lpj: 1 };
function mtEnhanceExcel(toolId) {
  if (!MT_XLS_TOOLS[toolId]) return;
  const body = document.getElementById("wsBody"); if (!body || body.dataset.mtxls) return;
  body.dataset.mtxls = "1";
  const ta = body.querySelector("textarea");
  const bar = document.createElement("div");
  bar.className = "flex flex-wrap gap-2 mb-3";
  let html = "";
  if (ta && !MT_XLS_NOFILL[toolId]) html += '<label class="' + BTN2 + ' cursor-pointer">📥 Upload File Excel (.xlsx / .csv)<input type="file" accept=".xlsx,.xls,.csv" class="hidden" onchange="mtXlsFill(this)"></label>';
  html += '<button class="' + BTN2 + '" onclick="mtXlsExport(\'' + toolId + '\')">📗 Unduh Hasil ke Excel (.xlsx)</button>';
  html += '<button class="' + BTN2 + '" onclick="mtXlsPPT(\'' + toolId + '\')">📊 Jadikan Slide PPT (.pptx)</button>';
  bar.innerHTML = html;
  const anchorEl = ta ? (ta.closest(".mb-4") || ta.parentElement) : body.firstElementChild;
  if (anchorEl && anchorEl.parentElement === body) body.insertBefore(bar, anchorEl); else body.prepend(bar);
  if (ta && !MT_XLS_NOFILL[toolId]) bar.dataset.taId = ta.id || "";
}
async function mtXlsFill(input) {
  const f = input.files[0]; if (!f) return;
  try {
    const { rows } = await mtReadExcelFile(f);
    const body = document.getElementById("wsBody");
    const ta = body ? body.querySelector("textarea") : null;
    if (!ta) { toast("Kotak data tidak ditemukan di tool ini."); return; }
    ta.value = mtRowsToTSV(rows);
    ta.dispatchEvent(new Event("input", { bubbles: true }));
    toast("Data dari " + f.name + " terisi (" + rows.length + " baris) — klik tombol Hitung/Uji-nya ya.");
  } catch (e) { toast("Gagal membaca file: " + e.message); }
  input.value = "";
}
async function mtXlsExport(toolId) {
  const body = document.getElementById("wsBody"); if (!body) return;
  const ta = body.querySelector("textarea");
  const sheets = [];
  if (ta && ta.value.trim()) sheets.push({ name: "Data Input", rows: ta.value.trim().split("\n").map((l) => l.split(/\t|;|,/)) });
  const tables = mtScrapeTables(body);
  const trows = [];
  tables.forEach((tb) => { trows.push([tb.title]); tb.rows.forEach((r) => trows.push(r)); trows.push([]); });
  sheets.push({ name: "Tabel Hasil", rows: trows.length ? trows : [["Belum ada hasil — jalankan dulu perhitungan/ujinya, lalu klik tombol ini lagi."]] });
  const narr = mtScrapeNarrative(body);
  sheets.push({ name: "Kesimpulan Bab 4", rows: narr.length ? narr.map((t) => [t]) : [["Narasi kesimpulan akan muncul di sini setelah hasil perhitungan tampil."]] });
  const t = TOOLS.find((x) => x.id === toolId);
  await mtExportExcel(sheets, "Hasil_" + (t ? t.n.replace(/[^a-zA-Z0-9]+/g, "-") : toolId));
  toast("File Excel hasil terunduh 📗");
}
async function mtXlsPPT(toolId) {
  const body = document.getElementById("wsBody"); if (!body) return;
  const tables = mtScrapeTables(body);
  if (!tables.length) { toast("Belum ada tabel hasil — jalankan dulu perhitungan/ujinya ya."); return; }
  const t = TOOLS.find((x) => x.id === toolId);
  await mtTablesToPPT(t ? t.n : toolId, tables, mtScrapeNarrative(body));
}
const xe = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function alphaOf(data) {
  const n = data.length, k = data[0].length;
  const totals = data.map((r) => r.reduce((a, b) => a + b, 0));
  let sumItemVar = 0;
  for (let j = 0; j < k; j++) { const col = data.map((r) => r[j]); const m = mean(col); sumItemVar += col.reduce((a, v) => a + (v - m) ** 2, 0) / (n - 1); }
  const mt = mean(totals); const totVar = totals.reduce((a, v) => a + (v - mt) ** 2, 0) / (n - 1);
  return totVar > 0 ? (k / (k - 1)) * (1 - sumItemVar / totVar) : 0;
}
function randn() { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }

function fileToImage(file) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = URL.createObjectURL(file);
  });
}
function canvasBlob(cv) { return new Promise((res) => cv.toBlob(res, "image/png")); }

function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }

function parseNums(t) { return (t || "").split(/[\s,;]+/).map((s) => parseFloat(String(s).replace(",", "."))).filter((n) => !isNaN(n)); }
function _lgamma(x) { const c = [676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7]; if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - _lgamma(1 - x); x -= 1; let a = 0.99999999999980993; const t = x + 7.5; for (let i = 0; i < 8; i++) a += c[i] / (x + i + 1); return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a); }
function _betacf(x, a, b) { const qab = a + b, qap = a + 1, qam = a - 1; let c = 1, d = 1 - qab * x / qap; if (Math.abs(d) < 1e-300) d = 1e-300; d = 1 / d; let h = d; for (let m = 1; m <= 200; m++) { const m2 = 2 * m; let aa = m * (b - m) * x / ((qam + m2) * (a + m2)); d = 1 + aa * d; if (Math.abs(d) < 1e-300) d = 1e-300; c = 1 + aa / c; if (Math.abs(c) < 1e-300) c = 1e-300; d = 1 / d; h *= d * c; aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2)); d = 1 + aa * d; if (Math.abs(d) < 1e-300) d = 1e-300; c = 1 + aa / c; if (Math.abs(c) < 1e-300) c = 1e-300; d = 1 / d; const del = d * c; h *= del; if (Math.abs(del - 1) < 3e-7) break; } return h; }
function betainc(x, a, b) { if (x <= 0) return 0; if (x >= 1) return 1; const bt = Math.exp(_lgamma(a + b) - _lgamma(a) - _lgamma(b) + a * Math.log(x) + b * Math.log(1 - x)); if (x < (a + 1) / (a + b + 2)) return bt * _betacf(x, a, b) / a; return 1 - bt * _betacf(1 - x, b, a) / b; }
function pDariT(t, df) { return betainc(df / (df + t * t), df / 2, 0.5); }
function pDariF(f, d1, d2) { return 1 - betainc((d1 * f) / (d1 * f + d2), d1 / 2, d2 / 2); }
function fmtP(p) { return p < 0.001 ? "< 0,001" : p.toFixed(3).replace(".", ","); }
function fmtN(x, d) { return Number(x).toFixed(d == null ? 2 : d).replace(".", ","); }

function fmtRp(n) { return "Rp" + Math.round(Number(n) || 0).toLocaleString("id-ID"); }

/* ============================================================
   SISTEM — BACKUP & RESTORE DATA (localStorage mt_*)
   ============================================================ */
function kumpulkanBackup() {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.indexOf("mt_") === 0) data[k] = localStorage.getItem(k); }
  return { app: "MahasiswaTools", kind: "backup-data", version: 1, exportedAt: new Date().toISOString(), data };
}
function backupData() {
  const b = kumpulkanBackup();
  const n = Object.keys(b.data).length;
  if (!n) { toast("Belum ada data tersimpan untuk di-backup."); return; }
  download("Backup_Data.json", JSON.stringify(b, null, 1), "application/json");
  toast("Backup berisi " + n + " data diunduh 💾 Simpan baik-baik.");
}
function terapkanBackup(obj) {
  if (!obj || obj.app !== "MahasiswaTools" || !obj.data || typeof obj.data !== "object") throw new Error("File bukan backup MahasiswaTools yang valid.");
  let n = 0;
  Object.keys(obj.data).forEach((k) => { if (k.indexOf("mt_") === 0) { try { localStorage.setItem(k, String(obj.data[k])); n++; } catch (e) {} } });
  return n;
}
function restoreData(input) {
  const f = input.files && input.files[0];
  if (!f) return;
  const rd = new FileReader();
  rd.onload = function () {
    try {
      const obj = JSON.parse(rd.result);
      if (!confirm("Restore backup ini? Data MahasiswaTools saat ini di browser ini akan DIGABUNGKAN/ditimpa oleh isi backup.")) return;
      const n = terapkanBackup(obj);
      toast("Restore berhasil: " + n + " data dimuat ulang ✅ Halaman akan dimuat ulang…");
      setTimeout(() => location.reload(), 900);
    } catch (e) { toast("❌ " + e.message); }
    input.value = "";
  };
  rd.readAsText(f);
}
window._kumpulkanBackup = kumpulkanBackup; window._terapkanBackup = terapkanBackup;

/* ---------- pemuat partisi kategori (script klasik lazy-load) ---------- */
const MT_CAT_LOADED = {};
const MT_CAT_LOADING = {};
function mtBasePath() { return window.__MT_BASE__ || ""; }
function loadCat(cat) {
  if (MT_CAT_LOADED[cat]) return Promise.resolve(true);
  if (MT_CAT_LOADING[cat]) return MT_CAT_LOADING[cat];
  if (document.querySelector('script[src*="cat-' + cat + '.js"]')) { MT_CAT_LOADED[cat] = true; return Promise.resolve(true); } // sudah termuat statis (halaman tool SEO) — jangan injeksi dua kali
  MT_CAT_LOADING[cat] = new Promise((res) => {
    const s = document.createElement("script");
    s.src = mtBasePath() + "js/cat-" + cat + ".js";
    s.onload = () => { MT_CAT_LOADED[cat] = true; try { applyToolEnhancers(); } catch (e) {} res(true); };
    s.onerror = () => { delete MT_CAT_LOADING[cat]; res(false); };
    document.head.appendChild(s);
  });
  return MT_CAT_LOADING[cat];
}
/* ---------- registry enhancer (preview live & logo institusi) ---------- */
const MT_ENHANCERS = [];
const MT_ENHANCED = new Set();
function mtEnhanceUI(id, wrap) { MT_ENHANCERS.push({ kind: "ui", key: "ui:" + id + ":" + MT_ENHANCERS.length, id: id, wrap: wrap }); }
function mtEnhanceFn(name, wrap) { MT_ENHANCERS.push({ kind: "fn", key: "fn:" + name + ":" + MT_ENHANCERS.length, name: name, wrap: wrap }); }
function mtCatOf(id) { const t = TOOLS.find((x) => x.id === id); return t ? t.c : null; }
/* Smart Intent Prefetch: sentuhan kursor/jari pada kartu tool langsung
   memanaskan partisi kategorinya — jeda alami sebelum klik (~100ms)
   membuat tool terasa instan, tanpa menyedot semua partisi di awal. */
function mtIntentPrefetch(e) {
  if (navigator.connection && navigator.connection.saveData) return;
  const el = e.target && e.target.closest ? e.target.closest("[onclick]") : null;
  if (!el) return;
  const m = (el.getAttribute("onclick") || "").match(/openTool\('([^']+)'\)/);
  if (m) { const c = mtCatOf(m[1]); if (c) loadCat(c); }
}
document.addEventListener("mouseover", mtIntentPrefetch);
document.addEventListener("touchstart", mtIntentPrefetch, { passive: true });
function applyToolEnhancers() {
  MT_ENHANCERS.forEach((e) => {
    if (MT_ENHANCED.has(e.key)) return;
    if (e.kind === "ui" && typeof UI[e.id] === "function") { UI[e.id] = e.wrap(UI[e.id]); MT_ENHANCED.add(e.key); }
    else if (e.kind === "fn" && typeof window[e.name] === "function") { window[e.name] = e.wrap(window[e.name]); MT_ENHANCED.add(e.key); }
  });
}



/* ---------- helper bersama tambahan (dipakai lintas kategori) ---------- */
async function unduhSertifikatPdfZip() {
  const out = $("#srOut");
  const okZip = await loadLib("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js", "JSZip");
  const okPdf = await loadPdfLib();
  if (!okZip || !okPdf) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">❌ Library gagal dimuat — cek koneksi lalu coba lagi.</div>'; return; }
  const names = $("#srNama").value.split(/\n/).map((s) => s.trim()).filter(Boolean);
  if (!names.length) { toast("Isi minimal satu nama penerima."); return; }
  out.innerHTML = '<div class="' + OUT + '">⏳ Membuat ' + names.length + " sertifikat PDF…</div>";
  const zip = new JSZip();
  for (let i = 0; i < names.length; i++) {
    const cv = gambarSertifikat(i);
    const pngBlob = await canvasBlob(cv);
    const doc = await PDFLib.PDFDocument.create();
    const page = doc.addPage([841.89, 595.28]);
    const emb = await doc.embedPng(await pngBlob.arrayBuffer());
    page.drawImage(emb, { x: 0, y: 0, width: 841.89, height: 595.28 });
    const pdfBytes = await doc.save();
    zip.file("Sertifikat_" + String(i + 1).padStart(2, "0") + "_" + names[i].replace(/[^\w]+/g, "_") + ".pdf", pdfBytes);
  }
  const zipBlob = await zip.generateAsync({ type: "blob" });
  window._sertifikatPdfZip = zipBlob;
  out.innerHTML = '<div class="' + OUT + '">✅ ' + names.length + ' sertifikat PDF (A4 landscape) selesai dalam satu ZIP.</div>';
  download("Sertifikat_Massal_PDF.zip", zipBlob);
}

async function loadPdfLib() { return loadLib("https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js", "PDFLib"); }

function rp(n) { return "Rp" + Math.round(n).toLocaleString("id-ID"); }

function gambarPie(data) {
  const cv = $("#grCv"); cv.classList.remove("hidden");
  const ctx = cv.getContext("2d");
  ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, 880, 520);
  ctx.fillStyle = "#000"; ctx.font = "bold 21px Georgia, serif"; ctx.textAlign = "center";
  ctx.fillText($("#grT").value.trim(), 440, 40);
  const total = data.reduce((a, d) => a + d.v, 0) || 1;
  const cx = 290, cy = 285, R = 185;
  let ang = -Math.PI / 2;
  data.forEach((d, i) => {
    const sweep = (d.v / total) * Math.PI * 2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, ang, ang + sweep); ctx.closePath();
    ctx.fillStyle = ctx.createPattern(polaCanvas(i % 6), "repeat"); ctx.fill();
    ctx.strokeStyle = "#000"; ctx.lineWidth = 2; ctx.stroke();
    ang += sweep;
  });
  ctx.textAlign = "left";
  data.forEach((d, i) => {
    const y = 130 + i * 44;
    ctx.fillStyle = ctx.createPattern(polaCanvas(i % 6), "repeat");
    ctx.fillRect(545, y - 15, 30, 22);
    ctx.strokeStyle = "#000"; ctx.lineWidth = 1.4; ctx.strokeRect(545, y - 15, 30, 22);
    ctx.fillStyle = "#000"; ctx.font = "15px Georgia, serif";
    ctx.fillText((d.label.length > 20 ? d.label.slice(0, 19) + "…" : d.label) + " — " + d.v + " (" + (d.v / total * 100).toFixed(1) + "%)", 588, y + 2);
  });
  cv.toBlob((b) => { window._grafikPng = b; }, "image/png");
  $("#grOut").innerHTML = '<div class="' + OUT + '"><p class="text-sm">Diagram pie hitam-putih dengan ' + data.length + ' pola arsiran berbeda — aman difotokopi untuk Bab 4.</p>'
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="' + BTN + '" onclick="download(\'Grafik_Bab4.png\', window._grafikPng)">⬇️ Download PNG</button>'
    + '<button class="' + BTN2 + '" onclick="buatGrafik()">🔄 Gambar Ulang</button></div></div>';
}

function qrLogoLoad(input) { const f = input.files && input.files[0]; if (!f) return; fileToImage(f).then((img) => { window._qrLogoImg = img; toast("Logo QR dimuat — generate ulang QR-nya 🔳"); }); }

function unduhSvgPng(svgId, name) {
  const svgEl = document.getElementById(svgId); if (!svgEl) return;
  const xml = new XMLSerializer().serializeToString(svgEl);
  const vb = svgEl.viewBox.baseVal;
  const url = URL.createObjectURL(new Blob([xml], { type: "image/svg+xml;charset=utf-8" }));
  const img = new Image();
  img.onload = function () {
    const scale = 2, c = document.createElement("canvas");
    c.width = (vb.width || 800) * scale; c.height = (vb.height || 400) * scale;
    const ctx = c.getContext("2d"); ctx.fillStyle = "#FFF"; ctx.fillRect(0, 0, c.width, c.height); ctx.drawImage(img, 0, 0, c.width, c.height);
    URL.revokeObjectURL(url);
    c.toBlob((b) => { window._lastSvgPng = b; download(name, b); }, "image/png");
  };
  img.src = url;
}

/* ---------- TERBILANG & ROMAWI (helper bersama) ---------- */
const SATUAN = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
function terbilangStr(n) {
  n = Math.floor(Math.abs(n));
  if (n < 12) return SATUAN[n];
  if (n < 20) return terbilangStr(n - 10) + " Belas";
  if (n < 100) return terbilangStr(n / 10) + " Puluh " + terbilangStr(n % 10);
  if (n < 200) return "Seratus " + terbilangStr(n - 100);
  if (n < 1000) return terbilangStr(n / 100) + " Ratus " + terbilangStr(n % 100);
  if (n < 2000) return "Seribu " + terbilangStr(n - 1000);
  if (n < 1000000) return terbilangStr(n / 1000) + " Ribu " + terbilangStr(n % 1000);
  if (n < 1000000000) return terbilangStr(n / 1000000) + " Juta " + terbilangStr(n % 1000000);
  if (n < 1000000000000) return terbilangStr(n / 1000000000) + " Miliar " + terbilangStr(n % 1000000000);
  return terbilangStr(n / 1000000000000) + " Triliun " + terbilangStr(n % 1000000000000);
}

/* ---------- 1. VALIDITAS & RELIABILITAS ---------- */
UI.validitas = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Data Skor Kuesioner", '<textarea id="vData" rows="9" class="' + IN + ' font-mono" placeholder="Paste dari Excel: baris = responden, kolom = butir soal. Baris pertama boleh berisi nama butir (B1, B2, ...)."></textarea>', "Contoh format: pisahkan kolom dengan Tab (copy langsung dari Excel), koma, atau titik koma. Minimal 3 responden & 2 butir.")
    + '<div class="flex flex-wrap gap-2"><button class=" ' + BTN + '" onclick="hitungValiditas()">🧮 Hitung Validitas & Reliabilitas</button>'
    + '<button class="' + BTN2 + '" onclick="contohValiditas()">Isi Data Contoh</button></div>'
    + outBox("vOut") + "</div>";
};
function contohValiditas() {
  const rows = ["B1\tB2\tB3\tB4\tB5"];
  let seed = 42; const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  for (let i = 0; i < 20; i++) { const base = 2 + Math.floor(rnd() * 3); const r = [0, 1, 2, 3].map(() => Math.max(1, Math.min(5, base + Math.floor(rnd() * 2) - (rnd() > 0.8 ? 1 : 0)))); r.push(1 + Math.floor(rnd() * 5)); rows.push(r.join("\t")); }
  $("#vData").value = rows.join("\n");
  toast("Data contoh terisi — klik Hitung.");
}
function hitungValiditas() {
  const parsed = parseMatrix($("#vData").value);
  const out = $("#vOut");
  if (!parsed || parsed.data.length < 3) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 dark:text-rose-300 font-semibold">⚠️ Data tidak terbaca. Pastikan minimal 3 baris responden berisi angka semua kolomnya.</div>'; return; }
  const data = parsed.data, n = data.length, k = data[0].length;
  const labels = parsed.header && parsed.header.length === k ? parsed.header : data[0].map((_, j) => "Butir " + (j + 1));
  const totals = data.map((r) => r.reduce((a, b) => a + b, 0));
  const rt = rCrit(n);
  const items = [];
  for (let j = 0; j < k; j++) { const col = data.map((r) => r[j]); const r = pearson(col, totals); items.push({ label: labels[j], r, valid: Math.abs(r) > rt }); }
  const itemVars = []; for (let j = 0; j < k; j++) { const col = data.map((r) => r[j]); const m = mean(col); itemVars.push(col.reduce((a, v) => a + (v - m) ** 2, 0) / (col.length - 1)); }
  const mt = mean(totals); const totVar = totals.reduce((a, v) => a + (v - mt) ** 2, 0) / (n - 1);
  const alpha = totVar > 0 ? (k / (k - 1)) * (1 - itemVars.reduce((a, b) => a + b, 0) / totVar) : 0;
  const nValid = items.filter((i) => i.valid).length;
  const invalidList = items.filter((i) => !i.valid).map((i) => i.label).join(", ") || "tidak ada";
  const reliabel = alpha >= 0.6;
  const narasi = "Berdasarkan hasil uji validitas terhadap " + n + " responden dengan taraf signifikansi 5% (r tabel = " + f3(rt) + "), diperoleh hasil bahwa " + nValid + " dari " + k + " butir pernyataan dinyatakan valid karena nilai r hitung lebih besar dari r tabel" + (nValid < k ? ". Adapun butir yang dinyatakan tidak valid adalah " + invalidList + ", sehingga butir tersebut perlu direvisi atau dihilangkan" : "") + ". Selanjutnya, hasil uji reliabilitas menunjukkan nilai Cronbach's Alpha sebesar " + f3(alpha) + ", yang " + (reliabel ? "lebih besar dari 0,60 sehingga instrumen penelitian ini dinyatakan reliabel dan layak digunakan untuk pengumpulan data" : "lebih kecil dari 0,60 sehingga instrumen penelitian ini dinyatakan belum reliabel dan perlu diperbaiki sebelum digunakan") + ".";
  const tableRows = items.map((i) => '<tr class="border-b border-slate-200 dark:border-slate-700"><td class="py-1.5 pr-3 font-semibold">' + esc(i.label) + '</td><td class="py-1.5 pr-3">' + f3(i.r) + '</td><td class="py-1.5 pr-3">' + f3(rt) + '</td><td class="py-1.5 font-bold ' + (i.valid ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400") + '">' + (i.valid ? "✅ Valid" : "❌ Tidak Valid") + "</td></tr>").join("");
  out.innerHTML = '<div class="' + OUT + '">'
    + '<div class="grid sm:grid-cols-3 gap-3 mb-4">'
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-3 text-center"><div class="text-xl font-extrabold">' + n + '</div><div class="text-xs text-slate-500">Responden (N)</div></div>'
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-3 text-center"><div class="text-xl font-extrabold">' + nValid + "/" + k + '</div><div class="text-xs text-slate-500">Butir Valid</div></div>'
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-3 text-center"><div class="text-xl font-extrabold ' + (reliabel ? "text-emerald-600" : "text-rose-600") + '">' + f3(alpha) + '</div><div class="text-xs text-slate-500">Cronbach\'s Alpha → ' + (reliabel ? "Reliabel ✅" : "Tidak Reliabel ❌") + "</div></div></div>"
    + '<div class="overflow-x-auto"><table class="w-full text-left text-sm"><thead><tr class="border-b-2 border-slate-300 dark:border-slate-600"><th class="py-1.5 pr-3">Butir</th><th class="py-1.5 pr-3">r Hitung</th><th class="py-1.5 pr-3">r Tabel 5%</th><th class="py-1.5">Keterangan</th></tr></thead><tbody>' + tableRows + "</tbody></table></div>"
    + '<h4 class="font-bold mt-5 mb-1.5">📝 Auto-Narasi Bab 4 (siap copy):</h4><p class="prose-out leading-relaxed bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">' + esc(narasi) + "</p>"
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="copyText(window._vNarasi)">📋 Copy Narasi</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Hasil_Uji_Validitas.txt\', window._vFull)">⬇️ Download Hasil (.txt)</button></div></div>';
  window._vNarasi = narasi;
  window._vFull = "HASIL UJI VALIDITAS & RELIABILITAS — MahasiswaTools\n" + "=".repeat(52) + "\nJumlah responden (N): " + n + " | Jumlah butir: " + k + " | r tabel (5%): " + f3(rt) + "\n\n" + items.map((i) => i.label + "\t r hitung = " + f3(i.r) + "\t " + (i.valid ? "VALID" : "TIDAK VALID")).join("\n") + "\n\nCronbach's Alpha: " + f3(alpha) + " → " + (reliabel ? "RELIABEL" : "TIDAK RELIABEL") + "\n\nNARASI:\n" + narasi + "\n";
}

/* ---------- 2. KONVERTER LIKERT ---------- */
UI.likert = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Mode Penilaian", '<select id="lMode" class="' + IN + '"><option value="fav">Favorable (SS=5, S=4, RG=3, TS=2, STS=1)</option><option value="unfav">Unfavorable / pernyataan negatif (SS=1, S=2, RG=3, TS=4, STS=5)</option></select>')
    + field("Jawaban Responden", '<textarea id="lIn" rows="9" class="' + IN + ' font-mono" placeholder="Paste jawaban dari Excel — teks (Sangat Setuju, Setuju, ...) atau singkatan (SS, S, RG, TS, STS). Struktur baris/kolom dipertahankan."></textarea>')
    + '<button class="' + BTN + '" onclick="konversiLikert()">🔢 Konversi ke Angka</button>'
    + outBox("lOut") + "</div>";
};
function konversiLikert() {
  const mode = $("#lMode").value;
  const mapFav = { sangatsetuju: 5, setuju: 4, raguragu: 3, netral: 3, tidaksetuju: 2, sangattidaksetuju: 1, ss: 5, s: 4, rg: 3, n: 3, ts: 2, sts: 1 };
  const rows = $("#lIn").value.split(/\r?\n/).filter((l) => l.trim().length);
  const out = $("#lOut"); let unknown = [], total = 0; const freq = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const conv = rows.map((l) => (l.includes("\t") ? l.split("\t") : l.includes(";") ? l.split(";") : l.includes(",") ? l.split(",") : [l]).map((cell) => {
    const raw = cell.trim(); if (!raw) return "";
    if (!isNaN(Number(raw))) { const v = Number(raw); if (v >= 1 && v <= 5) { freq[v]++; total++; return String(v); } }
    const key = raw.toLowerCase().replace(/[^a-z]/g, "");
    if (mapFav[key] != null) { const v = mode === "fav" ? mapFav[key] : 6 - mapFav[key]; freq[v]++; total++; return String(v); }
    unknown.push(raw); return "?";
  }).join("\t")).join("\n");
  window._likert = conv;
  out.innerHTML = '<div class="' + OUT + '"><div class="flex flex-wrap gap-2 mb-3">' + [5, 4, 3, 2, 1].map((v) => '<span class="rounded-lg bg-white dark:bg-slate-900 px-3 py-1.5 font-bold">Skor ' + v + ": " + freq[v] + "×</span>").join("") + '<span class="rounded-lg bg-brand-100 dark:bg-brand-900 px-3 py-1.5 font-bold">Total sel: ' + total + "</span></div>"
    + (unknown.length ? '<p class="text-rose-600 dark:text-rose-300 font-semibold mb-2">⚠️ ' + unknown.length + ' sel tidak dikenali (ditandai ?): ' + esc([...new Set(unknown)].slice(0, 8).join(", ")) + "</p>" : "")
    + '<textarea readonly rows="8" class="' + IN + ' font-mono">' + esc(conv) + "</textarea>"
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="' + BTN + '" onclick="copyText(window._likert)">📋 Copy Hasil (siap paste ke Excel)</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Likert_Terkonversi.csv\', window._likert.replace(/\\t/g, \';\'))">⬇️ Download CSV</button></div></div>';
}

/* ---------- 3. KALKULATOR SAMPEL ---------- */
UI.sampel = function (el) {
  el.innerHTML = '<div class="fadein"><div class="grid sm:grid-cols-2 gap-4">'
    + field("Jumlah Populasi (N)", '<input id="sN" type="number" min="1" value="1000" class="' + IN + '">')
    + field("Margin of Error / Taraf Kesalahan", '<select id="sE" class="' + IN + '"><option value="0.01">1% (sangat teliti)</option><option value="0.05" selected>5% (standar skripsi)</option><option value="0.10">10% (longgar)</option></select>')
    + '</div><button class="' + BTN + '" onclick="hitungSampel()">🎯 Hitung Sampel</button>' + outBox("sOut") + "</div>";
};
function hitungSampel() {
  const N = Number($("#sN").value), e = Number($("#sE").value);
  const out = $("#sOut");
  if (!N || N < 1) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Isi jumlah populasi yang valid dulu ya.</div>'; return; }
  const slovin = N / (1 + N * e * e);
  const chi = e === 0.01 ? 6.635 : e === 0.05 ? 3.841 : 2.706;
  const isaac = (chi * N * 0.25) / (e * e * (N - 1) + chi * 0.25);
  const Z = e === 0.01 ? 2.576 : e === 0.05 ? 1.96 : 1.645;
  const lem0 = (Z * Z * 0.25) / (e * e);
  const lem = lem0 / (1 + (lem0 - 1) / N);
  const ep = (e * 100).toFixed(0) + "%";
  const steps =
"1) RUMUS SLOVIN\n   n = N / (1 + N·e²) = " + N + " / (1 + " + N + " × " + e + "²) = " + N + " / " + (1 + N * e * e).toFixed(4) + " = " + slovin.toFixed(2) + " → dibulatkan menjadi " + Math.ceil(slovin) + " responden.\n\n" +
"2) RUMUS ISAAC & MICHAEL (P = Q = 0,5; λ² = " + chi + " untuk taraf kesalahan " + ep + ")\n   n = (λ² · N · P · Q) / (d²(N − 1) + λ² · P · Q)\n   n = (" + chi + " × " + N + " × 0,25) / (" + e + "² × " + (N - 1) + " + " + chi + " × 0,25) = " + isaac.toFixed(2) + " → dibulatkan menjadi " + Math.ceil(isaac) + " responden.\n\n" +
"3) RUMUS LEMESHOW (Z = " + Z + "; P = 0,5; koreksi populasi terbatas)\n   n₀ = Z² · P(1 − P) / d² = " + Z + "² × 0,25 / " + e + "² = " + lem0.toFixed(2) + "\n   n = n₀ / (1 + (n₀ − 1)/N) = " + lem.toFixed(2) + " → dibulatkan menjadi " + Math.ceil(lem) + " responden.\n\n" +
"Kesimpulan: dengan populasi " + N + " dan margin error " + ep + ", ukuran sampel minimum berkisar antara " + Math.min(Math.ceil(slovin), Math.ceil(isaac), Math.ceil(lem)) + "–" + Math.max(Math.ceil(slovin), Math.ceil(isaac), Math.ceil(lem)) + " responden. Rumus yang paling umum dipakai pada skripsi kuantitatif adalah Slovin.";
  window._sampel = "PERHITUNGAN UKURAN SAMPEL — MahasiswaTools\nPopulasi (N) = " + N + ", margin error = " + ep + "\n\n" + steps + "\n";
  const card = (nama, val, ket) => '<div class="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 text-center"><div class="text-xs font-bold text-slate-500 uppercase tracking-wide">' + nama + '</div><div class="text-3xl font-extrabold text-brand-600 dark:text-brand-300 mt-1">' + val + '</div><div class="text-xs text-slate-500 mt-1">' + ket + "</div></div>";
  out.innerHTML = '<div class="' + OUT + '"><div class="grid sm:grid-cols-3 gap-3">'
    + card("Slovin", Math.ceil(slovin), "n mentah: " + slovin.toFixed(2))
    + card("Isaac & Michael", Math.ceil(isaac), "n mentah: " + isaac.toFixed(2))
    + card("Lemeshow", Math.ceil(lem), "n mentah: " + lem.toFixed(2))
    + '</div><h4 class="font-bold mt-5 mb-1.5">📝 Langkah Perhitungan (siap copy ke Bab 3):</h4><pre class="prose-out bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700 text-[13px] leading-relaxed overflow-x-auto">' + esc(steps) + "</pre>"
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="copyText(window._sampel)">📋 Copy Langkah Rumus</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Perhitungan_Sampel.txt\', window._sampel)">⬇️ Download (.txt)</button></div></div>';
}

/* ---------- 4. PEMBERSIH TEKS PDF ---------- */
UI.pdffix = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Teks Berantakan dari PDF", '<textarea id="pIn" rows="10" class="' + IN + '" placeholder="Paste teks hasil copy dari PDF di sini — baris-barisnya yang terpotong akan disatukan kembali menjadi paragraf utuh."></textarea>')
    + '<label class="flex items-center gap-2 text-sm font-semibold mb-4"><input id="pHyp" type="checkbox" checked class="w-4 h-4 accent-brand-600"> Gabungkan kata yang terpotong tanda hubung di akhir baris (mis. "peneli-" + "tian" → "penelitian")</label>'
    + '<button class="' + BTN + '" onclick="bersihkanPdf()">🧹 Rapikan Teks</button>' + outBox("pOut") + "</div>";
};
function bersihkanPdf() {
  const raw = $("#pIn").value;
  const hyp = $("#pHyp").checked;
  const paras = raw.split(/\n\s*\n/).map((para) => {
    let t = para;
    if (hyp) t = t.replace(/-\s*\n\s*/g, "");
    t = t.replace(/\s*\n\s*/g, " ").replace(/[ \t]{2,}/g, " ").replace(/\s+([.,;:!?%)])/g, "$1").replace(/([(\[])\s+/g, "$1").trim();
    return t;
  }).filter((p) => p.length);
  const hasil = paras.join("\n\n");
  window._pdf = hasil;
  const kata = hasil ? hasil.split(/\s+/).length : 0;
  $("#pOut").innerHTML = '<div class="' + OUT + '"><div class="flex flex-wrap gap-2 mb-3"><span class="rounded-lg bg-white dark:bg-slate-900 px-3 py-1.5 font-bold">Karakter: ' + raw.length + " → " + hasil.length + '</span><span class="rounded-lg bg-white dark:bg-slate-900 px-3 py-1.5 font-bold">Paragraf: ' + paras.length + '</span><span class="rounded-lg bg-white dark:bg-slate-900 px-3 py-1.5 font-bold">Kata: ' + kata + "</span></div>"
    + '<textarea readonly rows="10" class="' + IN + '">' + esc(hasil) + "</textarea>"
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="' + BTN + '" onclick="copyText(window._pdf)">📋 Copy Teks Rapi</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Teks_Rapi.txt\', window._pdf)">⬇️ Download (.txt)</button></div></div>';
}

/* ---------- 5. DAFTAR PUSTAKA ---------- */
let dapusList = store.get("mt_dapus", []);
UI.dapus = function (el) {
  el.innerHTML = '<div class="fadein"><div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Penulis", '<input id="dPen" class="' + IN + '" placeholder="cth: Santoso, Budi & Wulandari, Sari">', "Pisahkan banyak penulis dengan tanda & — format Nama Belakang, Nama Depan.")
    + field("Tahun Terbit", '<input id="dThn" class="' + IN + '" placeholder="cth: 2023">')
    + field("Judul Artikel / Buku", '<input id="dJud" class="' + IN + '" placeholder="cth: Pengaruh Media Sosial terhadap Prestasi Belajar">')
    + field("Nama Jurnal / Penerbit", '<input id="dJur" class="' + IN + '" placeholder="cth: Jurnal Pendidikan Indonesia / Gramedia">')
    + field("Kota Terbit (untuk buku)", '<input id="dKota" class="' + IN + '" placeholder="cth: Jakarta (boleh kosong)">')
    + field("DOI / Volume-Halaman", '<input id="dDoi" class="' + IN + '" placeholder="cth: 10.1234/jpi.v12i1.123 atau Vol. 12, hlm. 45–58">')
    + '</div><div class="flex flex-wrap items-center gap-2"><button class="' + BTN + '" onclick="tambahDapus()">➕ Tambah ke Daftar</button>'
    + '<label class="text-sm font-bold ml-1">Gaya Sitasi: <select id="dStyle" onchange="renderDapus()" class="' + IN + ' !w-auto inline-block ml-1"><option value="apa">APA 7th</option><option value="mla">MLA 9th</option><option value="harvard">Harvard</option><option value="vancouver">Vancouver</option></select></label></div>'
    + outBox("dOut") + "</div>";
  renderDapus();
};
function formatDapus(e, style) {
  const doi = e.doi && /^10\./.test(e.doi.trim()) ? "https://doi.org/" + e.doi.trim() : e.doi;
  if (style === "apa") return esc(e.pen) + " (" + esc(e.thn) + "). " + esc(e.jud) + ". <i>" + esc(e.jur) + "</i>." + (doi ? " " + esc(doi) : "");
  if (style === "mla") return esc(e.pen) + ". \u201C" + esc(e.jud) + ".\u201D <i>" + esc(e.jur) + "</i>, " + esc(e.thn) + "." + (doi ? " " + esc(doi) : "");
  if (style === "harvard") return esc(e.pen) + " (" + esc(e.thn) + ") \u2018" + esc(e.jud) + "\u2019, <i>" + esc(e.jur) + "</i>" + (e.kota ? ", " + esc(e.kota) : "") + ".";
  return esc(e.pen) + ". " + esc(e.jud) + ". <i>" + esc(e.jur) + "</i>. " + esc(e.thn) + "." + (doi ? " " + esc(doi) : "");
}
function tambahDapus() {
  const e = { pen: $("#dPen").value.trim(), thn: $("#dThn").value.trim(), jud: $("#dJud").value.trim(), jur: $("#dJur").value.trim(), kota: $("#dKota").value.trim(), doi: $("#dDoi").value.trim() };
  if (!e.pen || !e.thn || !e.jud || !e.jur) { toast("⚠️ Penulis, tahun, judul, dan jurnal/penerbit wajib diisi."); return; }
  dapusList.push(e); store.set("mt_dapus", dapusList);
  ["dPen", "dThn", "dJud", "dJur", "dKota", "dDoi"].forEach((i) => $("#" + i).value = "");
  renderDapus(); toast("Sumber ditambahkan 📚");
}
function hapusDapus(idx) { dapusList.splice(idx, 1); store.set("mt_dapus", dapusList); renderDapus(); }
function renderDapus() {
  const out = $("#dOut"); if (!out) return;
  const style = $("#dStyle") ? $("#dStyle").value : "apa";
  const sorted = dapusList.slice().sort((a, b) => a.pen.toLowerCase().localeCompare(b.pen.toLowerCase()));
  if (!sorted.length) { out.innerHTML = '<div class="' + OUT + ' text-slate-500">Daftar masih kosong — tambahkan sumber pertamamu lewat form di atas. Daftar tersimpan otomatis di browser.</div>'; return; }
  const htmlList = sorted.map((e) => '<p class="mb-2.5 leading-relaxed" style="padding-left:2em;text-indent:-2em">' + formatDapus(e, style) + "</p>").join("");
  window._dapusHtml = htmlList;
  window._dapusText = sorted.map((e) => formatDapus(e, style).replace(/<[^>]+>/g, "")).join("\n");
  out.innerHTML = '<div class="' + OUT + '"><h4 class="font-bold mb-3">📚 Daftar Pustaka (' + sorted.length + ' sumber, terurut A–Z, gaya ' + style.toUpperCase() + '):</h4>'
    + '<div class="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">' + htmlList + "</div>"
    + '<div class="mt-3 space-y-1.5">' + sorted.map((e) => { const gi = dapusList.indexOf(e); return '<div class="flex items-center gap-2 text-xs"><span class="flex-1 truncate text-slate-500">' + esc(e.pen) + " (" + esc(e.thn) + ") — " + esc(e.jud) + '</span><button class="text-rose-500 font-bold" onclick="hapusDapus(' + gi + ')">Hapus</button></div>'; }).join("") + "</div>"
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="copyDapus()">📋 Copy (dengan format italic)</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Daftar_Pustaka.doc\', \'<html><body style=&quot;font-family:serif;font-size:12pt&quot;>\' + window._dapusHtml + \'</body></html>\', \'application/msword\')">⬇️ Download .doc</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Daftar_Pustaka.txt\', window._dapusText)">⬇️ .txt</button></div></div>';
}
async function copyDapus() {
  try {
    const item = new ClipboardItem({ "text/html": new Blob([window._dapusHtml], { type: "text/html" }), "text/plain": new Blob([window._dapusText], { type: "text/plain" }) });
    await navigator.clipboard.write([item]); toast("Daftar pustaka tersalin dengan format italic ✅");
  } catch (e) { copyText(window._dapusText, "Tersalin (teks polos)"); }
}

;

/* ============================================================
   TOOLS 6–10
   ============================================================ */
/* ---------- 6. AUTO-ITALIC & KATA BERULANG ---------- */
const FOREIGN = ["feedback","deadline","online","offline","website","email","software","hardware","brainstorming","download","upload","upgrade","meeting","marketing","branding","leadership","teamwork","interview","output","input","outcome","stakeholder","monitoring","database","server","client","browser","update","review","survey","skill","management","planning","organizing","business","digital","global","modern","virtual","target","budget","branding","networking","password","username","link","file","folder","data","internet","komputer","smartphone","gadget","charger","deadline","timeline","rundown","briefing","follow up","follow-up","slide","powerpoint","excel","word","google","zoom","chat","posting","caption","konten","online shop","e-commerce","start up","startup","influencer","endorse","giveaway","workshop","seminar","webinar","training","coaching","mentoring","freelance","part time","full time","overthinking","healing","self reward","burnout","toxic","support system","circle","bestie","crush","ghosting"];
UI.italic = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Paragraf Kamu", '<textarea id="iIn" rows="8" class="' + IN + '" placeholder="Tempel paragraf di sini. Istilah asing umum (feedback, deadline, online, ...) dan frasa dalam tanda kutip akan dimiringkan otomatis sesuai kaidah EYD/PUEBI."></textarea>')
    + '<button class="' + BTN + '" onclick="prosesItalic()">🔤 Proses Italic & Cek Kata Berulang</button>' + outBox("iOut") + "</div>";
};
function prosesItalic() {
  let text = $("#iIn").value;
  const out = $("#iOut");
  if (!text.trim()) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Isi paragrafnya dulu ya.</div>'; return; }
  let html = esc(text);
  html = html.replace(/&quot;([^&]{1,80}?)&quot;/g, "<i>&quot;$1&quot;</i>").replace(/"([^"]{1,80}?)"/g, '<i>"$1"</i>');
  const sorted = FOREIGN.slice().sort((a, b) => b.length - a.length);
  sorted.forEach((w) => {
    const re = new RegExp("(?<![\\w<])(" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+") + ")(?![\\w>])", "gi");
    html = html.replace(re, "<i>$1</i>");
  });
  window._italicHtml = html.replace(/\n/g, "<br>");
  const words = (text.toLowerCase().match(/[a-zà-ÿ']+/g) || []).filter((w) => w.length >= 4);
  const freq = {}; words.forEach((w) => freq[w] = (freq[w] || 0) + 1);
  const top = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const maxF = top.length ? top[0][1] : 0;
  const rows = top.map(([w, c]) => '<tr class="border-b border-slate-200 dark:border-slate-700"><td class="py-1.5 pr-3 font-semibold">' + esc(w) + '</td><td class="py-1.5 pr-3">' + c + '×</td><td class="py-1.5">' + (c >= 3 && c >= maxF * 0.6 ? '<span class="text-amber-600 dark:text-amber-400 font-bold">⚠️ Sering diulang — pertimbangkan sinonim</span>' : '<span class="text-slate-400">Wajar</span>') + "</td></tr>").join("");
  out.innerHTML = '<div class="' + OUT + '"><h4 class="font-bold mb-2">Hasil (kata asing sudah dimiringkan):</h4>'
    + '<div class="prose-out bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700 leading-relaxed">' + window._italicHtml + "</div>"
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="' + BTN + '" onclick="copyItalic()">📋 Copy Hasil (HTML)</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Teks_Italic.html\', window._italicHtml)">⬇️ Download .html</button></div>'
    + '<h4 class="font-bold mt-5 mb-1.5">🔁 Frekuensi Kata (10 teratas, min. 4 huruf):</h4>'
    + '<table class="w-full text-left text-sm"><thead><tr class="border-b-2 border-slate-300 dark:border-slate-600"><th class="py-1.5 pr-3">Kata</th><th class="py-1.5 pr-3">Jumlah</th><th class="py-1.5">Catatan</th></tr></thead><tbody>' + rows + "</tbody></table></div>";
}
async function copyItalic() {
  try { await navigator.clipboard.write([new ClipboardItem({ "text/html": new Blob([window._italicHtml], { type: "text/html" }), "text/plain": new Blob([window._italicHtml.replace(/<[^>]+>/g, "")], { type: "text/plain" }) })]); toast("Tersalin dengan format italic ✅"); }
  catch (e) { copyText(window._italicHtml); }
}

/* ---------- 7. CASE CONVERTER EYD ---------- */
const SMALL_ID = new Set(["di","ke","dari","dan","atau","yang","untuk","pada","dalam","dengan","oleh","sebagai","tentang","antara","bagi","demi","hingga","sejak","tanpa","terhadap","akan","atas","karena","agar","supaya","serta","maupun","bahkan","yakni","yaitu","per","pun","ini","itu","juga","sudah","telah","saat","ketika","jika","kalau","namun","tetapi","melainkan","sedangkan","ataupun","daripada","kepada","kepadanya","olehnya","sebelum","sesudah","setelah","selama","sampai","hingga","menuju","menurut","berdasarkan","melalui","via"]);
UI.eydcase = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Judul / Teks", '<textarea id="eIn" rows="4" class="' + IN + '" placeholder="cth: pengaruh media sosial terhadap prestasi belajar siswa di era digital"></textarea>', "Setiap baris diperlakukan sebagai satu judul. Akronim huruf kapital semua (IPK, SDM, KKN) dipertahankan.")
    + '<button class="' + BTN + '" onclick="prosesEyd()">✒️ Ubah ke Title Case EYD</button>' + outBox("eOut") + "</div>";
};
function titleEyd(line) {
  const tokens = line.trim().split(/\s+/);
  return tokens.map((tok, i) => {
    const m = tok.match(/^([^A-Za-zÀ-ÿ]*)([A-Za-zÀ-ÿ'’-]+)([^A-Za-zÀ-ÿ]*)$/);
    if (!m) return tok;
    const pre = m[1], core = m[2], post = m[3];
    if (core.length > 1 && core === core.toUpperCase() && /[A-Z]/.test(core)) return tok;
    const lower = core.toLowerCase();
    const firstOfSentence = i === 0 || /[:.]$/.test(tokens[i - 1] || "");
    if (!firstOfSentence && SMALL_ID.has(lower)) return pre + lower + post;
    return pre + lower.charAt(0).toUpperCase() + lower.slice(1) + post;
  }).join(" ");
}
function prosesEyd() {
  const hasil = $("#eIn").value.split(/\r?\n/).map((l) => l.trim() ? titleEyd(l) : l).join("\n");
  window._eyd = hasil;
  $("#eOut").innerHTML = '<div class="' + OUT + '"><h4 class="font-bold mb-2">Hasil Title Case EYD:</h4><textarea readonly rows="4" class="' + IN + '">' + esc(hasil) + '</textarea>'
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="' + BTN + '" onclick="copyText(window._eyd)">📋 Copy Hasil</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Judul_EYD.txt\', window._eyd)">⬇️ Download .txt</button></div></div>';
}

/* ---------- 8. SIMILARITY CHECKER ---------- */
UI.similarity = function (el) {
  el.innerHTML = '<div class="fadein"><div class="grid sm:grid-cols-2 gap-4">'
    + field("Teks A — Asli (jurnal/sumber)", '<textarea id="simA" rows="9" class="' + IN + '" placeholder="Tempel teks sumber asli di sini..."></textarea>')
    + field("Teks B — Parafrase kamu", '<textarea id="simB" rows="9" class="' + IN + '" placeholder="Tempel teks hasil parafrase di sini..."></textarea>')
    + '</div><button class="' + BTN + '" onclick="cekSimilarity()">🛡️ Bandingkan Kemiripan</button>' + outBox("simOut") + "</div>";
};
function tokensOf(text) { return (text.toLowerCase().match(/[a-zà-ÿ0-9]+/g) || []); }
function shingles(tokens, n) { const s = new Set(); for (let i = 0; i + n <= tokens.length; i++) s.add(tokens.slice(i, i + n).join(" ")); return s; }
function jaccard(a, b) { if (!a.size && !b.size) return 0; let inter = 0; a.forEach((x) => { if (b.has(x)) inter++; }); return inter / (a.size + b.size - inter); }
function cekSimilarity() {
  const A = $("#simA").value, B = $("#simB").value;
  const out = $("#simOut");
  const tA = tokensOf(A), tB = tokensOf(B);
  if (tA.length < 3 || tB.length < 3) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Kedua teks minimal berisi 3 kata ya.</div>'; return; }
  const shA = shingles(tA, 3), shB = shingles(tB, 3);
  const jacShingle = jaccard(shA, shB);
  const jacWord = jaccard(new Set(tA), new Set(tB));
  const pct = Math.round(jacShingle * 100);
  const verdict = pct < 20 ? ["#059669", "✅ Kemiripan rendah — parafrase kamu cukup aman."] : pct < 40 ? ["#D97706", "⚠️ Kemiripan sedang — parafrase ulang bagian yang ter-highlight merah."] : ["#DC2626", "🚨 Kemiripan tinggi — tulis ulang total dengan struktur kalimatmu sendiri."];
  const marked = new Array(tB.length).fill(false);
  for (let i = 0; i + 3 <= tB.length; i++) if (shA.has(tB.slice(i, i + 3).join(" "))) { marked[i] = marked[i + 1] = marked[i + 2] = true; }
  const wordSpans = []; const re = /[A-Za-zÀ-ÿ0-9]+/g; let m;
  const lowerB = B.toLowerCase();
  while ((m = re.exec(B)) !== null) wordSpans.push([m.index, m.index + m[0].length]);
  let html = "", pos = 0;
  wordSpans.forEach((sp, i) => {
    html += esc(B.slice(pos, sp[0]));
    const w = esc(B.slice(sp[0], sp[1]));
    html += marked[i] ? '<mark class="sim">' + w + "</mark>" : w;
    pos = sp[1];
  });
  html += esc(B.slice(pos));
  out.innerHTML = '<div class="' + OUT + '"><div class="grid sm:grid-cols-3 gap-3 mb-4">'
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-3 text-center"><div class="text-2xl font-extrabold" style="color:' + verdict[0] + '">' + pct + '%</div><div class="text-xs text-slate-500">Kemiripan frasa (3-gram Jaccard)</div></div>'
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-3 text-center"><div class="text-2xl font-extrabold">' + Math.round(jacWord * 100) + '%</div><div class="text-xs text-slate-500">Kemiripan kosakata (word Jaccard)</div></div>'
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-3 text-center"><div class="text-2xl font-extrabold">' + marked.filter(Boolean).length + '</div><div class="text-xs text-slate-500">Kata ter-highlight di Teks B</div></div></div>'
    + '<p class="font-bold mb-2" style="color:' + verdict[0] + '">' + verdict[1] + '</p>'
    + '<p class="text-xs text-slate-500 mb-2">Highlight merah = rangkaian 3 kata berurutan yang masih sama persis dengan teks asli. Perhitungan 100% lokal di browser — bukan pengganti Turnitin resmi, tapi ampuh untuk screening awal.</p>'
    + '<div class="prose-out bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700 leading-relaxed">' + html + "</div></div>";
}

/* ---------- 9. TELEPROMPTER SIDANG ---------- */
let tele = { playing: false, raf: null, last: 0, speed: 45, timerInt: null, remain: 0 };
UI.teleprompter = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Naskah Presentasi", '<textarea id="tIn" rows="5" class="' + IN + '" placeholder="Tempel naskah / poin bicara sidang kamu di sini...">Assalamu\'alaikum warahmatullahi wabarakatuh. Yang terhormat Bapak dan Ibu dosen penguji, perkenalkan nama saya, mahasiswa Program Studi, yang pada kesempatan ini akan mempresentasikan hasil penelitian skripsi saya yang berjudul Pengaruh Media Sosial terhadap Prestasi Belajar. Penelitian ini dilatarbelakangi oleh meningkatnya penggunaan media sosial di kalangan pelajar yang berdampak pada konsentrasi belajar. Rumusan masalah dalam penelitian ini adalah apakah terdapat pengaruh yang signifikan antara intensitas penggunaan media sosial terhadap prestasi belajar siswa. Metode yang digunakan adalah kuantitatif dengan teknik survei kepada responden. Hasil penelitian menunjukkan terdapat pengaruh yang signifikan, dan saya siap menerima masukan serta pertanyaan dari Bapak dan Ibu penguji. Terima kasih.</textarea>')
    + '<div class="flex flex-wrap gap-2 mb-4"><button id="tPlay" class="' + BTN + '" onclick="teleToggle()">▶️ Mulai Latihan</button>'
    + '<button class="' + BTN2 + '" onclick="teleReset()">⏮ Ulang</button>'
    + '<label class="flex items-center gap-2 text-sm font-semibold ml-1"><input id="tMirror" type="checkbox" class="w-4 h-4 accent-brand-600" onchange="teleMirror()"> 🪞 Mode Cermin</label></div>'
    + '<div id="tStage" class="relative rounded-2xl bg-slate-950 text-white overflow-hidden" style="height:330px">'
    + '<div class="absolute left-0 right-0 top-0 h-10 bg-gradient-to-b from-slate-950 to-transparent z-10 pointer-events-none"></div>'
    + '<div id="tScroll" class="h-full overflow-y-auto px-6 sm:px-10"><div style="height:130px"></div><p id="tText" class="leading-relaxed font-semibold" style="font-size:30px"></p><div style="height:240px"></div></div>'
    + '<div class="absolute left-0 right-0 bottom-0 h-10 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none"></div></div>'
    + '<div class="grid sm:grid-cols-3 gap-4 mt-4">'
    + field("Kecepatan Gulir", '<input id="tSpeed" type="range" min="8" max="140" value="45" class="w-full accent-brand-600" oninput="tele.speed=Number(this.value);teleInfo()">', "")
    + field("Ukuran Font", '<input id="tFont" type="range" min="18" max="60" value="30" class="w-full accent-brand-600" oninput="document.getElementById(\'tText\').style.fontSize=this.value+\'px\'">', "")
    + field("Timer Sidang (menit)", '<div class="flex gap-2"><input id="tMenit" type="number" value="10" min="1" max="120" class="' + IN + '"><button class="' + BTN2 + '" onclick="teleTimer()">⏱ Mulai</button></div>', "")
    + '</div><div id="tInfo"></div></div>';
  $("#tText").textContent = $("#tIn").value;
  $("#tIn").addEventListener("input", () => { $("#tText").textContent = $("#tIn").value; teleInfo(); });
  teleInfo();
};
function teleInfo() {
  const words = ($("#tIn").value.trim().match(/\S+/g) || []).length;
  const est = words / 130;
  $("#tInfo").innerHTML = '<div class="flex flex-wrap gap-2 text-sm"><span class="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1.5 font-bold">📝 ' + words + ' kata</span>'
    + '<span class="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1.5 font-bold">🎙 Estimasi bicara (±130 kata/menit): ±' + Math.floor(est) + " menit " + Math.round((est % 1) * 60) + ' detik</span>'
    + '<span id="tClock" class="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1.5 font-bold">⏱ Timer: --:--</span></div>';
}
function teleStep(ts) {
  if (!tele.playing) return;
  const dt = Math.min(0.05, (ts - tele.last) / 1000 || 0); tele.last = ts;
  const sc = $("#tScroll"); if (sc) { sc.scrollTop += tele.speed * dt; if (sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 2) { teleToggle(); toast("Naskah selesai 🎉"); } }
  tele.raf = requestAnimationFrame(teleStep);
}
function teleToggle() {
  tele.playing = !tele.playing;
  const b = $("#tPlay"); if (b) b.textContent = tele.playing ? "⏸ Jeda" : "▶️ Mulai Latihan";
  if (tele.playing) { tele.last = performance.now(); tele.raf = requestAnimationFrame(teleStep); }
  else if (tele.raf) cancelAnimationFrame(tele.raf);
}
function teleReset() { const sc = $("#tScroll"); if (sc) sc.scrollTop = 0; }
function teleMirror() { $("#tStage").classList.toggle("tele-mirror", $("#tMirror").checked); }
function teleTimer() {
  const menit = Number($("#tMenit").value) || 10;
  tele.remain = menit * 60;
  clearInterval(tele.timerInt);
  const upd = () => { const c = $("#tClock"); if (!c) { clearInterval(tele.timerInt); return; } const mm = String(Math.floor(tele.remain / 60)).padStart(2, "0"), ss = String(tele.remain % 60).padStart(2, "0"); c.textContent = "⏱ Sisa waktu: " + mm + ":" + ss; if (tele.remain <= 0) { clearInterval(tele.timerInt); toast("⏰ Waktu latihan habis!"); c.textContent = "⏱ Waktu habis!"; } tele.remain--; };
  upd(); tele.timerInt = setInterval(upd, 1000);
}
window._teleStop = (function (prev) { return function () { if (prev) prev(); tele.playing = false; if (tele.raf) cancelAnimationFrame(tele.raf); clearInterval(tele.timerInt); }; })(window._teleStop);

/* ---------- 10. SIMULATOR TARGET IPK ---------- */
UI.ipk = function (el) {
  el.innerHTML = '<div class="fadein"><div class="grid sm:grid-cols-2 gap-x-4">'
    + field("IPK Saat Ini", '<input id="gNow" type="number" step="0.01" min="0" max="4" value="3.00" class="' + IN + '">')
    + field("Total SKS Sudah Ditempuh", '<input id="gDone" type="number" min="0" value="100" class="' + IN + '">')
    + field("Target IPK Kelulusan", '<input id="gTarget" type="number" step="0.01" min="0" max="4" value="3.51" class="' + IN + '">', "Cumlaude umumnya ≥ 3,51.")
    + field("Sisa SKS yang Akan Diambil", '<input id="gLeft" type="number" min="1" value="44" class="' + IN + '">')
    + '</div><button class="' + BTN + '" onclick="hitungIpk()">📈 Hitung Kebutuhan IP</button>' + outBox("gOut") + "</div>";
};
function hitungIpk() {
  const now = Number($("#gNow").value), done = Number($("#gDone").value), target = Number($("#gTarget").value), left = Number($("#gLeft").value);
  const out = $("#gOut");
  if ([now, done, target, left].some((v) => isNaN(v)) || left < 1) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Lengkapi semua angka dengan benar ya.</div>'; return; }
  const total = done + left;
  const need = (target * total - now * done) / left;
  const maxFinal = (now * done + 4 * left) / total;
  const f2 = (x) => x.toFixed(2).replace(".", ",");
  let status, color;
  if (need > 4) { status = "🚨 Target ini TIDAK MUNGKIN tercapai secara matematis — IPK maksimum yang bisa kamu raih adalah " + f2(maxFinal) + ". Turunkan target atau perpanjang masa studi (ambil SKS tambahan) untuk menaikkan peluang."; color = "#DC2626"; }
  else if (need >= 3.7) { status = "🔥 Sangat berat tapi MUNGKIN — kamu harus nyaris sempurna (mayoritas A) di semua sisa mata kuliah."; color = "#D97706"; }
  else if (need >= 3.0) { status = "💪 Menantang tapi realistis — butuh konsistensi nilai A dan B+ di sisa semester."; color = "#2563EB"; }
  else if (need > 0) { status = "😌 Relatif aman — pertahankan ritme belajarmu dan target ini tercapai."; color = "#059669"; }
  else { status = "🎉 Target sudah terlampaui bahkan jika sisa SKS bernilai 0 — IPK kamu sudah di atas target!"; color = "#059669"; }
  const sken = [3.0, 3.5, 3.7, 4.0].map((ip) => { const fin = (now * done + ip * left) / total; return '<tr class="border-b border-slate-200 dark:border-slate-700"><td class="py-1.5 pr-3">Rata-rata IP sisa = ' + f2(ip) + '</td><td class="py-1.5 font-bold ' + (fin >= target ? "text-emerald-600" : "text-slate-500") + '">IPK akhir ' + f2(fin) + (fin >= target ? " ✅" : "") + "</td></tr>"; }).join("");
  window._ipkTxt = "SIMULASI TARGET IPK — MahasiswaTools\nIPK saat ini " + f2(now) + " (" + done + " SKS), target " + f2(target) + ", sisa " + left + " SKS.\nIP rata-rata minimum yang wajib diraih di sisa SKS: " + (need > 4 ? "> 4,00 (tidak mungkin)" : f2(need)) + ".\nIPK maksimum yang masih bisa dicapai: " + f2(maxFinal) + ".\n" + status.replace(/<[^>]+>/g, "") + "\n";
  out.innerHTML = '<div class="' + OUT + '"><div class="grid sm:grid-cols-2 gap-3 mb-4">'
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-4 text-center"><div class="text-3xl font-extrabold text-brand-600 dark:text-brand-300">' + (need > 4 ? "&gt; 4,00" : f2(Math.max(0, need))) + '</div><div class="text-xs text-slate-500 mt-1">IP rata-rata minimum di sisa ' + left + ' SKS</div></div>'
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-4 text-center"><div class="text-3xl font-extrabold">' + f2(maxFinal) + '</div><div class="text-xs text-slate-500 mt-1">IPK maksimum yang bisa dicapai</div></div></div>'
    + '<p class="font-bold leading-relaxed" style="color:' + color + '">' + status + '</p>'
    + '<h4 class="font-bold mt-4 mb-1.5">Skenario IPK Akhir:</h4><table class="w-full text-left text-sm"><tbody>' + sken + "</tbody></table>"
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="copyText(window._ipkTxt)">📋 Copy Hasil</button></div></div>';
}

;

/* ============================================================
   TOOLS 11–15
   ============================================================ */
/* ---------- 11. PENGACAK KELOMPOK ---------- */
UI.kelompok = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Daftar Nama Mahasiswa", '<textarea id="kIn" rows="9" class="' + IN + '" placeholder="Satu nama per baris. Boleh tambah tag di belakang koma, cth:&#10;Andi Pratama, L&#10;Sari Wulandari, P&#10;Budi Santoso, L"></textarea>', "Tag L/P opsional — aktifkan penyeimbang agar tiap kelompok campuran merata.")
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Jumlah Kelompok", '<input id="kN" type="number" min="1" value="4" class="' + IN + '">')
    + field("Penyeimbang Gender", '<label class="flex items-center gap-2 text-sm font-semibold pt-2"><input id="kBal" type="checkbox" checked class="w-4 h-4 accent-brand-600"> Seimbangkan L/P antar kelompok (bila ada tag)</label>')
    + '</div><button class="' + BTN + '" onclick="acakKelompok()">🎲 Acak & Bagi Kelompok</button>' + outBox("kOut") + "</div>";
};
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function acakKelompok() {
  const raw = $("#kIn").value.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const n = Math.max(1, Number($("#kN").value) || 1);
  const out = $("#kOut");
  if (raw.length < n) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Jumlah nama (' + raw.length + ') lebih sedikit dari jumlah kelompok (' + n + ").</div>"; return; }
  const people = raw.map((l) => { const m = l.match(/^(.*?)[,\s]*\(?\s*(L|P| laki-laki| perempuan)\s*\)?\s*$/i); if (m && /,|\(/.test(l)) return { name: m[1].trim(), tag: m[2].trim().toUpperCase()[0] }; return { name: l, tag: "" }; });
  const groups = Array.from({ length: n }, () => []);
  const deal = (list) => { let gi = 0; shuffle(list).forEach((p) => { groups[gi % n].push(p); gi++; }); };
  if ($("#kBal").checked && people.some((p) => p.tag)) {
    deal(people.filter((p) => p.tag === "L")); deal(people.filter((p) => p.tag === "P")); deal(people.filter((p) => !p.tag));
    groups.forEach((g) => shuffle(g));
  } else deal(people.slice());
  window._kelompok = groups.map((g, i) => "KELOMPOK " + (i + 1) + " (" + g.length + " orang)\n" + g.map((p, j) => (j + 1) + ". " + p.name + (p.tag ? " (" + p.tag + ")" : "")).join("\n")).join("\n\n");
  out.innerHTML = '<div class="' + OUT + '"><div class="grid sm:grid-cols-2 gap-3">'
    + groups.map((g, i) => '<div class="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4"><h4 class="font-extrabold text-brand-600 dark:text-brand-300 mb-2">👥 Kelompok ' + (i + 1) + ' <span class="text-xs text-slate-400 font-semibold">(' + g.length + ' orang)</span></h4><ol class="list-decimal list-inside text-sm space-y-1">' + g.map((p) => "<li>" + esc(p.name) + (p.tag ? ' <span class="text-xs font-bold text-slate-400">(' + p.tag + ")</span>" : "") + "</li>").join("") + "</ol></div>").join("")
    + '</div><div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="copyText(window._kelompok)">📋 Copy Semua Kelompok</button>'
    + '<button class="' + BTN2 + '" onclick="acakKelompok()">🔀 Acak Ulang</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Pembagian_Kelompok.txt\', window._kelompok)">⬇️ Download .txt</button></div></div>';
}

/* ---------- 12. SPLITTER KAS & PATUNGAN ---------- */
UI.splitter = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Siapa Mengeluarkan Uang Berapa", '<textarea id="spIn" rows="8" class="' + IN + ' font-mono" placeholder="Satu orang per baris — format: Nama : jumlah yang SUDAH dibayarkan. Cth:&#10;Andi : 90000&#10;Sari : 30000&#10;Budi : 0"></textarea>', "Yang belum mengeluarkan uang tulis 0. Format angka bebas: 90000 / 90.000 / Rp 90.000.")
    + '<button class="' + BTN + '" onclick="hitungSplitter()">💸 Hitung Penyelesaian</button>' + outBox("spOut") + "</div>";
};
function parseRupiah(s) { const d = String(s).replace(/[^\d]/g, ""); return d ? Number(d) : 0; }
function hitungSplitter() {
  const lines = $("#spIn").value.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const out = $("#spOut");
  const people = [];
  for (const l of lines) {
    const m = l.match(/^(.*?)[\s:,-]+([\d\.\s]+)$/) || l.match(/^(.*?)\s+(\d+)$/);
    if (m) people.push({ name: m[1].replace(/[:,-]$/, "").trim(), paid: parseRupiah(m[2]) });
  }
  if (people.length < 2) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Minimal 2 orang dengan format "Nama : jumlah" ya.</div>'; return; }
  const total = people.reduce((a, p) => a + p.paid, 0);
  const share = total / people.length;
  const rp = (x) => "Rp " + Math.round(x).toLocaleString("id-ID");
  const creditors = people.filter((p) => p.paid - share > 0.5).map((p) => ({ name: p.name, amt: p.paid - share })).sort((a, b) => b.amt - a.amt);
  const debtors = people.filter((p) => share - p.paid > 0.5).map((p) => ({ name: p.name, amt: share - p.paid })).sort((a, b) => b.amt - a.amt);
  const transfers = [];
  let ci = 0, di = 0; const C = creditors.map((c) => ({ ...c })), D = debtors.map((d) => ({ ...d }));
  while (di < D.length && ci < C.length) { const pay = Math.min(D[di].amt, C[ci].amt); transfers.push({ from: D[di].name, to: C[ci].name, amt: pay }); D[di].amt -= pay; C[ci].amt -= pay; if (D[di].amt < 0.5) di++; if (C[ci].amt < 0.5) ci++; }
  const detailRows = people.map((p) => { const bal = p.paid - share; return '<tr class="border-b border-slate-200 dark:border-slate-700"><td class="py-1.5 pr-3 font-semibold">' + esc(p.name) + '</td><td class="py-1.5 pr-3">' + rp(p.paid) + '</td><td class="py-1.5 font-bold ' + (bal > 0.5 ? "text-emerald-600" : bal < -0.5 ? "text-rose-600" : "text-slate-400") + '">' + (bal > 0.5 ? "Kelebihan " + rp(bal) : bal < -0.5 ? "Kurang " + rp(-bal) : "Pas ✅") + "</td></tr>"; }).join("");
  window._split = "PENYELESAIAN PATUNGAN — MahasiswaTools\nTotal pengeluaran: " + rp(total) + " | " + people.length + " orang | Patungan per orang: " + rp(share) + "\n\nRINCIAN:\n" + people.map((p) => p.name + " membayar " + rp(p.paid)).join("\n") + "\n\nTRANSFER PENYELESAIAN:\n" + (transfers.length ? transfers.map((t) => t.from + " → transfer " + rp(t.amt) + " ke " + t.to).join("\n") : "Semua sudah pas, tidak ada transfer yang diperlukan.") + "\n";
  out.innerHTML = '<div class="' + OUT + '"><div class="flex flex-wrap gap-2 mb-3"><span class="rounded-lg bg-white dark:bg-slate-900 px-3 py-1.5 font-bold">Total: ' + rp(total) + '</span><span class="rounded-lg bg-brand-100 dark:bg-brand-900 px-3 py-1.5 font-bold">Per orang: ' + rp(share) + "</span></div>"
    + '<table class="w-full text-left text-sm mb-4"><thead><tr class="border-b-2 border-slate-300 dark:border-slate-600"><th class="py-1.5 pr-3">Nama</th><th class="py-1.5 pr-3">Sudah Bayar</th><th class="py-1.5">Status</th></tr></thead><tbody>' + detailRows + "</tbody></table>"
    + '<h4 class="font-bold mb-2">🤝 Transfer Penyelesaian:</h4>'
    + (transfers.length ? '<ul class="space-y-1.5">' + transfers.map((t) => '<li class="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 font-semibold">' + esc(t.from) + ' → transfer <span class="text-brand-600 dark:text-brand-300">' + rp(t.amt) + "</span> ke " + esc(t.to) + "</li>").join("") + "</ul>" : '<p class="font-semibold text-emerald-600">Semua sudah pas — tidak ada transfer yang diperlukan 🎉</p>')
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="copyText(window._split)">📋 Copy Rincian</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Splitter_Patungan.txt\', window._split)">⬇️ Download .txt</button></div></div>';
}

/* ---------- 13. GENERATOR CHAT DOSEN & SURAT ---------- */
UI.chatdosen = function (el) {
  el.innerHTML = '<div class="fadein"><div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Tujuan Pesan", '<select id="cTuj" class="' + IN + '"><option value="bimbingan">📚 Bimbingan Skripsi</option><option value="izin">🤒 Izin Tidak Masuk (Sakit/Kepentingan)</option><option value="ttd">✍️ Minta Tanda Tangan</option><option value="nilai">📊 Menanyakan Nilai</option><option value="judul">💡 Konsultasi Judul Skripsi</option></select>')
    + field("Waktu Pengiriman", '<select id="cWkt" class="' + IN + '"><option value="auto">🕐 Otomatis (sesuai jam sekarang)</option><option value="Pagi">Pagi</option><option value="Siang">Siang</option><option value="Sore">Sore</option><option value="Malam">Malam</option></select>')
    + field("Nama Kamu", '<input id="cNama" class="' + IN + '" placeholder="cth: Detta Pranata">')
    + field("NIM", '<input id="cNim" class="' + IN + '" placeholder="cth: 2021010001">')
    + field("Program Studi & Kelas/Semester", '<input id="cProdi" class="' + IN + '" placeholder="cth: S1 Ekonomi, Kelas A Semester 7">')
    + field("Nama Dosen (dengan gelar)", '<input id="cDosen" class="' + IN + '" placeholder="cth: Dr. Budi Santoso, M.Si.">')
    + field("Mata Kuliah / Keperluan", '<input id="cMatkul" class="' + IN + '" placeholder="cth: Metodologi Penelitian / Skripsi">')
    + field("Detail Tambahan", '<input id="cDetail" class="' + IN + '" placeholder="cth: izin tanggal 25 Oktober karena demam / dokumen lembar pengesahan">')
    + '</div><button class="' + BTN + '" onclick="buatChatDosen()">✉️ Buat Pesan Sopan</button>' + outBox("cOut") + "</div>";
};
function buatChatDosen() {
  const tuj = $("#cTuj").value;
  let waktu = $("#cWkt").value;
  if (waktu === "auto") { const h = new Date().getHours(); waktu = h < 11 ? "Pagi" : h < 15 ? "Siang" : h < 19 ? "Sore" : "Malam"; }
  const nama = $("#cNama").value.trim() || "[Nama Kamu]", nim = $("#cNim").value.trim() || "[NIM]", prodi = $("#cProdi").value.trim() || "[Prodi/Kelas]", dosen = $("#cDosen").value.trim() || "[Nama Dosen]", mk = $("#cMatkul").value.trim() || "[Mata Kuliah]", detail = $("#cDetail").value.trim();
  const inti = {
    bimbingan: "mohon izin untuk mengajukan bimbingan " + mk + ". Saya telah menyelesaikan progres terbaru dan sangat mengharapkan arahan serta masukan dari Bapak/Ibu. Saya siap menyesuaikan waktu dengan jadwal Bapak/Ibu",
    izin: "mohon izin tidak dapat mengikuti perkuliahan " + mk + (detail ? " pada " + detail : "") + " dikarenakan kondisi kesehatan/kepentingan mendesak yang tidak dapat saya tinggalkan. Saya akan mempelajari materi secara mandiri dan melengkapi tugas yang diberikan",
    ttd: "mohon kesediaan Bapak/Ibu untuk menandatangani " + (detail || "dokumen akademik saya") + " terkait " + mk + ". Saya siap datang pada waktu dan tempat yang Bapak/Ibu tentukan",
    nilai: "mohon izin menanyakan perihal nilai mata kuliah " + mk + " yang belum muncul/belum jelas di sistem akademik. Apabila terdapat kekurangan berkas atau tugas dari saya, dengan senang hati akan segera saya lengkapi",
    judul: "mohon arahan dan masukan dari Bapak/Ibu terkait rencana pengajuan judul skripsi saya di bidang " + mk + ". Saya sangat mengharapkan bimbingan Bapak/Ibu agar judul yang saya ajukan tepat dan layak untuk diteliti"
  }[tuj];
  const wa = "Selamat " + waktu.toLowerCase() + ", Bapak/Ibu " + dosen + ".\n\nMohon maaf mengganggu waktunya. Perkenalkan, saya " + nama + " (NIM " + nim + "), mahasiswa " + prodi + ".\n\nMaksud saya menghubungi Bapak/Ibu adalah " + inti + ".\n\nDemikian yang dapat saya sampaikan. Atas perhatian dan kesediaan Bapak/Ibu, saya ucapkan terima kasih yang sebesar-besarnya.\n\nHormat saya,\n" + nama;
  const emailSubj = { bimbingan: "Permohonan Bimbingan — " + nama + " (" + nim + ")", izin: "Permohonan Izin Tidak Mengikuti Perkuliahan — " + nama + " (" + nim + ")", ttd: "Permohonan Tanda Tangan Dokumen — " + nama + " (" + nim + ")", nilai: "Pertanyaan Nilai Mata Kuliah " + mk + " — " + nama, judul: "Konsultasi Judul Skripsi — " + nama + " (" + nim + ")" }[tuj];
  const email = "Subjek: " + emailSubj + "\n\nYth. Bapak/Ibu " + dosen + "\ndi tempat\n\nSelamat " + waktu.toLowerCase() + ", Bapak/Ibu.\n\nPerkenalkan, saya " + nama + " (NIM " + nim + "), mahasiswa " + prodi + ". Melalui email ini saya " + inti + ".\n\nDemikian permohonan ini saya sampaikan. Atas perhatian dan kebijaksanaan Bapak/Ibu, saya mengucapkan terima kasih.\n\nHormat saya,\n" + nama + "\nNIM " + nim;
  let surat = "";
  if (tuj === "izin") surat = "SURAT PERMOHONAN IZIN TIDAK MENGIKUTI PERKULIAHAN\n\nKepada Yth.\nBapak/Ibu " + dosen + "\nDosen Pengampu Mata Kuliah " + mk + "\ndi tempat\n\nDengan hormat,\nSaya yang bertanda tangan di bawah ini:\n\nNama\t: " + nama + "\nNIM\t: " + nim + "\nProgram Studi\t: " + prodi + "\n\nDengan ini memohon izin untuk tidak mengikuti perkuliahan mata kuliah " + mk + (detail ? " pada " + detail : "") + " dikarenakan sakit/kepentingan mendesak. Sebagai tanggung jawab, saya akan mempelajari materi secara mandiri dan melengkapi seluruh tugas yang diberikan.\n\nDemikian surat permohonan ini saya buat dengan sebenar-benarnya. Atas perhatian dan izin yang diberikan, saya ucapkan terima kasih.\n\nHormat saya,\n\n\n(" + nama + ")\nNIM " + nim + "\n";
  window._wa = wa; window._email = email; window._surat = surat;
  const block = (title, id, txt, btn) => '<h4 class="font-bold mt-4 mb-1.5">' + title + '</h4><textarea readonly rows="9" class="' + IN + '">' + esc(txt) + "</textarea>" + btn;
  $("#cOut").innerHTML = '<div class="' + OUT + '">'
    + block("💬 Versi WhatsApp", "wa", wa, '<div class="flex gap-2 mt-2"><button class="' + BTN + '" onclick="copyText(window._wa)">📋 Copy Pesan WA</button></div>')
    + block("📧 Versi Email", "em", email, '<div class="flex gap-2 mt-2"><button class="' + BTN + '" onclick="copyText(window._email)">📋 Copy Email</button></div>')
    + (surat ? block("📄 Draf Surat Izin Resmi", "sr", surat, '<div class="flex flex-wrap gap-2 mt-2"><button class="' + BTN + '" onclick="copyText(window._surat)">📋 Copy Surat</button><button class="' + BTN2 + '" onclick="download(\'Surat_Izin.doc\', \'<html><body style=&quot;font-family:serif;font-size:12pt;white-space:pre-wrap&quot;>\' + esc(window._surat) + \'</body></html>\', \'application/msword\')">⬇️ Download Surat .doc</button></div>') : '<p class="text-xs text-slate-500 mt-3">ℹ️ Draf surat resmi otomatis muncul bila tujuan = Izin Tidak Masuk.</p>')
    + "</div>";
}

function toRoman(num) {
  if (num < 1 || num > 3999) return null;
  const T = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  let r = ""; for (const [v, s] of T) while (num >= v) { r += s; num -= v; } return r;
}
UI.terbilang = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Nominal Angka (Rupiah)", '<input id="tbIn" type="text" inputmode="numeric" value="1540000" class="' + IN + ' font-mono" oninput="prosesTerbilang()">', "Untuk kwitansi & LPJ KKN — hasil otomatis muncul saat mengetik.")
    + outBox("tbOut")
    + '<hr class="my-6 border-slate-200 dark:border-slate-700">'
    + field("Angka → Romawi (1–3999)", '<input id="rmIn" type="number" min="1" max="3999" value="2026" class="' + IN + ' font-mono" oninput="prosesRomawi()">')
    + outBox("rmOut") + "</div>";
  prosesTerbilang(); prosesRomawi();
};
function prosesTerbilang() {
  const raw = $("#tbIn").value.replace(/[^\d]/g, "");
  const out = $("#tbOut"); if (!out) return;
  if (!raw) { out.innerHTML = ""; return; }
  const n = Number(raw);
  const teks = (n === 0 ? "Nol" : terbilangStr(n).replace(/\s+/g, " ").trim()) + " Rupiah";
  window._terbilang = teks;
  out.innerHTML = '<div class="' + OUT + '"><div class="text-xs font-bold text-slate-500 mb-1">Rp ' + n.toLocaleString("id-ID") + ' dibaca:</div><p class="text-lg font-extrabold leading-relaxed">“' + teks + '”</p>'
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="' + BTN + '" onclick="copyText(window._terbilang)">📋 Copy Terbilang</button></div></div>';
}
function prosesRomawi() {
  const n = Number($("#rmIn").value); const out = $("#rmOut"); if (!out) return;
  const r = toRoman(n);
  window._romawi = r || "";
  out.innerHTML = '<div class="' + OUT + '">' + (r ? '<p class="text-lg font-extrabold">' + n.toLocaleString("id-ID") + ' = <span class="text-brand-600 dark:text-brand-300">' + r + '</span></p><div class="flex gap-2 mt-3"><button class="' + BTN + '" onclick="copyText(window._romawi)">📋 Copy Romawi</button></div>' : '<p class="text-rose-600 font-semibold">⚠️ Angka Romawi standar hanya untuk 1–3999.</p>') + "</div>";
}

/* ---------- 15. BUDGET HARIAN ANAK KOS ---------- */
UI.budgetkos = function (el) {
  el.innerHTML = '<div class="fadein"><div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Uang Bulanan (kiriman + penghasilan)", '<input id="bUang" type="number" value="2000000" class="' + IN + '">')
    + field("Target Tabungan per Bulan", '<input id="bTab" type="number" value="200000" class="' + IN + '">')
    + field("Kos / Kontrakan", '<input id="bKos" type="number" value="600000" class="' + IN + '">')
    + field("Listrik & Air", '<input id="bListrik" type="number" value="100000" class="' + IN + '">')
    + field("Kuota Internet & Pulsa", '<input id="bKuota" type="number" value="100000" class="' + IN + '">')
    + field("Transport Tetap & Lain-lain", '<input id="bLain" type="number" value="100000" class="' + IN + '">')
    + '</div><button class="' + BTN + '" onclick="hitungBudget()">🍜 Hitung Budget Aman</button>' + outBox("bOut") + "</div>";
};
function hitungBudget() {
  const g = (id) => Math.max(0, Number($("#" + id).value) || 0);
  const uang = g("bUang"), tab = g("bTab"), tetap = g("bKos") + g("bListrik") + g("bKuota") + g("bLain");
  const sisa = uang - tetap - tab;
  const perHari = sisa / 30, perMinggu = sisa * 7 / 30;
  const rp = (x) => "Rp " + Math.round(x).toLocaleString("id-ID");
  const out = $("#bOut");
  let status, color;
  if (sisa < 0) { status = "🚨 DEFISIT " + rp(-sisa) + " — biaya tetap + tabungan melebihi uang bulanan. Kurangi target tabungan atau cari penghasilan tambahan sebelum mengatur jajan."; color = "#DC2626"; }
  else if (perHari >= 50000) { status = "😌 Aman — jatah harianmu longgar. Tetap prioritaskan makan bergizi dan jangan lupa tabungan jalan terus."; color = "#059669"; }
  else if (perHari >= 30000) { status = "💪 Cukup — masih bisa makan enak 2–3 kali sehari kalau masak sesekali. Jaga pengeluaran impulsif."; color = "#2563EB"; }
  else { status = "⚠️ Ketat — strategi bertahan: masak nasi + lauk sederhana, batasi jajan & kopi kekinian, manfaatkan promo. Kamu bisa!"; color = "#D97706"; }
  const bar = (label, val, max, cls) => '<div class="mb-2.5"><div class="flex justify-between text-sm font-semibold"><span>' + label + '</span><span>' + rp(val) + '</span></div><div class="h-3 rounded-full bg-slate-200 dark:bg-slate-700 mt-1"><div class="h-3 rounded-full ' + cls + '" style="width:' + (max ? Math.min(100, Math.max(0, val / max * 100)) : 0) + '%"></div></div></div>';
  window._budget = "BUDGET ANAK KOS — MahasiswaTools\nUang bulanan: " + rp(uang) + "\nBiaya tetap: " + rp(tetap) + "\nTarget tabungan: " + rp(tab) + "\nSisa untuk makan & jajan: " + rp(Math.max(0, sisa)) + "\nBatas aman per hari: " + rp(Math.max(0, perHari)) + "\nBatas aman per minggu: " + rp(Math.max(0, perMinggu)) + "\n" + status + "\n";
  out.innerHTML = '<div class="' + OUT + '"><div class="grid sm:grid-cols-2 gap-3 mb-4">'
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-4 text-center"><div class="text-3xl font-extrabold text-brand-600 dark:text-brand-300">' + rp(Math.max(0, perHari)) + '</div><div class="text-xs text-slate-500 mt-1">Batas aman makan & jajan / HARI</div></div>'
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-4 text-center"><div class="text-3xl font-extrabold">' + rp(Math.max(0, perMinggu)) + '</div><div class="text-xs text-slate-500 mt-1">Batas aman / MINGGU</div></div></div>'
    + bar("💰 Uang bulanan", uang, uang, "bg-brand-500") + bar("🏠 Biaya tetap (kos, listrik, kuota, dll.)", tetap, uang, "bg-amber-500") + bar("🐖 Tabungan", tab, uang, "bg-emerald-500") + bar("🍜 Sisa makan & jajan", Math.max(0, sisa), uang, "bg-violet-500")
    + '<p class="font-bold leading-relaxed mt-3" style="color:' + color + '">' + status + '</p>'
    + '<p class="text-xs text-slate-500 mt-2">Asumsi 30 hari/bulan. Tips: pisahkan uang makan mingguan ke dompet/e-wallet terpisah agar tidak kebablasan di awal bulan.</p>'
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="copyText(window._budget)">📋 Copy Ringkasan</button></div></div>';
}


;

/* ============================================================
   TOOLS 16–22 (+ pemuat library eksternal)
   ============================================================ */

/* ---------- 16. TEMPLATE SKRIPSI .DOCX MARGIN 4433 ---------- */
UI.k16 = function (el) {
  el.innerHTML = '<div class="fadein"><div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Judul Skripsi", '<input id="xJud" class="' + IN + '" value="Pengaruh Media Sosial terhadap Prestasi Belajar Siswa">')
    + field("Nama Lengkap", '<input id="xNama" class="' + IN + '" placeholder="Nama kamu">')
    + field("NIM", '<input id="xNim" class="' + IN + '" placeholder="NIM kamu">')
    + field("Program Studi", '<input id="xProdi" class="' + IN + '" placeholder="cth: Pendidikan Ekonomi">')
    + field("Fakultas", '<input id="xFak" class="' + IN + '" placeholder="cth: Fakultas Keguruan dan Ilmu Pendidikan">')
    + field("Universitas", '<input id="xUniv" class="' + IN + '" placeholder="cth: Universitas Contoh Indonesia">')
    + field("Kota & Tahun", '<input id="xKota" class="' + IN + '" value="Jakarta, 2026">')
    + field("Dosen Pembimbing", '<input id="xDospem" class="' + IN + '" placeholder="Nama + gelar dosen pembimbing">')
    + '</div><div class="rounded-xl bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800 p-4 text-sm mb-4">📐 <b>Spesifikasi dokumen asli .docx:</b> kertas A4, margin <b>4-4-3-3</b> (atas 4 cm, kiri 4 cm, bawah 3 cm, kanan 3 cm), Times New Roman 12, spasi 1,5 — berisi cover, kata pengantar, daftar isi, dan kerangka BAB I–V + daftar pustaka contoh, siap langsung ditimpa isi skripsimu.</div>'
    + '<button class="' + BTN + '" onclick="buatDocx()">⬇️ Generate & Download .docx</button> <span id="xStat" class="text-sm text-slate-500"></span></div>';
};
function pDoc(text, o) {
  o = o || {};
  const pPr = '<w:pPr>' + (o.center ? '<w:jc w:val="center"/>' : "") + (o.pb ? '<w:pageBreakBefore/>' : "")
    + '<w:spacing w:after="' + (o.after != null ? o.after : 120) + '" w:line="360" w:lineRule="auto"/></w:pPr>';
  const rPr = '<w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:sz w:val="' + (o.sz || 24) + '"/>'
    + (o.b ? "<w:b/>" : "") + (o.i ? "<w:i/>" : "") + (o.caps ? "<w:caps/>" : "") + "</w:rPr>";
  return "<w:p>" + pPr + "<w:r>" + rPr + '<w:t xml:space="preserve">' + xe(text) + "</w:t></w:r></w:p>";
}
function headingBab(t) { return pDoc(t, { center: 1, b: 1, sz: 28, pb: 1, after: 200 }); }
function subBab(t) { return pDoc(t, { b: 1, after: 80 }); }
function panduan(t) { return pDoc("[" + t + "]", { i: 1, after: 120 }); }
async function buatDocx() {
  const stat = $("#xStat"); stat.textContent = "⏳ Menyiapkan library…";
  const ok = await loadLib("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js", "JSZip");
  if (!ok) { stat.textContent = "❌ Gagal memuat JSZip (butuh internet sekali untuk library). Coba lagi ya."; return; }
  const g = (id) => $("#" + id).value.trim();
  const judul = g("xJud") || "Judul Skripsi", nama = g("xNama") || "Nama Mahasiswa", nim = g("xNim") || "NIM", prodi = g("xProdi") || "Program Studi", fak = g("xFak") || "Fakultas", univ = g("xUniv") || "Universitas", kota = g("xKota") || "2026", dospem = g("xDospem") || "…………………………";
  const _lgD = getLogoData(); const _lmD = getLogoMeta();
  if (_lgD) { const cxE = 1260000; const cyE = Math.min(1440000, Math.round(cxE * ((_lmD.h || 1) / (_lmD.w || 1)))); window._docxLogoPara = '<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:after="300"/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="' + cxE + '" cy="' + cyE + '"/><wp:docPr id="1" name="Logo"/><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="1" name="logo.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="rIdLogo"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="' + cxE + '" cy="' + cyE + '"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>'; } else window._docxLogoPara = null;
  const B = [];
  for (let i = 0; i < 4; i++) B.push(pDoc(""));
  B.push(pDoc(judul.toUpperCase(), { center: 1, b: 1, sz: 28, after: 300 }));
  B.push(pDoc("SKRIPSI", { center: 1, b: 1, sz: 26, after: 200 }));
  B.push(pDoc("Diajukan untuk memenuhi salah satu syarat memperoleh gelar Sarjana pada " + prodi + ", " + fak + ", " + univ + ".", { center: 1, after: 300 }));
  if (window._docxLogoPara) B.push(window._docxLogoPara); else B.push(pDoc("[ LOGO UNIVERSITAS ]", { center: 1, after: 300 }));
  B.push(pDoc("Disusun oleh:", { center: 1, after: 60 }));
  B.push(pDoc(nama, { center: 1, b: 1, after: 40 }));
  B.push(pDoc("NIM. " + nim, { center: 1, after: 300 }));
  B.push(pDoc(prodi.toUpperCase(), { center: 1, b: 1, after: 40 }));
  B.push(pDoc(fak.toUpperCase(), { center: 1, b: 1, after: 40 }));
  B.push(pDoc(univ.toUpperCase(), { center: 1, b: 1, after: 200 }));
  B.push(pDoc(kota.toUpperCase(), { center: 1, b: 1 }));
  B.push(headingBab("KATA PENGANTAR"));
  B.push(pDoc("Puji syukur penulis panjatkan ke hadirat Tuhan Yang Maha Esa karena berkat rahmat dan karunia-Nya, penulis dapat menyelesaikan skripsi yang berjudul \u201C" + judul + "\u201D ini tepat pada waktunya."));
  B.push(pDoc("Skripsi ini disusun sebagai salah satu syarat untuk memperoleh gelar Sarjana pada " + prodi + ", " + fak + ", " + univ + ". Dalam penyusunan skripsi ini, penulis banyak menerima bantuan, bimbingan, dan dukungan dari berbagai pihak. Oleh karena itu, penulis mengucapkan terima kasih kepada:"));
  B.push(pDoc("1. " + dospem + ", selaku Dosen Pembimbing yang telah meluangkan waktu, tenaga, dan pikiran untuk membimbing penulis;"));
  B.push(pDoc("2. Kedua orang tua dan keluarga tercinta atas doa serta dukungan yang tiada henti;"));
  B.push(pDoc("3. Seluruh pihak yang tidak dapat penulis sebutkan satu per satu."));
  B.push(pDoc("Penulis menyadari skripsi ini masih jauh dari sempurna. Kritik dan saran yang membangun sangat penulis harapkan. Semoga skripsi ini bermanfaat bagi pembaca."));
  B.push(pDoc(kota.split(",")[0] + ", Penulis", { after: 300 }));
  B.push(pDoc(nama, { b: 1 }));
  B.push(headingBab("DAFTAR ISI"));
  ["KATA PENGANTAR", "DAFTAR ISI", "BAB I PENDAHULUAN", "1.1 Latar Belakang", "1.2 Rumusan Masalah", "1.3 Tujuan Penelitian", "1.4 Manfaat Penelitian", "BAB II TINJAUAN PUSTAKA", "2.1 Kajian Teori", "2.2 Penelitian Terdahulu", "2.3 Kerangka Berpikir", "2.4 Hipotesis Penelitian", "BAB III METODE PENELITIAN", "BAB IV HASIL DAN PEMBAHASAN", "BAB V PENUTUP", "DAFTAR PUSTAKA"].forEach((t) => B.push(pDoc(t, { after: 40 })));
  B.push(headingBab("BAB I — PENDAHULUAN"));
  B.push(subBab("1.1 Latar Belakang")); B.push(panduan("Uraikan fenomena dan data pendukung dari yang umum ke yang khusus (piramida terbalik), tunjukkan kesenjangan antara harapan dan kenyataan, lalu tutup dengan alasan mengapa penelitian ini penting dilakukan."));
  B.push(subBab("1.2 Rumusan Masalah")); B.push(pDoc("Berdasarkan latar belakang di atas, rumusan masalah dalam penelitian ini adalah:")); B.push(pDoc("1. Apakah terdapat pengaruh … terhadap …?")); B.push(pDoc("2. Seberapa besar pengaruh … terhadap …?"));
  B.push(subBab("1.3 Tujuan Penelitian")); B.push(panduan("Tulis tujuan yang sejajar dengan rumusan masalah, diawali kata kerja operasional: untuk mengetahui, untuk menganalisis, dst."));
  B.push(subBab("1.4 Manfaat Penelitian")); B.push(pDoc("1. Manfaat Teoretis: memperkaya khazanah ilmu …")); B.push(pDoc("2. Manfaat Praktis: bagi sekolah/lembaga, bagi guru/dosen, bagi peneliti selanjutnya."));
  B.push(headingBab("BAB II — TINJAUAN PUSTAKA"));
  B.push(subBab("2.1 Kajian Teori")); B.push(panduan("Paparkan definisi dan indikator setiap variabel dari beberapa ahli, lalu simpulkan definisi operasional versimu."));
  B.push(subBab("2.2 Penelitian Terdahulu")); B.push(panduan("Sajikan minimal 5 jurnal relevan: persamaan, perbedaan, dan posisi penelitianmu. Gunakan Matriks Sintesis Jurnal di MahasiswaTools."));
  B.push(subBab("2.3 Kerangka Berpikir")); B.push(panduan("Gambar alur logis variabel X memengaruhi Y beserta narasi penjelasannya."));
  B.push(subBab("2.4 Hipotesis Penelitian")); B.push(pDoc("Ha: Terdapat pengaruh yang signifikan antara … terhadap ….")); B.push(pDoc("H0: Tidak terdapat pengaruh yang signifikan antara … terhadap …"));
  B.push(headingBab("BAB III — METODE PENELITIAN"));
  ["3.1 Jenis dan Pendekatan Penelitian", "3.2 Waktu dan Tempat Penelitian", "3.3 Populasi dan Sampel", "3.4 Variabel dan Definisi Operasional", "3.5 Teknik Pengumpulan Data", "3.6 Instrumen Penelitian", "3.7 Teknik Analisis Data"].forEach((t) => { B.push(subBab(t)); B.push(panduan("Jelaskan sub-bab ini secara operasional dan spesifik pada penelitianmu, sertakan rumus yang dipakai bila ada.")); });
  B.push(headingBab("BAB IV — HASIL DAN PEMBAHASAN"));
  ["4.1 Gambaran Umum Objek Penelitian", "4.2 Deskripsi Data", "4.3 Hasil Uji Instrumen (Validitas & Reliabilitas)", "4.4 Hasil Uji Hipotesis", "4.5 Pembahasan"].forEach((t) => { B.push(subBab(t)); B.push(panduan("Sajikan data dan hasil analisis secara sistematis, lalu bahas dengan mengaitkan teori dan penelitian terdahulu.")); });
  B.push(headingBab("BAB V — PENUTUP"));
  B.push(subBab("5.1 Kesimpulan")); B.push(panduan("Jawab setiap rumusan masalah secara ringkas, tanpa data baru."));
  B.push(subBab("5.2 Saran")); B.push(panduan("Saran praktis yang benar-benar lahir dari temuan penelitianmu."));
  B.push(headingBab("DAFTAR PUSTAKA"));
  B.push(pDoc("Anderson, L. W., & Krathwohl, D. R. (2001). A Taxonomy for Learning, Teaching, and Assessing: A Revision of Bloom's Taxonomy of Educational Objectives. New York: Longman.", { after: 80 }));
  B.push(pDoc("Sugiyono. (2019). Metode Penelitian Kuantitatif, Kualitatif, dan R&D. Bandung: Alfabeta.", { after: 80 }));
  const sect = '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="2268" w:right="1701" w:bottom="1701" w:left="2268" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr>';
  const _logoData = getLogoData(); const _lm = getLogoMeta();
  if (_logoData) { const cxL = 1260000; const cyL = Math.min(1440000, Math.round(cxL * ((_lm.h || 1) / (_lm.w || 1)))); window._docxLogoPara = '<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:after="300"/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="' + cxL + '" cy="' + cyL + '"/><wp:docPr id="1" name="Logo"/><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="1" name="logo.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="rIdLogo"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="' + cxL + '" cy="' + cyL + '"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>'; } else window._docxLogoPara = null;
  const doc = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>' + B.join("") + sect + "</w:body></w:document>";
  const ct = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>';
  const rels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>';
  const zip = new JSZip();
  zip.file("[Content_Types].xml", ct); zip.folder("_rels").file(".rels", rels); const _wf = zip.folder("word"); _wf.file("document.xml", doc); if (_logoData) { _wf.folder("_rels").file("document.xml.rels", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdLogo" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/logo.png"/></Relationships>'); _wf.folder("media").file("logo.png", _logoData.split(",")[1], { base64: true }); }
  const blob = await zip.generateAsync({ type: "blob", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
  window._lastDocx = blob;
  stat.textContent = "✅ Berhasil dibuat!";
  download("Template_Skripsi_4433.docx", blob);
}

/* ---------- 17. MATRIKS SINTESIS JURNAL ---------- */
let sintesis = store.get("mt_sintesis", []);
UI.k17 = function (el) {
  el.innerHTML = '<div class="fadein"><div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Peneliti & Tahun", '<input id="snPen" class="' + IN + '" placeholder="cth: Rahmawati (2022)">')
    + field("Judul Penelitian", '<input id="snJud" class="' + IN + '" placeholder="Judul jurnal/skripsi terdahulu">')
    + field("Metode", '<input id="snMet" class="' + IN + '" placeholder="cth: Kuantitatif, survei, n=120">')
    + field("Hasil Utama", '<input id="snHas" class="' + IN + '" placeholder="Temuan kunci penelitian tersebut">')
    + field("Persamaan dengan Penelitianmu", '<input id="snSama" class="' + IN + '" placeholder="Variabel/metode/objek yang sama">')
    + field("Perbedaan (Celah/Gap)", '<input id="snBeda" class="' + IN + '" placeholder="Yang membedakan → jadi kebaruan penelitianmu">')
    + '</div><button class="' + BTN + '" onclick="tambahSintesis()">➕ Tambah Baris</button>' + outBox("snOut") + "</div>";
  renderSintesis();
};
function tambahSintesis() {
  const g = (id) => $("#" + id).value.trim();
  const e = { pen: g("snPen"), jud: g("snJud"), met: g("snMet"), has: g("snHas"), sama: g("snSama"), beda: g("snBeda") };
  if (!e.pen || !e.jud) { toast("⚠️ Minimal Peneliti dan Judul diisi."); return; }
  sintesis.push(e); store.set("mt_sintesis", sintesis);
  ["snPen", "snJud", "snMet", "snHas", "snSama", "snBeda"].forEach((i) => $("#" + i).value = "");
  renderSintesis();
}
function hapusSintesis(i) { sintesis.splice(i, 1); store.set("mt_sintesis", sintesis); renderSintesis(); }
function renderSintesis() {
  const out = $("#snOut"); if (!out) return;
  if (!sintesis.length) { out.innerHTML = '<div class="' + OUT + ' text-slate-500">Matriks masih kosong — tambahkan jurnal pertamamu. Data tersimpan otomatis di browser.</div>'; return; }
  const rows = sintesis.map((e, i) => "<tr class='border-b border-slate-200 dark:border-slate-700'><td class='py-2 pr-2 font-semibold'>" + (i + 1) + "</td><td class='py-2 pr-2'>" + esc(e.pen) + "</td><td class='py-2 pr-2'>" + esc(e.jud) + "</td><td class='py-2 pr-2'>" + esc(e.met) + "</td><td class='py-2 pr-2'>" + esc(e.has) + "</td><td class='py-2 pr-2'>" + esc(e.sama) + "</td><td class='py-2 pr-2'>" + esc(e.beda) + "</td><td class='py-2'><button class='text-rose-500 font-bold' onclick='hapusSintesis(" + i + ")'>✕</button></td></tr>").join("");
  window._sintesisCsv = "No;Peneliti & Tahun;Judul;Metode;Hasil Utama;Persamaan;Perbedaan\n" + sintesis.map((e, i) => [i + 1, e.pen, e.jud, e.met, e.has, e.sama, e.beda].map((v) => '"' + String(v).replace(/"/g, '""') + '"').join(";")).join("\n");
  window._sintesisDoc = "<html><body><h3>Matriks Sintesis Penelitian Terdahulu</h3><table border='1' cellspacing='0' cellpadding='6' style='border-collapse:collapse;font-family:serif;font-size:11pt'><tr><th>No</th><th>Peneliti</th><th>Judul</th><th>Metode</th><th>Hasil</th><th>Persamaan</th><th>Perbedaan</th></tr>" + sintesis.map((e, i) => "<tr><td>" + (i + 1) + "</td><td>" + esc(e.pen) + "</td><td>" + esc(e.jud) + "</td><td>" + esc(e.met) + "</td><td>" + esc(e.has) + "</td><td>" + esc(e.sama) + "</td><td>" + esc(e.beda) + "</td></tr>").join("") + "</table></body></html>";
  out.innerHTML = '<div class="' + OUT + '"><div class="overflow-x-auto"><table class="w-full text-left text-[13px] min-w-[760px]"><thead><tr class="border-b-2 border-slate-300 dark:border-slate-600"><th class="py-2 pr-2">No</th><th class="py-2 pr-2">Peneliti</th><th class="py-2 pr-2">Judul</th><th class="py-2 pr-2">Metode</th><th class="py-2 pr-2">Hasil Utama</th><th class="py-2 pr-2">Persamaan</th><th class="py-2 pr-2">Perbedaan</th><th></th></tr></thead><tbody>' + rows + "</tbody></table></div>"
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="download(\'Matriks_Sintesis.doc\', window._sintesisDoc, \'application/msword\')">⬇️ Download .doc (Word)</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Matriks_Sintesis.csv\', window._sintesisCsv, \'text/csv\')">⬇️ Download CSV</button></div></div>';
}

/* ---------- 18. KAMUS KALIMAT AKADEMIK ---------- */
const PHRASES = [
  ["Pendahuluan", "Penelitian ini dilatarbelakangi oleh ___ yang semakin ___."], ["Pendahuluan", "___ merupakan salah satu isu penting dalam ___ karena ___."], ["Pendahuluan", "Berdasarkan observasi awal yang dilakukan di ___, ditemukan bahwa ___."], ["Pendahuluan", "Fenomena ___ menarik untuk dikaji lebih lanjut mengingat ___."], ["Pendahuluan", "Kesenjangan antara ___ dan ___ inilah yang mendorong peneliti untuk melakukan penelitian ini."],
  ["Rumusan & Tujuan", "Berdasarkan latar belakang tersebut, rumusan masalah dalam penelitian ini adalah ___."], ["Rumusan & Tujuan", "Penelitian ini bertujuan untuk mengetahui ___."], ["Rumusan & Tujuan", "Adapun manfaat yang diharapkan dari penelitian ini adalah ___."], ["Rumusan & Tujuan", "Secara khusus, penelitian ini diarahkan untuk menganalisis ___."],
  ["Kajian Teori", "Menurut ___ (___), ___ adalah ___."], ["Kajian Teori", "___ mendefinisikan ___ sebagai ___."], ["Kajian Teori", "Teori ___ menjelaskan bahwa ___."], ["Kajian Teori", "Indikator ___ menurut ___ meliputi ___, ___, dan ___."], ["Kajian Teori", "Berdasarkan pendapat para ahli di atas, dapat disimpulkan bahwa ___ adalah ___."],
  ["Penelitian Terdahulu", "Penelitian yang dilakukan oleh ___ (___) menunjukkan bahwa ___."], ["Penelitian Terdahulu", "Persamaan penelitian ini dengan penelitian ___ (___) terletak pada ___."], ["Penelitian Terdahulu", "Adapun perbedaan penelitian ini dengan penelitian sebelumnya adalah ___."], ["Penelitian Terdahulu", "Berbeda dengan penelitian ___, penelitian ini memfokuskan pada ___."],
  ["Metode", "Penelitian ini menggunakan pendekatan ___ dengan metode ___."], ["Metode", "Populasi dalam penelitian ini adalah ___."], ["Metode", "Sampel ditentukan dengan teknik ___ sehingga diperoleh ___ responden."], ["Metode", "Data dikumpulkan melalui ___ dan dianalisis menggunakan teknik ___."], ["Metode", "Instrumen penelitian terlebih dahulu diuji validitas dan reliabilitasnya menggunakan ___."],
  ["Hasil", "Berdasarkan hasil analisis data, diperoleh ___."], ["Hasil", "Hasil uji ___ menunjukkan nilai ___ sehingga dapat disimpulkan bahwa ___."], ["Hasil", "Temuan penelitian ini menunjukkan bahwa ___."], ["Hasil", "Sebagian besar responden (___%) menyatakan bahwa ___."],
  ["Pembahasan", "Hasil penelitian ini sejalan dengan teori ___ yang menyatakan bahwa ___."], ["Pembahasan", "Temuan ini memperkuat penelitian ___ (___) yang menemukan bahwa ___."], ["Pembahasan", "Temuan ini berbeda dengan penelitian ___ yang menemukan bahwa ___. Perbedaan ini diduga disebabkan oleh ___."], ["Pembahasan", "Hal ini mengindikasikan bahwa ___."],
  ["Kesimpulan", "Berdasarkan hasil penelitian dan pembahasan, dapat disimpulkan bahwa ___."], ["Kesimpulan", "Peneliti menyarankan ___ agar ___."], ["Kesimpulan", "Penelitian selanjutnya diharapkan dapat ___ dengan mempertimbangkan keterbatasan penelitian ini, antara lain ___."]
];
UI.k18 = function (el) {
  el.innerHTML = '<div class="fadein"><div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Kategori", '<select id="phCat" class="' + IN + '" onchange="renderPhrases()"><option value="">Semua Kategori</option>' + [...new Set(PHRASES.map((p) => p[0]))].map((c) => "<option>" + c + "</option>").join("") + "</select>")
    + field("Cari Kalimat", '<input id="phQ" class="' + IN + '" placeholder="Ketik kata kunci…" oninput="renderPhrases()">')
    + '</div><p class="text-xs text-slate-500 mb-2">Klik kalimat untuk menyalin & menambahkannya ke koleksimu. Ganti bagian ___ dengan isi penelitianmu.</p>'
    + '<div id="phList" class="space-y-2 mb-5"></div>'
    + field("📁 Koleksi Kalimat Saya", '<textarea id="phMine" rows="6" class="' + IN + '">' + esc(store.get("mt_phrases_mine", "")) + "</textarea>")
    + '<div class="flex flex-wrap gap-2"><button class="' + BTN + '" onclick="copyText(document.getElementById(\'phMine\').value)">📋 Copy Koleksi</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Koleksi_Kalimat_Akademik.txt\', document.getElementById(\'phMine\').value)">⬇️ Download .txt</button>'
    + '<button class="' + BTN2 + '" onclick="simpanKoleksi()">💾 Simpan Koleksi</button></div></div>';
  renderPhrases();
};
function renderPhrases() {
  const cat = $("#phCat").value, q = ($("#phQ").value || "").toLowerCase();
  const list = PHRASES.map((p, i) => ({ ...{ cat: p[0], txt: p[1] }, i })).filter((p) => (!cat || p.cat === cat) && (!q || p.txt.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q)));
  $("#phList").innerHTML = list.length ? list.map((p) => '<button class="w-full text-left rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:border-brand-400 px-4 py-3 transition" onclick="pilihFrase(' + p.i + ')"><span class="text-[11px] font-bold text-brand-600 dark:text-brand-300 uppercase tracking-wide">' + p.cat + '</span><br><span class="text-sm">' + esc(p.txt) + "</span></button>").join("") : '<p class="text-sm text-slate-500">Tidak ada kalimat yang cocok.</p>';
}
function pilihFrase(i) {
  const t = PHRASES[i][1];
  const ta = $("#phMine"); ta.value = (ta.value ? ta.value.replace(/\s+$/, "") + "\n" : "") + t;
  store.set("mt_phrases_mine", ta.value);
  copyText(t, "Kalimat disalin & masuk koleksi ✅");
}
function simpanKoleksi() { store.set("mt_phrases_mine", $("#phMine").value); toast("Koleksi tersimpan di browser 💾"); }

/* ---------- 19. GENERATOR ABSTRAK DWIBAHASA ---------- */
const IDEN = [["penelitian ini bertujuan untuk", "this study aims to"], ["hasil penelitian menunjukkan bahwa", "the results of this study show that"], ["hasil penelitian menunjukkan", "the results show"], ["dapat disimpulkan bahwa", "it can be concluded that"], ["metode yang digunakan adalah", "the method used was"], ["prestasi belajar", "learning achievement"], ["media sosial", "social media"], ["hasil belajar", "learning outcomes"], ["motivasi belajar", "learning motivation"], ["minat belajar", "learning interest"], ["pengaruh", "effect"], ["hubungan", "relationship"], ["terhadap", "on"], ["responden", "respondents"], ["kuesioner", "questionnaire"], ["signifikan", "significant"], ["kuantitatif", "quantitative"], ["kualitatif", "qualitative"], ["pengumpulan data", "data collection"], ["analisis data", "data analysis"], ["siswa", "students"], ["mahasiswa", "college students"], ["guru", "teachers"], ["dosen", "lecturers"], ["sekolah", "school"], ["penelitian ini", "this study"], ["variabel", "variable"], ["sampel", "sample"], ["populasi", "population"]];
function translateLite(text) {
  let t = " " + text + " ";
  IDEN.forEach(([id, en]) => { t = t.replace(new RegExp(id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), en); });
  return t.trim().replace(/\s+/g, " ");
}
UI.k19 = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Latar Belakang (1–2 kalimat)", '<textarea id="aLat" rows="2" class="' + IN + '" placeholder="Konteks & masalah penelitianmu"></textarea>')
    + field("Tujuan Penelitian", '<textarea id="aTuj" rows="2" class="' + IN + '" placeholder="cth: mengetahui pengaruh media sosial terhadap prestasi belajar siswa"></textarea>')
    + field("Metode", '<textarea id="aMet" rows="2" class="' + IN + '" placeholder="cth: kuantitatif dengan metode survei kepada 86 responden menggunakan analisis regresi linear sederhana"></textarea>')
    + field("Hasil Utama", '<textarea id="aHas" rows="2" class="' + IN + '" placeholder="Temuan terpenting beserta angkanya bila ada"></textarea>')
    + field("Kesimpulan", '<textarea id="aSim" rows="2" class="' + IN + '" placeholder="Simpulan akhir penelitian"></textarea>')
    + field("Kata Kunci (pisahkan koma)", '<input id="aKey" class="' + IN + '" placeholder="cth: media sosial, prestasi belajar, siswa">')
    + '<button class="' + BTN + '" onclick="buatAbstrak()">🌐 Generate Abstrak ID + EN</button>' + outBox("aOut") + "</div>";
};
function buatAbstrak() {
  const g = (id) => $("#" + id).value.trim().replace(/\s+/g, " ");
  const dot = (s) => s ? (s.endsWith(".") ? s : s + ".") : "";
  const lat = g("aLat"), tuj = g("aTuj"), met = g("aMet"), has = g("aHas"), sim = g("aSim"), key = g("aKey");
  if (!tuj || !met || !has) { $("#aOut").innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Minimal Tujuan, Metode, dan Hasil diisi dulu ya.</div>'; return; }
  const idAbstrak = [dot(lat), "Penelitian ini bertujuan untuk " + tuj.replace(/^untuk\s+/i, "") + ".", "Metode yang digunakan adalah " + met.replace(/^menggunakan\s+/i, "") + ".", "Hasil penelitian menunjukkan bahwa " + has + ".", "Dapat disimpulkan bahwa " + sim + "."].map(dot).join(" ").replace(/\.\./g, ".");
  const enAbstrak = [dot(translateLite(lat)), "This study aims to determine " + translateLite(tuj.replace(/^untuk\s+/i, "").replace(/^mengetahui\s+/i, "")) + ".", "The method used was " + translateLite(met) + ".", "The results show that " + translateLite(has) + ".", "It can be concluded that " + translateLite(sim) + "."].map(dot).join(" ").replace(/\.\./g, ".");
  const keyEn = key.split(",").map((k) => translateLite(k.trim())).join(", ");
  window._abstrak = "ABSTRAK\n\n" + idAbstrak + "\n\nKata kunci: " + key + "\n\nABSTRACT\n\n" + enAbstrak + "\n\nKeywords: " + keyEn + "\n";
  const wc = (s) => s.split(/\s+/).filter(Boolean).length;
  const badge = (s) => { const n = wc(s); return '<span class="rounded-lg px-3 py-1.5 font-bold ' + (n >= 150 && n <= 250 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" : "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300") + '">' + n + " kata " + (n >= 150 && n <= 250 ? "(ideal 150–250 ✅)" : "(ideal: 150–250 kata)") + "</span>"; };
  $("#aOut").innerHTML = '<div class="' + OUT + '"><h4 class="font-bold mb-1.5">🇮🇩 ABSTRAK</h4><p class="prose-out leading-relaxed bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">' + esc(idAbstrak) + '</p><p class="mt-2 text-sm"><b>Kata kunci:</b> ' + esc(key) + '</p><p class="mt-2">' + badge(idAbstrak) + "</p>"
    + '<h4 class="font-bold mt-5 mb-1.5">🇬🇧 ABSTRACT</h4><p class="prose-out leading-relaxed bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">' + esc(enAbstrak) + '</p><p class="mt-2 text-sm"><b>Keywords:</b> ' + esc(keyEn) + "</p>"
    + '<p class="text-xs text-slate-500 mt-2">Catatan jujur: versi Inggris adalah kerangka otomatis dengan terjemahan frasa akademik umum — selalu periksa kembali tata bahasanya sebelum submit.</p>'
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="copyText(window._abstrak)">📋 Copy Keduanya</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Abstrak_Dwibahasa.txt\', window._abstrak)">⬇️ Download .txt</button></div></div>';
}

/* ---------- 20. TARGET KATA & DEADLINE ---------- */
UI.k20 = function (el) {
  const d60 = new Date(Date.now() + 60 * 864e5).toISOString().slice(0, 10);
  el.innerHTML = '<div class="fadein"><div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Target Total Kata Skripsi", '<input id="wTarget" type="number" value="40000" class="' + IN + '">')
    + field("Kata yang Sudah Ditulis", '<input id="wNow" type="number" value="10000" class="' + IN + '">')
    + field("Tanggal Deadline", '<input id="wDate" type="date" value="' + d60 + '" class="' + IN + '">')
    + field("Hari Libur Menulis per Minggu", '<select id="wOff" class="' + IN + '"><option value="0">0 hari (gas tiap hari)</option><option value="1" selected>1 hari</option><option value="2">2 hari</option></select>')
    + '</div><button class="' + BTN + '" onclick="hitungTargetKata()">⏱️ Buat Rencana Menulis</button>' + outBox("wOut") + "</div>";
};
function hitungTargetKata() {
  const target = Number($("#wTarget").value) || 0, now = Number($("#wNow").value) || 0, off = Number($("#wOff").value);
  const dl = new Date($("#wDate").value + "T23:59:59");
  const days = Math.max(1, Math.ceil((dl - Date.now()) / 864e5));
  const eff = Math.max(1, Math.round(days * (7 - off) / 7));
  const sisa = Math.max(0, target - now);
  const perDay = Math.ceil(sisa / eff), perWeek = Math.ceil(sisa / Math.max(1, eff / (7 - off)));
  const BAB = [["BAB I — Pendahuluan", 0.15], ["BAB II — Tinjauan Pustaka", 0.30], ["BAB III — Metode", 0.10], ["BAB IV — Hasil & Pembahasan", 0.35], ["BAB V — Penutup", 0.10]];
  let cumDays = 0, cumWords = now;
  const rows = BAB.map(([n, p]) => {
    const kataBab = Math.round(target * p);
    const dBab = Math.max(1, Math.round(eff * p));
    cumDays += dBab;
    const tgl = new Date(Date.now() + cumDays / ((7 - off) / 7) * 864e5);
    return '<tr class="border-b border-slate-200 dark:border-slate-700"><td class="py-2 pr-3 font-semibold">' + n + '</td><td class="py-2 pr-3">' + kataBab.toLocaleString("id-ID") + ' kata</td><td class="py-2">± ' + tgl.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) + "</td></tr>";
  }).join("");
  const pct = target ? Math.min(100, Math.round(now / target * 100)) : 0;
  window._rencana = "RENCANA TARGET KATA SKRIPSI — MahasiswaTools\nTarget: " + target.toLocaleString("id-ID") + " kata | Sudah: " + now.toLocaleString("id-ID") + " (" + pct + "%) | Sisa: " + sisa.toLocaleString("id-ID") + " kata\nDeadline: " + dl.toLocaleDateString("id-ID") + " (" + days + " hari lagi, " + eff + " hari menulis efektif)\nTarget menulis: " + perDay.toLocaleString("id-ID") + " kata/hari, ±" + perWeek.toLocaleString("id-ID") + " kata/minggu.\n";
  $("#wOut").innerHTML = '<div class="' + OUT + '"><div class="grid sm:grid-cols-3 gap-3 mb-4">'
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-3 text-center"><div class="text-2xl font-extrabold text-brand-600 dark:text-brand-300">' + perDay.toLocaleString("id-ID") + '</div><div class="text-xs text-slate-500">kata / hari menulis</div></div>'
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-3 text-center"><div class="text-2xl font-extrabold">' + perWeek.toLocaleString("id-ID") + '</div><div class="text-xs text-slate-500">kata / minggu</div></div>'
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-3 text-center"><div class="text-2xl font-extrabold">' + pct + '%</div><div class="text-xs text-slate-500">progres (' + sisa.toLocaleString("id-ID") + " kata lagi)</div></div></div>"
    + '<div class="h-3.5 rounded-full bg-slate-200 dark:bg-slate-700 mb-4"><div class="h-3.5 rounded-full bg-gradient-to-r from-brand-500 to-violet-500" style="width:' + pct + '%"></div></div>'
    + '<h4 class="font-bold mb-1.5">🗓️ Milestone per Bab (estimasi tanggal selesai):</h4><table class="w-full text-left text-sm"><tbody>' + rows + "</tbody></table>"
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="copyText(window._rencana)">📋 Copy Rencana</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Rencana_Target_Kata.txt\', window._rencana)">⬇️ Download .txt</button></div></div>';
}

/* ---------- 21. GLOSARIUM & SINGKATAN SORTER ---------- */
UI.k21 = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Daftar Istilah / Singkatan", '<textarea id="gIn" rows="9" class="' + IN + '" placeholder="Satu entri per baris. Format bebas:&#10;Variabel = besaran yang dapat diukur dan berubah&#10;KKN : Kuliah Kerja Nyata&#10;SPSS — Statistical Package for the Social Sciences"></textarea>', "Pisahkan istilah dan definisi dengan =, :, —, atau Tab. Hasil diurutkan A–Z, duplikat terdeteksi otomatis.")
    + '<button class="' + BTN + '" onclick="sortirGlosarium()">🔠 Urutkan A–Z</button>' + outBox("gOut2") + "</div>";
};
function sortirGlosarium() {
  const lines = $("#gIn").value.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const out = $("#gOut2");
  const entries = [], bad = [];
  lines.forEach((l) => {
    const m = l.match(/^(.+?)\s*(?:=|:|—|–|\t)\s*(.+)$/);
    if (m) entries.push({ term: m[1].trim(), def: m[2].trim() });
    else bad.push(l);
  });
  entries.sort((a, b) => a.term.localeCompare(b.term, "id", { sensitivity: "base" }));
  const seen = {}, dups = [];
  entries.forEach((e) => { const k = e.term.toLowerCase(); if (seen[k]) dups.push(e.term); seen[k] = 1; });
  window._glos = entries.map((e) => e.term + " : " + e.def).join("\n");
  window._glosDoc = '<html><body style="font-family:serif;font-size:12pt">' + entries.map((e) => "<p><b>" + esc(e.term) + ":</b> " + esc(e.def) + "</p>").join("") + "</body></html>";
  out.innerHTML = '<div class="' + OUT + '"><div class="flex flex-wrap gap-2 mb-3"><span class="rounded-lg bg-white dark:bg-slate-900 px-3 py-1.5 font-bold">' + entries.length + ' entri terurut A–Z</span>'
    + (dups.length ? '<span class="rounded-lg bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 px-3 py-1.5 font-bold">⚠️ Duplikat: ' + esc([...new Set(dups)].join(", ")) + "</span>" : "")
    + (bad.length ? '<span class="rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 px-3 py-1.5 font-bold">⚠️ ' + bad.length + " baris tanpa definisi: " + esc(bad.slice(0, 4).join(", ")) + "</span>" : "") + "</div>"
    + '<div class="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">' + entries.map((e) => '<p class="mb-1.5" style="padding-left:2em;text-indent:-2em"><b>' + esc(e.term) + ":</b> " + esc(e.def) + "</p>").join("") + "</div>"
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="copyText(window._glos)">📋 Copy Hasil</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Glosarium_AZ.txt\', window._glos)">⬇️ Download .txt</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Glosarium_AZ.doc\', window._glosDoc, \'application/msword\')">⬇️ .doc</button></div></div>';
}

/* ---------- 22. TABEL TERBUKA STANDAR JURNAL ---------- */
UI.k22 = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Judul Tabel", '<input id="tjCap" class="' + IN + '" value="Tabel 1. Hasil Uji Validitas Instrumen">')
    + field("Data Tabel", '<textarea id="tjIn" rows="7" class="' + IN + ' font-mono" placeholder="Paste dari Excel (baris pertama = header kolom)">Butir\tr Hitung\tr Tabel\tKeterangan&#10;B1\t0,512\t0,361\tValid&#10;B2\t0,634\t0,361\tValid&#10;B3\t0,289\t0,361\tTidak Valid</textarea>')
    + field("Catatan Kaki Tabel (opsional)", '<input id="tjNote" class="' + IN + '" placeholder="cth: Sumber: Data diolah peneliti (2026)">')
    + '<button class="' + BTN + '" onclick="buatTabelJurnal()">📋 Buat Tabel Jurnal</button>' + outBox("tjOut") + "</div>";
};
function buatTabelJurnal() {
  const rows = $("#tjIn").value.split(/\r?\n/).filter((l) => l.trim()).map((l) => l.includes("\t") ? l.split("\t") : l.includes(";") ? l.split(";") : l.split(","));
  const out = $("#tjOut");
  if (rows.length < 2) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Minimal ada baris header + 1 baris data.</div>'; return; }
  const cap = $("#tjCap").value.trim(), note = $("#tjNote").value.trim();
  const isNum = (v) => /^[\d.,%()\-+]+$/.test(String(v).trim()) && /\d/.test(v);
  const th = rows[0].map((h) => '<th style="padding:6px 10px;text-align:left;border-bottom:1.2pt solid #000;font-weight:bold">' + esc(h) + "</th>").join("");
  const tb = rows.slice(1).map((r) => "<tr>" + r.map((c) => '<td style="padding:5px 10px;' + (isNum(c) ? "text-align:right;" : "") + '">' + esc(c) + "</td>").join("") + "</tr>").join("");
  const html = '<p style="font-family:\'Times New Roman\',serif;font-size:12pt;margin:0 0 4pt 0"><b>' + esc(cap) + '</b></p>'
    + '<table style="border-collapse:collapse;font-family:\'Times New Roman\',serif;font-size:11pt;border-top:2.2pt solid #000;border-bottom:2.2pt solid #000;min-width:70%"><thead><tr>' + th + "</tr></thead><tbody>" + tb + "</tbody></table>"
    + (note ? '<p style="font-family:\'Times New Roman\',serif;font-size:10pt;font-style:italic;margin-top:4pt">' + esc(note) + "</p>" : "");
  window._tabelJurnal = html;
  out.innerHTML = '<div class="' + OUT + '"><div class="bg-white text-slate-900 rounded-lg p-4 overflow-x-auto">' + html + "</div>"
    + '<p class="text-xs text-slate-500 mt-2">Gaya tabel terbuka (booktabs): hanya garis atas, bawah header, dan bawah tabel — tanpa garis vertikal, sesuai standar jurnal ilmiah.</p>'
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="' + BTN + '" onclick="copyTabelJurnal()">📋 Copy Tabel (HTML)</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Tabel_Jurnal.doc\', \'<html><body>\' + window._tabelJurnal + \'</body></html>\', \'application/msword\')">⬇️ Download .doc</button></div></div>';
}
async function copyTabelJurnal() {
  try { await navigator.clipboard.write([new ClipboardItem({ "text/html": new Blob([window._tabelJurnal], { type: "text/html" }), "text/plain": new Blob([window._tabelJurnal.replace(/<[^>]+>/g, " ")], { type: "text/plain" }) })]); toast("Tabel tersalin — paste langsung ke Word ✅"); }
  catch (e) { copyText(window._tabelJurnal); }
}

;

/* ============================================================
   TOOLS 23–27
   ============================================================ */

/* ---------- 23. DUMMY DATA KUESIONER (AUTO-VALID) ---------- */
UI.k23 = function (el) {
  el.innerHTML = '<div class="fadein"><div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Jumlah Responden", '<input id="ddN" type="number" value="30" min="5" max="500" class="' + IN + '">')
    + field("Jumlah Butir Soal", '<input id="ddK" type="number" value="10" min="3" max="50" class="' + IN + '">')
    + field("Skala Jawaban", '<select id="ddS" class="' + IN + '"><option value="5">Skala 5 (1–5)</option><option value="4">Skala 4 (1–4)</option></select>')
    + field("Target Cronbach's Alpha", '<select id="ddA" class="' + IN + '"><option value="0.6">≥ 0,60 (cukup)</option><option value="0.7" selected>≥ 0,70 (baik)</option><option value="0.8">≥ 0,80 (sangat baik)</option></select>')
    + '</div><div class="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 text-sm mb-4">⚠️ <b>Catatan etika:</b> data ini adalah data <b>simulasi acak</b> untuk latihan mengolah data & belajar SPSS — BUKAN data penelitian asli dan tidak boleh diajukan sebagai data lapangan.</div>'
    + '<button class="' + BTN + '" onclick="buatDummy()">🧪 Generate Data Simulasi</button>' + outBox("ddOut") + "</div>";
};
function buatDummy() {
  const n = Math.min(500, Math.max(5, Number($("#ddN").value) || 30));
  const k = Math.min(50, Math.max(3, Number($("#ddK").value) || 10));
  const skala = Number($("#ddS").value), target = Number($("#ddA").value);
  const mid = (skala + 1) / 2;
  let best = null, sigma = 1.0;
  for (let attempt = 0; attempt < 12; attempt++) {
    const shifts = Array.from({ length: k }, () => (Math.random() - 0.5) * 0.6);
    const data = [];
    for (let i = 0; i < n; i++) {
      const theta = randn();
      const row = [];
      for (let j = 0; j < k; j++) row.push(Math.max(1, Math.min(skala, Math.round(mid + shifts[j] + theta * 1.15 + randn() * sigma))));
      data.push(row);
    }
    const a = alphaOf(data);
    if (!best || a > best.alpha) best = { data, alpha: a, attempt: attempt + 1 };
    if (a >= target) break;
    sigma *= 0.78;
  }
  const totals = best.data.map((r) => r.reduce((x, y) => x + y, 0));
  let minR = 1;
  for (let j = 0; j < k; j++) minR = Math.min(minR, pearson(best.data.map((r) => r[j]), totals));
  const header = Array.from({ length: k }, (_, j) => "B" + (j + 1)).join(";");
  window._dummyCsv = header + "\n" + best.data.map((r) => r.join(";")).join("\n");
  window._dummy = best;
  const preview = best.data.slice(0, 10).map((r, i) => "<tr class='border-b border-slate-200 dark:border-slate-700'><td class='py-1 pr-2 font-semibold'>" + (i + 1) + "</td>" + r.map((v) => "<td class='py-1 pr-2'>" + v + "</td>").join("") + "</tr>").join("");
  $("#ddOut").innerHTML = '<div class="' + OUT + '"><div class="grid sm:grid-cols-3 gap-3 mb-4">'
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-3 text-center"><div class="text-2xl font-extrabold text-emerald-600">' + f3(best.alpha) + '</div><div class="text-xs text-slate-500">Cronbach\'s Alpha tercapai (target ' + f3(target) + ")</div></div>"
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-3 text-center"><div class="text-2xl font-extrabold">' + f3(minR) + '</div><div class="text-xs text-slate-500">Korelasi item-total terendah</div></div>'
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-3 text-center"><div class="text-2xl font-extrabold">' + n + " × " + k + '</div><div class="text-xs text-slate-500">Responden × Butir (percobaan ke-' + best.attempt + ")</div></div></div>"
    + '<div class="overflow-x-auto"><table class="w-full text-left text-[13px]"><thead><tr class="border-b-2 border-slate-300 dark:border-slate-600"><th class="py-1.5 pr-2">No</th>' + Array.from({ length: k }, (_, j) => "<th class='py-1.5 pr-2'>B" + (j + 1) + "</th>").join("") + "</tr></thead><tbody>" + preview + "</tbody></table></div>"
    + '<p class="text-xs text-slate-500 mt-2">Pratinjau 10 baris pertama. Unduh CSV untuk data lengkap — langsung bisa dibuka di Excel/SPSS.</p>'
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="' + BTN + '" onclick="download(\'Dummy_Data_Kuesioner.csv\', window._dummyCsv, \'text/csv\')">⬇️ Download CSV</button>'
    + '<button class="' + BTN2 + '" onclick="copyText(window._dummyCsv)">📋 Copy CSV</button></div></div>';
}

/* ---------- 24. PEMBERSIH TRANSKRIP WAWANCARA ---------- */
UI.k24 = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Transkrip Mentah", '<textarea id="trIn" rows="9" class="' + IN + '" placeholder="Tempel transkrip mentah — boleh berisi cap waktu [00:12], kata pengisi (anu, eee, hmm), dan label penutur."></textarea>')
    + '<div class="flex flex-wrap gap-x-5 gap-y-2 mb-4 text-sm font-semibold">'
    + '<label class="flex items-center gap-2"><input id="trTs" type="checkbox" checked class="w-4 h-4 accent-brand-600"> Hapus cap waktu</label>'
    + '<label class="flex items-center gap-2"><input id="trFill" type="checkbox" checked class="w-4 h-4 accent-brand-600"> Hapus kata pengisi (anu, eee, hmm…)</label>'
    + '<label class="flex items-center gap-2"><input id="trRep" type="checkbox" checked class="w-4 h-4 accent-brand-600"> Gabung pengulangan kata (saya saya → saya)</label></div>'
    + '<button class="' + BTN + '" onclick="bersihkanTranskrip()">🎧 Bersihkan Transkrip</button>' + outBox("trOut") + "</div>";
};
function bersihkanTranskrip() {
  let t = $("#trIn").value;
  const before = (t.match(/\S+/g) || []).length;
  if ($("#trTs").checked) t = t.replace(/\[?\d{1,2}:\d{2}(:\d{2})?\]?/g, " ");
  if ($("#trFill").checked) t = t.replace(/\b(anu+|e{2,}|hmm+|emm+|eh+|uh+|aaa+|gitu|kayaknya?|ya kan|kan ya)\b/gi, " ");
  if ($("#trRep").checked) t = t.replace(/\b(\w+)(\s+\1\b)+/gi, "$1");
  t = t.split(/\r?\n/).map((l) => l.replace(/\s{2,}/g, " ").replace(/\s+([.,!?])/g, "$1").trim()).filter(Boolean).join("\n");
  window._transkrip = t;
  const words = (t.toLowerCase().match(/[a-zà-ÿ']+/g) || []).filter((w) => w.length >= 4);
  const freq = {}; words.forEach((w) => freq[w] = (freq[w] || 0) + 1);
  const top = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 15);
  const after = (t.match(/\S+/g) || []).length;
  $("#trOut").innerHTML = '<div class="' + OUT + '"><div class="flex flex-wrap gap-2 mb-3"><span class="rounded-lg bg-white dark:bg-slate-900 px-3 py-1.5 font-bold">Kata: ' + before + " → " + after + '</span><span class="rounded-lg bg-white dark:bg-slate-900 px-3 py-1.5 font-bold">Baris bersih: ' + (t ? t.split("\n").length : 0) + "</span></div>"
    + '<textarea readonly rows="9" class="' + IN + '">' + esc(t) + "</textarea>"
    + '<h4 class="font-bold mt-4 mb-1.5">📊 Frekuensi Kata (15 teratas — bahan koding kualitatif):</h4>'
    + '<div class="flex flex-wrap gap-1.5">' + top.map(([w, c]) => '<span class="rounded-full bg-brand-100 dark:bg-brand-900 px-2.5 py-1 text-xs font-bold">' + esc(w) + " · " + c + "×</span>").join("") + "</div>"
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="copyText(window._transkrip)">📋 Copy Transkrip Bersih</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Transkrip_Bersih.txt\', window._transkrip)">⬇️ Download .txt</button></div></div>';
}

/* ---------- 25. BAGAN KERANGKA BERPIKIR ---------- */
UI.k25 = function (el) {
  el.innerHTML = '<div class="fadein"><div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Variabel X (Bebas)", '<input id="kbX" class="' + IN + '" value="Media Sosial (X)">')
    + field("Indikator X (pisahkan koma)", '<input id="kbXi" class="' + IN + '" value="Durasi penggunaan, Frekuensi akses, Interaksi">')
    + field("Variabel Y (Terikat)", '<input id="kbY" class="' + IN + '" value="Prestasi Belajar (Y)">')
    + field("Indikator Y (pisahkan koma)", '<input id="kbYi" class="' + IN + '" value="Nilai rapor, Keaktifan, Tugas selesai tepat waktu">')
    + field("Variabel Tambahan (opsional)", '<input id="kbZ" class="' + IN + '" placeholder="cth: Motivasi Belajar (Z)">')
    + field("Peran Variabel Tambahan", '<select id="kbZt" class="' + IN + '"><option value="">— Tidak ada —</option><option value="mediasi">Mediasi/Intervening (X → Z → Y)</option><option value="moderasi">Moderasi (memperkuat/memperlemah X → Y)</option></select>')
    + '</div><button class="' + BTN + '" onclick="buatKerangka()">🗺️ Buat Bagan + Narasi</button>' + outBox("kbOut") + "</div>";
};
function boxSvg(x, y, w, title, items, color) {
  let s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + (44 + items.length * 20) + '" rx="10" fill="#EEF4FF" stroke="' + color + '" stroke-width="2"/>'
    + '<text x="' + (x + w / 2) + '" y="' + (y + 27) + '" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="#122B78">' + xe(title) + "</text>";
  items.forEach((it, i) => { s += '<text x="' + (x + w / 2) + '" y="' + (y + 52 + i * 20) + '" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#334155">• ' + xe(it) + "</text>"; });
  return s;
}
function buatKerangka() {
  const g = (id) => $("#" + id).value.trim();
  const X = g("kbX"), Y = g("kbY"), Z = g("kbZ"), zt = g("kbZt");
  const xi = g("kbXi").split(",").map((s) => s.trim()).filter(Boolean);
  const yi = g("kbYi").split(",").map((s) => s.trim()).filter(Boolean);
  const hasZ = Z && zt;
  let svg = '<svg id="kbSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 320" class="w-full bg-white rounded-xl border border-slate-200">'
    + '<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1D49C8"/></marker></defs>';
  if (hasZ && zt === "mediasi") {
    svg += boxSvg(20, 90, 210, X, xi, "#1D49C8") + boxSvg(285, 90, 210, Z, [], "#7C3AED") + boxSvg(550, 90, 210, Y, yi, "#059669");
    svg += '<line x1="232" y1="130" x2="282" y2="130" stroke="#1D49C8" stroke-width="2.5" marker-end="url(#arr)"/><line x1="497" y1="130" x2="547" y2="130" stroke="#1D49C8" stroke-width="2.5" marker-end="url(#arr)"/>';
  } else {
    svg += boxSvg(30, 80, 220, X, xi, "#1D49C8") + boxSvg(530, 80, 220, Y, yi, "#059669");
    svg += '<line x1="252" y1="120" x2="527" y2="120" stroke="#1D49C8" stroke-width="2.5" marker-end="url(#arr)"/><text x="390" y="108" text-anchor="middle" font-family="sans-serif" font-size="13" font-style="italic" fill="#1D49C8">berpengaruh terhadap</text>';
    if (hasZ) { svg += boxSvg(280, 215, 220, Z, [], "#7C3AED") + '<line x1="390" y1="213" x2="390" y2="128" stroke="#7C3AED" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#arr)"/><text x="398" y="180" font-family="sans-serif" font-size="12" fill="#7C3AED">memoderasi</text>'; }
  }
  svg += "</svg>";
  const narasi = "Kerangka berpikir dalam penelitian ini menggambarkan hubungan antara variabel bebas, yaitu " + X + (xi.length ? " dengan indikator " + xi.join(", ").toLowerCase() : "") + ", terhadap variabel terikat, yaitu " + Y + (yi.length ? " dengan indikator " + yi.join(", ").toLowerCase() : "") + "."
    + (hasZ ? (zt === "mediasi" ? " Hubungan tersebut tidak terjadi secara langsung, melainkan melalui variabel mediasi " + Z + " — artinya pengaruh " + X + " terhadap " + Y + " disalurkan lewat " + Z + "." : " Hubungan tersebut diperkuat atau diperlemah oleh variabel moderasi " + Z + ", sehingga besar pengaruh " + X + " terhadap " + Y + " bergantung pada kondisi " + Z + ".") : "")
    + " Berdasarkan kerangka berpikir tersebut, hipotesis yang diajukan adalah: Ha — terdapat pengaruh yang signifikan antara " + X + " terhadap " + Y + "; H0 — tidak terdapat pengaruh yang signifikan antara " + X + " terhadap " + Y + ".";
  window._kerangkaNarasi = narasi;
  $("#kbOut").innerHTML = '<div class="' + OUT + '">' + svg
    + '<h4 class="font-bold mt-4 mb-1.5">📝 Narasi Kerangka Berpikir (siap copy ke Bab 2):</h4><p class="prose-out leading-relaxed bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">' + esc(narasi) + "</p>"
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="unduhKerangkaPng()">⬇️ Download Bagan (PNG)</button>'
    + '<button class="' + BTN2 + '" onclick="copyText(window._kerangkaNarasi)">📋 Copy Narasi</button></div></div>';
}
function unduhKerangkaPng() {
  const svgEl = document.getElementById("kbSvg"); if (!svgEl) return;
  const xml = new XMLSerializer().serializeToString(svgEl);
  const url = URL.createObjectURL(new Blob([xml], { type: "image/svg+xml;charset=utf-8" }));
  const img = new Image();
  img.onload = function () {
    const c = document.createElement("canvas"); c.width = 1560; c.height = 640;
    const ctx = c.getContext("2d"); ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, c.width, c.height); ctx.drawImage(img, 0, 0, c.width, c.height);
    URL.revokeObjectURL(url);
    c.toBlob((b) => { window._kerangkaPng = b; download("Bagan_Kerangka_Berpikir.png", b); }, "image/png");
  };
  img.src = url;
}

/* ---------- 26. GRAFIK BAB 4 ARSIRAN HITAM-PUTIH ---------- */
UI.k26 = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Judul Grafik", '<input id="grT" class="' + IN + '" value="Gambar 1. Hasil Belajar Siswa per Kategori">')
    + field("Data (Label, Nilai — satu baris per batang)", '<textarea id="grIn" rows="6" class="' + IN + ' font-mono">Sangat Baik, 12&#10;Baik, 28&#10;Cukup, 20&#10;Kurang, 6</textarea>')
    + field("Jenis Grafik", '<select id="grMode" class="' + IN + '"><option value="batang">📊 Diagram Batang</option><option value="pie">🥧 Diagram Pie</option></select>')
    + '<button class="' + BTN + '" onclick="buatGrafik()">📊 Buat Grafik Arsiran</button>'
    + '<div class="mt-4"><canvas id="grCv" width="880" height="520" class="w-full bg-white rounded-xl border border-slate-200 hidden"></canvas></div>'
    + outBox("grOut") + "</div>";
};
function polaCanvas(kind) {
  const p = document.createElement("canvas"); p.width = p.height = 10;
  const x = p.getContext("2d"); x.strokeStyle = "#000"; x.lineWidth = 1.4; x.fillStyle = "#000";
  if (kind === 0) { x.beginPath(); x.moveTo(-2, 12); x.lineTo(12, -2); x.moveTo(-2, 2); x.lineTo(2, -2); x.moveTo(8, 12); x.lineTo(12, 8); x.stroke(); }
  else if (kind === 1) { x.beginPath(); x.moveTo(-2, -2); x.lineTo(12, 12); x.moveTo(-2, 8); x.lineTo(2, 12); x.moveTo(8, -2); x.lineTo(12, 2); x.stroke(); }
  else if (kind === 2) { x.beginPath(); x.moveTo(0, 5); x.lineTo(10, 5); x.moveTo(5, 0); x.lineTo(5, 10); x.stroke(); }
  else if (kind === 3) { x.beginPath(); x.arc(5, 5, 1.8, 0, 7); x.fill(); x.beginPath(); x.arc(0, 0, 1.8, 0, 7); x.fill(); x.beginPath(); x.arc(10, 10, 1.8, 0, 7); x.fill(); }
  else if (kind === 4) { x.beginPath(); x.moveTo(0, 2.5); x.lineTo(10, 2.5); x.moveTo(0, 7.5); x.lineTo(10, 7.5); x.stroke(); }
  else if (kind === 5) { x.beginPath(); x.moveTo(2.5, 0); x.lineTo(2.5, 10); x.moveTo(7.5, 0); x.lineTo(7.5, 10); x.stroke(); }
  return p;
}
function buatGrafik() {
  const lines = $("#grIn").value.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const data = [];
  lines.forEach((l) => { const parts = l.includes("\t") ? l.split("\t") : l.split(","); if (parts.length >= 2) { const v = Number(String(parts[parts.length - 1]).replace(",", ".")); if (!isNaN(v)) data.push({ label: parts.slice(0, -1).join(",").trim(), v }); } });
  const out = $("#grOut");
  if (data.length < 2) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Minimal 2 baris data valid (Label, Nilai).</div>'; return; }
  if ($("#grMode") && $("#grMode").value === "pie") { gambarPie(data); return; }
  const cv = $("#grCv"); cv.classList.remove("hidden");
  const ctx = cv.getContext("2d");
  ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, 880, 520);
  ctx.fillStyle = "#000"; ctx.font = "bold 21px Georgia, serif"; ctx.textAlign = "center";
  ctx.fillText($("#grT").value.trim(), 440, 40);
  const L = 80, R = 840, T = 70, B = 440;
  const maxV = Math.max(...data.map((d) => d.v));
  const step = Math.pow(10, Math.floor(Math.log10(maxV))) ; const niceMax = Math.ceil(maxV / step) * step;
  ctx.strokeStyle = "#000"; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.moveTo(L, T); ctx.lineTo(L, B); ctx.lineTo(R, B); ctx.stroke();
  ctx.font = "13px Georgia, serif"; ctx.textAlign = "right";
  for (let i = 0; i <= 5; i++) { const val = niceMax * i / 5, y = B - (B - T) * i / 5; ctx.fillStyle = "#000"; ctx.fillText(String(Math.round(val * 100) / 100), L - 8, y + 4); ctx.strokeStyle = "#DDD"; ctx.beginPath(); ctx.moveTo(L, y); ctx.lineTo(R, y); ctx.stroke(); }
  const slot = (R - L) / data.length, bw = Math.min(95, slot * 0.55);
  data.forEach((d, i) => {
    const cx = L + slot * i + slot / 2, h = (B - T) * d.v / niceMax, y = B - h;
    ctx.fillStyle = ctx.createPattern(polaCanvas(i % 6), "repeat");
    ctx.fillRect(cx - bw / 2, y, bw, h);
    ctx.strokeStyle = "#000"; ctx.lineWidth = 1.8; ctx.strokeRect(cx - bw / 2, y, bw, h);
    ctx.fillStyle = "#000"; ctx.font = "bold 16px Georgia, serif"; ctx.textAlign = "center";
    ctx.fillText(String(d.v), cx, y - 8);
    ctx.font = "13.5px Georgia, serif";
    const lbl = d.label.length > 16 ? d.label.slice(0, 15) + "…" : d.label;
    ctx.fillText(lbl, cx, B + 22);
  });
  ctx.save(); ctx.translate(24, (T + B) / 2); ctx.rotate(-Math.PI / 2); ctx.font = "14px Georgia, serif"; ctx.textAlign = "center"; ctx.fillText("Frekuensi", 0, 0); ctx.restore();
  cv.toBlob((b) => { window._grafikPng = b; }, "image/png");
  out.innerHTML = '<div class="' + OUT + '"><p class="text-sm">Grafik batang hitam-putih dengan ' + data.length + ' pola arsiran berbeda — aman difotokopi & dicetak untuk Bab 4.</p>'
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="' + BTN + '" onclick="download(\'Grafik_Bab4.png\', window._grafikPng)">⬇️ Download PNG</button>'
    + '<button class="' + BTN2 + '" onclick="buatGrafik()">🔄 Gambar Ulang</button></div></div>';
}

/* ---------- 27. OUTLINE → PPTX ---------- */
UI.k27 = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Judul Presentasi", '<input id="ppJud" class="' + IN + '" value="Pengaruh Media Sosial terhadap Prestasi Belajar Siswa">')
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Nama Presenter", '<input id="ppNama" class="' + IN + '" placeholder="Nama kamu">')
    + field("Instansi / Kelas", '<input id="ppInst" class="' + IN + '" placeholder="cth: Universitas Contoh — Kelas A">')
    + '</div>'
    + field("Outline Makalah", '<textarea id="ppIn" rows="10" class="' + IN + '" placeholder="Aturan format:&#10;# BAB I PENDAHULUAN  → slide pemisah bab&#10;## Latar Belakang    → judul slide baru&#10;- poin pertama       → bullet (baris biasa juga jadi bullet)&#10;- poin kedua">## Latar Belakang&#10;- Media sosial digunakan hampir seluruh siswa setiap hari&#10;- Muncul kekhawatiran dampaknya terhadap prestasi belajar&#10;- Penelitian ini menguji pengaruh tersebut secara empiris&#10;## Rumusan Masalah&#10;- Apakah terdapat pengaruh media sosial terhadap prestasi belajar?&#10;- Seberapa besar pengaruhnya?&#10;# BAB II METODE&#10;## Metode Penelitian&#10;- Pendekatan kuantitatif, metode survei&#10;- 86 responden, analisis regresi linear sederhana</textarea>')
    + '<button class="' + BTN + '" onclick="buatPptx()">🖥️ Generate File .pptx</button> <span id="ppStat" class="text-sm text-slate-500"></span></div>';
};
async function buatPptx() {
  const stat = $("#ppStat"); stat.textContent = "⏳ Menyiapkan library…";
  const ok = await loadLib("https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js", "PptxGenJS");
  if (!ok || typeof PptxGenJS !== "function") { stat.textContent = "❌ Library PPTX gagal dimuat (butuh internet sekali). Coba lagi."; return; }
  const lines = $("#ppIn").value.split(/\r?\n/);
  const slides = []; let cur = null;
  const pushCur = () => { if (cur) slides.push(cur); cur = null; };
  lines.forEach((raw) => {
    const l = raw.trim(); if (!l) return;
    if (l.startsWith("# ") || /^BAB\s/i.test(l) && !l.startsWith("-")) { pushCur(); cur = { type: "section", title: l.replace(/^#\s*/, "") }; pushCur(); }
    else if (l.startsWith("## ")) { pushCur(); cur = { type: "content", title: l.replace(/^##\s*/, ""), bullets: [] }; }
    else { if (!cur || cur.type !== "content") { pushCur(); cur = { type: "content", title: "Pembahasan", bullets: [] }; } cur.bullets.push(l.replace(/^[-•*]\s*/, "")); }
  });
  pushCur();
  const finalSlides = [];
  slides.forEach((s) => {
    if (s.type === "section") finalSlides.push(s);
    else { let b = s.bullets.slice(); let part = 1; while (b.length) { finalSlides.push({ type: "content", title: s.title + (part > 1 ? " (lanjutan)" : ""), bullets: b.splice(0, 6) }); part++; } if (!s.bullets.length) finalSlides.push(s); }
  });
  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: "W", width: 13.333, height: 7.5 }); pptx.layout = "W";
  const cover = pptx.addSlide(); cover.background = { color: "1D49C8" };
  const _lgPptx = getLogoData(); if (_lgPptx) { try { cover.addImage({ data: _lgPptx, x: 0.55, y: 0.4, w: 1.2, h: 1.2 }); } catch (e) {} }
  cover.addText($("#ppJud").value.trim() || "Judul Presentasi", { x: 0.8, y: 2.1, w: 11.7, h: 1.9, fontSize: 40, bold: true, color: "FFFFFF", fontFace: "Calibri" });
  cover.addText(($("#ppNama").value.trim() || "Nama Presenter") + ( $("#ppInst").value.trim() ? " — " + $("#ppInst").value.trim() : ""), { x: 0.8, y: 4.3, w: 11.7, h: 0.6, fontSize: 20, color: "BFD3FF", fontFace: "Calibri" });
  cover.addText("Dibuat dengan MahasiswaTools — Dari Mahasiswa, Untuk Mahasiswa", { x: 0.8, y: 6.7, w: 11.7, h: 0.4, fontSize: 12, color: "93B4FF", fontFace: "Calibri" });
  finalSlides.forEach((s) => {
    if (s.type === "section") {
      const sl = pptx.addSlide(); sl.background = { color: "122B78" };
      sl.addText(s.title, { x: 0.8, y: 3, w: 11.7, h: 1.2, fontSize: 36, bold: true, color: "FFFFFF", fontFace: "Calibri" });
    } else {
      const sl = pptx.addSlide(); sl.background = { color: "FFFFFF" };
      sl.addShape("rect", { x: 0, y: 0, w: 13.333, h: 1.05, fill: { color: "EEF4FF" } });
      sl.addText(s.title, { x: 0.6, y: 0.18, w: 12.1, h: 0.7, fontSize: 26, bold: true, color: "122B78", fontFace: "Calibri" });
      if (s.bullets.length) sl.addText(s.bullets.map((b) => ({ text: b, options: { bullet: true, breakLine: true } })), { x: 0.7, y: 1.45, w: 11.9, h: 5.4, fontSize: 19, color: "1F2937", fontFace: "Calibri", lineSpacingMultiple: 1.25, valign: "top" });
    }
  });
  try {
    const blob = await pptx.write({ outputType: "blob" });
    window._lastPptx = blob;
    stat.textContent = "✅ " + (finalSlides.length + 1) + " slide berhasil dibuat!";
    download("Presentasi_Makalah.pptx", blob);
  } catch (e) { stat.textContent = "❌ Gagal membuat file: " + e.message; }
}

;

/* ============================================================
   TOOLS 28–30
   ============================================================ */
/* ---------- 28. SIMULASI PERTANYAAN PENGUJI ---------- */
const BANK_TANYA = [
  ["Latar & Masalah", "Mengapa kamu memilih topik ini? Apa urgensinya?", ["Sebutkan data/fenomena konkret yang jadi latar", "Tunjukkan kesenjangan (gap) antara harapan dan kenyataan", "Tutup dengan dampak bila masalah tidak diteliti"]],
  ["Latar & Masalah", "Apa rumusan masalahmu, dan apakah datamu benar-benar menjawabnya?", ["Ucapkan rumusan masalah persis seperti di Bab 1", "Petakan tiap rumusan ke instrumen & analisis datanya", "Beri contoh hasil yang menjawabnya"]],
  ["Latar & Masalah", "Apa kebaruan (novelty) penelitianmu dibanding penelitian sebelumnya?", ["Sebut 2–3 penelitian terdahulu terdekat", "Nyatakan perbedaan variabel/objek/metode secara spesifik", "Hindari klaim 'pertama' tanpa bukti — pakai 'sepanjang penelusuran peneliti'"]],
  ["Teori & Pustaka", "Teori apa yang kamu pakai, dan mengapa teori itu yang paling tepat?", ["Sebut nama teori + tokohnya", "Jelaskan kaitan teori dengan variabel penelitianmu", "Tunjukkan indikator teori itu muncul di instrumenmu"]],
  ["Teori & Pustaka", "Definisi operasional variabelmu apa? Bagaimana cara mengukurnya?", ["Definisi konseptual → definisi operasional", "Sebut indikator dan skala pengukurannya", "Tunjukkan kisi-kisi instrumennya"]],
  ["Teori & Pustaka", "Penelitian terdahulu mana yang paling mirip dengan milikmu? Apa bedanya?", ["Bandingkan metode, objek, dan hasil", "Tekankan perbedaan yang jadi celah penelitianmu", "Jangan mengkritik berlebihan — bersikaplah akademik"]],
  ["Metode", "Mengapa memakai metode ini, bukan metode lain?", ["Kaitkan metode dengan rumusan masalah & jenis data", "Sebut kelebihan metode ini untuk kasusmu", "Akui keterbatasannya dengan tenang"]],
  ["Metode", "Bagaimana cara kamu menentukan sampel? Apakah representatif?", ["Sebut populasi, teknik sampling, dan rumus/jumlahnya", "Jelaskan alasan pemilihan teknik tersebut", "Sebutkan batas generalisasi hasilmu"]],
  ["Metode", "Bagaimana kamu memastikan instrumenmu valid dan reliabel?", ["Jelaskan uji validitas (r hitung vs r tabel) & reliabilitas (Cronbach's Alpha)", "Sebutkan ambang batas yang dipakai (0,361 / 0,60 dst.)", "Sebut perlakuanmu pada butir yang tidak valid"]],
  ["Metode", "Kalau penelitian ini diulang di tempat lain, apakah hasilnya akan sama?", ["Jawab dengan konsep validitas eksternal & replikasi", "Sebut faktor konteks yang bisa mengubah hasil", "Tawarkan saran replikasi untuk peneliti selanjutnya"]],
  ["Hasil & Data", "Jelaskan hasil penelitianmu dalam satu menit.", ["Mulai dari temuan utama + angka kuncinya", "Lanjut ke temuan pendukung", "Tutup dengan makna praktis temuan itu"]],
  ["Hasil & Data", "Mengapa hasilmu bisa berbeda dengan teori/penelitian sebelumnya?", ["Tunjukkan bukti datanya, jangan defensif", "Tawarkan penjelasan: konteks, sampel, atau waktu", "Kaitkan kembali ke teori dengan argumen, bukan opini"]],
  ["Hasil & Data", "Apa arti angka statistik ini secara praktis, bukan sekadar signifikan?", ["Jelaskan effect size / besaran pengaruhnya", "Beri contoh dampaknya di dunia nyata", "Bedakan signifikansi statistik dan signifikansi praktis"]],
  ["Hasil & Data", "Tunjukkan satu tabel hasilmu dan jelaskan cara membacanya.", ["Sebut judul & sumber tabel", "Baca angka terpenting dulu, lalu polanya", "Akhiri dengan kesimpulan yang ditarik dari tabel"]],
  ["Penutup & Jebakan", "Apa kelemahan terbesar penelitianmu?", ["Pilih kelemahan yang jujur tapi tidak fatal (sampel terbatas, satu lokasi, cross-sectional)", "Jelaskan dampaknya terhadap kesimpulan", "Sampaikan cara memperbaikinya di penelitian lanjutan"]],
  ["Penutup & Jebakan", "Jika hasilmu tidak signifikan, apa yang akan kamu lakukan?", ["Nyatakan tetap dilaporkan apa adanya — itu etika penelitian", "Jelaskan kemungkinan penyebabnya dari data", "Tarik pelajaran metodologisnya"]],
  ["Penutup & Jebakan", "Apa saranmu, dan apakah saran itu benar-benar lahir dari hasil penelitianmu?", ["Petakan tiap saran ke temuan spesifik", "Hindari saran generik yang tidak terkait data", "Sebut pihak yang dituju oleh saran itu"]],
  ["Penutup & Jebakan", "Silakan simpulkan seluruh skripsimu dalam waktu singkat.", ["Latar singkat → metode singkat → hasil utama → kesimpulan", "Latih versi 60 detik dan versi 3 menit", "Akhiri dengan kalimat penutup yang percaya diri"]]
];
let simState = { cur: null, answered: 0, timer: null, remain: 0, seenFw: false };
UI.k28 = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Kategori Pertanyaan", '<select id="simCat" class="' + IN + '"><option value="">🎲 Acak Semua Kategori</option>' + [...new Set(BANK_TANYA.map((q) => q[0]))].map((c) => "<option>" + c + "</option>").join("") + "</select>")
    + '<div class="flex flex-wrap gap-2 mb-4"><button class="' + BTN + '" onclick="tanyaBaru()">🎲 Beri Saya Pertanyaan</button>'
    + '<span id="simProg" class="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2 text-sm font-bold">0 pertanyaan dilatih</span></div>'
    + outBox("simOut2") + "</div>";
  $("#simOut2").innerHTML = '<div class="' + OUT + ' text-slate-500">Klik "Beri Saya Pertanyaan" — jawab dengan suara lantang dalam 2 menit, lalu periksa kerangka jawabannya. Latihan seperti ini yang membedakan sidang lancar dan sidang gugup. 💪</div>';
};
function simStop() { if (simState.timer) { clearInterval(simState.timer); simState.timer = null; } }
function tanyaBaru() {
  const cat = $("#simCat").value;
  const pool = BANK_TANYA.filter((q) => !cat || q[0] === cat);
  let q; do { q = pool[Math.floor(Math.random() * pool.length)]; } while (pool.length > 1 && simState.cur && q[1] === simState.cur[1]);
  simState.cur = q; simState.seenFw = false;
  simStop(); simState.remain = 120;
  simState.timer = setInterval(() => { simState.remain--; const c = $("#simClock"); if (!c) { simStop(); return; } if (simState.remain <= 0) { simStop(); c.textContent = "⏰ Waktu habis — saatnya menyimpulkan!"; } else c.textContent = "⏱ Sisa waktu jawab: " + Math.floor(simState.remain / 60) + ":" + String(simState.remain % 60).padStart(2, "0"); }, 1000);
  $("#simOut2").innerHTML = '<div class="' + OUT + ' fadein"><span class="text-[11px] font-bold bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-200 rounded-full px-2.5 py-1">' + esc(q[0]) + '</span>'
    + '<p class="text-lg sm:text-xl font-extrabold leading-snug mt-3">"' + esc(q[1]) + '"</p>'
    + '<p id="simClock" class="text-sm font-bold text-slate-500 mt-2">⏱ Sisa waktu jawab: 2:00</p>'
    + '<div id="simFw" class="hidden mt-4"><h4 class="font-bold mb-1.5">🧭 Kerangka Jawaban:</h4><ol class="list-decimal list-inside space-y-1 text-sm leading-relaxed">' + q[2].map((f) => "<li>" + esc(f) + "</li>").join("") + "</ol></div>"
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN2 + '" onclick="document.getElementById(\'simFw\').classList.remove(\'hidden\')">👁 Lihat Kerangka Jawaban</button>'
    + '<button class="' + BTN + '" onclick="jawabSelesai()">✅ Sudah Saya Jawab — Lanjut</button></div></div>';
}
function jawabSelesai() { simState.answered++; $("#simProg").textContent = simState.answered + " pertanyaan dilatih"; tanyaBaru(); }

/* ---------- 29. RODA UNDIAN PRESENTASI ---------- */
let wheel = { names: [], rot: 0, spinning: false, order: [] };
const WHEEL_COLORS = ["#2F5FE8", "#7C3AED", "#059669", "#D97706", "#DC2626", "#0EA5E9", "#DB2777", "#65A30D", "#4F46E5", "#EA580C"];
UI.k29 = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Daftar Nama / Kelompok", '<textarea id="rdIn" rows="6" class="' + IN + '" placeholder="Satu nama per baris">Kelompok 1&#10;Kelompok 2&#10;Kelompok 3&#10;Kelompok 4&#10;Kelompok 5&#10;Kelompok 6</textarea>')
    + '<div class="flex flex-wrap gap-2 mb-4"><button class="' + BTN + '" onclick="muatRoda()">🎡 Muat ke Roda</button>'
    + '<button class="' + BTN + '" style="background:#059669" onclick="putarRoda()">▶️ PUTAR!</button></div>'
    + '<div class="flex justify-center"><div class="relative w-full max-w-[420px]">'
    + '<div class="absolute left-1/2 -translate-x-1/2 -top-1 z-10 text-3xl">🔻</div>'
    + '<canvas id="rdCv" width="520" height="520" class="w-full"></canvas></div></div>'
    + outBox("rdOut") + "</div>";
  wheel.order = [];
  muatRoda();
};
function muatRoda() {
  wheel.names = $("#rdIn").value.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  wheel.order = [];
  gambarRoda();
  $("#rdOut").innerHTML = '<div class="' + OUT + ' text-slate-500">' + wheel.names.length + " peserta dimuat. Tekan PUTAR untuk mengundi nama pertama.</div>";
}
function gambarRoda() {
  const cv = $("#rdCv"); if (!cv) return;
  const ctx = cv.getContext("2d");
  const n = Math.max(wheel.names.length, 1), seg = 2 * Math.PI / n;
  ctx.clearRect(0, 0, 520, 520);
  wheel.names.forEach((name, i) => {
    const a0 = wheel.rot + i * seg, a1 = a0 + seg;
    ctx.beginPath(); ctx.moveTo(260, 260); ctx.arc(260, 260, 248, a0, a1); ctx.closePath();
    ctx.fillStyle = WHEEL_COLORS[i % WHEEL_COLORS.length]; ctx.fill();
    ctx.strokeStyle = "#FFF"; ctx.lineWidth = 3; ctx.stroke();
    ctx.save(); ctx.translate(260, 260); ctx.rotate(a0 + seg / 2);
    ctx.textAlign = "right"; ctx.fillStyle = "#FFF"; ctx.font = "bold 19px sans-serif";
    ctx.fillText(name.length > 16 ? name.slice(0, 15) + "…" : name, 232, 7);
    ctx.restore();
  });
  ctx.beginPath(); ctx.arc(260, 260, 42, 0, 7); ctx.fillStyle = "#0F172A"; ctx.fill();
  ctx.fillStyle = "#FFF"; ctx.font = "bold 15px sans-serif"; ctx.textAlign = "center"; ctx.fillText("UNDI", 260, 266);
}
function putarRoda(durasi) {
  if (wheel.spinning || wheel.names.length < 2) { if (wheel.names.length < 2) toast("⚠️ Minimal 2 nama di roda."); return; }
  wheel.spinning = true;
  const dur = durasi || 4200, startRot = wheel.rot;
  const target = startRot + (Math.PI * 2 * (5 + Math.random() * 3)) + Math.random() * Math.PI * 2;
  const t0 = performance.now();
  const anim = (now) => {
    const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
    wheel.rot = startRot + (target - startRot) * e;
    gambarRoda();
    if (p < 1) requestAnimationFrame(anim);
    else {
      wheel.spinning = false;
      const n = wheel.names.length, seg = 2 * Math.PI / n;
      const rel = ((3 * Math.PI / 2 - wheel.rot) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      const winner = wheel.names[Math.floor(rel / seg) % n];
      wheel.order.push(winner);
      window._wheelOrder = wheel.order.slice();
      $("#rdOut").innerHTML = '<div class="' + OUT + ' fadein"><p class="text-lg font-extrabold">🎉 Terpilih: <span class="text-brand-600 dark:text-brand-300">' + esc(winner) + '</span></p>'
        + '<h4 class="font-bold mt-3 mb-1.5">📋 Urutan Sejauh Ini:</h4><ol class="list-decimal list-inside text-sm space-y-1">' + wheel.order.map((w) => "<li>" + esc(w) + "</li>").join("") + "</ol>"
        + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="hapusPemenang()">🗑 Hapus "' + esc(winner) + '" & Lanjut Undi</button>'
        + '<button class="' + BTN2 + '" onclick="copyText((window._wheelOrder || []).map((w, i) => (i + 1) + \'. \' + w).join(\'\\n\'))">📋 Copy Urutan</button></div></div>';
    }
  };
  requestAnimationFrame(anim);
}
function hapusPemenang() {
  const last = wheel.order[wheel.order.length - 1];
  wheel.names = wheel.names.filter((n) => n !== last);
  gambarRoda();
  if (wheel.names.length >= 2) putarRoda();
  else $("#rdOut").innerHTML = '<div class="' + OUT + '"><p class="font-extrabold">✅ Undian selesai!</p><ol class="list-decimal list-inside text-sm space-y-1 mt-2">' + wheel.order.map((w) => "<li>" + esc(w) + "</li>").join("") + '</ol><div class="flex gap-2 mt-3"><button class="' + BTN + '" onclick="copyText(wheel.order.map((w, i) => (i + 1) + \'. \' + w).join(\'\\n\'))">📋 Copy Urutan Final</button></div></div>';
}
window._wheel = wheel;

/* ---------- 30. PENCARI JAM KOSONG BERSAMA ---------- */
const HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const JAM = Array.from({ length: 12 }, (_, i) => 7 + i);
let jadwal = store.get("mt_jadwal", [{ name: "Saya", busy: [] }]);
let jadwalSel = 0;
UI.k30 = function (el) {
  el.innerHTML = '<div class="fadein">'
    + '<div class="flex flex-wrap gap-2 items-end mb-3"><div class="flex-1 min-w-[180px]">' + field("Nama Anggota Baru", '<input id="jkNama" class="' + IN + '" placeholder="cth: Sari">') + '</div><button class="' + BTN + ' mb-4" onclick="tambahAnggota()">➕ Tambah</button></div>'
    + '<div id="jkChips" class="flex flex-wrap gap-2 mb-3"></div>'
    + '<p class="text-xs text-slate-500 mb-2">Pilih anggota, lalu klik sel jam untuk menandai <b class="text-rose-500">SIBUK</b> (ada kuliah/kerja). Sel hijau = SEMUA anggota kosong di jam itu.</p>'
    + '<div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700"><table id="jkTable" class="text-center text-xs w-full min-w-[640px]"></table></div>'
    + outBox("jkOut") + "</div>";
  renderJadwal();
};
function simpanJadwal() { store.set("mt_jadwal", jadwal); }
function tambahAnggota() {
  const n = $("#jkNama").value.trim(); if (!n) { toast("Isi nama anggota dulu."); return; }
  jadwal.push({ name: n, busy: [] }); jadwalSel = jadwal.length - 1;
  $("#jkNama").value = ""; simpanJadwal(); renderJadwal();
}
function hapusAnggota(i) { jadwal.splice(i, 1); if (jadwalSel >= jadwal.length) jadwalSel = Math.max(0, jadwal.length - 1); simpanJadwal(); renderJadwal(); }
function toggleJam(d, h) {
  const m = jadwal[jadwalSel]; if (!m) return;
  const key = d + "-" + h, ix = m.busy.indexOf(key);
  if (ix >= 0) m.busy.splice(ix, 1); else m.busy.push(key);
  simpanJadwal(); renderJadwal();
}
function renderJadwal() {
  const chips = $("#jkChips"); if (!chips) return;
  chips.innerHTML = jadwal.map((m, i) => '<span class="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold cursor-pointer ' + (i === jadwalSel ? "bg-brand-600 text-white" : "bg-slate-200 dark:bg-slate-700") + '" onclick="jadwalSel=' + i + ';renderJadwal()">' + esc(m.name) + ' <button class="opacity-80 hover:opacity-100" onclick="event.stopPropagation();hapusAnggota(' + i + ')">✕</button></span>').join("");
  const busyAll = new Set(); jadwal.forEach((m) => m.busy.forEach((k) => busyAll.add(k)));
  const selBusy = new Set(jadwal[jadwalSel] ? jadwal[jadwalSel].busy : []);
  let html = "<thead><tr class='bg-slate-100 dark:bg-slate-800'><th class='p-2 text-left'>Hari</th>" + JAM.map((h) => "<th class='p-2'>" + String(h).padStart(2, "0") + ".00</th>").join("") + "</tr></thead><tbody>";
  HARI.forEach((hari, d) => {
    html += "<tr><td class='p-2 font-bold text-left bg-slate-50 dark:bg-slate-800/60'>" + hari + "</td>";
    JAM.forEach((h) => {
      const key = d + "-" + h, allFree = !busyAll.has(key), mine = selBusy.has(key);
      const cls = mine ? "bg-rose-400 dark:bg-rose-600 text-white font-bold" : allFree ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold" : "bg-slate-200/70 dark:bg-slate-700/60 text-slate-400";
      html += "<td class='p-0'><button class='w-full py-2.5 " + cls + " hover:opacity-80 transition' onclick='toggleJam(" + d + "," + h + ")'>" + (mine ? "✕" : allFree ? "✓" : "·") + "</button></td>";
    });
    html += "</tr>";
  });
  $("#jkTable").innerHTML = html + "</tbody>";
  const ranges = [];
  HARI.forEach((hari, d) => {
    let start = null;
    JAM.concat([19]).forEach((h) => {
      const free = JAM.includes(h) && !busyAll.has(d + "-" + h);
      if (free && start === null) start = h;
      if (!free && start !== null) { ranges.push(hari + " " + String(start).padStart(2, "0") + ".00–" + String(h).padStart(2, "0") + ".00"); start = null; }
    });
  });
  window._jamKosong = ranges;
  $("#jkOut").innerHTML = '<div class="' + OUT + '"><h4 class="font-bold mb-2">🟢 Jam Kosong Bersama (' + jadwal.length + ' anggota):</h4>'
    + (ranges.length ? '<div class="flex flex-wrap gap-1.5">' + ranges.map((r) => '<span class="rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 px-3 py-1.5 text-xs font-bold">' + r + "</span>").join("") + "</div>" : '<p class="text-sm text-slate-500">Belum ada jam yang kosong untuk semua anggota. Coba longgarkan jadwal atau kurangi anggota.</p>')
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="copyText(\'Jam kosong bersama:\\n\' + (window._jamKosong || []).join(\'\\n\'))">📋 Copy Jam Kosong</button></div></div>';
}
const _prevStop = window._teleStop;
window._teleStop = function () { if (_prevStop) _prevStop(); if (typeof simStop === "function") simStop(); };

;

/* ============================================================
   TOOLS 31–36 (Kelompok & KKN)
   ============================================================ */

/* ---------- 31. LOGBOOK HARIAN MAGANG/KKN ---------- */
let logbook = store.get("mt_logbook", []);
UI.k31 = function (el) {
  el.innerHTML = '<div class="fadein"><div class="grid sm:grid-cols-3 gap-x-4">'
    + field("Nama Mahasiswa", '<input id="lbNama" class="' + IN + '" value="' + esc(store.get("mt_lb_nama", "")) + '" placeholder="Nama kamu">')
    + field("Program / Kegiatan", '<input id="lbProg" class="' + IN + '" value="' + esc(store.get("mt_lb_prog", "KKN Tematik")) + '">')
    + field("Lokasi", '<input id="lbLok" class="' + IN + '" value="' + esc(store.get("mt_lb_lok", "")) + '" placeholder="Desa / instansi tempat magang-KKN">')
    + '</div><div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Tanggal Kegiatan", '<input id="lbTgl" type="date" class="' + IN + '" value="' + new Date().toISOString().slice(0, 10) + '">')
    + field("Kegiatan", '<input id="lbKeg" class="' + IN + '" placeholder="cth: Sosialisasi program kerja kepada warga">')
    + field("Hasil / Output", '<input id="lbHas" class="' + IN + '" placeholder="cth: 25 warga hadir, materi tersampaikan">')
    + field("Kendala & Solusi", '<input id="lbKen" class="' + IN + '" placeholder="cth: Hujan — kegiatan dipindah ke balai desa">')
    + '</div><button class="' + BTN + '" onclick="tambahLog()">➕ Tambah Entri Logbook</button>' + outBox("lbOut") + "</div>";
  renderLogbook();
};
function tambahLog() {
  const g = (id) => $("#" + id).value.trim();
  if (!g("lbKeg")) { toast("⚠️ Isi kolom Kegiatan dulu."); return; }
  logbook.push({ tgl: g("lbTgl"), keg: g("lbKeg"), has: g("lbHas"), ken: g("lbKen") });
  logbook.sort((a, b) => a.tgl.localeCompare(b.tgl));
  store.set("mt_logbook", logbook);
  store.set("mt_lb_nama", g("lbNama")); store.set("mt_lb_prog", g("lbProg")); store.set("mt_lb_lok", g("lbLok"));
  renderLogbook(); toast("Entri ditambahkan 📓");
}
function hapusLog(i) { logbook.splice(i, 1); store.set("mt_logbook", logbook); renderLogbook(); }
function renderLogbook() {
  const out = $("#lbOut"); if (!out) return;
  if (!logbook.length) { out.innerHTML = '<div class="' + OUT + ' text-slate-500">Logbook masih kosong — entri tersimpan otomatis di browser dan siap diekspor jadi dokumen laporan.</div>'; return; }
  const fmt = (t) => new Date(t + "T00:00:00").toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const rows = logbook.map((e, i) => "<tr class='border-b border-slate-200 dark:border-slate-700'><td class='py-2 pr-2 font-semibold'>" + (i + 1) + "</td><td class='py-2 pr-2 whitespace-nowrap'>" + fmt(e.tgl) + "</td><td class='py-2 pr-2'>" + esc(e.keg) + "</td><td class='py-2 pr-2'>" + esc(e.has) + "</td><td class='py-2 pr-2'>" + esc(e.ken) + "</td><td class='py-2'><button class='text-rose-500 font-bold' onclick='hapusLog(" + i + ")'>✕</button></td></tr>").join("");
  window._logCsv = "No;Tanggal;Kegiatan;Hasil;Kendala\n" + logbook.map((e, i) => [i + 1, e.tgl, e.keg, e.has, e.ken].map((v) => '"' + String(v).replace(/"/g, '""') + '"').join(";")).join("\n");
  const nama = $("#lbNama") ? $("#lbNama").value : "", prog = $("#lbProg") ? $("#lbProg").value : "", lok = $("#lbLok") ? $("#lbLok").value : "";
  window._logDoc = "<html><body style='font-family:serif'>" + kopLogoHtml("center") + "<h3 style='text-align:center'>LOGBOOK HARIAN " + esc(prog.toUpperCase()) + "</h3><p>Nama: " + esc(nama) + "<br>Lokasi: " + esc(lok) + "</p><table border='1' cellspacing='0' cellpadding='6' style='border-collapse:collapse;width:100%'><tr><th>No</th><th>Hari/Tanggal</th><th>Kegiatan</th><th>Hasil</th><th>Kendala & Solusi</th><th>Paraf</th></tr>"
    + logbook.map((e, i) => "<tr><td>" + (i + 1) + "</td><td>" + fmt(e.tgl) + "</td><td>" + esc(e.keg) + "</td><td>" + esc(e.has) + "</td><td>" + esc(e.ken) + "</td><td></td></tr>").join("")
    + "</table><p style='margin-top:24px'>Mengetahui,<br>Dosen Pembimbing Lapangan / Pembimbing Instansi<br><br><br>( ........................................ )</p><p style='font-size:9pt;color:#666'>Dibuat dengan MahasiswaTools — Dari Mahasiswa, Untuk Mahasiswa</p></body></html>";
  out.innerHTML = '<div class="' + OUT + '"><div class="overflow-x-auto"><table class="w-full text-left text-[13px] min-w-[680px]"><thead><tr class="border-b-2 border-slate-300 dark:border-slate-600"><th class="py-2 pr-2">No</th><th class="py-2 pr-2">Tanggal</th><th class="py-2 pr-2">Kegiatan</th><th class="py-2 pr-2">Hasil</th><th class="py-2 pr-2">Kendala</th><th></th></tr></thead><tbody>' + rows + "</tbody></table></div>"
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="download(\'Logbook_Harian.doc\', window._logDoc, \'application/msword\')">⬇️ Download Logbook .doc</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Logbook_Harian.csv\', window._logCsv, \'text/csv\')">⬇️ CSV</button></div></div>';
}

/* ---------- 32. KWITANSI & NOTA LPJ ---------- */
UI.k32 = function (el) {
  el.innerHTML = '<div class="fadein"><div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Nomor Kwitansi", '<input id="kwNo" class="' + IN + '" value="001/KKN/2026">')
    + field("Telah Diterima Dari", '<input id="kwDari" class="' + IN + '" placeholder="cth: Bendahara Kelompok KKN 12">')
    + field("Jumlah Uang (angka)", '<input id="kwJml" type="number" class="' + IN + '" value="250000" oninput="kwPreviewTerbilang()">')
    + field("Untuk Pembayaran", '<input id="kwUntuk" class="' + IN + '" placeholder="cth: Konsumsi kegiatan sosialisasi posyandu">')
    + field("Tempat & Tanggal", '<input id="kwTgl" class="' + IN + '" value="Sukamaju, 21 Oktober 2026">')
    + field("Tema Kwitansi", '<select id="kwTema" class="' + IN + '"><option value="biru">🔵 Biru Klasik</option><option value="hijau">🟢 Hijau Toska</option><option value="hitam">⚫ Hitam Brutalist</option></select>')
    + field("Nama Penerima", '<input id="kwNama" class="' + IN + '" placeholder="Nama yang menerima uang">')
    + '</div><p id="kwTerb" class="text-sm font-semibold text-brand-700 dark:text-brand-200 mb-3"></p>'
    + '<button class="' + BTN + '" onclick="buatKwitansi()">🧾 Buat Kwitansi</button>'
    + '<div class="mt-4 overflow-x-auto"><canvas id="kwCv" width="1000" height="560" class="hidden w-full max-w-[720px] rounded-lg shadow border border-slate-200"></canvas></div>'
    + outBox("kwOut") + "</div>";
  kwPreviewTerbilang();
};
function kwPreviewTerbilang() { const n = Number($("#kwJml").value) || 0; const t = $("#kwTerb"); if (t) t.textContent = n ? "Terbilang: " + terbilangStr(n).replace(/\s+/g, " ").trim() + " Rupiah" : ""; }
function wrapText(ctx, text, x, y, maxW, lh) {
  const words = text.split(" "); let line = "", yy = y;
  for (const w of words) { const test = line ? line + " " + w : w; if (ctx.measureText(test).width > maxW && line) { ctx.fillText(line, x, yy); line = w; yy += lh; } else line = test; }
  if (line) ctx.fillText(line, x, yy);
  return yy;
}
function buatKwitansi() {
  const PAL = { biru: { main: "#1D49C8", dark: "#122B78", box: "#EEF4FF" }, hijau: { main: "#047857", dark: "#064E3B", box: "#ECFDF5" }, hitam: { main: "#111111", dark: "#000000", box: "#FEF9C3" } }[($("#kwTema") || {}).value || "biru"];
  const g = (id) => $("#" + id).value.trim();
  const n = Number($("#kwJml").value) || 0;
  const cv = $("#kwCv"); cv.classList.remove("hidden");
  const ctx = cv.getContext("2d");
  ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, 1000, 560);
  ctx.strokeStyle = PAL.main; ctx.lineWidth = 6; ctx.strokeRect(14, 14, 972, 532);
  ctx.lineWidth = 1.6; ctx.strokeRect(30, 30, 940, 500);
  ctx.fillStyle = PAL.main; ctx.font = "800 44px 'Plus Jakarta Sans', sans-serif"; ctx.textAlign = "center";
  ctx.fillText("KWITANSI", 500, 100);
  ctx.font = "600 17px sans-serif"; ctx.fillStyle = "#475569";
  ctx.fillText("MahasiswaTools — Bukti Pembayaran Resmi Kelompok / KKN", 500, 132);
  ctx.textAlign = "left"; ctx.fillStyle = "#0F172A"; ctx.font = "19px sans-serif";
  ctx.fillText("Nomor", 70, 190); ctx.fillText(": " + g("kwNo"), 260, 190);
  ctx.fillText("Telah diterima dari", 70, 232); ctx.fillText(": " + g("kwDari"), 260, 232);
  ctx.fillText("Uang sejumlah", 70, 274);
  ctx.font = "italic 600 19px Georgia, serif";
  const lastY = wrapText(ctx, ": " + terbilangStr(n).replace(/\s+/g, " ").trim() + " Rupiah", 260, 274, 660, 26);
  ctx.font = "19px sans-serif";
  ctx.fillText("Untuk pembayaran", 70, lastY + 44); ctx.fillText(": " + g("kwUntuk"), 260, lastY + 44);
  ctx.fillStyle = PAL.box; ctx.strokeStyle = PAL.main; ctx.lineWidth = 2;
  const bw = 340, bh = 64; ctx.fillRect(70, 420, bw, bh); ctx.strokeRect(70, 420, bw, bh);
  ctx.fillStyle = PAL.dark; ctx.font = "800 30px sans-serif"; ctx.textAlign = "center";
  ctx.fillText("Rp " + n.toLocaleString("id-ID"), 70 + bw / 2, 462);
  ctx.textAlign = "left"; ctx.fillStyle = "#0F172A"; ctx.font = "18px sans-serif";
  ctx.fillText(g("kwTgl"), 640, 420);
  ctx.fillText("Penerima,", 640, 448);
  ctx.fillText("( " + (g("kwNama") || "........................") + " )", 640, 516);
  ctx.font = "12px sans-serif"; ctx.fillStyle = "#94A3B8"; ctx.textAlign = "center";
  ctx.fillText("Dibuat dengan MahasiswaTools • Dari Mahasiswa, Untuk Mahasiswa", 500, 540);
  cv.toBlob((b) => { window._kwitansiPng = b; }, "image/png");
  $("#kwOut").innerHTML = '<div class="' + OUT + '"><div class="flex flex-wrap gap-2"><button class="' + BTN + '" onclick="download(\'Kwitansi_LPJ.png\', window._kwitansiPng)">⬇️ Download Kwitansi (PNG)</button>'
    + '<button class="' + BTN2 + '" onclick="copyText(\'Kwitansi No. ' + "PLACEHOLDER" + '\')">📋 Copy Ringkasan</button></div></div>'.replace("PLACEHOLDER", g("kwNo") + " — Rp " + n.toLocaleString("id-ID") + " dari " + g("kwDari") + " untuk " + g("kwUntuk") + " (" + terbilangStr(n).replace(/\s+/g, " ").trim() + " Rupiah)");
}

/* ---------- 33. GANTT CHART PROKER KKN ---------- */
let gantt = store.get("mt_gantt", { minggu: 6, rows: [
  { nama: "Observasi & perizinan desa", mulai: 1, durasi: 1, pic: "Ketua" },
  { nama: "Sosialisasi program ke warga", mulai: 2, durasi: 1, pic: "Humas" },
  { nama: "Program utama: edukasi & pelatihan", mulai: 2, durasi: 3, pic: "Acara" },
  { nama: "Program fisik: plang & taman baca", mulai: 3, durasi: 2, pic: "Logistik" },
  { nama: "Evaluasi & penyusunan laporan", mulai: 5, durasi: 2, pic: "Sekretaris" }
] });
UI.k33 = function (el) {
  el.innerHTML = '<div class="fadein"><div class="grid sm:grid-cols-4 gap-x-4">'
    + field("Total Minggu KKN", '<input id="gtTot" type="number" min="1" max="16" value="' + gantt.minggu + '" class="' + IN + '">')
    + field("Nama Program", '<input id="gtNama" class="' + IN + '" placeholder="Nama program kerja">')
    + field("Minggu Mulai", '<input id="gtMulai" type="number" min="1" value="1" class="' + IN + '">')
    + field("Durasi (minggu)", '<input id="gtDur" type="number" min="1" value="2" class="' + IN + '">')
    + '</div><div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Penanggung Jawab (PIC)", '<input id="gtPic" class="' + IN + '" placeholder="cth: Divisi Acara / nama orang">')
    + '<div class="flex items-end pb-4 gap-2"><button class="' + BTN + '" onclick="tambahGantt()">➕ Tambah Program</button><button class="' + BTN2 + '" onclick="simpanGanttTotal()">💾 Set Total Minggu</button></div></div>'
    + outBox("gtOut") + "</div>";
  renderGantt();
};
function simpanGanttTotal() { gantt.minggu = Math.max(1, Number($("#gtTot").value) || 6); store.set("mt_gantt", gantt); renderGantt(); }
function tambahGantt() {
  const g = (id) => $("#" + id).value.trim();
  if (!g("gtNama")) { toast("Isi nama program dulu."); return; }
  gantt.rows.push({ nama: g("gtNama"), mulai: Math.max(1, Number($("#gtMulai").value) || 1), durasi: Math.max(1, Number($("#gtDur").value) || 1), pic: g("gtPic") });
  store.set("mt_gantt", gantt); renderGantt();
}
function hapusGantt(i) { gantt.rows.splice(i, 1); store.set("mt_gantt", gantt); renderGantt(); }
function renderGantt() {
  const out = $("#gtOut"); if (!out) return;
  const W = Math.max(760, 190 + gantt.minggu * 78), rowh = 44, H = 46 + gantt.rows.length * rowh + 10;
  const colors = ["#2F5FE8", "#7C3AED", "#059669", "#D97706", "#DC2626", "#0EA5E9"];
  let svg = '<svg id="gtSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + " " + H + '" class="w-full bg-white rounded-xl border border-slate-200">';
  for (let w = 0; w < gantt.minggu; w++) svg += '<rect x="' + (190 + w * 78) + '" y="8" width="72" height="30" rx="7" fill="#EEF4FF"/><text x="' + (226 + w * 78) + '" y="28" text-anchor="middle" font-family="sans-serif" font-size="12.5" font-weight="bold" fill="#122B78">Mg ' + (w + 1) + "</text>";
  gantt.rows.forEach((r, i) => {
    const y = 46 + i * rowh;
    svg += '<text x="12" y="' + (y + 26) + '" font-family="sans-serif" font-size="13" font-weight="600" fill="#0F172A">' + xe(r.nama.length > 24 ? r.nama.slice(0, 23) + "…" : r.nama) + "</text>";
    svg += '<rect x="' + (190 + (r.mulai - 1) * 78) + '" y="' + (y + 6) + '" width="' + Math.max(30, r.durasi * 78 - 6) + '" height="30" rx="8" fill="' + colors[i % colors.length] + '"/>';
    svg += '<text x="' + (196 + (r.mulai - 1) * 78) + '" y="' + (y + 26) + '" font-family="sans-serif" font-size="12" fill="#FFF" font-weight="bold">' + xe(r.pic) + "</text>";
  });
  svg += "</svg>";
  window._ganttSvg = svg;
  window._ganttTxt = "MATRIKS PROGRAM KERJA KKN (" + gantt.minggu + " minggu)\n" + gantt.rows.map((r, i) => (i + 1) + ". " + r.nama + " — Minggu " + r.mulai + " s.d. " + (r.mulai + r.durasi - 1) + " (PIC: " + r.pic + ")").join("\n");
  out.innerHTML = '<div class="' + OUT + '">' + svg
    + '<div class="mt-3 space-y-1">' + gantt.rows.map((r, i) => '<div class="flex items-center gap-2 text-xs"><span class="flex-1 truncate">' + (i + 1) + ". " + esc(r.nama) + " (Mg " + r.mulai + "–" + (r.mulai + r.durasi - 1) + ", " + esc(r.pic) + ')</span><button class="text-rose-500 font-bold" onclick="hapusGantt(' + i + ')">Hapus</button></div>').join("") + "</div>"
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="unduhSvgPng(\'gtSvg\', \'Gantt_Proker_KKN.png\')">⬇️ Download Gantt (PNG)</button>'
    + '<button class="' + BTN2 + '" onclick="copyText(window._ganttTxt)">📋 Copy Matriks Teks</button></div></div>';
}

/* ---------- 34. STRUKTUR ORGANISASI POSKO ---------- */
let orgData = store.get("mt_org", null) || { nama: "Posko KKN Kelompok 12 — Desa Sukamaju", pembina: "Dr. Sari Wulandari, M.Si. (DPL)", ketua: "Andi Pratama", wakil: "Bima Nugraha", sekretaris: "Sari Rahmawati", bendahara: "Dewi Lestari", divisi: [
  { nama: "Divisi Acara", koord: "Raka", anggota: "Nadia, Fajar, Intan" },
  { nama: "Divisi Humas", koord: "Putri", anggota: "Galih, Maya" },
  { nama: "Divisi Logistik", koord: "Rizki", anggota: "Bagus, Tania, Eko" },
  { nama: "Divisi Dokumentasi", koord: "Sinta", anggota: "Yoga, Rina" }
] };
UI.k34 = function (el) {
  el.innerHTML = '<div class="fadein"><div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Nama Posko / Organisasi", '<input id="ogNama" class="' + IN + '" value="' + esc(orgData.nama) + '">')
    + field("Pembina / DPL", '<input id="ogPemb" class="' + IN + '" value="' + esc(orgData.pembina) + '">')
    + field("Ketua", '<input id="ogKet" class="' + IN + '" value="' + esc(orgData.ketua) + '">')
    + field("Wakil Ketua", '<input id="ogWak" class="' + IN + '" value="' + esc(orgData.wakil) + '">')
    + field("Sekretaris", '<input id="ogSek" class="' + IN + '" value="' + esc(orgData.sekretaris) + '">')
    + field("Bendahara", '<input id="ogBen" class="' + IN + '" value="' + esc(orgData.bendahara) + '">')
    + '</div><div id="ogDivList" class="space-y-2 mb-3"></div>'
    + '<div class="flex flex-wrap gap-2 mb-4"><button class="' + BTN2 + '" onclick="tambahDivisi()">➕ Tambah Divisi</button>'
    + '<button class="' + BTN + '" onclick="buatOrg()">🏛️ Buat Bagan Organisasi</button></div>'
    + outBox("ogOut") + "</div>";
  renderDivisiForm();
  buatOrg();
};
function renderDivisiForm() {
  $("#ogDivList").innerHTML = orgData.divisi.map((d, i) => '<div class="grid sm:grid-cols-3 gap-2"><input class="' + IN + '" placeholder="Nama divisi" value="' + esc(d.nama) + '" onchange="orgData.divisi[' + i + '].nama=this.value">'
    + '<input class="' + IN + '" placeholder="Koordinator" value="' + esc(d.koord) + '" onchange="orgData.divisi[' + i + '].koord=this.value">'
    + '<div class="flex gap-2"><input class="' + IN + '" placeholder="Anggota (pisahkan koma)" value="' + esc(d.anggota) + '" onchange="orgData.divisi[' + i + '].anggota=this.value"><button class="text-rose-500 font-bold px-2" onclick="orgData.divisi.splice(' + i + ',1);renderDivisiForm()">✕</button></div></div>').join("");
}
function tambahDivisi() { orgData.divisi.push({ nama: "Divisi Baru", koord: "", anggota: "" }); renderDivisiForm(); }
function orgBox(x, y, w, title, name, color) {
  return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="58" rx="10" fill="#FFF" stroke="' + color + '" stroke-width="2.2"/>'
    + '<text x="' + (x + w / 2) + '" y="' + (y + 23) + '" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="' + color + '">' + xe(title.toUpperCase()) + "</text>"
    + '<text x="' + (x + w / 2) + '" y="' + (y + 44) + '" text-anchor="middle" font-family="sans-serif" font-size="13.5" font-weight="600" fill="#0F172A">' + xe(name || "—") + "</text>";
}
function buatOrg() {
  const g = (id) => $("#" + id).value.trim();
  orgData.nama = g("ogNama"); orgData.pembina = g("ogPemb"); orgData.ketua = g("ogKet"); orgData.wakil = g("ogWak"); orgData.sekretaris = g("ogSek"); orgData.bendahara = g("ogBen");
  store.set("mt_org", orgData);
  const divs = orgData.divisi.filter((d) => d.nama);
  const W = Math.max(820, divs.length * 240), cx = W / 2;
  const H = 560;
  let svg = '<svg id="ogSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + " " + H + '" class="w-full bg-white rounded-xl border border-slate-200">';
  svg += '<text x="' + cx + '" y="34" text-anchor="middle" font-family="sans-serif" font-size="17" font-weight="800" fill="#122B78">' + xe(orgData.nama) + "</text>";
  svg += orgBox(cx - 110, 52, 220, "Pembina / DPL", orgData.pembina, "#64748B");
  svg += '<line x1="' + cx + '" y1="110" x2="' + cx + '" y2="132" stroke="#94A3B8" stroke-width="2"/>';
  svg += orgBox(cx - 110, 132, 220, "Ketua", orgData.ketua, "#1D49C8");
  svg += '<line x1="' + cx + '" y1="190" x2="' + cx + '" y2="212" stroke="#94A3B8" stroke-width="2"/>';
  const trio = [["Wakil Ketua", orgData.wakil], ["Sekretaris", orgData.sekretaris], ["Bendahara", orgData.bendahara]];
  const tw = 220, gap = (W - 3 * tw) / 4;
  trio.forEach((t, i) => { const x = gap + i * (tw + gap); svg += '<line x1="' + (x + tw / 2) + '" y1="212" x2="' + (x + tw / 2) + '" y2="200" stroke="#94A3B8" stroke-width="2"/>'; svg += orgBox(x, 212, tw, t[0], t[1], "#7C3AED"); });
  svg += '<line x1="' + (gap + tw / 2) + '" y1="200" x2="' + (gap + 2 * (tw + gap) + tw / 2) + '" y2="200" stroke="#94A3B8" stroke-width="2"/>';
  svg += '<line x1="' + cx + '" y1="270" x2="' + cx + '" y2="318" stroke="#94A3B8" stroke-width="2"/>';
  const dw = Math.min(230, (W - 40) / Math.max(1, divs.length) - 12);
  const totalW = divs.length * dw + (divs.length - 1) * 14;
  let dx = (W - totalW) / 2;
  const busY = 318;
  if (divs.length > 1) svg += '<line x1="' + (dx + dw / 2) + '" y1="' + busY + '" x2="' + (dx + totalW - dw / 2) + '" y2="' + busY + '" stroke="#94A3B8" stroke-width="2"/>';
  divs.forEach((d) => {
    const anggota = d.anggota.split(",").map((s) => s.trim()).filter(Boolean);
    const h = 58 + (anggota.length ? 16 + anggota.length * 17 : 0);
    svg += '<line x1="' + (dx + dw / 2) + '" y1="' + busY + '" x2="' + (dx + dw / 2) + '" y2="336" stroke="#94A3B8" stroke-width="2"/>';
    svg += '<rect x="' + dx + '" y="336" width="' + dw + '" height="' + h + '" rx="10" fill="#F8FAFC" stroke="#059669" stroke-width="2"/>';
    svg += '<text x="' + (dx + dw / 2) + '" y="358" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#059669">' + xe(d.nama.toUpperCase()) + "</text>";
    svg += '<text x="' + (dx + dw / 2) + '" y="379" text-anchor="middle" font-family="sans-serif" font-size="12.5" fill="#0F172A">Koord: ' + xe(d.koord || "—") + "</text>";
    anggota.forEach((a, ai) => { svg += '<text x="' + (dx + dw / 2) + '" y="' + (402 + ai * 17) + '" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#475569">' + xe(a) + "</text>"; });
    dx += dw + 14;
  });
  svg += '<text x="' + (W / 2) + '" y="' + (H - 10) + '" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#94A3B8">MahasiswaTools \u2022 mahasiswatools.web.id</text>';
  svg += "</svg>";
  $("#ogOut").innerHTML = '<div class="' + OUT + '">' + svg
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="unduhSvgPng(\'ogSvg\', \'Struktur_Organisasi.png\')">⬇️ Download Bagan (PNG)</button>'
    + '<button class="' + BTN2 + '" onclick="copyText(window._orgTxt)">📋 Copy Struktur Teks</button></div></div>';
  window._orgTxt = "STRUKTUR ORGANISASI — " + orgData.nama + "\nPembina/DPL: " + orgData.pembina + "\nKetua: " + orgData.ketua + "\nWakil: " + orgData.wakil + "\nSekretaris: " + orgData.sekretaris + "\nBendahara: " + orgData.bendahara + "\n" + divs.map((d) => d.nama + " — Koord: " + d.koord + " (Anggota: " + d.anggota + ")").join("\n");
}

/* ---------- 35. SERTIFIKAT MASSAL ---------- */
UI.k35 = function (el) {
  el.innerHTML = '<div class="fadein"><div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Nama Kegiatan", '<input id="srAcara" class="' + IN + '" value="Seminar Nasional Kewirausahaan Mahasiswa 2026">')
    + field("Peran Penerima", '<select id="srPeran" class="' + IN + '"><option>Peserta</option><option>Panitia</option><option>Pemateri</option><option>Moderator</option><option>Juara</option></select>')
    + field("Kota & Tanggal", '<input id="srTgl" class="' + IN + '" value="Palembang, 21 Oktober 2026">')
    + field("Penandatangan", '<input id="srTtd" class="' + IN + '" placeholder="Nama ketua panitia/rektor">')
    + field("Jabatan Penandatangan", '<input id="srJab" class="' + IN + '" value="Ketua Panitia">')
    + field("Nomor Sertifikat (awalan)", '<input id="srNo" class="' + IN + '" value="001/SERT/2026">')
    + '</div>'
    + field("Daftar Nama Penerima (satu per baris)", '<textarea id="srNama" rows="5" class="' + IN + '" placeholder="Satu nama per baris — sertifikat dibuat untuk SEMUA nama sekaligus">Andini Prameswari&#10;Bima Aditya Nugraha&#10;Citra Dewi Lestari</textarea>')
    + field("Template Sertifikat", '<select id="srTpl" class="' + IN + '" onchange="srTplChange()"><option value="klasik">🏆 Klasik Emas</option><option value="biru">🔵 Biru Korporat</option><option value="hijau">🟢 Hijau Alam</option><option value="marun">🔴 Marun Elegan</option><option value="mono">⚫ Mono Brutalist</option><option value="custom">🖼️ Template Sendiri (Upload Background)</option></select>')
    + '<div id="srCustomBox" class="hidden rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 p-3 mb-3">'
    + field("Upload Gambar Background Template (landscape, mis. 1400×990)", '<input id="srBg" type="file" accept="image/*" class="' + IN + '" onchange="srBgLoad(this)">')
    + '<div class="grid grid-cols-3 gap-3">'
    + field("Posisi Nama (vertikal %)", '<input id="srNamaY" type="range" min="25" max="80" value="47" class="w-full">')
    + field("Ukuran Font Nama", '<input id="srNamaSize" type="range" min="30" max="90" value="54" class="w-full">')
    + field("Warna Nama", '<input id="srNamaColor" type="color" value="#122B78" class="w-full h-[42px]">')
    + '</div><label class="flex items-center gap-2 text-sm font-semibold"><input id="srShowAcara" type="checkbox" checked class="w-4 h-4 accent-black"> Tampilkan juga teks peran & nama acara di bawah nama</label></div>'
    + '<div class="flex flex-wrap gap-2"><button class="' + BTN + '" onclick="gambarSertifikat(0)">👁 Pratinjau Sertifikat</button>'
    + '<button class="' + BTN + '" style="background:#059669" onclick="unduhSertifikatZip()">⬇️ Download Semua (ZIP PNG)</button>'
    + '<button class="' + BTN2 + '" onclick="unduhSertifikatPdfZip()">⬇️ Download Semua (ZIP PDF)</button></div>'
    + '<div class="mt-4 overflow-x-auto"><canvas id="srCv" width="1400" height="990" class="hidden w-full rounded-lg shadow border border-slate-200"></canvas></div>'
    + outBox("srOut") + "</div>";
};
function gambarSertifikat(idx) {
  const g = (id) => ($("#" + id) ? $("#" + id).value.trim() : "");
  const names = g("srNama").split(/\n/).map((s) => s.trim()).filter(Boolean);
  const nama = names[idx] || "Nama Penerima";
  const cv = $("#srCv"); cv.classList.remove("hidden");
  const ctx = cv.getContext("2d");
  const tpl = ($("#srTpl") || {}).value || "klasik";
  if (tpl === "custom") {
    if (window._srBgImg) { const im = window._srBgImg; const sc = Math.max(1400 / im.width, 990 / im.height); ctx.drawImage(im, (1400 - im.width * sc) / 2, (990 - im.height * sc) / 2, im.width * sc, im.height * sc); }
    else { ctx.fillStyle = "#F8FAFC"; ctx.fillRect(0, 0, 1400, 990); ctx.strokeStyle = "#94A3B8"; ctx.lineWidth = 4; ctx.setLineDash([18, 12]); ctx.strokeRect(30, 30, 1340, 930); ctx.setLineDash([]); ctx.fillStyle = "#64748B"; ctx.font = "600 30px sans-serif"; ctx.textAlign = "center"; ctx.fillText("Upload gambar background template kamu di atas", 700, 200); ctx.fillText("lalu klik Pratinjau — nama akan ditempatkan sesuai slider.", 700, 246); }
    const yPct = Number(($("#srNamaY") || {}).value || 47) / 100;
    const size = Number(($("#srNamaSize") || {}).value || 54);
    const color = ($("#srNamaColor") || {}).value || "#122B78";
    ctx.textAlign = "center"; ctx.fillStyle = color;
    ctx.font = "800 " + size + "px Georgia, serif";
    ctx.fillText(nama, 700, Math.round(990 * yPct));
    if (($("#srShowAcara") || {}).checked) {
      ctx.font = "23px sans-serif";
      const kalimat2 = "Atas partisipasinya sebagai " + g("srPeran") + " dalam kegiatan \u201C" + g("srAcara") + "\u201D.";
      ctx.fillText(kalimat2.slice(0, 110), 700, Math.round(990 * yPct) + 56);
    }
    ctx.font = "13px sans-serif"; ctx.fillStyle = "rgba(100,116,139,.75)";
    ctx.fillText("Dibuat dengan MahasiswaTools • Dari Mahasiswa, Untuk Mahasiswa", 700, 950);
    return cv;
  }
  const TPLS = {
    klasik: { bg1: "#FDFBF5", bg2: "#F5EFE0", frame: "#B8860B", inner: "#122B78", title: "#8A6508", name: "#122B78", accent: "#B8860B", band: null },
    biru: { bg1: "#F5F9FF", bg2: "#DCE9FF", frame: "#1D49C8", inner: "#1D49C8", title: "#122B78", name: "#122B78", accent: "#1D49C8", band: "#1D49C8" },
    hijau: { bg1: "#F3FBF6", bg2: "#DFF3E6", frame: "#047857", inner: "#047857", title: "#065F46", name: "#065F46", accent: "#059669", band: null },
    marun: { bg1: "#FBF5F5", bg2: "#F3E3E3", frame: "#7F1D1D", inner: "#7F1D1D", title: "#7F1D1D", name: "#450A0A", accent: "#991B1B", band: null },
    mono: { bg1: "#FFFFFF", bg2: "#FFFFFF", frame: "#000000", inner: "#000000", title: "#000000", name: "#000000", accent: "#000000", band: null }
  };
  const P = TPLS[tpl] || TPLS.klasik;
  const grd = ctx.createLinearGradient(0, 0, 1400, 990); grd.addColorStop(0, P.bg1); grd.addColorStop(1, P.bg2);
  ctx.fillStyle = grd; ctx.fillRect(0, 0, 1400, 990);
  if (P.band) { ctx.fillStyle = P.band; ctx.fillRect(0, 0, 1400, 104); ctx.fillStyle = "#FFFFFF"; ctx.font = "800 30px 'Plus Jakarta Sans', sans-serif"; ctx.textAlign = "center"; ctx.fillText("🎓 MahasiswaTools", 700, 66); }
  ctx.strokeStyle = P.frame; ctx.lineWidth = tpl === "mono" ? 14 : 10; ctx.strokeRect(28, 28, 1344, 934);
  ctx.lineWidth = 2; ctx.strokeRect(52, 52, 1296, 886);
  ctx.strokeStyle = P.inner; ctx.lineWidth = 3; ctx.strokeRect(66, 66, 1268, 858);
  ctx.textAlign = "center"; ctx.fillStyle = P.inner;
  if (!P.band) { ctx.font = "800 30px 'Plus Jakarta Sans', sans-serif"; ctx.fillText("🎓 MahasiswaTools", 700, 140); }
  ctx.font = "800 74px Georgia, serif"; ctx.fillStyle = P.title;
  ctx.fillText("SERTIFIKAT", 700, P.band ? 268 : 250);
  ctx.font = "600 24px sans-serif"; ctx.fillStyle = "#475569";
  ctx.fillText("Nomor: " + g("srNo") + "/" + String(idx + 1).padStart(3, "0"), 700, P.band ? 318 : 300);
  ctx.font = "22px sans-serif"; ctx.fillText("Diberikan dengan bangga kepada:", 700, 380);
  ctx.font = "800 54px Georgia, serif"; ctx.fillStyle = P.name;
  ctx.fillText(nama, 700, 460);
  ctx.strokeStyle = P.accent; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(350, 486); ctx.lineTo(1050, 486); ctx.stroke();
  ctx.fillStyle = "#334155";
  const kalimat = "Atas partisipasinya sebagai " + g("srPeran") + " dalam kegiatan \u201C" + g("srAcara") + "\u201D. Semoga ilmu dan pengalaman yang diperoleh bermanfaat bagi pengembangan diri dan masyarakat.";
  (function () { const words = kalimat.split(" "); let lines = [], line = ""; ctx.font = "23px sans-serif"; for (const w of words) { const t = line ? line + " " + w : w; if (ctx.measureText(t).width > 1060 && line) { lines.push(line); line = w; } else line = t; } if (line) lines.push(line); lines.forEach((l, li) => ctx.fillText(l, 700, 548 + li * 34)); })();
  ctx.font = "21px sans-serif"; ctx.fillStyle = "#0F172A";
  ctx.fillText(g("srTgl"), 1050, 730);
  ctx.fillText(g("srJab") + ",", 1050, 762);
  ctx.font = "italic 30px Georgia, serif"; ctx.fillText(g("srTtd") || "Panitia", 1050, 838);
  ctx.strokeStyle = "#0F172A"; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(880, 856); ctx.lineTo(1220, 856); ctx.stroke();
  ctx.font = "700 20px sans-serif"; ctx.fillText(g("srTtd") || "....................", 1050, 884);
  ctx.font = "13px sans-serif"; ctx.fillStyle = "#94A3B8";
  ctx.fillText("Dibuat dengan MahasiswaTools • Dari Mahasiswa, Untuk Mahasiswa", 700, 950);
  return cv;
}
async function unduhSertifikatZip() {
  const out = $("#srOut");
  const ok = await loadLib("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js", "JSZip");
  if (!ok) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">❌ Library ZIP gagal dimuat — cek koneksi internet lalu coba lagi.</div>'; return; }
  const names = $("#srNama").value.split(/\n/).map((s) => s.trim()).filter(Boolean);
  if (!names.length) { toast("Isi minimal satu nama penerima."); return; }
  out.innerHTML = '<div class="' + OUT + '">⏳ Membuat ' + names.length + " sertifikat…</div>";
  const zip = new JSZip();
  for (let i = 0; i < names.length; i++) {
    const cv = gambarSertifikat(i);
    const blob = await canvasBlob(cv);
    zip.file("Sertifikat_" + String(i + 1).padStart(2, "0") + "_" + names[i].replace(/[^\w]+/g, "_") + ".png", blob);
  }
  const zipBlob = await zip.generateAsync({ type: "blob" });
  window._sertifikatZip = zipBlob;
  out.innerHTML = '<div class="' + OUT + '">✅ ' + names.length + ' sertifikat selesai dibuat dalam satu file ZIP.</div>';
  download("Sertifikat_Massal.zip", zipBlob);
}

/* ---------- 36. DESAIN PLANG DESA ---------- */
UI.k36 = function (el) {
  el.innerHTML = '<div class="fadein"><div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Baris Utama", '<input id="pl1" class="' + IN + '" value="SELAMAT DATANG">')
    + field("Baris Kedua (nama dusun/desa)", '<input id="pl2" class="' + IN + '" value="Dusun Krajan • Desa Sukamaju">')
    + field("Baris Kecil (keterangan)", '<input id="pl3" class="' + IN + '" value="Kawasan Tertib, Bersih, dan Ramah — KKN 2026">')
    + field("Tema Warna", '<select id="plTema" class="' + IN + '"><option value="hijau">🌿 Hijau Desa</option><option value="biru">💙 Biru Kampus</option><option value="kayu">🪵 Kayu Klasik</option><option value="merah">🧱 Merah Bata</option></select>')
    + field("Ikon", '<select id="plIkon" class="' + IN + '"><option value="🌾">🌾 Padi</option><option value="🕌">🕌 Masjid</option><option value="🏫">🏫 Sekolah</option><option value="📚">📚 Taman Baca</option><option value="➡️">➡️ Panah Kanan</option><option value="⬅️">⬅️ Panah Kiri</option><option value="">Tanpa ikon</option></select>')
    + field("Gambar Tiang Penyangga", '<label class="flex items-center gap-2 text-sm font-semibold pt-2"><input id="plTiang" type="checkbox" checked class="w-4 h-4 accent-brand-600"> Tampilkan tiang & tanah</label>')
    + '</div><button class="' + BTN + '" onclick="buatPlang()">🪧 Buat Desain Plang</button>'
    + '<div class="mt-4 overflow-x-auto"><canvas id="plCv" width="1200" height="760" class="hidden w-full max-w-[680px] rounded-lg shadow border border-slate-200"></canvas></div>'
    + outBox("plOut") + "</div>";
};
function buatPlang() {
  const g = (id) => $("#" + id).value.trim();
  const tema = { hijau: ["#14532D", "#22C55E", "#F0FDF4"], biru: ["#122B78", "#2F5FE8", "#EEF4FF"], kayu: ["#4A2F1B", "#92600F", "#FFF7E6"], merah: ["#7F1D1D", "#DC2626", "#FEF2F2"] }[$("#plTema").value];
  const cv = $("#plCv"); cv.classList.remove("hidden");
  const ctx = cv.getContext("2d");
  ctx.fillStyle = "#E7F0E9"; ctx.fillRect(0, 0, 1200, 760);
  ctx.fillStyle = "#B7D8C0"; ctx.beginPath(); ctx.ellipse(200, 730, 420, 90, 0, 0, 7); ctx.ellipse(1010, 740, 380, 80, 0, 0, 7); ctx.fill();
  const tiang = $("#plTiang").checked;
  if (tiang) { ctx.fillStyle = "#5B4632"; ctx.fillRect(240, 380, 34, 330); ctx.fillRect(926, 380, 34, 330); ctx.fillStyle = "#3E5C3A"; ctx.fillRect(0, 700, 1200, 60); }
  const by = 70, bh = 330;
  ctx.fillStyle = tema[0]; roundRect(ctx, 90, by, 1020, bh, 22); ctx.fill();
  ctx.strokeStyle = tema[1]; ctx.lineWidth = 7; roundRect(ctx, 104, by + 14, 992, bh - 28, 16); ctx.stroke();
  ctx.fillStyle = tema[1]; for (let i = 1; i < 4; i++) { ctx.fillRect(120, by + i * (bh / 4), 960, 2.5); }
  ctx.textAlign = "center"; ctx.fillStyle = tema[2];
  const ikon = $("#plIkon").value;
  ctx.font = "92px sans-serif";
  if (ikon) ctx.fillText(ikon, 600, by + 116);
  ctx.font = "800 66px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText(g("pl1") || "SELAMAT DATANG", 600, by + (ikon ? 208 : 150));
  ctx.font = "700 40px sans-serif";
  ctx.fillText(g("pl2"), 600, by + (ikon ? 268 : 218));
  ctx.font = "500 25px sans-serif"; ctx.globalAlpha = 0.9;
  ctx.fillText(g("pl3"), 600, by + (ikon ? 312 : 272));
  ctx.globalAlpha = 1;
  ctx.font = "13px sans-serif"; ctx.fillStyle = "#64748B";
  ctx.fillText("Desain dibuat dengan MahasiswaTools • Dari Mahasiswa, Untuk Mahasiswa", 600, 744);
  cv.toBlob((b) => { window._plangPng = b; }, "image/png");
  $("#plOut").innerHTML = '<div class="' + OUT + '"><button class="' + BTN + '" onclick="download(\'Desain_Plang_Desa.png\', window._plangPng)">⬇️ Download Desain Plang (PNG)</button></div>';
}

;

/* ============================================================
   TOOLS 37–40 (Dokumen & Foto)
   ============================================================ */
/* ---------- 37. PAS FOTO GANTI BACKGROUND ---------- */
let pasfoto = { img: null, bgColor: [240, 240, 240] };
UI.k37 = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Upload Foto Wajah", '<input id="pfFile" type="file" accept="image/*" class="' + IN + '" onchange="pfLoad(this)">')
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Ukuran Pas Foto (300 DPI)", '<select id="pfSize" class="' + IN + '"><option value="354x472">3 × 4 cm (354×472 px)</option><option value="472x709">4 × 6 cm (472×709 px)</option><option value="236x354">2 × 3 cm (236×354 px)</option></select>')
    + field("Warna Background Baru", '<select id="pfBg" class="' + IN + '"><option value="#DB1514">🔴 Merah (standar ijazah/CPNS)</option><option value="#0054A6">🔵 Biru #0054A6 (standar berkas kampus)</option><option value="#FFFFFF">⚪ Putih</option><option value="">Biarkan Asli</option></select>')
    + field("Zoom Foto", '<input id="pfZoom" type="range" min="80" max="220" value="100" class="w-full accent-brand-600">')
    + field("Geser Vertikal", '<input id="pfOff" type="range" min="-40" max="40" value="0" class="w-full accent-brand-600">')
    + field("Toleransi Ganti Background", '<input id="pfTol" type="range" min="8" max="90" value="34" class="w-full accent-brand-600">', "Geser bila tepi rambut/bahu ikut berubah atau latar belum bersih. Warna latar dideteksi otomatis dari sudut foto.")
    + '</div><button class="' + BTN + '" onclick="prosesPasfoto()">🖼 Proses Pas Foto</button>'
    + '<div class="mt-4 flex justify-center"><canvas id="pfCv" width="354" height="472" class="hidden rounded-lg shadow border border-slate-300 max-w-[280px] w-full"></canvas></div>'
    + outBox("pfOut") + "</div>";
};
function pfLoad(input) {
  const f = input.files && input.files[0]; if (!f) return;
  fileToImage(f).then((img) => { pasfoto.img = img; toast("Foto dimuat — klik Proses Pas Foto 📸"); });
}
function prosesPasfoto() {
  const out = $("#pfOut");
  if (!pasfoto.img) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Upload foto dulu ya.</div>'; return; }
  const [W, H] = $("#pfSize").value.split("x").map(Number);
  const cv = $("#pfCv"); cv.width = W; cv.height = H; cv.classList.remove("hidden");
  const zoom = Number($("#pfZoom").value) / 100, offY = Number($("#pfOff").value) / 100;
  const img = pasfoto.img;
  const base = Math.max(W / img.width, H / img.height) * zoom;
  const dw = img.width * base, dh = img.height * base;
  const dx = (W - dw) / 2, dy = (H - dh) / 2 + offY * H;
  const ctx = cv.getContext("2d");
  ctx.fillStyle = "#EEE"; ctx.fillRect(0, 0, W, H);
  ctx.drawImage(img, dx, dy, dw, dh);
  const target = $("#pfBg").value;
  if (target) {
    const data = ctx.getImageData(0, 0, W, H), d = data.data;
    const corners = [[2, 2], [W - 3, 2], [2, H - 3], [W - 3, H - 3]].map(([x, y]) => { const i = (y * W + x) * 4; return [d[i], d[i + 1], d[i + 2]]; });
    const bg = [0, 1, 2].map((c) => Math.round(corners.reduce((a, p) => a + p[c], 0) / 4));
    pasfoto.bgColor = bg;
    const tol = Number($("#pfTol").value);
    const tc = [parseInt(target.slice(1, 3), 16), parseInt(target.slice(3, 5), 16), parseInt(target.slice(5, 7), 16)];
    for (let i = 0; i < d.length; i += 4) {
      const dist = Math.sqrt((d[i] - bg[0]) ** 2 + (d[i + 1] - bg[1]) ** 2 + (d[i + 2] - bg[2]) ** 2);
      if (dist < tol) { d[i] = tc[0]; d[i + 1] = tc[1]; d[i + 2] = tc[2]; }
      else if (dist < tol * 1.7) { const f = (dist - tol) / (tol * 0.7); d[i] = Math.round(tc[0] + (d[i] - tc[0]) * f); d[i + 1] = Math.round(tc[1] + (d[i + 1] - tc[1]) * f); d[i + 2] = Math.round(tc[2] + (d[i + 2] - tc[2]) * f); }
    }
    ctx.putImageData(data, 0, 0);
  }
  cv.toBlob((b) => { window._pasfotoPng = b; }, "image/png");
  out.innerHTML = '<div class="' + OUT + '"><p class="text-sm mb-3">Pas foto ' + $("#pfSize").value.replace("x", "×") + ' px (setara cetakan 300 DPI) selesai. Warna latar terdeteksi: rgb(' + pasfoto.bgColor.join(", ") + '). Bila hasil belum bersih, sesuaikan Toleransi lalu proses ulang.</p>'
    + '<div class="flex flex-wrap gap-2"><button class="' + BTN + '" onclick="download(\'PasFoto.png\', window._pasfotoPng)">⬇️ Download PNG</button></div></div>';
}

/* ---------- 38. TANDA TANGAN TRANSPARAN ---------- */
let ttdImg = null;
UI.k38 = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Upload Foto Tanda Tangan di Kertas Putih", '<input id="ttFile" type="file" accept="image/*" class="' + IN + '" onchange="ttLoad(this)">')
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Warna Tinta", '<select id="ttWarna" class="' + IN + '"><option value="asli">Asli dari foto</option><option value="#0F172A">Hitam pekat</option><option value="#1E3A8A">Biru bolpoin</option></select>')
    + field("Sensitivitas Penghapus Kertas", '<input id="ttSens" type="range" min="120" max="245" value="205" class="w-full accent-brand-600">', "Naikkan bila kertas masih terlihat abu-abu; turunkan bila goresan tipis ikut hilang.")
    + '</div><button class="' + BTN + '" onclick="prosesTtd()">✍️ Buang Background Kertas</button>'
    + '<div class="mt-4 rounded-xl border border-slate-300 overflow-hidden hidden" id="ttWrap" style="background:repeating-conic-gradient(#E2E8F0 0% 25%, #FFFFFF 0% 50%) 0 0/24px 24px"><canvas id="ttCv" class="w-full"></canvas></div>'
    + outBox("ttOut") + "</div>";
};
function ttLoad(input) { const f = input.files && input.files[0]; if (!f) return; fileToImage(f).then((img) => { ttdImg = img; toast("Foto tanda tangan dimuat ✍️"); }); }
function prosesTtd() {
  const out = $("#ttOut");
  if (!ttdImg) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Upload foto tanda tangan dulu ya.</div>'; return; }
  const maxW = 1200, scale = Math.min(1, maxW / ttdImg.width);
  const W = Math.round(ttdImg.width * scale), H = Math.round(ttdImg.height * scale);
  const cv = $("#ttCv"); cv.width = W; cv.height = H;
  $("#ttWrap").classList.remove("hidden");
  const ctx = cv.getContext("2d");
  ctx.drawImage(ttdImg, 0, 0, W, H);
  const sens = Number($("#ttSens").value), mode = $("#ttWarna").value;
  const data = ctx.getImageData(0, 0, W, H), d = data.data;
  const ink = mode !== "asli" ? [parseInt(mode.slice(1, 3), 16), parseInt(mode.slice(3, 5), 16), parseInt(mode.slice(5, 7), 16)] : null;
  for (let i = 0; i < d.length; i += 4) {
    const lum = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
    let a = 0;
    if (lum < sens - 70) a = 255;
    else if (lum < sens) a = Math.round(255 * (sens - lum) / 70);
    d[i + 3] = a;
    if (ink && a > 0) { d[i] = ink[0]; d[i + 1] = ink[1]; d[i + 2] = ink[2]; }
  }
  ctx.putImageData(data, 0, 0);
  cv.toBlob((b) => { window._ttdPng = b; }, "image/png");
  out.innerHTML = '<div class="' + OUT + '"><p class="text-sm mb-3">Background kertas dibuang — hasilnya PNG transparan, siap ditempel di dokumen Word/PDF apa pun.</p>'
    + '<button class="' + BTN + '" onclick="download(\'TandaTangan_Transparan.png\', window._ttdPng)">⬇️ Download PNG Transparan</button></div>';
}

/* ---------- 39. GRID FOTO LAMPIRAN ---------- */
let gridImgs = [];
UI.k39 = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Upload Foto Dokumentasi (bisa banyak)", '<input id="gfFile" type="file" accept="image/*" multiple class="' + IN + '" onchange="gfLoad(this)">')
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Judul Lampiran", '<input id="gfJud" class="' + IN + '" value="Lampiran Dokumentasi Kegiatan">')
    + field("Jumlah Kolom", '<select id="gfKol" class="' + IN + '"><option value="2">2 kolom</option><option value="3" selected>3 kolom</option><option value="4">4 kolom</option></select>')
    + '</div><div id="gfCaps" class="space-y-2 mb-3"></div>'
    + '<button class="' + BTN + '" onclick="buatGrid()">🧩 Susun Grid Lampiran</button>'
    + '<div class="mt-4 overflow-x-auto"><canvas id="gfCv" class="hidden w-full rounded-lg shadow border border-slate-200"></canvas></div>'
    + outBox("gfOut") + "</div>";
};
function gfLoad(input) {
  const files = [...(input.files || [])];
  if (!files.length) return;
  Promise.all(files.map(fileToImage)).then((imgs) => {
    gridImgs = gridImgs.concat(imgs);
    $("#gfCaps").innerHTML = gridImgs.map((_, i) => '<input class="' + IN + '" id="gfCap' + i + '" value="Dokumentasi ' + (i + 1) + '" placeholder="Keterangan foto ' + (i + 1) + '">').join("");
    toast(gridImgs.length + " foto dimuat 🧩");
  });
}
function buatGrid() {
  const out = $("#gfOut");
  if (gridImgs.length < 1) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Upload minimal 1 foto dulu ya.</div>'; return; }
  const kol = Number($("#gfKol").value), W = 1260, pad = 24, gap = 16;
  const cellW = (W - pad * 2 - gap * (kol - 1)) / kol, cellH = Math.round(cellW * 0.72), capH = 40;
  const rows = Math.ceil(gridImgs.length / kol);
  const H = 84 + rows * (cellH + capH + gap) + 46;
  const cv = $("#gfCv"); cv.width = W; cv.height = H; cv.classList.remove("hidden");
  const ctx = cv.getContext("2d");
  ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#122B78"; ctx.font = "800 30px 'Plus Jakarta Sans', sans-serif"; ctx.textAlign = "center";
  ctx.fillText($("#gfJud").value.trim(), W / 2, 52);
  gridImgs.forEach((img, i) => {
    const cx = pad + (i % kol) * (cellW + gap), cy = 84 + Math.floor(i / kol) * (cellH + capH + gap);
    const s = Math.max(cellW / img.width, cellH / img.height);
    ctx.save(); ctx.beginPath(); ctx.rect(cx, cy, cellW, cellH); ctx.clip();
    ctx.drawImage(img, cx + (cellW - img.width * s) / 2, cy + (cellH - img.height * s) / 2, img.width * s, img.height * s);
    ctx.restore();
    ctx.strokeStyle = "#CBD5E1"; ctx.lineWidth = 1.5; ctx.strokeRect(cx, cy, cellW, cellH);
    ctx.fillStyle = "#F1F5F9"; ctx.fillRect(cx, cy + cellH, cellW, capH);
    ctx.fillStyle = "#334155"; ctx.font = "600 16px sans-serif";
    const cap = ($("#gfCap" + i) ? $("#gfCap" + i).value : "Dokumentasi " + (i + 1));
    ctx.fillText(cap, cx + cellW / 2, cy + cellH + 26);
  });
  ctx.font = "13px sans-serif"; ctx.fillStyle = "#94A3B8";
  ctx.fillText("Lampiran disusun dengan MahasiswaTools • Dari Mahasiswa, Untuk Mahasiswa", W / 2, H - 14);
  cv.toBlob((b) => { window._gridJpg = b; download("Grid_Lampiran_Dokumentasi.png", b); }, "image/png");
  out.innerHTML = '<div class="' + OUT + '">' + gridImgs.length + ' foto tersusun dalam grid ' + kol + ' kolom — file otomatis terunduh. Klik "Susun Grid" lagi bila mengubah keterangan.</div>';
}

/* ---------- 40. TIMESTAMP & GEOTAG FOTO ---------- */
let tsImg = null;
UI.k40 = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Upload Foto Tugas Lapangan", '<input id="tsFile" type="file" accept="image/*" class="' + IN + '" onchange="tsLoad(this)">')
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Tanggal & Jam", '<input id="tsWaktu" type="datetime-local" class="' + IN + '">')
    + field("Lokasi / Koordinat", '<input id="tsLok" class="' + IN + '" placeholder="cth: Balai Desa Sukamaju, Kec. Ilir Timur (-2.97, 104.77)">')
    + field("Posisi Tulisan", '<select id="tsPos" class="' + IN + '"><option value="strip">Strip hitam di bawah foto</option><option value="kiri">Teks kiri bawah</option><option value="kanan">Teks kanan bawah</option></select>')
    + field("Ukuran Teks", '<input id="tsUk" type="range" min="14" max="54" value="30" class="w-full accent-brand-600">')
    + '</div><button class="' + BTN + '" onclick="buatTimestamp()">🕒 Tempel Timestamp</button>'
    + '<div class="mt-4 overflow-x-auto"><canvas id="tsCv" class="hidden w-full rounded-lg shadow border border-slate-200"></canvas></div>'
    + outBox("tsOut") + "</div>";
  const now = new Date(); now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  $("#tsWaktu").value = now.toISOString().slice(0, 16);
};
function tsLoad(input) { const f = input.files && input.files[0]; if (!f) return; fileToImage(f).then((img) => { tsImg = img; toast("Foto dimuat 🕒"); }); }
function buatTimestamp() {
  const out = $("#tsOut");
  if (!tsImg) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Upload foto dulu ya.</div>'; return; }
  const W = Math.min(1400, tsImg.width), H = Math.round(tsImg.height * W / tsImg.width);
  const fs = Number($("#tsUk").value), pos = $("#tsPos").value;
  const stripH = pos === "strip" ? fs * 2.7 : 0;
  const cv = $("#tsCv"); cv.width = W; cv.height = H + stripH; cv.classList.remove("hidden");
  const ctx = cv.getContext("2d");
  ctx.drawImage(tsImg, 0, 0, W, H);
  const dt = new Date($("#tsWaktu").value);
  const tgl = dt.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) + " • " + dt.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }).replace(".", ":") + " WIB";
  const lines = ["🕒 " + tgl]; if ($("#tsLok").value.trim()) lines.push("📍 " + $("#tsLok").value.trim());
  ctx.font = "600 " + fs + "px sans-serif";
  if (pos === "strip") {
    ctx.fillStyle = "rgba(10,10,10,0.92)"; ctx.fillRect(0, H, W, stripH);
    ctx.fillStyle = "#FACC15"; ctx.textAlign = "left";
    lines.forEach((l, i) => ctx.fillText(l, 18, H + fs * 1.25 + i * fs * 1.35));
    ctx.fillStyle = "#94A3B8"; ctx.font = "500 " + Math.round(fs * 0.52) + "px sans-serif"; ctx.textAlign = "right";
    ctx.fillText("via MahasiswaTools", W - 16, H + stripH - 12);
  } else {
    ctx.textAlign = pos === "kiri" ? "left" : "right";
    const tx = pos === "kiri" ? 16 : W - 16;
    lines.forEach((l, i) => {
      const y = H - (lines.length - i) * fs * 1.35 - 10;
      ctx.lineWidth = fs / 6; ctx.strokeStyle = "rgba(0,0,0,0.75)"; ctx.strokeText(l, tx, y);
      ctx.fillStyle = "#FACC15"; ctx.fillText(l, tx, y);
    });
  }
  cv.toBlob((b) => { window._tsJpg = b; }, "image/jpeg", 0.92);
  out.innerHTML = '<div class="' + OUT + '"><button class="' + BTN + '" onclick="download(\'Foto_Timestamp.jpg\', window._tsJpg)">⬇️ Download Foto Ber-timestamp (JPG)</button></div>';
}

;

/* ============================================================
   TOOLS 41–45 (Dokumen lanjutan & Karier)
   ============================================================ */
/* ---------- 41. QR CODE GENERATOR ---------- */
UI.k41 = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Link / Teks Tujuan", '<input id="qrTxt" class="' + IN + '" value="https://forms.gle/contoh-kuesioner" placeholder="cth: link Google Form kuesionermu">')
    + '<div class="grid sm:grid-cols-3 gap-x-4">'
    + field("Ukuran Unduhan", '<select id="qrSize" class="' + IN + '"><option value="512">512 px</option><option value="1024" selected>1024 px</option><option value="2048">2048 px</option></select>')
    + field("Ketahanan Rusak (ECC)", '<select id="qrEcc" class="' + IN + '"><option value="M">M — 15%</option><option value="Q">Q — 25%</option><option value="H" selected>H — 30% (paling awet)</option></select>')
    + field("Warna Modul", '<input id="qrWarna" type="color" value="#122B78" class="w-full h-[46px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-1">')
    + '</div>'
    + field("Label di Bawah QR (opsional)", '<input id="qrLabel" class="' + IN + '" placeholder="cth: Scan untuk isi kuesioner penelitian saya 🙏">')
    + field("Logo di Tengah QR (opsional, khusus ECC Q/H)", '<input id="qrLogo" type="file" accept="image/*" class="' + IN + '" onchange="qrLogoLoad(this)">')
    + '<button class="' + BTN + '" onclick="buatQr()">🔳 Generate QR Code</button>'
    + '<div class="mt-4 flex justify-center"><canvas id="qrCv" class="hidden rounded-lg shadow border border-slate-200 max-w-[320px] w-full bg-white"></canvas></div>'
    + outBox("qrOut") + "</div>";
};
async function buatQr() {
  const out = $("#qrOut");
  const ok = await loadLib("https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js", "qrcode");
  if (!ok || typeof qrcode !== "function") { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">❌ Library QR gagal dimuat — butuh internet sekali, coba lagi.</div>'; return; }
  const txt = $("#qrTxt").value.trim();
  if (!txt) { toast("Isi link/teks tujuan dulu."); return; }
  try {
    const qr = qrcode(0, $("#qrEcc").value);
    qr.addData(txt); qr.make();
    window._qrModules = qr.getModuleCount();
    const size = Number($("#qrSize").value), label = $("#qrLabel").value.trim();
    const quiet = 4, count = qr.getModuleCount();
    const cell = Math.floor(size / (count + quiet * 2));
    const qrPx = cell * (count + quiet * 2);
    const labelH = label ? Math.round(size * 0.11) : 0;
    const cv = $("#qrCv"); cv.width = qrPx; cv.height = qrPx + labelH; cv.classList.remove("hidden");
    const ctx = cv.getContext("2d");
    ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = $("#qrWarna").value;
    for (let r = 0; r < count; r++) for (let c = 0; c < count; c++) if (qr.isDark(r, c)) ctx.fillRect((c + quiet) * cell, (r + quiet) * cell, cell, cell);
    if (window._qrLogoImg) { const ls = Math.round(qrPx * 0.22); const lx = (qrPx - ls) / 2; ctx.fillStyle = "#FFFFFF"; roundRect(ctx, lx - 8, lx - 8, ls + 16, ls + 16, 14); ctx.fill(); const li = window._qrLogoImg; const sc = Math.max(ls / li.width, ls / li.height); ctx.save(); ctx.beginPath(); ctx.rect(lx, lx, ls, ls); ctx.clip(); ctx.drawImage(li, lx + (ls - li.width * sc) / 2, lx + (ls - li.height * sc) / 2, li.width * sc, li.height * sc); ctx.restore(); }
    if (label) { ctx.fillStyle = "#0F172A"; ctx.font = "700 " + Math.round(size * 0.042) + "px sans-serif"; ctx.textAlign = "center"; ctx.fillText(label, qrPx / 2, qrPx + labelH * 0.62); }
    cv.toBlob((b) => { window._qrPng = b; }, "image/png");
    out.innerHTML = '<div class="' + OUT + '"><p class="text-sm mb-3">QR ' + count + "×" + count + ' modul, level koreksi ' + $("#qrEcc").value + ' — permanen selama link tujuan tidak berubah. Cetak besar untuk poster/banner kuesioner.</p>'
      + '<button class="' + BTN + '" onclick="download(\'QR_Code_Kuesioner.png\', window._qrPng)">⬇️ Download QR (PNG)</button></div>';
  } catch (e) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">❌ Teks terlalu panjang untuk satu QR. Singkat link-nya (pakai pemendek URL) lalu coba lagi.</div>'; }
}

/* ---------- 42. OCR GAMBAR KE TEKS ---------- */
let ocrImg = null;
UI.k42 = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Upload Foto/Scan Catatan atau Halaman Buku", '<input id="ocFile" type="file" accept="image/*" class="' + IN + '" onchange="ocLoad(this)">')
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Bahasa Dokumen", '<select id="ocLang" class="' + IN + '"><option value="ind">🇮🇩 Bahasa Indonesia</option><option value="eng">🇬🇧 English</option></select>')
    + '<div class="flex items-end pb-4"><button class="' + BTN + '" onclick="prosesOcr()">🔍 Jalankan OCR</button></div></div>'
    + '<p id="ocStat" class="text-sm font-semibold text-slate-500 mb-2"></p>'
    + '<div class="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mb-4 hidden" id="ocBarWrap"><div id="ocBar" class="h-full bg-brand-600 transition-all" style="width:0%"></div></div>'
    + outBox("ocOut") + "</div>";
};
function ocLoad(input) { const f = input.files && input.files[0]; if (!f) return; ocrImg = f; toast("Gambar dimuat — klik Jalankan OCR 🔍"); }
async function prosesOcr() {
  const stat = $("#ocStat"), out = $("#ocOut");
  if (!ocrImg) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Upload gambar dulu ya.</div>'; return; }
  stat.textContent = "⏳ Memuat mesin OCR (Tesseract)…";
  const ok = await loadLib("https://cdn.jsdelivr.net/npm/tesseract.js@5.0.5/dist/tesseract.min.js", "Tesseract");
  if (!ok) { stat.textContent = "❌ Mesin OCR gagal dimuat (butuh internet untuk unduh pertama)."; return; }
  $("#ocBarWrap").classList.remove("hidden");
  const opts = Object.assign({ logger: (m) => { if (m.status === "recognizing text") { $("#ocBar").style.width = Math.round(m.progress * 100) + "%"; stat.textContent = "🔍 Membaca teks… " + Math.round(m.progress * 100) + "%"; } else stat.textContent = "⚙️ " + m.status + "…"; } }, window.__MT_TESS_OPTS || {});
  let worker = null;
  try {
    worker = await Tesseract.createWorker($("#ocLang").value, 1, opts);
    const { data } = await worker.recognize(ocrImg);
    window._ocrText = data.text.trim();
    stat.textContent = "✅ OCR selesai — " + (window._ocrText ? window._ocrText.split(/\s+/).length : 0) + " kata terbaca (keyakinan mesin ±" + Math.round(data.confidence) + "%). Periksa ejaan sebelum dipakai ya.";
    out.innerHTML = '<div class="' + OUT + '">' + field("Hasil Teks (bisa diedit)", '<textarea id="ocHasil" rows="11" class="' + IN + '">' + esc(window._ocrText) + "</textarea>")
      + '<div class="flex flex-wrap gap-2"><button class="' + BTN + '" onclick="copyText(document.getElementById(\'ocHasil\').value)">📋 Copy Teks</button>'
      + '<button class="' + BTN2 + '" onclick="download(\'Hasil_OCR.txt\', document.getElementById(\'ocHasil\').value)">⬇️ Download .txt</button></div></div>';
  } catch (e) { stat.textContent = "❌ OCR gagal: " + e.message; }
  finally { if (worker) try { await worker.terminate(); } catch (e) {} }
}

/* ---------- 43. PENGGABUNG & PEMISAH PDF ---------- */
let pdfMergeFiles = [], pdfSplitFile = null;
UI.k43 = function (el) {
  el.innerHTML = '<div class="fadein"><h4 class="font-extrabold text-base mb-2">🔗 Gabung Beberapa PDF Jadi Satu</h4>'
    + field("Pilih File PDF (bisa banyak, urutan sesuai pilihan)", '<input id="pmFile" type="file" accept="application/pdf" multiple class="' + IN + '" onchange="pmLoad(this)">')
    + '<div id="pmList" class="text-sm space-y-1 mb-3"></div>'
    + '<button class="' + BTN + '" onclick="gabungPdf()">Gabungkan PDF</button> <span id="pmStat" class="text-sm text-slate-500"></span>'
    + '<hr class="my-6 border-slate-200 dark:border-slate-700">'
    + '<h4 class="font-extrabold text-base mb-2">✂️ Ambil Halaman Tertentu dari PDF</h4>'
    + field("Pilih Satu File PDF", '<input id="psFile" type="file" accept="application/pdf" class="' + IN + '" onchange="psLoad(this)">')
    + '<p id="psInfo" class="text-sm font-semibold text-slate-500 mb-2"></p>'
    + field("Rentang Halaman", '<input id="psRange" class="' + IN + '" placeholder="cth: 1-3,5,8">', "Format: halaman tunggal (5), rentang (1-3), atau gabungan dipisah koma (1-3,5).")
    + '<button class="' + BTN + '" onclick="pisahPdf()">Pisahkan Halaman</button> <span id="psStat" class="text-sm text-slate-500"></span></div>';
};
async function pmLoad(input) {
  pdfMergeFiles = [];
  for (const f of [...(input.files || [])]) pdfMergeFiles.push({ name: f.name, bytes: await f.arrayBuffer() });
  $("#pmList").innerHTML = pdfMergeFiles.map((f, i) => "<div>📄 " + (i + 1) + ". " + esc(f.name) + " (" + (f.bytes.byteLength / 1024).toFixed(0) + " KB)</div>").join("");
}
async function gabungPdf() {
  const stat = $("#pmStat");
  if (pdfMergeFiles.length < 2) { stat.textContent = "⚠️ Pilih minimal 2 file PDF."; return; }
  if (!await loadPdfLib()) { stat.textContent = "❌ Library PDF gagal dimuat."; return; }
  stat.textContent = "⏳ Menggabungkan…";
  try {
    const merged = await PDFLib.PDFDocument.create();
    let total = 0;
    for (const f of pdfMergeFiles) {
      const src = await PDFLib.PDFDocument.load(f.bytes.slice(0));
      const pages = await merged.copyPages(src, src.getPageIndices());
      pages.forEach((p) => merged.addPage(p));
      total += src.getPageCount();
    }
    const bytes = await merged.save();
    window._pdfMerged = new Blob([bytes], { type: "application/pdf" });
    window._pdfMergedPages = total;
    stat.textContent = "✅ " + pdfMergeFiles.length + " file → " + total + " halaman (" + (bytes.length / 1024).toFixed(0) + " KB).";
    download("PDF_Tergabung.pdf", window._pdfMerged);
  } catch (e) { stat.textContent = "❌ Gagal: " + e.message + " (pastikan file benar-benar PDF & tidak terproteksi password)."; }
}
async function psLoad(input) {
  const f = input.files && input.files[0]; if (!f) return;
  pdfSplitFile = { name: f.name, bytes: await f.arrayBuffer() };
  if (!await loadPdfLib()) { $("#psInfo").textContent = "❌ Library PDF gagal dimuat."; return; }
  try { const doc = await PDFLib.PDFDocument.load(pdfSplitFile.bytes.slice(0)); pdfSplitFile.pages = doc.getPageCount(); $("#psInfo").textContent = "📄 " + f.name + " — total " + pdfSplitFile.pages + " halaman."; }
  catch (e) { $("#psInfo").textContent = "❌ File tidak bisa dibaca: " + e.message; }
}
async function pisahPdf() {
  const stat = $("#psStat");
  if (!pdfSplitFile || !pdfSplitFile.pages) { stat.textContent = "⚠️ Pilih file PDF dulu."; return; }
  const spec = $("#psRange").value.trim();
  const idx = [];
  try {
    spec.split(",").map((s) => s.trim()).filter(Boolean).forEach((part) => {
      if (part.includes("-")) { const [a, b] = part.split("-").map(Number); for (let p = a; p <= b; p++) idx.push(p - 1); }
      else idx.push(Number(part) - 1);
    });
  } catch (e) {}
  const valid = [...new Set(idx)].filter((i) => i >= 0 && i < pdfSplitFile.pages).sort((a, b) => a - b);
  if (!valid.length) { stat.textContent = "⚠️ Rentang tidak valid untuk PDF " + pdfSplitFile.pages + " halaman."; return; }
  try {
    const src = await PDFLib.PDFDocument.load(pdfSplitFile.bytes.slice(0));
    const out = await PDFLib.PDFDocument.create();
    const pages = await out.copyPages(src, valid);
    pages.forEach((p) => out.addPage(p));
    const bytes = await out.save();
    window._pdfSplit = new Blob([bytes], { type: "application/pdf" });
    window._pdfSplitPages = valid.length;
    stat.textContent = "✅ " + valid.length + " halaman diambil (" + (bytes.length / 1024).toFixed(0) + " KB).";
    download("PDF_Halaman_Terpilih.pdf", window._pdfSplit);
  } catch (e) { stat.textContent = "❌ Gagal: " + e.message; }
}

/* ---------- 44. KOMPRESOR FILE KAMPUS ---------- */
let kompFile = null;
UI.k44 = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Upload Gambar, PDF, atau DOCX", '<input id="kfFile" type="file" accept="image/*,application/pdf,.docx" class="' + IN + '" onchange="kfLoad(this)">')
    + '<p id="kfInfo" class="text-sm font-semibold text-slate-500 mb-3"></p>'
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Kualitas Gambar", '<input id="kfQ" type="range" min="30" max="92" value="68" class="w-full accent-brand-600">', "Lebih rendah = file lebih kecil (untuk foto biasanya 60–75 sudah cukup tajam).")
    + field("Lebar Maksimum (px)", '<select id="kfW" class="' + IN + '"><option value="0">Asli</option><option value="1920">1920</option><option value="1280" selected>1280</option><option value="800">800</option></select>')
    + '</div><button class="' + BTN + '" onclick="kompresFile()">🗜 Kompres Sekarang</button>' + outBox("kfOut") + "</div>";
};
function kfLoad(input) { const f = input.files && input.files[0]; if (!f) return; kompFile = f; $("#kfInfo").textContent = "📁 " + f.name + " — ukuran awal " + (f.size / 1024).toFixed(0) + " KB (" + (f.type || "file") + ")."; }
async function kompresFile() {
  const out = $("#kfOut");
  if (!kompFile) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Upload file dulu ya.</div>'; return; }
  const before = kompFile.size;
  const resultRow = (after, blob, name) => {
    const pct = Math.max(0, Math.round((1 - after / before) * 100));
    window._kompresBlob = blob;
    out.innerHTML = '<div class="' + OUT + '"><div class="grid grid-cols-3 gap-3 text-center mb-3">'
      + '<div class="rounded-lg bg-white dark:bg-slate-900 p-3"><div class="font-extrabold">' + (before / 1024).toFixed(0) + ' KB</div><div class="text-xs text-slate-500">Sebelum</div></div>'
      + '<div class="rounded-lg bg-white dark:bg-slate-900 p-3"><div class="font-extrabold text-emerald-600">' + (after / 1024).toFixed(0) + ' KB</div><div class="text-xs text-slate-500">Sesudah</div></div>'
      + '<div class="rounded-lg bg-white dark:bg-slate-900 p-3"><div class="font-extrabold text-brand-600">' + pct + '%</div><div class="text-xs text-slate-500">Lebih kecil</div></div></div>'
      + '<button class="' + BTN + '" onclick="download(\'' + name + '\', window._kompresBlob)">⬇️ Download Hasil Kompresi</button></div>';
  };
  if (kompFile.type.startsWith("image/")) {
    const img = await fileToImage(kompFile);
    const maxW = Number($("#kfW").value);
    const scale = maxW && img.width > maxW ? maxW / img.width : 1;
    const cv = document.createElement("canvas");
    cv.width = Math.round(img.width * scale); cv.height = Math.round(img.height * scale);
    const ctx = cv.getContext("2d"); ctx.fillStyle = "#FFF"; ctx.fillRect(0, 0, cv.width, cv.height); ctx.drawImage(img, 0, 0, cv.width, cv.height);
    cv.toBlob((b) => resultRow(b.size, b, "Foto_Terkompres.jpg"), "image/jpeg", Number($("#kfQ").value) / 100);
  } else if (kompFile.type === "application/pdf" || kompFile.name.toLowerCase().endsWith(".pdf")) {
    if (!await loadPdfLib()) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">❌ Library PDF gagal dimuat.</div>'; return; }
    try {
      const doc = await PDFLib.PDFDocument.load(await kompFile.arrayBuffer());
      const bytes = await doc.save({ useCompression: true });
      resultRow(bytes.length, new Blob([bytes], { type: "application/pdf" }), "PDF_Terkompres.pdf");
    } catch (e) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">❌ PDF gagal diproses: ' + esc(e.message) + "</div>"; }
  } else if (kompFile.name.toLowerCase().endsWith(".docx")) {
    const okZ = await loadLib("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js", "JSZip");
    if (!okZ) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">❌ Library ZIP gagal dimuat.</div>'; return; }
    try {
      const zip = await JSZip.loadAsync(await kompFile.arrayBuffer());
      const bytes = await zip.generateAsync({ type: "uint8array", compression: "DEFLATE", compressionOptions: { level: 9 } });
      resultRow(bytes.length, new Blob([bytes], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }), "File_Terkompres.docx");
    } catch (e) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">❌ DOCX gagal diproses: ' + esc(e.message) + "</div>"; }
  } else out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Format belum didukung — pakai gambar JPG/PNG atau PDF ya.</div>';
}

/* ---------- 45. WALLPAPER JADWAL KULIAH (KRS) ---------- */
let krsRows = store.get("mt_krs", [
  { hari: "Senin", jam: "08:00–09:40", mk: "Metode Penelitian", ruang: "R. 3.2" },
  { hari: "Senin", jam: "10:00–11:40", mk: "Statistika Terapan", ruang: "Lab Komputer" },
  { hari: "Selasa", jam: "13:00–14:40", mk: "Ekonomi Publik", ruang: "R. 2.5" }
]);
UI.k45 = function (el) {
  el.innerHTML = '<div class="fadein"><div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Nama Kamu", '<input id="krNama" class="' + IN + '" value="' + esc(store.get("mt_kr_nama", "")) + '" placeholder="cth: Detta Pranata">')
    + field("Info Semester", '<input id="krSem" class="' + IN + '" value="Semester 5 • 2026/2027">')
    + field("Hari", '<select id="krHari" class="' + IN + '">' + ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"].map((h) => "<option>" + h + "</option>").join("") + "</select>")
    + field("Jam", '<input id="krJam" class="' + IN + '" placeholder="cth: 08:00–09:40">')
    + field("Mata Kuliah", '<input id="krMk" class="' + IN + '" placeholder="Nama mata kuliah">')
    + field("Ruang / Dosen", '<input id="krRuang" class="' + IN + '" placeholder="cth: R. 3.2">')
    + field("Tema Wallpaper", '<select id="krTema" class="' + IN + '"><option value="biru">💙 Biru Kampus</option><option value="ungu">💜 Ungu Senja</option><option value="hijau">💚 Hijau Toska</option><option value="gelap">🖤 Gelap Elegan</option></select>')
    + '</div><div class="flex flex-wrap gap-2 mb-3"><button class="' + BTN + '" onclick="tambahKrs()">➕ Tambah Matkul</button>'
    + '<button class="' + BTN + '" style="background:#059669" onclick="buatWallpaper()">🖼 Buat Wallpaper HP</button></div>'
    + '<div id="krList" class="space-y-1 mb-3"></div>'
    + '<div class="flex justify-center"><canvas id="krCv" width="540" height="960" class="hidden w-full max-w-[300px] rounded-2xl shadow-lg border border-slate-200"></canvas></div>'
    + outBox("krOut") + "</div>";
  renderKrsList();
};
function tambahKrs() {
  const g = (id) => $("#" + id).value.trim();
  if (!g("krMk")) { toast("Isi nama mata kuliah dulu."); return; }
  krsRows.push({ hari: g("krHari"), jam: g("krJam"), mk: g("krMk"), ruang: g("krRuang") });
  store.set("mt_krs", krsRows); store.set("mt_kr_nama", g("krNama"));
  renderKrsList();
}
function hapusKrs(i) { krsRows.splice(i, 1); store.set("mt_krs", krsRows); renderKrsList(); }
function renderKrsList() {
  const el = $("#krList"); if (!el) return;
  const order = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const sorted = krsRows.map((r, i) => [r, i]).sort((a, b) => order.indexOf(a[0].hari) - order.indexOf(b[0].hari) || a[0].jam.localeCompare(b[0].jam));
  el.innerHTML = sorted.map(([r, i]) => '<div class="flex items-center gap-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800 px-3 py-2"><span class="font-bold w-16">' + esc(r.hari) + '</span><span class="w-24 text-slate-500">' + esc(r.jam) + '</span><span class="flex-1 font-semibold">' + esc(r.mk) + '</span><span class="text-slate-500">' + esc(r.ruang) + '</span><button class="text-rose-500 font-bold" onclick="hapusKrs(' + i + ')">✕</button></div>').join("") || '<p class="text-sm text-slate-500">Belum ada mata kuliah.</p>';
}
function buatWallpaper() {
  const W = 1080, H = 1920;
  const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d");
  const tema = { biru: ["#0B2A6B", "#2F5FE8"], ungu: ["#2E1065", "#7C3AED"], hijau: ["#064E3B", "#0D9488"], gelap: ["#020617", "#334155"] }[$("#krTema").value];
  const grd = ctx.createLinearGradient(0, 0, 0, H); grd.addColorStop(0, tema[0]); grd.addColorStop(1, tema[1]);
  ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.arc(Math.random() * W, Math.random() * H, 90 + Math.random() * 150, 0, 7); ctx.fill(); }
  ctx.textAlign = "center"; ctx.fillStyle = "#FFFFFF";
  ctx.font = "800 64px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("Jadwal Kuliah", W / 2, 170);
  ctx.font = "600 36px sans-serif"; ctx.globalAlpha = 0.85;
  ctx.fillText(($("#krNama").value.trim() || "Mahasiswa") + " • " + $("#krSem").value.trim(), W / 2, 232);
  ctx.globalAlpha = 1;
  const order = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  let y = 320;
  order.forEach((hari) => {
    const rows = krsRows.filter((r) => r.hari === hari).sort((a, b) => a.jam.localeCompare(b.jam));
    if (!rows.length) return;
    ctx.textAlign = "left"; ctx.font = "800 40px sans-serif"; ctx.fillStyle = "#FDE68A";
    ctx.fillText("📅 " + hari, 72, y); y += 22;
    rows.forEach((r) => {
      ctx.fillStyle = "rgba(255,255,255,0.13)"; roundRect(ctx, 72, y, W - 144, 118, 20); ctx.fill();
      ctx.fillStyle = "#FFFFFF"; ctx.font = "700 37px sans-serif";
      ctx.fillText(r.mk.length > 34 ? r.mk.slice(0, 33) + "…" : r.mk, 104, y + 52);
      ctx.font = "500 30px sans-serif"; ctx.globalAlpha = 0.88;
      ctx.fillText("🕒 " + r.jam + (r.ruang ? "   📍 " + r.ruang : ""), 104, y + 96);
      ctx.globalAlpha = 1; y += 140;
    });
    y += 34;
    if (y > H - 220) return;
  });
  ctx.textAlign = "center"; ctx.font = "600 26px sans-serif"; ctx.globalAlpha = 0.75; ctx.fillStyle = "#FFF";
  ctx.fillText("MahasiswaTools • mahasiswatools.web.id", W / 2, H - 60);
  ctx.globalAlpha = 1;
  const prev = $("#krCv"); prev.width = 540; prev.height = 960; prev.classList.remove("hidden");
  prev.getContext("2d").drawImage(cv, 0, 0, 540, 960);
  cv.toBlob((b) => { window._wallpaperPng = b; }, "image/png");
  $("#krOut").innerHTML = '<div class="' + OUT + '"><button class="' + BTN + '" onclick="download(\'Wallpaper_Jadwal_Kuliah.png\', window._wallpaperPng)">⬇️ Download Wallpaper (1080×1920)</button></div>';
}

;

/* ============================================================
   TOOLS 46–49 (Presentasi & Belajar lanjutan)
   ============================================================ */
/* ---------- 46. MIND MAP SKRIPSI ---------- */
let mmData = store.get("mt_mindmap", null) || { pusat: "Skripsiku: Pengaruh Media Sosial", cabang: [
  { nama: "BAB I — Masalah", sub: "Latar belakang, Rumusan masalah, Tujuan" },
  { nama: "BAB II — Teori", sub: "Definisi, Indikator, Penelitian terdahulu" },
  { nama: "BAB III — Metode", sub: "Populasi & sampel, Instrumen, Analisis" },
  { nama: "BAB IV — Hasil", sub: "Uji validitas, Uji hipotesis, Pembahasan" },
  { nama: "BAB V — Penutup", sub: "Kesimpulan, Saran" },
  { nama: "Administrasi", sub: "Bimbingan, Revisi, Sidang" }
] };
UI.k46 = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Topik Pusat", '<input id="mmPusat" class="' + IN + '" value="' + esc(mmData.pusat) + '" oninput="mmData.pusat=this.value">')
    + '<div id="mmList" class="space-y-2 mb-3"></div>'
    + '<div class="flex flex-wrap gap-2 mb-4"><button class="' + BTN2 + '" onclick="tambahCabang()">➕ Tambah Cabang</button>'
    + '<button class="' + BTN + '" onclick="buatMindmap()">🧠 Gambar Mind Map</button></div>'
    + outBox("mmOut") + "</div>";
  renderCabangForm();
  buatMindmap();
};
function renderCabangForm() {
  $("#mmList").innerHTML = mmData.cabang.map((c, i) => '<div class="grid sm:grid-cols-2 gap-2"><input class="' + IN + '" placeholder="Nama cabang" value="' + esc(c.nama) + '" oninput="mmData.cabang[' + i + '].nama=this.value">'
    + '<div class="flex gap-2"><input class="' + IN + '" placeholder="Sub-topik (pisahkan koma)" value="' + esc(c.sub) + '" oninput="mmData.cabang[' + i + '].sub=this.value"><button class="text-rose-500 font-bold px-2" onclick="mmData.cabang.splice(' + i + ',1);renderCabangForm()">✕</button></div></div>').join("");
}
function tambahCabang() { if (mmData.cabang.length >= 8) { toast("Maksimal 8 cabang agar tetap terbaca."); return; } mmData.cabang.push({ nama: "Cabang baru", sub: "" }); renderCabangForm(); }
function buatMindmap() {
  store.set("mt_mindmap", mmData);
  const branches = mmData.cabang.filter((c) => c.nama.trim());
  const W = 1020, H = 640, cx = W / 2, cy = H / 2;
  const colors = ["#2F5FE8", "#7C3AED", "#059669", "#D97706", "#DC2626", "#0EA5E9", "#DB2777", "#65A30D"];
  let svg = '<svg id="mmSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + " " + H + '" class="w-full bg-white rounded-xl border border-slate-200">';
  branches.forEach((b, i) => {
    const ang = (2 * Math.PI * i) / branches.length - Math.PI / 2;
    const bx = cx + Math.cos(ang) * 350, by = cy + Math.sin(ang) * 215;
    const mx = cx + Math.cos(ang) * 175, my = cy + Math.sin(ang) * 108;
    svg += '<path d="M' + cx + "," + cy + " Q" + mx + "," + my + " " + bx + "," + by + '" fill="none" stroke="' + colors[i % colors.length] + '" stroke-width="3.5"/>';
  });
  branches.forEach((b, i) => {
    const ang = (2 * Math.PI * i) / branches.length - Math.PI / 2;
    const bx = cx + Math.cos(ang) * 350, by = cy + Math.sin(ang) * 215;
    const subs = b.sub.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 5);
    const bw = 216, bh = 44 + subs.length * 19;
    svg += '<rect x="' + (bx - bw / 2) + '" y="' + (by - bh / 2) + '" width="' + bw + '" height="' + bh + '" rx="13" fill="#FFF" stroke="' + colors[i % colors.length] + '" stroke-width="2.4"/>';
    svg += '<text x="' + bx + '" y="' + (by - bh / 2 + 27) + '" text-anchor="middle" font-family="sans-serif" font-size="14.5" font-weight="800" fill="' + colors[i % colors.length] + '">' + xe(b.nama) + "</text>";
    subs.forEach((s, si) => { svg += '<text x="' + bx + '" y="' + (by - bh / 2 + 52 + si * 19) + '" text-anchor="middle" font-family="sans-serif" font-size="12.5" fill="#334155">• ' + xe(s) + "</text>"; });
  });
  svg += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="128" ry="58" fill="#122B78"/>';
  const pusat = mmData.pusat.length > 42 ? mmData.pusat.slice(0, 41) + "…" : mmData.pusat;
  svg += '<text x="' + cx + '" y="' + (cy + 6) + '" text-anchor="middle" font-family="sans-serif" font-size="15.5" font-weight="800" fill="#FFFFFF">' + xe(pusat) + "</text>";
  svg += '<text x="' + (W / 2) + '" y="' + (H - 10) + '" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#94A3B8">MahasiswaTools \u2022 mahasiswatools.web.id</text>';
  svg += "</svg>";
  window._mmOutline = mmData.pusat + "\n" + branches.map((b) => "├─ " + b.nama + (b.sub ? "\n│   " + b.sub.split(",").map((s) => "• " + s.trim()).join("\n│   ") : "")).join("\n");
  $("#mmOut").innerHTML = '<div class="' + OUT + '">' + svg
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="unduhSvgPng(\'mmSvg\', \'MindMap_Skripsi.png\')">⬇️ Download Mind Map (PNG)</button>'
    + '<button class="' + BTN2 + '" onclick="copyText(window._mmOutline)">📋 Copy Outline Teks</button></div></div>';
}

/* ---------- 47. KUIS INTERAKTIF & FLASHCARD ---------- */
let fcCards = store.get("mt_flash", []), fcIdx = 0, fcFlip = false;
let quiz = null;
UI.k47 = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Daftar Soal & Jawaban", '<textarea id="fcIn" rows="7" class="' + IN + '" placeholder="Satu soal per baris, format: Soal | Jawaban&#10;Contoh:&#10;Ibu kota Indonesia? | Jakarta&#10;Rumus luas lingkaran? | π × r²">Ibu kota Indonesia? | Jakarta&#10;Tahun kemerdekaan Indonesia? | 1945&#10;Rumus luas lingkaran? | π × r²&#10;Lambang unsur emas? | Au&#10;Penulis novel Laskar Pelangi? | Andrea Hirata</textarea>')
    + '<div class="flex flex-wrap gap-2 mb-4"><button class="' + BTN + '" onclick="muatKartu()">🃏 Mode Flashcard</button>'
    + '<button class="' + BTN + '" style="background:#059669" onclick="mulaiKuis()">🎯 Mode Kuis Pilihan Ganda</button></div>'
    + outBox("fcOut") + "</div>";
};
function parseKartu() {
  const lines = $("#fcIn").value.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const cards = [];
  lines.forEach((l) => { const parts = l.split("|"); if (parts.length >= 2) cards.push({ q: parts[0].trim(), a: parts.slice(1).join("|").trim() }); });
  return cards;
}
function muatKartu() {
  fcCards = parseKartu();
  if (fcCards.length < 1) { $("#fcOut").innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Tidak ada soal terbaca — pakai format "Soal | Jawaban" per baris.</div>'; return; }
  store.set("mt_flash", fcCards); fcIdx = 0; fcFlip = false; quiz = null;
  renderKartu();
}
function renderKartu() {
  const c = fcCards[fcIdx];
  $("#fcOut").innerHTML = '<div class="' + OUT + '"><div class="flex items-center justify-between mb-3"><span class="font-bold text-sm">Kartu ' + (fcIdx + 1) + " / " + fcCards.length + '</span><span class="text-xs text-slate-500">Klik kartu untuk membalik 🔄</span></div>'
    + '<button onclick="fcFlip=!fcFlip;renderKartu()" class="w-full rounded-2xl p-8 min-h-[170px] text-center shadow-inner ' + (fcFlip ? "bg-emerald-600 text-white" : "bg-white dark:bg-slate-900 border-2 border-brand-200 dark:border-brand-800") + '">'
    + '<div class="text-[11px] font-bold uppercase tracking-widest opacity-70 mb-2">' + (fcFlip ? "Jawaban" : "Pertanyaan") + '</div>'
    + '<div class="text-xl font-extrabold leading-snug">' + esc(fcFlip ? c.a : c.q) + "</div></button>"
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN2 + '" onclick="fcIdx=(fcIdx-1+' + fcCards.length + ")%" + fcCards.length + ';fcFlip=false;renderKartu()">⬅️ Sebelumnya</button>'
    + '<button class="' + BTN2 + '" onclick="fcAcak()">🔀 Acak Urutan</button>'
    + '<button class="' + BTN + '" onclick="fcIdx=(fcIdx+1)%' + fcCards.length + ';fcFlip=false;renderKartu()">Berikutnya ➡️</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Flashcard.txt\', fcCards.map((c,i)=>\'Soal \'+(i+1)+\': \'+c.q+\'\\nJawab: \'+c.a).join(\'\\n\\n\'))">⬇️ Download Daftar</button></div></div>';
}
function fcAcak() { for (let i = fcCards.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [fcCards[i], fcCards[j]] = [fcCards[j], fcCards[i]]; } fcIdx = 0; fcFlip = false; renderKartu(); }
function mulaiKuis() {
  fcCards = parseKartu();
  if (fcCards.length < 4) { $("#fcOut").innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Mode kuis butuh minimal 4 soal agar ada 3 pengecoh. Tambahkan soal dulu ya.</div>'; return; }
  store.set("mt_flash", fcCards);
  const order = fcCards.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  quiz = { order, idx: 0, score: 0, answered: false };
  renderKuis();
}
function renderKuis() {
  const total = quiz.order.length;
  if (quiz.idx >= total) {
    const pct = Math.round(quiz.score / total * 100);
    window._quizResult = { score: quiz.score, total, pct };
    $("#fcOut").innerHTML = '<div class="' + OUT + ' text-center"><div class="text-5xl mb-2">' + (pct >= 80 ? "🏆" : pct >= 60 ? "🎉" : "💪") + '</div>'
      + '<p class="text-xl font-extrabold">Skor Akhir: ' + quiz.score + " / " + total + " (" + pct + '%)</p>'
      + '<p class="text-sm text-slate-500 mt-1 mb-4">' + (pct >= 80 ? "Luar biasa — materi sudah menempel!" : pct >= 60 ? "Bagus! Sedikit lagi sampai tuntas." : "Tidak apa-apa — balik ke flashcard, putar lagi, pasti naik.") + "</p>"
      + '<div class="flex flex-wrap gap-2 justify-center"><button class="' + BTN + '" onclick="mulaiKuis()">🔄 Ulangi Kuis</button>'
      + '<button class="' + BTN2 + '" onclick="muatKartu()">🃏 Ke Flashcard</button></div></div>';
    return;
  }
  const card = fcCards[quiz.order[quiz.idx]];
  if (!quiz.opts) {
    const others = fcCards.filter((_, i) => i !== quiz.order[quiz.idx]).map((c) => c.a);
    for (let i = others.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [others[i], others[j]] = [others[j], others[i]]; }
    quiz.opts = [card.a, ...others.slice(0, 3)];
    for (let i = quiz.opts.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [quiz.opts[i], quiz.opts[j]] = [quiz.opts[j], quiz.opts[i]]; }
  }
  $("#fcOut").innerHTML = '<div class="' + OUT + '"><div class="flex items-center justify-between mb-3"><span class="font-bold text-sm">Soal ' + (quiz.idx + 1) + " / " + total + '</span><span class="rounded-lg bg-white dark:bg-slate-900 px-2.5 py-1 text-sm font-bold">Skor: ' + quiz.score + "</span></div>"
    + '<p class="text-lg font-extrabold mb-4">' + esc(card.q) + "</p>"
    + '<div class="grid gap-2">' + quiz.opts.map((o, i) => '<button id="qopt' + i + '" class="text-left rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 font-semibold hover:border-brand-400 transition" onclick="jawabKuis(' + i + ')">' + "ABCD"[i] + ". " + esc(o) + "</button>").join("") + "</div>"
    + '<div id="qFeed" class="mt-4"></div></div>';
}
function jawabKuis(i) {
  if (quiz.answered) return;
  quiz.answered = true;
  const card = fcCards[quiz.order[quiz.idx]];
  const benar = quiz.opts[i] === card.a;
  if (benar) quiz.score++;
  quiz.opts.forEach((o, j) => {
    const b = $("#qopt" + j); if (!b) return;
    b.disabled = true;
    if (o === card.a) b.className = b.className.replace("border-slate-200 dark:border-slate-700", "border-emerald-500") + " bg-emerald-50 dark:bg-emerald-900/30";
    else if (j === i) b.className = b.className.replace("border-slate-200 dark:border-slate-700", "border-rose-500") + " bg-rose-50 dark:bg-rose-900/30";
  });
  $("#qFeed").innerHTML = '<div class="rounded-xl p-3.5 font-semibold ' + (benar ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200" : "bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200") + '">'
    + (benar ? "✅ Betul! Kerja bagus." : "❌ Belum tepat — jawaban benar: <b>" + esc(card.a) + "</b>") + "</div>"
    + '<button class="' + BTN + ' mt-3" onclick="quiz.idx++;quiz.answered=false;quiz.opts=null;renderKuis()">' + (quiz.idx + 1 >= quiz.order.length ? "🏁 Lihat Hasil" : "Soal Berikutnya ➡️") + "</button>";
}

/* ---------- 48. CORNELL NOTES ---------- */
let cornellNotes = store.get("mt_cornell", []);
UI.k48 = function (el) {
  el.innerHTML = '<div class="fadein"><div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Judul / Topik", '<input id="cnJud" class="' + IN + '" placeholder="cth: Bab 3 — Metode Penelitian Kuantitatif">')
    + field("Tanggal", '<input id="cnTgl" type="date" class="' + IN + '" value="' + new Date().toISOString().slice(0, 10) + '">')
    + '</div><div class="grid sm:grid-cols-[1fr_2fr] gap-x-4">'
    + field("Kolom Isyarat (kata kunci & pertanyaan pemicu)", '<textarea id="cnCue" rows="8" class="' + IN + '" placeholder="Satu isyarat per baris:&#10;Apa itu populasi?&#10;Syarat sampel baik&#10;Rumus Slovin"></textarea>')
    + field("Kolom Catatan Utama", '<textarea id="cnNote" rows="8" class="' + IN + '" placeholder="Catatan inti dari buku/kuliah — sejajarkan dengan isyarat di kiri."></textarea>')
    + '</div>'
    + field("Ringkasan (tulis dengan kata-katamu sendiri)", '<textarea id="cnSum" rows="3" class="' + IN + '" placeholder="Satu-dua kalimat simpulan seluruh catatan ini."></textarea>')
    + '<div class="flex flex-wrap gap-2 mb-4"><button class="' + BTN + '" onclick="simpanCornell()">💾 Simpan Catatan</button>'
    + '<button class="' + BTN2 + '" onclick="eksporCornell()">⬇️ Download .doc</button>'
    + '<button class="' + BTN2 + '" onclick="pratinjauCornell()">👁 Pratinjau Tata Letak</button></div>'
    + '<div id="cnList" class="space-y-2 mb-3"></div>'
    + outBox("cnOut") + "</div>";
  renderCornellList();
};
function cornellDoc(n) {
  const cues = n.cue.split(/\n/).map((s) => s.trim()).filter(Boolean).map((c) => "<p>• " + esc(c) + "</p>").join("");
  const notes = n.note.split(/\n/).map((s) => s.trim()).filter(Boolean).map((c) => "<p>" + esc(c) + "</p>").join("");
  return "<html><body style='font-family:serif'><h3>" + esc(n.judul) + "</h3><p>Tanggal: " + esc(n.tgl) + "</p>"
    + "<table border='1' cellspacing='0' cellpadding='8' style='border-collapse:collapse;width:100%'><tr><th style='width:30%'>Isyarat / Pertanyaan</th><th>Catatan</th></tr><tr><td valign='top'>" + cues + "</td><td valign='top'>" + notes + "</td></tr>"
    + "<tr><td colspan='2'><b>Ringkasan:</b> " + esc(n.sum) + "</td></tr></table>"
    + "<p style='font-size:9pt;color:#666'>Metode Cornell — dibuat dengan MahasiswaTools</p></body></html>";
}
function ambilCornellForm() { const g = (id) => $("#" + id).value.trim(); return { judul: g("cnJud") || "Catatan Tanpa Judul", tgl: g("cnTgl"), cue: $("#cnCue").value, note: $("#cnNote").value, sum: g("cnSum") }; }
function simpanCornell() {
  const n = ambilCornellForm();
  cornellNotes.unshift(n); store.set("mt_cornell", cornellNotes);
  renderCornellList(); toast("Catatan Cornell tersimpan 📓");
}
function renderCornellList() {
  const el = $("#cnList"); if (!el) return;
  el.innerHTML = cornellNotes.length ? '<p class="text-xs font-bold text-slate-500 mb-1">CATATAN TERSIMPAN:</p>' + cornellNotes.map((n, i) => '<div class="flex items-center gap-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800 px-3 py-2"><span class="flex-1 font-semibold truncate">📓 ' + esc(n.judul) + '</span><span class="text-xs text-slate-500">' + esc(n.tgl) + '</span><button class="font-bold text-brand-600" onclick="bukaCornell(' + i + ')">Buka</button><button class="text-rose-500 font-bold" onclick="cornellNotes.splice(' + i + ',1);store.set(\'mt_cornell\',cornellNotes);renderCornellList()">✕</button></div>').join("") : "";
}
function bukaCornell(i) { const n = cornellNotes[i]; $("#cnJud").value = n.judul; $("#cnTgl").value = n.tgl; $("#cnCue").value = n.cue; $("#cnNote").value = n.note; $("#cnSum").value = n.sum; pratinjauCornell(); }
function eksporCornell() { const n = ambilCornellForm(); window._cornellDocStr = cornellDoc(n); download("Cornell_Notes.doc", window._cornellDocStr, "application/msword"); }
function pratinjauCornell() {
  const n = ambilCornellForm();
  const cues = n.cue.split(/\n/).filter((s) => s.trim()).map((c) => '<p class="font-semibold text-brand-700 dark:text-brand-300 mb-2">• ' + esc(c) + "</p>").join("");
  const notes = n.note.split(/\n/).filter((s) => s.trim()).map((c) => '<p class="mb-2 leading-relaxed">' + esc(c) + "</p>").join("");
  $("#cnOut").innerHTML = '<div class="' + OUT + '"><div class="bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden">'
    + '<div class="px-4 py-3 border-b border-slate-300 dark:border-slate-600 flex justify-between"><b>' + esc(n.judul) + '</b><span class="text-sm text-slate-500">' + esc(n.tgl) + "</span></div>"
    + '<div class="grid grid-cols-[1fr_2fr]"><div class="p-4 border-r border-slate-300 dark:border-slate-600 bg-brand-50/50 dark:bg-brand-900/10">' + (cues || '<p class="text-slate-400 text-sm">Kolom isyarat…</p>') + '</div><div class="p-4">' + (notes || '<p class="text-slate-400 text-sm">Kolom catatan…</p>') + "</div></div>"
    + '<div class="px-4 py-3 border-t-2 border-slate-400 dark:border-slate-500 bg-amber-50 dark:bg-amber-900/20"><b>Ringkasan:</b> ' + esc(n.sum) + "</div></div></div>";
}

/* ---------- 49. POMODORO + SUARA FOKUS (WEB AUDIO) ---------- */
let pomo = { remain: 25 * 60, total: 25 * 60, run: false, timer: null, endAt: 0, mode: "Fokus", sessions: store.get("mt_pomo_sessions", 0), actx: null, noiseSrc: null, noiseGain: null, noiseType: "" };
UI.k49 = function (el) {
  el.innerHTML = '<div class="fadein"><div class="flex flex-wrap gap-2 justify-center mb-4">'
    + [["Fokus", 25], ["Istirahat", 5], ["Istirahat Panjang", 15]].map(([m, mn]) => '<button class="rounded-full px-4 py-2 text-sm font-bold bg-slate-100 dark:bg-slate-800 hover:bg-brand-100 dark:hover:bg-brand-900 transition" onclick="setPomo(\'' + m + "'," + mn + ')">' + m + " " + mn + " mnt</button>").join("")
    + '<span class="inline-flex items-center gap-2 text-sm font-bold">Kustom: <input id="pmMin" type="number" min="1" max="180" value="25" class="w-20 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-2 py-1.5"> mnt <button class="rounded-full px-3 py-1.5 bg-slate-100 dark:bg-slate-800 font-bold" onclick="setPomo(\'Kustom\', Number(document.getElementById(\'pmMin\').value)||25)">Set</button></span></div>'
    + '<div class="flex justify-center my-2"><div class="relative w-[240px] h-[240px]">'
    + '<svg viewBox="0 0 240 240" class="w-full h-full -rotate-90"><circle cx="120" cy="120" r="106" fill="none" stroke="#E2E8F0" stroke-width="13"/><circle id="pmRing" cx="120" cy="120" r="106" fill="none" stroke="#2F5FE8" stroke-width="13" stroke-linecap="round" stroke-dasharray="666" stroke-dashoffset="0"/></svg>'
    + '<div class="absolute inset-0 flex flex-col items-center justify-center"><div id="pmClock" class="text-5xl font-extrabold tabular-nums">25:00</div><div id="pmMode" class="text-sm font-bold text-slate-500 mt-1">Mode Fokus</div></div></div></div>'
    + '<div class="flex flex-wrap gap-2 justify-center mb-5"><button id="pmBtn" class="' + BTN + '" onclick="togglePomo()">▶️ Mulai Fokus</button>'
    + '<button class="' + BTN2 + '" onclick="resetPomo()">↺ Reset</button>'
    + '<span class="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2 text-sm font-bold">🏆 Sesi fokus selesai: <span id="pmSess">' + pomo.sessions + "</span></span></div>"
    + '<div class="rounded-2xl border border-slate-200 dark:border-slate-700 p-4"><h4 class="font-extrabold mb-2">🎧 Suara Latar (dibuat langsung oleh Web Audio API — tanpa file)</h4>'
    + '<div class="flex flex-wrap gap-2 mb-3">' + [["white", "🌫 White Noise"], ["rain", "🌧 Hujan (low-pass)"], ["brown", "☕ Kafe (brown noise)"]].map(([t, l]) => '<button class="rounded-full px-4 py-2 text-sm font-bold bg-slate-100 dark:bg-slate-800 hover:bg-brand-100 dark:hover:bg-brand-900 transition" onclick="putarNoise(\'' + t + "')\">" + l + "</button>").join("")
    + '<button class="rounded-full px-4 py-2 text-sm font-bold bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-200" onclick="stopNoise()">⏹ Matikan Suara</button></div>'
    + '<label class="text-sm font-semibold flex items-center gap-3">Volume <input id="pmVol" type="range" min="0" max="100" value="40" class="flex-1 accent-brand-600" oninput="aturVolumeNoise()"></label>'
    + '<p id="pmNoiseStat" class="text-xs text-slate-500 mt-2">Suara mati. White/brown noise dibangkitkan dari buffer acak; hujan = white noise + filter low-pass 750 Hz.</p></div></div>';
  gambarPomo();
};
function gambarPomo() {
  const c = $("#pmClock"); if (!c) return;
  const s = Math.max(0, pomo.remain);
  c.textContent = String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
  const ring = $("#pmRing"); if (ring) ring.style.strokeDashoffset = String(666 * (1 - (pomo.total ? s / pomo.total : 0)));
  const m = $("#pmMode"); if (m) m.textContent = "Mode " + pomo.mode;
  const b = $("#pmBtn"); if (b) b.textContent = pomo.run ? "⏸ Jeda" : "▶️ Mulai Fokus";
}
function setPomo(mode, menit) { stopPomoTimer(); pomo.mode = mode; pomo.total = pomo.remain = Math.max(1, menit) * 60; gambarPomo(); }
function stopPomoTimer() { if (pomo.timer) clearInterval(pomo.timer); pomo.timer = null; pomo.run = false; }
function togglePomo() {
  if (pomo.run) { stopPomoTimer(); gambarPomo(); return; }
  pomo.run = true; pomo.endAt = Date.now() + pomo.remain * 1000;
  pomo.timer = setInterval(() => {
    pomo.remain = Math.max(0, Math.round((pomo.endAt - Date.now()) / 1000));
    gambarPomo();
    if (pomo.remain <= 0) { stopPomoTimer(); gambarPomo(); pomoSelesai(); }
  }, 250);
  gambarPomo();
}
function resetPomo() { stopPomoTimer(); pomo.remain = pomo.total; gambarPomo(); }
function pomoSelesai() {
  bunyiAlarm();
  if (pomo.mode === "Fokus" || pomo.mode === "Kustom") {
    pomo.sessions++; store.set("mt_pomo_sessions", pomo.sessions);
    const s = $("#pmSess"); if (s) s.textContent = pomo.sessions;
    toast("🎉 Sesi fokus selesai! Istirahat dulu ya.");
  } else toast("⏰ Istirahat selesai — siap gas lagi!");
  pomo.remain = pomo.total;
}
function bunyiAlarm() {
  try {
    const ctx = pomo.actx || new (window.AudioContext || window.webkitAudioContext)();
    pomo.actx = ctx;
    [0, 0.35, 0.7].forEach((off) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine"; o.frequency.value = 880;
      g.gain.setValueAtTime(0.0001, ctx.currentTime + off);
      g.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + off + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + off + 0.28);
      o.connect(g); g.connect(ctx.destination);
      o.start(ctx.currentTime + off); o.stop(ctx.currentTime + off + 0.3);
    });
  } catch (e) {}
}
function buatNoiseBuffer(ctx, type) {
  const len = ctx.sampleRate * 2, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    if (type === "brown") { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.2; }
    else d[i] = w;
  }
  return buf;
}
function putarNoise(type) {
  stopNoise(true);
  try {
    if (!pomo.actx) pomo.actx = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = pomo.actx;
    if (ctx.state === "suspended") ctx.resume();
    const src = ctx.createBufferSource();
    src.buffer = buatNoiseBuffer(ctx, type === "brown" ? "brown" : "white");
    src.loop = true;
    const gain = ctx.createGain(); gain.gain.value = (Number($("#pmVol") ? $("#pmVol").value : 40) / 100) * 0.5;
    let node = src;
    if (type === "rain") { const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 750; src.connect(f); node = f; }
    node.connect(gain); gain.connect(ctx.destination);
    src.start();
    pomo.noiseSrc = src; pomo.noiseGain = gain; pomo.noiseType = type;
    const st = $("#pmNoiseStat"); if (st) st.textContent = "🔊 Sedang memutar: " + type + " noise (dibangkitkan real-time oleh Web Audio API).";
  } catch (e) { toast("Audio tidak tersedia di browser ini."); }
}
function aturVolumeNoise() { if (pomo.noiseGain && pomo.actx) pomo.noiseGain.gain.setTargetAtTime((Number($("#pmVol").value) / 100) * 0.5, pomo.actx.currentTime, 0.05); }
function stopNoise(senyap) {
  if (pomo.noiseSrc) { try { pomo.noiseSrc.stop(); } catch (e) {} pomo.noiseSrc = null; pomo.noiseType = ""; }
  if (!senyap) { const st = $("#pmNoiseStat"); if (st) st.textContent = "Suara mati."; }
}
const _prevStop2 = window._teleStop;
window._teleStop = function () { if (_prevStop2) _prevStop2(); if (typeof stopPomoTimer === "function") stopPomoTimer(); if (typeof stopNoise === "function") stopNoise(true); };

;

/* ============================================================
   TOOLS 50–52 (Karier & Akademik)
   ============================================================ */
/* ---------- 50. MOTIVATION LETTER & SURAT LAMARAN ---------- */
UI.k50 = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Jenis Surat", '<select id="mlJenis" class="' + IN + '" onchange="mlToggle()"><option value="beasiswa">🎓 Motivation Letter — Beasiswa (Bahasa Inggris)</option><option value="lamaran">💼 Surat Lamaran Kerja</option><option value="magang">🧑‍🎓 Surat Pengantar Magang</option><option value="penelitian">🔬 Surat Permohonan Izin Penelitian</option><option value="ukt">💸 Surat Permohonan Keringanan UKT</option><option value="cuti">⏸️ Surat Permohonan Cuti Akademik</option><option value="beasiswasurat">🏅 Surat Permohonan Beasiswa</option><option value="sponsor">🤝 Surat Permohonan Sponsorship</option><option value="undangan">✉️ Surat Undangan Resmi</option><option value="pinjam">🏛️ Surat Peminjaman Ruangan / Alat</option><option value="narasumber">🎤 Surat Permohonan Narasumber</option><option value="rekomendasi">⭐ Surat Rekomendasi Dosen</option><option value="pernyataan">📜 Surat Pernyataan Bermaterai</option><option value="kuasa">✍️ Surat Kuasa</option><option value="resign">🚪 Surat Pengunduran Diri</option></select>')
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Nama Lengkap", '<input id="mlNama" class="' + IN + '" placeholder="Nama kamu">')
    + field("Kota & Tanggal", '<input id="mlKota" class="' + IN + '" value="Palembang, ' + new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) + '">')
    + field("Tujuan (Program/Posisi)", '<input id="mlTujuan" class="' + IN + '" placeholder="cth: Beasiswa Unggulan 2026 / Staff Administrasi">')
    + field("Institusi Tujuan", '<input id="mlInst" class="' + IN + '" placeholder="cth: Kemendikbudristek / PT Maju Bersama">')
    + field("Latar Belakang Singkatmu", '<textarea id="mlLatar" rows="3" class="' + IN + '" placeholder="Jurusan, universitas, IPK/prestasi relevan — 2-3 kalimat"></textarea>')
    + field("Alasan Memilih Program/Posisi Ini", '<textarea id="mlAlasan" rows="3" class="' + IN + '" placeholder="Kenapa program ini, kenapa kamu — hubungkan dengan tujuan masa depanmu"></textarea>')
    + field("Keahlian & Pengalaman Andalan", '<textarea id="mlSkill" rows="3" class="' + IN + '" placeholder="Pengalaman organisasi/magang/proyek + keahlian yang paling relevan"></textarea>')
    + field("Kontak (email • telepon • LinkedIn)", '<input id="mlKontak" class="' + IN + '" placeholder="cth: nama@email.com • 08xx • linkedin.com/in/nama">')
    + '</div><div class="grid sm:grid-cols-2 gap-x-4">' + field("NIM / NPM", '<input id="mlNim" class="' + IN + '" placeholder="NIM kamu (untuk surat kampus)">') + field("Program Studi / Organisasi", '<input id="mlProdi" class="' + IN + '" placeholder="cth: Pendidikan Ekonomi / HIMA Ekonomi">') + field("Judul Penelitian / Nama Kegiatan / Tema", '<input id="mlJudul" class="' + IN + '" placeholder="Sesuai jenis surat yang dipilih">') + field("Waktu / Periode / Tanggal Efektif", '<input id="mlWaktu" class="' + IN + '" placeholder="cth: 10–20 November 2026 / Semester Ganjil 2026/2027">') + field("Tempat / Lokasi", '<input id="mlTempat" class="' + IN + '" placeholder="cth: SMA Negeri 1 Lahat / Aula Kampus">') + '</div><p id="mlHint" class="rounded-lg bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800 p-3 text-[13px] mb-4"></p>' + '<button class="' + BTN + '" onclick="buatMotlet()">✉️ Generate Surat</button>' + outBox("mlOut") + "</div>";
};
function mlToggle() { toast("Jenis surat: " + $("#mlJenis").selectedOptions[0].textContent); }
function buatMotlet() {
  const g = (id) => $("#" + id).value.trim();
  const jenis = $("#mlJenis").value, nama = g("mlNama") || "Nama Kamu", kota = g("mlKota"), tujuan = g("mlTujuan") || "(tujuan)", inst = g("mlInst") || "(institusi)", latar = g("mlLatar"), alasan = g("mlAlasan"), skill = g("mlSkill"), kontak = g("mlKontak");
  let surat = "";
  if (jenis === "beasiswa") {
    surat = kota.replace(/,.*/, "") + ", " + new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) + "\n\nDear " + inst + " Scholarship Committee,\n\n"
      + "I am writing to express my strong interest in applying for the " + tujuan + ". " + (latar || "I am an undergraduate student with a deep commitment to academic excellence and community contribution.") + "\n\n"
      + (alasan || "I believe this program aligns strongly with my academic goals and future aspirations.") + " Through this opportunity, I hope to deepen my expertise, broaden my perspective, and return that knowledge to benefit my community and country.\n\n"
      + (skill || "Throughout my studies, I have developed relevant skills and experiences that have prepared me well for this program.") + " These experiences have strengthened my discipline, leadership, and resilience — qualities I will carry throughout the program.\n\n"
      + "I would be honoured to be considered for this opportunity. Thank you very much for your time and consideration. I look forward to the possibility of contributing to and learning from this program.\n\nSincerely,\n\n\n" + nama + (kontak ? "\n" + kontak : "");
  } else if (jenis === "lamaran") {
    surat = kota + "\n\nKepada Yth.\nHRD / Pimpinan " + inst + "\ndi tempat\n\nPerihal: Lamaran Pekerjaan — " + tujuan + "\n\nDengan hormat,\n\n"
      + "Berdasarkan informasi lowongan yang saya peroleh, saya bermaksud melamar posisi " + tujuan + " di " + inst + ". " + (latar || "Saya adalah lulusan yang memiliki semangat belajar tinggi dan siap berkontribusi.") + "\n\n"
      + (skill || "Selama ini saya telah mengembangkan keahlian dan pengalaman yang relevan dengan posisi tersebut.") + " Saya terbiasa bekerja dengan target, teliti, dan mampu bekerja sama dalam tim.\n\n"
      + (alasan || "Saya tertarik bergabung dengan " + inst + " karena reputasi dan nilai-nilai perusahaan yang sejalan dengan tujuan karier saya.") + " Besar harapan saya untuk dapat mengikuti proses seleksi lebih lanjut. Terima kasih atas perhatian dan kesempatan yang diberikan.\n\nHormat saya,\n\n\n" + nama + (kontak ? "\n" + kontak : "");
  } else {
    surat = kota + "\n\nKepada Yth.\nPimpinan " + inst + "\ndi tempat\n\nPerihal: Permohonan Magang / Praktik Kerja Lapangan\n\nDengan hormat,\n\n"
      + "Saya yang bertanda tangan di bawah ini, " + nama + ", bermaksud mengajukan permohonan magang pada posisi/bidang " + tujuan + " di " + inst + ". " + (latar || "Saya merupakan mahasiswa aktif yang ingin menerapkan ilmu perkuliahan ke dalam praktik kerja nyata.") + "\n\n"
      + (skill || "Saya memiliki keahlian dasar yang relevan dan kemauan belajar yang tinggi.") + " " + (alasan || "Saya memilih " + inst + " karena lingkungan kerja dan bidangnya sesuai dengan kompetensi yang ingin saya kembangkan.") + "\n\nDemikian surat permohonan ini saya sampaikan. Besar harapan saya untuk dapat diterima dan belajar di " + inst + ". Atas perhatian Bapak/Ibu, saya ucapkan terima kasih.\n\nHormat saya,\n\n\n" + nama + (kontak ? "\n" + kontak : "");
  }
  window._motlet = surat;
  $("#mlOut").innerHTML = '<div class="' + OUT + '"><div class="bg-white dark:bg-slate-900 rounded-lg p-5 border border-slate-200 dark:border-slate-700 whitespace-pre-wrap leading-relaxed text-[15px]" style="font-family:Georgia,serif">' + esc(surat) + "</div>"
    + '<p class="text-xs text-slate-500 mt-2">Kerangka surat profesional — sesuaikan kalimat berisi pengalamanmu agar terasa personal, jangan kirim mentah-mentah.</p>'
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="' + BTN + '" onclick="copyText(window._motlet)">📋 Copy Surat</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Surat.doc\', \'<html><body style=&quot;font-family:serif;font-size:12pt;white-space:pre-wrap&quot;>\' + esc(window._motlet) + \'</body></html>\', \'application/msword\')">⬇️ Download .doc</button></div></div>';
}

const ML_HINT = {
  penelitian: "🔬 Izin Penelitian — isi: Institusi Tujuan (pimpinan lokasi penelitian), Judul Penelitian, Waktu, Tempat. Latar/Alasan boleh diisi data pendukung yang diminta.",
  ukt: "💸 Keringanan UKT — isi: Tujuan = semester (cth: Semester 5), Institusi Tujuan = kampusmu, Latar Belakang = kondisi ekonomi keluarga, Alasan = bentuk keringanan yang dimohon (cicilan/penundaan/pengurangan).",
  cuti: "⏸️ Cuti Akademik — isi: Tujuan = semester cuti (cth: Semester Ganjil 2026/2027), Waktu = lama cuti (cth: 1 semester), Alasan = alasan pengajuan cuti.",
  beasiswasurat: "🏅 Permohonan Beasiswa — isi: Tujuan = nama program beasiswa, Institusi Tujuan = pemberi beasiswa, Latar = prestasi/IPK, Keahlian = pendukung keunggulanmu.",
  sponsor: "🤝 Sponsorship — isi: Institusi Tujuan = perusahaan, Judul = nama kegiatan, Waktu & Tempat acara, Keahlian & Pengalaman = paket sponsor dan benefit bagi perusahaan.",
  undangan: "✉️ Undangan Resmi — isi: Tujuan = nama & jabatan tamu yang diundang, Institusi Tujuan = instansi tamu, Judul = nama acara, Waktu & Tempat acara, Kontak = narahubung konfirmasi.",
  pinjam: "🏛️ Peminjaman — isi: Judul = ruangan/alat yang dipinjam (cth: Aula Kampus & Sound System), Waktu = jadwal pinjam, Latar = untuk kegiatan apa, Institusi Tujuan = kampus/pengelola gedung.",
  narasumber: "🎤 Narasumber — isi: Tujuan = nama narasumber, Institusi Tujuan = instansi narasumber, Judul = nama acara, Keahlian = tema/materi yang diharapkan, Waktu & Tempat acara.",
  rekomendasi: "⭐ Rekomendasi — surat ini ditulis dari sudut pandang DOSEN: Tujuan = nama dosen pemberi rekomendasi, Nama Lengkap = namamu, Latar = prestasimu menurut dosen, Institusi Tujuan = program/instansi yang dituju.",
  pernyataan: "📜 Pernyataan Bermaterai — isi: Alasan Memilih = isi pernyataanmu (satu poin per baris). Akan ditutup komitmen bersedia menerima sanksi bila tidak benar.",
  kuasa: "✍️ Surat Kuasa — isi: Nama Lengkap = pemberi kuasa, Tujuan = nama penerima kuasa, Alasan = keperluan kuasa (cth: mengambil ijazah & transkrip), Institusi Tujuan = tempat pengurusan.",
  resign: "🚪 Pengunduran Diri — isi: Tujuan = jabatanmu, Institusi Tujuan = organisasi, Waktu = tanggal efektif, Alasan = alasan pengunduran diri (opsional)."
};
(function () {
  const _mt = mlToggle;
  mlToggle = function () {
    _mt();
    const h = $("#mlHint");
    if (h) h.innerHTML = ML_HINT[$("#mlJenis").value] || "Pilih jenis surat — field yang dipakai menyesuaikan. Surat ter-generate live di bawah saat kamu mengetik; unduhan .doc otomatis berkop logo institusi bila logo sudah di-upload.";
    if (typeof buatMotlet === "function") { try { buatMotlet(); } catch (e) {} }
  };
  const h0 = $("#mlHint");
})();
function suratBaru(jenis, f) {
  const kepala = (penerima, perihal) => f.kota + "\n\nKepada Yth.\n" + penerima + "\ndi tempat\n\nPerihal: " + perihal + "\n\nDengan hormat,\n\n";
  const ttd = (salam) => "\n\n" + (salam || "Hormat saya,") + "\n\n\n" + f.nama + (f.nim ? "\nNIM. " + f.nim : "");
  const idSaya = "Saya yang bertanda tangan di bawah ini:\nNama: " + f.nama + (f.nim ? "\nNIM: " + f.nim : "") + (f.prodi ? "\nProgram Studi/Organisasi: " + f.prodi : "") + "\n\n";
  switch (jenis) {
    case "penelitian":
      return kepala("Bapak/Ibu Pimpinan " + f.inst, "Permohonan Izin Penelitian")
        + idSaya + "Bermaksud mengajukan permohonan izin untuk melaksanakan penelitian dalam rangka penyusunan skripsi dengan judul:\n\n\"" + (f.judul || "(judul penelitian)") + "\"\n\n"
        + "Penelitian direncanakan pada " + (f.waktu || "(waktu penelitian)") + " bertempat di " + (f.tempat || f.inst) + ". " + (f.alasan || "Data dan informasi yang diperoleh dari penelitian ini semata-mata digunakan untuk kepentingan akademik dan penyusunan skripsi.")
        + "\n\nDemikian permohonan ini saya sampaikan. Atas perhatian, izin, dan bantuan Bapak/Ibu, saya ucapkan terima kasih." + ttd();
    case "ukt":
      return kepala("Bapak/Ibu Rektor / Dekan " + f.inst, "Permohonan Keringanan Biaya Pendidikan (UKT)")
        + idSaya + "Dengan ini saya mengajukan permohonan keringanan pembayaran Uang Kuliah Tunggal (UKT) untuk " + (f.tujuan || "semester ini") + ". "
        + (f.latar || "Permohonan ini saya ajukan mengingat kondisi ekonomi keluarga kami yang saat ini mengalami kesulitan.") + "\n\n"
        + (f.alasan || "Bentuk keringanan yang saya mohon adalah penundaan/pencicilan pembayaran sampai batas waktu yang Bapak/Ibu tentukan. Saya berkomitmen melunasi kewajiban tersebut sesuai kesepakatan.")
        + "\n\nDemikian permohonan ini saya sampaikan dengan sebenar-benarnya. Atas perhatian dan kebijaksanaan Bapak/Ibu, saya ucapkan terima kasih." + ttd();
    case "cuti":
      return kepala("Bapak/Ibu Rektor / Dekan " + f.inst, "Permohonan Cuti Akademik")
        + idSaya + "Dengan ini saya mengajukan permohonan cuti akademik pada " + (f.tujuan || "(semester)") + " selama " + (f.waktu || "1 (satu) semester") + ". "
        + (f.alasan || "Pengajuan cuti ini dikarenakan hal yang tidak dapat saya hindari pada semester tersebut.") + "\n\n"
        + "Saya bersedia memenuhi segala ketentuan administrasi yang berlaku dan akan aktif kembali pada semester berikutnya sesuai jadwal akademik.\n\nDemikian permohonan ini saya sampaikan. Atas perhatian dan persetujuan Bapak/Ibu, saya ucapkan terima kasih." + ttd();
    case "beasiswasurat":
      return kepala("Bapak/Ibu Pimpinan / Pengelola " + f.inst, "Permohonan Beasiswa — " + f.tujuan)
        + idSaya + "Dengan ini saya mengajukan permohonan untuk mengikuti seleksi " + (f.tujuan || "program beasiswa") + " yang diselenggarakan oleh " + f.inst + ". "
        + (f.latar || "Selama menempuh studi, saya berusaha menjaga prestasi akademik dan aktif dalam kegiatan kemahasiswaan.") + "\n\n"
        + (f.skill || "Saya memiliki kemampuan dan pengalaman yang mendukung kelayakan saya sebagai penerima beasiswa.") + " " + (f.alasan || "Beasiswa ini akan sangat membantu keberlangsungan studi saya dan memotivasi saya untuk terus berprestasi.") + "\n\n"
        + "Sebagai bahan pertimbangan, bersama surat ini saya lampirkan berkas persyaratan yang telah ditentukan. Demikian permohonan ini saya sampaikan. Atas perhatian Bapak/Ibu, saya ucapkan terima kasih." + ttd();
    case "sponsor":
      return kepala("Bapak/Ibu Pimpinan " + f.inst, "Permohonan Kerja Sama Sponsorship — " + (f.judul || "Kegiatan"))
        + "Kami dari " + (f.prodi || "panitia kegiatan") + " bermaksud menyelenggarakan kegiatan:\n\nNama Kegiatan: " + (f.judul || "(nama kegiatan)") + "\nWaktu: " + (f.waktu || "(waktu)") + "\nTempat: " + (f.tempat || "(tempat)") + "\n\n"
        + (f.latar || "Kegiatan ini bertujuan memberikan manfaat bagi mahasiswa dan masyarakat serta menjadi sarana positif bagi citra perusahaan Bapak/Ibu.") + "\n\n"
        + (f.skill || "Adapun bentuk kerja sama yang kami tawarkan antara lain penempatan logo perusahaan pada media publikasi, penyebutan oleh MC, dan booth promosi selama kegiatan berlangsung.") + "\n\n"
        + "Sebagai bahan pertimbangan, bersama surat ini kami lampirkan proposal kegiatan beserta rincian anggaran dan paket sponsorship. Demikian permohonan ini kami sampaikan. Atas perhatian dan kerja sama Bapak/Ibu, kami ucapkan terima kasih."
        + "\n\nHormat kami,\nPanitia " + (f.judul || "Kegiatan") + ",\n\n\n" + f.nama + (f.nim ? "\nNIM. " + f.nim : "");
    case "undangan":
      return f.kota + "\n\nKepada Yth.\n" + f.tujuan + "\n" + f.inst + "\ndi tempat\n\nPerihal: Undangan " + (f.judul || "Kegiatan") + "\n\nDengan hormat,\n\n"
        + "Dalam rangka penyelenggaraan " + (f.judul || "(nama acara)") + ", kami dari " + (f.prodi || "panitia") + " dengan hormat mengundang Bapak/Ibu untuk hadir pada:\n\nHari/Tanggal: " + (f.waktu || "(waktu)") + "\nTempat: " + (f.tempat || "(tempat)") + "\n\n"
        + (f.latar || "Kehadiran Bapak/Ibu sangat kami harapkan demi kelancaran dan kesuksesan acara tersebut.") + "\n\n"
        + "Untuk konfirmasi kehadiran, Bapak/Ibu dapat menghubungi narahubung kami" + (f.kontak ? " (" + f.kontak + ")" : "") + ". Demikian undangan ini kami sampaikan. Atas perhatian dan kehadiran Bapak/Ibu, kami ucapkan terima kasih."
        + "\n\nHormat kami,\nPanitia " + (f.judul || "Kegiatan") + ",\n\n\n" + f.nama;
    case "pinjam":
      return kepala("Bapak/Ibu Kepala Bagian Umum / Pengelola Sarana " + f.inst, "Permohonan Peminjaman " + (f.judul || "Ruangan/Alat"))
        + idSaya + "Bermaksud mengajukan permohonan peminjaman " + (f.judul || "(ruangan/alat)") + " untuk keperluan " + (f.latar || "kegiatan kemahasiswaan") + ", yang akan dilaksanakan pada:\n\nWaktu: " + (f.waktu || "(waktu)") + (f.tempat ? "\nTempat Kegiatan: " + f.tempat : "") + "\n\n"
        + "Kami berkomitmen menjaga kebersihan, keamanan, dan ketertiban selama penggunaan, serta mengembalikan fasilitas dalam keadaan seperti semula.\n\nDemikian permohonan ini kami sampaikan. Atas perhatian dan izin Bapak/Ibu, kami ucapkan terima kasih."
        + "\n\nHormat kami,\n\n\n" + f.nama + (f.nim ? "\nNIM. " + f.nim : "");
    case "narasumber":
      return f.kota + "\n\nKepada Yth.\n" + f.tujuan + "\n" + f.inst + "\ndi tempat\n\nPerihal: Permohonan Menjadi Narasumber\n\nDengan hormat,\n\n"
        + "Dalam rangka penyelenggaraan " + (f.judul || "(nama acara)") + ", kami dari " + (f.prodi || "panitia") + " bermaksud memohon kesediaan Bapak/Ibu menjadi narasumber dengan tema/materi " + (f.skill || "(tema materi)") + ", yang akan dilaksanakan pada:\n\nWaktu: " + (f.waktu || "(waktu)") + "\nTempat: " + (f.tempat || "(tempat)") + "\n\n"
        + (f.latar || "Kami menilai Bapak/Ibu memiliki kompetensi dan pengalaman yang sangat relevan dengan tema tersebut.") + "\n\n"
        + "Demikian permohonan ini kami sampaikan. Besar harapan kami Bapak/Ibu berkenan memenuhi permohonan ini. Atas perhatian dan kesediaan Bapak/Ibu, kami ucapkan terima kasih."
        + "\n\nHormat kami,\nPanitia " + (f.judul || "Kegiatan") + ",\n\n\n" + f.nama;
    case "rekomendasi":
      return f.kota + "\n\nSURAT REKOMENDASI\n\nYang bertanda tangan di bawah ini:\nNama: " + f.tujuan + "\nJabatan: Dosen " + (f.prodi || "") + "\n\nMenerangkan dengan sebenarnya bahwa:\nNama: " + f.nama + (f.nim ? "\nNIM: " + f.nim : "") + (f.prodi ? "\nProgram Studi: " + f.prodi : "") + "\n\n"
        + "adalah mahasiswa yang saya kenal selama menempuh studi. " + (f.latar || "Yang bersangkutan menunjukkan prestasi akademik yang baik, berdisiplin, dan beretika selama mengikuti perkuliahan maupun kegiatan kemahasiswaan.") + "\n\n"
        + "Berdasarkan pengamatan saya, saya merekomendasikan yang bersangkutan untuk " + (f.alasan || "mengikuti program yang dituju di " + f.inst) + ". Saya meyakini yang bersangkutan mampu memenuhi tanggung jawab yang diberikan.\n\n"
        + "Demikian surat rekomendasi ini saya buat untuk dapat digunakan sebagaimana mestinya.\n\n" + f.kota.split(",")[0] + ", " + f.kota.split(", ").slice(1).join(", ") + "\nDosen Pemberi Rekomendasi,\n\n\n" + f.tujuan;
    case "pernyataan":
      return f.kota + "\n\nSURAT PERNYATAAN\n\n" + idSaya + "Dengan ini menyatakan dengan sebenar-benarnya bahwa:\n\n"
        + (f.alasan ? f.alasan.split(/\n/).map((s) => s.trim()).filter(Boolean).map((s, i) => (i + 1) + ". " + s).join("\n") : "1. Seluruh data dan pernyataan yang saya sampaikan adalah benar.\n2. Saya tidak sedang menerima beasiswa dari sumber lain untuk komponen yang sama.")
        + "\n\nDemikian surat pernyataan ini saya buat dalam keadaan sadar dan tanpa paksaan dari pihak mana pun. Apabila di kemudian hari terbukti pernyataan ini tidak benar, saya bersedia menerima sanksi sesuai ketentuan yang berlaku.\n\n"
        + f.kota + "\n\n[Materai Rp10.000]\n\n" + f.nama + (f.nim ? "\nNIM. " + f.nim : "");
    case "kuasa":
      return f.kota + "\n\nSURAT KUASA\n\n" + idSaya.replace("Saya yang bertanda tangan di bawah ini:", "Pemberi Kuasa:\nSaya yang bertanda tangan di bawah ini:")
        + "Dengan ini memberikan kuasa kepada:\nNama: " + f.tujuan + "\n\nUntuk keperluan: " + (f.alasan || "mewakili saya dalam pengurusan dan pengambilan dokumen akademik (ijazah/transkrip)") + " di " + f.inst + ".\n\n"
        + "Segala akibat dan tanggung jawab yang timbul dari pemberian kuasa ini menjadi tanggung jawab saya selaku pemberi kuasa.\n\nDemikian surat kuasa ini saya buat dengan sebenarnya untuk dapat digunakan sebagaimana mestinya.\n\n"
        + f.kota + "\n\nPenerima Kuasa,\t\tPemberi Kuasa,\n\n\n" + f.tujuan + "\t\t" + f.nama + " [materai]";
    case "resign":
      return kepala("Bapak/Ibu Pimpinan " + f.inst, "Pengunduran Diri")
        + idSaya + "Dengan ini saya mengajukan pengunduran diri dari jabatan " + (f.tujuan || "(jabatan)") + " di " + f.inst + ", terhitung efektif mulai " + (f.waktu || "(tanggal efektif)") + ". "
        + (f.alasan || "Pengunduran diri ini saya ajukan atas pertimbangan pribadi yang telah saya pikirkan dengan matang.") + "\n\n"
        + "Saya mengucapkan terima kasih atas kepercayaan, kesempatan, dan pengalaman yang telah diberikan selama saya bergabung. Saya memohon maaf apabila terdapat kekurangan selama menjalankan tugas, dan saya bersedia membantu proses serah terima tugas sebelum tanggal efektif pengunduran diri.\n\nDemikian surat pengunduran diri ini saya sampaikan. Atas perhatian Bapak/Ibu, saya ucapkan terima kasih." + ttd();
  }
  return "";
}
(function () {
  const _prevMotlet = buatMotlet;
  const JENIS_BARU = { penelitian: 1, ukt: 1, cuti: 1, beasiswasurat: 1, sponsor: 1, undangan: 1, pinjam: 1, narasumber: 1, rekomendasi: 1, pernyataan: 1, kuasa: 1, resign: 1 };
  buatMotlet = function () {
    const jenis = $("#mlJenis") ? $("#mlJenis").value : "";
    if (!JENIS_BARU[jenis]) { _prevMotlet(); return; }
    const g = (id) => ($("#" + id) ? $("#" + id).value.trim() : "");
    const f = { nama: g("mlNama") || "Nama Kamu", kota: g("mlKota"), tujuan: g("mlTujuan") || "(tujuan)", inst: g("mlInst") || "(institusi)", latar: g("mlLatar"), alasan: g("mlAlasan"), skill: g("mlSkill"), kontak: g("mlKontak"), nim: g("mlNim"), prodi: g("mlProdi"), judul: g("mlJudul"), waktu: g("mlWaktu"), tempat: g("mlTempat") };
    const surat = suratBaru(jenis, f);
    window._motlet = surat;
    $("#mlOut").innerHTML = '<div class="' + OUT + '"><div class="bg-white dark:bg-slate-900 rounded-lg p-5 border border-slate-200 dark:border-slate-700 whitespace-pre-wrap leading-relaxed text-[15px]" style="font-family:Georgia,serif">' + esc(surat) + "</div>"
      + '<p class="text-xs text-slate-500 mt-2">Periksa kembali nama, tanggal, dan instansi sebelum mengirim. Untuk Surat Pernyataan & Kuasa, tempel materai Rp10.000 pada bagian yang ditandai.</p>'
      + '<div class="flex flex-wrap gap-2 mt-3"><button class="' + BTN + '" onclick="copyText(window._motlet)">📋 Copy Surat</button>'
      + '<button class="' + BTN2 + '" onclick="download(\'Surat.doc\', \'<html><body style=&quot;font-family:serif;font-size:12pt;white-space:pre-wrap&quot;>\' + esc(window._motlet) + \'</body></html>\', \'application/msword\')">⬇️ Download .doc</button></div></div>';
    window._suratDoc = "<html><body style='font-family:serif;font-size:12pt'>" + kopLogoHtml("center") + "<div style='white-space:pre-wrap'>" + esc(surat) + "</div></body></html>";
    const btn = [...document.querySelectorAll("#mlOut button")].find((b) => (b.getAttribute("onclick") || "").includes("Surat.doc"));
    if (btn) btn.setAttribute("onclick", "download('Surat.doc', window._suratDoc, 'application/msword')");
  };
  // petunjuk awal
  const hint = $("#mlHint");
  if (hint) hint.textContent = "Pilih jenis surat — ada 15 jenis sekarang, termasuk izin penelitian, keringanan UKT, sponsorship, dan surat pernyataan. Surat ter-generate live saat kamu mengetik.";
})();


/* ---------- 51. SIMULASI WAWANCARA KERJA ---------- */
const BANK_WAWANCARA = [
  ["Pembuka", "Ceritakan tentang diri Anda.", ["Perkenalkan nama & latar pendidikan singkat", "Sambungkan ke pengalaman paling relevan dengan posisi ini", "Tutup dengan alasan melamar di sini — rumus: Sekarang → Pengalaman → Alasan"]],
  ["Pembuka", "Mengapa Anda tertarik melamar di perusahaan kami?", ["Sebut 1–2 hal spesifik tentang perusahaan (produk, nilai, proyek)", "Hubungkan dengan keahlian/ketertarikanmu", "Tunjukkan riset — jangan jawab generik"]],
  ["Tentang Diri", "Apa kelebihan terbesar Anda?", ["Pilih kelebihan yang relevan dengan posisi", "Buktikan dengan contoh nyata + hasil terukur", "Hindari klise tanpa bukti ('saya pekerja keras' saja tidak cukup)"]],
  ["Tentang Diri", "Apa kekurangan Anda, dan bagaimana Anda mengatasinya?", ["Pilih kekurangan nyata tapi tidak fatal untuk posisi ini", "Fokus 70% jawaban pada langkah perbaikan yang sedang berjalan", "Tunjukkan progres konkret, bukan sekadar pengakuan"]],
  ["Situasional (STAR)", "Ceritakan saat Anda menghadapi konflik dalam tim.", ["S — Situasi: konteks singkat konfliknya", "T — Tugas: peran/tanggung jawabmu di situ", "A — Aksi: langkah konkret yang KAMU ambil", "R — Hasil: penyelesaian + pelajaran yang dipetik"]],
  ["Situasional (STAR)", "Ceritakan pengalaman Anda mengejar deadline yang sangat ketat.", ["S — Situasi: proyek & batas waktunya", "T — Tugas: target yang harus dicapai", "A — Aksi: prioritisasi, pembagian kerja, komunikasi", "R — Hasil: selesai tepat waktu + angka bila ada"]],
  ["Situasional (STAR)", "Ceritakan kegagalan terbesar Anda dan apa yang Anda pelajari.", ["S — Situasi: kegagalan yang jujur tapi aman", "T — Tugas: peranmu", "A — Aksi: bagaimana kamu menanganinya & memperbaikinya", "R — Hasil: perubahan nyata setelahnya — pewawancara menilai kedewasaan, bukan kesempurnaan"]],
  ["Penutup", "Di mana Anda melihat diri Anda 5 tahun ke depan?", ["Tunjukkan ambisi yang realistis & searah dengan posisi ini", "Sebut keahlian yang ingin dikuasai", "Sinyalkan komitmen jangka panjang pada bidang ini"]],
  ["Penutup", "Berapa gaji yang Anda harapkan?", ["Riset rentang pasar posisi & kotamu dulu", "Jawab dengan rentang, bukan satu angka mati", "Dasarkan pada pengalaman & tanggung jawab posisi"]],
  ["Penutup", "Apakah ada yang ingin Anda tanyakan kepada kami?", ["SELALU siapkan 2 pertanyaan (tentang tim, target 3 bulan pertama, budaya kerja)", "Jangan tanya gaji/cuti di tahap ini", "Pertanyaan bagus = sinyal kandidat serius"]]
];
let wawState = { cur: null, done: store.get("mt_waw_done", 0), timer: null, remain: 0 };
UI.k51 = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Kategori Pertanyaan", '<select id="wwCat" class="' + IN + '"><option value="">🎲 Acak Semua</option>' + [...new Set(BANK_WAWANCARA.map((q) => q[0]))].map((c) => "<option>" + c + "</option>").join("") + "</select>")
    + '<div class="flex flex-wrap gap-2 mb-4"><button class="' + BTN + '" onclick="tanyaWawancara()">🎤 Mulai Pertanyaan</button>'
    + '<span class="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2 text-sm font-bold">Latihan selesai: <span id="wwProg">' + wawState.done + "</span> sesi</span></div>"
    + outBox("wwOut") + "</div>";
  $("#wwOut").innerHTML = '<div class="' + OUT + ' text-slate-500">Simulasi wawancara: pertanyaan muncul, kamu punya 90 detik untuk menjawab dengan suara lantang (seperti wawancara sungguhan), lalu periksa kerangka jawabannya. Untuk pertanyaan situasional, pakai metode STAR: Situation → Task → Action → Result.</div>';
};
function wwStop() { if (wawState.timer) { clearInterval(wawState.timer); wawState.timer = null; } }
function tanyaWawancara() {
  const cat = $("#wwCat").value;
  const pool = BANK_WAWANCARA.filter((q) => !cat || q[0] === cat);
  let q; do { q = pool[Math.floor(Math.random() * pool.length)]; } while (pool.length > 1 && wawState.cur && q[1] === wawState.cur[1]);
  wawState.cur = q;
  wwStop(); wawState.remain = 90;
  wawState.timer = setInterval(() => { wawState.remain--; const c = $("#wwClock"); if (!c) { wwStop(); return; } if (wawState.remain <= 0) { wwStop(); c.textContent = "⏰ Waktu habis — tutup dengan kalimat penutup yang rapi!"; } else c.textContent = "⏱ Sisa waktu jawab: " + Math.floor(wawState.remain / 60) + ":" + String(wawState.remain % 60).padStart(2, "0"); }, 1000);
  $("#wwOut").innerHTML = '<div class="' + OUT + ' fadein"><span class="text-[11px] font-bold bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-200 rounded-full px-2.5 py-1">' + esc(q[0]) + '</span>'
    + '<p class="text-lg sm:text-xl font-extrabold leading-snug mt-3">🎤 "' + esc(q[1]) + '"</p>'
    + '<p id="wwClock" class="text-sm font-bold text-slate-500 mt-2">⏱ Sisa waktu jawab: 1:30</p>'
    + '<div id="wwFw" class="hidden mt-4"><h4 class="font-bold mb-1.5">🧭 Kerangka Jawaban:</h4><ol class="list-decimal list-inside space-y-1 text-sm leading-relaxed">' + q[2].map((f) => "<li>" + esc(f) + "</li>").join("") + "</ol></div>"
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN2 + '" onclick="document.getElementById(\'wwFw\').classList.remove(\'hidden\')">👁 Lihat Kerangka</button>'
    + '<button class="' + BTN + '" onclick="wawState.done++;store.set(\'mt_waw_done\',wawState.done);document.getElementById(\'wwProg\').textContent=wawState.done;tanyaWawancara()">✅ Selesai — Pertanyaan Berikutnya</button></div></div>';
}

/* ---------- 52. KALENDER AKADEMIK & DEADLINE ---------- */
let calEvents = store.get("mt_events", [
  { date: new Date(Date.now() + 5 * 864e5).toISOString().slice(0, 10), title: "Batas akhir revisi Bab 3", type: "deadline" },
  { date: new Date(Date.now() + 12 * 864e5).toISOString().slice(0, 10), title: "Seminar proposal", type: "ujian" }
]);
let calCursor = new Date(); calCursor.setDate(1);
let calSelected = new Date().toISOString().slice(0, 10);
UI.k52 = function (el) {
  el.innerHTML = '<div class="fadein"><div class="flex items-center justify-between mb-3">'
    + '<button class="' + BTN2 + '" onclick="geserBulan(-1)">⬅️</button>'
    + '<h4 id="calTitle" class="font-extrabold text-lg"></h4>'
    + '<button class="' + BTN2 + '" onclick="geserBulan(1)">➡️</button></div>'
    + '<div class="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-500 mb-1">' + ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => "<div>" + d + "</div>").join("") + "</div>"
    + '<div id="calGrid" class="grid grid-cols-7 gap-1 mb-4"></div>'
    + '<div class="grid sm:grid-cols-3 gap-x-4">'
    + field("Tanggal Terpilih", '<input id="evTgl" type="date" class="' + IN + '">')
    + field("Nama Kegiatan / Deadline", '<input id="evJud" class="' + IN + '" placeholder="cth: UAS Statistika / Batas kumpul laporan">')
    + field("Jenis", '<select id="evJenis" class="' + IN + '"><option value="deadline">🔴 Deadline</option><option value="ujian">🟣 Ujian/Sidang</option><option value="kuliah">🔵 Kuliah/Kelas</option><option value="libur">🟢 Libur/Acara</option></select>')
    + '</div><div class="flex flex-wrap gap-2 mb-4"><button class="' + BTN + '" onclick="tambahEvent()">➕ Tambah ke Kalender</button>'
    + '<button class="' + BTN2 + '" onclick="eksporIcs()">⬇️ Export .ics (Google Calendar)</button></div>'
    + outBox("calOut") + "</div>";
  renderKalender();
};
function geserBulan(d) { calCursor.setMonth(calCursor.getMonth() + d); renderKalender(); }
function pilihTanggal(ds) { calSelected = ds; $("#evTgl").value = ds; renderKalender(); }
function tambahEvent() {
  const tgl = $("#evTgl").value || calSelected, jud = $("#evJud").value.trim();
  if (!jud) { toast("Isi nama kegiatan dulu."); return; }
  calEvents.push({ date: tgl, title: jud, type: $("#evJenis").value });
  calEvents.sort((a, b) => a.date.localeCompare(b.date));
  store.set("mt_events", calEvents);
  $("#evJud").value = ""; renderKalender(); toast("Kegiatan ditambahkan 📅");
}
function hapusEvent(i) { calEvents.splice(i, 1); store.set("mt_events", calEvents); renderKalender(); }
function renderKalender() {
  const title = $("#calTitle"); if (!title) return;
  const y = calCursor.getFullYear(), m = calCursor.getMonth();
  title.textContent = calCursor.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
  const first = (new Date(y, m, 1).getDay() + 6) % 7;
  const days = new Date(y, m + 1, 0).getDate();
  const today = new Date().toISOString().slice(0, 10);
  const evMap = {};
  calEvents.forEach((e) => { (evMap[e.date] = evMap[e.date] || []).push(e); });
  const dot = { deadline: "#DC2626", ujian: "#7C3AED", kuliah: "#2F5FE8", libur: "#059669" };
  let cells = "";
  for (let i = 0; i < first; i++) cells += "<div></div>";
  for (let d = 1; d <= days; d++) {
    const ds = y + "-" + String(m + 1).padStart(2, "0") + "-" + String(d).padStart(2, "0");
    const evs = evMap[ds] || [];
    cells += '<button onclick="pilihTanggal(\'' + ds + '\')" class="rounded-lg py-1.5 text-sm font-semibold relative transition ' + (ds === calSelected ? "bg-brand-600 text-white" : ds === today ? "bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-200" : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700") + '">' + d
      + (evs.length ? '<span class="flex justify-center gap-0.5 mt-0.5">' + evs.slice(0, 3).map((e) => '<span class="w-1.5 h-1.5 rounded-full" style="background:' + dot[e.type] + '"></span>').join("") + "</span>" : "") + "</button>";
  }
  $("#calGrid").innerHTML = cells;
  const now = new Date(); now.setHours(0, 0, 0, 0);
  const upcoming = calEvents.map((e, i) => ({ ...e, i, diff: Math.round((new Date(e.date + "T00:00:00") - now) / 864e5) })).filter((e) => e.diff >= -1).sort((a, b) => a.diff - b.diff);
  window._icsEvents = calEvents;
  $("#calOut").innerHTML = '<div class="' + OUT + '"><h4 class="font-bold mb-2">⏳ Deadline & Kegiatan Terdekat:</h4>'
    + (upcoming.length ? '<div class="space-y-1.5">' + upcoming.map((e) => '<div class="flex items-center gap-2 text-sm"><span class="rounded-md px-2 py-1 text-xs font-bold text-white" style="background:' + dot[e.type] + '">' + (e.diff < 0 ? "Kemarin" : e.diff === 0 ? "HARI INI" : "H-" + e.diff) + '</span><span class="text-slate-500 whitespace-nowrap">' + new Date(e.date + "T00:00:00").toLocaleDateString("id-ID", { day: "numeric", month: "short" }) + '</span><span class="flex-1 font-semibold">' + esc(e.title) + '</span><button class="text-rose-500 font-bold" onclick="hapusEvent(' + e.i + ')">✕</button></div>').join("") + "</div>" : '<p class="text-sm text-slate-500">Tidak ada kegiatan mendatang — tambahkan deadline pertamamu.</p>')
    + '<p class="text-xs text-slate-500 mt-3">Klik tanggal di kalender untuk memilihnya, lalu isi nama kegiatan. File .ics bisa diimpor ke Google Calendar/Outlook agar deadline muncul di HP-mu.</p></div>';
}
function eksporIcs() {
  const escIcs = (s) => String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
  const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//MahasiswaTools//Kalender Akademik//ID"]
    .concat(calEvents.map((e) => ["BEGIN:VEVENT", "UID:" + e.date + "-" + e.title.length + "@mahasiswatools", "DTSTAMP:20260101T000000Z", "DTSTART;VALUE=DATE:" + e.date.replace(/-/g, ""), "SUMMARY:" + escIcs(e.title), "END:VEVENT"].join("\r\n")))
    .concat(["END:VCALENDAR"]).join("\r\n");
  window._icsText = ics;
  download("Kalender_Akademik.ics", ics, "text/calendar");
}

;

/* ============================================================
   TOOLS 53–55 (Karier & Belajar — penutup)
   ============================================================ */
/* ---------- 53. CV ATS-FRIENDLY BUILDER ---------- */
const cvSaved = store.get("mt_cv", {});
UI.k53 = function (el) {
  const v = (k, d) => esc(cvSaved[k] != null ? cvSaved[k] : (d || ""));
  el.innerHTML = '<div class="fadein"><div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Nama Lengkap", '<input id="cvNama" class="' + IN + '" value="' + v("nama") + '" placeholder="Nama sesuai KTP">')
    + field("Posisi yang Dituju", '<input id="cvPosisi" class="' + IN + '" value="' + v("posisi") + '" placeholder="cth: Staff Administrasi">')
    + field("Email", '<input id="cvEmail" class="' + IN + '" value="' + v("email") + '" placeholder="nama@email.com">')
    + field("Telepon / WhatsApp", '<input id="cvTelp" class="' + IN + '" value="' + v("telp") + '" placeholder="08xxxxxxxxxx">')
    + field("Kota Domisili", '<input id="cvKota" class="' + IN + '" value="' + v("kota") + '" placeholder="cth: Palembang">')
    + field("LinkedIn / Portofolio", '<input id="cvLink" class="' + IN + '" value="' + v("link") + '" placeholder="linkedin.com/in/nama">')
    + '</div>'
    + field("Ringkasan Profesional (2–4 kalimat)", '<textarea id="cvRingkas" rows="3" class="' + IN + '" placeholder="Lulusan … dengan pengalaman … Terampil dalam …">' + v("ringkas") + "</textarea>")
    + field("Pengalaman (format per blok)", '<textarea id="cvExp" rows="8" class="' + IN + '" placeholder="Blok dipisah baris kosong. Baris pertama: Posisi | Perusahaan | Periode. Baris berikutnya diawali - untuk poin pencapaian (pakai angka!):&#10;Asisten Survey | PT Anugrah Bumi Lestari | 2023–2025&#10;- Memproses 450+ data survei lahan dengan akurasi 98%&#10;- Mengelola arsip digital 12 proyek">' + v("exp") + "</textarea>")
    + field("Pendidikan (satu per baris: Institusi | Jurusan | Tahun)", '<textarea id="cvEdu" rows="3" class="' + IN + '" placeholder="Universitas PGRI Palembang | S1 Ekonomi | 2014–2018">' + v("edu") + "</textarea>")
    + field("Keahlian (pisahkan koma)", '<input id="cvSkill" class="' + IN + '" value="' + v("skill") + '" placeholder="Microsoft Excel, SPSS, Survei Lapangan, Administrasi, ...">')
    + '<button class="' + BTN + '" onclick="buatCv()">📄 Generate CV + Skor ATS</button>' + outBox("cvOut") + "</div>";
};
function ambilCv() {
  const g = (id) => $("#" + id).value.trim();
  const data = { nama: g("cvNama"), posisi: g("cvPosisi"), email: g("cvEmail"), telp: g("cvTelp"), kota: g("cvKota"), link: g("cvLink"), ringkas: g("cvRingkas"), exp: $("#cvExp").value.trim(), edu: $("#cvEdu").value.trim(), skill: g("cvSkill") };
  store.set("mt_cv", data);
  return data;
}
function parseExp(text) {
  return text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean).map((b) => {
    const lines = b.split(/\n/).map((l) => l.trim()).filter(Boolean);
    const head = (lines[0] || "").split("|").map((s) => s.trim());
    return { posisi: head[0] || "", perusahaan: head[1] || "", periode: head[2] || "", bullets: lines.slice(1).map((l) => l.replace(/^[-•]\s*/, "")) };
  });
}
function cvPlainText(d) {
  const exps = parseExp(d.exp);
  const L = [d.nama.toUpperCase(), d.posisi, [d.email, d.telp, d.kota, d.link].filter(Boolean).join(" | "), "", "RINGKASAN PROFESIONAL", d.ringkas, "", "PENGALAMAN"];
  exps.forEach((e) => { L.push([e.posisi, e.perusahaan, e.periode].filter(Boolean).join(" | ")); e.bullets.forEach((b) => L.push("- " + b)); L.push(""); });
  L.push("PENDIDIKAN"); d.edu.split(/\n/).filter((s) => s.trim()).forEach((s) => L.push(s.trim()));
  L.push("", "KEAHLIAN", d.skill);
  return L.join("\n");
}
function skorAts(d) {
  const exps = parseExp(d.exp);
  const bullets = exps.flatMap((e) => e.bullets);
  const skills = d.skill.split(",").map((s) => s.trim()).filter(Boolean);
  const verbs = ["memimpin", "membuat", "mengelola", "meningkatkan", "memproses", "menganalisis", "mengembangkan", "merancang", "mengkoordinasikan", "menyusun", "melatih", "mengurangi", "mencapai", "mengoperasikan", "membantu"];
  const words = cvPlainText(d).split(/\s+/).filter(Boolean).length;
  const checks = [
    ["Nama & posisi tujuan terisi", !!d.nama && !!d.posisi],
    ["Email valid tercantum", /^\S+@\S+\.\S+$/.test(d.email)],
    ["Nomor telepon tercantum", d.telp.replace(/\D/g, "").length >= 9],
    ["Ringkasan profesional ≥ 25 kata", d.ringkas.split(/\s+/).filter(Boolean).length >= 25],
    ["Minimal 1 pengalaman terstruktur", exps.length >= 1 && !!exps[0].posisi],
    ["Poin pencapaian memakai angka (%, jumlah, dsb)", bullets.some((b) => /\d/.test(b))],
    ["Poin pencapaian diawali kata kerja aksi", bullets.length > 0 && bullets.some((b) => verbs.some((v) => b.toLowerCase().startsWith(v)))],
    ["Keahlian ≥ 5 butir", skills.length >= 5],
    ["Pendidikan tercantum", d.edu.split(/\n/).filter((s) => s.trim()).length >= 1],
    ["Panjang CV ideal (200–900 kata)", words >= 200 && words <= 900]
  ];
  const passed = checks.filter((c) => c[1]).length;
  return { checks, score: Math.round(passed / checks.length * 100) };
}
function buatCv() {
  const d = ambilCv();
  if (!d.nama) { $("#cvOut").innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Isi minimal Nama Lengkap dulu ya.</div>'; return; }
  const exps = parseExp(d.exp), { checks, score } = skorAts(d);
  window._cvText = cvPlainText(d);
  window._cvScore = score;
  const kontak = [d.email, d.telp, d.kota, d.link].filter(Boolean).join(" | ");
  const cvHtml = '<div style="font-family:Arial,sans-serif;color:#111"><h1 style="font-size:22pt;margin:0">' + esc(d.nama) + '</h1><p style="font-size:12.5pt;margin:2pt 0"><b>' + esc(d.posisi) + '</b></p><p style="margin:2pt 0 10pt">' + esc(kontak) + '</p>'
    + '<h2 style="font-size:12.5pt;border-bottom:1.5pt solid #111;padding-bottom:2pt">RINGKASAN PROFESIONAL</h2><p>' + esc(d.ringkas) + '</p>'
    + '<h2 style="font-size:12.5pt;border-bottom:1.5pt solid #111;padding-bottom:2pt">PENGALAMAN</h2>'
    + exps.map((e) => '<p style="margin:6pt 0 2pt"><b>' + esc(e.posisi) + "</b>" + (e.perusahaan ? " — " + esc(e.perusahaan) : "") + (e.periode ? ' <span style="color:#444">(' + esc(e.periode) + ")</span>" : "") + "</p>" + (e.bullets.length ? "<ul style='margin:2pt 0 8pt'>" + e.bullets.map((b) => "<li>" + esc(b) + "</li>").join("") + "</ul>" : "")).join("")
    + '<h2 style="font-size:12.5pt;border-bottom:1.5pt solid #111;padding-bottom:2pt">PENDIDIKAN</h2>' + d.edu.split(/\n/).filter((s) => s.trim()).map((s) => '<p style="margin:2pt 0">' + esc(s.trim()) + "</p>").join("")
    + '<h2 style="font-size:12.5pt;border-bottom:1.5pt solid #111;padding-bottom:2pt">KEAHLIAN</h2><p>' + esc(d.skill) + "</p></div>";
  window._cvDoc = "<html><body>" + cvHtml + "</body></html>";
  const scoreColor = score >= 80 ? "text-emerald-600" : score >= 55 ? "text-amber-600" : "text-rose-600";
  $("#cvOut").innerHTML = '<div class="' + OUT + '"><div class="flex flex-wrap items-center gap-3 mb-4"><div class="rounded-2xl bg-white dark:bg-slate-900 px-5 py-3 text-center"><div class="text-3xl font-extrabold ' + scoreColor + '">' + score + '</div><div class="text-xs text-slate-500">Skor ATS (cek struktur)</div></div>'
    + '<div class="flex-1 min-w-[230px] space-y-1">' + checks.map((c) => '<div class="text-xs font-semibold">' + (c[1] ? "✅" : "❌") + " " + c[0] + "</div>").join("") + "</div></div>"
    + '<div class="bg-white text-slate-900 rounded-lg p-5 border border-slate-300 overflow-x-auto"><div style="min-width:520px">' + cvHtml + "</div></div>"
    + '<p class="text-xs text-slate-500 mt-2">Format ATS-aman: satu kolom, tanpa tabel/grafik, judul seksi standar, font umum — mudah dibaca mesin penyaring lamaran. Skor menilai struktur & kelengkapan, bukan jaminan diterima.</p>'
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="' + BTN + '" onclick="download(\'CV_ATS.doc\', window._cvDoc, \'application/msword\')">⬇️ Download CV (.doc)</button>'
    + '<button class="' + BTN2 + '" onclick="copyText(window._cvText)">📋 Copy Versi Teks Polos</button></div></div>';
}

/* ---------- 54. CEKLIS YUDISIUM & SIDANG ---------- */
const YUDISIUM_DEFAULT = ["Skripsi final terjilid & ditandatangani seluruh penguji", "Upload file skripsi final (PDF) ke repository perpustakaan", "Surat keterangan bebas pustaka", "Surat bebas tanggungan UKT / keuangan kampus", "Bebas peminjaman alat & laboratorium", "Transkrip nilai sementara sudah diverifikasi BAAK", "Fotokopi ijazah SMA/SMK terlegalisir", "KTP & Kartu Keluarga terbaru", "Pas foto terbaru sesuai ketentuan kampus", "Formulir pendaftaran yudisium terisi lengkap", "Bukti pembayaran biaya wisuda", "Abstrak & artikel untuk jurnal kampus (bila disyaratkan)", "Sertifikat kompetensi / TOEFL (bila disyaratkan)", "Data ijazah di PDDikti terverifikasi (nama, NIK, tempat-tanggal lahir)"];
let yudItems = store.get("mt_yudisium", null) || YUDISIUM_DEFAULT.map((t) => ({ t, done: false }));
UI.k54 = function (el) {
  el.innerHTML = '<div class="fadein">'
    + '<div class="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 mb-4"><div class="flex items-center justify-between mb-2"><b>Progres Kelengkapan Berkas</b><span id="ydPct" class="font-extrabold text-brand-600"></span></div>'
    + '<div class="h-3.5 rounded-full bg-slate-200 dark:bg-slate-700"><div id="ydBar" class="h-3.5 rounded-full bg-gradient-to-r from-brand-500 to-emerald-500 transition-all" style="width:0%"></div></div></div>'
    + '<div id="ydList" class="space-y-2 mb-4"></div>'
    + '<div class="grid sm:grid-cols-[1fr_auto] gap-2 mb-4">' + '<input id="ydBaru" class="' + IN + '" placeholder="Tambah syarat khusus kampusmu…">' + '<button class="' + BTN2 + '" onclick="tambahYud()">➕ Tambah Syarat</button></div>'
    + '<div class="flex flex-wrap gap-2"><button class="' + BTN + '" onclick="eksporYud()">⬇️ Download Ceklis (.txt)</button>'
    + '<button class="' + BTN2 + '" onclick="resetYud()">↺ Reset Semua</button></div></div>';
  renderYud();
};
function renderYud() {
  const list = $("#ydList"); if (!list) return;
  list.innerHTML = yudItems.map((it, i) => '<label class="flex items-start gap-3 rounded-xl border px-4 py-3 cursor-pointer transition ' + (it.done ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900") + '">'
    + '<input type="checkbox" class="w-5 h-5 mt-0.5 accent-emerald-600" ' + (it.done ? "checked" : "") + ' onchange="yudItems[' + i + '].done=this.checked;store.set(\'mt_yudisium\',yudItems);renderYud()">'
    + '<span class="flex-1 text-sm font-semibold ' + (it.done ? "line-through opacity-60" : "") + '">' + esc(it.t) + "</span>"
    + '<button class="text-rose-500 font-bold" onclick="event.preventDefault();yudItems.splice(' + i + ',1);store.set(\'mt_yudisium\',yudItems);renderYud()">✕</button></label>').join("");
  const done = yudItems.filter((i) => i.done).length;
  const pct = yudItems.length ? Math.round(done / yudItems.length * 100) : 0;
  window._yudPct = pct;
  $("#ydPct").textContent = done + " / " + yudItems.length + " beres (" + pct + "%)";
  $("#ydBar").style.width = pct + "%";
}
function tambahYud() { const t = $("#ydBaru").value.trim(); if (!t) return; yudItems.push({ t, done: false }); store.set("mt_yudisium", yudItems); $("#ydBaru").value = ""; renderYud(); }
function resetYud() { yudItems.forEach((i) => i.done = false); store.set("mt_yudisium", yudItems); renderYud(); }
function eksporYud() {
  const txt = "CEKLIS SYARAT SIDANG & YUDISIUM — MahasiswaTools\n\n" + yudItems.map((i) => (i.done ? "[✓] " : "[ ] ") + i.t).join("\n") + "\n\nProgres: " + window._yudPct + "%";
  download("Ceklis_Yudisium.txt", txt);
}

/* ---------- 55. FLASHCARD CETAK (DEPAN–BELAKANG) ---------- */
UI.k55 = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Daftar Istilah & Definisi", '<textarea id="fpIn" rows="8" class="' + IN + '" placeholder="Satu kartu per baris, format: Istilah | Definisi&#10;Validitas | Tingkat ketepatan instrumen mengukur apa yang seharusnya diukur">Validitas | Ketepatan instrumen mengukur apa yang seharusnya diukur&#10;Reliabilitas | Konsistensi hasil pengukuran bila diulang&#10;Populasi | Seluruh subjek yang menjadi sasaran penelitian&#10;Sampel | Bagian populasi yang diambil sebagai responden&#10;Variabel Bebas | Variabel yang memengaruhi variabel lain&#10;Variabel Terikat | Variabel yang dipengaruhi variabel bebas&#10;Hipotesis | Dugaan sementara yang diuji kebenarannya&#10;Signifikansi | Taraf kesalahan yang ditoleransi (umumnya 5%)</textarea>')
    + '<div class="flex flex-wrap gap-2 mb-4"><button class="' + BTN + '" onclick="buatFlashPrint()">🖨 Buat Lembar Cetak (Depan–Belakang)</button></div>'
    + outBox("fpOut") + "</div>";
};
function buatFlashPrint() {
  const lines = $("#fpIn").value.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const cards = [];
  lines.forEach((l) => { const p = l.split("|"); if (p.length >= 2) cards.push({ t: p[0].trim(), d: p.slice(1).join("|").trim() }); });
  const out = $("#fpOut");
  if (!cards.length) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Tidak ada kartu terbaca — pakai format "Istilah | Definisi".</div>'; return; }
  const perPage = 8, pages = [];
  for (let s = 0; s < cards.length; s += perPage) pages.push(cards.slice(s, s + perPage));
  const cardCss = "border:1.6pt dashed #94A3B8;border-radius:10pt;display:flex;align-items:center;justify-content:center;text-align:center;padding:12pt;min-height:118pt;";
  const frontPage = (pg, idx) => '<div class="page"><h3 style="font-family:sans-serif;color:#64748B">HALAMAN DEPAN — Kartu ' + (idx * perPage + 1) + "–" + (idx * perPage + pg.length) + '</h3><div class="grid">' + pg.map((c) => '<div class="card"><div><div style="font-size:10pt;color:#2F5FE8;font-weight:bold;letter-spacing:1pt">ISTILAH</div><div style="font-size:19pt;font-weight:800;font-family:sans-serif">' + esc(c.t) + "</div></div></div>").join("") + "</div></div>";
  const backPage = (pg, idx) => { const rows = []; for (let r = 0; r < pg.length; r += 2) rows.push(pg.slice(r, r + 2).reverse()); const flat = rows.flat(); return '<div class="page"><h3 style="font-family:sans-serif;color:#64748B">HALAMAN BELAKANG (cetak di balik halaman depan, putar pada sisi panjang) — Definisi</h3><div class="grid">' + flat.map((c) => '<div class="card"><div style="font-size:12.5pt;font-family:sans-serif;line-height:1.45">' + esc(c.d) + "</div></div>").join("") + "</div></div>"; };
  const body = pages.map((pg, i) => frontPage(pg, i) + backPage(pg, i)).join("");
  const htmlDoc = '<!DOCTYPE html><html lang="id"><head><meta charset="utf-8"><title>Flashcard Cetak — MahasiswaTools</title><style>@page{size:A4;margin:11mm}body{font-family:Georgia,serif;margin:0}.grid{display:grid;grid-template-columns:1fr 1fr;gap:9pt}.card{' + cardCss + '}.page{page-break-after:always}h3{font-size:10.5pt;margin:0 0 8pt}</style></head><body>' + body + '<p style="font-family:sans-serif;font-size:9pt;color:#94A3B8">Dibuat dengan MahasiswaTools — Dari Mahasiswa, Untuk Mahasiswa • Cetak halaman depan, balik kertas (sisi panjang), cetak halaman belakang, lalu gunting mengikuti garis putus-putus.</p></body></html>';
  window._flashHtml = htmlDoc;
  window._flashCount = cards.length;
  out.innerHTML = '<div class="' + OUT + '"><p class="font-bold mb-2">✅ ' + cards.length + ' kartu tersusun dalam ' + pages.length + ' set lembar A4 (depan–belakang sejajar untuk cetak bolak-balik).</p>'
    + '<div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">' + cards.slice(0, 8).map((c) => '<div class="rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 p-3 text-center"><div class="text-[10px] font-bold text-brand-500 tracking-widest">ISTILAH</div><div class="font-extrabold text-sm">' + esc(c.t) + '</div><div class="text-[11px] text-slate-500 mt-1">' + esc(c.d.slice(0, 60)) + "…</div></div>").join("") + "</div>"
    + '<div class="flex flex-wrap gap-2"><button class="' + BTN + '" onclick="download(\'Flashcard_Cetak.html\', window._flashHtml, \'text/html\')">⬇️ Download Lembar Cetak (.html)</button>'
    + '<button class="' + BTN2 + '" onclick="unduhFlashTeks()">⬇️ Daftar Teks</button></div>'
    + '<p class="text-xs text-slate-500 mt-2">Buka file .html lalu cetak (Ctrl+P): halaman ganjil = depan kartu, halaman genap = belakangnya — sudah dicerminkan agar istilah & definisi bertemu tepat saat dibalik.</p></div>';
}
function unduhFlashTeks() {
  const lines = $("#fpIn").value.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const txt = lines.map((l, i) => { const p = l.split("|"); return "Kartu " + (i + 1) + ": " + (p[0] || "").trim() + "\nJawab: " + (p.slice(1).join("|") || "").trim(); }).join("\n\n");
  download("Flashcard_Daftar.txt", txt);
}

;

/* === MT-CORE-BEGIN === */
/* ============================================================
   ARSITEKTUR BRIEF: statistik dinamis, Web Share API,
   Back-Button Trap untuk modal, tombol bagikan di modal
   ============================================================ */
(function () {
  const st = document.getElementById("statTools");
  if (st) st.textContent = TOOLS.length + " Tools Akademik";
})();
function toolUrl(id) { const s = (window.TOOL_SLUGS || {})[id]; return s ? "https://mahasiswatools.web.id/tools/" + s + "/" : "https://mahasiswatools.web.id/"; }
async function shareText(title, text) {
  if (navigator.share) { try { await navigator.share({ title: title, text: text }); return; } catch (e) { if (e && e.name === "AbortError") return; } }
  copyText(text, "Hasil disalin — tempel ke WhatsApp/tujuanmu 📋");
}
const SHARE_GETTERS = {
  aidetect: () => window._aiReport,
  scrubber: () => window._scrubClean,
  deklarasi: () => window._deklarasiId,
  buktiketik: () => window._buktiSummary,
  kelompok: () => window._kelompok,
  splitter: () => window._split,
  k30: () => "Jam kosong bersama kelompok kami:\n" + ((window._jamKosong || []).join("\n")),
  k31: () => "Logbook harian (" + logbook.length + " entri) dibuat dengan MahasiswaTools.",
  k50: () => window._motlet,
  kerangkabab: () => window._kerangkaBabTxt,
  k33: () => window._ganttTxt,
  k52: () => "Kalender akademik saya:\n" + calEvents.map((e) => e.date + " — " + e.title).join("\n")
};
let wsOpenState = false, wsHistPushed = false, wsSession = 0, wsClosingSession = -1;
const _openToolReal = openTool;
openTool = function (id) {
  window._curTool = id;
  _openToolReal(id);
  wsSession++;
  wsOpenState = true;
  if (!wsHistPushed) { try { history.pushState({ mtws: 1 }, ""); wsHistPushed = true; } catch (e) {} }
  const sb = document.getElementById("wsShareBtn");
  if (sb) sb.style.display = SHARE_GETTERS[id] ? "" : "none";
  setTimeout(() => { try { mtEnhanceExcel(id); } catch (e) {} }, 260);
};
const _closeWSReal = closeWS;
closeWS = function () {
  if (wsHistPushed) { wsHistPushed = false; wsClosingSession = wsSession; try { history.back(); } catch (e) { _closeWSReal(); wsOpenState = false; } }
  else { _closeWSReal(); wsOpenState = false; }
};
window.addEventListener("popstate", function () {
  if (wsClosingSession !== -1 && wsSession !== wsClosingSession) { wsClosingSession = -1; return; } // popstate basi: sesi baru sudah dibuka setelah penutupan dimulai — abaikan
  wsClosingSession = -1;
  if (wsOpenState) { wsOpenState = false; wsHistPushed = false; _closeWSReal(); }
});
(function () {
  const closeBtn = document.querySelector('#wsPanel button[onclick="closeWS()"]');
  if (!closeBtn || document.getElementById("wsShareBtn")) return;
  const b = document.createElement("button");
  b.id = "wsShareBtn";
  b.className = closeBtn.className;
  b.title = "Bagikan hasil (WhatsApp / lainnya)";
  b.textContent = "📤";
  b.style.display = "none";
  b.onclick = function () {
    const id = window._curTool;
    const get = SHARE_GETTERS[id];
    const text = get ? get() : "";
    shareText("MahasiswaTools", text || ("Saya memakai tool ini di MahasiswaTools — Dari Mahasiswa, Untuk Mahasiswa: " + toolUrl(curTool)));
  };
  closeBtn.parentNode.insertBefore(b, closeBtn);
})();

;

/* === MT-CORE-END === */
/* ============================================================
   TOOL BARU MANDIRI: Word Frequency, Waktu Baca, Kerangka Bab
   ============================================================ */
/* ---------- 13. WORD FREQUENCY ---------- */
const STOPWORDS_ID = new Set("yang dan di ke dari untuk dengan pada adalah ini itu atau juga dalam tidak akan oleh sebagai telah dapat telah bagi para karena antara lebih sudah ada saat telah menjadi tahun tersebut setelah seperti ketika hanya baik secara menggunakan melalui antara hingga sejak selama sebelum sesudah tentang terhadap tanpa atas bawah antara lain sebagainya".split(" "));
UI.wordfreq = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Teks Naskah", '<textarea id="wfIn" rows="9" class="' + IN + '" placeholder="Tempel paragraf/bab skripsimu di sini…"></textarea>')
    + '<div class="grid sm:grid-cols-3 gap-x-4">'
    + field("Jumlah Kata Ditampilkan", '<select id="wfN" class="' + IN + '"><option value="15">15 teratas</option><option value="25" selected>25 teratas</option><option value="40">40 teratas</option></select>')
    + field("Panjang Kata Minimum", '<select id="wfMin" class="' + IN + '"><option value="3">3 huruf</option><option value="4" selected>4 huruf</option><option value="5">5 huruf</option></select>')
    + field("Abaikan Kata Umum (yang, dan, di…)", '<label class="flex items-center gap-2 text-sm font-semibold pt-2"><input id="wfStop" type="checkbox" checked class="w-4 h-4 accent-brand-600"> Ya, saring kata sambung umum</label>')
    + '</div><button class="' + BTN + '" onclick="hitungFrekuensi()">🔁 Analisis Frekuensi Kata</button>' + outBox("wfOut") + "</div>";
};
function hitungFrekuensi() {
  const raw = $("#wfIn").value.toLowerCase();
  const words = raw.match(/[a-zà-ÿ']+/g) || [];
  const minL = Number($("#wfMin").value), useStop = $("#wfStop").checked, topN = Number($("#wfN").value);
  const freq = {};
  words.forEach((w) => { if (w.length >= minL && !(useStop && STOPWORDS_ID.has(w))) freq[w] = (freq[w] || 0) + 1; });
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  const out = $("#wfOut");
  if (!sorted.length) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Tidak ada kata yang memenuhi kriteria — turunkan panjang minimum atau matikan saringan.</div>'; return; }
  const top = sorted.slice(0, topN), max = top[0][1];
  const ulangan = sorted.filter(([, c]) => c >= 5).length;
  window._freqCsv = "Kata;Jumlah;Persentase\n" + sorted.map(([w, c]) => w + ";" + c + ";" + (c / words.length * 100).toFixed(2) + "%").join("\n");
  out.innerHTML = '<div class="' + OUT + '"><div class="flex flex-wrap gap-2 mb-4"><span class="rounded-lg bg-white dark:bg-slate-900 px-3 py-1.5 font-bold">Total kata: ' + words.length.toLocaleString("id-ID") + '</span><span class="rounded-lg bg-white dark:bg-slate-900 px-3 py-1.5 font-bold">Kata unik: ' + sorted.length.toLocaleString("id-ID") + '</span><span class="rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-3 py-1.5 font-bold">⚠️ ' + ulangan + ' kata muncul ≥5× — pertimbangkan sinonim agar naskah tidak monoton</span></div>'
    + '<div class="space-y-1.5">' + top.map(([w, c]) => '<div class="flex items-center gap-3 text-sm"><span class="w-32 font-bold truncate">' + esc(w) + '</span><div class="flex-1 h-4 rounded bg-slate-200 dark:bg-slate-700 overflow-hidden"><div class="h-full bg-gradient-to-r from-brand-500 to-violet-500" style="width:' + Math.round(c / max * 100) + '%"></div></div><span class="w-20 text-right font-semibold">' + c + "× (" + (c / words.length * 100).toFixed(1) + '%)</span></div>').join("") + "</div>"
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="download(\'Frekuensi_Kata.csv\', window._freqCsv, \'text/csv\')">⬇️ Download CSV Lengkap</button></div></div>';
}

/* ---------- 14. KALKULATOR WAKTU BACA ---------- */
UI.bacawaktu = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Naskah Presentasi / Pidato", '<textarea id="bwIn" rows="9" class="' + IN + '" placeholder="Tempel naskah yang akan kamu bacakan…"></textarea>')
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Kecepatan Bicara", '<select id="bwSpeed" class="' + IN + '"><option value="110">🐢 110 kata/menit — sangat tenang (sidang tegang)</option><option value="130" selected>🎤 130 kata/menit — presentasi normal</option><option value="150">💬 150 kata/menit — bicara mengalir</option><option value="170">⚡ 170 kata/menit — cepat (latihan MC)</option></select>')
    + field("Target Durasi (menit, opsional)", '<input id="bwTarget" type="number" min="0" placeholder="cth: 10" class="' + IN + '">')
    + '</div><button class="' + BTN + '" onclick="hitungWaktuBaca()">⏱️ Hitung Durasi Bicara</button>' + outBox("bwOut") + "</div>";
};
function hitungWaktuBaca() {
  const words = ($("#bwIn").value.match(/\S+/g) || []).length;
  const speed = Number($("#bwSpeed").value), target = Number($("#bwTarget").value) || 0;
  const out = $("#bwOut");
  if (!words) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Tempel naskah dulu ya.</div>'; return; }
  const secs = Math.round(words / speed * 60);
  const fmt = (s) => Math.floor(s / 60) + " menit " + String(s % 60).padStart(2, "0") + " detik";
  let saran = "";
  if (target > 0) {
    const ideal = target * speed, diff = words - ideal;
    saran = '<div class="rounded-xl p-4 mt-4 ' + (Math.abs(diff) <= ideal * 0.07 ? "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800" : "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800") + ' text-sm">'
      + (Math.abs(diff) <= ideal * 0.07 ? "✅ Pas! Naskahmu sudah sesuai target " + target + " menit (±7%)." : diff > 0 ? "✂️ Naskah kelebihan <b>" + diff.toLocaleString("id-ID") + " kata</b> dari target " + target + " menit — potong sekitar " + Math.ceil(diff / 25) + " kalimat rata-rata (25 kata) atau naikkan tempo bicara." : "➕ Naskah kurang <b>" + Math.abs(diff).toLocaleString("id-ID") + " kata</b> dari target " + target + " menit — tambahkan contoh, data pendukung, atau penjelasan transisi.") + "</div>";
  }
  window._bacaInfo = { words, secs };
  out.innerHTML = '<div class="' + OUT + '"><div class="grid sm:grid-cols-3 gap-3 text-center">'
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-4"><div class="text-3xl font-extrabold text-brand-600 dark:text-brand-300">' + fmt(secs) + '</div><div class="text-xs text-slate-500">estimasi durasi bicara</div></div>'
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-4"><div class="text-3xl font-extrabold">' + words.toLocaleString("id-ID") + '</div><div class="text-xs text-slate-500">total kata naskah</div></div>'
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-4"><div class="text-3xl font-extrabold">' + speed + '</div><div class="text-xs text-slate-500">kata per menit</div></div></div>' + saran
    + '<p class="text-xs text-slate-500 mt-3">Tips sidang: sisihkan ±15% waktu untuk jeda, ganti slide, dan pertanyaan sela — jadi targetkan naskah selesai di 85% batas waktu.</p></div>';
}

/* ---------- 15. GENERATOR KERANGKA BAB ---------- */
UI.kerangkabab = function (el) {
  el.innerHTML = '<div class="fadein"><div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Judul / Topik Penelitian", '<input id="kbabJud" class="' + IN + '" placeholder="cth: Pengaruh Media Sosial terhadap Prestasi Belajar">')
    + field("Metode Penelitian", '<select id="kbabMet" class="' + IN + '"><option value="kuantitatif">Kuantitatif (survei/eksperimen/korelasi)</option><option value="kualitatif">Kualitatif (studi kasus/fenomenologi/wawancara)</option><option value="rnd">Penelitian & Pengembangan (R&D)</option><option value="ptk">Penelitian Tindakan Kelas (PTK)</option></select>')
    + field("Jenis Dokumen", '<select id="kbabJenis" class="' + IN + '"><option>Skripsi</option><option>Proposal Skripsi</option><option>Makalah</option></select>')
    + '</div><button class="' + BTN + '" onclick="buatKerangkaBab()">🗂️ Generate Kerangka Bab I–V</button>' + outBox("kbabOut") + "</div>";
};
const KERANGKA_BAB = {
  kuantitatif: [
    ["BAB I — PENDAHULUAN", ["Latar Belakang Masalah", "Rumusan Masalah", "Tujuan Penelitian", "Manfaat Penelitian", "Definisi Operasional"], "Bangun urgensi dari data & fenomena, tutup dengan kesenjangan yang akan kamu jawab."],
    ["BAB II — TINJAUAN PUSTAKA", ["Kajian Teori (per variabel)", "Penelitian Terdahulu yang Relevan", "Kerangka Berpikir", "Hipotesis Penelitian"], "Akhiri tiap teori dengan simpulan definisi versimu; hipotesis harus bisa diuji statistik."],
    ["BAB III — METODE PENELITIAN", ["Jenis & Pendekatan Penelitian", "Waktu dan Tempat", "Populasi dan Sampel", "Variabel Penelitian", "Teknik & Instrumen Pengumpulan Data", "Uji Validitas & Reliabilitas", "Teknik Analisis Data"], "Tulis operasional: rumus sampel, skala instrumen, dan uji statistik yang dipakai."],
    ["BAB IV — HASIL DAN PEMBAHASAN", ["Gambaran Umum Objek", "Deskripsi Data per Variabel", "Hasil Uji Instrumen", "Hasil Uji Prasyarat & Hipotesis", "Pembahasan (kaitkan teori + penelitian terdahulu)"], "Sajikan angka dulu secara netral, baru tafsirkan di pembahasan."],
    ["BAB V — PENUTUP", ["Kesimpulan", "Saran"], "Kesimpulan menjawab rumusan masalah satu per satu, tanpa data baru."]
  ],
  kualitatif: [
    ["BAB I — PENDAHULUAN", ["Latar Belakang / Konteks Penelitian", "Fokus & Subfokus Penelitian", "Rumusan Masalah", "Tujuan Penelitian", "Manfaat Penelitian"], "Ceritakan fenomena lapangan secara hidup; fokus adalah lensa pengamatamu."],
    ["BAB II — KAJIAN PUSTAKA", ["Deskripsi Teoretis", "Penelitian Terdahulu yang Relevan", "Kerangka Berpikir Kualitatif"], "Teori berfungsi sebagai pisau analisis, bukan untuk dibuktikan."],
    ["BAB III — METODE PENELITIAN", ["Pendekatan & Jenis Penelitian", "Kehadiran Peneliti", "Lokasi & Subjek/Informan", "Teknik Pengumpulan Data (observasi, wawancara, dokumentasi)", "Teknik Analisis Data (reduksi, penyajian, verifikasi)", "Pemeriksaan Keabsahan Data (triangulasi)"], "Jelaskan cara memilih informan dan teknik triangulasi yang kamu pakai."],
    ["BAB IV — TEMUAN & PEMBAHASAN", ["Gambaran Umum Lokasi", "Paparan Data & Temuan per Fokus", "Pembahasan Temuan (dialog dengan teori)"], "Sisipkan kutipan wawancara sebagai bukti, bukan hiasan."],
    ["BAB V — PENUTUP", ["Kesimpulan", "Saran"], "Angkat esensi temuan, bukan mengulang paparan data."]
  ],
  rnd: [
    ["BAB I — PENDAHULUAN", ["Latar Belakang", "Rumusan Masalah", "Tujuan Pengembangan", "Spesifikasi Produk yang Diharapkan", "Manfaat Pengembangan"], "Tunjukkan kebutuhan nyata di lapangan yang dijawab produkmu."],
    ["BAB II — TINJAUAN PUSTAKA", ["Kajian Teori Produk/Media", "Penelitian Pengembangan Terdahulu", "Kerangka Berpikir Pengembangan"], "Kumpulkan prinsip desain dari teori dan produk sejenis."],
    ["BAB III — METODE PENGEMBANGAN", ["Model Pengembangan (ADDIE/4D/Borg & Gall)", "Prosedur Pengembangan", "Subjek Uji Coba", "Instrumen Pengumpulan Data", "Teknik Analisis Data (validasi ahli & respon pengguna)"], "Tulis tahapan modelmu persis seperti yang kamu jalankan."],
    ["BAB IV — HASIL PENGEMBANGAN", ["Hasil per Tahap Model", "Hasil Validasi Ahli", "Hasil Uji Coba & Revisi Produk", "Pembahasan Kelayakan Produk"], "Dokumentasikan setiap revisi: masukan ahli → perubahan produk."],
    ["BAB V — PENUTUP", ["Kesimpulan", "Saran Pemanfaatan & Pengembangan Lanjutan"], "Nyatakan kelayakan produk berdasarkan data validasi & uji coba."]
  ],
  ptk: [
    ["BAB I — PENDAHULUAN", ["Latar Belakang (kondisi kelas nyata)", "Identifikasi Masalah", "Rumusan Masalah", "Tujuan Penelitian", "Manfaat Penelitian"], "Berangkat dari masalah konkret di kelasmu sendiri, lengkap dengan data awal."],
    ["BAB II — TINJAUAN PUSTAKA", ["Kajian Teori Tindakan/Model Pembelajaran", "Penelitian Terdahulu", "Kerangka Berpikir", "Hipotesis Tindakan"], "Hipotesis tindakan berupa keyakinan perbaikan, bukan uji statistik."],
    ["BAB III — METODE PENELITIAN", ["Setting & Subjek Penelitian", "Desain Siklus (perencanaan, tindakan, observasi, refleksi)", "Instrumen Penelitian", "Indikator Keberhasilan", "Teknik Analisis Data"], "Tetapkan indikator keberhasilan yang terukur sejak awal."],
    ["BAB IV — HASIL & PEMBAHASAN", ["Deskripsi Kondisi Awal (Pra-Siklus)", "Hasil Siklus I + Refleksi", "Hasil Siklus II + Refleksi", "Pembahasan Antar-Siklus"], "Bandingkan capaian antar siklus dengan tabel/grafik yang sama."],
    ["BAB V — PENUTUP", ["Kesimpulan", "Saran"], "Simpulkan apakah indikator keberhasilan tercapai dan di siklus ke berapa."]
  ]
};
function buatKerangkaBab() {
  const jud = $("#kbabJud").value.trim(), met = $("#kbabMet").value, jenis = $("#kbabJenis").value;
  const babs = KERANGKA_BAB[met];
  const lines = [], html = [];
  lines.push("KERANGKA " + jenis.toUpperCase() + (jud ? " — " + jud : "") + " (Metode: " + $("#kbabMet").selectedOptions[0].textContent + ")");
  babs.forEach(([bab, subs, tip]) => {
    lines.push("", bab);
    subs.forEach((s, si) => lines.push(bab.split("—")[0].trim().replace("BAB ", "") + "." + (si + 1) + " " + s));
    lines.push("   Panduan: " + tip);
    html.push('<div class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 mb-3"><h4 class="font-extrabold text-brand-700 dark:text-brand-300">' + bab + '</h4><ol class="list-decimal list-inside text-sm mt-1.5 space-y-1">' + subs.map((s) => "<li>" + esc(s) + "</li>").join("") + '</ol><p class="text-xs text-slate-500 mt-2">💡 ' + esc(tip) + "</p></div>");
  });
  window._kerangkaBabTxt = lines.join("\n");
  window._kerangkaBabDoc = "<html><body style='font-family:serif'><h3>" + esc(lines[0]) + "</h3>" + babs.map(([bab, subs, tip]) => "<h4>" + esc(bab) + "</h4><ol>" + subs.map((s) => "<li>" + esc(s) + "</li>").join("") + "</ol><p><i>Panduan: " + esc(tip) + "</i></p>").join("") + "<p style='font-size:9pt;color:#666'>Dibuat dengan MahasiswaTools — Dari Mahasiswa, Untuk Mahasiswa</p></body></html>";
  $("#kbabOut").innerHTML = '<div class="' + OUT + '">' + html.join("")
    + '<div class="flex flex-wrap gap-2"><button class="' + BTN + '" onclick="copyText(window._kerangkaBabTxt)">📋 Copy Kerangka</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Kerangka_Bab.doc\', window._kerangkaBabDoc, \'application/msword\')">⬇️ Download .doc</button>'
    + '<button class="' + BTN2 + '" onclick="shareText(\'Kerangka Bab Skripsi\', window._kerangkaBabTxt)">📤 Bagikan</button></div></div>';
}

;

/* ============================================================
   TOOL BARU: Gambar→PDF, Ekstrak PDF (UI mandiri),
   Budget+Terbilang gabungan (#55 brief)
   ============================================================ */
/* ---------- 48. KONVERTER GAMBAR KE PDF ---------- */
let imgPdfFiles = [];
UI.imgpdf = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Upload Foto Dokumen (bisa banyak, urutan = urutan halaman)", '<input id="ipFile" type="file" accept="image/*" multiple class="' + IN + '" onchange="ipLoad(this)">')
    + '<div id="ipList" class="text-sm space-y-1 mb-3"></div>'
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Ukuran Halaman", '<select id="ipSize" class="' + IN + '"><option value="a4">A4 (210×297 mm)</option><option value="f4">F4/Folio (210×330 mm)</option><option value="asli">Ikuti ukuran gambar</option></select>')
    + field("Margin Halaman", '<select id="ipMargin" class="' + IN + '"><option value="36">Normal (12,7 mm)</option><option value="18">Tipis (6,4 mm)</option><option value="0">Tanpa margin (penuh)</option></select>')
    + '</div><button class="' + BTN + '" onclick="buatImgPdf()">🖨️ Buat PDF dari Gambar</button> <span id="ipStat" class="text-sm text-slate-500"></span></div>';
};
async function ipLoad(input) {
  imgPdfFiles = [];
  for (const f of [...(input.files || [])]) imgPdfFiles.push(f);
  $("#ipList").innerHTML = imgPdfFiles.map((f, i) => "<div>🖼️ " + (i + 1) + ". " + esc(f.name) + " (" + (f.size / 1024).toFixed(0) + " KB)</div>").join("");
}
async function buatImgPdf() {
  const stat = $("#ipStat");
  if (!imgPdfFiles.length) { stat.textContent = "⚠️ Pilih gambar dulu ya."; return; }
  if (!await loadPdfLib()) { stat.textContent = "❌ Library PDF gagal dimuat."; return; }
  stat.textContent = "⏳ Menyusun PDF…";
  try {
    const doc = await PDFLib.PDFDocument.create();
    const sizes = { a4: [595.28, 841.89], f4: [595.28, 935.43] };
    for (const f of imgPdfFiles) {
      const img = await fileToImage(f);
      const cv = document.createElement("canvas");
      cv.width = img.width; cv.height = img.height;
      cv.getContext("2d").drawImage(img, 0, 0);
      const pngBlob = await canvasBlob(cv);
      const pngBytes = await pngBlob.arrayBuffer();
      const embedded = await doc.embedPng(pngBytes);
      const mode = $("#ipSize").value, margin = Number($("#ipMargin").value);
      let pw, ph;
      if (mode === "asli") { const s = Math.min(1, 595.28 / img.width); pw = img.width * s; ph = img.height * s; }
      else [pw, ph] = sizes[mode];
      const page = doc.addPage([pw, ph]);
      const availW = pw - margin * 2, availH = ph - margin * 2;
      const scale = Math.min(availW / img.width, availH / img.height);
      const w = img.width * scale, h = img.height * scale;
      page.drawImage(embedded, { x: (pw - w) / 2, y: (ph - h) / 2, width: w, height: h });
    }
    const bytes = await doc.save();
    window._imgPdf = new Blob([bytes], { type: "application/pdf" });
    window._imgPdfPages = doc.getPageCount();
    stat.textContent = "✅ PDF jadi: " + doc.getPageCount() + " halaman, " + (bytes.length / 1024).toFixed(0) + " KB.";
    download("Gambar_ke_PDF.pdf", window._imgPdf);
  } catch (e) { stat.textContent = "❌ Gagal: " + e.message; }
}

/* ---------- 49. EKSTRAK HALAMAN PDF (UI mandiri, mesin sama dengan k43) ---------- */
UI.splitpdf = function (el) {
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">Ambil hanya halaman yang kamu butuhkan dari PDF besar — misalnya lembar pengesahan saja dari file skripsi utuh.</p>'
    + field("Pilih Satu File PDF", '<input id="psFile" type="file" accept="application/pdf" class="' + IN + '" onchange="psLoad(this)">')
    + '<p id="psInfo" class="text-sm font-semibold text-slate-500 mb-2"></p>'
    + field("Rentang Halaman", '<input id="psRange" class="' + IN + '" placeholder="cth: 1-3,5,8">', "Format: halaman tunggal (5), rentang (1-3), atau gabungan dipisah koma (1-3,5).")
    + '<button class="' + BTN + '" onclick="pisahPdf()">✂️ Ekstrak Halaman</button> <span id="psStat" class="text-sm text-slate-500"></span></div>';
};

/* ---------- 55. BUDGET + TERBILANG (gabungan sesuai brief) ---------- */
UI.combo55 = function (el) {
  el.innerHTML = '<div class="fadein"><div class="flex gap-2 mb-4">'
    + '<button id="cbTabB" class="rounded-full px-4 py-2 text-sm font-bold bg-brand-600 text-white" onclick="pindahCombo(\'b\')">💰 Budget Anak Kos</button>'
    + '<button id="cbTabT" class="rounded-full px-4 py-2 text-sm font-bold bg-slate-100 dark:bg-slate-800" onclick="pindahCombo(\'t\')">🔢 Terbilang & Romawi</button></div>'
    + '<div id="cbBudget"></div><div id="cbTerbilang" class="hidden"></div></div>';
  UI.budgetkos(document.getElementById("cbBudget"));
  UI.terbilang(document.getElementById("cbTerbilang"));
};
function pindahCombo(which) {
  const b = which === "b";
  document.getElementById("cbBudget").classList.toggle("hidden", !b);
  document.getElementById("cbTerbilang").classList.toggle("hidden", b);
  document.getElementById("cbTabB").className = "rounded-full px-4 py-2 text-sm font-bold " + (b ? "bg-brand-600 text-white" : "bg-slate-100 dark:bg-slate-800");
  document.getElementById("cbTabT").className = "rounded-full px-4 py-2 text-sm font-bold " + (!b ? "bg-brand-600 text-white" : "bg-slate-100 dark:bg-slate-800");
}

;

/* Fungsi pendukung upgrade: logo QR, pie chart, sertifikat PDF */

;

/* ============================================================
   KIT ANTI-AI & KEASLIAN (Tool 60–62)
   ============================================================ */
function splitSentences(text) {
  return (text.replace(/\s+/g, " ").match(/[^.!?…]+[.!?…]+|[^.!?…]+$/g) || []).map((s) => s.trim()).filter((s) => s.length > 1);
}
function kataDari(teks) { return teks.toLowerCase().match(/[a-zà-ÿ']+/g) || []; }

/* ---------- 60. PENDETEKSI GAYA TULISAN AI ---------- */
const KLISE_AI = ["dalam lanskap", "penting untuk dicatat", "secara keseluruhan", "menyelami lebih dalam", "tak dapat dipungkiri", "tidak dapat dipungkiri", "di era digital yang berkembang pesat", "di era digital ini", "krusial", "komprehensif", "delve into", "delve", "testament to", "moreover", "furthermore", "in conclusion", "it is important to note", "plays a vital role", "peran penting dalam", "berperan penting", "seiring berkembangnya", "tidak hanya itu", "dengan demikian dapat disimpulkan bahwa", "hal ini menunjukkan bahwa betapa", "pada akhirnya", "garis bawah", "perlu digarisbawahi bahwa teknologi", "menavigasi", "landscape of", "ever-evolving", "sangat penting bagi kita"];
UI.aidetect = function (el) {
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">Analisis statistik murni di browser (bukan detektor resmi kampus): mengukur ritme kalimat, kekayaan kosakata, dan frasa khas LLM. Teks manusia yang hidup biasanya berirama naik-turun; teks AI cenderung datar dan seragam.</p>'
    + field("Tempel Teks yang Mau Dicek", '<textarea id="aiIn" rows="9" class="' + IN + '" placeholder="Tempel paragraf skripsi / abstrak / esai di sini (minimal ±80 kata agar statistiknya bermakna)…"></textarea>')
    + '<div class="flex flex-wrap gap-2"><button class="' + BTN + '" onclick="analisisAI()">🤖 Analisis Gaya Tulisan</button>'
    + '<button class="' + BTN2 + '" onclick="isiContohAI()">📋 Isi Contoh Teks AI</button></div>' + outBox("aiOut") + "</div>";
};
function isiContohAI() {
  $("#aiIn").value = "Dalam lanskap pendidikan yang terus berkembang, teknologi memainkan peran yang sangat krusial. Penting untuk dicatat bahwa teknologi memberikan dampak yang komprehensif bagi seluruh peserta didik. Secara keseluruhan, teknologi membantu proses pembelajaran menjadi lebih efektif dan efisien. Teknologi juga memberikan kemudahan akses informasi bagi seluruh mahasiswa di berbagai daerah. Selain itu, teknologi memberikan peluang yang besar untuk meningkatkan kualitas pendidikan nasional. Dengan demikian, teknologi merupakan hal yang sangat penting dalam dunia pendidikan modern saat ini. Teknologi memberikan manfaat yang signifikan bagi guru, siswa, dan seluruh masyarakat luas.";
  analisisAI();
}
function analisisAI() {
  const teks = $("#aiIn").value.trim();
  const out = $("#aiOut");
  const words = kataDari(teks);
  const sents = splitSentences(teks);
  if (words.length < 30 || sents.length < 3) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Teks terlalu pendek — butuh minimal ±30 kata dan 3 kalimat agar analisis ritme bermakna.</div>'; return; }
  const lens = sents.map((s) => kataDari(s).length);
  const mean = lens.reduce((a, b) => a + b, 0) / lens.length;
  const sd = Math.sqrt(lens.reduce((a, b) => a + (b - mean) * (b - mean), 0) / lens.length);
  const cv = mean ? sd / mean : 0;
  const uniq = new Set(words).size;
  const ttr = uniq / words.length;
  const low = teks.toLowerCase();
  const kliseHits = [];
  KLISE_AI.forEach((k) => { let idx = low.indexOf(k); while (idx !== -1) { kliseHits.push(k); idx = low.indexOf(k, idx + k.length); } });
  const seragam = lens.filter((l) => Math.abs(l - mean) / mean < 0.2).length / lens.length;
  let skor = 0; const alasan = [];
  if (cv < 0.25) { skor += 35; alasan.push("Ritme kalimat sangat datar (CV " + cv.toFixed(2) + ") — ciri kuat teks mesin."); }
  else if (cv < 0.35) { skor += 25; alasan.push("Variasi panjang kalimat rendah (CV " + cv.toFixed(2) + ") — cenderung monoton."); }
  else if (cv < 0.5) { skor += 12; alasan.push("Variasi kalimat sedang (CV " + cv.toFixed(2) + ")."); }
  else alasan.push("Ritme kalimat hidup dan bervariasi (CV " + cv.toFixed(2) + ") — ciri tulisan manusia.");
  if (ttr < 0.35) { skor += 15; alasan.push("Kosakata banyak berulang (TTR " + ttr.toFixed(2) + ")."); }
  else if (ttr < 0.5) { skor += 8; alasan.push("Kekayaan kosakata sedang (TTR " + ttr.toFixed(2) + ")."); }
  else alasan.push("Kosakata kaya dan beragam (TTR " + ttr.toFixed(2) + ").");
  if (kliseHits.length) { skor += Math.min(30, kliseHits.length * 6); alasan.push(kliseHits.length + " frasa klise AI terdeteksi: " + [...new Set(kliseHits)].slice(0, 6).map((k) => "“" + k + "”").join(", ") + "."); }
  if (seragam > 0.7) { skor += 10; alasan.push(Math.round(seragam * 100) + "% kalimat panjangnya hampir sama persis."); }
  skor = Math.max(0, Math.min(100, skor));
  window._aiScore = skor;
  const level = skor < 30 ? ["RENDAH — Pola Manusiawi", "#059669"] : skor < 60 ? ["SEDANG — Perlu Sentuhan Manusia", "#D97706"] : ["TINGGI — Pola Khas AI", "#DC2626"];
  const sentInfo = sents.map((s, i) => {
    const sl = s.toLowerCase();
    const adaKlise = KLISE_AI.some((k) => sl.includes(k));
    const monoton = Math.abs(lens[i] - mean) / mean < 0.15;
    return { s, len: lens[i], cls: adaKlise ? "klise" : monoton ? "monoton" : "variatif" };
  });
  const bgMap = { variatif: "#BBF7D0", monoton: "#FDE68A", klise: "#FECACA" };
  window._aiReport = "Hasil Analisis Gaya Tulisan (MahasiswaTools)\nSkor risiko pola AI: " + skor + "% — " + level[0] + "\nBurstiness (CV): " + cv.toFixed(2) + " • Type-Token Ratio: " + ttr.toFixed(2) + " • Kalimat: " + sents.length + " • Kata: " + words.length + "\n" + alasan.join("\n");
  out.innerHTML = '<div class="' + OUT + '">'
    + '<div class="grid sm:grid-cols-4 gap-3 text-center mb-4">'
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-4 border-2" style="border-color:' + level[1] + '"><div class="text-3xl font-extrabold" style="color:' + level[1] + '">' + skor + '%</div><div class="text-[11px] font-bold">SKOR RISIKO AI<br>' + level[0] + "</div></div>"
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-4"><div class="text-3xl font-extrabold">' + cv.toFixed(2) + '</div><div class="text-[11px] text-slate-500">BURSTINESS (CV)<br>&lt;0,35 = datar/robotik</div></div>'
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-4"><div class="text-3xl font-extrabold">' + ttr.toFixed(2) + '</div><div class="text-[11px] text-slate-500">TYPE-TOKEN RATIO<br>kata unik ÷ total kata</div></div>'
    + '<div class="rounded-lg bg-white dark:bg-slate-900 p-4"><div class="text-3xl font-extrabold">' + kliseHits.length + '</div><div class="text-[11px] text-slate-500">FRASA KLISE AI<br>ditemukan dalam teks</div></div></div>'
    + '<div class="text-sm space-y-1 mb-4">' + alasan.map((a) => "<p>• " + esc(a) + "</p>").join("") + "</div>"
    + '<h4 class="font-extrabold text-sm mb-1.5">📊 Grafik Panjang Kalimat (kata per kalimat)</h4>'
    + '<div class="flex items-end gap-1 h-24 mb-4" id="aiBars">' + lens.map((l) => '<div title="' + l + ' kata" style="height:' + Math.max(8, Math.round(l / Math.max(...lens) * 100)) + '%;flex:1;background:#4F46E5" class="dark:bg-indigo-400 min-w-[3px]"></div>').join("") + "</div>"
    + '<h4 class="font-extrabold text-sm mb-1.5">🌡️ Sentence Heatmap</h4>'
    + '<p class="text-xs text-slate-500 mb-2"><span class="px-1.5 py-0.5 rounded" style="background:#BBF7D0;color:#000">Hijau: variatif</span> <span class="px-1.5 py-0.5 rounded" style="background:#FDE68A;color:#000">Kuning: monoton</span> <span class="px-1.5 py-0.5 rounded" style="background:#FECACA;color:#000">Merah: klise AI / robotik</span></p>'
    + '<p class="leading-loose text-[15px] bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">' + sentInfo.map((x) => '<span style="background:' + bgMap[x.cls] + ';color:#000" class="rounded px-1" title="' + x.len + ' kata">' + esc(x.s) + "</span>").join(" ") + "</p>"
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="copyText(window._aiReport)">📋 Copy Laporan</button>'
    + '<button class="' + BTN2 + '" onclick="openTool(\'humanizer\')">🪶 Perbaiki di Humanizer</button></div>'
    + '<p class="text-[11px] text-slate-500 mt-3">Catatan jujur: ini indikator statistik lokal, BUKAN vonis. Teks manusia yang sangat rapi pun bisa terflag; gunakan sebagai cermin untuk memperkaya ritme tulisanmu sendiri.</p></div>';
}

/* ---------- 61. HUMANIZER & EDITOR VARIASI KALIMAT ---------- */
const SINONIM = {
  "krusial": ["penting", "menentukan", "mendasar"], "komprehensif": ["menyeluruh", "lengkap", "utuh"],
  "signifikan": ["nyata", "berarti", "cukup besar"], "optimal": ["terbaik", "maksimal", "ideal"],
  "efektif": ["berhasil guna", "tepat sasaran", "manjur"], "efisien": ["hemat", "tepat guna", "praktis"],
  "menggunakan": ["memakai", "menerapkan", "memanfaatkan"], "melakukan": ["menjalankan", "melaksanakan", "menggelar"],
  "mendapatkan": ["memperoleh", "meraih", "mengantongi"], "menunjukkan": ["memperlihatkan", "mengindikasikan", "menandakan"],
  "memberikan": ["menyuguhkan", "menghadirkan", "menyalurkan"], "merupakan": ["adalah", "menjadi", "tergolong"],
  "memiliki": ["mempunyai", "menyimpan", "mengantongi"], "membantu": ["menunjang", "mendukung", "mempermudah"],
  "membuat": ["menciptakan", "menghasilkan", "menyusun"], "melihat": ["mengamati", "mencermati", "meninjau"],
  "sangat": ["amat", "begitu", "sungguh"], "banyak": ["sejumlah", "beragam", "tidak sedikit"],
  "penting": ["utama", "pokok", "sentral"], "besar": ["luas", "masif", "cukup besar"],
  "baik": ["positif", "memadai", "layak"], "baru": ["terkini", "mutakhir", "anyar"],
  "cepat": ["sigap", "lekas", "tanggap"], "mudah": ["gampang diakses", "praktis", "sederhana"],
  "meningkatkan": ["mengangkat", "mendongkrak", "menggenjot"], "menurunkan": ["menekan", "memangkas", "mereduksi"],
  "berperan": ["berkontribusi", "ambil bagian", "turut menentukan"], "berdampak": ["berimbas", "berpengaruh", "membawa efek"],
  "selain itu": ["di sisi lain", "lebih lanjut", "tak hanya itu"], "oleh karena itu": ["maka dari itu", "sebab itu", "konsekuensinya"],
  "dengan demikian": ["dengan begitu", "alhasil", "hasilnya"], "pada dasarnya": ["pada intinya", "sejatinya", "hakikatnya"],
  "secara keseluruhan": ["pada intinya", "secara umum", "garis besarnya"], "dalam hal ini": ["dalam konteks ini", "pada kasus ini", "di titik ini"],
  "hal ini": ["kondisi ini", "fenomena ini", "keadaan ini"], "tersebut": ["itu", "yang dimaksud", "terkait"],
  "dilakukan": ["dijalankan", "digelar", "dilaksanakan"], "dapat": ["bisa", "mampu", "sanggup"],
  "akan": ["bakal", "nantinya", "hendak"], "juga": ["pun", "turut", "sekaligus"],
  "namun": ["tetapi", "akan tetapi", "meski begitu"], "sehingga": ["alhasil", "sampai-sampai", "yang membuat"],
  "karena": ["sebab", "lantaran", "mengingat"], "untuk": ["guna", "demi", "buat"],
  "dalam": ["di", "pada", "di dalam"], "utama": ["pokok", "primer", "sentral"],
  "khusus": ["spesifik", "tertentu", "istimewa"], "umum": ["publik", "khalayak", "masyarakat luas"],
  "perlu": ["butuh", "memerlukan", "wajib"], "delve": ["menelaah", "mengkaji", "menguliti"], "moreover": ["selain itu", "lebih jauh", "ditambah lagi"]
};
UI.humanizer = function (el) {
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">Pecah teksmu jadi editor per kalimat: pantau ritme panjang kalimat, terima saran pecah/gabung otomatis, dan ganti kata klise AI dengan satu klik. Kamu tetap penulisnya — tool ini hanya penata ritme.</p>'
    + field("Teks Awal", '<textarea id="hmIn" rows="6" class="' + IN + '" placeholder="Tempel paragraf yang mau dirapikan ritmenya…"></textarea>')
    + '<button class="' + BTN + '" onclick="muatEditorKalimat()">🪶 Muat ke Editor Kalimat</button>'
    + '<div id="hmSaran" class="mt-4"></div><div id="hmRows" class="mt-2 space-y-2"></div>'
    + '<div id="hmAksi" class="hidden mt-4 flex flex-wrap gap-2"><button class="' + BTN + '" onclick="gabungHasilHumanizer()">✅ Gabungkan Hasil</button></div>'
    + outBox("hmOut") + "</div>";
};
let hmSents = [];
function muatEditorKalimat() {
  hmSents = splitSentences($("#hmIn").value);
  const wrap = $("#hmRows");
  if (hmSents.length < 2) { wrap.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Butuh minimal 2 kalimat.</div>'; $("#hmSaran").innerHTML = ""; return; }
  wrap.innerHTML = hmSents.map((s, i) => renderBarisKalimat(s, i)).join("");
  $("#hmAksi").classList.remove("hidden");
  analisisRitmeKalimat();
  wrap.querySelectorAll("textarea").forEach((ta) => ta.addEventListener("input", () => { perbaruiHitungBaris(ta); analisisRitmeKalimat(); }));
}
function kataKunciDi(teks) {
  const low = " " + teks.toLowerCase() + " ";
  return Object.keys(SINONIM).filter((k) => low.includes(" " + k + " ") || low.includes(" " + k + ",") || low.includes(" " + k + ".") || teks.toLowerCase().includes(k) && (k.includes(" ") || k.length > 5));
}
function renderBarisKalimat(s, i) {
  const n = kataDari(s).length;
  const kws = [...new Set(kataKunciDi(s))].slice(0, 4);
  const chips = kws.map((k) => '<button class="rounded-full bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 px-2 py-0.5 text-[11px] font-bold" onclick="gantiSinonim(this,' + i + ',\'' + k.replace(/'/g, "") + '\')" title="Klik untuk mengganti dengan sinonim natural">🔁 ' + esc(k) + " → " + esc(SINONIM[k][0]) + "</button>").join(" ");
  return '<div class="rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 p-3">'
    + '<div class="flex items-center gap-2 mb-1.5"><span class="text-[11px] font-extrabold bg-slate-900 text-white dark:bg-indigo-600 dark:text-white rounded px-1.5 py-0.5">K' + (i + 1) + '</span>'
    + '<span class="text-[11px] font-bold text-slate-500" data-count="' + i + '">' + n + ' kata</span>'
    + '<span class="flex flex-wrap gap-1 ml-auto">' + chips + "</span></div>"
    + '<textarea data-row="' + i + '" rows="2" class="w-full bg-transparent outline-none text-[15px] leading-relaxed resize-y">' + esc(s) + "</textarea></div>";
}
function perbaruiHitungBaris(ta) {
  const i = ta.getAttribute("data-row");
  const badge = document.querySelector('[data-count="' + i + '"]');
  if (badge) badge.textContent = kataDari(ta.value).length + " kata";
}
function gantiSinonim(btn, i, kata) {
  const ta = document.querySelector('textarea[data-row="' + i + '"]');
  if (!ta) return;
  const alts = SINONIM[kata] || [];
  const cur = btn.getAttribute("data-alt") ? Number(btn.getAttribute("data-alt")) + 1 : 0;
  const pilihan = alts[cur % alts.length];
  const re = new RegExp(kata.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  ta.value = ta.value.replace(re, (m) => (m[0] === m[0].toUpperCase() ? pilihan[0].toUpperCase() + pilihan.slice(1) : pilihan));
  btn.setAttribute("data-alt", cur);
  btn.innerHTML = "🔁 " + esc(kata) + " → " + esc(alts[(cur + 1) % alts.length]);
  perbaruiHitungBaris(ta); analisisRitmeKalimat();
}
function analisisRitmeKalimat() {
  const rows = [...document.querySelectorAll("#hmRows textarea")];
  if (rows.length < 2) return;
  const lens = rows.map((r) => kataDari(r.value).length);
  const saran = [];
  for (let i = 0; i + 2 < lens.length; i++) {
    const trio = [lens[i], lens[i + 1], lens[i + 2]];
    if (Math.max(...trio) - Math.min(...trio) <= 3) saran.push("⚠️ Kalimat K" + (i + 1) + "–K" + (i + 3) + " panjangnya mirip (" + trio.join("-") + " kata) — pecah salah satu jadi 2 kalimat pendek, atau gabungkan dua di antaranya, agar ritme tidak robotik.");
  }
  lens.forEach((l, i) => { if (l > 38) saran.push("✂️ Kalimat K" + (i + 1) + " sangat panjang (" + l + " kata) — pertimbangkan memecahnya di kata hubung terdekat."); });
  if (!saran.length) saran.push("✅ Ritme kalimatmu sudah bervariasi — tidak ada pola monoton yang terdeteksi.");
  window._hmSaran = saran;
  $("#hmSaran").innerHTML = '<div class="' + OUT + '"><h4 class="font-extrabold text-sm mb-1.5">🎵 Analisis Ritme</h4>' + saran.map((s) => '<p class="text-sm py-0.5">' + esc(s) + "</p>").join("") + "</div>";
}
function gabungHasilHumanizer() {
  const rows = [...document.querySelectorAll("#hmRows textarea")];
  window._humanized = rows.map((r) => r.value.trim()).filter(Boolean).join(" ");
  const n = kataDari(window._humanized).length;
  $("#hmOut").innerHTML = '<div class="' + OUT + '"><h4 class="font-extrabold text-sm mb-1.5">Hasil Gabungan (' + n + ' kata)</h4>'
    + '<p class="leading-relaxed bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">' + esc(window._humanized) + "</p>"
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="' + BTN + '" onclick="copyText(window._humanized)">📋 Copy Teks Hasil</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Teks_Terhumanisasi.doc\', \'<html><body style=&quot;font-family:serif&quot;><p>\' + esc(window._humanized) + \'</p><p style=&quot;font-size:9pt;color:#666&quot;>Dirapikan ritmenya dengan MahasiswaTools — Dari Mahasiswa, Untuk Mahasiswa</p></body></html>\', \'application/msword\')">⬇️ Download .doc</button></div></div>';
}

/* ---------- 62. PEMBERSIH JEJAK & KARAKTER TERSEMBUNYI AI ---------- */
const ARTEFAK = [
  { k: "zwsp", n: "Zero-Width Space (U+200B)", re: /\u200B/g },
  { k: "zwnj", n: "Zero-Width Non-Joiner (U+200C)", re: /\u200C/g },
  { k: "zwj", n: "Zero-Width Joiner (U+200D)", re: /\u200D/g },
  { k: "wj", n: "Word Joiner (U+2060)", re: /\u2060/g },
  { k: "bom", n: "BOM / Zero-Width No-Break Space (U+FEFF)", re: /\uFEFF/g },
  { k: "nbsp", n: "Non-Breaking Space (U+00A0)", re: /\u00A0/g },
  { k: "emdash", n: "Em-Dash khas AI (—)", re: /—/g },
  { k: "smq", n: "Kutip Melengkung “ ” ‘ ’", re: /[“”‘’]/g },
  { k: "md", n: "Sisa Sintaks Markdown (** ## ` ~~)", re: /(\*\*|##|~~|`)/g }
];
UI.scrubber = function (el) {
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">Teks hasil copy-paste dari chatbot sering membawa karakter tak terlihat (zero-width) dan sisa format Markdown. Pindai, lihat laporannya, lalu bersihkan jadi teks standar Microsoft Word dalam 1 klik.</p>'
    + field("Tempel Teks dari Chatbot / AI", '<textarea id="scIn" rows="8" class="' + IN + '" placeholder="Tempel teks hasil copy-paste di sini…"></textarea>')
    + '<div class="flex flex-wrap gap-2"><button class="' + BTN + '" onclick="pindaiArtefak()">🔍 Pindai Artefak</button>'
    + '<button class="' + BTN2 + '" onclick="bersihkanArtefak()">🧽 Bersihkan Semuanya</button></div>'
    + '<div id="scReport" class="mt-4"></div>'
    + field("Hasil Bersih (Standar Word)", '<textarea id="scOut" rows="8" readonly class="' + IN + '"></textarea>')
    + '<div class="flex flex-wrap gap-2"><button class="' + BTN + '" onclick="copyText(window._scrubClean || \'\')">📋 Copy Teks Bersih</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Teks_Bersih.txt\', window._scrubClean || \'\', \'text/plain\')">⬇️ Download .txt</button></div></div>';
};
function hitungArtefak(teks) {
  const hasil = {};
  ARTEFAK.forEach((a) => { hasil[a.k] = (teks.match(a.re) || []).length; });
  return hasil;
}
function pindaiArtefak() {
  const teks = $("#scIn").value;
  const c = hitungArtefak(teks);
  window._scrubReport = c;
  const total = Object.values(c).reduce((a, b) => a + b, 0);
  window._scrubTotal = total;
  $("#scReport").innerHTML = '<div class="' + OUT + '"><h4 class="font-extrabold text-sm mb-2">🧾 Laporan Artefak: <span class="' + (total ? "text-rose-600" : "text-emerald-600") + '">' + total + ' artefak ditemukan</span></h4>'
    + '<div class="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">' + ARTEFAK.map((a) => '<div class="flex justify-between border-b border-dashed border-slate-300 dark:border-slate-600 py-1"><span>' + a.n + '</span><b class="' + (c[a.k] ? "text-rose-600" : "text-slate-400") + '">' + c[a.k] + "×</b></div>").join("") + "</div>"
    + (total ? '<p class="text-xs text-slate-500 mt-2">Klik “Bersihkan Semuanya” untuk menormalkan: zero-width dihapus, NBSP jadi spasi biasa, em-dash jadi tanda hubung, kutip melengkung diluruskan, dan sintaks Markdown dibuang.</p>' : '<p class="text-xs text-emerald-600 mt-2 font-semibold">Teks ini bersih dari artefak copy-paste yang umum. ✅</p>') + "</div>";
}
function bersihkanArtefak() {
  let t = $("#scIn").value;
  pindaiArtefak();
  t = t.replace(/[\u200B\u200C\u200D\u2060\uFEFF]/g, "")
    .replace(/\u00A0/g, " ")
    .replace(/[“”]/g, '"').replace(/[‘’]/g, "'")
    .replace(/\s*—\s*/g, " - ").replace(/–/g, "-")
    .replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1")
    .replace(/~~(.+?)~~/g, "$1").replace(/`{1,3}/g, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[ \t]{2,}/g, " ");
  window._scrubClean = t;
  $("#scOut").value = t;
  toast("Teks dibersihkan — " + (window._scrubTotal || 0) + " artefak dinormalkan 🧽");
}

;

/* ============================================================
   KIT ANTI-AI & KEASLIAN (Tool 63–65)
   ============================================================ */
/* ---------- 63. VERIFIKATOR KEASLIAN DAFTAR PUSTAKA ---------- */
UI.sitasi = function (el) {
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">AI sering mengarang referensi yang terdengar meyakinkan tapi tidak pernah ada. Tempel daftar pustakamu (1 sitasi per baris) — tiap baris dicek langsung ke basis data <b>Crossref</b> (gratis, tanpa kunci API). Butuh internet.</p>'
    + field("Daftar Pustaka (1 sitasi per baris)", '<textarea id="ctIn" rows="7" class="' + IN + '" placeholder="Sugiyono. (2019). Metode Penelitian Kuantitatif, Kualitatif, dan R&D. Bandung: Alfabeta.&#10;Smith, J. (2021). The impact of social media on learning. Journal of Education, 10(2), 123-135. https://doi.org/10.xxxx/xxxxx"></textarea>')
    + '<button class="' + BTN + '" onclick="verifikasiSitasi()">🔎 Verifikasi Semua ke Crossref</button> <span id="ctStat" class="text-sm text-slate-500"></span>'
    + '<div id="ctOut" class="mt-4 space-y-3"></div></div>';
};
function kemiripanJudul(judul, baris) {
  const tok = (s) => new Set(kataDari(s).filter((w) => w.length > 2));
  const a = tok(judul), b = tok(baris);
  if (!a.size || !b.size) return 0;
  let sama = 0; a.forEach((w) => { if (b.has(w)) sama++; });
  return sama / a.size;
}
async function fetchCrossref(url) {
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 12000);
  try {
    const r = await fetch(url, { signal: ctrl.signal, headers: { "Accept": "application/json" } });
    if (!r.ok) throw new Error("HTTP " + r.status);
    return await r.json();
  } finally { clearTimeout(to); }
}
async function verifikasiSitasi() {
  const lines = $("#ctIn").value.split(/\n/).map((s) => s.trim()).filter((s) => s.length > 12);
  const out = $("#ctOut"), stat = $("#ctStat");
  if (!lines.length) { stat.textContent = "⚠️ Tempel minimal satu sitasi yang cukup panjang."; return; }
  window._sitasiResults = [];
  out.innerHTML = "";
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    stat.textContent = "⏳ Memeriksa " + (i + 1) + "/" + lines.length + "…";
    const doiMatch = line.match(/10\.\d{4,9}\/[^\s,;]+/);
    let res = { line, status: "offline", title: "", journal: "", year: "", doi: doiMatch ? doiMatch[0].replace(/[.)]+$/, "") : "", sim: 0 };
    try {
      let item = null;
      if (res.doi) {
        const j = await fetchCrossref("https://api.crossref.org/works/" + encodeURIComponent(res.doi));
        item = j && j.message;
      } else {
        const j = await fetchCrossref("https://api.crossref.org/works?rows=1&query.bibliographic=" + encodeURIComponent(line));
        item = j && j.message && j.message.items && j.message.items[0];
      }
      if (item) {
        res.title = (item.title && item.title[0]) || "";
        res.journal = (item["container-title"] && item["container-title"][0]) || "";
        const dp = (item.published && item.published["date-parts"]) || (item.issued && item.issued["date-parts"]);
        res.year = dp && dp[0] && dp[0][0] ? String(dp[0][0]) : "";
        res.doi = item.DOI || res.doi;
        res.sim = Math.round(kemiripanJudul(res.title, line) * 100);
        res.status = res.doi && doiMatch ? "verified" : res.sim >= 50 ? "verified" : res.sim >= 28 ? "low" : "notfound";
      } else res.status = "notfound";
    } catch (e) { res.status = "offline"; }
    window._sitasiResults.push(res);
    out.innerHTML += kartuSitasi(res);
  }
  const v = window._sitasiResults.filter((r) => r.status === "verified").length;
  stat.textContent = "✅ Selesai: " + v + "/" + lines.length + " terverifikasi di Crossref.";
}
function kartuSitasi(r) {
  const conf = {
    verified: ["✅ TERVERIFIKASI DI CROSSREF", "#059669"],
    low: ["🟡 MIRIP SEBAGIAN — PERIKSA MANUAL", "#D97706"],
    notfound: ["⚠️ TIDAK DITEMUKAN — POTENSI HALUSINASI AI", "#DC2626"],
    offline: ["🌐 TIDAK BISA DIVERIFIKASI (OFFLINE/JARINGAN)", "#64748B"]
  }[r.status];
  return '<div class="' + OUT + '" style="margin-top:0"><p class="font-extrabold text-[13px]" style="color:' + conf[1] + '">' + conf[0] + (r.status === "verified" || r.status === "low" ? " — kemiripan judul " + r.sim + "%" : "") + "</p>"
    + '<p class="text-sm mt-1"><b>Sitasi kamu:</b> ' + esc(r.line) + "</p>"
    + (r.title ? '<p class="text-sm mt-1"><b>Rekor Crossref:</b> ' + esc(r.title) + (r.journal ? " — <i>" + esc(r.journal) + "</i>" : "") + (r.year ? " (" + esc(r.year) + ")" : "") + (r.doi ? '<br>DOI: <a class="underline font-semibold" target="_blank" rel="noopener" href="https://doi.org/' + esc(r.doi) + '">' + esc(r.doi) + "</a>" : "") + "</p>" : "")
    + (r.status === "notfound" ? '<p class="text-xs text-rose-600 mt-1 font-semibold">Tidak ada rekor yang cocok di Crossref. Jangan cantumkan referensi ini sebelum kamu memegang bukti fisik/digitalnya — bisa jadi karangan AI.</p>' : "")
    + (r.status === "offline" ? '<p class="text-xs text-slate-500 mt-1">Koneksi ke api.crossref.org gagal. Status ini BUKAN vonis halusinasi — coba lagi saat online.</p>' : "") + "</div>";
}

/* ---------- 64. GENERATOR DEKLARASI PENGGUNAAN AI ---------- */
const PENGGUNAAN_AI = [
  ["brainstorm", "Brainstorming & pengembangan ide/topik awal"],
  ["outline", "Penyusunan kerangka/outline tulisan"],
  ["grammar", "Perapian tata bahasa, ejaan & PUEBI"],
  ["translate", "Penerjemahan abstrak/teks (hasil akhir ditelaah ulang penulis)"],
  ["literatur", "Penelusuran awal & peringkasan literatur untuk dipelajari"],
  ["data", "Bantuan pengolahan data / rumus / visualisasi"],
  ["debug", "Bantuan debugging kode program atau rumus"],
  ["parafrase", "Parafrase terbatas dengan penulisan ulang penuh oleh penulis"]
];
UI.deklarasi = function (el) {
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">Mengakui penggunaan AI secara terbuka adalah standar etika akademik modern (kampus & jurnal internasional memintanya). Centang yang benar-benar kamu lakukan — deklarasi jujur melindungi kamu, bukan menjatuhkan.</p>'
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Nama Lengkap", '<input id="dkNama" class="' + IN + '" placeholder="cth: Detta Pranata">')
    + field("NIM / NPM", '<input id="dkNim" class="' + IN + '" placeholder="cth: 2021001234">')
    + field("Judul Skripsi / Artikel", '<input id="dkJudul" class="' + IN + '" placeholder="Judul lengkap karya kamu">')
    + field("Kampus / Institusi", '<input id="dkKampus" class="' + IN + '" placeholder="cth: Universitas …">')
    + "</div>"
    + '<p class="text-sm font-bold mt-1 mb-2">AI dipakai untuk apa saja? (centang yang jujur)</p>'
    + '<div class="grid sm:grid-cols-2 gap-2 mb-4">' + PENGGUNAAN_AI.map(([k, label]) => '<label class="flex items-start gap-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm font-semibold cursor-pointer"><input type="checkbox" class="dkUse mt-0.5 w-4 h-4 accent-black" value="' + k + '"> ' + label + "</label>").join("") + "</div>"
    + field("Nama Alat AI yang Dipakai", '<input id="dkAlat" class="' + IN + '" placeholder="cth: ChatGPT, Gemini, Grammarly" value="ChatGPT / Gemini">')
    + '<button class="' + BTN + '" onclick="buatDeklarasi()">📜 Buat Deklarasi (ID + EN)</button>' + outBox("dkOut") + "</div>";
};
function buatDeklarasi() {
  const nama = $("#dkNama").value.trim() || "[Nama]", nim = $("#dkNim").value.trim() || "[NIM]", judul = $("#dkJudul").value.trim() || "[Judul]", kampus = $("#dkKampus").value.trim() || "[Kampus]", alat = $("#dkAlat").value.trim() || "alat AI generatif";
  const dipilih = PENGGUNAAN_AI.filter(([k]) => document.querySelector('.dkUse[value="' + k + '"]').checked);
  const tgl = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const daftarId = dipilih.length ? dipilih.map(([, l], i) => (i + 1) + ". " + l).join("\n") : "(tidak ada penggunaan AI yang dinyatakan)";
  const daftarEn = dipilih.length ? dipilih.map(([, l], i) => (i + 1) + ". " + l).join("\n") : "(no AI use declared)";
  window._deklarasiId = "PERNYATAAN PENGGUNAAN KECERDASAN BUATAN (AI)\n\nSaya yang bertanda tangan di bawah ini:\nNama\t: " + nama + "\nNIM\t: " + nim + "\nInstitusi\t: " + kampus + "\nJudul Karya\t: " + judul + "\n\nDengan ini menyatakan secara jujur bahwa dalam penyusunan karya tersebut saya menggunakan bantuan alat kecerdasan buatan (" + alat + ") sebatas untuk keperluan berikut:\n" + daftarId + "\n\nSeluruh gagasan, analisis, argumen, dan kesimpulan dalam karya ini adalah hasil pemikiran saya sendiri. Setiap keluaran AI telah saya telaah, verifikasi, dan tulis ulang dengan bahasa saya. Saya bertanggung jawab penuh atas keaslian, keakuratan, dan integritas karya ini, serta bersedia menerima konsekuensi akademik apabila pernyataan ini tidak benar.\n\nDibuat pada: " + tgl + "\n\nYang menyatakan,\n\n\n(" + nama + ")\nNIM. " + nim;
  window._deklarasiEn = "DECLARATION OF AI USE\n\nI, the undersigned:\nName\t: " + nama + "\nStudent ID\t: " + nim + "\nInstitution\t: " + kampus + "\nManuscript\t: " + judul + "\n\nI hereby honestly declare that, in preparing this work, I used generative AI tools (" + alat + ") solely for the following purposes:\n" + daftarEn + "\n\nAll ideas, analyses, arguments, and conclusions in this work are my own. Every AI output was critically reviewed, verified, and rewritten in my own words. I take full responsibility for the originality, accuracy, and integrity of this work, in line with the AI disclosure policies of international publishers (e.g., Scopus-indexed journals and IEEE).\n\nDeclared on: " + new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) + "\n\nSigned,\n\n\n(" + nama + ")\nID. " + nim;
  window._deklarasiDoc = "<html><body style='font-family:serif'>" + kopLogoHtml("center") + "<pre style='white-space:pre-wrap;font-family:serif'>" + esc(window._deklarasiId) + "</pre><hr><pre style='white-space:pre-wrap;font-family:serif'>" + esc(window._deklarasiEn) + "</pre><p style='font-size:9pt;color:#666'>Dibuat dengan MahasiswaTools — Dari Mahasiswa, Untuk Mahasiswa</p></body></html>";
  $("#dkOut").innerHTML = '<div class="' + OUT + '"><h4 class="font-extrabold text-sm mb-2">🇮🇩 Versi Skripsi Kampus (Indonesia)</h4>'
    + '<div class="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700 text-sm whitespace-pre-wrap leading-relaxed">' + esc(window._deklarasiId) + "</div>"
    + '<h4 class="font-extrabold text-sm mt-5 mb-2">🌍 International Journal Version (English — Scopus/IEEE style)</h4>'
    + '<div class="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700 text-sm whitespace-pre-wrap leading-relaxed">' + esc(window._deklarasiEn) + "</div>"
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="copyText(window._deklarasiId)">📋 Copy Versi ID</button>'
    + '<button class="' + BTN2 + '" onclick="copyText(window._deklarasiEn)">📋 Copy English Version</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Deklarasi_Penggunaan_AI.doc\', window._deklarasiDoc, \'application/msword\')">⬇️ Download .doc (2 Bahasa)</button></div></div>';
}

/* ---------- 65. EDITOR BUKTI KETIKAN MANDIRI ---------- */
let bk = null;
function muatBukti() {
  bk = store.get("mt_bukti_v1", null) || { doc: "", text: "", keys: 0, back: 0, pastes: 0, pasteChars: 0, typedChars: 0, activeSec: 0, start: Date.now(), lastAct: 0, snaps: [] };
  window._buktiState = bk;
  return bk;
}
function simpanBukti() { store.set("mt_bukti_v1", bk); }
UI.buktiketik = function (el) {
  muatBukti();
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">Ketik naskahmu di sini secara bertahap — prosesnya terekam lokal (ketukan, koreksi, tempelan, waktu aktif, snapshot berkala) sebagai bukti autentik untuk dosen pembimbing bahwa tulisan ini hasil ketikanmu sendiri. Semua data hanya tersimpan di browser ini.</p>'
    + field("Nama Dokumen / Bab", '<input id="bkDoc" class="' + IN + '" placeholder="cth: BAB I — Pendahuluan" value="' + esc(bk.doc) + '">')
    + field("Area Ketik Naskah", '<textarea id="bkText" rows="10" class="' + IN + '" placeholder="Mulai mengetik di sini… (teks & statistik tersimpan otomatis)">' + esc(bk.text) + "</textarea>")
    + '<div id="bkStat" class="mt-3"></div>'
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="' + BTN + '" onclick="eksporSertifikatBukti()">🏅 Ekspor Sertifikat Bukti (.doc)</button>'
    + '<button class="' + BTN2 + '" onclick="resetBukti()">🗑️ Reset Bukti & Mulai Dokumen Baru</button></div>'
    + '<p class="text-[11px] text-slate-500 mt-2">Snapshot otomatis tersimpan tiap 10 detik saat ada perubahan. Rasio tempel yang rendah + koreksi yang wajar + pengerjaan bertahap = profil penulisan manusia yang meyakinkan.</p></div>';
  renderStatBukti();
  const docIn = $("#bkDoc"), ta = $("#bkText");
  docIn.addEventListener("input", () => { bk.doc = docIn.value; simpanBukti(); });
  ta.addEventListener("keydown", (e) => {
    bk.keys++; bk.lastAct = Date.now();
    if (e.key === "Backspace" || e.key === "Delete") bk.back++;
    else if (e.key && e.key.length === 1) bk.typedChars++;
    simpanBukti();
  });
  ta.addEventListener("paste", (e) => {
    const t = (e.clipboardData || window.clipboardData).getData("text") || "";
    bk.pastes++; bk.pasteChars += t.length; bk.lastAct = Date.now(); simpanBukti(); renderStatBukti();
  });
  ta.addEventListener("input", () => { bk.text = ta.value; bk.lastAct = Date.now(); simpanBukti(); renderStatBukti(); });
  if (window._bkTick) clearInterval(window._bkTick);
  if (window._bkSnap) clearInterval(window._bkSnap);
  window._bkTick = setInterval(() => { if (bk && Date.now() - bk.lastAct < 4000 && $("#bkText")) { bk.activeSec++; simpanBukti(); renderStatBukti(); } }, 1000);
  window._bkSnap = setInterval(() => { snapshotBukti(false); }, 10000);
};
function snapshotBukti(force) {
  if (!bk) return;
  const chars = (bk.text || "").length;
  const last = bk.snaps[bk.snaps.length - 1];
  if (!force && last && last.chars === chars) return;
  bk.snaps.push({ t: Date.now(), chars, keys: bk.keys });
  if (bk.snaps.length > 240) bk.snaps = bk.snaps.slice(-240);
  simpanBukti();
}
function fmtDurasi(sec) { const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60; return (h ? h + " jam " : "") + m + " mnt " + s + " dtk"; }
function renderStatBukti() {
  const box = $("#bkStat"); if (!box || !bk) return;
  const kata = kataDari(bk.text || "").length;
  const totalCharInput = bk.typedChars + bk.pasteChars;
  const rasioTempel = totalCharInput ? Math.round(bk.pasteChars / totalCharInput * 100) : 0;
  window._buktiSummary = "Bukti Ketikan Mandiri — " + (bk.doc || "Dokumen") + ": " + kata + " kata, " + bk.keys + " ketukan, " + bk.back + " koreksi, waktu aktif " + fmtDurasi(bk.activeSec) + ", rasio tempel " + rasioTempel + "%.";
  const cell = (v, l) => '<div class="rounded-lg bg-white dark:bg-slate-900 p-3 text-center border-2 border-slate-200 dark:border-slate-700"><div class="text-xl font-extrabold">' + v + '</div><div class="text-[10.5px] text-slate-500 font-bold">' + l + "</div></div>";
  box.innerHTML = '<div class="grid grid-cols-3 sm:grid-cols-6 gap-2">'
    + cell(fmtDurasi(bk.activeSec), "WAKTU AKTIF") + cell(bk.keys.toLocaleString("id-ID"), "TOTAL KETUKAN") + cell(bk.back.toLocaleString("id-ID"), "KOREKSI (BKSP)")
    + cell(bk.pastes + "× / " + bk.pasteChars + " kar", "TEMPELAN (PASTE)") + cell(rasioTempel + "%", "RASIO TEMPEL") + cell(kata.toLocaleString("id-ID"), "KATA SAAT INI") + "</div>"
    + '<p class="text-[11px] text-slate-500 mt-2">📸 Snapshot tersimpan: ' + bk.snaps.length + " titik • Mulai: " + new Date(bk.start).toLocaleString("id-ID") + "</p>";
}
function eksporSertifikatBukti() {
  if (!bk) muatBukti();
  snapshotBukti(true);
  const kata = kataDari(bk.text || "").length;
  const totalCharInput = bk.typedChars + bk.pasteChars;
  const rasioTempel = totalCharInput ? (bk.pasteChars / totalCharInput * 100).toFixed(1) : "0.0";
  const maxChars = Math.max(1, ...bk.snaps.map((s) => s.chars));
  const rows = bk.snaps.map((s) => "<tr><td style='border:1px solid #999;padding:4px 8px'>" + new Date(s.t).toLocaleString("id-ID") + "</td><td style='border:1px solid #999;padding:4px 8px'>" + s.chars.toLocaleString("id-ID") + "</td><td style='border:1px solid #999;padding:4px 8px'>" + s.keys.toLocaleString("id-ID") + "</td><td style='border:1px solid #999;padding:4px 8px'><div style='background:#000;height:10px;width:" + Math.max(2, Math.round(s.chars / maxChars * 100)) + "%'></div></td></tr>").join("");
  window._buktiDoc = "<html><body style='font-family:serif'>"
    + "<h2 style='text-align:center'>SERTIFIKAT BUKTI PROSES PENULISAN MANDIRI</h2>"
    + "<p style='text-align:center'>Dihasilkan oleh MahasiswaTools — Dari Mahasiswa, Untuk Mahasiswa</p><hr>"
    + "<p>Dokumen: <b>" + esc(bk.doc || "(tanpa nama)") + "</b><br>Periode pengerjaan: " + new Date(bk.start).toLocaleString("id-ID") + " s.d. " + new Date().toLocaleString("id-ID") + "</p>"
    + "<table style='border-collapse:collapse' cellpadding='4'><tr><td>Total kata akhir</td><td><b>" + kata.toLocaleString("id-ID") + " kata</b></td></tr>"
    + "<tr><td>Waktu aktif mengetik</td><td><b>" + fmtDurasi(bk.activeSec) + "</b></td></tr>"
    + "<tr><td>Total ketukan tombol</td><td><b>" + bk.keys.toLocaleString("id-ID") + "</b></td></tr>"
    + "<tr><td>Jumlah koreksi (backspace/delete)</td><td><b>" + bk.back.toLocaleString("id-ID") + "</b></td></tr>"
    + "<tr><td>Karakter diketik manual</td><td><b>" + bk.typedChars.toLocaleString("id-ID") + "</b></td></tr>"
    + "<tr><td>Peristiwa tempel (paste)</td><td><b>" + bk.pastes + " kali (" + bk.pasteChars.toLocaleString("id-ID") + " karakter, " + rasioTempel + "%)</b></td></tr>"
    + "<tr><td>Jumlah snapshot proses</td><td><b>" + bk.snaps.length + " titik</b></td></tr></table>"
    + "<h3>Linimasa Pengerjaan (Snapshot Berkala)</h3>"
    + "<table style='border-collapse:collapse;width:100%'><tr><th style='border:1px solid #999;padding:4px 8px;text-align:left'>Waktu</th><th style='border:1px solid #999;padding:4px 8px;text-align:left'>Karakter Naskah</th><th style='border:1px solid #999;padding:4px 8px;text-align:left'>Ketukan Kumulatif</th><th style='border:1px solid #999;padding:4px 8px;text-align:left'>Pertumbuhan</th></tr>" + rows + "</table>"
    + "<p>Sertifikat ini merangkum telemetri pengetikan yang terekam secara lokal di peramban penulis selama proses penulisan berlangsung. Pola ketukan manual yang dominan, koreksi yang wajar, dan pertumbuhan naskah bertahap pada linimasa di atas menunjukkan proses penulisan mandiri yang autentik.</p>"
    + "<p style='font-size:9pt;color:#666'>MahasiswaTools — Dibuat dengan semangat Dari Mahasiswa, Untuk Mahasiswa Indonesia.</p></body></html>";
  download("Sertifikat_Bukti_Penulisan.doc", window._buktiDoc, "application/msword");
  toast("Sertifikat bukti penulisan diunduh 🏅");
}
function resetBukti() {
  if (!confirm("Hapus seluruh bukti & statistik dokumen ini dan mulai dari nol?")) return;
  localStorage.removeItem("mt_bukti_v1");
  muatBukti(); bk.start = Date.now(); simpanBukti();
  openTool("buktiketik");
  toast("Bukti direset — dokumen baru dimulai 🆕");
}

;

/* === MT-CORE-BEGIN === */
/* ============================================================
   PREVIEW LIVE + TEMPLATE CUSTOM
   ============================================================ */
/* ---------- Sertifikat: template custom ---------- */
function srTplChange() {
  const tpl = ($("#srTpl") || {}).value;
  const box = $("#srCustomBox");
  if (box) box.classList.toggle("hidden", tpl !== "custom");
  if ($("#srCv") && !$("#srCv").classList.contains("hidden")) gambarSertifikat(0);
}
function srBgLoad(input) {
  const f = input.files && input.files[0]; if (!f) return;
  fileToImage(f).then((img) => { window._srBgImg = img; gambarSertifikat(0); toast("Template background kamu dimuat 🖼️"); });
}

/* ---------- CV ATS: preview A4 live ---------- */
function renderCvLive() {
  const box = $("#cvLiveInner"); if (!box || typeof ambilCv !== "function") return;
  const d = ambilCv();
  const exps = typeof parseExp === "function" ? parseExp(d.exp) : [];
  const kontak = [d.email, d.telp, d.kota, d.link].filter(Boolean).join(" | ");
  box.innerHTML = '<div style="font-family:Arial,sans-serif;color:#111"><h1 style="font-size:22pt;margin:0">' + esc(d.nama || "Nama Kamu") + '</h1><p style="font-size:12.5pt;margin:2pt 0"><b>' + esc(d.posisi || "Posisi yang Dituju") + '</b></p><p style="margin:2pt 0 10pt;color:#444">' + esc(kontak || "email • telepon • kota • LinkedIn") + "</p>"
    + '<h2 style="font-size:12pt;border-bottom:1.5pt solid #111;padding-bottom:2pt">RINGKASAN PROFESIONAL</h2><p style="font-size:11pt">' + esc(d.ringkas || "Ringkasan profesionalmu akan muncul di sini…") + "</p>"
    + '<h2 style="font-size:12pt;border-bottom:1.5pt solid #111;padding-bottom:2pt">PENGALAMAN</h2>'
    + (exps.length ? exps.map((e) => '<p style="margin:6pt 0 2pt;font-size:11pt"><b>' + esc(e.posisi) + "</b>" + (e.perusahaan ? " — " + esc(e.perusahaan) : "") + (e.periode ? ' <span style="color:#444">(' + esc(e.periode) + ")</span>" : "") + "</p>" + (e.bullets.length ? "<ul style='margin:2pt 0 8pt;font-size:11pt'>" + e.bullets.map((b) => "<li>" + esc(b) + "</li>").join("") + "</ul>" : "")).join("") : '<p style="font-size:11pt;color:#666">Pengalaman kerja/magang/organisasimu tampil di sini…</p>')
    + '<h2 style="font-size:12pt;border-bottom:1.5pt solid #111;padding-bottom:2pt">PENDIDIKAN</h2>' + (d.edu.trim() ? d.edu.split(/\n/).filter((s) => s.trim()).map((s) => '<p style="margin:2pt 0;font-size:11pt">' + esc(s.trim()) + "</p>").join("") : '<p style="font-size:11pt;color:#666">Riwayat pendidikanmu tampil di sini…</p>')
    + '<h2 style="font-size:12pt;border-bottom:1.5pt solid #111;padding-bottom:2pt">KEAHLIAN</h2><p style="font-size:11pt">' + esc(d.skill || "Daftar keahlianmu tampil di sini…") + "</p></div>";
}
mtEnhanceUI("k53", function (_ui) {
  return function (el) {
    _ui(el);
    const btn = el.querySelector('button[onclick="buatCv()"]');
    if (btn) btn.insertAdjacentHTML("beforebegin", '<div class="mb-4"><p class="text-sm font-extrabold mb-2">👁 PREVIEW LANGSUNG — berubah saat kamu mengetik</p><div class="bg-white text-slate-900 p-5 border border-slate-200 dark:border-slate-700 overflow-x-auto bshadow-sm"><div style="min-width:520px" id="cvLiveInner"></div></div></div>');
    el.addEventListener("input", renderCvLive);
    renderCvLive();
  };
});

/* ---------- Template .docx: preview struktur ---------- */
function renderDocPreview() {
  const box = $("#docPrev"); if (!box) return;
  const gv = (id) => ($("#" + id) ? $("#" + id).value.trim() : "");
  const bab = [["BAB I", "PENDAHULUAN", "Latar Belakang • Rumusan Masalah • Tujuan • Manfaat • Definisi Operasional"], ["BAB II", "TINJAUAN PUSTAKA", "Kajian Teori • Penelitian Terdahulu • Kerangka Berpikir • Hipotesis"], ["BAB III", "METODE PENELITIAN", "Jenis Penelitian • Populasi & Sampel • Instrumen • Teknik Analisis Data"], ["BAB IV", "HASIL DAN PEMBAHASAN", "Deskripsi Data • Hasil Uji • Pembahasan"], ["BAB V", "PENUTUP", "Kesimpulan • Saran"]];
  box.innerHTML = '<div class="bg-white text-slate-900 p-6 border border-slate-200 dark:border-slate-700 bshadow-sm" style="font-family:Georgia,serif">'
    + '<p class="text-center font-bold text-sm tracking-wide">' + esc((gv("xUniv") || "UNIVERSITAS").toUpperCase()) + '</p>'
    + '<p class="text-center text-xs">' + esc(gv("xFak") || "Fakultas") + " — Program Studi " + esc(gv("xProdi") || "…") + "</p>"
    + '<h3 class="text-center font-extrabold text-base mt-5 leading-snug">' + esc((gv("xJud") || "JUDUL SKRIPSI").toUpperCase()) + "</h3>"
    + '<p class="text-center text-sm mt-4">Oleh:<br><b>' + esc(gv("xNama") || "Nama Mahasiswa") + "</b><br>NIM. " + esc(gv("xNim") || "__________") + "</p>"
    + '<p class="text-center text-sm mt-4">' + esc(gv("xKota") || "Kota, Tahun") + "</p>"
    + '<hr class="my-4 border-slate-300"><p class="text-xs font-bold tracking-widest text-slate-500 mb-2">STRUKTUR DOKUMEN YANG AKAN DIBUAT:</p>'
    + '<p class="text-sm leading-relaxed">Cover • Kata Pengantar • Daftar Isi • Daftar Tabel/Gambar</p>'
    + bab.map((b) => '<p class="text-sm mt-2"><b>' + b[0] + " — " + b[1] + '</b><br><span class="text-slate-600">' + b[2] + "</span></p>").join("")
    + '<p class="text-sm mt-2"><b>DAFTAR PUSTAKA</b> (contoh format)</p>'
    + '<p class="text-[11px] text-slate-500 mt-4">Kertas A4 • Margin 4-4-3-3 • Times New Roman 12 • Spasi 1,5 • Pembimbing: ' + esc(gv("xDospem") || "—") + "</p></div>";
}
mtEnhanceUI("k16", function (_ui) {
  return function (el) {
    _ui(el);
    const btn = el.querySelector('button[onclick="buatDocx()"]');
    if (btn) btn.insertAdjacentHTML("beforebegin", '<div class="mb-4"><p class="text-sm font-extrabold mb-2">👁 PREVIEW STRUKTUR DOKUMEN</p><div id="docPrev"></div></div>');
    el.addEventListener("input", renderDocPreview);
    renderDocPreview();
  };
});

/* ---------- PPTX: preview daftar slide ---------- */
function parseOutlineSlides(text) {
  const lines = text.split(/\r?\n/);
  const slides = []; let cur = null;
  const pushCur = () => { if (cur) slides.push(cur); cur = null; };
  lines.forEach((raw) => {
    const l = raw.trim(); if (!l) return;
    if (l.startsWith("# ") || /^BAB\s/i.test(l) && !l.startsWith("-")) { pushCur(); cur = { type: "section", title: l.replace(/^#\s*/, "") }; pushCur(); }
    else if (l.startsWith("## ")) { pushCur(); cur = { type: "content", title: l.replace(/^##\s*/, ""), bullets: [] }; }
    else { if (!cur || cur.type !== "content") { pushCur(); cur = { type: "content", title: "Pembahasan", bullets: [] }; } cur.bullets.push(l.replace(/^[-•*]\s*/, "")); }
  });
  pushCur();
  const finalSlides = [];
  slides.forEach((s) => {
    if (s.type === "section") finalSlides.push(s);
    else { let b = s.bullets.slice(); let part = 1; while (b.length) { finalSlides.push({ type: "content", title: s.title + (part > 1 ? " (lanjutan)" : ""), bullets: b.splice(0, 6) }); part++; } if (!s.bullets.length) finalSlides.push(s); }
  });
  return finalSlides;
}
function renderSlidePreview() {
  const box = $("#ppPrev"); if (!box) return;
  const slides = parseOutlineSlides($("#ppIn").value);
  window._slidePreview = slides;
  const card = (inner, dark) => '<div class="rounded-lg overflow-hidden border-[2.5px] ' + (dark ? "bg-[#122B78] text-white border-[#122B78]" : "bg-white text-slate-800 border-slate-300 dark:border-slate-600") + '" style="aspect-ratio:16/9"><div class="p-2.5 h-full overflow-hidden">' + inner + "</div></div>";
  box.innerHTML = '<p class="text-sm font-extrabold mb-2">👁 PREVIEW ' + (slides.length + 1) + ' SLIDE</p><div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">'
    + card('<div class="font-extrabold text-[13px] leading-snug mt-3">' + esc($("#ppJud").value.trim() || "Judul Presentasi") + '</div><div class="text-[10px] opacity-80 mt-1">' + esc($("#ppNama").value.trim() || "Nama Presenter") + " — COVER</div>", true)
    + slides.map((s) => s.type === "section"
      ? card('<div class="font-extrabold text-[12px] mt-6 text-center">' + esc(s.title) + '</div><div class="text-[9px] text-center opacity-75">SLIDE PEMISAH BAB</div>', true)
      : card('<div class="font-extrabold text-[11.5px] leading-tight border-b border-slate-200 pb-1 mb-1">' + esc(s.title) + "</div>" + s.bullets.slice(0, 5).map((b) => '<div class="text-[10px] leading-snug">• ' + esc(b) + "</div>").join(""), false)).join("")
    + "</div>";
}
mtEnhanceUI("k27", function (_ui) {
  return function (el) {
    _ui(el);
    const btn = el.querySelector('button[onclick="buatPptx()"]');
    if (btn) btn.insertAdjacentHTML("beforebegin", '<div id="ppPrev" class="mb-4"></div>');
    el.addEventListener("input", renderSlidePreview);
    renderSlidePreview();
  };
});

/* ---------- Motlet: preview live ---------- */
mtEnhanceUI("k50", function (_ui) {
  return function (el) {
    _ui(el);
    let t = null;
    el.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { try { buatMotlet(); } catch (e) {} }, 400); });
    el.addEventListener("change", () => { try { buatMotlet(); } catch (e) {} });
  };
});

/* ---------- Flashcard: preview pasangan depan–belakang live ---------- */
function renderFlashPreview() {
  const box = $("#fcPrev"); if (!box) return;
  const lines = $("#fpIn").value.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const cards = [];
  lines.forEach((l) => { const p = l.split("|"); if (p.length >= 2) cards.push({ t: p[0].trim(), d: p.slice(1).join("|").trim() }); });
  window._fcPreviewCount = cards.length;
  box.innerHTML = '<p class="text-sm font-extrabold mb-2">👁 PREVIEW ' + cards.length + ' KARTU (DEPAN ↔ BELAKANG)</p>'
    + (cards.length ? '<div class="space-y-2">' + cards.map((c, i) => '<div class="grid grid-cols-2 gap-2"><div class="rounded-lg border-2 border-dashed border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-900 p-3 text-center"><div class="text-[9px] font-bold tracking-widest text-slate-400">DEPAN ' + (i + 1) + '</div><div class="font-extrabold text-sm">' + esc(c.t) + '</div></div><div class="rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 p-3 text-center"><div class="text-[9px] font-bold tracking-widest text-slate-400">BELAKANG ' + (i + 1) + '</div><div class="text-[12.5px] leading-snug">' + esc(c.d) + "</div></div></div>").join("") + "</div>"
    : '<p class="text-sm text-slate-500">Format: Istilah | Definisi (satu kartu per baris).</p>');
}
mtEnhanceUI("k55", function (_ui) {
  return function (el) {
    _ui(el);
    const btn = el.querySelector('button[onclick="buatFlashPrint()"]');
    if (btn) btn.insertAdjacentHTML("beforebegin", '<div id="fcPrev" class="mb-4"></div>');
    el.addEventListener("input", renderFlashPreview);
    renderFlashPreview();
  };
});

/* ---------- Deklarasi AI: preview live ---------- */
mtEnhanceUI("deklarasi", function (_ui) {
  return function (el) {
    _ui(el);
    const run = () => { if ($("#dkNama")) { try { buatDeklarasi(); } catch (e) {} } };
    el.addEventListener("input", run);
    el.addEventListener("change", run);
    run();
  };
});

;

/* ============================================================
   LOGO INSTITUSI — upload sekali, terpasang di semua dokumen
   ============================================================ */
function getLogoData() { try { return localStorage.getItem("mt_logo") || ""; } catch (e) { return ""; } }
function getLogoMeta() { try { return JSON.parse(localStorage.getItem("mt_logo_meta") || "{}"); } catch (e) { return {}; } }
function muatLogoImg() {
  const d = getLogoData();
  if (!d) { window._logoImg = null; return Promise.resolve(null); }
  if (window._logoImg && window._logoImg.src === d) return Promise.resolve(window._logoImg);
  return new Promise((res) => { const im = new Image(); im.onload = () => { window._logoImg = im; res(im); }; im.onerror = () => res(null); im.src = d; });
}
function logoUpload(input) {
  const f = input.files && input.files[0]; if (!f) return;
  const url = URL.createObjectURL(f);
  const im = new Image();
  im.onload = () => {
    const sc = Math.min(1, 360 / Math.max(im.width, im.height));
    const cv = document.createElement("canvas");
    cv.width = Math.max(1, Math.round(im.width * sc)); cv.height = Math.max(1, Math.round(im.height * sc));
    cv.getContext("2d").drawImage(im, 0, 0, cv.width, cv.height);
    URL.revokeObjectURL(url);
    try {
      localStorage.setItem("mt_logo", cv.toDataURL("image/png"));
      localStorage.setItem("mt_logo_meta", JSON.stringify({ w: cv.width, h: cv.height }));
      toast("Logo institusi tersimpan — otomatis terpasang di dokumen 🎓");
    } catch (e) { toast("Logo terlalu besar untuk disimpan di browser 😢"); }
    window._logoImg = null; muatLogoImg(); segarkanLogoUI();
  };
  im.src = url;
}
function logoHapus() { try { localStorage.removeItem("mt_logo"); localStorage.removeItem("mt_logo_meta"); } catch (e) {} window._logoImg = null; segarkanLogoUI(); toast("Logo institusi dihapus"); }
function logoFieldHtml() {
  return '<div class="rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 p-3 mb-4"><div class="flex items-center gap-3">'
    + '<img class="logoThumb w-14 h-14 object-contain rounded bg-white border border-slate-200 shrink-0" alt="Logo institusi">'
    + '<div class="flex-1 min-w-0"><p class="text-sm font-extrabold">🎓 Logo Universitas / Institusi</p>'
    + '<p class="text-xs text-slate-500 logoState"></p>'
    + '<div class="flex flex-wrap gap-2 mt-1.5"><label class="' + BTN2 + ' cursor-pointer">📤 Upload / Ganti Logo<input type="file" accept="image/*" class="hidden" onchange="logoUpload(this)"></label>'
    + '<button class="' + BTN2 + '" onclick="logoHapus()">🗑️ Hapus</button></div></div></div></div>';
}
function segarkanLogoUI() {
  const d = getLogoData();
  document.querySelectorAll(".logoThumb").forEach((im) => { im.src = d || ""; im.style.visibility = d ? "visible" : "hidden"; });
  document.querySelectorAll(".logoState").forEach((p) => { p.textContent = d ? "Logo terpasang ✓ — muncul otomatis di dokumen yang kamu buat dari tool ini." : "Belum ada logo — upload sekali di tool mana pun, otomatis terpasang di cover skripsi, sertifikat, kwitansi, cover PPTX, kop surat, logbook & deklarasi."; });
}
function kopLogoHtml(align) {
  const d = getLogoData(); if (!d) return "";
  return '<p style="text-align:' + (align || "center") + ';margin:0 0 6pt"><img src="' + d + '" style="height:78px"></p>';
}
function sisipLogoField(el, btnOnclick) {
  const anchor = btnOnclick ? el.querySelector('button[onclick="' + btnOnclick + '"]') : null;
  if (anchor) anchor.insertAdjacentHTML("beforebegin", logoFieldHtml());
  else if (el.firstElementChild) el.firstElementChild.insertAdjacentHTML("afterbegin", logoFieldHtml());
  segarkanLogoUI(); muatLogoImg();
}
[["k16", "buatDocx()"], ["k27", "buatPptx()"], ["k32", "buatKwitansi()"], ["k35", "gambarSertifikat(0)"], ["k50", "buatMotlet()"], ["deklarasi", "buatDeklarasi()"]].forEach(([id, btn]) => {
  mtEnhanceUI(id, function (_ui) { return function (el) { _ui(el); sisipLogoField(el, btn); }; });
});
mtEnhanceUI("k31", function (_ui) { return function (el) { _ui(el); sisipLogoField(el, "tambahLog()"); }; });
mtEnhanceFn("renderDocPreview", function (_rdp) {
  return function () {
    _rdp();
    const d = getLogoData(); const box = $("#docPrev");
    if (d && box && box.firstElementChild) box.firstElementChild.insertAdjacentHTML("afterbegin", '<p style="text-align:center;margin:0 0 4pt"><img src="' + d + '" style="height:72px;margin:0 auto"></p>');
  };
});
mtEnhanceFn("buatMotlet", function (_bm) {
  return function () {
    _bm();
    window._suratDoc = "<html><body style='font-family:serif;font-size:12pt'>" + kopLogoHtml("center") + "<div style='white-space:pre-wrap'>" + esc(window._motlet || "") + "</div></body></html>";
    const btn = [...document.querySelectorAll("#mlOut button")].find((b) => (b.getAttribute("onclick") || "").includes("Surat.doc"));
    if (btn) btn.setAttribute("onclick", "download('Surat.doc', window._suratDoc, 'application/msword')");
  };
});
/* Sertifikat & kwitansi: gambar logo di canvas */
mtEnhanceFn("gambarSertifikat", function (_gs) {
  return function (idx) {
    const cv = _gs(idx);
    const tpl = ($("#srTpl") || {}).value || "klasik";
    const im = window._logoImg;
    if (im && tpl !== "custom") {
      const ctx = cv.getContext("2d");
      if (tpl === "biru") { const h = 72, w = Math.round(h * im.width / im.height); ctx.fillStyle = "#FFFFFF"; roundRect(ctx, 30, 14, w + 16, h + 4, 8); ctx.fill(); ctx.drawImage(im, 38, 16, w, h); }
      else { const h = 104, w = Math.round(h * im.width / im.height); ctx.drawImage(im, 88, 84, w, h); }
    }
    return cv;
  };
});
mtEnhanceFn("buatKwitansi", function (_bk) {
  return function () {
    _bk();
    const im = window._logoImg;
    if (im) {
      const cv = $("#kwCv"); if (!cv) return;
      const ctx = cv.getContext("2d");
      const h = 74, w = Math.round(h * im.width / im.height);
      ctx.drawImage(im, 46, 42, w, h);
    }
  };
});
mtEnhanceFn("unduhSertifikatZip", function (_uz) { return async function () { await muatLogoImg(); return _uz(); }; });
mtEnhanceFn("unduhSertifikatPdfZip", function (_up) { return async function () { await muatLogoImg(); return _up(); }; });

;

/* === MT-CORE-END === */
/* ============================================================
   TOOL 66 — GENERATOR PROPOSAL (penelitian / kegiatan / magang)
   ============================================================ */
UI.proposal = function (el) {
  const F = (label, inner) => field(label, inner);
  el.innerHTML = '<div class="fadein">'
    + F("Jenis Proposal", '<select id="prJenis" class="' + IN + '" onchange="prGantiJenis()"><option value="riset">🔬 Proposal Penelitian / Skripsi</option><option value="kegiatan">🎪 Proposal Kegiatan Mahasiswa (Acara/UKM)</option><option value="magang">💼 Proposal Magang / PKL</option></select>')
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + F("Judul Proposal", '<input id="prJudul" class="' + IN + '" placeholder="Judul lengkap proposal">')
    + F("Nama Pengusul / Ketua", '<input id="prNama" class="' + IN + '" placeholder="Nama lengkap">')
    + F("NIM", '<input id="prNim" class="' + IN + '" placeholder="NIM kamu">')
    + F("Program Studi / Organisasi", '<input id="prProdi" class="' + IN + '" placeholder="cth: Pendidikan Ekonomi / HIMA Ekonomi">')
    + F("Universitas / Kampus", '<input id="prKampus" class="' + IN + '" placeholder="cth: Universitas Contoh Indonesia">')
    + F("Kota & Tanggal", '<input id="prKota" class="' + IN + '" value="Palembang, ' + new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) + '">')
    + "</div>"
    /* --- PENELITIAN --- */
    + '<div id="prSecRiset">'
    + F("Latar Belakang", '<textarea id="prLatar" rows="4" class="' + IN + '" placeholder="Fenomena, data pendukung, kesenjangan masalah — dari umum ke khusus"></textarea>')
    + F("Rumusan Masalah (satu per baris)", '<textarea id="prRumusan" rows="2" class="' + IN + '" placeholder="Apakah terdapat pengaruh … terhadap …?"></textarea>')
    + F("Tujuan Penelitian (satu per baris)", '<textarea id="prTujuan" rows="2" class="' + IN + '" placeholder="Untuk mengetahui pengaruh … terhadap …"></textarea>')
    + F("Manfaat Penelitian", '<textarea id="prManfaat" rows="2" class="' + IN + '" placeholder="Manfaat teoretis & praktis"></textarea>')
    + F("Tinjauan Pustaka Ringkas", '<textarea id="prTinjauan" rows="3" class="' + IN + '" placeholder="Teori utama + penelitian terdahulu yang relevan"></textarea>')
    + F("Metode: Jenis & Pendekatan", '<textarea id="prMetode" rows="2" class="' + IN + '" placeholder="cth: Kuantitatif, metode survei, desain korelasional"></textarea>')
    + '<div class="grid sm:grid-cols-3 gap-x-4">'
    + F("Populasi & Sampel", '<textarea id="prSubjek" rows="2" class="' + IN + '" placeholder="Populasi … sampel … teknik …"></textarea>')
    + F("Instrumen", '<textarea id="prInstrumen" rows="2" class="' + IN + '" placeholder="Angket skala Likert, uji validitas & reliabilitas"></textarea>')
    + F("Teknik Analisis Data", '<textarea id="prAnalisis" rows="2" class="' + IN + '" placeholder="Regresi linear sederhana, uji t, SPSS"></textarea>')
    + "</div>"
    + F("Jadwal Penelitian (format: Kegiatan | Waktu)", '<textarea id="prJadwal" rows="3" class="' + IN + '" placeholder="Penyusunan proposal | November 2026&#10;Pengambilan data | Desember 2026&#10;Analisis & pelaporan | Januari 2027"></textarea>')
    + "</div>"
    /* --- KEGIATAN --- */
    + '<div id="prSecKegiatan" class="hidden">'
    + F("Latar Belakang Kegiatan", '<textarea id="prKgLatar" rows="3" class="' + IN + '" placeholder="Alasan & urgensi kegiatan ini diselenggarakan"></textarea>')
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + F("Nama & Tema Kegiatan", '<input id="prKgTema" class="' + IN + '" placeholder="cth: Seminar Nasional — “Tema acara”">')
    + F("Sasaran / Peserta", '<input id="prKgSasaran" class="' + IN + '" placeholder="cth: 150 mahasiswa se-kota">')
    + F("Waktu Pelaksanaan", '<input id="prKgWaktu" class="' + IN + '" placeholder="cth: Sabtu, 14 November 2026, 08.00–15.00 WIB">')
    + F("Tempat Pelaksanaan", '<input id="prKgTempat" class="' + IN + '" placeholder="cth: Aula Kampus / Zoom Meeting">')
    + "</div>"
    + F("Tujuan Kegiatan (satu per baris)", '<textarea id="prKgTujuan" rows="2" class="' + IN + '" placeholder="Meningkatkan wawasan peserta tentang …"></textarea>')
    + F("Susunan Acara (format: Waktu | Acara | Penanggung Jawab)", '<textarea id="prKgAcara" rows="3" class="' + IN + '" placeholder="08.00–08.30 | Registrasi peserta | Sie Acara&#10;08.30–09.00 | Pembukaan & sambutan | MC"></textarea>')
    + F("Susunan Kepanitiaan (format: Jabatan | Nama)", '<textarea id="prKgPanitia" rows="3" class="' + IN + '" placeholder="Ketua Pelaksana | Nama Ketua&#10;Sekretaris | Nama Sekretaris&#10;Bendahara | Nama Bendahara"></textarea>')
    + F("RAB — Rencana Anggaran Biaya (format: Item | Jumlah | Harga Satuan)", '<textarea id="prRab" rows="4" class="' + IN + '" placeholder="Konsumsi peserta | 50 | 15000&#10;Sewa sound system | 1 | 750000&#10;Sertifikat & ATK | 1 | 250000"></textarea>')
    + '<p id="prRabTotal" class="text-sm font-extrabold mb-3"></p>'
    + F("Penutup", '<textarea id="prKgPenutup" rows="2" class="' + IN + '" placeholder="Kalimat penutup & harapan dukungan (opsional)"></textarea>')
    + "</div>"
    /* --- MAGANG --- */
    + '<div id="prSecMagang" class="hidden">'
    + F("Tujuan Magang (satu per baris)", '<textarea id="prMgTujuan" rows="3" class="' + IN + '" placeholder="Mengaplikasikan ilmu … di dunia kerja nyata&#10;Memenuhi syarat mata kuliah PKL"></textarea>')
    + F("Profil Singkat Instansi Tujuan", '<textarea id="prMgProfil" rows="2" class="' + IN + '" placeholder="Nama instansi/perusahaan, bidang, alamat singkat"></textarea>')
    + F("Waktu Pelaksanaan Magang", '<input id="prMgWaktu" class="' + IN + '" placeholder="cth: 5 Januari – 27 Februari 2027 (8 minggu)">')
    + F("Rencana Kegiatan (format: Periode | Rencana Kegiatan)", '<textarea id="prMgRencana" rows="3" class="' + IN + '" placeholder="Minggu 1 | Orientasi & pengenalan unit kerja&#10;Minggu 2–4 | Praktik administrasi & pengolahan data"></textarea>')
    + F("Penutup", '<textarea id="prMgPenutup" rows="2" class="' + IN + '" placeholder="Kalimat penutup (opsional)"></textarea>')
    + "</div>"
    /* --- Pengesahan --- */
    + '<div class="grid sm:grid-cols-3 gap-x-4">'
    + F("Pengesahan 1 — Jabatan | Nama", '<input id="prSah1" class="' + IN + '" placeholder="cth: Ketua Pelaksana | Nama">')
    + F("Pengesahan 2 — Jabatan | Nama", '<input id="prSah2" class="' + IN + '" placeholder="cth: Dosen Pembimbing | Nama, Gelar">')
    + F("Pengesahan 3 — Jabatan | Nama", '<input id="prSah3" class="' + IN + '" placeholder="cth: Ketua Program Studi | Nama, Gelar">')
    + "</div>"
    + '<div class="mb-4"><p class="text-sm font-extrabold mb-2">👁 PREVIEW PROPOSAL</p><div id="propPrev"></div></div>'
    + '<div class="flex flex-wrap gap-2"><button class="' + BTN + '" onclick="buatProposalDocx()">⬇️ Download Proposal .docx (Asli)</button>'
    + '<button class="' + BTN2 + '" onclick="copyText(window._proposalText || \'\')">📋 Copy Teks Proposal</button></div>'
    + '<span id="propStat" class="text-sm text-slate-500"></span>'
    + outBox("propOut") + "</div>";
  sisipLogoField(el, "buatProposalDocx()");
  el.addEventListener("input", renderProposalPreview);
  renderProposalPreview();
};
function prGantiJenis() {
  const j = $("#prJenis").value;
  $("#prSecRiset").classList.toggle("hidden", j !== "riset");
  $("#prSecKegiatan").classList.toggle("hidden", j !== "kegiatan");
  $("#prSecMagang").classList.toggle("hidden", j !== "magang");
  renderProposalPreview();
}
function gvPr(id) { const e = $("#" + id); return e ? e.value.trim() : ""; }
function barisNomor(teks) { return teks.split(/\n/).map((s) => s.trim()).filter(Boolean).map((s, i) => (i + 1) + ". " + s).join("\n"); }
function hitungRab() {
  const items = [];
  gvPr("prRab").split(/\n/).map((s) => s.trim()).filter(Boolean).forEach((l) => {
    const p = l.split("|").map((s) => s.trim());
    const qty = parseFloat((p[1] || "1").replace(/[^\d.]/g, "")) || 0;
    const harga = parseFloat((p[2] || "0").replace(/[^\d.]/g, "")) || 0;
    if (p[0]) items.push({ item: p[0], qty, harga, sub: qty * harga });
  });
  return { items, total: items.reduce((a, b) => a + b.sub, 0) };
}
function proposalBlocks() {
  const j = gvPr("prJenis") || "riset";
  const B = [];
  const sub = (judul, isi, panduan) => ({ judul, isi: isi || "", panduan: panduan || "" });
  if (j === "riset") {
    B.push({ bab: "BAB I — PENDAHULUAN", subs: [
      sub("1.1 Latar Belakang", gvPr("prLatar"), "Uraikan fenomena dan data pendukung dari umum ke khusus, tunjukkan kesenjangan antara harapan dan kenyataan, dan tutup dengan urgensi penelitian ini."),
      sub("1.2 Rumusan Masalah", gvPr("prRumusan") ? barisNomor(gvPr("prRumusan")) : "", "Tulis pertanyaan penelitian yang sejajar dengan tujuan, satu per baris di formulir."),
      sub("1.3 Tujuan Penelitian", gvPr("prTujuan") ? barisNomor(gvPr("prTujuan")) : "", "Tujuan diawali kata kerja operasional: untuk mengetahui, untuk menganalisis, dst."),
      sub("1.4 Manfaat Penelitian", gvPr("prManfaat"), "Manfaat teoretis (bagi ilmu) dan praktis (bagi lembaga, masyarakat, peneliti berikutnya).")
    ]});
    B.push({ bab: "BAB II — TINJAUAN PUSTAKA", subs: [
      sub("2.1 Kajian Teori dan Penelitian Terdahulu", gvPr("prTinjauan"), "Paparkan teori utama variabel penelitian dan minimal 5 penelitian terdahulu yang relevan beserta persamaan-perbedaannya.")
    ]});
    const jadwal = gvPr("prJadwal").split(/\n/).map((s) => s.trim()).filter(Boolean).map((l) => { const p = l.split("|").map((s) => s.trim()); return "• " + p[0] + (p[1] ? " — " + p[1] : ""); }).join("\n");
    B.push({ bab: "BAB III — METODE PENELITIAN", subs: [
      sub("3.1 Jenis dan Pendekatan Penelitian", gvPr("prMetode"), "Jelaskan jenis/pendekatan dan alasan pemilihannya."),
      sub("3.2 Populasi dan Sampel", gvPr("prSubjek"), "Sebutkan populasi, jumlah sampel, dan teknik pengambilan sampel."),
      sub("3.3 Instrumen Penelitian", gvPr("prInstrumen"), "Instrumen yang dipakai beserta uji validitas dan reliabilitasnya."),
      sub("3.4 Teknik Analisis Data", gvPr("prAnalisis"), "Teknik analisis yang digunakan dan perangkat lunaknya."),
      sub("3.5 Jadwal Penelitian", jadwal, "Susun jadwal per tahap: proposal, pengambilan data, analisis, pelaporan.")
    ]});
  } else if (j === "kegiatan") {
    const acara = gvPr("prKgAcara").split(/\n/).map((s) => s.trim()).filter(Boolean).map((l) => { const p = l.split("|").map((s) => s.trim()); return p[0] + " — " + (p[1] || "") + (p[2] ? " (" + p[2] + ")" : ""); }).join("\n");
    const panitia = gvPr("prKgPanitia").split(/\n/).map((s) => s.trim()).filter(Boolean).map((l) => { const p = l.split("|").map((s) => s.trim()); return (p[0] || "") + ": " + (p[1] || ""); }).join("\n");
    const rab = hitungRab();
    const rabTeks = rab.items.map((r, i) => (i + 1) + ". " + r.item + " — " + r.qty + " × " + rp(r.harga) + " = " + rp(r.sub)).join("\n") + (rab.items.length ? "\nTOTAL ANGGARAN: " + rp(rab.total) : "");
    B.push({ bab: "BAB I — PENDAHULUAN", subs: [
      sub("1.1 Latar Belakang", gvPr("prKgLatar"), "Jelaskan alasan dan urgensi kegiatan ini diselenggarakan."),
      sub("1.2 Nama dan Tema Kegiatan", gvPr("prKgTema"), "Tuliskan nama kegiatan beserta tema yang diusung."),
      sub("1.3 Tujuan Kegiatan", gvPr("prKgTujuan") ? barisNomor(gvPr("prKgTujuan")) : "", "Tujuan kegiatan yang terukur, satu per baris."),
      sub("1.4 Sasaran dan Peserta", gvPr("prKgSasaran"), "Siapa peserta kegiatan dan perkiraan jumlahnya.")
    ]});
    B.push({ bab: "BAB II — PELAKSANAAN KEGIATAN", subs: [
      sub("2.1 Waktu dan Tempat", (gvPr("prKgWaktu") ? "Waktu: " + gvPr("prKgWaktu") : "") + (gvPr("prKgTempat") ? "\nTempat: " + gvPr("prKgTempat") : ""), "Tuliskan hari, tanggal, jam, dan tempat pelaksanaan."),
      sub("2.2 Susunan Acara", acara, "Susun rundown acara per baris dengan format Waktu | Acara | Penanggung Jawab."),
      sub("2.3 Susunan Kepanitiaan", panitia, "Daftar panitia per baris dengan format Jabatan | Nama.")
    ]});
    B.push({ bab: "BAB III — RENCANA ANGGARAN BIAYA", subs: [
      sub("3.1 Rincian Anggaran", rabTeks, "Isi RAB per baris dengan format Item | Jumlah | Harga Satuan — total dihitung otomatis.")
    ]});
    B.push({ bab: "BAB IV — PENUTUP", subs: [
      sub("4.1 Penutup", gvPr("prKgPenutup"), "Demikian proposal ini kami sampaikan. Besar harapan kami kegiatan ini mendapat dukungan dan persetujuan dari pihak terkait. Atas perhatian dan kerja samanya, kami ucapkan terima kasih.")
    ]});
  } else {
    const rencana = gvPr("prMgRencana").split(/\n/).map((s) => s.trim()).filter(Boolean).map((l) => { const p = l.split("|").map((s) => s.trim()); return "• " + p[0] + (p[1] ? " — " + p[1] : ""); }).join("\n");
    B.push({ bab: "BAB I — PENDAHULUAN", subs: [
      sub("1.1 Latar Belakang", gvPr("prMgProfil") ? "Magang/Praktik Kerja Lapangan (PKL) merupakan sarana penerapan ilmu yang diperoleh di bangku kuliah ke dunia kerja nyata. Adapun instansi tujuan magang adalah sebagai berikut.\n" + gvPr("prMgProfil") : "", "Isi profil singkat instansi tujuan: nama, bidang usaha, dan alamat."),
      sub("1.2 Tujuan Magang", gvPr("prMgTujuan") ? barisNomor(gvPr("prMgTujuan")) : "", "Tujuan magang, satu per baris."),
      sub("1.3 Waktu Pelaksanaan", gvPr("prMgWaktu"), "Periode magang: tanggal mulai sampai selesai beserta durasinya.")
    ]});
    B.push({ bab: "BAB II — RENCANA KEGIATAN", subs: [
      sub("2.1 Rencana Kegiatan Magang", rencana, "Rencana kegiatan per periode dengan format Periode | Rencana Kegiatan.")
    ]});
    B.push({ bab: "BAB III — PENUTUP", subs: [
      sub("3.1 Penutup", gvPr("prMgPenutup"), "Demikian proposal magang ini saya sampaikan sebagai bahan pertimbangan. Besar harapan saya untuk dapat diterima melaksanakan magang di instansi Bapak/Ibu. Atas perhatian dan kesempatan yang diberikan, saya ucapkan terima kasih.")
    ]});
  }
  return B;
}
function proposalTeksPolos() {
  const namaJenis = { riset: "PROPOSAL PENELITIAN", kegiatan: "PROPOSAL KEGIATAN", magang: "PROPOSAL MAGANG / PKL" };
  let t = namaJenis[gvPr("prJenis")] + "\n" + (gvPr("prJudul") || "Judul Proposal").toUpperCase() + "\n\nOleh: " + gvPr("prNama") + (gvPr("prNim") ? " (NIM. " + gvPr("prNim") + ")" : "") + "\n" + gvPr("prProdi") + " — " + gvPr("prKampus") + "\n\n";
  proposalBlocks().forEach((b) => {
    t += "\n" + b.bab + "\n";
    b.subs.forEach((s) => { t += "\n" + s.judul + "\n" + (s.isi || s.panduan) + "\n"; });
  });
  return t;
}
function renderProposalPreview() {
  const box = $("#propPrev"); if (!box) return;
  const namaJenis = { riset: "PROPOSAL PENELITIAN / SKRIPSI", kegiatan: "PROPOSAL KEGIATAN MAHASISWA", magang: "PROPOSAL MAGANG / PKL" };
  const d = getLogoData();
  const rab = gvPr("prJenis") === "kegiatan" ? hitungRab() : null;
  const elTotal = $("#prRabTotal");
  if (elTotal) elTotal.innerHTML = rab && rab.items.length ? "💰 Total RAB terhitung: <b>" + rp(rab.total) + "</b> dari " + rab.items.length + " item" : "";
  window._proposalText = proposalTeksPolos();
  box.innerHTML = '<div class="bg-white text-slate-900 p-6 border border-slate-200 dark:border-slate-700 bshadow-sm" style="font-family:Georgia,serif">'
    + (d ? '<p style="text-align:center;margin:0 0 4pt"><img src="' + d + '" style="height:70px;margin:0 auto"></p>' : "")
    + '<p class="text-center font-bold text-sm tracking-wide">' + esc((gvPr("prKampus") || "UNIVERSITAS").toUpperCase()) + '</p>'
    + '<p class="text-center text-xs">' + esc(gvPr("prProdi") || "Program Studi / Organisasi") + '</p>'
    + '<p class="text-center font-extrabold text-[15px] mt-4 tracking-widest">' + namaJenis[gvPr("prJenis") || "riset"] + '</p>'
    + '<h3 class="text-center font-extrabold text-base mt-1 leading-snug">' + esc((gvPr("prJudul") || "JUDUL PROPOSAL").toUpperCase()) + '</h3>'
    + '<p class="text-center text-sm mt-3">Oleh: <b>' + esc(gvPr("prNama") || "Nama Pengusul") + "</b>" + (gvPr("prNim") ? "<br>NIM. " + esc(gvPr("prNim")) : "") + "</p>"
    + '<p class="text-center text-sm">' + esc(gvPr("prKota")) + "</p>"
    + '<hr class="my-4 border-slate-300">'
    + proposalBlocks().map((b) => '<p class="font-extrabold text-sm mt-4 tracking-wide">' + b.bab + "</p>" + b.subs.map((s) => '<p class="text-sm mt-2.5"><b>' + s.judul + '</b></p>' + (s.isi ? '<p class="text-[13.5px] leading-relaxed whitespace-pre-wrap">' + esc(s.isi) + "</p>" : '<p class="text-[13px] italic text-slate-500">(Belum diisi — di dokumen akan tampil teks panduan ini: ' + esc(s.panduan) + ")</p>")).join("")).join("")
    + (rab && rab.items.length ? '<div class="mt-4 rounded border border-slate-300 p-3"><p class="text-sm font-extrabold mb-1.5">RINCIAN RAB</p>' + rab.items.map((r) => '<p class="text-[13px] flex justify-between gap-2"><span>' + esc(r.item) + " — " + r.qty + " × " + rp(r.harga) + '</span><b>' + rp(r.sub) + "</b></p>").join("") + '<p class="text-sm font-extrabold flex justify-between border-t border-slate-300 mt-2 pt-1.5"><span>TOTAL</span><span>' + rp(rab.total) + "</span></p></div>" : "")
    + "</div>";
}
async function buatProposalDocx() {
  const stat = $("#propStat"); stat.textContent = "⏳ Menyiapkan library…";
  const ok = await loadLib("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js", "JSZip");
  if (!ok) { stat.textContent = "❌ Gagal memuat JSZip (butuh internet sekali untuk library)."; return; }
  const namaJenis = { riset: "PROPOSAL PENELITIAN", kegiatan: "PROPOSAL KEGIATAN MAHASISWA", magang: "PROPOSAL MAGANG / PKL" };
  const jenis = gvPr("prJenis") || "riset";
  const B = [];
  for (let i = 0; i < 3; i++) B.push(pDoc(""));
  B.push(pDoc(namaJenis[jenis], { center: 1, b: 1, sz: 26, after: 160 }));
  B.push(pDoc((gvPr("prJudul") || "Judul Proposal").toUpperCase(), { center: 1, b: 1, sz: 28, after: 300 }));
  const _lg = getLogoData(); const _lm = getLogoMeta();
  if (_lg) { const cxL = 1260000; const cyL = Math.min(1440000, Math.round(cxL * ((_lm.h || 1) / (_lm.w || 1)))); B.push('<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:after="300"/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="' + cxL + '" cy="' + cyL + '"/><wp:docPr id="1" name="Logo"/><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="1" name="logo.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="rIdLogo"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="' + cxL + '" cy="' + cyL + '"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>'); }
  else B.push(pDoc("[ LOGO UNIVERSITAS ]", { center: 1, after: 300 }));
  B.push(pDoc("Disusun oleh:", { center: 1, after: 60 }));
  B.push(pDoc(gvPr("prNama") || "Nama Pengusul", { center: 1, b: 1, after: 40 }));
  if (gvPr("prNim")) B.push(pDoc("NIM. " + gvPr("prNim"), { center: 1, after: 300 }));
  B.push(pDoc((gvPr("prProdi") || "").toUpperCase(), { center: 1, b: 1, after: 40 }));
  B.push(pDoc((gvPr("prKampus") || "").toUpperCase(), { center: 1, b: 1, after: 200 }));
  B.push(pDoc(gvPr("prKota"), { center: 1, b: 1 }));
  B.push('<w:p><w:r><w:br w:type="page"/></w:r></w:p>');
  proposalBlocks().forEach((b) => {
    B.push(headingBab(b.bab));
    b.subs.forEach((s) => {
      B.push(subBab(s.judul));
      if (s.isi) s.isi.split(/\n/).forEach((par) => { if (par.trim()) B.push(pDoc(par)); });
      else B.push(panduan(s.panduan));
    });
  });
  const sah = [gvPr("prSah1"), gvPr("prSah2"), gvPr("prSah3")].filter(Boolean);
  if (sah.length) {
    B.push(headingBab("LEMBAR PENGESAHAN"));
    B.push(pDoc(gvPr("prKota") + ",", { after: 200 }));
    sah.forEach((s) => {
      const p = s.split("|").map((x) => x.trim());
      B.push(pDoc(p[0] || "", { after: 40 }));
      B.push(pDoc("", { after: 700 }));
      B.push(pDoc(p[1] || "", { b: 1, after: 300 }));
    });
  }
  const sect = '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="2268" w:right="1701" w:bottom="1701" w:left="2268" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr>';
  const doc = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>' + B.join("") + sect + "</w:body></w:document>";
  const ct = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>';
  const rels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>';
  const zip = new JSZip();
  zip.file("[Content_Types].xml", ct); zip.folder("_rels").file(".rels", rels);
  const wf = zip.folder("word"); wf.file("document.xml", doc);
  if (_lg) { wf.folder("_rels").file("document.xml.rels", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdLogo" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/logo.png"/></Relationships>'); wf.folder("media").file("logo.png", _lg.split(",")[1], { base64: true }); }
  const blob = await zip.generateAsync({ type: "blob", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
  window._lastPropDocx = blob;
  stat.textContent = "✅ Proposal berhasil dibuat!";
  $("#propOut").innerHTML = '<div class="' + OUT + '"><p class="font-bold">✅ Proposal <b>' + esc(gvPr("prJudul") || "") + '</b> ter-generate sebagai .docx asli (A4, margin 4-4-3-3, TNR 12, spasi 1,5' + (_lg ? ", logo institusi terpasang" : "") + (sah.length ? ", lengkap dengan lembar pengesahan" : "") + ').</p><p class="text-xs text-slate-500 mt-1">Bagian yang belum kamu isi diisi teks panduan miring agar mudah ditimpa tulisanmu sendiri.</p></div>';
  download("Proposal.docx", blob);
}
SHARE_GETTERS.proposal = function () { return window._proposalText || ""; };

;

/* ============================================================
   PEMBUAT SURAT — 12 JENIS SURAT RESMI BARU
   ============================================================ */

;

/* ============================================================
   TOOL 67 — UJI STATISTIK INFERENSIAL + NARASI BAB 4
   ============================================================ */

UI.inferens = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Pilih Uji Statistik", '<select id="infJenis" class="' + IN + '" onchange="infGanti()"><option value="normalitas">Uji Normalitas (Jarque-Bera) — 1 kelompok data</option><option value="tindep">Uji-t Independen — 2 kelompok berbeda</option><option value="tpaired">Uji-t Berpasangan — sebelum vs sesudah</option><option value="anova">ANOVA Satu Arah — 3+ kelompok</option><option value="regresi">Regresi Linear Sederhana + Korelasi (X → Y)</option></select>')
    + '<p id="infHint" class="rounded-lg bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800 p-3 text-[13px] mb-4"></p>'
    + '<div id="infBox1">' + field("Data Kelompok 1 / Variabel X", '<textarea id="infA" rows="5" class="' + IN + '" placeholder="Tulis/paste angka dipisah spasi, koma, atau baris baru. Contoh: 80 82 84 86 88"></textarea>') + "</div>"
    + '<div id="infBox2">' + field("Data Kelompok 2 / Variabel Y", '<textarea id="infB" rows="5" class="' + IN + '" placeholder="Kelompok pembanding / data sesudah / variabel Y (jumlah harus sama dgn X untuk uji berpasangan & regresi)"></textarea>') + "</div>"
    + '<div id="infBoxG" class="hidden">' + field("Data Semua Kelompok (satu kelompok per baris)", '<textarea id="infG" rows="6" class="' + IN + '" placeholder="Kelompok A: 80, 82, 84, 86&#10;Kelompok B: 70, 72, 74, 78&#10;Kelompok C: 90, 91, 93, 95"></textarea>') + "</div>"
    + field("Nama Variabel / Kelompok (untuk narasi hasil)", '<input id="infNama" class="' + IN + '" placeholder="cth: Kelompok eksperimen vs kontrol / Skor pretest-posttest / Pengaruh X terhadap Y">')
    + '<button class="' + BTN + '" onclick="hitungInferens()">📈 Hitung Uji Statistik</button>'
    + outBox("infOut") + "</div>";
  infGanti();
};
function infGanti() {
  const j = $("#infJenis").value;
  const hints = {
    normalitas: "Menguji apakah satu kelompok data berdistribusi normal (syarat uji parametrik). Isi <b>Data Kelompok 1</b> saja. Kriteria: nilai p &gt; 0,05 → data berdistribusi normal.",
    tindep: "Membandingkan rata-rata <b>dua kelompok yang berbeda</b> (mis. kelas eksperimen vs kontrol). Isi kedua kotak data.",
    tpaired: "Membandingkan rata-rata <b>pasangan data yang sama</b> (mis. pretest vs posttest siswa yang sama). Jumlah data kedua kotak harus sama, urutan = orang yang sama.",
    anova: "Membandingkan rata-rata <b>3 kelompok atau lebih</b> sekaligus. Tulis satu kelompok per baris pada kotak kelompok.",
    regresi: "Menguji pengaruh variabel X terhadap Y sekaligus korelasinya. Kotak 1 = X, kotak 2 = Y, jumlah & urutan data harus sama (berpasangan per responden)."
  };
  $("#infHint").innerHTML = hints[j];
  $("#infBox1").classList.toggle("hidden", j === "anova");
  $("#infBox2").classList.toggle("hidden", j === "normalitas" || j === "anova");
  $("#infBoxG").classList.toggle("hidden", j !== "anova");
}
function infHasilKartu(judul, baris, narasi) {
  window._infNarasi = narasi;
  $("#infOut").innerHTML = '<div class="' + OUT + '"><p class="font-extrabold mb-3">' + judul + '</p>'
    + '<div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">' + baris.map((b) => '<div class="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 text-center"><div class="text-lg font-extrabold">' + b[1] + '</div><div class="text-[11px] text-slate-500 font-semibold">' + b[0] + "</div></div>").join("") + "</div>"
    + '<p class="text-[13.5px] leading-relaxed whitespace-pre-wrap bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3.5">' + esc(narasi) + "</p>"
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="' + BTN2 + '" onclick="copyText(window._infNarasi)">📋 Copy Narasi Bab 4</button></div>'
    + '<p class="text-xs text-slate-500 mt-2">Perhitungan dilakukan lokal dengan rumus statistik standar (setara perhitungan manual/SPSS untuk uji yang sama). Tetap cantumkan perangkat lunak yang kamu pakai sesuai pedoman kampusmu.</p></div>';
}
function hitungInferens() {
  const j = $("#infJenis").value, nama = $("#infNama").value.trim() || "variabel penelitian";
  const A = parseNums($("#infA").value), B = parseNums($("#infB").value);
  const outErr = (m) => { $("#infOut").innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ ' + m + "</div>"; };
  if (j === "normalitas") {
    if (A.length < 8) return outErr("Uji normalitas butuh minimal 8 data.");
    const n = A.length, m = mean(A), s = sdS(A);
    const m2 = A.reduce((a, x) => a + Math.pow(x - m, 2), 0) / n, m3 = A.reduce((a, x) => a + Math.pow(x - m, 3), 0) / n, m4 = A.reduce((a, x) => a + Math.pow(x - m, 4), 0) / n;
    const skew = m3 / Math.pow(m2, 1.5), kurt = m4 / (m2 * m2);
    const JB = n / 6 * (skew * skew + Math.pow(kurt - 3, 2) / 4);
    const p = Math.exp(-JB / 2);
    const normal = p > 0.05;
    window._infHasil = { uji: "Jarque-Bera", JB, p };
    infHasilKartu("Hasil Uji Normalitas (Jarque-Bera)",
      [["Jumlah Data (n)", n], ["Rata-rata", fmtN(m)], ["Simpangan Baku", fmtN(s)], ["Statistik JB", fmtN(JB, 3)], ["Nilai p", fmtP(p)], ["Kesimpulan", normal ? "NORMAL ✅" : "TIDAK NORMAL ❌"]],
      "Berdasarkan hasil uji normalitas Jarque-Bera terhadap data " + nama + ", diperoleh nilai statistik JB sebesar " + fmtN(JB, 3) + " dengan nilai signifikansi (p) sebesar " + fmtP(p) + ". Karena nilai p " + (normal ? "lebih besar dari 0,05, dapat disimpulkan bahwa data berdistribusi normal sehingga memenuhi syarat untuk dianalisis menggunakan statistik parametrik." : "lebih kecil dari 0,05, dapat disimpulkan bahwa data tidak berdistribusi normal sehingga analisis lanjutan disarankan menggunakan statistik non-parametrik atau dilakukan transformasi data terlebih dahulu."));
  }
  else if (j === "tindep") {
    if (A.length < 2 || B.length < 2) return outErr("Masing-masing kelompok butuh minimal 2 data.");
    const n1 = A.length, n2 = B.length, m1 = mean(A), m2 = mean(B), s1 = sdS(A), s2 = sdS(B);
    const sp = Math.sqrt(((n1 - 1) * s1 * s1 + (n2 - 1) * s2 * s2) / (n1 + n2 - 2));
    const t = (m1 - m2) / (sp * Math.sqrt(1 / n1 + 1 / n2)), df = n1 + n2 - 2, p = pDariT(Math.abs(t), df);
    const sig = p < 0.05;
    window._infHasil = { uji: "t-independen", t, df, p };
    infHasilKartu("Hasil Uji-t Independen",
      [["Rata-rata Kel. 1", fmtN(m1)], ["Rata-rata Kel. 2", fmtN(m2)], ["t hitung", fmtN(t, 3)], ["df", df], ["Nilai p", fmtP(p)], ["Kesimpulan", sig ? "BERBEDA SIGNIFIKAN ✅" : "Tidak Berbeda ❌"]],
      "Berdasarkan hasil uji-t independen terhadap " + nama + ", diperoleh nilai t hitung sebesar " + fmtN(t, 3) + " dengan df = " + df + " dan nilai signifikansi (p) sebesar " + fmtP(p) + ". Rata-rata kelompok pertama adalah " + fmtN(m1) + ", sedangkan kelompok kedua " + fmtN(m2) + ". Karena nilai p " + (sig ? "lebih kecil dari 0,05, dapat disimpulkan bahwa terdapat perbedaan yang signifikan antara kedua kelompok." : "lebih besar dari 0,05, dapat disimpulkan bahwa tidak terdapat perbedaan yang signifikan antara kedua kelompok."));
  }
  else if (j === "tpaired") {
    if (A.length !== B.length || A.length < 2) return outErr("Uji berpasangan butuh jumlah data yang sama di kedua kotak (minimal 2 pasang).");
    const D = A.map((x, i) => B[i] - x), n = D.length, md = mean(D), sdd = sdS(D);
    const t = md / (sdd / Math.sqrt(n)), df = n - 1, p = pDariT(Math.abs(t), df);
    const sig = p < 0.05;
    window._infHasil = { uji: "t-berpasangan", t, df, p };
    infHasilKartu("Hasil Uji-t Berpasangan",
      [["Jumlah Pasangan", n], ["Rata-rata Awal", fmtN(mean(A))], ["Rata-rata Akhir", fmtN(mean(B))], ["t hitung", fmtN(t, 3)], ["Nilai p", fmtP(p)], ["Kesimpulan", sig ? "BERBEDA SIGNIFIKAN ✅" : "Tidak Berbeda ❌"]],
      "Berdasarkan hasil uji-t berpasangan terhadap " + nama + ", diperoleh nilai t hitung sebesar " + fmtN(t, 3) + " dengan df = " + df + " dan nilai signifikansi (p) sebesar " + fmtP(p) + ". Rata-rata data awal adalah " + fmtN(mean(A)) + " dan meningkat/menjadi " + fmtN(mean(B)) + " pada data akhir, dengan rata-rata selisih sebesar " + fmtN(md) + ". Karena nilai p " + (sig ? "lebih kecil dari 0,05, dapat disimpulkan bahwa terdapat perbedaan yang signifikan antara data awal dan data akhir." : "lebih besar dari 0,05, dapat disimpulkan bahwa tidak terdapat perbedaan yang signifikan antara data awal dan data akhir."));
  }
  else if (j === "anova") {
    const groups = $("#infG").value.split(/\n/).map((l) => parseNums(l.replace(/^[^:]*:/, ""))).filter((g) => g.length >= 2);
    if (groups.length < 3) return outErr("ANOVA butuh minimal 3 kelompok (satu per baris, masing-masing ≥2 data).");
    const k = groups.length, all = groups.flat(), N = all.length, gm = mean(all);
    let ssb = 0, ssw = 0;
    groups.forEach((g) => { const mg = mean(g); ssb += g.length * Math.pow(mg - gm, 2); g.forEach((x) => ssw += Math.pow(x - mg, 2)); });
    const dfb = k - 1, dfw = N - k, F = (ssb / dfb) / (ssw / dfw), p = pDariF(F, dfb, dfw);
    const sig = p < 0.05;
    window._infHasil = { uji: "ANOVA", F, dfb, dfw, p };
    infHasilKartu("Hasil ANOVA Satu Arah",
      [["Jumlah Kelompok", k], ["Total Data", N], ["F hitung", fmtN(F, 3)], ["df", dfb + "; " + dfw], ["Nilai p", fmtP(p)], ["Kesimpulan", sig ? "ADA PERBEDAAN ✅" : "Tidak Berbeda ❌"]],
      "Berdasarkan hasil ANOVA satu arah terhadap " + nama + ", diperoleh nilai F hitung sebesar " + fmtN(F, 3) + " dengan df (" + dfb + "; " + dfw + ") dan nilai signifikansi (p) sebesar " + fmtP(p) + ". Rata-rata tiap kelompok adalah " + groups.map((g, i) => "kelompok " + (i + 1) + " = " + fmtN(mean(g))).join(", ") + ". Karena nilai p " + (sig ? "lebih kecil dari 0,05, dapat disimpulkan bahwa terdapat perbedaan rata-rata yang signifikan di antara kelompok-kelompok tersebut; analisis dapat dilanjutkan dengan uji lanjut (post-hoc) untuk mengetahui pasangan kelompok yang berbeda." : "lebih besar dari 0,05, dapat disimpulkan bahwa tidak terdapat perbedaan rata-rata yang signifikan di antara kelompok-kelompok tersebut."));
  }
  else if (j === "regresi") {
    if (A.length !== B.length || A.length < 3) return outErr("Regresi butuh jumlah data X dan Y yang sama (minimal 3 pasang).");
    const n = A.length, mx = mean(A), my = mean(B);
    let sxy = 0, sxx = 0, syy = 0;
    A.forEach((x, i) => { sxy += (x - mx) * (B[i] - my); sxx += Math.pow(x - mx, 2); syy += Math.pow(B[i] - my, 2); });
    const b = sxy / sxx, a = my - b * mx, r = sxy / Math.sqrt(sxx * syy), r2 = r * r;
    const t = r * Math.sqrt(n - 2) / Math.sqrt(1 - r2), p = pDariT(Math.abs(t), n - 2);
    const sig = p < 0.05;
    const arah = b >= 0 ? "positif" : "negatif";
    window._infHasil = { uji: "regresi", a, b, r, r2, t, p };
    infHasilKartu("Hasil Regresi Linear Sederhana",
      [["Persamaan", "Y = " + fmtN(a) + " + " + fmtN(b) + "X"], ["Korelasi (r)", fmtN(r, 3)], ["R² (kontribusi)", fmtN(r2 * 100, 1) + "%"], ["t hitung", fmtN(t, 3)], ["Nilai p", fmtP(p)], ["Kesimpulan", sig ? "SIGNIFIKAN ✅" : "Tidak Signifikan ❌"]],
      "Berdasarkan hasil analisis regresi linear sederhana, diperoleh persamaan regresi Y = " + fmtN(a) + " + " + fmtN(b) + "X dengan nilai koefisien korelasi (r) sebesar " + fmtN(r, 3) + " yang menunjukkan hubungan yang bersifat " + arah + ". Nilai koefisien determinasi (R²) sebesar " + fmtN(r2, 3) + " menunjukkan bahwa variabel X memberikan kontribusi pengaruh sebesar " + fmtN(r2 * 100, 1) + "% terhadap variabel Y, sedangkan sisanya sebesar " + fmtN(100 - r2 * 100, 1) + "% dipengaruhi oleh faktor lain di luar penelitian ini. Nilai t hitung sebesar " + fmtN(t, 3) + " dengan signifikansi (p) sebesar " + fmtP(p) + ", sehingga " + (sig ? "dapat disimpulkan bahwa terdapat pengaruh yang signifikan antara " + nama + "." : "dapat disimpulkan bahwa tidak terdapat pengaruh yang signifikan antara " + nama + "."));
  }
}

/* ============================================================
   TOOL 68 — PEMBUAT KUESIONER PENELITIAN
   ============================================================ */
UI.kuesioner = function (el) {
  el.innerHTML = '<div class="fadein">'
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Judul Penelitian", '<input id="kuJudul" class="' + IN + '" placeholder="Judul skripsi/penelitianmu">')
    + field("Nama Peneliti & NIM", '<input id="kuNama" class="' + IN + '" placeholder="cth: Detta Pranata — 2018141001">')
    + "</div>"
    + field("Petunjuk Pengisian (boleh diedit)", '<textarea id="kuPetunjuk" rows="2" class="' + IN + '">Berilah tanda centang (✓) pada kolom jawaban yang paling sesuai dengan pendapat/keadaan Anda. Tidak ada jawaban benar atau salah; kejujuran Anda sangat membantu keberhasilan penelitian ini. Identitas dan jawaban Anda dijamin kerahasiaannya.</textarea>')
    + field("Data Responden yang Diminta", '<input id="kuResp" class="' + IN + '" value="Nama/Inisial, Jenis Kelamin, Usia, Kelas/Semester" placeholder="Pisahkan koma — akan jadi kolom isian identitas">')
    + field("Daftar Pertanyaan (satu per baris)", '<textarea id="kuItems" rows="9" class="' + IN + '" placeholder="Format baris:&#10;Pernyataan biasa = skala Likert 5 (SS/S/R/TS/STS)&#10;[L4] = Likert 4 (SS/S/TS/STS)&#10;[PG: opsi1; opsi2; opsi3] = pilihan ganda&#10;[TB] = jawaban terbuka/uraian">Saya merasa terbantu dengan adanya bantuan sosial.\n[L4] Bantuan yang diterima sesuai dengan kebutuhan keluarga saya.\nMenurut Anda, apa manfaat terbesar bantuan sosial? [PG: Membantu biaya pendidikan; Membantu kebutuhan pangan; Membantu modal usaha; Lainnya]\nSaran Anda untuk perbaikan program bantuan sosial: [TB]</textarea>')
    + '<div class="mb-4"><p class="text-sm font-extrabold mb-2">👁 PREVIEW KUESIONER</p><div id="kuPrev"></div></div>'
    + '<div class="flex flex-wrap gap-2"><button class="' + BTN + '" onclick="unduhKuesionerDoc()">⬇️ Download Kuesioner .doc</button>'
    + '<button class="' + BTN2 + '" onclick="copyText(teksGoogleForm())">📋 Copy Teks untuk Google Form</button></div>'
    + '<p class="text-xs text-slate-500 mt-2">Teks Google Form: tempel pertanyaan satu per satu saat membuat form — format skala & pilihan sudah disiapkan per baris.</p>'
    + "</div>";
  sisipLogoField(el, null);
  el.addEventListener("input", renderKuPreview);
  renderKuPreview();
};
function parseKuItems() {
  return $("#kuItems").value.split(/\n/).map((s) => s.trim()).filter(Boolean).map((l) => {
    const pg = l.match(/\[PG:\s*([^\]]+)\]\s*$/);
    if (pg) return { q: l.replace(/\[PG:[^\]]+\]\s*$/, "").trim(), tipe: "pg", opsi: pg[1].split(";").map((s) => s.trim()).filter(Boolean) };
    if (/\[TB\]\s*$/.test(l)) return { q: l.replace(/\[TB\]\s*$/, "").trim(), tipe: "tb" };
    if (/^\[L4\]\s*/.test(l)) return { q: l.replace(/^\[L4\]\s*/, ""), tipe: "l4" };
    if (/^\[L5\]\s*/.test(l)) return { q: l.replace(/^\[L5\]\s*/, ""), tipe: "l5" };
    return { q: l, tipe: "l5" };
  });
}
function skalaLabel(tipe) { return tipe === "l4" ? ["SS", "S", "TS", "STS"] : ["SS", "S", "R", "TS", "STS"]; }
function renderKuPreview() {
  const box = $("#kuPrev"); if (!box) return;
  const items = parseKuItems();
  window._kuCount = items.length;
  const d = getLogoData();
  const resp = $("#kuResp").value.split(",").map((s) => s.trim()).filter(Boolean);
  box.innerHTML = '<div class="bg-white text-slate-900 p-6 border border-slate-200 dark:border-slate-700 bshadow-sm" style="font-family:Georgia,serif">'
    + (d ? '<p style="text-align:center;margin:0 0 4pt"><img src="' + d + '" style="height:64px;margin:0 auto"></p>' : "")
    + '<h3 class="text-center font-extrabold text-[15px] leading-snug">KUESIONER PENELITIAN</h3>'
    + '<p class="text-center font-bold text-sm mt-1">' + esc(($("#kuJudul").value.trim() || "Judul Penelitian").toUpperCase()) + "</p>"
    + '<p class="text-center text-xs">' + esc($("#kuNama").value.trim()) + "</p>"
    + '<p class="text-[13px] leading-relaxed mt-4"><b>Petunjuk Pengisian:</b> ' + esc($("#kuPetunjuk").value.trim()) + "</p>"
    + (resp.length ? '<div class="mt-3 text-[13.5px] space-y-1">' + resp.map((r) => '<p>' + esc(r) + ': <span class="inline-block border-b border-dotted border-slate-400 w-48">&nbsp;</span></p>').join("") + "</div>" : "")
    + '<div class="mt-4 space-y-2.5">' + items.map((it, i) => {
      if (it.tipe === "pg") return '<div class="text-[13.5px]"><p><b>' + (i + 1) + ".</b> " + esc(it.q) + "</p>" + it.opsi.map((o) => '<p class="ml-5">○ ' + esc(o) + "</p>").join("") + "</div>";
      if (it.tipe === "tb") return '<div class="text-[13.5px]"><p><b>' + (i + 1) + ".</b> " + esc(it.q) + '</p><p class="border-b border-dotted border-slate-400 h-5"></p><p class="border-b border-dotted border-slate-400 h-5"></p></div>';
      const sk = skalaLabel(it.tipe);
      return '<div class="text-[13.5px] flex items-start justify-between gap-2"><p class="flex-1"><b>' + (i + 1) + ".</b> " + esc(it.q) + '</p><p class="shrink-0 flex gap-1.5">' + sk.map((s) => '<span class="text-center"><span class="block text-[10px] font-bold">' + s + '</span>○</span>').join("") + "</p></div>";
    }).join("") + "</div>"
    + '<p class="text-[11px] text-slate-500 mt-4">Keterangan: SS = Sangat Setuju, S = Setuju, R = Ragu-ragu, TS = Tidak Setuju, STS = Sangat Tidak Setuju. • ' + items.length + " pertanyaan • Dibuat dengan MahasiswaTools</p></div>";
}
function kuesionerDocHtml() {
  const items = parseKuItems();
  const d = getLogoData();
  const resp = $("#kuResp").value.split(",").map((s) => s.trim()).filter(Boolean);
  let h = "<html><body style='font-family:serif;font-size:12pt'>" + kopLogoHtml("center")
    + "<h3 style='text-align:center'>KUESIONER PENELITIAN</h3><p style='text-align:center'><b>" + esc(($("#kuJudul").value.trim() || "Judul Penelitian").toUpperCase()) + "</b><br>" + esc($("#kuNama").value.trim()) + "</p>"
    + "<p><b>Petunjuk Pengisian:</b> " + esc($("#kuPetunjuk").value.trim()) + "</p>"
    + resp.map((r) => "<p>" + esc(r) + ": ______________________</p>").join("");
  const likert = items.map((it, i) => ({ it, i })).filter((x) => x.it.tipe === "l5" || x.it.tipe === "l4");
  if (likert.length) {
    h += "<table border='1' cellspacing='0' cellpadding='5' style='border-collapse:collapse;width:100%'><tr><th>No</th><th>Pernyataan</th><th>SS</th><th>S</th><th>R</th><th>TS</th><th>STS</th></tr>"
      + likert.map((x) => "<tr><td>" + (x.i + 1) + "</td><td>" + esc(x.it.q) + "</td><td></td><td></td><td>" + (x.it.tipe === "l4" ? "—" : "") + "</td><td></td><td></td></tr>").join("") + "</table>"
      + "<p style='font-size:10pt'>Kolom R (Ragu-ragu) hanya untuk skala 5 poin. Keterangan: SS = Sangat Setuju, S = Setuju, R = Ragu-ragu, TS = Tidak Setuju, STS = Sangat Tidak Setuju.</p>";
  }
  items.forEach((it, i) => {
    if (it.tipe === "pg") h += "<p><b>" + (i + 1) + ".</b> " + esc(it.q) + "<br>" + it.opsi.map((o) => "&nbsp;&nbsp;○ " + esc(o)).join("<br>") + "</p>";
    if (it.tipe === "tb") h += "<p><b>" + (i + 1) + ".</b> " + esc(it.q) + "<br>___________________________________________________________________________<br>___________________________________________________________________________</p>";
  });
  return h + "<p style='font-size:9pt;color:#888'>Dibuat dengan MahasiswaTools — Dari Mahasiswa, Untuk Mahasiswa</p></body></html>";
}
function unduhKuesionerDoc() { download("Kuesioner_Penelitian.doc", kuesionerDocHtml(), "application/msword"); toast("Kuesioner .doc diunduh 📝"); }
function teksGoogleForm() {
  const items = parseKuItems();
  return items.map((it, i) => {
    if (it.tipe === "pg") return (i + 1) + ". " + it.q + " [Pilihan Ganda]\n" + it.opsi.map((o) => "   - " + o).join("\n");
    if (it.tipe === "tb") return (i + 1) + ". " + it.q + " [Jawaban Panjang]";
    return (i + 1) + ". " + it.q + " [Skala Linear " + (it.tipe === "l4" ? "1–4: STS–SS" : "1–5: STS–SS") + "]";
  }).join("\n\n");
}
SHARE_GETTERS.kuesioner = function () { return teksGoogleForm(); };

;

/* ============================================================
   TOOL 69 — PENCARI & RAK JURNAL (OpenAlex + Crossref)
   ============================================================ */
UI.jurnal = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Cari Jurnal (kata kunci topik / judul / penulis)", '<div class="flex gap-2"><input id="juQ" class="flex-1 ' + IN + '" placeholder="cth: media sosial prestasi belajar"><button class="' + BTN + '" style="width:auto" onclick="cariJurnal()">🔎 Cari</button></div>')
    + '<p id="juStat" class="text-sm text-slate-500 mb-2">Sumber: OpenAlex (ratusan juta publikasi, gratis). Butuh internet.</p>'
    + '<div id="juHasil" class="space-y-2.5 mb-5"></div>'
    + field("Buat Sitasi dari DOI", '<div class="flex gap-2"><input id="juDoi" class="flex-1 ' + IN + '" placeholder="cth: 10.1234/jurnal.2024.001"><button class="' + BTN2 + '" style="width:auto" onclick="sitasiDariDoi()">Ambil Sitasi</button></div>')
    + '<div class="rounded-lg border border-slate-200 dark:border-slate-700 p-4 bshadow-sm"><p class="font-extrabold mb-2">📚 Rak Referensi Saya <span id="juRakInfo" class="text-xs font-semibold text-slate-500"></span></p>'
    + '<div id="juRak" class="space-y-2 mb-3"></div>'
    + '<div class="flex flex-wrap gap-2"><button class="' + BTN + '" onclick="eksporRak(\'apa\')">⬇️ Daftar Pustaka APA 7 (.doc)</button>'
    + '<button class="' + BTN2 + '" onclick="eksporRak(\'bib\')">⬇️ BibTeX (.bib)</button>'
    + '<button class="' + BTN2 + '" onclick="copyText(rakSebagaiAPA())">📋 Copy APA</button></div>'
    + '<p class="text-xs text-slate-500 mt-2">Rak tersimpan di browser ini. Format APA dibuat otomatis dari metadata — selalu periksa kembali ejaan nama & judul sebelum dipakai.</p></div>'
    + "</div>";
  renderRak();
};
function rakGet() { return store.get("mt_rak", []); }
function rakSet(a) { store.set("mt_rak", a); }
function namaAPA(nama) {
  const t = String(nama || "").trim().split(/\s+/);
  if (t.length === 1) return t[0];
  const fam = t[t.length - 1];
  const inisial = t.slice(0, -1).map((w) => w.charAt(0).toUpperCase() + ".").join(" ");
  return fam + ", " + inisial;
}
function penulisAPA(arr) {
  if (!arr || !arr.length) return "Anonim";
  const f = arr.map(namaAPA);
  if (f.length === 1) return f[0];
  if (f.length === 2) return f[0] + ", & " + f[1];
  return f.slice(0, -1).join(", ") + ", & " + f[f.length - 1];
}
function formatAPA(w) {
  return penulisAPA(w.penulis) + " (" + (w.tahun || "t.t.") + "). " + (w.judul || "") + ". " + (w.jurnal ? "<i>" + w.jurnal + "</i>. " : "") + (w.doi ? "https://doi.org/" + String(w.doi).replace(/^https?:\/\/doi.org\//, "") : "");
}
function formatAPAteks(w) { const s = formatAPA(w); const tmp = document.createElement("div"); tmp.innerHTML = s; return tmp.textContent; }
function formatBib(w, i) {
  const fam = (w.penulis && w.penulis[0] ? String(w.penulis[0]).trim().split(/\s+/).pop() : "anon").toLowerCase().replace(/[^a-z]/g, "");
  const kata = (w.judul || "").split(/\s+/).filter((x) => x.length > 3)[0] || "work";
  return "@article{" + fam + (w.tahun || "") + kata.toLowerCase().replace(/[^a-z]/g, "") + (i || "") + ",\n  author = {" + (w.penulis || []).join(" and ") + "},\n  title = {" + (w.judul || "") + "},\n  journal = {" + (w.jurnal || "") + "},\n  year = {" + (w.tahun || "") + "},\n  doi = {" + String(w.doi || "").replace(/^https?:\/\/doi.org\//, "") + "}\n}";
}
async function cariJurnal() {
  const q = $("#juQ").value.trim();
  const stat = $("#juStat"), box = $("#juHasil");
  if (!q) { stat.textContent = "⚠️ Isi kata kunci dulu."; return; }
  stat.textContent = "⏳ Mencari di OpenAlex…";
  box.innerHTML = "";
  try {
    const r = await fetch("https://api.openalex.org/works?search=" + encodeURIComponent(q) + "&per-page=10&mailto=mahasiswatools@mahasiswatools.web.id");
    if (!r.ok) throw new Error("HTTP " + r.status);
    const data = await r.json();
    const hasil = (data.results || []).map((w) => ({
      judul: w.display_name || w.title || "",
      penulis: (w.authorships || []).map((a) => a.author && a.author.display_name).filter(Boolean),
      tahun: w.publication_year || "",
      jurnal: (w.primary_location && w.primary_location.source && w.primary_location.source.display_name) || "",
      doi: w.doi || "",
      sitasi: w.cited_by_count || 0
    })).filter((w) => w.judul);
    window._hasilJurnal = hasil;
    if (!hasil.length) { stat.textContent = "Tidak ada hasil untuk kata kunci itu. Coba kata kunci Inggris yang lebih umum."; return; }
    stat.innerHTML = "✅ Ditemukan " + hasil.length + " publikasi. Klik <b>+ Rak</b> untuk menyimpan ke rak referensi.";
    box.innerHTML = hasil.map((w, i) => '<div class="rounded-lg border-2 border-slate-200 dark:border-slate-700 p-3.5 bg-white dark:bg-slate-900">'
      + '<p class="font-extrabold text-[14.5px] leading-snug">' + esc(w.judul) + "</p>"
      + '<p class="text-[12.5px] text-slate-500 mt-1">' + esc(w.penulis.slice(0, 3).join(", ") + (w.penulis.length > 3 ? ", dkk." : "")) + " • " + w.tahun + (w.jurnal ? " • " + esc(w.jurnal) : "") + "</p>"
      + '<p class="text-[12.5px] mt-0.5">📈 Disitasi ' + w.sitasi + " kali" + (w.doi ? ' • <span class="font-semibold">DOI: ' + esc(String(w.doi).replace("https://doi.org/", "")) + "</span>" : "") + "</p>"
      + '<div class="flex gap-2 mt-2"><button class="' + BTN2 + '" onclick="simpanJurnal(' + i + ')">➕ Rak</button>'
      + (w.doi ? '<button class="' + BTN2 + '" onclick="copyText(\'' + esc(formatAPAteks(w)).replace(/'/g, "\\'") + '\')">📋 Copy Sitasi APA</button>' : "") + "</div></div>").join("");
  } catch (e) {
    stat.textContent = "❌ Gagal terhubung ke OpenAlex (butuh internet). Periksa koneksi lalu coba lagi.";
    window._hasilJurnal = [];
  }
}
function simpanJurnal(i) {
  const w = (window._hasilJurnal || [])[i]; if (!w) return;
  const rak = rakGet();
  if (rak.some((x) => x.judul === w.judul)) { toast("Sudah ada di rak 📚"); return; }
  rak.push(w); rakSet(rak); renderRak();
  toast("Tersimpan ke Rak Referensi 📚");
}
async function sitasiDariDoi() {
  const doi = $("#juDoi").value.trim().replace(/^https?:\/\/doi.org\//, "");
  const stat = $("#juStat");
  if (!doi) { stat.textContent = "⚠️ Isi DOI dulu."; return; }
  stat.textContent = "⏳ Mengambil metadata dari Crossref…";
  try {
    const r = await fetch("https://api.crossref.org/works/" + encodeURIComponent(doi));
    if (!r.ok) throw new Error("404");
    const m = (await r.json()).message;
    const w = {
      judul: (m.title || [""])[0],
      penulis: (m.author || []).map((a) => ((a.given || "") + " " + (a.family || "")).trim()),
      tahun: (m.issued && m.issued["date-parts"] && m.issued["date-parts"][0][0]) || "",
      jurnal: (m["container-title"] || [""])[0],
      doi: "https://doi.org/" + doi, sitasi: m["is-referenced-by-count"] || 0
    };
    const rak = rakGet();
    if (!rak.some((x) => x.judul === w.judul)) { rak.push(w); rakSet(rak); }
    renderRak();
    stat.innerHTML = "✅ Sitasi ditemukan & disimpan ke rak: <b>" + esc(formatAPAteks(w)) + "</b>";
  } catch (e) {
    stat.textContent = "❌ DOI tidak ditemukan di Crossref. Periksa kembali DOI-nya.";
  }
}
function renderRak() {
  const box = $("#juRak"); if (!box) return;
  const rak = rakGet();
  const info = $("#juRakInfo"); if (info) info.textContent = "(" + rak.length + " referensi)";
  if (!rak.length) { box.innerHTML = '<p class="text-sm text-slate-500">Rak masih kosong — cari jurnal di atas lalu klik + Rak, atau ambil sitasi dari DOI.</p>'; return; }
  box.innerHTML = rak.map((w, i) => '<div class="flex items-start gap-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3"><p class="flex-1 text-[13px] leading-relaxed">' + formatAPA(w) + '</p><button class="shrink-0 text-rose-500 font-bold px-2" title="Hapus" onclick="hapusJurnal(' + i + ')">✕</button></div>').join("");
}
function hapusJurnal(i) { const rak = rakGet(); rak.splice(i, 1); rakSet(rak); renderRak(); }
function rakSebagaiAPA() {
  return rakGet().slice().sort((a, b) => formatAPAteks(a).localeCompare(formatAPAteks(b))).map(formatAPAteks).join("\n\n");
}
function eksporRak(mode) {
  const rak = rakGet();
  if (!rak.length) { toast("Rak masih kosong 📚"); return; }
  if (mode === "apa") {
    const isi = rak.slice().sort((a, b) => formatAPAteks(a).localeCompare(formatAPAteks(b))).map((w) => "<p style='margin:0 0 10pt'>" + formatAPA(w) + "</p>").join("");
    download("Daftar_Pustaka_APA.doc", "<html><body style='font-family:serif;font-size:12pt'><h3>DAFTAR PUSTAKA</h3>" + isi + "</body></html>", "application/msword");
  } else {
    download("Referensi.bib", rak.map((w, i) => formatBib(w, i)).join("\n\n"), "text/plain");
  }
  toast("Referensi diunduh ⬇️");
}
SHARE_GETTERS.jurnal = function () { return rakSebagaiAPA(); };

;

/* ============================================================
   TOOL 70 — UJI STATISTIK NON-PARAMETRIK + NARASI
   ============================================================ */
function normCdf(z) { const t = 1 / (1 + 0.2316419 * Math.abs(z)); const d = 0.3989422804014327 * Math.exp(-z * z / 2); let p = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429)))); if (z > 0) p = 1 - p; return p; }
function pNormDuaSisi(z) { return 2 * (1 - normCdf(Math.abs(z))); }
function ranksOf(arr) {
  const idx = arr.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]);
  const r = new Array(arr.length); let i = 0; const tieCorr = [];
  while (i < idx.length) { let j = i; while (j + 1 < idx.length && idx[j + 1][0] === idx[i][0]) j++; const avg = (i + 1 + j + 1) / 2; for (let k = i; k <= j; k++) r[idx[k][1]] = avg; if (j > i) tieCorr.push(j - i + 1); i = j + 1; }
  return { r, tieCorr };
}
function _gser(a, x) { let ap = a, s = 1 / a, d = s; for (let n = 1; n <= 200; n++) { ap += 1; d *= x / ap; s += d; if (Math.abs(d) < Math.abs(s) * 1e-9) break; } return s * Math.exp(-x + a * Math.log(x) - _lgamma(a)); }
function _gcf(a, x) { let b = x + 1 - a, c = 1e300, d = 1 / b, h = d; for (let i = 1; i <= 200; i++) { const an = -i * (i - a); b += 2; d = an * d + b; if (Math.abs(d) < 1e-300) d = 1e-300; c = b + an / c; if (Math.abs(c) < 1e-300) c = 1e-300; d = 1 / d; const del = d * c; h *= del; if (Math.abs(del - 1) < 1e-9) break; } return Math.exp(-x + a * Math.log(x) - _lgamma(a)) * h; }
function pChi2(x, df) { const a = df / 2, xx = x / 2; if (xx < a + 1) return 1 - _gser(a, xx); return _gcf(a, xx); }

UI.nonpar = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Pilih Uji Non-Parametrik", '<select id="npJenis" class="' + IN + '" onchange="npGanti()"><option value="mw">Mann-Whitney U — 2 kelompok berbeda</option><option value="wx">Wilcoxon Signed-Rank — sebelum vs sesudah</option><option value="kw">Kruskal-Wallis — 3+ kelompok</option><option value="sp">Korelasi Spearman — hubungan X & Y (data ordinal/tidak normal)</option></select>')
    + '<p id="npHint" class="rounded-lg bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800 p-3 text-[13px] mb-4"></p>'
    + '<div id="npBox1">' + field("Data Kelompok 1 / Variabel X", '<textarea id="npA" rows="5" class="' + IN + '" placeholder="Angka dipisah spasi/koma/baris baru"></textarea>') + "</div>"
    + '<div id="npBox2">' + field("Data Kelompok 2 / Variabel Y", '<textarea id="npB" rows="5" class="' + IN + '" placeholder="Kelompok pembanding / data sesudah / variabel Y"></textarea>') + "</div>"
    + '<div id="npBoxG" class="hidden">' + field("Data Semua Kelompok (satu kelompok per baris)", '<textarea id="npG" rows="6" class="' + IN + '" placeholder="Kelompok A: 80, 82, 84&#10;Kelompok B: 70, 72, 74&#10;Kelompok C: 90, 91, 93"></textarea>') + "</div>"
    + field("Nama Variabel / Kelompok (untuk narasi)", '<input id="npNama" class="' + IN + '" placeholder="cth: skor motivasi kelompok eksperimen vs kontrol">')
    + '<button class="' + BTN + '" onclick="hitungNonpar()">📉 Hitung Uji Non-Parametrik</button>'
    + outBox("npOut") + "</div>";
  npGanti();
};
function npGanti() {
  const j = $("#npJenis").value;
  const hints = { mw: "Mann-Whitney membandingkan dua kelompok independen bila data tidak normal/berskala ordinal. Isi kedua kotak data.", wx: "Wilcoxon membandingkan pasangan data yang sama (pretest–posttest) bila selisihnya tidak normal. Jumlah data kedua kotak harus sama.", kw: "Kruskal-Wallis = ANOVA non-parametrik untuk 3+ kelompok. Satu kelompok per baris.", sp: "Spearman mengukur hubungan monotonik X–Y (cocok untuk data Likert/ordinal). Jumlah data kedua kotak harus sama." };
  $("#npHint").innerHTML = hints[j];
  $("#npBox1").classList.toggle("hidden", j === "kw");
  $("#npBox2").classList.toggle("hidden", j === "kw");
  $("#npBoxG").classList.toggle("hidden", j !== "kw");
}
function npHasil(judul, baris, narasi) {
  window._npNarasi = narasi;
  $("#npOut").innerHTML = '<div class="' + OUT + '"><p class="font-extrabold mb-3">' + judul + '</p><div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">'
    + baris.map((b) => '<div class="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 text-center"><div class="text-lg font-extrabold">' + b[1] + '</div><div class="text-[11px] text-slate-500 font-semibold">' + b[0] + "</div></div>").join("") + "</div>"
    + '<p class="text-[13.5px] leading-relaxed whitespace-pre-wrap bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3.5">' + esc(narasi) + "</p>"
    + '<button class="' + BTN2 + '" onclick="copyText(window._npNarasi)">📋 Copy Narasi Bab 4</button>'
    + '<p class="text-xs text-slate-500 mt-2">Nilai p uji berbasis peringkat dihitung dengan pendekatan normal (koreksi ties & kontinuitas) — setara keluaran SPSS untuk uji yang sama pada data tanpa ties ekstrem.</p></div>';
}
function hitungNonpar() {
  const j = $("#npJenis").value, nama = $("#npNama").value.trim() || "variabel penelitian";
  const A = parseNums($("#npA").value), B = parseNums($("#npB").value);
  const err = (m) => { $("#npOut").innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ ' + m + "</div>"; };
  if (j === "mw") {
    if (A.length < 3 || B.length < 3) return err("Mann-Whitney butuh minimal 3 data per kelompok.");
    const n1 = A.length, n2 = B.length, N = n1 + n2;
    const { r, tieCorr } = ranksOf(A.concat(B));
    const R1 = r.slice(0, n1).reduce((a, b) => a + b, 0);
    const U1 = R1 - n1 * (n1 + 1) / 2, U2 = n1 * n2 - U1, U = Math.min(U1, U2);
    const mu = n1 * n2 / 2;
    const tieSum = tieCorr.reduce((a, t) => a + (t * t * t - t), 0);
    const sd = Math.sqrt(n1 * n2 / 12 * ((N + 1) - tieSum / (N * (N - 1))));
    const z = (U - mu + 0.5) / sd, p = pNormDuaSisi(z), sig = p < 0.05;
    window._npHasil = { uji: "Mann-Whitney", U, z, p };
    npHasil("Hasil Uji Mann-Whitney U", [["U", fmtN(U)], ["Rata-rata Rank Kel. 1", fmtN(R1 / n1)], ["z", fmtN(z, 3)], ["Nilai p", fmtP(p)], ["Kesimpulan", sig ? "BERBEDA SIGNIFIKAN ✅" : "Tidak Berbeda ❌"]],
      "Berdasarkan hasil uji Mann-Whitney U terhadap " + nama + ", diperoleh nilai U sebesar " + fmtN(U) + " dengan nilai z sebesar " + fmtN(z, 3) + " dan signifikansi (p) sebesar " + fmtP(p) + ". Rata-rata peringkat kelompok pertama adalah " + fmtN(R1 / n1) + " dan kelompok kedua " + fmtN((r.slice(n1).reduce((a, b) => a + b, 0)) / n2) + ". Karena nilai p " + (sig ? "lebih kecil dari 0,05, dapat disimpulkan bahwa terdapat perbedaan yang signifikan antara kedua kelompok." : "lebih besar dari 0,05, dapat disimpulkan bahwa tidak terdapat perbedaan yang signifikan antara kedua kelompok."));
  }
  else if (j === "wx") {
    if (A.length !== B.length || A.length < 3) return err("Wilcoxon butuh jumlah data yang sama di kedua kotak (minimal 3 pasang).");
    const diffs = A.map((x, i) => B[i] - x).filter((d) => d !== 0);
    if (diffs.length < 3) return err("Pasangan yang berbeda (bukan nol) kurang dari 3 — uji tidak dapat dilakukan.");
    const { r, tieCorr } = ranksOf(diffs.map(Math.abs));
    let Wp = 0, Wm = 0;
    diffs.forEach((d, i) => { if (d > 0) Wp += r[i]; else Wm += r[i]; });
    const W = Math.min(Wp, Wm), n = diffs.length;
    const mu = n * (n + 1) / 4;
    const tieSum = tieCorr.reduce((a, t) => a + (t * t * t - t), 0);
    const sd = Math.sqrt(n * (n + 1) * (2 * n + 1) / 24 - tieSum / 48);
    const z = (W - mu + 0.5) / sd, p = pNormDuaSisi(z), sig = p < 0.05;
    window._npHasil = { uji: "Wilcoxon", W, Wp, Wm, z, p };
    npHasil("Hasil Uji Wilcoxon Signed-Rank", [["W (min W+/W−)", fmtN(W)], ["W+", fmtN(Wp)], ["W−", fmtN(Wm)], ["z", fmtN(z, 3)], ["Nilai p", fmtP(p)], ["Kesimpulan", sig ? "BERBEDA SIGNIFIKAN ✅" : "Tidak Berbeda ❌"]],
      "Berdasarkan hasil uji Wilcoxon Signed-Rank terhadap " + nama + ", diperoleh jumlah peringkat positif (W+) sebesar " + fmtN(Wp) + " dan peringkat negatif (W−) sebesar " + fmtN(Wm) + ", dengan nilai z sebesar " + fmtN(z, 3) + " dan signifikansi (p) sebesar " + fmtP(p) + ". Karena nilai p " + (sig ? "lebih kecil dari 0,05, dapat disimpulkan bahwa terdapat perbedaan yang signifikan antara data sebelum dan sesudah." : "lebih besar dari 0,05, dapat disimpulkan bahwa tidak terdapat perbedaan yang signifikan antara data sebelum dan sesudah."));
  }
  else if (j === "kw") {
    const groups = $("#npG").value.split(/\n/).map((l) => parseNums(l.replace(/^[^:]*:/, ""))).filter((g) => g.length >= 2);
    if (groups.length < 3) return err("Kruskal-Wallis butuh minimal 3 kelompok (satu per baris, masing-masing ≥2 data).");
    const all = groups.flat(), N = all.length;
    const { r, tieCorr } = ranksOf(all);
    let pos = 0, sum = 0;
    const Rg = groups.map((g) => { let s = 0; for (let i = 0; i < g.length; i++) s += r[pos++]; sum += (s * s) / g.length; return s; });
    let H = 12 / (N * (N + 1)) * sum - 3 * (N + 1);
    const tieSum = tieCorr.reduce((a, t) => a + (t * t * t - t), 0);
    const corr = 1 - tieSum / (N * N * N - N);
    if (corr > 0) H = H / corr;
    const df = groups.length - 1, p = pChi2(H, df), sig = p < 0.05;
    window._npHasil = { uji: "Kruskal-Wallis", H, df, p };
    npHasil("Hasil Uji Kruskal-Wallis", [["H", fmtN(H, 3)], ["df", df], ["Nilai p", fmtP(p)], ["Kesimpulan", sig ? "ADA PERBEDAAN ✅" : "Tidak Berbeda ❌"]],
      "Berdasarkan hasil uji Kruskal-Wallis terhadap " + nama + ", diperoleh nilai H sebesar " + fmtN(H, 3) + " dengan df = " + df + " dan signifikansi (p) sebesar " + fmtP(p) + ". Rata-rata peringkat tiap kelompok adalah " + groups.map((g, i) => "kelompok " + (i + 1) + " = " + fmtN(Rg[i] / g.length)).join(", ") + ". Karena nilai p " + (sig ? "lebih kecil dari 0,05, dapat disimpulkan bahwa terdapat perbedaan yang signifikan di antara kelompok-kelompok tersebut; lanjutkan dengan uji Mann-Whitney berpasangan (post-hoc) untuk mengetahui pasangan yang berbeda." : "lebih besar dari 0,05, dapat disimpulkan bahwa tidak terdapat perbedaan yang signifikan di antara kelompok-kelompok tersebut."));
  }
  else if (j === "sp") {
    if (A.length !== B.length || A.length < 4) return err("Spearman butuh jumlah data X dan Y yang sama (minimal 4 pasang).");
    const ra = ranksOf(A).r, rb = ranksOf(B).r, n = A.length;
    const rho = pearson(ra, rb);
    const t = rho * Math.sqrt(n - 2) / Math.sqrt(1 - rho * rho), p = pDariT(Math.abs(t), n - 2), sig = p < 0.05;
    const kuat = Math.abs(rho) >= 0.8 ? "sangat kuat" : Math.abs(rho) >= 0.6 ? "kuat" : Math.abs(rho) >= 0.4 ? "sedang" : Math.abs(rho) >= 0.2 ? "lemah" : "sangat lemah";
    window._npHasil = { uji: "Spearman", rho, p };
    npHasil("Hasil Korelasi Spearman", [["rho (ρ)", fmtN(rho, 3)], ["Kekuatan", kuat], ["Nilai p", fmtP(p)], ["Kesimpulan", sig ? "SIGNIFIKAN ✅" : "Tidak Signifikan ❌"]],
      "Berdasarkan hasil uji korelasi Spearman, diperoleh nilai koefisien korelasi (rho) sebesar " + fmtN(rho, 3) + " dengan signifikansi (p) sebesar " + fmtP(p) + ". Nilai tersebut menunjukkan hubungan yang " + kuat + " dan bersifat " + (rho >= 0 ? "positif (searah)" : "negatif (berlawanan arah)") + " antara kedua variabel pada " + nama + ". Karena nilai p " + (sig ? "lebih kecil dari 0,05, hubungan tersebut dinyatakan signifikan secara statistik." : "lebih besar dari 0,05, hubungan tersebut dinyatakan tidak signifikan secara statistik."));
  }
}

/* ============================================================
   TOOL 71 — LEMBAR PERSETUJUAN RESPONDEN (INFORMED CONSENT)
   ============================================================ */
UI.consent = function (el) {
  el.innerHTML = '<div class="fadein">'
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Judul Penelitian", '<input id="icJudul" class="' + IN + '" placeholder="Judul lengkap penelitian">')
    + field("Nama Peneliti", '<input id="icNama" class="' + IN + '" placeholder="Nama peneliti utama">')
    + field("Institusi Peneliti", '<input id="icInst" class="' + IN + '" placeholder="Prodi — Universitas">')
    + field("Kontak Peneliti (HP/Email)", '<input id="icKontak" class="' + IN + '" placeholder="Untuk pertanyaan responden">')
    + "</div>"
    + field("Tujuan Penelitian", '<textarea id="icTujuan" rows="2" class="' + IN + '" placeholder="Jelaskan dengan bahasa sederhana untuk orang awam"></textarea>')
    + field("Prosedur yang Akan Dialami Responden", '<textarea id="icProsedur" rows="2" class="' + IN + '" placeholder="cth: Mengisi kuesioner ±10 menit / wawancara ±30 menit yang direkam atas izin"></textarea>')
    + field("Manfaat & Risiko", '<textarea id="icRisiko" rows="2" class="' + IN + '">Penelitian ini tidak menimbulkan risiko berarti bagi responden. Hasil penelitian diharapkan bermanfaat bagi pengembangan ilmu dan perbaikan program terkait.</textarea>')
    + '<div class="mb-4"><p class="text-sm font-extrabold mb-2">👁 PREVIEW LEMBAR PERSETUJUAN</p><div id="icPrev"></div></div>'
    + '<div class="flex flex-wrap gap-2"><button class="' + BTN + '" onclick="unduhConsent()">⬇️ Download .doc (Siap Tanda Tangan)</button>'
    + '<button class="' + BTN2 + '" onclick="copyText(window._consentText || \'\')">📋 Copy Teks</button></div>'
    + "</div>";
  sisipLogoField(el, null);
  el.addEventListener("input", renderConsent);
  renderConsent();
};
function consentTeks() {
  const g = (id) => $("#" + id) ? $("#" + id).value.trim() : "";
  return "LEMBAR PERSETUJUAN MENJADI RESPONDEN\n(INFORMED CONSENT)\n\n"
    + "Judul Penelitian: " + (g("icJudul") || "(judul penelitian)") + "\nPeneliti: " + (g("icNama") || "(nama peneliti)") + "\nInstitusi: " + (g("icInst") || "(institusi)") + "\n\n"
    + "PENJELASAN PENELITIAN\n" + (g("icTujuan") || "Penelitian ini bertujuan untuk memperoleh data dalam rangka penyusunan karya ilmiah (skripsi).") + "\n\n"
    + "PROSEDUR\n" + (g("icProsedur") || "Responden akan diminta mengisi kuesioner/ mengikuti wawancara sesuai petunjuk peneliti.") + "\n\n"
    + "MANFAAT DAN RISIKO\n" + g("icRisiko") + "\n\n"
    + "KERAHASIAAN DAN KESEDIAAN\nIdentitas dan seluruh jawaban responden dijamin kerahasiaannya dan hanya digunakan untuk kepentingan penelitian. Partisipasi bersifat sukarela; responden berhak menolak atau mengundurkan diri kapan pun tanpa konsekuensi apa pun.\n\n"
    + "Apabila ada hal yang ingin ditanyakan, responden dapat menghubungi peneliti melalui " + (g("icKontak") || "(kontak peneliti)") + ".\n\n"
    + "PERNYATAAN PERSETUJUAN\nSaya yang bertanda tangan di bawah ini menyatakan telah membaca/mendengarkan penjelasan di atas dan bersedia menjadi responden dalam penelitian ini secara sukarela.\n\n"
    + "Nama Responden: ______________________\nTanggal: ______________________\n\nTanda tangan responden,\t\tTanda tangan peneliti,\n\n\n( ______________________ )\t\t( " + (g("icNama") || "______________________") + " )";
}
function renderConsent() {
  const box = $("#icPrev"); if (!box) return;
  const t = consentTeks();
  window._consentText = t;
  const d = getLogoData();
  box.innerHTML = '<div class="bg-white text-slate-900 p-6 border border-slate-200 dark:border-slate-700 bshadow-sm" style="font-family:Georgia,serif">'
    + (d ? '<p style="text-align:center;margin:0 0 4pt"><img src="' + d + '" style="height:64px;margin:0 auto"></p>' : "")
    + '<div class="whitespace-pre-wrap text-[13.5px] leading-relaxed">' + esc(t) + "</div></div>";
}
function consentDocHtml() { return "<html><body style='font-family:serif;font-size:12pt'>" + kopLogoHtml("center") + "<div style='white-space:pre-wrap'>" + esc(consentTeks()) + "</div><p style='font-size:9pt;color:#888'>Dibuat dengan MahasiswaTools — Dari Mahasiswa, Untuk Mahasiswa</p></body></html>"; }
function unduhConsent() { download("Lembar_Persetujuan_Responden.doc", consentDocHtml(), "application/msword"); toast("Lembar persetujuan diunduh 🤝"); }
SHARE_GETTERS.consent = function () { return window._consentText || ""; };

;

/* ============================================================
   TOOL 72 — KODING KUALITATIF TRANSKRIP
   ============================================================ */
const KOD_WARNA = ["#FDE047", "#A7F3D0", "#BFDBFE", "#FBCFE8", "#FED7AA", "#DDD6FE", "#99F6E4", "#FECACA"];
UI.koding = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Transkrip Wawancara / Catatan Lapangan", '<textarea id="kdIn" rows="7" class="' + IN + '" placeholder="Tempel transkrip di sini. Pisahkan tiap segmen (jawaban/ucapan) dengan BARIS KOSONG."></textarea>')
    + '<button class="' + BTN + '" onclick="pecahSegmen()">✂️ Pecah Jadi Segmen</button>'
    + '<div class="rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 p-3.5 mb-4"><p class="text-sm font-extrabold mb-2">🏷️ Buku Kode (Tema)</p>'
    + '<div class="flex gap-2 mb-2.5"><input id="kdKodeBaru" class="flex-1 ' + IN + '" placeholder="Nama kode baru, cth: Manfaat Ekonomi"><button class="' + BTN2 + '" style="width:auto" onclick="tambahKode()">+ Kode</button></div>'
    + '<div id="kdKodeList" class="flex flex-wrap gap-2"></div>'
    + '<p class="text-xs text-slate-500 mt-2">Pilih kode aktif, lalu klik segmen untuk menandainya (klik lagi untuk melepas).</p></div>'
    + '<div id="kdStats" class="mb-3"></div>'
    + '<div id="kdSegs" class="space-y-2 mb-4"></div>'
    + '<div class="flex flex-wrap gap-2"><button class="' + BTN + '" onclick="unduhKoding()">⬇️ Download Tabel Koding .doc</button>'
    + '<button class="' + BTN2 + '" onclick="copyText(ringkasanKoding())">📋 Copy Ringkasan Tema</button></div>'
    + "</div>";
  const lama = store.get("mt_koding", null);
  if (lama && lama.segs && lama.segs.length) { window._kodSegs = lama.segs; window._kodCodes = lama.codes || []; }
  else { window._kodSegs = []; window._kodCodes = []; }
  window._kodAktif = "";
  renderKoding();
};
function simpanKoding() { store.set("mt_koding", { segs: window._kodSegs, codes: window._kodCodes }); }
function pecahSegmen() {
  const raw = $("#kdIn").value.trim();
  if (!raw) { toast("⚠️ Tempel transkrip dulu."); return; }
  window._kodSegs = raw.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean).map((teks) => ({ teks, kode: "" }));
  simpanKoding(); renderKoding();
  toast(window._kodSegs.length + " segmen terbentuk ✂️");
}
function tambahKode() {
  const v = $("#kdKodeBaru").value.trim();
  if (!v) return;
  if (!window._kodCodes.includes(v)) window._kodCodes.push(v);
  $("#kdKodeBaru").value = "";
  window._kodAktif = v;
  simpanKoding(); renderKoding();
}
function pilihKode(k) { window._kodAktif = (window._kodAktif === k ? "" : k); renderKoding(); }
function tandaiSegmen(i) {
  if (!window._kodAktif) { toast("Pilih kode aktif dulu di Buku Kode 🏷️"); return; }
  const s = window._kodSegs[i];
  s.kode = (s.kode === window._kodAktif ? "" : window._kodAktif);
  simpanKoding(); renderKoding();
}
function warnaKode(k) { const i = window._kodCodes.indexOf(k); return KOD_WARNA[Math.max(0, i) % KOD_WARNA.length]; }
function renderKoding() {
  const kl = $("#kdKodeList"); if (!kl) return;
  kl.innerHTML = window._kodCodes.length ? window._kodCodes.map((k) => '<button onclick="pilihKode(\'' + esc(k).replace(/'/g, "\\'") + '\')" class="px-3 py-1.5 rounded-full text-[13px] font-bold border-2 ' + (window._kodAktif === k ? "border-slate-300 dark:border-slate-600" : "border-transparent") + '" style="background:' + warnaKode(k) + ';color:#111">' + esc(k) + "</button>").join("") : '<span class="text-sm text-slate-500">Belum ada kode — tambahkan tema pertama di atas.</span>';
  const total = window._kodSegs.length, terkode = window._kodSegs.filter((s) => s.kode).length;
  const stats = $("#kdStats");
  if (stats) stats.innerHTML = total ? '<div class="flex flex-wrap gap-2">' + window._kodCodes.map((k) => { const c = window._kodSegs.filter((s) => s.kode === k).length; return '<span class="px-2.5 py-1 rounded-lg text-xs font-extrabold border-2 border-black/10" style="background:' + warnaKode(k) + ';color:#111">' + esc(k) + ": " + c + " segmen (" + (total ? Math.round(c / total * 100) : 0) + "%)</span>"; }).join("") + '<span class="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-slate-900 text-white dark:bg-white dark:text-slate-900">Terkode: ' + terkode + "/" + total + "</span></div>" : "";
  const box = $("#kdSegs");
  if (box) box.innerHTML = total ? window._kodSegs.map((s, i) => '<div onclick="tandaiSegmen(' + i + ')" class="cursor-pointer rounded-lg border-2 p-3 text-[13.5px] leading-relaxed bg-white dark:bg-slate-900 ' + (s.kode ? "border-slate-300 dark:border-slate-600" : "border-slate-200 dark:border-slate-700") + '"><span class="text-[11px] font-extrabold text-slate-400 mr-1.5">#' + (i + 1) + "</span>" + esc(s.teks) + (s.kode ? ' <span class="ml-1.5 px-2 py-0.5 rounded-full text-[11px] font-extrabold" style="background:' + warnaKode(s.kode) + ';color:#111">' + esc(s.kode) + "</span>" : "") + "</div>").join("") : '<p class="text-sm text-slate-500">Belum ada segmen — tempel transkrip lalu klik “Pecah Jadi Segmen”.</p>';
}
function ringkasanKoding() {
  const total = window._kodSegs.length;
  let t = "RINGKASAN KODING KUALITATIF\nTotal segmen: " + total + "\n\n";
  window._kodCodes.forEach((k) => { const c = window._kodSegs.filter((s) => s.kode === k).length; t += "• " + k + ": " + c + " segmen (" + (total ? Math.round(c / total * 100) : 0) + "%)\n"; });
  return t;
}
function unduhKoding() {
  if (!window._kodSegs.length) { toast("Belum ada segmen 📄"); return; }
  let h = "<html><body style='font-family:serif;font-size:12pt'><h3>TABEL KODING KUALITATIF</h3><table border='1' cellspacing='0' cellpadding='6' style='border-collapse:collapse;width:100%'><tr><th>No</th><th>Segmen Data</th><th>Kode/Tema</th></tr>"
    + window._kodSegs.map((s, i) => "<tr><td>" + (i + 1) + "</td><td>" + esc(s.teks) + "</td><td>" + esc(s.kode || "—") + "</td></tr>").join("") + "</table>"
    + "<h4>Ringkasan Frekuensi Tema</h4><table border='1' cellspacing='0' cellpadding='6' style='border-collapse:collapse'><tr><th>Tema</th><th>Frekuensi</th><th>Persentase</th></tr>"
    + window._kodCodes.map((k) => { const c = window._kodSegs.filter((s) => s.kode === k).length; return "<tr><td>" + esc(k) + "</td><td>" + c + "</td><td>" + (window._kodSegs.length ? Math.round(c / window._kodSegs.length * 100) : 0) + "%</td></tr>"; }).join("") + "</table>"
    + "<p style='font-size:9pt;color:#888'>Dibuat dengan MahasiswaTools — Dari Mahasiswa, Untuk Mahasiswa</p></body></html>";
  download("Tabel_Koding.doc", h, "application/msword");
  toast("Tabel koding diunduh ⬇️");
}
SHARE_GETTERS.koding = function () { return ringkasanKoding(); };

/* ============================================================
   TOOL 73 — DAFTAR HADIR & BERITA ACARA
   ============================================================ */
UI.hadir = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Jenis Dokumen", '<select id="hdMode" class="' + IN + '" onchange="renderHadir()"><option value="hadir">📋 Daftar Hadir Kegiatan</option><option value="berita">📰 Berita Acara Kegiatan</option></select>')
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Nama Kegiatan", '<input id="hdKegiatan" class="' + IN + '" placeholder="cth: Seminar Nasional Kewirausahaan 2026">')
    + field("Penyelenggara", '<input id="hdPeny" class="' + IN + '" placeholder="cth: HIMA Ekonomi — Universitas Contoh">')
    + field("Hari, Tanggal", '<input id="hdTgl" class="' + IN + '" placeholder="cth: Sabtu, 14 November 2026">')
    + field("Waktu & Tempat", '<input id="hdWaktu" class="' + IN + '" placeholder="cth: 08.00–15.00 WIB, Aula Kampus">')
    + "</div>"
    + '<div id="hdBoxHadir">' + field("Daftar Nama Peserta (satu per baris, format: Nama | Instansi)", '<textarea id="hdNama" rows="6" class="' + IN + '" placeholder="Andini Prameswari | Univ. Contoh&#10;Bima Aditya Nugraha | Univ. Contoh&#10;Citra Dewi Lestari | SMAN 1"></textarea>') + "</div>"
    + '<div id="hdBoxBerita" class="hidden">'
    + field("Hasil / Kesimpulan Kegiatan (satu poin per baris)", '<textarea id="hdHasil" rows="4" class="' + IN + '" placeholder="Kegiatan berjalan lancar dan dihadiri peserta sesuai target&#10;Disepakati tindak lanjut berupa pelatihan lanjutan bulan depan"></textarea>')
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Pimpinan Kegiatan/Rapat", '<input id="hdPimpin" class="' + IN + '" placeholder="Nama pimpinan">')
    + field("Notulis / Sekretaris", '<input id="hdNotulis" class="' + IN + '" placeholder="Nama notulis">')
    + "</div></div>"
    + '<div class="mb-4"><p class="text-sm font-extrabold mb-2">👁 PREVIEW DOKUMEN</p><div id="hdPrev"></div></div>'
    + '<button class="' + BTN + '" onclick="unduhHadir()">⬇️ Download .doc</button>'
    + "</div>";
  sisipLogoField(el, null);
  el.addEventListener("input", renderHadir);
  renderHadir();
};
function hdData() {
  const g = (id) => $("#" + id) ? $("#" + id).value.trim() : "";
  return { mode: g("hdMode") || "hadir", keg: g("hdKegiatan"), peny: g("hdPeny"), tgl: g("hdTgl"), waktu: g("hdWaktu"),
    peserta: g("hdNama").split(/\n/).map((s) => s.trim()).filter(Boolean).map((l) => { const p = l.split("|").map((x) => x.trim()); return { nama: p[0], inst: p[1] || "" }; }),
    hasil: g("hdHasil").split(/\n/).map((s) => s.trim()).filter(Boolean), pimpin: g("hdPimpin"), notulis: g("hdNotulis") };
}
function hadirDocHtml() {
  const d = hdData();
  const kop = kopLogoHtml("center") + "<p style='text-align:center;margin:0'><b>" + esc((d.peny || "Penyelenggara").toUpperCase()) + "</b></p>";
  if (d.mode === "hadir") {
    return "<html><body style='font-family:serif;font-size:12pt'>" + kop
      + "<h3 style='text-align:center'>DAFTAR HADIR</h3><p style='text-align:center'><b>" + esc(d.keg || "Nama Kegiatan") + "</b><br>" + esc(d.tgl) + (d.waktu ? " • " + esc(d.waktu) : "") + "</p>"
      + "<table border='1' cellspacing='0' cellpadding='6' style='border-collapse:collapse;width:100%'><tr><th style='width:5%'>No</th><th style='width:38%'>Nama</th><th style='width:27%'>Instansi</th><th style='width:15%'>Tanda Tangan</th><th style='width:15%'>Tanda Tangan</th></tr>"
      + d.peserta.map((p, i) => "<tr><td>" + (i + 1) + "</td><td>" + esc(p.nama) + "</td><td>" + esc(p.inst) + "</td><td>" + (i % 2 === 0 ? (i + 1) + ". " : "") + "</td><td>" + (i % 2 === 1 ? (i + 1) + ". " : "") + "</td></tr>").join("") + "</table>"
      + "<p style='font-size:10pt'>Jumlah peserta hadir: " + d.peserta.length + " orang.</p><p style='font-size:9pt;color:#888'>Dibuat dengan MahasiswaTools</p></body></html>";
  }
  return "<html><body style='font-family:serif;font-size:12pt'>" + kop
    + "<h3 style='text-align:center'>BERITA ACARA KEGIATAN</h3>"
    + "<p>Pada hari ini, " + esc(d.tgl || "__________") + ", bertempat di " + esc(d.waktu.split(",").slice(1).join(",").trim() || d.waktu || "__________") + ", telah dilaksanakan kegiatan:</p>"
    + "<p><b>" + esc(d.keg || "Nama Kegiatan") + "</b><br>Penyelenggara: " + esc(d.peny) + "<br>Waktu: " + esc(d.waktu) + "</p>"
    + "<p>Dengan hasil/kesimpulan sebagai berikut:</p>" + d.hasil.map((h, i) => "<p>" + (i + 1) + ". " + esc(h) + "</p>").join("")
    + "<p>Demikian berita acara ini dibuat dengan sebenarnya untuk digunakan sebagaimana mestinya.</p><br>"
    + "<table style='width:100%'><tr><td style='width:50%'>Notulis / Sekretaris,<br><br><br><br>( " + esc(d.notulis || "________________") + " )</td><td>Pimpinan Kegiatan,<br><br><br><br>( " + esc(d.pimpin || "________________") + " )</td></tr></table>"
    + "<p style='font-size:9pt;color:#888'>Dibuat dengan MahasiswaTools</p></body></html>";
}
function renderHadir() {
  const box = $("#hdPrev"); if (!box) return;
  const d = hdData();
  $("#hdBoxHadir").classList.toggle("hidden", d.mode !== "hadir");
  $("#hdBoxBerita").classList.toggle("hidden", d.mode !== "berita");
  window._hdCount = d.peserta.length;
  if (d.mode === "hadir") {
    box.innerHTML = '<div class="bg-white text-slate-900 p-5 border border-slate-200 dark:border-slate-700 bshadow-sm" style="font-family:Georgia,serif">'
      + (getLogoData() ? '<p style="text-align:center;margin:0"><img src="' + getLogoData() + '" style="height:52px;margin:0 auto"></p>' : "")
      + '<p class="text-center font-extrabold text-sm">DAFTAR HADIR</p><p class="text-center font-bold text-[13px]">' + esc(d.keg || "Nama Kegiatan") + '</p><p class="text-center text-xs">' + esc(d.tgl) + (d.waktu ? " • " + esc(d.waktu) : "") + "</p>"
      + '<table class="w-full text-[12.5px] mt-3" style="border-collapse:collapse"><tr><th class="border border-slate-400 px-2 py-1">No</th><th class="border border-slate-400 px-2 py-1 text-left">Nama</th><th class="border border-slate-400 px-2 py-1 text-left">Instansi</th><th class="border border-slate-400 px-2 py-1">TTD</th></tr>'
      + d.peserta.map((p, i) => '<tr><td class="border border-slate-300 px-2 py-1 text-center">' + (i + 1) + '</td><td class="border border-slate-300 px-2 py-1">' + esc(p.nama) + '</td><td class="border border-slate-300 px-2 py-1">' + esc(p.inst) + '</td><td class="border border-slate-300 px-2 py-1 text-slate-400">' + (i + 1) + ".</td></tr>").join("") + "</table>"
      + '<p class="text-[11.5px] mt-2">Jumlah peserta: ' + d.peserta.length + " orang (di .doc, kolom tanda tangan dibuat zig-zag dua kolom seperti format resmi).</p></div>";
  } else {
    box.innerHTML = '<div class="bg-white text-slate-900 p-5 border border-slate-200 dark:border-slate-700 bshadow-sm whitespace-pre-wrap text-[13.5px] leading-relaxed" style="font-family:Georgia,serif">'
      + (getLogoData() ? '<p style="text-align:center;margin:0"><img src="' + getLogoData() + '" style="height:52px;margin:0 auto"></p>' : "")
      + "<b>BERITA ACARA KEGIATAN</b>\n\n" + esc(d.keg || "Nama Kegiatan") + "\n" + esc(d.tgl) + " • " + esc(d.waktu) + "\n\nHasil/Kesimpulan:\n" + d.hasil.map((h, i) => (i + 1) + ". " + h).join("\n") + "\n\nNotulis: " + esc(d.notulis || "—") + " • Pimpinan: " + esc(d.pimpin || "—") + "</div>";
  }
}
function unduhHadir() { download(hdData().mode === "hadir" ? "Daftar_Hadir.doc" : "Berita_Acara.doc", hadirDocHtml(), "application/msword"); toast("Dokumen diunduh ⬇️"); }

/* ============================================================
   TOOL 74 — GENERATOR IDE JUDUL SKRIPSI
   ============================================================ */
UI.judul = function (el) {
  el.innerHTML = '<div class="fadein">'
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Variabel / Topik X", '<input id="jdX" class="' + IN + '" placeholder="cth: Penggunaan Media Sosial">')
    + field("Variabel / Topik Y", '<input id="jdY" class="' + IN + '" placeholder="cth: Prestasi Belajar (boleh kosong)">')
    + field("Lokasi / Objek Penelitian", '<input id="jdZ" class="' + IN + '" placeholder="cth: Siswa SMA Negeri 1 Lahat">')
    + field("Jenis / Metode Penelitian", '<select id="jdM" class="' + IN + '"><option value="pengaruh">Kuantitatif — Pengaruh/Hubungan</option><option value="eksperimen">Eksperimen / Perbandingan</option><option value="kualitatif">Kualitatif — Studi Kasus/Fenomenologi</option><option value="rnd">Pengembangan (R&D)</option><option value="ptk">Penelitian Tindakan Kelas (PTK)</option><option value="evaluasi">Evaluasi / Analisis</option></select>')
    + "</div>"
    + '<button class="' + BTN + '" onclick="buatIdeJudul()">💡 Buat Ide Judul</button>'
    + '<p class="text-xs text-slate-500 mb-3">Klik judul untuk menyalin. Jadikan pancingan ide — selalu diskusikan & sesuaikan dengan dosen pembimbing.</p>'
    + '<div id="jdHasil" class="space-y-2"></div>'
    + "</div>";
};
function polaJudul(m, X, Y, Z) {
  const xz = Z ? " pada " + Z : "", xd = Z ? " di " + Z : "";
  switch (m) {
    case "pengaruh": return [
      "Pengaruh " + X + " terhadap " + Y + xz, "Hubungan antara " + X + " dengan " + Y + xz,
      "Pengaruh " + X + " terhadap " + Y + " dan Implikasinya" + xd, "Kontribusi " + X + " terhadap Peningkatan " + Y + xz,
      "Analisis Pengaruh " + X + " terhadap " + Y + xz, "Seberapa Besar Pengaruh " + X + " terhadap " + Y + "?" + (Z ? " (Studi pada " + Z + ")" : ""),
      "Pengaruh " + X + " dan Faktor Lain terhadap " + Y + xz, "Determinan " + Y + ": Peran " + X + xz,
      "Pengaruh " + X + " terhadap " + Y + " Ditinjau dari Aspek Sosial Ekonomi" + xz, "Model Hubungan " + X + " dengan " + Y + xz];
    case "eksperimen": return [
      "Perbedaan " + Y + " antara Kelompok yang Menggunakan " + X + " dan Kelompok Konvensional" + xz,
      "Efektivitas " + X + " dalam Meningkatkan " + Y + xz, "Pengaruh Penerapan " + X + " terhadap " + Y + ": Studi Eksperimen" + xz,
      "Komparasi Hasil " + Y + " Menggunakan " + X + " dan Metode Konvensional" + xz,
      "Keefektifan " + X + " terhadap Peningkatan " + Y + xz, "Eksperimentasi " + X + " untuk Meningkatkan " + Y + xz];
    case "kualitatif": return [
      "Studi Kasus: " + X + xz, "Fenomena " + X + " dalam Perspektif " + (Z || "Masyarakat") + ": Kajian Fenomenologi",
      "Makna " + X + " bagi " + (Z || "Pelaku") + ": Sebuah Studi Kualitatif", "Dinamika " + X + xd + ": Analisis Naratif",
      "Potret " + X + xz, "Strategi " + (Z || "Subjek") + " dalam Menghadapi " + X + ": Studi Kasus" + xd,
      "Eksplorasi " + X + " dan Dampaknya terhadap " + Y + xz, "Peran " + X + " dalam Kehidupan " + (Z || "Subjek Penelitian")];
    case "rnd": return [
      "Pengembangan " + X + " untuk Meningkatkan " + Y + xz, "Pengembangan Media " + X + " Berbasis Teknologi pada Pembelajaran" + xz,
      "Rancang Bangun " + X + " guna Mendukung " + Y + xz, "Pengembangan " + X + " dengan Model ADDIE" + xz,
      "Validitas dan Kepraktisan " + X + " untuk " + Y + xz, "Pengembangan Instrumen Penilaian " + Y + " Berbasis " + X + xz];
    case "ptk": return [
      "Peningkatan " + Y + " melalui Penerapan " + X + xz, "Upaya Meningkatkan " + Y + " dengan " + X + ": Penelitian Tindakan Kelas" + xz,
      "Penerapan " + X + " untuk Meningkatkan " + Y + xz, "Optimalisasi " + Y + " melalui Strategi " + X + xz,
      "Meningkatkan " + Y + " Menggunakan " + X + " (Penelitian Tindakan Kelas)" + xz];
    default: return [
      "Analisis " + X + " terhadap " + Y + xz, "Evaluasi " + X + xd, "Analisis Faktor-Faktor yang Memengaruhi " + Y + xz,
      "Tinjauan " + X + " dalam Meningkatkan " + Y + xz, "Studi Evaluatif: Implementasi " + X + xz,
      "Analisis Efektivitas " + X + " terhadap " + Y + xz, "Peran " + X + " dalam " + Y + xz];
  }
}
function buatIdeJudul() {
  const X = $("#jdX").value.trim(), Y = $("#jdY").value.trim(), Z = $("#jdZ").value.trim(), m = $("#jdM").value;
  if (!X) { toast("⚠️ Isi minimal Variabel/Topik X."); return; }
  const pola = polaJudul(m, X, Y || "(variabel terikat)", Z);
  window._judulList = pola;
  $("#jdHasil").innerHTML = pola.map((j) => '<button onclick="copyText(this.dataset.j)" data-j="' + esc(j) + '" class="w-full text-left rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 font-bold text-[14.5px] hover:border-slate-400 dark:hover:border-indigo-400 transition-colors">' + esc(j) + "</button>").join("");
  toast(pola.length + " ide judul dibuat 💡");
}

;

/* ============================================================
   TOOL 75 — KALKULATOR TARGET BIAYA KULIAH
   ============================================================ */
UI.biaya = function (el) {
  el.innerHTML = '<div class="fadein">'
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("UKT / SPP per Semester (Rp)", '<input id="byUkt" type="number" class="' + IN + '" value="3500000">')
    + field("Sisa Semester (termasuk semester ini)", '<input id="bySisa" type="number" class="' + IN + '" value="4">')
    + field("Tabungan yang Sudah Terkumpul (Rp)", '<input id="byPunya" type="number" class="' + IN + '" value="1000000">')
    + field("Target Terkumpul Dalam (bulan)", '<input id="byBulan" type="number" class="' + IN + '" value="12">')
    + "</div>"
    + field("Biaya Lain Sekali Bayar (format: Nama | Jumlah) — KKN, skripsi, wisuda, dll.", '<textarea id="byLain" rows="3" class="' + IN + '">KKN | 1500000\nCetak & jilid skripsi | 500000\nWisuda & toga | 750000</textarea>')
    + '<div id="byOut"></div>'
    + "</div>";
  el.addEventListener("input", renderBiaya);
  renderBiaya();
};
function renderBiaya() {
  const box = $("#byOut"); if (!box) return;
  const num = (id) => Number(($("#" + id) || {}).value) || 0;
  const uktTotal = num("byUkt") * num("bySisa");
  const lain = $("#byLain").value.split(/\n/).map((s) => s.trim()).filter(Boolean).map((l) => { const p = l.split("|").map((x) => x.trim()); return { nama: p[0], jml: parseFloat((p[1] || "0").replace(/[^\d.]/g, "")) || 0 }; });
  const lainTotal = lain.reduce((a, b) => a + b.jml, 0);
  const total = uktTotal + lainTotal;
  const punya = num("byPunya"), bulan = Math.max(1, num("byBulan"));
  const kurang = Math.max(0, total - punya);
  const perBulan = kurang / bulan, perMinggu = perBulan / 4.33, perHari = perBulan / 30;
  const persen = total ? Math.min(100, Math.round(punya / total * 100)) : 0;
  window._biaya = { total, kurang, perBulan, persen };
  const rpF = (n) => "Rp" + Math.round(n).toLocaleString("id-ID");
  box.innerHTML = '<div class="' + OUT + '"><div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">'
    + [["Total Kebutuhan", rpF(total)], ["UKT (" + num("bySisa") + " semester)", rpF(uktTotal)], ["Biaya Lain", rpF(lainTotal)], ["Masih Kurang", rpF(kurang)]].map((b) => '<div class="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2.5 text-center"><div class="text-[15px] font-extrabold">' + b[1] + '</div><div class="text-[11px] text-slate-500 font-semibold">' + b[0] + "</div></div>").join("") + "</div>"
    + '<div class="mb-1.5 flex justify-between text-sm font-bold"><span>Tabungan terkumpul</span><span>' + persen + "%</span></div>"
    + '<div class="h-4 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mb-4"><div class="h-full bg-emerald-500 transition-all" style="width:' + persen + '%"></div></div>'
    + (kurang > 0 ? '<div class="grid grid-cols-3 gap-2 text-center">' + [["Target Nabung / Bulan", rpF(perBulan)], ["Per Minggu", rpF(perMinggu)], ["Per Hari", rpF(perHari)]].map((b) => '<div class="rounded-lg bg-slate-50 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 px-2 py-2.5"><div class="font-extrabold text-[14.5px]">' + b[1] + '</div><div class="text-[11px] font-semibold text-slate-500">' + b[0] + "</div></div>").join("") + "</div>"
      + '<p class="text-[13px] mt-3">Dengan menabung <b>' + rpF(perBulan) + "/bulan</b> selama " + bulan + " bulan, target " + rpF(total) + " akan tercapai tepat waktu. Kurangi jajan harian sebesar " + rpF(perHari) + " saja sudah cukup menutupnya.</p>"
      : '<p class="font-extrabold text-emerald-600">🎉 Target biaya sudah terpenuhi dari tabunganmu saat ini!</p>')
    + "</div>";
}
SHARE_GETTERS.biaya = function () { const b = window._biaya || {}; return "Target biaya kuliah saya: Rp" + Math.round(b.total || 0).toLocaleString("id-ID") + " — masih kurang Rp" + Math.round(b.kurang || 0).toLocaleString("id-ID") + ", target nabung Rp" + Math.round(b.perBulan || 0).toLocaleString("id-ID") + "/bulan."; };

/* ============================================================
   TOOL 76 — GENERATOR SOAL RUMPANG (CLOZE)
   ============================================================ */
const STOPWORD_ID = new Set("yang dan di ke dari untuk dengan pada adalah ini itu atau juga akan telah tidak ada dalam sebagai oleh karena saat dapat lebih sangat antara sudah bagi para nya kita kami mereka dia ia anda saya aku kamu tidak ada berada menjadi memiliki dilakukan tersebut yaitu yakni antara melalui selama sebelum sesudah ketika jika maka namun tetapi sedangkan sehingga agar supaya baik buruk besar kecil banyak sedikit semua setiap tentang terhadap kepada daripada lainnya sebagainya".split(" "));
UI.cloze = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Teks Materi", '<textarea id="czTeks" rows="8" class="' + IN + '" placeholder="Tempel paragraf materi kuliah di sini…">Fotosintesis adalah proses biologis yang dilakukan tumbuhan hijau untuk mengubah energi cahaya matahari menjadi energi kimia. Proses ini menghasilkan oksigen yang dilepaskan ke atmosfer dan glukosa sebagai sumber makanan tumbuhan. Klorofil merupakan pigmen hijau pada daun yang berperan menangkap cahaya matahari selama proses fotosintesis berlangsung.</textarea>')
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Mode Pengosongan", '<select id="czMode" class="' + IN + '"><option value="kunci">Kata Kunci — 1 kata penting per kalimat</option><option value="berkala">Berkala — tiap N kata yang layak</option></select>')
    + field("Jarak Kata (mode berkala)", '<input id="czN" type="number" class="' + IN + '" value="5">')
    + "</div>"
    + '<button class="' + BTN + '" onclick="buatCloze()">✏️ Buat Soal Rumpang</button>'
    + '<div id="czOut"></div>'
    + "</div>";
};
function buatCloze() {
  const teks = $("#czTeks").value.trim();
  const out = $("#czOut");
  if (!teks) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Isi teks materi dulu.</div>'; return; }
  const mode = $("#czMode").value, N = Math.max(2, Number($("#czN").value) || 5);
  const kunci = [];
  const bersih = (w) => w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, "");
  const layak = (w) => { const b = bersih(w); return b.length >= 5 && !STOPWORD_ID.has(b.toLowerCase()); };
  let soal = "";
  if (mode === "kunci") {
    const kalimat = teks.split(/(?<=[.!?])\s+/);
    soal = kalimat.map((kal) => {
      const kata = kal.split(/\s+/);
      let best = -1, bestLen = 0;
      kata.forEach((w, i) => { if (layak(w) && bersih(w).length > bestLen) { bestLen = bersih(w).length; best = i; } });
      if (best < 0) return kal;
      kunci.push(bersih(kata[best]));
      kata[best] = kata[best].replace(bersih(kata[best]), "_____(" + kunci.length + ")");
      return kata.join(" ");
    }).join(" ");
  } else {
    let hitung = 0;
    soal = teks.split(/\s+/).map((w) => {
      if (layak(w)) { hitung++; if (hitung % N === 0) { kunci.push(bersih(w)); return w.replace(bersih(w), "_____(" + kunci.length + ")"); } }
      return w;
    }).join(" ");
  }
  if (!kunci.length) { out.innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ Tidak ditemukan kata yang layak dikosongkan — coba teks yang lebih panjang.</div>'; return; }
  window._cloze = { soal, kunci };
  out.innerHTML = '<div class="' + OUT + '"><p class="font-extrabold mb-2">📝 Soal (' + kunci.length + ' rumpang)</p>'
    + '<p class="text-[14.5px] leading-relaxed whitespace-pre-wrap bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4">' + esc(soal) + "</p>"
    + '<details class="mt-3"><summary class="font-bold cursor-pointer text-sm">🔑 Kunci Jawaban</summary><p class="text-sm mt-2 leading-relaxed">' + kunci.map((k, i) => (i + 1) + ". " + esc(k)).join(" &nbsp;•&nbsp; ") + "</p></details>"
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="' + BTN2 + '" onclick="copyText(window._cloze.soal)">📋 Copy Soal</button>'
    + '<button class="' + BTN2 + '" onclick="copyText(window._cloze.kunci.map((k,i)=>(i+1)+\'. \'+k).join(\'\\n\'))">📋 Copy Kunci</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Soal_Rumpang.doc\', \'<html><body style=&quot;font-family:serif;font-size:12pt&quot;><h3>SOAL LATIHAN (RUMPANG)</h3><p>\' + esc(window._cloze.soal) + \'</p><h4>Kunci Jawaban</h4><p>\' + window._cloze.kunci.map((k,i)=>(i+1)+\'. \'+esc(k)).join(\'<br>\') + \'</p></body></html>\', \'application/msword\')">⬇️ Download .doc</button></div></div>';
}
SHARE_GETTERS.cloze = function () { return window._cloze ? window._cloze.soal : ""; };

;

/* ============================================================
   TOOL 77 — STATISTIK DESKRIPTIF & DISTRIBUSI FREKUENSI
   ============================================================ */
function kuantil(sorted, p) { const pos = p * (sorted.length - 1); const base = Math.floor(pos); const rest = pos - base; return sorted[base] + (sorted[base + 1] !== undefined ? rest * (sorted[base + 1] - sorted[base]) : 0); }
UI.deskriptif = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Data (satu variabel)", '<textarea id="dsData" rows="6" class="' + IN + '" placeholder="Tempel angka skor/nilai responden, dipisah spasi, koma, atau baris baru">78 82 85 90 76 88 92 84 79 81 87 93 75 83 89 86 80 77 91 84</textarea>')
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Nama Variabel", '<input id="dsNama" class="' + IN + '" value="Prestasi Belajar" placeholder="cth: Motivasi Belajar">')
    + field("Metode Kategorisasi Skor", '<select id="dsKat" class="' + IN + '"><option value="empiris">Empiris — berdasarkan Mean ± SD data</option><option value="ideal">Ideal — berdasarkan skor min & maks teoretis</option></select>')
    + field("Skor Minimum Teoretis (metode ideal)", '<input id="dsMinT" type="number" class="' + IN + '" value="20" placeholder="cth: 20 (20 item × skor 1)">')
    + field("Skor Maksimum Teoretis (metode ideal)", '<input id="dsMaxT" type="number" class="' + IN + '" value="100" placeholder="cth: 100 (20 item × skor 5)">')
    + "</div>"
    + '<button class="' + BTN + '" onclick="hitungDeskriptif()">📊 Hitung Statistik Deskriptif</button>'
    + outBox("dsOut") + "</div>";
};
function hitungDeskriptif() {
  const A = parseNums($("#dsData").value);
  const outErr = (m) => { $("#dsOut").innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ ' + m + "</div>"; };
  if (A.length < 5) return outErr("Butuh minimal 5 data untuk statistik deskriptif.");
  const nama = $("#dsNama").value.trim() || "variabel penelitian";
  const s = A.slice().sort((a, b) => a - b), n = s.length;
  const m = mean(s), med = kuantil(s, 0.5), q1 = kuantil(s, 0.25), q3 = kuantil(s, 0.75);
  const sd = sdS(s), vr = sd * sd, mn = s[0], mx = s[n - 1], rg = mx - mn;
  const freq = {}; s.forEach((x) => freq[x] = (freq[x] || 0) + 1);
  const maxF = Math.max(...Object.values(freq));
  const modus = Object.keys(freq).filter((k) => freq[k] === maxF).map(Number);
  const modusTxt = maxF <= 1 ? "Tidak ada (semua data unik)" : modus.join(" & ");
  // Distribusi frekuensi (Sturges)
  const k = Math.max(1, Math.round(1 + 3.322 * Math.log10(n)));
  const lebar = Math.max(1, Math.ceil((rg + 1) / k));
  const kelas = [];
  for (let i = 0; i < k; i++) {
    const lo = mn + i * lebar, hi = lo + lebar - 1;
    const f = s.filter((x) => x >= lo && x <= hi).length;
    kelas.push({ lo, hi, f });
  }
  let kum = 0; kelas.forEach((c) => { kum += c.f; c.kum = kum; c.pct = (c.f / n * 100); c.kumPct = (kum / n * 100); });
  // Kategorisasi 3 tingkat
  let batas1, batas2, metodeTxt;
  if ($("#dsKat").value === "ideal") {
    const minT = Number($("#dsMinT").value) || 0, maxTv = Number($("#dsMaxT").value) || 100;
    const mi = (maxTv + minT) / 2, sdi = (maxTv - minT) / 6;
    batas1 = mi - sdi; batas2 = mi + sdi; metodeTxt = "ideal (Mi = " + fmtN(mi) + ", SDi = " + fmtN(sdi) + ")";
  } else { batas1 = m - sd; batas2 = m + sd; metodeTxt = "empiris (Mean ± SD)"; }
  const kat = [
    { nama: "Rendah", f: s.filter((x) => x < batas1).length, rentang: "< " + fmtN(batas1) },
    { nama: "Sedang", f: s.filter((x) => x >= batas1 && x <= batas2).length, rentang: fmtN(batas1) + " – " + fmtN(batas2) },
    { nama: "Tinggi", f: s.filter((x) => x > batas2).length, rentang: "> " + fmtN(batas2) }
  ];
  kat.forEach((c) => c.pct = (c.f / n * 100));
  const katDominan = kat.slice().sort((a, b) => b.f - a.f)[0];
  window._dsHasil = { n, mean: m, median: med, q1, q3, sd, min: mn, max: mx, kelas, kat };
  const narasi = "Berdasarkan hasil analisis statistik deskriptif, variabel " + nama + " memiliki nilai rata-rata (mean) sebesar " + fmtN(m) + " dengan simpangan baku " + fmtN(sd) + ", nilai tengah (median) " + fmtN(med) + ", serta skor terendah " + fmtN(mn) + " dan tertinggi " + fmtN(mx) + " dari " + n + " responden. Berdasarkan kategorisasi " + metodeTxt + ", sebagian besar responden berada pada kategori " + katDominan.nama.toLowerCase() + " yaitu sebanyak " + katDominan.f + " responden (" + fmtN(katDominan.pct, 1) + "%), diikuti kategori " + kat.filter((c) => c !== katDominan).map((c) => c.nama.toLowerCase() + " sebanyak " + c.f + " responden (" + fmtN(c.pct, 1) + "%)").join(" dan ") + ". Hal ini menunjukkan bahwa secara umum " + nama + " responden berada pada kategori " + katDominan.nama.toLowerCase() + ".";
  window._dsNarasi = narasi;
  const tblKelas = '<table class="w-full text-[13px] mb-4" style="border-collapse:collapse"><tr><th class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-left">Kelas Interval</th><th class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5">Frekuensi</th><th class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5">%</th><th class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5">Frek. Kumulatif</th></tr>'
    + kelas.map((c) => '<tr><td class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5">' + fmtN(c.lo, 0) + " – " + fmtN(c.hi, 0) + '</td><td class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-center">' + c.f + '</td><td class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-center">' + fmtN(c.pct, 1) + '%</td><td class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-center">' + c.kum + " (" + fmtN(c.kumPct, 1) + '%)</td></tr>').join("") + "</table>";
  const tblKat = '<table class="w-full text-[13px] mb-4" style="border-collapse:collapse"><tr><th class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-left">Kategori</th><th class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-left">Rentang Skor</th><th class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5">Frekuensi</th><th class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5">%</th></tr>'
    + kat.map((c) => '<tr><td class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 font-bold">' + c.nama + '</td><td class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5">' + c.rentang + '</td><td class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-center">' + c.f + '</td><td class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-center">' + fmtN(c.pct, 1) + "%</td></tr>").join("") + "</table>";
  $("#dsOut").innerHTML = '<div class="' + OUT + '"><p class="font-extrabold mb-3">Hasil Statistik Deskriptif — ' + esc(nama) + "</p>"
    + '<div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">'
    + [["n", n], ["Mean", fmtN(m)], ["Median", fmtN(med)], ["Modus", modusTxt], ["Simpangan Baku", fmtN(sd)], ["Varians", fmtN(vr)], ["Minimum", fmtN(mn)], ["Maksimum", fmtN(mx)], ["Rentang", fmtN(rg)], ["Kuartil 1 (Q1)", fmtN(q1)], ["Kuartil 3 (Q3)", fmtN(q3)], ["Kelas (Sturges)", k]].map((b) => '<div class="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 text-center"><div class="text-[15px] font-extrabold">' + b[1] + '</div><div class="text-[11px] text-slate-500 font-semibold">' + b[0] + "</div></div>").join("") + "</div>"
    + '<p class="font-bold text-sm mb-1.5">Tabel Distribusi Frekuensi</p>' + tblKelas
    + '<p class="font-bold text-sm mb-1.5">Kategorisasi Skor (' + metodeTxt + ")</p>" + tblKat
    + '<p class="text-[13.5px] leading-relaxed whitespace-pre-wrap bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3.5">' + esc(narasi) + "</p>"
    + '<button class="' + BTN2 + '" onclick="copyText(window._dsNarasi)">📋 Copy Narasi Bab 4</button></div>';
}
SHARE_GETTERS.deskriptif = function () { return window._dsNarasi || ""; };

/* ============================================================
   TOOL 78 — NOMOR HALAMAN & WATERMARK PDF
   ============================================================ */
UI.pdfstamp = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Upload PDF", '<input id="psFile" type="file" accept="application/pdf" class="' + IN + '">')
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Posisi Nomor Halaman", '<select id="psPos" class="' + IN + '"><option value="bc">Bawah — Tengah</option><option value="br">Bawah — Kanan</option><option value="bl">Bawah — Kiri</option><option value="tr">Atas — Kanan</option><option value="tc">Atas — Tengah</option></select>')
    + field("Format Nomor", '<select id="psFmt" class="' + IN + '"><option value="n">1, 2, 3 …</option><option value="hal">Halaman 1</option><option value="dari">1 dari N</option><option value="strip">— 1 —</option></select>')
    + field("Mulai dari Nomor", '<input id="psMulai" type="number" class="' + IN + '" value="1">')
    + field("Lewati Halaman Pertama (cover tanpa nomor)", '<select id="psSkip" class="' + IN + '"><option value="1">Ya, lewati halaman 1</option><option value="0">Tidak, beri nomor semua</option></select>')
    + field("Teks Watermark (kosongkan bila tidak perlu)", '<input id="psWm" class="' + IN + '" placeholder="cth: DRAFT / Nama Kamu / RAHASIA">')
    + field("Ukuran Watermark", '<input id="psWmSize" type="range" min="30" max="120" value="64" class="w-full">')
    + field("Kepekatan Watermark (opacity)", '<input id="psWmOp" type="range" min="5" max="40" value="14" class="w-full">')
    + "</div>"
    + '<button class="' + BTN + '" onclick="prosesStamp()">🔢 Proses & Download PDF</button> <span id="psStat" class="text-sm text-slate-500"></span>'
    + '<p class="text-xs text-slate-500 mt-2">Seluruh proses berjalan lokal di browser — file PDF-mu tidak diunggah ke server mana pun.</p>'
    + "</div>";
};
function labelHalaman(i, total, fmt, mulai) {
  const n = mulai + i;
  switch (fmt) { case "hal": return "Halaman " + n; case "dari": return n + " dari " + (mulai + total - 1); case "strip": return "— " + n + " —"; default: return String(n); }
}
async function stampPdfBytes(bytes, opts) {
  const ok = await loadLib("https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js", "PDFLib");
  if (!ok || typeof PDFLib === "undefined") throw new Error("Library PDF gagal dimuat (butuh internet sekali).");
  const doc = await PDFLib.PDFDocument.load(bytes);
  const font = await doc.embedFont(PDFLib.StandardFonts.Helvetica);
  const pages = doc.getPages();
  const total = pages.length;
  pages.forEach((page, i) => {
    const { width, height } = page.getSize();
    if (opts.wm) {
      const tw = font.widthOfTextAtSize(opts.wm, opts.wmSize);
      page.drawText(opts.wm, { x: (width - tw) / 2, y: height / 2 - opts.wmSize / 3, size: opts.wmSize, font, color: PDFLib.rgb(0.55, 0.55, 0.55), opacity: opts.wmOp, rotate: PDFLib.degrees(-38) });
    }
    const skip = opts.skipFirst && i === 0;
    if (!skip) {
      const label = labelHalaman(opts.skipFirst ? i - 1 : i, opts.skipFirst ? total - 1 : total, opts.fmt, opts.mulai);
      const tw = font.widthOfTextAtSize(label, 10.5);
      let x = (width - tw) / 2, y = 26;
      if (opts.pos === "br") { x = width - 48 - tw; }
      if (opts.pos === "bl") { x = 48; }
      if (opts.pos === "tr") { x = width - 48 - tw; y = height - 30; }
      if (opts.pos === "tc") { y = height - 30; }
      page.drawText(label, { x, y, size: 10.5, font, color: PDFLib.rgb(0.25, 0.25, 0.25) });
    }
  });
  return await doc.save();
}
async function prosesStamp() {
  const stat = $("#psStat");
  const f = $("#psFile").files && $("#psFile").files[0];
  if (!f) { stat.textContent = "⚠️ Pilih file PDF dulu."; return; }
  stat.textContent = "⏳ Memproses…";
  try {
    const bytes = await f.arrayBuffer();
    const out = await stampPdfBytes(bytes, {
      pos: $("#psPos").value, fmt: $("#psFmt").value, mulai: Number($("#psMulai").value) || 1,
      skipFirst: $("#psSkip").value === "1",
      wm: $("#psWm").value.trim(), wmSize: Number($("#psWmSize").value) || 64, wmOp: (Number($("#psWmOp").value) || 14) / 100
    });
    window._lastStamp = out;
    const blob = new Blob([out], { type: "application/pdf" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "MahasiswaTools_" + f.name.replace(/\.pdf$/i, "") + "_bernomor.pdf";
    document.body.appendChild(a); a.click(); a.remove();
    stat.textContent = "✅ Selesai! PDF bernomor" + ($("#psWm").value.trim() ? " + watermark" : "") + " terunduh.";
  } catch (e) { stat.textContent = "❌ " + e.message; }
}

;


/* ============================================================
   TOOL 79 — KALKULATOR TARGET NILAI MATA KULIAH
   ============================================================ */
UI.targetnilai = function (el) {
  el.innerHTML = '<div class="fadein">'
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Nama Mata Kuliah", '<input id="tnNama" class="' + IN + '" placeholder="cth: Statistika Ekonomi">')
    + field("Target Nilai Akhir", '<input id="tnTarget" type="number" class="' + IN + '" value="80">')
    + "</div>"
    + '<p class="text-[13px] text-slate-500 mb-2">Isi bobot (%) dan nilai tiap komponen. <b>Kosongkan nilai komponen yang belum ada</b> (mis. UAS) — kalkulator menghitung nilai minimal yang kamu butuhkan di komponen itu. Skala target umum: A ≈ 80–85, B ≈ 70, C ≈ 60 (sesuaikan standar kampusmu).</p>'
    + '<div id="tnRows" class="space-y-2 mb-2"></div>'
    + '<button class="' + BTN2 + '" onclick="tnTambahBaris()">+ Tambah Komponen</button>'
    + '<div id="tnOut" class="mt-4"></div>'
    + '<div class="flex flex-wrap gap-2 mt-2"><button class="' + BTN + '" onclick="tnSimpan()">💾 Simpan Mata Kuliah Ini</button>'
    + '<button class="' + BTN2 + '" onclick="kartuTargetNilai()">🖼️ Unduh Kartu Target (PNG)</button></div>'
    + '<div id="tnTersimpan" class="mt-4"></div>'
    + "</div>";
  const d = store.get("mt_targetnilai", null);
  window._tnCourses = (d && d.courses) || [];
  window._tnKomp = [
    { nama: "Kehadiran", bobot: 10, nilai: 100 },
    { nama: "Tugas", bobot: 20, nilai: 80 },
    { nama: "UTS", bobot: 30, nilai: 65 },
    { nama: "UAS", bobot: 40, nilai: null }
  ];
  renderTnRows(); renderTnTersimpan();
  el.addEventListener("input", hitungTargetNilai);
  hitungTargetNilai();
};
function renderTnRows() {
  const box = $("#tnRows"); if (!box) return;
  box.innerHTML = window._tnKomp.map((k, i) => '<div class="grid grid-cols-[1fr_76px_76px_34px] gap-2 items-center">'
    + '<input class="' + IN + '" style="margin:0" value="' + esc(k.nama) + '" oninput="window._tnKomp[' + i + '].nama=this.value">'
    + '<input type="number" class="' + IN + '" style="margin:0" value="' + k.bobot + '" title="Bobot %" oninput="window._tnKomp[' + i + '].bobot=Number(this.value)||0; hitungTargetNilai()">'
    + '<input type="number" class="' + IN + '" style="margin:0" value="' + (k.nilai === null ? "" : k.nilai) + '" placeholder="—" title="Nilai (kosongkan bila belum ada)" oninput="window._tnKomp[' + i + '].nilai=this.value===\'\'?null:Number(this.value); hitungTargetNilai()">'
    + '<button class="text-rose-500 font-extrabold text-lg" onclick="window._tnKomp.splice(' + i + ',1); renderTnRows(); hitungTargetNilai()">✕</button></div>').join("");
}
function tnTambahBaris() { window._tnKomp.push({ nama: "Komponen", bobot: 0, nilai: null }); renderTnRows(); hitungTargetNilai(); }
function hitungTargetNilai() {
  const out = $("#tnOut"); if (!out) return;
  const target = Number(($("#tnTarget") || {}).value) || 80;
  const komp = window._tnKomp;
  const totBobot = komp.reduce((a, k) => a + (Number(k.bobot) || 0), 0);
  let S = 0; const kosong = [];
  komp.forEach((k) => { if (k.nilai === null || k.nilai === "" || isNaN(k.nilai)) kosong.push(k); else S += (Number(k.bobot) / 100) * Number(k.nilai); });
  let html = "";
  if (totBobot !== 100) html += '<p class="text-amber-600 font-bold text-sm mb-2">⚠️ Total bobot saat ini ' + totBobot + '% (idealnya 100%). Hasil di bawah tetap dihitung dari bobot yang terisi.</p>';
  if (kosong.length === 0) {
    html += '<div class="' + OUT + '"><p class="font-extrabold">Nilai akhirmu (semua komponen terisi): <span class="text-brand-600">' + fmtN(S) + '</span></p><p class="text-sm">Target ' + target + (S >= target ? " — TERCAPAI 🎉" : " — belum tercapai.") + "</p></div>";
    window._tnHasil = { akhir: S, perlu: null };
  } else if (kosong.length > 1) {
    const sisaBobot = kosong.reduce((a, k) => a + (Number(k.bobot) || 0), 0);
    const maks = S + sisaBobot;
    html += '<div class="' + OUT + '"><p class="font-extrabold">Ada ' + kosong.length + ' komponen kosong (' + kosong.map((k) => esc(k.nama)).join(", ") + ').</p><p class="text-sm">Poin terkunci dari komponen terisi: <b>' + fmtN(S) + '</b>. Nilai akhir maksimum yang masih mungkin: <b>' + fmtN(maks) + '</b>. Kosongkan tepat satu komponen untuk menghitung nilai minimalnya.</p></div>';
    window._tnHasil = { akhir: null, perlu: null, maks };
  } else {
    const k = kosong[0], b = Number(k.bobot) / 100;
    const perlu = b > 0 ? (target - S) / b : Infinity;
    window._tnHasil = { akhir: null, perlu, komponen: k.nama, maks: S + Number(k.bobot) };
    let status, warna;
    if (perlu <= 0) { status = "Target sudah aman 🎉 — nilai 0 pun di " + esc(k.nama) + " tetap membuatmu mencapai " + target + " (poin terkunci " + fmtN(S) + ")."; warna = "text-emerald-600"; }
    else if (perlu > 100) { status = "Target " + target + " tidak lagi terjangkau 😔 — bahkan nilai 100 di " + esc(k.nama) + " hanya menghasilkan nilai akhir " + fmtN(S + Number(k.bobot)) + ". Turunkan target atau maksimalkan komponen lain bila masih bisa direvisi."; warna = "text-rose-600"; }
    else { status = "Kamu butuh nilai minimal di " + esc(k.nama) + " untuk mencapai target " + target + "."; warna = ""; }
    const tabelLain = [90, 85, 80, 75, 70, 60].filter((t) => t !== target).map((t) => { const p = (t - S) / b; return "<tr><td class='border border-slate-300 dark:border-slate-600 px-2.5 py-1.5'>Target " + t + "</td><td class='border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-center font-bold'>" + (p <= 0 ? "Sudah aman ✅" : p > 100 ? "Mustahil (maks " + fmtN(S + Number(k.bobot)) + ")" : fmtN(p, 1)) + "</td></tr>"; }).join("");
    html += '<div class="' + OUT + '"><p class="text-sm font-semibold">Poin terkunci: ' + fmtN(S) + " dari komponen yang sudah dinilai.</p>"
      + '<p class="text-2xl font-extrabold my-2">Butuh <span class="text-brand-600">' + (perlu <= 0 ? "0" : perlu > 100 ? "—" : fmtN(perlu, 1)) + '</span> di ' + esc(k.nama) + "</p>"
      + '<p class="font-bold ' + warna + '">' + status + "</p>"
      + '<table class="w-full text-[13px] mt-3 max-w-sm" style="border-collapse:collapse">' + tabelLain + "</table></div>";
  }
  out.innerHTML = html;
}
function tnSimpan() {
  const nama = $("#tnNama").value.trim();
  if (!nama) { toast("⚠️ Isi nama mata kuliah dulu."); return; }
  const entry = { nama, target: Number($("#tnTarget").value) || 80, komp: JSON.parse(JSON.stringify(window._tnKomp)) };
  const ix = window._tnCourses.findIndex((c) => c.nama.toLowerCase() === nama.toLowerCase());
  if (ix >= 0) window._tnCourses[ix] = entry; else window._tnCourses.push(entry);
  store.set("mt_targetnilai", { courses: window._tnCourses });
  renderTnTersimpan();
  toast("Mata kuliah tersimpan 💾");
}
function renderTnTersimpan() {
  const box = $("#tnTersimpan"); if (!box) return;
  box.innerHTML = window._tnCourses.length ? '<p class="text-sm font-extrabold mb-2">📚 Mata Kuliah Tersimpan</p>' + window._tnCourses.map((c, i) => '<div class="flex items-center gap-2 mb-1.5"><button class="' + BTN2 + '" style="width:auto" onclick="tnMuat(' + i + ')">' + esc(c.nama) + ' (target ' + c.target + ')</button><button class="text-rose-500 font-extrabold" onclick="window._tnCourses.splice(' + i + ',1); store.set(\'mt_targetnilai\',{courses:window._tnCourses}); renderTnTersimpan()">✕</button></div>').join("") : "";
}
function tnMuat(i) {
  const c = window._tnCourses[i]; if (!c) return;
  $("#tnNama").value = c.nama; $("#tnTarget").value = c.target;
  window._tnKomp = JSON.parse(JSON.stringify(c.komp));
  renderTnRows(); hitungTargetNilai();
}
function kartuTargetNilai() {
  const h = window._tnHasil;
  const nama = $("#tnNama").value.trim() || "Mata Kuliah";
  if (!h || h.perlu === null || h.perlu === undefined) { toast("Hitung dulu dengan tepat satu komponen kosong 🎯"); return; }
  const cv = document.createElement("canvas"); cv.width = 900; cv.height = 560;
  const x = cv.getContext("2d");
  x.fillStyle = "#EEF2FF"; x.fillRect(0, 0, 900, 560);
  x.strokeStyle = "#111"; x.lineWidth = 10; x.strokeRect(14, 14, 872, 532);
  x.fillStyle = "#111"; x.font = "900 40px 'Archivo Black', sans-serif"; x.fillText("TARGET NILAI", 52, 92);
  x.font = "700 30px 'Plus Jakarta Sans', sans-serif";
  x.fillText(nama.slice(0, 34), 52, 142);
  x.font = "900 120px 'Archivo Black', sans-serif";
  x.fillText(h.perlu <= 0 ? "AMAN!" : h.perlu > 100 ? "—" : fmtN(h.perlu, 1), 52, 300);
  x.font = "700 28px 'Plus Jakarta Sans', sans-serif";
  x.fillText("nilai minimal di " + (h.komponen || "komponen terakhir"), 52, 352);
  x.font = "400 24px 'Plus Jakarta Sans', sans-serif";
  window._tnKomp.forEach((k, i) => { x.fillText("• " + k.nama + " (" + k.bobot + "%): " + (k.nilai === null ? "belum ada" : k.nilai), 52, 408 + i * 34); });
  x.font = "italic 20px Georgia, serif"; x.fillStyle = "#64748B"; x.font = "600 19px 'Plus Jakarta Sans', sans-serif"; x.fillText("MahasiswaTools • mahasiswatools.web.id", 52, 524);
  cv.toBlob((b) => { const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "MahasiswaTools_Kartu_Target_" + nama.replace(/\s+/g, "_") + ".png"; document.body.appendChild(a); a.click(); a.remove(); }, "image/png");
}
SHARE_GETTERS.targetnilai = function () { const h = window._tnHasil; if (!h || h.perlu == null) return ""; return "Target nilai " + ($("#tnNama").value || "mata kuliah") + ": saya butuh minimal " + fmtN(h.perlu, 1) + " di " + h.komponen + " untuk mencapai nilai akhir " + ($("#tnTarget").value || 80) + "."; };

/* ============================================================
   TOOL 80 — MANAJER REVISI PASCA-SIDANG
   ============================================================ */
UI.revisi = function (el) {
  el.innerHTML = '<div class="fadein">'
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Nama Mahasiswa", '<input id="rvNama" class="' + IN + '" placeholder="Nama kamu">')
    + field("Tanggal Sidang", '<input id="rvTgl" class="' + IN + '" placeholder="cth: 18 Oktober 2026">')
    + "</div>"
    + field("Judul Skripsi", '<input id="rvJudul" class="' + IN + '" placeholder="Judul skripsi">')
    + '<div class="rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 p-3.5 mb-4"><p class="text-sm font-extrabold mb-2">➕ Tambah Catatan Revisi</p>'
    + '<div class="grid sm:grid-cols-2 gap-x-3">'
    + field("Nama Penguji", '<input id="rvPenguji" class="' + IN + '" placeholder="cth: Dr. Ani Wijaya, M.Si.">')
    + field("Halaman Lama (yg direvisi)", '<input id="rvHalLama" class="' + IN + '" placeholder="cth: 45">')
    + "</div>"
    + field("Uraian Revisi", '<textarea id="rvUraian" rows="2" class="' + IN + '" placeholder="cth: Perbaiki teknik sampling dan tambahkan uji asumsi klasik"></textarea>')
    + '<button class="' + BTN2 + '" onclick="rvTambah()">+ Tambahkan ke Daftar</button></div>'
    + '<div id="rvProg" class="mb-3"></div>'
    + '<div id="rvList" class="space-y-2 mb-4"></div>'
    + '<div class="flex flex-wrap gap-2"><button class="' + BTN + '" onclick="unduhLembarRevisi()">⬇️ Download Lembar Revisi .doc (Resmi)</button>'
    + '<button class="' + BTN2 + '" onclick="copyText(ringkasanRevisi())">📋 Copy Ringkasan</button></div>'
    + "</div>";
  sisipLogoField(el, null);
  const d = store.get("mt_revisi", null);
  window._rv = d && d.items ? d : { nama: "", judul: "", tgl: "", items: [] };
  $("#rvNama").value = window._rv.nama || ""; $("#rvJudul").value = window._rv.judul || ""; $("#rvTgl").value = window._rv.tgl || "";
  el.addEventListener("input", () => { const a = $("#rvNama"), b = $("#rvJudul"), c = $("#rvTgl"); if (!a || !b || !c) return; window._rv.nama = a.value; window._rv.judul = b.value; window._rv.tgl = c.value; store.set("mt_revisi", window._rv); });
  renderRevisi();
};
function rvTambah() {
  const p = $("#rvPenguji").value.trim(), u = $("#rvUraian").value.trim();
  if (!p || !u) { toast("⚠️ Isi nama penguji & uraian revisi."); return; }
  window._rv.items.push({ penguji: p, uraian: u, halLama: $("#rvHalLama").value.trim(), halBaru: "", done: false });
  $("#rvPenguji").value = ""; $("#rvUraian").value = ""; $("#rvHalLama").value = "";
  store.set("mt_revisi", window._rv); renderRevisi();
  toast("Catatan revisi ditambahkan 🖊️");
}
function rvToggle(i) { window._rv.items[i].done = !window._rv.items[i].done; store.set("mt_revisi", window._rv); renderRevisi(); }
function rvHalBaru(i, v) { window._rv.items[i].halBaru = v; store.set("mt_revisi", window._rv); }
function rvHapus(i) { window._rv.items.splice(i, 1); store.set("mt_revisi", window._rv); renderRevisi(); }
function renderRevisi() {
  const list = $("#rvList"), prog = $("#rvProg");
  if (!list) return;
  const items = window._rv.items, done = items.filter((x) => x.done).length;
  const pct = items.length ? Math.round(done / items.length * 100) : 0;
  window._rvProgress = pct;
  prog.innerHTML = items.length ? '<div class="flex justify-between text-sm font-bold mb-1"><span>Progres revisi: ' + done + "/" + items.length + ' selesai</span><span>' + pct + '%</span></div><div class="h-4 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden"><div class="h-full bg-emerald-500 transition-all" style="width:' + pct + '%"></div></div>' + (pct === 100 ? '<p class="font-extrabold text-emerald-600 mt-1.5">🎉 Semua revisi selesai — siap kumpul & minta paraf penguji!</p>' : "") : "";
  list.innerHTML = items.length ? items.map((x, i) => '<div class="flex gap-2.5 items-start rounded-lg border-2 p-3 bg-white dark:bg-slate-900 ' + (x.done ? "border-emerald-400" : "border-slate-200 dark:border-slate-700") + '">'
    + '<input type="checkbox" ' + (x.done ? "checked" : "") + ' onchange="rvToggle(' + i + ')" class="mt-1 w-5 h-5 accent-emerald-600">'
    + '<div class="flex-1"><p class="font-bold text-[14px]">' + esc(x.penguji) + '</p><p class="text-[13.5px] ' + (x.done ? "line-through text-slate-400" : "") + '">' + esc(x.uraian) + '</p>'
    + '<div class="flex flex-wrap gap-2 mt-1.5 items-center text-xs"><span class="font-semibold text-slate-500">Hal. lama: ' + esc(x.halLama || "—") + '</span><label class="font-semibold text-slate-500">Hal. baru: <input value="' + esc(x.halBaru || "") + '" onchange="rvHalBaru(' + i + ', this.value)" class="border rounded px-1.5 py-0.5 w-16 text-slate-800 dark:bg-slate-800 dark:text-white" placeholder="—"></label></div></div>'
    + '<button class="text-rose-500 font-extrabold" onclick="rvHapus(' + i + ')">✕</button></div>').join("")
    : '<p class="text-sm text-slate-500">Belum ada catatan revisi — tambahkan dari panel di atas begitu selesai sidang.</p>';
}
function ringkasanRevisi() {
  const it = window._rv.items, done = it.filter((x) => x.done).length;
  return "REVISI SKRIPSI — " + (window._rv.judul || "") + "\nProgres: " + done + "/" + it.length + " selesai\n" + it.map((x, i) => (i + 1) + ". [" + (x.done ? "✓" : " ") + "] " + x.penguji + ": " + x.uraian).join("\n");
}
function revisiDocHtml() {
  const d = window._rv;
  return "<html><body style='font-family:serif;font-size:12pt'>" + kopLogoHtml("center")
    + "<h3 style='text-align:center'>LEMBAR REVISI SKRIPSI</h3>"
    + "<p>Nama Mahasiswa: " + esc(d.nama || "—") + "<br>Judul Skripsi: " + esc(d.judul || "—") + "<br>Tanggal Sidang: " + esc(d.tgl || "—") + "</p>"
    + "<table border='1' cellspacing='0' cellpadding='6' style='border-collapse:collapse;width:100%'><tr><th style='width:4%'>No</th><th style='width:20%'>Nama Penguji</th><th>Uraian Revisi</th><th style='width:9%'>Hal. Lama</th><th style='width:9%'>Hal. Baru</th><th style='width:12%'>Paraf Penguji</th></tr>"
    + d.items.map((x, i) => "<tr><td>" + (i + 1) + "</td><td>" + esc(x.penguji) + "</td><td>" + esc(x.uraian) + "</td><td>" + esc(x.halLama || "") + "</td><td>" + esc(x.halBaru || "") + "</td><td></td></tr>").join("") + "</table>"
    + "<br><table style='width:100%'><tr><td style='width:50%'></td><td>Mahasiswa,<br><br><br><br>( " + esc(d.nama || "________________") + " )</td></tr></table>"
    + "<p style='font-size:9pt;color:#888'>Dibuat dengan MahasiswaTools — Dari Mahasiswa, Untuk Mahasiswa</p></body></html>";
}
function unduhLembarRevisi() {
  if (!window._rv.items.length) { toast("Belum ada catatan revisi 📄"); return; }
  download("Lembar_Revisi_Skripsi.doc", revisiDocHtml(), "application/msword");
  toast("Lembar revisi resmi diunduh ⬇️");
}
SHARE_GETTERS.revisi = function () { return ringkasanRevisi(); };

;

/* ============================================================
   TOOL 81 — PEMBUAT DAFTAR SINGKATAN OTOMATIS
   ============================================================ */
const KAMUS_SINGKATAN = {
  BPS: "Badan Pusat Statistik", UMKM: "Usaha Mikro, Kecil, dan Menengah", SPSS: "Statistical Package for the Social Sciences", ANOVA: "Analysis of Variance",
  SKS: "Satuan Kredit Semester", KRS: "Kartu Rencana Studi", KKN: "Kuliah Kerja Nyata", UKT: "Uang Kuliah Tunggal", IPK: "Indeks Prestasi Kumulatif",
  CPNS: "Calon Pegawai Negeri Sipil", BKN: "Badan Kepegawaian Negara", SDM: "Sumber Daya Manusia", UU: "Undang-Undang", PP: "Peraturan Pemerintah",
  MBKM: "Merdeka Belajar Kampus Merdeka", PTK: "Penelitian Tindakan Kelas", RAB: "Rencana Anggaran Biaya", LPJ: "Laporan Pertanggungjawaban",
  UKM: "Unit Kegiatan Mahasiswa", BEM: "Badan Eksekutif Mahasiswa", HIMA: "Himpunan Mahasiswa", NIM: "Nomor Induk Mahasiswa", KTP: "Kartu Tanda Penduduk",
  KK: "Kartu Keluarga", NPWP: "Nomor Pokok Wajib Pajak", PNS: "Pegawai Negeri Sipil", ASN: "Aparatur Sipil Negara", DPR: "Dewan Perwakilan Rakyat",
  APBN: "Anggaran Pendapatan dan Belanja Negara", APBD: "Anggaran Pendapatan dan Belanja Daerah", PDB: "Produk Domestik Bruto",
  IHSG: "Indeks Harga Saham Gabungan", BI: "Bank Indonesia", OJK: "Otoritas Jasa Keuangan", BEI: "Bursa Efek Indonesia",
  SD: "Sekolah Dasar", SMP: "Sekolah Menengah Pertama", SMA: "Sekolah Menengah Atas", SMK: "Sekolah Menengah Kejuruan",
  PT: "Perguruan Tinggi", S1: "Strata Satu", S2: "Strata Dua", CV: "Commanditaire Vennootschap", Tbk: "Terbuka", AI: "Artificial Intelligence",
  IT: "Information Technology", PDF: "Portable Document Format", QR: "Quick Response", DOI: "Digital Object Identifier", ISSN: "International Standard Serial Number", ISBN: "International Standard Book Number"
};
UI.singkatan = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Naskah Skripsi / Teks Kamu", '<textarea id="sgIn" rows="8" class="' + IN + '" placeholder="Tempel naskah (boleh sebagian bab) — semua akronim HURUF KAPITAL akan diekstrak otomatis…">Badan Pusat Statistik (BPS) merilis data pertumbuhan ekonomi. BPS mencatat UMKM menyerap tenaga kerja terbesar. Penelitian ini memakai SPSS untuk uji ANOVA terhadap data BPS dan catatan UMKM tahun 2026.</textarea>')
    + '<button class="' + BTN + '" onclick="ekstrakSingkatan()">🔤 Ekstrak Singkatan</button>'
    + '<div id="sgList" class="space-y-2 mb-4"></div>'
    + '<div class="flex flex-wrap gap-2"><button class="' + BTN + '" onclick="unduhSingkatan()">⬇️ Download Daftar Singkatan .doc</button>'
    + '<button class="' + BTN2 + '" onclick="copyText(teksSingkatan())">📋 Copy Teks</button></div>'
    + "</div>";
  window._sgData = [];
};
function ekstrakSingkatan() {
  const teks = $("#sgIn").value || "";
  const freq = {};
  (teks.match(/\b[A-Z]{2,8}\b/g) || []).forEach((a) => { freq[a] = (freq[a] || 0) + 1; });
  const dariKurung = {};
  const re = /([A-Z][A-Za-zÀ-ÿ&.,' ]{3,80}?)\s*\(([A-Z]{2,8})\)/g;
  let m; while ((m = re.exec(teks)) !== null) { dariKurung[m[2]] = m[1].trim().replace(/\s+/g, " "); }
  const daftar = Object.keys(freq).sort().map((a) => ({ akr: a, freq: freq[a], panjang: dariKurung[a] || KAMUS_SINGKATAN[a] || "" }));
  window._sgData = daftar;
  const box = $("#sgList");
  if (!daftar.length) { box.innerHTML = '<p class="text-sm text-rose-500 font-semibold">Tidak ditemukan akronim HURUF KAPITAL pada teks. Coba tempel naskah yang lebih panjang.</p>'; return; }
  box.innerHTML = '<p class="text-sm font-extrabold">' + daftar.length + ' singkatan ditemukan — lengkapi kepanjangan yang masih kosong:</p>'
    + daftar.map((d, i) => '<div class="grid grid-cols-[92px_1fr_auto] gap-2 items-center"><span class="font-extrabold text-[14px]">' + d.akr + '</span><input class="' + IN + '" style="margin:0" value="' + esc(d.panjang) + '" placeholder="Kepanjangan…" oninput="window._sgData[' + i + '].panjang=this.value"><span class="text-xs text-slate-400 font-bold">' + d.freq + '×</span></div>').join("");
  toast(daftar.length + " singkatan diekstrak 🔤");
}
function teksSingkatan() {
  return "DAFTAR SINGKATAN\n\n" + window._sgData.map((d) => d.akr + " : " + (d.panjang || "(belum diisi)")).join("\n");
}
function unduhSingkatan() {
  if (!window._sgData.length) { toast("Ekstrak dulu singkatannya 🔤"); return; }
  const h = "<html><body style='font-family:serif;font-size:12pt'><h3 style='text-align:center'>DAFTAR SINGKATAN</h3><table style='width:100%'>"
    + window._sgData.map((d) => "<tr><td style='width:25%'><b>" + esc(d.akr) + "</b></td><td>: " + esc(d.panjang || "") + "</td></tr>").join("") + "</table><p style='font-size:9pt;color:#888'>Dibuat dengan MahasiswaTools</p></body></html>";
  download("Daftar_Singkatan.doc", h, "application/msword");
}
SHARE_GETTERS.singkatan = function () { return teksSingkatan(); };

/* ============================================================
   TOOL 82 — LPJ & KAS KEGIATAN UKM (terhubung format RAB proposal)
   ============================================================ */
UI.lpj = function (el) {
  el.innerHTML = '<div class="fadein">'
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Nama Kegiatan", '<input id="lpKeg" class="' + IN + '" placeholder="cth: Seminar Nasional Kewirausahaan 2026">')
    + field("Penyelenggara", '<input id="lpPeny" class="' + IN + '" placeholder="cth: HIMA Ekonomi">')
    + field("Tanggal Pelaksanaan", '<input id="lpTgl" class="' + IN + '" placeholder="cth: 14 November 2026">')
    + field("Total Dana Diterima (Rp)", '<input id="lpDana" type="number" class="' + IN + '" value="500000">')
    + "</div>"
    + field("Rencana Anggaran (RAB) — format sama seperti Generator Proposal: Item | Jumlah | Harga Satuan", '<textarea id="lpRab" rows="4" class="' + IN + '">Konsumsi peserta | 50 | 15000\nATK & cetak proposal | 1 | 250000\nSpanduk & backdrop | 1 | 300000</textarea>')
    + '<button class="' + BTN2 + '" onclick="lpjMuatRab()">📥 Muat RAB ke Tabel Realisasi</button>'
    + '<div id="lpTabel" class="my-4"></div>'
    + field("Pengeluaran Lain di Luar RAB (format: Uraian | Jumlah)", '<textarea id="lpLain" rows="2" class="' + IN + '" placeholder="Transport narasumber | 100000"></textarea>')
    + '<div id="lpOut"></div>'
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="' + BTN + '" onclick="unduhLpj()">⬇️ Download LPJ .doc (Resmi)</button>'
    + '<button class="' + BTN2 + '" onclick="lpjHitung(true)">🔄 Hitung Ulang</button></div>'
    + "</div>";
  sisipLogoField(el, null);
  const d = store.get("mt_lpj", null);
  window._lpjItems = (d && d.items) || [];
  if (window._lpjItems.length) renderLpjTabel();
  el.addEventListener("input", () => lpjHitung(false));
};
function lpjMuatRab() {
  const items = $("#lpRab").value.split(/\n/).map((s) => s.trim()).filter(Boolean).map((l) => {
    const p = l.split("|").map((x) => x.trim());
    const jml = parseFloat((p[1] || "1").replace(/[^\d.]/g, "")) || 1, hrg = parseFloat((p[2] || "0").replace(/[^\d.]/g, "")) || 0;
    return { item: p[0], rencana: jml * hrg, realisasi: jml * hrg };
  });
  if (!items.length) { toast("⚠️ RAB masih kosong."); return; }
  window._lpjItems = items;
  store.set("mt_lpj", { items });
  renderLpjTabel(); lpjHitung(false);
  toast(items.length + " item RAB dimuat 📥 Sekarang sesuaikan kolom Realisasi.");
}
function renderLpjTabel() {
  const box = $("#lpTabel"); if (!box) return;
  box.innerHTML = '<table class="w-full text-[13px]" style="border-collapse:collapse"><tr><th class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-left">Item</th><th class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5">Rencana (Rp)</th><th class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5">Realisasi (Rp) — bisa diedit</th><th class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5">Selisih</th></tr>'
    + window._lpjItems.map((it, i) => '<tr><td class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5">' + esc(it.item) + '</td><td class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-right">' + fmtRp(it.rencana) + '</td><td class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5"><input type="number" value="' + it.realisasi + '" class="w-full border rounded px-1.5 py-1 text-right dark:bg-slate-800" onchange="window._lpjItems[' + i + '].realisasi=Number(this.value)||0; store.set(\'mt_lpj\',{items:window._lpjItems}); renderLpjTabel(); lpjHitung(false)"></td><td class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-right font-bold">' + fmtRp(it.rencana - it.realisasi) + "</td></tr>").join("") + "</table>";
}
function lpjHitung(manual) {
  const out = $("#lpOut"); if (!out) return;
  const dana = Number(($("#lpDana") || {}).value) || 0;
  const rencana = window._lpjItems.reduce((a, b) => a + b.rencana, 0);
  const realisasiRab = window._lpjItems.reduce((a, b) => a + b.realisasi, 0);
  const lain = ($("#lpLain").value || "").split(/\n/).map((s) => s.trim()).filter(Boolean).reduce((a, l) => { const p = l.split("|"); return a + (parseFloat(((p[1] || "0") + "").replace(/[^\d.]/g, "")) || 0); }, 0);
  const realisasi = realisasiRab + lain;
  const sisa = dana - realisasi;
  window._lpj = { dana, rencana, realisasi, lain, sisa };
  if (!window._lpjItems.length && !manual) { out.innerHTML = ""; return; }
  out.innerHTML = '<div class="' + OUT + '"><div class="grid grid-cols-2 sm:grid-cols-4 gap-2">'
    + [["Dana Diterima", fmtRp(dana)], ["Total Rencana (RAB)", fmtRp(rencana)], ["Total Realisasi", fmtRp(realisasi)], ["Sisa Dana", fmtRp(sisa)]].map((b) => '<div class="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2.5 text-center"><div class="font-extrabold text-[14.5px]">' + b[1] + '</div><div class="text-[11px] text-slate-500 font-semibold">' + b[0] + "</div></div>").join("") + "</div>"
    + '<p class="text-[13px] mt-3">' + (sisa >= 0 ? "Sisa dana sebesar <b>" + fmtRp(sisa) + "</b> wajib dikembalikan/dilaporkan ke pemberi dana sesuai ketentuan." : "⚠️ Realisasi MELEBIHI dana diterima sebesar <b>" + fmtRp(-sisa) + "</b> — periksa kembali catatan pengeluaran.") + "</p></div>";
}
function lpjDocHtml() {
  const g = (id) => $("#" + id) ? $("#" + id).value.trim() : "";
  const L = window._lpj || {};
  return "<html><body style='font-family:serif;font-size:12pt'>" + kopLogoHtml("center")
    + "<h3 style='text-align:center'>LAPORAN PERTANGGUNGJAWABAN (LPJ) KEGIATAN</h3>"
    + "<p>Kegiatan: <b>" + esc(g("lpKeg")) + "</b><br>Penyelenggara: " + esc(g("lpPeny")) + "<br>Tanggal Pelaksanaan: " + esc(g("lpTgl")) + "</p>"
    + "<p>Total dana diterima: <b>" + fmtRp(L.dana || 0) + "</b> • Total realisasi: <b>" + fmtRp(L.realisasi || 0) + "</b> • Sisa dana: <b>" + fmtRp(L.sisa || 0) + "</b></p>"
    + "<table border='1' cellspacing='0' cellpadding='6' style='border-collapse:collapse;width:100%'><tr><th>No</th><th>Item</th><th>Rencana (Rp)</th><th>Realisasi (Rp)</th><th>Selisih (Rp)</th></tr>"
    + window._lpjItems.map((it, i) => "<tr><td>" + (i + 1) + "</td><td>" + esc(it.item) + "</td><td style='text-align:right'>" + fmtRp(it.rencana) + "</td><td style='text-align:right'>" + fmtRp(it.realisasi) + "</td><td style='text-align:right'>" + fmtRp(it.rencana - it.realisasi) + "</td></tr>").join("")
    + "<tr><td colspan='2'><b>TOTAL</b></td><td style='text-align:right'><b>" + fmtRp(L.rencana || 0) + "</b></td><td style='text-align:right'><b>" + fmtRp(L.realisasi || 0) + "</b></td><td style='text-align:right'><b>" + fmtRp((L.rencana || 0) - (L.realisasi || 0)) + "</b></td></tr></table>"
    + "<p style='font-size:10.5pt'>Lampirkan seluruh bukti transaksi (kwitansi/nota) sebagai lampiran laporan ini.</p>"
    + "<br><table style='width:100%'><tr><td style='width:50%'>Bendahara,<br><br><br><br>( ________________ )</td><td>Ketua Panitia/Penyelenggara,<br><br><br><br>( ________________ )</td></tr></table>"
    + "<p style='font-size:9pt;color:#888'>Dibuat dengan MahasiswaTools — Dari Mahasiswa, Untuk Mahasiswa</p></body></html>";
}
function unduhLpj() {
  lpjHitung(false);
  if (!window._lpjItems.length) { toast("Muat RAB dulu 📥"); return; }
  download("LPJ_Kegiatan.doc", lpjDocHtml(), "application/msword");
  toast("LPJ diunduh ⬇️");
}
SHARE_GETTERS.lpj = function () { const L = window._lpj || {}; return "LPJ " + (($("#lpKeg") || {}).value || "kegiatan") + ": dana " + fmtRp(L.dana || 0) + ", realisasi " + fmtRp(L.realisasi || 0) + ", sisa " + fmtRp(L.sisa || 0) + "."; };

;


/* ============================================================
   TOOL 83 — REGRESI BERGANDA & UJI ASUMSI KLASIK
   ============================================================ */
function matInv(A) {
  const n = A.length;
  const M = A.map((row, i) => row.slice().concat(Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))));
  for (let col = 0; col < n; col++) {
    let piv = col;
    for (let r = col + 1; r < n; r++) if (Math.abs(M[r][col]) > Math.abs(M[piv][col])) piv = r;
    if (Math.abs(M[piv][col]) < 1e-12) throw new Error("Matriks singular — variabel X saling berkorelasi sempurna (multikolinearitas total).");
    const tmp = M[col]; M[col] = M[piv]; M[piv] = tmp;
    const d = M[col][col];
    for (let j = 0; j < 2 * n; j++) M[col][j] /= d;
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const f = M[r][col];
      if (f !== 0) for (let j = 0; j < 2 * n; j++) M[r][j] -= f * M[col][j];
    }
  }
  return M.map((row) => row.slice(n));
}
function olsFit(Xcols, y) {
  const n = y.length, k = Xcols.length;
  const X = [];
  for (let i = 0; i < n; i++) { const row = [1]; for (let j = 0; j < k; j++) row.push(Xcols[j][i]); X.push(row); }
  const p = k + 1;
  const XtX = Array.from({ length: p }, () => Array(p).fill(0));
  const Xty = Array(p).fill(0);
  for (let i = 0; i < n; i++) for (let a = 0; a < p; a++) { Xty[a] += X[i][a] * y[i]; for (let b = 0; b < p; b++) XtX[a][b] += X[i][a] * X[i][b]; }
  const inv = matInv(XtX);
  const beta = inv.map((row) => row.reduce((s, v, j) => s + v * Xty[j], 0));
  const yhat = X.map((row) => row.reduce((s, v, j) => s + v * beta[j], 0));
  const resid = y.map((v, i) => v - yhat[i]);
  const ybar = mean(y);
  const sse = resid.reduce((s, e) => s + e * e, 0), sst = y.reduce((s, v) => s + (v - ybar) * (v - ybar), 0), ssr = sst - sse;
  const df = n - p;
  const mse = df > 0 ? sse / df : NaN;
  const se = beta.map((_, j) => Math.sqrt(Math.max(0, mse * inv[j][j])));
  const t = beta.map((b, j) => (se[j] > 0 ? b / se[j] : 0));
  const pv = t.map((tv) => pDariT(Math.abs(tv), df));
  const r2 = sst > 0 ? ssr / sst : 0;
  const adjR2 = 1 - (1 - r2) * (n - 1) / Math.max(1, df);
  const F = k > 0 && sse > 0 ? (ssr / k) / mse : Infinity;
  const pF = isFinite(F) ? pDariF(F, k, df) : 0;
  return { beta, se, t, pv, resid, yhat, r2, adjR2, F, pF, sse, df, n, k };
}
function jbDari(arr) {
  const n = arr.length, m = mean(arr);
  let m2 = 0, m3 = 0, m4 = 0;
  arr.forEach((x) => { const d = x - m; m2 += d * d; m3 += d * d * d; m4 += d * d * d * d; });
  m2 /= n; m3 /= n; m4 /= n;
  const sk = m3 / Math.pow(m2, 1.5), ku = m4 / (m2 * m2);
  const jb = n / 6 * (sk * sk + Math.pow(ku - 3, 2) / 4);
  return { jb, p: Math.exp(-jb / 2) };
}
UI.regresi = function (el) {
  el.innerHTML = '<div class="fadein">'
    + field("Jumlah Variabel Bebas (X)", '<select id="rgK" class="' + IN + '"><option value="1">1 variabel (regresi sederhana)</option><option value="2" selected>2 variabel (X1, X2)</option><option value="3">3 variabel (X1, X2, X3)</option><option value="4">4 variabel (X1–X4)</option></select>')
    + field("Nama Variabel — urutan: Y, X1, X2, … (pisah koma)", '<input id="rgNama" class="' + IN + '" value="Prestasi Belajar, Motivasi, Disiplin">')
    + field("Data — satu responden per baris, urutan kolom: Y X1 X2 …", '<textarea id="rgData" rows="9" class="' + IN + '">78 80 75\n82 85 88\n85 88 90\n90 92 95\n76 78 72\n88 90 92\n92 95 98\n84 86 84\n79 82 80\n81 84 86\n87 89 91\n93 96 97</textarea>')
    + '<button class="' + BTN + '" onclick="hitungRegresi()">📈 Hitung Regresi + Uji Asumsi Klasik</button>'
    + outBox("rgOut") + "</div>";
};
function hitungRegresi() {
  const err = (m) => { $("#rgOut").innerHTML = '<div class="' + OUT + ' text-rose-600 font-semibold">⚠️ ' + m + "</div>"; };
  const k = Number($("#rgK").value);
  const names = $("#rgNama").value.split(",").map((s) => s.trim()).filter(Boolean);
  const nm = (i) => names[i] || (i === 0 ? "Y" : "X" + i);
  const rows = $("#rgData").value.split(/\n/).map((l) => parseNums(l)).filter((r) => r.length >= k + 1).map((r) => r.slice(0, k + 1));
  if (rows.length < k + 4) return err("Data tidak cukup — butuh minimal " + (k + 4) + " baris lengkap (Y + " + k + " kolom X).");
  const y = rows.map((r) => r[0]);
  const Xcols = []; for (let j = 0; j < k; j++) Xcols.push(rows.map((r) => r[j + 1]));
  let fit;
  try { fit = olsFit(Xcols, y); } catch (e) { return err(e.message); }
  // VIF
  const vif = Xcols.map((xj, j) => {
    if (k === 1) return 1;
    const lain = Xcols.filter((_, jj) => jj !== j);
    try { const aux = olsFit(lain, xj); return aux.r2 >= 0.9999 ? Infinity : 1 / (1 - aux.r2); } catch (e) { return Infinity; }
  });
  // Glejser: |residual| diregresikan ke X
  let glejserP = 1;
  try { const g = olsFit(Xcols, fit.resid.map(Math.abs)); glejserP = isFinite(g.pF) ? g.pF : 1; } catch (e) { glejserP = 1; }
  const jb = jbDari(fit.resid);
  window._regHasil = { beta: fit.beta, r2: fit.r2, adjR2: fit.adjR2, F: fit.F, pF: fit.pF, vif, glejserP, jbP: jb.p, pv: fit.pv };
  const sigF = fit.pF < 0.05;
  const barisKoef = fit.beta.map((b, j) => {
    const label = j === 0 ? "Konstanta" : nm(j);
    const sig = j > 0 ? (fit.pv[j] < 0.05 ? "Signifikan ✅" : "Tidak signifikan") : "—";
    return '<tr><td class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 font-bold">' + esc(label) + '</td><td class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-center">' + fmtN(b, 3) + '</td><td class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-center">' + fmtN(fit.se[j], 3) + '</td><td class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-center">' + fmtN(fit.t[j], 3) + '</td><td class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-center">' + fmtP(fit.pv[j]) + '</td><td class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-center">' + sig + "</td></tr>";
  }).join("");
  const asumsi = [
    ["Normalitas Residual (Jarque-Bera)", "JB = " + fmtN(jb.jb, 3) + ", p = " + fmtP(jb.p), jb.p >= 0.05, jb.p >= 0.05 ? "Residual berdistribusi normal ✅" : "Residual TIDAK normal ❌"],
    ["Multikolinearitas (VIF)", Xcols.map((_, j) => nm(j + 1) + " = " + (isFinite(vif[j]) ? fmtN(vif[j]) : "∞")).join("; "), vif.every((v) => v < 10), vif.every((v) => v < 10) ? "Semua VIF < 10 — tidak ada multikolinearitas ✅" : "Ada VIF ≥ 10 — multikolinearitas terdeteksi ❌"],
    ["Heteroskedastisitas (Glejser)", "Uji F atas |residual|, p = " + fmtP(glejserP), glejserP >= 0.05, glejserP >= 0.05 ? "Tidak ada heteroskedastisitas (homoskedastis) ✅" : "Terdeteksi heteroskedastisitas ❌"]
  ];
  const narasi = "Berdasarkan hasil analisis regresi linear " + (k > 1 ? "berganda" : "sederhana") + ", diperoleh persamaan " + nm(0) + " = " + fmtN(fit.beta[0], 3) + fit.beta.slice(1).map((b, j) => " " + (b >= 0 ? "+" : "−") + " " + fmtN(Math.abs(b), 3) + " " + nm(j + 1)).join("") + ". Hasil uji F menunjukkan nilai F sebesar " + fmtN(fit.F, 3) + " dengan signifikansi " + fmtP(fit.pF) + ", sehingga secara simultan " + (sigF ? "variabel bebas berpengaruh signifikan terhadap " + nm(0) : "variabel bebas tidak berpengaruh signifikan terhadap " + nm(0)) + ". Secara parsial, " + fit.beta.slice(1).map((b, j) => nm(j + 1) + " " + (fit.pv[j + 1] < 0.05 ? "berpengaruh signifikan (p = " + fmtP(fit.pv[j + 1]) + ")" : "tidak berpengaruh signifikan (p = " + fmtP(fit.pv[j + 1]) + ")")).join("; ") + ". Nilai Adjusted R² sebesar " + fmtN(fit.adjR2, 3) + " menunjukkan bahwa " + fmtN(fit.adjR2 * 100, 1) + "% variasi " + nm(0) + " dapat dijelaskan oleh model, sedangkan sisanya dijelaskan oleh faktor lain di luar model. Uji asumsi klasik: normalitas residual " + (jb.p >= 0.05 ? "terpenuhi" : "tidak terpenuhi") + ", multikolinearitas " + (vif.every((v) => v < 10) ? "tidak terdeteksi (semua VIF < 10)" : "terdeteksi pada sebagian variabel") + ", dan heteroskedastisitas " + (glejserP >= 0.05 ? "tidak terdeteksi (uji Glejser p = " + fmtP(glejserP) + ")" : "terdeteksi (uji Glejser p = " + fmtP(glejserP) + ")") + ".";
  window._regNarasi = narasi;
  $("#rgOut").innerHTML = '<div class="' + OUT + '"><p class="font-extrabold mb-2">Persamaan Regresi</p>'
    + '<p class="font-mono text-[13.5px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3.5 py-2.5 mb-4">' + esc(nm(0)) + " = " + fmtN(fit.beta[0], 3) + fit.beta.slice(1).map((b, j) => " " + (b >= 0 ? "+" : "−") + " " + fmtN(Math.abs(b), 3) + "·" + esc(nm(j + 1))).join("") + "</p>"
    + '<div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">'
    + [["R", fmtN(Math.sqrt(Math.max(0, fit.r2)), 3)], ["R²", fmtN(fit.r2, 3)], ["Adjusted R²", fmtN(fit.adjR2, 3)], ["F (simultan)", fmtN(fit.F, 3)], ["Sig. F", fmtP(fit.pF)], ["n", fit.n], ["Uji Simultan", sigF ? "SIGNIFIKAN ✅" : "Tidak signifikan"], ["Standar Error", fmtN(Math.sqrt(fit.sse / fit.df), 3)]].map((b) => '<div class="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 text-center"><div class="text-[15px] font-extrabold">' + b[1] + '</div><div class="text-[11px] text-slate-500 font-semibold">' + b[0] + "</div></div>").join("") + "</div>"
    + '<p class="font-bold text-sm mb-1.5">Koefisien & Uji t Parsial</p><div class="overflow-x-auto"><table class="w-full text-[13px] mb-4" style="border-collapse:collapse"><tr><th class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-left">Variabel</th><th class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5">Koefisien (B)</th><th class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5">Std. Error</th><th class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5">t</th><th class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5">Sig.</th><th class="border border-slate-300 dark:border-slate-600 px-2.5 py-1.5">Keputusan</th></tr>' + barisKoef + "</table></div>"
    + '<p class="font-bold text-sm mb-1.5">Uji Asumsi Klasik</p><div class="space-y-2 mb-4">'
    + asumsi.map((a) => '<div class="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3.5 py-2.5 text-[13.5px]"><b>' + a[0] + "</b> — " + esc(a[1]) + '<br><span class="font-bold">' + a[3] + "</span></div>").join("") + "</div>"
    + '<p class="text-[13.5px] leading-relaxed whitespace-pre-wrap bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3.5">' + esc(narasi) + "</p>"
    + '<button class="' + BTN2 + '" onclick="copyText(window._regNarasi)">📋 Copy Narasi Bab 4</button></div>';
}
SHARE_GETTERS.regresi = function () { return window._regNarasi || ""; };

;

/* ============================================================
   TOOL 84 — KONVERTER SKS MBKM / KAMPUS MERDEKA
   ============================================================ */
UI.sks = function (el) {
  el.innerHTML = '<div class="fadein">'
    + '<p class="rounded-lg bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800 p-3 text-[13px] mb-4">Ketentuan umum MBKM: <b>1 SKS = 170 menit kegiatan per minggu selama 16 minggu</b> (satu semester) ≈ <b>45 jam</b>. Penyetaraan penuh satu semester di luar kampus umumnya maksimal <b>20 SKS (±900 jam)</b>. Kebijakan tiap kampus bisa berbeda — gunakan hasil ini sebagai estimasi untuk berdiskusi dengan dosen wali/prodi.</p>'
    + '<div class="grid sm:grid-cols-3 gap-x-4">'
    + field("Jam Kerja per Hari", '<input id="skJamHari" type="number" class="' + IN + '" value="8">')
    + field("Hari Kerja per Minggu", '<input id="skHariMgg" type="number" class="' + IN + '" value="5">')
    + field("Durasi Kegiatan (minggu)", '<input id="skMinggu" type="number" class="' + IN + '" value="16">')
    + "</div>"
    + field("ATAU Total Jam dari Logbook (isi untuk menimpa hitungan jadwal)", '<input id="skTotal" type="number" class="' + IN + '" placeholder="cth: 720 — kosongkan bila memakai jadwal di atas">')
    + field("Target Penyetaraan (SKS)", '<input id="skTarget" type="number" class="' + IN + '" value="20">')
    + '<div id="skOut"></div>'
    + "</div>";
  el.addEventListener("input", hitungSks);
  hitungSks();
};
function hitungSks() {
  const box = $("#skOut"); if (!box) return;
  const num = (id) => Number(($("#" + id) || {}).value) || 0;
  const manual = ($("#skTotal").value || "").trim();
  const totalJam = manual !== "" ? Number(manual) || 0 : num("skJamHari") * num("skHariMgg") * num("skMinggu");
  const target = Math.max(1, num("skTarget"));
  const sks = totalJam / 45;
  const jamTarget = target * 45;
  const kurang = Math.max(0, jamTarget - totalJam);
  const pct = Math.min(100, Math.round(totalJam / jamTarget * 100));
  const mingguSisa = kurang > 0 && num("skJamHari") * num("skHariMgg") > 0 ? Math.ceil(kurang / (num("skJamHari") * num("skHariMgg"))) : 0;
  window._sksHasil = { totalJam, sks, kurang };
  box.innerHTML = '<div class="' + OUT + '"><div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">'
    + [["Total Jam Kegiatan", fmtN(totalJam, 0) + " jam"], ["Setara SKS", fmtN(sks, 2) + " SKS"], ["SKS Utuh (dibulatkan ke bawah)", Math.floor(sks) + " SKS"], ["Target", target + " SKS (" + fmtN(jamTarget, 0) + " jam)"]].map((b) => '<div class="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2.5 text-center"><div class="font-extrabold text-[14.5px]">' + b[1] + '</div><div class="text-[11px] text-slate-500 font-semibold">' + b[0] + "</div></div>").join("") + "</div>"
    + '<div class="flex justify-between text-sm font-bold mb-1"><span>Progres menuju ' + target + ' SKS</span><span>' + pct + '%</span></div>'
    + '<div class="h-4 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mb-3"><div class="h-full bg-emerald-500 transition-all" style="width:' + pct + '%"></div></div>'
    + (kurang > 0 ? '<p class="text-[13.5px]">Masih kurang <b>' + fmtN(kurang, 0) + ' jam</b> untuk mencapai ' + target + ' SKS' + (mingguSisa ? " — setara ±" + mingguSisa + " minggu lagi dengan jadwal yang sama." : ".") + "</p>"
      : '<p class="font-extrabold text-emerald-600">🎉 Jam kegiatanmu sudah memenuhi target ' + target + ' SKS!</p>')
    + '<p class="text-xs text-slate-500 mt-2">Catatan: sebagian kampus mensyaratkan minimal ±900 jam untuk konversi penuh 20 SKS magang MBKM dan membatasi penyetaraan per mata kuliah. Selalu konfirmasi ke prodi sebelum berangkat.</p></div>';
}
SHARE_GETTERS.sks = function () { const s = window._sksHasil || {}; return "Kegiatan saya " + fmtN(s.totalJam || 0, 0) + " jam ≈ setara " + fmtN(s.sks || 0, 2) + " SKS (standar MBKM 45 jam/SKS)."; };

/* ============================================================
   TOOL 85 — LEMBAR BIMBINGAN SKRIPSI (KARTU KENDALI)
   ============================================================ */
UI.bimbingan = function (el) {
  el.innerHTML = '<div class="fadein">'
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Nama Mahasiswa", '<input id="bmNama" class="' + IN + '" placeholder="Nama kamu">')
    + field("NIM", '<input id="bmNim" class="' + IN + '" placeholder="Nomor Induk Mahasiswa">')
    + field("Pembimbing 1", '<input id="bmP1" class="' + IN + '" placeholder="Nama + gelar">')
    + field("Pembimbing 2", '<input id="bmP2" class="' + IN + '" placeholder="Nama + gelar (bila ada)">')
    + "</div>"
    + field("Judul Skripsi", '<input id="bmJudul" class="' + IN + '" placeholder="Judul skripsi">')
    + '<div class="rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 p-3.5 mb-4"><p class="text-sm font-extrabold mb-2">➕ Catat Sesi Bimbingan</p>'
    + '<div class="grid sm:grid-cols-2 gap-x-3">'
    + field("Tanggal", '<input id="bmTgl" class="' + IN + '" placeholder="cth: 20 Oktober 2026">')
    + field("Materi / Bab", '<input id="bmMateri" class="' + IN + '" placeholder="cth: BAB III — Metode">')
    + field("Dengan", '<select id="bmOleh" class="' + IN + '"><option>Pembimbing 1</option><option>Pembimbing 2</option></select>')
    + field("Status Hasil", '<select id="bmStatus" class="' + IN + '"><option>Revisi</option><option>Lanjut</option><option>ACC</option></select>')
    + "</div>"
    + field("Catatan Dosen", '<textarea id="bmCatatan" rows="2" class="' + IN + '" placeholder="Arahan/catatan dosen pada sesi ini"></textarea>')
    + '<button class="' + BTN2 + '" onclick="bmTambah()">+ Simpan Sesi</button></div>'
    + '<div id="bmStats" class="mb-3"></div>'
    + '<div id="bmList" class="space-y-2 mb-4"></div>'
    + '<button class="' + BTN + '" onclick="unduhBimbingan()">⬇️ Download Kartu Kendali Bimbingan .doc</button>'
    + "</div>";
  sisipLogoField(el, null);
  const d = store.get("mt_bimbingan", null);
  window._bm = d && d.entries ? d : { nama: "", nim: "", judul: "", p1: "", p2: "", entries: [] };
  ["Nama", "Nim", "Judul", "P1", "P2"].forEach((k) => { const e = $("#bm" + k); if (e) e.value = window._bm[k.toLowerCase()] || ""; });
  el.addEventListener("input", (ev) => {
    if (["bmNama", "bmNim", "bmJudul", "bmP1", "bmP2"].includes(ev.target.id)) {
      window._bm = Object.assign(window._bm, { nama: $("#bmNama").value, nim: $("#bmNim").value, judul: $("#bmJudul").value, p1: $("#bmP1").value, p2: $("#bmP2").value });
      store.set("mt_bimbingan", window._bm);
    }
  });
  renderBimbingan();
};
function bmTambah() {
  const t = $("#bmTgl").value.trim(), m = $("#bmMateri").value.trim();
  if (!t || !m) { toast("⚠️ Isi tanggal & materi bimbingan."); return; }
  window._bm.entries.push({ tgl: t, materi: m, catatan: $("#bmCatatan").value.trim(), oleh: $("#bmOleh").value, status: $("#bmStatus").value });
  ["bmTgl", "bmMateri", "bmCatatan"].forEach((id) => $("#" + id).value = "");
  store.set("mt_bimbingan", window._bm); renderBimbingan();
  toast("Sesi bimbingan tercatat 📔");
}
function renderBimbingan() {
  const list = $("#bmList"), stats = $("#bmStats");
  if (!list) return;
  const e = window._bm.entries, acc = e.filter((x) => x.status === "ACC").length;
  window._bimCount = e.length;
  stats.innerHTML = e.length ? '<div class="flex flex-wrap gap-2"><span class="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-slate-900 text-white dark:bg-white dark:text-slate-900">Total sesi: ' + e.length + '</span><span class="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-emerald-200 text-emerald-900">ACC: ' + acc + '</span><span class="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-amber-200 text-amber-900">Revisi: ' + e.filter((x) => x.status === "Revisi").length + "</span></div>" : "";
  list.innerHTML = e.length ? e.map((x, i) => '<div class="flex gap-2.5 items-start rounded-lg border-2 border-slate-200 dark:border-slate-700 p-3 bg-white dark:bg-slate-900"><div class="flex-1"><p class="font-bold text-[13.5px]">' + esc(x.tgl) + " — " + esc(x.materi) + ' <span class="ml-1 px-2 py-0.5 rounded-full text-[11px] font-extrabold ' + (x.status === "ACC" ? "bg-emerald-200 text-emerald-900" : x.status === "Lanjut" ? "bg-sky-200 text-sky-900" : "bg-amber-200 text-amber-900") + '">' + esc(x.status) + '</span></p><p class="text-[13px] text-slate-600 dark:text-slate-300">' + esc(x.catatan || "—") + '</p><p class="text-[11.5px] text-slate-400 font-semibold">' + esc(x.oleh) + "</p></div>"
    + '<button class="text-rose-500 font-extrabold" onclick="window._bm.entries.splice(' + i + ',1); store.set(\'mt_bimbingan\', window._bm); renderBimbingan()">✕</button></div>').join("")
    : '<p class="text-sm text-slate-500">Belum ada sesi tercatat — catat setiap selesai bimbingan agar kartu kendali selalu siap.</p>';
}
function bimbinganDocHtml() {
  const d = window._bm;
  return "<html><body style='font-family:serif;font-size:12pt'>" + kopLogoHtml("center")
    + "<h3 style='text-align:center'>KARTU KENDALI BIMBINGAN SKRIPSI</h3>"
    + "<p>Nama: " + esc(d.nama || "—") + "<br>NIM: " + esc(d.nim || "—") + "<br>Judul: " + esc(d.judul || "—") + "<br>Pembimbing 1: " + esc(d.p1 || "—") + (d.p2 ? "<br>Pembimbing 2: " + esc(d.p2) : "") + "</p>"
    + "<table border='1' cellspacing='0' cellpadding='6' style='border-collapse:collapse;width:100%'><tr><th style='width:4%'>No</th><th style='width:13%'>Tanggal</th><th style='width:16%'>Materi/Bab</th><th>Catatan Dosen</th><th style='width:13%'>Pembimbing</th><th style='width:9%'>Status</th><th style='width:10%'>Paraf</th></tr>"
    + d.entries.map((x, i) => "<tr><td>" + (i + 1) + "</td><td>" + esc(x.tgl) + "</td><td>" + esc(x.materi) + "</td><td>" + esc(x.catatan) + "</td><td>" + esc(x.oleh) + "</td><td>" + esc(x.status) + "</td><td></td></tr>").join("") + "</table>"
    + "<p style='font-size:9pt;color:#888'>Dibuat dengan MahasiswaTools — Dari Mahasiswa, Untuk Mahasiswa</p></body></html>";
}
function unduhBimbingan() {
  if (!window._bm.entries.length) { toast("Belum ada sesi bimbingan 📔"); return; }
  download("Kartu_Kendali_Bimbingan.doc", bimbinganDocHtml(), "application/msword");
  toast("Kartu kendali diunduh ⬇️");
}
SHARE_GETTERS.bimbingan = function () { return "Saya sudah " + (window._bimCount || 0) + " kali bimbingan skripsi. Kartu kendali tercatat rapi di MahasiswaTools."; };

/* ---------- 86. KONVERTER SKRIPSI KE JURNAL (IMRAD) ---------- */
UI.imrad = function (el) {
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">Tempel ringkasan tiap bab skripsimu — tool menyusunnya jadi draf artikel jurnal format <b>IMRAD</b> (Pendahuluan–Metode–Hasil & Pembahasan–Kesimpulan) sekaligus mengecek proporsi kata idealnya: Pendahuluan 15%, Metode 20%, Hasil & Pembahasan 55%, Kesimpulan 10%.</p>'
    + field("Judul Artikel", '<input id="imrJudul" class="\' + IN + \'" placeholder="Judul artikel jurnal (boleh sama dengan judul skripsi)">')
    + field("Penulis & Institusi", '<input id="imrPenulis" class="\' + IN + \'" placeholder="cth: Detta Pranata — Universitas PGRI Palembang">')
    + field("Bab I — Pendahuluan", '<textarea id="imrB1" rows="4" class="\' + IN + \'" placeholder="Ringkasan latar belakang, rumusan masalah, dan tujuan penelitian"></textarea>')
    + field("Bab II — Tinjauan Pustaka (masuk Pendahuluan)", '<textarea id="imrB2" rows="3" class="\' + IN + \'" placeholder="Ringkasan teori & penelitian terdahulu yang paling relevan"></textarea>')
    + field("Bab III — Metode Penelitian", '<textarea id="imrB3" rows="4" class="\' + IN + \'" placeholder="Jenis penelitian, populasi & sampel, instrumen, teknik analisis"></textarea>')
    + field("Bab IV — Hasil & Pembahasan", '<textarea id="imrB4" rows="5" class="\' + IN + \'" placeholder="Temuan utama, tabel/grafik penting, dan pembahasannya"></textarea>')
    + field("Bab V — Kesimpulan & Saran", '<textarea id="imrB5" rows="3" class="\' + IN + \'" placeholder="Kesimpulan dan saran penelitian"></textarea>')
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Target Total Kata Artikel (opsional)", '<input id="imrTarget" type="number" class="\' + IN + \'" placeholder="cth: 5000 — kosongkan = total kata naskahmu">')
    + field("Tata Letak .doc", '<select id="imrKolom" class="\' + IN + \'"><option value="1">1 kolom</option><option value="2">2 kolom (gaya jurnal SINTA)</option></select>')
    + "</div>"
    + '<button class="\' + BTN + \'" onclick="imrSusun()">📐 Susun Draf IMRAD & Cek Proporsi</button>'
    + outBox("imrOut") + "</div>";
};
function imrKata(t) { const m = (t || "").trim().match(/\S+/g); return m ? m.length : 0; }
function imrSusun() {
  const g = (id) => ($("#" + id) || {}).value || "";
  const judul = g("imrJudul").trim(), penulis = g("imrPenulis").trim();
  const b1 = g("imrB1").trim(), b2 = g("imrB2").trim(), b3 = g("imrB3").trim(), b4 = g("imrB4").trim(), b5 = g("imrB5").trim();
  const secs = [
    { n: "Pendahuluan (Bab I + II)", isi: [b1, b2].filter(Boolean).join("\n\n"), pct: 15 },
    { n: "Metode (Bab III)", isi: b3, pct: 20 },
    { n: "Hasil & Pembahasan (Bab IV)", isi: b4, pct: 55 },
    { n: "Kesimpulan (Bab V)", isi: b5, pct: 10 }
  ];
  const totalIsi = secs.reduce((a, s) => a + imrKata(s.isi), 0);
  const target = Number(g("imrTarget")) || totalIsi;
  if (!totalIsi) { $("#imrOut").innerHTML = '<div class="\' + OUT + \' text-rose-600 font-semibold">⚠️ Isi dulu minimal satu bab.</div>'; return; }
  const baris = secs.map((s) => {
    const k = imrKata(s.isi), tk = Math.round(target * s.pct / 100), sel = k - tk;
    const st = k === 0 ? '<span class="font-bold text-rose-600">Kosong</span>' : Math.abs(sel) <= Math.max(30, tk * 0.15) ? '<span class="font-bold text-emerald-600">Pas ✅</span>' : sel < 0 ? '<span class="font-bold text-amber-600">Kurang ' + fmtN(-sel, 0) + ' kata</span>' : '<span class="font-bold text-amber-600">Lebih ' + fmtN(sel, 0) + ' kata</span>';
    return "<tr><td class=\"py-1.5 pr-3 font-semibold\">" + s.n + "</td><td class=\"py-1.5 pr-3\">" + fmtN(k, 0) + "</td><td class=\"py-1.5 pr-3\">" + fmtN(tk, 0) + " (" + s.pct + "%)</td><td class=\"py-1.5\">" + st + "</td></tr>";
  }).join("");
  const draf = (judul || "(Judul Artikel)") + "\n" + (penulis || "(Penulis — Institusi)") + "\n\nABSTRAK\n(Tulis abstrak 150–250 kata: latar singkat, tujuan, metode, hasil utama, kesimpulan — susun setelah draf ini rampung.)\n\n1. PENDAHULUAN\n" + (secs[0].isi || "(kosong)") + "\n\n2. METODE\n" + (b3 || "(kosong)") + "\n\n3. HASIL DAN PEMBAHASAN\n" + (b4 || "(kosong)") + "\n\n4. KESIMPULAN\n" + (b5 || "(kosong)") + "\n\nDAFTAR PUSTAKA\n(Salin dari daftar pustaka skripsimu, sesuaikan dengan gaya selingkung jurnal tujuan.)";
  window._imrad = draf; window._imradSecs = secs; window._imradJudul = judul; window._imradPenulis = penulis;
  $("#imrOut").innerHTML = '<div class="\' + OUT + \'"><p class="font-extrabold mb-2">📊 Cek Proporsi Kata (total acuan: ' + fmtN(target, 0) + ' kata)</p>'
    + '<table class="w-full text-[13px]"><tr class="text-left text-slate-500"><th class="py-1 pr-3">Bagian</th><th class="py-1 pr-3">Kata Saat Ini</th><th class="py-1 pr-3">Target Ideal</th><th class="py-1">Status</th></tr>' + baris + "</table>"
    + '<p class="font-extrabold mt-4 mb-2">📄 Draf Artikel (IMRAD)</p><div class="bg-white dark:bg-slate-900 rounded-lg p-5 border border-slate-200 dark:border-slate-700 whitespace-pre-wrap leading-relaxed text-[14px]" style="font-family:Georgia,serif">' + esc(draf) + "</div>"
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="\' + BTN + \'" onclick="imrUnduhDoc()">⬇️ Download .doc (IMRAD)</button><button class="\' + BTN2 + \'" onclick="copyText(window._imrad)">📋 Copy Draf</button></div></div>';
}
function imrUnduhDoc() {
  const s = window._imradSecs || [];
  const h = (t) => '<h3 style="font-family:serif">' + t + "</h3>";
  const p = (t) => (t || "(kosong)").split(/\n+/).map((x) => '<p style="font-family:serif;font-size:11pt;text-align:justify">' + esc(x) + "</p>").join("");
  let body = '<h2 style="text-align:center;font-family:serif">' + esc(window._imradJudul || "Judul Artikel") + '</h2><p style="text-align:center;font-family:serif">' + esc(window._imradPenulis || "") + "</p>"
    + h("ABSTRAK") + '<p style="font-family:serif;font-size:11pt;text-align:justify">(Tulis abstrak 150–250 kata: latar singkat, tujuan, metode, hasil utama, kesimpulan.)</p>'
    + h("1. PENDAHULUAN") + p(s[0] && s[0].isi) + h("2. METODE") + p(s[1] && s[1].isi) + h("3. HASIL DAN PEMBAHASAN") + p(s[2] && s[2].isi) + h("4. KESIMPULAN") + p(s[3] && s[3].isi) + h("DAFTAR PUSTAKA") + '<p style="font-family:serif;font-size:11pt">(Salin dari daftar pustaka skripsi, sesuaikan gaya selingkung jurnal tujuan.)</p>';
  if (($("#imrKolom") || {}).value === "2") body = '<table width="100%" cellspacing="0" cellpadding="10"><tr><td width="50%" valign="top">' + h("ABSTRAK") + '<p style="font-family:serif;font-size:11pt">(Abstrak 150–250 kata.)</p>' + h("1. PENDAHULUAN") + p(s[0] && s[0].isi) + h("2. METODE") + p(s[1] && s[1].isi) + '</td><td width="50%" valign="top">' + h("3. HASIL DAN PEMBAHASAN") + p(s[2] && s[2].isi) + h("4. KESIMPULAN") + p(s[3] && s[3].isi) + h("DAFTAR PUSTAKA") + '<p style="font-family:serif;font-size:11pt">(Sesuaikan gaya selingkung jurnal.)</p></td></tr></table><h2 style="text-align:center;font-family:serif">' + esc(window._imradJudul || "") + '</h2><p style="text-align:center;font-family:serif">' + esc(window._imradPenulis || "") + "</p>";
  download("Artikel_IMRAD.doc", "<html><body>" + kopLogoHtml("center") + body + "</body></html>", "application/msword");
}
SHARE_GETTERS.imrad = function () { return window._imrad ? "Saya sedang mengubah skripsi jadi artikel jurnal format IMRAD (" + imrKata(window._imrad) + " kata) dengan Konverter IMRAD MahasiswaTools." : ""; };

/* ---------- 87. OJS KIT: COVER LETTER & MATRIKS REVIEWER ---------- */
UI.ojskit = function (el) {
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">Dua senjata submit jurnal via OJS: <b>surat pengantar (cover letter)</b> untuk editor dan <b>matriks tanggapan reviewer</b> untuk revisimu. Isi sekali, keduanya langsung jadi.</p>'
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Nama Jurnal Tujuan", '<input id="ojJurnal" class="\' + IN + \'" placeholder="cth: Jurnal Ilmu Ekonomi & Studi Pembangunan">')
    + field("Bahasa Surat", '<select id="ojBahasa" class="\' + IN + \'"><option value="id">Bahasa Indonesia</option><option value="en">English</option></select>')
    + field("Judul Artikel", '<input id="ojJudul" class="\' + IN + \'" placeholder="Judul artikel yang disubmit">')
    + field("Nama Penulis Korespondensi", '<input id="ojPenulis" class="\' + IN + \'" placeholder="Nama kamu">')
    + field("Institusi", '<input id="ojInst" class="\' + IN + \'" placeholder="cth: Universitas PGRI Palembang">')
    + field("Email Korespondensi", '<input id="ojEmail" class="\' + IN + \'" placeholder="email@kamu.ac.id">')
    + "</div>"
    + field("Komentar Reviewer (satu komentar per baris, untuk matriks tanggapan)", '<textarea id="ojKomentar" rows="5" class="\' + IN + \'" placeholder="Reviewer 1: Perjelas kebaruan penelitian di pendahuluan&#10;Reviewer 1: Tambahkan uji asumsi klasik&#10;Reviewer 2: Perbaiki format tabel 3"></textarea>')
    + outBox("ojOut") + "</div>";
  el.addEventListener("input", () => { clearTimeout(el._t); el._t = setTimeout(ojsBuat, 350); });
  ojsBuat();
};
function ojsBuat() {
  const g = (id) => (($("#" + id) || {}).value || "").trim();
  const jurnal = g("ojJurnal") || "(Nama Jurnal)", judul = g("ojJudul") || "(Judul Artikel)", penulis = g("ojPenulis") || "(Nama Penulis)", inst = g("ojInst") || "(Institusi)", email = g("ojEmail") || "(email)";
  let surat;
  if (g("ojBahasa") === "en") surat = "Dear Editor-in-Chief of " + jurnal + ",\n\nWe are pleased to submit our manuscript entitled \"" + judul + "\" for consideration for publication in " + jurnal + ".\n\nThis manuscript is original, has not been published previously, and is not under consideration by any other journal. All authors have read and approved the submitted version, and there are no conflicts of interest to declare. The study contributes empirical evidence and practical implications that we believe will be of interest to the readers of " + jurnal + ".\n\nThank you for your time and consideration. We look forward to your response.\n\nSincerely,\n" + penulis + "\n" + inst + "\nCorresponding author: " + email;
  else surat = "Kepada Yth.\nEditor-in-Chief " + jurnal + "\ndi tempat\n\nDengan hormat,\n\nBersama ini kami mengajukan naskah artikel berjudul \"" + judul + "\" untuk dipertimbangkan penerbitannya di " + jurnal + ".\n\nKami menyatakan bahwa naskah ini orisinal, belum pernah diterbitkan, dan tidak sedang diajukan ke jurnal lain. Seluruh penulis telah membaca dan menyetujui versi yang diajukan, serta tidak terdapat konflik kepentingan. Penelitian ini menyumbang bukti empiris dan implikasi praktis yang kami yakini bermanfaat bagi pembaca " + jurnal + ".\n\nDemikian surat pengantar ini kami sampaikan. Atas perhatian dan pertimbangan Bapak/Ibu Editor, kami ucapkan terima kasih.\n\nHormat kami,\n" + penulis + "\n" + inst + "\nPenulis korespondensi: " + email;
  if (!$("#ojOut")) return;
  const koms = g("ojKomentar").split(/\n/).map((s) => s.trim()).filter(Boolean);
  window._ojSurat = surat; window._ojKoms = koms; window._ojJurnal = jurnal;
  const matriks = koms.length ? '<table class="w-full text-[12.5px] mt-2"><tr class="text-left bg-slate-100 dark:bg-slate-800"><th class="p-2">No</th><th class="p-2">Komentar Reviewer</th><th class="p-2">Tanggapan & Perbaikan Penulis</th><th class="p-2">Hal/Baris</th></tr>' + koms.map((k, i) => "<tr class=\"border-t border-slate-200 dark:border-slate-700\"><td class=\"p-2\">" + (i + 1) + "</td><td class=\"p-2\">" + esc(k) + "</td><td class=\"p-2 text-slate-400\">(isi tanggapan & perbaikanmu)</td><td class=\"p-2 text-slate-400\">(hal/baris)</td></tr>").join("") + "</table>" : '<p class="text-sm text-slate-500 mt-2">Isi komentar reviewer di atas untuk membangkitkan matriks tanggapan.</p>';
  $("#ojOut").innerHTML = '<div class="\' + OUT + \'"><p class="font-extrabold mb-2">✉️ Cover Letter</p><div class="bg-white dark:bg-slate-900 rounded-lg p-5 border border-slate-200 dark:border-slate-700 whitespace-pre-wrap leading-relaxed text-[14px]" style="font-family:Georgia,serif">' + esc(surat) + '</div>'
    + '<p class="font-extrabold mt-4">🧾 Matriks Tanggapan Reviewer (' + koms.length + ' komentar)</p>' + matriks
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="\' + BTN + \'" onclick="ojsUnduhDoc()">⬇️ Download .doc (Surat + Matriks)</button><button class="\' + BTN2 + \'" onclick="copyText(window._ojSurat)">📋 Copy Surat</button></div></div>';
}
function ojsUnduhDoc() {
  const koms = window._ojKoms || [];
  const tabel = '<table border="1" cellspacing="0" cellpadding="6" style="border-collapse:collapse;width:100%;font-family:serif;font-size:11pt"><tr><th style="width:5%">No</th><th style="width:35%">Komentar Reviewer</th><th style="width:42%">Tanggapan & Perbaikan Penulis</th><th style="width:18%">Hal/Baris</th></tr>' + koms.map((k, i) => "<tr><td>" + (i + 1) + "</td><td>" + esc(k) + "</td><td></td><td></td></tr>").join("") + "</table>";
  download("OJS_Kit.doc", "<html><body style='font-family:serif;font-size:12pt'>" + kopLogoHtml("center") + "<div style='white-space:pre-wrap'>" + esc(window._ojSurat || "") + "</div><br><h3>Matriks Tanggapan Reviewer — " + esc(window._ojJurnal || "") + "</h3>" + tabel + "</body></html>", "application/msword");
}
SHARE_GETTERS.ojskit = function () { return "Saya menyiapkan submit jurnal ke " + (window._ojJurnal || "jurnal tujuan") + " (cover letter + matriks tanggapan " + (window._ojKoms || []).length + " komentar reviewer) dengan OJS Kit MahasiswaTools."; };

/* ---------- 91. GENERATOR KISI-KISI & OPERASIONALISASI VARIABEL ---------- */
UI.kisikisi = function (el) {
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">Susun tabel kisi-kisi instrumen Bab 3 tanpa mengetik ulang nomor item. Satu variabel per baris, format:<br><code class="text-[12px]">Variabel | Definisi Operasional | Dimensi | Indikator 1, Indikator 2 | 2F/1U | Likert 5</code><br>Kolom 5 = jumlah item per indikator (F = favorable, U = unfavorable). Nomor item dihitung otomatis berurutan.</p>'
    + field("Data Variabel & Indikator", '<textarea id="kkiIn" rows="7" class="\' + IN + \'" placeholder="Motivasi Belajar | Keinginan dan dorongan untuk belajar | Intrinsik | Hasrat berhasil, Dorongan kebutuhan belajar | 2F/1U | Likert 5"></textarea>')
    + '<div class="flex flex-wrap gap-2 mb-1"><button class="\' + BTN + \'" onclick="kkiSusun()">🧩 Susun Tabel Kisi-Kisi</button><button class="\' + BTN2 + \'" onclick="kkiContoh()">Contoh Isian</button></div>'
    + outBox("kkiOut") + "</div>";
};
function kkiContoh() {
  $("#kkiIn").value = "Motivasi Belajar | Keinginan dan dorongan dalam diri untuk belajar | Intrinsik | Hasrat untuk berhasil, Dorongan kebutuhan belajar | 2F/1U | Likert 5\nMotivasi Belajar | Keinginan dan dorongan dalam diri untuk belajar | Ekstrinsik | Penghargaan, Lingkungan belajar kondusif | 2F/0U | Likert 5\nPrestasi Belajar | Hasil yang dicapai dari kegiatan belajar | Kognitif | Nilai ujian, Pemahaman materi | 1F/1U | Tes";
  kkiSusun();
}
function kkiSusun() {
  const lines = ($("#kkiIn").value || "").split(/\n/).map((s) => s.trim()).filter(Boolean);
  const out = $("#kkiOut");
  if (!lines.length) { out.innerHTML = '<div class="\' + OUT + \' text-rose-600 font-semibold">⚠️ Isi dulu data variabelnya.</div>'; return; }
  let no = 0; const rows = []; const rekap = {}; let totInd = 0;
  lines.forEach((ln) => {
    const p = ln.split("|").map((s) => s.trim());
    const [vari, def, dim, inds, fu, skala] = [p[0] || "-", p[1] || "-", p[2] || "-", p[3] || "-", p[4] || "1F/0U", p[5] || "Likert 5"];
    const mf = /(\d+)\s*F/i.exec(fu), mu = /(\d+)\s*U/i.exec(fu);
    const nf = mf ? Number(mf[1]) : 1, nu = mu ? Number(mu[1]) : 0;
    (inds.split(",").map((s) => s.trim()).filter(Boolean)).forEach((ind) => {
      totInd++;
      const fNums = [], uNums = [];
      for (let i = 0; i < nf; i++) fNums.push(++no);
      for (let i = 0; i < nu; i++) uNums.push(++no);
      rows.push({ vari, def, dim, ind, f: fNums.join(", "), u: uNums.join(", ") || "—", skala });
      rekap[vari] = (rekap[vari] || 0) + nf + nu;
    });
  });
  window._kkiRows = rows; window._kkiTotal = no;
  const tabel = '<table class="w-full text-[12.5px]"><tr class="text-left bg-slate-100 dark:bg-slate-800"><th class="p-2">Variabel</th><th class="p-2">Definisi Operasional</th><th class="p-2">Dimensi</th><th class="p-2">Indikator</th><th class="p-2">No. Item (F/U)</th><th class="p-2">Skala</th></tr>'
    + rows.map((r) => "<tr class=\"border-t border-slate-200 dark:border-slate-700\"><td class=\"p-2 font-semibold\">" + esc(r.vari) + "</td><td class=\"p-2\">" + esc(r.def) + "</td><td class=\"p-2\">" + esc(r.dim) + "</td><td class=\"p-2\">" + esc(r.ind) + "</td><td class=\"p-2\">F: " + r.f + "<br>U: " + r.u + "</td><td class=\"p-2\">" + esc(r.skala) + "</td></tr>").join("") + "</table>";
  out.innerHTML = '<div class="\' + OUT + \'"><p class="font-extrabold mb-1">🧩 Tabel Kisi-Kisi Instrumen</p><p class="text-[13px] mb-2">Rekap: ' + Object.entries(rekap).map(([v, n]) => "<b>" + esc(v) + "</b> = " + n + " item").join(" • ") + ' — <b>Total ' + no + ' item</b> dari ' + totInd + ' indikator.</p>' + tabel
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="\' + BTN + \'" onclick="kkiUnduhDoc()">⬇️ Download .doc (Tabel Bab 3)</button></div></div>';
}
function kkiUnduhDoc() {
  const rows = window._kkiRows || [];
  const tabel = '<table border="1" cellspacing="0" cellpadding="6" style="border-collapse:collapse;width:100%;font-family:serif;font-size:11pt"><tr><th>Variabel</th><th>Definisi Operasional</th><th>Dimensi</th><th>Indikator</th><th>No. Item Favorable</th><th>No. Item Unfavorable</th><th>Skala</th></tr>'
    + rows.map((r) => "<tr><td>" + esc(r.vari) + "</td><td>" + esc(r.def) + "</td><td>" + esc(r.dim) + "</td><td>" + esc(r.ind) + "</td><td>" + r.f + "</td><td>" + r.u + "</td><td>" + esc(r.skala) + "</td></tr>").join("") + "</table>";
  download("Kisi_Kisi_Instrumen.doc", "<html><body style='font-family:serif;font-size:12pt'>" + kopLogoHtml("center") + "<h3>Kisi-Kisi Instrumen Penelitian</h3>" + tabel + "<p>Total item: " + (window._kkiTotal || 0) + "</p></body></html>", "application/msword");
}
SHARE_GETTERS.kisikisi = function () { return "Kisi-kisi instrumen penelitian saya: total " + (window._kkiTotal || 0) + " item terpetakan rapi per variabel, dimensi, dan indikator — dibuat dengan MahasiswaTools."; };

/* ---------- 96. LEMBAR PENGESAHAN & PERNYATAAN BEBAS PLAGIAT ---------- */
UI.pengesahan = function (el) {
  const f2 = (label, inner) => field(label, inner);
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">Dua lembar resmi penutup skripsi: <b>Lembar Pengesahan</b> (tanda tangan pembimbing, penguji, kaprodi & dekan sejajar rapi) dan <b>Surat Pernyataan Keaslian</b> dengan kotak materai Rp10.000. Unduh sebagai satu .doc berkop institusi.</p>'
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + f2("Nama Mahasiswa", '<input id="pgNama" class="\' + IN + \'">') + f2("NIM", '<input id="pgNim" class="\' + IN + \'">')
    + f2("Program Studi", '<input id="pgProdi" class="\' + IN + \'">') + f2("Fakultas", '<input id="pgFak" class="\' + IN + \'">')
    + f2("Universitas", '<input id="pgUniv" class="\' + IN + \'">') + f2("Kota & Tanggal", '<input id="pgTanggal" class="\' + IN + \'" placeholder="cth: Palembang, 21 Oktober 2026">')
    + f2("Pembimbing 1 (nama + NIP)", '<input id="pgP1" class="\' + IN + \'" placeholder="Nama, gelar — NIP. ...">') + f2("Pembimbing 2 (opsional)", '<input id="pgP2" class="\' + IN + \'">')
    + f2("Penguji 1", '<input id="pgU1" class="\' + IN + \'">') + f2("Penguji 2", '<input id="pgU2" class="\' + IN + \'">')
    + f2("Ketua Prodi/Jurusan", '<input id="pgKap" class="\' + IN + \'">') + f2("Dekan (Mengetahui)", '<input id="pgDekan" class="\' + IN + \'">')
    + "</div>"
    + field("Judul Skripsi", '<textarea id="pgJudul" rows="2" class="\' + IN + \'"></textarea>')
    + outBox("pgOut") + "</div>";
  el.addEventListener("input", () => { clearTimeout(el._t); el._t = setTimeout(pgsBuat, 350); });
  pgsBuat();
};
function pgsData() {
  const g = (id) => (($("#" + id) || {}).value || "").trim();
  return { nama: g("pgNama"), nim: g("pgNim"), prodi: g("pgProdi"), fak: g("pgFak"), univ: g("pgUniv"), tgl: g("pgTanggal"), judul: g("pgJudul"), p1: g("pgP1"), p2: g("pgP2"), u1: g("pgU1"), u2: g("pgU2"), kap: g("pgKap"), dekan: g("pgDekan") };
}
function pgsHtml() {
  const d = pgsData();
  const ttd = (peran, nama) => '<td style="width:50%;vertical-align:top;padding:10px"><p style="font-family:serif;font-size:12pt">' + peran + ',</p><br><br><br><p style="font-family:serif;font-size:12pt"><b><u>' + esc(nama || "........................") + "</u></b></p></td>";
  const sah = '<h2 style="text-align:center;font-family:serif">LEMBAR PENGESAHAN</h2>'
    + '<p style="font-family:serif;font-size:12pt;text-align:center">Skripsi dengan judul:</p><p style="text-align:center;font-family:serif;font-size:12pt"><b>"' + esc(d.judul || "—") + '"</b></p>'
    + '<p style="font-family:serif;font-size:12pt;text-align:center">Oleh:<br><b>' + esc(d.nama || "—") + "</b><br>NIM. " + esc(d.nim || "—") + "<br>Program Studi " + esc(d.prodi || "—") + ", " + esc(d.fak || "") + ", " + esc(d.univ || "") + "</p>"
    + '<p style="font-family:serif;font-size:12pt;text-align:justify">telah dipertahankan di hadapan tim penguji dan diterima sebagai bagian persyaratan yang diperlukan untuk memperoleh gelar Sarjana pada Program Studi ' + esc(d.prodi || "—") + ", " + esc(d.fak || "") + ", " + esc(d.univ || "") + ".</p>"
    + '<p style="font-family:serif;font-size:12pt;text-align:right">' + esc(d.tgl || "—") + "</p>"
    + '<table width="100%" cellspacing="0" cellpadding="0"><tr>' + ttd("Dosen Pembimbing 1", d.p1) + ttd("Dosen Pembimbing 2", d.p2) + "</tr><tr>" + ttd("Dosen Penguji 1", d.u1) + ttd("Dosen Penguji 2", d.u2) + "</tr></table>"
    + '<p style="font-family:serif;font-size:12pt;text-align:center;margin-top:12px">Mengetahui,</p><table width="100%" cellspacing="0" cellpadding="0"><tr>' + ttd("Dekan " + (d.fak || ""), d.dekan) + ttd("Ketua Program Studi " + (d.prodi || ""), d.kap) + "</tr></table>";
  const per = '<h2 style="text-align:center;font-family:serif">SURAT PERNYATAAN KEASLIAN KARYA</h2>'
    + '<p style="font-family:serif;font-size:12pt;text-align:justify">Saya yang bertanda tangan di bawah ini:</p>'
    + '<table cellspacing="0" cellpadding="2" style="font-family:serif;font-size:12pt"><tr><td>Nama</td><td>: ' + esc(d.nama || "—") + "</td></tr><tr><td>NIM</td><td>: " + esc(d.nim || "—") + "</td></tr><tr><td>Program Studi</td><td>: " + esc(d.prodi || "—") + "</td></tr></table>"
    + '<p style="font-family:serif;font-size:12pt;text-align:justify">menyatakan dengan sesungguhnya bahwa skripsi berjudul <b>"' + esc(d.judul || "—") + '"</b> adalah benar-benar karya saya sendiri dan bukan merupakan plagiat atau saduran dari karya orang lain, kecuali bagian-bagian yang dirujuk sumbernya sebagaimana tercantum dalam daftar pustaka. Apabila di kemudian hari terbukti pernyataan ini tidak benar, saya bersedia menerima sanksi akademik sesuai ketentuan yang berlaku.</p>'
    + '<table width="100%" cellspacing="0" cellpadding="0"><tr><td style="width:55%"></td><td style="font-family:serif;font-size:12pt">' + esc(d.tgl || "—") + '<br>Yang menyatakan,<br><table border="1" cellspacing="0" cellpadding="8" style="border-collapse:collapse;margin:8px 0"><tr><td style="font-size:10pt;text-align:center">MATERAI<br>Rp10.000</td></tr></table><br><b><u>' + esc(d.nama || "........................") + "</u></b><br>NIM. " + esc(d.nim || "—") + "</td></tr></table>";
  return { sah, per };
}
function pgsBuat() {
  if (!$("#pgOut")) return;
  const h = pgsHtml();
  window._pgsSah = h.sah; window._pgsPer = h.per;
  $("#pgOut").innerHTML = '<div class="\' + OUT + \'"><div class="bg-white text-slate-900 rounded-lg p-6 border border-slate-200 mb-4 overflow-x-auto"><div style="min-width:520px">' + h.sah + '</div></div>'
    + '<div class="bg-white text-slate-900 rounded-lg p-6 border border-slate-200 overflow-x-auto"><div style="min-width:520px">' + h.per + "</div></div>"
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="\' + BTN + \'" onclick="pgsUnduhDoc()">⬇️ Download .doc (Pengesahan + Pernyataan)</button></div></div>';
}
function pgsUnduhDoc() {
  download("Lembar_Pengesahan_Pernyataan.doc", "<html><body>" + kopLogoHtml("center") + window._pgsSah + '<br style="page-break-after:always">' + window._pgsPer + "</body></html>", "application/msword");
}
SHARE_GETTERS.pengesahan = function () { return "Lembar pengesahan & surat pernyataan bebas plagiat untuk skripsi saya sudah rapi (tinggal tanda tangan + materai) — dibuat dengan MahasiswaTools."; };

/* ---------- 89. GENERATOR TABEL STATISTIK EKSAK (r / t / F / CHI-SQUARE) ---------- */
UI.tabelstat = function (el) {
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">Buku tabel statistik cuma memuat N/df tertentu — tool ini menghitung <b>nilai kritis eksak untuk N atau df berapa pun</b> (misal N=137) pada α 0,10, 0,05, dan 0,01, lengkap dengan pembanding nilai hitungmu.</p>'
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Jenis Tabel", '<select id="tbsJenis" class="\' + IN + \'"><option value="r">r — Korelasi Product Moment</option><option value="t">t — Distribusi t</option><option value="f">F — Distribusi F</option><option value="x2">χ² — Chi-Square</option></select>')
    + field("Mode", '<select id="tbsMode" class="\' + IN + \'" onchange="tbsModeChange()"><option value="satu">Satu nilai + pembanding</option><option value="rentang">Rentang tabel (klasik)</option></select>')
    + "</div>"
    + '<div id="tbsSatu"><div class="grid sm:grid-cols-3 gap-x-4">'
    + field("N (untuk r) / df (t, χ²) / df1 (F)", '<input id="tbsDf1" type="number" class="\' + IN + \'" placeholder="cth: 137">')
    + field("df2 (hanya untuk F)", '<input id="tbsDf2" type="number" class="\' + IN + \'" placeholder="cth: 40">')
    + field("Nilai Hitung Kamu (opsional)", '<input id="tbsHitung" type="number" step="any" class="\' + IN + \'" placeholder="cth: 0,31">')
    + "</div></div>"
    + '<div id="tbsRentang" class="hidden"><div class="grid sm:grid-cols-4 gap-x-4">'
    + field("Dari", '<input id="tbsDari" type="number" class="\' + IN + \'" value="5">')
    + field("Sampai", '<input id="tbsSampai" type="number" class="\' + IN + \'" value="30">')
    + field("Langkah", '<input id="tbsLangkah" type="number" class="\' + IN + \'" value="5">')
    + field("df2 Tetap (hanya F)", '<input id="tbsDf2r" type="number" class="\' + IN + \'" placeholder="cth: 40">')
    + "</div></div>"
    + '<button class="\' + BTN + \'" onclick="tbsBuat()">📊 Hitung Nilai Kritis</button>'
    + outBox("tbsOut") + "</div>";
};
function tbsModeChange() { const r = $("#tbsMode").value === "rentang"; $("#tbsRentang").classList.toggle("hidden", !r); $("#tbsSatu").classList.toggle("hidden", r); }
function tbsCdfT(t, df) { const x = df / (df + t * t); const ib = betainc(x, df / 2, 0.5); return t >= 0 ? 1 - 0.5 * ib : 0.5 * ib; }
function tbsInvT(df, alpha) { const target = 1 - alpha / 2; let lo = 0, hi = 200; for (let i = 0; i < 80; i++) { const mid = (lo + hi) / 2; if (tbsCdfT(mid, df) < target) lo = mid; else hi = mid; } return (lo + hi) / 2; }
function tbsInvUpper(fnP, alpha) { let lo = 0, hi = 1; let g = 0; while (fnP(hi) > alpha && g++ < 40) hi *= 2; for (let i = 0; i < 70; i++) { const mid = (lo + hi) / 2; if (fnP(mid) > alpha) lo = mid; else hi = mid; } return (lo + hi) / 2; }
function tbsInvF(d1, d2, alpha) { return tbsInvUpper((f) => pDariF(f, d1, d2), alpha); }
function tbsInvChi(df, alpha) { return tbsInvUpper((x) => pChi2(x, df), alpha); }
function tbsKritis(jenis, d1, d2, alpha) {
  if (jenis === "r") { const df = d1 - 2; const t = tbsInvT(df, alpha); return t / Math.sqrt(t * t + df); }
  if (jenis === "t") return tbsInvT(d1, alpha);
  if (jenis === "f") return tbsInvF(d1, d2, alpha);
  return tbsInvChi(d1, alpha);
}
function tbsBuat() {
  const jenis = $("#tbsJenis").value, mode = $("#tbsMode").value, out = $("#tbsOut");
  const namaJ = { r: "r tabel (df = N − 2)", t: "t tabel", f: "F tabel", x2: "χ² tabel" }[jenis];
  const alphas = [0.10, 0.05, 0.01];
  const fmtA = (a) => "α " + String(a).replace(".", ",");
  if (mode === "satu") {
    const d1 = Number($("#tbsDf1").value), d2 = Number($("#tbsDf2").value);
    if (!d1 || d1 < 3 || (jenis === "f" && !d2)) { out.innerHTML = '<div class="\' + OUT + \' text-rose-600 font-semibold">⚠️ Isi N/df' + (jenis === "f" ? " dan df2" : "") + " dulu (N minimal 3).</div>"; return; }
    const hit = parseFloat(($("#tbsHitung").value || "").replace(",", "."));
    const krit = alphas.map((a) => tbsKritis(jenis, d1, d2, a));
    window._tbsTeks = namaJ + " (" + (jenis === "r" ? "N=" + d1 : jenis === "f" ? "df1=" + d1 + ", df2=" + d2 : "df=" + d1) + "): " + alphas.map((a, i) => fmtA(a) + " = " + fmtN(krit[i], 3)).join("; ");
    let banding = "";
    if (isFinite(hit)) banding = '<div class="mt-3 text-[13.5px] leading-relaxed"><p class="font-extrabold">⚖️ Pembanding — nilai hitungmu: ' + fmtN(hit, 3) + "</p>" + alphas.map((a, i) => { const sig = Math.abs(hit) > krit[i]; return "<p>• Pada " + fmtA(a) + ": " + fmtN(Math.abs(hit), 3) + (sig ? " &gt; " : " ≤ ") + fmtN(krit[i], 3) + " → <b class=\"" + (sig ? "text-emerald-600" : "text-rose-600") + "\">" + (sig ? "SIGNIFIKAN ✅" : "Tidak signifikan ❌") + "</b></p>"; }).join("") + '<p class="text-slate-500">Cara membaca: hasil uji signifikan bila nilai hitung (mutlak) lebih besar dari nilai tabel pada taraf α pilihanmu.</p></div>';
    out.innerHTML = '<div class="\' + OUT + \'"><p class="font-extrabold mb-2">📊 ' + namaJ + (jenis === "r" ? " untuk N = " + d1 : jenis === "f" ? " untuk df1 = " + d1 + ", df2 = " + d2 : " untuk df = " + d1) + "</p>"
      + '<table class="w-full text-[13.5px]"><tr class="text-left text-slate-500"><th class="py-1 pr-3">Taraf α</th>' + alphas.map((a) => '<th class="py-1 pr-3">' + fmtA(a) + "</th>").join("") + "</tr><tr><td class=\"py-1 pr-3 font-semibold\">Nilai kritis</td>" + krit.map((k) => '<td class="py-1 pr-3 font-bold">' + fmtN(k, 3) + "</td>").join("") + "</tr></table>" + banding
      + '<div class="flex flex-wrap gap-2 mt-3"><button class="\' + BTN2 + \'" onclick="copyText(window._tbsTeks)">📋 Copy Hasil</button></div></div>';
    return;
  }
  const dari = Number($("#tbsDari").value) || 1, sampai = Number($("#tbsSampai").value) || 30, langkah = Math.max(1, Number($("#tbsLangkah").value) || 1), d2r = Number($("#tbsDf2r").value) || Number($("#tbsDf2").value) || 40;
  const vals = []; for (let v = dari; v <= sampai && vals.length < 100; v += langkah) vals.push(v);
  const rows = vals.map((v) => "<tr class=\"border-t border-slate-200 dark:border-slate-700\"><td class=\"py-1 pr-3 font-semibold\">" + v + "</td>" + alphas.map((a) => '<td class="py-1 pr-3">' + fmtN(tbsKritis(jenis, v, d2r, a), 3) + "</td>").join("") + "</tr>").join("");
  window._tbsTeks = namaJ + (jenis === "f" ? " (df2=" + d2r + ")" : "") + "\n" + (jenis === "r" ? "N" : "df") + "\t" + alphas.map(fmtA).join("\t") + "\n" + vals.map((v) => v + "\t" + alphas.map((a) => fmtN(tbsKritis(jenis, v, d2r, a), 3)).join("\t")).join("\n");
  out.innerHTML = '<div class="\' + OUT + \'"><p class="font-extrabold mb-2">📊 ' + namaJ + (jenis === "f" ? " (df2 tetap = " + d2r + ")" : "") + '</p><div class="overflow-x-auto"><table class="w-full text-[13px]"><tr class="text-left text-slate-500"><th class="py-1 pr-3">' + (jenis === "r" ? "N" : jenis === "f" ? "df1" : "df") + "</th>" + alphas.map((a) => '<th class="py-1 pr-3">' + fmtA(a) + "</th>").join("") + "</tr>" + rows + "</table></div>"
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="\' + BTN2 + \'" onclick="copyText(window._tbsTeks)">📋 Copy Tabel (TSV)</button></div></div>';
}
SHARE_GETTERS.tabelstat = function () { return window._tbsTeks ? "Saya menghitung nilai tabel statistik eksak tanpa buku tabel: " + window._tbsTeks.split("\n")[0] + " — dengan MahasiswaTools." : ""; };

/* ---------- 90. UJI MEDIASI (SOBEL) & MODERASI (MRA) ---------- */
UI.mediasi = function (el) {
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">Dua uji lanjutan Bab 4: <b>Sobel Test</b> untuk membuktikan variabel mediasi (perantara) dan <b>MRA</b> untuk variabel moderasi (memperkuat/memperlemah hubungan).</p>'
    + '<div class="flex gap-2 mb-4"><button id="medTabS" class="\' + BTN + \'" onclick="medPindah(\'s\')">💧 Tab 1 — Sobel Test (Mediasi)</button><button id="medTabM" class="\' + BTN2 + \'" onclick="medPindah(\'m\')">🎚️ Tab 2 — Moderasi (MRA)</button></div>'
    + '<div id="medBoxS">'
    + '<div class="grid sm:grid-cols-3 gap-x-4">' + field("Nama Variabel Bebas (X)", '<input id="medLX" class="\' + IN + \'" placeholder="cth: Kualitas Layanan">') + field("Nama Mediator (Z)", '<input id="medLZ" class="\' + IN + \'" placeholder="cth: Kepuasan">') + field("Nama Variabel Terikat (Y)", '<input id="medLY" class="\' + IN + \'" placeholder="cth: Loyalitas">') + "</div>"
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Koefisien jalur a (X → Z)", '<input id="medA" type="number" step="any" class="\' + IN + \'">') + field("Standard Error a (SEa)", '<input id="medSEa" type="number" step="any" class="\' + IN + \'">')
    + field("Koefisien jalur b (Z → Y)", '<input id="medB" type="number" step="any" class="\' + IN + \'">') + field("Standard Error b (SEb)", '<input id="medSEb" type="number" step="any" class="\' + IN + \'">')
    + field("Jalur langsung c′ (X → Y, opsional)", '<input id="medCp" type="number" step="any" class="\' + IN + \'" placeholder="untuk menentukan mediasi penuh/parsial">') + "</div>"
    + '<button class="\' + BTN + \'" onclick="medSobel()">💧 Hitung Sobel Test</button>'
    + '<details class="mt-4"><summary class="font-bold cursor-pointer text-[14px]">📥 Atau hitung a, b & SE langsung dari data mentah</summary><div class="grid sm:grid-cols-3 gap-x-4 mt-3">'
    + field("Data X (satu angka per baris)", '<textarea id="medXd" rows="5" class="\' + IN + \'"></textarea>') + field("Data Z (mediator)", '<textarea id="medZd" rows="5" class="\' + IN + \'"></textarea>') + field("Data Y", '<textarea id="medYd" rows="5" class="\' + IN + \'"></textarea>') + '</div><button class="\' + BTN2 + \'" onclick="medDariData()">Hitung Koefisien dari Data</button></details>'
    + outBox("medOutS") + "</div>"
    + '<div id="medBoxM" class="hidden">'
    + '<div class="grid sm:grid-cols-3 gap-x-4">'
    + field("Data X", '<textarea id="medXm" rows="5" class="\' + IN + \'"></textarea>') + field("Data M (moderator)", '<textarea id="medMm" rows="5" class="\' + IN + \'"></textarea>') + field("Data Y", '<textarea id="medYm" rows="5" class="\' + IN + \'"></textarea>') + "</div>"
    + '<p class="text-[13px] text-slate-500 mb-2">X dan M di-centering (dikurangi rata-rata) sebelum membentuk interaksi X×M — praktik standar MRA.</p>'
    + '<button class="\' + BTN + \'" onclick="medMra()">🎚️ Jalankan Regresi Moderasi</button>'
    + outBox("medOutM") + "</div></div>";
};
function medPindah(w) { $("#medBoxS").classList.toggle("hidden", w !== "s"); $("#medBoxM").classList.toggle("hidden", w !== "m"); $("#medTabS").className = w === "s" ? BTN : BTN2; $("#medTabM").className = w === "m" ? BTN : BTN2; }
function medPhi(z) { const t = 1 / (1 + 0.2316419 * Math.abs(z)); const d = 0.3989422804014327 * Math.exp(-z * z / 2); const p = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429)))); return z > 0 ? 1 - p : p; }
function medP2(z) { return 2 * (1 - medPhi(Math.abs(z))); }
function medSobel() {
  const v = (id) => parseFloat((($("#" + id) || {}).value || "").replace(",", "."));
  const a = v("medA"), sea = v("medSEa"), b = v("medB"), seb = v("medSEb"), cp = v("medCp");
  const out = $("#medOutS");
  if (![a, sea, b, seb].every(isFinite) || sea <= 0 || seb <= 0) { out.innerHTML = '<div class="\' + OUT + \' text-rose-600 font-semibold">⚠️ Isi a, SEa, b, dan SEb dengan benar (SE harus > 0) — atau hitung dari data mentah di bawah.</div>'; return; }
  const ab = a * b;
  const seS = Math.sqrt(b * b * sea * sea + a * a * seb * seb);
  const seA = Math.sqrt(b * b * sea * sea + a * a * seb * seb + sea * sea * seb * seb);
  const seG = Math.sqrt(Math.max(1e-12, b * b * sea * sea + a * a * seb * seb - sea * sea * seb * seb));
  const zS = ab / seS, zA = ab / seA, zG = ab / seG, p = medP2(zS);
  const sig = p < 0.05;
  const LX = ($("#medLX").value || "X").trim() || "X", LZ = ($("#medLZ").value || "Z").trim() || "Z", LY = ($("#medLY").value || "Y").trim() || "Y";
  const ketCp = isFinite(cp) ? (Math.abs(cp) >= 1.96 * 0 ? "" : "") : "";
  const narasi = "Hasil uji Sobel menunjukkan efek tidak langsung " + LX + " terhadap " + LY + " melalui " + LZ + " sebesar ab = " + fmtN(ab, 3) + " dengan nilai z = " + fmtN(zS, 3) + " dan p = " + fmtP(p) + ". Karena " + (sig ? "p < 0,05, efek mediasi dinyatakan <b>signifikan</b> — " + LZ + " terbukti berperan sebagai variabel perantara" : "p ≥ 0,05, efek mediasi <b>tidak signifikan</b> — " + LZ + " tidak terbukti memediasi") + " hubungan " + LX + " → " + LY + (isFinite(cp) ? (sig ? (Math.abs(cp) > 0 ? ". Jalur langsung c′ = " + fmtN(cp, 3) + " masih ada setelah mediator dimasukkan, jadi sifatnya <b>mediasi parsial</b> (bila c′ ikut signifikan) — cek nilai p jalur langsung pada output regresimu untuk memastikan." : ".") : ".") : ".");
  window._medHasil = { ab, zS, p, sig, narasi };
  const svg = '<svg viewBox="0 0 560 170" class="w-full max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700"><defs><marker id="medArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#4F46E5"/></marker></defs>'
    + '<rect x="20" y="65" width="130" height="46" rx="10" fill="#EEF2FF" stroke="#4F46E5" stroke-width="2"/><text x="85" y="93" text-anchor="middle" font-size="13" font-weight="bold" fill="#1E293B">' + esc(LX.slice(0, 16)) + '</text>'
    + '<rect x="215" y="15" width="130" height="46" rx="10" fill="#ECFDF5" stroke="#059669" stroke-width="2"/><text x="280" y="43" text-anchor="middle" font-size="13" font-weight="bold" fill="#1E293B">' + esc(LZ.slice(0, 16)) + '</text>'
    + '<rect x="410" y="65" width="130" height="46" rx="10" fill="#FFF7ED" stroke="#EA580C" stroke-width="2"/><text x="475" y="93" text-anchor="middle" font-size="13" font-weight="bold" fill="#1E293B">' + esc(LY.slice(0, 16)) + '</text>'
    + '<line x1="150" y1="70" x2="212" y2="45" stroke="#4F46E5" stroke-width="2.4" marker-end="url(#medArr)"/><text x="168" y="45" font-size="13" font-weight="bold" fill="#4F46E5">a = ' + fmtN(a, 3) + '</text>'
    + '<line x1="348" y1="45" x2="407" y2="70" stroke="#4F46E5" stroke-width="2.4" marker-end="url(#medArr)"/><text x="352" y="45" font-size="13" font-weight="bold" fill="#4F46E5">b = ' + fmtN(b, 3) + '</text>'
    + '<line x1="152" y1="95" x2="407" y2="95" stroke="#64748B" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#medArr)"/><text x="280" y="118" text-anchor="middle" font-size="13" fill="#475569">c′ = ' + (isFinite(cp) ? fmtN(cp, 3) : "—") + ' (langsung)</text></svg>';
  out.innerHTML = '<div class="\' + OUT + \'"><p class="font-extrabold mb-2">💧 Hasil Sobel Test</p>' + svg
    + '<table class="w-full text-[13.5px] mt-3"><tr class="text-left text-slate-500"><th class="py-1 pr-3">Varian</th><th class="py-1 pr-3">SE efek tidak langsung</th><th class="py-1 pr-3">z</th><th class="py-1">p (dua arah)</th></tr>'
    + [["Sobel", seS, zS], ["Aroian", seA, zA], ["Goodman", seG, zG]].map((r) => "<tr class=\"border-t border-slate-200 dark:border-slate-700\"><td class=\"py-1 pr-3 font-semibold\">" + r[0] + "</td><td class=\"py-1 pr-3\">" + fmtN(r[1], 4) + "</td><td class=\"py-1 pr-3 font-bold\">" + fmtN(r[2], 3) + "</td><td class=\"py-1\">" + fmtP(medP2(r[2])) + "</td></tr>").join("") + "</table>"
    + '<p class="mt-2 font-bold ' + (sig ? "text-emerald-600" : "text-rose-600") + '">Efek tidak langsung ab = ' + fmtN(ab, 3) + " → " + (sig ? "MEDIASI SIGNIFIKAN ✅" : "Mediasi tidak signifikan ❌") + "</p>"
    + '<p class="mt-2 text-[13.5px] leading-relaxed"><b>Narasi Bab 4:</b> ' + narasi + "</p>"
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="\' + BTN2 + \'" onclick="copyText((window._medHasil||{}).narasi || \'\')">📋 Copy Narasi</button></div></div>';
}
function medDariData() {
  const X = parseNums($("#medXd").value || ""), Z = parseNums($("#medZd").value || ""), Y = parseNums($("#medYd").value || "");
  const out = $("#medOutS");
  if (X.length < 4 || X.length !== Z.length || X.length !== Y.length) { out.innerHTML = '<div class="\' + OUT + \' text-rose-600 font-semibold">⚠️ Data X, Z, Y harus sama panjang (minimal 4 baris).</div>'; return; }
  const f1 = olsFit([X], Z), f2 = olsFit([X, Z], Y), f3 = olsFit([X], Y);
  $("#medA").value = fmtN(f1.beta[1], 4); $("#medSEa").value = fmtN(f1.se[1], 4);
  $("#medB").value = fmtN(f2.beta[2], 4); $("#medSEb").value = fmtN(f2.se[2], 4);
  $("#medCp").value = fmtN(f2.beta[1], 4);
  window._medTotalC = f3.beta[1];
  medSobel();
}
function medMra() {
  const X = parseNums($("#medXm").value || ""), M = parseNums($("#medMm").value || ""), Y = parseNums($("#medYm").value || "");
  const out = $("#medOutM");
  if (X.length < 6 || X.length !== M.length || X.length !== Y.length) { out.innerHTML = '<div class="\' + OUT + \' text-rose-600 font-semibold">⚠️ Data X, M, Y harus sama panjang (minimal 6 baris).</div>'; return; }
  const mx = mean(X), mm = mean(M);
  const Xc = X.map((v) => v - mx), Mc = M.map((v) => v - mm), XM = Xc.map((v, i) => v * Mc[i]);
  const full = olsFit([Xc, Mc, XM], Y), red = olsFit([Xc, Mc], Y);
  const n = Y.length, dR2 = full.r2 - red.r2;
  const fChg = dR2 > 0 ? (dR2 / 1) / ((1 - full.r2) / (n - 4)) : 0;
  const pChg = fChg > 0 ? pDariF(fChg, 1, n - 4) : 1;
  const nm = ["Konstanta", "X (terpusat)", "M (terpusat)", "Interaksi X×M"];
  const rows = nm.map((s, i) => "<tr class=\"border-t border-slate-200 dark:border-slate-700\"><td class=\"py-1 pr-3 font-semibold\">" + s + "</td><td class=\"py-1 pr-3\">" + fmtN(full.beta[i], 4) + "</td><td class=\"py-1 pr-3\">" + fmtN(full.se[i], 4) + "</td><td class=\"py-1 pr-3\">" + fmtN(full.t[i], 3) + "</td><td class=\"py-1\">" + fmtP(full.pv[i]) + "</td></tr>").join("");
  const sigInt = full.pv[3] < 0.05, sigM = full.pv[2] < 0.05;
  const jenis = sigInt && !sigM ? "Pure Moderator (moderasi murni)" : sigInt && sigM ? "Quasi Moderator (moderasi semu)" : !sigInt && sigM ? "Predictor Moderator (M berperan sebagai prediktor)" : "Homologizer Moderator (potensi moderasi, belum terbukti)";
  const arah = full.beta[3] > 0 ? "memperkuat" : "memperlemah";
  const narasi = "Hasil Moderated Regression Analysis (MRA) menunjukkan R² model penuh = " + fmtN(full.r2, 3) + " dengan tambahan ΔR² = " + fmtN(dR2, 3) + " dari interaksi X×M (F perubahan = " + fmtN(fChg, 3) + ", p = " + fmtP(pChg) + "). Koefisien interaksi b = " + fmtN(full.beta[3], 4) + " (p = " + fmtP(full.pv[3]) + ") sehingga M tergolong <b>" + jenis + "</b>" + (sigInt ? " dan " + arah + " hubungan X terhadap Y" : "") + ".";
  window._mraNarasi = narasi;
  out.innerHTML = '<div class="\' + OUT + \'"><p class="font-extrabold mb-2">🎚️ Hasil MRA — R² penuh ' + fmtN(full.r2, 3) + " • ΔR² interaksi " + fmtN(dR2, 3) + " (p = " + fmtP(pChg) + ")</p>"
    + '<table class="w-full text-[13.5px]"><tr class="text-left text-slate-500"><th class="py-1 pr-3">Koefisien</th><th class="py-1 pr-3">b</th><th class="py-1 pr-3">SE</th><th class="py-1 pr-3">t</th><th class="py-1">p</th></tr>' + rows + "</table>"
    + '<p class="mt-2 font-bold">Klasifikasi: ' + jenis + "</p>"
    + '<p class="mt-2 text-[13.5px] leading-relaxed"><b>Narasi Bab 4:</b> ' + narasi + "</p>"
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="\' + BTN2 + \'" onclick="copyText(window._mraNarasi || \'\')">📋 Copy Narasi</button></div></div>';
}
SHARE_GETTERS.mediasi = function () { const h = window._medHasil; return h ? "Uji mediasi (Sobel) saya: ab = " + fmtN(h.ab, 3) + ", z = " + fmtN(h.zS, 3) + ", p = " + fmtP(h.p) + " (" + (h.sig ? "signifikan" : "tidak signifikan") + ") — dihitung dengan MahasiswaTools." : (window._mraNarasi || ""); };

/* ---------- 92. KALKULATOR SAMPEL EKSPERIMEN (FEDERER) ---------- */
UI.federer = function (el) {
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">Untuk penelitian eksperimen: hitung <b>ulangan minimal per perlakuan</b> dengan rumus Federer <b>(t − 1)(r − 1) ≥ 15</b>, koreksi drop-out, plus pengacak penempatan sampel (RAL/RAK).</p>'
    + '<div class="grid sm:grid-cols-3 gap-x-4">'
    + field("Jumlah Perlakuan (t)", '<input id="fedT" type="number" class="\' + IN + \'" value="4">')
    + field("Target Derajat Bebas Galat", '<input id="fedTarget" type="number" class="\' + IN + \'" value="15">')
    + field("Perkiraan Drop-out (%)", '<input id="fedDrop" type="number" class="\' + IN + \'" value="10">')
    + "</div>"
    + '<button class="\' + BTN + \'" onclick="fedHitung()">🧪 Hitung Ulangan Minimal</button>'
    + outBox("fedOut")
    + '<div class="mt-6"><p class="font-extrabold mb-2">🎲 Pengacak Penempatan Sampel</p>'
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Mode Rancangan", '<select id="fedMode" class="\' + IN + \'"><option value="ral">RAL — Rancangan Acak Lengkap</option><option value="rak">RAK — Rancangan Acak Kelompok (blok)</option></select>')
    + field("Jumlah Blok (untuk RAK)", '<input id="fedBlok" type="number" class="\' + IN + \'" value="6">')
    + "</div>"
    + field("Label Unit Sampel (satu per baris — kosongkan untuk nomor otomatis)", '<textarea id="fedUnit" rows="5" class="\' + IN + \'" placeholder="Tikus-01&#10;Tikus-02&#10;Tikus-03"></textarea>')
    + '<button class="\' + BTN2 + \'" onclick="fedAcak()">🎲 Acak Penempatan</button>'
    + outBox("fedAcakOut") + "</div></div>";
};
function fedHitung() {
  const t = Math.max(2, Number($("#fedT").value) || 2), target = Math.max(1, Number($("#fedTarget").value) || 15), drop = Math.min(95, Math.max(0, Number($("#fedDrop").value) || 0));
  const r = Math.ceil(target / (t - 1)) + 1, db = (t - 1) * (r - 1), N = t * r;
  const rAdj = Math.ceil(r / (1 - drop / 100)), Nadj = t * rAdj;
  window._fedHasil = { t, r, N, rAdj, Nadj, db };
  const rows = [0, 1, 2, 3].map((k) => { const rr = r + k; return "<tr class=\"border-t border-slate-200 dark:border-slate-700\"><td class=\"py-1 pr-3\">" + rr + "</td><td class=\"py-1 pr-3\">" + ((t - 1) * (rr - 1)) + "</td><td class=\"py-1\">" + (t * rr) + "</td></tr>"; }).join("");
  $("#fedOut").innerHTML = '<div class="\' + OUT + \'"><p class="font-extrabold mb-1">🧪 Hasil Rumus Federer</p>'
    + '<p class="text-[14px] leading-relaxed">Dengan t = ' + t + ' perlakuan: ulangan minimal <b class="text-lg">r = ' + r + '</b> (derajat bebas galat (' + t + ' − 1)(' + r + ' − 1) = <b>' + db + '</b> ≥ ' + target + ' ✅). Total sampel minimal <b>N = ' + N + '</b>. Dengan antisipasi drop-out ' + drop + '%: naikkan menjadi <b>r = ' + rAdj + '</b> per kelompok → <b>N total = ' + Nadj + '</b>.</p>'
    + '<table class="w-full text-[13px] mt-2 max-w-md"><tr class="text-left text-slate-500"><th class="py-1 pr-3">Ulangan (r)</th><th class="py-1 pr-3">db Galat</th><th class="py-1">N Total</th></tr>' + rows + "</table>"
    + '<p class="text-[12.5px] text-slate-500 mt-2">Rumus koreksi drop-out: r\' = r / (1 − d). Cantumkan r final (setelah koreksi) di Bab 3 sebagai jumlah sampel per kelompok.</p></div>';
}
function fedAcak() {
  const t = Math.max(2, Number($("#fedT").value) || 2), mode = $("#fedMode").value, blok = Math.max(1, Number($("#fedBlok").value) || 1);
  let labels = ($("#fedUnit").value || "").split(/\n/).map((s) => s.trim()).filter(Boolean);
  const out = $("#fedAcakOut");
  const acakArr = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let html = "", teks = "";
  if (mode === "ral") {
    if (!labels.length) { const N = (window._fedHasil && window._fedHasil.t === t) ? window._fedHasil.Nadj : t * 6; labels = Array.from({ length: N }, (_, i) => "Unit-" + (i + 1)); }
    const acak = acakArr(labels), grup = Array.from({ length: t }, () => []);
    acak.forEach((u, i) => grup[i % t].push(u));
    html = '<table class="w-full text-[13px]"><tr class="text-left text-slate-500"><th class="py-1 pr-3">Kelompok</th><th class="py-1">Unit Sampel</th></tr>' + grup.map((g, i) => "<tr class=\"border-t border-slate-200 dark:border-slate-700\"><td class=\"py-1 pr-3 font-semibold\">P" + (i + 1) + " (" + g.length + " unit)</td><td class=\"py-1\">" + g.map(esc).join(", ") + "</td></tr>").join("") + "</table>";
    teks = grup.map((g, i) => "P" + (i + 1) + ": " + g.join(", ")).join("\n");
  } else {
    const need = blok * t;
    if (labels.length < need) labels = labels.concat(Array.from({ length: need - labels.length }, (_, i) => "Unit-" + (labels.length + i + 1)));
    labels = labels.slice(0, need);
    const rowsB = [];
    for (let b = 0; b < blok; b++) { const chunk = acakArr(labels.slice(b * t, b * t + t)); rowsB.push("<tr class=\"border-t border-slate-200 dark:border-slate-700\"><td class=\"py-1 pr-3 font-semibold\">Blok " + (b + 1) + "</td>" + chunk.map((u, i) => "<td class=\"py-1 pr-3\">P" + (i + 1) + ": " + esc(u) + "</td>").join("") + "</tr>"); }
    html = '<table class="w-full text-[13px]"><tr class="text-left text-slate-500"><th class="py-1 pr-3">Blok</th>' + Array.from({ length: t }, (_, i) => '<th class="py-1 pr-3">Perlakuan ' + (i + 1) + "</th>").join("") + "</tr>" + rowsB.join("") + "</table>";
    teks = rowsB.map((r) => r.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()).join("\n");
  }
  window._fedAcakTeks = (mode === "ral" ? "RAL" : "RAK") + " — t=" + t + "\n" + teks;
  out.innerHTML = '<div class="\' + OUT + \'"><p class="font-extrabold mb-2">🎲 Hasil Pengacakan (' + (mode === "ral" ? "RAL" : "RAK") + ')</p><div class="overflow-x-auto">' + html + '</div><div class="flex flex-wrap gap-2 mt-3"><button class="\' + BTN2 + \'" onclick="copyText(window._fedAcakTeks || \'\')">📋 Copy Hasil Acak</button></div></div>';
}
SHARE_GETTERS.federer = function () { const h = window._fedHasil; return h ? "Rancangan eksperimen saya (Federer): " + h.t + " perlakuan × " + h.rAdj + " ulangan = " + h.Nadj + " sampel total — dihitung dengan MahasiswaTools." : ""; };

/* ---------- 93. KONVERTER SITASI BIBTEX / RIS ---------- */
UI.bibtex = function (el) {
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">Ubah file sitasi <b>BibTeX (.bib)</b> atau <b>RIS (.ris)</b> dari Mendeley/Zotero/Google Scholar menjadi daftar pustaka terformat (APA 7, IEEE, Vancouver) — atau sebaliknya — tanpa instal software.</p>'
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Format Sumber", '<select id="bibMode" class="\' + IN + \'"><option value="auto">Otomatis (deteksi)</option><option value="bib">BibTeX (.bib)</option><option value="ris">RIS (.ris)</option></select>')
    + field("Gaya Daftar Pustaka", '<select id="bibGaya" class="\' + IN + \'"><option value="apa">APA 7</option><option value="ieee">IEEE</option><option value="vancouver">Vancouver</option></select>')
    + "</div>"
    + field("Isi File / Teks Sitasi", '<textarea id="bibIn" rows="9" class="\' + IN + \' !text-[12px]" style="font-family:monospace">@article{pranata2024,\n  author = {Pranata, Detta and Sari, Maya},\n  title = {Pengaruh Kualitas Layanan terhadap Kepuasan Pengguna},\n  journal = {Jurnal Ilmu Ekonomi},\n  year = {2024},\n  volume = {12},\n  number = {2},\n  pages = {101--115},\n  doi = {10.1234/jie.2024.101}\n}</textarea>')
    + '<div class="flex flex-wrap gap-2 mb-1"><button class="\' + BTN + \'" onclick="bibKonversi()">🔄 Konversi ke Daftar Pustaka</button><button class="\' + BTN2 + \'" onclick="bibKeBib()">⬇️ Unduh .bib</button><button class="\' + BTN2 + \'" onclick="bibKeRis()">⬇️ Unduh .ris</button></div>'
    + outBox("bibOut") + "</div>";
};
function bibParsePenulis(s) {
  return (s || "").split(/\s+and\s+/i).map((x) => x.trim()).filter(Boolean).map((x) => {
    let last = "", given = "";
    if (x.includes(",")) { const p = x.split(","); last = p[0].trim(); given = (p[1] || "").trim(); }
    else { const t = x.split(/\s+/); last = t[t.length - 1]; given = t.slice(0, -1).join(" "); }
    const inisial = given.split(/[\s.]+/).filter(Boolean).map((w) => w[0].toUpperCase()).join("");
    return { last, given, inisial };
  });
}
function bibEntries() {
  const text = $("#bibIn").value || "";
  let mode = $("#bibMode").value;
  if (mode === "auto") mode = /^\s*TY\s{2}-/m.test(text) || /\nER\s{2}-/.test(text) ? "ris" : "bib";
  const out = [];
  if (mode === "ris") {
    let cur = null;
    text.split(/\r?\n/).forEach((ln) => {
      const m = /^([A-Z][A-Z0-9])\s{2}-\s?(.*)$/.exec(ln);
      if (!m) return;
      const tag = m[1], val = m[2].trim();
      if (tag === "TY") cur = { type: val, authors: [] };
      else if (tag === "ER") { if (cur) out.push(cur); cur = null; }
      else if (cur) {
        if (tag === "AU") cur.authors.push(...bibParsePenulis(val));
        else if (tag === "TI" || tag === "T1") cur.title = val;
        else if (tag === "JO" || tag === "JF") cur.journal = val;
        else if (tag === "T2" && !cur.journal) cur.journal = val;
        else if (tag === "Y1" || tag === "PY") cur.year = (val.match(/\d{4}/) || [""])[0];
        else if (tag === "VL") cur.volume = val;
        else if (tag === "IS") cur.number = val;
        else if (tag === "SP") cur.p1 = val;
        else if (tag === "EP") cur.p2 = val;
        else if (tag === "DO") cur.doi = val;
        else if (tag === "PB") cur.publisher = val;
      }
    });
    out.forEach((e) => { e.pages = e.p1 ? e.p1 + (e.p2 ? "–" + e.p2 : "") : ""; });
    return out;
  }
  text.split(/(?=@\w+\s*\{)/).forEach((chunk) => {
    const head = /@(\w+)\s*\{\s*([^,]+),/.exec(chunk);
    if (!head) return;
    const e = { type: head[1].toLowerCase(), authors: [] };
    const re = /(\w+)\s*=\s*\{((?:[^{}]|\{[^{}]*\})*)\}|(\w+)\s*=\s*"([^"]*)"/g; let m;
    while ((m = re.exec(chunk))) {
      const key = (m[1] || m[3] || "").toLowerCase(), val = (m[2] !== undefined && m[2] !== "" ? m[2] : m[4] || "").replace(/[{}]/g, "").replace(/\s+/g, " ").trim();
      if (key === "author") e.authors = bibParsePenulis(val);
      else if (key === "title") e.title = val;
      else if (key === "journal" || key === "booktitle") e.journal = val;
      else if (key === "year") e.year = val;
      else if (key === "volume") e.volume = val;
      else if (key === "number") e.number = val;
      else if (key === "pages") e.pages = val.replace(/--/g, "–");
      else if (key === "doi") e.doi = val;
      else if (key === "publisher") e.publisher = val;
    }
    out.push(e);
  });
  return out;
}
function bibFormat(e, gaya) {
  const A = e.authors || [];
  const th = e.year || "n.d.";
  if (gaya === "ieee") {
    const au = A.length > 3 ? (A[0].inisial.split("").join(". ") + ". " + A[0].last + " et al.") : A.map((a) => a.inisial.split("").join(". ") + ". " + a.last).join(", ");
    return au + ", \"" + (e.title || "") + ",\" " + (e.journal || "") + (e.volume ? ", vol. " + e.volume : "") + (e.number ? ", no. " + e.number : "") + (e.pages ? ", pp. " + e.pages : "") + ", " + th + ".";
  }
  if (gaya === "vancouver") {
    const au = A.map((a) => a.last + " " + a.inisial).join(", ");
    return au + ". " + (e.title || "") + ". " + (e.journal || "") + ". " + th + (e.volume ? ";" + e.volume : "") + (e.number ? "(" + e.number + ")" : "") + (e.pages ? ":" + e.pages : "") + ".";
  }
  const au = A.map((a) => a.last + ", " + a.inisial.split("").join(". ") + ".").join(", ").replace(/, ([^,]*)$/, ", &$1");
  return au + " (" + th + "). " + (e.title || "") + ". " + (e.journal || "") + (e.volume ? ", " + e.volume : "") + (e.number ? "(" + e.number + ")" : "") + (e.pages ? ", " + e.pages : "") + "." + (e.doi ? " https://doi.org/" + e.doi : "");
}
function bibKonversi() {
  const entries = bibEntries(), gaya = $("#bibGaya").value, out = $("#bibOut");
  if (!entries.length) { out.innerHTML = '<div class="\' + OUT + \' text-rose-600 font-semibold">⚠️ Tidak ada entri terbaca. Pastikan format BibTeX (@article{...}) atau RIS (TY  - ... ER  -) benar.</div>'; return; }
  const teks = entries.map((e) => bibFormat(e, gaya)).join("\n");
  window._bibTeks = teks; window._bibEntries = entries;
  out.innerHTML = '<div class="\' + OUT + \'"><p class="font-extrabold mb-2">📚 ' + entries.length + ' Entri — Gaya ' + ({ apa: "APA 7", ieee: "IEEE", vancouver: "Vancouver" })[gaya] + '</p><ol class="list-decimal ml-5 space-y-2 text-[13.5px] leading-relaxed">' + entries.map((e) => "<li>" + esc(bibFormat(e, gaya)) + "</li>").join("") + '</ol><div class="flex flex-wrap gap-2 mt-3"><button class="\' + BTN + \'" onclick="download(\'Daftar_Pustaka_Konversi.txt\', window._bibTeks || \'\')">⬇️ Unduh .txt</button><button class="\' + BTN2 + \'" onclick="copyText(window._bibTeks || \'\')">📋 Copy Semua</button></div></div>';
}
function bibKeBib() {
  const entries = window._bibEntries || bibEntries();
  if (!entries.length) { toast("Konversi dulu entrinya 📚"); return; }
  const t = entries.map((e, i) => {
    const key = ((e.authors[0] || {}).last || "ref").toLowerCase().replace(/\s+/g, "") + (e.year || "") + (i ? i : "");
    const f = [["author", e.authors.map((a) => a.last + ", " + a.given).join(" and ")], ["title", e.title], ["journal", e.journal], ["year", e.year], ["volume", e.volume], ["number", e.number], ["pages", (e.pages || "").replace(/–/g, "--")], ["doi", e.doi], ["publisher", e.publisher]].filter((x) => x[1]);
    return "@" + (e.type && e.type !== "JOUR" ? e.type : "article") + "{" + key + ",\n" + f.map((x) => "  " + x[0] + " = {" + x[1] + "}").join(",\n") + "\n}";
  }).join("\n\n");
  download("sitasi_konversi.bib", t, "text/plain");
}
function bibKeRis() {
  const entries = window._bibEntries || bibEntries();
  if (!entries.length) { toast("Konversi dulu entrinya 📚"); return; }
  const t = entries.map((e) => {
    const L = ["TY  - JOUR"];
    e.authors.forEach((a) => L.push("AU  - " + a.last + ", " + a.given));
    if (e.title) L.push("TI  - " + e.title);
    if (e.journal) L.push("JO  - " + e.journal);
    if (e.year) L.push("Y1  - " + e.year);
    if (e.volume) L.push("VL  - " + e.volume);
    if (e.number) L.push("IS  - " + e.number);
    if (e.pages) { const pp = e.pages.split("–"); L.push("SP  - " + pp[0]); if (pp[1]) L.push("EP  - " + pp[1]); }
    if (e.doi) L.push("DO  - " + e.doi);
    if (e.publisher) L.push("PB  - " + e.publisher);
    L.push("ER  - ");
    return L.join("\n");
  }).join("\n\n");
  download("sitasi_konversi.ris", t, "text/plain");
}
SHARE_GETTERS.bibtex = function () { return "Saya mengonversi " + (window._bibEntries || []).length + " sitasi antar-format (BibTeX/RIS/APA/IEEE/Vancouver) langsung di browser dengan MahasiswaTools."; };

/* ---------- 94. PEMBUAT POSTER ILMIAH ---------- */
const POS_TEMA = [
  { n: "Indigo Akademik", head: "#4F46E5", dark: "#312E81", soft: "#EEF2FF" },
  { n: "Zamrud", head: "#059669", dark: "#065F46", soft: "#ECFDF5" },
  { n: "Marun Klasik", head: "#991B1B", dark: "#7F1D1D", soft: "#FEF2F2" },
  { n: "Slate Modern", head: "#334155", dark: "#0F172A", soft: "#F1F5F9" }
];
UI.poster = function (el) {
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">Poster ilmiah siap cetak (kanvas resolusi tinggi ±200 dpi) untuk seminar, PKM, dan konferensi: kop logo institusi, abstrak, metodologi, temuan, kesimpulan, dan QR code otomatis di pojok bawah.</p>'
    + field("Judul Poster", '<input id="posJudul" class="\' + IN + \'" placeholder="Judul penelitian / pengabdian">')
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Penulis", '<input id="posPenulis" class="\' + IN + \'" placeholder="Nama penulis 1, penulis 2, ...">')
    + field("Institusi", '<input id="posInst" class="\' + IN + \'" placeholder="Universitas / Program Studi">')
    + field("Tema Warna", '<select id="posTema" class="\' + IN + \'">' + POS_TEMA.map((t, i) => '<option value="' + i + '">' + t.n + "</option>").join("") + "</select>")
    + field("Orientasi", '<select id="posOrientasi" class="\' + IN + \'"><option value="p">Potret (poster berdiri)</option><option value="l">Lanskap</option></select>')
    + "</div>"
    + field("Abstrak", '<textarea id="posAbstrak" rows="3" class="\' + IN + \'"></textarea>')
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Metodologi", '<textarea id="posMetode" rows="4" class="\' + IN + \'"></textarea>')
    + field("Temuan Utama (satu per baris, jadi poin)", '<textarea id="posTemuan" rows="4" class="\' + IN + \'"></textarea>')
    + "</div>"
    + field("Kesimpulan", '<textarea id="posKesimpulan" rows="2" class="\' + IN + \'"></textarea>')
    + field("Teks / Link untuk QR Code (pojok bawah)", '<input id="posQr" class="\' + IN + \'" placeholder="cth: https://linktr.ee/penelitianku">')
    + '<canvas id="posCv" class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white"></canvas>'
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="\' + BTN + \'" onclick="posUnduh()">⬇️ Download Poster (PNG Resolusi Tinggi)</button></div></div>';
  el.addEventListener("input", () => { clearTimeout(el._t); el._t = setTimeout(posGambar, 300); });
  el.addEventListener("change", posGambar);
  posGambar();
  loadLib("https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js", "qrcode").then(() => posGambar());
};
function posWrap(x, text, maxW) {
  const words = (text || "").split(/\s+/).filter(Boolean); const lines = []; let cur = "";
  words.forEach((w) => { const coba = cur ? cur + " " + w : w; if (x.measureText(coba).width > maxW && cur) { lines.push(cur); cur = w; } else cur = coba; });
  if (cur) lines.push(cur);
  return lines.length ? lines : [""];
}
function posSeksi(x, px, py, pw, judul, isi, tema, fs, lh) {
  x.fillStyle = tema.soft; x.beginPath(); x.roundRect(px, py, pw, 10, 18); x.fill();
  x.fillStyle = tema.head; x.beginPath(); x.roundRect(px, py, pw, 64, 18); x.fill(); x.fillRect(px, py + 40, pw, 24);
  x.fillStyle = "#FFFFFF"; x.font = "800 34px 'Plus Jakarta Sans', sans-serif"; x.textAlign = "left";
  x.fillText(judul.toUpperCase(), px + 28, py + 43);
  x.fillStyle = "#1E293B"; x.font = "400 " + fs + "px 'Plus Jakarta Sans', sans-serif";
  let ly = py + 64 + lh;
  const poin = isi.includes("\n");
  isi.split(/\n/).forEach((par) => {
    posWrap(x, (poin ? "• " : "") + par.trim(), pw - 56).forEach((ln) => { x.fillText(ln, px + 28, ly); ly += lh; });
  });
  return ly - py + 18;
}
function posGambar() {
  const cv = $("#posCv"); if (!cv) return;
  const g = (id) => (($("#" + id) || {}).value || "").trim();
  const tema = POS_TEMA[Number(g("posTema")) || 0];
  const potret = (g("posOrientasi") || "p") !== "l";
  const W = potret ? 2000 : 2828, H = potret ? 2828 : 2000;
  cv.width = W; cv.height = H;
  const x = cv.getContext("2d");
  x.fillStyle = "#FFFFFF"; x.fillRect(0, 0, W, H);
  const M = 90;
  x.fillStyle = tema.head; x.fillRect(0, 0, W, 350);
  x.fillStyle = tema.dark; x.fillRect(0, 350, W, 14);
  const logo = (typeof getLogoData === "function") ? getLogoData() : "";
  let tx = M;
  if (logo) {
    x.fillStyle = "#FFFFFF"; x.beginPath(); x.roundRect(M, 62, 300, 226, 16); x.fill();
    const img = new Image();
    img.onload = () => { if ($("#posCv")) posGambar(); };
    img.src = logo;
    if (img.complete && img.naturalWidth) { const s = Math.min(260 / img.naturalWidth, 190 / img.naturalHeight); x.drawImage(img, M + (300 - img.naturalWidth * s) / 2, 62 + (226 - img.naturalHeight * s) / 2, img.naturalWidth * s, img.naturalHeight * s); }
    tx = M + 340;
  }
  x.fillStyle = "#FFFFFF"; x.textAlign = "left";
  let fs = 82; let lines = [];
  do { x.font = "800 " + fs + "px 'Plus Jakarta Sans', sans-serif"; lines = posWrap(x, g("posJudul") || "Judul Poster Ilmiah Kamu", W - tx - M); fs -= 6; } while (lines.length > 3 && fs > 44);
  lines.forEach((ln, i) => x.fillText(ln, tx, 138 + i * (fs + 16)));
  x.font = "600 42px 'Plus Jakarta Sans', sans-serif"; x.fillStyle = "rgba(255,255,255,.92)";
  x.fillText(g("posPenulis") || "Nama Penulis", tx, 138 + lines.length * (fs + 16) + 32);
  x.font = "400 38px 'Plus Jakarta Sans', sans-serif";
  x.fillText(g("posInst") || "Institusi", tx, 138 + lines.length * (fs + 16) + 88);
  let y = 350 + 56;
  const bodyFs = potret ? 37 : 34, lh = Math.round(bodyFs * 1.5);
  y += posSeksi(x, M, y, W - 2 * M, "Abstrak", g("posAbstrak") || "(Isi abstrakmu di formulir atas — poster langsung ter-update.)", tema, bodyFs, lh) + 36;
  const colW = (W - 2 * M - 36) / 2;
  const h1 = posSeksi(x, M, y, colW, "Metodologi", g("posMetode") || "(Metode penelitian)", tema, bodyFs, lh);
  const h2 = posSeksi(x, M + colW + 36, y, colW, "Temuan Utama", g("posTemuan") || "Temuan 1\nTemuan 2", tema, bodyFs, lh);
  y += Math.max(h1, h2) + 36;
  const sisaY = H - 300;
  if (y < sisaY) y += posSeksi(x, M, y, W - 2 * M, "Kesimpulan", g("posKesimpulan") || "(Kesimpulan)", tema, bodyFs, lh);
  x.fillStyle = "#64748B"; x.font = "600 32px 'Plus Jakarta Sans', sans-serif"; x.textAlign = "left";
  x.fillText("MahasiswaTools • mahasiswatools.web.id", M, H - 56);
  const qrTeks = g("posQr");
  if (qrTeks && typeof qrcode !== "undefined") {
    try {
      const qr = qrcode(0, "M"); qr.addData(qrTeks); qr.make();
      const n = qr.getModuleCount(), box = 250, cell = box / n, qx = W - M - box, qy = H - 300;
      x.fillStyle = "#FFFFFF"; x.fillRect(qx - 8, qy - 8, box + 16, box + 16);
      x.fillStyle = "#0F172A";
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) x.fillRect(qx + c * cell, qy + r * cell, cell + 0.6, cell + 0.6);
      x.font = "600 26px 'Plus Jakarta Sans', sans-serif"; x.textAlign = "center"; x.fillStyle = "#64748B";
      x.fillText("Pindai untuk detail", qx + box / 2, qy + box + 34);
    } catch (e) {}
  }
}
function posUnduh() { const cv = $("#posCv"); if (cv) cv.toBlob((b) => { if (b) download("Poster_Ilmiah.png", b); }, "image/png"); }
SHARE_GETTERS.poster = function () { return "Poster ilmiah untuk seminar/PKM saya sudah jadi (resolusi tinggi, lengkap dengan QR) — dibuat dengan Pembuat Poster Ilmiah MahasiswaTools."; };

/* ---------- 97. PEER-ASSESSMENT & KONTRIBUSI KELOMPOK ---------- */
UI.peerassess = function (el) {
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">Nilai antar-anggota kelompok secara adil dan buktikan siapa yang benar-benar bekerja: matriks penilaian 4 kriteria menghasilkan <b>bobot kontribusi (%)</b> tiap anggota — siap dilampirkan ke dosen, anti free-rider.</p>'
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Anggota Kelompok (satu nama per baris)", '<textarea id="perAnggota" rows="4" class="\' + IN + \'">Andi\nBudi\nCitra\nDewi</textarea>')
    + field("Nilai Kelompok dari Dosen (0–100)", '<input id="perNilai" type="number" class="\' + IN + \'" value="85">')
    + "</div>"
    + '<p class="font-bold text-[13.5px] mb-1">Bobot Kriteria (%)</p><div class="grid grid-cols-4 gap-3 mb-3">'
    + field("Inisiatif", '<input id="perB1" type="number" class="\' + IN + \'" value="25">') + field("Tepat Waktu", '<input id="perB2" type="number" class="\' + IN + \'" value="25">') + field("Kualitas Kerja", '<input id="perB3" type="number" class="\' + IN + \'" value="30">') + field("Kehadiran Rapat", '<input id="perB4" type="number" class="\' + IN + \'" value="20">')
    + "</div>"
    + '<button class="\' + BTN2 + \'" onclick="perTemplate()">🧾 Buat Template Matriks Penilaian</button>'
    + field("Matriks Penilaian — format per baris: Penilai; Dinilai; Inisiatif; Tepat Waktu; Kualitas; Kehadiran (skor 1–5)", '<textarea id="perMatriks" rows="8" class="\' + IN + \' !text-[12.5px]" placeholder="Klik tombol template di atas, lalu ubah skornya"></textarea>')
    + '<button class="\' + BTN + \'" onclick="perHitung()">⚖️ Hitung Kontribusi</button>'
    + outBox("perOut") + "</div>";
};
function perAnggotaList() { return ($("#perAnggota").value || "").split(/\n/).map((s) => s.trim()).filter(Boolean); }
function perTemplate() {
  const A = perAnggotaList();
  if (A.length < 2) { toast("Isi minimal 2 anggota 👥"); return; }
  const L = [];
  A.forEach((p) => A.forEach((d) => { if (p !== d) L.push(p + "; " + d + "; 4; 4; 4; 4"); }));
  $("#perMatriks").value = L.join("\n");
  toast("Template " + L.length + " baris dibuat — ubah skornya lalu Hitung ⚖️");
}
function perHitung() {
  const A = perAnggotaList(), out = $("#perOut");
  if (A.length < 2) { out.innerHTML = '<div class="\' + OUT + \' text-rose-600 font-semibold">⚠️ Isi minimal 2 anggota.</div>'; return; }
  const bobot = [1, 2, 3, 4].map((i) => Number($("#perB" + i).value) || 0);
  const totB = bobot.reduce((a, b) => a + b, 0) || 1;
  const w = bobot.map((b) => b / totB);
  const skor = {}; A.forEach((a) => skor[a] = [[], [], [], []]);
  let asing = 0;
  ($("#perMatriks").value || "").split(/\n/).map((s) => s.trim()).filter(Boolean).forEach((ln) => {
    const p = ln.split(";").map((s) => s.trim());
    if (p.length < 6 || !skor[p[1]] || p[0] === p[1]) { asing++; return; }
    for (let k = 0; k < 4; k++) { const v = parseFloat((p[2 + k] || "").replace(",", ".")); if (isFinite(v)) skor[p[1]][k].push(Math.min(5, Math.max(1, v))); }
  });
  const hasil = A.map((a) => {
    let s = 0, ada = false;
    for (let k = 0; k < 4; k++) { if (skor[a][k].length) { ada = true; s += w[k] * mean(skor[a][k]); } }
    return { nama: a, skor: ada ? s : 0, ada };
  });
  const totSkor = hasil.reduce((x, h) => x + h.skor, 0);
  const adil = 100 / A.length, nKel = Number($("#perNilai").value) || 0;
  hasil.forEach((h) => { h.persen = totSkor ? h.skor / totSkor * 100 : 0; h.rasio = h.persen / adil; h.nilai = Math.min(100, Math.round(nKel * h.rasio)); h.status = !h.ada ? "Belum dinilai" : h.rasio >= 0.95 ? "✅ Kontributor baik" : h.rasio >= 0.8 ? "🟡 Di bawah rata-rata" : "⚠️ Indikasi free-rider"; });
  hasil.sort((a, b) => b.persen - a.persen);
  window._perHasil = hasil;
  out.innerHTML = '<div class="\' + OUT + \'"><p class="font-extrabold mb-2">⚖️ Hasil Peer-Assessment (porsi adil = ' + fmtN(adil, 1) + '% per orang)</p>'
    + '<table class="w-full text-[13px]"><tr class="text-left text-slate-500"><th class="py-1 pr-3">Anggota</th><th class="py-1 pr-3">Skor (0–5)</th><th class="py-1 pr-3">Kontribusi</th><th class="py-1 pr-3">Rasio vs Adil</th><th class="py-1 pr-3">Nilai Individu*</th><th class="py-1">Status</th></tr>'
    + hasil.map((h) => "<tr class=\"border-t border-slate-200 dark:border-slate-700\"><td class=\"py-1 pr-3 font-semibold\">" + esc(h.nama) + "</td><td class=\"py-1 pr-3\">" + fmtN(h.skor, 2) + "</td><td class=\"py-1 pr-3 font-bold\">" + fmtN(h.persen, 1) + "%</td><td class=\"py-1 pr-3\">" + fmtN(h.rasio, 2) + "×</td><td class=\"py-1 pr-3 font-bold\">" + h.nilai + "</td><td class=\"py-1\">" + h.status + "</td></tr>").join("") + "</table>"
    + '<p class="text-[12.5px] text-slate-500 mt-2">*Nilai individu = nilai kelompok (' + nKel + ') × rasio kontribusi, dibatasi maksimal 100. ' + (asing ? asing + " baris matriks dilewati (format/nama tidak cocok)." : "") + '</p>'
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="\' + BTN + \'" onclick="perUnduhDoc()">⬇️ Download .doc (Lampiran Dosen)</button></div></div>';
}
function perUnduhDoc() {
  const h = window._perHasil || [];
  const tabel = '<table border="1" cellspacing="0" cellpadding="6" style="border-collapse:collapse;width:100%;font-family:serif;font-size:11pt"><tr><th>Anggota</th><th>Skor Rata-rata (0–5)</th><th>Kontribusi (%)</th><th>Rasio vs Porsi Adil</th><th>Nilai Individu</th><th>Keterangan</th></tr>'
    + h.map((x) => "<tr><td>" + esc(x.nama) + "</td><td>" + fmtN(x.skor, 2) + "</td><td>" + fmtN(x.persen, 1) + "%</td><td>" + fmtN(x.rasio, 2) + "×</td><td>" + x.nilai + "</td><td>" + x.status.replace(/✅|🟡|⚠️/g, "").trim() + "</td></tr>").join("") + "</table>";
  download("Peer_Assessment_Kelompok.doc", "<html><body style='font-family:serif;font-size:12pt'>" + kopLogoHtml("center") + "<h3>Hasil Peer-Assessment & Kontribusi Kelompok</h3><p>Penilaian antar-anggota berdasarkan kriteria inisiatif, ketepatan waktu, kualitas kerja, dan kehadiran rapat (skala 1–5). Kontribusi dihitung dari skor tertimbang relatif terhadap porsi adil " + fmtN(100 / (h.length || 1), 1) + "% per anggota.</p>" + tabel + "</body></html>", "application/msword");
}
SHARE_GETTERS.peerassess = function () { const h = window._perHasil; return h && h.length ? "Kontribusi kelompok kami terhitung adil: tertinggi " + h[0].nama + " (" + fmtN(h[0].persen, 1) + "%), terendah " + h[h.length - 1].nama + " (" + fmtN(h[h.length - 1].persen, 1) + "%) — via Peer-Assessment MahasiswaTools." : ""; };

/* ---------- 98. SPLITTER TAGIHAN KOS PRO-RATA ---------- */
UI.prorata = function (el) {
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">Bagi tagihan kos/kontrakan <b>seadil harinya</b>: penghuni yang mudik atau masuk tengah bulan hanya membayar hari huninya, dan listrik ditimbang menurut beban alat elektronik tiap kamar.</p>'
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Periode Mulai", '<input id="proDari" type="date" class="\' + IN + \'" value="2026-10-01">')
    + field("Periode Selesai", '<input id="proSampai" type="date" class="\' + IN + \'" value="2026-10-31">')
    + field("Tagihan Listrik (Rp)", '<input id="proListrik" type="number" class="\' + IN + \'" placeholder="0">')
    + field("Tagihan WiFi (Rp)", '<input id="proWifi" type="number" class="\' + IN + \'" placeholder="0">')
    + field("Tagihan Air (Rp)", '<input id="proAir" type="number" class="\' + IN + \'" placeholder="0">')
    + "</div>"
    + field("Penghuni — format: Nama | Tanggal Masuk | Tanggal Keluar (boleh kosong) | Bobot Alat (boleh kosong, default 1)", '<textarea id="proPenghuni" rows="4" class="\' + IN + \'">Andi | 2026-10-01 |  | 1.5\nBudi | 2026-10-01 | 2026-10-20 | 1\nCitra | 2026-10-16 |  | 0.8</textarea>')
    + '<button class="\' + BTN + \'" onclick="proHitung()">🧾 Hitung Pembagian</button>'
    + outBox("proOut") + "</div>";
};
function proHitung() {
  const out = $("#proOut");
  const dari = new Date(($("#proDari").value || "") + "T00:00:00"), sampai = new Date(($("#proSampai").value || "") + "T00:00:00");
  const tg = { listrik: Number($("#proListrik").value) || 0, wifi: Number($("#proWifi").value) || 0, air: Number($("#proAir").value) || 0 };
  if (isNaN(dari) || isNaN(sampai) || sampai < dari) { out.innerHTML = '<div class="\' + OUT + \' text-rose-600 font-semibold">⚠️ Periode tanggal tidak valid.</div>'; return; }
  const HARI = 86400000;
  const orang = ($("#proPenghuni").value || "").split(/\n/).map((s) => s.trim()).filter(Boolean).map((ln) => {
    const p = ln.split("|").map((s) => s.trim());
    let masuk = p[1] ? new Date(p[1] + "T00:00:00") : dari;
    let keluar = p[2] ? new Date(p[2] + "T00:00:00") : sampai;
    if (isNaN(masuk)) masuk = dari; if (isNaN(keluar)) keluar = sampai;
    const m2 = new Date(Math.max(masuk, dari)), k2 = new Date(Math.min(keluar, sampai));
    const hari = k2 >= m2 ? Math.round((k2 - m2) / HARI) + 1 : 0;
    return { nama: p[0] || "-", hari, bobot: parseFloat((p[3] || "1").replace(",", ".")) || 1 };
  }).filter((o) => o.hari > 0);
  if (!orang.length) { out.innerHTML = '<div class="\' + OUT + \' text-rose-600 font-semibold">⚠️ Tidak ada penghuni dengan hari huni valid di periode ini.</div>'; return; }
  const basH = orang.reduce((a, o) => a + o.hari, 0), basL = orang.reduce((a, o) => a + o.hari * o.bobot, 0);
  orang.forEach((o) => {
    o.listrik = basL ? Math.round(tg.listrik * (o.hari * o.bobot) / basL) : 0;
    o.wifi = basH ? Math.round(tg.wifi * o.hari / basH) : 0;
    o.air = basH ? Math.round(tg.air * o.hari / basH) : 0;
    o.total = o.listrik + o.wifi + o.air;
  });
  const totBayar = orang.reduce((a, o) => a + o.total, 0), totTagihan = tg.listrik + tg.wifi + tg.air;
  window._proTeks = "Pembagian tagihan kos (" + $("#proDari").value + " s.d. " + $("#proSampai").value + "):\n" + orang.map((o) => "• " + o.nama + " (" + o.hari + " hari): " + fmtRp(o.total) + " — listrik " + fmtRp(o.listrik) + ", WiFi " + fmtRp(o.wifi) + ", air " + fmtRp(o.air)).join("\n") + "\nTotal terkumpul: " + fmtRp(totBayar);
  window._proTotal = totBayar;
  out.innerHTML = '<div class="\' + OUT + \'"><p class="font-extrabold mb-2">🧾 Hasil Pembagian Pro-Rata (' + fmtN((sampai - dari) / HARI + 1, 0) + ' hari periode)</p>'
    + '<table class="w-full text-[13px]"><tr class="text-left text-slate-500"><th class="py-1 pr-3">Penghuni</th><th class="py-1 pr-3">Hari</th><th class="py-1 pr-3">Listrik</th><th class="py-1 pr-3">WiFi</th><th class="py-1 pr-3">Air</th><th class="py-1">Total</th></tr>'
    + orang.map((o) => "<tr class=\"border-t border-slate-200 dark:border-slate-700\"><td class=\"py-1 pr-3 font-semibold\">" + esc(o.nama) + "</td><td class=\"py-1 pr-3\">" + o.hari + "</td><td class=\"py-1 pr-3\">" + fmtRp(o.listrik) + "</td><td class=\"py-1 pr-3\">" + fmtRp(o.wifi) + "</td><td class=\"py-1 pr-3\">" + fmtRp(o.air) + "</td><td class=\"py-1 font-bold\">" + fmtRp(o.total) + "</td></tr>").join("") + "</table>"
    + '<p class="text-[13px] mt-2">Total terkumpul <b>' + fmtRp(totBayar) + '</b> dari tagihan ' + fmtRp(totTagihan) + (Math.abs(totBayar - totTagihan) > orang.length ? ' (selisih pembulatan ' + fmtRp(Math.abs(totBayar - totTagihan)) + ")" : " — pas ✅") + '. Listrik ditimbang hari × bobot alat; WiFi & air ditimbang hari huni.</p>'
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="\' + BTN2 + \'" onclick="copyText(window._proTeks || \'\')">📋 Copy Ringkasan (untuk grup WA kos)</button></div></div>';
}
SHARE_GETTERS.prorata = function () { return window._proTeks ? "Tagihan kos bulan ini terbagi adil pro-rata hari huni — total " + fmtRp(window._proTotal || 0) + ". Dihitung dengan Splitter Tagihan Kos MahasiswaTools." : ""; };

/* ---------- 88. PREDIKSI PERTANYAAN SIDANG DARI ABSTRAK ---------- */
UI.tanyajawab = function (el) {
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">Penguji hampir selalu bertanya dari abstrakmu. Tempel abstrak skripsimu — tool membaca metode, jumlah sampel, dan hasil signifikansinya, lalu menyusun <b>daftar pertanyaan yang paling mungkin keluar + kerangka cara menjawabnya</b>.</p>'
    + field("Judul Skripsi", '<input id="tjJudul" class="\' + IN + \'">')
    + '<div class="grid sm:grid-cols-3 gap-x-4">'
    + field("Metode Penelitian", '<select id="tjMetode" class="\' + IN + \'"><option value="kuantitatif">Kuantitatif</option><option value="kualitatif">Kualitatif</option><option value="campuran">Campuran (Mixed Methods)</option><option value="rnd">R&D / Pengembangan</option><option value="kasus">Studi Kasus</option><option value="eksperimen">Eksperimen</option></select>')
    + field("Variabel X / Fokus (opsional)", '<input id="tjX" class="\' + IN + \'" placeholder="cth: Kualitas Layanan">')
    + field("Variabel Y / Hasil (opsional)", '<input id="tjY" class="\' + IN + \'" placeholder="cth: Kepuasan Pengguna">')
    + "</div>"
    + field("Abstrak Skripsimu", '<textarea id="tjAbstrak" rows="6" class="\' + IN + \'" placeholder="Tempel abstrak lengkap (latar, tujuan, metode, hasil, kesimpulan)"></textarea>')
    + '<button class="\' + BTN + \'" onclick="tjBuat()">🎯 Susun Prediksi Pertanyaan</button>'
    + outBox("tjOut") + "</div>";
};
function tjBuat() {
  const g = (id) => (($("#" + id) || {}).value || "").trim();
  const judul = g("tjJudul"), metode = g("tjMetode"), abs = g("tjAbstrak"), X = g("tjX"), Y = g("tjY");
  const out = $("#tjOut");
  if (abs.length < 80) { out.innerHTML = '<div class="\' + OUT + \' text-rose-600 font-semibold">⚠️ Tempel abstrak lengkapmu dulu (minimal ±80 karakter) supaya prediksinya akurat.</div>'; return; }
  const mSampel = /(\d+)\s*(responden|sampel|subjek|partisipan|informan|siswa|mahasiswa)/i.exec(abs);
  const tidakSig = /tidak (berpengaruh )?signifikan|tidak terdapat pengaruh|hipotesis ditolak/i.test(abs);
  const sig = !tidakSig && /signifikan|berpengaruh positif|hipotesis diterima|p\s*<\s*0[.,]05/i.test(abs);
  const Q = [];
  Q.push(["Apa latar belakang dan urgensi penelitian ini?", "Jawab dengan pola: kondisi ideal → fakta masalah di lapangan (dengan data) → kesenjangan → mengapa harus diteliti sekarang. Akhiri dengan satu kalimat masalah utamamu."]);
  Q.push(["Apa kebaruan (novelty) penelitianmu dibanding penelitian sebelumnya?", "Sebutkan 2–3 penelitian terdahulu terdekat, lalu bedakan secara spesifik: objek/lokasi, variabel tambahan, metode, atau konteks waktu. Hindari jawaban 'belum pernah diteliti' tanpa bukti."]);
  Q.push(["Jelaskan rumusan masalahmu dan bagaimana hipotesis/pertanyaan penelitian diturunkan dari teori.", "Tunjukkan alurnya: teori → kerangka berpikir → rumusan masalah → hipotesis. Penguji ingin melihat benang merah, bukan hafalan."]);
  if (metode === "kuantitatif" || metode === "eksperimen" || metode === "campuran") Q.push(["Mengapa memilih pendekatan kuantitatif" + (metode === "eksperimen" ? " dengan desain eksperimen" : "") + "? Uji statistik apa yang kamu pakai dan mengapa itu yang paling tepat?", "Jelaskan desain penelitianmu, sifat data (skala & distribusi), dan alasan pemilihan uji — sebutkan uji asumsi yang sudah kamu penuhi sebelum uji utama."]);
  if (metode === "kualitatif" || metode === "kasus" || metode === "campuran") Q.push(["Mengapa pendekatan kualitatif" + (metode === "kasus" ? " dengan studi kasus" : "") + "? Bagaimana kamu menjamin keabsahan data?", "Jelaskan teknik pengumpulan data (wawancara/observasi/dokumen), cara memilih informan, dan teknik keabsahanmu: triangulasi sumber/teknik, member check, atau audit trail."]);
  if (metode === "rnd") Q.push(["Model pengembangan apa yang kamu gunakan dan apa saja tahapannya? Bagaimana produkmu divalidasi?", "Sebutkan modelnya (ADDIE, Borg & Gall, 4D, dll), tahap yang kamu lalui, siapa validator ahli & praktisinya, skor kelayakan yang diperoleh, dan revisi apa saja yang dilakukan."]);
  if (mSampel) Q.push(["Populasimu siapa, dan mengapa " + mSampel[1] + " " + mSampel[2] + " dianggap cukup mewakili?", "Jelaskan teknik samplingmu dan dasar penentuan jumlah sampel (rumus/kriteria) — hubungkan dengan karakteristik populasi."]);
  else Q.push(["Bagaimana kamu menentukan subjek/sampel penelitian, dan apakah jumlahnya memadai?", "Jelaskan teknik sampling/pemilihan informan beserta alasan kecukupannya (kejenuhan data untuk kualitatif, kecukupan statistik untuk kuantitatif)."]);
  if (metode === "kuantitatif" || metode === "eksperimen" || metode === "campuran") Q.push(["Bagaimana kamu memastikan instrumenmu valid dan reliabel?", "Sebutkan uji validitas (korelasi item-total vs r tabel) dan reliabilitas (Cronbach's Alpha) beserta nilai yang kamu peroleh dan batas minimalnya."]);
  if (X || Y) Q.push(["Definisikan secara operasional variabel " + (X || "bebas") + (Y ? " dan " + Y : "") + " — apa saja indikatornya?", "Jabarkan: definisi konseptual → definisi operasional → dimensi → indikator → nomor item. Hafalkan tabel operasionalisasimu."]);
  if (sig) Q.push(["Hasil penelitianmu berpengaruh signifikan — apa implikasi teoretis dan praktisnya?", "Implikasi teoretis: teori apa yang diperkuat/diperluas. Implikasi praktis: rekomendasi konkret untuk pihak terkait, jangan sekadar 'dapat menjadi referensi'."]);
  else if (tidakSig) Q.push(["Mengapa hasilmu tidak signifikan? Faktor apa yang mungkin memengaruhi?", "Jawab jujur & ilmiah: keterbatasan sampel, varians data, variabel luar yang tidak dikontrol, atau memang teori tidak terbukti di konteksmu — jangan menyalahkan alat. Ini pertanyaan jebakan klasik: sikapmu yang dinilai."]);
  Q.push(["Temuan mana yang paling penting dari penelitianmu? Mengapa?", "Pilih satu temuan paling kuat datanya, kaitkan kembali ke rumusan masalah nomor satu."]);
  Q.push(["Apakah kesimpulanmu benar-benar menjawab rumusan masalah satu per satu?", "Petakan lisan: rumusan 1 → kesimpulan 1, dst. Penguji sering mengecek konsistensi Bab 1 ↔ Bab 5 ini."]);
  Q.push(["Apa keterbatasan penelitianmu, dan apa saranmu untuk peneliti selanjutnya?", "Sebutkan 2–3 keterbatasan nyata (cakupan lokasi, waktu, variabel) dan ubah masing-masing jadi saran yang spesifik."]);
  if (/pengaruh|hubungan|peran/i.test(judul)) Q.push(["Judulmu memakai kata '" + (/pengaruh/i.test(judul) ? "Pengaruh" : /hubungan/i.test(judul) ? "Hubungan" : "Peran") + "' — apakah desain penelitianmu memang memungkinkan klaim seperti itu?", "Jelaskan arah hubungan antarvariabel dalam desainmu dan batas klaimnya (asosiatif vs kausal). Untuk korelasional, tegaskan kamu tidak mengklaim sebab-akibat mutlak."]);
  Q.push(["Kalau kamu mengulang penelitian ini dari nol, apa yang akan kamu ubah?", "Tunjukkan refleksi metodologis: satu hal teknis (sampel/instrumen) dan satu hal konseptual (variabel/teori). Jawaban ini menilai kedewasaan ilmiahmu."]);
  Q.push(["Coba jelaskan inti teorimu dalam satu menit.", "Siapkan versi lift-pitch: nama teori, tokoh, bunyi pokoknya, dan mengapa teori itu pas untuk variabelmu."]);
  window._tjTeks = Q.map((q, i) => (i + 1) + ". " + q[0] + "\n   Kerangka jawab: " + q[1]).join("\n\n");
  window._tjJumlah = Q.length;
  out.innerHTML = '<div class="\' + OUT + \'"><p class="font-extrabold mb-1">🎯 ' + Q.length + ' Pertanyaan Paling Mungkin Ditanya Penguji</p>'
    + '<p class="text-[13px] text-slate-500 mb-3">' + (mSampel ? "Sampel terdeteksi: " + mSampel[1] + " " + mSampel[2] + ". " : "") + (sig ? "Hasilmu terbaca signifikan." : tidakSig ? "Hasilmu terbaca TIDAK signifikan — pertanyaan jebakannya sudah kusiapkan." : "Signifikansi hasil tidak terdeteksi dari abstrak.") + '</p>'
    + Q.map((q, i) => '<div class="py-2.5 border-t border-slate-200 dark:border-slate-700"><p class="font-bold text-[14.5px]">' + (i + 1) + ". " + esc(q[0]) + '</p><p class="text-[13px] text-slate-500 dark:text-slate-400 mt-0.5">💡 ' + esc(q[1]) + "</p></div>").join("")
    + '<div class="flex flex-wrap gap-2 mt-3"><button class="\' + BTN2 + \'" onclick="copyText(window._tjTeks || \'\')">📋 Copy Semua (untuk latihan)</button></div></div>';
}
SHARE_GETTERS.tanyajawab = function () { return "Saya sedang latihan sidang dengan " + (window._tjJumlah || 0) + " prediksi pertanyaan penguji dari abstrak saya sendiri — disusun oleh MahasiswaTools."; };

/* ---------- 95. PENGECEK SITASI IN-TEXT VS DAFTAR PUSTAKA ---------- */
UI.ceksitasi = function (el) {
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">Dua kesalahan sitasi yang paling sering kena coret penguji: <b>mengutip di teks tapi lupa memasukkan ke daftar pustaka</b>, dan <b>daftar pustaka berisi sumber yang tidak pernah dikutip</b>. Tempel keduanya, tool mencocokkan nama penulis + tahun secara dua arah.</p>'
    + field("Isi Naskah (Bab 1–5, berisi sitasi seperti (Pranata, 2024) atau Sari (2023))", '<textarea id="csTeks" rows="7" class="\' + IN + \'"></textarea>')
    + field("Daftar Pustaka (format APA: Nama, I. (Tahun). Judul...)", '<textarea id="csRefs" rows="7" class="\' + IN + \'"></textarea>')
    + '<button class="\' + BTN + \'" onclick="csCek()">🔍 Cocokkan Dua Arah</button>'
    + outBox("csOut") + "</div>";
};
function csKunci(nama, tahun) { return (nama || "").toLowerCase().replace(/[^a-zà-ÿ]/gi, "") + "|" + tahun; }
function csCek() {
  const teks = $("#csTeks").value || "", refs = $("#csRefs").value || "";
  const out = $("#csOut");
  if (!teks.trim() || !refs.trim()) { out.innerHTML = '<div class="\' + OUT + \' text-rose-600 font-semibold">⚠️ Isi dulu naskah dan daftar pustakanya.</div>'; return; }
  const cited = new Map();
  let m;
  const reParen = /\(([^()]*?\d{4}[a-z]?)\)/g;
  while ((m = reParen.exec(teks))) {
    m[1].split(";").forEach((part) => {
      const y = /(\d{4})[a-z]?/.exec(part); if (!y) return;
      const nm = /^[^,(]+/.exec(part.trim()); if (!nm) return;
      const surname = nm[0].trim().split(/\s+/).filter((w) => !/^(et|al|&|dan|dkk)$/i.test(w)).pop() || nm[0].trim();
      if (surname.length > 1 && /[A-Za-zÀ-ÿ]/.test(surname) && !/^\d+$/.test(surname)) cited.set(csKunci(surname, y[1]), surname + " (" + y[1] + ")");
    });
  }
  const reNarr = /([A-ZÀ-Þ][A-Za-zÀ-ÿ'’-]+)(?:\s+(?:et al\.|&|dan)\s*[^()]{0,30})?\s*\((\d{4})[a-z]?\)/g;
  while ((m = reNarr.exec(teks))) cited.set(csKunci(m[1], m[2]), m[1] + " (" + m[2] + ")");
  const refMap = new Map();
  refs.split(/\n+/).map((s) => s.trim()).filter(Boolean).forEach((ln) => {
    const mm = /^([A-ZÀ-Þ][A-Za-zÀ-ÿ'’-]+)\s*,[^()]*\((\d{4})[a-z]?\)/.exec(ln) || /^([A-ZÀ-Þ][A-Za-zÀ-ÿ'’-]+)[^()]*\((\d{4})[a-z]?\)/.exec(ln);
    if (mm) refMap.set(csKunci(mm[1], mm[2]), ln.slice(0, 72));
  });
  if (!cited.size && !refMap.size) { out.innerHTML = '<div class="\' + OUT + \' text-rose-600 font-semibold">⚠️ Tidak ada sitasi terbaca. Pastikan formatnya (Nama, Tahun) di teks dan Nama, I. (Tahun) di daftar pustaka.</div>'; return; }
  const hilang = [...cited.entries()].filter(([k]) => !refMap.has(k));
  const yatim = [...refMap.entries()].filter(([k]) => !cited.has(k));
  const cocok = cited.size - hilang.length;
  window._csHasil = { cocok, hilang: hilang.length, yatim: yatim.length };
  const daftar = (arr, ambil) => arr.length ? '<ul class="list-disc ml-5 text-[13.5px] space-y-0.5">' + arr.map((e) => "<li>" + esc(ambil(e)) + "</li>").join("") + "</ul>" : '<p class="text-[13.5px] text-emerald-600 font-semibold">Tidak ada ✅</p>';
  out.innerHTML = '<div class="\' + OUT + \'"><p class="font-extrabold mb-2">🔍 Hasil Pengecekan: ' + cocok + ' sitasi cocok • ' + cited.size + ' dikutip di teks • ' + refMap.size + ' entri di daftar pustaka</p>'
    + '<p class="font-bold mt-2">❌ Dikutip di teks tapi TIDAK ada di daftar pustaka (' + hilang.length + ')</p>' + daftar(hilang, (e) => e[1])
    + '<p class="font-bold mt-3">❌ Ada di daftar pustaka tapi TIDAK pernah dikutip (' + yatim.length + ')</p>' + daftar(yatim, (e) => e[1])
    + '<p class="text-[12.5px] text-slate-500 mt-3">Catatan: pengecekan memakai nama keluarga penulis pertama + tahun. Sitasi "et al." dicocokkan ke penulis pertamanya; tahun dengan huruf (2024a/2024b) dianggap tahun yang sama — periksa manual bila kamu punya dua sumber dari penulis & tahun yang sama.</p></div>';
}
SHARE_GETTERS.ceksitasi = function () { const h = window._csHasil; return h ? "Kecocokan sitasi naskah saya: " + h.cocok + " cocok, " + h.hilang + " belum masuk daftar pustaka, " + h.yatim + " tidak terpakai — dicek dengan MahasiswaTools." : ""; };

/* ---------- 99. KALKULATOR SISA MASA STUDI & RISIKO DO ---------- */
UI.masastudi = function (el) {
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">Jangan sampai kaget di semester akhir: hitung <b>sisa SKS, sisa semester, dan tempo minimal per semester</b> supaya kamu lulus sebelum batas masa studi — lengkap dengan tingkat risiko DO dan skenario beban SKS.</p>'
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Total SKS Syarat Lulus", '<input id="msTotal" type="number" class="\' + IN + \'" value="144">')
    + field("SKS Sudah Lulus/Ditempuh", '<input id="msTempuh" type="number" class="\' + IN + \'">')
    + field("Semester Berjalan Sekarang", '<input id="msSem" type="number" class="\' + IN + \'" placeholder="cth: 7">')
    + field("Batas Maksimal Semester (aturan kampus)", '<input id="msMaks" type="number" class="\' + IN + \'" value="14">')
    + field("Rencana Ambil SKS per Semester", '<input id="msRencana" type="number" class="\' + IN + \'" value="20">')
    + "</div>"
    + '<button class="\' + BTN + \'" onclick="msHitung()">⏳ Hitung Sisa Masa Studi</button>'
    + outBox("msOut") + "</div>";
};
function msHitung() {
  const v = (id, d) => Number(($("#" + id) || {}).value) || d;
  const total = v("msTotal", 144), tempuh = v("msTempuh", 0), sem = v("msSem", 1), maks = v("msMaks", 14), rencana = Math.min(24, Math.max(1, v("msRencana", 20)));
  const out = $("#msOut");
  if (tempuh >= total) { out.innerHTML = '<div class="\' + OUT + \' font-semibold text-emerald-600">🎉 SKS kamu sudah memenuhi syarat lulus (' + tempuh + '/' + total + '). Fokus ke skripsi & yudisium!</div>'; return; }
  const sisa = total - tempuh, sisaSem = Math.max(1, maks - sem + 1), tempo = sisa / sisaSem;
  const status = tempo <= 18 ? ["AMAN ✅", "text-emerald-600", "Tempo di bawah 18 SKS/semester — longgar. Jaga IPK, jangan sampai ada mata kuliah mengulang."] : tempo <= 21 ? ["WASPADA 🟡", "text-amber-600", "Tempo 19–21 SKS/semester — masih wajar, tapi tidak ada ruang untuk gagal. Prioritaskan lulus semua mata kuliah yang diambil."] : tempo <= 24 ? ["KRITIS 🟠", "text-orange-600", "Tempo 22–24 SKS/semester — beban maksimal terus-menerus. Ambil semester pendek/antara bila tersedia dan konsultasikan ke dosen PA sekarang."] : ["RISIKO DO 🔴", "text-rose-600", "Tempo di atas 24 SKS/semester — TIDAK MUNGKIN dikejar dalam batas masa studi. Segera urus perpanjangan masa studi / konsultasi ke program studi sebelum terlambat."];
  const skenario = [24, 21, 20, 18].map((cap) => { const butuh = Math.ceil(sisa / cap), lulus = sem + butuh - 1; return "<tr class=\"border-t border-slate-200 dark:border-slate-700\"><td class=\"py-1 pr-3\">" + cap + " SKS/semester</td><td class=\"py-1 pr-3\">" + butuh + " semester lagi</td><td class=\"py-1 pr-3\">Semester " + lulus + "</td><td class=\"py-1\">" + (lulus <= maks ? '<span class="text-emerald-600 font-bold">Muat ✅</span>' : '<span class="text-rose-600 font-bold">Lewat batas ❌</span>') + "</td></tr>"; }).join("");
  const butuhR = Math.ceil(sisa / rencana), lulusR = sem + butuhR - 1;
  window._msHasil = { sisa, sisaSem, tempo, status: status[0] };
  out.innerHTML = '<div class="\' + OUT + \'"><p class="font-extrabold mb-1">⏳ Sisa Masa Studimu</p>'
    + '<div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 my-2"><div class="bg-indigo-600 h-3 rounded-full" style="width:' + Math.min(100, Math.round(tempuh / total * 100)) + '%"></div></div>'
    + '<p class="text-[14px]">Progress SKS: <b>' + tempuh + '/' + total + ' (' + fmtN(tempuh / total * 100, 0) + '%)</b> • Sisa <b>' + sisa + ' SKS</b> dalam <b>' + sisaSem + ' semester</b> (semester ' + sem + ' s.d. ' + maks + ') • Tempo minimal <b>' + fmtN(tempo, 1) + ' SKS/semester</b></p>'
    + '<p class="font-extrabold text-[16px] mt-2 ' + status[1] + '">Status: ' + status[0] + '</p><p class="text-[13.5px]">' + status[2] + '</p>'
    + '<p class="text-[14px] mt-2">Dengan rencanamu (' + rencana + ' SKS/semester): butuh <b>' + butuhR + ' semester lagi</b> → lulus semester <b>' + lulusR + '</b> ' + (lulusR <= maks ? '<span class="text-emerald-600 font-bold">(masih dalam batas ✅)</span>' : '<span class="text-rose-600 font-bold">(LEWAT batas maksimal ❌ — tambah beban atau ambil semester pendek)</span>') + '</p>'
    + '<table class="w-full text-[13px] mt-3"><tr class="text-left text-slate-500"><th class="py-1 pr-3">Skenario Beban</th><th class="py-1 pr-3">Butuh</th><th class="py-1 pr-3">Lulus</th><th class="py-1">Keterangan</th></tr>' + skenario + "</table>"
    + '<p class="text-[12.5px] text-slate-500 mt-2">Batas maksimal semester berbeda tiap kampus & jenjang (umumnya S1 = 14 semester). Sesuaikan dengan buku pedoman akademik kampusmu.</p></div>';
}
SHARE_GETTERS.masastudi = function () { const h = window._msHasil; return h ? "Sisa masa studi saya: " + h.sisa + " SKS dalam " + h.sisaSem + " semester (tempo " + fmtN(h.tempo, 1) + " SKS/semester) — status " + h.status + ". Dihitung dengan MahasiswaTools." : ""; };

/* ---------- 100. KALKULATOR IPK TRANSKRIP & CEK CUM LAUDE ---------- */
UI.transkrip = function (el) {
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">Tempel nilai mata kuliahmu dari transkrip/KHS — tool menghitung <b>IPK, IPS per semester, predikat kelulusan</b>, dan mengecek apakah kamu memenuhi syarat <b>cum laude</b>. Format per baris: <code class="text-[12px]">Nama MK; SKS; Nilai (A/AB/B/BC/C/D/E atau angka 0–4); Semester (opsional)</code></p>'
    + field("Daftar Mata Kuliah", '<textarea id="trIn" rows="8" class="\' + IN + \' !text-[13px]" placeholder="Pengantar Ekonomi; 3; A; 1&#10;Statistika; 3; AB; 1&#10;Bahasa Inggris; 2; B; 2"></textarea>')
    + '<div class="grid sm:grid-cols-2 gap-x-4">'
    + field("Jumlah Semester Ditempuh", '<input id="trSemTotal" type="number" class="\' + IN + \'" value="8">')
    + field("Pernah Mengulang Mata Kuliah?", '<select id="trUlang" class="\' + IN + \'"><option value="0">Tidak pernah</option><option value="1">Pernah</option></select>')
    + "</div>"
    + '<button class="\' + BTN + \'" onclick="trHitung()">🎓 Hitung IPK & Cek Predikat</button>'
    + outBox("trOut") + "</div>";
};
const TR_BOBOT = { A: 4, "A-": 3.7, AB: 3.5, "B+": 3.3, B: 3, "B-": 2.7, BC: 2.5, "C+": 2.3, C: 2, D: 1, E: 0 };
function trHitung() {
  const lines = ($("#trIn").value || "").split(/\n/).map((s) => s.trim()).filter(Boolean);
  const out = $("#trOut");
  const rows = []; let totSks = 0, totPoin = 0, adaDE = false; const perSem = {};
  lines.forEach((ln) => {
    const p = ln.split(";").map((s) => s.trim());
    if (p.length < 3) return;
    const sks = parseFloat((p[1] || "").replace(",", ".")) || 0;
    const nv = (p[2] || "").toUpperCase();
    const bobot = TR_BOBOT[nv] !== undefined ? TR_BOBOT[nv] : parseFloat(nv.replace(",", "."));
    if (!sks || !isFinite(bobot)) return;
    const poin = sks * bobot;
    totSks += sks; totPoin += poin;
    if (bobot <= 1) adaDE = true;
    const sm = p[3] ? Number(p[3]) : 0;
    if (sm) { perSem[sm] = perSem[sm] || { sks: 0, poin: 0 }; perSem[sm].sks += sks; perSem[sm].poin += poin; }
    rows.push({ mk: p[0], sks, nilai: p[2], bobot, poin });
  });
  if (!rows.length) { out.innerHTML = '<div class="\' + OUT + \' text-rose-600 font-semibold">⚠️ Tidak ada baris terbaca. Pastikan formatnya: Nama MK; SKS; Nilai; Semester.</div>'; return; }
  const ipk = totPoin / totSks;
  const predikat = ipk >= 3.51 ? "Dengan Pujian (Cum Laude)*" : ipk >= 3.01 ? "Sangat Memuaskan" : ipk >= 2.76 ? "Memuaskan" : "Cukup";
  const semTotal = Number($("#trSemTotal").value) || 8, ulang = $("#trUlang").value === "1";
  const cek = [
    ["IPK ≥ 3,51", ipk >= 3.51],
    ["Masa studi ≤ 8 semester (tepat waktu)", semTotal <= 8],
    ["Tidak ada nilai D/E", !adaDE],
    ["Tidak pernah mengulang mata kuliah", !ulang]
  ];
  const lulusCumlaude = cek.every((c) => c[1]) && ipk >= 3.51;
  window._trHasil = { ipk, totSks, predikat, lulusCumlaude };
  const tabelSem = Object.keys(perSem).length ? '<p class="font-bold mt-3">IPS per Semester</p><div class="flex flex-wrap gap-2 mt-1">' + Object.keys(perSem).sort((a, b) => a - b).map((s) => '<span class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[13px] font-semibold">Sem ' + s + ": " + fmtN(perSem[s].poin / perSem[s].sks, 2) + "</span>").join("") + "</div>" : "";
  out.innerHTML = '<div class="\' + OUT + \'"><p class="font-extrabold mb-1">🎓 Hasil Transkrip</p>'
    + '<p class="text-[15px]">Total <b>' + fmtN(totSks, 0) + ' SKS</b> • Total poin <b>' + fmtN(totPoin, 1) + '</b> • IPK <b class="text-xl text-indigo-600 dark:text-indigo-400">' + fmtN(ipk, 2) + '</b> • Predikat: <b>' + predikat + '</b></p>'
    + tabelSem
    + '<p class="font-bold mt-3">🏅 Cek Syarat Cum Laude</p><ul class="text-[13.5px] space-y-0.5">' + cek.map((c) => "<li>" + (c[1] ? "✅" : "❌") + " " + c[0] + "</li>").join("") + '</ul>'
    + '<p class="font-extrabold mt-1 ' + (lulusCumlaude ? "text-emerald-600" : "text-amber-600") + '">' + (lulusCumlaude ? "🎉 Kamu MEMENUHI syarat umum cum laude!" : "Kamu belum memenuhi semua syarat umum cum laude.") + '</p>'
    + '<p class="text-[12.5px] text-slate-500">*Syarat cum laude berbeda antar kampus (ada yang mensyaratkan IPK ≥ 3,50, tanpa nilai C, atau publikasi) — jadikan ini perkiraan dan cek pedoman akademik kampusmu.</p>'
    + '<details class="mt-2"><summary class="font-bold cursor-pointer text-[13.5px]">Rincian per mata kuliah (' + rows.length + ')</summary><table class="w-full text-[12.5px] mt-2"><tr class="text-left text-slate-500"><th class="py-1 pr-3">Mata Kuliah</th><th class="py-1 pr-3">SKS</th><th class="py-1 pr-3">Nilai</th><th class="py-1 pr-3">Bobot</th><th class="py-1">Poin</th></tr>' + rows.map((r) => "<tr class=\"border-t border-slate-200 dark:border-slate-700\"><td class=\"py-1 pr-3\">" + esc(r.mk) + "</td><td class=\"py-1 pr-3\">" + r.sks + "</td><td class=\"py-1 pr-3\">" + esc(r.nilai) + "</td><td class=\"py-1 pr-3\">" + fmtN(r.bobot, 1) + "</td><td class=\"py-1\">" + fmtN(r.poin, 1) + "</td></tr>").join("") + "</table></details></div>";
}
SHARE_GETTERS.transkrip = function () { const h = window._trHasil; return h ? "IPK transkrip saya " + fmtN(h.ipk, 2) + " dari " + fmtN(h.totSks, 0) + " SKS — predikat " + h.predikat + (h.lulusCumlaude ? " dan memenuhi syarat cum laude!" : ".") + " Dihitung dengan MahasiswaTools." : ""; };

/* ---------- 101. Pembersih Excel Google Form ---------- */
UI.gformclean = function (b) {
  window._gf = null;
  b.innerHTML = head("🧹", "Bersihkan Hasil Google Form Jadi Siap Olah", "Upload file unduhan Google Form (.xlsx/.csv): kolom Timestamp/Email dibuang, header pertanyaan panjang jadi kode rapi (X1_1, X1_2, …), jawaban teks Likert jadi skor 1–5, dan skor total tiap variabel dihitung. Kamus pertanyaan asli tersimpan di Sheet 2.")
    + field("1️⃣ Upload File Google Form", '<input type="file" id="gfFile" accept=".xlsx,.xls,.csv" class="' + IN + '">')
    + '<div id="gfOpt" class="hidden">'
    + field("2️⃣ Pengaturan", '<label class="flex items-center gap-2 text-sm mb-2"><input type="checkbox" id="gfDrop" checked class="w-4 h-4 accent-indigo-600"> Buang kolom Timestamp & Email</label>'
      + '<div class="flex flex-wrap items-center gap-2 text-sm"><span>Pengelompokan item:</span><select id="gfMode" class="' + IN + ' !w-auto"><option value="satu">Semua item = 1 variabel (X1)</option><option value="per">Bagi per jumlah item</option></select><input type="number" id="gfPer" value="5" min="1" max="50" class="' + IN + ' !w-20"> <span>item per variabel</span></div>', "Kolom jawaban yang isinya teks Likert (Sangat Setuju…Sangat Tidak Setuju) atau angka 1–5 otomatis dianggap item.")
    + '<div id="gfItems"></div>'
    + '<button class="' + BTN + ' w-full" onclick="gfProcess()">✨ Bersihkan & Unduh .xlsx Siap Olah</button>'
    + '<div id="gfPrev" class="mt-4"></div></div>';
  document.getElementById("gfFile").addEventListener("change", async (e) => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const { rows } = await mtReadExcelFile(f);
      if (rows.length < 2) { toast("File terbaca tapi baris datanya kurang dari 2."); return; }
      window._gf = { rows, name: f.name };
      document.getElementById("gfOpt").classList.remove("hidden");
      gfRenderItems();
      toast("File terbaca: " + (rows.length - 1) + " responden, " + rows[0].length + " kolom.");
    } catch (err) { toast("Gagal membaca file: " + err.message); }
  });
};
function gfLikertScore(v) {
  const t = String(v == null ? "" : v).trim().toLowerCase();
  const map = { "sangat setuju": 5, "sangatsetuju": 5, "strongly agree": 5, "setuju": 4, "agree": 4, "netral": 3, "ragu-ragu": 3, "ragu ragu": 3, "neutral": 3, "kurang setuju": 2, "tidak setuju": 2, "disagree": 2, "sangat tidak setuju": 1, "strongly disagree": 1, "ss": 5, "s": 4, "n": 3, "ts": 2, "sts": 1 };
  if (map[t] !== undefined) return map[t];
  const n = parseFloat(t.replace(",", "."));
  if (!isNaN(n) && n >= 1 && n <= 5) return n;
  return null;
}
function gfIsLikertCol(rows, ci) {
  let scored = 0, total = 0;
  for (let r = 1; r < rows.length; r++) { const v = rows[r][ci]; if (v === "" || v == null) continue; total++; if (gfLikertScore(v) !== null) scored++; }
  return total > 0 && scored / total >= 0.8;
}
function gfRenderItems() {
  const { rows } = window._gf; const head = rows[0];
  const items = [];
  head.forEach((h, ci) => { if (gfIsLikertCol(rows, ci)) items.push(ci); });
  window._gf.items = items;
  document.getElementById("gfItems").innerHTML = items.length
    ? field("3️⃣ Item Terbalik (Unfavorable) — centang yang skornya harus dibalik", items.map((ci) => '<label class="flex items-start gap-2 text-[13px] mb-1.5"><input type="checkbox" class="gf-unfav mt-0.5 w-4 h-4 accent-rose-600" value="' + ci + '"><span><b>' + esc(String(head[ci]).slice(0, 60)) + '</b></span></label>').join(""), "Item unfavorable biasanya berbunyi negatif, mis. “Saya kesulitan…”. Skor dibalik: 5↔1, 4↔2, 3 tetap.")
    : '<p class="text-sm text-amber-600 dark:text-amber-400 mb-3">⚠️ Tidak ada kolom Likert terdeteksi — semua kolom akan dipertahankan apa adanya dengan kode Kol_1, Kol_2, …</p>';
}
async function gfProcess() {
  const G = window._gf; if (!G) return;
  const { rows, items } = G; const head = rows[0];
  const drop = document.getElementById("gfDrop").checked;
  const mode = document.getElementById("gfMode").value;
  const per = Math.max(1, parseInt(document.getElementById("gfPer").value) || 5);
  const unfav = new Set([...document.querySelectorAll(".gf-unfav:checked")].map((c) => +c.value));
  const isDrop = (ci) => drop && /timestamp|waktu|email|e-mail|alamat email/i.test(String(head[ci]));
  const itemSet = new Set(items);
  const codes = {}, kamus = [];
  let varIdx = 0, itemIdx = 0;
  head.forEach((h, ci) => {
    if (isDrop(ci)) return;
    if (itemSet.has(ci)) {
      if (mode === "satu") { varIdx = 1; itemIdx++; }
      else { varIdx = Math.floor(itemIdx / per) + 1; itemIdx++; }
      const no = mode === "satu" ? itemIdx : (itemIdx - 1) % per + 1;
      codes[ci] = "X" + varIdx + "_" + no;
      kamus.push([codes[ci], String(h), unfav.has(ci) ? "Item Likert — Unfavorable (skor dibalik)" : "Item Likert — Favorable"]);
    } else {
      codes[ci] = "Kol_" + (ci + 1);
      kamus.push([codes[ci], String(h), "Kolom lain (dipertahankan)"]);
    }
  });
  const keepCols = head.map((_, ci) => ci).filter((ci) => !isDrop(ci));
  const varOf = {};
  items.forEach((ci) => { if (codes[ci]) varOf[ci] = codes[ci].split("_")[0]; });
  const varList = [...new Set(Object.values(varOf))];
  const outHead = keepCols.map((ci) => codes[ci]);
  varList.forEach((v) => outHead.push("Total_" + v));
  const out = [outHead];
  for (let r = 1; r < rows.length; r++) {
    const row = []; const totals = {};
    keepCols.forEach((ci) => {
      let v = rows[r][ci];
      if (itemSet.has(ci)) { let sc = gfLikertScore(v); if (sc !== null && unfav.has(ci)) sc = 6 - sc; v = sc === null ? "" : sc; if (sc !== null) totals[varOf[ci]] = (totals[varOf[ci]] || 0) + sc; }
      row.push(v);
    });
    varList.forEach((v) => row.push(totals[v] === undefined ? "" : totals[v]));
    out.push(row);
  }
  await mtExportExcel([{ name: "Data Bersih", rows: out }, { name: "Kamus Variabel", rows: [["Kode", "Pertanyaan / Kolom Asli", "Jenis"], ...kamus] }], "GForm-Bersih_" + G.name.replace(/\.[^.]+$/, ""));
  document.getElementById("gfPrev").innerHTML = '<div class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-sm">✅ <b>Selesai!</b> ' + (out.length - 1) + ' responden • ' + items.length + ' item Likert • ' + varList.length + ' variabel (' + varList.join(", ") + '). File berisi Sheet 1 "Data Bersih" + Sheet 2 "Kamus Variabel" — siap ditempel ke tool statistik MahasiswaTools atau SPSS.</div>';
}

/* ---------- 102. Generator Rumus Excel ---------- */
UI.formulabldr = function (b) {
  b.innerHTML = head("ƒx", "Rumus Excel dari Bahasa Manusia", "Pilih kasusmu, isi parameternya — rumusnya jadi seketika, lengkap dengan penjelasan dan simulasi uji. Tinggal salin ke Excel.")
    + field("Skenario", '<select id="fxCase" class="' + IN + '" onchange="fxRender()"><option value="nilai">🎓 Nilai Angka → Huruf Mutu (A/AB/B/BC/C/D/E)</option><option value="lookup">🔎 Pencarian Data Antar-Tabel (VLOOKUP/XLOOKUP/INDEX-MATCH)</option><option value="ifs">🧮 Rekap Bersyarat (COUNTIFS & AVERAGEIFS)</option><option value="kategori">📊 Kategorisasi Skor (Tinggi/Sedang/Rendah dari Mean & SD)</option></select>')
    + '<div id="fxForm"></div><div id="fxOut" class="mt-4"></div>';
  fxRender();
};
function fxSep() { const el = document.getElementById("fxSep"); return el ? el.value : ";"; }
function fxRender() {
  const c = document.getElementById("fxCase").value;
  const sepRow = '<div class="flex items-center gap-2 mb-3 text-sm"><span class="font-semibold">Pemisah rumus:</span><select id="fxSep" class="' + IN + ' !w-auto" onchange="fxBuild()"><option value=";">Titik koma ( ; ) — Excel Indonesia</option><option value=",">Koma ( , ) — Excel Inggris</option></select></div>';
  let form = "";
  if (c === "nilai") form = '<div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">' + [["A", 85], ["AB", 78], ["B", 70], ["BC", 62], ["C", 55], ["D", 40]].map((g) => '<label class="text-xs font-semibold">' + g[0] + ' minimal<input type="number" id="fxT_' + g[0] + '" value="' + g[1] + '" class="' + IN + ' mt-1" oninput="fxBuild()"></label>').join("") + '<label class="text-xs font-semibold">Sel nilai<input type="text" id="fxCell" value="B2" class="' + IN + ' mt-1" oninput="fxBuild()"></label></div>';
  if (c === "lookup") form = '<div class="grid grid-cols-2 gap-2 mb-3"><label class="text-xs font-semibold">Sel kunci (NIM)<input id="fxKey" value="A2" class="' + IN + ' mt-1" oninput="fxBuild()"></label><label class="text-xs font-semibold">Rentang tabel sumber<input id="fxTbl" value="Data!$A$2:$D$101" class="' + IN + ' mt-1" oninput="fxBuild()"></label><label class="text-xs font-semibold">Ambil kolom ke-<input type="number" id="fxCol" value="2" min="1" class="' + IN + ' mt-1" oninput="fxBuild()"></label><label class="text-xs font-semibold">Fungsi<select id="fxFn" class="' + IN + ' mt-1" onchange="fxBuild()"><option value="vlookup">VLOOKUP (semua versi)</option><option value="xlookup">XLOOKUP (Excel 365)</option><option value="index">INDEX + MATCH (paling fleksibel)</option></select></label></div>';
  if (c === "ifs") form = '<div class="grid grid-cols-2 gap-2 mb-3"><label class="text-xs font-semibold">Kolom kriteria 1 (mis. Status)<input id="fxR1" value="$C$2:$C$101" class="' + IN + ' mt-1" oninput="fxBuild()"></label><label class="text-xs font-semibold">Nilai kriteria 1<input id="fxC1" value="&quot;Lulus&quot;" class="' + IN + ' mt-1" oninput="fxBuild()"></label><label class="text-xs font-semibold">Kolom kriteria 2 (opsional)<input id="fxR2" value="$D$2:$D$101" class="' + IN + ' mt-1" oninput="fxBuild()"></label><label class="text-xs font-semibold">Nilai kriteria 2 (opsional)<input id="fxC2" value="&quot;P&quot;" class="' + IN + ' mt-1" oninput="fxBuild()"></label><label class="text-xs font-semibold">Kolom nilai (untuk AVERAGEIFS)<input id="fxRV" value="$B$2:$B$101" class="' + IN + ' mt-1" oninput="fxBuild()"></label></div>';
  if (c === "kategori") form = '<div class="grid grid-cols-3 gap-2 mb-3"><label class="text-xs font-semibold">Sel skor<input id="fxKCell" value="B2" class="' + IN + ' mt-1" oninput="fxBuild()"></label><label class="text-xs font-semibold">Rentang semua skor<input id="fxKRange" value="$B$2:$B$101" class="' + IN + ' mt-1" oninput="fxBuild()"></label><label class="text-xs font-semibold">Pengali SD<input type="number" id="fxKSD" value="1" step="0.1" min="0.1" class="' + IN + ' mt-1" oninput="fxBuild()"></label></div>';
  document.getElementById("fxForm").innerHTML = sepRow + form;
  fxBuild();
}
function fxOutBox(formula, explain, simHTML) {
  document.getElementById("fxOut").innerHTML = '<div class="p-4 rounded-xl bg-slate-900 text-slate-100 mb-3"><div class="text-[11px] font-bold tracking-wider text-indigo-300 mb-1.5">RUMUS JADI — SALIN KE EXCEL</div><code class="text-[13px] break-all whitespace-pre-wrap">' + esc(formula) + '</code><button class="' + BTN2 + ' mt-3 !bg-white/10 !text-white !border-white/20" onclick="copyText(' + JSON.stringify(formula) + '); toast(\'Rumus tersalin 📋\')">📋 Salin Rumus</button></div>'
    + '<p class="text-sm text-slate-600 dark:text-slate-300 mb-3">' + explain + '</p>'
    + (simHTML ? '<div class="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800"><div class="text-xs font-bold tracking-wider text-indigo-500 mb-2">🧪 SIMULASI UJI LANGSUNG</div>' + simHTML + '</div>' : "");
}
function fxBuild() {
  const c = document.getElementById("fxCase").value, S = fxSep();
  const v = (id, d) => { const el = document.getElementById(id); return el ? el.value : d; };
  if (c === "nilai") {
    const cell = v("fxCell", "B2") || "B2";
    const grades = ["A", "AB", "B", "BC", "C", "D"].map((g) => [g, parseFloat(v("fxT_" + g, 0)) || 0]);
    const ifs = "=IFS(" + grades.map((g) => cell + ">=" + g[1] + S + '"'+ g[0] + '"').join(S) + S + 'TRUE' + S + '"E")';
    const nested = grades.reduceRight((acc, g) => "=IF(" + cell + ">=" + g[1] + S + '"' + g[0] + '"' + S + acc + ")", '"E"');
    const sim = '<div class="flex items-center gap-2 text-sm"><span>Coba nilai:</span><input type="number" id="fxSimN" value="82" class="' + IN + ' !w-24" oninput="fxSimNilai()"><span class="font-bold">→ <span id="fxSimR">AB</span></span></div>';
    fxOutBox(ifs + "\n\nAlternatif IF bertingkat (Excel lama):\n" + nested, "IFS berhenti di syarat pertama yang terpenuhi — urutan dari tertinggi. Di bawah batas terendah hasilnya E. Sesuaikan ambangnya dengan pedoman penilaian kampusmu.", sim);
    window._fxGrades = grades; fxSimNilai();
  }
  if (c === "lookup") {
    const key = v("fxKey", "A2"), tbl = v("fxTbl", "Data!$A$2:$D$101"), col = parseInt(v("fxCol", 2)) || 2, fn = v("fxFn", "vlookup");
    let f = "", ex = "";
    const tblSheet = tbl.split("!")[0], tblRange = tbl.includes("!") ? tbl.split("!")[1] : tbl;
    if (fn === "vlookup") { f = "=VLOOKUP(" + key + S + tbl + S + col + S + "FALSE)"; ex = "VLOOKUP mencari kunci di kolom PERTAMA tabel sumber, lalu mengambil nilai dari kolom ke-" + col + ". FALSE = harus sama persis."; }
    if (fn === "xlookup") { f = "=XLOOKUP(" + key + S + tblSheet + "!" + tblRange.split(":")[0].replace(/\d+/g, (m, off) => off === 0 ? m : m) + ":" + tblRange.split(":")[0].replace(/\$\w+\$/, (m) => m) + S + "kolom-hasil)"; f = "=XLOOKUP(" + key + S + "KOLOM_KUNCI" + S + "KOLOM_HASIL" + S + '"Tidak ditemukan")'; ex = "XLOOKUP (Excel 365): ganti KOLOM_KUNCI dengan kolom tempat NIM berada (mis. Data!$A$2:$A$101) dan KOLOM_HASIL dengan kolom yang mau diambil (mis. Data!$B$2:$B$101). Lebih aman dari VLOOKUP karena tidak tergantung nomor kolom."; }
    if (fn === "index") { f = "=INDEX(KOLOM_HASIL" + S + "MATCH(" + key + S + "KOLOM_KUNCI" + S + "0))"; ex = "INDEX+MATCH: MATCH menemukan posisi baris kunci (0 = sama persis), INDEX mengambil nilai di posisi itu dari KOLOM_HASIL. Ganti KOLOM_KUNCI (mis. Data!$A$2:$A$101) dan KOLOM_HASIL (mis. Data!$C$2:$C$101) — kolom hasil boleh di kiri kolom kunci."; }
    fxOutBox(f, ex, '<p class="text-sm">💡 Tempel rumus di sel kosong di samping data utamamu, lalu tarik (drag) ke bawah. Kunci rentang tabel dengan $ agar tidak bergeser saat ditarik.</p>');
  }
  if (c === "ifs") {
    const r1 = v("fxR1", ""), c1 = v("fxC1", ""), r2 = v("fxR2", ""), c2 = v("fxC2", ""), rv = v("fxRV", "");
    const crit = [r1 + S + c1]; if (r2 && c2) crit.push(r2 + S + c2);
    const f = "=COUNTIFS(" + crit.join(S) + ")\n=AVERAGEIFS(" + rv + S + crit.join(S) + ")";
    fxOutBox(f, "COUNTIFS menghitung baris yang memenuhi SEMUA kriteria; AVERAGEIFS merata-ratakan kolom nilai pada baris yang sama. Kriteria teks pakai tanda kutip, mis. \"Lulus\"; kriteria angka bisa langsung atau \">=60\".", '<div class="flex items-center gap-2 text-sm"><span>Contoh data mini: 8 siswa (5 Lulus, 3 Tidak). COUNTIFS Status="Lulus" →</span><b>5</b></div>');
  }
  if (c === "kategori") {
    const cell = v("fxKCell", "B2"), rg = v("fxKRange", "$B$2:$B$101"), k = v("fxKSD", "1");
    const mean = "AVERAGE(" + rg + ")", sd = "STDEV(" + rg + ")";
    const f = "=IF(" + cell + ">=" + mean + "+" + k + "*" + sd + S + '"Tinggi"' + S + "IF(" + cell + ">=" + mean + "-" + k + "*" + sd + S + '"Sedang"' + S + '"Rendah"))';
    const sim = '<div class="flex flex-wrap items-center gap-2 text-sm"><span>Mean</span><input type="number" id="fxSimM" value="70" class="' + IN + ' !w-20" oninput="fxSimKat()"><span>SD</span><input type="number" id="fxSimSD" value="10" class="' + IN + ' !w-20" oninput="fxSimKat()"><span>Skor</span><input type="number" id="fxSimV" value="84" class="' + IN + ' !w-20" oninput="fxSimKat()"><span class="font-bold">→ <span id="fxSimKR">Tinggi</span></span></div>';
    fxOutBox(f, "Kategorisasi empiris: Tinggi bila skor ≥ Mean + " + k + "·SD, Rendah bila &lt; Mean − " + k + "·SD, sisanya Sedang. Mean & SD dihitung langsung dari rentang datamu, jadi kategori ikut berubah bila data berubah.", sim);
    fxSimKat();
  }
}
function fxSimNilai() { const el = document.getElementById("fxSimN"), out = document.getElementById("fxSimR"); if (!el || !out || !window._fxGrades) return; const n = parseFloat(el.value) || 0; let g = "E"; for (const [gr, t] of window._fxGrades) { if (n >= t) { g = gr; break; } } out.textContent = g; }
function fxSimKat() { const m = parseFloat((document.getElementById("fxSimM") || {}).value) || 0, sd = parseFloat((document.getElementById("fxSimSD") || {}).value) || 0, v = parseFloat((document.getElementById("fxSimV") || {}).value) || 0, out = document.getElementById("fxSimKR"); if (!out) return; out.textContent = v >= m + sd ? "Tinggi" : (v >= m - sd ? "Sedang" : "Rendah"); }

/* ---------- 103. Template Excel Rumus Hidup ---------- */
UI.xlstemplate = function (b) {
  b.innerHTML = head("📐", "Template Excel Ber-Rumus Hidup", "File .xlsx yang selnya berisi RUMUS ASLI Excel — begitu dibuka, semua total, r-hitung, saldo, dan nilai akhir langsung terhitung dan ikut berubah saat datamu diganti.")
    + '<div class="grid sm:grid-cols-2 gap-3">'
    + [["tabulasi", "🧪 Tabulasi Kuesioner + r-Hitung", "10 responden × 5 item, total per responden, r-hitung tiap item (CORREL) + cek valid vs r-tabel."], ["kas", "💰 Pembukuan Kas UKM / KKN", "Masuk, keluar, dan saldo berjalan otomatis + total periode."], ["amortisasi", "🏦 Tabel Amortisasi & Anggaran", "Angsuran PMT, bunga, pokok, sisa pinjaman per bulan."], ["rekap", "🎓 Rekap Nilai Kelas Asisten Dosen", "Bobot Tugas/UTS/UAS, nilai akhir, huruf mutu, status lulus + rata-rata kelas."]].map((t) => '<label class="flex gap-2.5 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-400"><input type="radio" name="xtKind" value="' + t[0] + '" class="mt-1 accent-indigo-600" ' + (t[0] === "tabulasi" ? "checked" : "") + '><span><b class="text-sm">' + t[1] + '</b><span class="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">' + t[2] + '</span></span></label>').join("")
    + '</div>'
    + '<div class="grid grid-cols-3 gap-2 mt-4">' + field("Pokok pinjaman (utk amortisasi)", '<input type="number" id="xtPokok" value="12000000" class="' + IN + '">') + field("Bunga % /tahun", '<input type="number" id="xtBunga" value="12" step="0.1" class="' + IN + '">') + field("Tenor (bulan)", '<input type="number" id="xtTenor" value="12" class="' + IN + '">') + '</div>'
    + '<button class="' + BTN + ' w-full mt-2" onclick="xtGenerate()">📗 Buat & Unduh Template .xlsx</button>'
    + '<p class="text-xs text-slate-400 mt-3">Semua rumus memakai pemisah titik koma? Tidak — di dalam file .xlsx, rumus selalu disimpan format internasional; Excel-mu yang menampilkannya sesuai bahasa. Aman dibuka di Excel Indonesia maupun Inggris.</p>';
};
async function xtGenerate() {
  if (!await loadXLSX()) { toast("Library Excel gagal dimuat."); return; }
  const kind = (document.querySelector("input[name=xtKind]:checked") || {}).value || "tabulasi";
  const wb = XLSX.utils.book_new();
  const F = (f) => ({ t: "n", f });
  if (kind === "tabulasi") {
    const rows = [["Responden", "I1", "I2", "I3", "I4", "I5", "TOTAL"]];
    const seed = [[4, 5, 4, 5, 4], [5, 5, 4, 4, 5], [3, 4, 3, 4, 3], [5, 4, 5, 5, 4], [4, 4, 4, 3, 4], [2, 3, 2, 3, 2], [5, 5, 5, 4, 5], [4, 3, 4, 4, 3], [3, 3, 4, 3, 4], [5, 4, 4, 5, 5]];
    seed.forEach((r, i) => rows.push(["R" + (i + 1), ...r, 0]));
    rows.push([]); rows.push(["r-hitung (CORREL vs TOTAL)", "", "", "", "", "", ""]);
    rows.push(["r-tabel 5% (n=10)", 0.632, "", "", "", "", ""]);
    rows.push(["Status", "", "", "", "", "", ""]);
    const ws = XLSX.utils.aoa_to_sheet(rows);
    for (let r = 2; r <= 11; r++) ws["G" + r] = F("SUM(B" + r + ":F" + r + ")");
    ["B", "C", "D", "E", "F"].forEach((col) => { ws[col + "13"] = F("CORREL(" + col + "2:" + col + "11,$G$2:$G$11)"); ws[col + "15"] = { t: "s", f: 'IF(' + col + '13>$B$14,"Valid","Tidak Valid")' }; });
    ws["!cols"] = [{ wch: 26 }, { wch: 8 }, { wch: 8 }, { wch: 8 }, { wch: 8 }, { wch: 8 }, { wch: 10 }];
    XLSX.utils.book_append_sheet(wb, ws, "Tabulasi");
  }
  if (kind === "kas") {
    const rows = [["Tanggal", "Keterangan", "Masuk (Rp)", "Keluar (Rp)", "Saldo (Rp)"], ["2026-01-05", "Iuran anggota", 500000, 0, 0], ["2026-01-07", "Beli ATK", 0, 75000, 0], ["2026-01-10", "Sponsor", 250000, 0, 0], ["2026-01-12", "Konsumsi rapat", 0, 60000, 0], [], ["TOTAL", "", 0, 0, ""]];
    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws["E2"] = F("C2-D2");
    for (let r = 3; r <= 5; r++) ws["E" + r] = F("E" + (r - 1) + "+C" + r + "-D" + r);
    ws["C7"] = F("SUM(C2:C5)"); ws["D7"] = F("SUM(D2:D5)"); ws["E7"] = F("E5");
    ws["!cols"] = [{ wch: 12 }, { wch: 30 }, { wch: 14 }, { wch: 14 }, { wch: 14 }];
    XLSX.utils.book_append_sheet(wb, ws, "Kas");
  }
  if (kind === "amortisasi") {
    const pokok = parseFloat(document.getElementById("xtPokok").value) || 12000000;
    const bunga = (parseFloat(document.getElementById("xtBunga").value) || 12) / 100;
    const tenor = Math.min(60, Math.max(1, parseInt(document.getElementById("xtTenor").value) || 12));
    const rows = [["Pokok Pinjaman", pokok], ["Bunga per Tahun", bunga], ["Tenor (bulan)", tenor], ["Angsuran per Bulan", 0], [], ["Bulan", "Angsuran", "Bunga", "Pokok", "Sisa Pinjaman"]];
    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws["B2"] = { t: "n", v: bunga }; ws["B4"] = F("PMT(B2/12,B3,-B1)");
    for (let m = 1; m <= tenor; m++) {
      const r = 6 + m;
      const sisaPrev = m === 1 ? "$B$1" : "E" + (r - 1);
      ws["A" + r] = { t: "n", v: m };
      ws["B" + r] = F("$B$4");
      ws["C" + r] = F(sisaPrev + "*$B$2/12");
      ws["D" + r] = F("B" + r + "-C" + r);
      ws["E" + r] = F(sisaPrev + "-D" + r);
    }
    ws["!ref"] = "A1:E" + (6 + tenor);
    ws["!cols"] = [{ wch: 18 }, { wch: 16 }, { wch: 14 }, { wch: 14 }, { wch: 16 }];
    XLSX.utils.book_append_sheet(wb, ws, "Amortisasi");
  }
  if (kind === "rekap") {
    const rows = [["Bobot Tugas", 0.3], ["Bobot UTS", 0.3], ["Bobot UAS", 0.4], [], ["Nama", "Tugas", "UTS", "UAS", "Nilai Akhir", "Huruf", "Status"]];
    const names = ["Andi", "Budi", "Citra", "Dewi", "Eko", "Fitri", "Gilang", "Hana"];
    names.forEach((n, i) => rows.push([n, 70 + i * 3, 65 + i * 4, 72 + i * 3, 0, "", ""]));
    rows.push([]); rows.push(["Rata-rata Kelas", "", "", "", 0, "", ""]);
    rows.push(["Jumlah Lulus", "", "", "", "", "", 0]);
    const ws = XLSX.utils.aoa_to_sheet(rows);
    const last = 5 + names.length;
    for (let r = 6; r <= last; r++) {
      ws["E" + r] = F("B" + r + "*$B$1+C" + r + "*$B$2+D" + r + "*$B$3");
      ws["F" + r] = { t: "s", f: 'IF(E' + r + '>=85,"A",IF(E' + r + '>=70,"B",IF(E' + r + '>=55,"C",IF(E' + r + '>=40,"D","E"))))' };
      ws["G" + r] = { t: "s", f: 'IF(E' + r + '>=55,"Lulus","Tidak Lulus")' };
    }
    ws["E" + (last + 2)] = F("AVERAGE(E6:E" + last + ")");
    ws["G" + (last + 3)] = F('COUNTIF(G6:G' + last + ',"Lulus")');
    ws["!cols"] = [{ wch: 18 }, { wch: 9 }, { wch: 9 }, { wch: 9 }, { wch: 12 }, { wch: 8 }, { wch: 14 }];
    XLSX.utils.book_append_sheet(wb, ws, "Rekap Nilai");
  }
  XLSX.writeFile(wb, "MahasiswaTools_Template-" + kind + ".xlsx");
  toast("Template .xlsx ber-rumus hidup terunduh 📗");
}

/* ---------- 104. Ekstraktor Tabel PDF ke Excel ---------- */
UI.pdftab2xls = function (b) {
  window._pt = null;
  b.innerHTML = head("🧾", "Tarik Tabel dari PDF Jadi Excel", "Upload PDF berisi tabel (laporan keuangan, publikasi BPS, jurnal): teks dibaca per koordinat, dikelompokkan jadi baris & kolom, lalu diunduh sebagai .xlsx. Angka format Indonesia — (12.500.000), titik ribuan — dibersihkan jadi angka numerik asli yang bisa di-SUM.")
    + field("File PDF", '<input type="file" id="ptFile" accept=".pdf" class="' + IN + '">')
    + '<div class="grid grid-cols-3 gap-2">' + field("Halaman dari", '<input type="number" id="ptFrom" value="1" min="1" class="' + IN + '">') + field("Sampai", '<input type="number" id="ptTo" value="1" min="1" class="' + IN + '">') + field("Opsi", '<label class="flex items-center gap-2 text-[13px] mt-2"><input type="checkbox" id="ptClean" checked class="w-4 h-4 accent-indigo-600"> Bersihkan angka ID/akuntansi</label>') + '</div>'
    + '<button class="' + BTN + ' w-full" onclick="ptExtract()">🔍 Ekstrak Tabel</button>'
    + '<div id="ptOut" class="mt-4"></div>';
};
function ptCleanNum(v) {
  let t = String(v == null ? "" : v).trim();
  if (!t) return "";
  let neg = false;
  if (/^\(.*\)$/.test(t)) { neg = true; t = t.slice(1, -1); }
  t = t.replace(/rp\.?/i, "").trim();
  if (/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(t)) { const n = parseFloat(t.replace(/\./g, "").replace(",", ".")); return neg ? -n : n; }
  if (/^-?\d+(,\d+)?$/.test(t)) { const n = parseFloat(t.replace(",", ".")); return neg ? -n : n; }
  if (/^-?\d+$/.test(t)) { const n = parseInt(t); return neg ? -n : n; }
  return v;
}
async function ptExtract() {
  const f = document.getElementById("ptFile").files[0];
  const out = document.getElementById("ptOut");
  if (!f) { toast("Pilih file PDF dulu ya."); return; }
  if (!await loadPdfJs()) { toast("Library PDF.js gagal dimuat — periksa koneksi."); return; }
  out.innerHTML = '<p class="text-sm text-slate-500">⏳ Membaca PDF…</p>';
  try {
    const buf = await f.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
    const from = Math.max(1, parseInt(document.getElementById("ptFrom").value) || 1);
    const to = Math.min(pdf.numPages, parseInt(document.getElementById("ptTo").value) || pdf.numPages);
    const clean = document.getElementById("ptClean").checked;
    const allRows = [];
    for (let p = from; p <= to; p++) {
      const page = await pdf.getPage(p);
      const tc = await page.getTextContent();
      const byY = new Map();
      tc.items.forEach((it) => {
        const y = Math.round(it.transform[5] / 4) * 4;
        if (!byY.has(y)) byY.set(y, []);
        byY.get(y).push({ x: it.transform[4], str: it.str });
      });
      const ys = [...byY.keys()].sort((a, b2) => b2 - a);
      ys.forEach((y) => {
        const items = byY.get(y).sort((a, b2) => a.x - b2.x);
        const cells = [];
        items.forEach((it) => {
          if (cells.length && it.x - cells[cells.length - 1].endX < 7) { cells[cells.length - 1].str += " " + it.str; cells[cells.length - 1].endX = it.x + (it.str.length * 4); }
          else cells.push({ str: it.str, endX: it.x + (it.str.length * 4) });
        });
        const row = cells.map((c) => c.str.trim()).filter((x) => x !== "");
        if (row.length) allRows.push(clean ? row.map(ptCleanNum) : row);
      });
    }
    window._pt = { rows: allRows, name: f.name };
    const preview = allRows.slice(0, 25).map((r) => "<tr>" + r.map((c) => '<td class="border border-slate-200 dark:border-slate-700 px-2 py-1">' + esc(String(c)) + "</td>").join("") + "</tr>").join("");
    out.innerHTML = '<p class="text-sm mb-2">✅ Terbaca <b>' + allRows.length + ' baris</b> dari halaman ' + from + '–' + to + ' (total PDF ' + pdf.numPages + ' halaman).</p>'
      + '<div class="overflow-x-auto mb-3"><table class="text-xs border-collapse">' + preview + '</table></div>'
      + '<button class="' + BTN + ' w-full" onclick="ptDownload()">📗 Unduh sebagai .xlsx</button>'
      + '<p class="text-xs text-slate-400 mt-2">Catatan: PDF hasil scan (gambar) tidak berisi teks — gunakan tool OCR bila perlu. Susunan kolom mengikuti posisi teks di PDF; cek pratinjau sebelum mengunduh.</p>';
  } catch (e) { out.innerHTML = '<p class="text-sm text-rose-500">❌ Gagal mengekstrak: ' + esc(e.message) + '</p>'; }
}
async function ptDownload() { if (window._pt) { await mtExportExcel([{ name: "Tabel", rows: window._pt.rows }], "Tabel-dari-PDF_" + window._pt.name.replace(/\.[^.]+$/, "")); toast("File Excel terunduh 📗"); } }

/* ---------- 105. Penggabung Banyak File Excel ---------- */
UI.xlsmerger = function (b) {
  window._xm = [];
  b.innerHTML = head("🗂️", "Gabung Banyak File Excel / CSV", "Untuk data kelompok: survei 5 anggota, rekap per kelas, laporan per cabang — satukan semuanya jadi satu file rapi.")
    + field("Pilih banyak file sekaligus", '<input type="file" id="xmFiles" accept=".xlsx,.xls,.csv" multiple class="' + IN + '">')
    + '<div id="xmList" class="mb-3"></div>'
    + field("Mode Penggabungan", '<label class="flex gap-2 text-sm mb-1.5"><input type="radio" name="xmMode" value="append" checked class="mt-0.5 accent-indigo-600"><span><b>Gabung Baris (Append)</b> — semua baris ditumpuk jadi 1 Sheet Master; kolom disamakan dari header, plus kolom "Sumber File".</span></label><label class="flex gap-2 text-sm"><input type="radio" name="xmMode" value="sheets" class="mt-0.5 accent-indigo-600"><span><b>Gabung Sheet (Multi-Tab)</b> — tiap file jadi tab sheet sendiri dalam 1 workbook.</span></label>')
    + '<button class="' + BTN + ' w-full" onclick="xmMerge()">🗂️ Gabungkan & Unduh .xlsx</button>';
  document.getElementById("xmFiles").addEventListener("change", async (e) => {
    window._xm = [];
    const list = document.getElementById("xmList");
    list.innerHTML = '<p class="text-sm text-slate-500">⏳ Membaca file…</p>';
    for (const f of e.target.files) {
      try { const { rows } = await mtReadExcelFile(f); window._xm.push({ name: f.name, rows }); }
      catch (err) { toast("Gagal membaca " + f.name + ": " + err.message); }
    }
    list.innerHTML = window._xm.map((x) => '<div class="flex justify-between text-sm py-1.5 border-b border-slate-100 dark:border-slate-800"><span>📄 ' + esc(x.name) + '</span><b>' + x.rows.length + ' baris</b></div>').join("") || '<p class="text-sm text-slate-400">Belum ada file terbaca.</p>';
  });
};
async function xmMerge() {
  const files = window._xm;
  if (!files.length) { toast("Pilih file dulu ya."); return; }
  const mode = (document.querySelector("input[name=xmMode]:checked") || {}).value || "append";
  if (mode === "sheets") {
    const used = new Set();
    const sheets = files.map((x) => {
      let nm = x.name.replace(/\.[^.]+$/, "").replace(/[\\/*?:[\]]/g, " ").trim().slice(0, 28) || "Sheet";
      let base = nm, k = 2; while (used.has(nm)) { nm = base.slice(0, 25) + " " + (k++); } used.add(nm);
      return { name: nm, rows: x.rows };
    });
    await mtExportExcel(sheets, "Gabungan-Multi-Sheet");
  } else {
    const headers = [];
    files.forEach((x) => { (x.rows[0] || []).forEach((h) => { const H = String(h); if (!headers.includes(H)) headers.push(H); }); });
    const out = [[...headers, "Sumber File"]];
    files.forEach((x) => {
      const head = (x.rows[0] || []).map(String);
      for (let r = 1; r < x.rows.length; r++) {
        const row = headers.map((H) => { const ci = head.indexOf(H); return ci >= 0 ? x.rows[r][ci] : ""; });
        row.push(x.name); out.push(row);
      }
    });
    await mtExportExcel([{ name: "Master", rows: out }], "Gabungan-Baris");
  }
  toast("File gabungan terunduh 🗂️");
}

/* ---------- 106. Deck PPT Sidang Bab 1-5 ---------- */
UI.decksidang = function (b) {
  const F = (label, inner) => field(label, inner);
  b.innerHTML = head("🎓", "Deck Sidang Skripsi Otomatis (Bab 1–5)", "Isi ringkasan tiap bab — jadi deck .pptx 11 slide siap sidang/sempro: cover berlogo, badge agenda per slide, tabel hasil uji, 5 tema warna akademik, dan catatan pembicara otomatis berisi kalimat pembuka tiap slide.")
    + '<div class="grid sm:grid-cols-2 gap-2">' + F("Judul Skripsi", '<input id="dsJudul" class="' + IN + '" placeholder="Pengaruh … terhadap …">') + F("Nama & NIM", '<input id="dsNama" class="' + IN + '" placeholder="Nama Kamu — 12345678">') + F("Program Studi / Universitas", '<input id="dsProdi" class="' + IN + '" placeholder="S1 Ekonomi — Universitas …">') + F("Dosen Pembimbing", '<input id="dsPemb" class="' + IN + '" placeholder="Dr. …, M.Si.">') + '</div>'
    + F("Logo kampus untuk cover (opsional)", '<input type="file" id="dsLogo" accept="image/*" class="' + IN + '">')
    + F("Tema Warna", '<select id="dsTema" class="' + IN + '"><option value="navy">🔵 Navy Formal</option><option value="emerald">🟢 Emerald Sains</option><option value="maroon">🔴 Maroon Hukum</option><option value="slate">⚪ Slate Modern</option><option value="gold">🟡 Gold Ekonomika</option></select>')
    + F("BAB 1 — Fenomena & Data Masalah", '<textarea id="dsFenomena" rows="3" class="' + IN + '" placeholder="Fakta/data yang menunjukkan adanya masalah…"></textarea>')
    + '<div class="grid sm:grid-cols-2 gap-2">' + F("BAB 1 — Rumusan Masalah", '<textarea id="dsRumusan" rows="2" class="' + IN + '"></textarea>') + F("BAB 1 — Tujuan Penelitian", '<textarea id="dsTujuan" rows="2" class="' + IN + '"></textarea>') + F("BAB 2 — Kerangka Pemikiran", '<textarea id="dsKerangka" rows="2" class="' + IN + '"></textarea>') + F("BAB 2 — Hipotesis", '<textarea id="dsHipotesis" rows="2" class="' + IN + '"></textarea>') + F("BAB 3 — Desain & Metode", '<textarea id="dsMetode" rows="2" class="' + IN + '"></textarea>') + F("BAB 3 — Populasi & Sampel", '<textarea id="dsSampel" rows="2" class="' + IN + '"></textarea>') + '</div>'
    + F("BAB 4 — Hasil Uji (satu baris = satu uji)", '<textarea id="dsHasil" rows="4" class="' + IN + ' font-mono text-[13px]" placeholder="Uji Validitas: Semua item r-hitung > 0,361 — Valid&#10;Uji-t X1: t = 3,42; sig 0,002 — Berpengaruh signifikan"></textarea>', "Format per baris: Nama Uji: hasil — kesimpulan. Akan jadi tabel rapi di slide.")
    + '<div class="grid sm:grid-cols-2 gap-2">' + F("BAB 5 — Kesimpulan", '<textarea id="dsKesimpulan" rows="3" class="' + IN + '"></textarea>') + F("BAB 5 — Saran", '<textarea id="dsSaran" rows="3" class="' + IN + '"></textarea>') + '</div>'
    + '<button class="' + BTN + ' w-full" onclick="dsGenerate()">🎓 Buat Deck .pptx Sidang</button>';
  window._dsLogo = null;
  document.getElementById("dsLogo").addEventListener("change", (e) => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { window._dsLogo = r.result; toast("Logo siap dipasang di cover."); }; r.readAsDataURL(f); });
};
async function dsGenerate() {
  const ok = await loadLib("https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js", "PptxGenJS");
  if (!ok) { toast("Library PPT gagal dimuat — periksa koneksi."); return; }
  const g = (id) => (document.getElementById(id) || {}).value || "";
  const TEMAS = { navy: { p: "1E3A5F", a: "2563EB", dark: "0F2233" }, emerald: { p: "065F46", a: "059669", dark: "052E22" }, maroon: { p: "7F1D1D", a: "B91C1C", dark: "2A0A0A" }, slate: { p: "0B0F19", a: "4F46E5", dark: "0B0F19" }, gold: { p: "92400E", a: "D97706", dark: "291303" } };
  const T = TEMAS[g("dsTema")] || TEMAS.navy;
  const pptx = new PptxGenJS(); pptx.defineLayout({ name: "W", width: 13.33, height: 7.5 }); pptx.layout = "W";
  const lines = (t) => t.split("\n").map((x) => x.trim()).filter(Boolean);
  const bullets = (t) => lines(t).map((x) => ({ text: x.replace(/^[-•]\s*/, ""), options: { bullet: true, breakLine: true } }));
  function slide(title, badge, body, notes) {
    const s = pptx.addSlide();
    s.addShape("rect", { x: 0, y: 0, w: 13.33, h: 1.0, fill: { color: T.p } });
    s.addText(title, { x: 0.6, y: 0.18, w: 9.6, fontSize: 23, bold: true, color: "FFFFFF" });
    if (badge) s.addText(badge, { x: 10.1, y: 0.3, w: 2.7, h: 0.42, fontSize: 11.5, bold: true, color: "FFFFFF", fill: { color: T.a }, align: "center", rectRadius: 0.08 });
    if (body) s.addText(body, { x: 0.6, y: 1.35, w: 12.1, h: 5.6, fontSize: 16, color: "1E293B", valign: "top", lineSpacingMultiple: 1.25 });
    if (notes && s.addNotes) s.addNotes(notes);
    s.addText("MahasiswaTools • Deck Sidang", { x: 0.6, y: 7.08, w: 6, fontSize: 9.5, color: "94A3B8" });
    return s;
  }
  const judul = g("dsJudul") || "(Judul Skripsi)";
  const cov = pptx.addSlide(); cov.background = { color: T.dark };
  if (window._dsLogo) cov.addImage({ data: window._dsLogo, x: 5.9, y: 0.7, w: 1.5, h: 1.5 });
  cov.addText(judul, { x: 1, y: 2.5, w: 11.33, fontSize: 32, bold: true, color: "FFFFFF", align: "center" });
  cov.addText((g("dsNama") || "Nama — NIM") + "\n" + (g("dsProdi") || "") + "\nPembimbing: " + (g("dsPemb") || "—"), { x: 1, y: 4.3, w: 11.33, fontSize: 16, color: "CBD5E1", align: "center", lineSpacingMultiple: 1.4 });
  if (cov.addNotes) cov.addNotes("Assalamu'alaikum warahmatullahi wabarakatuh. Yang terhormat Bapak/Ibu penguji, perkenalkan saya " + (g("dsNama") || "") + ". Hari ini saya akan mempresentasikan hasil penelitian skripsi saya yang berjudul: " + judul + ".");
  slide("Agenda Presentasi", "", bullets("Bab 1 — Pendahuluan\nBab 2 — Tinjauan Pustaka & Hipotesis\nBab 3 — Metode Penelitian\nBab 4 — Hasil & Pembahasan\nBab 5 — Kesimpulan & Saran"), "Saya akan menyampaikan presentasi dalam lima bagian sesuai struktur skripsi, dimulai dari pendahuluan hingga kesimpulan dan saran.");
  slide("Latar Belakang & Fenomena", "BAB 1", bullets(g("dsFenomena")), "Pada latar belakang, saya menyoroti fenomena berikut. Jelaskan data/fakta masalahnya secara singkat dan tegas, lalu arahkan ke celah penelitian (research gap).");
  slide("Rumusan Masalah & Tujuan", "BAB 1", [...bullets(g("dsRumusan")), { text: "Tujuan: " + g("dsTujuan"), options: { bullet: true } }], "Rumusan masalah penelitian ini adalah sebagaimana tampil di slide, dan tujuannya selaras satu-satu dengan rumusan tersebut.");
  slide("Kerangka Pemikiran & Hipotesis", "BAB 2", [...bullets(g("dsKerangka")), { text: "Hipotesis: " + g("dsHipotesis"), options: { bullet: true } }], "Berdasarkan teori dan penelitian terdahulu, kerangka pemikiran penelitian ini menghubungkan variabel sebagaimana bagan berikut, dengan hipotesis yang akan diuji.");
  slide("Metode Penelitian", "BAB 3", bullets(g("dsMetode")), "Penelitian ini menggunakan desain dan metode sebagaimana slide. Jelaskan alasan pemilihan metode dan teknik analisisnya secara ringkas.");
  slide("Populasi & Sampel", "BAB 3", bullets(g("dsSampel")), "Populasi dan sampel penelitian ditentukan dengan teknik yang tertera; sebutkan jumlah responden/sampel akhir yang berhasil diolah.");
  const hs = pptx.addSlide();
  hs.addShape("rect", { x: 0, y: 0, w: 13.33, h: 1.0, fill: { color: T.p } });
  hs.addText("Hasil Penelitian", { x: 0.6, y: 0.18, w: 9.6, fontSize: 23, bold: true, color: "FFFFFF" });
  hs.addText("BAB 4", { x: 10.1, y: 0.3, w: 2.7, h: 0.42, fontSize: 11.5, bold: true, color: "FFFFFF", fill: { color: T.a }, align: "center" });
  const hrows = [[{ text: "Pengujian", options: { bold: true, fill: { color: "E2E8F0" } } }, { text: "Hasil", options: { bold: true, fill: { color: "E2E8F0" } } }, { text: "Kesimpulan", options: { bold: true, fill: { color: "E2E8F0" } } }]];
  lines(g("dsHasil")).forEach((ln) => { const p1 = ln.split(":"); const rest = (p1.slice(1).join(":") || "").split("—"); hrows.push([p1[0].trim(), (rest[0] || "").trim(), (rest.slice(1).join("—") || "").trim()]); });
  if (hrows.length === 1) hrows.push(["(isi hasil uji di formulir)", "", ""]);
  hs.addTable(hrows, { x: 0.6, y: 1.35, w: 12.1, fontSize: 13.5, border: { pt: 0.5, color: "CBD5E1" }, colW: [3.6, 4.7, 3.8] });
  if (hs.addNotes) hs.addNotes("Memasuki hasil penelitian: sampaikan tiap pengujian dengan pola yang sama — sebutkan uji, nilai statistik & signifikansinya, lalu kesimpulan hipotesisnya. Jangan membaca tabel kata per kata.");
  slide("Kesimpulan", "BAB 5", bullets(g("dsKesimpulan")), "Berdasarkan hasil pengujian, kesimpulan penelitian ini adalah sebagai berikut. Pastikan tiap kesimpulan menjawab satu rumusan masalah.");
  slide("Saran", "BAB 5", bullets(g("dsSaran")), "Saran saya bagi pihak terkait dan peneliti selanjutnya adalah sebagaimana slide ini.");
  const end = pptx.addSlide(); end.background = { color: T.dark };
  end.addText("Terima Kasih", { x: 1, y: 2.9, w: 11.33, fontSize: 40, bold: true, color: "FFFFFF", align: "center" });
  end.addText("Mohon arahan, kritik, dan saran dari Bapak/Ibu Penguji.", { x: 1, y: 4.0, w: 11.33, fontSize: 16, color: "CBD5E1", align: "center" });
  if (end.addNotes) end.addNotes("Demikian presentasi saya. Saya mengucapkan terima kasih atas perhatian Bapak/Ibu penguji; saya siap menerima pertanyaan dan masukan.");
  await pptx.writeFile({ fileName: "MahasiswaTools_Deck-Sidang.pptx" });
  toast("Deck sidang 11 slide terunduh 🎓");
}

/* ---------- 107. Pengekstrak Materi PPT Dosen ---------- */
UI.pptxextract = function (b) {
  window._px = null;
  b.innerHTML = head("📤", "Sulap PPT Dosen Jadi Rangkuman & Kuis", "Upload file .pptx materi kuliah: seluruh judul, poin, dan catatan dosen diekstrak. Unduh sebagai rangkuman Word, handout PDF berkollom catatan tangan, atau langsung jadi kuis latihan.")
    + field("File .pptx dari Dosen", '<input type="file" id="pxFile" accept=".pptx" class="' + IN + '">')
    + '<div id="pxOut" class="mt-3"></div>';
  document.getElementById("pxFile").addEventListener("change", async (e) => {
    const f = e.target.files[0]; if (!f) return;
    const out = document.getElementById("pxOut");
    out.innerHTML = '<p class="text-sm text-slate-500">⏳ Membaca struktur PPTX…</p>';
    try {
      if (!await loadLib("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js", "JSZip")) throw new Error("Library JSZip gagal dimuat.");
      const zip = await JSZip.loadAsync(await f.arrayBuffer());
      const slideFiles = Object.keys(zip.files).filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n)).sort((a, b2) => parseInt(a.match(/\d+/)[0]) - parseInt(b2.match(/\d+/)[0]));
      const slides = [];
      for (const name of slideFiles) {
        const xml = await zip.files[name].async("string");
        const texts = [...xml.matchAll(/<a:t>([^<]*)<\/a:t>/g)].map((m) => m[1].replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim()).filter(Boolean);
        const num = name.match(/\d+/)[0];
        let notes = "";
        const nf = zip.files["ppt/notesSlides/notesSlide" + num + ".xml"];
        if (nf) { const nxml = await nf.async("string"); notes = [...nxml.matchAll(/<a:t>([^<]*)<\/a:t>/g)].map((m) => m[1].trim()).filter((t) => t && !/^\d+$/.test(t)).join(" "); }
        slides.push({ title: texts[0] || "Slide " + num, points: texts.slice(1), notes });
      }
      window._px = { slides, name: f.name };
      out.innerHTML = '<p class="text-sm mb-3">✅ Terbaca <b>' + slides.length + ' slide</b> • total ' + slides.reduce((a, s) => a + s.points.length, 0) + ' poin materi.</p>'
        + '<div class="flex flex-wrap gap-2 mb-4"><button class="' + BTN2 + '" onclick="pxDoc()">📄 Rangkuman Word (.doc)</button><button class="' + BTN2 + '" onclick="pxHandout()">📝 Handout PDF (kolom catatan)</button><button class="' + BTN2 + '" onclick="pxQuiz()">🧠 Buat Kuis dari Materi Ini</button></div>'
        + '<div class="space-y-2 max-h-96 overflow-y-auto pr-1">' + slides.map((s, i) => '<div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60"><b class="text-sm">' + (i + 1) + '. ' + esc(s.title) + '</b><ul class="text-[13px] text-slate-600 dark:text-slate-300 list-disc ml-5 mt-1">' + s.points.map((p) => '<li>' + esc(p) + '</li>').join("") + '</ul>' + (s.notes ? '<p class="text-xs text-slate-400 mt-1">🗒️ Catatan: ' + esc(s.notes) + '</p>' : "") + '</div>').join("") + '</div>'
        + '<div id="pxQuiz" class="mt-4"></div>';
    } catch (err) { out.innerHTML = '<p class="text-sm text-rose-500">❌ Gagal membaca PPTX: ' + esc(err.message) + '</p>'; }
  });
};
function pxDoc() {
  if (!window._px) return;
  const html = "<h1>Rangkuman Materi — " + esc(window._px.name.replace(/\.pptx$/i, "")) + "</h1>" + window._px.slides.map((s, i) => "<h2>Slide " + (i + 1) + ": " + esc(s.title) + "</h2><ul>" + s.points.map((p) => "<li>" + esc(p) + "</li>").join("") + "</ul>" + (s.notes ? "<p><i>Catatan dosen: " + esc(s.notes) + "</i></p>" : "")).join("");
  downloadDoc("Rangkuman_" + window._px.name.replace(/\.pptx$/i, "") + ".doc", html);
}
async function pxHandout() {
  if (!window._px) return;
  const ok = await loadLib("https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js", "PDFLib");
  if (!ok) { toast("Library PDF gagal dimuat."); return; }
  const { PDFDocument, rgb, StandardFonts } = PDFLib;
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const W = 595, H = 842, M = 42;
  let page = doc.addPage([W, H]), y = H - M;
  const wrap = (text, f, size, maxW) => { const words = String(text).split(/\s+/); const out = []; let cur = ""; words.forEach((w) => { const t = cur ? cur + " " + w : w; if (f.widthOfTextAtSize(t, size) > maxW && cur) { out.push(cur); cur = w; } else cur = t; }); if (cur) out.push(cur); return out; };
  window._px.slides.forEach((s, i) => {
    const linesNeeded = 30 + wrap(s.title, bold, 12, 250).length * 15 + s.points.reduce((a, p) => a + wrap(p, font, 10, 250).length, 0) * 13 + 26;
    if (y - linesNeeded < M + 20) { page = doc.addPage([W, H]); y = H - M; }
    page.drawText("Slide " + (i + 1) + " — Catatan Tangan →", { x: W / 2 + 10, y, size: 9, font, color: rgb(0.55, 0.58, 0.65) });
    wrap(s.title, bold, 12, 250).forEach((ln) => { page.drawText(ln, { x: M, y, size: 12, font: bold, color: rgb(0.1, 0.1, 0.25) }); y -= 15; });
    y -= 2;
    s.points.forEach((p) => { wrap("• " + p, font, 10, 250).forEach((ln) => { page.drawText(ln, { x: M, y, size: 10, font, color: rgb(0.2, 0.2, 0.25) }); y -= 13; }); });
    const topY = y + 30 + s.points.length * 4;
    for (let ly = Math.min(topY, H - M); ly > y - 4; ly -= 18) page.drawLine({ start: { x: W / 2 + 10, y: ly }, end: { x: W - M, y: ly }, thickness: 0.5, color: rgb(0.8, 0.82, 0.88) });
    y -= 24;
  });
  const bytes = await doc.save();
  download("Handout_" + window._px.name.replace(/\.pptx$/i, "") + ".pdf", new Blob([bytes], { type: "application/pdf" }));
  toast("Handout PDF terunduh 📝");
}
function pxQuiz() {
  if (!window._px) return;
  const pool = [];
  window._px.slides.forEach((s) => s.points.forEach((p) => { if (p.length > 12) pool.push({ title: s.title, point: p }); }));
  if (pool.length < 4) { toast("Poin materi kurang dari 4 — kuis belum bisa dibuat."); return; }
  const qs = pool.slice(0, 10).map((q) => {
    const wrong = pool.filter((x) => x.point !== q.point).sort(() => Math.random() - 0.5).slice(0, 3).map((x) => x.point);
    const opts = [...wrong, q.point].sort(() => Math.random() - 0.5);
    return { q: 'Manakah pernyataan yang termasuk poin dari slide "' + q.title + '"?', opts, ans: q.point };
  });
  window._pxq = { qs, score: 0, done: 0 };
  document.getElementById("pxQuiz").innerHTML = '<h4 class="font-bold text-sm mb-2">🧠 Kuis Latihan dari Materi Dosen (' + qs.length + ' soal)</h4>' + qs.map((q, i) => '<div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 mb-2.5"><p class="text-sm font-semibold mb-2">' + (i + 1) + '. ' + esc(q.q) + '</p>' + q.opts.map((o) => '<button class="block w-full text-left text-[13px] px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 mb-1.5" onclick="pxAnswer(this, ' + i + ', ' + JSON.stringify(esc(o)).replace(/"/g, "&quot;") + ')">' + esc(o) + '</button>').join("") + '</div>').join("") + '<p id="pxScore" class="font-bold text-sm"></p>';
}
function pxAnswer(btn, qi, val) {
  const Q = window._pxq; if (!Q) return;
  const wrap = btn.parentElement; if (wrap.dataset.done) return; wrap.dataset.done = "1";
  const correct = Q.qs[qi].ans;
  [...wrap.querySelectorAll("button")].forEach((x) => { x.disabled = true; if (x.textContent === correct) x.classList.add("!bg-emerald-100", "dark:!bg-emerald-900/40"); });
  if (val === correct) { Q.score++; btn.classList.add("!bg-emerald-100"); } else btn.classList.add("!bg-rose-100", "dark:!bg-rose-900/40");
  Q.done++;
  document.getElementById("pxScore").textContent = "Skor sementara: " + Q.score + " / " + Q.done + " terjawab (total " + Q.qs.length + " soal)";
}

/* ---------- 108. Excel ke Slide Grafik PPT ---------- */
UI.xls2chart = function (b) {
  b.innerHTML = head("📊", "Data Excel Jadi Slide Grafik PowerPoint", "Tempel tabel (atau upload .xlsx/.csv): kolom pertama = label, kolom berikutnya = seri angka. Pilih jenis grafik — keluar slide .pptx dengan grafik vektor asli yang bisa diedit di PowerPoint.")
    + field("Upload file (opsional, mengisi tabel di bawah)", '<input type="file" id="xcFile" accept=".xlsx,.xls,.csv" class="' + IN + '">')
    + field("Tabel Data", '<textarea id="xcData" rows="7" class="' + IN + ' font-mono text-[13px]">Bulan\tPengunjung\tUnduhan\nJan\t120\t340\nFeb\t180\t420\nMar\t260\t510\nApr\t310\t640</textarea>', "Baris pertama = header. Copy langsung dari Excel.")
    + '<div class="grid sm:grid-cols-3 gap-2">' + field("Jenis Grafik", '<select id="xcType" class="' + IN + '"><option value="bar">📊 Batang (Bar)</option><option value="line">📈 Garis (Line)</option><option value="pie">🥧 Lingkaran (Pie)</option><option value="doughnut">🍩 Donat (Doughnut)</option></select>') + field("Judul Slide", '<input id="xcTitle" class="' + IN + '" value="Hasil Penelitian">') + field("Kesimpulan Temuan", '<input id="xcConc" class="' + IN + '" placeholder="Ketik kesimpulan singkat temuanmu…">') + '</div>'
    + '<button class="' + BTN + ' w-full" onclick="xcGenerate()">📊 Buat Slide .pptx</button>';
  document.getElementById("xcFile").addEventListener("change", async (e) => { const f = e.target.files[0]; if (!f) return; try { const { rows } = await mtReadExcelFile(f); document.getElementById("xcData").value = mtRowsToTSV(rows); toast("Data dari " + f.name + " terisi."); } catch (err) { toast("Gagal membaca: " + err.message); } });
};
async function xcGenerate() {
  const ok = await loadLib("https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js", "PptxGenJS");
  if (!ok) { toast("Library PPT gagal dimuat."); return; }
  const lines = document.getElementById("xcData").value.trim().split("\n").map((l) => l.split(/\t|;|,/).map((c) => c.trim()));
  if (lines.length < 2) { toast("Tabelnya minimal 2 baris ya."); return; }
  const head = lines[0], labels = lines.slice(1).map((r) => r[0]);
  const type = document.getElementById("xcType").value;
  const pptx = new PptxGenJS(); pptx.defineLayout({ name: "W", width: 13.33, height: 7.5 }); pptx.layout = "W";
  const s = pptx.addSlide();
  s.addText(document.getElementById("xcTitle").value || "Hasil Penelitian", { x: 0.6, y: 0.3, w: 12, fontSize: 24, bold: true, color: "0B0F19" });
  const series = [];
  for (let c = 1; c < head.length; c++) series.push({ name: head[c], labels, values: lines.slice(1).map((r) => parseFloat(String(r[c]).replace(/\./g, "").replace(",", ".")) || 0) });
  if (type === "pie" || type === "doughnut") s.addChart(type, [{ name: series[0].name, labels, values: series[0].values }], { x: 0.8, y: 1.2, w: 7.6, h: 5.4, showLegend: true, legendPos: "r", showPercent: true });
  else s.addChart(type, series, { x: 0.6, y: 1.2, w: 8.2, h: 5.4, showLegend: true, legendPos: "b", catAxisTitle: head[0], showValue: type === "bar" });
  const trows = lines.map((r, ri) => r.map((c) => ({ text: String(c), options: ri === 0 ? { bold: true, fill: { color: "E0E7FF" } } : {} })));
  s.addTable(trows, { x: 9.1, y: 1.2, w: 3.7, fontSize: 10.5, border: { pt: 0.5, color: "CBD5E1" } });
  const conc = document.getElementById("xcConc").value.trim();
  if (conc) s.addText("Kesimpulan: " + conc, { x: 0.6, y: 6.85, w: 12.1, fontSize: 12.5, italic: true, color: "475569" });
  await pptx.writeFile({ fileName: "MahasiswaTools_Slide-Grafik.pptx" });
  toast("Slide grafik terunduh 📊");
}

/* ---------- 109. Kompresor PPTX ---------- */
UI.pptxpress = function (b) {
  window._ppFile = null;
  b.innerHTML = head("🗜️", "Kompres PowerPoint Bengkak Jadi Ringan", "PPT 20 MB gara-gara foto? Tool ini men-downscale & mengompresi ulang semua gambar di dalam .pptx via canvas — teks, tabel, dan animasi tidak berubah. Target lolos batas upload SIAKAD/LMS 2–5 MB.")
    + field("File .pptx", '<input type="file" id="ppFile" accept=".pptx" class="' + IN + '">')
    + '<div id="ppInfo" class="mb-3"></div>'
    + '<div class="grid grid-cols-2 gap-2">' + field("Resolusi maks gambar", '<select id="ppMax" class="' + IN + '"><option value="1920">1920px (tajam)</option><option value="1280" selected>1280px (seimbang)</option><option value="960">960px (paling ringan)</option></select>') + field("Kualitas JPEG", '<select id="ppQ" class="' + IN + '"><option value="0.85">85% (tajam)</option><option value="0.75" selected>75% (seimbang)</option><option value="0.6">60% (ringan)</option></select>') + '</div>'
    + '<button class="' + BTN + ' w-full" onclick="ppCompress()">🗜️ Kompres Sekarang</button><div id="ppOut" class="mt-3"></div>';
  document.getElementById("ppFile").addEventListener("change", async (e) => {
    const f = e.target.files[0]; if (!f) return; window._ppFile = f;
    document.getElementById("ppInfo").innerHTML = '<p class="text-sm">📄 ' + esc(f.name) + ' — <b>' + (f.size / 1048576).toFixed(2) + ' MB</b>. Klik Kompres untuk memproses.</p>';
  });
};
function ppLoadImg(blob) { return new Promise((res, rej) => { const url = URL.createObjectURL(blob); const img = new Image(); img.onload = () => res({ img, url }); img.onerror = rej; img.src = url; }); }
async function ppCompress() {
  const f = window._ppFile; const out = document.getElementById("ppOut");
  if (!f) { toast("Pilih file .pptx dulu ya."); return; }
  if (!await loadLib("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js", "JSZip")) { toast("Library JSZip gagal dimuat."); return; }
  out.innerHTML = '<p class="text-sm text-slate-5 00">⏳ Memindai gambar di dalam PPTX…</p>'.replace(" 00", "00");
  try {
    const zip = await JSZip.loadAsync(await f.arrayBuffer());
    const media = Object.keys(zip.files).filter((n) => /^ppt\/media\/.+\.(png|jpe?g)$/i.test(n));
    const maxDim = parseInt(document.getElementById("ppMax").value) || 1280;
    const q = parseFloat(document.getElementById("ppQ").value) || 0.75;
    let done = 0, savedBytes = 0;
    for (const name of media) {
      const blob = await zip.files[name].async("blob");
      if (blob.size < 120000) continue;
      try {
        const { img, url } = await ppLoadImg(blob);
        const scale = Math.min(1, maxDim / Math.max(img.naturalWidth, img.naturalHeight));
        const w = Math.round(img.naturalWidth * scale), h = Math.round(img.naturalHeight * scale);
        const cv = document.createElement("canvas"); cv.width = w; cv.height = h;
        const ctx = cv.getContext("2d"); ctx.drawImage(img, 0, 0, w, h);
        let hasAlpha = false;
        if (/\.png$/i.test(name)) { try { const d = ctx.getImageData(0, 0, Math.min(w, 60), Math.min(h, 60)).data; for (let i = 3; i < d.length; i += 4) if (d[i] < 250) { hasAlpha = true; break; } } catch (e) {} }
        const nb = await new Promise((r) => cv.toBlob(r, hasAlpha ? "image/png" : "image/jpeg", q));
        URL.revokeObjectURL(url);
        if (nb && nb.size < blob.size) { zip.file(name, nb); savedBytes += blob.size - nb.size; done++; }
      } catch (e) { /* gambar rusak dilewati */ }
    }
    const outBlob = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } });
    download(f.name.replace(/\.pptx$/i, "") + "_kompres.pptx", outBlob);
    const pct = Math.max(0, Math.round((1 - outBlob.size / f.size) * 100));
    out.innerHTML = '<div class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-sm">✅ <b>Selesai!</b> ' + done + ' gambar dikompresi (hemat ' + (savedBytes / 1048576).toFixed(2) + ' MB dari gambar). Ukuran file: <b>' + (f.size / 1048576).toFixed(2) + ' MB → ' + (outBlob.size / 1048576).toFixed(2) + ' MB</b> (turun ' + pct + '%). Buka file hasilnya di PowerPoint untuk memastikan tampilannya tetap bagus sebelum dikumpulkan.</div>';
  } catch (e) { out.innerHTML = '<p class="text-sm text-rose-500">❌ Gagal: ' + esc(e.message) + '</p>'; }
}

/* ---------- 110. Excel ke PDF Fit-Page ---------- */
UI.xls2pdf = function (b) {
  window._xp = null;
  b.innerHTML = head("🖨️", "Excel ke PDF — Pas 1 Halaman, Anti Terpotong", "Upload .xlsx: lebar semua kolom dihitung proporsional lalu diskalakan agar 100% muat selebar kertas A4/F4. Header tabel berulang di setiap halaman. Tidak ada lagi kolom kanan hilang saat dicetak.")
    + field("File Excel", '<input type="file" id="xpFile" accept=".xlsx,.xls,.csv" class="' + IN + '">')
    + '<div class="grid grid-cols-3 gap-2">' + field("Kertas", '<select id="xpPaper" class="' + IN + '"><option value="a4">A4 (210×297mm)</option><option value="f4">F4 / Folio (215×330mm)</option></select>') + field("Orientasi", '<select id="xpOri" class="' + IN + '"><option value="landscape">Landscape</option><option value="portrait">Portrait</option></select>') + field("Judul Tabel", '<input id="xpTitle" class="' + IN + '" placeholder="mis. Rekap Data Responden">') + '</div>'
    + '<button class="' + BTN + ' w-full" onclick="xpMake()">🖨️ Buat PDF Siap Cetak</button><div id="xpOut" class="mt-3"></div>';
  document.getElementById("xpFile").addEventListener("change", async (e) => {
    const f = e.target.files[0]; if (!f) return;
    try { const { rows } = await mtReadExcelFile(f); window._xp = { rows, name: f.name }; document.getElementById("xpOut").innerHTML = '<p class="text-sm">✅ Terbaca <b>' + rows.length + ' baris × ' + (rows[0] || []).length + ' kolom</b> dari ' + esc(f.name) + '. Klik Buat PDF.</p>'; }
    catch (err) { toast("Gagal membaca: " + err.message); }
  });
};
async function xpMake() {
  const D = window._xp; const out = document.getElementById("xpOut");
  if (!D) { toast("Upload file Excel dulu ya."); return; }
  const ok = await loadLib("https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js", "PDFLib");
  if (!ok) { toast("Library PDF gagal dimuat."); return; }
  const { PDFDocument, rgb, StandardFonts } = PDFLib;
  const rows = D.rows.map((r) => r.map((c) => String(c == null ? "" : c)));
  const ncol = Math.max(...rows.map((r) => r.length));
  const paper = document.getElementById("xpPaper").value, ori = document.getElementById("xpOri").value;
  const dims = paper === "f4" ? [609, 935] : [595, 842];
  const W = ori === "landscape" ? dims[1] : dims[0], H = ori === "landscape" ? dims[0] : dims[1];
  const M = 36, usable = W - M * 2;
  const weights = [];
  for (let c = 0; c < ncol; c++) { let mx = 3; rows.forEach((r) => { mx = Math.max(mx, (r[c] || "").length); }); weights.push(Math.min(mx, 42)); }
  const totW = weights.reduce((a, b2) => a + b2, 0);
  let fontSize = 10;
  const colW = weights.map((w) => usable * w / totW);
  const charW = (fs) => fs * 0.52;
  const needShrink = colW.some((w, c) => (weights[c] * charW(10)) > w);
  if (needShrink) fontSize = Math.max(6.5, 10 * Math.min(...colW.map((w, c) => w / (weights[c] * charW(10)))));
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const rowH = fontSize + 6;
  const title = document.getElementById("xpTitle").value.trim();
  let page = doc.addPage([W, H]), y = H - M;
  let pageNo = 1;
  const drawHeader = () => {
    if (title && pageNo === 1) { page.drawText(title.slice(0, 90), { x: M, y, size: 13, font: bold, color: rgb(0.08, 0.1, 0.2) }); y -= 22; }
    let x = M;
    page.drawRectangle({ x: M, y: y - rowH + 4, width: usable, height: rowH, color: rgb(0.88, 0.9, 0.98) });
    rows[0].forEach((c, ci) => { page.drawText(String(c).slice(0, 60), { x: x + 3, y: y - rowH + 8, size: fontSize, font: bold, color: rgb(0.1, 0.1, 0.2) }); x += colW[ci]; });
    y -= rowH + 2;
  };
  drawHeader();
  for (let r = 1; r < rows.length; r++) {
    if (y - rowH < M + 14) { page.drawText("MahasiswaTools • hal. " + pageNo, { x: M, y: M - 16, size: 8, font, color: rgb(0.6, 0.62, 0.68) }); page = doc.addPage([W, H]); y = H - M; pageNo++; drawHeader(); }
    let x = M;
    rows[r].forEach((c, ci) => { const txt = String(c); const maxCh = Math.floor((colW[ci] - 5) / charW(fontSize)); page.drawText(txt.slice(0, Math.max(3, maxCh)), { x: x + 3, y: y - rowH + 8, size: fontSize, font, color: rgb(0.15, 0.16, 0.2) }); x += colW[ci]; });
    page.drawLine({ start: { x: M, y: y - rowH + 3 }, end: { x: M + usable, y: y - rowH + 3 }, thickness: 0.4, color: rgb(0.85, 0.86, 0.9) });
    y -= rowH;
  }
  page.drawText("MahasiswaTools • hal. " + pageNo, { x: M, y: M - 16, size: 8, font, color: rgb(0.6, 0.62, 0.68) });
  const bytes = await doc.save();
  download("Siap-Cetak_" + D.name.replace(/\.[^.]+$/, "") + ".pdf", new Blob([bytes], { type: "application/pdf" }));
  out.innerHTML = '<div class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-sm">✅ <b>PDF selesai</b> — ' + pageNo + ' halaman, kertas ' + (paper === "f4" ? "F4" : "A4") + ' ' + ori + ', ukuran huruf ' + fontSize.toFixed(1) + 'pt (diskalakan agar semua ' + ncol + ' kolom muat selebar halaman).</div>';
}

/* ---------- 111. Tanda Tangan & Stempel PDF ---------- */
UI.pdfsign = function (b) {
  window._ps = { bytes: null, page: 1, items: { ttd: null, stamp: null, materai: null }, pos: { ttd: { x: 0.68, y: 0.78 }, stamp: { x: 0.5, y: 0.8 }, materai: { x: 0.2, y: 0.78 } }, target: "ttd", scale: 130 };
  b.innerHTML = head("✍️", "Tanda Tangani & Stempel PDF di Browser", "Upload PDF (surat izin, lembar pengesahan, kontrak magang): gambar tanda tanganmu, buat stempel teks, atau kotak materai — klik di pratinjau untuk meletakkannya, lalu unduh PDF final. Semua diproses lokal.")
    + field("File PDF", '<input type="file" id="psFile" accept=".pdf" class="' + IN + '">')
    + '<div class="grid sm:grid-cols-2 gap-3"><div>' + field("Halaman tujuan", '<select id="psPage" class="' + IN + '" onchange="psRenderPage()"></select>')
    + field("Geser target penempatan", '<div class="flex gap-2"><label class="text-[13px] flex items-center gap-1.5"><input type="radio" name="psTarget" value="ttd" checked onchange="window._ps.target=this.value"> ✍️ TTD</label><label class="text-[13px] flex items-center gap-1.5"><input type="radio" name="psTarget" value="stamp" onchange="window._ps.target=this.value"> 🔵 Stempel</label><label class="text-[13px] flex items-center gap-1.5"><input type="radio" name="psTarget" value="materai" onchange="window._ps.target=this.value"> 🧾 Materai</label></div>', "Klik pada pratinjau halaman untuk memindahkan item terpilih ke titik itu.")
    + field("Ukuran item (% lebar halaman)", '<input type="range" id="psScale" min="60" max="220" value="130" oninput="window._ps.scale=+this.value; psDrawOverlay()">')
    + field("Teks stempel (nama organisasi/panitia)", '<input id="psStampText" class="' + IN + '" value="PANITIA KKN 2026" oninput="psMakeStamp()">')
    + '<div class="flex flex-wrap gap-2 mt-1"><button class="' + BTN2 + '" onclick="psMakeStamp()">🔵 Buat/Perbarui Stempel</button><button class="' + BTN2 + '" onclick="psMakeMaterai()">🧾 Buat Kotak Materai</button></div>'
    + '</div><div>' + field("Gambar Tanda Tangan di Sini", '<canvas id="psPad" width="340" height="150" class="w-full rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-white touch-none cursor-crosshair"></canvas>')
    + '<div class="flex gap-2 mt-2"><button class="' + BTN2 + '" onclick="psPadClear()">🧹 Hapus Coretan</button><button class="' + BTN2 + '" onclick="psPadSave()">✅ Pakai TTD Ini</button></div>'
    + field("atau upload gambar TTD transparan", '<input type="file" id="psTtdFile" accept="image/*" class="' + IN + '">')
    + '</div></div>'
    + field("Pratinjau Halaman (klik untuk meletakkan item)", '<div id="psPreview" class="relative inline-block max-w-full border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden bg-white"><canvas id="psCanvas" class="max-w-full block"></canvas><div id="psOverlay" class="absolute inset-0 pointer-events-none"></div></div>')
    + '<button class="' + BTN + ' w-full mt-2" onclick="psApply()">📥 Terapkan & Unduh PDF Bertanda Tangan</button>';
  document.getElementById("psFile").addEventListener("change", async (e) => {
    const f = e.target.files[0]; if (!f) return;
    window._ps.bytes = await f.arrayBuffer(); window._ps.name = f.name;
    if (!await loadPdfJs()) { toast("PDF.js gagal dimuat."); return; }
    const pdf = await pdfjsLib.getDocument({ data: window._ps.bytes.slice(0) }).promise;
    window._ps.numPages = pdf.numPages;
    document.getElementById("psPage").innerHTML = Array.from({ length: pdf.numPages }, (_, i) => '<option value="' + (i + 1) + '">Halaman ' + (i + 1) + '</option>').join("");
    psPadInit(); psRenderPage();
  });
  document.getElementById("psTtdFile").addEventListener("change", (e) => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { window._ps.items.ttd = r.result; psDrawOverlay(); toast("Gambar TTD terpasang."); }; r.readAsDataURL(f); });
  psPadInit();
};
async function psRenderPage() {
  const S = window._ps; if (!S.bytes) return;
  const pdf = await pdfjsLib.getDocument({ data: S.bytes.slice(0) }).promise;
  const page = await pdf.getPage(+document.getElementById("psPage").value || 1);
  const vp = page.getViewport({ scale: 1.25 });
  const cv = document.getElementById("psCanvas"); cv.width = vp.width; cv.height = vp.height;
  await page.render({ canvasContext: cv.getContext("2d"), viewport: vp }).promise;
  S.pageDims = { w: vp.width, h: vp.height };
  const pv = document.getElementById("psPreview");
  pv.onclick = (e) => { const r = pv.getBoundingClientRect(); const fx = (e.clientX - r.left) / r.width, fy = (e.clientY - r.top) / r.height; S.pos[S.target] = { x: fx, y: fy }; psDrawOverlay(); };
  psDrawOverlay();
}
function psDrawOverlay() {
  const S = window._ps, ov = document.getElementById("psOverlay"); if (!ov) return;
  const mk = (key, border) => { const it = S.items[key]; if (!it) return ""; const p = S.pos[key]; const wPct = (key === "ttd" ? 0.20 : key === "stamp" ? 0.24 : 0.13) * (S.scale / 130); return '<img src="' + it + '" style="position:absolute;left:' + (p.x * 100) + '%;top:' + (p.y * 100) + '%;width:' + (wPct * 100) + '%;transform:translate(-50%,-50%);border:1.5px dashed ' + border + ';border-radius:6px">'; };
  ov.innerHTML = mk("materai", "#94A3B8") + mk("stamp", "#2563EB") + mk("ttd", "#059669");
}
function psPadInit() {
  const pad = document.getElementById("psPad"); if (!pad || pad.dataset.init) return; pad.dataset.init = "1";
  const ctx = pad.getContext("2d"); ctx.lineWidth = 2.4; ctx.lineCap = "round"; ctx.strokeStyle = "#111827";
  let drawing = false;
  const pt = (e) => { const r = pad.getBoundingClientRect(); const src = e.touches ? e.touches[0] : e; return { x: (src.clientX - r.left) * pad.width / r.width, y: (src.clientY - r.top) * pad.height / r.height }; };
  const start = (e) => { drawing = true; const p = pt(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); e.preventDefault(); };
  const move = (e) => { if (!drawing) return; const p = pt(e); ctx.lineTo(p.x, p.y); ctx.stroke(); e.preventDefault(); };
  pad.addEventListener("mousedown", start); pad.addEventListener("mousemove", move); window.addEventListener("mouseup", () => drawing = false);
  pad.addEventListener("touchstart", start, { passive: false }); pad.addEventListener("touchmove", move, { passive: false });
}
function psPadClear() { const pad = document.getElementById("psPad"); pad.getContext("2d").clearRect(0, 0, pad.width, pad.height); }
function psPadSave() { window._ps.items.ttd = document.getElementById("psPad").toDataURL("image/png"); psDrawOverlay(); toast("Tanda tangan siap — klik pratinjau untuk meletakkannya."); }
function psMakeStamp() {
  const txt = (document.getElementById("psStampText").value || "STEMPEL").toUpperCase();
  const cv = document.createElement("canvas"); cv.width = 420; cv.height = 420; const x = cv.getContext("2d");
  x.strokeStyle = "#1D4ED8"; x.lineWidth = 10; x.beginPath(); x.arc(210, 210, 190, 0, Math.PI * 2); x.stroke();
  x.lineWidth = 3; x.beginPath(); x.arc(210, 210, 160, 0, Math.PI * 2); x.stroke();
  x.fillStyle = "#1D4ED8"; x.textAlign = "center"; x.textBaseline = "middle";
  const words = txt.split(" "); let fs = 44; x.font = "bold " + fs + "px Arial";
  while (x.measureText(txt).width > 280 && fs > 16) { fs -= 4; x.font = "bold " + fs + "px Arial"; }
  if (words.length > 1 && x.measureText(txt).width > 280) { const mid = Math.ceil(words.length / 2); x.fillText(words.slice(0, mid).join(" "), 210, 185); x.fillText(words.slice(mid).join(" "), 210, 235); }
  else x.fillText(txt, 210, 210);
  x.font = "bold 30px Arial"; x.fillText("★ ★ ★", 210, 300);
  window._ps.items.stamp = cv.toDataURL("image/png"); psDrawOverlay();
}
function psMakeMaterai() {
  const cv = document.createElement("canvas"); cv.width = 220; cv.height = 300; const x = cv.getContext("2d");
  x.strokeStyle = "#0F766E"; x.lineWidth = 5; x.strokeRect(8, 8, 204, 284);
  x.fillStyle = "#0F766E"; x.textAlign = "center"; x.font = "bold 24px Arial";
  x.fillText("MATERAI", 110, 110); x.fillText("TEMPEL", 110, 145);
  x.font = "bold 20px Arial"; x.fillText("Rp10.000", 110, 195);
  x.font = "13px Arial"; x.fillText("Tanda tangan di atas", 110, 245); x.fillText("materai", 110, 265);
  window._ps.items.materai = cv.toDataURL("image/png"); psDrawOverlay(); toast("Kotak materai dibuat — klik pratinjau untuk meletakkannya.");
}
async function psApply() {
  const S = window._ps;
  if (!S.bytes) { toast("Upload PDF dulu ya."); return; }
  if (!S.items.ttd && !S.items.stamp && !S.items.materai) { toast("Buat dulu minimal satu item: tanda tangan, stempel, atau materai."); return; }
  const ok = await loadLib("https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js", "PDFLib");
  if (!ok) { toast("Library PDF gagal dimuat."); return; }
  const { PDFDocument } = PDFLib;
  const doc = await PDFDocument.load(S.bytes.slice(0));
  const pageIdx = (+document.getElementById("psPage").value || 1) - 1;
  const page = doc.getPages()[pageIdx];
  const { width: W, height: H } = page.getSize();
  const place = async (key, baseW) => {
    const dataUrl = S.items[key]; if (!dataUrl) return;
    const png = await doc.embedPng(dataUrl);
    const w = baseW * (S.scale / 130), h = w * png.height / png.width;
    const p = S.pos[key];
    page.drawImage(png, { x: p.x * W - w / 2, y: H - p.y * H - h / 2, width: w, height: h });
  };
  await place("materai", W * 0.13); await place("stamp", W * 0.24); await place("ttd", W * 0.20);
  const bytes = await doc.save();
  download((S.name || "dokumen.pdf").replace(/\.pdf$/i, "") + "_berttd.pdf", new Blob([bytes], { type: "application/pdf" }));
  toast("PDF bertanda tangan terunduh ✍️");
}

/* ---------- 112. Pengatur Halaman PDF Visual ---------- */
UI.pdforg = function (b) {
  window._po = null;
  b.innerHTML = head("📑", "Atur Ulang Halaman PDF Secara Visual", "Lihat semua halaman sebagai thumbnail: putar halaman scan yang miring, geser urutannya, hapus halaman kosong — lalu unduh PDF yang sudah rapi.")
    + field("File PDF", '<input type="file" id="poFile" accept=".pdf" class="' + IN + '">')
    + '<div id="poGrid" class="mt-2"></div>'
    + '<button class="' + BTN + ' w-full mt-3" onclick="poApply()">📥 Unduh PDF Hasil Pengaturan</button>';
  document.getElementById("poFile").addEventListener("change", async (e) => {
    const f = e.target.files[0]; if (!f) return;
    const grid = document.getElementById("poGrid");
    grid.innerHTML = '<p class="text-sm text-slate-500">⏳ Membuat thumbnail semua halaman…</p>';
    try {
      const bytes = await f.arrayBuffer();
      if (!await loadPdfJs()) throw new Error("PDF.js gagal dimuat.");
      const pdf = await pdfjsLib.getDocument({ data: bytes.slice(0) }).promise;
      window._po = { bytes, name: f.name, order: [] };
      for (let p = 1; p <= pdf.numPages; p++) {
        const page = await pdf.getPage(p);
        const vp = page.getViewport({ scale: 0.32 });
        const cv = document.createElement("canvas"); cv.width = vp.width; cv.height = vp.height;
        await page.render({ canvasContext: cv.getContext("2d"), viewport: vp }).promise;
        window._po.order.push({ src: p - 1, rot: 0, del: false, thumb: cv.toDataURL("image/jpeg", 0.72) });
      }
      poRenderGrid();
    } catch (err) { grid.innerHTML = '<p class="text-sm text-rose-500">❌ Gagal: ' + esc(err.message) + '</p>'; }
  });
};
function poRenderGrid() {
  const O = window._po; if (!O) return;
  document.getElementById("poGrid").innerHTML = '<p class="text-sm mb-2">📄 <b>' + O.order.length + ' halaman</b> — ' + O.order.filter((x) => x.del).length + ' ditandai hapus.</p>'
    + '<div class="grid grid-cols-3 sm:grid-cols-4 gap-2.5">' + O.order.map((pg, i) => '<div class="rounded-xl border ' + (pg.del ? "border-rose-300 opacity-50" : "border-slate-200 dark:border-slate-700") + ' bg-white dark:bg-slate-900 p-1.5 text-center">'
      + '<div class="overflow-hidden rounded-md mb-1.5" style="height:110px;display:flex;align-items:center;justify-content:center;background:#F8FAFC"><img src="' + pg.thumb + '" style="max-height:110px;transform:rotate(' + pg.rot + 'deg);transition:transform .2s"></div>'
      + '<div class="text-[11px] font-bold mb-1">Posisi ' + (i + 1) + ' • asal hal. ' + (pg.src + 1) + (pg.rot ? ' • ↻' + pg.rot + '°' : '') + '</div>'
      + '<div class="flex justify-center gap-1"><button class="' + BTN2 + ' !px-2 !py-1 !text-[11px]" onclick="poMove(' + i + ',-1)">◀</button><button class="' + BTN2 + ' !px-2 !py-1 !text-[11px]" onclick="poMove(' + i + ',1)">▶</button><button class="' + BTN2 + ' !px-2 !py-1 !text-[11px]" onclick="poRot(' + i + ')">⟳ Putar</button><button class="' + BTN2 + ' !px-2 !py-1 !text-[11px]" onclick="poDel(' + i + ')">' + (pg.del ? "↩️ Urungkan" : "🗑️ Hapus") + '</button></div></div>').join("") + '</div>';
}
function poMove(i, d) { const O = window._po; const j = i + d; if (j < 0 || j >= O.order.length) return; [O.order[i], O.order[j]] = [O.order[j], O.order[i]]; poRenderGrid(); }
function poRot(i) { window._po.order[i].rot = (window._po.order[i].rot + 90) % 360; poRenderGrid(); }
function poDel(i) { window._po.order[i].del = !window._po.order[i].del; poRenderGrid(); }
async function poApply() {
  const O = window._po; if (!O) { toast("Upload PDF dulu ya."); return; }
  const keep = O.order.filter((x) => !x.del);
  if (!keep.length) { toast("Semua halaman dihapus — tidak ada yang bisa diunduh."); return; }
  const ok = await loadLib("https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js", "PDFLib");
  if (!ok) { toast("Library PDF gagal dimuat."); return; }
  const { PDFDocument, degrees } = PDFLib;
  const src = await PDFDocument.load(O.bytes.slice(0));
  const out = await PDFDocument.create();
  const pages = await out.copyPages(src, keep.map((k) => k.src));
  pages.forEach((p, i) => { const add = keep[i].rot; if (add) p.setRotation(degrees(((p.getRotation().angle || 0) + add) % 360)); out.addPage(p); });
  const bytes = await out.save();
  download(O.name.replace(/\.pdf$/i, "") + "_rapi.pdf", new Blob([bytes], { type: "application/pdf" }));
  toast("PDF rapi terunduh 📑 (" + keep.length + " halaman)");
}

/* ============================================================
   ROUTER — deep-link hash & mode halaman tool (SEO)
   ============================================================ */
function mtBootRouter() {
  const chip = document.querySelector("[data-tools-count]");
  if (chip) chip.textContent = TOOLS.length + " Tool Gratis";
  try { applyToolEnhancers(); } catch (e) {}
  try { muatLogoImg(); } catch (e) {}
  if (window.__MT_TOOL_ID__) {
    const t = TOOLS.find((x) => x.id === window.__MT_TOOL_ID__);
    const root = document.getElementById("toolRoot");
    if (t && root) {
      document.title = t.n + " — MahasiswaTools";
      try { if (UI[t.id]) UI[t.id](root); else root.innerHTML = '<p class="font-bold">Tool ini tersedia di aplikasi utama.</p>'; }
      catch (e) { root.innerHTML = '<p class="font-bold">Tool tidak dapat dimuat di halaman ini — buka melalui aplikasi utama.</p>'; }
    }
    return;
  }
  renderRecent(); syncViewBtns();
  renderTabs(); renderGrid();
  if (location.hash && location.hash.length > 1) {
    const id = location.hash.slice(1);
    if (TOOLS.some((x) => x.id === id)) { try { openTool(id); } catch (e) {} }
  }
  // Smart Intent Prefetch (putusan Argon): saat boot hanya kategori milik
  // tool favorit & terakhir dibuka yang dipanaskan, itu pun saat idle dan
  // tidak saat penghemat data aktif. Sisanya dipanaskan oleh intent
  // (mouseover/touchstart pada kartu) — lihat mtIntentPrefetch di core.
  try {
    if (!(navigator.connection && navigator.connection.saveData)) {
      const bootCats = new Set();
      (store.get("mt_recent", []) || []).forEach((id) => { const c = mtCatOf(id); if (c) bootCats.add(c); });
      favs.forEach((id) => { const c = mtCatOf(id); if (c) bootCats.add(c); });
      if (bootCats.size) {
        const run = () => { [...bootCats].reduce((p, c) => p.then(() => loadCat(c)), Promise.resolve()); };
        if (window.requestIdleCallback) requestIdleCallback(run, { timeout: 2500 });
        else setTimeout(run, 1200);
      }
    }
  } catch (e) {}
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mtBootRouter);
else mtBootRouter();