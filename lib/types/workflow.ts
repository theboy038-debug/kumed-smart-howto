/**
 * workflow.ts
 *
 * A Workflow is a single user intent ("I want to share my laptop
 * wirelessly") translated into an ordered list of concrete, physical
 * steps (Bible §2, §8.2, §8.3, §37, §38).
 *
 * Workflows are pure data. UI components (GuideStep, GuidedWorkflow, ...)
 * must render whatever is passed in — never hardcode room- or workflow-
 * specific copy inside a component (Bible §47 DATA / UI SEPARATION).
 */

import type { Slug, Warning } from "./common";
import type { GuideImage, StatusTag } from "./guide";

/** Windows vs Mac/iPad instructions sometimes diverge for the same logical step. */
export type PlatformVariant = "windows" | "mac" | "both";

export interface GuideStep {
  id: string;
  order: number;
  title: string;
  instruction: string;
  platformVariant?: PlatformVariant;
  image?: GuideImage;
  /** Rendered as physical keyboard keys, e.g. ["Win", "K"] or ["Cmd", "Space"]. */
  keyboardShortcut?: string[];
  /** "What you should see" after performing this step (Bible Principle 07). */
  expectedResult?: string;
  warning?: Warning;
  statusTags?: StatusTag[];
  /** IDs into troubleshooting.ts relevant specifically to this step. */
  troubleshootingIds?: string[];
  /**
   * Phase 7 §10/§19/§29 — when true, this step shows the room's real
   * Wi-Fi SSID/password (via the room's confirmed `configuration.wifi`
   * Fact) instead of just the generic "wifi-required" tag. Pure UI
   * flag — the actual SSID/password always comes from data, never from
   * this component.
   */
  showRoomWifi?: boolean;
}

export interface Workflow {
  id: string;
  slug: Slug;
  /** Intent-first, human language — never internal system/input names (Bible Principle 01). */
  title: string;
  shortDescription?: string;
  /** lucide-react icon name. */
  icon?: string;
  prerequisites?: string[];
  /**
   * Shown BEFORE any steps, always visible, never collapsible
   * (Bible Principle 06 SAFE BY DEFAULT).
   */
  criticalWarning?: Warning;
  steps: GuideStep[];
  successMessage?: string;
  /** IDs into troubleshooting.ts relevant to the workflow as a whole. */
  troubleshootingIds?: string[];
  /**
   * Phase 5 §14 COMMON MISTAKES — a single, already-verified fact worth
   * repeating at a glance. Only ever set when the same fact already
   * exists elsewhere in confirmed data (e.g. a room's systemNotes);
   * never invented for this field alone.
   */
  commonMistake?: string;
  /**
   * Phase 7 §11/§18/§30 — some wireless flows must ask the user's device
   * type ONCE, up front, then show only that device's steps (never both
   * mixed in one step). When present, GuidedWorkflow shows this question
   * before any of `steps`, then prepends the chosen option's steps to
   * `steps` — so `steps` holds whatever is common to both devices
   * (e.g. "ตรวจสอบภาพ", "ตรวจสอบเสียง"), and each option holds only its
   * own device-specific connection steps. Optional and additive: a
   * workflow with no osChoice behaves exactly as before.
   */
  osChoice?: {
    question: string;
    options: { id: "windows" | "mac"; label: string; steps: GuideStep[] }[];
  };
  /**
   * Phase 7 v3 §7–§11 — some flows have genuinely different SHARING
   * METHODS (not just OS differences), e.g. "Wireless Dongle" vs
   * "Wi-Fi". Ask which method up front; each method may optionally ask
   * device type afterward via its own `osChoice`. A method can also
   * name a `fallbackMethodId` — shown as a calm "try this instead"
   * prompt after its last step, not routed through error-style
   * troubleshooting (§11, §34).
   */
  methodChoice?: {
    question: string;
    options: {
      id: string;
      label: string;
      description?: string;
      /** e.g. "⭐ แนะนำสำหรับ Mac" — a suggestion, never an exclusivity claim (§9). */
      badge?: string;
      /**
       * Phase 8 §4–§9 — control-box prep (which image/audio channel to
       * select) shown BEFORE the OS question or steps, e.g. "ตรวจกล่อง
       * ควบคุม → Input = ช่อง 2 → ช่องเสียง = ช่อง 2". Optional and
       * per-method since not every floor's control box has these
       * switches (Floor 6 never uses this field).
       */
      beforeSteps?: GuideStep[];
      steps?: GuideStep[];
      osChoice?: {
        question: string;
        options: { id: "windows" | "mac"; label: string; steps: GuideStep[] }[];
      };
      fallbackMethodId?: string;
      fallbackPrompt?: string;
    }[];
  };
  /**
   * Phase 8 §4–§13 — same purpose as methodChoice options' `beforeSteps`,
   * for workflows that go straight to an `osChoice` with no method
   * selection first (e.g. Floor 6/7 wireless: "ตรวจกล่องควบคุม → เลือก
   * Input 2" before asking Windows vs Mac).
   */
  beforeSteps?: GuideStep[];
}
