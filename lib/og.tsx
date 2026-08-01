import { ImageResponse } from "next/og";
import { profile, siteUrl } from "@/content/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Social sharing card. Rendered at build time by next/og — no external assets,
 * no fonts to fetch, so it cannot fail at request time.
 */
export function renderOgImage() {
  const domain = siteUrl.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05060b",
          color: "#ffffff",
          padding: "68px",
          position: "relative",
        }}
      >
        {/* Progress-bar motif from the site itself. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "7px",
            background: "linear-gradient(to right, #22d3ee, #5b5bf0)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 460,
            height: 460,
            borderRadius: 999,
            background: "#5b5bf0",
            opacity: 0.22,
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 21 }}>
          <span style={{ letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.5 }}>
            {profile.title}
          </span>
          <span style={{ letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f8ff8" }}>
            {profile.locationShort}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 76, lineHeight: 1.04, letterSpacing: "-0.03em" }}>
            I build complete e-commerce platforms and business websites.
          </div>
          <div style={{ display: "flex", fontSize: 29, opacity: 0.55, lineHeight: 1.4 }}>
            Two live production platforms, shipped end-to-end.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 26,
            fontSize: 23,
          }}
        >
          <span>{profile.fullName}</span>
          <span style={{ opacity: 0.45 }}>{domain}</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
