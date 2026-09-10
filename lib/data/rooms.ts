/**
 * rooms.ts
 *
 * Rooms are DATA, not pages or components (Bible §6, §22, §47, §84).
 * Classrooms 601–608 and Smart Classrooms 701/702 explicitly must not be
 * hand-duplicated eight/two times over — they're generated from a single
 * factory function plus a room-number config, exactly as the Bible
 * requires ("ห้ามสร้าง UI 8 ชุดแยกกัน... ต้องใช้ Shared Room Template +
 * Room Configuration").
 */

import type { GrossBriefingRoom, Room, RoomBase } from "@/lib/types";

// ---------------------------------------------------------------------------
// Floor 5 — Jongrak Main Conference Room (Bible §5, §18, §24–§26)
// ---------------------------------------------------------------------------

const mainConferenceRoom: RoomBase = {
  id: "room-jongrak",
  slug: "main-conference",
  floorSlug: "5",
  name: "ห้องประชุมจงรัก",
  shortDescription:
    "ห้องประชุมหลัก พร้อมระบบ Webex บันทึกวิดีโอ และแชร์หน้าจอไร้สาย",
  template: "conference",
  status: "pending",
  configuration: {
    wifi: {
      status: "confirmed",
      value: { ssid: "WL Present Meeting Room", password: "12345678" },
    },
    displayName: { status: "pending" },
  },
  workflowIds: [
    "jongrak-room-pc-presentation",
    "jongrak-webex-recording",
    "jongrak-personal-screen-share",
  ],
  troubleshootingIds: [
    "wireless-device-not-found",
    "no-signal-on-display",
    "cannot-connect",
    "device-not-responding",
  ],
  overview: [
    "Projector OUT 1 = Room PC",
    "Projector OUT 2 = Wireless Display Box",
    "Mini Monitor IN 1 = Camera / Webex Feed",
    "Mini Monitor IN 2 = Screen Preview",
  ],
  systemNotes: [
    "Mini Monitor ต้องคงไว้ที่ IN 1 เสมอ เพื่อให้ Webex บันทึกภาพบรรยากาศห้องประชุมได้ถูกต้อง — ห้ามเปลี่ยนช่องระหว่างประชุม",
  ],
};

// ---------------------------------------------------------------------------
// Floor 6 — Meeting Room (Bible §21) — Smart TV + Room PC, no wireless
// ---------------------------------------------------------------------------

const floor6MeetingRoom: RoomBase = {
  id: "room-6-meeting",
  slug: "meeting-room",
  floorSlug: "6",
  name: "ห้องประชุม (ชั้น 6)",
  shortDescription:
    "Smart TV พร้อม Room PC และสาย HDMI สำรอง ไม่มีระบบไร้สาย",
  template: "meeting-room",
  status: "pending",
  configuration: {
    wifi: { status: "pending" },
    displayName: { status: "pending" },
  },
  workflowIds: ["floor6-meeting-use-hdmi"],
  troubleshootingIds: ["no-signal-on-display", "device-not-responding"],
  overview: [
    "Smart TV",
    "Room PC",
    "สาย HDMI สำรองสำหรับโน้ตบุ๊ก",
    "ไม่มีระบบไร้สาย — ใช้สาย HDMI เท่านั้น",
  ],
  systemNotes: [
    "โดยปกติ HDMI Input ถูกเลือกไว้ให้แล้ว ไม่ควรบังคับผู้ใช้เลือก Input เอง หากไม่จำเป็น",
  ],
};

// ---------------------------------------------------------------------------
// Floor 6 — Classrooms 601–608 (Bible §6, §22): ONE shared template
// ---------------------------------------------------------------------------

export const SMALL_CLASSROOM_NUMBERS = [
  "601",
  "602",
  "603",
  "604",
  "605",
  "606",
  "607",
  "608",
] as const;

/**
 * Phase 7 §19 — verified Wi-Fi mapping per classroom. One SSID per room,
 * one shared password. Confirmed business fact, not a guess.
 */
const SMALL_CLASSROOM_WIFI: Record<string, string> = {
  "601": "KU Room 1",
  "602": "KU Room 2",
  "603": "KU Room 3",
  "604": "KU Room 4",
  "605": "KU Room 5",
  "606": "KU Room 6",
  "607": "KU Room 7",
  "608": "KU Room 8",
};
const SMALL_CLASSROOM_WIFI_PASSWORD = "qwertyuiop";

