import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy.
 *
 * The site loads nothing from anywhere else: next/font self-hosts the two
 * Google faces at build time, every image is in /public, and the only network
 * call the browser makes is to our own /api/contact. So the allowlist is
 * simply 'self', and anything injected into the page has nowhere to send what
 * it steals.
 *
 * 'unsafe-inline' stays on scripts because the pre-paint intro script and the
 * JSON-LD block are inline and Next's own bootstrap is too; nonces would need
 * middleware on every request. The directives that do not depend on it still
 * carry their weight — form-action stops a hijacked form posting off-site,
 * base-uri stops a <base> tag re-pointing every relative URL, and
 * frame-ancestors is the modern, actually-enforced clickjacking control.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Two years, subdomains included. Not preloaded — that is a commitment to
  // HTTPS on the apex and every subdomain that is painful to walk back.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Screenshots live in /public. Add remote hosts here only if you switch to a CDN.
    remotePatterns: [],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
