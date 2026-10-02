import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { PageForm } from "@/components/admin/PageForm";
import { DatabaseSetupNotice } from "@/components/admin/SetupNotice";
import { getDatabaseStatus, requireAdminSession } from "@/lib/adminGuard";
import { getAdminSeoContext } from "@/lib/adminSeoContext";

export const maxDuration = 300;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminSession();
  const dbStatus = await getDatabaseStatus();
  if (dbStatus !== "ok") return <DatabaseSetupNotice reason={dbStatus} />;

  const { id } = await params;
  // A malformed id would make Postgres throw (invalid uuid) — treat as 404.
  if (!UUID_RE.test(id)) notFound();
  const [page] = await db
    .select()
    .from(pages)
    .where(and(eq(pages.id, id), eq(pages.kind, "page")));
  if (!page) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink-900">Sayfayı Düzenle</h1>
      <div className="mt-6">
        <PageForm page={page} defaultKind="page" seoContext={await getAdminSeoContext()} />
      </div>
    </div>
  );
}
