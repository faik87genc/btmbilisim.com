import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Link-based pager (?page=N) for a post grid — no client JS, works with ISR.
 * Renders nothing when there's only one page.
 */
export function Pagination({
  page,
  totalPages,
  basePath,
}: {
  page: number;
  totalPages: number;
  /** e.g. "/blog" or "/blog/etiket/kvkk" — page 1 links back without the param. */
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  const hrefFor = (p: number) => (p <= 1 ? basePath : `${basePath}?page=${p}`);

  // Always show first, last, current, and its neighbours; collapse the rest.
  const keep = new Set(
    [1, totalPages, page - 1, page, page + 1].filter(
      (p) => p >= 1 && p <= totalPages,
    ),
  );
  const pages = [...keep].sort((a, b) => a - b);

  const arrowClasses = (disabled: boolean) =>
    `flex h-9 w-9 items-center justify-center rounded-full border border-navy-950/10 text-slate-600 transition-colors hover:border-gold-500/40 hover:text-ink-900 ${
      disabled ? "pointer-events-none opacity-40" : ""
    }`;

  return (
    <nav
      aria-label="Sayfalar"
      className="mt-12 flex items-center justify-center gap-2"
    >
      <Link href={hrefFor(page - 1)} className={arrowClasses(page <= 1)} aria-label="Önceki sayfa">
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </Link>

      {pages.map((p, i) => (
        <span key={p} className="flex items-center gap-2">
          {i > 0 && pages[i - 1] !== p - 1 && (
            <span className="px-0.5 text-slate-400" aria-hidden="true">
              …
            </span>
          )}
          <Link
            href={hrefFor(p)}
            aria-current={p === page ? "page" : undefined}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
              p === page
                ? "bg-gold-500 text-navy-950"
                : "border border-navy-950/10 text-slate-600 hover:border-gold-500/40 hover:text-ink-900"
            }`}
          >
            {p}
          </Link>
        </span>
      ))}

      <Link
        href={hrefFor(page + 1)}
        className={arrowClasses(page >= totalPages)}
        aria-label="Sonraki sayfa"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </nav>
  );
}
