# Image & GIF Mapping — Media Strategy v3 (Finalized with confirmed equipment data)

Supersedes v1/v2 (v1 archived at `docs/IMAGE_GIF_MAPPING_ARCHIVED_PHASE9.md`).
Every step below was re-checked directly against `lib/data/workflows.ts`.

**Environment disclosure:** no GitHub/git access from this workspace (no
`.git` directory exists here). This document is derived entirely from
source code plus the equipment facts you confirmed below.

## Confirmed real-world equipment facts (no longer open questions)

| # | Confirmed fact |
|---|---|
| Q1 | Floor 6 (601–608): PCs are **not** the same model in every room. But per your own rule — **task-based, not device-model-based** media — a representative photo of "how to power it on" is shared across all 8 rooms as long as the *action* is the same. Only a genuinely different Control Box layout/button position would force a per-room split, and no such difference has been reported. |
| Q2 | Floor 7 (701/702): **everything is identical** between the two rooms. All Floor 7 media is shared. Room-specific facts that must stay separate regardless (SSID: `smartclassroom1` vs `smartclassroom2`) are already handled at the data layer, not the media layer — unaffected by this. |
| Q3 | **Room 703's Wireless Dongle is a different, more expensive unit than Floor 5 Jongrak's.** Confirmed workflows differ: Floor 5 requires first-time driver installation; **Room 703 does not** — plug in, press Share, image appears. These two Dongles must never share media or instructional text. |

## Decision rules applied to every step

1. Can text alone explain it? → **NO MEDIA**.
2. Would one static photo (with an arrow/circle/box annotation) make it
   instantly clear what to press/look at? → **STATIC IMAGE**.
3. Only if neither above works — a real multi-window sequence, a screen
   changing over several seconds with no single representative frame —
   → **GIF**.

"Task-based sharing": if the user's *action* and what they need to see
is identical across rooms, one photo serves all of them regardless of
whether the underlying hardware model differs. Only split media where
the actual button/screen/position genuinely differs.

## Master mapping

