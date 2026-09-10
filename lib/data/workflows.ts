/**
 * workflows.ts
 *
 * Every user intent, translated into concrete steps. Intent-first titles
 * (Bible Principle 01) — never expose raw input/matrix names as the
 * primary label. All images are `status: "pending"` until real photos
 * exist (Bible §10, §32).
 */

import type { Workflow } from "@/lib/types";

// ---------------------------------------------------------------------------
// Floor 5 — Jongrak (Bible §18, §24–§26; Phase 7 §3–§11)
// ---------------------------------------------------------------------------

const jongrakRoomPcPresentation: Workflow = {
  id: "jongrak-room-pc-presentation",
  slug: "room-pc-presentation",
  title: "🖥️ นำเสนอผ่านคอมพิวเตอร์ประจำห้อง",
  shortDescription:
    "ใช้คอมพิวเตอร์ที่อยู่ในห้องเพื่อเปิด PowerPoint, PDF เว็บไซต์ หรือเนื้อหาที่ต้องการนำเสนอ",
  icon: "Monitor",
  steps: [
    {
      id: "jongrak-pc-1",
      order: 1,
      title: "เปิดคอมพิวเตอร์ประจำห้อง",
      instruction: "เปิดคอมพิวเตอร์ประจำห้อง",
      image: { status: "pending" },
    },
    {
      id: "jongrak-pc-2",
      order: 2,
      title: "รอภาพขึ้นจอ",
      instruction: "รอสักครู่ให้ภาพขึ้นจอ",
      expectedResult: "ภาพจากคอมพิวเตอร์ประจำห้องปรากฏบนจอ",
      image: { status: "pending" },
    },
    {
      id: "jongrak-pc-3",
      order: 3,
      title: "เปิดเนื้อหาที่ต้องการนำเสนอ",
      instruction: "เปิดไฟล์หรือโปรแกรมที่ต้องการนำเสนอ เช่น PowerPoint, PDF หรือเว็บไซต์",
      image: { status: "pending" },
    },
    {
      id: "jongrak-pc-4",
      order: 4,
      title: "เริ่มนำเสนอ",
      instruction: "เริ่มนำเสนอเนื้อหาของคุณได้เลย",
      image: { status: "pending" },
    },
  ],
  troubleshootingIds: ["no-signal-on-display"],
};

const jongrakWebexRecording: Workflow = {
  id: "jongrak-webex-recording",
  slug: "webex-recording",
  title: "🎥 ประชุม Webex พร้อมบันทึกภาพ",
  shortDescription: "ใช้สำหรับประชุมออนไลน์ — ไม่จำเป็นต้องเปิดหากแค่ต้องการนำเสนอ",
  icon: "Video",
  criticalWarning: {
    level: "danger",
    title: "🛑 คำเตือนสำคัญ",
    message:
      "ห้ามกดเปลี่ยนช่องบน Mini Monitor ต้องคงไว้ที่ IN 1 เสมอ เพื่อให้ระบบ Webex บันทึกภาพบรรยากาศภายในห้องประชุมได้อย่างถูกต้อง",
  },
  steps: [
    {
      id: "jongrak-webex-1",
      order: 1,
      title: "เปิดโปรแกรม Webex",
      instruction: "เปิดโปรแกรม Webex บนคอมพิวเตอร์ประจำห้อง",
      expectedResult: "โปรแกรม Webex พร้อมสำหรับเข้าร่วมการประชุม",
      image: { status: "pending" },
    },
    {
      id: "jongrak-webex-2",
      order: 2,
      title: "เริ่มบันทึกวิดีโอ",
      instruction: "กดปุ่ม Record ภายใน Webex เพื่อเริ่มบันทึกวิดีโอ",
      expectedResult: "สถานะการบันทึกแสดงว่าระบบกำลังบันทึก",
      image: { status: "pending" },
    },
    {
      id: "jongrak-webex-3",
      order: 3,
      title: "แชร์สไลด์หรือหน้าจอ",
      instruction:
        "หากต้องการแชร์สไลด์หรือหน้าจอ ให้กดปุ่ม Share ภายในโปรแกรม Webex เท่านั้น — ห้ามเปลี่ยนช่องสัญญาณของ Mini Monitor",
      statusTags: [{ kind: "do-not-change" }],
      image: { status: "pending" },
    },
  ],
  troubleshootingIds: ["no-signal-on-display", "device-not-responding"],
};

