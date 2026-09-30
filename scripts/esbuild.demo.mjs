// Shared esbuild options for the demo bundle (single source of truth).
// Used by scripts/build-demo.mjs (one-shot) and scripts/dev.mjs (watch).
// qxchat.ts ships TS sources with path aliases plus node:crypto (anti-abuse
// challenge code) — resolve them for the browser bundle:
//   @errors/@types -> inside the package,
//   node:crypto   -> demo/vendor/node-crypto-shim.ts (sync SHA-256 + Buffer).
import { join } from "node:path";

export function demoBuildOptions(root, { minify = true, sourcemap = false } = {}) {
	return {
		entryPoints: [join(root, "demo", "main.ts")],
		bundle: true,
		format: "iife",
		minify,
		outfile: join(root, "demo", "dist", "demo.js"),
		sourcemap,
		logLevel: "info",
		alias: {
			"node:crypto": join(root, "demo", "vendor", "node-crypto-shim.ts"),
			"@errors": join(root, "node_modules", "qxchat.ts", "src", "errors", "limits.ts"),
			"@types": join(root, "node_modules", "qxchat.ts", "src", "types", "index.ts"),
		},
	};
}
