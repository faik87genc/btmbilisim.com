"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Client helper for the server-rendered header:
 * - marks the top-level item for the current section (`data-active`, styled in
 *   ensa.css) — each `[data-nav]` link lists the path prefixes it owns in
 *   `data-nav`, space separated;
 * - when a link inside a hover menu is clicked, shuts the menus until the
 *   pointer leaves the header (the cursor is still over the panel, so CSS
 *   :hover would otherwise keep it open on top of the new page).
 */
export function NavActive() {
  const pathname = usePathname();

  useEffect(() => {
    const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
    document.querySelectorAll<HTMLElement>("[data-nav]").forEach((el) => {
      const prefixes = (el.dataset.nav ?? "").split(" ").filter(Boolean);
      const hit = prefixes.some((p) => (p === "/" ? path === "/" : path.startsWith(p)));
      el.toggleAttribute("data-active", hit);
      if (hit) el.setAttribute("aria-current", "true");
      else el.removeAttribute("aria-current");
    });
  }, [pathname]);

  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;
    const release = () => header.removeAttribute("data-menus-off");
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest("a");
      if (!link || !link.closest("[data-menu-panel]")) return;
      header.setAttribute("data-menus-off", "");
      link.blur();
    };
    header.addEventListener("click", onClick);
    header.addEventListener("pointerleave", release);
    return () => {
      header.removeEventListener("click", onClick);
      header.removeEventListener("pointerleave", release);
    };
  }, []);

  return null;
}