const jongrakPersonalScreenShare: Workflow = {
  id: "jongrak-personal-screen-share",
  slug: "personal-screen-share",
  title: "📱 แชร์หน้าจอจากอุปกรณ์ส่วนตัว",
  shortDescription: "โน้ตบุ๊ก (Laptop), Mac หรือ iPad — เลือกวิธีที่สะดวกสำหรับคุณ",
  icon: "Smartphone",
  methodChoice: {
    question: "เลือกวิธีแชร์หน้าจอ",
    options: [
      {
        id: "dongle",
        label: "แชร์ผ่าน Wireless Dongle",
        description: "เสียบอุปกรณ์ที่ให้มาเข้ากับโน้ตบุ๊ก แล้วกดปุ่ม Share เพื่อส่งภาพขึ้นจอ",
        fallbackMethodId: "wifi",
        fallbackPrompt: "ภาพยังไม่ขึ้น? ลองเชื่อมต่อผ่าน Wi-Fi แทน",
        steps: [
          {
            id: "jongrak-dongle-1",
            order: 1,
            title: "เสียบ Wireless Dongle",
            instruction: "เสียบ Wireless Dongle เข้ากับโน้ตบุ๊ก (Laptop)",
            image: { status: "pending" },
          },
          {
            id: "jongrak-dongle-2",
            order: 2,
            title: "รอให้พร้อมใช้งาน",
            instruction: "รอให้อุปกรณ์พร้อมใช้งาน",
            image: { status: "pending" },
          },
          {
            id: "jongrak-dongle-3",
            order: 3,
            title: "กดปุ่ม Share",
            instruction: "กดปุ่ม Share บน Wireless Dongle",
            image: { status: "pending" },
          },
          {
            id: "jongrak-dongle-4",
            order: 4,
            title: "ตรวจสอบภาพ",
            instruction: "รอสักครู่ แล้วดูว่าภาพขึ้นจอหรือไม่",
            expectedResult: "ภาพจากโน้ตบุ๊กควรแสดงบนจอห้อง",
            image: { status: "pending" },
          },
        ],
      },
      {
        id: "wifi",
        label: "แชร์ผ่าน Wi-Fi",
        badge: "แนะนำสำหรับ Mac",
        description: "เชื่อมต่อ Wi-Fi ของห้อง แล้วแชร์หน้าจอจากอุปกรณ์ของคุณ",
        osChoice: {
          question: "คุณใช้อุปกรณ์อะไร?",
          options: [
            {
              id: "windows",
              label: "โน้ตบุ๊ก Windows",
              steps: [
                {
                  id: "jongrak-wifi-win-1",
                  order: 1,
                  title: "เชื่อมต่อ Wi-Fi",
                  instruction: 'เชื่อมต่อ Wi-Fi ชื่อ "WL Present Meeting Room" รหัสผ่าน "12345678"',
                  statusTags: [{ kind: "wifi-required" }],
                  showRoomWifi: true,
                  image: { status: "pending" },
                },
                {
                  id: "jongrak-wifi-win-2",
                  order: 2,
                  title: "แชร์หน้าจอ",
                  instruction: 'กด "Win + K" แล้วเลือกอุปกรณ์ของห้อง',
                  platformVariant: "windows",
                  keyboardShortcut: ["Win", "K"],
                  image: { status: "pending" },
                },
              ],
            },
            {
              id: "mac",
              label: "Mac หรือ iPad",
              steps: [
                {
                  id: "jongrak-wifi-mac-1",
                  order: 1,
                  title: "เชื่อมต่อ Wi-Fi",
                  instruction: 'เชื่อมต่อ Wi-Fi ชื่อ "WL Present Meeting Room" รหัสผ่าน "12345678"',
                  statusTags: [{ kind: "wifi-required" }],
                  showRoomWifi: true,
                  image: { status: "pending" },
                },
                {
                  id: "jongrak-wifi-mac-2",
                  order: 2,
                  title: "แชร์หน้าจอ",
                  instruction: "เปิด Control Center แล้วเลือก Screen Mirroring จากนั้นเลือกระบบของห้อง",
                  platformVariant: "mac",
                  image: { status: "pending" },
                },
              ],
            },
          ],
        },
        steps: [
          {
            id: "jongrak-wifi-3",
            order: 3,
            title: "ตรวจสอบภาพ",
            instruction: "ตรวจสอบว่าภาพจากอุปกรณ์ของคุณขึ้นจอแล้ว",
            expectedResult: "ภาพจากโน้ตบุ๊กหรือ iPad ปรากฏบนจอ",
            image: { status: "pending" },
          },
        ],
      },
    ],
  },
  steps: [],
  troubleshootingIds: ["no-signal-on-display"],
};

