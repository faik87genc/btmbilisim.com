"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Port of _legacy-static-site/assets/js/main.js: mobile menu, tap-to-open
// dropdowns, one-open-at-a-time FAQ groups and the cookie banner / GA4 gate.
// Uses document-level delegation so it keeps working across client-side
// navigations (main.js only ever saw one page load).

const MOBILE_MAX = 1080;
const CONSENT_KEY = "cookie-consent";
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "";
// Page regions made inert while the mobile menu panel is open, so focus and
// the screen reader's virtual cursor stay inside the menu.
const INERT_WHEN_MENU_OPEN = "main, .breadcrumbs, .site-footer, .float-wa, #cookie-banner";

function isMobile() {
  return window.innerWidth <= MOBILE_MAX;
}

function navParts() {
  const nav = document.querySelector<HTMLElement>(".main-nav");
  const toggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
  const links = nav ? Array.from(nav.querySelectorAll<HTMLAnchorElement>("a")) : [];
  return { nav, toggle, links };
}

/** Parent links whose first tap (mobile) opens a submenu. */
function parentLinks(): HTMLAnchorElement[] {
  return Array.from(document.querySelectorAll<HTMLAnchorElement>(".main-nav li > a")).filter(
    (a) => a.parentElement?.querySelector(":scope > .dropdown"),
  );
}

/**
 * Keeps menu state in the DOM: tabindex for hidden mobile links, aria-expanded
 * on submenu parents (mobile only — on desktop the dropdown opens on hover /
 * focus and the links navigate), and `inert` on the page behind an open panel.
 */
function syncMenu() {
  const { nav, links } = navParts();
  if (!nav) return;
  const mobile = isMobile();
  const open = nav.classList.contains("is-open");
  links.forEach((a) => (mobile && !open ? a.setAttribute("tabindex", "-1") : a.removeAttribute("tabindex")));
  parentLinks().forEach((a) => {
    if (mobile) a.setAttribute("aria-expanded", a.parentElement?.classList.contains("open") ? "true" : "false");
    else a.removeAttribute("aria-expanded");
  });
  const inert = mobile && open;
  document.querySelectorAll(INERT_WHEN_MENU_OPEN).forEach((el) => el.toggleAttribute("inert", inert));
}

function closeMenu() {
  const { nav, toggle } = navParts();
  nav?.classList.remove("is-open");
  toggle?.setAttribute("aria-expanded", "false");
  document.querySelectorAll(".main-nav li.open").forEach((li) => li.classList.remove("open"));
  syncMenu();
}

