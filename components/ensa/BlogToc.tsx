import type { Heading } from "@/lib/markdownStructure";

/** Compact in-article table of contents. Renders nothing when `items` is empty. */
export function BlogToc({ items }: { items: Heading[] }) {
  if (items.length === 0) return null;
  return (
    <nav
      aria-label="İçindekiler"
      className="mb-10 rounded-sm border border-navy-950/10 bg-white p-5"
    >
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-400">
        İçindekiler
      </div>
      <ol className="space-y-1.5 text-sm">
        {items.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${h.id}`}
              className="text-slate-600 underline-offset-2 hover:text-gold-600 hover:underline"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
