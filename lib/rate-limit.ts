// Fixed-window rate limiter. Uses Upstash Redis (REST, works from serverless/
// Edge) when UPSTASH_REDIS_REST_URL/TOKEN are set — atomic INCR makes this
// correct across Vercel's multiple concurrent function instances. Falls back
// to a single-instance in-memory Map when those env vars are absent, so the
// app keeps working without the account (just without cross-instance sharing).

import { Redis } from "@upstash/redis";

export type RateLimitResult = { ok: boolean; retryAfterSeconds: number };

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

async function rateLimitRedis(
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const windowSeconds = Math.ceil(windowMs / 1000);
  const redisKey = `ratelimit:${key}`;
  const count = await redis!.incr(redisKey);
  if (count === 1) {
    await redis!.expire(redisKey, windowSeconds);
  }
  if (count <= limit) return { ok: true, retryAfterSeconds: 0 };

  const ttl = await redis!.ttl(redisKey);
  if (ttl < 0) {
    // INCR and EXPIRE are two calls: if the EXPIRE after the first hit failed
    // (timeout, cold start), the key would never expire and the limit — e.g.
    // the global admin-login ceiling — would lock everyone out for good.
    // Re-arm the window here so a lost EXPIRE heals itself.
    await redis!.expire(redisKey, windowSeconds);
    return { ok: false, retryAfterSeconds: windowSeconds };
  }
  return { ok: false, retryAfterSeconds: ttl };
}

// --- In-memory fallback (single instance) ---

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
let lastSweep = 0;

function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

function rateLimitMemory(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= limit) {
    return {
      ok: false,
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return { ok: true, retryAfterSeconds: 0 };
}

export async function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  if (redis) {
    try {
      return await rateLimitRedis(key, limit, windowMs);
    } catch {
      return rateLimitMemory(key, limit, windowMs);
    }
  }
  return rateLimitMemory(key, limit, windowMs);
}
