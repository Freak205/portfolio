import type { SVGProps } from "react";

/**
 * The site's icon set. Hand-drawn on a 24×24 grid with a 1.6 stroke so every
 * glyph shares the same weight — no icon library, no extra bytes.
 */

type Props = SVGProps<SVGSVGElement> & { className?: string };

function Svg({ children, className = "size-5", ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  );
}

/* ---------- Service icons ---------- */

export function IconCommerce(props: Props) {
  return (
    <Svg {...props}>
      <path d="M3 5h2l2.2 10.2a2 2 0 0 0 2 1.6h7.4a2 2 0 0 0 2-1.55L20.5 8H6.2" />
      <circle cx="10" cy="20" r="1.3" />
      <circle cx="17" cy="20" r="1.3" />
    </Svg>
  );
}

export function IconBrowser(props: Props) {
  return (
    <Svg {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18" />
      <path d="M6.5 6.5h.01M9 6.5h.01M11.5 6.5h.01" />
    </Svg>
  );
}

export function IconSpark(props: Props) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z" />
      <path d="M18.5 16.5 19.2 18.8 21.5 19.5 19.2 20.2 18.5 22.5 17.8 20.2 15.5 19.5 17.8 18.8 18.5 16.5Z" />
    </Svg>
  );
}

export function IconGauge(props: Props) {
  return (
    <Svg {...props}>
      <path d="M4 18a8 8 0 1 1 16 0" />
      <path d="m12 14 4.2-4.2" />
      <circle cx="12" cy="18" r="1.2" />
    </Svg>
  );
}

/* ---------- Award icons ---------- */

export function IconTrophy(props: Props) {
  return (
    <Svg {...props}>
      <path d="M7.5 4h9v5a4.5 4.5 0 0 1-9 0V4Z" />
      <path d="M7.5 5.5H5A2 2 0 0 0 5 9.5h1.2M16.5 5.5H19A2 2 0 0 1 19 9.5h-1.2" />
      <path d="M12 13.5V17M9 20h6M10 17h4" />
    </Svg>
  );
}

export function IconMedal(props: Props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="15" r="5" />
      <path d="m8.5 10.5-2.4-6M15.5 10.5l2.4-6M9 4h6" />
    </Svg>
  );
}

export function IconShield(props: Props) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 19 6v6c0 4.2-2.9 7.3-7 8.5-4.1-1.2-7-4.3-7-8.5V6l7-2.5Z" />
      <path d="m9.2 12 2 2 3.6-3.8" />
    </Svg>
  );
}

export function IconStar(props: Props) {
  return (
    <Svg {...props}>
      <path d="m12 3.8 2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8-4.2-4.1 5.9-.9L12 3.8Z" />
    </Svg>
  );
}

/* ---------- UI ---------- */

export function IconArrowUpRight(props: Props) {
  return (
    <Svg {...props}>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </Svg>
  );
}

export function IconArrowRight(props: Props) {
  return (
    <Svg {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </Svg>
  );
}

export function IconArrowUp(props: Props) {
  return (
    <Svg {...props}>
      <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
    </Svg>
  );
}

export function IconArrowDown(props: Props) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M5.5 12.5 12 19l6.5-6.5" />
    </Svg>
  );
}

export function IconMail(props: Props) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7.5 7.1 5a1.5 1.5 0 0 0 1.8 0l7.1-5" />
    </Svg>
  );
}

export function IconDocument(props: Props) {
  return (
    <Svg {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </Svg>
  );
}

export function IconClose(props: Props) {
  return (
    <Svg {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Svg>
  );
}

export function IconPin(props: Props) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Svg>
  );
}

export function IconCalendar(props: Props) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
    </Svg>
  );
}

export function IconCheck(props: Props) {
  return (
    <Svg {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </Svg>
  );
}

export function IconQuote(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={props.className}>
      <path d="M9.6 5.4c-3.4 1.5-5.6 4.6-5.6 8.4 0 2.9 1.8 4.8 4.2 4.8 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8.1-1 .2.4-1.6 1.7-3 3.3-3.8l-1.4-2.4Zm10 0c-3.4 1.5-5.6 4.6-5.6 8.4 0 2.9 1.8 4.8 4.2 4.8 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8.1-1 .2.4-1.6 1.7-3 3.3-3.8l-1.4-2.4Z" />
    </svg>
  );
}

/* ---------- Social ---------- */

export function IconGithub({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function IconLinkedin({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9.5h4v11.5H3V9.5Zm6.5 0h3.83v1.57h.05c.53-.96 1.83-1.97 3.77-1.97 4.03 0 4.78 2.5 4.78 5.76v6.14h-4v-5.44c0-1.3-.02-2.97-1.9-2.97-1.9 0-2.2 1.4-2.2 2.87v5.54h-4V9.5Z" />
    </svg>
  );
}

export function IconWhatsapp({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2.1 22l5.35-1.4a9.8 9.8 0 0 0 4.59 1.17h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.02-5.1-2.88-6.96A9.77 9.77 0 0 0 12.04 2Zm5.75 14.04c-.24.68-1.42 1.3-1.95 1.35-.5.05-.98.24-3.3-.7-2.78-1.13-4.54-3.98-4.68-4.17-.13-.19-1.11-1.48-1.11-2.83 0-1.35.7-2.01.95-2.29.25-.28.55-.35.73-.35h.52c.17 0 .4-.06.62.48.24.57.8 1.97.87 2.11.07.14.12.3.02.49-.1.19-.15.3-.29.47-.14.16-.3.37-.43.49-.14.14-.29.29-.13.57.17.28.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.29 1.42.28.14.45.12.61-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.64-.14.26.09 1.65.78 1.94.92.28.14.47.21.54.33.07.12.07.68-.17 1.35Z" />
    </svg>
  );
}
