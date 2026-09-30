// Minimal `node:crypto` browser shim for the `qxchat.ts` bundle.
//
// qxchat.ts only needs `createHash('sha256')` + `randomBytes` (anti-abuse
// challenge code, used on 429/rate-limit) plus a tiny `Buffer` surface.
// Everything else in the SDK already runs on Web APIs (WebSocket,
// WebCrypto, fetch). This file is aliased via esbuild
// (`--alias:node:crypto=./demo/vendor/node-crypto-shim.ts`) for the demo
// bundle only — the published framework stays dependency-free.

// --- compact sync SHA-256 (public-domain style implementation) ---
const K = [
	0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
	0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
	0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
	0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
	0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
	0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
	0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
	0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];

function sha256Bytes(data: Uint8Array): Uint8Array {
	let h0 = 0x6a09e667;
	let h1 = 0xbb67ae85;
	let h2 = 0x3c6ef372;
	let h3 = 0xa54ff53a;
	let h4 = 0x510e527f;
	let h5 = 0x9b05688c;
	let h6 = 0x1f83d9ab;
	let h7 = 0x5be0cd19;

	const bitLen = data.length * 8;
	const paddedLen = (((data.length + 8) >> 6) + 1) << 6;
	const padded = new Uint8Array(paddedLen);
	padded.set(data);
	padded[data.length] = 0x80;
	const view = new DataView(padded.buffer);
	view.setUint32(paddedLen - 4, bitLen >>> 0, false);
	view.setUint32(paddedLen - 8, Math.floor(bitLen / 0x100000000), false);

	const w = new Int32Array(64);
	for (let off = 0; off < paddedLen; off += 64) {
		for (let i = 0; i < 16; i++) w[i] = view.getInt32(off + i * 4, false);
		for (let i = 16; i < 64; i++) {
			const s0 = ((w[i - 15] >>> 7) | (w[i - 15] << 25)) ^ ((w[i - 15] >>> 18) | (w[i - 15] << 14)) ^ (w[i - 15] >>> 3);
			const s1 = ((w[i - 2] >>> 17) | (w[i - 2] << 15)) ^ ((w[i - 2] >>> 19) | (w[i - 2] << 13)) ^ (w[i - 2] >>> 10);
			w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
		}
		let a = h0;
		let b = h1;
		let c = h2;
		let d = h3;
		let e = h4;
		let f = h5;
		let g = h6;
		let hh = h7;
		for (let i = 0; i < 64; i++) {
			const s1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
			const ch = (e & f) ^ (~e & g);
			const t1 = (hh + s1 + ch + K[i]! + w[i]!) | 0;
			const s0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
			const mj = (a & b) ^ (a & c) ^ (b & c);
			const t2 = (s0 + mj) | 0;
			hh = g;
			g = f;
			f = e;
			e = (d + t1) | 0;
			d = c;
			c = b;
			b = a;
			a = (t1 + t2) | 0;
		}
		h0 = (h0 + a) | 0;
		h1 = (h1 + b) | 0;
		h2 = (h2 + c) | 0;
		h3 = (h3 + d) | 0;
		h4 = (h4 + e) | 0;
		h5 = (h5 + f) | 0;
		h6 = (h6 + g) | 0;
		h7 = (h7 + hh) | 0;
	}

	const out = new Uint8Array(32);
	const oview = new DataView(out.buffer);
	oview.setInt32(0, h0, false);
	oview.setInt32(4, h1, false);
	oview.setInt32(8, h2, false);
	oview.setInt32(12, h3, false);
	oview.setInt32(16, h4, false);
	oview.setInt32(20, h5, false);
	oview.setInt32(24, h6, false);
	oview.setInt32(28, h7, false);
	return out;
}

const HEX = "0123456789abcdef";

function toHex(bytes: Uint8Array): string {
	let s = "";
	for (let i = 0; i < bytes.length; i++) {
		const b = bytes[i] ?? 0;
		s += HEX[(b >> 4) & 0xf]! + HEX[b & 0xf]!;
	}
	return s;
}

/** Uint8Array with just enough Buffer surface for qxchat.ts challenge code. */
export class Buf extends Uint8Array {
	static alloc(n: number): Buf {
		return new Buf(n);
	}
	static from(data: Uint8Array | number[] | ArrayLike<number>): Buf {
		if (data instanceof Uint8Array) {
			const b = new Buf(data.length);
			b.set(data);
			return b;
		}
		const arr = Array.from(data as ArrayLike<number>);
		const b = new Buf(arr.length);
		for (let i = 0; i < arr.length; i++) b[i] = arr[i] ?? 0;
		return b;
	}
	override subarray(begin = 0, end?: number): Buf {
		return Buf.from(super.subarray(begin, end));
	}
	toString(_encoding?: string): string {
		return toHex(this);
	}
	writeUInt32BE(value: number, offset: number): number {
		new DataView(this.buffer, this.byteOffset, this.byteLength).setUint32(offset, value >>> 0, false);
		return offset + 4;
	}
	writeBigUInt64BE(value: bigint, offset: number): number {
		new DataView(this.buffer, this.byteOffset, this.byteLength).setBigUint64(offset, value, false);
		return offset + 8;
	}
}

class Hash {
	private chunks: Uint8Array[] = [];
	update(data: string | Uint8Array): this {
		if (typeof data === "string") this.chunks.push(new TextEncoder().encode(data));
		else this.chunks.push(data);
		return this;
	}
	digest(encoding?: "hex"): Uint8Array | string {
		let len = 0;
		for (const c of this.chunks) len += c.length;
		const all = new Uint8Array(len);
		let off = 0;
		for (const c of this.chunks) {
			all.set(c, off);
			off += c.length;
		}
		const out = Buf.from(sha256Bytes(all));
		return encoding === "hex" ? out.toString("hex") : out;
	}
}

export function createHash(_algorithm: string): Hash {
	if (_algorithm !== "sha256") throw new Error(`node-crypto-shim: unsupported hash ${_algorithm}`);
	return new Hash();
}

export function randomBytes(n: number): Buf {
	const b = new Buf(n);
	crypto.getRandomValues(b);
	return b;
}

// qxchat.ts challenge code uses the global Buffer — provide it if missing.
declare global {
	// eslint-disable-next-line no-var
	var Buffer: { alloc(n: number): Buf; from(data: Uint8Array | number[] | ArrayLike<number>): Buf } | undefined;
}
if (typeof globalThis.Buffer === "undefined") {
	globalThis.Buffer = Buf;
}
