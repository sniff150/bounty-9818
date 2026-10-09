// Vercel entrypoint: wraps the same Hono/oRPC app that Bun runs locally
// as a serverless function. Bundled to /api/index.mjs by `npm run build:api`.
import { handle } from "hono/vercel";
import { createClient } from "@libsql/client";
import app from "./api";

// Creates the orders table on first request so no manual DB step is needed.
// Mirrors packages/web/src/api/database/schema.ts.
let initPromise: Promise<void> | null = null;
function ensureSchema(): Promise<void> {
  initPromise ??= (async () => {
    const client = createClient({
      url: process.env.DATABASE_URL!,
      authToken: process.env.DATABASE_AUTH_TOKEN,
    });
    await client.execute(`CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY NOT NULL,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT NOT NULL,
      branch TEXT NOT NULL,
      product TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unit_price INTEGER NOT NULL,
      total INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'awaiting_confirmation',
      created_at INTEGER NOT NULL
    )`);
  })().catch((err) => {
    initPromise = null; // retry on next request
    console.error("DB init failed:", err);
  });
  return initPromise;
}

const handler = handle(app);

async function run(req: Request): Promise<Response> {
  if (new URL(req.url).pathname.startsWith("/api/rpc")) await ensureSchema();
  return handler(req);
}

export const GET = run;
export const POST = run;
export const OPTIONS = run;
