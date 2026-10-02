import "server-only";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

/**
 * SSRF guard for the admin's server-side fetches (news source, image import).
 *
 * A hostname regex alone misses names that *resolve* to internal addresses
 * (`127.0.0.1.nip.io`, a DNS record pointing at 10.x) and IPv6 spellings of
 * loopback/private space (`[::ffff:7f00:1]`, `[fd00::1]`). This resolves the
 * host and rejects it if any address is non-public. It does not pin the
 * resolved IP for the actual request (DNS rebinding stays theoretically
 * possible), which is acceptable for an admin-only, authenticated feature.
 */
export class BlockedHostError extends Error {}

function isPrivateIPv4(ip: string): boolean {
  const p = ip.split(".").map(Number);
  if (p.length !== 4 || p.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return true;
  const [a, b, c] = p;
  return (
    a === 0 || // "this" network
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) || // CGNAT
    (a === 169 && b === 254) || // link-local, cloud metadata
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 192 && b === 0 && c === 0) ||
    (a === 198 && (b === 18 || b === 19)) || // benchmarking
    a >= 224 // multicast + reserved
  );
}

function isPrivateIPv6(raw: string): boolean {
  const s = raw.toLowerCase();
  if (s === "::" || s === "::1") return true;
  // IPv4-mapped, dotted (::ffff:127.0.0.1) or hex (::ffff:7f00:1) form.
  const dotted = s.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (dotted) return isPrivateIPv4(dotted[1]);
  const hex = s.match(/^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/);
  if (hex) {
    const hi = parseInt(hex[1], 16);
    const lo = parseInt(hex[2], 16);
    return isPrivateIPv4(`${hi >> 8}.${hi & 255}.${lo >> 8}.${lo & 255}`);
  }
  return (
    /^f[cd]/.test(s) || // unique local fc00::/7
    /^fe[89ab]/.test(s) || // link-local fe80::/10
    s.startsWith("ff") || // multicast
    s.startsWith("64:ff9b:") || // NAT64
    s.startsWith("2001:db8:") // documentation
  );
}

/** True for loopback, private, link-local, CGNAT, multicast and reserved IPs. */
export function isNonPublicAddress(address: string): boolean {
  const ip = address.replace(/^\[|\]$/g, "");
  const version = isIP(ip);
  if (version === 4) return isPrivateIPv4(ip);
  if (version === 6) return isPrivateIPv6(ip);
  return true;
}

/** Throws BlockedHostError unless every address `hostname` resolves to is public. */
export async function assertPublicHost(hostname: string): Promise<void> {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "").replace(/\.$/, "");
  if (!host) throw new BlockedHostError("empty host");
  if (isIP(host)) {
    if (isNonPublicAddress(host)) throw new BlockedHostError("non-public address");
    return;
  }
  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".internal")
  ) {
    throw new BlockedHostError("internal hostname");
  }
  const addrs = await lookup(host, { all: true, verbatim: true });
  if (addrs.length === 0 || addrs.some((a) => isNonPublicAddress(a.address))) {
    throw new BlockedHostError("resolves to a non-public address");
  }
}
