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
  siFlask,
  siFramer,
  siGit,
  siGithub,
  siGithubactions,
  siGooglecloud,
  siGraphql,
  siGreensock,
  siHtml5,
  siHuggingface,
  siJavascript,
  siMediapipe,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siOpencv,
  siPandas,
  siPostgresql,
  siPytest,
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
  siFlask,
  siFramer,
  siGit,
  siGithub,
  siGithubactions,
  siGooglecloud,
  siGraphql,
  siGreensock,
  siHtml5,
  siHuggingface,
  siJavascript,
  siMediapipe,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siOpencv,
  siPandas,
  siPostgresql,
  siPytest,
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
 * Some brand colours are near-black (GitHub, Vercel, pandas, NumPy) and vanish
 * against this background. Rather than maintaining a list of them by hand, any
 * mark whose relative luminance falls below the threshold is swapped for a
 * near-white — the logo stays recognisable by shape, which is what carries it at
 * 18px anyway.
 */
const MIN_LUMINANCE = 0.06;

function luminance(hex: string) {
  const n = parseInt(hex, 16);
  const channels = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((value) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

export function iconColor(hex: string) {
  return luminance(hex) < MIN_LUMINANCE ? "#E7E9EE" : `#${hex}`;
}