// ---------------------------------------------------------------------------
// Floor 6 — Meeting Room (Bible §21) — unchanged by Phase 7 (patch only covers 601–608)
// ---------------------------------------------------------------------------

const floor6MeetingUseHdmi: Workflow = {
  id: "floor6-meeting-use-hdmi",
  slug: "use-hdmi",
  title: "🔌 ต่อโน้ตบุ๊ก (Laptop) ผ่านสาย HDMI",
  icon: "Cable",
  steps: [
    {
      id: "floor6-meeting-1",
      order: 1,
      title: "เปิด Smart TV",
      instruction: "เปิด Smart TV ประจำห้องประชุม",
      image: { status: "pending" },
    },
    {
      id: "floor6-meeting-2",
      order: 2,
      title: "เสียบสาย HDMI",
      instruction:
        "เสียบสาย HDMI สำรองเข้ากับโน้ตบุ๊ก — โดยปกติ Input ถูกเลือกไว้ให้แล้ว ไม่ต้องเปลี่ยน Input เอง",
      expectedResult: "ภาพจากโน้ตบุ๊กปรากฏบนจอ Smart TV",
      image: { status: "pending" },
    },
  ],
  troubleshootingIds: ["no-signal-on-display"],
};

// ---------------------------------------------------------------------------
// Floor 6 — Classrooms 601–608, shared workflows (Bible §22; Phase 7 §12–§22)
// VERIFIED: no HDMI cable is provided for personal devices in these rooms —
// personal devices (notebook/iPad) use Wireless only.
// ---------------------------------------------------------------------------

const smallClassroomUseRoomPc: Workflow = {
  id: "small-classroom-use-room-pc",
  slug: "use-room-pc",
  title: "🖥 ใช้คอมพิวเตอร์ประจำห้อง",
  icon: "Monitor",
  criticalWarning: {
    level: "info",
    title: "💡 ข้อควรรู้",
    message:
      "ในบางห้อง เมื่อกดปุ่มที่กล่องควบคุมสัญญาณ TV อาจเปลี่ยนไปช่องอื่นอัตโนมัติ หากภาพหาย ให้ใช้รีโมท TV เลือกกลับไปยังช่อง HDMI ที่เชื่อมต่อกับระบบห้อง",
  },
  steps: [
    {
      id: "small-classroom-pc-1",
      order: 1,
      title: "ตรวจสอบระบบห้อง",
      instruction:
        "ตรวจสอบว่าระบบห้องเปิดอยู่ — โดยปกติเจ้าหน้าที่อาคารเป็นผู้เปิดระบบให้ก่อนใช้งาน",
      image: { status: "pending" },
    },
    {
      id: "small-classroom-pc-2",
      order: 2,
      title: "เปิดคอมพิวเตอร์ประจำห้อง",
      instruction: "เปิดคอมพิวเตอร์ประจำห้อง",
      image: { status: "pending" },
    },
    {
      id: "small-classroom-pc-3",
      order: 3,
      title: "ตรวจสอบภาพ",
      instruction: "ตรวจสอบว่าภาพจากคอมพิวเตอร์ประจำห้องขึ้นจอแล้ว",
      expectedResult: "ภาพจากคอมพิวเตอร์ประจำห้องปรากฏบนจอหลัก",
      image: { status: "pending" },
    },
    {
      id: "small-classroom-pc-4",
      order: 4,
      title: "ใช้คอมพิวเตอร์นำเสนอ",
      instruction: "เปิด PowerPoint, PDF, เว็บไซต์ หรือเนื้อหาที่ต้องการนำเสนอ",
      image: { status: "pending" },
    },
    {
      id: "small-classroom-pc-5",
      order: 5,
      title: "ตรวจสอบเสียง",
      instruction: "หากเนื้อหาที่นำเสนอมีเสียง ให้เปิดเนื้อหานั้นและตรวจสอบเสียง",
      expectedResult: "เสียงออกจากระบบห้องเมื่อเปิดเนื้อหาที่มีเสียง",
      image: { status: "pending" },
    },
  ],
  troubleshootingIds: ["no-signal-on-display", "tv-input-changed-after-input-box"],
};

