"use client";

import { useState } from "react";

import { ImagePlaceholder } from "@/components/visual/image-placeholder";
import { AnnotatedImage } from "@/components/visual/annotated-image";
import { ImageLightbox } from "@/components/visual/image-lightbox";
import type { GuideImage as GuideImageType } from "@/lib/types";

/**
 * The single place that branches on `image.status` (Phase 4 §9 GUIDE
 * IMAGE COMPONENT: "อย่าให้ทุก GuideStep ต้องเขียน logic ตรวจ image เอง").
 * Every call site just does `<GuideImage image={step.image} />` and gets
 * the right thing — placeholder, or a real photo with tap-to-enlarge.
 */
export function GuideImage({ image }: { image?: GuideImageType }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!image || image.status === "pending") {
    return (
      <ImagePlaceholder
        title={image?.captureGuide?.title}
        instruction={image?.captureGuide?.instruction}
      />
    );
  }

  return (
    <>
      <AnnotatedImage
        src={image.src}
        alt={image.alt}
        caption={image.caption}
        annotations={image.annotations}
        onOpen={() => setLightboxOpen(true)}
      />
      <ImageLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        src={image.src}
        alt={image.alt}
        caption={image.caption}
        annotations={image.annotations}
      />
    </>
  );
}
