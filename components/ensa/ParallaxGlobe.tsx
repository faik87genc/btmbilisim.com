"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { GlobeBands } from "./GlobeBands";

/**
 * The decorative GlobeBands motif, drifting slowly against the scroll and
 * rotating a few degrees across the section. Purely visual; hidden from a11y.
 * Falls back to a static motif under `prefers-reduced-motion`.
 */
export function ParallaxGlobe({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className} aria-hidden="true">
        <GlobeBands className="h-full w-full" />
      </div>
    );
  }

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <m.div style={{ y, rotate }} className="h-full w-full will-change-transform">
        <GlobeBands className="h-full w-full animate-float-y" />
      </m.div>
    </div>
  );
}