const smallClassroomWirelessShare: Workflow = {
  id: "small-classroom-wireless-share",
  slug: "wireless-share",
  title: "📡 แชร์หน้าจอจากอุปกรณ์ส่วนตัว",
  shortDescription: "โน้ตบุ๊ก (Laptop) หรือ iPad — ผ่านระบบไร้สายเท่านั้น",
  icon: "Wifi",
  osChoice: {
    question: "คุณใช้อุปกรณ์อะไร?",
    options: [
      {
        id: "windows",
        label: "โน้ตบุ๊ก Windows",
        steps: [
          {
            id: "small-classroom-wireless-win-1",
            order: 1,
            title: "เชื่อมต่อ Wi-Fi",
            instruction: "เชื่อมต่อ Wi-Fi ประจำห้องเรียน",
            statusTags: [{ kind: "wifi-required" }],
            showRoomWifi: true,
            image: { status: "pending" },
          },
          {
            id: "small-classroom-wireless-win-2",
            order: 2,
            title: "เชื่อมต่อจากโน้ตบุ๊ก",
            instruction: "กด Win + K แล้วเลือกชื่อจอห้องเรียน",
            platformVariant: "windows",
            keyboardShortcut: ["Win", "K"],
            image: { status: "pending" },
          },
        ],
      },
      {
        id: "mac",
        label: "Mac หรือ iPad",
        steps: [
          {
            id: "small-classroom-wireless-mac-1",
            order: 1,
            title: "เชื่อมต่อ Wi-Fi",
            instruction: "เชื่อมต่อ Wi-Fi ประจำห้องเรียน",
            statusTags: [{ kind: "wifi-required" }],
            showRoomWifi: true,
            image: { status: "pending" },
          },
          {
            id: "small-classroom-wireless-mac-2",
            order: 2,
            title: "เชื่อมต่อจาก Mac หรือ iPad",
            instruction: "เปิด Control Center → Screen Mirroring แล้วเลือกชื่อจอห้องเรียน",
            platformVariant: "mac",
            image: { status: "pending" },
          },
        ],
      },
    ],
  },
  steps: [
    {
      id: "small-classroom-wireless-3",
      order: 3,
      title: "ตรวจสอบภาพ",
      instruction: "ตรวจสอบว่าภาพจากอุปกรณ์ของคุณขึ้นจอแล้ว",
      expectedResult: "ภาพจากอุปกรณ์ส่วนตัวแสดงบนจอห้อง",
      image: { status: "pending" },
    },
    {
      id: "small-classroom-wireless-4",
      order: 4,
      title: "ตรวจสอบเสียง",
      instruction: "หากเนื้อหาที่แชร์มีเสียง ให้เปิดเนื้อหานั้นและตรวจสอบเสียง",
      expectedResult: "เสียงออกจากระบบห้องเมื่อเปิดเนื้อหาที่มีเสียง",
      image: { status: "pending" },
    },
  ],
  troubleshootingIds: [
    "wireless-device-not-found",
    "cannot-connect",
    "pin-not-showing",
  ],
};

// ---------------------------------------------------------------------------
// Floor 7 — Smart Classrooms 701/702 (Bible §21, §23; Phase 7 §23–§32)
// ---------------------------------------------------------------------------

