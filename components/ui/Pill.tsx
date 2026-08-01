"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import Magnetic from "@/components/motion/Magnetic";

type Variant = "white" | "brand" | "outline" | "quiet";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:cursor-not-allowed disabled:opacity-50";

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[12px]",
  md: "h-11 px-6 text-[13px]",
  lg: "h-14 px-8 text-[13px] tracking-[0.08em] uppercase",
};

const variants: Record<Variant, string> = {
  white: "bg-white text-[#05060b] glow-white hover:bg-brand hover:text-white",
  brand: "bg-brand text-white glow-brand hover:bg-brand-soft",
  outline: "border border-[var(--line-strong)] text-white hover:border-white/40 hover:bg-white/5",
  quiet: "text-white/70 hover:text-white",
};

type Common = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  className?: string;
  "aria-label"?: string;
};

type AsLink = Common & {
  href: string;
  external?: boolean;
  download?: boolean;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type AsButton = Common & {
  href?: never;
  external?: never;
  download?: never;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export default function Pill({
  children,
  variant = "white",
  size = "md",
  magnetic = true,
  className = "",
  href,
  external,
  download,
  onClick,
  type = "button",
  disabled,
  ...aria
}: AsLink | AsButton) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const label = aria["aria-label"];

  let node: ReactNode;

  if (href && (external || download)) {
    node = (
      <a
        className={classes}
        href={href}
        aria-label={label}
        {...(download ? { download: "" } : { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
      </a>
    );
  } else if (href) {
    node = (
      <Link className={classes} href={href} aria-label={label}>
        {children}
      </Link>
    );
  } else {
    node = (
      <button className={classes} type={type} onClick={onClick} disabled={disabled} aria-label={label}>
        {children}
      </button>
    );
  }

  return magnetic ? <Magnetic strength={7}>{node}</Magnetic> : node;
}
