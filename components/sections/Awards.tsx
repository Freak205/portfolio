import { awards, awardsSection, type AwardIcon } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import Headline from "@/components/ui/Headline";
import { IconMedal, IconShield, IconStar, IconTrophy } from "@/components/ui/Glyph";

const ICONS: Record<AwardIcon, typeof IconTrophy> = {
  trophy: IconTrophy,
  medal: IconMedal,
  shield: IconShield,
  star: IconStar,
};

/**
 * Off by default — see the note in content/site.ts. Add real entries to
 * `awards` and set `awardsSection.show = true` to slot it into the page.
 */
export default function Awards() {
  if (!awardsSection.show || awards.length === 0) return null;

  return (
    <section id="awards" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
        <Headline
          kicker={awardsSection.label}
          light={awardsSection.headingLight}
          bold={awardsSection.headingBold}
          intro={awardsSection.intro}
        />

        <div className="grid gap-4 sm:grid-cols-3">
          {awards.map((award, i) => {
            const Icon = ICONS[award.icon];
            return (
              <Reveal key={award.title} index={i}>
                <article className="panel panel-hover flex h-full flex-col items-center justify-between gap-6 p-6 text-center">
                  <span
                    className="grid size-12 place-items-center rounded-2xl"
                    style={{
                      color: award.color,
                      backgroundColor: `color-mix(in oklab, ${award.color} 14%, transparent)`,
                      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${award.color} 28%, transparent)`,
                    }}
                  >
                    <Icon className="size-6" />
                  </span>

                  <h3 className="text-[1rem] font-semibold leading-snug">{award.title}</h3>

                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
                    {award.issuer}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
