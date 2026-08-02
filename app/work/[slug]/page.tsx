import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { profile, projects, siteUrl } from "@/content/site";
import { rgbChannels } from "@/lib/color";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import Kinetic from "@/components/motion/Kinetic";
import Scramble from "@/components/motion/Scramble";
import Velocity from "@/components/motion/Velocity";
import Curtain from "@/components/motion/Curtain";
import Disclosure from "@/components/motion/Disclosure";
import Spotlight from "@/components/motion/Spotlight";
import Counter from "@/components/motion/Counter";
import Headline from "@/components/ui/Headline";
import Preview from "@/components/ui/Preview";
import Pill from "@/components/ui/Pill";
import FeatureDeck from "@/components/work/FeatureDeck";
import { IconArrowUpRight } from "@/components/ui/Glyph";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Case study not found" };

  const description = project.overview.slice(0, 200);
  const url = `${siteUrl}/work/${project.slug}`;

  return {
    title: `${project.name} — Case study`,
    description,
    alternates: { canonical: `/work/${project.slug}` },
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

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  // CSP nonce from proxy.ts — the JSON-LD blocks below need it.
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  const next = projects.filter((item) => item.slug !== project.slug)[0];

  // One accent per project, threaded through every rule, glow and active state
  // on the page — the two case studies should not read as the same template.
  const accent = project.accent;
  const channels = rgbChannels(accent);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.overview,
    url: `${siteUrl}/work/${project.slug}`,
    sameAs: [project.liveUrl],
    creator: { "@type": "Person", name: profile.fullName, url: siteUrl },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Work", item: `${siteUrl}/#work` },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `${siteUrl}/work/${project.slug}`,
      },
    ],
  };

  return (
    <article className="overflow-x-clip pt-[64px] md:pt-[72px]">
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        nonce={nonce}
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
                <Link href="/#work" className="transition-colors hover:text-white">
                  Work
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
            <Pill variant="white" size="lg" href={project.liveUrl} external>
              Visit {project.liveLabel}
              <IconArrowUpRight className="size-4" />
            </Pill>
            <Pill variant="outline" size="lg" href="/#contact">
              Start a similar project
            </Pill>
          </div>

          {/* Sector / timeframe / role — the framing facts, set as machine output. */}
          <Reveal delay={0.16}>
            <dl className="mono mt-10 grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3 md:mt-12">
              {[
                { label: "Sector", value: project.sector },
                { label: "Timeframe", value: project.timeframe },
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

      {/* ---------- Running title ----------
          Decorative repetition of the name that reacts to scroll velocity —
          it is aria-hidden, and the real name is the <h1> above. */}
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

      {/* ---------- Cover ---------- */}
      <div className="shell mt-12 md:mt-16">
        <Curtain>
          <Preview
            image={project.cover}
            urlLabel={project.liveLabel}
            priority
            seed={Number(project.index)}
            sizes="(max-width: 1024px) 100vw, 1300px"
          />
        </Curtain>
      </div>

      {/* ---------- Facts ---------- */}
      <section aria-label="Project facts" className="shell mt-10 md:mt-16">
        <dl className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
          {project.facts.map((fact, i) => (
            <Reveal key={fact.label} index={i}>
              <Spotlight
                color={channels}
                size="14rem"
                className="panel h-full rounded-[1.25rem] px-4 py-5 md:px-5"
              >
                <dt className="mono text-[9px] font-medium uppercase tracking-[0.14em] text-white/30 md:text-[10px]">
                  {fact.label}
                </dt>
                <dd className="mono mt-2 text-[1rem] font-bold leading-tight md:text-xl">
                  <Counter value={fact.value} />
                </dd>
              </Spotlight>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* ---------- Overview + the need ---------- */}
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
          {project.context && (
            <Reveal delay={0.12}>
              <p
                className="mt-6 border-l-2 pl-4 text-sm leading-relaxed text-white/40"
                style={{ borderColor: accent }}
              >
                {project.context}
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
              The business need
            </p>
            <p className="mt-5 text-[0.9375rem] leading-[1.75] text-white/75 md:text-[1rem]">
              {project.need}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------- Responsibilities ----------
          Ten short strings, so they read as a manifest rather than a paragraph. */}
      <section className="shell mt-20 md:mt-28">
        <Reveal>
          <p className="kicker">What I owned</p>
        </Reveal>

        <Stagger className="mt-6 flex flex-wrap gap-2 md:gap-2.5" gap={0.04}>
          {project.responsibilities.map((item, i) => (
            <StaggerItem key={item} y={14}>
              <span className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-panel px-4 py-2.5 text-[13px] text-white/65 transition-colors duration-400 hover:border-[var(--line-strong)] hover:text-white">
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
      </section>

      {/* ---------- Features ---------- */}
      <section className="shell mt-20 md:mt-32">
        <Headline kicker="Features delivered" light="What" bold="shipped" />
        <FeatureDeck features={project.features} accent={accent} />
      </section>

      {/* ---------- Implementation ---------- */}
      <section className="shell mt-20 md:mt-32">
        <Headline kicker="Selected implementation details" light="Decisions worth" bold="explaining" />
        <div className="mt-10 md:mt-14">
          <Disclosure items={project.implementation} accent={accent} />
        </div>
      </section>

      {/* ---------- Gallery ---------- */}
      {project.gallery.length > 0 && (
        <section className="shell mt-20 md:mt-32">
          <Headline kicker="Screens" light="Inside the" bold="build" />
          <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 xl:grid-cols-3">
            {project.gallery.map((image, i) => (
              <Curtain
                key={image.caption}
                index={i % 3}
                from={i % 2 === 0 ? "bottom" : "left"}
                // Alternating drift lets the middle column sit lower as the row
                // passes, so a three-up grid does not move as one slab.
                drift={i % 3 === 1 ? 18 : 0}
              >
                <Preview
                  image={image}
                  chrome={false}
                  seed={i + 3}
                  showCaption
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </Curtain>
            ))}
          </div>
        </section>
      )}

      {/* ---------- Stack ---------- */}
      <section className="shell mt-20 md:mt-32">
        <Headline kicker="Under the hood" light="The" bold="Stack" />
        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 xl:grid-cols-3">
          {project.stack.map((group, i) => (
            <Reveal key={group.group} index={i % 3}>
              <Spotlight
                color={channels}
                className="panel h-full rounded-[1.25rem] p-5 md:p-6"
              >
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
                <p className="kicker">See it live</p>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="headline headline-lg mt-5 max-w-[16ch] font-light">
                  {project.name} is running in <span className="font-bold">production</span> right
                  now.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Pill variant="white" size="lg" href={project.liveUrl} external>
                    Open {project.liveLabel}
                    <IconArrowUpRight className="size-4" />
                  </Pill>
                  <Pill variant="outline" size="lg" href="/#contact">
                    Work with me
                  </Pill>
                </div>
              </Reveal>
            </div>

            {next && (
              <Reveal delay={0.1}>
                <Link
                  href={`/work/${next.slug}`}
                  // The card previews the *next* project, so it wears that
                  // project's accent rather than this page's.
                  style={{ "--next": next.accent } as CSSProperties}
                  className="panel panel-hover group block p-6 md:p-9"
                  data-cursor="Next"
                >
                  <p className="kicker">Next case study</p>
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
