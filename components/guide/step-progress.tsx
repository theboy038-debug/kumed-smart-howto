import { cn } from "@/lib/utils";

export function StepProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted" aria-live="polite">
      <span>
        ขั้นตอน {current} / {total}
      </span>
      <div className="flex items-center gap-1" aria-hidden>
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              i < current ? "bg-accent" : "bg-border",
            )}
          />
        ))}
      </div>
    </div>
  );
}
