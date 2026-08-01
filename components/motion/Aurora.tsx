"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

/**
 * The atmosphere layer: two large blooms fixed behind the page that drift as you
 * scroll and flare when you scroll fast.
 *
 * It sits at z-0 behind everything and is `pointer-events-none`, so it never
 * interferes with hit-testing. Blur this large is expensive to repaint, so the
 * element is promoted once and only ever transformed and faded afterwards —
 * never resized.
 *
 * Renders nothing at all under `prefers-reduced-motion`: a drifting light field
 * is exactly what that setting is asking us not to do.
 */
export default function Aurora() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  });

  // Flare on fast scrolling, settle when it stops.
  const velocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(velocity, { stiffness: 90, damping: 30 });
  const flare = useTransform(smoothVelocity, [-1.4, 0, 1.4], [1, 0, 1], {
    clamp: true,
  });

  // The two blooms travel in opposite directions across the whole scroll.
  const indigoY = useTransform(progress, [0, 1], ["-6%", "42%"]);
  const indigoX = useTransform(progress, [0, 1], ["-12%", "16%"]);
  const cyanY = useTransform(progress, [0, 1], ["58%", "-4%"]);
  const cyanX = useTransform(progress, [0, 1], ["28%", "-14%"]);

  const indigoOpacity = useTransform(flare, [0, 1], [0.3, 0.52]);
  const cyanOpacity = useTransform(flare, [0, 1], [0.16, 0.34]);

  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <motion.div
        style={{ x: indigoX, y: indigoY, opacity: indigoOpacity }}
        className="absolute left-1/2 top-0 size-[52rem] -translate-x-1/2 rounded-full blur-[130px] will-change-transform"
      >
        <div className="size-full rounded-full bg-[radial-gradient(circle,var(--color-brand)_0%,transparent_68%)]" />
      </motion.div>

      <motion.div
        style={{ x: cyanX, y: cyanY, opacity: cyanOpacity }}
        className="absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 rounded-full blur-[140px] will-change-transform"
      >
        <div className="size-full rounded-full bg-[radial-gradient(circle,var(--color-cyan)_0%,transparent_70%)]" />
      </motion.div>
    </div>
  );
}
