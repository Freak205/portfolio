/**
 * Scroll helpers that work whether or not Lenis is running. Lenis is disabled
 * for `prefers-reduced-motion`, so every caller needs the native fallback.
 */

type LenisLike = {
  scrollTo: (target: number | string | HTMLElement, options?: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    __lenis?: LenisLike;
  }
}

export function scrollToTop() {
  if (typeof window === "undefined") return;
  if (window.__lenis) {
    window.__lenis.scrollTo(0, { duration: 1.2 });
    return;
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
}

export function scrollToId(id: string, offset = -80) {
  if (typeof window === "undefined") return;
  const el = document.querySelector(id.startsWith("#") ? id : `#${id}`);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el as HTMLElement, { offset, duration: 1.3 });
    return;
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
}
