import { notFound } from "next/navigation";

import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
import { PageContainer } from "@/components/layout/page-container";
import { WorkflowSelector } from "@/components/guide/workflow-selector";
import { getRoomForDeepLink, getWorkflowsForRoom } from "@/lib/utils";

export default function RoomPage({
  params,
}: {
  params: { floorSlug: string; roomSlug: string };
}) {
  const room = getRoomForDeepLink(params.floorSlug, params.roomSlug);
  if (!room) notFound();

  const workflows = getWorkflowsForRoom(room);

  return (
    <>
      <AppHeader
        title={room.name}
        subtitle={room.shortDescription}
        backHref={`/floor/${room.floorSlug}`}
      />
      <PageContainer className="gap-5 pt-5">
        <WorkflowSelector room={room} workflows={workflows} />
      </PageContainer>
      <AppFooter />
    </>
  );
}
