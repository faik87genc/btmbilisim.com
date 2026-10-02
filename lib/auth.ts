import { randomBytes, scryptSync, timingSafeEqual, createHmac } from "crypto";
import { site } from "@/lib/site";

const SESSION_COOKIE = site.adminCookie;
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours
export const SESSION_MAX_AGE_SECONDS = SESSION_TTL_MS / 1000;

// `salt:hash` exactly as scripts/hash-password.mjs prints it: a 16-byte salt
// and a 64-byte scrypt output, both hex.
const PASSWORD_HASH_RE = /^[0-9a-f]{32}:[0-9a-f]{128}$/i;

/** Minimum SESSION_SECRET length — anything shorter is brute-forceable offline. */
export const MIN_SESSION_SECRET_LENGTH = 32;

// Upper bound on what we feed scrypt, so a megabyte-long "password" can't be
// used to burn CPU on the login endpoint.
const MAX_PASSWORD_LENGTH = 256;

// Bump SESSION_VERSION (env var) to invalidate every existing session at once —
// e.g. after a suspected leak or a password change. Tokens without a matching
// `ver` claim (including all tokens issued before this field existed) are
// rejected, forcing a fresh login.
function sessionVersion(): string {
  return process.env.SESSION_VERSION || "1";
}

function sessionSecret(): string | null {
  const secret = process.env.SESSION_SECRET?.trim();
  return secret && secret.length >= MIN_SESSION_SECRET_LENGTH ? secret : null;
}

export function isValidPasswordHash(storedHash: string | undefined): boolean {
  return !!storedHash && PASSWORD_HASH_RE.test(storedHash.trim());
}

/**
 * Which admin-auth env vars are missing or malformed. Empty array = login can
 * work. Only variable names and the nature of the problem are returned —
 * never any value.
 */
export function authConfigProblems(): string[] {
  const problems: string[] = [];
  if (!isValidPasswordHash(process.env.ADMIN_PASSWORD_HASH)) {
    problems.push(
      process.env.ADMIN_PASSWORD_HASH
        ? "ADMIN_PASSWORD_HASH biçimi hatalı (npm run hash-password çıktısını olduğu gibi yapıştırın)"
        : "ADMIN_PASSWORD_HASH tanımlı değil",
    );
  }
  if (!sessionSecret()) {
    problems.push(
      process.env.SESSION_SECRET
        ? `SESSION_SECRET çok kısa (en az ${MIN_SESSION_SECRET_LENGTH} karakter olmalı)`
        : "SESSION_SECRET tanımlı değil",
    );
  }
  return problems;
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  if (!isValidPasswordHash(storedHash)) return false;
  if (!password || password.length > MAX_PASSWORD_LENGTH) return false;
  const [salt, hash] = storedHash.trim().split(":");
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  if (candidate.length !== expected.length) return false;
  return timingSafeEqual(candidate, expected);
}

function sign(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export function createSessionToken(): string {
  const secret = sessionSecret();
  if (!secret) {
    throw new Error(
      `SESSION_SECRET is not set or shorter than ${MIN_SESSION_SECRET_LENGTH} characters.`,
    );
  }
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + SESSION_TTL_MS, ver: sessionVersion() }),
  ).toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  const secret = sessionSecret();
  if (!token || !secret) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = sign(payload, secret);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  try {
    const { exp, ver } = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (ver !== sessionVersion()) return false;
    return typeof exp === "number" && exp > Date.now();
  } catch {
    return false;
  }
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
