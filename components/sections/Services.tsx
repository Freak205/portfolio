import { services, servicesSection, type ServiceIcon } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import Headline from "@/components/ui/Headline";
import { IconBrowser, IconCommerce, IconGauge, IconSpark } from "@/components/ui/Glyph";

const ICONS: Record<ServiceIcon, typeof IconCommerce> = {
  commerce: IconCommerce,
  browser: IconBrowser,
  spark: IconSpark,
  gauge: IconGauge,
};

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <Headline
          kicker={servicesSection.label}
          light={servicesSection.headingLight}
          bold={servicesSection.headingBold}
          intro={servicesSection.intro}
        />

        <div className="mt-14 grid gap-5 md:mt-18 md:grid-cols-2">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <Reveal key={service.title} index={i % 2}>
                <article className="panel panel-hover group h-full p-7 md:p-9">
                  <span
                    className="mb-6 inline-flex size-12 items-center justify-center rounded-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5"
                    style={{
                      color: service.color,
                      backgroundColor: `color-mix(in oklab, ${service.color} 14%, transparent)`,
                      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${service.color} 28%, transparent)`,
                    }}
                  >
                    <Icon className="size-6" />
                  </span>

                  <h3 className="text-xl font-semibold tracking-tight md:text-[1.375rem]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/55">
                    {service.body}
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
