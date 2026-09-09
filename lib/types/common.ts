/**
 * common.ts
 *
 * Shared primitive types used across the data model.
 */

/**
 * Fact<T> models a single piece of real-world facility information
 * (a Wi-Fi SSID, a display name, a phone number, a switch name, ...).
 *
 * This exists to enforce the Bible's NO INVENTION POLICY (§9, §43, §58,
 * §83, §110): Claude — and any future developer — must never fabricate
 * real-world operational data. When a fact is unknown or unconfirmed,
 * model it as `{ status: "pending" }` rather than guessing a value.
 *
 * UI components must render a friendly, generic message for a pending
 * fact (see PENDING_FACT_MESSAGE in lib/config/ui.ts) — never literal
 * placeholders like "CHANGE_ME", "TODO", "XXX", or "INSERT_WIFI_HERE".
 *
 * `draftValue` / `note` exist purely for developers reading the source:
 * they can carry a candidate value that appeared somewhere in project
 * documentation but was not confirmed by IT/facility staff. UI code must
 * NEVER read `draftValue` — only `value` on a `"confirmed"` fact — so a
 * draft can never silently leak into the guide as if it were real.
 */
export type Fact<T> =
  | { status: "confirmed"; value: T }
  | { status: "pending"; draftValue?: T; note?: string };

/** Narrow a Fact to its value when confirmed, otherwise undefined. */
export function factValue<T>(fact: Fact<T> | undefined): T | undefined {
  return fact?.status === "confirmed" ? fact.value : undefined;
}

export type Slug = string;

/** Must correspond to a lucide-react icon export name, e.g. "Monitor". */
export type IconName = string;

export type WarningLevel = "info" | "warning" | "danger";

export interface Warning {
  level: WarningLevel;
  title?: string;
  message: string;
}
