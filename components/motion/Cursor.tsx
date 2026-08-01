"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const el = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [role='button'], input, textarea, select, summary, [data-cursor]",
      );
      setActive(Boolean(el));
      setLabel(el?.dataset.cursor ?? null);
    };

    const onLeave = () => setVisible(false);

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
