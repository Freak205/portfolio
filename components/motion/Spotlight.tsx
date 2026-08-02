"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Hex colour of the glow. Defaults to the brand indigo. */
  color?: string;
  /** Radius of the highlight. */
  size?: string;
  /** Also trace the border, not just the surface. */
  border?: boolean;
};

/**
 * A surface that lights up under the pointer — a soft radial wash across the
 * fill and, optionally, a matching highlight travelling around the border.
 *
 * Pointer position is spring-damped, so the light lags the cursor slightly
 * instead of tracking it rigidly. Only mouse pointers move it: on touch the
 * light never lifts off zero opacity, because a highlight that only appears
 * where a finger last tapped reads as a rendering bug.
 *
 * The glow lives in absolute layers rather than on the element itself, so it
 * never affects layout, hit-testing or the child's own hover.
 *
 * ⚠ The light is a fixed gradient that gets *translated*, not a gradient
 * rebuilt at a new centre. The earlier version interpolated
 * `radial-gradient(… at X% Y% …)` into `background` on every spring frame,
 * which meant a full repaint of the card — text, borders and all — sixty times
 * a second for the whole life of the spring, on every card the pointer crossed.
 * Moving a pre-painted layer is a compositor transform and costs nothing. Keep
 * the gradient static; animate only `x`, `y` and `opacity`.
 */
export default function Spotlight({
  children,
  className = "",
  color = "91 91 240",
  size = "22rem",
  border = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  /** False until the pointer has been placed, so entry does not sweep in from 0,0. */
  const placed = useRef(false);

  const lag = { stiffness: 120, damping: 22, mass: 0.5 };
  const x = useSpring(useMotionValue(0), lag);
  const y = useSpring(useMotionValue(0), lag);
  const lit = useSpring(useMotionValue(0), { stiffness: 140, damping: 26 });

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const nextX = event.clientX - rect.left;
    const nextY = event.clientY - rect.top;

    if (placed.current) {
      x.set(nextX);
      y.set(nextY);
    } else {
      // First frame after entering: land on the pointer rather than gliding
      // across the card to reach it.
      x.jump(nextX);
      y.jump(nextY);
      placed.current = true;
    }

    lit.set(1);
  }

  function handleLeave() {
    placed.current = false;
    lit.set(0);
  }

  /**
   * The travelling light. A square of 2×`size` centred on the pointer, with
   * `closest-side` pinning the gradient's radius to exactly `size` — which
   * reproduces the geometry of the old `radial-gradient(${size} circle at …)`.
   */
  const blob = (alpha: number) => (
    <motion.span
      style={{
        x,
        y,
        width: `calc(${size} * 2)`,
        height: `calc(${size} * 2)`,
        marginLeft: `calc(${size} * -1)`,
        marginTop: `calc(${size} * -1)`,
        background: `radial-gradient(circle closest-side, rgb(${color} / ${alpha}), transparent 70%)`,
      }}
      className="absolute left-0 top-0 will-change-transform"
    />
  );

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative ${className}`}
    >
      {border && (
        <motion.span
          aria-hidden="true"
          style={{
            opacity: lit,
            // A one-pixel ring: paint the light, then punch out everything but
            // the border box with a compositing mask. `overflow` clips to the
            // padding box, which is the whole element here, so the ring itself
            // is never clipped away.
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            maskComposite: "exclude",
            padding: 1,
          }}
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit]"
        >
          {blob(0.5)}
        </motion.span>
      )}

      <motion.span
        aria-hidden="true"
        style={{ opacity: lit }}
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
      >
        {blob(0.16)}
      </motion.span>

      {children}
    </div>
  );
}
