import { Pill } from "@/components/ui/pill";
import { STATUS_TAG_LABELS } from "@/lib/config/ui";
import type { StatusTag } from "@/lib/types";

export function StatusTagList({ tags }: { tags?: StatusTag[] }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <Pill
          key={`${tag.kind}-${i}`}
          tone={tag.kind === "do-not-change" ? "danger" : "accent"}
        >
          {tag.label ?? STATUS_TAG_LABELS[tag.kind]}
        </Pill>
      ))}
    </div>
  );
}
