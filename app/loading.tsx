import { profile } from "@/content/site";

/**
 * Route-level loading state. Deliberately quiet — the wordmark and a sweep, not
 * a spinner that competes with the page arriving behind it.
 */
export default function Loading() {
  return (
    <div className="flex min-h-svh items-center justify-center pt-[64px] md:pt-[72px]">
      <div className="flex flex-col items-center gap-5">
        <span className="headline text-3xl font-semibold">
          {profile.heroName}
          <span className="text-brand">.</span>
        </span>
        <span className="relative block h-px w-40 overflow-hidden bg-[var(--line)]">
          <span className="animate-loading-sweep absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-cyan to-brand" />
        </span>
        <span className="sr-only" role="status">
          Loading page
        </span>
      </div>
    </div>
  );
}
