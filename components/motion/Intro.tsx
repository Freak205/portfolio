"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import { EASE_EXPO } from "@/lib/motion";
import { profile } from "@/content/site";

const DURATION_MS = 1400;

/**
 * First-visit intro curtain. Plays once per browser session — the inline script
 * in app/layout.tsx stamps `intro-done` on <html> for repeat visits and for
 * reduced-motion visitors, and CSS hides this instantly in that case, so there
 * is no flash and no wasted wait.
 *
 * The page content is already in the DOM behind it: this is decoration, not a
 * loading gate.
 */
export default function Intro() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");

  /*
     The percentage readout is a motion value, not React state. This counter
     ticks every frame for the whole 1.4s of the curtain — which is precisely
     the window in which the app is hydrating, Lenis is initialising and the
     hero's own entrance is running. Re-rendering this component sixty times a
     second through that was competing with all of it for the main thread.
     framer-motion writes a motion value straight into the text node.
  */
  const count = useMotionValue(0);
  const readout = useTransform(count, (v) => String(Math.round(v)).padStart(3, "0"));

  useEffect(() => {
    if (document.documentElement.classList.contains("intro-done") || reduced) {
      setPhase("done");
      document.documentElement.classList.add("intro-done");
      return;
    }

    setPhase("playing");
    document.body.style.overflow = "hidden";

    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const p = Math.min(1, (now - start) / DURATION_MS);
      count.set((1 - Math.pow(1 - p, 3)) * 100);
      if (p < 1) frame = requestAnimationFrame(tick);
    });

    const timer = window.setTimeout(() => {
      setPhase("done");
      document.documentElement.classList.add("intro-done");
      try {
        sessionStorage.setItem("intro-seen", "1");
      } catch {
        /* storage blocked — the intro simply plays again next time */
      }
      document.body.style.overflow = "";
    }, DURATION_MS + 100);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [reduced, count]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="intro"
          aria-hidden="true"
          className="intro-curtain fixed inset-0 z-[99] flex flex-col justify-between bg-void px-6 py-8 md:px-12 md:py-12"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.95, ease: EASE_EXPO } }}
        >
          <div className="flex items-start justify-between text-[10px] uppercase tracking-[0.2em] text-white/30">
            <span>{profile.locationShort}</span>
            <span>Portfolio — {new Date().getFullYear()}</span>
          </div>

          <div className="overflow-hidden">
            <motion.p
              className="headline headline-xl font-semibold"
              initial={{ y: "110%" }}
              animate={phase === "playing" ? { y: "0%" } : {}}
              transition={{ duration: 1, ease: EASE_EXPO, delay: 0.05 }}
            >
              {profile.heroName}
              <span className="text-brand">.</span>
            </motion.p>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="relative h-px flex-1 bg-[var(--line)]">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan to-brand"
                initial={{ width: "0%" }}
                animate={phase === "playing" ? { width: "100%" } : {}}
                transition={{ duration: DURATION_MS / 1000, ease: [0.33, 1, 0.68, 1] }}
              />
            </div>
            <motion.span className="text-sm tabular-nums text-white/40">
              {readout}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
