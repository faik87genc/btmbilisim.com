import { PageForm, type AiPrefill } from "@/components/admin/PageForm";
import { DatabaseSetupNotice } from "@/components/admin/SetupNotice";
import { getDatabaseStatus, requireAdminSession } from "@/lib/adminGuard";
import { getAdminSeoContext } from "@/lib/adminSeoContext";
import { sanitizeBrief } from "@/lib/ai/brief";

// AI draft generation can run well past the default limit.
export const maxDuration = 300;

type SearchParams = Promise<{ [k: string]: string | string[] | undefined }>;

function one(v: string | string[] | undefined, max = 300): string {
  return (Array.isArray(v) ? v[0] : v ?? "").trim().slice(0, max);
}

/**
 * Prefill from the topic queue (/admin/konu-kuyrugu/):
 * ?konu=…&kw=…&niyet=…&kume=…&slug=…&linkler=/a/ /b/&format=…&not=…&bolge=…&uzunluk=1800&baslat=1
 */
function prefillFrom(sp: Awaited<SearchParams>): AiPrefill | undefined {
  const topic = one(sp.konu);
  if (topic.length < 3) return undefined;
  const words = Number.parseInt(one(sp.uzunluk, 6), 10);
  return {
    topic,
    keywords: one(sp.kw, 500),
    angle: one(sp.aci, 500),
    wordCount: Number.isFinite(words) ? words : undefined,
    autoStart: one(sp.baslat, 2) === "1",
    brief: sanitizeBrief({
      intent: one(sp.niyet),
      cluster: one(sp.kume),
      slug: one(sp.slug),
      requiredLinks: one(sp.linkler, 1000),
      format: one(sp.format, 500),
      note: one(sp.not, 500),
      audience: one(sp.bolge, 200),
    }),
  };
}

export default async function NewBlogPostPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdminSession();
  // Don't let the editor write (or AI-generate) a post that can't be saved.
  const dbStatus = await getDatabaseStatus();
  if (dbStatus !== "ok") return <DatabaseSetupNotice reason={dbStatus} />;

  const prefill = prefillFrom(await searchParams);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink-900">Yeni Blog Yazısı</h1>
      <div className="mt-6">
        <PageForm defaultKind="blog" seoContext={await getAdminSeoContext()} aiPrefill={prefill} />
      </div>
    </div>
  );
}
