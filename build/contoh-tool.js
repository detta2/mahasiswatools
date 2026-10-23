/* ============================================================
   contoh-tool.js — Dataset CONTOH terpusat MahasiswaTools.
   Satu sumber untuk dua pemakai:
   1) Aplikasi (build-seo.js menserialisasi bagian `isi` menjadi
      contoh-data.js → window.MT_CONTOH → tombol "📝 Isi Contoh").
   2) Halaman statis SEO (build-seo.js merender bagian `tampil`
      menjadi seksi "Contoh Penggunaan").
   isi.fields : peta selector CSS → nilai (string; boolean untuk
                checkbox). isi.file : deskriptor berkas contoh yang
                dibuat dari Blob (teks/xlsx/pdf/png/pptx).
   isi.atur   : peta nama global window → nilai (state tool).
   isi.panggil: nama fungsi global yang dipanggil setelah pengisian.
   isi.klik   : { sel, kali } klik elemen setelah pengisian field.
   isi.langkah: urutan langkah campuran {isi}/{klik}/{isiBaris}/{panggil}
                untuk tool ber-state dinamis (mis. mind map).
   Semua contoh berbahasa Indonesia, konteks mahasiswa/skripsi,
   dan isinya JUJUR sesuai fungsi nyata tool (lihat app.js).
   ============================================================ */
