import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

// Collects Content-Security-Policy(-Report-Only) violation reports so the
// report-only policy in next.config.ts can be checked in the Vercel logs before
// it is promoted to the enforcing header. Accepts both the legacy `report-uri`
// format (application/csp-report) and the Reporting API (application/reports+json).
// It stores nothing: one condensed log line per violation, then 204.

const MAX_BODY_BYTES = 16 * 1024;
const MAX_REPORTS_PER_REQUEST = 10;

type Violation = {
  directive?: string;
  blocked?: string;
  page?: string;
  source?: string;
  line?: number;
};

function clip(value: unknown, max = 200): string | undefined {
  if (typeof value !== "string" || !value) return undefined;
  // Drop the query string/fragment (may carry personal data) and control chars.
  const clean = value.split(/[?#]/)[0].replace(/[\u0000-\u001F\u007F]/g, "");
  return clean.slice(0, max);
}

function fromLegacy(r: Record<string, unknown>): Violation {
  return {
    directive: clip(r["effective-directive"] ?? r["violated-directive"], 60),
    blocked: clip(r["blocked-uri"]),
    page: clip(r["document-uri"]),
    source: clip(r["source-file"]),
    line: typeof r["line-number"] === "number" ? r["line-number"] : undefined,
  };
}

function fromReportingApi(r: Record<string, unknown>): Violation {
  return {
    directive: clip(r.effectiveDirective, 60),
    blocked: clip(r.blockedURL),
    page: clip(r.documentURL),
    source: clip(r.sourceFile),
    line: typeof r.lineNumber === "number" ? r.lineNumber : undefined,
  };
}

function extract(payload: unknown): Violation[] {
  if (Array.isArray(payload)) {
    return payload
      .filter((r) => r && typeof r === "object" && (r as { type?: string }).type === "csp-violation")
      .slice(0, MAX_REPORTS_PER_REQUEST)
      .map((r) => fromReportingApi(((r as { body?: unknown }).body ?? {}) as Record<string, unknown>));
  }
  if (payload && typeof payload === "object" && "csp-report" in payload) {
    const r = (payload as { "csp-report": unknown })["csp-report"];
    if (r && typeof r === "object") return [fromLegacy(r as Record<string, unknown>)];
  }
  return [];
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(request: Request) {
  const noContent = new NextResponse(null, { status: 204 });

  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) return noContent;

  // A single page load can produce a burst of reports; cap log volume per IP.
  const limited = await rateLimit(`csp-report:${clientIp(request)}`, 30, 10 * 60 * 1000);
  if (!limited.ok) return noContent;

  const raw = await request.text().catch(() => "");
  if (!raw || raw.length > MAX_BODY_BYTES) return noContent;

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return noContent;
  }

  for (const v of extract(payload)) {
    console.warn("[csp-report]", JSON.stringify(v));
  }
  return noContent;
}
