import { login } from "../actions";
import { authConfigProblems } from "@/lib/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  // Names of misconfigured env vars only — never their values.
  const configProblems = authConfigProblems();

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-sm border border-navy-950/10 bg-white p-8 shadow-sm">
        <h1 className="font-display text-xl font-semibold text-ink-900">
          Admin Girişi
        </h1>

        {configProblems.length > 0 ? (
          <div
            role="alert"
            className="mt-6 rounded-sm border border-amber-300 bg-amber-50 p-4 text-sm text-ink-900"
          >
            <p className="font-semibold">Admin girişi henüz yapılandırılmamış</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
              {configProblems.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-slate-500">
              Değerleri Vercel ortam değişkenlerine (yerelde <code>.env.local</code>)
              ekleyip yeniden dağıtın. Adımlar: <code>docs/ADMIN-KURULUM.md</code>.
            </p>
          </div>
        ) : (
          <form action={login} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-900">
                Şifre
              </span>
              <input
                type="password"
                name="password"
                required
                maxLength={256}
                autoComplete="current-password"
                autoFocus
                className="form-input"
              />
            </label>
            {error === "rate" ? (
              <p role="alert" className="text-sm text-red-600">
                Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin.
              </p>
            ) : error ? (
              <p role="alert" className="text-sm text-red-600">
                Şifre hatalı, tekrar deneyin.
              </p>
            ) : null}
            <button
              type="submit"
              className="w-full rounded-sm bg-gold-500 px-4 py-2.5 text-sm font-medium text-navy-950 transition-colors hover:bg-gold-300"
            >
              Giriş Yap
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
