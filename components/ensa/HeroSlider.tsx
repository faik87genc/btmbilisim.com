"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "./Container";
import { Button } from "./Button";

export type HeroSlide = {
  image: string;
  /** Optional looping background video; `image` still serves as the
   * `poster` (what LCP measures, and what reduced-motion visitors get). */
  video?: string;
  imageAlt: string;
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  // "dark" (varsayılan): fotoğraf slaytları için güçlü koyu örtü.
  // "light": ürün ekran görüntüsü slaytları için hafif örtü — görsel okunaklı
  // kalsın diye sağ tarafta degrade hızla şeffaflaşır.
  overlay?: "dark" | "light";
  /** Metni zaten üzerinde basılı hazır bir banner görseli: örtü ve yazı
   * katmanı çizilmez, görsel diğer slaytlar gibi tam genişlikte gösterilir ve tüm
   * slayt `primaryCta.href`'e bağlanır. Başlık alanları yalnızca ekran
   * okuyucular/SEO için (sr-only) kullanılır. */
  banner?: boolean;
};

const SECTION_HEIGHT = {
  // Ana sayfa: lg+ ekranlarda slider tam olarak banner görselinin oranında
  // (1672×941) — hazır Atlas banner'ı her genişlikte kırpılmadan, tam sığar.
  // Metinli slaytların içeriği lg genişliğinde (≥576px yükseklik) rahat sığar.
  default: "h-[600px] md:h-[640px] lg:h-auto lg:min-h-[600px] lg:aspect-[1672/941]",
  // A bigger, more dominant presence for a mid-page banner (not the LCP-critical
  // homepage hero, so there's no first-paint budget to protect here).
  tall: "h-[680px] md:h-[760px]",
};

// false during SSR and hydration, true afterwards (no effect, no extra render pass).
const noopSubscribe = () => () => {};

