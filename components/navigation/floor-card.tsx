import { MotionCard } from "@/components/ui/motion-card";
import { Icon } from "@/components/ui/icon";
import type { Floor } from "@/lib/types";

export function FloorCard({ floor }: { floor: Floor }) {
  return (
    <MotionCard href={`/floor/${floor.slug}`} ariaLabel={floor.name}>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Icon name={floor.icon} className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="font-medium">{floor.name}</div>
        {floor.tagline && (
          <div className="truncate text-sm text-muted">{floor.tagline}</div>
        )}
      </div>

      <Icon name="ChevronRight" className="h-5 w-5 shrink-0 text-muted" />
    </MotionCard>
  );
}
