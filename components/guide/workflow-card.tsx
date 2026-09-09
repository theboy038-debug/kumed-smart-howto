import { MotionCard } from "@/components/ui/motion-card";
import { Icon } from "@/components/ui/icon";
import type { Workflow } from "@/lib/types";

export function WorkflowCard({
  workflow,
  href,
}: {
  workflow: Workflow;
  href: string;
}) {
  return (
    <MotionCard href={href} ariaLabel={workflow.title}>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Icon name={workflow.icon} className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="font-medium">{workflow.title}</div>
        {workflow.shortDescription && (
          <p className="mt-0.5 truncate text-sm text-muted">
            {workflow.shortDescription}
          </p>
        )}
      </div>

      <Icon name="ChevronRight" className="h-5 w-5 shrink-0 text-muted" />
    </MotionCard>
  );
}
