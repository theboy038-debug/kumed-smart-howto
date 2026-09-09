import { Icon } from "@/components/ui/icon";

export function ExpectedResult({ text }: { text?: string }) {
  if (!text) return null;

  return (
    <div className="flex items-start gap-2 rounded-xl bg-success/10 px-3 py-2.5 text-sm text-success">
      <Icon name="CheckCircle2" className="mt-0.5 h-4 w-4 shrink-0" />
      <p>
        <span className="font-medium">ทำแล้วควรเห็น:</span> {text}
      </p>
    </div>
  );
}
