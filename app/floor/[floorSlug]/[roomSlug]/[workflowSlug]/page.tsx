import { notFound } from "next/navigation";

import { GuidedWorkflow } from "@/components/guide/guided-workflow";
import { getRoomForDeepLink, getWorkflowForRoomBySlug } from "@/lib/utils";

export default function WorkflowPage({
  params,
}: {
  params: { floorSlug: string; roomSlug: string; workflowSlug: string };
}) {
  const room = getRoomForDeepLink(params.floorSlug, params.roomSlug);
  if (!room) notFound();

  const workflow = getWorkflowForRoomBySlug(room, params.workflowSlug);
  if (!workflow) notFound();

  return <GuidedWorkflow room={room} workflow={workflow} />;
}
