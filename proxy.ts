import { NextResponse, type NextRequest } from "next/server";

/**
 * Per-request CSP nonce.
 *
 * The policy lives here rather than in next.config.ts because the interesting
 * half of it cannot be static: `script-src` names a nonce that has to be
 * unguessable and different on every response, which means generating it per
 * request and handing the same value to React so it can stamp it onto every
 * script tag it renders.
 *
 * The trade this buys: injected markup cannot execute, because an attacker
 * writing a <script> into the page has no way to know the nonce. 'strict-dynamic'
 * then extends that trust to the chunks Next loads on demand, so the policy does
 * not have to enumerate build output that changes every deploy.
 *
 * `style-src` keeps 'unsafe-inline' deliberately. Framer Motion animates by
 * writing inline styles on every frame and Next inlines the critical CSS —
 * removing it would break the site to close a far weaker vector than script
 * injection.
 *
 * WHAT THIS COSTS, measured on this repo:
 *
 *   before  ○ static   Cache-Control: s-maxage=31536000   TTFB ~5ms
 *   after   ƒ dynamic  Cache-Control: no-store            TTFB ~30ms
 *
 * A nonce has to be unique per response, so a page carrying one can never be
 * prerendered or cached — reading headers() opts every route into rendering on
 * demand. That is not a tuning problem, it is what nonces are.
 *
 * Worth knowing before you keep it: no page here renders user-submitted
 * content, so today there is no way to get injected markup onto the page in
 * the first place. This defends a door nothing currently walks through, and
 * charges the whole site's cacheability for it. Kept because it was asked for,
 * and because the day the site does render something a visitor typed, this is
 * already in place.
 *
 * TO REVERT: delete this file and drop the four `nonce` lines it feeds
 * (app/layout.tsx, app/work/[slug]/page.tsx, app/lab/[slug]/page.tsx), then put
 * a static CSP back in next.config.ts with 'unsafe-inline' on script-src.
 * Everything goes back to prerendered.
 */

const isDev = process.env.NODE_ENV === "development";

export default function proxy(request: NextRequest) {
  const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));

  const csp = [
    "default-src 'self'",
    // 'unsafe-eval' is dev-only: the HMR client needs it, production never does.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    `connect-src 'self'${isDev ? " ws:" : ""}`,
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  // React reads the nonce off the request headers; our own inline scripts read
  // it back out of `x-nonce` via headers().
  const headers = new Headers(request.headers);
  headers.set("x-nonce", nonce);
  headers.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    /*
     * Documents only. Static assets, optimised images and the contact endpoint
     * serve no scripts, so a nonce would cost a proxy invocation each and
     * buy nothing — their headers still come from next.config.ts.
     */
    "/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|pdf|txt|xml)$).*)",
  ],
};
