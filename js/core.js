/* FILE HASIL GENERATE dari app.js oleh build/split.js — jangan edit langsung. */
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
  { id: "validitas", n: "Uji Validitas Pearson & Reliabilitas Alpha", c: "data", i: "📊", d: "Korelasi butir + Cronbach's Alpha + narasi Bab 4 otomatis.", aktif: 1 },
  { id: "dapus", n: "Daftar Pustaka Otomatis (APA/MLA/Harvard/Vancouver)", c: "tulis", i: "📚", d: "Format sitasi instan, italic otomatis, urut A–Z, tersimpan.", aktif: 1 },
  { id: "sampel", n: "Kalkulator Sampel (Slovin, Isaac & Lemeshow)", c: "data", i: "🧮", d: "Ukuran sampel minimal lengkap dengan rincian rumus Bab 3.", aktif: 1 },
  { id: "aidetect", n: "Pendeteksi Gaya Tulisan AI (Burstiness)", c: "anti", i: "🤖", d: "Skor risiko deteksi AI lokal: variasi kalimat, kekayaan kosakata, klise LLM + heatmap.", aktif: 1 },
  { id: "k16", n: "Template Makalah & Skripsi (.docx)", c: "tulis", i: "📄", d: "Dokumen Word asli margin 4-4-3-3 (OOXML via JSZip): cover sampai Bab V.", aktif: 1 },
  { id: "proposal", n: "Generator Proposal", c: "tulis", i: "📑", d: "Proposal penelitian/kegiatan/magang: cover berlogo, RAB otomatis, .docx asli.", aktif: 1 },
  { id: "kuesioner", n: "Pembuat Kuesioner Penelitian", c: "data", i: "📝", d: "Susun angket Likert/PG/terbuka, ekspor .doc & teks Google Form.", aktif: 1 },
  { id: "similarity", n: "Pre-Turnitin Similarity Checker (Lokal)", c: "tulis", i: "🔍", d: "Jaccard 3-gram: bandingkan teks asli vs parafrase + highlight.", aktif: 1 },
  { id: "regresi", n: "Regresi Berganda & Uji Asumsi Klasik", c: "data", i: "📈", d: "Regresi 2–4 variabel X + VIF, Glejser, normalitas residual.", aktif: 1 },
  { id: "inferens", n: "Uji Statistik Inferensial", c: "data", i: "📈", d: "Normalitas, uji-t, ANOVA, regresi + narasi Bab 4 otomatis.", aktif: 1 },
  { id: "deskriptif", n: "Statistik Deskriptif & Distribusi Frekuensi", c: "data", i: "📊", d: "Mean, median, kuartil, tabel frekuensi & kategorisasi skor + narasi.", aktif: 1 },
  { id: "nonpar", n: "Uji Statistik Non-Parametrik", c: "data", i: "📉", d: "Mann-Whitney, Wilcoxon, Kruskal-Wallis, Spearman + narasi Bab 4.", aktif: 1 },
  { id: "jurnal", n: "Pencari & Rak Jurnal", c: "tulis", i: "📚", d: "Cari jurnal (OpenAlex), sitasi dari DOI, rak referensi APA & BibTeX.", aktif: 1 },
  { id: "kisikisi", n: "Generator Kisi-Kisi & Operasionalisasi Variabel", c: "tulis", i: "🧩", d: "Susun tabel kisi-kisi instrumen Bab 3 (variabel–indikator–nomor item favorable/unfavorable) otomatis.", aktif: 1 },
  { id: "imrad", n: "Konverter Skripsi ke Jurnal (IMRAD)", c: "tulis", i: "📰", d: "Ubah ringkasan skripsimu (Bab 1–5) jadi draf artikel jurnal format IMRAD + cek proporsi kata ideal tiap bagian.", aktif: 1 },
  { id: "likert", n: "Konverter Skala Likert Massal", c: "data", i: "🔢", d: "Teks jawaban kuesioner ↔ skor angka 1–5 secara massal.", aktif: 1 },
  { id: "judul", n: "Generator Ide Judul Skripsi", c: "tulis", i: "💡", d: "Puluhan pola judul dari variabel X, Y, lokasi & metode.", aktif: 1 },
  { id: "singkatan", n: "Pembuat Daftar Singkatan Otomatis", c: "tulis", i: "🔤", d: "Ekstrak akronim dari naskah jadi daftar singkatan A–Z.", aktif: 1 },
  { id: "k17", n: "Matriks Sintesis Jurnal Bab 2", c: "tulis", i: "🧾", d: "Tabel perbandingan jurnal untuk tinjauan pustaka, ekspor .doc/CSV.", aktif: 1 },
  { id: "tabelstat", n: "Generator Tabel Statistik Eksak (r, t, F, χ²)", c: "data", i: "📊", d: "Nilai tabel r/t/F/χ² eksak untuk N atau df berapa pun (misal N=137) + pembanding nilai hitungmu.", aktif: 1 },
  { id: "mediasi", n: "Uji Mediasi (Sobel) & Moderasi (MRA)", c: "data", i: "💧", d: "Uji Sobel untuk mediasi + regresi moderasi (MRA) dengan diagram jalur & narasi Bab 4 otomatis.", aktif: 1 },
  { id: "pengesahan", n: "Lembar Pengesahan & Pernyataan Bebas Plagiat", c: "tulis", i: "🖋️", d: "Buat lembar pengesahan skripsi & surat pernyataan bebas plagiat (ada kotak materai) — tinggal tanda tangan.", aktif: 1 },
  { id: "ojskit", n: "OJS Kit: Cover Letter & Matriks Reviewer Jurnal", c: "tulis", i: "✉️", d: "Siap submit jurnal: buat cover letter untuk editor OJS & matriks tanggapan reviewer dalam satu .doc.", aktif: 1 },
  { id: "bimbingan", n: "Lembar Bimbingan Skripsi", c: "tulis", i: "📔", d: "Kartu kendali konsultasi dosen, ekspor .doc berkop logo.", aktif: 1 },
  { id: "revisi", n: "Manajer Revisi Pasca-Sidang", c: "tulis", i: "🖊️", d: "Checklist revisi per penguji, progres, ekspor Lembar Revisi resmi.", aktif: 1 },
  { id: "k53", n: "CV ATS-Friendly Builder + Skor Struktural", c: "karir", i: "📄", d: "CV 1 kolom aman ATS + skor cek struktur instan.", aktif: 1 },
  { id: "k50", n: "Pembuat Surat Resmi & Motivation Letter", c: "karir", i: "✉️", d: "15 jenis surat: izin penelitian, UKT, cuti, sponsorship, undangan, rekomendasi, kuasa, dll.", aktif: 1 },
  { id: "chatdosen", n: "Generator Chat & Surat Izin Dosen (Bonus)", c: "karir", i: "💬", d: "Template chat sopan ke dosen + surat izin resmi.", aktif: 1 },
  { id: "ipk", n: "Simulator Target IPK (GPA Planner)", c: "karir", i: "🎓", d: "Proyeksi IP semester depan untuk target cumlaude.", aktif: 1 },
  { id: "transkrip", n: "Kalkulator IPK Transkrip & Cek Cum Laude", c: "karir", i: "🎓", d: "Tempel nilai mata kuliahmu — keluar IPK, IPS per semester, predikat kelulusan, dan cek syarat cum laude.", aktif: 1 },
  { id: "targetnilai", n: "Kalkulator Target Nilai Mata Kuliah", c: "karir", i: "🎯", d: "Hitung nilai UAS minimal untuk target A/B/C dari bobot penilaian.", aktif: 1 },
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
  { id: "k25", n: "Pembuat Bagan Kerangka Berpikir (X → Y)", c: "data", i: "🗺️", d: "Kotak variabel + panah hubungan + narasi, ekspor PNG.", aktif: 1 },
  { id: "k26", n: "Generator Grafik Bab 4 Arsiran (Batang & Pie)", c: "data", i: "📈", d: "Diagram arsiran hitam-putih, tetap jelas saat difotokopi.", aktif: 1 },
  { id: "k23", n: "Dummy Data Kuesioner Generator (Auto-Valid)", c: "data", i: "🧪", d: "Data simulasi latihan yang diverifikasi lolos Alpha target.", aktif: 1 },
  { id: "k24", n: "Pembersih Transkrip Wawancara & Analisis Teks", c: "data", i: "🎧", d: "Rapikan transkrip kualitatif + frekuensi kata narasumber.", aktif: 1 },
  { id: "koding", n: "Koding Kualitatif Transkrip", c: "data", i: "🏷️", d: "Beri kode segmen wawancara, hitung frekuensi tema, ekspor tabel.", aktif: 1 },
  { id: "consent", n: "Lembar Persetujuan Responden", c: "data", i: "🤝", d: "Informed consent etika penelitian, berkop logo, siap tanda tangan.", aktif: 1 },
  { id: "federer", n: "Kalkulator Sampel Eksperimen (Federer)", c: "data", i: "🧪", d: "Hitung sampel eksperimen (rumus Federer) + koreksi drop-out + pengacak kelompok perlakuan RAL/RAK.", aktif: 1 },
  { id: "bibtex", n: "Konverter Sitasi BibTeX/RIS ↔ APA/IEEE", c: "dokumen", i: "🔄", d: "Ubah file sitasi BibTeX/RIS (Mendeley/Zotero) jadi daftar pustaka APA/IEEE/Vancouver — dan sebaliknya.", aktif: 1 },
  { id: "poster", n: "Pembuat Poster Ilmiah Seminar/PKM", c: "dokumen", i: "🖼️", d: "Buat poster ilmiah seminar/PKM resolusi tinggi: abstrak, metode, temuan, QR code — unduh PNG siap cetak.", aktif: 1 },
  { id: "k27", n: "Outline Makalah ke PowerPoint (.pptx)", c: "present", i: "🖥️", d: "Poin makalah → file presentasi .pptx asli per bab.", aktif: 1 },
  { id: "teleprompter", n: "Teleprompter & Timer Sidang", c: "present", i: "🎤", d: "Teks berjalan otomatis + estimasi kata per menit.", aktif: 1 },
  { id: "k28", n: "Simulasi Pertanyaan Penguji Sidang (18+ Soal)", c: "present", i: "🎓", d: "Bank soal jebakan penguji + kerangka jawaban + timer.", aktif: 1 },
  { id: "tanyajawab", n: "Prediksi Pertanyaan Sidang dari Abstrak", c: "present", i: "🎯", d: "Tempel abstrak skripsimu — keluar daftar pertanyaan yang paling mungkin ditanya penguji + kerangka cara menjawabnya.", aktif: 1 },
  { id: "k37", n: "Pas Foto & Ganti Background", c: "dokumen", i: "🖼️", d: "Background merah #DB1514 / biru #0054A6, ukuran 300 DPI.", aktif: 1 },
  { id: "k43", n: "Penggabung PDF (Merger)", c: "dokumen", i: "🔗", d: "Gabungkan banyak PDF berkas jadi satu file utuh.", aktif: 1 },
  { id: "splitpdf", n: "Ekstrak Halaman PDF Tertentu", c: "dokumen", i: "✂️", d: "Ambil halaman pilihan (mis. 1-3,5) dari PDF besar.", aktif: 1 },
  { id: "imgpdf", n: "Konverter Gambar ke PDF", c: "dokumen", i: "🖨️", d: "Kumpulan foto dokumen → satu PDF A4 rapi per halaman.", aktif: 1 },
  { id: "k44", n: "Kompresor File (Gambar / PDF / DOCX)", c: "dokumen", i: "🗜️", d: "Perkecil gambar, PDF, dan .docx langsung di browser.", aktif: 1 },
  { id: "pdfstamp", n: "Nomor Halaman & Watermark PDF", c: "dokumen", i: "🔢", d: "Beri nomor halaman & cap watermark pada PDF yang di-upload.", aktif: 1 },
  { id: "k41", n: "Generator QR Code Permanen (+ Logo)", c: "dokumen", i: "🔳", d: "QR link kuesioner ECC-H, bisa sisip logo di tengah.", aktif: 1 },
  { id: "k42", n: "OCR Gambar Buku / Catatan ke Teks", c: "dokumen", i: "🔍", d: "Foto halaman → teks bisa copy (Tesseract.js, ID/EN).", aktif: 1 },
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
  { id: "k39", n: "Grid Foto Dokumentasi Lampiran", c: "dokumen", i: "🧩", d: "Banyak foto + caption → satu gambar lampiran rapi.", aktif: 1 },
  { id: "k40", n: "Timestamp & Geotagging Foto", c: "dokumen", i: "🕒", d: "Tempel waktu & lokasi ala kamera lapangan ke foto tugas.", aktif: 1 },
  { id: "k38", n: "Pembuat Tanda Tangan Transparan PNG", c: "dokumen", i: "✍️", d: "Buang latar kertas via luminansi → PNG transparan.", aktif: 1 },
  { id: "k45", n: "Wallpaper Jadwal Kuliah / KRS (Bonus)", c: "karir", i: "📱", d: "Jadwal kuliah jadi wallpaper HP 1080×1920.", aktif: 1 },
  { id: "k54", n: "Checklist Syarat Yudisium & Sidang", c: "karir", i: "✅", d: "14+ syarat kelulusan, progres tersimpan otomatis.", aktif: 1 },
  { id: "k52", n: "Kalender Akademik & Pengingat Deadline (Bonus)", c: "karir", i: "📆", d: "Kalender + hitung mundur H-x + ekspor .ics.", aktif: 1 },
  { id: "masastudi", n: "Kalkulator Sisa Masa Studi & Risiko DO", c: "karir", i: "⏳", d: "Hitung sisa SKS & sisa semestermu: tempo minimal per semester supaya lulus tepat waktu — dan seberapa besar risiko DO-mu.", aktif: 1 },
  { id: "sks", n: "Konverter SKS MBKM / Kampus Merdeka", c: "karir", i: "🔄", d: "Konversi jam magang/KKN/studi independen ke penyetaraan SKS.", aktif: 1 },
  { id: "biaya", n: "Kalkulator Target Biaya Kuliah", c: "karir", i: "🎯", d: "Total sisa biaya kuliah jadi target tabungan per bulan.", aktif: 1 },
  { id: "combo55", n: "Budget Anak Kos + Terbilang & Romawi", c: "karir", i: "💰", d: "Jatah aman makan harian + konverter terbilang & angka Romawi.", aktif: 1 },
  { id: "k51", n: "Simulasi Wawancara Kerja (Metode STAR)", c: "karir", i: "🤝", d: "Latihan wawancara + timer 90 detik + kerangka STAR.", aktif: 1 },
  { id: "humanizer", n: "Humanizer & Editor Variasi Kalimat", c: "anti", i: "🪶", d: "Editor per kalimat + saran ritme + kamus klik-ganti 50+ kata klise AI.", aktif: 1 },
  { id: "scrubber", n: "Pembersih Jejak & Karakter Tersembunyi AI", c: "anti", i: "🧽", d: "Hapus zero-width, NBSP, markdown sisa & artefak copy-paste LLM dalam 1 klik.", aktif: 1 },
  { id: "sitasi", n: "Verifikator Keaslian Daftar Pustaka (Crossref)", c: "anti", i: "🔎", d: "Cek tiap sitasi ke Crossref: jurnal asli atau potensi halusinasi AI.", aktif: 1 },
  { id: "ceksitasi", n: "Pengecek Sitasi In-Text vs Daftar Pustaka", c: "anti", i: "🔍", d: "Cek dua arah: sitasi yang kamu kutip di teks tapi tidak ada di daftar pustaka (dan sebaliknya) langsung ketahuan.", aktif: 1 },
  { id: "deklarasi", n: "Generator Deklarasi Penggunaan AI", c: "anti", i: "📜", d: "Pernyataan etis penggunaan AI versi skripsi kampus & jurnal internasional.", aktif: 1 },
  { id: "buktiketik", n: "Editor Bukti Ketikan Mandiri (Authorship Proof)", c: "anti", i: "⌨️", d: "Rekam proses mengetikmu (ketukan, koreksi, paste) → sertifikat bukti penulisan.", aktif: 1 },
  { id: "k46", n: "Mind Map Generator (SVG Radial)", c: "present", i: "🧠", d: "Topik + sub-topik → peta konsep bercabang warna, unduh PNG.", aktif: 1 },
  { id: "k47", n: "Kuis Pilihan Ganda & Flashcard Otomatis", c: "present", i: "🎯", d: "Catatan → kuis berpengecoh otomatis + flashcard bolak-balik.", aktif: 1 },
  { id: "k48", n: "Cornell Notes Generator", c: "present", i: "📓", d: "Catatan metode Cornell: isyarat, catatan, ringkasan.", aktif: 1 },
  { id: "k49", n: "Pomodoro Timer + Suara Fokus Web Audio", c: "present", i: "🍅", d: "Timer 25/5 + white/brown noise & hujan prosedural.", aktif: 1 },
  { id: "k29", n: "Roda Undian Urutan Presentasi", c: "present", i: "🎡", d: "Spin wheel pengundi giliran kelompok presentasi.", aktif: 1 },
  { id: "k55", n: "Flashcard Cetak (Duplex A4)", c: "present", i: "🃏", d: "Lembar A4 depan–belakang tercermin, siap cetak & gunting.", aktif: 1 },
  { id: "cloze", n: "Generator Soal Rumpang (Cloze)", c: "present", i: "✏️", d: "Soal isian titik-titik otomatis dari teks materi + kunci.", aktif: 1 }

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

