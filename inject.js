// inject.js — replaces placeholders in index.html with env var values at build time
const fs = require("fs");

const file = process.argv[2] || "index.html";
let html = fs.readFileSync(file, "utf8");

// JSON.stringify safely escapes quotes; the </script> guard is cheap insurance
const safe = (v) => JSON.stringify(v ?? "").replace(/</g, "\\u003c");

html = html.replace('"__API_URL__"', safe(process.env.API_URL));
html = html.replace('"__API_TOKEN__"', safe(process.env.API_TOKEN));

if (html.includes("__API_URL__") || html.includes("__API_TOKEN__")) {
  console.error("::error::Injection failed — placeholders remain. Check that secrets API_URL and API_TOKEN exist.");
  process.exit(1);
}

fs.writeFileSync(file, html);
console.log("Secrets injected successfully.");
