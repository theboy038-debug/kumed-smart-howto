/**
 * workflows.ts
 *
 * Every user intent, translated into concrete steps. Intent-first titles
 * (Bible Principle 01) — never expose raw input/matrix names as the
 * primary label. All images are `status: "pending"` until real photos
 * exist (Bible §10, §32).
 */

import type { GuideStep, Workflow } from "@/lib/types";

/**
 * Phase 8 addendum §1–§2 — Windows AUDIO OUTPUT CHECK (Ctrl+Win+V),
 * distinct from a room's physical AUDIO SWITCH (a control-box channel
 * that only Floor 5 has). This check applies to any Windows-driven
 * source that plays audio, regardless of whether the room's control
 * box has an audio switch.
 */
function windowsAudioOutputCheckStep(id: string, order: number): GuideStep {
  return {
    id,
    order,
    title: "ตรวจสอบเสียง",
    instruction:
      'กด "Ctrl + Win + V" แล้วเลือกอุปกรณ์เสียงออก (Output) ของระบบห้องให้ถูกต้อง จากนั้นเปิดวิดีโอหรือไฟล์ที่มีเสียงเพื่อทดสอบ',
    keyboardShortcut: ["Ctrl", "Win", "V"],
    expectedResult: "เสียงออกจากระบบห้องเมื่อเปิดสื่อที่มีเสียง",
    image: { status: "ready",
        src: "/images/shared/Aten-soundcheck.webp",
        alt: "Input 1 เลือกเสียงออกช่อง ATEN_T4KHDMI" },
  };
}

/**
 * For flows that aren't Windows-only (Dongle, Mac/iPad branches) — the
 * Ctrl+Win+V shortcut is Windows-specific and must not be presented as
 * if it applies to Mac (no verified Mac-equivalent shortcut exists in
 * the source data, so none is invented here).
 */
function genericAudioOutputCheckStep(id: string, order: number): GuideStep {
  return {
    id,
    order,
    title: "ตรวจสอบเสียง",
    instruction:
      "ตรวจสอบว่าเสียงออกจากระบบห้อง (บน Windows: กด Ctrl + Win + V แล้วเลือกอุปกรณ์เสียงออกที่ถูกต้อง) จากนั้นเปิดสื่อที่มีเสียงเพื่อทดสอบ",
    expectedResult: "เสียงออกจากระบบห้องเมื่อเปิดสื่อที่มีเสียง",
    image: { status: "ready",
        src: "/images/shared/window-wifi-soundcheck.webp",
        alt: "window wifi soundcheck" },
  };
}

function macAudioOutputCheckStep(id: string, order: number): GuideStep {
  return {
    id,
    order,
    title: "ตรวจสอบเสียง",
    instruction: "ตรวจสอบว่าเสียงออกจากระบบห้องแล้ว โดยเปิดวิดีโอหรือไฟล์ที่มีเสียงเพื่อทดสอบ",
    expectedResult: "เสียงออกจากระบบห้องเมื่อเปิดสื่อที่มีเสียง",
    image: { status: "ready",
        src: "/images/shared/mac-audio.webp",
        alt: "mac audio check" },
  };
}

// ---------------------------------------------------------------------------
// Floor 5 — Jongrak (Bible §18, §24–§26; Phase 7 §3–§11; Phase 8 §3–§7)
// ---------------------------------------------------------------------------

const jongrakRoomPcPresentation: Workflow = {
  id: "jongrak-room-pc-presentation",
  slug: "room-pc-presentation",
  title: " นำเสนอผ่านคอมพิวเตอร์ประจำห้อง",
  shortDescription:
    "ใช้คอมพิวเตอร์ที่อยู่ในห้องเพื่อเปิด PowerPoint, PDF เว็บไซต์ หรือเนื้อหาที่ต้องการนำเสนอ",
  icon: "Monitor",
  beforeSteps: [
    {
      id: "jongrak-pc-before-1",
      order: 1,
      title: "ตรวจกล่องควบคุม",
      instruction: "ตรวจกล่องควบคุมก่อนเริ่มใช้งาน — ถ้าใช้คอมพิวเตอร์ประจำห้อง ให้เลือกช่อง 1 (Input 1)",
      expectedResult: "กล่องควบคุมแสดงว่าเลือกช่อง 1 (ภาพ) แล้ว",
      image: { status: "ready",
        src: "/images/floor-5/jongrak/control-box-input1-audio1.webp",
        alt: "กล่องควบคุมของห้องจงรัก กดเลือก Input 1" },
    },
    {
      id: "jongrak-pc-before-2",
      order: 2,
      title: "ตรวจช่องเสียง",
      instruction: "ตรวจช่องเสียงที่กล่องควบคุมให้เป็นช่อง 1 เพื่อให้เสียงมาจากคอมพิวเตอร์ประจำห้อง",
      expectedResult: "กล่องควบคุมแสดงว่าเลือกช่องเสียงเป็นช่อง 1 แล้ว",
      image: { status: "ready",
        src: "/images/floor-5/jongrak/control-box-input1-audio1.webp",
        alt: "กล่องควบคุมของห้องจงรัก กดเลือก Audio 1" },
    },
  ],
  steps: [
    {
      id: "jongrak-pc-1",
      order: 1,
      title: "เปิดคอมพิวเตอร์ประจำห้อง",
      instruction: "เปิดคอมพิวเตอร์ประจำห้อง",
      image: { status: "ready",
        src: "/images/floor-5/jongrak/room-pc-power.webp",
        alt: "ปุ่มเปิดเครื่องคอมพิวเตอร์ประจำห้อง" },
    },
    {
      id: "jongrak-pc-2",
      order: 2,
      title: "รอภาพขึ้นจอ",
      instruction: "รอสักครู่ให้ภาพขึ้นจอ",
      expectedResult: "ภาพจากคอมพิวเตอร์ประจำห้องปรากฏบนจอ",
      image: { status: "ready",
        src: "/images/shared/jongrak-openpc.webp",
        alt: "ภาพคอมเปิดติด" },
    },
    windowsAudioOutputCheckStep("jongrak-pc-audio", 3),
    {
      id: "jongrak-pc-3",
      order: 4,
      title: "เปิดเนื้อหาที่ต้องการนำเสนอ",
      instruction: "เปิดไฟล์หรือโปรแกรมที่ต้องการนำเสนอ เช่น PowerPoint, PDF หรือเว็บไซต์",
      image: { status: "ready",
        src: "/images/shared/openpwp.webp",
        alt: "เปิดเอกสารประกอบการประชุม" },
    },
    {
      id: "jongrak-pc-4",
      order: 5,
      title: "เริ่มนำเสนอ",
      instruction: "เริ่มนำเสนอเนื้อหาของคุณได้เลย",
      image: { status: "ready",
        src: "/images/shared/startpresent.webp",
        alt: "เริ่มนำเสนอผ่านโปรเจคเตอร์" },
    },
  ],
  troubleshootingIds: ["no-signal-on-display"],
};

