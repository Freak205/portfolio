/**
 * In-memory fixed-window rate limiter.
 *
 * Deliberately dependency-free: it costs nothing, needs no external service,
 * and is enough to stop casual form spam. It is per-instance and resets on
 * deploy. On Vercel each serverless instance keeps its own map, so the limit is
 * per warm instance rather than global — if you ever need a hard guarantee,
 * swap this for Redis/Upstash behind the same `check()` signature.
 */

type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

/** Drop expired buckets so the map cannot grow without bound. */
function sweep(now: number) {
  if (buckets.size < 500) return;
  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) buckets.delete(key);
  }
}

export function check(
  key: string,
  { limit = 5, windowMs = 10 * 60 * 1000 } = {},
): { ok: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  sweep(now);

  const entry = buckets.get(key);

  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  entry.count += 1;

  if (entry.count > limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }

  return { ok: true, remaining: limit - entry.count, retryAfterSeconds: 0 };
}

/**
 * Headers only the hosting proxy can set. Render, Vercel and Cloudflare all
 * overwrite these on the way in, so a client cannot forge them.
 */
const TRUSTED_IP_HEADERS = [
  "cf-connecting-ip",
  "true-client-ip",
  "x-vercel-forwarded-for",
  "x-real-ip",
];

/**
 * Best-effort client IP.
 *
 * `x-forwarded-for` is a *client-supplied* header that proxies append to. Taking
 * the leftmost entry — the usual shortcut — hands the attacker the key: send a
 * different fake IP each request and every request lands in its own bucket, so
 * the limit never trips. The rightmost entry is the one our own proxy appended,
 * which is the only part of that header we did not let the caller write.
 *
 * A deployment with no proxy in front of it has no trustworthy header at all,
 * which is why `check()` is also called with a global key in the route: that
 * ceiling holds no matter what the caller sends.
 */
export function clientKey(headers: Headers): string {
  for (const name of TRUSTED_IP_HEADERS) {
    const value = headers.get(name)?.split(",")[0]?.trim();
    if (value) return value;
  }

  const hops = (headers.get("x-forwarded-for") ?? "")
    .split(",")
    .map((hop) => hop.trim())
    .filter(Boolean);

  return hops.at(-1) ?? "unknown";
}

/** Key for the site-wide ceiling. No IP can collide with it. */
export const GLOBAL_KEY = "*all*";
