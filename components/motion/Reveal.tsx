"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { EASE_EXPO, REVEAL_VIEWPORT } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger index — multiplied into the delay. */
  index?: number;
  delay?: number;
  /** Travel distance in px. Use 0 for a pure fade. */
  y?: number;
  as?: ElementType;
  id?: string;
};

/**
 * The site's default scroll reveal: a short rise and fade, once, on enter.
 * With `prefers-reduced-motion` it renders the element plainly — content is
 * never left hidden waiting for an animation that will not run.
 */
export function Reveal({
  children,
  className,
  index = 0,
  delay = 0,
  y = 24,
  as = "div",
  id,
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return (
      <Tag className={className} id={id}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 0.85, ease: EASE_EXPO, delay: delay + index * 0.08 }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  gap?: number;
  as?: ElementType;
  id?: string;
};

/** Parent for `StaggerItem` children. */
export function Stagger({ children, className, gap = 0.08, as = "div", id }: StaggerProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return (
      <Tag className={className} id={id}>
        {children}
      </Tag>
    );
  }

  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: gap, delayChildren: 0.04 } },
  };

  return (
    <MotionTag
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={REVEAL_VIEWPORT}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  y = 22,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: ElementType;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_EXPO } },
  };

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
