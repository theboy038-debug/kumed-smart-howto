/**
 * ui.ts (config)
 *
 * Centralized copy for UI states that must stay consistent everywhere
 * they appear, so no component hardcodes its own wording (Bible §9,
 * §27, §40, §57, §58, §93).
 */

import type { StatusTagKind, TroubleshootingCategory } from "@/lib/types";

/** User-facing message for any Fact currently in the "pending" state. */
export const PENDING_FACT_MESSAGE = "ข้อมูลส่วนนี้กำลังจัดเตรียม";

/** Shown in place of a real Wi-Fi SSID until one is confirmed (Bible §9). */
export const PENDING_WIFI_MESSAGE = "เชื่อมต่อ Wi-Fi ประจำห้องก่อนดำเนินการ";

/** Shown when a room/workflow has no data yet (Bible §93 EMPTY STATE). */
export const EMPTY_WORKFLOW_MESSAGE = "คู่มือนี้กำลังจัดเตรียม หากต้องการความช่วยเหลือ กรุณาติดต่อ IT Support";

/** Shown when a route doesn't resolve to known data (Bible §57 ERROR HANDLING). */
export const ROOM_NOT_FOUND_MESSAGE = "ไม่พบข้อมูลห้องนี้ อาจมีการเปลี่ยนแปลงข้อมูล กรุณาติดต่อ IT Support";

export const STATUS_TAG_LABELS: Record<StatusTagKind, string> = {
  "do-not-change": "🛑 ห้ามเปลี่ยน",
  "wifi-required": "📶 ต้องเชื่อมต่อ Wi-Fi",
  "hdmi-required": "🔌 ต้องใช้สาย HDMI",
  "pin-required": "🔑 ต้องใช้ PIN",
  "personal-device-required": "💻 ต้องใช้อุปกรณ์ส่วนตัว",
  "check-before-start": "⚠️ ตรวจสอบก่อนเริ่ม",
  "image-guide": "📷 มีภาพประกอบ",
  "it-only": "🛠 เฉพาะเจ้าหน้าที่ IT",
  default: "ℹ️",
};

/** Phase 5 §5 — grouping labels for the symptom picker. Only categories with real data are ever shown. */
export const TROUBLESHOOTING_CATEGORY_LABELS: Record<TroubleshootingCategory, string> = {
  display: "จอภาพ",
  wireless: "การเชื่อมต่อไร้สาย",
  "cable-input": "สาย / Input",
  general: "อื่น ๆ",
};
