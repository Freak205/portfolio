import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { lab, profile, siteUrl } from "@/content/site";
import { rgbChannels } from "@/lib/color";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import Kinetic from "@/components/motion/Kinetic";
import Scramble from "@/components/motion/Scramble";
import Velocity from "@/components/motion/Velocity";
import Disclosure from "@/components/motion/Disclosure";
import Spotlight from "@/components/motion/Spotlight";
import Counter from "@/components/motion/Counter";
import Headline from "@/components/ui/Headline";
import Pill from "@/components/ui/Pill";
import FeatureDeck from "@/components/work/FeatureDeck";
import { IconArrowUpRight, IconGithub } from "@/components/ui/Glyph";

/**
 * Case study for a personal project.
 *
 * It shares the vocabulary of /work/[slug] — same accent threading, same
 * running title, same feature rail and decision log — but not its shape. Client
 * work is argued through screens; these are argued through engineering, so the
 * page leads with the problem, spends its length on how it was solved, and ends
 * on what the thing still can't do. Stating the limits is the part that makes
 * the rest credible.
 */

type Params = { slug: string };

/** Only projects with a case study get a route. The rest link to their repo. */
const cases = lab.filter((project) => project.caseStudy);

export function generateStaticParams(): Params[] {
  return cases.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = cases.find((item) => item.slug === slug);
  if (!project) return { title: "Project not found" };

  const description = (project.overview ?? project.summary).slice(0, 200);
  const url = `${siteUrl}/lab/${project.slug}`;

  return {
    title: `${project.name} — Project`,
    description,
    alternates: { canonical: `/lab/${project.slug}` },
    openGraph: {
      type: "article",
      url,
      title: `${project.name} — ${profile.fullName}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — ${profile.fullName}`,
      description,
    },
  };
}

