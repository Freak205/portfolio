/**
 * "#22D3EE" → "34 211 238".
 *
 * Space-separated channels rather than a colour string, so a single accent from
 * content/site.ts can be dropped into `rgb(… / <alpha>)` at any opacity without
 * needing a second value defined for every tint.
 */
export function rgbChannels(hex: string): string {
  const clean = hex.replace("#", "").trim();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;

  const n = Number.parseInt(full, 16);
  if (Number.isNaN(n)) return "91 91 240"; // brand indigo

  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}
