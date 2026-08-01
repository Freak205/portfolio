# Project screenshots

Real captures of the two live platforms, taken from the production sites and
saved as WebP at the dimensions the frames expect. `content/site.ts` already
points at every one of them.

| File                       | Source page                                        |
| -------------------------- | -------------------------------------------------- |
| `clinvara-home.webp`       | <https://www.clinvara.global>                      |
| `clinvara-product.webp`    | `/shop/acne-reset-serum`                           |
| `clinvara-shop.webp`       | `/shop`                                            |
| `clinvara-routines.webp`   | `/routines`                                        |
| `southeast-home.webp`      | <https://www.southeastmedia.in>                    |
| `southeast-verticals.webp` | `/verticals`                                       |
| `southeast-films.webp`     | `/films`                                           |
| `southeast-contact.webp`   | `/contact`                                         |

Both sites are live, so these go stale when the sites change. Re-shoot at the
same viewport sizes (1600×1000 for covers, 1200×900 for gallery frames) and
overwrite in place — no content change needed.

## How to replace a placeholder

1. Take the screenshot. Full-page browser captures at **1600×1000** (cover) and
   **1200×900** (gallery) match the frames without letterboxing — any ratio
   works as long as you update `width` and `height` to match the real file.
2. Save it here, e.g. `public/work/clinvara-home.png`.
3. In `content/site.ts`, find the matching image entry and set:

   ```ts
   cover: {
     src: "/work/clinvara-home.png",   // was null
     alt: "CLINVARA storefront homepage",
     caption: "CLINVARA — storefront homepage",
     width: 1600,
     height: 1000,
   },
   ```

Leave `src: null` and the site renders a clearly labelled placeholder frame
instead. Nothing breaks either way.

## Format

`.webp` or `.avif` give the smallest files; `.png` and `.jpg` are fine too —
Next.js re-encodes and resizes them at request time. Keep sources under ~1 MB.

## Profile photo

The portrait is not in this folder and is still a placeholder. Put a photo
anywhere in `/public` (e.g. `public/anirudh.jpg`), then set `hero.image.src`
for the full-bleed hero and `about.image.src` for the About section in
`content/site.ts`.
