"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

/** Deliberately machine-flavoured: caps, digits and brackets, no lowercase. */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}#%*+=";

type Props = {
  text: string;
  className?: string;
  /** Characters resolved per frame. Lower is slower and more legible. */
  speed?: number;
  /** Re-run when the pointer enters. Off for long strings. */
  replayOnHover?: boolean;
};

/**
 * A label that decodes itself into place — characters cycle through junk and
 * settle left to right, like a readout locking on.
 *
 * Reserved for short machine-set strings: kickers, indices, status lines. On a
 * sentence it stops being an effect and becomes an obstacle between the reader
 * and the words.
 *
 * Two things keep it honest:
 *
 * - The real string is always in the DOM for assistive tech; only the animated
 *   copy is `aria-hidden`. A screen reader never hears the junk.
 * - Every intermediate frame is the same length as the target, so the label
 *   cannot reflow the layout around it while it resolves.
 */
export default function Scramble({
  text,
  className = "",
  speed = 1,
  replayOnHover = true,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const frame = useRef(0);
  const raf = useRef(0);

  const [display, setDisplay] = useState(text);

  const run = useCallback(() => {
    if (reduced) return;
    cancelAnimationFrame(raf.current);
    frame.current = 0;

    const tick = () => {
      // How many characters have locked in by this frame.
      const resolved = frame.current * speed;

      const next = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < resolved) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setDisplay(next);

      if (resolved >= text.length) return;
      frame.current += 1;
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
  }, [reduced, speed, text]);

  useEffect(() => {
    if (inView) run();
    return () => cancelAnimationFrame(raf.current);
  }, [inView, run]);

  if (reduced) {
    return (
      <span ref={ref} className={className}>
        {text}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className={className}
      onPointerEnter={replayOnHover ? run : undefined}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
