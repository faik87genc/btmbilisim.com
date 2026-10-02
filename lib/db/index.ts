import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// Use a syntactically-valid placeholder when DATABASE_URL isn't configured yet
// (e.g. local `npm run build` before Neon is set up). Public pages that read
// from the database (`/blog`, `/blog/[slug]`, `/[slug]`) each wrap their query
// in `.catch(() => [])`, so a build without a real DATABASE_URL still succeeds
// — the placeholder just never returns rows.
const connectionString =
  process.env.DATABASE_URL || "postgres://placeholder:placeholder@localhost/placeholder";

const sql = neon(connectionString);

export const db = drizzle(sql, { schema });

/**
 * True when a real DATABASE_URL is set. The `db` client above still exists
 * without one (pointing at a dead placeholder so public pages fall back to
 * lib/data/fallback-pages.json); the admin panel checks this to show setup
 * instructions instead of silently listing zero rows or failing on save.
 */
export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}
