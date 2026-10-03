import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Container } from "@/components/ensa/Container";
import { Button } from "@/components/ensa/Button";

export const metadata: Metadata = {
  title: `Sayfa Bulunamadı${site.titleSuffix}`,
  description: "Aradığınız sayfa bulunamadı.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-paper-50 py-24 md:py-32">
      <Container className="max-w-2xl text-center">
        <div className="mb-5 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-gold-800">
          <span className="h-px w-8 bg-gold-500" />
          404
          <span className="h-px w-8 bg-gold-500" />
        </div>
        <h1 className="font-display text-4xl font-bold text-ink-900 md:text-5xl">Sayfa bulunamadı</h1>
        <p className="mt-4 text-slate-500">
          Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Aşağıdaki bağlantılardan devam edebilirsiniz.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="primary">
            Ana Sayfaya Dön
          </Button>
          <Button href="/hizmetler/" variant="ghost-light">
            Hizmetlerimiz
          </Button>
          <Button href="/blog/" variant="ghost-light">
            Blog
          </Button>
        </div>
      </Container>
    </section>
  );
}
