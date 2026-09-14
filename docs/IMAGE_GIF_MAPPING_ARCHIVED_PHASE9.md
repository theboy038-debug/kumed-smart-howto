# Image & GIF Mapping (Phase 9.1)

Internal reference for whoever shoots photos/GIFs (using iMaplay or
anything else) — not shown to end users. Companion to
`docs/PHOTO_CHECKLIST.md` (Phase 4), which covers general shooting
guidance; this file is the exact step-by-step map of what to shoot and
where each file goes.

**Nothing in this file has been fabricated.** Every filename below is a
*proposed* target path — none of these files exist yet. Every step in
every workflow was checked directly in `lib/data/workflows.ts`.

## 0. Existing image inventory

```
find public -type f
```
returns only `.gitkeep` placeholders — **zero real image/GIF files exist
in the project right now.** Every reference below is therefore
`NEED USER IMAGE` or `NEED USER GIF`. There is nothing to classify as
`EXISTS + USED`, `EXISTS + UNUSED`, or `DUPLICATE` yet.

The existing folder structure (from Phase 4) already anticipates sharing:
`public/images/floor-6/classrooms/` is one shared folder for 601–608
(not eight separate ones), and `public/images/floor-7/smart-classroom/`
is one shared folder for 701/702. This mapping follows that same
assumption — **if 601–608's control boxes or 701/702's Touchscreens
actually look different from each other, tell me and I'll split the
image references per room instead of sharing them.**

## 1. GIF rendering — now implemented

`components/visual/annotated-image.tsx` now detects a `.gif` extension
and renders it via a plain `<img>` tag instead of `next/image` (which
would otherwise re-encode it and freeze the animation on its first
frame). Everything else — the aspect-ratio box, annotation overlay,
caption, lightbox, alt text — is identical between the two paths. No
other component changed. To use a GIF, just point `src` at a `.gif`
file exactly like you would a `.webp`/`.jpg` — the correct render path
is chosen automatically.

## 2. Shared files (used in more than one place)

Create these once, reference them from many steps:

| Filename | Shows | Used by |
|---|---|---|
| `public/images/shared/windows-audio-output.webp` | Windows sound-output picker opened via Ctrl+Win+V | Every "ตรวจสอบเสียง" (Ctrl+Win+V) step — Floor 5 Room PC/Webex/Dongle, Floor 6 Room PC/Wireless, Floor 7 HDMI/Wireless |
| `public/images/shared/win-k-screen-share.gif` | Pressing Win+K, device list appearing | Floor 5 Wi-Fi (Windows), Floor 6 Wireless (Windows), Floor 7 Wireless (Windows) |
| `public/images/shared/mac-screen-mirroring.gif` | Control Center → Screen Mirroring on Mac/iPad | Floor 5 Wi-Fi (Mac), Floor 6 Wireless (Mac), Floor 7 Wireless (Mac) |

## 3. Floor 5 — Jongrak (`public/images/floor-5/jongrak/`)

| # | Workflow → Step | Type | Filename | Notes |
|---|---|---|---|---|
| 1 | Room PC / Webex — "ตรวจกล่องควบคุม" + "ตรวจช่องเสียง" (both reference the same physical box) | IMAGE | `01-control-box.webp` | One photo, Input-1 and Audio-1 positions both visible or close enough to reuse |
| 2 | Room PC Presentation — "เปิดคอมพิวเตอร์ประจำห้อง" | STATIC IMAGE | `02-room-pc-power.webp` | |
| 3 | Webex — "เปิดโปรแกรม Webex" | STATIC IMAGE | `03-webex-open.webp` | |
| 4 | Webex — "ทดสอบเสียงใน Webex (Speaker)" + "ทดสอบไมโครโฟน" | GIF RECOMMENDED | `04-webex-audio-settings.gif` | Navigating Settings → Audio → Speaker → Test, then Microphone → Test — one GIF can cover both steps |
| 5 | Webex — "เริ่มบันทึกวิดีโอ" | STATIC IMAGE | `05-webex-record-button.webp` | |
| 6 | Webex — "แชร์สไลด์หรือหน้าจอ" | STATIC IMAGE | `06-webex-share-button.webp` | |
| 7 | Personal Share — Dongle: "เสียบ Wireless Dongle" | GIF RECOMMENDED | `07-plug-dongle.gif` | |
| 8 | Personal Share — Dongle: "ติดตั้ง Driver (ครั้งแรกเท่านั้น)" | GIF RECOMMENDED | `08-dongle-driver-install.gif` | The Windows installer window appearing and being run |
| 9 | Personal Share — Dongle: "รอให้พร้อมใช้งาน" | STATIC IMAGE | `09-dongle-led-ready.webp` | The dongle's ready-state LED |
| 10 | Personal Share — Dongle: "กดปุ่ม Share" | GIF RECOMMENDED | `10-dongle-press-share.gif` | |

