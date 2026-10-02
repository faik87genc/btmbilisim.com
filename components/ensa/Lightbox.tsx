"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxShot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  label?: string;
};

/**
 * One shared full-screen image viewer for the whole site.
 *
 * Why a single component:
 * - It is rendered through a portal into <body>. Page content sits inside
 *   `MotionReveal` (framer-motion), which leaves a `transform` on its wrapper;
 *   a transformed ancestor becomes the containing block for `position: fixed`,
 *   which previously shrank the overlay to that box and left the thumbnail
 *   clickable underneath — tapping it reopened the viewer in a loop.
 * - Scroll is locked on <html> (the real scrolling element on marketing pages)
 *   *and* <body>, without a layout-shifting scroll reset.
 * - Escape / arrow keys, focus handling and backdrop-vs-content clicks live in
 *   exactly one place instead of being re-implemented per call site.
 */
export function Lightbox({
  images,
  index,
  onIndexChange,
  open,
  onClose,
}: {
  images: LightboxShot[];
  index: number;
  onIndexChange: (i: number) => void;
  open: boolean;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<Element | null>(null);
  const multi = images.length > 1;
  const safeIndex = ((index % images.length) + images.length) % images.length;
  const current = images[safeIndex];

  const step = useCallback(
    (delta: number) => {
      if (!multi) return;
      onIndexChange((safeIndex + delta + images.length) % images.length);
    },
    [multi, onIndexChange, safeIndex, images.length],
  );

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement;
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKeyDown);

    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
      if (restoreFocusRef.current instanceof HTMLElement) {
        restoreFocusRef.current.focus();
      }
    };
  }, [open, onClose, step]);

  // `open` only flips true from a client onClick, so `document` is always
  // present here and the portal never renders during SSR / first paint.
  if (!open || !current || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/92 p-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={current.label ?? current.alt}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 rounded-full p-1.5 text-paper-50/80 transition-colors hover:text-gold-300 focus-visible:text-gold-300"
        aria-label="Kapat"
      >
        <X className="h-7 w-7" aria-hidden="true" />
      </button>

      {multi && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-paper-50/10 p-2 text-paper-50 transition-colors hover:bg-paper-50/20 sm:left-6"
            aria-label="Önceki görsel"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-paper-50/10 p-2 text-paper-50 transition-colors hover:bg-paper-50/20 sm:right-6"
            aria-label="Sonraki görsel"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </>
      )}

      <figure
        className="flex max-h-full max-w-full flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          width={current.width}
          height={current.height}
          sizes="92vw"
          className="max-h-[85vh] w-auto max-w-[92vw] rounded-sm object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
        />
        {(current.label || multi) && (
          <figcaption className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-paper-50/70">
            {current.label}
            {multi && (
              <span className="text-paper-50/45">
                {safeIndex + 1} / {images.length}
              </span>
            )}
          </figcaption>
        )}
      </figure>
    </div>,
    document.body,
  );
}
