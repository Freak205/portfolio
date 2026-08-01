"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { EASE_EXPO, REVEAL_VIEWPORT } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger index. */
  index?: number;
  /** Vertical drift across the whole pass, in px. 0 disables it. */
  drift?: number;
  /** Wipe direction. */
  from?: "bottom" | "left";
};

/**
 * An image that is uncovered rather than faded in: a wipe travels across the
 * frame while the frame itself settles back from a slight over-scale, the way a
 * shot lands after a push-in.
 *
 * A fade tells you something appeared. A wipe tells you which direction it came
 * from, which is what gives a page of screenshots a sense of edit rather than a
 * sense of loading.
 *
 * `drift` adds a scroll-linked parallax on the whole block — small numbers only,
 * since the block still has to line up with its grid neighbours.
 */
export default function Curtain({
  children,
  className = "",
  index = 0,
  drift = 0,
  from = "bottom",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const hidden =
    from === "left" ? "inset(0% 100% 0% 0%)" : "inset(100% 0% 0% 0%)";

  return (
    <div ref={ref} className={className}>
      <motion.div style={drift ? { y } : undefined} className="will-change-transform">
        <motion.div
          initial={{ clipPath: hidden, scale: 1.06 }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 1.15, ease: EASE_EXPO, delay: index * 0.09 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
