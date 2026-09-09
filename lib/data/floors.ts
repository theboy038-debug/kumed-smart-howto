/**
 * floors.ts
 *
 * Floor 5: Jongrak main conference room (Bible §5, §24–§26).
 * Floor 6: one meeting room + classrooms 601–608 (Bible §6, §21–§22).
 * Floor 7: Smart Classrooms 701/702 + Room 703 special system (Bible §7,
 *          §8–§20, §23).
 * Floor 9: IT Support office — informational only, no AV rooms (Bible
 *          §23 in doc "HOW-TO", §27 in Bible).
 */

import type { Floor } from "@/lib/types";
import { SMALL_CLASSROOM_NUMBERS, SMART_CLASSROOM_NUMBERS } from "./rooms";

export const FLOORS: Floor[] = [
  {
    id: "floor-5",
    slug: "5",
    name: "ชั้น 5",
    icon: "Presentation",
    tagline: "ห้องประชุมใหญ่ & ระบบบันทึกวิดีโอ",
    hasRooms: true,
    roomSlugs: ["main-conference"],
  },
  {
    id: "floor-6",
    slug: "6",
    name: "ชั้น 6",
    icon: "School",
    tagline: "ห้องเรียนย่อย & ระบบ Presentation",
    hasRooms: true,
    roomSlugs: [
      "meeting-room",
      ...SMALL_CLASSROOM_NUMBERS.map((n) => `classroom-${n}`),
    ],
  },
  {
    id: "floor-7",
    slug: "7",
    name: "ชั้น 7",
    icon: "GraduationCap",
    tagline: "Smart Classroom & Gross Anatomy Lab / Briefing Room",
    hasRooms: true,
    roomSlugs: [
      ...SMART_CLASSROOM_NUMBERS.map((n) => `smart-classroom-${n}`),
      "room-703",
    ],
  },
  {
    id: "floor-9",
    slug: "9",
    name: "ชั้น 9",
    icon: "Laptop",
    tagline: "IT Support & Information",
    description:
      "เป็นพื้นที่สำนักงาน IT Support และห้องปฏิบัติการ ไม่มีระบบจอแชร์ภาพหน้าห้อง",
    hasRooms: false,
    roomSlugs: [],
  },
];