const jongrakWebexRecording: Workflow = {
  id: "jongrak-webex-recording",
  slug: "webex-recording",
  title: " ประชุม Webex พร้อมบันทึกภาพ",
  shortDescription: "ใช้สำหรับประชุมออนไลน์ — ไม่จำเป็นต้องเปิดหากแค่ต้องการนำเสนอ",
  icon: "Video",
  criticalWarning: {
    level: "danger",
    title: "🛑 คำเตือนสำคัญ",
    message:
      "ห้ามกดเปลี่ยนช่องบน Mini Monitor ต้องคงไว้ที่ IN 1 เสมอ เพื่อให้ระบบ Webex บันทึกภาพบรรยากาศภายในห้องประชุมได้อย่างถูกต้อง",
  },
  beforeSteps: [
    {
      id: "jongrak-webex-before-1",
      order: 1,
      title: "ตรวจกล่องควบคุม",
      instruction: "ตรวจกล่องควบคุมก่อนเริ่มใช้งาน — เลือกช่อง 1 (Input 1) สำหรับคอมพิวเตอร์ประจำห้อง",
      expectedResult: "กล่องควบคุมแสดงว่าเลือกช่อง 1 (ภาพ) แล้ว",
      image: { status: "ready",
        src: "/images/floor-5/jongrak/control-box-input1-audio1.webp",
        alt: "กล่องควบคุมของห้องจงรัก กดเลือก Input 1" },
    },
    {
      id: "jongrak-webex-before-2",
      order: 2,
      title: "ตรวจช่องเสียง",
      instruction: "ตรวจช่องเสียงที่กล่องควบคุมให้เป็นช่อง 1",
      expectedResult: "กล่องควบคุมแสดงว่าเลือกช่องเสียงเป็นช่อง 1 แล้ว",
      image: { status: "ready",
        src: "/images/floor-5/jongrak/control-box-input1-audio1.webp",
        alt: "กล่องควบคุมของห้องจงรัก กดเลือก Audio 1" },
    },
  ],
  steps: [
    {
      id: "jongrak-webex-1",
      order: 1,
      title: "เปิดโปรแกรม Webex",
      instruction: "เปิดโปรแกรม Webex บนคอมพิวเตอร์ประจำห้อง",
      expectedResult: "โปรแกรม Webex พร้อมสำหรับเข้าร่วมการประชุม",
      image: { status: "ready",
        src: "/images/floor-5/jongrak/webex-open.webp",
        alt: "หน้าจอโปรแกรม Webex" },
    },
    windowsAudioOutputCheckStep("jongrak-webex-audio-windows", 2),
    {
      id: "jongrak-webex-audio-speaker",
      order: 3,
      title: "ทดสอบเสียงใน Webex (Speaker)",
      instruction:
        "เข้าเมนูตั้งค่า Audio ในโปรแกรม Webex เลือก Speaker / เสียงออก แล้วกด Test Speaker",
      expectedResult: "ได้ยินเสียงทดสอบจากระบบห้อง",
      image: { status: "ready",
        src: "/images/floor-5/jongrak/webex-audio-settings.webp",
        alt: "หน้าจอตั้งค่าเสียงใน Webex" },
    },
    {
      id: "jongrak-webex-audio-microphone",
      order: 4,
      title: "ทดสอบไมโครโฟนใน Webex",
      instruction: "ในหน้าเดียวกัน เลือก Microphone / ไมโครโฟน แล้วกด Test Microphone",
      expectedResult: "เห็นแถบระดับเสียงตอบสนองเมื่อพูด",
      image: { status: "ready",
        src: "/images/floor-5/jongrak/webex-microphone-settings.webp", 
        alt: "การตั้งค่าไมโครโฟนใน Webex" },
    },
    {
      id: "jongrak-webex-2",
      order: 5,
      title: "เริ่มบันทึกวิดีโอ",
      instruction: "กดปุ่ม Record ภายใน Webex เพื่อเริ่มบันทึกวิดีโอ",
      expectedResult: "สถานะการบันทึกแสดงว่าระบบกำลังบันทึก",
      image: { status: "ready",
        src: "/images/floor-5/jongrak/webex-record-button.webp",
        alt: "ปุ่มบันทึกวิดีโอใน Webex" },
    },
    {
      id: "jongrak-webex-3",
      order: 6,
      title: "แชร์สไลด์หรือหน้าจอ",
      instruction:
        "หากต้องการแชร์สไลด์หรือหน้าจอ ให้กดปุ่ม Share ภายในโปรแกรม Webex เท่านั้น — ห้ามเปลี่ยนช่องสัญญาณของ Mini Monitor",
      statusTags: [{ kind: "do-not-change" }],
      image: { status: "ready",
        src: "/images/floor-5/jongrak/webex-share-button.webp",
        alt: "ปุ่มแชร์หน้าจอใน Webex" },
    },
  ],
  troubleshootingIds: ["no-signal-on-display", "device-not-responding"],
};