const smartClassroomUseRoomPc: Workflow = {
  id: "smart-classroom-use-room-pc",
  slug: "use-room-pc",
  title: "🖥 ใช้คอมพิวเตอร์ประจำห้อง",
  icon: "Monitor",
  criticalWarning: {
    level: "info",
    title: "💡 ข้อควรรู้",
    message:
      "หากใช้คอมพิวเตอร์ประจำห้องแล้วไม่มีเสียง ให้ตรวจสอบการตั้งค่าเสียงของคอมพิวเตอร์ก่อน",
  },
  steps: [
    {
      id: "smart-classroom-pc-1",
      order: 1,
      title: "เปิดคอมพิวเตอร์ประจำห้อง",
      instruction:
        "เปิดคอมพิวเตอร์ประจำห้องก่อน — โดยปกติตู้ Rack ถูกเปิดไว้แล้วโดยเจ้าหน้าที่อาคาร แต่คอมพิวเตอร์อาจยังไม่ได้เปิด",
      image: { status: "pending" },
    },
    {
      id: "smart-classroom-pc-2",
      order: 2,
      title: "เลือกแหล่งสัญญาณที่ Smart Touchscreen",
      instruction:
        "แตะปุ่มคอมพิวเตอร์ประจำห้องบน Smart Touchscreen (หากภาพยังไม่ขึ้นอัตโนมัติ)",
      expectedResult: "ภาพจากคอมพิวเตอร์ประจำห้องปรากฏบนจอหลัก",
      image: { status: "pending" },
    },
    {
      id: "smart-classroom-pc-3",
      order: 3,
      title: "ตรวจสอบเสียง",
      instruction: "หากเนื้อหาที่นำเสนอมีเสียง ให้เปิดเนื้อหานั้นและตรวจสอบเสียง",
      expectedResult: "เสียงออกจากระบบห้องเมื่อเปิดเนื้อหาที่มีเสียง",
      image: { status: "pending" },
    },
  ],
  troubleshootingIds: ["no-signal-on-display", "room-pc-no-audio"],
};

const smartClassroomUseNotebookHdmi: Workflow = {
  id: "smart-classroom-use-notebook-hdmi",
  slug: "use-notebook-hdmi",
  title: "💻 ต่อโน้ตบุ๊ก (Laptop) ผ่านสาย HDMI",
  icon: "Cable",
  steps: [
    {
      id: "smart-classroom-hdmi-1",
      order: 1,
      title: "เสียบสาย HDMI",
      instruction: "เสียบสาย HDMI สำรองเข้ากับโน้ตบุ๊กก่อน",
      image: { status: "pending" },
    },
    {
      id: "smart-classroom-hdmi-2",
      order: 2,
      title: "รอระบบตรวจพบสัญญาณ",
      instruction: "รอสักครู่ให้ระบบตรวจพบสัญญาณจากโน้ตบุ๊ก",
      image: { status: "pending" },
    },
    {
      id: "smart-classroom-hdmi-3",
      order: 3,
      title: "เลือกแหล่งสัญญาณที่ Smart Touchscreen",
      instruction: "แตะ Smart Touchscreen แล้วเลือกช่อง 2 (HDMI)",
      image: { status: "pending" },
    },
    {
      id: "smart-classroom-hdmi-4",
      order: 4,
      title: "ตรวจสอบภาพ",
      instruction: "ตรวจสอบว่าภาพจากโน้ตบุ๊กขึ้นจอแล้ว",
      expectedResult: "ภาพจากโน้ตบุ๊กปรากฏบนจอหลัก",
      image: { status: "pending" },
    },
    {
      id: "smart-classroom-hdmi-5",
      order: 5,
      title: "ตรวจสอบเสียง",
      instruction: "หากเนื้อหาที่นำเสนอมีเสียง ให้เปิดเนื้อหานั้นและตรวจสอบเสียง",
      expectedResult: "เสียงออกจากระบบห้องเมื่อเปิดเนื้อหาที่มีเสียง",
      image: { status: "pending" },
    },
  ],
  troubleshootingIds: ["no-signal-on-display", "windows-pc-only-display"],
};

