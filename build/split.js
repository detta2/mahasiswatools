/* ============================================================
   split.js — Partisi script klasik lazy-load per kategori
   Sumber kebenaran: app.js (monolit). Keluaran:
     js/core.js       — shell, katalog, helper bersama, loader,
                        region bertanda MT-CORE, router
     js/cat-<kat>.js  — implementasi tool per kategori, dimuat
                        dinamis oleh loadCat() saat dibutuhkan
   Jalankan: node build/split.js  (lalu node build/build-seo.js)
   Aturan potong:
   - Kepala file s.d. banner tool bernomor pertama = core.
   - Region di antara /* === MT-CORE-BEGIN === *\/ dan
     /* === MT-CORE-END === *\/ = core (urutan sumber dipertahankan).
   - Banner ROUTER s.d. akhir file = core.
   - Sisanya dipotong per segmen tool: segmen baru dimulai pada
     banner bernomor /* ---------- N. ... ---------- *\/ atau pada
     UI.<id> berikutnya bila segmen berjalan sudah punya UI.
   - Tiap segmen wajib berisi tepat satu UI.<id> tingkat-atas;
     kategorinya diambil dari katalog TOOLS di app.js.
   ============================================================ */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const ROOT = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
let work = src.split("\n");

/* --- peta kategori dari katalog TOOLS --- */
const tStart = src.indexOf("const TOOLS = ");
let i = src.indexOf("[", tStart), depth = 0, end = -1, inStr = null, escaped = false;
for (let j = i; j < src.length; j++) {
  const ch = src[j];
  if (inStr) { if (escaped) escaped = false; else if (ch === "\\") escaped = true; else if (ch === inStr) inStr = null; continue; }
  if (ch === '"' || ch === "'" || ch === "`") { inStr = ch; continue; }
  if (ch === "[") depth++;
  if (ch === "]") { depth--; if (depth === 0) { end = j; break; } }
}
const TOOLS = eval(src.slice(i, end + 1));
const catOf = {};
TOOLS.forEach((t) => { catOf[t.id] = t.c; });
catOf.terbilang = "karir";   /* UI warisan, dipakai combo55 */
catOf.budgetkos = "karir";   /* UI warisan, dipakai combo55 */
const CATS = ["anti", "tulis", "data", "present", "kelompok", "dokumen", "karir"];

/* --- 1) ekstrak region MT-CORE (sesuai urutan sumber) --- */
const coreRegions = [];
for (;;) {
  const b = work.findIndex((l) => l.includes("MT-CORE-BEGIN"));
  if (b < 0) break;
  const e = work.findIndex((l, idx) => idx > b && l.includes("MT-CORE-END"));
  if (e < 0) throw new Error("MT-CORE-BEGIN tanpa MT-CORE-END");
  coreRegions.push(work.slice(b + 1, e).join("\n"));
  work.splice(b, e - b + 1);
}

/* --- 2) ekor router -> core --- */
const rIdx = work.findIndex((l) => l.includes("ROUTER — deep-link"));
if (rIdx < 0) throw new Error("Banner ROUTER tidak ditemukan");
const routerTail = work.splice(rIdx - 1).join("\n");

/* --- 3) kepala -> core; sisanya segmen --- */
const bannerRe = /^\/\* ---------- \d+\./;
const headEnd = work.findIndex((l) => bannerRe.test(l));
if (headEnd < 0) throw new Error("Banner tool bernomor tidak ditemukan");
const head = work.splice(0, headEnd).join("\n");

/* --- 4) potong segmen tool --- */
const uiRe = /^UI\.([A-Za-z0-9_]+) = function/;
const segments = [];
let cur = null;
const newSeg = () => { cur = { ui: null, lines: [] }; segments.push(cur); };
newSeg();
work.forEach((line) => {
  const m = line.match(uiRe);
  if (bannerRe.test(line) && cur.ui) newSeg();
  else if (m && cur.ui) newSeg();
  if (m && !cur.ui) cur.ui = m[1];
  cur.lines.push(line);
});
segments.forEach((s) => {
  if (!s.ui) throw new Error("Segmen tanpa UI: " + s.lines.slice(0, 3).join(" | "));
  if (!catOf[s.ui]) throw new Error("UI tanpa kategori: " + s.ui);
});
/* --- 4b) pindah-ekor pembuka grup: blok ==== di ekor segmen yang
   mendefinisikan helper untuk tool BERIKUTNYA (tidak dipakai segmen
   sendiri) dipindah ke segmen berikutnya --- */
segments.forEach((s, idx) => {
  if (idx === segments.length - 1) return;
  const uiLine = s.lines.findIndex((l) => uiRe.test(l));
  let bIdx = -1;
  s.lines.forEach((l, li) => { if (li > uiLine && /^\/\* ={10,}/.test(l)) bIdx = li; });
  if (bIdx < 0) return;
  const tail = s.lines.slice(bIdx);
  const headPart = s.lines.slice(0, bIdx);
  const defs = tail.map((l) => { const m = l.match(/^function\s+([A-Za-z_$][\w$]*)/) || l.match(/^const\s+([A-Za-z_$][\w$]*)\s*=/) || l.match(/^let\s+([A-Za-z_$][\w$]*)/); return m ? m[1] : null; }).filter(Boolean);
  if (!defs.length) return;
  const headTxt = headPart.join("\n");
  const nextTxt = segments[idx + 1].lines.join("\n");
  const usedInHead = defs.some((d) => new RegExp("\\b" + d + "\\b").test(headTxt));
  const usedInNext = defs.some((d) => new RegExp("\\b" + d + "\\b").test(nextTxt));
  if (!usedInHead && usedInNext) {
    s.lines = headPart;
    segments[idx + 1].lines = tail.concat([""], segments[idx + 1].lines);
    console.log("ekor pembuka dipindah:", s.ui, "->", segments[idx + 1].ui, "(" + defs.join(", ") + ")");
  }
});

const seen = new Set(segments.map((s) => s.ui));
TOOLS.forEach((t) => { if (!seen.has(t.id)) throw new Error("Tool tanpa segmen UI: " + t.id); });
if (segments.length !== seen.size) throw new Error("Ada UI ganda antar segmen");

/* --- 5) tulis keluaran + validasi sintaks --- */
fs.mkdirSync(path.join(ROOT, "js"), { recursive: true });
const HDR = "/* FILE HASIL GENERATE dari app.js oleh build/split.js — jangan edit langsung. */\n";
const outputs = { "core.js": [head].concat(coreRegions, [routerTail]).join("\n\n") };
CATS.forEach((c) => { outputs["cat-" + c + ".js"] = ""; });
segments.forEach((s) => {
  const f = "cat-" + catOf[s.ui] + ".js";
  outputs[f] += (outputs[f] ? "\n;\n" : "") + s.lines.join("\n");
});
let total = 0;
Object.entries(outputs).forEach(([name, code]) => {
  const p = path.join(ROOT, "js", name);
  fs.writeFileSync(p, HDR + code + "\n");
  execFileSync(process.execPath, ["--check", p]);
  const kb = Math.round(fs.statSync(p).size / 1024);
  total += fs.statSync(p).size;
  console.log("js/" + name, kb + "KB");
});
console.log("SELESAI:", segments.length, "segmen tool,", CATS.length, "partisi kategori, total", Math.round(total / 1024) + "KB");
