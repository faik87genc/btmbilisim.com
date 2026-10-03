import "./ensa.css";
import "./content-guard.css";
import { Analytics } from "@vercel/analytics/next";
import { TopBar } from "@/components/ensa/TopBar";
import { Header } from "@/components/ensa/Header";
import { Footer } from "@/components/ensa/Footer";
import { FloatingContact } from "@/components/ensa/FloatingContact";
import { ScrollProgress } from "@/components/ensa/ScrollProgress";
import { CookieBanner } from "@/components/ensa/CookieBanner";
import { SiteBehavior } from "@/components/site/SiteBehavior";
import { ContentGuard } from "@/components/site/ContentGuard";
import { RevealObserver } from "@/components/ensa/RevealObserver";

// Public site: design from ensakurumsal.com (Tailwind, components/ensa),
// content and data layer from this project (lib/pages.ts, the admin panel).

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* RSS autodiscovery (app/feed.xml). React hoists <link> into <head>. */}
      <link rel="alternate" type="application/rss+xml" title="BTM Bilişim Blog" href="/feed.xml" />
      <a
        href="#main"
        className="absolute -left-[9999px] top-0 z-[100] bg-navy-950 px-5 py-3 text-paper-50 focus:left-0"
      >
        İçeriğe geç
      </a>
      <ScrollProgress />
      <CookieBanner />
      <TopBar />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Footer />
      <FloatingContact />
      <SiteBehavior />
      <ContentGuard />
      <RevealObserver />
      {/* Cookieless page-view counts (no consent needed); GA4 in SiteBehavior
          still loads only after cookie consent. Public pages only, not /admin. */}
      {/* Vercel Web Analytics only exists on Vercel; elsewhere its script 404s. */}
      {process.env.VERCEL ? <Analytics /> : null}
    </>
  );
}
