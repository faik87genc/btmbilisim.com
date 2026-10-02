"use client";

import { useEffect } from "react";
import { site } from "@/lib/site";

// Light anti-copy measures for public pages. Nothing here can stop a
// determined copier (view-source, screenshots, bots) — the goals are to make
// casual theft carry a link back, and to take away the one-click "save image".
//
// - Copying a real passage (not a phone number or a term) from the page gets a
//   "Kaynak: <page URL>" line appended, in both the plain-text and HTML
//   clipboard flavours. Text stays selectable: visitors legitimately quote a
//   clause to their team.
// - Right-click and drag on images is disabled (images only, never text or
//   links). Paired with the CSS in content-guard.css, which also removes the
//   iOS long-press "save image" callout.

// Shorter selections (a phone number, an e-mail, a standard clause number)
// are copied untouched.
const MIN_ATTRIBUTED_CHARS = 90;

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function isEditable(node: Node | null): boolean {
  const el = node instanceof Element ? node : node?.parentElement;
  return !!el?.closest("input, textarea, select, [contenteditable=''], [contenteditable='true']");
}

function onCopy(e: ClipboardEvent) {
  const sel = document.getSelection();
  if (!sel || sel.isCollapsed || !e.clipboardData) return;
  if (isEditable(sel.anchorNode)) return;
  const text = sel.toString();
  if (text.trim().length < MIN_ATTRIBUTED_CHARS) return;

  const url = `${site.baseUrl}${window.location.pathname}`;
  const holder = document.createElement("div");
  for (let i = 0; i < sel.rangeCount; i++) holder.appendChild(sel.getRangeAt(i).cloneContents());

  e.clipboardData.setData("text/plain", `${text}\n\nKaynak: ${url}`);
  e.clipboardData.setData(
    "text/html",
    `${holder.innerHTML}<p>Kaynak: <a href="${escapeHtml(url)}">${escapeHtml(url)}</a></p>`,
  );
  e.preventDefault();
}

function isImage(target: EventTarget | null): boolean {
  return target instanceof HTMLImageElement || (target instanceof Element && !!target.closest("picture"));
}

function blockOnImage(e: Event) {
  if (isImage(e.target)) e.preventDefault();
}

export function ContentGuard() {
  useEffect(() => {
    document.addEventListener("copy", onCopy);
    document.addEventListener("contextmenu", blockOnImage);
    document.addEventListener("dragstart", blockOnImage);
    return () => {
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("contextmenu", blockOnImage);
      document.removeEventListener("dragstart", blockOnImage);
    };
  }, []);
  return null;
}
