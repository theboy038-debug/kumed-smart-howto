/**
 * room703.ts
 *
 * Room 703 — Gross Anatomy Lab & Briefing Room — is a special AV system
 * and must never be treated as a plain smart classroom (Bible §8, §73).
 * This models its Source / Room Mode / Lecture Input concepts explicitly
 * so the app can reason about it via `room.template === "gross-briefing"`
 * and `room.system`, rather than hardcoded `floor === 7 && room === 703`
 * checks anywhere in the UI (Bible §84 NO HARDCODED FACILITY LOGIC).
 */

import type { Fact } from "./common";

export type Room703RoomMode = "combined" | "separated";
export type Room703SourceId = "camera" | "lecture";
export type Room703LectureInputId = "hdmi" | "wireless";

export interface Room703Source {
  id: Room703SourceId;
  /** User-facing Thai label — e.g. "กล้องเคน" for the camera source. */
  label: string;
  description?: string;
}

export interface Room703LectureInput {
  id: Room703LectureInputId;
  label: string;
  description?: string;
}

export interface Room703PowerStartupStep {
  order: number;
  title: string;
  instruction: string;
  /** Steps 3 & 4 in the Bible are verification checks, not actions. */
  isCheckStep?: boolean;
}

export interface Room703WirelessStep {
  order: number;
  instruction: string;
}

/**
 * The live state a user (via iPadGross) puts the room into.
 * NOTE: this state is an internal application/data concept. The UI must
 * never expose it to the user as raw technical state — users only ever
 * see the Thai labels: "รวมห้อง", "แยกห้อง", "กล้องเคน", "Lecture",
 * "HDMI", "Wireless" (Bible §60).
 */
export interface Room703State {
  roomMode: Room703RoomMode;
  source: Room703SourceId;
  lectureInput?: Room703LectureInputId;
}

/**
 * CORE BUSINESS RULE (Bible §61 — must not be changed on a guess):
 *   roomMode = "combined"  → Gross and Briefing displays show the SAME
 *                            selected source.
 *   roomMode = "separated" → Gross ALWAYS shows Camera; Briefing ALWAYS
 *                            shows Lecture. This pairing is fixed, not
 *                            user-selectable per side.
 */
export interface Room703System {
  /** Fixed device name — must be used verbatim in data/UI (Bible §10). */
  controllerName: "iPadGross";
  sources: Room703Source[];
  lectureInputs: Room703LectureInput[];
  /** IT typically leaves the room in Combined + Lecture (Bible §16, §62). */
  defaultState: Room703State;
  powerStartup: Room703PowerStartupStep[];
  wirelessSharingFlow: Room703WirelessStep[];
  /** Official Power Control / switch naming is unconfirmed — Bible §110. */
  powerControlName: Fact<{ value: string }>;
}
