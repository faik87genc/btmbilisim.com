import "server-only";
import { db } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import type { ExistingPageRef } from "@/lib/seo/analyzeBlogPost";

/** What the admin editor's SEO checker needs from the server. */
export type AdminSeoContext = {
  /** Every row (drafts too — slugs are unique across all of them). */
  existingPages: ExistingPageRef[];
  /** Personal names that must never appear in content (optional env). */
  forbiddenNames: string[];
};

/**
 * Read-only: slug/title/focus keyword of every row, for the editor's
 * cannibalisation, slug-conflict and broken-link checks. Falls back to an
 * empty list (checks just switch off) if the DB read fails.
 */
export async function getAdminSeoContext(): Promise<AdminSeoContext> {
  let existingPages: ExistingPageRef[] = [];
  try {
    existingPages = await db
      .select({ slug: pages.slug, title: pages.title, focusKeyword: pages.focusKeyword })
      .from(pages);
  } catch (e) {
    console.error("admin: sayfa listesi okunamadı (SEO kontrolleri kısıtlı)", e);
  }
  // Comma-separated, e.g. SEO_FORBIDDEN_NAMES="Ad Soyad,Ad". Kept out of the
  // repo on purpose: the names themselves must not be committed anywhere.
  const forbiddenNames = (process.env.SEO_FORBIDDEN_NAMES || "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length >= 3);
  return { existingPages, forbiddenNames };
}
