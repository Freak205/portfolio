/**
 * Brand logo registry.
 *
 * Only the icons named here are bundled — a namespace import would pull in all
 * ~3,000 simple-icons. To use a new logo in `arsenal` (content/site.ts):
 *   1. find its slug at https://simpleicons.org
 *   2. add a named import below, e.g. `siRedis`
 *   3. add it to the ICONS map
 *
 * A slug that is not in this map is not an error — the chip falls back to a
 * lettermark in a neutral colour.
 */

import {
  siCss,
  siExpress,
  siFirebase,
  siFramer,
  siGit,
  siGithub,
  siGooglecloud,
  siGraphql,
  siGreensock,
  siHtml5,
  siHuggingface,
  siJavascript,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siPytorch,
  siReact,
  siRender,
  siResend,
  siStripe,
  siTailwindcss,
  siTypescript,
  siVercel,
  siZod,
} from "simple-icons";

export type BrandIcon = { title: string; hex: string; path: string };

export const ICONS: Record<string, BrandIcon> = {
  siCss,
  siExpress,
  siFirebase,
  siFramer,
  siGit,
  siGithub,
  siGooglecloud,
  siGraphql,
  siGreensock,
  siHtml5,
  siHuggingface,
  siJavascript,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siPytorch,
  siReact,
  siRender,
  siResend,
  siStripe,
  siTailwindcss,
  siTypescript,
  siVercel,
  siZod,
};

/**
 * Brand colours that are pure black read as invisible on a dark background.
 * Those get a light override so the mark stays legible.
 */
const DARK_HEXES = new Set(["000000", "0A0A0A", "181717", "0C2451"]);

export function iconColor(hex: string) {
  return DARK_HEXES.has(hex.toUpperCase()) ? "#E7E9EE" : `#${hex}`;
}
