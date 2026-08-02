"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { REVEAL_VIEWPORT, tumbleIn } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger index for the entrance. */
  index?: number;
  /** Peak rotation in degrees at the corners. Keep it low — this reads better subtle. */
  strength?: number;
  /** Adds a light sweep that follows the pointer across the surface. */
  sheen?: boolean;
};

/**
 * A card that tumbles in on a perspective, then tilts toward the pointer.
 *
 * Two details that matter:
 *
 * - The entrance animates the outer element and the tilt lives on an inner one.
 *   Sharing a single element would mean the whileInView entrance and the
 *   pointer spring fight over the same transform.
 * - Rotation is driven by springs, not raw pointer position, so the card keeps
 *   moving for a beat after the pointer stops. That lag is most of the effect.
 *
 * Under `prefers-reduced-motion` this is a plain <div> — no perspective, no
 * entrance, no pointer tracking, and no listeners attached.
 */
export default function Tilt({
  children,
  className = "",
  index = 0,
  strength = 7,
  sheen = true,
}: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const spring = { stiffness: 150, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useMotionValue(0), spring);
  const rotateY = useSpring(useMotionValue(0), spring);
  // Pointer position in pixels, for the sheen highlight. Pixels rather than
  // percentages because the sheen is a translated layer, not a re-centred
  // gradient — see the note where it is rendered.
  const px = useSpring(useMotionValue(0), { stiffness: 90, damping: 20 });
  const py = useSpring(useMotionValue(0), { stiffness: 90, damping: 20 });

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    // Mouse only. A touch drag across a card is the visitor scrolling the page,
    // and tilting the card under their finger reads as the page fighting back.
    if (event.pointerType !== "mouse") return;

    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width;
    const relY = (event.clientY - rect.top) / rect.height;

    // Centre of the card is 0°; edges reach ±strength.
    rotateY.set((relX - 0.5) * 2 * strength);
    rotateX.set((0.5 - relY) * 2 * strength);
    px.set(event.clientX - rect.left);
    py.set(event.clientY - rect.top);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      className={`[perspective:1400px] ${className}`}
      variants={tumbleIn}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={REVEAL_VIEWPORT}
    >
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full will-change-transform"
      >
        {children}

        {/*
           The light sweep. Like Spotlight's, this is one fixed gradient that
           gets translated — never a `radial-gradient(… at X% Y% …)` string
           reinterpolated into `background`, which repaints the entire card on
           every spring frame while it is also being rotated in 3D.
        */}
        {sheen && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.25rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          >
            <motion.span
              style={{
                x: px,
                y: py,
                background:
                  "radial-gradient(circle closest-side, rgb(255 255 255 / 0.07), transparent 42%)",
              }}
              className="absolute left-0 top-0 -ml-[38rem] -mt-[38rem] size-[76rem] will-change-transform"
            />
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
