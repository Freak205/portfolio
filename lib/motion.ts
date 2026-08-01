import type { Variants } from "framer-motion";

/** Shared easing. Matches --ease-expo / --ease-swift in globals.css. */
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_SWIFT = [0.4, 0, 0.2, 1] as const;

/** Viewport config used by every scroll reveal, so timing feels consistent. */
export const REVEAL_VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_EXPO, delay: i * 0.07 },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_EXPO, delay: i * 0.07 },
  }),
};

/** Parent that staggers its children. Pair with `fadeUp` on the children. */
export const stagger: Variants = {
  hidden: {},
  show: (stagger: number = 0.08) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

/** A single line of display type sliding out from behind its mask. */
export const maskLine: Variants = {
  hidden: { y: "110%" },
  show: (i: number = 0) => ({
    y: "0%",
    transition: { duration: 1.05, ease: EASE_EXPO, delay: 0.08 + i * 0.09 },
  }),
};

/** Horizontal rule that draws itself in. */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease: EASE_EXPO } },
};