function createSmallClassroomRoom(roomNumber: string): RoomBase {
  return {
    id: `room-6-${roomNumber}`,
    slug: `classroom-${roomNumber}`,
    floorSlug: "6",
    number: roomNumber,
    name: `ห้องเรียน ${roomNumber}`,
    shortDescription:
      "ห้องเรียนย่อย พร้อมคอมพิวเตอร์ประจำห้องและระบบไร้สาย (ไม่มีสาย HDMI ให้ผู้ใช้)",
    template: "small-classroom",
    status: "pending",
    configuration: {
      wifi: {
        status: "confirmed",
        value: {
          ssid: SMALL_CLASSROOM_WIFI[roomNumber] ?? `KU Room ${roomNumber}`,
          password: SMALL_CLASSROOM_WIFI_PASSWORD,
        },
      },
      displayName: { status: "pending" },
    },
    workflowIds: [
      "small-classroom-use-room-pc",
      "small-classroom-wireless-share",
    ],
    troubleshootingIds: [
      "wireless-device-not-found",
      "no-signal-on-display",
      "cannot-connect",
      "pin-not-showing",
      "device-not-responding",
      "tv-input-changed-after-input-box",
    ],
    overview: [
      "คอมพิวเตอร์ประจำห้อง",
      "ระบบไร้สาย (Wireless Presentation) สำหรับโน้ตบุ๊กและ iPad",
      "ไม่มีสาย HDMI ให้ผู้ใช้ต่อโน้ตบุ๊ก — ใช้ Wireless เท่านั้น",
    ],
  };
}

const smallClassrooms: RoomBase[] = SMALL_CLASSROOM_NUMBERS.map(
  createSmallClassroomRoom,
);

// ---------------------------------------------------------------------------
// Floor 7 — Smart Classrooms 701/702 (Bible §7, §21, §23): shared template
// ---------------------------------------------------------------------------

export const SMART_CLASSROOM_NUMBERS = ["701", "702"] as const;

/** Phase 7 §29 — verified per-room Wi-Fi, one shared password. */
const SMART_CLASSROOM_WIFI: Record<string, string> = {
  "701": "smartclassroom701",
  "702": "smartclassroom702",
};
const SMART_CLASSROOM_WIFI_PASSWORD = "qwertyuiop";

function createSmartClassroomRoom(roomNumber: string): RoomBase {
  return {
    id: `room-7-${roomNumber}`,
    slug: `smart-classroom-${roomNumber}`,
    floorSlug: "7",
    number: roomNumber,
    name: `ห้อง ${roomNumber} (Smart Classroom)`,
    shortDescription:
      "ห้องเรียนอัจฉริยะ ควบคุมผ่าน Smart Touchscreen ข้างจอหลัก",
    template: "smart-classroom",
    status: "pending",
    configuration: {
      wifi: {
        status: "confirmed",
        value: {
          ssid: SMART_CLASSROOM_WIFI[roomNumber] ?? `smartclassroom${roomNumber}`,
          password: SMART_CLASSROOM_WIFI_PASSWORD,
        },
      },
      displayName: { status: "pending" },
    },
    workflowIds: [
      "smart-classroom-use-room-pc",
      "smart-classroom-use-notebook-hdmi",
      "smart-classroom-wireless-share",
    ],
    troubleshootingIds: [
      "wireless-device-not-found",
      "no-signal-on-display",
      "cannot-connect",
      "pin-not-showing",
      "device-not-responding",
      "windows-pc-only-display",
    ],
    overview: [
      "ช่อง 1 = คอมพิวเตอร์ประจำห้อง",
      "ช่อง 2 = ต่อโน้ตบุ๊ก (Laptop) ด้วยสาย HDMI",
      "ช่อง 3 = แชร์หน้าจอแบบไร้สาย",
    ],
  };
}

const smartClassrooms: RoomBase[] = SMART_CLASSROOM_NUMBERS.map(
  createSmartClassroomRoom,
);

// ---------------------------------------------------------------------------
// Floor 7 — Room 703: Gross Anatomy Lab & Briefing Room (special system)
// Bible §8–§20, §59–§62, §73, §109 — must NOT be treated as a plain
// smart classroom, and must NOT be reached via `floor === 7 && room ===
// 703` branching anywhere in the app (Bible §84).
// ---------------------------------------------------------------------------

