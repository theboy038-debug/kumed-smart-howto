/**
 * support.ts (config)
 *
 * Centralized "Contact IT" configuration (Bible §30, §42; Phase 8
 * §14–§16). These three channels were provided directly as verified,
 * ready-to-use contact information — unlike the earlier Bible §42-vs-
 * §110 conflict (see git history / prior README notes), there is no
 * ambiguity here, so all three are marked "confirmed".
 */

import type { ContactConfig } from "@/lib/types";

export const SUPPORT_CONFIG: ContactConfig = {
  displayName: "IT Support",
  phone: {
    status: "confirmed",
    value: {
      value: "02-120-6369",
      extension: "507",
      label: "โทร IT Support",
    },
  },
  lineUrl: {
    status: "confirmed",
    value: {
      value: "https://line.me/ti/p/kuH10XUMj8",
      label: "LINE IT Support — บอย",
      description: "พูดคุยกับ IT โดยตรง",
    },
  },
  helpdeskUrl: {
    status: "confirmed",
    value: {
      value: "https://liff.line.me/2009847955-YjVZZBXW",
      label: "แจ้งซ่อมระบบ",
      description: "แจ้งปัญหาให้ IT Support ตรวจสอบ",
    },
  },
  location: { status: "pending" },
};