const smartClassroomWirelessShare: Workflow = {
  id: "smart-classroom-wireless-share",
  slug: "wireless-share",
  title: "📡 แชร์หน้าจอจากอุปกรณ์ส่วนตัว",
  shortDescription: "โน้ตบุ๊ก (Laptop) หรือ iPad — ผ่าน Crestron Wireless",
  icon: "Wifi",
  osChoice: {
    question: "คุณใช้อุปกรณ์อะไร?",
    options: [
      {
        id: "windows",
        label: "โน้ตบุ๊ก Windows",
        steps: [
          {
            id: "smart-classroom-wireless-win-1",
            order: 1,
            title: "เชื่อมต่อ Wi-Fi",
            instruction: "เชื่อมต่อ Wi-Fi ประจำห้อง",
            statusTags: [{ kind: "wifi-required" }],
            showRoomWifi: true,
            image: { status: "pending" },
          },
          {
            id: "smart-classroom-wireless-win-2",
            order: 2,
            title: "เชื่อมต่อจากโน้ตบุ๊ก",
            instruction: "กด Win + K แล้วเลือกชื่อจอห้อง",
            platformVariant: "windows",
            keyboardShortcut: ["Win", "K"],
            image: { status: "pending" },
          },
        ],
      },
      {
        id: "mac",
        label: "Mac หรือ iPad",
        steps: [
          {
            id: "smart-classroom-wireless-mac-1",
            order: 1,
            title: "เชื่อมต่อ Wi-Fi",
            instruction: "เชื่อมต่อ Wi-Fi ประจำห้อง",
            statusTags: [{ kind: "wifi-required" }],
            showRoomWifi: true,
            image: { status: "pending" },
          },
          {
            id: "smart-classroom-wireless-mac-2",
            order: 2,
            title: "เชื่อมต่อจาก Mac หรือ iPad",
            instruction: "เปิด Control Center → Screen Mirroring แล้วเลือกชื่อจอห้อง",
            platformVariant: "mac",
            image: { status: "pending" },
          },
        ],
      },
    ],
  },
  steps: [
    {
      id: "smart-classroom-wireless-3",
      order: 3,
      title: "กรอก PIN Code",
      instruction:
        "กรอก PIN Code 4 หลักที่ปรากฏบนจอหลัก — PIN เปลี่ยนทุกครั้ง ไม่ใช่รหัสตายตัว",
      statusTags: [{ kind: "pin-required" }],
      expectedResult: "อุปกรณ์เชื่อมต่อและภาพปรากฏบนจอหลัก",
      image: { status: "pending" },
    },
    {
      id: "smart-classroom-wireless-4",
      order: 4,
      title: "ตรวจสอบเสียง",
      instruction: "หากเนื้อหาที่แชร์มีเสียง ให้เปิดเนื้อหานั้นและตรวจสอบเสียง",
      expectedResult: "เสียงออกจากระบบห้องเมื่อเปิดเนื้อหาที่มีเสียง",
      image: { status: "pending" },
    },
  ],
  troubleshootingIds: [
    "wireless-device-not-found",
    "cannot-connect",
    "pin-not-showing",
  ],
};

// ---------------------------------------------------------------------------
// Room 703 — Gross Anatomy Lab & Briefing Room (Bible §8–§20, §59–§62)
// ---------------------------------------------------------------------------

