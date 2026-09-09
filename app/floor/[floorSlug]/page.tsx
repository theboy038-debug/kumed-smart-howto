import { notFound } from "next/navigation";

import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
import { PageContainer } from "@/components/layout/page-container";
import { RoomCard } from "@/components/navigation/room-card";
import { getFloorBySlug, getRoomsForFloor } from "@/lib/utils";

export default function FloorPage({
  params,
}: {
  params: { floorSlug: string };
}) {
  const floor = getFloorBySlug(params.floorSlug);
  if (!floor) notFound();

  const rooms = getRoomsForFloor(floor.slug);

  return (
    <>
      <AppHeader title={floor.name} backHref="/" />
      <PageContainer className="gap-5 pt-5">
        {!floor.hasRooms ? (
          <p className="rounded-2xl border border-border bg-surface p-4 text-sm">
            {floor.description}
          </p>
        ) : rooms.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {rooms.map((room) => (
              <li key={room.id}>
                <RoomCard room={room} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl border border-border bg-surface p-4 text-sm text-muted">
            ยังไม่มีข้อมูลห้องสำหรับชั้นนี้ กรุณาติดต่อ IT Support
          </p>
        )}
      </PageContainer>
      <AppFooter />
    </>
  );
}
