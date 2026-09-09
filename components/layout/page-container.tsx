import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Mobile is the first-class experience (Bible §56 RESPONSIVE) — the
 * max-width keeps content comfortably narrow even as it scales up to
 * tablet/desktop rather than stretching into a desktop-first layout.
 */
export function PageContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto flex w-full max-w-xl flex-col px-5 pb-16", className)}>
      {children}
    </div>
  );
}