| ID | Type | Floor/Room | Workflow | Step | Filename | Folder | Shared/Specific | Required? | Reason |
|---|---|---|---|---|---|---|---|---|---|
| IMG-01 | STATIC | 5 / Jongrak | Room PC / Webex | ตรวจกล่องควบคุม (Input 1) + ช่องเสียง (Audio 1) | `control-box-input1-audio1.webp` | `floor-5/jongrak/` | Specific to Jongrak | Yes | Two annotations, one photo |
| IMG-02 | STATIC | 5 / Jongrak | Room PC Presentation | เปิดคอมพิวเตอร์ประจำห้อง | `room-pc-power.webp` | `floor-5/jongrak/` | Specific to Jongrak | Yes | Button location |
| — | NO MEDIA | 5 / Jongrak | Room PC Presentation | รอภาพขึ้นจอ, เปิดเนื้อหา, เริ่มนำเสนอ | — | — | — | No | Self-explanatory |
| IMG-11 | STATIC | Shared | Every Windows audio-check | ตรวจสอบเสียง (Ctrl+Win+V) | `windows-audio-output.webp` | `shared/` | **Shared: Floor 5, 6, 7** | Yes | OS dialog, not room hardware |
| IMG-03 | STATIC | 5 / Jongrak | Webex | เปิดโปรแกรม Webex | `webex-open.webp` | `floor-5/jongrak/` | Specific | Yes | App icon |
| IMG-04 | STATIC | 5 / Jongrak | Webex | ทดสอบเสียงใน Webex (Speaker+Mic) | `webex-audio-settings.webp` | `floor-5/jongrak/` | Specific | Yes | One panel, all controls visible at once |
| IMG-05 | STATIC | 5 / Jongrak | Webex | เริ่มบันทึกวิดีโอ | `webex-record-button.webp` | `floor-5/jongrak/` | Specific | Yes | Button location |
| IMG-06 | STATIC | 5 / Jongrak | Webex | แชร์สไลด์หรือหน้าจอ | `webex-share-button.webp` | `floor-5/jongrak/` | Specific | Yes | Button location |
| — | NO MEDIA | 5 / Jongrak | Webex Personal Share (new) | all 5 steps | — | — | — | No | Generic personal-laptop Webex UI |
| — | NO MEDIA | 5 / Jongrak | Personal Share | method picker | — | — | — | No | UI choice, not physical action |
| IMG-07 | STATIC | 5 / Jongrak | Personal Share (Dongle + Wi-Fi) | ตรวจกล่องควบคุม (Input 2 + Audio 2) | `control-box-input2-audio2.webp` | `floor-5/jongrak/` | Specific — **used by both Dongle and Wi-Fi branches** | Yes | Same physical box/step, referenced twice |
| IMG-08 | STATIC | 5 / Jongrak | Personal Share → Dongle | เสียบ Wireless Dongle | `dongle-plug.webp` | `floor-5/jongrak/` | **Specific — NOT shared with Room 703 (Q3: different Dongle)** | Yes | Plugging in |
| **GIF-01** | **GIF** | 5 / Jongrak | Personal Share → Dongle | **ติดตั้ง Driver (ครั้งแรกเท่านั้น)** | `dongle-driver-install.gif` | `floor-5/jongrak/` | **Specific to Floor 5 — Room 703's Dongle needs NO driver step at all** | Yes | Only genuine GIF case: multi-dialog installer sequence |
| IMG-09 | STATIC | 5 / Jongrak | Personal Share → Dongle | รอให้พร้อมใช้งาน | `dongle-led-ready.webp` | `floor-5/jongrak/` | Specific | Yes | Ready-state LED |
| IMG-10 | STATIC | 5 / Jongrak | Personal Share → Dongle | กดปุ่ม Share | `dongle-press-share.webp` | `floor-5/jongrak/` | Specific | Yes | Single press |
| IMG-12 | STATIC | Shared | Every Win+K step | เชื่อมต่อจากโน้ตบุ๊ก (Windows) | `win-k-device-list.webp` | `shared/` | **Shared: Floor 5, 6, 7** | Yes | Device list, correct entry circled |
| IMG-13 | STATIC | Shared | Every Screen Mirroring step | เชื่อมต่อจาก Mac/iPad | `mac-screen-mirroring.webp` | `shared/` | **Shared: Floor 5, 6, 7** | Yes | Control Center menu, correct entry circled |
| IMG-14 | STATIC | 6 / 601–608 | Use Room PC, Wireless Share | ตรวจสอบระบบห้อง / เปิดตู้ Rack | `rack-location.webp` | `floor-6/classrooms/` | **Shared, task-based (Q1)** | Yes | Same action in every room |
| IMG-15 | STATIC | 6 / 601–608 | (same) | เปิดตู้ Rack — switch | `rack-power-switch.webp` | `floor-6/classrooms/` | **Shared, task-based (Q1)** | Yes | Same action |
| IMG-16 | STATIC | 6 / 601–608 | Use Room PC | ตรวจกล่องควบคุม (Input 1) | `control-box-input1.webp` | `floor-6/classrooms/` | **Shared, task-based (Q1)** | Yes | Assumed uniform control box; only the PC model varies, not this box |
| IMG-17 | STATIC | 6 / 601–608 | Use Room PC | เปิดคอมพิวเตอร์ประจำห้อง | `room-pc-power.webp` | `floor-6/classrooms/` | **Shared, task-based (Q1)** — representative "power on" photo, not a specific PC model | Yes | Confirmed: action identical regardless of PC brand/model |
| IMG-18 | STATIC | 6 / 601–608 | Wireless Share | ตรวจกล่องควบคุม (Input 2) | `control-box-input2.webp` | `floor-6/classrooms/` | **Shared, task-based (Q1)** | Yes | Same reasoning as IMG-16 |
| — | NO MEDIA | 6 / 601–608 | Use Room PC | ใช้คอมพิวเตอร์นำเสนอ | — | — | — | No | Generic |
| — | NO MEDIA | 6 / 601–608 | Wireless Share | เชื่อมต่อ Wi-Fi, ตรวจสอบภาพ | — | — | — | No | Generic OS list / result-check |
| IMG-19 | STATIC | 7 / 701+702 | Use Room PC | เปิดคอมพิวเตอร์ประจำห้อง | `room-pc-power.webp` | `floor-7/smart-classroom/` | **Shared (Q2: rooms identical)** | Yes | Confirmed identical |
| IMG-20 | STATIC | 7 / 701+702 | Use Room PC | Touchscreen → tap **"PC"** | `touchscreen-pc.webp` | `floor-7/smart-classroom/` | **Shared (Q2)** | Yes | Confirmed identical |
| — | NO MEDIA (LOCKED) | 7 / 701+702 | Use Room PC | (no audio-check step exists) | — | — | — | — | Known audio limitation; no troubleshooting UI permitted here (Phase 8/9 lock) |
| IMG-21 | STATIC | 7 / 701+702 | HDMI/Laptop | เสียบสาย HDMI | `hdmi-port.webp` | `floor-7/smart-classroom/` | **Shared (Q2)** | Yes | Confirmed identical |
| IMG-22 | STATIC | 7 / 701+702 | HDMI/Laptop | Touchscreen → tap **"Laptop"** | `touchscreen-laptop.webp` | `floor-7/smart-classroom/` | **Shared (Q2)** | Yes | Confirmed identical |
| IMG-23 | STATIC | 7 / 701+702 | Wireless | Touchscreen → tap **"Wireless"** | `touchscreen-wireless.webp` | `floor-7/smart-classroom/` | **Shared (Q2)** | Yes | Confirmed identical |
| IMG-24 | STATIC | 7 / 701+702 | Wireless | กรอก PIN Code | `pin-code-screen.webp` | `floor-7/smart-classroom/` | **Shared (Q2)** | Yes | Confirmed identical |
| IMG-25 | STATIC | 703 | All 3 tasks | ตรวจสอบว่าระบบเปิดอยู่ (Power Control + Rack) | `power/power-control-rack.webp` | `floor-7/room-703/` | Shared within Room 703's own branches only | Yes | Same prep for all 3 tasks |
| IMG-26 | STATIC | 703 | All 3 tasks | ตรวจสอบ iPadGross | `ipad-gross/home-screen.webp` | `floor-7/room-703/` | Shared within Room 703 | Yes | Same screen |
| IMG-27 | STATIC | 703 | View Camera | รวมห้อง → กล้องเคน | `ipad-gross/combined-camera.webp` | `floor-7/room-703/` | Not shared | Yes | Single tap |
| IMG-28 | STATIC | 703 | View Camera | รวมห้อง → ภาพจากห้อง Briefing | `ipad-gross/combined-briefing.webp` | `floor-7/room-703/` | Not shared | Yes | Single tap |
| IMG-29 | STATIC | 703 | View Camera | แยกห้อง | `ipad-gross/separated-mode.webp` | `floor-7/room-703/` | Not shared | Yes | Single tap |
| — | NO MEDIA | 703 | View Camera | ตรวจสอบภาพฝั่ง Gross (No-Signal tip) | — | — | — | No | One-line caution text |
| IMG-30 | STATIC | 703 | Connect Laptop, Share Screen | เสียบสาย HDMI (Briefing Input Box) | `input-box/hdmi-port.webp` | `floor-7/room-703/` | Shared between these 2 tasks | Yes | Same port, same action |
| IMG-31 | STATIC | 703 | Connect Laptop | เลือก Lecture + HDMI | `ipad-gross/lecture-hdmi.webp` | `floor-7/room-703/` | Not shared | Yes | Single tap |
| IMG-32 | STATIC | 703 | Share Screen | หยิบ/เสียบ Wireless Dongle | `wireless/dongle-plug.webp` | `floor-7/room-703/` | **Specific — CONFIRMED different unit from Floor 5's IMG-08 (Q3)** | Yes | Different physical Dongle model |
| IMG-33 | STATIC | 703 | Share Screen | กด Share | `wireless/press-share.webp` | `floor-7/room-703/` | Not shared | Yes | **No driver step accompanies this — confirmed not required for Room 703's Dongle** |
| IMG-34 | STATIC | 703 | Share Screen | เลือก Lecture + Wireless | `ipad-gross/lecture-wireless.webp` | `floor-7/room-703/` | Not shared | Yes | Single tap |

