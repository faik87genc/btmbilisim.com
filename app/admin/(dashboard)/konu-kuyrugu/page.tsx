import { db } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { requireAdminSession } from "@/lib/adminGuard";
import { TopicQueue } from "@/components/admin/TopicQueue";

export const metadata = { title: "Konu kuyruğu" };

export default async function TopicQueuePage() {
  await requireAdminSession();
  // Read-only: which planned slugs are already taken.
  const existing = await db
    .select({ slug: pages.slug, title: pages.title, published: pages.published })
    .from(pages)
    .catch(() => []);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink-900">Konu kuyruğu</h1>
      <p className="mt-1 text-sm text-slate-500">
        Günlük rutin: sıradaki konuda “Taslağı başlat” → taslak forma dolar → SEO panelini
        yeşile taşı, kapak görselini üret → yayınla → satırı “tamam” işaretle.
      </p>
      <div className="mt-6">
        <TopicQueue existing={existing} />
      </div>
    </div>
  );
}
