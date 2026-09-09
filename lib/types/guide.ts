/**
 * guide.ts
 *
 * Visual/status primitives shared by workflow steps (Bible §8.1, §10, §27,
 * Phase 4 §5 IMAGE DATA MODEL, §10 ANNOTATED IMAGE).
 */

/**
 * A single overlay marker on a real photo (Phase 4 §10, §11). Positions
 * are normalized percentages of the image's rendered box (0–100), so an
 * annotation stays correctly placed at any viewport size — never raw
 * pixel coordinates, which would drift when the image resizes.
 *
 * Annotations are pure data and are drawn as an SVG overlay at render
 * time (Phase 4 §10: "must not be permanently drawn onto the real
 * image"); moving one is a data edit, never a re-export of a photo.
 */
export type GuideImageAnnotation =
  | { type: "label"; x: number; y: number; text: string }
  | { type: "circle"; x: number; y: number; radius?: number; text?: string }
  | { type: "box"; x: number; y: number; width: number; height: number; text?: string }
  | {
      type: "arrow";
      /** Tail of the arrow. */
      x: number;
      y: number;
      /** Head of the arrow — where it points. */
      toX: number;
      toY: number;
      text?: string;
    };

/**
 * An image reference that gracefully supports the "real image not captured
 * yet" state (Bible §10 REAL IMAGE FIRST ARCHITECTURE, §32 IMAGE-OPTIONAL
 * ARCHITECTURE; Phase 4 §4 IMAGE-FIRST PRINCIPLE). A missing image must
 * never break the build or the page — `status: "pending"` renders a
 * polished placeholder instead.
 */
export type GuideImage =
  | {
      status: "ready";
      src: string;
      alt: string;
      caption?: string;
      annotations?: GuideImageAnnotation[];
    }
  | {
      status: "pending";
      /** What a future photo of this step should show, to guide capture. */
      captureGuide?: { title: string; instruction: string };
    };

/**
 * Reusable status badges (Bible §27, §53). Keep this list to what's
 * actually used — badges must never be the only way a state is conveyed
 * (icon + text + color, never color alone).
 */
export type StatusTagKind =
  | "do-not-change"
  | "wifi-required"
  | "hdmi-required"
  | "pin-required"
  | "personal-device-required"
  | "check-before-start"
  | "image-guide"
  | "it-only"
  | "default";

export interface StatusTag {
  kind: StatusTagKind;
  /** Optional override; falls back to STATUS_TAG_LABELS[kind] in lib/config/ui.ts. */
  label?: string;
}
