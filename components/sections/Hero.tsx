"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type PointerEvent } from "react";
import { hero, profile } from "@/content/site";
import { EASE_EXPO } from "@/lib/motion";
import StackSigil from "@/components/motion/StackSigil";
import { IconArrowDown } from "@/components/ui/Glyph";

/**
 * A drawn plate over an atmospheric field, with the name set across the plate's
 * faded lower edge. Scrolling pushes the whole composition in and fades it out
 * while the positioning line resolves over it.
 *
 * There is deliberately no photograph. The plate holds <StackSigil /> — three
 * isometric planes for interface, logic and data with a pulse running between
 * them — which makes the site's actual claim in the first second, and gives the
 * pointer something to move. A headshot occupied the same space and said less.
 *
 * The plate leans toward the pointer on a spring. That lean lives on the same
 * element as the scroll scale, so both feed one transform rather than fighting
 * over it.
 *
 * The section is 165–200svh and the visual is sticky inside it, so the whole
 * transition is driven by scroll position rather than a timer. Under
 * `prefers-reduced-motion` it collapses to a single static screen.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const plate = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  const fieldScale = useTransform(progress, [0, 1], [1.08, 1.4]);
  const fieldOpacity = useTransform(progress, [0, 0.75, 1], [1, 0.45, 0.12]);
  const plateScale = useTransform(progress, [0, 1], [1, 1.14]);
  const stageOpacity = useTransform(progress, [0, 0.3], [1, 0]);
  const stageY = useTransform(progress, [0, 0.35], [0, -70]);
  const lineOpacity = useTransform(progress, [0.24, 0.5, 0.92, 1], [0, 1, 1, 0]);
  const lineScale = useTransform(progress, [0.24, 0.6], [0.88, 1]);
  const hintOpacity = useTransform(progress, [0, 0.12], [1, 0]);

  const leanSpring = { stiffness: 130, damping: 20, mass: 0.6 };
  const rotateX = useSpring(useMotionValue(0), leanSpring);
  const rotateY = useSpring(useMotionValue(0), leanSpring);

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    // Mouse only. On touch a drag across the plate is the visitor scrolling, and
    // tilting under their finger reads as the page fighting back.
    if (reduced || event.pointerType !== "mouse") return;
    const node = plate.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width;
    const relY = (event.clientY - rect.top) / rect.height;
    rotateY.set((relX - 0.5) * 14);
    rotateX.set((0.5 - relY) * 14);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className={`relative ${reduced ? "" : "h-[165svh] md:h-[200svh]"}`}
    >
      <div className="sticky top-0 flex h-svh w-full items-center justify-center overflow-hidden">
        {/* ---------- Field ---------- */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={reduced ? undefined : { scale: fieldScale, opacity: fieldOpacity }}
        >
          <div className="absolute inset-0 bg-base">
            <div className="dotgrid absolute inset-0 opacity-70" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-void/90 via-void/55 to-void" />
          <div className="bloom left-1/2 top-1/3 size-[34rem] -translate-x-1/2 opacity-50 md:size-[46rem]" />
          <div className="bloom left-[18%] top-[58%] size-[18rem] opacity-25 md:size-[24rem]" />
        </motion.div>

        {/* ---------- Plate + name ---------- */}
        <motion.div
          className="relative z-10 flex w-full flex-col items-center px-5 text-center"
          style={reduced ? undefined : { opacity: stageOpacity, y: stageY }}
        >
          {/* HIRING — the first thing a recruiter sees, above the fold. */}
          <motion.div
            className="mb-6 flex flex-wrap items-center justify-center gap-2 md:mb-8"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.1 }}
          >
            {profile.openToRoles && <StatusChip label={hero.status.roles} live />}
            {profile.openToFreelance && <StatusChip label={hero.status.freelance} />}
          </motion.div>

          <motion.figure
            className="relative [perspective:1200px]"
            style={reduced ? undefined : { scale: plateScale }}
            initial={reduced ? false : { opacity: 0, y: 32, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: EASE_EXPO }}
          >
            <motion.div
              ref={plate}
              onPointerMove={handleMove}
              onPointerLeave={handleLeave}
              style={reduced ? undefined : { rotateX, rotateY }}
              className="relative aspect-[4/5] h-[clamp(15rem,46svh,30rem)] overflow-hidden rounded-2xl border border-[var(--line-strong)] bg-panel will-change-transform"
            >
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-panel-2 to-void" />
              <StackSigil />

              {/* The plate's lower edge dissolves into the page, which is what
                  lets the name sit across it and still be readable. */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-void via-void/75 to-transparent"
              />
            </motion.div>
          </motion.figure>

          <motion.h1
            id="hero-heading"
            // Pulled up so the type crosses the plate's faded edge rather than
            // sitting under it as a caption. It is set in em, so the overlap
            // stays proportional from 390px to 1440px. At 0.34em the caps only
            // kissed the edge; 0.46em puts them properly into the fade, still
            // well clear of the sigil's readout line above it.
            className="headline -mt-[0.46em] text-[clamp(3rem,13vw,9rem)] font-semibold leading-[0.9] tracking-[-0.045em]"
            initial={reduced ? false : { opacity: 0, y: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: EASE_EXPO, delay: 0.25 }}
            style={{ textShadow: "0 4px 40px rgba(5,6,11,0.9)" }}
          >
            {profile.heroName}
            <span className="text-brand">.</span>
          </motion.h1>

          <motion.p
            className="mono mt-3 pl-[0.28em] text-[clamp(0.6rem,1.5vw,0.95rem)] font-light uppercase tracking-[0.24em] text-white/70 sm:tracking-[0.34em]"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_EXPO, delay: 0.55 }}
          >
            {profile.heroRole}
          </motion.p>
        </motion.div>

        {/* ---------- Scroll-revealed positioning line ---------- */}
        {!reduced && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
            style={{ opacity: lineOpacity, scale: lineScale }}
          >
            <p className="headline headline-xl max-w-[18ch] font-light text-white">
              {hero.scrollHeadline[0]}
              <br />
              <span className="font-bold">{hero.scrollHeadline[1]}</span>
            </p>
            <p className="accent mt-6 max-w-md text-[clamp(1rem,1.6vw,1.4rem)] text-white/70">
              {hero.scrollTag}
            </p>
          </motion.div>
        )}

        {/* Reduced motion still needs the positioning line — statically. */}
        {reduced && (
          <div className="absolute inset-x-0 bottom-10 z-20 px-6 text-center">
            <p className="lede mx-auto max-w-xl">{hero.scrollTag}</p>
          </div>
        )}

        {/* ---------- Scroll hint ---------- */}
        {!reduced && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-2"
            style={{ opacity: hintOpacity }}
          >
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/45">
              {hero.scrollHint}
            </span>
            <IconArrowDown className="size-4 animate-bob text-white/45" />
          </motion.div>
        )}
      </div>
    </section>
  );
}

/** Availability chip. `live` gets the pulsing dot; the second one stays calm. */
function StatusChip({ label, live = false }: { label: string; live?: boolean }) {
  return (
    <span className="mono inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-void/50 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white/70 backdrop-blur-sm">
      <span aria-hidden="true" className="relative flex size-1.5 items-center justify-center">
        {live && <span className="absolute inset-0 animate-ring-out rounded-full bg-brand" />}
        <span
          className={`relative size-1.5 rounded-full ${live ? "animate-pulse-dot bg-brand" : "bg-white/35"}`}
        />
      </span>
      {label}
    </span>
  );
}
