import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowUpRight, Newspaper } from "lucide-react";
import type { Page } from "@/lib/db/schema";
import { MotionReveal } from "./MotionReveal";

/**
 * Image-forward blog card for grids (blog index, tag archive, homepage teaser,
 * related posts). Falls back to a branded placeholder tile when a post has no
 * cover — older/imported posts and the editorial fallback set have none, and
 * the grid must stay visually even regardless.
 */
export function BlogCard({
  post,
  delay = 0,
  priority = false,
}: {
  post: Page;
  delay?: number;
  /** Pass true for above-the-fold cards (first row) to skip lazy-loading. */
  priority?: boolean;
}) {
  const primaryTag = post.tags[0];

  return (
    <MotionReveal delay={delay} className="h-full">
      <Link
        href={`/${post.slug}/`}
        className="group flex h-full flex-col overflow-hidden rounded-lg border border-navy-950/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-[0_18px_40px_-24px_rgba(10,18,32,0.35)]"
      >
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-navy-900">
          {post.coverImageUrl ? (
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-900 to-navy-700">
              <Newspaper className="h-9 w-9 text-gold-500/40" aria-hidden="true" />
            </div>
          )}
          {primaryTag && (
            <span className="absolute left-3 top-3 rounded-full bg-navy-950/85 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-gold-300 backdrop-blur-sm">
              {primaryTag}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : ""}
            </span>
          </div>

          <h3 className="mt-3 line-clamp-2 font-display text-lg font-semibold leading-snug text-ink-900 transition-colors group-hover:text-gold-600">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">
            {post.excerpt}
          </p>

          <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-gold-600">
            Devamını oku
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </MotionReveal>
  );
}
