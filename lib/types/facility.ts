/**
 * facility.ts
 *
 * Floor and Room — the top of the data-driven architecture (Bible §6,
 * §35, §36). Adding a room or floor should only ever require adding data
 * here (and in lib/data/), never new page components or branching logic.
 */

import type { Fact, Slug, IconName } from "./common";
import type { Room703System } from "./room703";

/**
 * Shared UI/behavior patterns a room can use. New rooms should map onto
 * one of these instead of inventing bespoke logic (Bible §36).
 *
 * "meeting-room" extends the Bible's suggested union: Floor 6's meeting
 * room (§21) and Floor 6's classrooms 601–608 (§22) are both "Floor 6"
 * but behave differently enough — no wireless, input pre-selected, vs.
 * a full Room PC / Wireless choice — to warrant separate templates
 * rather than overloading "conference" or "small-classroom".
 */
export type RoomTemplate =
  | "conference" // Floor 5 Jongrak: Webex + recording + personal screen share
  | "meeting-room" // Floor 6 meeting room: Smart TV + Room PC + notebook cable, no wireless
  | "small-classroom" // Floor 6 classrooms 601–608: shared template + per-room config
  | "smart-classroom" // Floor 7 rooms 701/702: touchscreen source selector
  | "gross-briefing" // Room 703: Gross Anatomy Lab + Briefing Room special system
  | "it-support"; // Floor 9: informational only, no AV workflow

export interface Floor {
  id: string;
  slug: Slug; // e.g. "5", "6", "7", "9"
  name: string; // e.g. "ชั้น 5"
  icon?: IconName;
  tagline?: string; // short subtitle line(s) shown on the floor card
  description?: string;
  /** Floors like Floor 9 have no AV rooms — home page shows an info card instead. */
  hasRooms: boolean;
  roomSlugs: Slug[];
}

export interface RoomConfiguration {
  wifi: Fact<{ ssid: string }>;
  displayName: Fact<{ value: string }>;
  /** Room-level override; falls back to the global SUPPORT_CONFIG when absent. */
  contact?: Fact<{ phone?: string; lineUrl?: string; helpdeskUrl?: string }>;
}

export interface RoomBase {
  id: string;
  slug: Slug;
  floorSlug: Slug;
  /** Official room number if confirmed — otherwise omit rather than invent. */
  number?: string;
  name: string; // e.g. "ห้องประชุมจงรัก"
  shortDescription?: string;
  template: RoomTemplate;
  /** Whether this room's guide content is considered complete/ready. */
  status: "ready" | "pending";
  configuration: RoomConfiguration;
  workflowIds: string[];
  troubleshootingIds: string[];
  /** Plain-language "what's in this room" bullets for the System Overview. */
  overview?: string[];
  /** Advanced/technical notes, kept secondary to the intent-first flow. */
  systemNotes?: string[];
}

/** Room 703 carries an additional, richly modeled special system. */
export interface GrossBriefingRoom extends RoomBase {
  template: "gross-briefing";
  system: Room703System;
}

export type Room = RoomBase | GrossBriefingRoom;

export function isGrossBriefingRoom(room: Room): room is GrossBriefingRoom {
  return room.template === "gross-briefing";
}
