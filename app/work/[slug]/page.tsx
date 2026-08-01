import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { profile, projects, siteUrl } from "@/content/site";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
import Counter from "@/components/motion/Counter";
import Headline from "@/components/ui/Headline";
import Preview from "@/components/ui/Preview";
import Pill from "@/components/ui/Pill";
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

  const next = projects.filter((item) => item.slug !== project.slug)[0];

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
    <article className="pt-[64px] md:pt-[72px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* ---------- Header ---------- */}
      <header className="relative overflow-hidden pb-12 pt-12 md:pb-16 md:pt-20">
        <div aria-hidden="true" className="bloom left-[-6%] top-[-14%] size-[34rem]" />

        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="mb-9">
            <ol className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-white/30">
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
              <li className="text-brand-soft">{project.name}</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-medium tracking-[0.16em] text-white/25">
              {project.index}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-soft">
              <span aria-hidden="true" className="animate-pulse-dot size-1.5 rounded-full bg-brand-soft" />
              {project.status}
            </span>
          </div>

          <h1 className="headline headline-xl mt-6 font-bold">
            <TextReveal immediate lines={[project.name]} />
          </h1>
          <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
            {project.subtitle}
          </p>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/60 md:text-xl">
            {project.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Pill variant="white" size="lg" href={project.liveUrl} external>
              Visit {project.liveLabel}
              <IconArrowUpRight className="size-4" />
            </Pill>
            <Pill variant="outline" size="lg" href="/#contact">
              Start a similar project
            </Pill>
          </div>
        </div>
      </header>

      {/* ---------- Cover ---------- */}
      <div className="shell">
        <Reveal>
          <Preview
            image={project.cover}
            urlLabel={project.liveLabel}
            priority
            seed={Number(project.index)}
            sizes="(max-width: 1024px) 100vw, 1300px"
          />
        </Reveal>
      </div>

      {/* ---------- Facts ---------- */}
      <section aria-label="Project facts" className="shell mt-12 md:mt-16">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {project.facts.map((fact, i) => (
            <Reveal key={fact.label} index={i}>
              <div className="panel h-full px-5 py-5">
                <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/30">
                  {fact.label}
                </dt>
                <dd className="headline mt-2 text-xl font-bold leading-tight">
                  <Counter value={fact.value} />
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* ---------- Overview + responsibilities ---------- */}
      <section className="shell mt-20 grid gap-12 md:mt-28 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div className="space-y-10">
          <div>
            <Reveal>
              <p className="kicker">Overview</p>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-5 text-[1.0625rem] leading-[1.75] text-white/60">
                {project.overview}
              </p>
            </Reveal>
            {project.context && (
              <Reveal delay={0.1}>
                <p className="mt-5 border-l-2 border-brand pl-4 text-sm leading-relaxed text-white/40">
                  {project.context}
                </p>
              </Reveal>
            )}
          </div>

          <div>
            <Reveal>
              <p className="kicker">The business need</p>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-5 text-[1.0625rem] leading-[1.75] text-white/60">{project.need}</p>
            </Reveal>
          </div>
        </div>

        <div>
          <Reveal>
            <p className="kicker">My responsibilities</p>
          </Reveal>
          <Stagger className="mt-5 space-y-2.5" gap={0.05}>
            {project.responsibilities.map((item, i) => (
              <StaggerItem key={item} y={12}>
                <div className="flex gap-4 rounded-xl border border-[var(--line)] bg-panel px-4 py-3">
                  <span className="mt-0.5 text-[10px] font-medium text-white/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-white/65">{item}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section className="shell mt-24 md:mt-32">
        <Headline kicker="Features delivered" light="What" bold="shipped" />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {project.features.map((feature, i) => (
            <Reveal key={feature.title} index={i % 2}>
              <article className="panel panel-hover group h-full p-6 md:p-7">
                <span className="text-[10px] font-medium text-white/25 transition-colors duration-500 group-hover:text-brand-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{feature.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-white/55">
                  {feature.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Implementation ---------- */}
      <section className="shell mt-24 md:mt-32">
        <Headline kicker="Selected implementation details" light="Decisions worth" bold="explaining" />

        <div className="mt-12 border-t border-[var(--line)]">
          {project.implementation.map((item, i) => (
            <Reveal key={item.title} index={i}>
              <div className="grid gap-4 border-b border-[var(--line)] py-8 md:grid-cols-[1fr_1.4fr] md:gap-14">
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{item.title}</h3>
                <p className="text-[0.9375rem] leading-[1.75] text-white/55">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Gallery ---------- */}
      {project.gallery.length > 0 && (
        <section className="shell mt-24 md:mt-32">
          <Headline kicker="Screens" light="Inside the" bold="build" />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {project.gallery.map((image, i) => (
              <Reveal key={image.caption} index={i % 3}>
                <Preview
                  image={image}
                  chrome={false}
                  seed={i + 3}
                  showCaption
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ---------- Stack ---------- */}
      <section className="shell mt-24 md:mt-32">
        <Headline kicker="Under the hood" light="The" bold="Stack" />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {project.stack.map((group, i) => (
            <Reveal key={group.group} index={i % 3}>
              <div className="panel h-full p-6">
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
                  {group.group}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-[var(--line)] px-3 py-1.5 text-[12px] text-white/55"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Closing ---------- */}
      <section className="relative mt-24 overflow-hidden border-t border-[var(--line)] md:mt-32">
        <div aria-hidden="true" className="bloom left-1/4 top-0 size-[30rem]" />
        <div className="shell relative py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <p className="kicker">See it live</p>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="headline headline-lg mt-5 max-w-[16ch] font-light">
                  {project.name} is running in{" "}
                  <span className="font-bold">production</span> right now.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-8 flex flex-wrap gap-3">
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
                  className="panel panel-hover group block p-7 md:p-9"
                  data-cursor="Next"
                >
                  <p className="kicker">Next case study</p>
                  <p className="mt-3 text-2xl font-semibold tracking-tight transition-colors duration-400 group-hover:text-brand-soft md:text-3xl">
                    {next.name}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">{next.tagline}</p>
                  <span
                    aria-hidden="true"
                    className="mt-6 grid size-10 place-items-center rounded-full border border-[var(--line-strong)] text-white/70 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-brand group-hover:bg-brand group-hover:text-white"
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
