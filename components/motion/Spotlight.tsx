"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
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
 * light stays parked in the centre at rest opacity, because a highlight that
 * only appears where a finger last tapped reads as a rendering bug.
 *
 * The glow lives in `::before`-style absolute layers rather than on the element
 * itself, so it never affects layout, hit-testing or the child's own hover.
 */
export default function Spotlight({
  children,
  className = "",
  color = "91 91 240",
  size = "22rem",
  border = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useSpring(useMotionValue(50), { stiffness: 120, damping: 22, mass: 0.5 });
  const y = useSpring(useMotionValue(50), { stiffness: 120, damping: 22, mass: 0.5 });
  const lit = useSpring(useMotionValue(0), { stiffness: 140, damping: 26 });

  const wash = useMotionTemplate`radial-gradient(${size} circle at ${x}% ${y}%, rgb(${color} / 0.16), transparent 70%)`;
  const edge = useMotionTemplate`radial-gradient(${size} circle at ${x}% ${y}%, rgb(${color} / 0.5), transparent 60%)`;

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width) * 100);
    y.set(((event.clientY - rect.top) / rect.height) * 100);
    lit.set(1);
  }

  function handleLeave() {
    x.set(50);
    y.set(50);
    lit.set(0);
  }

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
            background: edge,
            // A one-pixel ring: paint the gradient, then punch out everything
            // but the border box with a compositing mask.
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            maskComposite: "exclude",
            padding: 1,
          }}
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
        />
      )}

      <motion.span
        aria-hidden="true"
        style={{ opacity: lit, background: wash }}
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
      />

      {children}
    </div>
  );
}
