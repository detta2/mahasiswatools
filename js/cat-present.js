/* FILE HASIL GENERATE dari app.js oleh build/split.js — jangan edit langsung. */
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

;
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
;
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

;
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

;
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
  svg += '<text x="' + (W / 2) + '" y="' + (H - 10) + '" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#94A3B8">MahasiswaTools \u2022 detta2.github.io/mahasiswatools</text>';
  svg += "</svg>";
  window._mmOutline = mmData.pusat + "\n" + branches.map((b) => "├─ " + b.nama + (b.sub ? "\n│   " + b.sub.split(",").map((s) => "• " + s.trim()).join("\n│   ") : "")).join("\n");
  $("#mmOut").innerHTML = '<div class="' + OUT + '">' + svg
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="unduhSvgPng(\'mmSvg\', \'MindMap_Skripsi.png\')">⬇️ Download Mind Map (PNG)</button>'
    + '<button class="' + BTN2 + '" onclick="copyText(window._mmOutline)">📋 Copy Outline Teks</button></div></div>';
}

;
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

;
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

;
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
;
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

/* ============================================================
   TOOL BARU MANDIRI: Word Frequency, Waktu Baca, Kerangka Bab
   ============================================================ */
;
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

;
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

