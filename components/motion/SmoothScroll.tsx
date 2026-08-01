"use client";

import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";

/**
 * Lenis smooth scrolling, wired to rAF and exposed on `window.__lenis` so
 * lib/scroll.ts can drive it. Disabled outright when the visitor prefers
 * reduced motion — native scrolling is the accessible default.
 */
export default function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch devices already have good native momentum; leave it alone.
      syncTouch: false,
    });

    window.__lenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // In-page anchors must go through Lenis or they jump instantly.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.button !== 0) return;

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const hash = href.startsWith("#") ? href : href.startsWith("/#") ? href.slice(1) : null;
      if (!hash || hash === "#") return;

      const el = document.querySelector(hash);
      if (!el) return; // different page — let the router handle it

      event.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.3 });
      history.replaceState(null, "", hash);
    };

    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [reduced]);

  return null;
}
