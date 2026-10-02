import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { Plus, Pencil, CalendarClock, TriangleAlert } from "lucide-react";
import { db } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { DatabaseSetupNotice } from "@/components/admin/SetupNotice";
import { deletePage } from "@/app/admin/actions";
import { isPageLive, pageHref } from "@/lib/pages";
import { getDatabaseStatus, requireAdminSession } from "@/lib/adminGuard";

const listColumns = {
  id: pages.id,
  kind: pages.kind,
  title: pages.title,
  slug: pages.slug,
  published: pages.published,
  publishedAt: pages.publishedAt,
};
type ListRow = {
  id: string;
  kind: "blog" | "page";
  title: string;
  slug: string;
  published: boolean;
  publishedAt: Date | null;
};

const TR_TZ = "Europe/Istanbul";

function statusLabel(post: { published: boolean; publishedAt: Date | null }): string {
  if (!post.published) return "Taslak";
  if (isPageLive(post)) return "Yayında";
  return `Zamanlandı: ${post.publishedAt!.toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short", timeZone: TR_TZ })}`;
}

/** "bugün" / "yarın" / "3 gün sonra" / "14 Ekim" — for the publish-queue view. */
function relativeDay(target: Date): string {
  const dayKey = (d: Date) => d.toLocaleDateString("en-CA", { timeZone: TR_TZ }); // YYYY-MM-DD, sortable
  const todayKey = dayKey(new Date());
  const targetKey = dayKey(target);
  if (targetKey === todayKey) return "bugün";
  const days = Math.round(
    (Date.parse(targetKey) - Date.parse(todayKey)) / 86_400_000,
  );
  if (days === 1) return "yarın";
  if (days > 1 && days < 7) return `${days} gün sonra`;
  return target.toLocaleDateString("tr-TR", { day: "numeric", month: "long", timeZone: TR_TZ });
}

/**
 * The scheduling queue, oldest-first — this is the actual point of "zamanla":
 * seeing the whole drip-publish calendar at a glance so posts don't cluster on
 * the same day (which defeats the "yayınlamayı doğal bir kadansa yaymak" goal).
 */
function PublishQueue({ posts }: { posts: ListRow[] }) {
  const scheduled = posts
    .filter((p) => p.published && p.publishedAt && !isPageLive(p))
    .sort((a, b) => a.publishedAt!.getTime() - b.publishedAt!.getTime());
  if (scheduled.length === 0) return null;

  const dayKey = (d: Date) => d.toLocaleDateString("en-CA", { timeZone: TR_TZ });
  const perDay = new Map<string, number>();
  for (const p of scheduled) {
    const k = dayKey(p.publishedAt!);
    perDay.set(k, (perDay.get(k) ?? 0) + 1);
  }

  return (
    <div className="mb-6 rounded-md border border-gold-500/40 bg-gold-50/40 p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-900">
        <CalendarClock className="h-4 w-4 text-gold-600" />
        Yayın Takvimi — {scheduled.length} yazı sırada
      </div>
      <ul className="space-y-2">
        {scheduled.map((post) => {
          const clash = (perDay.get(dayKey(post.publishedAt!)) ?? 0) > 1;
          return (
            <li
              key={post.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-sm bg-white/70 px-3 py-2 text-sm"
            >
              <span className="min-w-0 truncate text-ink-900">{post.title}</span>
              <span className="flex shrink-0 items-center gap-2 text-xs text-slate-500">
                {clash && (
                  <span
                    className="flex items-center gap-1 text-amber-600"
                    title="Bu gün için birden fazla yazı zamanlanmış — aynı günde yığılmamak için dağıtmayı düşün."
                  >
                    <TriangleAlert className="h-3.5 w-3.5" />
                  </span>
                )}
                <span className="font-medium text-ink-900">
                  {relativeDay(post.publishedAt!)}
                </span>
                <span>
                  {post.publishedAt!.toLocaleTimeString("tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: TR_TZ,
                  })}
                </span>
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="text-ink-900 underline underline-offset-2 hover:text-gold-600"
                >
                  düzenle
                </Link>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default async function BlogListPage() {
  await requireAdminSession();
  const dbStatus = await getDatabaseStatus();
  if (dbStatus !== "ok") return <DatabaseSetupNotice reason={dbStatus} />;

  // No `.catch(() => [])`: a failing query must surface through error.tsx,
  // not masquerade as "Henüz blog yazısı yok". Only list columns are read.
  const posts: ListRow[] = await db
    .select(listColumns)
    .from(pages)
    .where(eq(pages.kind, "blog"))
    .orderBy(desc(pages.createdAt));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-ink-900">Blog Yazıları</h1>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 rounded-sm bg-gold-500 px-4 py-2 text-sm font-medium text-navy-950 hover:bg-gold-300"
        >
          <Plus className="h-4 w-4" /> Yeni Yazı
        </Link>
      </div>

      <div className="mt-6">
        <PublishQueue posts={posts} />
      </div>

      <div className="space-y-3">
        {posts.length === 0 && (
          <p className="text-sm text-slate-500">Henüz blog yazısı yok.</p>
        )}
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between rounded-sm border border-navy-950/10 bg-white p-4"
          >
            <div>
              <div className="font-medium text-ink-900">{post.title}</div>
              <div className="text-xs text-slate-500">
                {pageHref(post)} · {statusLabel(post)}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                prefetch={false}
                href={isPageLive(post) ? pageHref(post) : `/api/draft/?slug=${encodeURIComponent(post.slug)}`}
                target="_blank"
                className="text-sm text-slate-500 hover:text-gold-500"
              >
                {isPageLive(post) ? "Görüntüle" : "Önizle"}
              </Link>
              <Link
                href={`/admin/blog/${post.id}/`}
                className="flex items-center gap-1.5 text-sm text-ink-900 hover:text-gold-500"
              >
                <Pencil className="h-4 w-4" /> Düzenle
              </Link>
              <DeleteButton
                action={deletePage.bind(null, post.id)}
                confirmText="Bu yazıyı silmek istediğinize emin misiniz?"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
