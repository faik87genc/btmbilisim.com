import { Database, TriangleAlert } from "lucide-react";

/**
 * Shown in place of every admin screen when the CMS database isn't usable.
 * `reason: "missing"` = DATABASE_URL is empty (the public site keeps serving
 * lib/data/fallback-pages.json); `"unreachable"` = it's set but the ping
 * failed (wrong URL, suspended Neon project, network).
 */
export function DatabaseSetupNotice({ reason }: { reason: "missing" | "unreachable" }) {
  const missing = reason === "missing";
  return (
    <section
      aria-labelledby="db-setup-title"
      className="rounded-md border border-amber-300 bg-amber-50 p-6 text-sm text-ink-900"
    >
      <div className="flex items-center gap-2">
        {missing ? (
          <Database className="h-5 w-5 text-amber-600" aria-hidden />
        ) : (
          <TriangleAlert className="h-5 w-5 text-amber-600" aria-hidden />
        )}
        <h1 id="db-setup-title" className="font-display text-xl font-semibold">
          {missing
            ? "Veritabanı bağlı değil — kurulum adımları"
            : "Veritabanına ulaşılamıyor"}
        </h1>
      </div>

      <p className="mt-3 text-slate-700">
        {missing
          ? "Yönetim paneli yazı ve sayfaları bir Neon Postgres veritabanında tutar. DATABASE_URL tanımlı olmadığı için panel şu an içerik listeleyemez ve kaydedemez."
          : "DATABASE_URL tanımlı ama veritabanı yanıt vermedi. Adres yanlış, Neon projesi askıya alınmış ya da ağ erişimi kesilmiş olabilir."}{" "}
        Genel site etkilenmez: veritabanı yokken içerik{" "}
        <code className="rounded bg-white px-1">lib/data/fallback-pages.json</code>{" "}
        dosyasından sunulmaya devam eder.
      </p>

      <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
        <li>
          <a href="https://neon.tech" target="_blank" rel="noreferrer" className="underline">
            neon.tech
          </a>{" "}
          üzerinde bir proje açın (bölge: Frankfurt, <em>eu-central-1</em>).
        </li>
        <li>
          Bağlantı adreslerini Vercel &rarr; Settings &rarr; Environment Variables altına ekleyin:{" "}
          <code className="rounded bg-white px-1">DATABASE_URL</code> (pooled) ve{" "}
          <code className="rounded bg-white px-1">DATABASE_URL_UNPOOLED</code> (direct). Yerelde
          aynı değerleri <code className="rounded bg-white px-1">.env.local</code> dosyasına yazın.
        </li>
        <li>
          Tabloyu oluşturun: <code className="rounded bg-white px-1">npm run db:push</code>
        </li>
        <li>
          Mevcut site içeriğini aktarın:{" "}
          <code className="rounded bg-white px-1">npm run content:migrate</code>
        </li>
        <li>Vercel&apos;de yeniden dağıtım (Redeploy) yapın ve bu sayfayı yenileyin.</li>
      </ol>

      <p className="mt-4 text-xs text-slate-500">
        Ayrıntılı rehber: depodaki <code>docs/ADMIN-KURULUM.md</code>.
      </p>
    </section>
  );
}
