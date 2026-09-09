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
}
