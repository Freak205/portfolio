import type { ElementType } from "react";
import TextReveal from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  /** Small tracked label above the heading. */
  kicker?: string | null;
  /** Rendered in light weight. */
  light: string;
  /** Rendered bold, in pure white. */
  bold: string;
  intro?: string;
  size?: "xl" | "lg" | "md";
  align?: "left" | "center";
  as?: ElementType;
  className?: string;
  /** Animate on mount rather than on scroll. */
  immediate?: boolean;
};

/**
 * The site's signature heading: a light word followed by a bold one, revealed
 * from behind a mask. Every section uses it so the rhythm stays consistent.
 */
export default function Headline({
  kicker,
  light,
  bold,
  intro,
  size = "lg",
  align = "left",
  as: Tag = "h2",
  className = "",
  immediate = false,
}: Props) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "flex flex-col items-center text-center" : ""} ${className}`}>
      {kicker && (
        <Reveal y={12}>
          <p className="kicker mb-4">{kicker}</p>
        </Reveal>
      )}

      <Tag className={`headline headline-${size}`}>
        <TextReveal
          immediate={immediate}
          lines={[
            <>
              <span className="headline-light">{light}</span>{" "}
              <span className="headline-bold">{bold}</span>
            </>,
          ]}
        />
      </Tag>

      {intro && (
        <Reveal delay={0.12} y={14}>
          <p className={`lede mt-5 ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
