"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Cyan→indigo reading-progress bar pinned to the very top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-cyan via-brand to-brand-soft"
      style={{ scaleX }}
    />
  );
}
