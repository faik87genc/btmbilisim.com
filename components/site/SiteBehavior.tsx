"use client";

import { useEffect } from "react";

// Page-wide behaviour that isn't tied to one component: the cookie banner and
// the GA4 consent gate (markup: components/ensa/CookieBanner.tsx; footer
// "Çerez Tercihleri" button #cookie-prefs), plus one-open-at-a-time FAQ groups.
// Navigation menus have their own components (Header/NavActive/MobileMenu).

const CONSENT_KEY = "cookie-consent";
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "";

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
  useEffect(() => {
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
    // 2.4.11) and the floating buttons sit above it.
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

    document.addEventListener("toggle", onToggle, true);
    window.addEventListener("resize", reserveBanner);

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
      document.removeEventListener("toggle", onToggle, true);
      window.removeEventListener("resize", reserveBanner);
      accept?.removeEventListener("click", onAccept);
      reject?.removeEventListener("click", onReject);
      prefs?.removeEventListener("click", onPrefs);
    };
  }, []);

  return null;
}
