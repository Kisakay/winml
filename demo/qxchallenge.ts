// QXChat anti-abuse challenge solver for the demo (browser-safe).
//
// Why not the SDK's fetchAndSolveChallenge? Its PQC step expects the legacy
// {rhoHex, tHex} key format, but the server sends FIPS 203 ML-KEM-768
// {keyId, ekHex} (see lqxp/client/src/crypto/pqc.ts). We solve VDF + RLN
// with the SDK and encapsulate with audited `@noble/post-quantum`.
import {
	fetchChallenge,
	solveVdf,
	computeNullifier,
	type VdfChallenge,
	type VdfProof,
	type EpochQuotaToken,
} from "qxchat.ts";
import { ml_kem768 } from "@noble/post-quantum/ml-kem.js";

export interface QxLoginProofs {
	vdfChallenge: VdfChallenge;
	vdfProof: VdfProof;
	quotaToken: EpochQuotaToken;
	nullifier: string;
	pqcCiphertext: { keyId: string; ctHex: string };
}

function hexToBytes(hex: string): Uint8Array {
	const clean = hex.trim().toLowerCase();
	const out = new Uint8Array(clean.length / 2);
	for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
	return out;
}

function bytesToHex(bytes: Uint8Array): string {
	let s = "";
	for (let i = 0; i < bytes.length; i++) s += (bytes[i] ?? 0).toString(16).padStart(2, "0");
	return s;
}

/** Fetch + solve a login challenge (VDF ~50ms, PQC ~25ms). */
export async function solveLoginChallenge(apiBase: string, username: string): Promise<QxLoginProofs> {
	const ch = await fetchChallenge(apiBase, username, undefined);
	const vdfProof = solveVdf(ch.vdf);
	const nullifier = computeNullifier(ch.quotaToken.ticket, ch.quotaToken.epoch, "login");
	// Wire format is FIPS 203 {keyId, ekHex}; the SDK's PqcPublicKey type
	// still describes the legacy {rhoHex, tHex} shape.
	const wireKey = ch.pqcKey as unknown as { keyId: string; ekHex: string };
	const ek = hexToBytes(wireKey.ekHex);
	if (ek.length !== 1184) throw new Error(`Bad ML-KEM-768 key length: ${ek.length}`);
	const { cipherText } = await ml_kem768.encapsulate(ek);
	return {
		vdfChallenge: ch.vdf,
		vdfProof,
		quotaToken: ch.quotaToken,
		nullifier,
		pqcCiphertext: { keyId: wireKey.keyId, ctHex: bytesToHex(cipherText) },
	};
}