export default async function LabCaseStudy({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = cases.find((item) => item.slug === slug);
  if (!project) notFound();

  const next = cases.filter((item) => item.slug !== project.slug)[0];

  const accent = project.accent;
  const channels = rgbChannels(accent);

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.overview ?? project.summary,
    url: `${siteUrl}/lab/${project.slug}`,
    ...(project.repoUrl ? { codeRepository: project.repoUrl } : {}),
    programmingLanguage: project.tags[0],
    author: { "@type": "Person", name: profile.fullName, url: siteUrl },
    ...(project.liveUrl ? { sameAs: [project.liveUrl] } : {}),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Lab", item: `${siteUrl}/#lab` },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `${siteUrl}/lab/${project.slug}`,
      },
    ],
  };

  return (
    <article className="overflow-x-clip pt-[64px] md:pt-[72px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* ---------- Header ---------- */}
      <header className="relative overflow-hidden pb-10 pt-10 md:pb-14 md:pt-20">
        <div
          aria-hidden="true"
          className="bloom left-[-8%] top-[-16%] size-[24rem] md:size-[34rem]"
          style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
        />

        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="mb-8 md:mb-9">
            <ol className="mono flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-white/30 md:text-[11px]">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#lab" className="transition-colors hover:text-white">
                  Lab
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li style={{ color: accent }}>{project.name}</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span className="mono text-[11px] font-medium tracking-[0.16em] text-white/25">
              <Scramble text={project.index} />
            </span>
            <span
              className="mono inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
              style={{
                color: accent,
                borderWidth: 1,
                borderColor: `rgb(${channels} / 0.4)`,
                backgroundColor: `rgb(${channels} / 0.1)`,
              }}
            >
              <span
                aria-hidden="true"
                className="animate-pulse-dot size-1.5 rounded-full"
                style={{ background: accent }}
              />
              {project.status}
            </span>
            <span className="mono text-[10px] uppercase tracking-[0.12em] text-white/30">
              {project.release}
            </span>
          </div>

          <h1 className="headline headline-xl mt-6 font-bold">
            <Kinetic text={project.name} immediate />
          </h1>
          <p className="mono mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-white/35">
            {project.subtitle}
          </p>

          <p className="mt-6 max-w-3xl text-[1rem] leading-relaxed text-white/60 sm:text-lg md:text-xl">
            {project.tagline}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-9">
            {project.liveUrl && (
              <Pill variant="white" size="lg" href={project.liveUrl} external>
                Open the demo
                <IconArrowUpRight className="size-4" />
              </Pill>
            )}
            {project.repoUrl && (
              <Pill
                variant={project.liveUrl ? "outline" : "white"}
                size="lg"
                href={project.repoUrl}
                external
              >
                <IconGithub className="size-4" />
                Source code
              </Pill>
            )}
            {/* A project with neither link still needs somewhere to go, or the
                header is a dead end. The note explains why there's no button;
                the pill gives the reader the next move anyway. */}
            {!project.liveUrl && !project.repoUrl && (
              <>
                <Pill variant="white" size="lg" href="/#contact">
                  Ask me about it
                </Pill>
                {project.linkNote && (
                  <p className="text-sm text-white/40 sm:ml-2">{project.linkNote}</p>
                )}
              </>
            )}
          </div>

          <Reveal delay={0.16}>
            <dl className="mono mt-10 grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3 md:mt-12">
              {[
                { label: "Discipline", value: project.discipline },
                { label: "Release", value: project.release },
                { label: "Role", value: project.role },
              ].map((row) => (
                <div key={row.label} className="bg-void px-5 py-4">
                  <dt className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/25">
                    {row.label}
                  </dt>
                  <dd className="mt-1.5 text-[12px] leading-snug text-white/70">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </header>

      {/* ---------- Running title ---------- */}
      <Velocity baseVelocity={1.6} className="border-y border-[var(--line)] py-4 md:py-5">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="flex items-center">
            <span className="headline whitespace-nowrap px-5 text-[clamp(1.6rem,4.4vw,3.2rem)] font-bold text-white/[0.07] md:px-8">
              {project.name}
            </span>
            <span
              className="size-1.5 shrink-0 rounded-full md:size-2"
              style={{ background: accent, opacity: 0.5 }}
            />
          </span>
        ))}
      </Velocity>

      {/* ---------- Metrics ---------- */}
      {project.metrics.length > 0 && (
        <section aria-label="Project metrics" className="shell mt-12 md:mt-16">
          <dl className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {project.metrics.map((metric, i) => (
              <Reveal key={metric.label} index={i}>
                <Spotlight
                  color={channels}
                  size="14rem"
                  className="panel h-full rounded-[1.25rem] px-4 py-5 md:px-5"
                >
                  <dt className="mono text-[9px] font-medium uppercase tracking-[0.14em] text-white/30 md:text-[10px]">
                    {metric.label}
                  </dt>
                  <dd
                    className="mono mt-2 text-[1.125rem] font-bold leading-tight md:text-2xl"
                    style={{ color: accent }}
                  >
                    <Counter value={metric.value} />
                  </dd>
                </Spotlight>
              </Reveal>
            ))}
          </dl>
        </section>
      )}

      {/* ---------- Overview + the problem ---------- */}
      <section className="shell mt-20 grid gap-10 md:mt-28 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="kicker">
              <Scramble text="Overview" />
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-5 text-[1.0625rem] leading-[1.7] text-white/80 md:text-xl md:leading-[1.6]">
              {project.overview}
            </p>
          </Reveal>
          {project.approach && (
            <Reveal delay={0.12}>
              <p className="kicker mt-10">The approach</p>
              <p className="mt-4 text-[0.9375rem] leading-[1.75] text-white/60 md:text-[1rem]">
                {project.approach}
              </p>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.1}>
          <div
            className="relative h-full overflow-hidden rounded-2xl p-6 md:p-8"
            style={{
              backgroundColor: `rgb(${channels} / 0.05)`,
              boxShadow: `inset 0 0 0 1px rgb(${channels} / 0.18)`,
            }}
          >
            <p className="kicker" style={{ color: accent }}>
              The problem
            </p>
            <p className="mt-5 text-[0.9375rem] leading-[1.75] text-white/75 md:text-[1rem]">
              {project.problem}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------- Highlights ---------- */}
      {project.highlights && project.highlights.length > 0 && (
        <section className="shell mt-20 md:mt-32">
          <Headline kicker="What it does" light="What it" bold="actually does" />
          <FeatureDeck features={project.highlights} accent={accent} />
        </section>
      )}

      {/* ---------- Engineering ---------- */}
      {project.engineering && project.engineering.length > 0 && (
        <section className="shell mt-20 md:mt-32">
          <Headline
            kicker="Engineering challenges"
            light="The problems worth"
            bold="solving"
          />
          <div className="mt-10 md:mt-14">
            <Disclosure items={project.engineering} accent={accent} />
          </div>
        </section>
      )}

      {/* ---------- Stack ---------- */}
      {project.stack && project.stack.length > 0 && (
        <section className="shell mt-20 md:mt-32">
          <Headline kicker="Under the hood" light="The" bold="Stack" />
          <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 xl:grid-cols-3">
            {project.stack.map((group, i) => (
              <Reveal key={group.group} index={i % 3}>
                <Spotlight color={channels} className="panel h-full rounded-[1.25rem] p-5 md:p-6">
                  <h3
                    className="mono text-[10px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: accent }}
                  >
                    {group.group}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-[var(--line)] px-3 py-1.5 text-[12px] text-white/55 transition-colors duration-400 hover:border-[var(--line-strong)] hover:text-white/85"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ---------- Limits and what's next ----------
          Deliberately on the page. A project page that only lists strengths is
          a brochure; naming the boundaries is what makes the rest believable. */}
      {(project.limitations?.length || project.next?.length) && (
        <section className="shell mt-20 grid gap-10 md:mt-32 lg:grid-cols-2 lg:gap-14">
          {project.limitations && project.limitations.length > 0 && (
            <div>
              <Reveal>
                <p className="kicker">Where it stops</p>
              </Reveal>
              <Stagger as="ul" gap={0.06} className="mt-6 space-y-3">
                {project.limitations.map((item) => (
                  <StaggerItem as="li" key={item} y={14}>
                    <span className="flex gap-3.5 text-[0.9375rem] leading-relaxed text-white/55">
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] size-1 shrink-0 rounded-full"
                        style={{ background: accent, opacity: 0.7 }}
                      />
                      {item}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          )}

          {project.next && project.next.length > 0 && (
            <div>
              <Reveal>
                <p className="kicker">What comes next</p>
              </Reveal>
              <Stagger as="ul" gap={0.06} className="mt-6 flex flex-wrap gap-2">
                {project.next.map((item, i) => (
                  <StaggerItem as="li" key={item} y={12}>
                    <span className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-panel px-4 py-2.5 text-[13px] text-white/60 transition-colors duration-400 hover:border-[var(--line-strong)] hover:text-white">
                      <span
                        aria-hidden="true"
                        className="mono text-[9px] font-semibold tabular-nums opacity-40 transition-opacity duration-400 group-hover:opacity-100"
                        style={{ color: accent }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          )}
        </section>
      )}

      {/* ---------- Closing ---------- */}
      <section className="relative mt-20 overflow-hidden border-t border-[var(--line)] md:mt-32">
        <div
          aria-hidden="true"
          className="bloom left-1/4 top-0 size-[22rem] md:size-[30rem]"
          style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
        />
        <div className="shell relative py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <p className="kicker">Take a look</p>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="headline headline-lg mt-5 max-w-[18ch] font-light">
                  {project.name} is <span className="font-bold">open</span> — run it, read it, break
                  it.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {project.liveUrl && (
                    <Pill variant="white" size="lg" href={project.liveUrl} external>
                      Open {project.liveLabel}
                      <IconArrowUpRight className="size-4" />
                    </Pill>
                  )}
                  {project.repoUrl && (
                    <Pill
                      variant={project.liveUrl ? "outline" : "white"}
                      size="lg"
                      href={project.repoUrl}
                      external
                    >
                      <IconGithub className="size-4" />
                      Source code
                    </Pill>
                  )}
                  <Pill
                    variant={project.liveUrl || project.repoUrl ? "outline" : "white"}
                    size="lg"
                    href="/#contact"
                  >
                    Work with me
                  </Pill>
                </div>
              </Reveal>
            </div>

            {next && (
              <Reveal delay={0.1}>
                <Link
                  href={`/lab/${next.slug}`}
                  style={{ "--next": next.accent } as CSSProperties}
                  className="panel panel-hover group block p-6 md:p-9"
                  data-cursor="Next"
                >
                  <p className="kicker">Next project</p>
                  <p className="mt-3 text-2xl font-semibold tracking-tight transition-colors duration-400 group-hover:text-[var(--next)] md:text-3xl">
                    {next.name}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">{next.tagline}</p>
                  <span
                    aria-hidden="true"
                    className="mt-6 grid size-10 place-items-center rounded-full border border-[var(--line-strong)] text-white/70 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-[var(--next)] group-hover:bg-[var(--next)] group-hover:text-void"
                  >
                    <IconArrowUpRight className="size-4" />
                  </span>
                </Link>
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </article>
  );
}
