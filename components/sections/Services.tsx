import { services, servicesSection, type ServiceIcon } from "@/content/site";
import { rgbChannels } from "@/lib/color";
import Tilt from "@/components/motion/Tilt";
import Spotlight from "@/components/motion/Spotlight";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import Headline from "@/components/ui/Headline";
import { IconBrowser, IconCommerce, IconGauge, IconSpark } from "@/components/ui/Glyph";

const ICONS: Record<ServiceIcon, typeof IconCommerce> = {
  commerce: IconCommerce,
  browser: IconBrowser,
  spark: IconSpark,
  gauge: IconGauge,
};

/**
 * Four cards, each a line of copy and three chips rather than a paragraph.
 *
 * The chips carry what the paragraph used to: they are scannable at a glance,
 * they stagger in on their own beat, and they give the card something to do on
 * hover — the light in the card takes the service's own colour instead of the
 * generic white sheen every other surface uses.
 */
export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-20 md:py-32">
      <div className="shell">
        <Headline
          kicker={servicesSection.label}
          light={servicesSection.headingLight}
          bold={servicesSection.headingBold}
          intro={servicesSection.intro}
        />

        <div className="mt-12 grid gap-4 md:mt-18 md:grid-cols-2 md:gap-5">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon];
            const channels = rgbChannels(service.color);

            return (
              // Tilt handles the entrance and the pointer lean; the coloured
              // light is Spotlight's job, so Tilt's white sheen is turned off.
              <Tilt key={service.title} index={i % 2} strength={5} sheen={false}>
                <Spotlight
                  color={channels}
                  size="20rem"
                  className="panel panel-hover group h-full overflow-hidden rounded-[1.25rem] p-6 md:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="inline-flex size-12 items-center justify-center rounded-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:rotate-[-6deg]"
                      style={{
                        color: service.color,
                        backgroundColor: `rgb(${channels} / 0.14)`,
                        boxShadow: `inset 0 0 0 1px rgb(${channels} / 0.28)`,
                      }}
                    >
                      <Icon className="size-6" />
                    </span>

                    <span className="mono text-[11px] font-semibold tabular-nums text-white/15 transition-colors duration-500 group-hover:text-white/35">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold tracking-tight md:text-[1.375rem]">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-white/55">
                    {service.body}
                  </p>

                  <Stagger as="ul" gap={0.06} className="mt-6 flex flex-wrap gap-2">
                    {service.points.map((point) => (
                      <StaggerItem as="li" key={point} y={10}>
                        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1.5 text-[12px] text-white/60">
                          <span
                            aria-hidden="true"
                            className="size-1 rounded-full"
                            style={{ backgroundColor: service.color }}
                          />
                          {point}
                        </span>
                      </StaggerItem>
                    ))}
                  </Stagger>

                  {/* Rule that runs out along the bottom edge on hover. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    style={{ backgroundColor: service.color, opacity: 0.55 }}
                  />
                </Spotlight>
              </Tilt>
            );
          })}
        </div>
      </div>
    </section>
  );
}
