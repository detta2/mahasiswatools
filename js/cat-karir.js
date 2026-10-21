/* FILE HASIL GENERATE dari app.js oleh build/split.js — jangan edit langsung. */
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
;
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
;
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

;
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

renderTabs(); renderGrid();

;

/* ============================================================
   TOOLS 16–22 (+ pemuat library eksternal)
   ============================================================ */

;
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
  ctx.fillText("MahasiswaTools • Dari Mahasiswa, Untuk Mahasiswa", W / 2, H - 60);
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
;
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


;
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

;
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
;
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

;
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

;
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

;
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

;
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
  x.font = "italic 20px Georgia, serif"; x.fillText("Dihitung dengan MahasiswaTools — Dari Mahasiswa, Untuk Mahasiswa", 52, 524);
  cv.toBlob((b) => { const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "MahasiswaTools_Kartu_Target_" + nama.replace(/\s+/g, "_") + ".png"; document.body.appendChild(a); a.click(); a.remove(); }, "image/png");
}
SHARE_GETTERS.targetnilai = function () { const h = window._tnHasil; if (!h || h.perlu == null) return ""; return "Target nilai " + ($("#tnNama").value || "mata kuliah") + ": saya butuh minimal " + fmtN(h.perlu, 1) + " di " + h.komponen + " untuk mencapai nilai akhir " + ($("#tnTarget").value || 80) + "."; };

/* ============================================================
   TOOL 80 — MANAJER REVISI PASCA-SIDANG
   ============================================================ */
;
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
