"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Vertical parallax driven by the element's own progress through the viewport.
 * `distance` is the total travel in px across the whole pass.
 */
export default function Parallax({
  children,
  className,
  distance = 60,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  reverse?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = reverse ? [distance / 2, -distance / 2] : [-distance / 2, distance / 2];
  const y = useTransform(scrollYProgress, [0, 1], range);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
