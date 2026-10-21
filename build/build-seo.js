/* ============================================================
   build-seo.js — Generator halaman statis SEO per tool
   Menghasilkan: tools/<slug>/index.html (85 halaman), slugs.js,
   sitemap.xml, robots.txt — dari katalog TOOLS di app.js.
   Jalankan: node build/build-seo.js  (setelah itu rebuild style.css)
   ============================================================ */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const BASE = "https://detta2.github.io/mahasiswatools";

/* --- ekstrak TOOLS dari app.js (scan kurung seimbang) --- */
const appSrc = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
const start = appSrc.indexOf("const TOOLS = ");
if (start < 0) throw new Error("TOOLS tidak ditemukan di app.js");
let i = appSrc.indexOf("[", start), depth = 0, end = -1, inStr = null, escaped = false;
for (let j = i; j < appSrc.length; j++) {
  const ch = appSrc[j];
  if (inStr) { if (escaped) escaped = false; else if (ch === "\\") escaped = true; else if (ch === inStr) inStr = null; continue; }
  if (ch === '"' || ch === "'" || ch === "`") { inStr = ch; continue; }
  if (ch === "[") depth++;
  if (ch === "]") { depth--; if (depth === 0) { end = j; break; } }
}
const TOOLS = eval(appSrc.slice(i, end + 1));
const CATNAME = { anti: "Kit Anti-AI & Keaslian", tulis: "Penulisan & Skripsi", data: "Olah Data & Penelitian", present: "Presentasi & Sidang", kelompok: "Tugas Kelompok & KKN", dokumen: "Dokumen, PDF & Gambar", karir: "Akademik, Karir & Harian" };

function slugify(n) {
  let s = n.toLowerCase().replace(/&/g, " dan ").replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return s || "tool";
}
const used = new Set();
const slugs = {};
TOOLS.forEach((t) => {
  let s = slugify(t.n);
  if (used.has(s)) { let k = 2; while (used.has(s + "-" + k)) k++; s = s + "-" + k; }
  used.add(s); slugs[t.id] = s;
});

