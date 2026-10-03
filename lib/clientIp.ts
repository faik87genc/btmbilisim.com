// Client IP for rate limiting. The left-most X-Forwarded-For entry is whatever
// the client sent and can be spoofed to get a fresh rate-limit bucket per
// request, so it is never used. Order of trust:
//   1. x-real-ip — set (overwritten) by Vercel and by typical nginx setups;
//   2. the RIGHT-most X-Forwarded-For entry — the address the closest proxy
//      actually saw;
//   3. "unknown" (all such requests share one bucket).

export function clientIpFrom(h: Headers): string {
  const real = h.get("x-real-ip")?.trim();
  if (real) return real;
  const xff = h.get("x-forwarded-for");
  if (xff) {
    const last = xff.split(",").map((s) => s.trim()).filter(Boolean).pop();
    if (last) return last;
  }
  return "unknown";
}