export function HeroSlider({
  slides,
  size = "default",
}: {
  slides: HeroSlide[];
  size?: "default" | "tall";
}) {
  const [index, setIndex] = useState(0);
  // Slides 2..n are held back until the visitor engages (or a slow fallback
  // timer) so a cold mobile load gives the first (LCP) hero image the whole
  // connection instead of racing three more full-bleed images it cannot paint
  // yet. The arm was previously a ~2.5 s `requestIdleCallback`, but mounting
  // three <Image> + overlay nodes into the hero <section> mid-load re-laid-out
  // the LCP element and pushed the measured LCP to ~2.9 s even though the pixels
  // never changed. Interaction-gated + a 5 s fallback keeps that mutation well
  // clear of LCP finalisation.
  const [extraReady, setExtraReady] = useState(false);
  // Skip the text block's entrance fade on the very first paint (it wraps the
  // <h1> next to the LCP image); replay it only when the visitor changes slide.
  const [hasNavigated, setHasNavigated] = useState(false);
  const multi = slides.length > 1;
  const reduceMotion = useReducedMotion();
  // The first client render must match the server HTML (the poster <Image>);
  // a video on slide 1 is swapped in only after hydration.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const go = useCallback(
    (delta: number) => {
      setExtraReady(true);
      setHasNavigated(true);
      setIndex((i) => (i + delta + slides.length) % slides.length);
    },
    [slides.length],
  );

  const jumpTo = useCallback((i: number) => {
    setExtraReady(true);
    setHasNavigated(true);
    setIndex(i);
  }, []);

  useEffect(() => {
    if (!multi || extraReady) return;
    const w = window;
    const arm = () => setExtraReady(true);
    const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    events.forEach((e) => w.addEventListener(e, arm, { once: true, passive: true }));
    const t = w.setTimeout(arm, 5000);
    return () => {
      events.forEach((e) => w.removeEventListener(e, arm));
      w.clearTimeout(t);
    };
  }, [multi, extraReady]);

  useEffect(() => {
    // Don't auto-advance for visitors who asked for reduced motion — the arrows
    // and dots still let them move through the slides manually (WCAG 2.2.2) —
    // and not before the remaining slides have mounted.
    if (!multi || reduceMotion || !extraReady) return;
    const id = setInterval(() => go(1), 9000);
    return () => clearInterval(id);
  }, [go, multi, reduceMotion, extraReady]);

  // `?? slides[0]` guards a transient out-of-range index — e.g. a dev Fast
  // Refresh that shrinks the slide array while `index` still points past the
  // new end. On a real load `index` starts at 0 and the modulo in `go` keeps
  // it in range.
  const slide = slides[index] ?? slides[0];

  return (
    <section className={`relative isolate overflow-hidden bg-navy-950 ${SECTION_HEIGHT[size]}`}>
      {slides.map((s, i) => {
        if (i > 0 && !extraReady) return null;
        return (
        <div
          key={s.image}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          {s.banner ? (
            <Link
              href={s.primaryCta.href}
              tabIndex={i === index ? undefined : -1}
              className="absolute inset-0 block"
            >
              <Image
                src={s.image}
                alt={s.imageAlt}
                fill
                priority={i === 0}
                fetchPriority={i === 0 ? "high" : "auto"}
                loading={i === 0 ? "eager" : "lazy"}
                quality={85}
                sizes="100vw"
                // Dar ekranda banner'ın sol yarısı (logo + başlık) görünsün.
                className="object-cover object-left md:object-center"
              />
            </Link>
          ) : s.video && mounted && reduceMotion === false ? (
            // `poster` (not the video frames) is what LCP actually measures,
            // so this keeps the same fast paint as a plain <Image> while the
            // clip loads/plays on top — no reduced-motion visitor gets an
            // autoplaying video at all, just the static poster below.
            // `reduceMotion === false` (not `!reduceMotion`) is deliberate:
            // framer-motion's useReducedMotion() returns `null` during SSR
            // (it needs the browser's matchMedia, unavailable on the server),
            // and `!null` is `true` — so `!reduceMotion` would render the
            // autoplaying video in the server-rendered HTML for every
            // visitor, reduced-motion or not, until React hydrates and
            // corrects it client-side. Requiring the explicit `false` means
            // the safe static poster is what ships in markup and over the
            // wire; the video only ever appears once hydration confirms the
            // visitor didn't ask for less motion.
            <video
              className="absolute inset-0 h-full w-full object-cover"
              poster={s.image}
              autoPlay
              muted
              loop
              playsInline
              preload={i === 0 ? "auto" : "none"}
            >
              <source src={s.video} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={s.image}
              alt={s.imageAlt}
              fill
              priority={i === 0}
              fetchPriority={i === 0 ? "high" : "auto"}
              loading={i === 0 ? "eager" : "lazy"}
              quality={70}
              sizes="100vw"
              className="object-cover"
            />
          )}
          {s.banner ? null : s.overlay === "light" ? (
            <>
              {/* Ürün ekran görüntüsü slaytları: sol tarafta başlık okunaklı
                  kalacak kadar koyu, sağ tarafta görsel net görünsün diye
                  degrade şeffaflaşır. Metnin oturduğu sol yarı neredeyse tam
                  opak; sağ kenar görseli göstermek için ~%25'e iner. */}
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/25" />
              {/* Metin bloğunun tam arkasına ek dikey koyulaşma — puntolar
                  parlak zeminlerde bile sönük durmasın. */}
              <div className="absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-navy-950/70 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-grain opacity-20" />
            </>
          ) : (
            <>
              {/* Fotoğraf slaytları: güçlü koyu örtü. */}
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
              <div className="absolute inset-0 bg-navy-950/25" />
              <div className="pointer-events-none absolute inset-0 bg-grain opacity-30" />
            </>
          )}
        </div>
        );
      })}

      {!slide.banner && (
        <>
          {/* Decorative geometric accents */}
          <div className="pointer-events-none absolute -right-16 top-16 hidden h-64 w-64 rounded-full border border-gold-500/20 md:block" />
          <div className="pointer-events-none absolute right-24 top-40 hidden h-16 w-16 rotate-12 bg-gold-500/25 md:block" />
        </>
      )}

      <Container
        className={`relative flex h-full items-center ${slide.banner ? "pointer-events-none" : ""}`}
      >
        <div
          key={index}
          className={
            slide.banner
              ? "sr-only"
              : `max-w-2xl ${hasNavigated ? "animate-fade-up" : ""}`
          }
        >
          <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-gold-300 [text-shadow:0_1px_10px_rgb(3_7_18_/_0.6)] md:text-sm">
            <span className="h-px w-8 bg-gold-300" />
            {slide.eyebrow}
          </div>
          <h1 className="text-balance font-display text-[2.5rem] font-bold leading-[1.05] tracking-tight text-white [text-shadow:0_2px_18px_rgb(3_7_18_/_0.6)] md:text-[4rem]">
            {slide.titleLead}{" "}
            <span className="text-gold-400 [text-shadow:0_2px_18px_rgb(3_7_18_/_0.55)]">
              {slide.titleAccent}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-balance text-lg font-medium leading-relaxed text-slate-100 [text-shadow:0_1px_10px_rgb(3_7_18_/_0.7)] md:text-xl">
            {slide.description}
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href={slide.primaryCta.href} variant="primary">
              {slide.primaryCta.label}
            </Button>
            <Button href={slide.secondaryCta.href} variant="ghost-dark">
              {slide.secondaryCta.label}
            </Button>
          </div>
        </div>

        {/* The hero used to carry its own floating "Hemen Başlayalım" CTA
            card here — dropped because FloatingContact (site-wide, every
            page) already puts the same /iletisim prompt on screen, so this
            was a second, identical contact affordance stacked on the very
            first screen a visitor sees. */}

        <div className={`absolute bottom-7 right-6 hidden font-mono text-[11px] uppercase tracking-wider text-slate-400 md:block lg:right-10 ${slide.banner ? "!hidden" : ""}`}>
          BTM / {String(index + 1).padStart(2, "0")}
          <br />
          {slide.eyebrow}
        </div>
      </Container>

      {multi && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-4 top-1/2 hidden md:block -translate-y-1/2 rounded-full bg-paper-50/10 p-2 text-paper-50 backdrop-blur-sm transition-colors hover:bg-paper-50/20 md:left-8"
            aria-label="Önceki slayt"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-4 top-1/2 hidden md:block -translate-y-1/2 rounded-full bg-paper-50/10 p-2 text-paper-50 backdrop-blur-sm transition-colors hover:bg-paper-50/20 md:right-8"
            aria-label="Sonraki slayt"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="absolute inset-x-0 bottom-4 flex justify-center">
            {slides.map((s, i) => (
              <button
                key={s.image}
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={`${i + 1}. slayta git`}
                className="group flex h-6 w-8 items-center justify-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-7 bg-gold-500"
                      : "w-1.5 bg-paper-50/40 group-hover:bg-paper-50/60"
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