const esc = (s) => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* --- kerangka panduan per kategori (±380 kata per halaman bersama intro & FAQ) --- */
const PANDUAN = {
  data: {
    kapan: "Tool ini dipakai pada tahap pengolahan dan analisis data penelitian, terutama saat menyusun Bab III (metode) dan Bab IV (hasil dan pembahasan) skripsi atau laporan penelitian. Mahasiswa program studi ekonomi, manajemen, psikologi, pendidikan, dan ilmu sosial umumnya wajib menyajikan hasil olah data yang dapat dipertanggungjawabkan secara metodologis di hadapan dosen pembimbing dan penguji.",
    cara: ["Siapkan data penelitianmu dalam format yang diminta tool (angka dipisah spasi, koma, atau baris baru; satu baris untuk satu responden).", "Tempel atau ketik data pada area kerja di bagian atas halaman ini, lalu tekan tombol proses/hitung.", "Baca hasil perhitungan beserta tabel dan narasi interpretasi yang dihasilkan secara otomatis.", "Salin narasi ke naskah Bab IV kamu, lalu sesuaikan redaksinya dengan gaya bahasa dan temuan penelitianmu."],
    manfaat: "Seluruh perhitungan berjalan lokal di browser dengan rumus statistik baku yang sama seperti yang dipakai perangkat lunak statistik pada umumnya, sehingga hasil dapat diverifikasi ulang secara manual. Narasi otomatis membantu mahasiswa yang baru pertama kali menulis interpretasi hasil penelitian, sekaligus menghemat waktu berjam-jam dibanding menghitung dan mengetik tabel satu per satu."
  },
  tulis: {
    kapan: "Tool ini dipakai selama proses penulisan karya ilmiah — mulai dari menyusun proposal, mengerjakan bab demi bab, sampai menyiapkan dokumen resmi untuk dosen, kampus, atau instansi tempat penelitian. Tahap penulisan adalah tahap terpanjang dalam skripsi, dan tool semacam ini membantu menjaga format serta kelengkapan dokumen tetap sesuai kaidah akademik.",
    cara: ["Isi kolom-kolom yang tersedia pada area kerja di atas sesuai data dan kebutuhan dokumenmu.", "Periksa pratinjau hasil yang muncul — sebagian tool menampilkan pratinjau langsung saat kamu mengetik.", "Unduh hasil akhir sebagai dokumen, atau salin teksnya untuk ditempel ke pengolah kata yang kamu gunakan.", "Lakukan penyuntingan akhir seperlunya (nama, tanggal, dan detail khas kampusmu) sebelum dokumen dikumpulkan."],
    manfaat: "Dokumen dihasilkan mengikuti konvensi dokumen akademik Indonesia — termasuk kop institusi bila kamu sudah mengunggah logo kampus melalui fitur logo bersama di aplikasi utama. Karena semua proses berjalan di browser tanpa unggah ke server, draf skripsi dan surat-suratmu tetap privat dan aman."
  },
  anti: {
    kapan: "Kelompok tool ini dipakai sebelum naskah dikumpulkan: untuk memeriksa risiko tulisan terdeteksi sebagai hasil AI, membersihkan artefak teks dari hasil salin-tempel, memverifikasi keaslian sitasi, dan mendokumentasikan proses penulisan yang jujur. Di tengah ketatnya kebijakan integritas akademik kampus, bukti proses dan pemeriksaan mandiri menjadi pelindung penting bagi mahasiswa.",
    cara: ["Tempel teks atau data yang ingin diperiksa pada area kerja di bagian atas halaman ini.", "Jalankan pemeriksaan dan baca skor beserta penjelasan indikatornya secara saksama.", "Perbaiki bagian yang ditandai berisiko dengan tulisanmu sendiri — tool ini membantu memeriksa, bukan menyamarkan.", "Simpan atau unduh laporan/deklarasi hasilnya sebagai lampiran pendukung bila kampusmu memintanya."],
    manfaat: "Pemeriksaan bersifat heuristik dan lokal — tidak ada teks yang dikirim ke server — sehingga hasilnya adalah bahan refleksi yang jujur untuk penulis, bukan alat mengakali detektor. Verifikasi sitasi pada kelompok ini benar-benar memeriksa basis data ilmiah publik, sehingga referensi palsu atau salah ketik dapat ditemukan sebelum dibaca penguji."
  },
  present: {
    kapan: "Tool ini dipakai pada masa persiapan dan pelaksanaan presentasi akademik: seminar proposal, sidang skripsi, presentasi kelas, sampai latihan menjawab pertanyaan penguji. Persiapan yang matang pada tahap ini sangat menentukan kelancaran sidang, karena sebagian besar kegugupan muncul dari ketidaksiapan materi dan manajemen waktu.",
    cara: ["Siapkan bahan presentasi atau materi belajarmu, lalu isi pada area kerja di bagian atas halaman ini.", "Ikuti alur tool — sebagian menyediakan mode latihan dengan pewaktu agar simulasi terasa seperti sidang sungguhan.", "Ulangi latihan beberapa kali sampai kamu nyaman dengan alur dan durasi penyampaianmu.", "Unduh atau salin hasil akhir (slide, soal latihan, atau naskah) untuk dipakai pada hari pelaksanaan."],
    manfaat: "Latihan terstruktur dengan bahan dari naskahmu sendiri jauh lebih efektif daripada sekadar membaca ulang. Tool pada kelompok ini dirancang untuk mengubah materi pasif menjadi sesi latihan aktif — lengkap dengan pewaktu, skor, atau pratinjau — sehingga kamu datang ke ruang sidang dengan persiapan yang terukur."
  },
  kelompok: {
    kapan: "Tool ini dipakai untuk tugas kelompok, kegiatan KKN, dan kepanitiaan organisasi mahasiswa (UKM, himpunan, BEM) — situasi di mana banyak orang harus berkoordinasi menghasilkan satu keluaran resmi: dokumen acara, laporan keuangan kegiatan, jadwal bersama, atau pembagian tugas yang adil dan terdokumentasi.",
    cara: ["Kumpulkan data kelompok atau kegiatanmu (nama anggota, daftar hadir, rencana anggaran, atau jadwal).", "Isi atau tempel data tersebut pada area kerja di bagian atas halaman ini.", "Periksa hasil yang dihasilkan — tabel, dokumen, atau visualisasi — bersama anggota kelompok bila perlu.", "Unduh dokumen final untuk dibagikan ke grup atau diserahkan ke dosen/pembina/kampus."],
    manfaat: "Dokumen kegiatan yang rapi dan konsisten formatnya memudahkan pertanggungjawaban ke kampus dan pembina. Dengan format baku yang dihasilkan otomatis, panitia tidak perlu lagi menyusun ulang dari nol untuk setiap kegiatan, dan arsip kegiatan tersimpan lebih tertata dari tahun ke tahun."
  },
  dokumen: {
    kapan: "Tool ini dipakai setiap kali mahasiswa berurusan dengan berkas: melampirkan dokumen skripsi, menyiapkan berkas lamaran magang atau beasiswa, mengurus administrasi kampus, sampai membuat aset visual seperti pas foto resmi, sertifikat, dan kode QR. Kebutuhan dokumen yang benar formatnya sering muncul mendadak dengan tenggat ketat.",
    cara: ["Unggah berkas yang ingin diproses melalui tombol unggah pada area kerja di bagian atas halaman ini.", "Atur pilihan yang tersedia (ukuran, posisi, format keluaran) sesuai kebutuhan instansi tujuan.", "Pratinjau hasilnya bila tersedia, lalu unduh berkas final ke perangkatmu.", "Periksa kembali berkas hasil unduhan sebelum dikirim atau dicetak."],
    manfaat: "Seluruh pemrosesan berkas berjalan 100% lokal di browser menggunakan pustaka pengolah dokumen modern — berkas sensitif seperti ijazah, transkrip, dan dokumen pribadi tidak pernah diunggah ke server mana pun. Ini membedakannya dari banyak situs pengolah berkas gratis yang memproses dokumen di server mereka."
  },
  karir: {
    kapan: "Tool ini dipakai untuk mengelola kehidupan akademik dan langkah awal karier: merencanakan nilai dan kelulusan, menghitung kebutuhan biaya, menyusun dokumen lamaran, serta mempersiapkan diri menghadapi seleksi magang dan pekerjaan. Perencanaan yang terukur sejak masa kuliah membuat keputusan semester akhir jauh lebih ringan.",
    cara: ["Isi data akademik atau rencanamu pada area kerja di bagian atas halaman ini sesuai petunjuk tiap kolom.", "Baca hasil perhitungan atau dokumen yang dihasilkan, termasuk penjelasan asumsi yang dipakai.", "Simpan hasilnya (sebagian tool menyimpan data secara otomatis di browser) atau unduh sebagai berkas/gambar.", "Tinjau ulang secara berkala — misalnya tiap awal semester — agar rencanamu tetap sesuai kondisi terbaru."],
    manfaat: "Angka-angka perencanaan (target nilai, biaya, penyetaraan kredit) ditampilkan transparan beserta rumusnya, sehingga kamu bisa mendiskusikannya dengan dosen wali atau orang tua berdasarkan data, bukan perkiraan. Semua tersimpan lokal dan dapat dicadangkan melalui fitur Backup Data di aplikasi utama."
  }
};