/* ---------------- tampilan grid/ringkas, recent, peta jalan ---------------- */
let viewMode = store.get("mt_view", "grid");
let roadmapOn = false;
function toolRow(t) {
  const fav = favs.has(t.id);
  return '<article class="relative flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-3 cursor-pointer transition hover:border-slate-300 dark:hover:border-slate-600" onclick="openTool(\'' + t.id + '\')">'
    + '<div class="mono-box mono-sm shrink-0">' + monoOf(t) + "</div>"
    + '<div class="flex-1 min-w-0"><h3 class="font-bold text-[13.5px] leading-tight truncate text-slate-900 dark:text-white">' + esc(t.n) + "</h3>"
    + '<p class="text-[12px] text-slate-500 dark:text-slate-400 truncate mt-0.5">' + esc(t.d) + "</p></div>"
    + '<span class="text-[10.5px] font-semibold text-slate-400 dark:text-slate-500 hidden md:block shrink-0">' + CATNAME[t.c] + "</span>"
    + '<button onclick="event.stopPropagation();toggleFav(\'' + t.id + '\')" title="Pin ke Favorit" class="shrink-0 w-7 h-7 grid place-items-center ' + (fav ? "text-amber-500" : "text-slate-300 dark:text-slate-600 hover:text-amber-500") + ' transition">' + (fav ? "★" : "☆") + "</button></article>";
}
function setView(v) { viewMode = v; store.set("mt_view", v); syncViewBtns(); renderGrid(); }
function syncViewBtns() {
  const g = $("#viewGridBtn"), l = $("#viewListBtn"); if (!g || !l) return;
  const base = "text-[11.5px] font-semibold px-2.5 py-1.5 rounded-lg border transition ";
  const on = "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white";
  const off = "bg-white text-slate-500 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700";
  g.className = base + (viewMode === "grid" ? on : off);
  l.className = base + (viewMode === "list" ? on : off);
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
  row.innerHTML = items.map((t) => '<button onclick="openTool(\'' + t.id + '\')" class="shrink-0 flex items-center gap-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-2 pr-3.5 py-2 text-left hover:border-slate-300 dark:hover:border-slate-600 transition"><span class="mono-box mono-sm">' + monoOf(t) + '</span><span class="min-w-0"><span class="block text-[12.5px] font-bold leading-tight max-w-[160px] truncate text-slate-800 dark:text-slate-100">' + esc(t.n) + '</span><span class="block text-[10.5px] text-slate-400 mt-0.5">' + CATNAME[t.c] + "</span></span></button>").join("");
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
    + ROADMAP.map((s, idx) => '<div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 mb-3.5"><div class="flex items-center gap-3"><span class="w-8 h-8 rounded-full bg-indigo-600 text-white grid place-items-center font-extrabold text-sm shrink-0">' + (idx + 1) + '</span><h3 class="font-bold text-[15px]">' + s.t + '</h3></div><p class="text-[13px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">' + s.d + '</p><div class="flex flex-wrap gap-2 mt-3.5">' + s.ids.map((id) => { const t = TOOLS.find((x) => x.id === id); if (!t) return ""; return '<button onclick="openTool(\'' + id + '\')" class="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-full pl-1.5 pr-3 py-1.5 text-[12.5px] font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-500 transition"><span class="mono-box mono-xs">' + monoOf(t) + "</span>" + esc(t.n) + "</button>"; }).join("") + "</div></div>").join("");
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
    + '<div class="mono-box mb-3.5">' + monoOf(t) + "</div>"
    + '<h3 class="font-bold text-[15px] leading-snug pr-5 text-slate-900 dark:text-white">' + esc(t.n) + "</h3>"
    + '<p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">' + esc(t.d) + "</p>"
    + '<div class="mt-4 flex items-center gap-2">'
    + '<span class="text-[10px] font-bold tracking-wide text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 rounded-full px-2 py-0.5">● AKTIF</span>'
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
  if (curCat === "all" && !curQuery) {
    $("#grid").innerHTML = CATS.filter((c) => c.k !== "fav" && c.k !== "all").map((c) => {
      const items = list.filter((t) => t.c === c.k);
      if (!items.length) return "";
      return '<div class="mb-9"><div class="flex items-center gap-3 mb-3"><h2 class="text-[13px] font-bold tracking-wide text-slate-700 dark:text-slate-200">' + c.n + '</h2><span class="text-[11px] font-bold text-slate-400">' + items.length + ' tool</span><span class="flex-1 h-px bg-slate-200 dark:bg-slate-800"></span></div><div class="' + wrapCls + '">' + items.map(cardFn).join("") + "</div></div>";
    }).join("");
  } else {
    $("#grid").innerHTML = '<div class="' + wrapCls + '">' + list.map(cardFn).join("") + "</div>";
  }
  $("#gridEmpty").classList.toggle("hidden", list.length > 0);
  $("#gridInfo").textContent = curCat === "fav" && !favs.size ? "Belum ada favorit — klik ikon ☆ pada kartu tool untuk mem-pin di sini." : "Menampilkan " + list.length + " dari " + TOOLS.length + " tools" + (curQuery ? ' untuk pencarian "' + curQuery + '"' : "") + ". Semua tool berstatus AKTIF dan siap dipakai.";
}
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
  $("#wsIcon").textContent = monoOf(t); $("#wsTitle").textContent = t.n; $("#wsDesc").textContent = t.d;
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


/* ============================================================
   ARSITEKTUR BRIEF: statistik dinamis, Web Share API,
   Back-Button Trap untuk modal, tombol bagikan di modal
   ============================================================ */
(function () {
  const st = document.getElementById("statTools");
  if (st) st.textContent = TOOLS.length + " Tools Akademik";
})();
function toolUrl(id) { const s = (window.TOOL_SLUGS || {})[id]; return s ? "https://detta2.github.io/mahasiswatools/tools/" + s + "/" : "https://detta2.github.io/mahasiswatools/"; }
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
