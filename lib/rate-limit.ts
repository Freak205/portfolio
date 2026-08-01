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

/** Best-effort client IP. Vercel sits behind a proxy, so trust x-forwarded-for. */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}