module.exports = {

/* ================= ANTI ================= */
aidetect: {
  isi: { fields: { "#aiIn": "Di era digital yang berkembang pesat, teknologi informasi telah membawa perubahan yang sangat signifikan dalam berbagai aspek kehidupan manusia. Tidak dapat dipungkiri bahwa media sosial berperan penting dalam membentuk pola komunikasi dan interaksi sosial di kalangan generasi muda. Secara keseluruhan, pemanfaatan media sosial secara bijak dapat memberikan dampak positif yang komprehensif bagi perkembangan peserta didik. Penting untuk dicatat bahwa penggunaan media sosial yang berlebihan juga dapat menimbulkan berbagai dampak negatif apabila tidak dikelola dengan baik. Oleh karena itu, diperlukan kesadaran dan literasi digital yang memadai agar media sosial dapat dimanfaatkan secara optimal untuk mendukung proses pembelajaran." } },
  tampil: {
    input: "Di era digital yang berkembang pesat, teknologi informasi telah membawa perubahan yang sangat signifikan dalam berbagai aspek kehidupan manusia. Tidak dapat dipungkiri bahwa media sosial berperan penting dalam membentuk pola komunikasi dan interaksi sosial di kalangan generasi muda. Secara keseluruhan, pemanfaatan media sosial secara bijak dapat memberikan dampak positif yang komprehensif bagi perkembangan peserta didik. […]",
    hasil: "Tool menampilkan skor risiko deteksi AI beserta rincian burstiness, kekayaan kosakata, jumlah frasa klise yang ditemukan, grafik panjang kalimat, dan sentence heatmap yang menandai kalimat paling monoton — pada contoh ini skor risiko cenderung tinggi karena kalimatnya seragam dan penuh frasa klise khas AI."
  }
},
humanizer: {
  isi: { fields: { "#hmIn": "Pembelajaran daring merupakan salah satu bentuk inovasi dalam dunia pendidikan yang semakin berkembang seiring dengan kemajuan teknologi informasi dan komunikasi. Tidak dapat dipungkiri bahwa pembelajaran daring memberikan berbagai kemudahan bagi peserta didik maupun pendidik dalam melaksanakan proses belajar mengajar. Selain itu, pembelajaran daring juga dapat meningkatkan kemandirian belajar siswa karena siswa dituntut untuk lebih aktif dalam mencari dan memahami materi pembelajaran secara mandiri. Namun demikian, terdapat berbagai tantangan yang dihadapi dalam pelaksanaan pembelajaran daring, seperti keterbatasan akses internet dan kurangnya interaksi secara langsung antara guru dan siswa. Oleh karena itu, diperlukan upaya yang komprehensif dari berbagai pihak agar pembelajaran daring dapat berjalan secara efektif dan optimal." } },
  tampil: {
    input: "Pembelajaran daring merupakan salah satu bentuk inovasi dalam dunia pendidikan yang semakin berkembang seiring dengan kemajuan teknologi informasi dan komunikasi. Tidak dapat dipungkiri bahwa pembelajaran daring memberikan berbagai kemudahan bagi peserta didik maupun pendidik dalam melaksanakan proses belajar mengajar. Selain itu, pembelajaran daring juga dapat meningkatkan kemandirian belajar siswa […]",
    hasil: "Teks dipecah menjadi kalimat-kalimat terpisah di editor. Analisis ritme menunjukkan pola panjang kalimat yang seragam, dan kamus klise menyoroti frasa seperti 'tidak dapat dipungkiri' dan 'secara komprehensif' beserta saran sinonim alaminya — kamu mengedit tiap kalimat sendiri, lalu menggabungkannya kembali menjadi teks utuh."
  }
},
scrubber: {
  isi: { fields: { "#scIn": "Pentingnya **literasi digital** bagi mahasiswa​ di era modern ini tidak dapat dipungkiri. Berikut beberapa alasannya:\n\n## Manfaat Literasi Digital\n- Membantu menyaring informasi yang valid\n- Meningkatkan kemampuan berpikir kritis\n- Mendukung proses pembelajaran daring\n\nDengan demikian, literasi digital merupakan keterampilan yang **wajib** dimiliki oleh setiap mahasiswa." } },
  tampil: {
    input: "Pentingnya **literasi digital** bagi mahasiswa[karakter zero-width] di era modern ini tidak dapat dipungkiri. Berikut beberapa alasannya: ## Manfaat Literasi Digital - Membantu menyaring informasi yang valid - Meningkatkan kemampuan berpikir kritis […]",
    hasil: "Laporan artefak menunjukkan temuan karakter zero-width, spasi non-breaking (NBSP), dan sisa markdown (** dan ##). Setelah tombol Bersihkan Semuanya ditekan, teks menjadi bersih siap tempel ke Word — susunan kata dan maknanya tidak berubah sama sekali."
  }
},
sitasi: {
  isi: { fields: { "#ctIn": "Bandura, A. (1977). Self-efficacy: Toward a unifying theory of behavioral change. Psychological Review, 84(2), 191–215.\nDeci, E. L., & Ryan, R. M. (2000). The \"what\" and \"why\" of goal pursuits: Human needs and the self-determination of behavior. Psychological Inquiry, 11(4), 227–268.\nPrasetyo, B., & Trisyanti, U. (2018). Revolusi industri 4.0 dan tantangan perubahan sosial. IPTEK Journal of Proceedings Series, 5, 22–27.\nWijayanto, R. (2024). Pengaruh minum kopi terhadap kecepatan menyelesaikan skripsi dalam semalam. Jurnal Penelitian Fiktif Nusantara, 7(2), 112–129." } },
  tampil: {
    input: "Bandura, A. (1977). Self-efficacy: Toward a unifying theory of behavioral change. Psychological Review, 84(2), 191–215.\nDeci, E. L., & Ryan, R. M. (2000). The \"what\" and \"why\" of goal pursuits: Human needs and the self-determination of behavior. Psychological Inquiry, 11(4), 227–268.\nWijayanto, R. (2024). Pengaruh minum kopi terhadap kecepatan menyelesaikan skripsi dalam semalam. Jurnal Penelitian Fiktif Nusantara, 7(2), 112–129.",
    hasil: "Dua sitasi pertama terverifikasi kuat di Crossref. Sitasi berbahasa Indonesia dari prosiding bisa berstatus meragukan karena tidak semua terindeks Crossref. Sitasi terakhir — jurnal yang sebenarnya tidak pernah ada — berstatus tidak ditemukan, persis jenis referensi karangan AI yang harus kamu ganti sebelum naskah dikumpulkan."
  }
},
ceksitasi: {
  isi: { fields: {
    "#csTeks": "Prestasi belajar dipengaruhi oleh banyak faktor, baik internal maupun eksternal. Santoso (2021) menyatakan bahwa motivasi belajar merupakan faktor internal yang paling dominan dalam menentukan keberhasilan siswa. Selain itu, penggunaan media sosial yang tidak terkontrol dapat menurunkan konsentrasi belajar siswa (Rahmawati & Putri, 2022). Temuan ini sejalan dengan penelitian Lee (2020) yang menemukan hubungan negatif antara durasi penggunaan media sosial dan capaian akademik mahasiswa.",
    "#csRefs": "Nugroho, A. (2019). Manajemen kelas efektif untuk pembelajaran aktif. Jurnal Ilmu Pendidikan, 25(1), 33–41.\nRahmawati, D., & Putri, S. A. (2022). Dampak media sosial terhadap konsentrasi belajar siswa SMA. Jurnal Psikologi Pendidikan, 14(2), 101–112.\nSantoso, B. (2021). Motivasi belajar dan prestasi akademik mahasiswa. Jurnal Pendidikan Indonesia, 10(3), 210–219."
  } },
  tampil: {
    input: "Isi naskah: \"…Santoso (2021) menyatakan bahwa motivasi belajar merupakan faktor internal yang paling dominan… (Rahmawati & Putri, 2022). Temuan ini sejalan dengan penelitian Lee (2020)…\"\nDaftar pustaka: Nugroho (2019), Rahmawati & Putri (2022), Santoso (2021).",
    hasil: "Hasil pencocokan menunjukkan dua selisih: sitasi Lee (2020) dikutip di dalam teks tetapi tidak ada di daftar pustaka (harus ditambahkan), dan entri Nugroho (2019) ada di daftar pustaka tetapi tidak pernah dikutip di naskah (harus dikutip atau dihapus)."
  }
},
deklarasi: {
  isi: { fields: {
    "#dkNama": "Rani Puspita", "#dkNim": "2201010456",
    "#dkJudul": "Pengaruh Media Sosial terhadap Prestasi Belajar Siswa SMA Negeri 1 Palembang",
    "#dkKampus": "Universitas Cendekia Nusantara", "#dkAlat": "ChatGPT dan Grammarly"
  } },
  tampil: {
    input: "Nama: Rani Puspita • NIM: 2201010456 • Judul: Pengaruh Media Sosial terhadap Prestasi Belajar Siswa SMA Negeri 1 Palembang • Kampus: Universitas Cendekia Nusantara • Alat AI yang dipakai: ChatGPT dan Grammarly",
    hasil: "Tool menghasilkan naskah deklarasi penggunaan AI yang siap ditempel ke skripsi — tersedia dalam versi Bahasa Indonesia (untuk kampus) dan Bahasa Inggris (untuk jurnal internasional), lengkap dengan ruang tanda tangan."
  }
},
buktiketik: {
  tampil: {
    input: "Ketik langsung naskah Bab I pada Area Ketik Naskah (bukan ditempel) — tool merekam ketukan, koreksi, dan jeda mengetikmu sebagai bukti proses penulisan mandiri.",
    hasil: "Di akhir sesi kamu dapat mengekspor sertifikat bukti penulisan (.doc) berisi statistik ketikan: jumlah kata, ketukan, koreksi, dan pola paste — lampiran pendukung kejujuran akademik bila dosen atau penguji memintanya."
  }
},

/* ================= TULIS ================= */
dapus: {
  isi: { fields: {
    "#dPen": "Pratama, Andi & Sari, Dewi Lestari", "#dThn": "2023",
    "#dJud": "Pengaruh Media Sosial terhadap Prestasi Belajar Siswa SMA",
    "#dJur": "Jurnal Pendidikan Indonesia", "#dKota": "", "#dDoi": "Vol. 12, No. 1, hlm. 45–58"
  } },
  tampil: {
    input: "Penulis: Pratama, Andi & Sari, Dewi Lestari • Tahun: 2023 • Judul: Pengaruh Media Sosial terhadap Prestasi Belajar Siswa SMA • Jurnal: Jurnal Pendidikan Indonesia • DOI/Volume-Halaman: Vol. 12, No. 1, hlm. 45–58",
    hasil: "Setelah tombol Tambah ke Daftar ditekan, entri tampil terformat rapi: 'Pratama, Andi & Sari, Dewi Lestari (2023). Pengaruh Media Sosial terhadap Prestasi Belajar Siswa SMA. Jurnal Pendidikan Indonesia. Vol. 12, No. 1, hlm. 45–58' — nama jurnal otomatis dicetak miring, daftar tersusun A–Z dan tersimpan di browser, dan gaya dapat diganti ke MLA, Harvard, atau Vancouver dalam sekali klik."
  }
},
k16: {
  isi: { fields: {
    "#xJud": "Pengaruh Media Sosial terhadap Prestasi Belajar Siswa SMA Negeri 1 Palembang",
    "#xNama": "Rani Puspita", "#xNim": "2201010456", "#xProdi": "Pendidikan Ekonomi",
    "#xFak": "Fakultas Keguruan dan Ilmu Pendidikan", "#xUniv": "Universitas Cendekia Nusantara",
    "#xKota": "Palembang, 2026", "#xDospem": "Dr. Sari Wulandari, M.Pd."
  } },
  tampil: {
    input: "Judul: Pengaruh Media Sosial terhadap Prestasi Belajar Siswa SMA Negeri 1 Palembang • Nama: Rani Puspita • NIM: 2201010456 • Prodi: Pendidikan Ekonomi • Fakultas: Keguruan dan Ilmu Pendidikan • Universitas: Universitas Cendekia Nusantara • Dosen Pembimbing: Dr. Sari Wulandari, M.Pd.",
    hasil: "Tool mengunduh berkas .docx asli berisi kerangka skripsi lengkap — cover, lembar pengesahan, daftar isi, sampai Bab I–V — dengan margin 4-4-3-3 sesuai kaidah umum skripsi, siap kamu isi dan sunting di Word."
  }
},
proposal: {
  isi: { fields: {
    "#prJudul": "Pengaruh Media Sosial terhadap Prestasi Belajar Siswa SMA Negeri 1 Palembang",
    "#prNama": "Rani Puspita", "#prNim": "2201010456", "#prProdi": "Pendidikan Ekonomi",
    "#prKampus": "Universitas Cendekia Nusantara", "#prKota": "Palembang",
    "#prLatar": "Media sosial telah menjadi bagian tak terpisahkan dari kehidupan siswa. Rata-rata siswa menghabiskan lebih dari tiga jam per hari untuk mengakses media sosial, termasuk pada jam belajar. Di sisi lain, prestasi belajar siswa pada mata pelajaran ekonomi masih berada di bawah KKM. Kesenjangan inilah yang melatarbelakangi penelitian mengenai pengaruh media sosial terhadap prestasi belajar.",
    "#prRumusan": "Apakah terdapat pengaruh penggunaan media sosial terhadap prestasi belajar siswa SMA Negeri 1 Palembang?",
    "#prTujuan": "Untuk mengetahui pengaruh penggunaan media sosial terhadap prestasi belajar siswa SMA Negeri 1 Palembang.",
    "#prManfaat": "Secara teoretis, penelitian ini memperkaya kajian tentang faktor eksternal prestasi belajar. Secara praktis, hasil penelitian menjadi masukan bagi guru dan orang tua dalam mengarahkan penggunaan media sosial siswa.",
    "#prTinjauan": "Teori belajar sosial Bandura menjelaskan bahwa perilaku belajar dipengaruhi lingkungan, termasuk lingkungan digital. Penelitian Rahmawati (2022) menemukan hubungan negatif antara intensitas media sosial dan konsentrasi belajar.",
    "#prMetode": "Kuantitatif, metode survei, desain korelasional.",
    "#prSubjek": "Populasi seluruh siswa kelas XI SMA Negeri 1 Palembang (210 siswa); sampel 68 siswa dengan teknik proportional random sampling.",
    "#prInstrumen": "Angket skala Likert 5 untuk variabel media sosial dan prestasi belajar, diuji validitas dan reliabilitasnya.",
    "#prAnalisis": "Regresi linear sederhana dan uji t dengan bantuan perangkat lunak statistik.",
    "#prJadwal": "Penyusunan proposal: September 2026; pengumpulan data: Oktober 2026; analisis dan penulisan laporan: November 2026."
  } },
  tampil: {
    input: "Jenis proposal Penelitian, judul 'Pengaruh Media Sosial terhadap Prestasi Belajar Siswa SMA Negeri 1 Palembang', latar belakang tentang rata-rata siswa menghabiskan 3+ jam per hari di media sosial sementara nilai ekonomi masih di bawah KKM, rumusan masalah, tujuan, manfaat, tinjauan pustaka, metode survei korelasional, sampel 68 dari 210 siswa, instrumen angket Likert, dan jadwal penelitian.",
    hasil: "Tool menyusun proposal penelitian lengkap dalam berkas .docx — cover berlogo (bila logo kampus sudah dipasang), Bab I–III terstruktur, dan daftar pustaka awal — yang tinggal kamu sempurnakan isinya sebelum diserahkan ke dosen pembimbing."
  }
},
similarity: {
  isi: { fields: {
    "#simA": "Media sosial merupakan sarana komunikasi berbasis internet yang memungkinkan pengguna membuat dan berbagi konten serta berinteraksi dengan pengguna lain. Penggunaan media sosial di kalangan siswa terus meningkat dari tahun ke tahun. Beberapa penelitian menunjukkan bahwa penggunaan media sosial secara berlebihan dapat mengganggu konsentrasi belajar dan menurunkan prestasi akademik siswa.",
    "#simB": "Media sosial adalah media komunikasi daring yang memberi kesempatan bagi penggunanya untuk membuat konten, membagikannya, dan saling berinteraksi. Dari tahun ke tahun, pemakaian media sosial oleh siswa semakin bertambah. Sejumlah studi memperlihatkan bahwa pemakaian media sosial yang terlalu berlebihan bisa mengganggu fokus belajar serta menurunkan capaian akademik peserta didik."
  } },
  tampil: {
    input: "Teks A (asli): 'Media sosial merupakan sarana komunikasi berbasis internet yang memungkinkan pengguna membuat dan berbagi konten serta berinteraksi dengan pengguna lain…'\nTeks B (parafrase): 'Media sosial adalah media komunikasi daring yang memberi kesempatan bagi penggunanya untuk membuat konten, membagikannya, dan saling berinteraksi…'",
    hasil: "Tool menghitung persentase kemiripan Jaccard 3-gram antara kedua teks dan menyoroti rangkaian kata yang masih identik — parafrase contoh ini umumnya berkategori kemiripan sedang, dan highlight menunjukkan frasa persis yang sebaiknya ditulis ulang lebih jauh dengan bahasamu sendiri."
  }
},
jurnal: {
  isi: { fields: { "#juQ": "pengaruh media sosial terhadap prestasi belajar siswa" } },
  tampil: {
    input: "Kata kunci pencarian: pengaruh media sosial terhadap prestasi belajar siswa",
    hasil: "Tool menampilkan daftar jurnal dari OpenAlex yang relevan dengan kata kunci — lengkap dengan tahun, penulis, dan jumlah sitasi. Klik salah satu hasil untuk mengambil sitasinya dalam format APA atau BibTeX dan menyimpannya ke rak referensimu."
  }
},
kisikisi: {
  isi: { fields: { "#kkiIn": "Intensitas Media Sosial | Frekuensi dan durasi siswa mengakses media sosial setiap hari | Perilaku | Frekuensi membuka aplikasi, Durasi pemakaian | 2F/1U | Likert 5\nIntensitas Media Sosial | Frekuensi dan durasi siswa mengakses media sosial setiap hari | Tujuan | Kebutuhan informasi, Hiburan | 2F/0U | Likert 5\nPrestasi Belajar | Hasil belajar yang dicapai siswa pada mata pelajaran ekonomi | Kognitif | Nilai ulangan harian, Nilai UAS | 1F/1U | Tes" } },
  tampil: {
    input: "Intensitas Media Sosial | Frekuensi dan durasi siswa mengakses media sosial setiap hari | Perilaku | Frekuensi membuka aplikasi, Durasi pemakaian | 2F/1U | Likert 5 (dan dua baris variabel/dimensi lainnya)",
    hasil: "Tool menyusun tabel kisi-kisi instrumen Bab 3: variabel, definisi operasional, dimensi, indikator, dan nomor butir favorable/unfavorable dihitung otomatis dari kode 2F/1U — tabel siap diunduh sebagai .doc untuk ditempel ke naskah Bab III."
  }
},
imrad: {
  isi: { fields: {
    "#imrJudul": "Pengaruh Media Sosial terhadap Prestasi Belajar Siswa SMA Negeri 1 Palembang",
    "#imrPenulis": "Rani Puspita — Universitas Cendekia Nusantara",
    "#imrB1": "Media sosial digunakan hampir seluruh siswa setiap hari, dengan rata-rata durasi lebih dari tiga jam. Kondisi ini menimbulkan kekhawatiran mengenai dampaknya terhadap prestasi belajar, mengingat sebagian waktu belajar berpotensi tergeser oleh aktivitas di media sosial. Penelitian ini bertujuan menganalisis pengaruh penggunaan media sosial terhadap prestasi belajar siswa.",
    "#imrB2": "Teori belajar sosial Bandura menekankan peran lingkungan dalam membentuk perilaku belajar. Penelitian terdahulu menunjukkan hasil beragam: sebagian menemukan pengaruh negatif media sosial terhadap konsentrasi, sebagian lain menemukan manfaatnya sebagai sumber belajar tambahan.",
    "#imrB3": "Penelitian kuantitatif dengan metode survei. Sampel 68 siswa kelas XI dipilih dengan proportional random sampling. Data dikumpulkan melalui angket skala Likert dan dianalisis dengan regresi linear sederhana.",
    "#imrB4": "Hasil analisis menunjukkan koefisien regresi sebesar −0,412 dengan signifikansi 0,001 (p < 0,05), sehingga penggunaan media sosial berpengaruh negatif dan signifikan terhadap prestasi belajar. Nilai R² sebesar 0,286 menunjukkan 28,6% variasi prestasi belajar dijelaskan oleh penggunaan media sosial.",
    "#imrB5": "Penggunaan media sosial berpengaruh negatif dan signifikan terhadap prestasi belajar siswa. Siswa disarankan membatasi durasi media sosial pada jam belajar, dan penelitian selanjutnya dapat menambahkan variabel kontrol seperti motivasi belajar."
  } },
  tampil: {
    input: "Ringkasan Bab I–V skripsi 'Pengaruh Media Sosial terhadap Prestasi Belajar' — Bab IV berisi temuan koefisien regresi −0,412 (p = 0,001) dan R² = 0,286.",
    hasil: "Tool menyusun draf artikel jurnal format IMRAD (Pendahuluan, Metode, Hasil dan Pembahasan, Kesimpulan) dari ringkasan babmu, lengkap dengan pemeriksaan proporsi kata tiap bagian terhadap kisaran ideal artikel jurnal — draf siap diunduh sebagai .doc."
  }
},
judul: {
  isi: { fields: { "#jdX": "Penggunaan Media Sosial", "#jdY": "Prestasi Belajar", "#jdZ": "Siswa SMA Negeri 1 Palembang" } },
  tampil: {
    input: "Variabel X: Penggunaan Media Sosial • Variabel Y: Prestasi Belajar • Lokasi/Objek: Siswa SMA Negeri 1 Palembang",
    hasil: "Tool menghasilkan puluhan variasi judul dari pola-pola judul skripsi yang lazim — 'Pengaruh…', 'Hubungan…', 'Analisis…' — yang bisa kamu bandingkan dan ajukan ke dosen pembimbing sebagai bahan diskusi."
  }
},
singkatan: {
  isi: { fields: { "#sgIn": "Program MBKM memberi kesempatan mahasiswa belajar di luar kampus. Data BPS menunjukkan jumlah UMKM di Indonesia mencapai 64 juta unit dan menyerap sebagian besar tenaga kerja. Penelitian ini mengukur IPK mahasiswa peserta MBKM dan membandingkannya dengan mahasiswa reguler. Kegiatan KKN juga menjadi bagian dari implementasi MBKM di banyak perguruan tinggi. Analisis data dilakukan dengan SPSS versi 29." } },
  tampil: {
    input: "Program MBKM memberi kesempatan mahasiswa belajar di luar kampus. Data BPS menunjukkan jumlah UMKM di Indonesia mencapai 64 juta unit… Penelitian ini mengukur IPK mahasiswa peserta MBKM… Kegiatan KKN juga menjadi bagian dari implementasi MBKM… Analisis data dilakukan dengan SPSS versi 29.",
    hasil: "Tool mengekstrak akronim MBKM, BPS, UMKM, IPK, KKN, dan SPSS dari naskah, menyusunnya menjadi daftar singkatan terurut A–Z, dan menyediakan kolom kepanjangan untuk kamu lengkapi sebelum diunduh sebagai .doc."
  }
},
k17: {
  isi: { fields: {
    "#snPen": "Rahmawati (2022)", "#snJud": "Hubungan Intensitas Media Sosial dengan Konsentrasi Belajar Siswa",
    "#snMet": "Kuantitatif, survei, n = 120", "#snHas": "Intensitas media sosial berhubungan negatif dengan konsentrasi belajar (r = −0,38)",
    "#snSama": "Sama-sama meneliti media sosial pada siswa SMA", "#snBeda": "Penelitian saya menambahkan variabel prestasi belajar sebagai hasil akhir, bukan hanya konsentrasi"
  } },
  tampil: {
    input: "Peneliti & Tahun: Rahmawati (2022) • Metode: Kuantitatif, survei, n = 120 • Hasil Utama: Intensitas media sosial berhubungan negatif dengan konsentrasi belajar (r = −0,38) • Persamaan: sama-sama meneliti media sosial pada siswa SMA • Perbedaan: penelitian saya menambahkan prestasi belajar sebagai variabel hasil",
    hasil: "Setelah tombol Tambah Baris ditekan, penelitian ini masuk ke tabel matriks sintesis Bab 2 berdampingan dengan jurnal lain yang kamu tambahkan — tabel siap diekspor ke .doc/CSV untuk ditempel ke tinjauan pustaka."
  }
},
pengesahan: {
  isi: { fields: {
    "#pgJudul": "Pengaruh Media Sosial terhadap Prestasi Belajar Siswa SMA Negeri 1 Palembang",
    "#pgNama": "Rani Puspita", "#pgNim": "2201010456", "#pgProdi": "Pendidikan Ekonomi",
    "#pgFak": "Fakultas Keguruan dan Ilmu Pendidikan", "#pgUniv": "Universitas Cendekia Nusantara",
    "#pgTanggal": "Palembang, 21 Oktober 2026",
    "#pgP1": "Dr. Sari Wulandari, M.Pd. — NIP. 198501012010012001",
    "#pgP2": "Drs. Bambang Hartono, M.Si. — NIP. 197803152005011002",
    "#pgU1": "Dr. Ani Wijaya, M.Si. — NIP. 198207202008012003",
    "#pgU2": "Prof. Dr. H. Mahmud Yunus, M.Pd. — NIP. 196505101990031001",
    "#pgKap": "Dr. Dewi Anggraini, M.Pd. — NIP. 199003142015042002",
    "#pgDekan": "Prof. Dr. H. Mahmud Yunus, M.Pd. — NIP. 196505101990031001"
  } },
  tampil: {
    input: "Judul skripsi, nama Rani Puspita (NIM 2201010456), dua pembimbing, dua penguji, ketua program studi, dan dekan — masing-masing lengkap dengan NIP.",
    hasil: "Tool menghasilkan dua dokumen siap cetak: lembar pengesahan skripsi dengan susunan tanda tangan pembimbing, penguji, kaprodi, dan dekan, serta surat pernyataan bebas plagiat berkotak materai — tinggal kamu cetak dan tanda tangani."
  }
},
ojskit: {
  isi: { fields: {
    "#ojJurnal": "Jurnal Ilmu Pendidikan", "#ojJudul": "Pengaruh Media Sosial terhadap Prestasi Belajar Siswa SMA Negeri 1 Palembang",
    "#ojPenulis": "Rani Puspita", "#ojInst": "Universitas Cendekia Nusantara", "#ojEmail": "rani.puspita@email.com",
    "#ojKomentar": "Reviewer 1: Perjelas teknik sampling pada Bab Metode.\nReviewer 1: Tambahkan penelitian terdahulu terbaru (3 tahun terakhir).\nReviewer 2: Perbaiki penulisan daftar pustaka mengikuti gaya selingkung jurnal."
  } },
  tampil: {
    input: "Jurnal tujuan: Jurnal Ilmu Pendidikan • Judul artikel, penulis korespondensi Rani Puspita, institusi, email, dan tiga komentar reviewer (teknik sampling, penelitian terdahulu terbaru, gaya daftar pustaka).",
    hasil: "Tool menghasilkan satu berkas .doc berisi cover letter resmi untuk editor jurnal tujuan dan matriks tanggapan reviewer — tabel komentar, tanggapanmu, dan lokasi perbaikan — paket standar untuk submit dan revisi di OJS."
  }
},
bimbingan: {
  isi: { fields: {
    "#bmNama": "Rani Puspita", "#bmNim": "2201010456",
    "#bmP1": "Dr. Sari Wulandari, M.Pd.", "#bmP2": "Drs. Bambang Hartono, M.Si.",
    "#bmJudul": "Pengaruh Media Sosial terhadap Prestasi Belajar Siswa SMA Negeri 1 Palembang",
    "#bmTgl": "20 Oktober 2026", "#bmMateri": "BAB III — Metode Penelitian",
    "#bmCatatan": "Perbaiki definisi operasional variabel, tambahkan kisi-kisi instrumen, dan lengkapi teknik analisis data sebelum konsultasi berikutnya."
  } },
  tampil: {
    input: "Sesi bimbingan 20 Oktober 2026, materi BAB III — Metode Penelitian, catatan dosen: 'Perbaiki definisi operasional variabel, tambahkan kisi-kisi instrumen, dan lengkapi teknik analisis data sebelum konsultasi berikutnya.'",
    hasil: "Sesi tersimpan ke kartu kendali bimbingan. Setelah beberapa sesi terkumpul, kartu kendali lengkap dengan paraf dosen per sesi dapat diunduh sebagai .doc berkop logo untuk dilampirkan saat pendaftaran sidang."
  }
},
revisi: {
  isi: { fields: {
    "#rvNama": "Rani Puspita", "#rvTgl": "18 Oktober 2026",
    "#rvJudul": "Pengaruh Media Sosial terhadap Prestasi Belajar Siswa SMA Negeri 1 Palembang",
    "#rvPenguji": "Dr. Ani Wijaya, M.Si.", "#rvHalLama": "45",
    "#rvUraian": "Perbaiki teknik sampling dan tambahkan uji asumsi klasik sebelum regresi."
  } },
  tampil: {
    input: "Penguji: Dr. Ani Wijaya, M.Si. • Halaman lama: 45 • Uraian revisi: Perbaiki teknik sampling dan tambahkan uji asumsi klasik sebelum regresi.",
    hasil: "Item revisi masuk ke daftar checklist pasca-sidang dengan status yang bisa kamu centang saat selesai. Setelah semua penguji selesai, unduh Lembar Revisi resmi (.doc) sebagai bukti perbaikan untuk ditandatangani penguji."
  }
},
pdffix: {
  isi: { fields: { "#pIn": "Penelitian ini bertujuan untuk mengetahui pengaruh peng-\nggunaan media sosial terhadap prestasi belajar siswa.\nMetode yang digunakan adalah survei dengan sampel\nsebanyak 68 responden yang dipilih secara acak dari\nseluruh siswa kelas XI.\n\nHasil penelitian menunjukkan bahwa terdapat pengaruh\nnegatif yang signifikan antara penggunaan media\nsosial dan prestasi belajar." } },
  tampil: {
    input: "Penelitian ini bertujuan untuk mengetahui pengaruh peng-\nggunaan media sosial terhadap prestasi belajar siswa.\nMetode yang digunakan adalah survei dengan sampel\nsebanyak 68 responden yang dipilih secara acak dari\nseluruh siswa kelas XI. […]",
    hasil: "Teks menjadi dua paragraf utuh: kata terpotong 'peng-gunaan' tersambung kembali menjadi 'penggunaan', baris-baris pendek menyatu, dan statistik karakter/paragraf ditampilkan — teks rapi siap disalin ke naskahmu."
  }
},
italic: {
  isi: { fields: { "#iIn": "Pembelajaran dengan pendekatan in vitro tidak selalu relevan untuk penelitian lapangan. Menurut Santoso et al. (2021), penggunaan e-learning dan blended learning meningkat tajam sejak pandemi. Istilah website, deadline, dan feedback kini lazim dipakai, padahal dalam karya ilmiah istilah asing seperti in situ dan post hoc tetap wajib dimiringkan sesuai kaidah EYD." } },
  tampil: {
    input: "Pembelajaran dengan pendekatan in vitro tidak selalu relevan untuk penelitian lapangan. Menurut Santoso et al. (2021), penggunaan e-learning dan blended learning meningkat tajam sejak pandemi. Istilah website, deadline, dan feedback kini lazim dipakai, padahal dalam karya ilmiah istilah asing seperti in situ dan post hoc tetap wajib dimiringkan sesuai kaidah EYD.",
    hasil: "Tool menandai kata dan frasa asing/Latin pada teks — in vitro, et al., e-learning, blended learning, in situ, post hoc — dan menghasilkan versi HTML dengan tag miring pada kata-kata tersebut, siap disalin ke Word; kata yang muncul berulang juga dilaporkan."
  }
},
eydcase: {
  isi: { fields: { "#eIn": "pengaruh media sosial terhadap prestasi belajar siswa di era digital" } },
  tampil: {
    input: "pengaruh media sosial terhadap prestasi belajar siswa di era digital",
    hasil: "Judul berubah menjadi 'Pengaruh Media Sosial terhadap Prestasi Belajar Siswa di Era Digital' — kata hubung seperti 'terhadap' dan 'di' tetap huruf kecil sesuai kaidah EYD untuk judul."
  }
},
wordfreq: {
  isi: { fields: { "#wfIn": "Penelitian ini bertujuan untuk mengetahui pengaruh media sosial terhadap prestasi belajar siswa. Media sosial digunakan siswa setiap hari untuk berkomunikasi dan mencari informasi. Namun penggunaan media sosial yang berlebihan dapat mengganggu konsentrasi belajar siswa. Prestasi belajar siswa dipengaruhi oleh banyak faktor, salah satunya adalah cara siswa mengatur waktu belajar. Penelitian ini dilakukan pada siswa kelas XI dengan jumlah responden sebanyak 68 siswa. Data penelitian dikumpulkan melalui angket dan dianalisis dengan regresi. Hasil penelitian diharapkan memberi gambaran tentang pengaruh media sosial terhadap prestasi belajar serta menjadi masukan bagi guru dalam membimbing siswa menggunakan media sosial secara bijak." } },
  tampil: {
    input: "Penelitian ini bertujuan untuk mengetahui pengaruh media sosial terhadap prestasi belajar siswa. Media sosial digunakan siswa setiap hari untuk berkomunikasi dan mencari informasi. Namun penggunaan media sosial yang berlebihan dapat mengganggu konsentrasi belajar siswa. […] (satu paragraf penuh)",
    hasil: "Tool menampilkan daftar kata yang paling sering muncul — pada contoh ini 'media', 'sosial', 'siswa', dan 'belajar' mendominasi — beserta jumlah kemunculannya, membantumu menemukan kata yang terlalu sering diulang agar bisa divariasikan."
  }
},
k21: {
  isi: { fields: { "#gIn": "Variabel = besaran yang dapat diukur dan berubah-ubah nilainya\nKKN : Kuliah Kerja Nyata\nSPSS — Statistical Package for the Social Sciences\nReliabilitas: konsistensi hasil pengukuran instrumen\nMedia Sosial = platform komunikasi berbasis internet untuk berbagi konten\nValiditas = ketepatan instrumen mengukur apa yang seharusnya diukur" } },
  tampil: {
    input: "Variabel = besaran yang dapat diukur dan berubah-ubah nilainya\nKKN : Kuliah Kerja Nyata\nSPSS — Statistical Package for the Social Sciences\nReliabilitas: konsistensi hasil pengukuran instrumen […]",
    hasil: "Enam entri dengan pemisah campuran (=, :, —) dibaca semua, diurutkan A–Z (KKN, Media Sosial, Reliabilitas, SPSS, Validitas, Variabel), dan tool memperingatkan bila ada istilah ganda atau entri tanpa definisi."
  }
},
k18: {
  isi: { fields: { "#phMine": "Penelitian ini bertujuan untuk mengetahui pengaruh media sosial terhadap prestasi belajar siswa.\nHasil penelitian menunjukkan bahwa terdapat pengaruh yang signifikan antara penggunaan media sosial dan prestasi belajar.\nBerdasarkan hasil analisis, dapat disimpulkan bahwa pembatasan durasi media sosial pada jam belajar perlu diterapkan." } },
  tampil: {
    input: "Tiga kalimat koleksi pribadi: 'Penelitian ini bertujuan untuk mengetahui pengaruh media sosial terhadap prestasi belajar siswa.' dan dua kalimat akademik lainnya.",
    hasil: "Kalimat-kalimat contoh tersimpan di Koleksi Kalimat Saya (menyatu dengan bank 34+ kalimat akademik bawaan yang bisa dicari lewat kolom pencarian) — klik kalimat mana pun untuk menyalinnya ke naskahmu."
  }
},
k19: {
  isi: { fields: {
    "#aLat": "Media sosial digunakan hampir seluruh siswa setiap hari, tetapi dampaknya terhadap prestasi belajar belum banyak diteliti di sekolah ini.",
    "#aTuj": "Mengetahui pengaruh penggunaan media sosial terhadap prestasi belajar siswa SMA Negeri 1 Palembang.",
    "#aMet": "Penelitian kuantitatif metode survei dengan 68 responden; data dianalisis menggunakan regresi linear sederhana.",
    "#aHas": "Penggunaan media sosial berpengaruh negatif dan signifikan terhadap prestasi belajar (β = −0,412; p = 0,001; R² = 0,286).",
    "#aSim": "Semakin tinggi intensitas penggunaan media sosial, semakin rendah prestasi belajar siswa, sehingga pembatasan pada jam belajar disarankan.",
    "#aKey": "media sosial, prestasi belajar, siswa SMA"
  } },
  tampil: {
    input: "Latar: media sosial dipakai hampir seluruh siswa setiap hari • Metode: survei, 68 responden, regresi linear sederhana • Hasil: berpengaruh negatif signifikan (β = −0,412; p = 0,001; R² = 0,286) • Kata kunci: media sosial, prestasi belajar, siswa SMA",
    hasil: "Tool merakit abstrak Bahasa Indonesia yang utuh dari potongan-potongan itu, sekaligus kerangka versi Bahasa Inggrisnya, lengkap dengan daftar kata kunci bilingual — tinggal kamu poles redaksinya."
  }
},
k22: {
  isi: { fields: {
    "#tjIn": "Kelas\tJumlah Siswa\tRata-rata Nilai\nKelas A\t32\t82,4\nKelas B\t30\t78,1\nKelas C\t31\t80,3",
    "#tjCap": "Tabel 1. Rata-rata Nilai UAS Statistika per Kelas",
    "#tjNote": "Sumber: Data diolah peneliti (2026)"
  } },
  tampil: {
    input: "Kelas | Jumlah Siswa | Rata-rata Nilai — Kelas A: 32 siswa, 82,4 • Kelas B: 30 siswa, 78,1 • Kelas C: 31 siswa, 80,3 • Keterangan tabel: Tabel 1. Rata-rata Nilai UAS Statistika per Kelas",
    hasil: "Tool menghasilkan tabel standar jurnal gaya booktabs — tanpa garis vertikal, garis hanya di atas/bawah header dan di bawah tabel — lengkap dengan caption dan catatan kaki, siap disalin (HTML) ke Word."
  }
},
kerangkabab: {
  isi: { fields: { "#kbabJud": "Pengaruh Media Sosial terhadap Prestasi Belajar Siswa SMA Negeri 1 Palembang" } },
  tampil: {
    input: "Judul/topik: Pengaruh Media Sosial terhadap Prestasi Belajar Siswa SMA Negeri 1 Palembang (metode dan jenis dokumen mengikuti pilihan bawaan tool)",
    hasil: "Tool menyusun kerangka Bab I sampai Bab V yang sesuai dengan metode penelitianmu — tiap bab dipecah menjadi sub-bab baku beserta panduan isi singkat untuk tiap sub-bab, siap disalin sebagai peta jalan penulisan skripsimu."
  }
},
k20: {
  isi: { fields: { "#wTarget": "45000", "#wNow": "12750", "#wDate": "2026-12-18" } },
  tampil: {
    input: "Target total kata skripsi: 45.000 • Sudah ditulis: 12.750 • Deadline: 18 Desember 2026",
    hasil: "Tool menghitung sisa 32.250 kata dan membaginya ke hari-hari menulis yang tersedia: target kata per hari yang realistis beserta milestone tanggal per bab, agar kamu tahu persis posisi menulismu setiap hari sampai deadline."
  }
},
bacawaktu: {
  isi: { fields: {
    "#bwIn": "Assalamu'alaikum warahmatullahi wabarakatuh. Yang terhormat Bapak Dekan, Bapak Ketua Program Studi, serta Bapak dan Ibu dosen penguji. Pada kesempatan ini saya akan mempresentasikan hasil penelitian saya yang berjudul Pengaruh Media Sosial terhadap Prestasi Belajar Siswa. Penelitian ini berangkat dari fenomena meningkatnya penggunaan media sosial di kalangan siswa, yang rata-rata mencapai lebih dari tiga jam per hari. Pertanyaan utama penelitian ini adalah apakah penggunaan media sosial berpengaruh terhadap prestasi belajar. Dengan metode survei terhadap 68 responden dan analisis regresi, ditemukan bahwa penggunaan media sosial berpengaruh negatif dan signifikan terhadap prestasi belajar siswa.",
    "#bwTarget": "10"
  } },
  tampil: {
    input: "Naskah pembuka sidang: 'Assalamu'alaikum warahmatullahi wabarakatuh. Yang terhormat Bapak Dekan…' beserta target durasi 10 menit.",
    hasil: "Tool menghitung jumlah kata naskah dan mengonversinya menjadi estimasi durasi bicara pada kecepatan normal — untuk contoh ini sekitar 1,5 menit, jauh di bawah target 10 menit, sehingga tool menyarankan bagian yang perlu ditambah (misalnya penjelasan metode dan hasil) beserta jumlah kata tambahannya."
  }
},

/* ================= DATA ================= */
validitas: {
  isi: { fields: { "#vData": "B1\tB2\tB3\tB4\tB5\n5\t5\t4\t5\t4\n4\t4\t4\t4\t4\n5\t4\t5\t5\t5\n3\t3\t4\t3\t3\n4\t5\t4\t4\t5\n2\t2\t3\t2\t2\n4\t4\t3\t4\t4\n5\t5\t5\t4\t5\n3\t4\t3\t3\t4\n1\t2\t1\t2\t1\n4\t3\t4\t4\t3\n5\t4\t4\t5\t4\n2\t3\t2\t3\t2\n4\t4\t5\t4\t4\n3\t3\t3\t4\t3" } },
  tampil: {
    input: "Matriks jawaban kuesioner 15 responden × 5 butir (skala Likert 1–5):\nB1 B2 B3 B4 B5\n5 5 4 5 4\n4 4 4 4 4\n5 4 5 5 5\n3 3 4 3 3\n… (15 baris)",
    hasil: "Kelima butir dinyatakan VALID — r hitung B1–B5 berkisar 0,88–0,98, semuanya di atas r tabel 0,514 (N = 15) — dan instrumennya reliabel dengan Cronbach's Alpha 0,952. Coba ubah beberapa angka menjadi acak untuk melihat butir berubah status menjadi TIDAK VALID."
  }
},
regresi: {
  isi: { fields: {
    "#rgNama": "Prestasi Belajar, Motivasi Belajar, Disiplin Belajar", "#rgK": "2",
    "#rgData": "82 84 80\n78 76 74\n90 92 88\n74 70 72\n85 86 83\n69 66 70\n93 94 92\n80 79 81\n76 74 75\n88 90 85\n72 71 68\n84 82 84\n91 93 90\n77 78 76"
  } },
  tampil: {
    input: "14 baris data — kolom pertama Y (Prestasi Belajar), lalu X1 (Motivasi Belajar) dan X2 (Disiplin Belajar):\n82 84 80\n78 76 74\n90 92 88\n74 70 72\n85 86 83\n… (14 baris)",
    hasil: "Tool menghitung persamaan regresi berganda Y = a + b1·Motivasi + b2·Disiplin, lengkap dengan R², uji F simultan, uji t parsial tiap variabel, dan interpretasi otomatis berbahasa Indonesia — motivasi dan disiplin pada contoh ini sama-sama berpengaruh positif terhadap prestasi."
  }
},
deskriptif: {
  isi: { fields: {
    "#dsNama": "Motivasi Belajar", "#dsMinT": "20", "#dsMaxT": "100",
    "#dsData": "72 85 90 65 78 88 92 71 69 84 77 81 95 73 86 79 68 90 83 75 87 70 82 89 76 93 74 80 85 78"
  } },
  tampil: {
    input: "30 skor Motivasi Belajar (rentang teoretis 20–100): 72 85 90 65 78 88 92 71 69 84 77 81 95 73 86 79 68 90 83 75 87 70 82 89 76 93 74 80 85 78",
    hasil: "Tool menampilkan mean, median, modus, simpangan baku, varians, rentang, skewness dan kurtosis, plus histogram, plot Q-Q, dan kesimpulan kategorisasi skor (rendah/sedang/tinggi) berdasarkan mean dan SD ideal — format standar statistik deskriptif untuk Bab IV."
  }
},
formulabldr: {
  isi: { fields: { "#fxCase": "nilai", "#fxSep": ";", "#fxSimN": "85" } },
  tampil: {
    input: "Kasus yang dipilih: Konversi Nilai (Nilai → Huruf) — rumus disusun dari ambang A ≥ 85, B ≥ 75, C ≥ 65, D ≥ 55.",
    hasil: "Tool menghasilkan rumus Excel =IF(B2>=85,\"A\",IF(B2>=75,\"B\",IF(B2>=65,\"C\",IF(B2>=55,\"D\",\"E\")))) yang bisa langsung disalin, plus pratinjau hasil simulasinya untuk nilai contoh seperti 85 → A. Tersedia juga kasus LOOKUP, Predikat Lulus, dan Kategori Teks."
  }
},
xlstemplate: {
  isi: { fields: { "#xtPokok": "5000000", "#xtBunga": "12", "#xtTenor": "12" } },
  tampil: {
    input: "Pokok pinjaman: Rp5.000.000 • Bunga: 12% per tahun • Tenor: 12 bulan",
    hasil: "Tool mengunduh template Excel (.xlsx) berisi tabel angsuran 12 bulan — angsuran pokok, bunga, dan sisa pinjaman terhitung otomatis per baris — yang bisa langsung kamu pakai atau jadikan lampiran tugas keuangan."
  }
},
gformclean: {
  isi: { file: { target: "#gfFile", nama: "Contoh_Hasil_GoogleForm.xlsx", jenis: "xlsx",
    sheets: [{ nama: "Form Responses 1", baris: [
      ["Timestamp", "Saya merasa media sosial membantu saya memahami materi pelajaran", "Saya membuka media sosial saat jam belajar di rumah", "Materi pelajaran lebih mudah saya pahami lewat video pendek", "Saya sulit berkonsentrasi belajar karena notifikasi media sosial", "Nilai saya membaik sejak membatasi media sosial"],
      ["10/09/2026 08.12.04", "S", "SS", "S", "TS", "S"],
      ["10/09/2026 08.15.37", "SS", "S", "SS", "RG", "SS"],
      ["10/09/2026 08.21.10", "S", "SS", "S", "S", "S"],
      ["10/09/2026 08.26.44", "RG", "S", "RG", "SS", "TS"],
      ["10/09/2026 08.31.02", "SS", "SS", "SS", "TS", "SS"],
      ["10/09/2026 08.40.19", "TS", "RG", "S", "SS", "RG"],
      ["10/09/2026 08.45.55", "S", "S", "S", "RG", "S"],
      ["10/09/2026 08.52.28", "SS", "S", "SS", "TS", "SS"]
    ] }] } },
  tampil: {
    input: "Berkas Excel hasil Google Form berisi 8 responden dengan kolom pertanyaan yang panjang-panjang dan jawaban teks SS/S/RG/TS/STS (coba berkas contoh lewat tombol Siapkan File Contoh di dalam tool).",
    hasil: "Tool membaca struktur berkas, membuang kolom Timestamp, mengubah 5 pertanyaan panjang menjadi kode X1_1 sampai X1_5, mengonversi jawaban teks menjadi skor 1–5, lalu menyiapkan berkas .xlsx bersih berisi matriks skor dan kamus pertanyaan aslinya — siap diolah lanjut, misalnya di Uji Validitas & Reliabilitas."
  }
},
sampel: {
  isi: { fields: { "#sN": "350" } },
  tampil: {
    input: "Ukuran populasi N = 350 siswa, margin of error e = 5% (pilihan bawaan).",
    hasil: "Rumus Slovin menghasilkan n = 350 / (1 + 350 × 0,05²) = 186,67, dibulatkan ke atas menjadi 187 responden. Tool menampilkan langkah perhitungannya, tabel Krejcie–Morgan dan Isaac–Michael untuk populasi yang sama, serta saran jumlah angket yang disebar untuk mengantisipasi yang tidak kembali."
  }
},
kuesioner: {
  isi: { fields: {
    "#kuJudul": "Pengaruh Media Sosial terhadap Prestasi Belajar Siswa",
    "#kuNama": "Rani Puspita — 2201010456",
    "#kuResp": "Nama, Kelas, Jenis Kelamin",
    "#kuItems": "Saya membuka media sosial lebih dari 3 jam setiap hari\n[L4] Saya merasa puas dengan nilai yang saya peroleh semester ini\n[PG: Sangat Sering; Sering; Kadang-kadang; Tidak Pernah] Seberapa sering kamu membuka media sosial saat belajar?\n[TB] Apa kendala terbesarmu saat belajar di rumah?\nSaya sulit berkonsentrasi ketika ada notifikasi dari media sosial"
  } },
  tampil: {
    input: "Judul kuesioner 'Pengaruh Media Sosial terhadap Prestasi Belajar Siswa'; lima butir campuran: butir Likert 5 biasa, satu butir [L4] skala 4, satu pilihan ganda [PG: Sangat Sering; Sering; Kadang-kadang; Tidak Pernah], dan satu isian terbuka [TB].",
    hasil: "Tool merakit angket cetak rapi bergaya dokumen resmi — kop judul, identitas peneliti, petunjuk pengisian, dan tabel pernyataan dengan kolom jawaban sesuai jenis tiap butir — siap diunduh sebagai .doc atau langsung dicetak."
  }
},
inferens: {
  isi: { fields: {
    "#infJenis": "tindep", "#infNama": "Skor posttest kelas eksperimen vs kontrol",
    "#infA": "82 85 88 79 90 84 87 83 86 81", "#infB": "75 78 72 80 76 74 79 77 73 78"
  } },
  tampil: {
    input: "Jenis uji: t independen. Kelompok A (kelas eksperimen): 82 85 88 79 90 84 87 83 86 81 • Kelompok B (kelas kontrol): 75 78 72 80 76 74 79 77 73 78",
    hasil: "Tool menjalankan uji t dua sampel dan melaporkan statistik t, derajat bebas, nilai p, dan kesimpulan siap pakai untuk Bab IV — pada contoh ini rata-rata kelas eksperimen (≈84,5) terbukti lebih tinggi secara signifikan daripada kelas kontrol (≈76,2). Jenis uji lain yang tersedia: normalitas, t berpasangan, ANOVA, dan regresi."
  }
},
nonpar: {
  isi: { fields: {
    "#npJenis": "mw", "#npNama": "Skor motivasi kelompok eksperimen vs kontrol",
    "#npA": "78 82 85 80 88 84", "#npB": "70 74 72 76 73 75"
  } },
  tampil: {
    input: "Jenis uji: Mann-Whitney. Kelompok A: 78 82 85 80 88 84 • Kelompok B: 70 74 72 76 73 75",
    hasil: "Tool menghitung statistik U, nilai z, dan nilai p, lalu menyimpulkan apakah kedua kelompok berbeda signifikan — cocok untuk data yang tidak berdistribusi normal. Tersedia juga Wilcoxon, Kruskal-Wallis, dan korelasi Spearman."
  }
},
likert: {
  isi: { fields: { "#lIn": "SS\tS\tSS\tS\nS\tSS\tS\tSS\nRG\tS\tRG\tS\nSS\tSS\tS\tSS\nS\tRG\tS\tRG\nTS\tS\tTS\tRG" } },
  tampil: {
    input: "Grid jawaban 6 responden × 4 butir dalam format teks:\nSS S SS S\nS SS S SS\nRG S RG S\nSS SS S SS\nS RG S RG\nTS S TS RG",
    hasil: "Tool mengonversi jawaban menjadi skor (SS = 5 sampai STS = 1), menghitung rata-rata dan persentase pencapaian tiap butir, memberi kategori interpretasi (Sangat Baik/Baik/Cukup/…), dan menampilkan distribusi jawaban per butir — format analisis deskriptif angket yang lazim untuk Bab IV."
  }
},
tabelstat: {
  isi: { fields: { "#tbsJenis": "r", "#tbsDf1": "60", "#tbsHitung": "0,31" } },
  tampil: {
    input: "Jenis tabel: r product moment • N = 60 • r hitung yang dicek = 0,31",
    hasil: "Tool menampilkan r tabel untuk N = 60 pada taraf 5% (≈ 0,254) dan 1% (≈ 0,330), lalu menilai r hitungmu: 0,31 signifikan pada taraf 5% tetapi belum pada taraf 1%. Tabel t, F, dan chi-square juga tersedia, termasuk generator tabel lengkap per rentang df."
  }
},
mediasi: {
  isi: { fields: {
    "#medLX": "Kualitas Layanan", "#medLZ": "Kepuasan Pelanggan", "#medLY": "Loyalitas Pelanggan",
    "#medA": "0.52", "#medSEa": "0.11", "#medB": "0.47", "#medSEb": "0.10", "#medCp": "0.18"
  } },
  tampil: {
    input: "X = Kualitas Layanan, Z (mediator) = Kepuasan Pelanggan, Y = Loyalitas Pelanggan. Jalur a = 0,52 (SE 0,11), jalur b = 0,47 (SE 0,10), efek langsung c' = 0,18.",
    hasil: "Uji Sobel menghasilkan efek tidak langsung a×b = 0,2444 dengan z ≈ 3,33 (p ≈ 0,0009) — mediasi dinyatakan SIGNIFIKAN, dan karena efek langsung c' juga masih berarti, jenis mediasinya parsial. Tool menampilkan diagram jalur dan narasi hasil siap salin ke Bab IV."
  }
},
k25: {
  isi: { fields: {
    "#kbX": "Motivasi Belajar", "#kbXi": "Hasrat untuk berhasil, Dorongan kebutuhan belajar, Penghargaan dalam belajar",
    "#kbY": "Prestasi Belajar", "#kbYi": "Nilai ujian semester, Pemahaman materi pelajaran"
  } },
  tampil: {
    input: "Variabel bebas X: Motivasi Belajar (indikator: hasrat untuk berhasil, dorongan kebutuhan belajar, penghargaan dalam belajar) • Variabel terikat Y: Prestasi Belajar (indikator: nilai ujian semester, pemahaman materi pelajaran)",
    hasil: "Tool menggambar diagram kerangka berpikir: kotak X dan Y beserta indikatornya, panah pengaruh, dan hipotesis penelitian yang dirumuskan otomatis — diagram siap diunduh sebagai gambar untuk Bab II, dan variabel perantara (mediasi/moderasi) bisa ditambahkan bila modelmu memakainya."
  }
},
k26: {
  isi: { fields: {
    "#grT": "Rata-rata Nilai UAS per Kelas",
    "#grIn": "Kelas A, 82\nKelas B, 78\nKelas C, 85\nKelas D, 74"
  } },
  tampil: {
    input: "Judul: Rata-rata Nilai UAS per Kelas — data: Kelas A 82, Kelas B 78, Kelas C 85, Kelas D 74",
    hasil: "Tool menggambar diagram batang dari data itu; kesimpulan otomatis di bawah grafik menyoroti Kelas C sebagai yang tertinggi (85) dan Kelas D terendah (74). Grafik siap diunduh sebagai PNG untuk ditempel ke laporan atau Bab IV."
  }
},
k23: {
  isi: { fields: { "#ddN": "30", "#ddK": "10", "#ddS": "5", "#ddA": "0.7" } },
  tampil: {
    input: "Jumlah responden uji coba n = 30, jumlah butir k = 10, varians skor total = 5, dan rata-rata korelasi antarbutir = 0,7 (taraf yang dipilih untuk ambang reliabilitas pada formulir).",
    hasil: "Panel reliabilitas menampilkan Cronbach's Alpha dan KR-20 untuk data contoh itu beserta interpretasi kategorinya (misalnya alpha di atas 0,7 = reliabel/diterima), dilengkapi panduan membaca hasil uji reliabilitas instrumen."
  }
},
k24: {
  isi: { fields: { "#trIn": "P: Bagaimana pendapat Bapak tentang program bantuan ini?\nN: Eee... menurut saya programnya bagus, apa namanya, sangat membantu warga. Warga itu, apa ya, warga merasa terbantu sekali.\nP: Sudah berapa lama Bapak menerima bantuan ini?\nN: Sudah, hmm, sudah dua tahun. Anu, sejak tahun 2024 itu." } },
  tampil: {
    input: "P: Bagaimana pendapat Bapak tentang program bantuan ini?\nN: Eee... menurut saya programnya bagus, apa namanya, sangat membantu warga. Warga itu, apa ya, warga merasa terbantu sekali.\nP: Sudah berapa lama Bapak menerima bantuan ini?\nN: Sudah, hmm, sudah dua tahun. Anu, sejak tahun 2024 itu.",
    hasil: "Transkrip dibersihkan dari filler ('eee', 'apa namanya', 'anu', pengulangan kata) menjadi kalimat-kalimat lancar yang siap dikutip dalam laporan kualitatif — teks asli tetap dipertahankan dan statistik jumlah kata sebelum/sesudah ditampilkan."
  }
},
koding: {
  isi: { fields: { "#kdIn": "Saya merasa terbantu dengan adanya perpustakaan desa karena anak saya bisa belajar di sana setiap sore. Koleksi bukunya cukup lengkap untuk anak sekolah.\n\nKendala utama kami adalah akses internet yang sering putus, sehingga tugas sekolah anak yang butuh internet jadi terhambat.\n\nSaya berharap ke depan ada pelatihan komputer untuk warga, supaya kami bisa mengurus administrasi secara daring tanpa harus ke kecamatan." } },
  tampil: {
    input: "Tiga segmen transkrip wawancara warga: (1) manfaat perpustakaan desa, (2) kendala akses internet, (3) harapan pelatihan komputer.",
    hasil: "Tiap segmen tampil sebagai kartu koding yang siap kamu beri kode dan kategori sendiri — misalnya segmen 1 berkode 'Fasilitas belajar', segmen 2 'Infrastruktur', segmen 3 'Kebutuhan warga' — lalu matriks kodingnya diekspor ke Word/CSV."
  }
},
consent: {
  isi: { fields: {
    "#icJudul": "Pengaruh Media Sosial terhadap Prestasi Belajar Siswa SMA Negeri 1 Palembang",
    "#icNama": "Rani Puspita", "#icInst": "Universitas Cendekia Nusantara",
    "#icKontak": "rani.puspita@email.com / 0812-3456-7890",
    "#icTujuan": "Mengetahui pengaruh penggunaan media sosial terhadap prestasi belajar siswa.",
    "#icProsedur": "Responden mengisi angket skala Likert sebanyak 25 butir selama kurang lebih 15 menit. Tidak ada perlakuan atau intervensi apa pun dalam penelitian ini.",
    "#icRisiko": "Penelitian ini berisiko minimal. Identitas responden dirahasiakan, data hanya digunakan untuk keperluan akademik, dan responden berhak berhenti kapan saja tanpa konsekuensi."
  } },
  tampil: {
    input: "Judul penelitian, peneliti Rani Puspita (Universitas Cendekia Nusantara), tujuan mengetahui pengaruh media sosial terhadap prestasi belajar, prosedur pengisian angket 25 butir ±15 menit, dan pernyataan risiko minimal beserta kerahasiaan data.",
    hasil: "Tool menghasilkan formulir informed consent versi Bahasa Indonesia dan Bahasa Inggris — lengkap dengan blok tanda tangan peneliti dan responden — siap diunduh sebagai .doc untuk dilampirkan pada angket atau dokumen etik penelitian."
  }
},
federer: {
  isi: { fields: {
    "#fedT": "4", "#fedDrop": "10",
    "#fedUnit": "Tikus-01\nTikus-02\nTikus-03\nTikus-04\nTikus-05\nTikus-06\nTikus-07\nTikus-08\nTikus-09\nTikus-10\nTikus-11\nTikus-12"
  } },
  tampil: {
    input: "Jumlah perlakuan t = 4 dan cadangan dropout 10%, dengan 12 unit percobaan (Tikus-01 sampai Tikus-12).",
    hasil: "Rumus Federer (t−1)(r−1) ≥ 15 menghasilkan kebutuhan ulangan minimum, tool menambahkan cadangan dropout, lalu membagi 12 tikus ke 4 kelompok perlakuan secara ACAK — daftar kelompok hasil pengacakan tampil dan bisa diunduh."
  }
},

/* ================= PRESENT ================= */
decksidang: {
  isi: { fields: {
    "#dsJudul": "Pengaruh Media Sosial terhadap Prestasi Belajar Siswa SMA Negeri 1 Palembang",
    "#dsNama": "Rani Puspita — 2201010456",
    "#dsProdi": "S1 Pendidikan Ekonomi — Universitas Cendekia Nusantara",
    "#dsPemb": "Dr. Sari Wulandari, M.Pd.",
    "#dsFenomena": "Siswa rata-rata membuka media sosial 3–4 jam per hari\nNilai ekonomi sebagian siswa masih di bawah KKM\nGuru melaporkan siswa sering mengecek HP saat pelajaran",
    "#dsRumusan": "Apakah penggunaan media sosial berpengaruh terhadap prestasi belajar siswa?\nSeberapa besar pengaruh penggunaan media sosial terhadap prestasi belajar siswa?",
    "#dsTujuan": "Mengetahui pengaruh penggunaan media sosial terhadap prestasi belajar siswa dan besar pengaruhnya.",
    "#dsKerangka": "Teori belajar sosial Bandura: perilaku belajar dibentuk lingkungan, termasuk lingkungan digital. Intensitas media sosial yang tinggi menggeser waktu dan konsentrasi belajar, sehingga prestasi menurun.",
    "#dsHipotesis": "Terdapat pengaruh negatif dan signifikan penggunaan media sosial terhadap prestasi belajar siswa.",
    "#dsMetode": "Kuantitatif, metode survei, desain korelasional. Analisis: regresi linear sederhana dengan SPSS.",
    "#dsSampel": "Populasi 210 siswa kelas XI; sampel 68 siswa (Slovin, e = 10%), proportional random sampling.",
    "#dsHasil": "Koefisien regresi −0,412; signifikansi 0,001 (p < 0,05); R² = 0,286 — media sosial menjelaskan 28,6% variasi prestasi belajar.",
    "#dsKesimpulan": "Penggunaan media sosial berpengaruh negatif dan signifikan terhadap prestasi belajar siswa SMA Negeri 1 Palembang.",
    "#dsSaran": "Siswa membatasi media sosial pada jam belajar; sekolah membuat aturan penggunaan HP; penelitian lanjutan menambahkan variabel motivasi belajar."
  } },
  tampil: {
    input: "Sebelas isian bab untuk judul 'Pengaruh Media Sosial terhadap Prestasi Belajar' — fenomena (siswa membuka media sosial 3–4 jam/hari, nilai di bawah KKM), rumusan masalah, hipotesis, metode survei 68 responden, hasil regresi (β = −0,412; p = 0,001; R² = 0,286), kesimpulan, dan saran.",
    hasil: "Tool merakit deck presentasi sidang lengkap — slide judul, latar belakang, rumusan, kerangka, metode, hasil (dengan ruang grafik), kesimpulan, dan saran — dalam tema warna pilihanmu, siap diunduh sebagai PowerPoint (.pptx)."
  }
},
pptxextract: {
  isi: { file: { target: "#pxFile", nama: "Contoh_Materi_Dosen.pptx", jenis: "pptx", slides: [
    { judul: "Metode Penelitian Kuantitatif", poin: ["Disusun oleh: Dr. Sari Wulandari, M.Pd.", "Mata kuliah Metodologi Penelitian — Pertemuan 5"] },
    { judul: "Jenis Penelitian", poin: ["Eksperimen: ada perlakuan dan kelompok kontrol", "Survei: data dari angket/kuesioner", "Korelasional: melihat hubungan antarvariabel"] },
    { judul: "Langkah Penelitian", poin: ["Merumuskan masalah", "Menyusun hipotesis", "Mengumpulkan data", "Menganalisis dan menyimpulkan"] },
    { judul: "Tugas Minggu Ini", poin: ["Susun Bab III kelompok masing-masing", "Konsultasikan instrumen ke dosen pengampu"] }
  ] } },
  tampil: {
    input: "Berkas presentasi contoh berisi 4 slide materi 'Metode Penelitian Kuantitatif' (coba lewat tombol Siapkan File Contoh di dalam tool).",
    hasil: "Tool mengekstrak seluruh teks slide menjadi dokumen .docx yang rapi — judul tiap slide menjadi heading dan poin-poinnya menjadi isi — sehingga materi dosen bisa langsung kamu pelajari, kutip, dan parafrase dengan sitasi yang benar."
  }
},
xls2chart: {
  isi: { fields: {
    "#xcTitle": "Rata-rata Nilai UAS per Kelas",
    "#xcData": "Kelas\tRata-rata\nKelas A\t82\nKelas B\t78\nKelas C\t85\nKelas D\t74",
    "#xcConc": "Kelas C meraih rata-rata tertinggi (85), sedangkan Kelas D terendah (74) sehingga perlu perhatian tambahan."
  } },
  tampil: {
    input: "Tabel tempel dari Excel — Kelas A 82, Kelas B 78, Kelas C 85, Kelas D 74 — judul grafik 'Rata-rata Nilai UAS per Kelas' dan kalimat kesimpulan tentang Kelas C tertinggi dan Kelas D terendah.",
    hasil: "Data berubah menjadi slide presentasi: satu slide grafik batang dan satu slide kesimpulan dengan angka-angka kunci, siap diunduh sebagai .pptx untuk laporan atau presentasi kelas."
  }
},
pptxpress: {
  isi: { file: { target: "#ppFile", nama: "Contoh_Deck_Berat.pptx", jenis: "pptx", gambar: true, slides: [
    { judul: "Presentasi Kelompok 3", poin: ["Hasil observasi UMKM di sekitar kampus"] },
    { judul: "Dokumentasi Lapangan", poin: ["Foto wawancara dan produk UMKM (slide berikutnya berisi foto besar)"] },
    { judul: "Penutup", poin: ["Terima kasih"] }
  ] } },
  tampil: {
    input: "Berkas .pptx contoh yang salah satu slidenya berisi gambar besar (coba lewat tombol Siapkan File Contoh di dalam tool).",
    hasil: "Tool mengompres gambar-gambar di dalam deck ke resolusi dan kualitas yang dipilih, lalu melaporkan ukuran sebelum vs sesudah (berkas contoh umumnya menyusut drastis) — deck ringan yang aman dari batas lampiran email kampus."
  }
},
k27: {
  tampil: {
    input: "Tool ini SUDAH terisi contoh bawaan begitu dibuka: draf kasar ('judulnya pengaruh gadget ke nilai siswa… bab 1 latar belakang… metode survei kasih angket ke 60 anak…') pada kolom draf kasarmu.",
    hasil: "Tekan Susun Jadi PPT: draf kasar itu berubah menjadi outline slide terstruktur (judul, latar belakang, metode, hasil, penutup), dan tiap poin bisa kamu ubah/atur sebelum diunduh sebagai .pptx."
  }
},
teleprompter: {
  isi: { fields: {
    "#tIn": "Assalamu'alaikum warahmatullahi wabarakatuh. Yang terhormat Bapak Dekan Fakultas Keguruan dan Ilmu Pendidikan, Bapak Ketua Program Studi Pendidikan Ekonomi, serta Bapak dan Ibu dosen penguji yang saya hormati. Pada kesempatan yang berbahagia ini, izinkan saya mempresentasikan hasil penelitian saya yang berjudul Pengaruh Media Sosial terhadap Prestasi Belajar Siswa SMA Negeri 1 Palembang. Penelitian ini berangkat dari fenomena penggunaan media sosial yang sangat tinggi di kalangan siswa, dengan rata-rata durasi lebih dari tiga jam setiap harinya. Rumusan masalah penelitian ini adalah apakah penggunaan media sosial berpengaruh terhadap prestasi belajar siswa, dan seberapa besar pengaruh tersebut. Untuk menjawabnya, saya menggunakan metode survei terhadap 68 responden dan analisis regresi linear sederhana. Hasil penelitian menunjukkan bahwa penggunaan media sosial berpengaruh negatif dan signifikan terhadap prestasi belajar, dengan nilai signifikansi 0,001 dan kontribusi sebesar 28,6 persen. Demikian pemaparan saya, atas perhatiannya saya ucapkan terima kasih.",
    "#tMenit": "10"
  } },
  tampil: {
    input: "Naskah pidato pembuka sidang lengkap (salam, penghormatan, fenomena, rumusan, metode, hasil) dengan target durasi sidang 10 menit.",
    hasil: "Teleprompter menampilkan naskah dalam huruf besar yang berjalan otomatis dari cermin HP/laptop — kecepatan gulir dan ukuran huruf bisa diatur, dan indikator waktu membantumu berlatih agar presentasi pas dalam batas waktu sidang."
  }
},
k28: {
  tampil: {
    input: "Tool ini bekerja lewat pilihan kategori dan tombol gambar kartu — tidak ada kolom teks bebas. Pilih kategori (misalnya Metodologi) lalu klik Gambar Kartu Simulasi Proposal.",
    hasil: "Sebuah kartu pertanyaan simulasi terambil acak dari kategori itu (dari 102+ kartu), menyerupai pertanyaan penguji saat seminar proposal — gunakan untuk latihan menjawab bersama teman sebelum hari-H."
  }
},
tanyajawab: {
  isi: { fields: {
    "#tjJudul": "Pengaruh Media Sosial terhadap Prestasi Belajar Siswa SMA Negeri 1 Palembang",
    "#tjX": "Penggunaan Media Sosial", "#tjY": "Prestasi Belajar",
    "#tjAbstrak": "Penelitian ini bertujuan untuk mengetahui pengaruh penggunaan media sosial terhadap prestasi belajar siswa SMA Negeri 1 Palembang. Metode yang digunakan adalah survei dengan sampel 68 siswa kelas XI yang dipilih secara proporsional. Data dikumpulkan menggunakan angket skala Likert dan dianalisis dengan regresi linear sederhana. Hasil penelitian menunjukkan bahwa penggunaan media sosial berpengaruh negatif dan signifikan terhadap prestasi belajar (β = −0,412; p = 0,001) dengan kontribusi sebesar 28,6%. Disimpulkan bahwa semakin tinggi intensitas penggunaan media sosial, semakin rendah prestasi belajar siswa."
  } },
  tampil: {
    input: "Judul skripsi, variabel X (Penggunaan Media Sosial), variabel Y (Prestasi Belajar), dan abstrak lengkap berisi temuan β = −0,412; p = 0,001; R² = 28,6%.",
    hasil: "Tool memprediksi belasan pertanyaan penguji yang paling mungkin muncul dari abstrakmu — seputar alasan memilih topik, teknik sampling, dan makna angka hasil — masing-masing dilengkapi poin jawaban yang bisa kamu latih sebelum sidang."
  }
},
k46: {
  tampil: {
    input: "Tool ini berupa diagram yang dibangun langkah demi langkah: isi Topik Pusat (misalnya 'Skripsi Saya'), tambah cabang 'Latar Belakang', 'Rumusan Masalah', 'Metode', 'Hasil', lalu beri sub-poin pada tiap cabangnya.",
    hasil: "Peta pikiran tergambar otomatis mengikuti isi cabang dan sub-poinmu — cocok untuk memetakan Bab I–V sebelum menulis, dan bisa diunduh sebagai gambar untuk ditempel di proposal atau laporan."
  }
},
k47: {
  isi: { fields: { "#fcIn": "Apa kepanjangan SPSS? | Statistical Package for the Social Sciences\nApa fungsi uji validitas? | Mengukur ketepatan instrumen mengukur apa yang seharusnya diukur\nApa yang dimaksud populasi? | Seluruh subjek yang menjadi sasaran penelitian\nApa syarat data untuk regresi? | Berdistribusi normal, linear, dan tidak ada multikolinearitas berat\nApa arti signifikansi 0,001? | Peluang hasil ini muncul karena kebetulan hanya 0,1% — pengaruh dinyatakan signifikan" } },
  tampil: {
    input: "Lima pasang soal-jawaban ujian Metodologi Penelitian, format 'Soal | Jawaban':\nApa kepanjangan SPSS? | Statistical Package for the Social Sciences\nApa fungsi uji validitas? | Mengukur ketepatan instrumen […]\nApa arti signifikansi 0,001? | Peluang hasil ini muncul karena kebetulan hanya 0,1% […]",
    hasil: "Tiap baris menjadi kartu flashcard yang bisa dibalik (soal di depan, jawaban di belakang) lengkap dengan mode acak dan mode ujian — hafalkan materi sidang atau UAS dengan cara aktif, bukan sekadar membaca ulang."
  }
},
k48: {
  isi: { fields: {
    "#cnJud": "Bab 3 — Metode Penelitian Kuantitatif", "#cnTgl": "2026-10-20",
    "#cnCue": "Mengapa survei dipilih?\nApa syarat sampel representatif?\nRumus Slovin dipakai untuk apa?",
    "#cnNote": "Survei dipilih karena populasi tersebar di banyak kelas dan data yang dibutuhkan berupa persepsi yang terukur lewat angket.\nSampel representatif berarti setiap anggota populasi berpeluang terpilih dan ciri sampel mencerminkan populasi.\nRumus Slovin menentukan jumlah sampel minimum dari populasi yang diketahui dengan margin error tertentu.",
    "#cnSum": "Metode survei dengan sampel Slovin yang representatif adalah fondasi agar hasil penelitian dapat digeneralisasikan ke populasi."
  } },
  tampil: {
    input: "Catatan kuliah 'Bab 3 — Metode Penelitian Kuantitatif': tiga pertanyaan isyarat (cue) di kolom kiri, penjelasan lengkapnya di kolom catatan, dan satu kalimat ringkasan di bagian bawah.",
    hasil: "Tool menyusun lembar Cornell Notes rapi tiga zona (Cue–Notes–Summary) siap unduh sebagai .doc; saat belajar, tutup kolom catatan dan uji ingatanmu hanya dari pertanyaan isyaratnya."
  }
},
k29: {
  isi: { fields: { "#rdIn": "Kelompok Melati\nKelompok Mawar\nKelompok Anggrek\nKelompok Tulip\nKelompok Sakura\nKelompok Dahlia\nKelompok Flamboyan\nKelompok Kenanga" } },
  tampil: {
    input: "Delapan nama kelompok (Melati, Mawar, Anggrek, Tulip, Sakura, Dahlia, Flamboyan, Kenanga), satu nama per baris.",
    hasil: "Roda undian berputar dan berhenti pada satu kelompok secara acak — nama yang terpilih tampil besar, dan daftar tersisa tersimpan untuk putaran berikutnya sampai semua kelompok kebagian tampil."
  }
},
k55: {
  isi: { fields: { "#fpIn": "Validitas | Kemampuan instrumen mengukur apa yang seharusnya diukur\nReliabilitas | Konsistensi hasil pengukuran bila dilakukan berulang\nPopulasi | Seluruh subjek sasaran penelitian\nSampel | Sebagian populasi yang diteliti dan dianggap mewakili\nHipotesis | Jawaban sementara atas rumusan masalah yang akan diuji" } },
  tampil: {
    input: "Lima pasang istilah–definisi format 'Istilah | Definisi': Validitas, Reliabilitas, Populasi, Sampel, Hipotesis.",
    hasil: "Istilah-istilah itu tersusun menjadi lembar flashcard dua sisi yang rapi dan siap cetak (potong mengikuti garis kartu) — versi fisik dari kartu belajar untuk dibawa dan dihafalkan di mana saja."
  }
},
cloze: {
  isi: { fields: {
    "#czTeks": "Penelitian kuantitatif adalah penelitian yang menekankan pada pengukuran variabel secara numerik dan analisis statistik. Populasi adalah seluruh subjek yang menjadi sasaran penelitian, sedangkan sampel adalah bagian dari populasi yang dipilih untuk diteliti. Instrumen yang baik harus memenuhi syarat validitas dan reliabilitas. Data yang terkumpul kemudian dianalisis untuk menguji hipotesis yang telah dirumuskan.",
    "#czN": "5"
  } },
  tampil: {
    input: "Paragraf materi metode penelitian (4 kalimat) dengan jumlah lubang yang diminta: 5.",
    hasil: "Tool menyembunyikan 5 kata kunci dari paragraf menjadi ____ dan menghasilkan lembar latihan isian beserta kunci jawabannya — cara cepat membuat soal latihan atau kuis dari materi kuliahmu sendiri."
  }
},

/* ================= KELOMPOK ================= */
k35: {
  tampil: {
    input: "Tool desain dengan pratinjau langsung: ketik nama acara dan daftar nama penerima — pratinjau sertifikat di sebelah formulir berubah seketika mengikuti isianmu, itulah 'contoh'-nya.",
    hasil: "Setiap nama menghasilkan satu sertifikat pada posisi nama yang bisa digeser (X/Y/ukuran/warna diatur lewat panel), lengkap dengan logo latar opsional — semua sertifikat diunduh sekaligus dalam satu berkas ZIP."
  }
},
k31: {
  isi: { fields: {
    "#lbNama": "Rani Puspita", "#lbProg": "KKN Tematik Kelompok 12", "#lbLok": "Desa Sukamaju, Kec. Ilir Timur",
    "#lbTgl": "2026-10-14", "#lbKeg": "Sosialisasi program kerja KKN kepada perangkat desa dan warga",
    "#lbHas": "25 warga hadir; tiga program kerja disetujui untuk dilaksanakan mulai minggu ini",
    "#lbKen": "Hujan deras — kegiatan dipindahkan dari lapangan ke balai desa"
  } },
  tampil: {
    input: "Entri logbook 14 Oktober 2026: kegiatan 'Sosialisasi program kerja KKN kepada perangkat desa dan warga', hasil '25 warga hadir; tiga program kerja disetujui', kendala 'Hujan deras — kegiatan dipindahkan ke balai desa'.",
    hasil: "Entri tersimpan ke logbook kelompok; entri-entri harian berikutnya menumpuk menjadi satu dokumen logbook resmi (unduhan .doc) yang ditandatangani DPL di akhir masa KKN."
  }
},
kelompok: {
  isi: { fields: {
    "#kIn": "Andi, L\nSari, P\nBudi, L\nCitra, P\nDewi, P\nEko, L\nFitri, P\nGilang, L\nHana, P\nIrfan, L\nJoko, L\nRina, P",
    "#kN": "3", "#kBal": true
  } },
  tampil: {
    input: "Dua belas nama dengan penanda gender (format 'Nama, L/P'), jumlah kelompok yang diminta: 3, penyeimbang gender aktif.",
    hasil: "Tool membagi 12 nama itu menjadi 3 kelompok berisi 4 orang secara acak, dengan komposisi L/P yang diseimbangkan antar kelompok — tidak ada lagi drama memilih teman sendiri di kelas."
  }
},
splitter: {
  isi: { fields: { "#spIn": "Andi : 90000\nSari : 30000\nBudi : 0\nCitra : 60000" } },
  tampil: {
    input: "Andi : 90000 • Sari : 30000 • Budi : 0 • Citra : 60000 (total patungan Rp180.000 untuk 4 orang)",
    hasil: "Rata-rata patungan Rp45.000 per orang. Tool menghitung siapa berutang ke siapa dengan transfer seminimal mungkin: Budi membayar Rp45.000 (misalnya ke Andi), Sari membayar Rp15.000, dan Andi menerima kembali kelebihan bayarnya — tagihan kelompok lunas tanpa transfer berputar-putar."
  }
},
lpj: {
  isi: { fields: {
    "#lpKeg": "Seminar Nasional Kewirausahaan 2026", "#lpPeny": "HIMA Pendidikan Ekonomi",
    "#lpTgl": "14 November 2026", "#lpDana": "5000000",
    "#lpRab": "Transport narasumber | 1000000\nKonsumsi peserta | 2500000\nSewa aula | 750000\nDokumentasi | 500000"
  } },
  tampil: {
    input: "Kegiatan 'Seminar Nasional Kewirausahaan 2026' oleh HIMA Pendidikan Ekonomi; dana diterima Rp5.000.000; RAB berisi transport narasumber 1.000.000, konsumsi 2.500.000, sewa aula 750.000, dokumentasi 500.000.",
    hasil: "Tool menyusun LPJ lengkap dalam .doc — susunan acara, tabel realisasi anggaran (total terpakai Rp4.750.000, sisa Rp250.000 terhitung otomatis), dan kolom tanda tangan — sesuai pakem laporan pertanggungjawaban organisasi kampus."
  }
},
k32: {
  isi: { fields: {
    "#kwNo": "001/KWT/HIMA/XI/2026", "#kwDari": "Bendahara Umum HIMA", "#kwJml": "1500000",
    "#kwUntuk": "Konsumsi kegiatan sosialisasi posyandu Desa Sukamaju", "#kwTgl": "2026-11-14", "#kwNama": "Dewi Anggraini"
  } },
  tampil: {
    input: "Nomor kwitansi 001/KWT/HIMA/XI/2026 • Dari Bendahara Umum HIMA • Jumlah Rp1.500.000 • Untuk konsumsi kegiatan sosialisasi posyandu Desa Sukamaju • Penerima Dewi Anggraini.",
    hasil: "Tool mencetak kwitansi resmi dua rangkap (untuk penerima dan arsip) dengan jumlah terbilang otomatis — 'Satu Juta Lima Ratus Ribu Rupiah' — siap ditandatangani dan ditempeli materai bila diperlukan."
  }
},
k30: {
  tampil: {
    input: "Tool ini berupa kalender grid: klik tanggal pada kalender berjalan, beri nama acara dan kategori warna (Ujian/Kumpul/Libur/dsb.), lalu tanggal itu tercatat. Tidak ada kolom teks bebas yang perlu dicontohkan.",
    hasil: "Tanggal-tanggal pentingmu tampil berwarna di grid kalender akademik yang bisa dicetak atau diunduh sebagai daftar tenggat — sekilas terlihat mana minggu yang padat ujian dan tugas."
  }
},
peerassess: {
  isi: { fields: {
    "#perAnggota": "Andi Pratama\nSari Dewi\nBudi Santoso\nCitra Lestari",
    "#perNilai": "85", "#perB1": "25", "#perB2": "25", "#perB3": "25", "#perB4": "25"
  } },
  tampil: {
    input: "Empat anggota kelompok (Andi, Sari, Budi, Citra), nilai kelompok dari dosen 85, dan bobot kontribusi empat aspek masing-masing 25%.",
    hasil: "Setelah tiap anggota dinilai per aspek pada panel penilaian, tool menggabungkan nilai kelompok dengan kontribusi individu menjadi nilai akhir per orang — anggota yang paling berkontribusi mendapat nilai tertinggi, dituangkan dalam berita acara penilaian (.doc)."
  }
},
prorata: {
  isi: { fields: {
    "#proDari": "2026-10-01", "#proSampai": "2026-10-31",
    "#proListrik": "450000", "#proWifi": "300000", "#proAir": "150000",
    "#proPenghuni": "Andi | 2026-10-01 | 2026-10-31 | 1\nBudi | 2026-10-11 | 2026-10-31 | 1\nCitra | 2026-10-01 | 2026-10-20 | 1"
  } },
  tampil: {
    input: "Periode 1–31 Oktober 2026; tagihan listrik Rp450.000, WiFi Rp300.000, air Rp150.000 (total Rp900.000); penghuni: Andi (sebulan penuh), Budi (masuk 11 Oktober), Citra (keluar 20 Oktober).",
    hasil: "Tagihan dibagi adil menurut jumlah malam tinggal: penghuni sebulan penuh membayar paling besar, Budi yang tinggal 21 malam dan Citra 20 malam membayar proporsional lebih kecil — rincian per orang tampil dan siap diunduh sebagai .doc untuk ditempel di grup kos."
  }
},
hadir: {
  isi: { fields: {
    "#hdKegiatan": "Sosialisasi Program Kerja KKN Kelompok 12", "#hdPeny": "KKN Universitas Cendekia Nusantara",
    "#hdTgl": "Rabu, 14 Oktober 2026", "#hdWaktu": "09.00–11.00 WIB, Balai Desa Sukamaju",
    "#hdPimpin": "Bapak Kepala Desa Sukamaju", "#hdNotulis": "Rani Puspita",
    "#hdNama": "H. Suparman — Kepala Desa\nSri Wahyuni — Ketua PKK\nJoko Prasetyo — Karang Taruna\nSiti Aminah — Kader Posyandu\nRudi Hartono — Ketua RT 03",
    "#hdHasil": "Tiga program kerja KKN disetujui warga: pendampingan UMKM, bimbingan belajar anak, dan pelatihan administrasi digital untuk perangkat desa."
  } },
  tampil: {
    input: "Kegiatan 'Sosialisasi Program Kerja KKN Kelompok 12', dipimpin Kepala Desa, notulis Rani Puspita, daftar hadir lima nama beserta jabatannya, dan hasil rapat persetujuan tiga program kerja.",
    hasil: "Tool menghasilkan dokumen daftar hadir lengkap dengan kolom tanda tangan bernomor untuk dicetak, dan — pada mode Berita Acara — notulen resmi berisi hasil rapat yang ditandatangani pimpinan dan notulis."
  }
},
k33: {
  tampil: {
    input: "Tool perencana visual: tambah kegiatan satu per satu lewat formulir (nama kegiatan, minggu mulai, durasi, penanggung jawab) — setiap kegiatan langsung muncul sebagai batang pada diagram Gantt.",
    hasil: "Diagram Gantt 16 minggu tergambar dari kegiatan-kegiatanmu; geser minggu mulai/durasi lewat formulir bila jadwal berubah, lalu unduh diagramnya untuk proposal kegiatan atau laporan."
  }
},
k34: {
  tampil: {
    input: "Tool visual: isi nama ketua, wakil, sekretaris, dan bendahara — bagan organisasi tergambar langsung sebagai pratinjau. Divisi di bawahnya ditambah lewat tombol Tambah Divisi.",
    hasil: "Struktur organisasi tampil sebagai bagan bertingkat yang rapi dan bisa diunduh sebagai gambar — siap ditempel ke proposal kegiatan, LPJ, atau profil organisasi kampusmu."
  }
},
k36: {
  tampil: {
    input: "Tool desain dengan pratinjau langsung: ketik tiga baris teks sambutan dan pilih tema — wallpaper yang tergambar di pratinjau berubah seketika, itulah contohnya.",
    hasil: "Wallpaper HP berisi tulisan sambutanmu (misalnya nama desa dan posko KKN) siap diunduh sebagai gambar untuk dipasang di layar kunci HP seluruh anggota kelompok."
  }
},

/* ================= DOKUMEN ================= */
pdfsign: {
  isi: { file: { target: "#psFile", nama: "Contoh_Surat_Izin.pdf", jenis: "pdf",
      judul: "Surat Izin Penelitian",
      baris: ["Palembang, 20 Oktober 2026", "", "Kepada Yth. Kepala SMA Negeri 1 Palembang", "di tempat", "", "Dengan hormat,", "Saya yang bertanda tangan di bawah ini, Rani Puspita (NIM 2201010456),", "mahasiswa S1 Pendidikan Ekonomi Universitas Cendekia Nusantara,", "memohon izin melaksanakan penelitian skripsi di sekolah Bapak/Ibu", "pada tanggal 26–30 Oktober 2026.", "", "Demikian surat ini saya sampaikan. Atas perhatian dan izin yang", "diberikan, saya ucapkan terima kasih.", "", "Hormat saya,"],
      halamanLanjutan: "Lampiran: proposal penelitian dan surat pengantar kampus." },
    fields: { "#psStampText": "HIMA Pendidikan Ekonomi" } },
  tampil: {
    input: "Berkas PDF contoh berupa Surat Izin Penelitian (coba lewat tombol Siapkan File Contoh di dalam tool), dan teks stempel organisasi: HIMA Pendidikan Ekonomi.",
    hasil: "Tool membubuhkan tanda tangan digital di halaman terakhir PDF dan stempel organisasi pada berkas — dokumen hasil unduhan siap dikirim sebagai lampiran resmi, lengkap dengan keterangan halaman dan posisi tanda tangan yang kamu pilih."
  }
},
pdforg: {
  isi: { file: { target: "#poFile", nama: "Contoh_Bab_Skripsi_Berantakan.pdf", jenis: "pdf",
    judul: "BAB I — Pendahuluan",
    baris: ["1.1 Latar Belakang", "Media sosial telah menjadi bagian dari kehidupan siswa sehari-hari.", "Rata-rata siswa mengakses media sosial lebih dari tiga jam per hari.", "", "1.2 Rumusan Masalah", "Apakah penggunaan media sosial berpengaruh terhadap prestasi belajar?", "", "1.3 Tujuan Penelitian", "Mengetahui pengaruh penggunaan media sosial terhadap prestasi belajar."],
    halamanLanjutan: "BAB II — Tinjauan Pustaka (halaman ini sengaja ditaruh di akhir oleh contoh, untuk kamu geser ke depan lewat tool)." } },
  tampil: {
    input: "Berkas PDF contoh 2 halaman yang urutan halamannya sengaja tidak ideal (Bab II di halaman terakhir).",
    hasil: "Semua halaman tampil sebagai thumbnail yang bisa kamu seret untuk mengurutkan ulang, diputar, atau dihapus — hasil susunan baru diunduh sebagai satu PDF rapi tanpa mengubah isi halamannya."
  }
},
pdftab2xls: {
  isi: { file: { target: "#ptFile", nama: "Contoh_Tabel_Nilai.pdf", jenis: "pdf",
    tabel: { kepala: ["No", "Nama", "Kelas", "Nilai"],
      baris: [["1", "Andini", "XI-A", "88"], ["2", "Bagas", "XI-A", "76"], ["3", "Citra", "XI-B", "92"], ["4", "Dimas", "XI-B", "81"], ["5", "Eka", "XI-C", "79"], ["6", "Fajar", "XI-C", "85"]] } } },
  tampil: {
    input: "Berkas PDF contoh berisi satu tabel nilai berisi 6 siswa (No, Nama, Kelas, Nilai).",
    hasil: "Tool mendeteksi tabel di dalam PDF dan mengubahnya menjadi berkas Excel (.xlsx) dengan baris dan kolom yang sama — tidak perlu lagi mengetik ulang tabel dari PDF dosen atau jurnal."
  }
},
xlsmerger: {
  isi: { file: { target: "#xmFiles", nama: "Contoh_Data_KelasA.xlsx", jenis: "xlsx",
    sheets: [{ nama: "Sheet1", baris: [
      ["Nama", "Kelas", "Nilai"],
      ["Andini", "XI-A", 88], ["Bagas", "XI-A", 76], ["Citra", "XI-A", 92], ["Dimas", "XI-A", 81]
    ] }] } },
  tampil: {
    input: "Berkas Excel contoh berisi data nilai satu kelas (Nama, Kelas, Nilai). Untuk merasakan fungsi gabungnya, siapkan contoh ini dua kali atau tambahkan berkas kelas lain milikmu.",
    hasil: "Tool menumpuk baris dari semua berkas yang kamu berikan menjadi satu sheet — kolom diselaraskan menurut nama header — dan hasilnya diunduh sebagai satu .xlsx gabungan."
  }
},
xls2pdf: {
  isi: { file: { target: "#xpFile", nama: "Contoh_Rekap_Responden.xlsx", jenis: "xlsx",
    sheets: [{ nama: "Sheet1", baris: [
      ["No", "Nama", "Jenis Kelamin", "Usia", "Skor X", "Skor Y"],
      [1, "Responden 01", "P", 17, 82, 80], [2, "Responden 02", "L", 17, 74, 71],
      [3, "Responden 03", "P", 16, 90, 88], [4, "Responden 04", "L", 17, 68, 66],
      [5, "Responden 05", "P", 17, 85, 83], [6, "Responden 06", "L", 16, 79, 77]
    ] }] },
    fields: { "#xpTitle": "Rekap Data Responden Penelitian" } },
  tampil: {
    input: "Berkas Excel contoh berisi rekap 6 responden (No, Nama, Jenis Kelamin, Usia, Skor X, Skor Y) dan judul dokumen 'Rekap Data Responden Penelitian'.",
    hasil: "Sheet Excel berubah menjadi PDF dengan judul dokumen, tabel yang menyesuaikan lebar halaman, dan nomor halaman — format rapi untuk lampiran laporan atau bukti data penelitian."
  }
},
bibtex: {
  isi: { fields: {
    "#bibIn": "@article{rahmawati2022hubungan,\n  title={Hubungan Intensitas Media Sosial dengan Konsentrasi Belajar Siswa},\n  author={Rahmawati, Dewi and Putri, Sari Ayu},\n  journal={Jurnal Psikologi Pendidikan},\n  volume={14}, number={2}, pages={101--112}, year={2022}\n}\n\n@book{sugiyono2019metode,\n  title={Metode Penelitian Kuantitatif, Kualitatif, dan R\\&D},\n  author={Sugiyono},\n  publisher={Alfabeta}, address={Bandung}, year={2019}\n}",
    "#bibMode": "bib", "#bibGaya": "apa"
  } },
  tampil: {
    input: "Dua entri BibTeX mentah (satu artikel jurnal 2022, satu buku metode penelitian 2019) — format yang biasa diekspor dari Google Scholar, Zotero, atau Mendeley.",
    hasil: "Tool mengubahnya menjadi daftar pustaka terbaca — gaya APA 7: Rahmawati, D., & Putri, S. A. (2022). Hubungan intensitas media sosial dengan konsentrasi belajar siswa. Jurnal Psikologi Pendidikan, 14(2), 101–112 — dan tersedia juga gaya IEEE dan Vancouver."
  }
},
poster: {
  tampil: {
    input: "Tool desain dengan pratinjau langsung: isi judul, abstrak, metode, temuan, dan kesimpulan — poster ilmiah tergambar seketika di pratinjau mengikuti teksmu, itulah contohnya.",
    hasil: "Poster satu halaman ukuran presentasi dengan tata letak konferensi (judul, kolom metode–temuan–kesimpulan, kode QR tautan) siap diunduh sebagai gambar untuk dicetak atau ditampilkan di sesi poster."
  }
},
k37: {
  tampil: {
    input: "Tool pengolah foto dengan pratinjau langsung: unggah foto selfie/foto resmi — hasil pas foto tampil di pratinjau begitu latar diganti dan ukuran dipilih, itulah contohnya.",
    hasil: "Foto berubah menjadi pas foto resmi berlatar merah/biru (atau warna pilihan) dalam ukuran 2×3, 3×4, atau 4×6 — siap unduh untuk syarat berkas wisuda, beasiswa, dan lamaran."
  }
},
k43: {
  isi: { file: [
    { target: "#pmFile", nama: "Contoh_Laporan.pdf", jenis: "pdf", salin: 2,
      judul: "Laporan Kegiatan KKN — Minggu Pertama",
      baris: ["Kelompok 12 — Desa Sukamaju", "", "Senin: tiba di desa dan silaturahmi ke balai desa.", "Selasa: observasi UMKM dan pemetaan masalah.", "Rabu: sosialisasi program kerja kepada warga.", "Kamis: pendampingan bimbingan belajar anak.", "Jumat: evaluasi minggu pertama bersama DPL."],
      halamanLanjutan: "Lampiran dokumentasi minggu pertama (foto kegiatan menyusul di berkas terpisah)." },
    { target: "#psFile", nama: "Contoh_Dokumen_Panjang.pdf", jenis: "pdf",
      judul: "Dokumen Contoh untuk Dipisah",
      baris: ["Halaman pertama dokumen contoh.", "Dokumen ini dibuat hanya untuk mencoba fitur pisah PDF:", "pisahkan rentang halaman 1–2 untuk melihat hasilnya."],
      halamanLanjutan: "Halaman kedua dokumen contoh — bagian ini yang akan ikut terpisah bila rentang 1–2 dipilih." }
  ], fields: { "#psRange": "1-2" } },
  tampil: {
    input: "Di bagian Gabung PDF: satu berkas laporan KKN contoh (disiapkan dua salinan oleh tombol contoh agar penggabungan langsung terasa). Di bagian Pisah PDF: dokumen contoh 2 halaman dengan rentang pisah terisi 1–2.",
    hasil: "Gabung: kedua berkas menyatu menjadi satu PDF berurutan. Pisah: halaman 1–2 terunduh sebagai PDF tersendiri — dua operasi dasar pengelolaan PDF untuk lampiran skripsi dan berkas administrasi."
  }
},
splitpdf: {
  isi: { file: { target: "#psFile", nama: "Contoh_Dokumen_Panjang.pdf", jenis: "pdf",
      judul: "Dokumen Contoh untuk Dipisah",
      baris: ["Halaman pertama dokumen contoh.", "Dokumen ini dibuat hanya untuk mencoba fitur pisah PDF:", "pisahkan rentang halaman 1–2 untuk melihat hasilnya."],
      halamanLanjutan: "Halaman kedua dokumen contoh — bagian ini yang akan ikut terpisah bila rentang 1–2 dipilih." },
    fields: { "#psRange": "1-2" } },
  tampil: {
    input: "Berkas PDF contoh 2 halaman dengan rentang pisah terisi '1-2'.",
    hasil: "Tool memotong halaman 1–2 menjadi berkas PDF tersendiri yang siap diunduh — cara cepat mengambil hanya bab atau lampiran tertentu dari dokumen panjang."
  }
},
imgpdf: {
  isi: { file: { target: "#ipFile", nama: "Contoh_Scan_Ijazah.png", jenis: "png", mode: "dokumen",
    teks: ["IJAZAH (CONTOH)", "Sekolah Menengah Atas", "Diberikan kepada: Rani Puspita", "Telah menyelesaikan pendidikan dan", "dinyatakan LULUS tahun 2022."] } },
  tampil: {
    input: "Gambar contoh berupa scan dokumen ijazah (coba lewat tombol Siapkan File Contoh di dalam tool).",
    hasil: "Gambar berubah menjadi satu berkas PDF — bila kamu menambahkan beberapa gambar, urutannya bisa digeser dulu sebelum digabung; cocok untuk menyatukan scan KTP, ijazah, dan transkrip menjadi satu lampiran PDF."
  }
},
k44: {
  tampil: {
    input: "Tool pengolah gambar dengan pratinjau langsung: unggah foto — ukuran hasil kompres dan perbandingan kualitasnya tampil seketika di pratinjau, itulah contohnya.",
    hasil: "Foto menyusut ke target ukuran yang kamu pilih (misalnya di bawah 200 KB untuk formulir daring) dengan kualitas terbaik yang masih mungkin — siap unduh tanpa perlu aplikasi tambahan."
  }
},
pdfstamp: {
  isi: { file: { target: "#psFile", nama: "Contoh_Draf_Skripsi.pdf", jenis: "pdf",
      judul: "Draf Skripsi — Bab I (Contoh)",
      baris: ["1.1 Latar Belakang", "Media sosial telah menjadi bagian dari kehidupan siswa sehari-hari.", "Draf ini masih menunggu persetujuan pembimbing."],
      halamanLanjutan: "1.2 Rumusan Masalah — apakah media sosial berpengaruh terhadap prestasi belajar?" },
    fields: { "#psWm": "DRAF SKRIPSI" } },
  tampil: {
    input: "Berkas PDF contoh berupa draf Bab I skripsi, dengan teks watermark terisi 'DRAF SKRIPSI'.",
    hasil: "Setiap halaman PDF hasil unduhan terbubuhi watermark diagonal 'DRAF SKRIPSI' — draf yang kamu kirim ke dosen atau teman tidak akan tertukar dengan versi final."
  }
},
k41: {
  tampil: {
    input: "Tool desain dengan pratinjau langsung: ketik tautan (misalnya link Google Form kuesionermu) dan labelnya — kode QR tergambar seketika di pratinjau, itulah contohnya.",
    hasil: "Kode QR berlabel siap unduh sebagai gambar — tempel di poster penelitian, slide sidang, atau bio media sosial agar responden bisa memindai dan langsung mengisi kuesionermu."
  }
},
k42: {
  isi: { file: { target: "#ocFile", nama: "Contoh_Foto_Teks.png", jenis: "png", mode: "teks",
    teks: ["BAB I", "PENDAHULUAN", "Penelitian ini bertujuan untuk mengetahui", "pengaruh media sosial terhadap prestasi", "belajar siswa SMA. Metode yang digunakan", "adalah survei dengan 68 responden."] } },
  tampil: {
    input: "Gambar contoh berisi teks tercetak 'BAB I PENDAHULUAN — Penelitian ini bertujuan untuk mengetahui pengaruh media sosial…' (coba lewat tombol Siapkan File Contoh di dalam tool).",
    hasil: "Tool menjalankan OCR (Tesseract) pada gambar dan mengeluarkan teksnya dalam Bahasa Indonesia/Inggris yang bisa disalin atau diunduh — ketik ulang dari foto papan tulis, buku, atau berkas lama tidak perlu lagi."
  }
},
k39: {
  tampil: {
    input: "Tool pengolah foto dengan pratinjau langsung: unggah foto dokumentasi dan ketik teks watermark — hasil foto berwatermark tampil seketika di pratinjau, itulah contohnya.",
    hasil: "Foto kegiatanmu terbubuhi watermark teks (nama organisasi/kegiatan) dengan posisi dan transparansi pilihanmu — aman dibagikan ke media sosial tanpa takut dipakai ulang pihak lain."
  }
},
k38: {
  tampil: {
    input: "Tool pengolah gambar dengan pratinjau langsung: unggah foto tanda tangan di kertas putih — hasil tanda tangan berlatar transparan tampil seketika di pratinjau, itulah contohnya.",
    hasil: "Tanda tangan terpotong rapi berlatar transparan (PNG) yang bisa ditempel ke dokumen Word atau digabungkan ke PDF — tidak ada lagi kotak putih mengganggu di sekitar tanda tangan."
  }
},
k40: {
  tampil: {
    input: "Tool pengolah foto dengan pratinjau langsung: unggah foto kegiatan dan isi lokasi/acaranya — foto berstempel waktu dan lokasi tampil seketika di pratinjau, itulah contohnya.",
    hasil: "Foto dokumentasi terbubuhi cap tanggal, jam, dan lokasi ala aplikasi kamera lapangan — bukti otentik untuk lampiran logbook KKN, laporan magang, dan dokumentasi penelitian."
  }
},

/* ================= KARIR ================= */
ipk: {
  isi: { fields: { "#gNow": "3.42", "#gDone": "96", "#gTarget": "3.60", "#gLeft": "48" } },
  tampil: {
    input: "IPK saat ini 3,42 dari 96 SKS yang sudah ditempuh; target IPK akhir 3,60 dengan sisa 48 SKS.",
    hasil: "Tool menghitung IPK rata-rata yang wajib kamu capai di sisa 48 SKS itu — untuk contoh ini sekitar 3,96, nyaris sempurna — lengkap dengan simulasi per semester dan peringatan jujur bila target perlu disesuaikan."
  }
},
k45: {
  tampil: {
    input: "Tool penampil jadwal dengan formulir baris: tambah mata kuliah satu per satu (nama, hari, jam, ruang) — grid jadwal mingguan tergambar langsung dari entri-entrimu, itulah contohnya.",
    hasil: "Jadwal kuliah tampil sebagai grid mingguan berwarna per mata kuliah yang bisa dicetak atau disimpan sebagai pengingat — bentrok jam antar mata kuliah juga lebih mudah terlihat."
  }
},
targetnilai: {
  isi: { fields: { "#tnNama": "Statistika Ekonomi", "#tnTarget": "85" },
    atur: { "_tnKomp": [ { "nama": "Tugas", "bobot": 20, "nilai": 80 }, { "nama": "UTS", "bobot": 30, "nilai": 75 }, { "nama": "UAS", "bobot": 50, "nilai": "" } ] },
    panggil: ["renderTnRows", "hitungTargetNilai"] },
  tampil: {
    input: "Mata kuliah Statistika Ekonomi, target nilai akhir 85. Komponen yang sudah dinilai: Tugas (bobot 20%, nilai 80) dan UTS (bobot 30%, nilai 75) — menyisakan UAS berbobot 50%.",
    hasil: "Tool menghitung nilai UAS minimum yang kamu butuhkan: kontribusi terkumpul 38,5 dari 85, sehingga UAS harus mencapai sekitar 93 — tool juga menyediakan simulasi 'bagaimana jika' untuk mencoba berbagai nilai komponen."
  }
},
masastudi: {
  isi: { fields: { "#msTotal": "144", "#msTempuh": "108", "#msSem": "7", "#msMaks": "14", "#msRencana": "20" } },
  tampil: {
    input: "Total beban 144 SKS, sudah ditempuh 108 SKS, kini semester 7, batas maksimal studi 14 semester, rencana ambil 20 SKS semester ini.",
    hasil: "Tool memproyeksikan sisa 36 SKS ke semester-semester berikutnya dan memperkirakan semester kelulusanmu beserta status risikonya terhadap batas masa studi — untuk contoh ini lulus tepat waktu masih sangat aman."
  }
},
transkrip: {
  isi: { fields: {
    "#trIn": "Pengantar Ekonomi; 3; A; 1\nMatematika Ekonomi; 3; AB; 1\nStatistika Dasar; 3; A; 2\nEkonomi Mikro; 3; B; 2\nBahasa Inggris; 2; A; 2\nEkonomi Makro; 3; AB; 3\nMetodologi Penelitian; 3; A; 3\nKewirausahaan; 2; BC; 3",
    "#trSemTotal": "7"
  } },
  tampil: {
    input: "Delapan baris transkrip format 'Mata Kuliah; SKS; Nilai; Semester' — dari Pengantar Ekonomi (A) sampai Kewirausahaan (BC) — dan total masa studi 7 semester.",
    hasil: "Tool mengubah nilai huruf menjadi bobot angka, menghitung IPK keseluruhan dan IP tiap semester secara otomatis, dan menampilkan tabel transkrip yang bisa diunduh — tanpa menghitung manual satu per satu."
  }
},
k50: {
  isi: { fields: {
    "#mlNama": "Rani Puspita", "#mlKota": "Palembang, 23 Oktober 2026", "#mlTujuan": "Beasiswa Unggulan 2026",
    "#mlInst": "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi", "#mlNim": "2201010456", "#mlProdi": "Pendidikan Ekonomi / FKIP",
    "#mlJudul": "Pengaruh Media Sosial terhadap Prestasi Belajar Siswa SMA Negeri 1 Palembang",
    "#mlWaktu": "Juli 2026", "#mlTempat": "Kampus Universitas Cendekia Nusantara",
    "#mlLatar": "Saya mahasiswa semester 7 Program Studi Pendidikan Ekonomi dengan IPK 3,62. Selama kuliah saya aktif sebagai asisten peneliti dosen dan pernah menjadi mitra statistik pada survei lapangan di kabupaten Lahat.",
    "#mlAlasan": "Beasiswa ini akan meringankan biaya penyelesaian skripsi dan memungkinkan saya fokus meneliti tanpa membebani orang tua yang bekerja sebagai petani.",
    "#mlSkill": "Pengolahan data (SPSS dan Excel), survei lapangan, penulisan laporan penelitian.",
    "#mlKontak": "rani.puspita@email.com • 0812-3456-7890 • linkedin.com/in/ranipuspita"
  } },
  tampil: {
    input: "Data diri mahasiswa semester 7 (IPK 3,62), tujuan Beasiswa Unggulan 2026, latar belakang pengalaman asisten peneliti dan mitra statistik survei, alasan kebutuhan biaya penyelesaian skripsi, dan keterampilan SPSS/Excel/survei.",
    hasil: "Tool merangkai isian itu menjadi surat motivasi (motivation letter) formal satu halaman — pembuka, latar, alasan, dan penutup terstruktur — siap diunduh sebagai .doc dan disesuaikan untuk tiap beasiswa atau program yang kamu daftar."
  }
},
k51: {
  tampil: {
    input: "Tool latihan interaktif: pilih kategori pertanyaan wawancara pada menu (misalnya Perkenalan atau Motivasi), lalu tekan Mulai Pertanyaan — tidak ada kolom teks yang perlu dicontohkan.",
    hasil: "Sepuluh pertanyaan wawancara muncul satu per satu dari bank 110+ pertanyaan; jawab dengan timer latihan dan nilai jawabanmu sendiri untuk melatih kesiapan menghadapi HRD."
  }
},
k52: {
  isi: { fields: { "#evTgl": "2026-11-14", "#evJud": "Batas Kumpul Laporan KKN" } },
  tampil: {
    input: "Acara baru: 'Batas Kumpul Laporan KKN' pada 14 November 2026.",
    hasil: "Acara tersimpan ke kalender tenggat dan countdown menunjukkan sisa hari menuju tanggal itu (dari akhir Oktober: sekitar tiga minggu) — daftar tenggatmu bisa diekspor ke Google Calendar (.ics)."
  }
},
k53: {
  isi: { fields: {
    "#cvNama": "Rani Puspita", "#cvPosisi": "Staff Administrasi", "#cvEmail": "rani.puspita@email.com",
    "#cvTelp": "081234567890", "#cvKota": "Palembang", "#cvLink": "linkedin.com/in/ranipuspita",
    "#cvRingkas": "Lulusan S1 Pendidikan Ekonomi dengan pengalaman survei lapangan dan pengolahan data. Teliti, terbiasa bekerja dengan target, dan mahir Microsoft Excel serta SPSS.",
    "#cvExp": "Assistant Survey | PT Anugrah Bumi Lestari | 2023 | Mengumpulkan dan memvalidasi data survei lapangan dari 200+ responden\nAdmin Data (Magang) | BPS Kabupaten Lahat | 2026 | Menginput dan memeriksa data statistik kependudukan",
    "#cvEdu": "Universitas Cendekia Nusantara | S1 Pendidikan Ekonomi | 2022–2026",
    "#cvSkill": "Microsoft Excel, SPSS, Survei Lapangan, Administrasi Perkantoran, Google Workspace"
  } },
  tampil: {
    input: "Profil pelamar 'Rani Puspita — Staff Administrasi', ringkasan profesional dua kalimat, dua pengalaman (Assistant Survey dan magang Admin Data BPS) dalam format Posisi | Perusahaan | Tahun | Deskripsi, pendidikan S1, dan lima keahlian.",
    hasil: "Tool menyusun CV ATS-friendly satu halaman dengan struktur yang terbaca sistem rekrutmen — kontak, ringkasan, pengalaman, pendidikan, keahlian — siap diunduh sebagai .doc untuk dilampirkan ke lamaran."
  }
},
k54: {
  tampil: {
    input: "Tool checklist interaktif tanpa kolom bebas: daftar pernyataan diri ditampilkan satu per satu dan kamu menjawab Setuju/Netral/Tidak Setuju dengan jujur.",
    hasil: "Di akhir, tool menampilkan profil kesiapan karirmu pada sembilan pernyataan dan tingkatan persiapannya — bahan refleksi sebelum menyusun CV dan melamar."
  }
},
chatdosen: {
  isi: { fields: {
    "#cNama": "Rani Puspita", "#cNim": "2201010456", "#cProdi": "S1 Pendidikan Ekonomi, Kelas A Semester 7",
    "#cDosen": "Dr. Budi Santoso, M.Si.", "#cMatkul": "Metodologi Penelitian",
    "#cDetail": "meminta perpanjangan pengumpulan Bab III sampai hari Jumat karena data kuesioner dari sekolah belum lengkap terkumpul"
  } },
  tampil: {
    input: "Mahasiswa Rani Puspita (NIM 2201010456) ke dosen Dr. Budi Santoso, M.Si. untuk mata kuliah Metodologi Penelitian; keperluan: meminta perpanjangan pengumpulan Bab III sampai Jumat karena data kuesioner belum lengkap.",
    hasil: "Tool menyusun draf chat WhatsApp yang sopan dan terstruktur — salam, perkenalan diri lengkap, keperluan yang jelas, dan penutup terima kasih — siap salin; tersedia dua bahasa (Indonesia santai-sopan dan Inggris formal)."
  }
},
combo55: {
  isi: { fields: {
    "#bUang": "1500000", "#bTab": "200000", "#bKos": "600000", "#bListrik": "100000", "#bKuota": "75000", "#bLain": "150000",
    "#tbIn": "2750000", "#rmIn": "2026"
  } },
  tampil: {
    input: "Anggaran kos sebulan: uang masuk Rp1.500.000; tabungan Rp200.000; kos Rp600.000; listrik Rp100.000; kuota Rp75.000; lain-lain Rp150.000. Terbilang: angka 2750000. Remedial: tahun ajaran 2026.",
    hasil: "Panel anggaran menunjukkan sisa dana Rp375.000 (aman, berwarna hijau). Panel terbilang menulis 'Dua Juta Tujuh Ratus Lima Puluh Ribu'. Panel remedial menghitung jumlah mata kuliah yang boleh diulang menurut aturan semester berjalan — tiga tool mini dalam satu halaman."
  }
},
biaya: {
  isi: { fields: { "#byUkt": "2500000", "#bySisa": "4", "#byPunya": "1750000", "#byBulan": "10" } },
  tampil: {
    input: "UKT per semester Rp2.500.000, sisa masa studi 4 semester, dana yang sudah dimiliki Rp1.750.000, dan waktu menabung 10 bulan.",
    hasil: "Tool menghitung total kebutuhan Rp10.000.000, kekurangan Rp8.250.000, dan target tabungan wajib sekitar Rp825.000 per bulan — lengkap dengan analisis kelayakan terhadap sisa masa studi."
  }
},
sks: {
  isi: { fields: { "#skJamHari": "6", "#skHariMgg": "5", "#skMinggu": "16", "#skTarget": "20" } },
  tampil: {
    input: "Waktu belajar mandiri 6 jam/hari, 5 hari/minggu, selama 16 minggu efektif, dengan rencana mengambil 20 SKS.",
    hasil: "Tool menghitung total jam belajarmu (960 jam) dan membandingkannya dengan beban ideal 20 SKS menurut aturan 1 SKS = 170 menit per minggu — kesimpulannya menunjukkan apakah rencana ambil SKS-mu realistis dengan waktu yang kamu punya."
  }
}

};
