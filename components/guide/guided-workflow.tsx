"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
import { PageContainer } from "@/components/layout/page-container";
import { CriticalWarning } from "@/components/guide/critical-warning";
import { CommonMistakeNote } from "@/components/guide/common-mistake-note";
import { GuideStepCard } from "@/components/guide/guide-step-card";
import { StepProgress } from "@/components/guide/step-progress";
import { TroubleshootingSection } from "@/components/troubleshooting/troubleshooting-section";
import { Icon } from "@/components/ui/icon";
import { getTroubleshootingById } from "@/lib/utils";
import type { Room, Workflow } from "@/lib/types";

export function GuidedWorkflow({
  room,
  workflow,
}: {
  room: Room;
  workflow: Workflow;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const totalSteps = workflow.steps.length;
  const step = workflow.steps[stepIndex];
  const isLastStep = stepIndex === totalSteps - 1;

  const workflowIssues = (workflow.troubleshootingIds ?? [])
    .map(getTroubleshootingById)
    .filter((issue): issue is NonNullable<typeof issue> => issue !== undefined);

  const backHref = `/floor/${room.floorSlug}/${room.slug}`;

  return (
    <>
      <AppHeader
        title={workflow.title}
        subtitle={room.name}
        backHref={backHref}
        rightSlot={
          !completed && totalSteps > 0 ? (
            <StepProgress current={stepIndex + 1} total={totalSteps} />
          ) : undefined
        }
      />

      <PageContainer className="gap-5 pt-5">
        {workflow.criticalWarning && (
          <CriticalWarning warning={workflow.criticalWarning} />
        )}

        {!completed && <CommonMistakeNote text={workflow.commonMistake} />}

        {!completed && workflow.prerequisites && workflow.prerequisites.length > 0 && (
          <ul className="flex flex-col gap-1 rounded-2xl border border-border bg-surface-elevated p-4 text-sm text-muted">
            {workflow.prerequisites.map((p, i) => (
              <li key={i}>• {p}</li>
            ))}
          </ul>
        )}

        {/* Defensive empty state — current data always has ≥1 step, but a
            future authoring mistake must not render a blank page (§15). */}
        {!completed && totalSteps === 0 && (
          <div className="flex flex-col gap-4">
            <p className="rounded-2xl border border-border bg-surface p-4 text-sm text-muted">
              คู่มือนี้กำลังจัดเตรียม หากต้องการความช่วยเหลือ กรุณาติดต่อ IT Support
            </p>
            <TroubleshootingSection room={room} issues={workflowIssues} />
          </div>
        )}

        {/* aria-live announces the new step's content to screen readers on Next/Back */}
        {!completed && step && (
          <div aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={shouldReduceMotion ? undefined : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, x: -12 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
              >
                <GuideStepCard step={step} />
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                disabled={stepIndex === 0}
                className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-full border border-border py-3 text-sm font-medium text-muted transition-colors hover:bg-surface-elevated disabled:opacity-40"
              >
                <Icon name="ChevronLeft" className="h-4 w-4" />
                ย้อนกลับ
              </button>
              <button
                type="button"
                onClick={() =>
                  isLastStep ? setCompleted(true) : setStepIndex((i) => i + 1)
                }
                className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-full bg-accent py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                {isLastStep ? "เสร็จสิ้น" : "ถัดไป"}
                {!isLastStep && <Icon name="ChevronRight" className="h-4 w-4" />}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowHelp((v) => !v)}
              aria-expanded={showHelp}
              className="mt-4 flex min-h-[44px] w-full items-center justify-center text-sm text-muted underline underline-offset-2"
            >
              {showHelp ? "ซ่อนความช่วยเหลือ" : "ขั้นตอนนี้ไม่สำเร็จ?"}
            </button>

            {showHelp && (
              <div className="mt-4">
                <TroubleshootingSection room={room} issues={workflowIssues} />
              </div>
            )}
          </div>
        )}

        {completed && (
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: "easeOut" }}
            className="flex flex-col gap-5"
          >
            <div
              role="status"
              className="flex flex-col items-center gap-2 rounded-2xl border border-success/30 bg-success/10 p-6 text-center"
            >
              <Icon name="CheckCircle2" className="h-8 w-8 text-success" />
              <p className="font-medium text-success">
                {workflow.successMessage ?? "ทำตามขั้นตอนครบแล้ว"}
              </p>
              <button
                type="button"
                onClick={() => {
                  setStepIndex(0);
                  setCompleted(false);
                }}
                className="mt-1 min-h-[44px] text-sm text-muted underline"
              >
                เริ่มขั้นตอนนี้ใหม่
              </button>
            </div>

            <TroubleshootingSection room={room} issues={workflowIssues} />
          </motion.div>
        )}
      </PageContainer>

      <AppFooter />
    </>
  );
}
