import { about, profile } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import Counter from "@/components/motion/Counter";
import ScrubText from "@/components/motion/ScrubText";
import Spotlight from "@/components/motion/Spotlight";
import Headline from "@/components/ui/Headline";

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-20 md:py-32">
      <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Parallax distance={26} reverse>
            <ProfilePlate />
          </Parallax>
        </Reveal>

        <div>
          <Headline
            kicker={about.label}
            light={about.headingLight}
            bold={about.headingBold}
          />

          {/* The opening line carries the weight; the two after it are asides,
              set smaller so the block reads as one statement, not three. */}
          <ScrubText className="mt-7 text-[1.125rem] leading-[1.65] text-white/85 md:text-[1.375rem] md:leading-[1.55]">
            {about.paragraphs[0]}
          </ScrubText>

          <div className="mt-5 space-y-4">
            {about.paragraphs.slice(1).map((paragraph, i) => (
              <ScrubText
                key={i}
                // These are already set at 55% white, so the default 0.2 resting
                // opacity would compound to ~11% — legible as a shape, not as
                // words. Start them higher and let the scrub do less work.
                from={0.45}
                className="text-[0.9375rem] leading-[1.75] text-white/55"
              >
                {paragraph}
              </ScrubText>
            ))}
          </div>

          <Reveal delay={0.1}>
            <dl className="mt-10 grid grid-cols-3 gap-3 md:gap-4">
              {about.stats.map((stat) => (
                <Spotlight
                  key={stat.label}
                  size="12rem"
                  className="panel rounded-[1.25rem] px-3 py-4 md:px-5 md:py-5"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="mono block text-[clamp(1.5rem,3.4vw,2.5rem)] font-bold leading-none">
                      <Counter value={stat.value} />
                    </span>
                    <span className="mt-2.5 block text-[10px] leading-snug text-white/40 md:text-[11px]">
                      {stat.label}
                    </span>
                  </dd>
                </Spotlight>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.14}>
            <dl className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {about.credentials.map((row) => (
                <div
                  key={row.label}
                  className="group grid gap-1.5 py-4 transition-colors duration-500 sm:grid-cols-[8rem_1fr] sm:gap-6"
                >
                  <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/30 transition-colors duration-500 group-hover:text-brand-soft">
                    {row.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-white/70">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * What used to be a portrait.
 *
 * A photograph in this slot told a visitor what I look like, which is the one
 * question nobody arrives with. The plate answers the real one instead — what
 * kinds of site do you actually build — as a spec panel: monogram watermark,
 * ruled index of disciplines, availability strip.
 *
 * It is drawn entirely in markup, so it stays a server component, ships no
 * image bytes, and reflows to the plate's real width rather than a fixed crop.
 */
function ProfilePlate() {
  return (
    <figure className="group relative mx-auto max-w-[22rem] lg:max-w-none">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--line)] bg-panel">
        <div aria-hidden="true" className="dotgrid absolute inset-0 opacity-80" />
        <div
          aria-hidden="true"
          className="bloom left-1/2 top-[38%] size-[20rem] -translate-x-1/2 opacity-30 transition-opacity duration-700 group-hover:opacity-45"
        />

        {/* Corner ticks — an engineering drawing's frame, not a photo's. */}
        <div aria-hidden="true" className="absolute inset-4">
          {[
            "left-0 top-0 border-l border-t",
            "right-0 top-0 border-r border-t",
            "right-0 bottom-0 border-r border-b",
            "left-0 bottom-0 border-l border-b",
          ].map((position) => (
            <span
              key={position}
              className={`absolute size-4 border-[var(--line-strong)] ${position}`}
            />
          ))}
        </div>

        <div className="relative flex h-full flex-col p-6 md:p-7">
          <div className="flex items-center justify-between gap-3">
            <p className="kicker">{about.plate.label}</p>
            <span className="mono text-[9px] uppercase tracking-[0.14em] text-white/25">
              {String(about.plate.disciplines.length).padStart(2, "0")}
            </span>
          </div>

          {/* The plate's subject, where a face used to be: a monogram in a
              lit tile, with the role under it. Without this the upper half of
              the panel was empty and the whole thing read as a list floating in
              a box. */}
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-6">
            <span
              aria-hidden="true"
              className="grid size-20 place-items-center rounded-2xl border border-brand/30 bg-brand/[0.08] text-[2.5rem] font-bold leading-none text-brand-soft shadow-[0_0_60px_-18px_var(--color-brand)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 md:size-24 md:text-[3rem]"
            >
              {about.plate.monogram}
            </span>
            <span className="mono text-[10px] uppercase tracking-[0.22em] text-white/45">
              {profile.heroRole}
            </span>
          </div>

          <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {about.plate.disciplines.map((item, i) => (
              <li
                key={item}
                className="flex items-baseline gap-3 py-2.5 text-[0.8125rem] text-white/70 md:text-sm"
              >
                <span className="mono shrink-0 text-[9px] tabular-nums text-brand-soft/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ul>

          <p className="accent mt-5 text-[11px] leading-relaxed text-white/40">
            {about.plate.note}
          </p>

          {/* HIRING — the availability line, repeated where the eye already is. */}
          {(profile.openToRoles || profile.openToFreelance) && (
            <p className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-white/45">
              <span aria-hidden="true" className="relative flex size-1.5 items-center justify-center">
                <span className="absolute inset-0 animate-ring-out rounded-full bg-brand" />
                <span className="relative size-1.5 animate-pulse-dot rounded-full bg-brand" />
              </span>
              {profile.openToRoles ? "Open to roles" : "Available"}
              {profile.openToRoles && profile.openToFreelance && (
                <>
                  <span aria-hidden="true" className="text-white/20">
                    ·
                  </span>
                  Freelance
                </>
              )}
            </p>
          )}
        </div>
      </div>

      <figcaption className="mt-4 flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.14em] text-white/30">
        <span>{profile.fullName}</span>
        <span className="text-brand-soft">{profile.locationShort}</span>
      </figcaption>
    </figure>
  );
}
