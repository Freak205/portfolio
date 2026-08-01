"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { EASE_EXPO, REVEAL_VIEWPORT } from "@/lib/motion";

export type DisclosureItem = {
  title: string;
  body: string;
};

type Props = {
  items: DisclosureItem[];
  /** Index open on first paint. `null` starts fully collapsed. */
  defaultOpen?: number | null;
  /** Accent used by the open row's rule and index. */
  accent?: string;
};

/**
 * A decision log: one row per entry, collapsed to a title until you open it.
 *
 * The point is editorial rather than decorative — four paragraphs of reasoning
 * stacked in the open read as a wall and get skipped, but four titles read as a
 * list of decisions, and the visitor chooses which ones they want the argument
 * for. Only one is open at a time, so the section never grows past a screen.
 *
 * Accessibility: the button owns `aria-expanded`/`aria-controls`, the body is a
 * labelled region, and the toggle is a real <button> so keyboard and screen
 * reader users get the same behaviour as everyone else.
 */
export default function Disclosure({ items, defaultOpen = 0, accent }: Props) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const reduced = useReducedMotion();
  const uid = useId();

  return (
    <div className="border-t border-[var(--line)]">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${uid}-panel-${i}`;
        const buttonId = `${uid}-button-${i}`;

        return (
          <motion.div
            key={item.title}
            className="relative border-b border-[var(--line)]"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: 0.7, ease: EASE_EXPO, delay: i * 0.06 }}
          >
            {/* Accent rule that draws across the open row. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px origin-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                background: accent ?? "var(--color-brand)",
                transform: `scaleX(${isOpen ? 1 : 0})`,
              }}
            />

            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center gap-4 py-6 text-left md:gap-8 md:py-8"
              >
                <span
                  className="mono w-8 shrink-0 text-[11px] font-semibold tabular-nums transition-colors duration-500 md:w-12 md:text-xs"
                  style={{ color: isOpen ? (accent ?? "var(--color-brand-soft)") : undefined }}
                >
                  <span className={isOpen ? "" : "text-white/25"}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>

                <span
                  className={`flex-1 text-lg font-semibold tracking-tight transition-colors duration-500 md:text-2xl ${
                    isOpen ? "text-white" : "text-white/65 group-hover:text-white"
                  }`}
                >
                  {item.title}
                </span>

                {/* Plus that rotates into a minus. Two rules, one of them turns. */}
                <span
                  aria-hidden="true"
                  className="relative grid size-10 shrink-0 place-items-center rounded-full border transition-colors duration-500 md:size-11"
                  style={{
                    borderColor: isOpen ? (accent ?? "var(--color-brand)") : "var(--line-strong)",
                    color: isOpen ? (accent ?? "var(--color-brand)") : undefined,
                  }}
                >
                  <span className="absolute h-px w-3.5 bg-current transition-colors duration-500 md:w-4" />
                  <span
                    className="absolute h-px w-3.5 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:w-4"
                    style={{ transform: `rotate(${isOpen ? 0 : 90}deg)` }}
                  />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  key="panel"
                  initial={reduced ? { height: "auto" } : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? { height: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.55, ease: EASE_EXPO }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-8 pl-12 pr-2 text-[0.9375rem] leading-[1.75] text-white/60 md:pl-20 md:text-[1rem]">
                    {item.body}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
