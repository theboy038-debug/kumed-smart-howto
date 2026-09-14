# Media Creation Checklist

IDs match `docs/IMAGE_GIF_MAPPING.md` v3 exactly. All 3 confirmation
questions are now resolved (see below) — nothing here is pending your
input anymore except sending me the actual files.

## Confirmed facts (no longer questions)

```
Q1 [CONFIRMED]: Floor 6 PCs differ by room, but "how to power on" is
  the same action everywhere -> shared media (task-based, not model-based)
Q2 [CONFIRMED]: 701 and 702 are identical -> all Floor 7 media shared
Q3 [CONFIRMED]: Room 703's Wireless Dongle is a DIFFERENT, pricier unit
  than Floor 5's -> NEVER share media or instructions between them.
  Room 703's Dongle needs NO driver-install step at all.
```

## TOTAL UNIQUE FILES TO CREATE: 35 (1 GIF + 34 static images)

## A. GIF (1 file)

```
[ ] GIF-01 dongle-driver-install.gif
    Floor 5 -> Jongrak -> Personal Screen Share -> Wireless Dongle ->
    "ติดตั้ง Driver (ครั้งแรกเท่านั้น)"
    Record: plug the Dongle into a fresh Windows laptop, capture the
    installer window through clicking Install/Finish.
    Target: 4-6 sec, 720p, 1-3MB
    Save to: public/images/floor-5/jongrak/dongle-driver-install.gif
    NOTE: this GIF and its driver-install concept apply ONLY to Floor 5.
    Do not reuse or reference it for Room 703 (Q3 above).
```

## B. Static Images — Floor 5 / Jongrak (10 files)

```
[ ] IMG-01 control-box-input1-audio1.webp
[ ] IMG-02 room-pc-power.webp
[ ] IMG-03 webex-open.webp
[ ] IMG-04 webex-audio-settings.webp
[ ] IMG-05 webex-record-button.webp
[ ] IMG-06 webex-share-button.webp
[ ] IMG-07 control-box-input2-audio2.webp  (used by both Dongle and Wi-Fi branches)
[ ] IMG-08 dongle-plug.webp  (Floor 5's own Dongle - NOT the Room 703 one)
[ ] IMG-09 dongle-led-ready.webp
[ ] IMG-10 dongle-press-share.webp
```
Save to: `public/images/floor-5/jongrak/`

## C. Static Images — Shared across Floor 5, 6, 7 (3 files)

```
[ ] IMG-11 windows-audio-output.webp
[ ] IMG-12 win-k-device-list.webp
[ ] IMG-13 mac-screen-mirroring.webp
```
Save to: `public/images/shared/`

## D. Static Images — Floor 6, shared across all 8 rooms (5 files)

```
[ ] IMG-14 rack-location.webp
[ ] IMG-15 rack-power-switch.webp
[ ] IMG-16 control-box-input1.webp
[ ] IMG-17 room-pc-power.webp   (representative "power on" shot - doesn't need to match every PC model exactly)
[ ] IMG-18 control-box-input2.webp
```
Save to: `public/images/floor-6/classrooms/` — one set covers 601–608.

## E. Static Images — Floor 7, shared across 701 + 702 (6 files)

```
[ ] IMG-19 room-pc-power.webp
[ ] IMG-20 touchscreen-pc.webp
[ ] IMG-21 hdmi-port.webp
[ ] IMG-22 touchscreen-laptop.webp
[ ] IMG-23 touchscreen-wireless.webp
[ ] IMG-24 pin-code-screen.webp
```
Save to: `public/images/floor-7/smart-classroom/` — one set covers both rooms (confirmed identical).

## F. Static Images — Room 703 (10 files)

```
[ ] IMG-25 power/power-control-rack.webp
[ ] IMG-26 ipad-gross/home-screen.webp
[ ] IMG-27 ipad-gross/combined-camera.webp
[ ] IMG-28 ipad-gross/combined-briefing.webp
[ ] IMG-29 ipad-gross/separated-mode.webp
[ ] IMG-30 input-box/hdmi-port.webp
[ ] IMG-31 ipad-gross/lecture-hdmi.webp
[ ] IMG-32 wireless/dongle-plug.webp   (Room 703's OWN Dongle - different unit from Floor 5's IMG-08)
[ ] IMG-33 wireless/press-share.webp   (no driver step needed - just plug and press)
[ ] IMG-34 ipad-gross/lecture-wireless.webp
```
Save to: `public/images/floor-7/room-703/...` (matching subfolder).

## G. No Media (nothing to create)

```
- Room PC Presentation: "รอภาพขึ้นจอ", "เปิดเนื้อหา", "เริ่มนำเสนอ"
- Every "ตรวจสอบภาพ" step across all floors
- All 5 steps of "แชร์หน้าจอจากโน้ตบุ๊กระหว่างประชุม Webex"
- Method/OS picker screens
- "เชื่อมต่อ Wi-Fi" steps before Win+K/Screen Mirroring
- Floor 7 Room PC (701/702): no audio-check step exists here, by design
- Room 703 "ตรวจสอบภาพฝั่ง Gross" (No-Signal tip - text only)
```

## Before any of this: independent task

```
[ ] Work through docs/GIT_HISTORY_CLEANUP.md in your own local repo
    (completely separate from media creation - I have no GitHub access)
```

## Once you have files ready

Send whichever are done, any batch. I will:
1. Wire each `image: { status: "pending" }` to `status: "ready"` with the real path
2. Add sensible annotations where useful
3. Re-run TypeScript + build + route regression + Room 703 check
4. Never commit or push anything myself
