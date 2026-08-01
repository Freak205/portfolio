import { testimonials, testimonialsSection } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import Headline from "@/components/ui/Headline";
import { IconLinkedin, IconQuote } from "@/components/ui/Glyph";

/**
 * No quotes are invented here. A slot with `quote: null` renders as a clearly
 * reserved card; fill in `quote`, `name`, `role` and `meta` in content/site.ts
 * and the card becomes a real recommendation.
 */
export default function Testimonials() {
  if (!testimonialsSection.show) return null;

  const filled = testimonials.filter((item) => item.quote);
  const allEmpty = filled.length === 0;

  return (
    <section id="testimonials" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <Headline
          kicker={testimonialsSection.label}
          light={testimonialsSection.headingLight}
          bold={testimonialsSection.headingBold}
          align="center"
        />

        {allEmpty && (
          <Reveal delay={0.1}>
            <p className="mt-5 text-center text-sm text-brand-soft">
              {testimonialsSection.emptyNote}
            </p>
          </Reveal>
        )}

        <ul className="mt-14 grid gap-5 md:mt-18 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item, i) => (
            <li key={i}>
              <Reveal index={i % 3} className="h-full">
                <figure className="panel panel-hover relative flex h-full flex-col justify-between gap-6 p-6 md:p-7">
                  <IconQuote
                    className="pointer-events-none absolute right-5 top-5 size-9 text-white/[0.05]"
                  />

                  {item.quote ? (
                    <>
                      <blockquote className="relative text-[0.9375rem] leading-[1.7] text-white/75">
                        &ldquo;{item.quote}&rdquo;
                      </blockquote>
                      <figcaption className="border-t border-[var(--line)] pt-5">
                        <p className="flex items-center gap-2 text-sm font-semibold">
                          {item.name}
                          <IconLinkedin className="size-3.5 text-brand-soft" />
                        </p>
                        {item.role && (
                          <p className="mt-1 text-[12px] leading-snug text-white/45">{item.role}</p>
                        )}
                        {item.meta && (
                          <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-white/25">
                            {item.meta}
                          </p>
                        )}
                      </figcaption>
                    </>
                  ) : (
                    <>
                      <div className="relative space-y-3">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-brand-soft">
                          Reserved
                        </span>
                        <p className="text-[0.9375rem] leading-relaxed text-white/50">
                          {item.reservedFor}
                        </p>
                      </div>
                      <div className="space-y-2 border-t border-[var(--line)] pt-5">
                        {/* Ruled lines standing in for the quote that will go here. */}
                        {[100, 80, 55].map((width) => (
                          <span
                            key={width}
                            aria-hidden="true"
                            className="block h-px bg-[var(--line)]"
                            style={{ width: `${width}%` }}
                          />
                        ))}
                        <p className="pt-2 text-[10px] uppercase tracking-[0.12em] text-white/25">
                          Awaiting a real quote
                        </p>
                      </div>
                    </>
                  )}
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
