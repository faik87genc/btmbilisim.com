"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One IntersectionObserver for every <MotionReveal> on the page (see that
 * component). Runs after each navigation; elements already on screen are left
 * alone, the rest are hidden and revealed as they scroll in. Nothing happens
 * for prefers-reduced-motion.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.remove("reveal-hidden");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );

    const fold = window.innerHeight;
    document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal-done])").forEach((el) => {
      el.setAttribute("data-reveal-done", "");
      if (el.getBoundingClientRect().top < fold) return; // already visible
      el.classList.add("reveal-hidden");
      io.observe(el);
    });

    return () => {
      io.disconnect();
      // Never leave anything hidden once the observer is gone; let a re-run
      // (Strict Mode, same-page re-render) pick the element up again.
      document.querySelectorAll(".reveal-hidden").forEach((el) => {
        el.classList.remove("reveal-hidden");
        el.removeAttribute("data-reveal-done");
      });
    };
  }, [pathname]);

  return null;
}
