import Image from "next/image";
import { about, profile } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import Counter from "@/components/motion/Counter";
import ScrubText from "@/components/motion/ScrubText";
import Headline from "@/components/ui/Headline";

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Parallax distance={26} reverse>
            <Portrait />
          </Parallax>
        </Reveal>

        <div>
          <Headline
            kicker={about.label}
            light={about.headingLight}
            bold={about.headingBold}
          />

          <div className="mt-7 space-y-5">
            {about.paragraphs.map((paragraph, i) => (
              <ScrubText
                key={i}
                className="text-[1.0625rem] leading-[1.75] text-white/85"
              >
                {paragraph}
              </ScrubText>
            ))}
          </div>

          <Reveal delay={0.1}>
            <dl className="mt-10 grid grid-cols-3 gap-4">
              {about.stats.map((stat) => (
                <div key={stat.label} className="panel px-4 py-5 md:px-5">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="mono block text-[clamp(1.75rem,3.4vw,2.5rem)] font-bold leading-none">
                      <Counter value={stat.value} />
                    </span>
                    <span className="mt-2.5 block text-[11px] leading-snug text-white/40">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.14}>
            <dl className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {about.credentials.map((row) => (
                <div key={row.label} className="grid gap-1.5 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/30">
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
 * Portrait slot. Set `about.image.src` in content/site.ts to a file in /public
 * (for example "/anirudh-desk.jpg") and this renders the real photo.
 */
function Portrait() {
  return (
    <figure className="relative">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--line)] bg-panel">
        {about.image.src ? (
          <Image
            src={about.image.src}
            alt={about.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 460px"
            className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
          />
        ) : (
          <>
            <div aria-hidden="true" className="dotgrid absolute inset-0" />
            <div aria-hidden="true" className="bloom left-1/2 top-1/2 size-[22rem] -translate-x-1/2 -translate-y-1/2 opacity-25" />
            <div
              aria-hidden="true"
              className="absolute inset-x-10 bottom-0 top-[20%] rounded-t-full border border-[var(--line-strong)]"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
              <span className="rounded-full border border-[var(--line-strong)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                Photo placeholder
              </span>
              <span className="max-w-[15rem] text-[11px] leading-relaxed text-white/30">
                Drop a file in /public and set about.image.src in content/site.ts
              </span>
            </div>
          </>
        )}
      </div>

      <figcaption className="mt-4 flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.14em] text-white/30">
        <span>{profile.fullName}</span>
        <span className="text-brand-soft">{profile.locationShort}</span>
      </figcaption>
    </figure>
  );
}
