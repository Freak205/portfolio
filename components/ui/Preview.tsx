import Image from "next/image";
import type { ProjectImage } from "@/content/site";

type Props = {
  image: ProjectImage;
  /** Shown in the browser chrome strip. Omit for a bare frame. */
  urlLabel?: string;
  chrome?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Shifts the placeholder artwork so repeated frames don't look identical. */
  seed?: number;
  /** Render the caption under the frame. */
  showCaption?: boolean;
};

/**
 * Project screenshot. Renders the real image when `image.src` is set, and a
 * clearly labelled placeholder when it is null.
 *
 * To swap in a real screenshot: drop the file in /public/work/ and set
 * `src` + `width` + `height` on the matching entry in content/site.ts.
 */
export default function Preview({
  image,
  urlLabel,
  chrome = true,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px",
  className = "",
  seed = 0,
  showCaption = false,
}: Props) {
  return (
    <figure className={`group/frame ${className}`}>
      <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-panel">
        {chrome && (
          <div className="flex items-center gap-2.5 border-b border-[var(--line)] bg-void/60 px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="size-2 rounded-full bg-white/12" />
              <span className="size-2 rounded-full bg-white/12" />
              <span className="size-2 rounded-full bg-white/12" />
            </span>
            {urlLabel && (
              <span className="mono truncate rounded-full bg-white/[0.06] px-3 py-1 text-[10px] text-white/45">
                {urlLabel}
              </span>
            )}
          </div>
        )}

        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: `${image.width} / ${image.height}` }}
        >
          {image.src ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/frame:scale-[1.04]"
            />
          ) : (
            <Placeholder label={image.caption} seed={seed} />
          )}
        </div>
      </div>

      {showCaption && image.caption && (
        <figcaption className="mt-3 text-[11px] uppercase tracking-[0.14em] text-white/35">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

function Placeholder({ label, seed }: { label: string; seed: number }) {
  const shift = 10 + ((seed * 19) % 40);

  return (
    <div className="absolute inset-0 overflow-hidden bg-panel">
      <div aria-hidden="true" className="dotgrid absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 opacity-[0.07]"
        style={{
          left: `${shift}%`,
          width: "44%",
          backgroundImage: "repeating-linear-gradient(135deg, #fff 0 1px, transparent 1px 10px)",
        }}
      />
      <div
        aria-hidden="true"
        className="bloom left-[62%] top-[10%] size-[18rem] opacity-20"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-6 text-center">
        <span className="rounded-full border border-[var(--line-strong)] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
          Image placeholder
        </span>
        <span className="text-[clamp(0.95rem,1.8vw,1.25rem)] font-medium text-white/55">
          {label}
        </span>
        <span className="text-[10px] uppercase tracking-[0.12em] text-white/25">
          Replace in content/site.ts
        </span>
      </div>
    </div>
  );
}
