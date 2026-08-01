"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

type Props = {
  children: string;
  className?: string;
  /** Resting opacity of a word that has not been reached yet. */
  from?: number;
};

/**
 * A paragraph that writes itself in as you scroll past it.
 *
 * Each word is mapped to a slice of the block's scroll progress and brightens
 * as that slice passes, so the eye is pulled through the sentence instead of
 * meeting a finished wall of text. It replaces a fade-up on body copy, which
 * animates the paragraph as one lump and reads as nothing at all.
 *
 * Notes:
 *
 * - Every word is its own component. Calling `useTransform` inside a `.map`
 *   would put hooks in a loop, and the count changes with the copy.
 * - The trailing space lives outside the animated span so lines still break and
 *   copy still selects normally.
 * - Under `prefers-reduced-motion` this is one plain <p> at full opacity.
 */
export default function ScrubText({ children, className = "", from = 0.2 }: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // Starts when the paragraph is a little below the fold, finishes well
    // before it leaves — so it is fully lit while it is comfortably readable.
    offset: ["start 0.9", "end 0.55"],
  });

  if (reduced) {
    return <p className={className}>{children}</p>;
  }

  const words = children.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          from={from}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  from,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  from: number;
}) {
  const opacity = useTransform(progress, range, [from, 1]);

  return (
    <>
      <motion.span style={{ opacity }} className="inline-block">
        {children}
      </motion.span>
      {" "}
    </>
  );
}
