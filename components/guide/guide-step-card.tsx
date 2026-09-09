import { GuideImage } from "@/components/visual/guide-image";
import { KeyboardShortcut } from "@/components/guide/keyboard-shortcut";
import { ExpectedResult } from "@/components/guide/expected-result";
import { StatusTagList } from "@/components/guide/status-tag-list";
import { CriticalWarning } from "@/components/guide/critical-warning";
import type { GuideStep } from "@/lib/types";

const PLATFORM_LABEL: Record<string, string> = {
  windows: "Windows",
  mac: "Mac / iPad",
  both: "",
};

export function GuideStepCard({ step }: { step: GuideStep }) {
  const platformLabel = step.platformVariant
    ? PLATFORM_LABEL[step.platformVariant]
    : "";

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-sm font-medium text-muted">
          {platformLabel && `${platformLabel} — `}
          {step.title}
        </p>
        <p className="mt-1 text-lg leading-snug">{step.instruction}</p>
      </div>

      <StatusTagList tags={step.statusTags} />
      <KeyboardShortcut keys={step.keyboardShortcut} />
      <GuideImage image={step.image} />
      {step.warning && <CriticalWarning warning={step.warning} />}
      <ExpectedResult text={step.expectedResult} />
    </div>
  );
}
