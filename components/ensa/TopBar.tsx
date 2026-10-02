import Link from "next/link";
import { Mail, Phone, MessageCircleQuestion } from "lucide-react";
import { Container } from "./Container";
import { site } from "@/lib/site";

// lucide-react doesn't ship brand marks, so these are hand-drawn to match
// the stroke-icon sizing used elsewhere in the TopBar.
function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231ZM17.083 19.77h1.833L7.084 4.126H5.117Z" />
    </svg>
  );
}

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM7.114 20.452H3.558V9h3.556v11.452Z" />
    </svg>
  );
}

// Only accounts with a URL in site.social are shown.
const socialLinks = [
  { label: "Instagram", icon: InstagramIcon, href: site.social.instagram },
  { label: "X", icon: XIcon, href: site.social.x },
  { label: "LinkedIn", icon: LinkedInIcon, href: site.social.linkedin },
].filter((l) => l.href);

export function TopBar() {
  return (
    <div className="hidden bg-navy-950 py-2 text-xs text-slate-300 md:block">
      <Container className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-2 transition-colors hover:text-paper-50"
          >
            <Mail className="h-3.5 w-3.5 text-gold-500" aria-hidden="true" />
            {site.email}
          </a>
          <a
            href={site.phone.href}
            className="flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-gold-300 transition-colors hover:border-gold-500/60 hover:bg-gold-500/20 hover:text-gold-100"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            {site.phone.display}
          </a>
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="/iletisim/"
            className="flex items-center gap-2 transition-colors hover:text-paper-50"
          >
            <MessageCircleQuestion
              className="h-3.5 w-3.5 text-gold-500"
              aria-hidden="true"
            />
            Ücretsiz Ön Görüşme
          </Link>

          {socialLinks.length > 0 && (
          <div className="flex items-center gap-3 border-l border-paper-50/10 pl-5">
            {socialLinks.map(({ label, icon: Icon, href }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (yeni sekmede açılır)`}
                  title={label}
                  className="text-slate-300 transition-colors hover:text-gold-300"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ) : (
                <span
                  key={label}
                  role="img"
                  aria-label={label}
                  title={label}
                  className="text-slate-300 transition-colors hover:text-gold-300"
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
              ),
            )}
          </div>
          )}
        </div>
      </Container>
    </div>
  );
}
