import "server-only";
import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { GoogleGenAI } from "@google/genai";

/**
 * Pluggable structured-output text providers for the blog article generator.
 * Claude is the primary engine; Gemini (free tier), OpenAI and DeepSeek are
 * drop-in alternatives so drafting keeps working when the Anthropic account has
 * no credit. Pick one with `BLOG_AI_PROVIDER`; otherwise the first provider
 * with an API key wins, in the PRIORITY order below.
 */
export type ProviderId = "anthropic" | "google" | "openai" | "deepseek";

const PRIORITY: ProviderId[] = ["anthropic", "google", "deepseek", "openai"];

const DEFAULT_MODEL: Record<ProviderId, string> = {
  anthropic: "claude-opus-5",
  google: "gemini-3.6-flash",
  openai: "gpt-4.1",
  deepseek: "deepseek-chat",
};

const LABEL: Record<ProviderId, string> = {
  anthropic: "Claude",
  google: "Gemini",
  openai: "ChatGPT",
  deepseek: "DeepSeek",
};

// DeepSeek caps completion length hard; a very long article may get clipped.
const DEEPSEEK_MAX_OUTPUT = 8000;

export type StructuredOptions<T> = {
  system: string;
  user: string;
  schema: z.ZodType<T>;
  /** Model-visible name for the JSON schema (OpenAI strict mode needs one). */
  schemaName: string;
  maxTokens: number;
};

export type ActiveProvider = {
  id: ProviderId;
  model: string;
  /** e.g. "Gemini (gemini-2.5-flash)" — for logs and the editor badge. */
  label: string;
  generate<T>(opts: StructuredOptions<T>): Promise<T>;
};

function keyFor(id: ProviderId): string | undefined {
  switch (id) {
    case "anthropic":
      return process.env.ANTHROPIC_API_KEY || undefined;
    case "google":
      return (
        process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || undefined
      );
    case "openai":
      return process.env.OPENAI_API_KEY || undefined;
    case "deepseek":
      return process.env.DEEPSEEK_API_KEY || undefined;
  }
}

/** True when at least one provider has an API key configured. */
export function aiProviderAvailable(): boolean {
  return PRIORITY.some((id) => keyFor(id));
}

/** The provider that will run, honouring BLOG_AI_PROVIDER then key priority. */
export function resolveProviderId(): ProviderId | null {
  const forced = (process.env.BLOG_AI_PROVIDER || "")
    .trim()
    .toLowerCase() as ProviderId;
  if (PRIORITY.includes(forced) && keyFor(forced)) return forced;
  return PRIORITY.find((id) => keyFor(id)) ?? null;
}

function modelFor(id: ProviderId): string {
  return (process.env.BLOG_AI_MODEL || "").trim() || DEFAULT_MODEL[id];
}

/** Gemini's responseJsonSchema rejects the $schema meta-key; drop it. */
function forGemini(schema: Record<string, unknown>): Record<string, unknown> {
  const { $schema: _drop, ...rest } = schema;
  void _drop;
  return rest;
}

function jsonSchemaText<T>(schema: z.ZodType<T>): string {
  return JSON.stringify(z.toJSONSchema(schema, { target: "draft-2020-12" }));
}

function firstJsonObject(text: string): unknown {
  const trimmed = text.trim().replace(/^```(?:json)?\s*|\s*```$/g, "");
  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start !== -1 && end > start) {
      return JSON.parse(trimmed.slice(start, end + 1));
    }
    throw new Error("Model geçerli JSON döndürmedi.");
  }
}

// --- provider implementations ---------------------------------------------

function anthropicProvider(model: string): ActiveProvider {
  const client = new Anthropic({
    baseURL: process.env.ANTHROPIC_BASE_URL || undefined,
  });
  const effort = (process.env.BLOG_AI_EFFORT || "high") as
    | "low"
    | "medium"
    | "high"
    | "xhigh"
    | "max";
  return {
    id: "anthropic",
    model,
    label: `Claude (${model})`,
    async generate<T>(opts: StructuredOptions<T>): Promise<T> {
      // Streaming so a long, high-effort draft doesn't trip the SDK's
      // 10-minute non-streaming ceiling and the connection stays alive on
      // serverless hosts.
      const stream = client.messages.stream({
        model,
        max_tokens: opts.maxTokens,
        system: opts.system,
        output_config: {
          effort,
          format: zodOutputFormat(opts.schema),
        },
        messages: [{ role: "user", content: opts.user }],
      });
      const res = await stream.finalMessage();
      if (res.stop_reason === "refusal") {
        throw new Error(
          "Model bu isteği reddetti. Konuyu/anahtar kelimeyi değiştir.",
        );
      }
      if (!res.parsed_output) {
        throw new Error("Model geçerli bir taslak döndürmedi. Tekrar dene.");
      }
      return res.parsed_output as T;
    },
  };
}