function faqFor(t) {
  return [
    ["Apakah " + t.n + " ini gratis digunakan?", "Ya, 100% gratis tanpa login, tanpa watermark, dan tanpa batas jumlah penggunaan. " + t.n + " adalah bagian dari MahasiswaTools, portal utilitas akademik yang dibuat dari mahasiswa untuk mahasiswa."],
    ["Apakah data yang saya masukkan aman?", "Aman. Tool ini berjalan sepenuhnya di browser perangkatmu — data yang kamu ketik, tempel, atau unggah tidak dikirim ke server mana pun dan tidak disimpan di luar perangkatmu, kecuali fitur yang memang kamu simpan sendiri di browser."],
    ["Bagaimana cara menggunakan " + t.n + "?", "Tool sudah langsung terbuka di bagian atas halaman ini. Cukup isi data pada kolom yang tersedia, tekan tombol proses, lalu periksa dan unduh/salin hasilnya. Tidak perlu memasang aplikasi tambahan apa pun."]
  ];
}

function pageFor(t) {
  const slug = slugs[t.id];
  const url = BASE + "/tools/" + slug + "/";
  const p = PANDUAN[t.c] || PANDUAN.tulis;
  const faqs = faqFor(t);
  const terkait = TOOLS.filter((x) => x.c === t.c && x.id !== t.id).slice(0, 5);
  const judul = t.n + " Online Gratis — MahasiswaTools";
  const desk = t.d + " Gratis, tanpa login dan tanpa watermark, langsung dari browser. Bagian dari MahasiswaTools — Dari Mahasiswa, Untuk Mahasiswa.";
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "SoftwareApplication", name: t.n + " — MahasiswaTools", applicationCategory: "EducationalApplication", operatingSystem: "Web Browser", offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" }, url, description: t.d },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }
  ];
  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(judul)}</title>
