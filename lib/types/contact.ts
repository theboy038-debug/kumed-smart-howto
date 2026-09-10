/**
 * contact.ts
 *
 * Contact IT configuration (Bible §30, §42; Phase 8 §14–§16). All values
 * are Facts so the UI can gracefully hide an action whose value isn't
 * confirmed yet (Bible §30: "UI should hide unavailable actions
 * gracefully. Do NOT display empty buttons.").
 *
 * Each channel carries its own `label`/`description` so the UI can show
 * real action cards (e.g. "LINE IT Support — บอย" / "พูดคุยกับ IT
 * โดยตรง") instead of a generic "Contact IT" block — per-channel copy
 * lives in data, not hardcoded in the component.
 */

import type { Fact } from "./common";

export interface ContactChannelValue {
  value: string;
  label?: string;
  description?: string;
}

export interface ContactConfig {
  displayName: string;
  /** `value` is the bare dialable number; `extension` (if any) is dialed as a DTMF pause via `tel:`. */
  phone: Fact<ContactChannelValue & { extension?: string }>;
  lineUrl: Fact<ContactChannelValue>;
  helpdeskUrl: Fact<ContactChannelValue>;
  location?: Fact<{ value: string }>;
}
