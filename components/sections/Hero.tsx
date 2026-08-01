"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { hero, profile } from "@/content/site";
import { EASE_EXPO } from "@/lib/motion";
import { IconArrowDown } from "@/components/ui/Glyph";

/**
 * Full-bleed portrait that scales as you scroll while the name fades out and
 * the positioning line fades in over it.
 *
 * The section is 200vh tall and the visual is sticky inside it, so the whole
 * transition is driven by scroll position rather than by a timer. Under
 * `prefers-reduced-motion` the section collapses to a single static screen.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  const imageScale = useTransform(progress, [0, 1], [1, 1.55]);
  const imageOpacity = useTransform(progress, [0, 0.75, 1], [1, 0.5, 0.18]);
  const nameOpacity = useTransform(progress, [0, 0.28], [1, 0]);
  const nameY = useTransform(progress, [0, 0.35], [0, -70]);
  const lineOpacity = useTransform(progress, [0.24, 0.5, 0.92, 1], [0, 1, 1, 0]);
  const lineScale = useTransform(progress, [0.24, 0.6], [0.88, 1]);
  const hintOpacity = useTransform(progress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className={`relative ${reduced ? "" : "h-[200svh]"}`}
    >
      <div className="sticky top-0 flex h-svh w-full items-center justify-center overflow-hidden">
        {/* ---------- Portrait ---------- */}
        <motion.div
          className="absolute inset-0"
          style={reduced ? undefined : { scale: imageScale, opacity: imageOpacity }}
        >
          {hero.image.src ? (
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          ) : (
            <PortraitPlaceholder />
          )}

          {/* Legibility scrims — top for the nav, bottom for the name. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-void/85 via-transparent to-void"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent"
          />
        </motion.div>

        {/* ---------- Name ---------- */}
        <motion.div
          className="relative z-10 flex w-full flex-col items-center px-6 pb-4 text-center"
          style={reduced ? undefined : { opacity: nameOpacity, y: nameY }}
        >
          <motion.h1
            id="hero-heading"
            className="headline text-[clamp(3.5rem,15vw,11rem)] font-semibold leading-[0.9] tracking-[-0.045em]"
            initial={reduced ? false : { opacity: 0, y: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: EASE_EXPO, delay: 0.1 }}
            style={{ textShadow: "0 0 60px rgba(0,0,0,0.55)" }}
          >
            {profile.heroName}
            <span className="text-brand">.</span>
          </motion.h1>

          <motion.p
            className="mt-3 pl-[0.28em] text-[clamp(0.62rem,1.5vw,1rem)] font-light uppercase tracking-[0.28em] text-white/70 sm:tracking-[0.42em]"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_EXPO, delay: 0.42 }}
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
            <p className="accent mt-6 max-w-md text-[clamp(1.05rem,1.6vw,1.4rem)] text-white/70">
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
            className="absolute inset-x-0 bottom-7 z-20 flex flex-col items-center gap-2"
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
 * Stand-in for the portrait. Deliberately says what it is — swap it by setting
 * `hero.image.src` in content/site.ts to a file in /public.
 */
function PortraitPlaceholder() {
  return (
    <div className="absolute inset-0 bg-base">
      <div aria-hidden="true" className="dotgrid absolute inset-0" />
      <div
        aria-hidden="true"
        className="bloom left-1/2 top-1/3 size-[46rem] -translate-x-1/2 opacity-45"
      />
      <div
        aria-hidden="true"
        className="bloom left-[18%] top-[62%] size-[26rem] opacity-25"
        style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 aspect-[3/4] w-[min(58vw,26rem)] -translate-x-1/2 -translate-y-[56%] rounded-[999px_999px_2rem_2rem] border border-[var(--line-strong)]"
      />
      <div className="absolute inset-x-0 top-[26%] flex flex-col items-center gap-3 px-6 text-center">
        <span className="rounded-full border border-[var(--line-strong)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
          Photo placeholder
        </span>
        <span className="max-w-xs text-[11px] leading-relaxed text-white/35">
          Drop a tall portrait into /public and set hero.image.src in content/site.ts
        </span>
      </div>
    </div>
  );
}
