"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { SymptomPicker } from "@/components/troubleshooting/symptom-picker";
import { RecoveryFlow } from "@/components/troubleshooting/recovery-flow";
import { ContactItActions } from "@/components/troubleshooting/contact-it-actions";
import type { Room, TroubleshootingIssue } from "@/lib/types";

/**
 * Phase 5 §4 TROUBLESHOOTING FLOW:
 *   symptom picker → one fix at a time → resolved, or → escalate to IT.
 *
 * If a room has no matching issues at all, skip straight to Contact IT
 * (Phase 5 §16: that's an "unavailable" state, not a broken "pending"
 * one — there's simply nothing to self-serve, so go straight to help).
 */
export function TroubleshootingSection({
  room,
  issues,
}: {
  room: Room;
  issues: TroubleshootingIssue[];
}) {
  const [activeIssue, setActiveIssue] = useState<TroubleshootingIssue | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-muted">ถ้ายังไม่สำเร็จ</h2>

      <AnimatePresence mode="wait">
        {activeIssue ? (
          <motion.div
            key="flow"
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
          >
            <RecoveryFlow
              room={room}
              issue={activeIssue}
              onBack={() => setActiveIssue(null)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="picker"
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
            className="flex flex-col gap-3"
          >
            {issues.length > 0 && (
              <SymptomPicker issues={issues} onSelect={setActiveIssue} />
            )}
            <ContactItActions room={room} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
