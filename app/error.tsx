"use client";

import { useEffect } from "react";
import Pill from "@/components/ui/Pill";
import { contact } from "@/content/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Render streams stdout/stderr into the service log — this is where it lands.
    console.error("[app] Unhandled error:", error);
  }, [error]);

  return (
    <section className="flex min-h-svh items-center pt-[64px] md:pt-[72px]">
      <div className="shell max-w-2xl py-20">
        <p className="kicker">Something broke</p>
        <h1 className="headline headline-lg mt-5">
          <span className="headline-light">That didn&rsquo;t</span>{" "}
          <span className="headline-bold">load.</span>
        </h1>
        <p className="lede mt-5">
          An unexpected error stopped this page from rendering. Try again — if it keeps happening,
          email me and I&rsquo;ll fix it.
        </p>

        {error.digest && (
          <p className="mt-5 text-[11px] uppercase tracking-[0.14em] text-white/25">
            Reference: {error.digest}
          </p>
        )}

        <div className="mt-9 flex flex-wrap gap-3">
          <Pill variant="white" size="lg" onClick={reset}>
            Try again
          </Pill>
          <Pill variant="outline" size="lg" href={`mailto:${contact.email}`} external>
            Email me
          </Pill>
        </div>
      </div>
    </section>
  );
}
