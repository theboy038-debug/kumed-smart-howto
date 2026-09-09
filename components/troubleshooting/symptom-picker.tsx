import { TROUBLESHOOTING_CATEGORY_LABELS } from "@/lib/config/ui";
import type { TroubleshootingCategory, TroubleshootingIssue } from "@/lib/types";

const CATEGORY_ORDER: TroubleshootingCategory[] = [
  "display",
  "wireless",
  "cable-input",
  "general",
];

export function SymptomPicker({
  issues,
  onSelect,
}: {
  issues: TroubleshootingIssue[];
  onSelect: (issue: TroubleshootingIssue) => void;
}) {
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: issues.filter((issue) => (issue.category ?? "general") === category),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium">อาการที่พบคืออะไร?</h3>
      {grouped.map((group) => (
        <div key={group.category} className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {TROUBLESHOOTING_CATEGORY_LABELS[group.category]}
          </p>
          <div className="flex flex-col gap-2">
            {group.items.map((issue) => (
              <button
                key={issue.id}
                type="button"
                onClick={() => onSelect(issue)}
                className="min-h-[44px] rounded-2xl border border-border bg-surface p-3.5 text-left text-sm transition-colors hover:bg-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {issue.problem}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
