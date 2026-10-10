import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowUpRight, Newspaper } from "lucide-react";
import type { Page } from "@/lib/db/schema";

/** Only what a card shows — keeps client payloads (BlogCardSlider) small. */
export type CardPost = Pick<Page, "id" | "slug" | "title" | "excerpt" | "coverImageUrl" | "tags" | "publishedAt">;

export function toCardPost(p: CardPost): CardPost {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    coverImageUrl: p.coverImageUrl,
    tags: p.tags.slice(0, 1),
    publishedAt: p.publishedAt,
  };
}
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
  post: CardPost;
  delay?: number;
  /** Pass true for above-the-fold cards (first row) to skip lazy-loading. */
  priority?: boolean;
}) {
  const primaryTag = post.tags[0];

  return (
    <MotionReveal delay={delay} className="h-full">
      <Link
        href={`/${post.slug}/`}
        className="card card-link group flex h-full flex-col overflow-hidden"
      >
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-navy-900">
          {post.coverImageUrl ? (
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              className="object-cover [filter:grayscale(0.2)_contrast(1.04)] transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="relative flex h-full w-full flex-col justify-end bg-brand-gradient p-5">
              <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
              <Newspaper className="absolute right-5 top-5 h-10 w-10 text-gold-300/60" aria-hidden="true" />
              <span className="relative line-clamp-2 font-display text-lg font-semibold leading-snug text-white" aria-hidden="true">
                {post.title}
              </span>
              <span className="eyebrow eyebrow-dark relative mt-1.5 !text-[11px]" aria-hidden="true">
                BTM Bilişim Blog
              </span>
            </div>
          )}
          {primaryTag && (
            <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-gold-700 shadow-sm">
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

          <h3 className="mt-3 line-clamp-2 font-display text-lg font-semibold leading-snug text-navy-950 transition-colors group-hover:text-gold-700">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">
            {post.excerpt}
          </p>

          <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-700">
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