const jongrakWebexPersonalShare: Workflow = {
  id: "jongrak-webex-personal-share",
  slug: "webex-personal-share",
  title: " แชร์หน้าจอจากโน้ตบุ๊กระหว่างประชุม Webex",
  shortDescription: "กำลังประชุม Webex อยู่แล้ว และต้องการนำเสนอจากโน้ตบุ๊ก (Laptop) ส่วนตัว",
  icon: "Smartphone",
  criticalWarning: {
    level: "info",
    title: "ℹ️ ไม่ต้องเปลี่ยน Source ของห้อง",
    message:
      "การประชุมหลักยังคงใช้คอมพิวเตอร์ประจำห้อง (Input 1 / Audio Switch 1) เหมือนเดิม — ไม่ต้องสลับกล่องควบคุมไปที่โน้ตบุ๊ก มิฉะนั้น Webex ที่กำลังประชุมอยู่จะถูกตัดออกจากจอห้อง",
  },
  steps: [
    {
      id: "jongrak-webex-share-1",
      order: 1,
      title: "เปิด Webex บนโน้ตบุ๊ก",
      instruction: "เปิดโปรแกรมหรือเว็บ Webex บนโน้ตบุ๊ก (Laptop) ส่วนตัวของคุณ",
      image: { status: "ready",
        src: "/images/floor-5/jongrak/webex-open.webp",
        alt: "หน้าจอโปรแกรม Webex" },
    },
    {
      id: "jongrak-webex-share-2",
      order: 2,
      title: "เข้าร่วมห้องประชุมเดียวกัน",
      instruction: "Join Meeting เดียวกับที่กำลังประชุมอยู่ในห้อง",
      image: { status: "ready",
        src: "/images/floor-5/jongrak/webex-join-meeting.webp",
        alt: "หน้าจอเข้าร่วมการประชุม Webex" },
    },
    {
      id: "jongrak-webex-share-3",
      order: 3,
      title: "ปิดไมโครโฟน",
      instruction: "ปิดไมโครโฟน (Mute) บนโน้ตบุ๊ก",
      image: { status: "ready",
        src: "/images/floor-5/jongrak/webex-mute-audio.webp",
        alt: "ปิดเสียงไมค์บนโน้ตบุ๊ก" },
    },
    {
      id: "jongrak-webex-share-4",
      order: 4,
      title: "ปิดเสียงของโน้ตบุ๊ก",
      instruction:
        "ปิดเสียง (Speaker / Audio) ของโน้ตบุ๊ก เพื่อป้องกันเสียงสะท้อนและเสียงซ้ำ — เสียงประชุมหลักยังคงมาจากระบบห้องตามปกติ",
      image: { status: "ready",
        src: "/images/floor-5/jongrak/mute-audio.webp",
        alt: "ปิดเสียงบนโน้ตบุ๊ก" },
    },
    {
      id: "jongrak-webex-share-5",
      order: 5,
      title: "กด Share Screen",
      instruction: "ใช้เมนู Share Screen ในโปรแกรม Webex บนโน้ตบุ๊ก แล้วเลือกหน้าจอหรือหน้าต่างที่ต้องการนำเสนอ",
      expectedResult: "คนในห้องเห็นสิ่งที่แชร์ผ่านจอห้องตามปกติ และผู้เข้าร่วมทางไกลก็เห็นเช่นกัน",
      warning: {
        level: "info",
        message: "การแชร์หน้าจอผ่าน Webex อาจมีความหน่วงเล็กน้อย ขึ้นอยู่กับเครือข่ายและการเชื่อมต่อ",
      },
      image: { status: "ready",
        src: "/images/floor-5/jongrak/webex-share-button.webp",
        alt: "ปุ่มแชร์หน้าจอใน Webex" },
    },
  ],
  troubleshootingIds: ["no-signal-on-display", "device-not-responding"],
};

