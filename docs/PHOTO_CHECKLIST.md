# Photo Capture Checklist (internal — for IT staff, not shown to users)

This is a working checklist for whoever captures real photos for the
guide. It is not part of the app; nothing here is user-facing copy.

## General checklist per step/device

- [ ] Overview shot of the equipment (ภาพรวมอุปกรณ์)
- [ ] Shot of where the equipment is physically located (ภาพตำแหน่งอุปกรณ์)
- [ ] Close-up of the relevant port(s) (ภาพ port)
- [ ] Close-up of the cable(s) involved (ภาพสาย)
- [ ] Screen/display state shot, if relevant (ภาพหน้าจอ)
- [ ] Close-up of the button(s) to press (ภาพปุ่ม)
- [ ] Power switch shot, if relevant (ภาพ power switch)
- [ ] "After" shot showing the expected result (ภาพผลลัพธ์)

## Naming convention

Descriptive, kebab-case, no camera-generated filenames.

✅ `tv-front.jpg`, `hdmi-port.jpg`, `input-box.jpg`, `wireless-dongle.jpg`,
`ipad-gross.jpg`, `camera-gross.jpg`, `rack-power.jpg`,
`power-switch-01.jpg`, `lecture-input.jpg`

❌ `IMG_001.jpg`, `DSC_4432.jpg`, `photo-final-final2.jpg`

## Folder map (`public/images/`)

```
shared/                        equipment identical across multiple rooms
                                (e.g. wireless-dongle.jpg, win-k.jpg,
                                screen-mirroring.jpg) — reference these
                                from workflow data instead of duplicating
                                the same photo per room.
floor-5/jongrak/                Jongrak main conference room
floor-6/meeting/                 Floor 6 meeting room
floor-6/classrooms/              601–608 — one shared set (same system)
floor-7/smart-classroom/          701/702 — one shared set (same system)
floor-7/room-703/
  gross/                          Gross Anatomy Lab side
  briefing/                       Briefing Room side
  ipad-gross/                     iPadGross controller screens
  power/                          Power Control / Rack / Power Strip
  input-box/                      Lecture Input Box (HDMI / Wireless)
  wireless/                        Wireless Dongle
floor-9/                          IT Support (informational only)
```

## When a real photo is ready

1. Drop the file into the matching folder above.
2. In `lib/data/workflows.ts` (or `troubleshooting.ts`), change the
   relevant step's image from:
   ```ts
   image: { status: "pending" }
   ```
   to:
   ```ts
   image: {
     status: "ready",
     src: "/images/floor-7/room-703/input-box/hdmi-port.jpg",
     alt: "ช่อง HDMI บน Input Box สำหรับต่อโน้ตบุ๊ก",
   }
   ```
3. Optionally add `caption` and/or `annotations` (see `lib/types/guide.ts`
   for the `arrow` / `circle` / `box` / `label` shapes — coordinates are
   percentages of the image, e.g. `{ type: "circle", x: 72, y: 31, radius: 8,
   text: "HDMI" }`).
4. No component or business logic needs to change.
