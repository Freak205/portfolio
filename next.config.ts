import type { NextConfig } from "next";

/**
 * The Content-Security-Policy is NOT here. It carries a per-request nonce, so
 * it is built in proxy.ts where a fresh value can be generated for every
 * response. Setting a second, static copy here would leave a weaker policy
 * enforced alongside it for no gain.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Deny every powerful feature outright. The site asks for none of them, so
  // anything that later tries to is either a mistake or not ours.
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "autoplay=()",
      "camera=()",
      "display-capture=()",
      "encrypted-media=()",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "midi=()",
      "payment=()",
      "picture-in-picture=()",
      "publickey-credentials-get=()",
      "screen-wake-lock=()",
      "usb=()",
      "xr-spatial-tracking=()",
      "interest-cohort=()",
    ].join(", "),
  },
  // No cross-origin popup shares a browsing context with this page.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // Retires the Flash-era crossdomain.xml escape hatch.
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
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
