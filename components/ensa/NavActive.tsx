"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Client helper for the server-rendered header:
 * - marks the top-level item for the current section (`data-active`, styled in
 *   ensa.css) — each `[data-nav]` link lists the path prefixes it owns in
 *   `data-nav`, space separated;
 * - Escape closes an open hover/focus menu (WCAG 1.4.13) and returns focus to
 *   its trigger;
 * - a POINTER click on a menu link shuts the menus until the pointer leaves the
 *   header (the cursor is still over the panel, so :hover would keep it open
 *   over the new page). Keyboard activation is left alone.
 */
export function NavActive() {
  const pathname = usePathname();

  useEffect(() => {
    const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
    // Longest matching prefix wins, so a page owned by a specific item (e.g.
    // the IT consulting link) does not also light up its broader parent.
    const links = [...document.querySelectorAll<HTMLElement>("[data-nav]")];
    const score = (el: HTMLElement) =>
      Math.max(
        -1,
        ...(el.dataset.nav ?? "")
          .split(" ")
          .filter(Boolean)
          .map((p) => ((p === "/" ? path === "/" : path.startsWith(p)) ? p.length : -1)),
      );
    const best = Math.max(-1, ...links.map(score));
    links.forEach((el) => {
      const hit = best >= 0 && score(el) === best;
      el.toggleAttribute("data-active", hit);
      if (hit) el.setAttribute("aria-current", "true");
      else el.removeAttribute("aria-current");
    });
    // A new page: lift the suppression unless the pointer is still on the
    // header (then pointerleave lifts it), so the panel does not pop back
    // over the new page under a pointer that just clicked a trigger.
    const header = document.getElementById("site-header");
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (header && !(canHover && header.matches(":hover"))) header.removeAttribute("data-menus-off");
  }, [pathname]);

  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;

    const openGroups = () => header.querySelectorAll<HTMLElement>("[data-menu-group]");
    // Pointer left the header: lift the suppression. A group dismissed with
    // Escape stays closed while it still holds focus (WCAG 1.4.13); moving
    // focus elsewhere (onFocusIn) re-enables it.
    const release = () => {
      header.removeAttribute("data-menus-off");
      const focused = document.activeElement;
      openGroups().forEach((g) => {
        if (!g.contains(focused)) g.removeAttribute("data-closed");
      });
    };

    // Touch: pointerleave fires before click, so a tap would set menus-off
    // after release() already ran and leave the menus locked. Taps are left alone.
    let lastPointer = "mouse";
    const onPointerDown = (e: PointerEvent) => {
      lastPointer = e.pointerType;
    };

    const onClick = (e: MouseEvent) => {
      if (e.detail === 0) return; // keyboard "click" (Enter)
      if (lastPointer !== "mouse") return;
      const link = (e.target as Element).closest("a");
      // A link in a panel, or a dropdown trigger itself: shut the panels.
      if (!link || !link.closest("[data-menu-panel], [data-menu-group]")) return;
      header.setAttribute("data-menus-off", "");
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const group = (document.activeElement as Element | null)?.closest<HTMLElement>("[data-menu-group]") ??
        header.querySelector<HTMLElement>("[data-menu-group]:hover");
      if (!group) return;
      group.setAttribute("data-closed", "");
      group.querySelector<HTMLElement>("[data-nav]")?.focus();
    };

    // Re-open on the next hover or when focus moves to another item.
    const onFocusIn = (e: FocusEvent) => {
      openGroups().forEach((g) => {
        if (!g.contains(e.target as Node)) g.removeAttribute("data-closed");
      });
    };

    header.addEventListener("pointerdown", onPointerDown);
    header.addEventListener("click", onClick);
    header.addEventListener("pointerleave", release);
    header.addEventListener("focusin", onFocusIn);
    document.addEventListener("keydown", onKey);
    return () => {
      header.removeEventListener("pointerdown", onPointerDown);
      header.removeEventListener("click", onClick);
      header.removeEventListener("pointerleave", release);
      header.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
