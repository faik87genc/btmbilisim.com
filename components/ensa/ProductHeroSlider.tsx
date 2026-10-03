"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "./Container";
import { Button } from "./Button";
import { GlobeBands } from "./GlobeBands";

export type ProductHeroSlide = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

export function ProductHeroSlider({ slides }: { slides: ProductHeroSlide[] }) {
  const [index, setIndex] = useState(0);
  // The hero heading + görsel are revealed by the `fade-up` CSS animation
  // (opacity 0 → 1). If that animation ever fails to run to completion — a
  // throttled background tab, a bfcache restore, some mobile browsers — the
  // element stays stuck at opacity 0 and the görsel disappears. So the very
  // first paint carries no animation class (content is simply visible); the
  // entrance animation is added only once the visitor changes slide, and the
  // auto-advance timer does a plain swap without arming it.
  const [hasNavigated, setHasNavigated] = useState(false);
  const multi = slides.length > 1;

  const go = useCallback(
    (delta: number) => {
      setHasNavigated(true);
      setIndex((i) => (i + delta + slides.length) % slides.length);
    },
    [slides.length],
  );

  const jumpTo = useCallback((i: number) => {
    setHasNavigated(true);
    setIndex(i);
  }, []);

  useEffect(() => {
    if (!multi) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      7000,
    );
    return () => clearInterval(id);
  }, [multi, slides.length]);

  // `?? slides[0]` guards a transient out-of-range index (e.g. a dev Fast
  // Refresh that shrinks the array while `index` still points past the end).
  const slide = slides[index] ?? slides[0];
  const entrance = hasNavigated ? "animate-fade-up" : "";

  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 md:py-28">
      <GlobeBands className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] text-gold-500/15" />

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div key={index} className={`max-w-xl ${entrance}`}>
            <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-gold-300">
              <span className="h-px w-8 bg-gold-300" />
              {slide.eyebrow}
            </div>
            <h1 className="text-balance font-display text-3xl font-bold leading-[1.1] tracking-tight text-paper-50 md:text-4xl">
              {slide.titleLead}{" "}
              <span className="text-gold-300">{slide.titleAccent}</span>
            </h1>
            <p className="mt-6 text-balance leading-relaxed text-slate-300">
              {slide.description}
            </p>
            <div className="mt-8">
              <Button href={slide.ctaHref} variant="primary">
                {slide.ctaLabel}
              </Button>
            </div>

            {multi && (
              <div className="mt-8 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="rounded-full border border-paper-50/15 p-2 text-paper-50 transition-colors hover:border-gold-500/50 hover:text-gold-300"
                  aria-label="Önceki"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <div className="flex gap-2">
                  {slides.map((s, i) => (
                    <button
                      key={s.titleAccent}
                      type="button"
                      onClick={() => jumpTo(i)}
                      aria-label={`${i + 1}. slayta git`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === index ? "w-7 bg-gold-500" : "w-1.5 bg-paper-50/30 hover:bg-paper-50/50"
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="rounded-full border border-paper-50/15 p-2 text-paper-50 transition-colors hover:border-gold-500/50 hover:text-gold-300"
                  aria-label="Sonraki"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>

          <div
            key={`img-${index}`}
            className={`mx-auto w-full max-w-[320px] ${entrance}`}
          >
            <div className="overflow-hidden rounded-lg border border-paper-50/10 bg-navy-950 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                width={slide.imageWidth}
                height={slide.imageHeight}
                loading="eager"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
