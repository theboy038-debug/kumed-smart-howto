/**
 * troubleshooting.ts
 *
 * Shared across rooms via troubleshootingIds — a room only lists the
 * subset relevant to its own systems (Bible §29). Each issue is broken
 * into single, atomic fixes tried one at a time (Phase 5 §6), with an
 * expected result per fix so the user knows whether it worked (§7).
 *
 * Quick fixes are restricted to actions an ordinary user can safely
 * perform (§40); every issue ends by escalating to Contact IT rather
 * than teaching anything that touches rack wiring, routing, or admin
 * settings. Category labels and expected-result copy below describe
 * normal, generic behavior of doing the fix — they do not state any
 * room-specific fact (SSID, PIN, phone number, device name, port, or
 * power sequence) that hasn't already been confirmed elsewhere in the
 * data (Phase 5 §22).
 */

import type { TroubleshootingIssue } from "@/lib/types";

export const TROUBLESHOOTING_ISSUES: TroubleshootingIssue[] = [
  {
    id: "wireless-device-not-found",
    problem: "ไม่พบชื่อจอ",
    category: "wireless",
    symptoms: ["เปิด Win + K หรือ Screen Mirroring แล้วไม่พบชื่อจอที่ต้องการเชื่อมต่อ"],
    quickFixes: [
      {
        instruction: "ตรวจสอบว่าเชื่อมต่อ Wi-Fi ประจำห้องแล้ว",
        expectedResult: "อุปกรณ์ของคุณแสดงว่าเชื่อมต่อ Wi-Fi สำเร็จ",
      },
      {
        instruction: "รอประมาณ 10 วินาทีแล้วลองเปิดรายการอุปกรณ์ไร้สายอีกครั้ง",
        expectedResult: "ชื่อจอของห้องปรากฏในรายการอุปกรณ์ที่พบ",
      },
      {
        instruction: "ปิดแล้วเปิดรายการอุปกรณ์ไร้สายบนโทรศัพท์/โน้ตบุ๊กใหม่อีกครั้ง",
        expectedResult: "ชื่อจอของห้องปรากฏในรายการอุปกรณ์ที่พบ",
      },
    ],
    escalationMessage: "หากยังไม่พบชื่อจอ กรุณาติดต่อ IT Support",
  },
  {
    id: "no-signal-on-display",
    problem: "ไม่มีภาพขึ้นจอ",
    category: "display",
    quickFixes: [
      {
        instruction: "ตรวจสอบว่าเลือก Input / Source ถูกต้องแล้ว",
        expectedResult: "จอแสดงว่ากำลังรับสัญญาณจาก Input ที่เลือก",
      },
      {
        instruction: "ตรวจสอบว่าสายเชื่อมต่อเสียบแน่นดีแล้วทั้งสองด้าน",
        expectedResult: "ภาพจากอุปกรณ์ต้นทางปรากฏบนจอ",
      },
      {
        instruction: "ตรวจสอบว่าอุปกรณ์ต้นทาง (โน้ตบุ๊ก/คอมพิวเตอร์) เปิดอยู่และไม่ได้อยู่ในโหมดพัก (Sleep)",
        expectedResult: "หน้าจอของอุปกรณ์ต้นทางสว่างและใช้งานได้ปกติ",
      },
    ],
    escalationMessage: "หากยังไม่มีภาพขึ้นจอ กรุณาติดต่อ IT Support",
  },
  {
    id: "cannot-connect",
    problem: "เชื่อมต่อไม่ได้",
    category: "wireless",
    quickFixes: [
      {
        instruction: "ตรวจสอบว่า Wi-Fi ของอุปกรณ์คุณเชื่อมต่อสำเร็จแล้ว",
        expectedResult: "อุปกรณ์แสดงสถานะเชื่อมต่อ Wi-Fi สำเร็จ",
      },
      {
        instruction: "ลองปิดแล้วเปิด Wi-Fi บนอุปกรณ์ของคุณใหม่",
        expectedResult: "อุปกรณ์เชื่อมต่อ Wi-Fi กลับมาได้ตามปกติ",
      },
      {
        instruction: "ลองเริ่มขั้นตอนการเชื่อมต่อจอใหม่อีกครั้งตั้งแต่ต้น",
        expectedResult: "อุปกรณ์เชื่อมต่อกับจอสำเร็จ",
      },
    ],
    escalationMessage: "หากยังเชื่อมต่อไม่ได้ กรุณาติดต่อ IT Support",
  },
  {
    id: "pin-not-showing",
    problem: "PIN ไม่ปรากฏ",
    category: "wireless",
    quickFixes: [
      {
        instruction: "ตรวจสอบว่าเลือก Source ที่ถูกต้องบนจอหลักแล้ว",
        expectedResult: "จอหลักแสดงหน้าจอสำหรับรับการเชื่อมต่อไร้สาย",
      },
      {
        instruction: "รอสักครู่ให้ระบบแสดงผล PIN",
        expectedResult: "ตัวเลข PIN ปรากฏขึ้นบนจอหลัก",
      },
      {
        instruction: "ลองเริ่มการเชื่อมต่อใหม่อีกครั้งจากอุปกรณ์ของคุณ",
        expectedResult: "ตัวเลข PIN ปรากฏขึ้นบนจอหลัก",
      },
    ],
    escalationMessage: "หาก PIN ยังไม่ปรากฏ กรุณาติดต่อ IT Support",
  },
  {
    id: "device-not-responding",
    problem: "อุปกรณ์ไม่ตอบสนอง",
    category: "general",
    quickFixes: [
      {
        instruction: "ตรวจสอบว่าอุปกรณ์เปิดอยู่และมีไฟเข้า",
        expectedResult: "ไฟสถานะของอุปกรณ์ติดตามปกติ",
      },
      {
        instruction: "ตรวจสอบสายเชื่อมต่อทั้งหมดว่าเสียบแน่นดี",
        expectedResult: "อุปกรณ์กลับมาตอบสนองตามปกติ",
      },
      {
        instruction: "รอสักครู่แล้วลองใช้งานอุปกรณ์อีกครั้ง",
        expectedResult: "อุปกรณ์กลับมาตอบสนองตามปกติ",
      },
    ],
    escalationMessage:
      "หากอุปกรณ์ยังไม่ตอบสนอง กรุณาติดต่อ IT Support — ห้ามเปิดฝา Rack หรือปรับตั้งค่าระบบเองโดยไม่ได้รับอนุญาต",
  },
  {
    id: "tv-input-changed-after-input-box",
    problem: "ภาพหายหลังกด Input Box (บางห้อง)",
    category: "display",
    symptoms: [
      "ในบางห้อง เมื่อกดปุ่มที่กล่องควบคุมสัญญาณ TV อาจเปลี่ยนไปช่องอื่นอัตโนมัติ และบางครั้งไม่กลับมาช่องเดิมเอง",
    ],
    quickFixes: [
      {
        instruction:
          "ใช้รีโมท TV เลือกกลับไปยังช่อง HDMI ที่เชื่อมต่อกับระบบห้อง (โดยปกติคือ HDMI 1)",
        expectedResult: "ภาพจากระบบห้องกลับมาแสดงตามปกติ",
      },
    ],
    escalationMessage: "หากภาพยังไม่กลับมา กรุณาติดต่อ IT Support",
  },
  {
    id: "windows-pc-only-display",
    problem: "เสียบ HDMI แล้วภาพไม่ขึ้น (Windows แสดง PC only)",
    category: "cable-input",
    symptoms: ["เสียบสาย HDMI จากโน้ตบุ๊กแล้วภาพไม่ขึ้นจอห้อง"],
    quickFixes: [
      {
        instruction: "กด Win + P บนโน้ตบุ๊ก แล้วเลือกโหมด Duplicate",
        expectedResult: "ภาพจากโน้ตบุ๊กปรากฏบนจอห้องเช่นเดียวกับหน้าจอโน้ตบุ๊ก",
      },
    ],
    escalationMessage: "หากภาพยังไม่ขึ้น กรุณาติดต่อ IT Support",
  },
];
