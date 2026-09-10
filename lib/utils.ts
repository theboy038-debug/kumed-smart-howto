/**
 * utils.ts
 *
 * The "Guide Engine" query layer (Bible §6): every page/component reads
 * data through these functions instead of importing raw arrays and
 * filtering ad hoc. This is also the seam for the future CMS migration
 * (Bible §48) — swap the bodies of these functions for Supabase/API
 * calls later without touching a single component.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { FLOORS } from "@/lib/data/floors";
import { ROOMS } from "@/lib/data/rooms";
import { WORKFLOWS } from "@/lib/data/workflows";
import { TROUBLESHOOTING_ISSUES } from "@/lib/data/troubleshooting";
import { PENDING_FACT_MESSAGE } from "@/lib/config/ui";
import { SUPPORT_CONFIG } from "@/lib/config/support";
import { factValue, type Fact, type Floor, type Room, type TroubleshootingIssue, type Workflow } from "@/lib/types";

/** Tailwind class merge helper, standard for shadcn/ui components. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Floors -----------------------------------------------------------

export function getAllFloors(): Floor[] {
  return FLOORS;
}

export function getFloorBySlug(slug: string): Floor | undefined {
  return FLOORS.find((floor) => floor.slug === slug);
}

// --- Rooms --------------------------------------------------------------

export function getAllRooms(): Room[] {
  return ROOMS;
}

export function getRoomBySlug(slug: string): Room | undefined {
  return ROOMS.find((room) => room.slug === slug);
}

export function getRoomsForFloor(floorSlug: string): Room[] {
  return ROOMS.filter((room) => room.floorSlug === floorSlug);
}

/** Resolves a room directly from a QR deep link like `/floor/7/room-703`. */
export function getRoomForDeepLink(
  floorSlug: string,
  roomSlug: string,
): Room | undefined {
  const room = getRoomBySlug(roomSlug);
  return room?.floorSlug === floorSlug ? room : undefined;
}

// --- Workflows ------------------------------------------------------------

export function getWorkflowById(id: string): Workflow | undefined {
  return WORKFLOWS.find((workflow) => workflow.id === id);
}

export function getWorkflowsForRoom(room: Room): Workflow[] {
  return room.workflowIds
    .map(getWorkflowById)
    .filter((workflow): workflow is Workflow => workflow !== undefined);
}

/** Resolves a workflow scoped to a room's own list, by its slug (used for QR/deep-link routes). */
export function getWorkflowForRoomBySlug(
  room: Room,
  workflowSlug: string,
): Workflow | undefined {
  return getWorkflowsForRoom(room).find((wf) => wf.slug === workflowSlug);
}

// --- Troubleshooting --------------------------------------------------

export function getTroubleshootingById(
  id: string,
): TroubleshootingIssue | undefined {
  return TROUBLESHOOTING_ISSUES.find((issue) => issue.id === id);
}

export function getTroubleshootingForRoom(room: Room): TroubleshootingIssue[] {
  return room.troubleshootingIds
    .map(getTroubleshootingById)
    .filter((issue): issue is TroubleshootingIssue => issue !== undefined);
}

// --- Facts (Bible §9, §58 UNKNOWN DATA POLICY) -------------------------

/**
 * Safely reads a Fact for display. Never returns a raw placeholder like
 * "CHANGE_ME" — pending facts resolve to a friendly generic message.
 */
export function resolveFact<T>(
  fact: Fact<T> | undefined,
  render: (value: T) => string,
  fallback: string = PENDING_FACT_MESSAGE,
): { text: string; isPending: boolean } {
  if (fact?.status === "confirmed") {
    return { text: render(fact.value), isPending: false };
  }
  return { text: fallback, isPending: true };
}

/**
 * Resolves the IT contact channels to show for a room: a confirmed
 * room-level override wins; otherwise falls back per-field to the
 * global SUPPORT_CONFIG. Only confirmed fields are returned — callers
 * must hide, not stub out, an action with no confirmed value (Bible §30).
 */
export function getContactForRoom(room: Room): {
  phone?: { value: string; label?: string; extension?: string };
  lineUrl?: { value: string; label?: string; description?: string };
  helpdeskUrl?: { value: string; label?: string; description?: string };
} {
  const roomOverride =
    room.configuration.contact?.status === "confirmed"
      ? room.configuration.contact.value
      : undefined;

  const globalPhone = factValue(SUPPORT_CONFIG.phone);
  const globalLine = factValue(SUPPORT_CONFIG.lineUrl);
  const globalHelpdesk = factValue(SUPPORT_CONFIG.helpdeskUrl);

  return {
    phone: roomOverride?.phone ? { value: roomOverride.phone } : globalPhone,
    lineUrl: roomOverride?.lineUrl ? { value: roomOverride.lineUrl } : globalLine,
    helpdeskUrl: roomOverride?.helpdeskUrl
      ? { value: roomOverride.helpdeskUrl }
      : globalHelpdesk,
  };
}
