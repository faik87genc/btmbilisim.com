import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { clientIpFrom } from "@/lib/clientIp";
import { site } from "@/lib/site";
import quoteForm from "@/lib/data/quote-form.json";

// nodemailer needs the Node.js runtime (not Edge).
export const runtime = "nodejs";

// Same list as the <select> in components/ContactForm.tsx (lib/data/quote-form.json),
// plus QUOTE_TOPIC sent by components/QuoteForm.tsx.
const QUOTE_TOPIC = "Teklif Talebi";
const allowedTopics = [...quoteForm.topics, QUOTE_TOPIC];

// Single-line fields: fold CR/LF and other control characters into a space.
// Nothing here reaches a mail header (topic is whitelisted, Reply-To is a
// validated address), but the plain-text body should not carry forged
// "header-looking" lines or terminal escape sequences either.
const CONTROL_CHARS = /[\u0000-\u001F\u007F-\u009F\p{Zl}\p{Zp}]+/gu;
// Multi-line message: keep newline and tab, drop the other control characters.
const CONTROL_CHARS_MULTILINE = /[\u0000-\u0008\u000B-\u001F\u007F-\u009F]+/g;

const line = (max: number) =>
  z
    .string()
    .max(max * 2)
    .transform((v) => v.replace(CONTROL_CHARS, " ").trim())
    .pipe(z.string().max(max));

const short = line(80).optional();

const schema = z
  .object({
    name: line(100).pipe(z.string().min(2)),
    company: line(120).optional(),
    email: z.string().trim().email().max(200),
    phone: line(40).optional(),
    topic: z.string().refine((v) => allowedTopics.includes(v), "invalid-topic"),
    message: z
      .string()
      .max(8000)
      .transform((v) => v.replace(/\r\n?/g, "\n").replace(CONTROL_CHARS_MULTILINE, "").trim())
      .pipe(z.string().max(4000))
      .optional()
      .default(""),
    // Quote form only (lib/data/quote-form.json options).
    employees: short,
    locations: short,
    target: short,
    services: z.array(line(80)).max(10).optional(),
    // Honeypot — real users never see or fill this field. Accept any value here
    // so bots get a normal-looking 200 instead of a tell-tale validation error.
    website: z.string().max(200).optional(),
  })
  // A quote request carries its scope in the fields above; a plain contact
  // message must still say something.
  .refine((d) => d.topic === QUOTE_TOPIC || d.message.length >= 10, { path: ["message"] });

// The largest legitimate payload is ~5 KB (4000-char message + short fields).
const MAX_BODY_BYTES = 16 * 1024;

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
// Site-wide ceiling: rotating IPs must not turn the form into a mail cannon
// against CONTACT_TO_EMAIL (and the SMTP account's sending reputation).
const GLOBAL_RATE_LIMIT = 60;

function clientIp(request: Request): string {
  return clientIpFrom(request.headers);
}

function getTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT) || 587;
  return nodemailer.createTransport({
    host,
    port,
    // 465 = implicit TLS; 587/25 = STARTTLS upgrade.
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function POST(request: Request) {
  // Both forms post JSON with fetch() from this origin. Requiring the JSON
  // content type means another site cannot submit without a CORS preflight
  // (which is never answered), and Sec-Fetch-Site rejects cross-site requests
  // outright in browsers that send it.
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ error: "unsupported-media-type" }, { status: 415 });
  }
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "payload-too-large" }, { status: 413 });
  }

  const ip = clientIp(request);
  const perIp = await rateLimit(`contact:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);
  const limited = perIp.ok
    ? await rateLimit("contact:global", GLOBAL_RATE_LIMIT, RATE_WINDOW_MS)
    : perIp;
  if (!limited.ok) {
    return NextResponse.json(
      { error: "rate-limited" },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } },
    );
  }

  // Content-Length can be missing (chunked) or wrong, so cap the real size too.
  const raw = await request.text().catch(() => "");
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "payload-too-large" }, { status: 413 });
  }
  let body: unknown = null;
  try {
    body = JSON.parse(raw);
  } catch {
    body = null;
  }
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "invalid-input" }, { status: 400 });
  }

  // Bot filled the honeypot: accept silently, send nothing.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const transport = getTransport();
  const to = process.env.CONTACT_TO_EMAIL;
  // Most SMTP providers only accept a `from` that matches the authenticated
  // mailbox or an address it may "send as" — default to the SMTP user. The
  // visitor's address goes into Reply-To instead.
  const from = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;
  const bcc = process.env.CONTACT_BCC_EMAIL?.split(",")
    .map((addr) => addr.trim())
    .filter(Boolean);

  if (!transport || !to || !from) {
    console.error(
      "SMTP (SMTP_HOST/SMTP_USER/SMTP_PASSWORD) or CONTACT_TO_EMAIL is not configured.",
    );
    return NextResponse.json({ error: "email-not-configured" }, { status: 500 });
  }

  const { name, company, email, phone, topic, message, employees, locations, target, services } = parsed.data;
  const quoteLines =
    topic === QUOTE_TOPIC
      ? [
          `Çalışan sayısı: ${employees || "-"}`,
          `Lokasyon sayısı: ${locations || "-"}`,
          `Hedef tarih: ${target || "-"}`,
          `Hizmetler: ${services?.length ? services.join(", ") : "-"}`,
        ]
      : [];

  try {
    await transport.sendMail({
      from: `${site.name} Web Sitesi <${from}>`,
      to,
      ...(bcc && bcc.length > 0 ? { bcc } : {}),
      replyTo: email,
      subject: `Yeni iletişim talebi — ${topic}`.replace(/[\r\n]+/g, " "),
      text: [
        `Ad Soyad: ${name}`,
        `Şirket: ${company || "-"}`,
        `E-posta: ${email}`,
        `Telefon: ${phone || "-"}`,
        `Konu: ${topic}`,
        ...quoteLines,
        "",
        "Mesaj:",
        message || "-",
      ].join("\n"),
    });
  } catch (err) {
    // Log only the error class and SMTP codes: the full object can include the
    // server's response text and connection details. Nothing goes to the client.
    const e = err as { name?: string; code?: string; responseCode?: number };
    console.error("SMTP gönderim hatası:", e?.name, e?.code ?? "", e?.responseCode ?? "");
    return NextResponse.json({ error: "send-failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