## Total media IDs vs. unique physical files

```
Total Media IDs:            35  (34 IMG + 1 GIF)
Total unique physical files: 35
```
**No discrepancy in this project** — every ID already maps to exactly
one distinct file at a distinct path. Sharing happens at the *usage*
level (one file referenced by multiple workflow steps — e.g. IMG-07 is
used by both the Dongle and Wi-Fi branches, IMG-11/12/13 are used across
three floors), not by two different IDs accidentally pointing at the
same content. There was no over-counting to correct.

```
GIF files:          1   (GIF-01)
Static image files: 34  (IMG-01 through IMG-34)
No-media steps:      7 groups (dozens of individual steps, see table)
Shared files:        9  (IMG-07, IMG-11, IMG-12, IMG-13, IMG-14, IMG-15,
                         IMG-16, IMG-17, IMG-18 — Floor 6 task-based —
                         plus IMG-19–24 — Floor 7 fully shared — plus
                         IMG-25, IMG-26, IMG-30 shared within Room 703)
Room/floor-specific: 25
```

## TOTAL UNIQUE FILES TO CREATE: 35

**GIF (1):**
- GIF-01 — `floor-5/jongrak/dongle-driver-install.gif`

**STATIC (34):**
- IMG-01 through IMG-10 — Floor 5 / Jongrak (10 files)
- IMG-11, IMG-12, IMG-13 — Shared across Floor 5/6/7 (3 files)
- IMG-14 through IMG-18 — Floor 6, shared across all 8 rooms (5 files)
- IMG-19 through IMG-24 — Floor 7, shared across 701+702 (6 files)
- IMG-25 through IMG-34 — Room 703 (10 files)

