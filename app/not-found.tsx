import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import Headline from "@/components/ui/Headline";
import Pill from "@/components/ui/Pill";
import { IconArrowUpRight } from "@/components/ui/Glyph";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page doesn't exist. Here's the way back.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden pt-[64px] md:pt-[72px]">
      <div aria-hidden="true" className="bloom left-[-8%] top-[12%] size-[34rem]" />
      <div aria-hidden="true" className="dotgrid absolute inset-0 opacity-60" />

      <div className="shell relative grid w-full gap-12 py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-20">
        <div>
          <Headline
            as="h1"
            kicker="Error 404"
            light="This page"
            bold="doesn't exist."
            size="xl"
            immediate
          />

          <Reveal delay={0.3}>
            <p className="lede mt-6 max-w-md">
              The link is broken or the page has moved. Everything worth seeing is one click away.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Pill variant="white" size="lg" href="/">
                Back to home
              </Pill>
              <Pill variant="outline" size="lg" href="/#contact">
                Get in touch
              </Pill>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="space-y-3">
            <p className="kicker">Selected work</p>
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="panel panel-hover group flex items-center justify-between gap-6 px-6 py-5"
              >
                <span>
                  <span className="block text-xl font-semibold tracking-tight transition-colors duration-400 group-hover:text-brand-soft">
                    {project.name}
                  </span>
                  <span className="mt-1 block text-[11px] uppercase tracking-[0.14em] text-white/30">
                    {project.subtitle}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] text-white/60 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-brand group-hover:bg-brand group-hover:text-white"
                >
                  <IconArrowUpRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
