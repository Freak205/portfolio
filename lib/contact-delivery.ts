/**
 * Where enquiries go.
 *
 * Imported only by app/api/contact/route.ts, which runs on the server. Nothing
 * here is bundled for the browser — never import this from a "use client" file.
 *
 * Three transports, all optional, all configured by environment variable. Every
 * one that is configured runs; the submission succeeds if at least one does.
 * With none configured the enquiry is written to the server log so nothing is
 * ever silently lost — good enough to test a deployment, not good enough to
 * run on. Set RESEND_API_KEY or CONTACT_WEBHOOK_URL before you go live.
 *
 * No secret in this file is ever sent to the browser: it runs server-side only.
 */

export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  details: string;
  submittedAt: string;
  userAgent: string | null;
};

type Result = { delivered: string[]; failed: string[] };

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function asText(enquiry: Enquiry) {
  return [
    `New enquiry from the portfolio site`,
    ``,
    `Name:        ${enquiry.name}`,
    `Email:       ${enquiry.email}`,
    `Phone:       ${enquiry.phone || "Not given"}`,
    `Project:     ${enquiry.projectType}`,
    `Budget:      ${enquiry.budget || "Not specified"}`,
    `Submitted:   ${enquiry.submittedAt}`,
    ``,
    `Details:`,
    enquiry.details,
  ].join("\n");
}

function asHtml(enquiry: Enquiry) {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 16px 6px 0;color:#6b7280;font:12px/1.5 -apple-system,Segoe UI,sans-serif;white-space:nowrap">${label}</td><td style="padding:6px 0;color:#111827;font:14px/1.5 -apple-system,Segoe UI,sans-serif">${escapeHtml(value)}</td></tr>`;

  return `<div style="max-width:600px;margin:0 auto;padding:24px">
  <p style="margin:0 0 20px;font:600 13px/1.4 -apple-system,Segoe UI,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#d8401d">New portfolio enquiry</p>
  <table style="border-collapse:collapse;width:100%">
    ${row("Name", enquiry.name)}
    ${row("Email", enquiry.email)}
    ${row("Phone", enquiry.phone || "Not given")}
    ${row("Project type", enquiry.projectType)}
    ${row("Budget", enquiry.budget || "Not specified")}
    ${row("Submitted", enquiry.submittedAt)}
  </table>
  <p style="margin:24px 0 8px;color:#6b7280;font:12px/1.5 -apple-system,Segoe UI,sans-serif">Details</p>
  <div style="white-space:pre-wrap;padding:16px;background:#f9fafb;border-radius:6px;color:#111827;font:14px/1.6 -apple-system,Segoe UI,sans-serif">${escapeHtml(
    enquiry.details,
  )}</div>
</div>`;
}

async function sendViaResend(enquiry: Enquiry): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) throw new Error("resend not configured");

  // Resend's shared sender works without domain verification, which keeps the
  // free path genuinely free. Swap it once you verify your own domain.
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: enquiry.email,
      subject: `New enquiry — ${enquiry.name} (${enquiry.projectType})`,
      text: asText(enquiry),
      html: asHtml(enquiry),
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`resend responded ${response.status}: ${body.slice(0, 300)}`);
  }
}

async function sendViaWebhook(enquiry: Enquiry): Promise<void> {
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) throw new Error("webhook not configured");

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // `text` keeps this Slack/Teams-compatible; the structured payload rides along.
    body: JSON.stringify({ text: asText(enquiry), enquiry }),
  });

  if (!response.ok) {
    throw new Error(`webhook responded ${response.status}`);
  }
}

export async function deliver(enquiry: Enquiry): Promise<Result> {
  const transports: { name: string; configured: boolean; run: () => Promise<void> }[] = [
    {
      name: "resend",
      configured: Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL),
      run: () => sendViaResend(enquiry),
    },
    {
      name: "webhook",
      configured: Boolean(process.env.CONTACT_WEBHOOK_URL),
      run: () => sendViaWebhook(enquiry),
    },
  ];

  const active = transports.filter((transport) => transport.configured);

  if (active.length === 0) {
    console.warn(
      "[contact] No transport configured (RESEND_API_KEY + CONTACT_TO_EMAIL, or CONTACT_WEBHOOK_URL). Logging the enquiry instead:\n" +
        asText(enquiry),
    );
    return { delivered: ["log"], failed: [] };
  }

  const outcomes = await Promise.allSettled(active.map((transport) => transport.run()));

  const delivered: string[] = [];
  const failed: string[] = [];

  outcomes.forEach((outcome, i) => {
    const name = active[i]!.name;
    if (outcome.status === "fulfilled") {
      delivered.push(name);
    } else {
      failed.push(name);
      console.error(`[contact] ${name} delivery failed:`, outcome.reason);
    }
  });

  // Never lose the enquiry: if every transport failed, at least it is in the log.
  if (delivered.length === 0) {
    console.error("[contact] All transports failed. Enquiry:\n" + asText(enquiry));
  }

  return { delivered, failed };
}