**No image needed** (generic waiting/checking/software steps with nothing
room-specific to see): "รอภาพขึ้นจอ", "เปิดเนื้อหาที่ต้องการนำเสนอ",
"เริ่มนำเสนอ", "ตรวจสอบภาพ" (all instances), the Dongle-vs-Wi-Fi method
picker itself, the Wi-Fi connect steps, and all 5 steps of the new
"แชร์หน้าจอจากโน้ตบุ๊กระหว่างประชุม Webex" workflow (it's all generic
Webex-on-a-personal-laptop UI, not KUMED-specific hardware).

## 4. Floor 6 — Classrooms 601–608 (`public/images/floor-6/classrooms/`, shared)

| # | Step | Type | Filename |
|---|---|---|---|
| 1 | "ตรวจสอบระบบห้อง" (open the Rack) | GIF RECOMMENDED | `01-open-rack.gif` |
| 1b | (still image version of the same) | IMAGE | `01-rack-switch.webp` |
| 2 | Room PC: "ตรวจกล่องควบคุม" (Input 1) | GIF RECOMMENDED | `02-select-input1.gif` |
| 2b | | IMAGE | `02-control-box-input1.webp` |
| 3 | Room PC: "เปิดคอมพิวเตอร์ประจำห้อง" | STATIC IMAGE | `03-room-pc-power.webp` |
| 4 | Wireless: "ตรวจกล่องควบคุม" (Input 2) | GIF RECOMMENDED | `04-select-input2.gif` |
| 4b | | IMAGE | `04-control-box-input2.webp` |

Audio-output check on both workflows uses the shared
`shared/windows-audio-output.webp`; Win+K/Screen-Mirroring use the two
shared GIFs from section 2. No image needed for "ใช้คอมพิวเตอร์นำเสนอ",
Wi-Fi connect steps, or "ตรวจสอบภาพ".

## 5. Floor 7 — Smart Classrooms 701/702 (`public/images/floor-7/smart-classroom/`, shared unless the two rooms differ)

| # | Step | Type | Filename |
|---|---|---|---|
| 1 | Room PC: "เปิดคอมพิวเตอร์ประจำห้อง" | STATIC IMAGE | `01-room-pc-power.webp` |
| 2 | Room PC: tap **"PC"** on Smart Touchscreen | GIF RECOMMENDED | `02-touchscreen-tap-pc.gif` |
| 3 | HDMI: "เสียบสาย HDMI" | GIF RECOMMENDED | `03-plug-hdmi.gif` |
| 3b | | IMAGE | `03-hdmi-port.webp` |
| 4 | HDMI: tap **"Laptop"** on Smart Touchscreen | GIF RECOMMENDED | `04-touchscreen-tap-laptop.gif` |
| 5 | Wireless: tap **"Wireless"** on Smart Touchscreen | GIF RECOMMENDED | `05-touchscreen-tap-wireless.gif` |
| 6 | Wireless: "กรอก PIN Code" | STATIC IMAGE | `06-pin-code-screen.webp` |

Audio check (HDMI/Wireless only — **never Room PC**, per Phase 8/9 lock)
uses the shared `shared/windows-audio-output.webp`. No image needed for
"รอระบบตรวจพบสัญญาณ" or "ตรวจสอบภาพ".

**If 701 and 702's Touchscreens are visually identical**, all of the
above are shared between both rooms — confirm or tell me to split them.

## 6. Room 703 (`public/images/floor-7/room-703/...` — subfolders already exist)

Room 703 business logic is untouched; this section only maps the
*restructured* 3-task flow from Phase 9 to visuals. Nothing here
implies any change to `room703.ts` or the underlying system data.

### Shared across all 3 tasks (`power/`, `ipad-gross/`)

| # | Step | Type | Filename |
|---|---|---|---|
| 1 | "ตรวจสอบว่าระบบเปิดอยู่" (Power Control + Rack) | GIF RECOMMENDED | `power/01-open-power-rack.gif` |
| 1b | | IMAGE | `power/01-power-control-rack.webp` |
| 2 | "ตรวจสอบ iPadGross" (Source Selection screen) | IMAGE | `ipad-gross/02-source-selection-screen.webp` |

### ดูภาพจากกล้อง (view-camera)

| # | Step | Type | Filename |
|---|---|---|---|
| 3 | รวมห้อง → เลือกกล้องเคน | GIF RECOMMENDED | `ipad-gross/03-select-combined-camera.gif` |
| 4 | รวมห้อง → เลือกภาพจากห้อง Briefing | IMAGE | `ipad-gross/04-combined-briefing.webp` |
| 5 | แยกห้อง (mode select) | GIF RECOMMENDED | `ipad-gross/05-select-separated.gif` |
| 6 | "ตรวจสอบภาพฝั่ง Gross" (No Signal tip) | STATIC IMAGE — *optional, low priority* | `gross/06-no-signal-example.webp` |

