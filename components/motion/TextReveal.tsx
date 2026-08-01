"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_EXPO, REVEAL_VIEWPORT } from "@/lib/motion";

type Props = {
  /** One entry per visual line. Each line slides up from behind its own mask. */
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  /** Start on mount instead of on scroll — use for above-the-fold headings. */
  immediate?: boolean;
  delay?: number;
};

const lineVariants: Variants = {
  hidden: { y: "112%" },
  show: (custom: { i: number; delay: number }) => ({
    y: "0%",
    transition: { duration: 1.05, ease: EASE_EXPO, delay: custom.delay + custom.i * 0.085 },
  }),
};

/**
 * Display-type reveal: each line is clipped by a wrapper and slides out of it.
 *
 * The scroll trigger lives on the outer element, never on the clipped line —
 * IntersectionObserver clips a target against its ancestors' overflow, so a
 * line hidden behind its own mask would report zero intersection and never
 * animate in.
 *
 * Screen readers get ordinary flowing text: the lines are real text nodes, not
 * per-character spans.
 */
export default function TextReveal({
  lines,
  className,
  lineClassName,
  immediate = false,
  delay = 0,
}: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span className={className}>
        {lines.map((line, i) => (
          <span key={i} className={`block ${lineClassName ?? ""}`}>
            {line}
          </span>
        ))}
      </span>
    );
  }

  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: REVEAL_VIEWPORT };

  return (
    <motion.span className={`block ${className ?? ""}`} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className={`block will-change-transform ${lineClassName ?? ""}`}
            variants={lineVariants}
            custom={{ i, delay }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
