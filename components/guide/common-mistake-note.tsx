import { Icon } from "@/components/ui/icon";

export function CommonMistakeNote({ text }: { text?: string }) {
  if (!text) return null;

  return (
    <div className="flex items-start gap-2 rounded-xl bg-warning/10 px-3.5 py-3 text-sm text-foreground">
      <Icon name="AlertTriangle" className="mt-0.5 h-4 w-4 shrink-0 text-warning-foreground" />
      <p>
        <span className="font-medium">มักพลาดตรงนี้:</span> {text}
      </p>
    </div>
  );
}
