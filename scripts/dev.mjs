// Dev server for the demo: rebuilds demo/main.ts on change, re-copies the
// stylesheet, and serves ./demo at http://localhost:8080 (no cache).
// Run: npm run dev  /  bun run dev   (single process, esbuild watch + serve).
import { copyFileSync, mkdirSync, watch } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { demoBuildOptions } from "./esbuild.demo.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(join(root, "package.json"));
const esbuild = require("esbuild");

const PORT = Number(process.env.PORT ?? 8080);
const cssSrc = join(root, "styles", "win10-shell.css");
const cssDestDir = join(root, "demo", "dist");
const cssDest = join(cssDestDir, "win10-shell.css");

function copyCss() {
	mkdirSync(cssDestDir, { recursive: true });
	copyFileSync(cssSrc, cssDest);
	console.log("[dev] css -> demo/dist/win10-shell.css");
}

copyCss();
// Re-copy the stylesheet when it changes (esbuild only watches TS imports).
watch(cssSrc, { persistent: true }, (event) => {
	if (event === "change" || event === "rename") {
		try {
			copyCss();
		} catch (err) {
			console.error("[dev] css copy failed:", err);
		}
	}
});

const ctx = await esbuild.context({
	...demoBuildOptions(root, { minify: false, sourcemap: true }),
});
await ctx.watch();
let port = PORT;
try {
	({ port } = await ctx.serve({ servedir: join(root, "demo"), port: PORT }));
} catch (err) {
	console.error(`[dev] port ${PORT} already in use — stop 'npm run demo' first or run with another port, e.g. PORT=8081 npm run dev`);
	await ctx.dispose().catch(() => {});
	process.exit(1);
}
console.log(`[dev] demo at http://localhost:${port} (watching demo/, src/, styles/)`);
