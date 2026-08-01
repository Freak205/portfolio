"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { assemble, REVEAL_VIEWPORT } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Position in the row — drives both the scatter direction and the stagger. */
  index?: number;
  /** How many columns the grid has, so the scatter fans outward from centre. */
  columns?: number;
};

/**
 * A card that flies in from somewhere off its grid slot and locks into place.
 *
 * The scatter offset is derived from the index rather than randomised: random
 * values differ between the server and client render, which React flags as a
 * hydration mismatch. Deriving it keeps the motion varied and deterministic.
 */
export default function Assemble({
  children,
  className = "",
  index = 0,
  columns = 3,
}: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  // Cards left of centre come in from the left, right of centre from the right.
  const centre = (columns - 1) / 2;
  const fromCentre = index - centre;

  // The offsets are deliberately modest. The same numbers have to work for a
  // three-up desktop grid, where they fan, and a single mobile column, where
  // anything larger throws a full-width card most of the way off-screen — and
  // they cannot be branched on viewport without the server and client
  // disagreeing about the element's initial transform.
  const scatter = {
    x: fromCentre * 46,
    y: 56 + (index % 2) * 34,
    r: fromCentre * 3,
  };

  return (
    <motion.div
      className={className}
      variants={assemble}
      custom={{ ...scatter, i: index }}
      initial="hidden"
      whileInView="show"
      viewport={REVEAL_VIEWPORT}
    >
      {children}
    </motion.div>
  );
}