function loadAnalytics() {
  const w = window as unknown as { __gaLoaded?: boolean; dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
  if (!GA4_ID || w.__gaLoaded) return;
  w.__gaLoaded = true;
  const s = document.createElement("script");
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`;
  s.async = true;
  document.head.appendChild(s);
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", GA4_ID, { anonymize_ip: true });
}

export function SiteBehavior() {
  const pathname = usePathname();

  // Close the mobile menu after every navigation.
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element;
      const { nav, toggle, links } = navParts();
      if (!nav || !toggle) return;

      if (toggle.contains(target)) {
        const open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        if (!open) document.querySelectorAll(".main-nav li.open").forEach((li) => li.classList.remove("open"));
        syncMenu();
        if (open) links[0]?.focus();
        return;
      }

      // Mobile: first tap on a parent item opens its submenu instead of navigating.
      const link = target.closest(".main-nav li > a");
      const li = link?.parentElement;
      if (li && isMobile() && li.querySelector(":scope > .dropdown") && !li.classList.contains("open")) {
        e.preventDefault();
        li.parentElement?.querySelectorAll(":scope > li.open").forEach((o) => {
          o.classList.remove("open");
          o.querySelectorAll("li.open").forEach((d) => d.classList.remove("open"));
        });
        li.classList.add("open");
        syncMenu();
        return;
      }

      if (nav.classList.contains("is-open") && !nav.contains(target)) closeMenu();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const { nav, toggle } = navParts();
      if (nav?.classList.contains("is-open")) {
        closeMenu();
        toggle?.focus();
        return;
      }
      // Desktop: Escape hides a hover/focus dropdown (WCAG 1.4.13) until the
      // pointer or focus leaves that menu item.
      if (isMobile()) return;
      const active = document.activeElement as HTMLElement | null;
      const hovered = document.querySelector(".main-nav > ul > li:hover");
      const li = active?.closest(".main-nav > ul > li") ?? hovered;
      if (!li || !li.querySelector(":scope > .dropdown")) return;
      li.classList.add("dd-closed");
      if (li.contains(active)) li.querySelector<HTMLElement>(":scope > a")?.focus();
      const reopen = (ev: Event) => {
        if (ev.type === "focusout" && li.contains((ev as FocusEvent).relatedTarget as Node | null)) return;
        li.classList.remove("dd-closed");
        li.removeEventListener("focusout", reopen);
        li.removeEventListener("mouseleave", reopen);
      };
      li.addEventListener("focusout", reopen);
      li.addEventListener("mouseleave", reopen);
    };

    // FAQ groups: opening one item closes its siblings. `toggle` does not
    // bubble, so listen in the capture phase.
    const onToggle = (e: Event) => {
      const item = e.target as HTMLDetailsElement;
      if (item.tagName !== "DETAILS" || !item.open) return;
      const group = item.closest(".faq");
      group?.querySelectorAll("details").forEach((other) => {
        if (other !== item) other.open = false;
      });
    };

    // Cookie banner. While it is on screen, reserve its height at the bottom
    // of the viewport so focused elements are not hidden behind it (WCAG
    // 2.4.11) and the floating WhatsApp button sits above it.
    const banner = document.getElementById("cookie-banner");
    const root = document.documentElement;
    const reserveBanner = () => {
      if (!banner || banner.hidden) {
        root.style.scrollPaddingBottom = "";
        root.style.removeProperty("--cb-h");
        return;
      }
      root.style.scrollPaddingBottom = `${banner.offsetHeight + 16}px`;
      root.style.setProperty("--cb-h", `${banner.offsetHeight}px`);
    };
    const onResize = () => {
      syncMenu();
      reserveBanner();
    };

    syncMenu();
    // Capture phase: must run before next/link's own click handler, so the
    // preventDefault() on a first mobile tap actually stops the navigation.
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKey);
    document.addEventListener("toggle", onToggle, true);
    window.addEventListener("resize", onResize);

    let stored: string | null = null;
    try {
      stored = localStorage.getItem(CONSENT_KEY);
    } catch {}
    const choose = (value: "accepted" | "rejected") => () => {
      const wasAccepted = stored === "accepted";
      stored = value;
      try {
        localStorage.setItem(CONSENT_KEY, value);
      } catch {}
      if (banner) banner.hidden = true;
      reserveBanner();
      if (value === "accepted") loadAnalytics();
      // Withdrawn consent: GA is already running in this page, reload without it.
      else if (wasAccepted) window.location.reload();
    };
    const accept = document.getElementById("cookie-accept");
    const reject = document.getElementById("cookie-reject");
    const prefs = document.getElementById("cookie-prefs");
    const onAccept = choose("accepted");
    const onReject = choose("rejected");
    // Footer "Çerez Tercihleri": show the banner again so the choice can be changed.
    const onPrefs = () => {
      if (!banner) return;
      banner.hidden = false;
      reserveBanner();
      (stored === "accepted" ? reject : accept)?.focus();
    };
    accept?.addEventListener("click", onAccept);
    reject?.addEventListener("click", onReject);
    prefs?.addEventListener("click", onPrefs);
    if (banner && !stored) {
      banner.hidden = false;
      reserveBanner();
    } else if (stored === "accepted") loadAnalytics();

    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("toggle", onToggle, true);
      window.removeEventListener("resize", onResize);
      accept?.removeEventListener("click", onAccept);
      reject?.removeEventListener("click", onReject);
      prefs?.removeEventListener("click", onPrefs);
    };
  }, []);

  return null;
}
