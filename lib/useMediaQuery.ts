"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribe to a media query without a setState-in-effect round trip.
 * Returns `false` during SSR, so anything gated on this renders nothing on the
 * server and appears after hydration — correct for pointer-only enhancements.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
