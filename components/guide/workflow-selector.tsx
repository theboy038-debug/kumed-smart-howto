import { WorkflowCard } from "@/components/guide/workflow-card";
import { EMPTY_WORKFLOW_MESSAGE } from "@/lib/config/ui";
import type { Room, Workflow } from "@/lib/types";

export function WorkflowSelector({
  room,
  workflows,
}: {
  room: Room;
  workflows: Workflow[];
}) {
  if (workflows.length === 0) {
    return (
      <p className="rounded-2xl border border-border bg-surface p-4 text-sm text-muted">
        {EMPTY_WORKFLOW_MESSAGE}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-muted">วันนี้ต้องการทำอะไร?</h2>
      <ul className="flex flex-col gap-3">
        {workflows.map((workflow) => (
          <li key={workflow.id}>
            <WorkflowCard
              workflow={workflow}
              href={`/floor/${room.floorSlug}/${room.slug}/${workflow.slug}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
