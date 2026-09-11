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
import type { GuideStep, Room, Workflow } from "@/lib/types";

export function GuidedWorkflow({
  room,
  workflow,
}: {
  room: Room;
  workflow: Workflow;
}) {
  const [methodId, setMethodId] = useState<string | null>(null);
  const [beforeIndex, setBeforeIndex] = useState(0);
  const [osChoiceId, setOsChoiceId] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Phase 7 v3 §7–§11 — some flows have distinct SHARING METHODS (e.g.
  // Wireless Dongle vs Wi-Fi), asked before anything else. Each method
  // may then ask device type via its own osChoice. A workflow with
  // neither field behaves exactly as it always has.
  const needsMethodChoice = !!workflow.methodChoice;
  const selectedMethod = workflow.methodChoice?.options.find((o) => o.id === methodId);
  const awaitingMethodChoice = needsMethodChoice && !selectedMethod;

  // Phase 8 §3–§9 — control-box prep ("ตรวจกล่องควบคุม → Input/Audio =
  // ช่อง N") shown before the OS question or main steps, per method (or
  // at the workflow level for plain osChoice workflows like Floor 6/7
  // wireless). Not every workflow has this — most don't.
  const beforeSteps: GuideStep[] = needsMethodChoice
    ? selectedMethod?.beforeSteps ?? []
    : workflow.beforeSteps ?? [];
  const awaitingBeforeSteps =
    !awaitingMethodChoice && beforeSteps.length > 0 && beforeIndex < beforeSteps.length;

  const activeOsChoice = selectedMethod?.osChoice ?? (!needsMethodChoice ? workflow.osChoice : undefined);
  const selectedOsOption = activeOsChoice?.options.find((o) => o.id === osChoiceId);
  const awaitingOsChoice =
    !awaitingMethodChoice && !awaitingBeforeSteps && !!activeOsChoice && !selectedOsOption;

  const mainSteps = needsMethodChoice ? selectedMethod?.steps ?? [] : workflow.steps;
  const effectiveSteps = selectedOsOption ? [...selectedOsOption.steps, ...mainSteps] : mainSteps;

  const totalSteps = effectiveSteps.length;
  const step = effectiveSteps[stepIndex];
  const isLastStep = stepIndex === totalSteps - 1;
  const showingSteps = !awaitingMethodChoice && !awaitingBeforeSteps && !awaitingOsChoice && !!step;
  const beforeStep = beforeSteps[beforeIndex];
  const isLastBeforeStep = beforeIndex === beforeSteps.length - 1;

  function switchToMethod(id: string) {
    setMethodId(id);
    setBeforeIndex(0);
    setOsChoiceId(null);
    setStepIndex(0);
    setCompleted(false);
  }

  function goBack() {
    if (showingSteps) {
      if (stepIndex > 0) {
        setStepIndex((i) => i - 1);
      } else if (activeOsChoice) {
        setOsChoiceId(null);
      } else if (beforeSteps.length > 0) {
        setBeforeIndex(beforeSteps.length - 1);
      } else if (needsMethodChoice) {
        setMethodId(null);
      }
      return;
    }
    if (awaitingOsChoice) {
      if (beforeSteps.length > 0) {
        setBeforeIndex(beforeSteps.length - 1);
      } else if (needsMethodChoice) {
        setMethodId(null);
      }
      return;
    }
    if (awaitingBeforeSteps) {
      if (beforeIndex > 0) {
        setBeforeIndex((i) => i - 1);
      } else if (needsMethodChoice) {
        setMethodId(null);
      }
    }
  }
  const canGoBack =
    (showingSteps && (stepIndex > 0 || !!activeOsChoice || beforeSteps.length > 0 || needsMethodChoice)) ||
    (awaitingOsChoice && (beforeSteps.length > 0 || needsMethodChoice)) ||
    (awaitingBeforeSteps && (beforeIndex > 0 || needsMethodChoice));

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
          !completed && showingSteps && totalSteps > 0 ? (
            <StepProgress current={stepIndex + 1} total={totalSteps} />
          ) : undefined
        }
      />

      <PageContainer className="gap-5 pt-5">
        {workflow.criticalWarning && (
          <CriticalWarning warning={workflow.criticalWarning} />
        )}

        {!completed && <CommonMistakeNote text={workflow.commonMistake} />}

        {!completed && showingSteps && workflow.prerequisites && workflow.prerequisites.length > 0 && (
          <ul className="flex flex-col gap-1 rounded-2xl border border-border bg-surface-elevated p-4 text-sm text-muted">
            {workflow.prerequisites.map((p, i) => (
              <li key={i}>• {p}</li>
            ))}
          </ul>
        )}

        {/* Sharing-method question — e.g. "เลือกวิธีแชร์หน้าจอ" (Dongle vs Wi-Fi). */}
        {!completed && awaitingMethodChoice && workflow.methodChoice && (
          <div className="flex flex-col gap-3">
            <p className="text-lg font-medium">{workflow.methodChoice.question}</p>
            <div className="flex flex-col gap-3">
              {workflow.methodChoice.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => switchToMethod(option.id)}
                  className="flex min-h-[44px] flex-col gap-1 rounded-2xl border border-border bg-surface p-4 text-left transition-colors hover:bg-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span className="flex items-center gap-2 font-medium">
                    {option.label}
                    {option.badge && (
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                        {option.badge}
                      </span>
                    )}
                  </span>
                  {option.description && (
                    <span className="text-sm text-muted">{option.description}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Control-box prep steps — "ตรวจกล่องควบคุม → Input/Audio = ช่อง N". */}
        {!completed && awaitingBeforeSteps && beforeStep && (
          <div aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={beforeStep.id}
                initial={shouldReduceMotion ? undefined : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, x: -12 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
              >
                <GuideStepCard step={beforeStep} room={room} />
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={goBack}
                disabled={!canGoBack}
                className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-full border border-border py-3 text-sm font-medium text-muted transition-colors hover:bg-surface-elevated disabled:opacity-40"
              >
                <Icon name="ChevronLeft" className="h-4 w-4" />
                ย้อนกลับ
              </button>
              <button
                type="button"
                onClick={() => setBeforeIndex((i) => i + 1)}
                className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-full bg-accent py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                {isLastBeforeStep ? "พร้อมแล้ว" : "ถัดไป"}
                <Icon name="ChevronRight" className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Device-type question — asked once per method, before its steps. */}
        {!completed && !awaitingMethodChoice && !awaitingBeforeSteps && awaitingOsChoice && activeOsChoice && (
          <div className="flex flex-col gap-3">
            <p className="text-lg font-medium">{activeOsChoice.question}</p>
            <div className="flex flex-col gap-3">
              {activeOsChoice.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setOsChoiceId(option.id);
                    setStepIndex(0);
                  }}
                  className="min-h-[44px] rounded-2xl border border-border bg-surface p-4 text-left font-medium transition-colors hover:bg-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {option.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={goBack}
              className="flex min-h-[44px] items-center gap-1 self-start text-sm text-muted"
            >
              <Icon name="ChevronLeft" className="h-4 w-4" />
              ย้อนกลับ
            </button>
          </div>
        )}

        {/* Defensive empty state — current data always has ≥1 step, but a
            future authoring mistake must not render a blank page (§15). */}
        {!completed && !awaitingMethodChoice && !awaitingBeforeSteps && !awaitingOsChoice && totalSteps === 0 && (
          <div className="flex flex-col gap-4">
            <p className="rounded-2xl border border-border bg-surface p-4 text-sm text-muted">
              คู่มือนี้กำลังจัดเตรียม หากต้องการความช่วยเหลือ กรุณาติดต่อ IT Support
            </p>
            <TroubleshootingSection room={room} issues={workflowIssues} />
          </div>
        )}

        {/* aria-live announces the new step's content to screen readers on Next/Back */}
        {!completed && showingSteps && step && (
          <div aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={shouldReduceMotion ? undefined : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, x: -12 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
              >
                <GuideStepCard step={step} room={room} />
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={goBack}
                disabled={!canGoBack}
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

            {/* Calm "try a different method" CTA — not routed through
                error-style troubleshooting (Phase 7 v3 §11, §34). */}
            {isLastStep && selectedMethod?.fallbackMethodId && (
              <button
                type="button"
                onClick={() => switchToMethod(selectedMethod.fallbackMethodId!)}
                className="mt-3 flex min-h-[44px] w-full items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-sm font-medium text-accent"
              >
                {selectedMethod.fallbackPrompt ?? "ลองวิธีอื่นแทน"}
              </button>
            )}

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
                  setMethodId(null);
                  setBeforeIndex(0);
                  setOsChoiceId(null);
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
