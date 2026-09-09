/**
 * support.ts (config)
 *
 * Centralized "Contact IT" configuration (Bible §30, §42).
 *
 * ⚠️ SOURCE DOCUMENT CONFLICT — NEEDS HUMAN CONFIRMATION BEFORE LAUNCH
 * ----------------------------------------------------------------------
 * 01_MASTER_BUILD_BIBLE.md §42 "CONTACT IT" gives concrete values:
 *   phone: "0970816114"
 *   lineUrl: "https://line.me/ti/p/kuH10XUMj8"
 *   helpdeskUrl: "https://liff.line.me/2009847955-YjVZZBXW"
 *
 * ...but the same document's §110 "IMPORTANT NOTE ABOUT UNCONFIRMED DATA"
 * explicitly lists "หมายเลขโทรศัพท์ IT" (IT phone number) and
 * "LINE / Helpdesk URL" as PENDING until confirmed by facility staff.
 *
 * Per the Bible's own §111 Master Rule and the NO FAKE DATA policy
 * (§83), the safer reading is to treat these as *unconfirmed* until a
 * human explicitly says otherwise — displaying a wrong emergency contact
 * number is worse than showing "pending". The §42 values are kept below
 * as `draftValue` only (never read by UI) so a developer can verify them
 * against IT and flip `status` to `"confirmed"` in one place.
 * ----------------------------------------------------------------------
 */

import type { ContactConfig } from "@/lib/types";

export const SUPPORT_CONFIG: ContactConfig = {
  displayName: "IT Support",
  phone: {
    status: "pending",
    draftValue: { value: "0970816114" },
    note: "Given in Bible §42 but listed as unconfirmed in §110. Confirm with IT before flipping status to 'confirmed'.",
  },
  lineUrl: {
    status: "pending",
    draftValue: { value: "https://line.me/ti/p/kuH10XUMj8" },
    note: "Given in Bible §42 but listed as unconfirmed in §110. Confirm with IT before flipping status to 'confirmed'.",
  },
  helpdeskUrl: {
    status: "pending",
    draftValue: { value: "https://liff.line.me/2009847955-YjVZZBXW" },
    note: "Given in Bible §42 but listed as unconfirmed in §110. Confirm with IT before flipping status to 'confirmed'.",
  },
  location: { status: "pending" },
};
