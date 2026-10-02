"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Lightbox } from "./Lightbox";

type Shot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
};

export function ImageCarousel({
  images,
  tone = "light",
  frameHeight = "h-72 sm:h-80",
}: {
  images: Shot[];
  tone?: "light" | "dark";
  frameHeight?: string;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const isDark = tone === "dark";
  const current = images[index];
  const multi = images.length > 1;

  const go = (delta: number) =>
    setIndex((i) => (i + delta + images.length) % images.length);

  const arrowBtn = isDark
    ? "bg-navy-950/70 text-paper-50 hover:bg-navy-950/90"
    : "bg-white/80 text-ink-900 hover:bg-white";

  return (
    <div>
      <div
        className={`group relative overflow-hidden rounded-sm border shadow-[0_24px_60px_-30px_rgba(10,18,32,0.4)] ${frameHeight} ${
          isDark
            ? "border-paper-50/10 bg-navy-900"
            : "border-navy-950/10 bg-paper-100"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="block h-full w-full cursor-zoom-in"
          aria-label={`${current.label} — büyüt`}
        >
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            loading="eager"
            sizes="(min-width: 640px) 42rem, 100vw"
            // Dashboard/report screenshots vary in aspect ratio; `contain`
            // keeps every one fully visible (letterboxed on the frame bg)
            // instead of `cover` cropping 20–50% off the bottom rows.
            className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        </button>

        {multi && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className={`absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${arrowBtn}`}
              aria-label="Önceki görsel"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${arrowBtn}`}
              aria-label="Sonraki görsel"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p
          className={`text-xs uppercase tracking-wider ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {current.label}
        </p>
        {multi && (
          <div className="flex shrink-0 gap-1.5">
            {images.map((shot, i) => (
              <button
                key={shot.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${shot.label} görselini göster`}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === index
                    ? "bg-gold-500"
                    : isDark
                      ? "bg-paper-50/25"
                      : "bg-navy-950/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <Lightbox
        images={images}
        index={index}
        onIndexChange={setIndex}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