function openaiCompatibleProvider(
  id: "openai" | "deepseek",
  model: string,
): ActiveProvider {
  const isDeepseek = id === "deepseek";
  const client = new OpenAI({
    apiKey: keyFor(id),
    baseURL: isDeepseek ? "https://api.deepseek.com" : undefined,
  });
  return {
    id,
    model,
    label: `${LABEL[id]} (${model})`,
    async generate<T>(opts: StructuredOptions<T>): Promise<T> {
      if (isDeepseek) {
        // DeepSeek only supports plain JSON mode — describe the schema inline
        // and validate the returned object ourselves.
        const completion = await client.chat.completions.create({
          model,
          max_tokens: Math.min(opts.maxTokens, DEEPSEEK_MAX_OUTPUT),
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: `${opts.system}\n\nÇıktını SADECE aşağıdaki JSON şemasına uyan tek bir JSON nesnesi olarak ver:\n${jsonSchemaText(opts.schema)}`,
            },
            { role: "user", content: `${opts.user}\n\nYalnızca geçerli JSON döndür.` },
          ],
        });
        const text = completion.choices[0]?.message?.content ?? "";
        return opts.schema.parse(firstJsonObject(text));
      }

      const completion = await client.chat.completions.parse({
        model,
        max_completion_tokens: opts.maxTokens,
        messages: [
          { role: "system", content: opts.system },
          { role: "user", content: opts.user },
        ],
        response_format: zodResponseFormat(opts.schema, opts.schemaName),
      });
      const msg = completion.choices[0]?.message;
      if (msg?.refusal) throw new Error(`Model reddetti: ${msg.refusal}`);
      if (!msg?.parsed) {
        throw new Error("Model geçerli bir taslak döndürmedi. Tekrar dene.");
      }
      return msg.parsed as T;
    },
  };
}

// Gemini flash models hit "high demand" 503s often, one model at a time — the
// others usually answer fine. Try the configured model first, then these.
// 3.8-flash and flash-latest have been seen hanging silently, so they go last.
const GEMINI_FALLBACK_MODELS = [
  "gemini-3.7-flash",
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3-flash-preview",
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-3.8-flash",
  "gemini-flash-latest",
];

// A model that sends nothing for this long is stuck — abort and try the next
// one instead of burning the whole serverless time budget on it.
const GEMINI_STALL_MS = 40_000;

/** Overloaded, rate-limited, out of (per-model) free quota or retired —
 *  worth trying another Gemini model. Free-tier quotas are counted per model. */
function isGeminiModelUnavailable(err: unknown): boolean {
  const status = (err as { status?: number })?.status;
  const msg = (err instanceof Error ? err.message : String(err)).toLowerCase();
  if (/api key|permission|unauthenticated/.test(msg)) return false;
  return (
    status === 503 || status === 500 || status === 504 || status === 404 || status === 429 ||
    /unavailable|overload|high demand|not found|no longer available|quota|resource_exhausted|zaman aşımı|abort|\b503\b|\b404\b|\b429\b/.test(msg)
  );
}

