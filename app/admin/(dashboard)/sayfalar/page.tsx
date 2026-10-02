import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { Plus, Pencil } from "lucide-react";
import { db } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { DatabaseSetupNotice } from "@/components/admin/SetupNotice";
import { deletePage } from "@/app/admin/actions";
import { isPageLive, pageHref } from "@/lib/pages";
import { getDatabaseStatus, requireAdminSession } from "@/lib/adminGuard";

function statusLabel(p: { published: boolean; publishedAt: Date | null }): string {
  if (!p.published) return "Taslak";
  if (isPageLive(p)) return "Yayında";
  return `Zamanlandı: ${p.publishedAt!.toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Istanbul" })}`;
}

export default async function PagesListPage() {
  await requireAdminSession();
  const dbStatus = await getDatabaseStatus();
  if (dbStatus !== "ok") return <DatabaseSetupNotice reason={dbStatus} />;

  // No `.catch(() => [])`: a failing query must surface through error.tsx,
  // not masquerade as an empty list. Only list columns are read.
  const rows = await db
    .select({
      id: pages.id,
      kind: pages.kind,
      title: pages.title,
      slug: pages.slug,
      published: pages.published,
      publishedAt: pages.publishedAt,
    })
    .from(pages)
    .where(eq(pages.kind, "page"))
    .orderBy(desc(pages.createdAt));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-ink-900">
          Sayfalar <span className="text-base font-normal text-slate-500">({rows.length})</span>
        </h1>
        <Link
          href="/admin/sayfalar/new/"
          className="flex items-center gap-2 rounded-sm bg-gold-500 px-4 py-2 text-sm font-medium text-navy-950 hover:bg-gold-300"
        >
          <Plus className="h-4 w-4" /> Yeni Sayfa
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {rows.length === 0 && (
          <p className="text-sm text-slate-500">
            Henüz sayfa yok. Mevcut site içeriğini aktarmak için{" "}
            <code>npm run content:migrate</code> çalıştırın.
          </p>
        )}
        {rows.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-sm border border-navy-950/10 bg-white p-4"
          >
            <div>
              <div className="font-medium text-ink-900">{p.title}</div>
              <div className="text-xs text-slate-500">
                {pageHref(p)} · {statusLabel(p)}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                prefetch={false}
                href={isPageLive(p) ? pageHref(p) : `/api/draft/?slug=${encodeURIComponent(p.slug)}`}
                target="_blank"
                className="text-sm text-slate-500 hover:text-gold-500"
              >
                {isPageLive(p) ? "Görüntüle" : "Önizle"}
              </Link>
              <Link
                href={`/admin/sayfalar/${p.id}/`}
                className="flex items-center gap-1.5 text-sm text-ink-900 hover:text-gold-500"
              >
                <Pencil className="h-4 w-4" /> Düzenle
              </Link>
              <DeleteButton
                action={deletePage.bind(null, p.id)}
                confirmText="Bu sayfayı silmek istediğinize emin misiniz?"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