**NO MEDIA:** 7 step-groups need nothing (full list in the master table above).

## Floor 5 vs. Room 703 Dongle — kept explicitly separate

| | Floor 5 (Jongrak) | Room 703 |
|---|---|---|
| Dongle unit | Standard unit | Different, more expensive unit |
| Driver install required? | **Yes** — GIF-01 covers this | **No** — do not apply GIF-01 or its instructions here |
| Flow | Plug in → install driver (first time) → press Share → image appears | Plug in → press Share → image appears |
| Media | IMG-08, GIF-01, IMG-09, IMG-10 | IMG-32, IMG-33 only — no driver-related media at all |

## Size targets

- Static image: **100–300KB** target, review if over 500KB
- GIF: **1–5MB** target; 5–10MB acceptable with a reason; over 10MB needs
  review; over 20MB should not be used; the old 50–65MB pattern is
  unacceptable and must not recur

## Wiring instructions (once files exist)

```ts
image: {
  status: "ready",
  src: "/images/floor-5/jongrak/control-box-input1-audio1.webp",
  alt: "กล่องควบคุมของห้องประชุมจงรัก แสดงตำแหน่งช่อง 1 และช่องเสียง 1",
  annotations: [
    { type: "circle", x: 30, y: 45, radius: 6, text: "Input 1" },
    { type: "circle", x: 30, y: 60, radius: 6, text: "Audio 1" }
  ]
}
```
No component changes needed. The GIF works the same way — extension-based
routing to the GIF-safe render path is already in place.
