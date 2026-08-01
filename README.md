# Portfolio — Ineedi Venkata Sai Anirudh

A personal portfolio written for two audiences at once — **hiring teams and
clients**. A drawn hero that scales on scroll, services, a technology marquee,
two full case studies for the live client platforms, a Lab section for personal
engineering projects (with case studies of their own), an experience timeline,
and a working contact form with a lane for each audience.

There are **no photographs of the subject anywhere on the site.** The hero and
the About panel are both drawn in markup — see *How the hero works* below.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion · Lenis · Zod. No paid services required to run or deploy.

---

## 1. Run it locally

```bash
npm install
cp .env.example .env.local   # optional — the site runs without it
npm run dev
```

Open <http://localhost:3000>.

| Command             | What it does               |
| ------------------- | -------------------------- |
| `npm run dev`       | Dev server with hot reload |
| `npm run build`     | Production build           |
| `npm start`         | Serve the production build |
| `npm run typecheck` | TypeScript, no emit        |
| `npm run lint`      | ESLint                     |

---

## 2. Edit the content

**Everything visible on this site lives in one file: [`content/site.ts`](content/site.ts).**
No copy is hard-coded in components. Open it and search for:

- `EDIT:` — fields you will probably want to change
- `CONFIRM:` — facts taken from your resume / project docs, worth a second look

### Check these before you publish

| Where                    | What                                                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `lab[1].repoUrl`         | **`undefined`.** Project Steer has no public repository URL yet, so its card shows `linkNote` instead of a link. Set `repoUrl` + `repoLabel` and the buttons appear on the card *and* the case study automatically. |
| `contact.linkedin`       | **Placeholder URL.** Copy your real profile URL from the address bar. Everything else in `contact` came from your resume.                      |
| `siteUrl`                | Your production domain. Override with `NEXT_PUBLIC_SITE_URL` on Vercel rather than editing the file. Unset, it falls back to your `.vercel.app` domain. |
| `projects[0].context` + `experience[1].company` | Both say **RADIENT AI PVT LTD**. Your resume lists **Boltzmann Labs** for the CLINVARA engagement. Pick the one that is correct for public use. |
| `profile.openToRoles` / `openToFreelance` | Both **`true`.** These two switches drive the hero status chips, the About plate, the two Contact lanes, the `seeks` JSON-LD and the OG card badge. Flip either off and every one of those updates. |
| `awardsSection.show`     | **`false`.** Your resume lists no awards, so nothing was invented. The section is fully built — add real entries to `awards` and flip this to `true`. |
| `testimonials`           | Three empty slots. They render as clearly-reserved cards until you add a real quote. It is no longer in the header nav — six items was the ceiling and Lab earned the slot. |
| `projects[*].cover`      | **Done.** Real captures of both live sites are in `/public/work/`. See below to re-shoot them.                                                 |
| `/public/resume.pdf`     | A copy of `Anirudh_Resume_PL.pdf`, behind the **Resume** and **Download CV** buttons. Note it currently leads with ML/research positioning while the site leads with full-stack — replace the file if you want them aligned. Set `contact.resumeUrl = null` to hide both buttons. |

### Adding a testimonial

Fill in one slot and the card becomes a real quote automatically:

```ts
{
  quote: "He shipped the whole platform on his own and still answers the phone.",
  name: "Full Name",
  role: "Founder, Company",
  meta: "March 2026 · Worked with Anirudh on the same team",
  reservedFor: "",   // ignored once `quote` is set
}
```

Set `testimonialsSection.show = false` to hide the section entirely.

### Adding a personal project

`lab` in [`content/site.ts`](content/site.ts) drives the **Lab** section and the
`/lab/[slug]` pages. One flag decides how much page a project gets:

```ts
caseStudy: true   // → its own page at /lab/<slug>, listed in sitemap.xml
caseStudy: false  // → card only; the card links straight to `repoUrl`
```

`caseStudy: true` requires `overview`, `problem`, `approach`, `highlights`,
`engineering` and `stack`; `limitations` and `next` are optional but both
sections render if present, and they are the reason the pages read as
engineering rather than marketing. `caseStudy: false` exists so a project with
no verified detail (ForgeLens, currently) can still appear without a page padded
out to fill the template.

The section order is deliberate: **Selected Work** carries the two client
platforms and stays the strongest claim on the page; **Lab** sits below it. Add
a personal project to `lab`, never to `projects`.

### Screenshots

Eight captures of the two live platforms already ship in
[`public/work/`](public/work/) — WebP, ~470 KB in total, at the exact
dimensions the frames expect:

| File                        | Page                                     |
| --------------------------- | ---------------------------------------- |
| `clinvara-home.webp`        | clinvara.global — homepage (cover)       |
| `clinvara-product.webp`     | Acne Reset Serum product page            |
| `clinvara-shop.webp`        | Shop listing with filters                |
| `clinvara-routines.webp`    | Routine finder                           |
| `southeast-home.webp`       | southeastmedia.in — homepage (cover)     |
| `southeast-verticals.webp`  | Verticals index — the seven disciplines  |
| `southeast-films.webp`      | Films vertical — in-house reel           |
| `southeast-contact.webp`    | Enquiry form                             |