const room703PowerStartup: Workflow = {
  id: "room703-power-startup",
  slug: "power-startup",
  title: "🔌 เปิดระบบห้อง 703 (Power Startup)",
  shortDescription:
    "ทำเมื่อระบบยังไม่พร้อมใช้งาน — โดยปกติ IT เปิดเตรียมไว้ให้แล้ว",
  icon: "Power",
  criticalWarning: {
    level: "warning",
    title: "⚠️ ตรวจสอบก่อนเริ่ม",
    message:
      "ต้องเปิดระบบหลักของห้อง Briefing ให้ครบทุกจุดก่อน ระบบควบคุมบน iPadGross จึงจะเริ่มทำงานได้",
  },
  steps: [
    {
      id: "room703-power-1",
      order: 1,
      title: "เปิด Power Control",
      instruction: "เปิดสวิตช์ Power Control ของระบบห้อง 703",
      image: { status: "pending" },
    },
    {
      id: "room703-power-2",
      order: 2,
      title: "เปิด Rack",
      instruction: "เปิดสวิตช์จ่ายไฟให้ Rack อุปกรณ์",
      image: { status: "pending" },
    },
    {
      id: "room703-power-3",
      order: 3,
      title: "ตรวจสอบอุปกรณ์ใน Rack",
      instruction: "ตรวจสอบว่าอุปกรณ์ทุกกล่องภายใน Rack ติดไฟครบแล้ว",
      image: { status: "pending" },
    },
    {
      id: "room703-power-4",
      order: 4,
      title: "ตรวจสอบทีวี",
      instruction: "ตรวจสอบว่าจอทีวีทุกจุดติดแล้ว",
      image: { status: "pending" },
    },
    {
      id: "room703-power-5",
      order: 5,
      title: "เปิด Power Strip ของระบบภาพ",
      instruction: "เปิด Power Strip ที่จ่ายไฟให้ระบบภาพ",
      image: { status: "pending" },
    },
    {
      id: "room703-power-6",
      order: 6,
      title: "รอระบบ Initialize",
      instruction: "รอให้ระบบเริ่มทำงานจนเสร็จสมบูรณ์ก่อนใช้งานต่อ",
      image: { status: "pending" },
    },
    {
      id: "room703-power-7",
      order: 7,
      title: "ตรวจสอบ iPadGross",
      instruction: "ตรวจสอบว่า iPadGross พร้อมใช้งานเป็น Controller แล้ว",
      expectedResult: "iPadGross แสดงหน้า Source Selection พร้อมใช้งาน",
      image: { status: "pending" },
    },
  ],
  troubleshootingIds: ["device-not-responding"],
};

const room703ViewGrossCamera: Workflow = {
  id: "room703-view-gross-camera",
  slug: "view-gross-camera",
  title: "📹 ดูภาพสดจากกล้องห้อง Gross",
  shortDescription: "แสดงภาพจากกล้องเคนบนจอห้อง Briefing",
  icon: "Camera",
  steps: [
    {
      id: "room703-camera-1",
      order: 1,
      title: "เปิด iPadGross",
      instruction: "หยิบ iPadGross แล้วเข้าสู่หน้า Source Selection",
      image: { status: "pending" },
    },
    {
      id: "room703-camera-2",
      order: 2,
      title: "เลือกกล้องเคน",
      instruction: "เลือก Source: กล้องเคน",
      image: { status: "pending" },
    },
  ],
  successMessage: "ภาพสดจากกล้องห้อง Gross ปรากฏบนจอห้อง Briefing",
  troubleshootingIds: ["no-signal-on-display", "device-not-responding"],
  commonMistake:
    "iPadGross คืออุปกรณ์ควบคุมระบบห้อง 703 เท่านั้น ไม่ใช่ iPad ส่วนตัวของผู้ใช้",
};

const room703LectureHdmi: Workflow = {
  id: "room703-lecture-hdmi",
  slug: "lecture-hdmi",
  title: "💻 ต่อโน้ตบุ๊กส่วนตัวผ่าน HDMI",
  icon: "Cable",
  criticalWarning: {
    level: "info",
    title: "ℹ️ ห้องนี้ไม่มีคอมพิวเตอร์ประจำห้อง",
    message: "กรุณาใช้โน้ตบุ๊กส่วนตัว",
  },
  steps: [
    {
      id: "room703-hdmi-1",
      order: 1,
      title: "เสียบสาย HDMI",
      instruction: "เสียบสาย HDMI จากกล่องควบคุมเข้ากับโน้ตบุ๊ก",
      image: { status: "pending" },
    },
    {
      id: "room703-hdmi-2",
      order: 2,
      title: "เลือก Lecture บน iPadGross",
      instruction: "บน iPadGross เลือก Source: Lecture แล้วเลือก Input: HDMI",
      image: { status: "pending" },
    },
  ],
  successMessage: "ภาพจากโน้ตบุ๊กปรากฏบนจอห้อง Briefing",
  troubleshootingIds: ["no-signal-on-display", "device-not-responding"],
  commonMistake:
    "iPadGross คืออุปกรณ์ควบคุมระบบห้อง 703 เท่านั้น ไม่ใช่ iPad ส่วนตัวของผู้ใช้",
};

