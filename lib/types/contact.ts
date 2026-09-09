/**
 * contact.ts
 *
 * Contact IT configuration (Bible §30, §42). All values are Facts so the
 * UI can gracefully hide an action whose value isn't confirmed yet
 * (Bible §30: "UI should hide unavailable actions gracefully. Do NOT
 * display empty buttons.").
 */

import type { Fact } from "./common";

export interface ContactConfig {
  displayName: string;
  phone: Fact<{ value: string }>;
  lineUrl: Fact<{ value: string }>;
  helpdeskUrl: Fact<{ value: string }>;
  location?: Fact<{ value: string }>;
}
