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
 * interferes with hit-testing. The element is promoted once and only ever
 * transformed and faded afterwards — never resized.
 *
 * The softness is painted rather than filtered. These were `blur-[130px]` over
 * a hard gradient, which is the same picture at a much worse price: this layer
 * is fixed, full-viewport, and moves on *every* scroll frame of *every* page,
 * so a 130px-radius blur pass on an 832px surface was the single most
 * expensive thing on the site. Multi-stop gradients give the same falloff for
 * the cost of a texture upload. Do not reintroduce `filter` here.
 *
 * Renders nothing at all under `prefers-reduced-motion`: a drifting light field
 * is exactly what that setting is asking us not to do.
 */
/**
 * A painted Gaussian: the stop curve a large blur would have produced, written
 * out. `peak` is the alpha at the centre — lower than the flat colour the old
 * gradient started from, because a blur redistributes that energy outward.
 */
function bloom(color: string, peak: number) {
  return [
    `radial-gradient(circle`,
    `color-mix(in srgb, ${color} ${peak}%, transparent) 0%`,
    `color-mix(in srgb, ${color} ${peak * 0.7}%, transparent) 22%`,
    `color-mix(in srgb, ${color} ${peak * 0.36}%, transparent) 42%`,
    `color-mix(in srgb, ${color} ${peak * 0.13}%, transparent) 62%`,
    `transparent 82%)`,
  ].join(", ");
}

const INDIGO = bloom("var(--color-brand)", 58);
const CYAN = bloom("var(--color-cyan)", 46);

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
        style={{ x: indigoX, y: indigoY, opacity: indigoOpacity, background: INDIGO }}
        className="absolute left-1/2 top-0 size-[62rem] -translate-x-1/2 rounded-full will-change-transform"
      />

      <motion.div
        style={{ x: cyanX, y: cyanY, opacity: cyanOpacity, background: CYAN }}
        className="absolute left-1/2 top-0 size-[50rem] -translate-x-1/2 rounded-full will-change-transform"
      />
    </div>
  );
}
