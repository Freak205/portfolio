import { arsenal, arsenalSection } from "@/content/site";
import { ICONS, iconColor } from "@/lib/brand-icons";
import Headline from "@/components/ui/Headline";
import Marquee from "@/components/motion/Marquee";

/**
 * Technology chips scrolling in opposite directions. The chips are rendered on
 * the server and handed to the client marquee as children, so no icon data
 * reaches the browser bundle.
 */
export default function Arsenal() {
  return (
    <section id="arsenal" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <Headline
          kicker={arsenalSection.label}
          light={arsenalSection.headingLight}
          bold={arsenalSection.headingBold}
          intro={arsenalSection.intro}
        />
      </div>

      <div className="mt-14 space-y-4 md:mt-18">
        {arsenal.map((row, i) => (
          <Marquee
            key={i}
            reverse={i % 2 === 1}
            srItems={row.map((tech) => tech.label)}
            className="py-1"
          >
            {row.map((tech) => (
              <Chip key={tech.slug + tech.label} slug={tech.slug} label={tech.label} />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}

function Chip({ slug, label }: { slug: string; label: string }) {
  const icon = ICONS[slug];

  return (
    <span className="chip mx-2 shrink-0">
      {icon ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-[18px] shrink-0"
          fill={iconColor(icon.hex)}
        >
          <path d={icon.path} />
        </svg>
      ) : (
        // Unknown slug — a neutral lettermark rather than a broken icon.
        <span
          aria-hidden="true"
          className="grid size-[18px] shrink-0 place-items-center rounded-[5px] bg-white/10 text-[9px] font-bold text-white/70"
        >
          {label.charAt(0)}
        </span>
      )}
      <span className="font-medium text-white/80">{label}</span>
    </span>
  );
}
