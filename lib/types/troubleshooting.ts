/**
 * troubleshooting.ts
 *
 * Data-driven "it doesn't work" recovery flow (Bible Principle 08 RECOVERY
 * FIRST, §29, §39, §40, §41).
 *
 * SAFE TROUBLESHOOTING RULE (Bible §40): quickFixes must only ever contain
 * actions an ordinary user can safely perform themselves — checking a
 * cable, confirming a device is powered on, reconnecting Wi-Fi, re-opening
 * Win+K / Screen Mirroring, re-checking a PIN, selecting the right input.
 * Never instruct a user to open a rack, change AV routing/EDID, factory
 * reset a device, or touch admin/network settings — that always escalates
 * to IT instead.
 */

import type { GuideImage } from "./guide";

/**
 * A single, atomic recovery action (Phase 5 §6 ONE PROBLEM → ONE ACTION):
 * exactly one thing to try, plus what success looks like so the user can
 * tell whether it worked (Phase 5 §7 EXPECTED RESULT).
 */
export interface TroubleshootingStep {
  instruction: string;
  expectedResult?: string;
  /** Only when a photo genuinely helps (Phase 5 §12) — optional, pending until captured. */
  image?: GuideImage;
}

/** Broad grouping so a long issue list can be scanned by symptom area (Phase 5 §5). */
export type TroubleshootingCategory = "display" | "wireless" | "cable-input" | "general";

export interface TroubleshootingIssue {
  id: string;
  /** User-facing problem label shown as a selectable option, e.g. "ไม่พบชื่อจอ". */
  problem: string;
  category?: TroubleshootingCategory;
  symptoms?: string[];
  /** Optional overview visual shown once before stepping through fixes. */
  image?: GuideImage;
  /** Ordered, user-safe actions only — see SAFE TROUBLESHOOTING RULE above. Tried one at a time. */
  quickFixes: TroubleshootingStep[];
  /** Shown when quick fixes don't resolve it, right before the Contact IT action. */
  escalationMessage: string;
  /** Optional links back to workflows this issue commonly appears in. */
  relatedWorkflowIds?: string[];
}
