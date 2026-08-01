import Link from "next/link";
import { projects, sideProject, workSection } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import Tilt from "@/components/motion/Tilt";
import Headline from "@/components/ui/Headline";
import Preview from "@/components/ui/Preview";
import { IconArrowUpRight } from "@/components/ui/Glyph";

export default function Work() {
  return (
    <section id="work" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <Headline
          kicker={workSection.label}
          light={workSection.headingLight}
          bold={workSection.headingBold}
          intro={workSection.intro}
        />

        <div className="mt-14 grid gap-5 md:mt-18 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Tilt key={project.slug} index={i % 2} strength={5}>
              <Link
                href={`/work/${project.slug}`}
                className="panel panel-hover group block h-full overflow-hidden p-4 md:p-5"
                data-cursor="Case study"
              >
                <Preview
                  image={project.cover}
                  urlLabel={project.liveLabel}
                  seed={Number(project.index)}
                  sizes="(max-width: 1024px) 92vw, 620px"
                />

                <div className="flex items-end justify-between gap-6 px-1.5 pb-1 pt-6">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight transition-colors duration-400 group-hover:text-white md:text-[1.75rem]">
                      {project.name}
                    </h3>
                    <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
                      {project.subtitle}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="grid size-11 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] text-white/70 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-brand group-hover:bg-brand group-hover:text-white"
                  >
                    <IconArrowUpRight className="size-[18px]" />
                  </span>
                </div>
              </Link>
            </Tilt>
          ))}
        </div>

        {sideProject.show && (
          <Reveal delay={0.1}>
            <a
              href={sideProject.href}
              target="_blank"
              rel="noopener noreferrer"
              className="panel panel-hover group mt-5 block p-7 md:p-9"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
                <div className="max-w-2xl">
                  <p className="kicker">{sideProject.label}</p>
                  <h3 className="mt-3 flex flex-wrap items-baseline gap-x-3 text-2xl font-semibold tracking-tight">
                    {sideProject.name}
                    <span className="accent text-base text-white/45">{sideProject.tagline}</span>
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/55">
                    {sideProject.body}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {sideProject.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-[var(--line)] px-3 py-1 text-[11px] text-white/45"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <span className="inline-flex shrink-0 items-center gap-2.5 text-[12px] text-white/50 transition-colors duration-400 group-hover:text-white">
                  {sideProject.hrefLabel}
                  <span className="grid size-9 place-items-center rounded-full border border-[var(--line-strong)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                    <IconArrowUpRight className="size-4" />
                  </span>
                </span>
              </div>
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
