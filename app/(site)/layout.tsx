import "./site.css";
import "./content-guard.css";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/SiteHeader";
import { CookieBanner, SiteFooter } from "@/components/SiteFooter";
import { IconSprite } from "@/components/site/IconSprite";
import { SiteBehavior } from "@/components/site/SiteBehavior";
import { ContentGuard } from "@/components/site/ContentGuard";

// site.css is _legacy-static-site/assets/css/style.css copied verbatim: the
// static site is the design master and every public page reuses its markup.

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* RSS autodiscovery (app/feed.xml). React hoists <link> into <head>.
          Not set via metadata `alternates.types`: a page's own `alternates`
          (its canonical) replaces the layout's wholesale. */}
      <link rel="alternate" type="application/rss+xml" title="BTM Bilişim Blog" href="/feed.xml" />
      <IconSprite />
      <a className="skip-link" href="#main">
        İçeriğe geç
      </a>
      <CookieBanner />
      <SiteHeader />
      {children}
      <SiteFooter />
      <SiteBehavior />
      <ContentGuard />
      {/* Cookieless page-view counts (no consent needed); GA4 in SiteBehavior
          still loads only after cookie consent. Public pages only, not /admin. */}
      <Analytics />
    </>
  );
}