<meta name="description" content="${esc(desk)}">
<meta name="google-site-verification" content="NwryzLwTbI3z3snM5yOTWtQFbcRExZVpm91PQWon30o">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(judul)}">
<meta property="og:description" content="${esc(desk)}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary">
<link rel="stylesheet" href="../../style.css">
<link rel="icon" type="image/svg+xml" href="../../favicon.svg">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body class="bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 antialiased">
<header class="backdrop-blur-md bg-white/80 dark:bg-[#0B0F19]/85 border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-40">
  <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
    <a href="../../" class="flex items-center gap-2 font-semibold text-[17px] tracking-tight"><svg width="30" height="30" viewBox="0 0 256 256" aria-hidden="true"><path d="M128 40 L240 96 L128 152 L16 96 Z" fill="#4F46E5"/><path d="M66 124 L128 158 L190 124 L190 168 C190 194 162 210 128 210 C94 210 66 194 66 168 Z" fill="#4F46E5"/><path d="M224 96 L224 138" stroke="#4F46E5" stroke-width="13" stroke-linecap="round"/><path d="M206 152 L222 168 L246 138" fill="none" stroke="#4F46E5" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/></svg>Mahasiswa<span class="font-extrabold text-indigo-600 dark:text-indigo-400 -ml-2">Tools</span></a>
    <a href="../../" class="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-4">← Lihat Semua 85 Tool</a>
  </div>
</header>
<main class="max-w-5xl mx-auto px-4 py-6">
  <p class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Beranda / ${esc(CATNAME[t.c] || "Tool")} / ${esc(t.n)}</p>
  <h1 class="display-font text-3xl sm:text-4xl font-black leading-tight mb-2.5">${esc(t.n)}</h1>
  <p class="text-[15px] leading-relaxed mb-5 max-w-3xl">${esc(t.d)} Tool ini gratis digunakan langsung dari browser tanpa login dan tanpa watermark — semua proses berjalan di perangkatmu sendiri.</p>
  <section aria-label="Area kerja tool" class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-4 sm:p-6 mb-8">
    <div id="toolRoot"><p class="font-bold">⏳ Memuat tool… pastikan JavaScript aktif. Bila tool tidak muncul, buka melalui <a class="underline" href="../../#${t.id}">aplikasi utama MahasiswaTools</a>.</p></div>
  </section>
  <article class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-5 sm:p-7 leading-relaxed text-[15px]">
    <h2 class="display-font text-xl font-black mb-2.5">Kapan Tool Ini Digunakan?</h2>
    <p class="mb-5">${esc(p.kapan)}</p>
    <h2 class="display-font text-xl font-black mb-2.5">Cara Menggunakan ${esc(t.n)}</h2>
    <ol class="list-decimal ml-5 space-y-1.5 mb-5">${p.cara.map((s) => "<li>" + esc(s) + "</li>").join("")}</ol>
    <h2 class="display-font text-xl font-black mb-2.5">Manfaat & Keunggulan</h2>
    <p class="mb-5">${esc(p.manfaat)}</p>
    <h2 class="display-font text-xl font-black mb-2.5">Pertanyaan yang Sering Diajukan</h2>
    ${faqs.map(([q, a]) => "<h3 class=\"font-extrabold mt-3.5 mb-1\">" + esc(q) + "</h3><p>" + esc(a) + "</p>").join("\n    ")}
    <h2 class="display-font text-xl font-black mt-6 mb-2.5">Tool Terkait</h2>
    <ul class="list-disc ml-5 space-y-1">${terkait.map((x) => '<li><a class="underline font-semibold" href="../' + slugs[x.id] + '/">' + esc(x.n) + "</a> — " + esc(x.d) + "</li>").join("")}</ul>
  </article>
  <p class="text-center text-sm font-bold mt-7">MahasiswaTools — Dari Mahasiswa, Untuk Mahasiswa • <a class="underline" href="../../">Buka portal lengkap (85 tool)</a></p>
</main>
<script>window.__MT_TOOL_ID__ = "${t.id}";</script>
<script src="../../slugs.js"></script>
<script src="../../app.js"></script>
</body>
</html>
`;
}

/* --- tulis semua keluaran --- */
fs.mkdirSync(path.join(ROOT, "tools"), { recursive: true });
TOOLS.forEach((t) => {
  const dir = path.join(ROOT, "tools", slugs[t.id]);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), pageFor(t));
});
fs.writeFileSync(path.join(ROOT, "slugs.js"), "window.TOOL_SLUGS = " + JSON.stringify(slugs, null, 1) + ";\n");
const today = new Date().toISOString().slice(0, 10);
const urls = [BASE + "/"].concat(TOOLS.map((t) => BASE + "/tools/" + slugs[t.id] + "/"));
fs.writeFileSync(path.join(ROOT, "sitemap.xml"),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  + urls.map((u) => "  <url><loc>" + u + "</loc><lastmod>" + today + "</lastmod></url>").join("\n") + "\n</urlset>\n");
fs.writeFileSync(path.join(ROOT, "robots.txt"), "User-agent: *\nAllow: /\n\nSitemap: " + BASE + "/sitemap.xml\n");
console.log("SELESAI:", TOOLS.length, "halaman tool + slugs.js + sitemap.xml (" + urls.length + " URL) + robots.txt");