Everything here is a page anyone can open, which is the point — the CLINVARA
admin console is behind auth, so no frame claims to show it.

To replace or add one:

1. Drop the file into `public/work/` (there is a [README](public/work/README.md) there too).
2. Set `src`, `width` and `height` on the matching image entry:

```ts
cover: {
  src: "/work/clinvara-home.png",   // was null
  alt: "CLINVARA storefront homepage",
  caption: "CLINVARA — storefront homepage",
  width: 1600,
  height: 1000,
},
```

Leave `src: null` and you get a clearly-labelled placeholder. Nothing breaks
either way — this is safe to ship as-is and fill in later.

### Adding a technology chip

`arsenal` in `content/site.ts` names [simple-icons](https://simpleicons.org)
slugs. Logos and brand colours are pulled automatically. To use a logo that is
not already bundled, add its named import to
[`lib/brand-icons.ts`](lib/brand-icons.ts) — only the icons listed there ship to
the browser. An unknown slug is not an error: the chip falls back to a
lettermark.

### Changing the look

The palette is a handful of custom properties at the top of
[`app/globals.css`](app/globals.css). Change `--color-brand` and the whole site
re-tunes — buttons, the progress bar, hovers, focus rings, icon accents.

### Type

Two faces, both engineering-flavoured, loaded in
[`app/layout.tsx`](app/layout.tsx).

**Space Grotesk** sets headings *and* body. Its flat-sided `S`, squared curves
and angular `g` give the page a technical voice at display sizes without making
body copy hard to read.

**JetBrains Mono** is reserved for strings that should look like machine
output — section labels (`.kicker`), dates, counters, indices, URLs, status
chips, technology chips. Apply it with the `.mono` utility, which also turns on
tabular figures so columns of numbers line up.

**Keep the mono on short strings.** Monospace is measurably slower to read, so
it earns a label or a date and costs real comprehension in a paragraph. If you
find yourself reaching for `.mono` on something longer than a few words, that
is the signal to stop.

`.accent` is the one soft spot in the system: mono at slight negative tracking,
for a tagline or a single emphasised clause. Never a whole paragraph.

---

## 3. The contact form

The **Send a message** button opens an accessible dialog (focus trap, Escape to
close, focus restored on exit) containing the form.
`POST /api/contact` → validate → rate limit → deliver.

- **Validation** — Zod on the server, mirrored on the client so errors appear instantly.
- **Spam** — a hidden honeypot field plus a 5-per-10-minutes per-IP limit.
- **Secrets** — read from `process.env` inside a route handler. Nothing reaches the browser.

### Transports

Both optional. Every configured transport is attempted; the submission succeeds
if at least one works.

**Email via Resend** — free tier, no card required.

```bash
RESEND_API_KEY=re_xxxxxxxx
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL=   # optional; defaults to Resend's shared sender
```

The default sender (`onboarding@resend.dev`) works without verifying a domain,
so this path stays genuinely free. Swap it once you verify your own domain.

**Webhook** — POSTs each enquiry as JSON. Slack and Teams incoming webhooks
accept the payload unchanged.

```bash
CONTACT_WEBHOOK_URL=https://hooks.slack.com/services/...
```

**With neither set**, the form still works end-to-end and the enquiry is written
to the server log. Fine for testing a deployment — set one before you start
sending people to the site.

Delivery logic lives in [`lib/contact-delivery.ts`](lib/contact-delivery.ts).

---

## 4. Deploy to Vercel

Zero config — Vercel detects Next.js and builds it correctly on its own. There
is no `vercel.json`, and none is needed.

1. Push this repository to GitHub (it is already wired to
   [`Freak205/portfolio`](https://github.com/Freak205/portfolio)).
2. Vercel dashboard → **Add New → Project** → import the repo.
3. Leave the framework preset (Next.js), build command and output directory
   alone.
4. Add the environment variables you want from [`.env.example`](.env.example) —
   all of them are optional for a first deploy.
5. Deploy. Every push to `main` ships automatically; pull requests get preview
   URLs.

### About `NEXT_PUBLIC_SITE_URL`

Read at **build** time, not run time — the pages are prerendered. You can leave
it unset: the build falls back to `VERCEL_PROJECT_PRODUCTION_URL`, so canonical
URLs, `sitemap.xml`, `robots.txt` and the social preview point at your real
`.vercel.app` domain rather than a placeholder.

Set it explicitly once you attach a custom domain, then **redeploy** — changing
it does not take effect until the next build.

### Deploying somewhere else

[`render.yaml`](render.yaml) is still in the repository, so Render's
**New → Blueprint** flow also works unchanged. Any Node host works with
`npm ci && npm run build` and `npm start`.

---

## 5. What's in the box

```
app/
  layout.tsx            Fonts, metadata, Person JSON-LD, shell
  page.tsx              Home — composes the nine sections
  work/[slug]/page.tsx  Client case studies (static per project)
  lab/[slug]/page.tsx   Personal project case studies (static per project)
  api/contact/route.ts  Form endpoint
  not-found.tsx         Custom 404
  error.tsx             Runtime error boundary
  loading.tsx           Route loading state
  opengraph-image.tsx   Social card, generated at build time
  icon.svg              Favicon
  sitemap.ts robots.ts  Generated from content/site.ts
components/
  sections/             Hero, Services, Arsenal, Work, Lab, Awards, About,
                        Experience, Testimonials, Contact (+ ContactForm)
  layout/               Header (+ mobile nav), Footer, back-to-top
  motion/               StackSigil, Kinetic, ScrubText, Tilt, Assemble, Spine,
                        Aurora, Reveal, Parallax, Magnetic, Marquee, Counter,
                        Cursor, ScrollProgress, Intro, SmoothScroll
  ui/                   Headline, Pill, Preview, Field, Modal, Glyph
content/site.ts         ← all copy and data
lib/                    motion tokens, brand icons, scroll, rate limit,
                        delivery, OG
```

### How the hero works

The section is `200svh` tall with a sticky visual inside it, so the plate scale,
the name fade and the positioning line are all driven by scroll position rather
than a timer. Under `prefers-reduced-motion` the section collapses to a single
static screen with the positioning line already visible.

Inside the plate is
[`StackSigil`](components/motion/StackSigil.tsx) — one inline SVG on a 400×500
field drawing three isometric planes (interface, logic, data) with a pulse
running the spine between them. It replaced a portrait photograph on purpose: it
makes the site's actual claim in the first second, ships no image bytes, is
correct before any font or asset has loaded, and leans toward the pointer.

Two numbers in it are load-bearing. The planes sit at `y = 126 / 204 / 282`
because the plate's lower **30%** is under the gradient the name is set across —
move the layers down or lengthen that gradient and the bottom plane draws into a
fade. And the labels are anchored at `x = 392` with `HALF_W = 88`, which leaves
just enough room for the longest of them (`INTERFACE`) at 8.5px mono; widen the
planes and it clips.

The About panel is the same idea at a different job — a drawn spec plate listing
the kinds of site I build, rather than a face.

### The motion layer

The site moves like a title sequence rather than a document. Four primitives do
most of that work, and every one of them is a plain element under
`prefers-reduced-motion`:

| Primitive  | What it does                                                                |
| ---------- | --------------------------------------------------------------------------- |
| `Kinetic`   | Headline type arrives word by word, out of focus and skewed, then resolves. The blur is what reads as motion blur. |
| `ScrubText` | Body copy writes itself in word by word as you scroll past it. Use it on prose — a fade-up animates a paragraph as one lump and reads as nothing. |
| `Tilt`      | Cards tumble in on a perspective, then lean toward the pointer on a spring, with a light sweep tracking the cursor. |
| `Assemble`  | Grid cards fly in from a scatter and lock into their slots.                 |
| `Spine`     | Timeline rail that draws as you scroll, with a travelling head at the leading edge. |
| `Aurora`    | Two blooms fixed behind the page that drift with scroll and flare when you scroll fast. |

Two constraints worth knowing before you extend this:

- **`Aurora` is fixed at z-0**, so anything real has to sit above it. `<main>`
  and the footer are lifted to `z-10` in [`app/layout.tsx`](app/layout.tsx). A
  new top-level element with no z-index will render *behind* the bloom.
- **Scatter offsets are derived from the index, never randomised.** Random
  values differ between the server and client render, which React reports as a
  hydration mismatch.

The variants live in [`lib/motion.ts`](lib/motion.ts). They animate `filter`,
which is expensive to composite — keep them on short entrances and never leave
an element in a blurred resting state.

### Accessibility and motion

- Skip link is the first tab stop; focus rings are visible on every control.
- Semantic landmarks, labelled form fields, `aria-invalid` + `role="alert"` on errors.
- The contact dialog traps Tab, closes on Escape, and restores focus on exit.
- `prefers-reduced-motion` disables Lenis, the intro curtain, the cursor, the
  hero scroll choreography, the marquees, the counters and every scroll reveal.
  Content renders plainly — nothing is left waiting for an animation that will
  not run.
- The intro curtain plays once per browser session, never on repeat visits.
- Counters keep the true value in the accessible tree while the digits animate.

### Verified

Production build, at 390 / 834 / 1440 px: no horizontal overflow, no console
errors, no broken internal links, every in-page anchor resolves, keyboard tab
order reaches the form, the dialog traps focus, form validation and success
states render, and the contact endpoint returns 200 / 422 / 429 correctly.

---

© Ineedi Venkata Sai Anirudh
