/* FILE HASIL GENERATE dari app.js oleh build/split.js — jangan edit langsung. */
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

;
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

;
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

;
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

;
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

;
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

;
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
  svg += '<text x="' + (W / 2) + '" y="' + (H - 10) + '" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#94A3B8">MahasiswaTools \u2022 detta2.github.io/mahasiswatools</text>';
  svg += "</svg>";
  $("#ogOut").innerHTML = '<div class="' + OUT + '">' + svg
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="unduhSvgPng(\'ogSvg\', \'Struktur_Organisasi.png\')">⬇️ Download Bagan (PNG)</button>'
    + '<button class="' + BTN2 + '" onclick="copyText(window._orgTxt)">📋 Copy Struktur Teks</button></div></div>';
  window._orgTxt = "STRUKTUR ORGANISASI — " + orgData.nama + "\nPembina/DPL: " + orgData.pembina + "\nKetua: " + orgData.ketua + "\nWakil: " + orgData.wakil + "\nSekretaris: " + orgData.sekretaris + "\nBendahara: " + orgData.bendahara + "\n" + divs.map((d) => d.nama + " — Koord: " + d.koord + " (Anggota: " + d.anggota + ")").join("\n");
}

;
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

;
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
;
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
;
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


;
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

;
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

