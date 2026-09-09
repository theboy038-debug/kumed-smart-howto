import Link from "next/link";
import type { ReactNode } from "react";

import { Icon } from "@/components/ui/icon";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function AppHeader({
  title,
  subtitle,
  backHref,
  backLabel = "กลับ",
  rightSlot,
}: {
  title: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
  /** Extra element on the right, e.g. progress dots on a guide page. */
  rightSlot?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-xl items-center gap-3 px-5 py-3">
        {backHref ? (
          <Link
            href={backHref}
            aria-label={backLabel}
            className="-ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-elevated hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            <Icon name="ChevronLeft" className="h-5 w-5" />
          </Link>
        ) : null}

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-semibold leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="truncate text-xs text-muted">{subtitle}</p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {rightSlot}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