const jongrakPersonalScreenShare: Workflow = {
  id: "jongrak-personal-screen-share",
  slug: "personal-screen-share",
  title: " แชร์หน้าจอจากอุปกรณ์ส่วนตัว",
  shortDescription: "โน้ตบุ๊ก (Laptop), Mac หรือ iPad — เลือกวิธีที่สะดวกสำหรับคุณ",
  icon: "Smartphone",
  methodChoice: {
    question: "เลือกวิธีแชร์หน้าจอ",
    options: [
      {
        id: "dongle",
        label: "แชร์ผ่าน Wireless Dongle",
        description:
          "ต้องติดตั้ง Driver ก่อนใช้งาน — เหมาะสำหรับโน้ตบุ๊ก Windows",
        fallbackMethodId: "wifi",
        fallbackPrompt: "ภาพยังไม่ขึ้น? ลองเชื่อมต่อผ่าน Wi-Fi แทน",
        beforeSteps: [
          {
            id: "jongrak-dongle-before-1",
            order: 1,
            title: "ตรวจกล่องควบคุม",
            instruction: "ตรวจที่กล่องควบคุมก่อนว่าเลือกช่อง 2 (Input 2) สำหรับ Wireless",
            expectedResult: "กล่องควบคุมแสดงว่าเลือกช่อง 2 (ภาพ) แล้ว",
            image: { status: "ready",
              src: "/images/floor-5/jongrak/control-box-input2-audio2.webp",
              alt: "กล่องควบคุม เลือกช่อง 2 สำหรับภาพ" },
          },
          {
            id: "jongrak-dongle-before-2",
            order: 2,
            title: "ตรวจช่องเสียง",
            instruction: "ตรวจช่องเสียงให้เป็นช่อง 2 เพื่อให้เสียงมาจากอุปกรณ์ Wireless",
            expectedResult: "กล่องควบคุมแสดงว่าเลือกช่องเสียงเป็นช่อง 2 แล้ว",
            image: { status: "ready",
              src: "/images/floor-5/jongrak/control-box-input2-audio2.webp",
              alt: "กล่องควบคุม เลือกช่อง 2 สำหรับเสียง" },
          },
        ],
        steps: [
          {
            id: "jongrak-dongle-1",
            order: 1,
            title: "เสียบ Wireless Dongle",
            instruction: "เสียบ Wireless Dongle เข้ากับโน้ตบุ๊ก (Laptop)",
            image: { status: "ready",
              src: "/images/floor-5/jongrak/dongle-plug.webp",
              alt: "เสียบ Dongle เข้ากับโน้ตบุ๊ก" },
          },
          {
            id: "jongrak-dongle-driver",
            order: 2,
            title: "ติดตั้ง Driver ",
            instruction:
              "บนเครื่อง Windows ระบบจะเปิดหน้าต่าง Storage ของ Dongle ให้เปิดตัวติดตั้งแล้วติดตั้ง Driver MS ก่อนใช้งาน — หากเคยติดตั้งแล้วสามารถข้ามขั้นตอนนี้ได้(กรณีที่ภาพไม่ขึ้น ให้ลองกลับมาติดตั้ง Driver ใหม่อีกครั้ง)",
            image: { status: "ready",
              src: "/images/floor-5/jongrak/dongle-driver-install.gif", // ใช้ไฟล์ GIF ได้เลย
              alt: "ภาพเคลื่อนไหวแสดงการติดตั้ง Driver" },
          },
          {
            id: "jongrak-dongle-2",
            order: 3,
            title: "รอให้พร้อมใช้งาน",
            instruction: "รอให้อุปกรณ์พร้อมใช้งาน",
            image: { status: "ready",
              src: "/images/floor-5/jongrak/dongle-led-ready.webp",
              alt: "ไฟสถานะบน Dongle พร้อมใช้งาน" },
          },
          {
            id: "jongrak-dongle-3",
            order: 4,
            title: "กดปุ่ม Share",
            instruction: "กดปุ่ม Share บน Wireless Dongle",
            image: { status: "ready",
              src: "/images/floor-5/jongrak/dongle-press-share.webp",
              alt: "กดปุ่มที่ Dongle เพื่อแชร์จอ" },
          },
          {
            id: "jongrak-dongle-4",
            order: 5,
            title: "ตรวจสอบภาพ",
            instruction: "รอสักครู่ แล้วดูว่าภาพขึ้นจอหรือไม่",
            expectedResult: "ภาพจากโน้ตบุ๊กควรแสดงบนจอห้อง (แสดงผลแบบ Mirror หน้าจอ)",
            image: { status: "ready",
              src: "/images/floor-5/jongrak/dongle-check-image.webp",
              alt: "ตรวจสอบภาพที่แสดงบนจอ" },
          },
          genericAudioOutputCheckStep("jongrak-dongle-audio", 6),
        ],
      },
      {
        id: "wifi",
        label: "แชร์ผ่าน Wi-Fi",
        badge: "แนะนำสำหรับ Mac",
        description: "เหมาะสำหรับ Mac และเครื่องที่ต้องการเชื่อมต่อโดยไม่ต้องติดตั้ง Driver",
        beforeSteps: [
          {
            id: "jongrak-wifi-before-1",
            order: 1,
            title: "ตรวจกล่องควบคุม",
            instruction: "ตรวจกล่องควบคุมให้เลือกช่อง 2 (Input 2) สำหรับ Wireless",
            expectedResult: "กล่องควบคุมแสดงว่าเลือกช่อง 2 (ภาพ) แล้ว",
            image: { status: "ready",
              src: "/images/floor-5/jongrak/control-box-input2-audio2.webp",
              alt: "กล่องควบคุม เลือกช่อง 2 สำหรับภาพ" },
          },
          {
            id: "jongrak-wifi-before-2",
            order: 2,
            title: "ตรวจช่องเสียง",
            instruction: "ตรวจช่องเสียงให้เป็นช่อง 2 เพื่อให้เสียงมาจากอุปกรณ์ Wireless",
            expectedResult: "กล่องควบคุมแสดงว่าเลือกช่องเสียงเป็นช่อง 2 แล้ว",
            image: { status: "ready",
              src: "/images/floor-5/jongrak/control-box-input2-audio2.webp",
              alt: "กล่องควบคุม เลือกช่อง 2 สำหรับเสียง" },
          },
        ],
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
                  image: { status: "ready",
              src: "/images/floor-5/jongrak/window-connect-wifi.webp",
              alt: "เชื่อมต่อ Wi-Fi" },
                },
                {
                  id: "jongrak-wifi-win-2",
                  order: 2,
                  title: "แชร์หน้าจอ",
                  instruction: 'กด "Win + K" แล้วเลือกอุปกรณ์ของห้อง',
                  platformVariant: "windows",
                  keyboardShortcut: ["Win", "K"],
                  image: { status: "ready",
              src: "/images/floor-5/jongrak/window-connecting.webp",
              alt: "เชื่อมต่อออกจอ" },
                },
                {
                  id: "jongrak-wifi-win-3",
                  order: 3,
                  title: "ตรวจสอบภาพ",
                  instruction: "ตรวจสอบว่าภาพจากโน้ตบุ๊กขึ้นจอแล้ว",
                  expectedResult: "ภาพจากโน้ตบุ๊กปรากฏบนจอ",
                  image: { status: "ready",
              src: "/images/floor-5/jongrak/dongle-check-image.webp",
              alt: "กล่องควบคุม ตรวจสอบภาพ" },
                },
                genericAudioOutputCheckStep("jongrak-dongle-audio", 7),
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
                  image: { status: "ready",
              src: "/images/floor-5/jongrak/mac-connect-wifi.webp",
              alt: "mac เชื่อมต่อ Wi-Fi" },
                },
                {
                  id: "jongrak-wifi-mac-2",
                  order: 2,
                  title: "แชร์หน้าจอ",
                  instruction: "เปิด Control Center แล้วเลือก Screen Mirroring จากนั้นเลือกระบบของห้อง",
                  platformVariant: "mac",
                  image: { status: "ready",
              src: "/images/floor-5/jongrak/mac-share-screen.gif",
              alt: "mac แชร์หน้าจอ" },
                },
                {
                  id: "jongrak-wifi-mac-3",
                  order: 3,
                  title: "ตรวจสอบภาพ",
                  instruction: "ตรวจสอบว่าภาพจาก Mac หรือ iPad ขึ้นจอแล้ว",
                  expectedResult: "ภาพจากอุปกรณ์ของคุณปรากฏบนจอ",
                  image: { status: "ready",
              src: "/images/floor-5/jongrak/mac-check-image.webp",
              alt: "mac ตรวจสอบภาพ" },
                },
                macAudioOutputCheckStep("jongrak-wifi-mac-audio", 4),
              ],
            },
          ],
        },
        steps: [],
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
  // Phase 9.1 §1 — check/power the room FIRST (never assume someone
  // already did), THEN check the control box, THEN pick a source.
  beforeSteps: [
    {
      id: "small-classroom-pc-before-system",
      order: 1,
      title: "ตรวจสอบระบบห้อง",
      instruction:
        "ก่อนใช้งาน ให้ตรวจสอบว่าระบบห้องเปิดอยู่หรือไม่ หากยังไม่เปิด ให้เปิดตู้ Rack และเปิด/ตรวจสอบไฟเลี้ยงของระบบก่อนใช้งาน แล้วรอสักครู่ให้อุปกรณ์เริ่มทำงาน",
      image: { status: "pending" },
    },
    {
      id: "small-classroom-pc-before-1",
      order: 2,
      title: "ตรวจกล่องควบคุม",
      instruction: "ตรวจกล่องควบคุม — ถ้าใช้คอมพิวเตอร์ประจำห้อง ให้เลือกช่อง 1 (Input 1)",
      expectedResult: "กล่องควบคุมแสดงว่าเลือกช่อง 1 แล้ว",
      image: { status: "pending" },
    },
  ],
  steps: [
    {
      id: "small-classroom-pc-2",
      order: 1,
      title: "เปิดคอมพิวเตอร์ประจำห้อง",
      instruction: "เปิดคอมพิวเตอร์ประจำห้อง",
      image: { status: "pending" },
    },
    {
      id: "small-classroom-pc-3",
      order: 2,
      title: "ตรวจสอบภาพ",
      instruction: "ตรวจสอบว่าภาพจากคอมพิวเตอร์ประจำห้องขึ้นจอแล้ว",
      expectedResult: "ภาพจากคอมพิวเตอร์ประจำห้องปรากฏบนจอหลัก",
      image: { status: "pending" },
    },
    windowsAudioOutputCheckStep("small-classroom-pc-audio", 3),
    {
      id: "small-classroom-pc-4",
      order: 4,
      title: "ใช้คอมพิวเตอร์นำเสนอ",
      instruction: "เปิด PowerPoint, PDF, เว็บไซต์ หรือเนื้อหาที่ต้องการนำเสนอ",
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
  // Phase 9.1 §1 — same reorder: system/Rack check before the control box.
  beforeSteps: [
    {
      id: "small-classroom-wireless-before-system",
      order: 1,
      title: "ตรวจสอบระบบห้อง",
      instruction:
        "ก่อนใช้งาน ให้ตรวจสอบว่าระบบห้องเปิดอยู่หรือไม่ หากยังไม่เปิด ให้เปิดตู้ Rack และเปิด/ตรวจสอบไฟเลี้ยงของระบบก่อนใช้งาน แล้วรอสักครู่ให้อุปกรณ์เริ่มทำงาน",
      image: { status: "pending" },
    },
    {
      id: "small-classroom-wireless-before-1",
      order: 2,
      title: "ตรวจกล่องควบคุม",
      instruction: "ตรวจกล่องควบคุมให้เลือกช่อง 2 (Input 2) สำหรับ Wireless",
      expectedResult: "กล่องควบคุมแสดงว่าเลือกช่อง 2 แล้ว",
      image: { status: "pending" },
    },
  ],
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
          {
            id: "small-classroom-wireless-win-3",
            order: 3,
            title: "ตรวจสอบภาพ",
            instruction: "ตรวจสอบว่าภาพจากโน้ตบุ๊กขึ้นจอแล้ว",
            expectedResult: "ภาพจากอุปกรณ์ส่วนตัวแสดงบนจอห้อง",
            image: { status: "pending" },
          },
          windowsAudioOutputCheckStep("small-classroom-wireless-win-audio", 4),
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
          {
            id: "small-classroom-wireless-mac-3",
            order: 3,
            title: "ตรวจสอบภาพ",
            instruction: "ตรวจสอบว่าภาพจาก Mac หรือ iPad ขึ้นจอแล้ว",
            expectedResult: "ภาพจากอุปกรณ์ส่วนตัวแสดงบนจอห้อง",
            image: { status: "pending" },
          },
          macAudioOutputCheckStep("small-classroom-wireless-mac-audio", 4),
        ],
      },
    ],
  },
  steps: [],
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
  // Phase 8 §10.1 — known technical issue: no audio from Room PC on
  // 701/702. Do NOT add an audio-check step or troubleshooting link
  // here; just state it plainly and point to IT Support.
  criticalWarning: {
    level: "warning",
    title: "หมายเหตุ",
    message:
      "คอมพิวเตอร์ประจำห้อง 701–702 มีปัญหาด้านเสียงจากระบบ หากต้องใช้เสียง กรุณาติดต่อ IT Support",
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
        'แตะปุ่ม "PC" บน Smart Touchscreen (หากภาพยังไม่ขึ้นอัตโนมัติ)',
      expectedResult: "ภาพจากคอมพิวเตอร์ประจำห้องปรากฏบนจอหลัก",
      image: { status: "pending" },
    },
  ],
  troubleshootingIds: ["no-signal-on-display"],
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
      instruction: 'แตะ Smart Touchscreen แล้วเลือก "Laptop"',
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
    genericAudioOutputCheckStep("smart-classroom-hdmi-audio", 5),
  ],
  troubleshootingIds: [
    "no-signal-on-display",
    "windows-pc-only-display",
    "mac-hdmi-display-not-detected",
    "touchscreen-laptop-signal-retry",
  ],
};

