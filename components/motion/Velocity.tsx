"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Wrap `value` into the half-open range [min, max).
 * framer-motion v12 no longer re-exports popmotion's `wrap`, and this is all of it.
 */
function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

type Props = {
  /** One copy of the strip. It is repeated four times to make the loop seamless. */
  children: ReactNode;
  /** Percent of the track travelled per second while the page is still. */
  baseVelocity?: number;
  /** Start the drift leftward instead of rightward. */
  reverse?: boolean;
  className?: string;
};

/**
 * A band of type that drifts on its own, then reacts to the page: scrolling
 * accelerates it, scrolling the other way reverses it, and a fast flick skews
 * the whole strip like a camera whip-pan before it settles.
 *
 * This is the one piece of motion on the site driven by scroll *velocity*
 * rather than scroll position, which is what makes it read as a response to the
 * visitor rather than a loop playing next to them.
 *
 * Decorative by definition — the strip repeats its content four times, so it is
 * `aria-hidden` and whatever it says must also exist as real text nearby.
 * Under `prefers-reduced-motion` it renders as a single static row.
 */
export default function Velocity({
  children,
  baseVelocity = 2,
  reverse = false,
  className = "",
}: Props) {
  const reduced = useReducedMotion();

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 320 });

  // `clamp: false` is deliberate — a hard flick should overshoot the mapped
  // range and throw the strip, which is the whole effect.
  const factor = useTransform(smooth, [0, 1400], [0, 4], { clamp: false });
  const skewX = useTransform(smooth, [-2400, 0, 2400], [6, 0, -6], { clamp: true });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const direction = useRef(reverse ? -1 : 1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;

    let moveBy = direction.current * baseVelocity * (delta / 1000);

    // Scroll direction decides travel direction; scroll speed scales it.
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    moveBy += direction.current * moveBy * Math.abs(f);

    baseX.set(baseX.get() + moveBy);
  });

  if (reduced) {
    return (
      <div aria-hidden="true" className={`overflow-hidden ${className}`}>
        <div className="flex w-max">{children}</div>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={`overflow-hidden ${className}`}>
      <motion.div className="flex w-max will-change-transform" style={{ x, skewX }}>
        {/* Four copies: the wrap period is one quarter of the track, so -50%
            lands exactly on a repeat and the seam is never visible. */}
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex shrink-0 items-center">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
