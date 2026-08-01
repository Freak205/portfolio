import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { lab, labSection, type LabProject } from "@/content/site";
import { rgbChannels } from "@/lib/color";
import { Reveal } from "@/components/motion/Reveal";
import Spotlight from "@/components/motion/Spotlight";
import Counter from "@/components/motion/Counter";
import Headline from "@/components/ui/Headline";
import { IconArrowUpRight, IconGithub } from "@/components/ui/Glyph";

/**
 * Personal projects, deliberately below Selected Work and deliberately shaped
 * differently from it.
 *
 * The flagship cards up the page are image-led, because those two platforms are
 * things you look at. These are things you read about — a Python analytics app,
 * a computer-vision controller, a research repo — and none of them has a
 * screenshot that would mean anything at card size. So each gets a full-width
 * row instead: the argument on the left, the numbers on the right.
 *
 * A project with `caseStudy: true` links to its own page; one without links
 * straight to the repository, which is honest about how much there is to show.
 */
export default function Lab() {
  return (
    <section id="lab" className="relative scroll-mt-24 py-20 md:py-32">
      <div className="shell">
        <Headline
          kicker={labSection.label}
          light={labSection.headingLight}
          bold={labSection.headingBold}
          intro={labSection.intro}
        />

        <div className="mt-12 space-y-4 md:mt-18 md:space-y-5">
          {lab.map((project, i) => (
            <Reveal key={project.slug} index={i}>
              <LabCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LabCard({ project }: { project: LabProject }) {
  const channels = rgbChannels(project.accent);
  const href = project.caseStudy ? `/lab/${project.slug}` : (project.repoUrl ?? null);
  const isInternal = project.caseStudy;
  const hasMetrics = project.metrics.length > 0;

  const body = (
    <Spotlight
      color={channels}
      size="30rem"
      className="panel panel-hover relative h-full overflow-hidden rounded-[1.25rem] p-6 md:p-9"
    >
      {/* Ghosted index, bottom-right, behind everything. */}
      <span
        aria-hidden="true"
        className="headline pointer-events-none absolute -bottom-8 right-3 select-none text-[8rem] font-bold leading-none text-white/[0.025] md:text-[11rem]"
      >
        {project.index}
      </span>

      <div className="relative grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
        {/* ---------- The argument ---------- */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="mono text-[11px] font-semibold tabular-nums text-white/25">
              {project.index}
            </span>
            <span
              className="mono inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em]"
              style={{
                color: project.accent,
                backgroundColor: `rgb(${channels} / 0.12)`,
                boxShadow: `inset 0 0 0 1px rgb(${channels} / 0.32)`,
              }}
            >
              {project.status}
            </span>
            <span className="mono text-[10px] uppercase tracking-[0.12em] text-white/30">
              {project.release}
            </span>
          </div>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight transition-colors duration-400 group-hover:text-white md:text-[2rem]">
            {project.name}
          </h3>
          <p className="mono mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
            {project.discipline}
          </p>

          <p
            className="mt-5 border-l-2 pl-4 text-[0.9375rem] leading-relaxed text-white/75 md:text-[1rem]"
            style={{ borderColor: project.accent }}
          >
            {project.tagline}
          </p>

          <p className="mt-5 text-[0.9375rem] leading-[1.75] text-white/55">{project.summary}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-[var(--line)] px-3 py-1.5 text-[11px] text-white/50 transition-colors duration-400 group-hover:border-[var(--line-strong)]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- The numbers ----------
            Top-aligned rather than justified. Bottom-aligning the links to
            match the tag chips opposite left a dead band in the middle of the
            column; letting the slack fall to the bottom instead puts it exactly
            where the ghosted index numeral wants the room. */}
        <div className="flex flex-col gap-7">
          {hasMetrics ? (
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)]">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="bg-panel px-4 py-4 md:px-5 md:py-5">
                  <dt className="mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/30">
                    {metric.label}
                  </dt>
                  <dd
                    className="mono mt-1.5 text-[1.0625rem] font-bold leading-tight md:text-xl"
                    style={{ color: project.accent }}
                  >
                    <Counter value={metric.value} />
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <div className="rounded-2xl border border-[var(--line)] p-5">
              <p className="kicker">Role</p>
              <p className="mt-2 text-sm text-white/60">{project.role}</p>
            </div>
          )}

          {/* Links. Rendered as spans, not anchors — the whole card is already a
              link, and an anchor inside an anchor is invalid markup. */}
          <div className="flex flex-col gap-2.5">
            {project.liveLabel && (
              <LinkRow label="Live" value={project.liveLabel} accent={project.accent} />
            )}
            {project.repoLabel && (
              <LinkRow
                label="Source"
                value={project.repoLabel}
                accent={project.accent}
                icon={<IconGithub className="size-3.5" />}
              />
            )}
            {project.linkNote && (
              <p className="text-[11px] leading-relaxed text-white/35">{project.linkNote}</p>
            )}

            <span className="mt-2 inline-flex items-center gap-2.5 text-[12px] font-medium text-white/60 transition-colors duration-400 group-hover:text-white">
              {project.caseStudy ? "Read the case study" : "View the repository"}
              <span
                aria-hidden="true"
                className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-full border border-[var(--line-strong)] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-transparent group-hover:text-void"
              >
                <span
                  className="absolute inset-0 scale-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
                  style={{ backgroundColor: project.accent }}
                />
                <IconArrowUpRight className="relative size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45" />
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Accent rule that runs the width of the card on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        style={{ backgroundColor: project.accent, opacity: 0.6 }}
      />
    </Spotlight>
  );

  const shared = {
    className: "group block",
    style: { "--accent": project.accent } as CSSProperties,
    "data-cursor": project.caseStudy ? "Case study" : "Repository",
  };

  if (!href) {
    return <div className={shared.className}>{body}</div>;
  }

  return isInternal ? (
    <Link href={href} {...shared}>
      {body}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" {...shared}>
      {body}
    </a>
  );
}

function LinkRow({
  label,
  value,
  accent,
  icon,
}: {
  label: string;
  value: string;
  accent: string;
  icon?: ReactNode;
}) {
  return (
    <span className="flex items-center gap-3 text-[11px]">
      <span className="mono shrink-0 uppercase tracking-[0.12em] text-white/25">{label}</span>
      <span className="min-w-0 flex-1 border-b border-dashed border-[var(--line)]" aria-hidden="true" />
      <span
        className="mono inline-flex min-w-0 items-center gap-1.5 truncate"
        style={{ color: accent }}
      >
        {icon}
        <span className="truncate">{value}</span>
      </span>
    </span>
  );
}
