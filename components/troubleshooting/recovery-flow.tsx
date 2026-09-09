"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { Icon } from "@/components/ui/icon";
import { GuideImage } from "@/components/visual/guide-image";
import { ExpectedResult } from "@/components/guide/expected-result";
import { ContactItActions } from "@/components/troubleshooting/contact-it-actions";
import type { Room, TroubleshootingIssue } from "@/lib/types";

export function RecoveryFlow({
  room,
  issue,
  onBack,
}: {
  room: Room;
  issue: TroubleshootingIssue;
  /** Return to the symptom list. */
  onBack: () => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [resolved, setResolved] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const step = issue.quickFixes[stepIndex];
  const isLastStep = stepIndex === issue.quickFixes.length - 1;
  const exhausted = stepIndex >= issue.quickFixes.length;

  if (resolved) {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-2 rounded-2xl border border-success/30 bg-success/10 p-6 text-center"
      >
        <Icon name="CheckCircle2" className="h-7 w-7 text-success" />
        <p className="font-medium text-success">เยี่ยมเลย ใช้งานต่อได้เลยครับ</p>
        <button type="button" onClick={onBack} className="mt-1 text-sm text-muted underline">
          กลับไปยังหน้าปัญหา
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4">
      <button
        type="button"
        onClick={onBack}
        className="flex min-h-[44px] items-center gap-1 self-start text-sm text-muted"
      >
        <Icon name="ChevronLeft" className="h-4 w-4" />
        เลือกปัญหาอื่น
      </button>

      <p className="font-medium">{issue.problem}</p>

      {issue.image && <GuideImage image={issue.image} />}

      {/* aria-live announces each new fix / the escalation message to screen readers */}
      <div aria-live="polite">
        {!exhausted && step && (
          <AnimatePresence mode="wait">
            <motion.div
              key={stepIndex}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.15, ease: "easeOut" }}
              className="flex flex-col gap-3"
            >
              <p className="text-sm text-muted">
                ลองข้อ {stepIndex + 1} จาก {issue.quickFixes.length}
              </p>
              <p className="text-lg leading-snug">{step.instruction}</p>
              {step.image && <GuideImage image={step.image} />}
              <ExpectedResult text={step.expectedResult} />

              <div className="mt-1 flex gap-3">
                <button
                  type="button"
                  onClick={() => setResolved(true)}
                  className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-full bg-success py-3.5 text-sm font-medium text-success-foreground transition-opacity hover:opacity-90"
                >
                  <Icon name="CheckCircle2" className="h-4 w-4" />
                  ได้แล้ว
                </button>
                <button
                  type="button"
                  onClick={() => setStepIndex((i) => i + 1)}
                  className="flex min-h-[44px] flex-1 items-center justify-center rounded-full border border-border py-3.5 text-sm font-medium text-muted transition-colors hover:bg-surface-elevated"
                >
                  {isLastStep ? "ยังไม่ขึ้น" : "ยังไม่ขึ้น ลองข้อถัดไป"}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {exhausted && (
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
            className="flex flex-col gap-3"
          >
            <p className="text-sm">
              ยังไม่ได้ใช่ไหมครับ ไม่เป็นไร — {issue.escalationMessage}
            </p>
            <ContactItActions
              room={room}
              contextLabel={`${room.name} — ${issue.problem}`}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
