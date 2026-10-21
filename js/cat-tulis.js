/* FILE HASIL GENERATE dari app.js oleh build/split.js — jangan edit langsung. */
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

;
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
;
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

;
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

;
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

;
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

;
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

;
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

;
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

;
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

;
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
  out.innerHTML = '<div class="' + OUT + '"><div class="flex flex-wrap gap-2 mb-3"><span class="rounded-lg bg-white dark:bg-slate-900 px-3 py-1.5 font-bold">' + entries.length + ' entri terurut A–Z</span>'
    + (dups.length ? '<span class="rounded-lg bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 px-3 py-1.5 font-bold">⚠️ Duplikat: ' + esc([...new Set(dups)].join(", ")) + "</span>" : "")
    + (bad.length ? '<span class="rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 px-3 py-1.5 font-bold">⚠️ ' + bad.length + " baris tanpa definisi: " + esc(bad.slice(0, 4).join(", ")) + "</span>" : "") + "</div>"
    + '<div class="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">' + entries.map((e) => '<p class="mb-1.5" style="padding-left:2em;text-indent:-2em"><b>' + esc(e.term) + ":</b> " + esc(e.def) + "</p>").join("") + "</div>"
    + '<div class="flex flex-wrap gap-2 mt-4"><button class="' + BTN + '" onclick="copyText(window._glos)">📋 Copy Hasil</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Glosarium_AZ.txt\', window._glos)">⬇️ Download .txt</button>'
    + '<button class="' + BTN2 + '" onclick="download(\'Glosarium_AZ.doc\', \'<html><body style=&quot;font-family:serif;font-size:12pt&quot;>\' + entries.map((e) => \'<p><b>\' + esc(e.term) + \':</b> \' + esc(e.def) + \'</p>\').join(\'\') + \'</body></html>\', \'application/msword\')">⬇️ .doc</button></div></div>';
}

;
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

;
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

;
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

;
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
;
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

;
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
    const r = await fetch("https://api.openalex.org/works?search=" + encodeURIComponent(q) + "&per-page=10&mailto=mahasiswatools@detta2.github.io");
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

;
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
;
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
  el.addEventListener("input", () => { window._rv.nama = $("#rvNama").value; window._rv.judul = $("#rvJudul").value; window._rv.tgl = $("#rvTgl").value; store.set("mt_revisi", window._rv); });
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
;
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

;
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

;
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

;
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

;
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

