"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlogCard } from "./BlogCard";
import type { Page } from "@/lib/db/schema";

const AUTOPLAY_MS = 5000;

/**
 * Horizontally-snapping card slider for the homepage blog teaser. Native CSS
 * scroll-snap does the actual sliding (touch/trackpad swipe works for free,
 * no transform math to keep in sync with card width) — the JS layer only
 * drives the autoplay timer, the arrow buttons, and which dot is lit.
 */
export function BlogCardSlider({ posts }: { posts: Page[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const multi = posts.length > 1;

  const cardWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const first = track.firstElementChild as HTMLElement | null;
    if (!first) return 0;
    const style = getComputedStyle(track);
    return first.offsetWidth + parseFloat(style.columnGap || style.gap || "0");
  }, []);

  const scrollToIndex = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = (i + posts.length) % posts.length;
      track.scrollTo({ left: clamped * cardWidth(), behavior: "smooth" });
    },
    [cardWidth, posts.length],
  );

  // Keep the lit dot in sync with manual swipes/drags, not just button clicks.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = cardWidth();
        if (w > 0) setActive(Math.round(track.scrollLeft / w) % posts.length);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [cardWidth, posts.length]);

  // Auto-advance, one card at a time — paused on hover/focus and skipped
  // entirely for prefers-reduced-motion (manual arrows/dots/swipe still work).
  useEffect(() => {
    if (!multi || reduceMotion || paused) return;
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const w = cardWidth();
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + w, behavior: "smooth" });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [cardWidth, multi, paused, reduceMotion]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="scrollbar-hidden flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
      >
        {posts.map((post, i) => (
          <div
            key={post.id}
            className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
          >
            <BlogCard post={post} delay={i * 0.06} />
          </div>
        ))}
      </div>

      {multi && (
        <>
          <button
            type="button"
            onClick={() => scrollToIndex(active - 1)}
            className="absolute -left-4 top-[calc(50%-1.25rem)] hidden -translate-y-1/2 rounded-full border border-navy-950/10 bg-white p-2 text-ink-900 shadow-[0_8px_24px_-12px_rgba(10,18,32,0.35)] transition-colors hover:border-gold-500/50 hover:text-gold-600 md:flex"
            aria-label="Önceki yazılar"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(active + 1)}
            className="absolute -right-4 top-[calc(50%-1.25rem)] hidden -translate-y-1/2 rounded-full border border-navy-950/10 bg-white p-2 text-ink-900 shadow-[0_8px_24px_-12px_rgba(10,18,32,0.35)] transition-colors hover:border-gold-500/50 hover:text-gold-600 md:flex"
            aria-label="Sonraki yazılar"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="mt-6 flex justify-center gap-1.5">
            {posts.map((post, i) => (
              <button
                key={post.id}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`${i + 1}. yazıya git`}
                className="group flex h-6 w-6 items-center justify-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-6 bg-gold-500"
                      : "w-1.5 bg-navy-950/15 group-hover:bg-navy-950/30"
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
