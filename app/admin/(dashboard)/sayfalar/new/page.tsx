import { PageForm } from "@/components/admin/PageForm";
import { DatabaseSetupNotice } from "@/components/admin/SetupNotice";
import { getDatabaseStatus, requireAdminSession } from "@/lib/adminGuard";
import { getAdminSeoContext } from "@/lib/adminSeoContext";

export const maxDuration = 300;

export default async function NewPagePage() {
  await requireAdminSession();
  // Don't let the editor write a whole page that can't be saved.
  const dbStatus = await getDatabaseStatus();
  if (dbStatus !== "ok") return <DatabaseSetupNotice reason={dbStatus} />;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink-900">Yeni Sayfa</h1>
      <div className="mt-6">
        <PageForm defaultKind="page" seoContext={await getAdminSeoContext()} />
      </div>
    </div>
  );
}
