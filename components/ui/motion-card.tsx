"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Bible §54 ANIMATION allows card hover but warns against animating
 * everything; §55 ACCESSIBILITY requires respecting reduced motion.
 * Both rules live here once instead of being re-implemented per card.
 */
export function MotionCard({
  href,
  children,
  className,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Link href={href} aria-label={ariaLabel} className="block focus-visible:outline-none">
      <motion.div
        whileHover={shouldReduceMotion ? undefined : { y: -2 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className={cn(
          "flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 shadow-sm transition-colors hover:bg-surface-elevated hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          className,
        )}
      >
        {children}
      </motion.div>
    </Link>
  );
}
