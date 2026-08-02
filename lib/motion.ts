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

/* -----------------------------------------------------------------------------
   KINETIC LAYER
   The motion language of a title sequence rather than a web page: type arrives
   out of focus and resolves, cards tumble in on a perspective, surfaces catch a
   light sweep.

   ⚠ On `filter: blur()` in these variants.

   Every one of them fires from a scroll trigger, which means the blur pass runs
   on the same frames the visitor is scrolling — the worst possible moment to
   ask for one. The cost scales with the blurred area, so it is allowed only
   where that area is small:

     - kineticWord, popIn — a word, a chip. Each box is a couple of hundred
       pixels across. Cheap enough, and the defocus *is* the effect.
     - tumbleIn, assemble — whole cards, several per grid, entering together.
       These no longer blur. A 10px blur over six 400×300 surfaces at once was
       measurably dropping frames, and the tumble and the scatter already carry
       the motion without it.

   Anything new that animates `filter` over a large surface belongs in the
   second group.
   -------------------------------------------------------------------------- */

/** Overshoot curve. Used where something should feel thrown rather than eased. */
export const EASE_KINETIC = [0.22, 1.4, 0.36, 1] as const;

/**
 * One word of a kinetic headline: arrives low, out of focus and slightly
 * skewed, then snaps into register. The blur is what reads as motion blur.
 */
export const kineticWord: Variants = {
  hidden: { opacity: 0, y: "90%", skewY: 6, filter: "blur(7px)" },
  show: ({ i, delay }: { i: number; delay: number }) => ({
    opacity: 1,
    y: "0%",
    skewY: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: EASE_EXPO, delay: delay + i * 0.075 },
  }),
};

/** Card entrance on a perspective — the tumble, not the fade. */
export const tumbleIn: Variants = {
  hidden: { opacity: 0, y: 64, rotateX: 22, scale: 0.94 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 1.05, ease: EASE_EXPO, delay: i * 0.09 },
  }),
};

/** Chips and pills: scale up out of focus, like a title card resolving. */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.72, filter: "blur(8px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_KINETIC, delay: i * 0.045 },
  }),
};

/**
 * Cards that fly in from wherever they were scattered and lock to the grid.
 * `custom` carries the scatter offset so each card takes a different path.
 */
export const assemble: Variants = {
  hidden: (c: { x: number; y: number; r: number }) => ({
    opacity: 0,
    x: c.x,
    y: c.y,
    rotate: c.r,
    scale: 0.86,
  }),
  show: (c: { i: number }) => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { duration: 1.15, ease: EASE_EXPO, delay: 0.05 + c.i * 0.1 },
  }),
};
