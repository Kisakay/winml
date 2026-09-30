// One-shot demo bundle (same options as the dev server).
// Run: npm run build:demo  /  bun run build:demo
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { demoBuildOptions } from "./esbuild.demo.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(join(root, "package.json"));
const esbuild = require("esbuild");

await esbuild.build(demoBuildOptions(root, { minify: true, sourcemap: false }));
console.log("[build:demo] demo/dist/demo.js ready");
