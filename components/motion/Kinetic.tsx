"use client";

import { motion, useReducedMotion } from "framer-motion";
import { kineticWord, REVEAL_VIEWPORT } from "@/lib/motion";

type Props = {
  /** The line to animate. Split into words internally. */
  text: string;
  className?: string;
  /** Class applied to every word — use it to weight or colour the line. */
  wordClassName?: string;
  /** Animate on mount instead of on scroll. For above-the-fold type. */
  immediate?: boolean;
  /** Added to every word's stagger delay. */
  delay?: number;
  /** Word index to start counting from, so two <Kinetic> runs can share a stagger. */
  offset?: number;
};

/**
 * Headline type that arrives the way a title sequence does: each word rises out
 * of its own mask, out of focus and skewed, and resolves into register.
 *
 * Accessibility notes that are easy to get wrong here:
 *
 * - The whole line is exposed to assistive tech as one string via `aria-label`,
 *   and the animated words are `aria-hidden`. Without that, a screen reader
 *   announces a headline word-by-word as separate nodes.
 * - The scroll trigger sits on the outer element, never on a masked word.
 *   IntersectionObserver clips a target against its ancestors' overflow, so a
 *   word hidden behind its own mask reports zero intersection and would never
 *   animate in.
 * - Words keep real spaces between them, so selecting and copying the headline
 *   yields "Selected Work", not "SelectedWork".
 */
export default function Kinetic({
  text,
  className = "",
  wordClassName = "",
  immediate = false,
  delay = 0,
  offset = 0,
}: Props) {
  const reduced = useReducedMotion();
  const words = text.split(" ").filter(Boolean);

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: REVEAL_VIEWPORT };

  return (
    <motion.span
      className={`inline ${className}`}
      initial="hidden"
      aria-label={text}
      {...trigger}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true">
          <span
            // inline-flex + bottom clip gives each word its own mask without
            // knocking the line off its baseline.
            className="inline-flex overflow-hidden pb-[0.12em] align-bottom"
          >
            {/* No `will-change` here on purpose. framer-motion sets it for the
                duration of the animation and clears it afterwards; hard-coding
                it in the class left every word of every headline on the page
                holding its own compositor layer for good. */}
            <motion.span
              className={`inline-block ${wordClassName}`}
              variants={kineticWord}
              custom={{ i: offset + i, delay }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}
