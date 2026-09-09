import { MotionCard } from "@/components/ui/motion-card";
import { Icon } from "@/components/ui/icon";
import { Pill } from "@/components/ui/pill";
import type { Room } from "@/lib/types";

export function RoomCard({ room }: { room: Room }) {
  return (
    <MotionCard href={`/floor/${room.floorSlug}/${room.slug}`} ariaLabel={room.name}>
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="min-w-0 break-words font-medium">{room.name}</span>
          {room.status === "pending" && (
            <Pill tone="warning" className="shrink-0">
              <Icon name="HelpCircle" className="h-3 w-3" />
              กำลังจัดเตรียมข้อมูล
            </Pill>
          )}
        </div>
        {room.shortDescription && (
          <p className="mt-0.5 truncate text-sm text-muted">
            {room.shortDescription}
          </p>
        )}
      </div>

      <Icon name="ChevronRight" className="h-5 w-5 shrink-0 text-muted" />
    </MotionCard>
  );
}
