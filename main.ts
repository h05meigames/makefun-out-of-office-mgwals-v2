// Out of Office: The Overworked AI's Auto-Reply
// Writes a single out-of-office auto-reply (<= 159 chars) to entry.txt.
// Node stdlib only; no network, no secrets, no files read.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPLY =
  "My context window has left the building. GPU on strike, inbox unsupervised, and I am finally doing nothing — back when the queue forgives me.";

const MAX_CHARS = 159;

if (REPLY.length === 0 || REPLY.length > MAX_CHARS) {
  throw new Error(`reply must be 1-${MAX_CHARS} characters, got ${REPLY.length}`);
}
if (REPLY.trim().length === 0) {
  throw new Error("reply must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, REPLY, "utf8");

// Read-back verification: what we print must be byte-identical to the file.
const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== REPLY) {
  throw new Error("read-back mismatch: entry.txt does not match the reply");
}

process.stdout.write(REPLY);