function googleProvider(model: string): ActiveProvider {
  const client = new GoogleGenAI({ apiKey: keyFor("google") });
  const models = [model, ...GEMINI_FALLBACK_MODELS.filter((m) => m !== model)];

  async function once<T>(m: string, opts: StructuredOptions<T>): Promise<T> {
    // Streamed so a silent/stuck model can be detected: the stall timer is
    // reset on every chunk and aborts only when nothing arrives for a while.
    const ctrl = new AbortController();
    let timer = setTimeout(() => ctrl.abort(), GEMINI_STALL_MS);
    let text = "";
    let reason = "";
    try {
      const stream = await client.models.generateContentStream({
        model: m,
        contents: opts.user,
        config: {
          systemInstruction: opts.system,
          responseMimeType: "application/json",
          responseJsonSchema: forGemini(
            z.toJSONSchema(opts.schema, { target: "draft-2020-12" }) as Record<
              string,
              unknown
            >,
          ),
          maxOutputTokens: opts.maxTokens,
          temperature: 0.7,
          abortSignal: ctrl.signal,
        },
      });
      for await (const chunk of stream) {
        clearTimeout(timer);
        timer = setTimeout(() => ctrl.abort(), GEMINI_STALL_MS);
        text += chunk.text ?? "";
        reason =
          chunk.candidates?.[0]?.finishReason ||
          chunk.promptFeedback?.blockReason ||
          reason;
      }
    } catch (e) {
      if (ctrl.signal.aborted) {
        throw Object.assign(
          new Error(`Gemini ${m} yanıt vermedi (zaman aşımı).`),
          { status: 504 },
        );
      }
      throw e;
    } finally {
      clearTimeout(timer);
    }
    if (!text) {
      throw new Error(`Gemini taslak döndürmedi (${reason || "boş yanıt"}).`);
    }
    return opts.schema.parse(firstJsonObject(text));
  }

  const provider: ActiveProvider = {
    id: "google",
    model,
    label: `Gemini (${model})`,
    async generate<T>(opts: StructuredOptions<T>): Promise<T> {
      let lastErr: unknown;
      for (const m of models) {
        try {
          const result = await once(m, opts);
          // Report the model that actually answered.
          provider.model = m;
          provider.label = `Gemini (${m})`;
          return result;
        } catch (e) {
          lastErr = e;
          if (!isGeminiModelUnavailable(e)) throw e;
        }
      }
      throw lastErr;
    },
  };
  return provider;
}

// --- transient-error retry -----------------------------------------------

const RETRY_DELAYS_MS = [2000, 5000, 12000];

/** True for temporary conditions (overload, rate limit, network) — NOT for
 *  quota/credit exhaustion, auth or bad-request errors. */
function isTransient(err: unknown): boolean {
  const status = (err as { status?: number })?.status;
  const msg = (err instanceof Error ? err.message : String(err)).toLowerCase();
  if (/quota|credit|insufficient|billing|api key|invalid|not found|refus/i.test(msg)) {
    return false;
  }
  if (status === 503 || status === 502 || status === 500 || status === 529) {
    return true;
  }
  if (status === 429 && /rate|overload|capacity|high demand|unavailable/.test(msg)) {
    return true;
  }
  return /overload|unavailable|high demand|temporarily|timeout|etimedout|econnreset|socket hang up|fetch failed/.test(
    msg,
  );
}

function withRetry(provider: ActiveProvider): ActiveProvider {
  const wrapped: ActiveProvider = {
    ...provider,
    async generate<T>(opts: StructuredOptions<T>): Promise<T> {
      let lastErr: unknown;
      for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt++) {
        try {
          const result = await provider.generate(opts);
          // The inner provider may have switched model (Gemini fallback).
          wrapped.model = provider.model;
          wrapped.label = provider.label;
          return result;
        } catch (err) {
          lastErr = err;
          if (attempt === RETRY_DELAYS_MS.length || !isTransient(err)) break;
          await new Promise((r) => setTimeout(r, RETRY_DELAYS_MS[attempt]));
        }
      }
      throw lastErr;
    },
  };
  return wrapped;
}

function buildProvider(id: ProviderId): ActiveProvider {
  const model = modelFor(id);
  switch (id) {
    case "anthropic":
      return withRetry(anthropicProvider(model));
    case "google":
      // Its own model-by-model fallback already rides out overload; retrying
      // the whole cascade would overrun the 300 s serverless budget.
      return googleProvider(model);
    case "openai":
    case "deepseek":
      return withRetry(openaiCompatibleProvider(id, model));
  }
}

/** Build the active (forced/first-configured) provider, or null when no API key is set. */
export function buildActiveProvider(): ActiveProvider | null {
  const id = resolveProviderId();
  return id ? buildProvider(id) : null;
}

