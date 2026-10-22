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

export type DatabaseStatus = "ok" | "missing" | "unreachable" | "quota";

/**
 * One cheap `select 1` per request, so every admin screen can gate on it.
 * Neon suspends idle computes, so a cold start can fail the first ping: retry
 * a couple of times before giving up. HTTP 402 means the Neon plan quota is
 * used up — retrying is pointless, so report it as its own status.
 */
export const getDatabaseStatus = cache(async (): Promise<DatabaseStatus> => {
  if (!isDatabaseConfigured()) return "missing";
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await db.execute(sql`select 1`);
      return "ok";
    } catch (e) {
      const text = `${(e as { message?: string })?.message ?? ""} ${(e as { status?: number })?.status ?? ""}`;
      if (/402|exceeded the quota/i.test(text)) {
        console.error("admin: Neon kotası dolmuş (402)", e);
        return "quota";
      }
      if (attempt === 2) {
        console.error("admin: veritabanına ulaşılamadı", e);
        return "unreachable";
      }
      await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
    }
  }
  return "unreachable";
});
