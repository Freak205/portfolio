import { ImageResponse } from "next/og";
import { profile, seo, siteUrl } from "@/content/site";

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
          <div style={{ display: "flex", fontSize: 72, lineHeight: 1.04, letterSpacing: "-0.03em" }}>
            {seo.og.headline}
          </div>
          <div style={{ display: "flex", fontSize: 29, opacity: 0.55, lineHeight: 1.4 }}>
            {seo.og.sub}
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
          <span style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {profile.fullName}
            {/* HIRING — the card is what lands in a recruiter's inbox, so the
                availability travels with it. */}
            {profile.openToRoles && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "7px 16px",
                  borderRadius: 999,
                  border: "1px solid rgba(143,143,248,0.5)",
                  background: "rgba(91,91,240,0.16)",
                  color: "#b6b6fb",
                  fontSize: 17,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: "#8f8ff8",
                  }}
                />
                Open to roles
              </span>
            )}
          </span>
          <span style={{ opacity: 0.45 }}>{domain}</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
