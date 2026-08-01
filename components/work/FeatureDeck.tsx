"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { EASE_EXPO, REVEAL_VIEWPORT } from "@/lib/motion";
import { rgbChannels } from "@/lib/color";
import Spotlight from "@/components/motion/Spotlight";
import { IconArrowRight } from "@/components/ui/Glyph";

type Feature = { title: string; body: string };

type Props = {
  features: Feature[];
  /** Hex accent for the active index, rail and glow. */
  accent: string;
};

/**
 * Features as a rail you push through rather than a grid you scroll past.
 *
 * Six features stacked vertically is six paragraphs the visitor has to walk
 * down. Laid sideways, only two or three are on screen at once and moving
 * between them is an action the visitor takes — which is the difference between
 * reading a spec sheet and flipping through one.
 *
 * The same component serves both ends of the range: on a phone it is a native
 * swipeable snap carousel, on a desktop the arrows appear and three cards sit
 * side by side. No breakpoint branch, no duplicated markup, and native scrolling
 * throughout so momentum, trackpads and screen readers all behave.
 */
export default function FeatureDeck({ features, accent }: Props) {
  const scroller = useRef<HTMLUListElement>(null);
  const reduced = useReducedMotion();
  const channels = rgbChannels(accent);

  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [current, setCurrent] = useState(1);

  const sync = useCallback(() => {
    const node = scroller.current;
    if (!node) return;

    const max = node.scrollWidth - node.clientWidth;
    const ratio = max > 0 ? node.scrollLeft / max : 0;

    setProgress(ratio);
    setAtStart(node.scrollLeft < 8);
    setAtEnd(node.scrollLeft > max - 8);

    // Which card is nearest the left edge — the one being read.
    const card = node.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : 1;
    setCurrent(Math.min(features.length, Math.round(node.scrollLeft / step) + 1));
  }, [features.length]);

  useEffect(() => {
    sync();
    const node = scroller.current;
    if (!node) return;

    node.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      node.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  function nudge(direction: 1 | -1) {
    const node = scroller.current;
    if (!node) return;
    const card = node.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : node.clientWidth * 0.8;
    node.scrollBy({ left: step * direction, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <div className="mt-10 md:mt-14">
      {/* ---------- Controls: counter, rail, arrows ---------- */}
      <div className="mb-6 flex items-center gap-5">
        <span className="mono shrink-0 text-[11px] font-semibold tabular-nums text-white/35">
          <span style={{ color: accent }}>{String(current).padStart(2, "0")}</span>
          <span className="px-1 text-white/20">/</span>
          {String(features.length).padStart(2, "0")}
        </span>

        {/* Rail doubles as the scrollbar — it is the only progress indicator,
            since the native bar is hidden. Tracking is intentionally instant:
            it should feel attached to the finger, not chase it. */}
        <div className="h-px flex-1 bg-[var(--line)]">
          <div
            className="h-px origin-left"
            style={{ background: accent, transform: `scaleX(${Math.max(progress, 0.04)})` }}
          />
        </div>

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          {([-1, 1] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              onClick={() => nudge(direction)}
              disabled={direction === -1 ? atStart : atEnd}
              aria-label={direction === -1 ? "Previous features" : "Next features"}
              className="grid size-10 place-items-center rounded-full border border-[var(--line-strong)] text-white/70 transition-all duration-400 hover:border-white/40 hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-25"
            >
              <IconArrowRight className={`size-4 ${direction === -1 ? "rotate-180" : ""}`} />
            </button>
          ))}
        </div>
      </div>

      {/* ---------- The rail ---------- */}
      <ul
        ref={scroller}
        className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-2 md:-mx-10 md:px-10 xl:-mx-14 xl:px-14"
        style={{ scrollPaddingInline: "1.25rem" }}
      >
        {features.map((feature, i) => (
          <motion.li
            key={feature.title}
            className="w-[78%] shrink-0 snap-start sm:w-[54%] lg:w-[calc(33.333%-0.834rem)]"
            initial={reduced ? false : { opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: 0.85, ease: EASE_EXPO, delay: Math.min(i, 3) * 0.08 }}
          >
            <Spotlight
              color={channels}
              size="18rem"
              className="panel panel-hover group h-full overflow-hidden rounded-[1.25rem] p-6 md:p-7"
            >
              <span
                aria-hidden="true"
                className="mono block text-[11px] font-semibold tabular-nums"
                style={{ color: accent }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-4 text-lg font-semibold tracking-tight md:text-xl">
                {feature.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/55">
                {feature.body}
              </p>

              {/* Corner tick — picks up the accent on hover. */}
              <span
                aria-hidden="true"
                className="mt-6 block h-px w-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-16"
                style={{ background: accent, opacity: 0.5 }}
              />
            </Spotlight>
          </motion.li>
        ))}
      </ul>

      <p className="mono mt-4 text-[10px] uppercase tracking-[0.14em] text-white/25 sm:hidden">
        Swipe for more
      </p>
    </div>
  );
}
