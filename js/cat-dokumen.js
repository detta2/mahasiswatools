/* FILE HASIL GENERATE dari app.js oleh build/split.js — jangan edit langsung. */
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

;
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

;
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

;
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
;
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

;
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

;
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

;
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

;
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

;
/* ---------- 49. EKSTRAK HALAMAN PDF (UI mandiri, mesin sama dengan k43) ---------- */
UI.splitpdf = function (el) {
  el.innerHTML = '<div class="fadein"><p class="text-sm text-slate-500 mb-3">Ambil hanya halaman yang kamu butuhkan dari PDF besar — misalnya lembar pengesahan saja dari file skripsi utuh.</p>'
    + field("Pilih Satu File PDF", '<input id="psFile" type="file" accept="application/pdf" class="' + IN + '" onchange="psLoad(this)">')
    + '<p id="psInfo" class="text-sm font-semibold text-slate-500 mb-2"></p>'
    + field("Rentang Halaman", '<input id="psRange" class="' + IN + '" placeholder="cth: 1-3,5,8">', "Format: halaman tunggal (5), rentang (1-3), atau gabungan dipisah koma (1-3,5).")
    + '<button class="' + BTN + '" onclick="pisahPdf()">✂️ Ekstrak Halaman</button> <span id="psStat" class="text-sm text-slate-500"></span></div>';
};

;
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
;
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

;
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

;
/* ---------- 104. Ambil Tabel dari PDF Jadi File Excel ---------- */
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

;
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

;
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

;
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

;
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