const room703LectureWireless: Workflow = {
  id: "room703-lecture-wireless",
  slug: "lecture-wireless",
  title: "📡 แชร์จอไร้สายด้วย Wireless Dongle",
  icon: "Wifi",
  steps: [
    {
      id: "room703-wireless-1",
      order: 1,
      title: "หยิบ Wireless Dongle",
      instruction: "หยิบ Wireless Dongle",
      image: { status: "pending" },
    },
    {
      id: "room703-wireless-2",
      order: 2,
      title: "เสียบ Dongle",
      instruction:
        "เสียบ Dongle เข้ากับอุปกรณ์ของคุณ (USB หรือ USB-C / Type-C ตามพอร์ตที่มี)",
      image: { status: "pending" },
    },
    {
      id: "room703-wireless-3",
      order: 3,
      title: "รอ Dongle พร้อมใช้งาน",
      instruction: "รอไฟสถานะบน Dongle เปลี่ยนเป็นสถานะพร้อมใช้งาน",
      image: { status: "pending" },
    },
    {
      id: "room703-wireless-4",
      order: 4,
      title: "กด Share",
      instruction: "กดปุ่มบน Wireless Dongle 1 ครั้ง เพื่อเริ่มแชร์หน้าจอ",
      image: { status: "pending" },
    },
    {
      id: "room703-wireless-5",
      order: 5,
      title: "เลือก Lecture บน iPadGross",
      instruction:
        "บน iPadGross เลือก Source: Lecture แล้วเลือก Input: Wireless",
      image: { status: "pending" },
    },
  ],
  successMessage: "ภาพจากโน้ตบุ๊กปรากฏบนจอห้อง Briefing",
  troubleshootingIds: ["wireless-device-not-found", "device-not-responding"],
  commonMistake:
    "iPadGross คืออุปกรณ์ควบคุมระบบห้อง 703 เท่านั้น ไม่ใช่ iPad ส่วนตัวของผู้ใช้",
};

const room703SwitchRoomMode: Workflow = {
  id: "room703-switch-room-mode",
  slug: "switch-room-mode",
  title: "🔀 เปลี่ยนโหมดการใช้งานห้อง",
  shortDescription:
    "ปกติระบบพร้อมใช้งานแล้วในโหมด รวมห้อง + Lecture — ทำขั้นตอนนี้เฉพาะเมื่อต้องการเปลี่ยนโหมด",
  icon: "SplitSquareHorizontal",
  steps: [
    {
      id: "room703-mode-1",
      order: 1,
      title: "เปิด Room Mode บน iPadGross",
      instruction: "บน iPadGross เข้าสู่หน้า Room Mode",
      image: { status: "pending" },
    },
    {
      id: "room703-mode-2",
      order: 2,
      title: "เลือกโหมด",
      instruction:
        "เลือก รวมห้อง หากต้องการให้ทั้งสองฝั่งแสดง Source เดียวกัน หรือเลือก แยกห้อง หากต้องการให้ Gross แสดงกล้องเคนและ Briefing แสดง Lecture แยกกัน",
      expectedResult:
        "รวมห้อง: ทั้งสองฝั่งแสดง Source เดียวกัน / แยกห้อง: Gross แสดงกล้องเคน, Briefing แสดง Lecture",
      image: { status: "pending" },
    },
  ],
  troubleshootingIds: ["device-not-responding"],
  commonMistake:
    "iPadGross คืออุปกรณ์ควบคุมระบบห้อง 703 เท่านั้น ไม่ใช่ iPad ส่วนตัวของผู้ใช้",
};

// ---------------------------------------------------------------------------
// Aggregate export
// ---------------------------------------------------------------------------

export const WORKFLOWS: Workflow[] = [
  jongrakRoomPcPresentation,
  jongrakWebexRecording,
  jongrakPersonalScreenShare,
  floor6MeetingUseHdmi,
  smallClassroomUseRoomPc,
  smallClassroomWirelessShare,
  smartClassroomUseRoomPc,
  smartClassroomUseNotebookHdmi,
  smartClassroomWirelessShare,
  room703PowerStartup,
  room703ViewGrossCamera,
  room703LectureHdmi,
  room703LectureWireless,
  room703SwitchRoomMode,
];
