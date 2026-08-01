import { NextResponse } from "next/server";
import { z } from "zod";
import { deliver } from "@/lib/contact-delivery";
import { check, clientKey } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z
    .string()
    .trim()
    .max(200)
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Please enter a valid email address."),
  projectType: z.string().trim().min(1, "Pick the closest match.").max(120),
  budget: z.string().trim().max(120).default(""),
  details: z
    .string()
    .trim()
    .min(20, "A couple of sentences helps me reply properly.")
    .max(5000, "That's longer than the form accepts — email me instead."),
  // Honeypot: must stay empty.
  company: z.string().max(200).default(""),
});

export async function POST(request: Request) {
  // 1. Rate limit before doing any work.
  const key = clientKey(request.headers);
  const limit = check(key, { limit: 5, windowMs: 10 * 60 * 1000 });

  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, message: "Too many messages from this address. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  // 2. Parse.
  let body: unknown;
  try {
    body = await request.json();
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

  // 3. Honeypot. Answer 200 so bots learn nothing from the response.
  if (parsed.data.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // 4. Deliver.
  const result = await deliver({
    name: parsed.data.name,
    email: parsed.data.email,
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
