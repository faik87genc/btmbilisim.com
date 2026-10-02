import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

// `drizzle-kit` runs outside Next.js, so it does not auto-load env files.
// Prefer the unpooled connection for DDL (`db:push` / migrations) — pgbouncer
// in transaction mode can choke on schema statements.
config({ path: ".env.local" });
config({ path: ".env" });

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL!,
  },
});
