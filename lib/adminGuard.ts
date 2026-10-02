import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sql } from "drizzle-orm";
import { db, isDatabaseConfigured } from "@/lib/db";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

/**
 * Server-component auth check for admin screens. `proxy.ts` already redirects
 * unauthenticated navigations, but the Next.js docs recommend verifying close
 * to the data too — a matcher typo or a future route outside it must not
 * expose the CMS.
 */
export async function requireAdminSession(): Promise<void> {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) redirect("/admin/login/");
}

export type DatabaseStatus = "ok" | "missing" | "unreachable";

/** One cheap `select 1` per request, so every admin screen can gate on it. */
export const getDatabaseStatus = cache(async (): Promise<DatabaseStatus> => {
  if (!isDatabaseConfigured()) return "missing";
  try {
    await db.execute(sql`select 1`);
    return "ok";
  } catch (e) {
    console.error("admin: veritabanına ulaşılamadı", e);
    return "unreachable";
  }
});