const room703: GrossBriefingRoom = {
  id: "room-703",
  slug: "room-703",
  floorSlug: "7",
  number: "703",
  name: "ห้อง 703 — Gross Anatomy Lab & Briefing Room",
  shortDescription:
    "ระบบ AV พิเศษ ประกอบด้วยห้อง Gross Anatomy Lab และห้อง Briefing ควบคุมผ่าน iPadGross",
  template: "gross-briefing",
  status: "pending",
  configuration: {
    wifi: { status: "pending" },
    displayName: { status: "pending" },
  },
  workflowIds: [
    "room703-power-startup",
    "room703-view-gross-camera",
    "room703-lecture-hdmi",
    "room703-lecture-wireless",
    "room703-switch-room-mode",
  ],
  troubleshootingIds: [
    "wireless-device-not-found",
    "no-signal-on-display",
    "cannot-connect",
    "device-not-responding",
  ],
  overview: [
    "Gross Anatomy Lab: โทรทัศน์หลายจุด + กล้องเคน (กล้องเคลื่อนที่สำหรับสาธิตกายวิภาค)",
    "Briefing Room: ห้องบรรยาย/เตรียมการ ไม่มีคอมพิวเตอร์ประจำห้อง ควบคุมด้วย iPadGross",
    "โดยปกติ IT ตั้งค่าระบบให้พร้อมใช้งานล่วงหน้าในโหมด รวมห้อง + Lecture แล้ว",
  ],
  systemNotes: [
    "roomMode = combined  → Gross และ Briefing แสดง Source เดียวกันทั้งสองฝั่ง",
    "roomMode = separated → Gross แสดงกล้องเคนเสมอ, Briefing แสดง Lecture เสมอ — Business Rule นี้ตายตัว ห้ามเปลี่ยนโดยพลการ",
    "iPadGross คืออุปกรณ์ควบคุมระบบห้อง 703 เท่านั้น ไม่ใช่ iPad ส่วนตัวของผู้ใช้",
  ],
  system: {
    controllerName: "iPadGross",
    sources: [
      {
        id: "camera",
        label: "กล้องเคน",
        description: "ภาพจากกล้องเคลื่อนที่ภายในห้อง Gross Anatomy Lab",
      },
      {
        id: "lecture",
        label: "Lecture",
        description: "ภาพจาก Input Box ฝั่ง Briefing Room",
      },
    ],
    lectureInputs: [
      {
        id: "hdmi",
        label: "Input 1 — HDMI",
        description: "สำหรับโน้ตบุ๊ก/แล็ปท็อปส่วนตัวผ่านสาย HDMI",
      },
      {
        id: "wireless",
        label: "Input 2 — Crestron / Wireless",
        description:
          "สำหรับแชร์หน้าจอไร้สายผ่าน Crestron หรือ Wireless Dongle",
      },
    ],
    defaultState: { roomMode: "combined", source: "lecture" },
    powerStartup: [
      {
        order: 1,
        title: "เปิด Power Control",
        instruction: "เปิดสวิตช์ Power Control ของระบบห้อง 703",
      },
      {
        order: 2,
        title: "เปิด Rack",
        instruction: "เปิดสวิตช์จ่ายไฟให้ Rack อุปกรณ์",
      },
      {
        order: 3,
        title: "ตรวจสอบอุปกรณ์ใน Rack",
        instruction: "ตรวจสอบว่าอุปกรณ์ทุกกล่องภายใน Rack ติดไฟครบแล้ว",
        isCheckStep: true,
      },
      {
        order: 4,
        title: "ตรวจสอบทีวี",
        instruction: "ตรวจสอบว่าจอทีวีทุกจุดติดแล้ว",
        isCheckStep: true,
      },
      {
        order: 5,
        title: "เปิด Power Strip ของระบบภาพ",
        instruction: "เปิด Power Strip ที่จ่ายไฟให้ระบบภาพ",
      },
      {
        order: 6,
        title: "รอระบบ Initialize",
        instruction: "รอให้ระบบเริ่มทำงานจนเสร็จสมบูรณ์ก่อนใช้งานต่อ",
      },
      {
        order: 7,
        title: "ตรวจสอบ iPadGross",
        instruction: "ตรวจสอบว่า iPadGross พร้อมใช้งานเป็น Controller แล้ว",
      },
    ],
    wirelessSharingFlow: [
      { order: 1, instruction: "หยิบ Wireless Dongle" },
      {
        order: 2,
        instruction:
          "เสียบ Dongle เข้ากับอุปกรณ์ของคุณ (USB หรือ USB-C / Type-C ตามพอร์ตที่มี)",
      },
      {
        order: 3,
        instruction: "รอไฟสถานะบน Dongle เปลี่ยนเป็นสถานะพร้อมใช้งาน",
      },
      { order: 4, instruction: "กดปุ่มบน Wireless Dongle 1 ครั้งเพื่อเริ่มแชร์หน้าจอ" },
      {
        order: 5,
        instruction: "บน iPadGross เลือก Source เป็น Wireless / Dongle",
      },
    ],
    powerControlName: {
      status: "pending",
      note: "ชื่อทางการของ Power Control / Switch ยังไม่ยืนยัน (Bible §110)",
    },
  },
};

// ---------------------------------------------------------------------------
// Aggregate export
// ---------------------------------------------------------------------------

export const ROOMS: Room[] = [
  mainConferenceRoom,
  floor6MeetingRoom,
  ...smallClassrooms,
  ...smartClassrooms,
  room703,
];
