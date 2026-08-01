"use client";

import type { ReactNode } from "react";

type BaseProps = {
  repeat?: number;
  speed?: "slow" | "normal" | "fast";
  reverse?: boolean;
  /**
   * Edge treatment. A colour paints matching gradients over the ends; "mask"
   * fades the content itself, which is what you want over a transparent or
   * unknown background; "none" clips hard.
   */
  fadeColor?: string | "mask" | "none";
  className?: string;
};

type TextProps = BaseProps & {
  items: readonly string[];
  separator?: ReactNode;
  children?: never;
  /** Accessible list read by screen readers. Defaults to `items`. */
  srItems?: readonly string[];
};

type NodeProps = BaseProps & {
  items?: never;
  separator?: never;
  /** Pre-rendered nodes (e.g. server-rendered chips). Duplicated for the loop. */
  children: ReactNode;
  srItems?: readonly string[];
};

const speeds = {
  slow: "animate-marquee",
  normal: "animate-marquee-fast",
  fast: "animate-marquee-fast",
} as const;

/**
 * CSS-driven infinite marquee. The track holds two identical halves and
 * translates by -50%, so the loop is seamless and stays off the main thread.
 * `prefers-reduced-motion` stops it in globals.css and the content simply sits
 * still, fully readable.
 */
export default function Marquee({
  items,
  children,
  srItems,
  repeat = 2,
  speed = "slow",
  reverse = false,
  separator,
  fadeColor = "var(--color-void)",
  className = "",
}: TextProps | NodeProps) {
  const animation = reverse ? "animate-marquee-reverse" : speeds[speed];
  const useMask = fadeColor === "mask";
  const showFades = fadeColor !== "none" && !useMask;
  const maskStyle = useMask
    ? {
        maskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
      }
    : undefined;

  const half = items
    ? Array.from({ length: repeat }, () => items)
        .flat()
        .map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="px-3 sm:px-4">{item}</span>
            {separator && <span className="text-brand-soft/70">{separator}</span>}
          </span>
        ))
    : children;

  const readable = srItems ?? items;

  return (
    <div className={`marquee-track relative overflow-hidden ${className}`}>
      {showFades && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-24"
            style={{ background: `linear-gradient(to right, ${fadeColor}, transparent)` }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-24"
            style={{ background: `linear-gradient(to left, ${fadeColor}, transparent)` }}
          />
        </>
      )}

      <div aria-hidden="true" className={`flex w-max ${animation}`} style={maskStyle}>
        <div className="flex shrink-0 items-center">{half}</div>
        <div className="flex shrink-0 items-center">{half}</div>
      </div>

      {readable && (
        <ul className="sr-only">
          {readable.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
