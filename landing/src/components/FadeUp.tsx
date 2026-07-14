"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

type FadeUpProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "span" | "h1" | "h2" | "h3" | "p" | "nav";
  once?: boolean;
};

const TAGS = {
  div: motion.div,
  section: motion.section,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  nav: motion.nav,
} as const;

/** Generic scroll/mount fade-up-in-view primitive — used by the cinematic hero's
 * word-by-word stagger. Distinct from Reveal (which is section-level and always
 * scroll-triggered); FadeUp is per-element and can fire on mount too. */
export function FadeUp({
  children,
  delay = 0,
  duration = 0.7,
  y = 24,
  className,
  style,
  as = "div",
  once = true,
}: FadeUpProps) {
  const Tag = TAGS[as];
  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
