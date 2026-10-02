import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site";

// Port of _legacy-static-site/templates/404.html.

export const metadata: Metadata = {
  title: `Sayfa Bulunamadı${site.titleSuffix}`,
  description: "Aradığınız sayfa bulunamadı.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1}>
      <section className="section text-center">
        <div className="wrap">
          <span className="eyebrow">404</span>
          <h1>Sayfa Bulunamadı</h1>
          <p style={{ maxWidth: 520, margin: "0 auto 28px", color: "var(--slate)" }}>
            Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Aşağıdaki bağlantılardan devam edebilirsiniz.
          </p>
          <div className="hero-cta" style={{ justifyContent: "center" }}>
            <Link className="btn btn-primary btn-lg" href="/">
              Anasayfaya Dön
            </Link>
            <Link className="btn btn-ghost btn-lg" href="/blog/">
              Blogu İncele
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
