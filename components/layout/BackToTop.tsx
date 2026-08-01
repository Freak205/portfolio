"use client";

import { scrollToTop } from "@/lib/scroll";
import { footer } from "@/content/site";

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="group inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--dim)] transition-colors duration-300 hover:text-accent"
    >
      <span className="flex size-8 items-center justify-center rounded-full border border-[var(--line-strong)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-accent group-hover:-translate-y-0.5">
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="size-3 fill-none stroke-current stroke-[1.25]"
        >
          <path d="M8 13V3M8 3 3.5 7.5M8 3l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {footer.backToTopLabel}
    </button>
  );
}
