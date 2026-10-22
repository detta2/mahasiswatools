/* FILE HASIL GENERATE dari app.js oleh build/split.js — jangan edit langsung. */
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

;
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

;
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

;
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

;
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

;
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

;
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

;
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
;
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
;
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
;
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

;
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

;
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

;
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

;
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

;
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

