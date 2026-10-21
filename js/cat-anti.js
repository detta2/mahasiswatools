/* FILE HASIL GENERATE dari app.js oleh build/split.js — jangan edit langsung. */
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

;
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

;
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
;
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

;
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

;
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

/* ============================================================
   TOOL 66 — GENERATOR PROPOSAL (penelitian / kegiatan / magang)
   ============================================================ */
