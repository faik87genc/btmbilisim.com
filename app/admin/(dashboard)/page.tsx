import Link from "next/link";
import { Newspaper, FileText } from "lucide-react";
import { count, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { getDatabaseStatus, requireAdminSession } from "@/lib/adminGuard";
import { DatabaseSetupNotice } from "@/components/admin/SetupNotice";

export default async function AdminDashboard() {
  await requireAdminSession();
  const dbStatus = await getDatabaseStatus();
  if (dbStatus !== "ok") return <DatabaseSetupNotice reason={dbStatus} />;

  // Counts only — no need to pull every row's full Markdown body.
  const rows = await db
    .select({
      kind: pages.kind,
      total: count(),
      drafts: sql<number>`count(*) filter (where not ${pages.published})`.mapWith(Number),
      scheduled: sql<number>`count(*) filter (where ${pages.published} and ${pages.publishedAt} > now())`.mapWith(Number),
    })
    .from(pages)
    .groupBy(pages.kind);
  const stat = (kind: "blog" | "page") =>
    rows.find((r) => r.kind === kind) ?? { total: 0, drafts: 0, scheduled: 0 };
  const blog = stat("blog");
  const page = stat("page");
  const detail = (s: { drafts: number; scheduled: number }) =>
    [s.drafts ? `${s.drafts} taslak` : "", s.scheduled ? `${s.scheduled} zamanlanmış` : ""]
      .filter(Boolean)
      .join(" · ");

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink-900">
        Hoş geldiniz
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Blog yazılarını ve sayfaları buradan yönetin.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Link
          href="/admin/blog/"
          className="flex items-center gap-4 rounded-sm border border-navy-950/10 bg-white p-6 transition-colors hover:border-gold-500/40"
        >
          <Newspaper className="h-8 w-8 text-gold-500" />
          <div>
            <div className="font-display text-lg font-semibold text-ink-900">
              Blog
            </div>
            <div className="text-sm text-slate-500">{blog.total} yazı</div>
            {detail(blog) && <div className="text-xs text-slate-400">{detail(blog)}</div>}
          </div>
        </Link>

        <Link
          href="/admin/sayfalar/"
          className="flex items-center gap-4 rounded-sm border border-navy-950/10 bg-white p-6 transition-colors hover:border-gold-500/40"
        >
          <FileText className="h-8 w-8 text-gold-500" />
          <div>
            <div className="font-display text-lg font-semibold text-ink-900">
              Sayfalar
            </div>
            <div className="text-sm text-slate-500">{page.total} sayfa</div>
            {detail(page) && <div className="text-xs text-slate-400">{detail(page)}</div>}
          </div>
        </Link>
      </div>
    </div>
  );
}
