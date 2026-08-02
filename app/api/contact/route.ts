import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSection } from "@/content/site";
import { deliver } from "@/lib/contact-delivery";
import { GLOBAL_KEY, check, clientKey } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Well past the largest legitimate enquiry, well under anything worth parsing. */
const MAX_BODY_BYTES = 16 * 1024;

/** The dropdowns are closed sets — anything else was not typed by a person. */
const PROJECT_TYPES = new Set<string>(contactSection.form.projectTypes);
const BUDGET_RANGES = new Set<string>(contactSection.form.budgetRanges);

/**
 * This endpoint sends mail, so a cross-site page must not be able to fire it
 * using a visitor's browser. Browsers always attach `Origin` to a cross-origin
 * POST, so a mismatch is decisive. A missing `Origin` is not a browser request
 * and is left to the rate limiter rather than blocked outright.
 */
function crossSite(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host !== request.headers.get("host");
  } catch {
    return true;
  }
}

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z
    .string()
    .trim()
    .max(200)
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Please enter a valid email address."),
  // Optional. Empty passes; anything typed has to look like a phone number.
  phone: z
    .string()
    .trim()
    .max(40)
    .default("")
    .refine((value) => value === "" || /^\+?[\d ().-]{7,20}$/.test(value), {
      message: "Please enter a valid phone number, or leave it blank.",
    }),
  projectType: z
    .string()
    .trim()
    .max(120)
    .refine((value) => PROJECT_TYPES.has(value), { message: "Pick the closest match." }),
  budget: z
    .string()
    .trim()
    .max(120)
    .default("")
    .refine((value) => value === "" || BUDGET_RANGES.has(value), {
      message: "Pick one of the listed ranges.",
    }),
  details: z
    .string()
    .trim()
    .min(20, "A couple of sentences helps me reply properly.")
    .max(5000, "That's longer than the form accepts — email me instead."),
  // Honeypot: must stay empty.
  company: z.string().max(200).default(""),
});

export async function POST(request: Request) {
  // 1. Reject anything a browser only sends from someone else's page.
  if (crossSite(request)) {
    return NextResponse.json({ ok: false, message: "Cross-origin request." }, { status: 403 });
  }

  // 2. Rate limit before doing any work.
  const key = clientKey(request.headers);
  const limit = check(key, { limit: 5, windowMs: 10 * 60 * 1000 });

  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, message: "Too many messages from this address. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  // 3. A ceiling that does not depend on identifying the caller. Whoever gets
  //    past the per-IP limit by rotating headers still cannot burn the mail
  //    quota — the site as a whole sends at most this many enquiries an hour.
  const global = check(GLOBAL_KEY, { limit: 60, windowMs: 60 * 60 * 1000 });

  if (!global.ok) {
    return NextResponse.json(
      { ok: false, message: "The form is busy right now. Please email me directly." },
      { status: 429, headers: { "Retry-After": String(global.retryAfterSeconds) } },
    );
  }

  // 4. Read with a cap, so an oversized body is dropped rather than parsed.
  const declared = Number(request.headers.get("content-length"));
  let raw: string;
  try {
    if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) throw new Error("too large");
    raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) throw new Error("too large");
  } catch {
    return NextResponse.json({ ok: false, message: "That request was too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, message: "Malformed request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !errors[field]) errors[field] = issue.message;
    }
    return NextResponse.json(
      { ok: false, message: "Please check the highlighted fields.", errors },
      { status: 422 },
    );
  }

  // 5. Honeypot. Answer 200 so bots learn nothing from the response.
  if (parsed.data.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // 6. Deliver.
  const result = await deliver({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    projectType: parsed.data.projectType,
    budget: parsed.data.budget,
    details: parsed.data.details,
    submittedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent"),
  });

  if (result.delivered.length === 0) {
    return NextResponse.json(
      {
        ok: false,
        message: "The message could not be delivered. Please email me directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

/** Anything other than POST is a mistake — say so rather than 404ing. */
export function GET() {
  return NextResponse.json({ ok: false, message: "Use POST." }, { status: 405 });
}
