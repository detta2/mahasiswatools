/* ============================================================
   audit-partisi.js — Deteksi referensi lintas partisi
   Setiap nama tingkat-atas yang didefinisikan di satu partisi
   kategori tidak boleh dipakai oleh partisi kategori lain
   (nama dari core.js bebas dipakai — core selalu dimuat).
   Jalankan setelah build/split.js: node build/audit-partisi.js
   ============================================================ */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const files = fs.readdirSync(path.join(ROOT, "js")).filter((f) => f.endsWith(".js"));
const defs = {};
const texts = {};
files.forEach((f) => {
  const t = fs.readFileSync(path.join(ROOT, "js", f), "utf8");
  texts[f] = t;
  let m;
  const re = /^(?:function|const|let|var)\s+([A-Za-z_$][\w$]*)/gm;
  while ((m = re.exec(t))) { if (!defs[m[1]]) defs[m[1]] = f; }
  const re2 = /^UI\.(\w+)/gm;
  while ((m = re2.exec(t))) { if (!defs["UI." + m[1]]) defs["UI." + m[1]] = f; }
});
/* Pengecualian terverifikasi manual (2026-10-21):
   - HARI & jadwal di cat-karir/cat-tulis: hanya muncul di dalam
     string literal (teks surat/label "HARI INI", "jadwal Bapak/Ibu"),
     bukan referensi kode.
   - simStop di cat-kelompok: rantai window._teleStop memanggilnya
     dengan penjaga typeof, aman bila partisi present belum dimuat. */
const ALLOW = new Set([
  "cat-karir.js|HARI", "cat-karir.js|jadwal",
  "cat-tulis.js|jadwal", "cat-kelompok.js|simStop"
]);
let leaks = 0;
files.filter((f) => f !== "core.js").forEach((f) => {
  const t = texts[f];
  Object.entries(defs).forEach(([name, home]) => {
    if (home === f || home === "core.js") return;
    if (ALLOW.has(f + "|" + name)) return;
    const pattern = name.startsWith("UI.")
      ? new RegExp("UI\\." + name.slice(3) + "\\b")
      : new RegExp("\\b" + name + "\\b");
    if (pattern.test(t)) { console.log("KEBOCORAN:", f, "memakai", name, "dari", home); leaks++; }
  });
});
console.log(leaks ? leaks + " kebocoran lintas partisi" : "BERSIH: tidak ada referensi lintas partisi");
process.exit(leaks ? 1 : 0);
