import Link from "next/link";
import { nav, type NavItem } from "@/lib/siteView";
import { Icon } from "@/components/site/Icon";

// Markup mirrors _legacy-static-site/templates/base.html so the static site's
// stylesheet applies unchanged; open/close behaviour lives in SiteBehavior.

function Caret({ dir }: { dir: "down" | "right" }) {
  return (
    <svg className="caret" width={10} height={10} aria-hidden="true">
      <use href={`#i-chevron-${dir}`} />
    </svg>
  );
}

function SubMenu({ items }: { items: NavItem[] }) {
  return (
    <ul className="dropdown">
      {items.map((c) => (
        <li key={c.href + c.text}>
          <Link href={c.href} aria-haspopup={c.children ? "true" : undefined}>
            {c.text}
            {c.children && <> <Caret dir="right" /></>}
          </Link>
          {c.children && <SubMenu items={c.children} />}
        </li>
      ))}
    </ul>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link className="brand" href="/" aria-label="ISO 27001 Danışmanlık — Anasayfa">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand-logo" src="/assets/img/logo-full.webp" alt="ISO 27001 Danışmanlık" width={142} height={52} />
        </Link>
        <nav className="main-nav" id="ana-menu" aria-label="Ana menü">
          <ul>
            {nav.map((item) => (
              <li key={item.href + item.text}>
                <Link href={item.href} aria-haspopup={item.children ? "true" : undefined}>
                  {item.text}
                  {item.children && <> <Caret dir="down" /></>}
                </Link>
                {item.children && <SubMenu items={item.children} />}
              </li>
            ))}
            <li>
              <Link href="/blog/">Blog</Link>
            </li>
          </ul>
        </nav>
        <div className="header-cta">
          <Link className="btn btn-primary" href="/#teklif">
            Teklif Al
          </Link>
          <button className="nav-toggle" aria-label="Menüyü aç/kapat" aria-expanded="false" aria-controls="ana-menu">
            <Icon id="bars" size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
