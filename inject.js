const fs = require("fs");

const file = process.argv[2] || "index.html";
let html = fs.readFileSync(file, "utf8");

const safe = (v) => JSON.stringify(v ?? "").replace(/</g, "\\u003c");

html = html.replace('"__API_URL__"', safe(process.env.API_URL));

if (html.includes("__API_URL__")) {
  console.error("::error::Injection failed — placeholder remains. Check that secret API_URL exists.");
  process.exit(1);
}

fs.writeFileSync(file, html);
console.log("Secrets injected successfully.");