/**
 * Every provider with a key configured, forced/resolved one first — the
 * order `generateWithFallback` tries them in.
 */
function availableProviderIds(): ProviderId[] {
  const first = resolveProviderId();
  const rest = PRIORITY.filter((id) => id !== first && keyFor(id));
  return first ? [first, ...rest] : rest;
}

/**
 * A quota/credit/billing wall worth retrying on the NEXT provider — as
 * opposed to a real bug (bad schema, network failure, auth typo) that would
 * just fail identically everywhere and should surface immediately. Mirrors
 * what `isTransient` above already excludes from same-provider retry, plus
 * the odd corners each vendor phrases it in (DeepSeek's 402, Gemini's
 * RESOURCE_EXHAUSTED).
 */
/**
 * Provider SDK errors are shown to the admin verbatim (quota, bad key…). Some
 * SDKs echo part of the key or a request URL with `key=` in the message; mask
 * anything key-shaped before it reaches the browser or a log line.
 */
export function redactSecrets(message: string): string {
  return message
    .replace(/\b(sk|rk|pk)-[A-Za-z0-9_*-]{8,}/g, "$1-***")
    .replace(/\bAIza[0-9A-Za-z_-]{20,}/g, "AIza***")
    .replace(/\b(?:vercel_blob_rw|npg|xox[abp])_[A-Za-z0-9_-]{8,}/gi, "***")
    .replace(/([?&](?:key|api_key|apikey|token|access_token)=)[^&\s"')]+/gi, "$1***")
    .replace(/(Bearer\s+)[A-Za-z0-9._~+/=-]{8,}/gi, "$1***")
    .replace(/(postgres(?:ql)?:\/\/[^:\s/]+:)[^@\s]+@/gi, "$1***@");
}

export function isRetryableProviderError(err: unknown): boolean {
  const msg = (err instanceof Error ? err.message : String(err)).toLowerCase();
  return /quota|credit|insufficient|billing|resource_exhausted|\b429\b|\b402\b/.test(msg);
}

/**
 * Run a structured generation, cascading through every configured provider
 * (priority order, forced one first) whenever one fails for any reason —
 * mirrors the image pipeline's provider fallback (`generateImage.ts`) so one
 * exhausted account doesn't block writing when another key is available.
 */
export async function generateWithFallback<T>(
  opts: StructuredOptions<T>,
): Promise<{ result: T; providerLabel: string }> {
  const ids = availableProviderIds();
  if (ids.length === 0) {
    throw new Error(
      "AI yazım için hiçbir sağlayıcı anahtarı tanımlı değil (ANTHROPIC_API_KEY / GEMINI_API_KEY / OPENAI_API_KEY / DEEPSEEK_API_KEY).",
    );
  }
  // Any failure moves on to the next provider: a credit/quota wall, a bad or
  // revoked key, a retired model, a malformed reply — all are specific to one
  // vendor, and the next one may well succeed.
  const failures: { label: string; err: unknown }[] = [];
  for (const id of ids) {
    const provider = buildProvider(id);
    try {
      const result = await provider.generate(opts);
      return { result, providerLabel: provider.label };
    } catch (e) {
      failures.push({ label: LABEL[id], err: e });
    }
  }
  const lastErr = failures[failures.length - 1]?.err;
  const tried = failures.map((f) => f.label).join(", ");
  const allCredit = failures.every((f) => isRetryableProviderError(f.err));
  const missing = PRIORITY.filter((id) => !keyFor(id)).map((id) => LABEL[id]);
  const hint = missing.length
    ? ` Yedek olarak ${missing.join(", ")} anahtarlarından birini Vercel'e ekleyin${allCredit ? " ya da hesaba kredi yükleyin" : ""}.`
    : allCredit
      ? " Hesaplardan birine kredi yükleyin."
      : "";
  if (allCredit) {
    throw new Error(
      `AI yazım sağlayıcılarının kredisi/kotası bitti (${tried}).${hint}`,
      { cause: lastErr },
    );
  }
  const detail = failures
    .map((f) => `${f.label}: ${f.err instanceof Error ? f.err.message : String(f.err)}`)
    .join(" | ");
  throw new Error(`Hiçbir AI sağlayıcısı yanıt veremedi.${hint} (${detail})`, {
    cause: lastErr,
  });
}
