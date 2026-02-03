import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from '@prisma/adapter-pg'

// Try loading .env from several likely locations so runtime can read DATABASE_URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const candidateEnvPaths = [
	// Prefer the package's own .env first
	path.resolve(__dirname, '..', '.env'),
	path.resolve(__dirname, '.env'),
	// Then check monorepo locations
	path.resolve(process.cwd(), 'packages/db/.env'),
	path.resolve(process.cwd(), '.env'),
];
let loadedEnvPath: string | null = null;
for (const p of candidateEnvPaths) {
	try {
		const res = dotenv.config({ path: p });
		if (res.parsed && res.parsed.DATABASE_URL) {
			loadedEnvPath = p;
			console.log('[repo/db] loaded .env from', p);
			break;
		}
	} catch (e) {
		// ignore and try next
	}
}
if (!loadedEnvPath) {
	// Last resort: allow dotenv to attempt default lookup
	const res = dotenv.config();
	if (res.parsed && res.parsed.DATABASE_URL) {
		console.log('[repo/db] loaded .env via default lookup');
	}
}

const connectionString = `${process.env.DATABASE_URL}`

// Debug: show which DATABASE_URL the running process sees (helps debug P1001)
console.log("[repo/db] resolved DATABASE_URL:", connectionString);

const adapter = new PrismaPg({ connectionString })
export const Client = new PrismaClient({adapter});

