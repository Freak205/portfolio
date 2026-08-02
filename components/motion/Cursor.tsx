"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * A trailing ring that follows the pointer and swells over interactive
 * elements. The native cursor is deliberately left visible — hiding it costs
 * more in usability than the effect is worth. Mouse pointers only; never
 * rendered on touch devices or under `prefers-reduced-motion`.
 */
export default function Cursor() {
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const enabled = finePointer && !reduced;

  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 34, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 400, damping: 34, mass: 0.35 });

  /*
     Mirrors of the three state values, plus the element the pointer was last
     over. Position rides motion values and never re-renders, but the ring's
     size and label are real React state — and a raw `setState` per
     `pointermove` puts a render on every frame of every mouse movement across
     the whole page, plus a `closest()` walk up the DOM each time. Both only
     ever change when the pointer crosses from one element to another, so that
     is the only thing worth reacting to.
  */
  const over = useRef<EventTarget | null>(null);
  const shown = useRef({ active: false, visible: false, label: null as string | null });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);

      if (!shown.current.visible) {
        shown.current.visible = true;
        setVisible(true);
      }

      // Still over the same node — the hit-test result cannot have changed.
      if (event.target === over.current) return;
      over.current = event.target;

      const el = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [role='button'], input, textarea, select, summary, [data-cursor]",
      );
      const nextActive = Boolean(el);
      const nextLabel = el?.dataset.cursor ?? null;

      if (nextActive !== shown.current.active) {
        shown.current.active = nextActive;
        setActive(nextActive);
      }
      if (nextLabel !== shown.current.label) {
        shown.current.label = nextLabel;
        setLabel(nextLabel);
      }
    };

    const onLeave = () => {
      over.current = null;
      shown.current.visible = false;
      setVisible(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full border border-brand-soft/70 text-[9px] font-medium uppercase tracking-[0.12em] text-brand-soft"
        style={{ translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: label ? 80 : active ? 44 : 26,
          height: label ? 80 : active ? 44 : 26,
          opacity: visible ? (active ? 1 : 0.5) : 0,
          backgroundColor: active ? "rgba(91,91,240,0.14)" : "rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.4 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
