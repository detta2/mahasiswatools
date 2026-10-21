/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["../index.html", "../app.js", "../tools/**/*.html"],
  theme: { extend: {
    fontFamily: { sans: ['"Plus Jakarta Sans"','system-ui','sans-serif'] },
    colors: { brand: {50:'#EEF4FF',100:'#DEE9FF',200:'#BFD3FF',300:'#93B4FF',400:'#5B87F5',500:'#2F5FE8',600:'#1D49C8',700:'#17399E',800:'#122B78',900:'#0C1D52'} }
  } },
  plugins: []
};