### ต่อโน้ตบุ๊ก (connect-laptop) / แชร์หน้าจอ (share-screen)

| # | Step | Type | Filename |
|---|---|---|---|
| 7 | "เสียบสาย HDMI" (Briefing Input Box) | GIF RECOMMENDED | `input-box/07-plug-hdmi.gif` |
| 7b | | IMAGE | `input-box/07-hdmi-port.webp` |
| 8 | "เลือก Lecture บน iPadGross" (HDMI variant) | IMAGE | `ipad-gross/08-lecture-hdmi-select.webp` |
| 9 | รวมห้อง (mode select, laptop/share context) | IMAGE | `ipad-gross/09-combined-mode-select.webp` — *may be reusable with #3/#4's screen if it's the same menu, confirm once you have the real screenshots* |
| 10 | "หยิบ Wireless Dongle" / "เสียบ Dongle" | GIF RECOMMENDED | `wireless/10-plug-dongle.gif` |
| 11 | "กด Share" (Dongle) | GIF RECOMMENDED | `wireless/11-press-share.gif` |
| 12 | "เลือก Lecture บน iPadGross" (Wireless variant) | IMAGE | `ipad-gross/12-lecture-wireless-select.webp` |

**Room 703's Wireless Dongle may or may not be the same physical unit as
Floor 5's** — I did not assume they're the same device, so items 10/11
are listed as Room-703-specific rather than shared with Floor 5's
`07-plug-dongle.gif`/`10-dongle-press-share.gif`. If they're actually
the identical dongle model, tell me and I'll merge them into one shared
file to save you a duplicate shoot.

## 7. Your production checklist

### NEED USER GIF
```
[ ] Floor 5 — 04-webex-audio-settings.gif
[ ] Floor 5 — 07-plug-dongle.gif
[ ] Floor 5 — 08-dongle-driver-install.gif
[ ] Floor 5 — 10-dongle-press-share.gif
[ ] Shared    — win-k-screen-share.gif
[ ] Shared    — mac-screen-mirroring.gif
[ ] Floor 6 — 01-open-rack.gif
[ ] Floor 6 — 02-select-input1.gif
[ ] Floor 6 — 04-select-input2.gif
[ ] Floor 7 — 02-touchscreen-tap-pc.gif
[ ] Floor 7 — 03-plug-hdmi.gif
[ ] Floor 7 — 04-touchscreen-tap-laptop.gif
[ ] Floor 7 — 05-touchscreen-tap-wireless.gif
[ ] Room 703 — power/01-open-power-rack.gif
[ ] Room 703 — ipad-gross/03-select-combined-camera.gif
[ ] Room 703 — ipad-gross/05-select-separated.gif
[ ] Room 703 — input-box/07-plug-hdmi.gif
[ ] Room 703 — wireless/10-plug-dongle.gif
[ ] Room 703 — wireless/11-press-share.gif
```

### NEED USER IMAGE
```
[ ] Shared    — windows-audio-output.webp
[ ] Floor 5 — 01-control-box.webp, 02-room-pc-power.webp, 03-webex-open.webp,
              05-webex-record-button.webp, 06-webex-share-button.webp,
              09-dongle-led-ready.webp
[ ] Floor 6 — 01-rack-switch.webp, 02-control-box-input1.webp,
              03-room-pc-power.webp, 04-control-box-input2.webp
[ ] Floor 7 — 01-room-pc-power.webp, 03-hdmi-port.webp, 06-pin-code-screen.webp
[ ] Room 703 — power/01-power-control-rack.webp,
               ipad-gross/02-source-selection-screen.webp,
               ipad-gross/04-combined-briefing.webp,
               ipad-gross/08-lecture-hdmi-select.webp,
               ipad-gross/09-combined-mode-select.webp,
               ipad-gross/12-lecture-wireless-select.webp
[ ] Room 703 — gross/06-no-signal-example.webp (optional, lowest priority)
```

### Questions for you before I wire the data in
```
[ ] Do all 8 rooms (601–608) really share one control-box look, or does
    any room differ?
[ ] Are 701 and 702's Smart Touchscreens visually identical?
[ ] Is Room 703's Wireless Dongle the same physical unit as Jongrak's?
```

## 8. Once files exist

Drop each file at its path above, then in `lib/data/workflows.ts` change
the matching step's `image` from `{ status: "pending" }` to:
```ts
image: {
  status: "ready",
  src: "/images/floor-5/jongrak/01-control-box.webp", // or .gif — both work
  alt: "กล่องควบคุมของห้องประชุมจงรัก แสดงตำแหน่งช่อง 1",
}
```
No component changes needed — this is the same pattern documented in
`docs/PHOTO_CHECKLIST.md` since Phase 4, now confirmed to also work for
`.gif` files.
