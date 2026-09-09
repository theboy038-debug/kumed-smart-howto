"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Icon } from "@/components/ui/icon";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // Avoid a light/dark mismatch flash between server and client render.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-11 w-11" aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "เปลี่ยนเป็นโหมดสว่าง" : "เปลี่ยนเป็นโหมดมืด"}
      className="flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-elevated hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
    >
      <Icon name={isDark ? "Sun" : "Moon"} className="h-5 w-5" />
    </button>
  );
}
