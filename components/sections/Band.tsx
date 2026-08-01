import { services } from "@/content/site";
import Velocity from "@/components/motion/Velocity";

/**
 * The seam between the hero and the page: a band of oversized type carrying the
 * four things I do, drifting on its own and reacting to how fast you scroll.
 *
 * It does the job an introductory paragraph used to do — say what this site is
 * about — in four words instead of forty, and it hands the visitor a piece of
 * motion that responds to them right where the hero stops responding.
 *
 * Purely decorative repetition, so it is hidden from assistive tech inside
 * <Velocity>; the same four titles are read properly in the Services section
 * immediately below.
 */
export default function Band() {
  return (
    <div className="relative border-y border-[var(--line)] py-5 md:py-7">
      <Velocity baseVelocity={1.4}>
        {services.map((service) => (
          <span key={service.title} className="flex items-center">
            <span className="headline whitespace-nowrap px-6 text-[clamp(1.5rem,4vw,3rem)] font-light text-white/25 md:px-10">
              {service.title}
            </span>
            <span
              className="size-1.5 shrink-0 rounded-full md:size-2"
              style={{ backgroundColor: service.color, opacity: 0.7 }}
            />
          </span>
        ))}
      </Velocity>
    </div>
  );
}
