import { Icon } from "@/components/ui/icon";

/**
 * The only state a missing photo is ever allowed to render as (Phase 4
 * §7 NO BROKEN IMAGE, §8 IMAGE PLACEHOLDER). Never a technical string
 * like "IMAGE NOT FOUND" — always calm, on-brand, and captioned with
 * what a future photo should show.
 */
export function ImagePlaceholder({
  title,
  instruction,
}: {
  title?: string;
  instruction?: string;
}) {
  return (
    <div
      role="img"
      aria-label={title ?? "ภาพประกอบกำลังจัดเตรียม"}
      className="flex aspect-video w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-border bg-surface-elevated px-4 text-center text-muted"
    >
      <Icon name="ImageOff" className="h-6 w-6" />
      <p className="text-sm font-medium">{title ?? "ภาพประกอบกำลังจัดเตรียม"}</p>
      {instruction && <p className="text-xs">{instruction}</p>}
    </div>
  );
}
