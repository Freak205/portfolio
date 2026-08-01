"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * A timeline rail that draws itself as you scroll the list, with a travelling
 * head at the leading edge.
 *
 * The rail is absolutely positioned against this wrapper, so the wrapper has to
 * be the thing that establishes the containing block — hence `relative` here
 * rather than on the <ol> inside.
 *
 * Under `prefers-reduced-motion` the rail renders at full height, statically:
 * the timeline still reads as a timeline, it just doesn't animate.
 */
export default function Spine({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.6"],
  });

  const drawn = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.001,
  });

  const headTop = useTransform(drawn, (v) => `${v * 100}%`);
  const headOpacity = useTransform(drawn, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative mt-14 md:mt-18">
      {/* Unfilled track. */}
      <span
        aria-hidden="true"
        className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-[var(--line)] md:block"
      />

      {/* Filled portion, scaled from the top as you scroll. */}
      <motion.span
        aria-hidden="true"
        style={reduced ? undefined : { scaleY: drawn }}
        className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-brand via-brand-soft to-cyan md:block"
      />

      {/* Travelling head. */}
      {!reduced && (
        <motion.span
          aria-hidden="true"
          style={{ top: headTop, opacity: headOpacity }}
          className="absolute left-[3px] hidden size-[9px] -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_16px_4px_rgb(34_211_238/0.55)] md:block"
        />
      )}

      {children}
    </div>
  );
}