const smartClassroomWirelessShare: Workflow = {
  id: "smart-classroom-wireless-share",
  slug: "wireless-share",
  title: "📡 แชร์หน้าจอจากอุปกรณ์ส่วนตัว",
  shortDescription: "โน้ตบุ๊ก (Laptop) หรือ iPad — ผ่าน Crestron Wireless",
  icon: "Wifi",
  beforeSteps: [
    {
      id: "smart-classroom-wireless-before-1",
      order: 1,
      title: "เลือกแหล่งสัญญาณที่ Smart Touchscreen",
      instruction: 'แตะ Smart Touchscreen แล้วเลือก "Wireless"',
      image: { status: "pending" },
    },
  ],
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
    genericAudioOutputCheckStep("smart-classroom-wireless-audio", 4),
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

/**
 * Phase 9 §10–§14 — Room 703's power-startup checklist, condensed from
 * the original 7 granular steps (still preserved verbatim in
 * `rooms.ts`'s `room703.system.powerStartup`) into 2, since it's now
 * repeated as a `beforeSteps` prefix across 6 branches (3 tasks × 2
 * paths each) instead of standing alone as a top-level task. Every
 * fact (Power Control, Rack, TV check, Power Strip, Initialize,
 * iPadGross) is preserved — only the step *count* changed, per this
 * phase's explicit permission to restructure UX flow without touching
 * business logic. Most of the time IT has already done this, so it's
 * presented as a quick check, not a mandatory ritual.
 */
function room703PowerPrepSteps(): GuideStep[] {
  return [
    {
      id: "room703-power-prep-a",
      order: 1,
      title: "ตรวจสอบว่าระบบเปิดอยู่",
      instruction:
        "โดยปกติ IT เปิดระบบเตรียมไว้ให้แล้ว — หากยังไม่ได้เปิด ให้เปิด Power Control และ Rack ของระบบ แล้วตรวจสอบว่าอุปกรณ์ในตู้ Rack และจอทีวีทุกจุดติดไฟแล้ว",
      image: { status: "pending" },
    },
    {
      id: "room703-power-prep-b",
      order: 2,
      title: "ตรวจสอบ iPadGross",
      instruction:
        "เปิด Power Strip ของระบบภาพ รอให้ระบบเริ่มทำงานจนเสร็จสมบูรณ์ แล้วตรวจสอบว่า iPadGross พร้อมใช้งานเป็น Controller แล้ว",
      expectedResult: "iPadGross แสดงหน้า Source Selection พร้อมใช้งาน",
      image: { status: "pending" },
    },
  ];
}

/** A step-level tip for Room 703's "separated" mode, where Gross always shows the camera (Phase 9 §11). */
function room703GrossNoSignalWarningStep(id: string, order: number): GuideStep {
  return {
    id,
    order,
    title: "ตรวจสอบภาพฝั่ง Gross",
    instruction: "ฝั่งห้อง Gross จะแสดงภาพจากกล้องเคนโดยอัตโนมัติ",
    warning: {
      level: "info",
      message:
        "ถ้ากล้องเคนไม่เปิดหรือไม่มีสัญญาณ จอฝั่ง Gross อาจแสดง No Signal — ให้ตรวจสอบว่าระบบกล้องเคนเปิดอยู่หรือไม่",
    },
    image: { status: "pending" },
  };
}

const ROOM703_COMMON_MISTAKE =
  "iPadGross คืออุปกรณ์ควบคุมระบบห้อง 703 เท่านั้น ไม่ใช่ iPad ส่วนตัวของผู้ใช้";

const room703ViewCamera: Workflow = {
  id: "room703-view-camera",
  slug: "view-camera",
  title: "📹 ดูภาพจากกล้อง",
  shortDescription: "ใช้กล้องเคนของห้อง Gross Anatomy Lab",
  icon: "Camera",
  methodChoice: {
    question: "ต้องการให้ภาพแสดงแบบไหน?",
    options: [
      {
        id: "combined",
        label: "รวมห้อง",
        description: "ใช้ภาพเดียวกันทั้งห้อง Gross และห้อง Briefing",
        beforeSteps: room703PowerPrepSteps(),
        osChoice: {
          question: "ต้องการใช้ภาพจากไหน?",
          options: [
            {
              id: "camera",
              label: "กล้องเคน",
              steps: [
                {
                  id: "room703-view-combined-camera",
                  order: 1,
                  title: "เลือกกล้องเคนบน iPadGross",
                  instruction:
                    "บน iPadGross เข้าสู่หน้า Room Mode เลือก รวมห้อง แล้วเลือก Source: กล้องเคน",
                  expectedResult: "ภาพจากกล้องเคนปรากฏบนจอทั้งห้อง Gross และห้อง Briefing",
                  image: { status: "pending" },
                },
              ],
            },
            {
              id: "briefing",
              label: "ภาพจากห้อง Briefing",
              steps: [
                {
                  id: "room703-view-combined-briefing",
                  order: 1,
                  title: "เลือกภาพจากห้อง Briefing บน iPadGross",
                  instruction:
                    "บน iPadGross เข้าสู่หน้า Room Mode เลือก รวมห้อง แล้วเลือก Source: Lecture (ภาพจากห้อง Briefing)",
                  expectedResult: "ภาพจากห้อง Briefing ปรากฏบนจอทั้งสองห้อง",
                  image: { status: "pending" },
                },
              ],
            },
          ],
        },
        steps: [],
      },
      {
        id: "separated",
        label: "แยกห้อง",
        description: "ห้อง Gross และห้อง Briefing ใช้งานคนละภาพได้",
        beforeSteps: room703PowerPrepSteps(),
        steps: [
          {
            id: "room703-view-separated-1",
            order: 1,
            title: "เลือกแยกห้องบน iPadGross",
            instruction: "บน iPadGross เข้าสู่หน้า Room Mode แล้วเลือก แยกห้อง",
            expectedResult: "ห้อง Gross แสดงกล้องเคน และห้อง Briefing แสดง Lecture แยกกัน",
            image: { status: "pending" },
          },
          room703GrossNoSignalWarningStep("room703-view-separated-2", 2),
        ],
      },
    ],
  },
  steps: [],
  troubleshootingIds: ["no-signal-on-display", "device-not-responding"],
  commonMistake: ROOM703_COMMON_MISTAKE,
};

const room703ConnectLaptop: Workflow = {
  id: "room703-connect-laptop",
  slug: "connect-laptop",
  title: "💻 ต่อโน้ตบุ๊ก",
  shortDescription: "ห้องนี้ไม่มีคอมพิวเตอร์ประจำห้อง — ใช้โน้ตบุ๊กส่วนตัวผ่าน HDMI",
  icon: "Cable",
  criticalWarning: {
    level: "info",
    title: "ℹ️ ห้องนี้ไม่มีคอมพิวเตอร์ประจำห้อง",
    message: "กรุณาใช้โน้ตบุ๊กส่วนตัว",
  },
  methodChoice: {
    question: "ต้องการให้ภาพขึ้นที่ไหน?",
    options: [
      {
        id: "briefing-only",
        label: "เฉพาะห้อง Briefing",
        description: "ห้อง Gross ยังคงแสดงภาพจากกล้องเคนตามปกติ",
        beforeSteps: room703PowerPrepSteps(),
        steps: [
          {
            id: "room703-laptop-briefing-1",
            order: 1,
            title: "เลือกแยกห้องบน iPadGross",
            instruction: "บน iPadGross เข้าสู่หน้า Room Mode แล้วเลือก แยกห้อง",
            image: { status: "pending" },
          },
          {
            id: "room703-laptop-briefing-2",
            order: 2,
            title: "เสียบสาย HDMI",
            instruction: "เสียบสาย HDMI จากกล่องควบคุมเข้ากับโน้ตบุ๊ก (Laptop)",
            image: { status: "pending" },
          },
          {
            id: "room703-laptop-briefing-3",
            order: 3,
            title: "เลือก Lecture บน iPadGross",
            instruction: "บน iPadGross เลือก Source: Lecture (ภาพจากห้อง Briefing) แล้วเลือก Input: HDMI",
            expectedResult: "ภาพจากโน้ตบุ๊กปรากฏบนจอห้อง Briefing",
            image: { status: "pending" },
          },
          room703GrossNoSignalWarningStep("room703-laptop-briefing-4", 4),
        ],
      },
      {
        id: "both",
        label: "ทั้งสองห้อง",
        description: "ภาพจากโน้ตบุ๊กขึ้นจอทั้งห้อง Gross และห้อง Briefing",
        beforeSteps: room703PowerPrepSteps(),
        steps: [
          {
            id: "room703-laptop-both-1",
            order: 1,
            title: "เลือกรวมห้องบน iPadGross",
            instruction: "บน iPadGross เข้าสู่หน้า Room Mode แล้วเลือก รวมห้อง",
            image: { status: "pending" },
          },
          {
            id: "room703-laptop-both-2",
            order: 2,
            title: "เลือกภาพจากห้อง Briefing",
            instruction: "เลือก Source: Lecture (ภาพจากห้อง Briefing)",
            image: { status: "pending" },
          },
          {
            id: "room703-laptop-both-3",
            order: 3,
            title: "เสียบสาย HDMI",
            instruction: "เสียบสาย HDMI จากกล่องควบคุมเข้ากับโน้ตบุ๊ก (Laptop)",
            image: { status: "pending" },
          },
          {
            id: "room703-laptop-both-4",
            order: 4,
            title: "เลือก Input HDMI บน iPadGross",
            instruction: "เลือก Input: HDMI",
            expectedResult: "ภาพจากโน้ตบุ๊กปรากฏบนจอทั้งห้อง Gross และห้อง Briefing",
            image: { status: "pending" },
          },
        ],
      },
    ],
  },
  steps: [],
  troubleshootingIds: ["no-signal-on-display", "device-not-responding"],
  commonMistake: ROOM703_COMMON_MISTAKE,
};

const room703ShareScreen: Workflow = {
  id: "room703-share-screen",
  slug: "share-screen",
  title: "📡 แชร์หน้าจอ",
  shortDescription: "แชร์หน้าจอไร้สายผ่าน Wireless Dongle",
  icon: "Wifi",
  methodChoice: {
    question: "ต้องการให้ภาพขึ้นที่ไหน?",
    options: [
      {
        id: "briefing-only",
        label: "เฉพาะห้อง Briefing",
        description: "ห้อง Gross ยังคงแสดงภาพจากกล้องเคนตามปกติ",
        beforeSteps: room703PowerPrepSteps(),
        steps: [
          {
            id: "room703-share-briefing-1",
            order: 1,
            title: "เลือกแยกห้องบน iPadGross",
            instruction: "บน iPadGross เข้าสู่หน้า Room Mode แล้วเลือก แยกห้อง",
            image: { status: "pending" },
          },
          {
            id: "room703-share-briefing-2",
            order: 2,
            title: "หยิบ Wireless Dongle",
            instruction: "หยิบ Wireless Dongle",
            image: { status: "pending" },
          },
          {
            id: "room703-share-briefing-3",
            order: 3,
            title: "เสียบ Dongle",
            instruction: "เสียบ Dongle เข้ากับอุปกรณ์ของคุณ (USB หรือ USB-C / Type-C ตามพอร์ตที่มี)",
            image: { status: "pending" },
          },
          {
            id: "room703-share-briefing-4",
            order: 4,
            title: "กด Share",
            instruction: "รอไฟสถานะบน Dongle พร้อมใช้งาน แล้วกดปุ่มบน Wireless Dongle 1 ครั้ง",
            image: { status: "pending" },
          },
          {
            id: "room703-share-briefing-5",
            order: 5,
            title: "เลือก Lecture บน iPadGross",
            instruction: "บน iPadGross เลือก Source: Lecture (ภาพจากห้อง Briefing) แล้วเลือก Input: Wireless",
            expectedResult: "ภาพจากอุปกรณ์ของคุณปรากฏบนจอห้อง Briefing",
            image: { status: "pending" },
          },
          room703GrossNoSignalWarningStep("room703-share-briefing-6", 6),
        ],
      },
      {
        id: "both",
        label: "ทั้งสองห้อง",
        description: "ภาพที่แชร์ขึ้นจอทั้งห้อง Gross และห้อง Briefing",
        beforeSteps: room703PowerPrepSteps(),
        steps: [
          {
            id: "room703-share-both-1",
            order: 1,
            title: "เลือกรวมห้องบน iPadGross",
            instruction: "บน iPadGross เข้าสู่หน้า Room Mode แล้วเลือก รวมห้อง",
            image: { status: "pending" },
          },
          {
            id: "room703-share-both-2",
            order: 2,
            title: "เลือกภาพจากห้อง Briefing",
            instruction: "เลือก Source: Lecture (ภาพจากห้อง Briefing)",
            image: { status: "pending" },
          },
          {
            id: "room703-share-both-3",
            order: 3,
            title: "หยิบ Wireless Dongle",
            instruction: "หยิบ Wireless Dongle",
            image: { status: "pending" },
          },
          {
            id: "room703-share-both-4",
            order: 4,
            title: "เสียบ Dongle",
            instruction: "เสียบ Dongle เข้ากับอุปกรณ์ของคุณ (USB หรือ USB-C / Type-C ตามพอร์ตที่มี)",
            image: { status: "pending" },
          },
          {
            id: "room703-share-both-5",
            order: 5,
            title: "กด Share",
            instruction: "รอไฟสถานะบน Dongle พร้อมใช้งาน แล้วกดปุ่มบน Wireless Dongle 1 ครั้ง",
            image: { status: "pending" },
          },
          {
            id: "room703-share-both-6",
            order: 6,
            title: "เลือก Input Wireless บน iPadGross",
            instruction: "เลือก Input: Wireless",
            expectedResult: "ภาพจากอุปกรณ์ของคุณปรากฏบนจอทั้งห้อง Gross และห้อง Briefing",
            image: { status: "pending" },
          },
        ],
      },
    ],
  },
  steps: [],
  troubleshootingIds: ["wireless-device-not-found", "device-not-responding"],
  commonMistake: ROOM703_COMMON_MISTAKE,
};

// ---------------------------------------------------------------------------
// Aggregate export
// ---------------------------------------------------------------------------

export const WORKFLOWS: Workflow[] = [
  jongrakRoomPcPresentation,
  jongrakWebexRecording,
  jongrakWebexPersonalShare,
  jongrakPersonalScreenShare,
  floor6MeetingUseHdmi,
  smallClassroomUseRoomPc,
  smallClassroomWirelessShare,
  smartClassroomUseRoomPc,
  smartClassroomUseNotebookHdmi,
  smartClassroomWirelessShare,
  room703ViewCamera,
  room703ConnectLaptop,
  room703ShareScreen,
];
