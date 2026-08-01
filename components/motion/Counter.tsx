"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Counts a numeric string up when it scrolls into view, preserving leading
 * zeros and any trailing characters ("02", "07", "~127 MB", "12+").
 *
 * Non-numeric values and reduced-motion visitors render the final value
 * directly — the number is always correct, the count-up is decoration.
 */
export default function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const pad = match ? match[1].length : 0;
  const suffix = match ? match[2] : "";
  const animatable = target !== null && !reduced;

  const [display, setDisplay] = useState(`${"0".repeat(pad)}${suffix}`);

  useEffect(() => {
    if (!animatable || !inView || target === null) return;

    const controls = animate(0, target, {
      duration: 1.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) =>
        setDisplay(`${String(Math.round(latest)).padStart(pad, "0")}${suffix}`),
    });
    return () => controls.stop();
  }, [animatable, inView, target, pad, suffix]);

  if (!animatable) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      {/* The real value stays available to assistive tech at all times. */}
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
