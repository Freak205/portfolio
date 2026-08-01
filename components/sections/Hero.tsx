"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { hero, profile } from "@/content/site";
import { EASE_EXPO } from "@/lib/motion";
import { IconArrowDown } from "@/components/ui/Glyph";

/**
 * A portrait plate over an out-of-focus field of the same photograph, with the
 * name set across the plate's faded lower edge. Scrolling pushes the whole
 * composition in and fades it out while the positioning line resolves over it.
 *
 * Why a plate rather than a full-bleed photograph:
 *
 * - The source is 800px square. Full-bleed at 100vw means a ~2.5× upscale on a
 *   desktop display, which is exactly the softness a portrait cannot afford.
 *   At plate size the same file renders with resolution to spare.
 * - The subject is in profile, centred. A full-bleed treatment puts the name
 *   straight across his face.
 *
 * The backdrop is a separate 160px copy, blurred at build time. Blur discards
 * detail anyway, so there is nothing to gain from upscaling the full-size image
 * behind it — and a great deal of bandwidth to lose.
 *
 * The section is 165–200svh and the visual is sticky inside it, so the whole
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

  const fieldScale = useTransform(progress, [0, 1], [1.08, 1.4]);
  const fieldOpacity = useTransform(progress, [0, 0.75, 1], [1, 0.45, 0.12]);
  const plateScale = useTransform(progress, [0, 1], [1, 1.14]);
  const stageOpacity = useTransform(progress, [0, 0.3], [1, 0]);
  const stageY = useTransform(progress, [0, 0.35], [0, -70]);
  const lineOpacity = useTransform(progress, [0.24, 0.5, 0.92, 1], [0, 1, 1, 0]);
  const lineScale = useTransform(progress, [0.24, 0.6], [0.88, 1]);
  const hintOpacity = useTransform(progress, [0, 0.12], [1, 0]);

  const hasPhoto = Boolean(hero.image.src);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className={`relative ${reduced ? "" : "h-[165svh] md:h-[200svh]"}`}
    >
      <div className="sticky top-0 flex h-svh w-full items-center justify-center overflow-hidden">
        {/* ---------- Out-of-focus field ---------- */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={reduced ? undefined : { scale: fieldScale, opacity: fieldOpacity }}
        >
          {hasPhoto ? (
            <Image
              src="/portrait-blur.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="scale-110 object-cover object-center opacity-45"
            />
          ) : (
            <div className="absolute inset-0 bg-base">
              <div className="dotgrid absolute inset-0" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-void/90 via-void/55 to-void" />
          <div className="bloom left-1/2 top-1/3 size-[34rem] -translate-x-1/2 opacity-40 md:size-[46rem]" />
        </motion.div>

        {/* ---------- Plate + name ---------- */}
        <motion.div
          className="relative z-10 flex w-full flex-col items-center px-5 text-center"
          style={reduced ? undefined : { opacity: stageOpacity, y: stageY }}
        >
          <motion.figure
            className="relative"
            style={reduced ? undefined : { scale: plateScale }}
            initial={reduced ? false : { opacity: 0, y: 32, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: EASE_EXPO }}
          >
            <div className="relative aspect-[4/5] h-[clamp(15rem,46svh,30rem)] overflow-hidden rounded-2xl border border-[var(--line-strong)] bg-panel">
              {hasPhoto ? (
                <Image
                  src={hero.image.src as string}
                  alt={hero.image.alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 60vw, 22rem"
                  className="object-cover object-center"
                />
              ) : (
                <PortraitPlaceholder />
              )}

              {/* The plate's lower edge dissolves into the page, which is what
                  lets the name sit across it and still be readable. */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-void via-void/75 to-transparent"
              />
            </div>
          </motion.figure>

          <motion.h1
            id="hero-heading"
            // Pulled up so the type crosses the plate's faded edge rather than
            // sitting under it as a caption.
            className="headline -mt-[0.34em] text-[clamp(3rem,13vw,9rem)] font-semibold leading-[0.9] tracking-[-0.045em]"
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

/**
 * Stand-in for the portrait, used only when `hero.image.src` is null.
 */
function PortraitPlaceholder() {
  return (
    <div className="absolute inset-0 bg-base">
      <div aria-hidden="true" className="dotgrid absolute inset-0" />
      <div aria-hidden="true" className="bloom left-1/2 top-1/3 size-[20rem] -translate-x-1/2 opacity-40" />
      <div className="absolute inset-x-0 top-[22%] flex flex-col items-center gap-3 px-5 text-center">
        <span className="rounded-full border border-[var(--line-strong)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
          Photo placeholder
        </span>
        <span className="max-w-[14rem] text-[11px] leading-relaxed text-white/35">
          Set hero.image.src in content/site.ts
        </span>
      </div>
    </div>
  );
}
