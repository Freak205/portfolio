"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Fragment, useRef } from "react";
import { hero, profile } from "@/content/site";
import { EASE_EXPO } from "@/lib/motion";
import Hud, { Telemetry } from "@/components/motion/Hud";
import { IconArrowDown } from "@/components/ui/Glyph";

/**
 * The hero is a heads-up display the size of the window.
 *
 * There is no photograph and, deliberately, no card. An earlier version put a
 * 4:5 plate in the middle of the screen with a diagram inside it; it read as an
 * image placeholder and left the rest of the viewport doing nothing. Here the
 * window is the instrument: a ring assembly turning behind the name, corner
 * lock brackets, a tick scale along the top edge, telemetry down both margins,
 * and the name set edge to edge with a scale line above it.
 *
 * Everything is anchored to one box, `.hud-inset` in globals.css, so the chrome
 * lines up with the frame at every width. Nothing is sized in fixed pixels: the
 * name is `clamp(…, min(26vw, 40svh), …)`, so it fills a wide window by width
 * and a short one by height instead of overflowing either.
 *
 * Layer order, and why:
 *
 *   1. base fill
 *   2. blooms — scaled and faded by scroll
 *   3. <Hud /> — grid, reactor, scan lines, pointer reticle. UNTRANSFORMED:
 *      the reticle tracks raw client coordinates, so a scaled ancestor would
 *      slide the hairlines off the real cursor.
 *   4. the frame chrome and the type
 *   5. the positioning line, which resolves over everything as it all leaves
 *
 * The section is 165–200svh with the display sticky inside it, so the whole
 * transition is driven by scroll position rather than a timer. Under
 * `prefers-reduced-motion` it collapses to a single static screen.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  const bloomScale = useTransform(progress, [0, 1], [1, 1.45]);
  const bloomOpacity = useTransform(progress, [0, 0.75, 1], [1, 0.4, 0.1]);
  const hudOpacity = useTransform(progress, [0, 0.32], [1, 0]);
  const stageOpacity = useTransform(progress, [0, 0.3], [1, 0]);
  const stageY = useTransform(progress, [0, 0.35], [0, -70]);
  const lineOpacity = useTransform(progress, [0.24, 0.5, 0.92, 1], [0, 1, 1, 0]);
  const lineScale = useTransform(progress, [0.24, 0.6], [0.88, 1]);
  const hintOpacity = useTransform(progress, [0, 0.12], [1, 0]);

  const letters = Array.from(profile.heroName);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className={`relative ${reduced ? "" : "h-[165svh] md:h-[200svh]"}`}
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        {/* ---------- Ground ---------- */}
        <div aria-hidden="true" className="absolute inset-0 bg-base" />

        {/* Scaled on every scroll frame, so it is promoted once and composited
            from then on. It holds a bloom and a full-viewport vignette; without
            a layer of its own both gradients repaint at a new size each frame.
            The bloom is a painted falloff rather than a `filter: blur()` for
            the same reason — see .bloom in globals.css. */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 will-change-transform"
          style={reduced ? undefined : { scale: bloomScale, opacity: bloomOpacity }}
        >
          {/* One bloom, under the reactor. A second one low-left just made the
              screen feel loaded without adding depth. */}
          <div className="bloom left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 opacity-30 md:size-[62rem]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-void)_100%)]" />
        </motion.div>

        {/* ---------- Instrument ----------
            Kept out of every transform above — see the note on the component. */}
        <motion.div
          className="absolute inset-0"
          style={reduced ? undefined : { opacity: hudOpacity }}
        >
          <Hud />
        </motion.div>

        {/* ---------- Frame + type ---------- */}
        <motion.div
          className="absolute inset-0 z-10"
          style={reduced ? undefined : { opacity: stageOpacity, y: stageY }}
        >
          <div className="hud-inset flex flex-col">
            {/*
               The frame powers up after the name has landed, so the type leads
               and the chrome assembles around it. The opacity keyframes are the
               flicker of a display coming online — three frames, not a strobe.
            */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 border border-cyan/[0.07]"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: reduced ? 1 : [0, 0.6, 0.25, 1] }}
              transition={{ duration: 0.9, ease: "linear", delay: 0.5, times: [0, 0.3, 0.5, 1] }}
            >
              {/* The corners carry the frame. A tick ruler ran along the top
                  edge too and it was one machine-set detail too many next to
                  the system line sitting right under it. */}
              <Bracket className="-left-px -top-px" />
              <Bracket className="-right-px -top-px rotate-90" />
              <Bracket className="-bottom-px -right-px rotate-180" />
              <Bracket className="-bottom-px -left-px -rotate-90" />

              {/* Margin annotations. Hidden on phones, where the padding that
                  would hold them is spent on the type instead. */}
              <div className="absolute inset-y-0 left-0 hidden items-center md:flex">
                <span
                  className="mono text-[10px] uppercase tracking-[0.34em] text-white/25"
                  style={{ writingMode: "vertical-rl", rotate: "180deg" }}
                >
                  {hero.hud.edge}
                </span>
              </div>
              <div className="absolute inset-y-0 right-0 hidden items-center md:flex">
                <span
                  className="mono text-[10px] uppercase tracking-[0.34em] text-white/25"
                  style={{ writingMode: "vertical-rl" }}
                >
                  {hero.hud.stamp}
                </span>
              </div>
            </motion.div>

            {/* ---------- Top rail: system line + availability ---------- */}
            <motion.div
              className="relative flex items-center justify-between gap-4 px-5 pt-6 sm:px-8 md:px-12"
              initial={reduced ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.55 }}
            >
              <span className="mono hidden items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-cyan/50 sm:flex">
                <span className="size-1.5 animate-pulse-dot rounded-full bg-cyan" />
                {hero.hud.code}
              </span>
              {/* HIRING — first thing a recruiter sees, above the fold. */}
              <div className="flex flex-wrap items-center gap-2">
                {profile.openToRoles && <StatusChip label={hero.status.roles} live />}
                {profile.openToFreelance && <StatusChip label={hero.status.freelance} />}
              </div>
            </motion.div>

            {/* ---------- Telemetry ----------
                Sat in the two upper quadrants, which is the space the name does
                not use. The gate is on width *and* height: a narrow window has
                no room beside the type, and a short one needs those ~90px for
                the name rather than for readouts. Dropped, not crushed. */}
            <div className="relative mt-6 hidden items-start justify-between px-5 sm:px-8 xl:px-12 [@media(min-width:1024px)_and_(min-height:760px)]:flex">
              <Telemetry />
              <Telemetry align="right" />
            </div>

            {/* ---------- The name ---------- */}
            <div className="relative flex min-h-0 flex-1 flex-col justify-center px-5 sm:px-8 md:px-12">
              {/* Scale line. It measures the name, which is the point: the
                  thing on the display is the person. */}
              <motion.div
                aria-hidden="true"
                className="flex items-center gap-3 sm:gap-5"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: EASE_EXPO, delay: 0.7 }}
              >
                <span className="h-2.5 w-px bg-cyan/40" />
                <motion.span
                  className="h-px flex-1 origin-right bg-gradient-to-l from-cyan/25 to-transparent"
                  initial={reduced ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.1, ease: EASE_EXPO, delay: 0.7 }}
                />
                <span className="mono text-[10px] uppercase tracking-[0.3em] text-cyan/60 sm:text-[11px]">
                  {hero.hud.dimension}
                </span>
                <motion.span
                  className="h-px flex-1 origin-left bg-gradient-to-r from-cyan/25 to-transparent"
                  initial={reduced ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.1, ease: EASE_EXPO, delay: 0.7 }}
                />
                <span className="h-2.5 w-px bg-cyan/40" />
              </motion.div>

              {/*
                 The name, letter by letter out of its own mask.

                 The negative tracking is a negative margin on the mask rather
                 than `letter-spacing` inside it: letter-spacing shrinks each
                 mask box below its glyph's advance, and `overflow-hidden` then
                 clips the right edge of every letter.
              */}
              <h1
                id="hero-heading"
                aria-label={profile.heroName}
                /*
                   21vw is not a guess. "Anirudh." is 3.95em wide in Space
                   Grotesk, less 0.045em of negative tracking per gap — about
                   3.70em — and the frame leaves roughly 82vw of usable width on
                   a phone, where the margins cost the most. 21 × 3.70 ≈ 78vw,
                   which fills the frame at every width with a little air. The
                   36svh cap is what stops a short laptop from cropping it.
                */
                className="headline mt-3 text-center text-[clamp(2.75rem,min(21vw,36svh),18rem)] font-semibold leading-[0.86] sm:mt-5"
                style={{ textShadow: "0 6px 60px rgba(5,6,11,0.75)" }}
              >
                <span aria-hidden="true" className="flex items-end justify-center">
                  {letters.map((letter, i) => (
                    <span
                      key={`${letter}-${i}`}
                      className="-mr-[0.045em] inline-block overflow-hidden pb-[0.12em]"
                    >
                      <motion.span
                        className="inline-block"
                        initial={reduced ? false : { y: "115%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 1.1, ease: EASE_EXPO, delay: 0.12 + i * 0.055 }}
                      >
                        {letter}
                      </motion.span>
                    </span>
                  ))}
                  <motion.span
                    className="inline-block text-brand"
                    initial={reduced ? false : { opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.7,
                      ease: EASE_EXPO,
                      delay: 0.12 + letters.length * 0.055,
                    }}
                  >
                    .
                  </motion.span>
                </span>
              </h1>

              <motion.p
                className="mono mt-4 text-center text-[clamp(0.6rem,1.5vw,0.95rem)] font-light uppercase tracking-[0.24em] text-white/70 sm:tracking-[0.36em]"
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE_EXPO, delay: 0.6 }}
              >
                {profile.heroRole}
              </motion.p>
            </div>

            {/* ---------- Bottom rail: the three layers ---------- */}
            <motion.div
              className="relative flex flex-col gap-4 px-5 pb-5 sm:px-8 sm:pb-6 md:px-12"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE_EXPO, delay: 0.85 }}
            >
              {/* The rule is built from the gaps between the labels rather than
                  running behind them, so nothing needs an opaque backing plate
                  over the grid. */}
              <ul className="flex items-center gap-3 sm:gap-5">
                <li aria-hidden="true" className="h-px flex-1 bg-[var(--line)]" />
                {hero.layers.map((layer, i) => (
                  <Fragment key={layer.label}>
                    {i > 0 && <li aria-hidden="true" className="h-px flex-1 bg-[var(--line)]" />}
                    <li className="flex items-center gap-2">
                      <span className="mono text-[9px] text-white/25">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="size-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: layer.color, boxShadow: `0 0 12px ${layer.color}55` }}
                      />
                      <span className="mono whitespace-nowrap text-[9px] uppercase tracking-[0.18em] text-white/60 sm:text-[10px] sm:tracking-[0.24em]">
                        {layer.label}
                      </span>
                    </li>
                  </Fragment>
                ))}
                <li aria-hidden="true" className="h-px flex-1 bg-[var(--line)]" />
              </ul>

              <div className="grid grid-cols-3 items-end">
                <span className="mono hidden self-center text-[10px] uppercase tracking-[0.16em] text-white/30 sm:block">
                  {hero.hud.readout}
                </span>

                {!reduced && (
                  <motion.div
                    aria-hidden="true"
                    className="col-start-2 flex flex-col items-center gap-1.5"
                    style={{ opacity: hintOpacity }}
                  >
                    <span className="mono text-[10px] uppercase tracking-[0.28em] text-white/45">
                      {hero.scrollHint}
                    </span>
                    <IconArrowDown className="size-4 animate-bob text-white/45" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
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

        {/* Reduced motion never sees that line, so it gets it statically. */}
        {reduced && (
          <div className="absolute inset-x-0 bottom-4 z-20 px-6 text-center">
            <p className="lede mx-auto max-w-xl">{hero.scrollTag}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Corner lock bracket. One shape, rotated into each corner — the rotation is
 * why it is drawn as a top-left corner and never mirrored.
 */
function Bracket({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      aria-hidden="true"
      className={`absolute size-7 text-cyan/45 sm:size-9 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      <path d="M1 16V1h15" />
    </svg>
  );
}

/** Availability chip. `live` gets the pulsing dot; the second one stays calm. */
function StatusChip({ label, live = false }: { label: string; live?: boolean }) {
  return (
    <span className="mono inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-void/50 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white/70 backdrop-blur-sm">
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
