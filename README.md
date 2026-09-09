# KUMED SMART HOW-TO

Visual self-service IT guide platform for the Faculty of Medicine, Kasetsart
University. Scan a QR code outside a room → pick what you want to do →
follow real, step-by-step instructions → get an expected result → if it
doesn't work, get safe troubleshooting → if still stuck, contact IT.

**Status: Phase 1 of 7 complete** — architecture, types, configuration, and
data are in place and type-check cleanly. UI components, the guided-workflow
engine, the visual/image system, and polish are Phases 2–6 (see
`lib/data/` docstrings and the Bible for the full plan).

## Tech stack

Next.js 14 (App Router) · TypeScript (strict) · Tailwind CSS · shadcn/ui ·
Framer Motion · lucide-react · next-themes · deployed on Vercel.

## Install & run

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build       # production build
```

## Project structure

```
app/                        Routes (App Router)
  floor/[floorSlug]/page.tsx           room list for a floor
  floor/[floorSlug]/[roomSlug]/page.tsx  a room's guide (QR deep-link target)
components/                 UI components, organized by domain
  ui/ layout/ navigation/ guide/ visual/ troubleshooting/ room/
lib/
  types/                     TypeScript data model (source of truth for shapes)
    common.ts                Fact<T> — the "don't invent real data" primitive
    facility.ts               Floor, Room, RoomTemplate
    workflow.ts                Workflow, GuideStep
    guide.ts                   GuideImage, StatusTag
    troubleshooting.ts         TroubleshootingIssue
    room703.ts                  Room 703's special Source/RoomMode model
    contact.ts                   ContactConfig
  config/                    Centralized, editable configuration
    facility.ts               App identity/branding
    support.ts                 Contact IT (see conflict note inside)
    ui.ts                       Shared copy (pending-state messages, status tag labels)
  data/                      The actual content — this is what you edit
    floors.ts rooms.ts workflows.ts troubleshooting.ts
  utils.ts                  Data lookup functions ("Guide Engine") + cn()
public/images/               Real photos, organized by floor/room
```

## Architecture

```
DATA (lib/data)  →  CONFIGURATION (lib/config)  →  GUIDE ENGINE (lib/utils.ts)
     →  REUSABLE COMPONENTS (components/)  →  ROUTES (app/)
```

Rooms and workflows are **data**, not page components. Floor 6's eight
classrooms and Floor 7's two smart classrooms are each generated from a
single factory function + a room-number list — there is intentionally no
`Classroom601Page`, `Classroom602Page`, etc.

Room 703 (Gross Anatomy Lab & Briefing Room) is modeled as its own
`GrossBriefingRoom` type with a `system: Room703System` field (sources,
room modes, lecture inputs, power startup checklist, wireless flow). The
app should always branch on `room.template === "gross-briefing"`, never on
`floor === "7" && room === "703"`.

## The "no invented data" pattern — `Fact<T>`

Real-world facility information (Wi-Fi SSID, display names, phone numbers,
PIN codes, hardware model names, ...) is modeled as:

```ts
type Fact<T> =
  | { status: "confirmed"; value: T }
  | { status: "pending"; draftValue?: T; note?: string };
```

Until IT/facility staff confirm a value, it stays `{ status: "pending" }`
and the UI shows a friendly generic message (see `PENDING_FACT_MESSAGE` in
`lib/config/ui.ts`) instead of `"CHANGE_ME"` or a guessed value.

## ⚠️ Needs a human decision before launch

`lib/config/support.ts` — the Master Build Bible gives a real phone number,
LINE URL, and helpdesk URL in §42, but §110 of the same document lists
those exact fields as still unconfirmed. They're currently wired up as
`draftValue`s (visible in source, never rendered by the UI) with
`status: "pending"`. Confirm with IT, then flip `status` to `"confirmed"`
in that one file.

## How to add a room

1. Add a room object to `lib/data/rooms.ts` (or extend a factory function
   for a templated room type) and add its slug to the right floor's
   `roomSlugs` in `lib/data/floors.ts`.
2. Pick an existing `RoomTemplate`, or add a new one to
   `lib/types/facility.ts` if the room's behavior is genuinely new.
3. Add its workflows to `lib/data/workflows.ts` and reference their IDs
   in `workflowIds`.
4. Drop real photos into `public/images/floor-<n>/`, reference them from
   the relevant `GuideStep.image`.
5. `npm run build`.
6. Generate a QR code pointing at `/floor/<floorSlug>/<roomSlug>`.

## How to add a workflow

Add a `Workflow` object to `lib/data/workflows.ts` with an intent-first
Thai title and ordered `GuideStep[]`, then reference its `id` from the
relevant room's `workflowIds`. No new page or component is needed.

## How to update Wi-Fi / display name / contact info

Edit the room's `configuration` in `lib/data/rooms.ts` (per-room) or
`lib/config/support.ts` (global IT contact). Nothing else needs to change.

## How pending images work

Any `GuideStep.image` left as `{ status: "pending" }` renders a polished
placeholder instead of a broken image — the app never crashes or looks
broken because a photo hasn't been captured yet.
