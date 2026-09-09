import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import type { Warning } from "@/lib/types";

const LEVEL_STYLES = {
  info: {
    container: "border-accent/30 bg-accent/10 text-foreground",
    icon: "Info",
    iconClass: "text-accent",
  },
  warning: {
    container: "border-warning/40 bg-warning/10 text-foreground",
    icon: "AlertTriangle",
    iconClass: "text-warning-foreground",
  },
  danger: {
    container: "border-danger/40 bg-danger/10 text-foreground",
    icon: "AlertTriangle",
    iconClass: "text-danger",
  },
} as const;

export function CriticalWarning({ warning }: { warning: Warning }) {
  const style = LEVEL_STYLES[warning.level];

  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-2xl border p-4",
        style.container,
      )}
    >
      <Icon name={style.icon} className={cn("h-5 w-5 shrink-0", style.iconClass)} />
      <div className="min-w-0">
        {warning.title && <p className="font-medium">{warning.title}</p>}
        <p className="text-sm">{warning.message}</p>
      </div>
    </div>
  );
}
