"use client";

import Image from "next/image";

import { ImageCaption } from "@/components/visual/image-caption";
import type { GuideImageAnnotation } from "@/lib/types";

/**
 * Renders shape overlays in one shared SVG using a 0–100 percentage
 * coordinate system (Phase 4 §11 RESPONSIVE ANNOTATION: never pixel
 * positions, which drift when the image resizes). `vector-effect:
 * non-scaling-stroke` keeps line weight consistent regardless of the
 * viewBox stretch. Text is rendered as separate HTML so Thai glyphs
 * never get stretched by the non-square viewBox.
 */
function AnnotationOverlay({
  annotations,
}: {
  annotations: GuideImageAnnotation[];
}) {
  return (
    <>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      >
        {annotations.map((a, i) => {
          if (a.type === "circle") {
            return (
              <circle
                key={i}
                cx={a.x}
                cy={a.y}
                r={a.radius ?? 6}
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
              />
            );
          }
          if (a.type === "box") {
            return (
              <rect
                key={i}
                x={a.x}
                y={a.y}
                width={a.width}
                height={a.height}
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                rx={2}
                vectorEffect="non-scaling-stroke"
              />
            );
          }
          if (a.type === "arrow") {
            return (
              <g key={i}>
                <defs>
                  <marker
                    id={`arrowhead-${i}`}
                    markerWidth={6}
                    markerHeight={6}
                    refX={5}
                    refY={3}
                    orient="auto"
                  >
                    <path d="M0,0 L6,3 L0,6 Z" fill="hsl(var(--accent))" />
                  </marker>
                </defs>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={a.toX}
                  y2={a.toY}
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  vectorEffect="non-scaling-stroke"
                  markerEnd={`url(#arrowhead-${i})`}
                />
              </g>
            );
          }
          return null;
        })}
      </svg>

      {annotations.map((a, i) => {
        const text = a.text;
        if (!text) return null;
        const anchorX = a.type === "arrow" ? a.toX : a.x;
        const anchorY = a.type === "arrow" ? a.toY : a.y;
        return (
          <span
            key={i}
            style={{ left: `${anchorX}%`, top: `${anchorY}%` }}
            className="absolute -translate-x-1/2 translate-y-2 whitespace-nowrap rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground shadow-sm"
          >
            {text}
          </span>
        );
      })}
    </>
  );
}

export function AnnotatedImage({
  src,
  alt,
  caption,
  annotations,
  onOpen,
}: {
  src: string;
  alt: string;
  caption?: string;
  annotations?: GuideImageAnnotation[];
  /** Opens the lightbox — omitted when this render is already inside one. */
  onOpen?: () => void;
}) {
  const content = (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, 640px"
        className="object-cover"
      />
      {annotations && annotations.length > 0 && (
        <AnnotationOverlay annotations={annotations} />
      )}
      <ImageCaption caption={caption} />
    </>
  );

  const className =
    "relative block aspect-video w-full overflow-hidden rounded-xl border border-border bg-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  if (onOpen) {
    return (
      <button
        type="button"
        onClick={onOpen}
        aria-label={`ดูภาพขยาย: ${alt}`}
        className={className}
      >
        {content}
      </button>
    );
  }

  return <div className={className}>{content}</div>;
}
