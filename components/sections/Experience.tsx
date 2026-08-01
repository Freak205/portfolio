import { experience, experienceSection } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import Headline from "@/components/ui/Headline";
import { IconArrowUpRight, IconCalendar, IconPin } from "@/components/ui/Glyph";

export default function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <Headline
          kicker={experienceSection.label}
          light={experienceSection.headingLight}
          bold={experienceSection.headingBold}
          align="center"
        />

        {/* Vertical spine with a node per entry. */}
        <ol className="relative mt-14 md:mt-18 md:pl-10">
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-brand via-[var(--line-strong)] to-transparent md:block"
          />

          {experience.map((entry, i) => (
            <li key={`${entry.company}-${entry.role}`} className="relative pb-5 last:pb-0">
              <span
                aria-hidden="true"
                className={`absolute -left-10 top-8 hidden size-[15px] rounded-full border-2 md:block ${
                  entry.kind === "education"
                    ? "border-[var(--line-strong)] bg-void"
                    : "border-brand bg-void"
                }`}
              />

              <Reveal index={i}>
                <article
                  className={`panel panel-hover p-6 md:p-8 ${
                    entry.kind === "education" ? "bg-transparent" : ""
                  }`}
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight md:text-[1.375rem]">
                        {entry.role}
                      </h3>
                      <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-sm text-white/55">
                        {entry.companyUrl ? (
                          <a
                            href={entry.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-medium text-brand-soft transition-colors hover:text-white"
                          >
                            {entry.company}
                            <IconArrowUpRight className="size-3" />
                          </a>
                        ) : (
                          <span className="font-medium text-white/75">{entry.company}</span>
                        )}
                        {entry.mode && (
                          <>
                            <span aria-hidden="true" className="text-white/25">
                              ·
                            </span>
                            <span>{entry.mode}</span>
                          </>
                        )}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3 py-1.5 text-[11px] font-medium text-white/60">
                        <IconCalendar className="size-3.5" />
                        {entry.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3 py-1.5 text-[11px] font-medium text-white/45">
                        <IconPin className="size-3.5" />
                        {entry.location}
                      </span>
                    </div>
                  </div>

                  {entry.bullets.length > 0 && (
                    <ul className="mt-5 space-y-2.5 border-t border-[var(--line)] pt-5">
                      {entry.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 text-[0.9375rem] leading-relaxed text-white/55"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.55em] size-1 shrink-0 rounded-full bg-brand"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
