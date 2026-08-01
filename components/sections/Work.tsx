import Link from "next/link";
import { projects, workSection } from "@/content/site";
import { rgbChannels } from "@/lib/color";
import Tilt from "@/components/motion/Tilt";
import Spotlight from "@/components/motion/Spotlight";
import Headline from "@/components/ui/Headline";
import Preview from "@/components/ui/Preview";
import { IconArrowUpRight } from "@/components/ui/Glyph";

/**
 * The two flagships, and only the two. Personal projects live in <Lab /> below
 * so that this section stays the strongest claim on the page rather than a list
 * everything gets added to.
 */
export default function Work() {
  return (
    <section id="work" className="relative scroll-mt-24 py-20 md:py-32">
      <div className="shell">
        <Headline
          kicker={workSection.label}
          light={workSection.headingLight}
          bold={workSection.headingBold}
          intro={workSection.intro}
        />

        <div className="mt-12 grid gap-4 md:mt-18 md:gap-5 lg:grid-cols-2">
          {projects.map((project, i) => {
            const channels = rgbChannels(project.accent);

            return (
              <Tilt key={project.slug} index={i % 2} strength={4} sheen={false}>
                <Link
                  href={`/work/${project.slug}`}
                  data-cursor="Case study"
                  className="group block h-full"
                >
                  <Spotlight
                    color={channels}
                    size="26rem"
                    className="panel panel-hover h-full overflow-hidden rounded-[1.25rem] p-4 md:p-5"
                  >
                    {/* Index and live status, set as machine output. */}
                    <div className="mb-4 flex items-center justify-between gap-4 px-1.5">
                      <span className="mono text-[11px] font-semibold tabular-nums text-white/25">
                        {project.index}
                      </span>
                      <span
                        className="mono inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: project.accent }}
                      >
                        <span
                          aria-hidden="true"
                          className="animate-pulse-dot size-1.5 rounded-full"
                          style={{ backgroundColor: project.accent }}
                        />
                        Live
                      </span>
                    </div>

                    <Preview
                      image={project.cover}
                      urlLabel={project.liveLabel}
                      seed={Number(project.index)}
                      sizes="(max-width: 1024px) 92vw, 620px"
                    />

                    <div className="flex items-end justify-between gap-5 px-1.5 pb-1 pt-6">
                      <div className="min-w-0">
                        <h3 className="truncate text-2xl font-semibold tracking-tight transition-colors duration-400 group-hover:text-white md:text-[1.75rem]">
                          {project.name}
                        </h3>
                        <p className="mono mt-1.5 truncate text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* The accent fills the disc from nothing on hover, so the
                          arrow flips to dark type against it. */}
                      <span
                        aria-hidden="true"
                        className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-full border border-[var(--line-strong)] text-white/70 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-transparent group-hover:text-void"
                      >
                        <span
                          className="absolute inset-0 scale-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
                          style={{ backgroundColor: project.accent }}
                        />
                        <IconArrowUpRight className="relative size-[18px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45" />
                      </span>
                    </div>

                    {/* Accent rule that runs the width of the card on hover. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                      style={{ backgroundColor: project.accent, opacity: 0.6 }}
                    />
                  </Spotlight>
                </Link>
              </Tilt>
            );
          })}
        </div>
      </div>
    </section>
  );
}
