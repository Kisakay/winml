// Builds the GitHub Pages site into docs/ (served as-is).
// Run: npm run build:pages  (then enable Pages on main:/docs in repo settings)
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const docs = join(root, "docs");
mkdirSync(docs, { recursive: true });

copyFileSync(join(root, "demo", "dist", "demo.js"), join(docs, "demo.js"));
copyFileSync(join(root, "dist", "win10-shell.css"), join(docs, "win10-shell.css"));

const html = readFileSync(join(root, "demo", "index.html"), "utf-8")
	.replace("../dist/win10-shell.css", "./win10-shell.css")
	.replace("./dist/demo.js", "./demo.js");
writeFileSync(join(docs, "index.html"), html);

// No Jekyll processing (files starting with _ would be ignored otherwise)
writeFileSync(join(docs, ".nojekyll"), "");
console.log("[build:pages] docs/ ready (index.html, demo.js, win10-shell.css)");
