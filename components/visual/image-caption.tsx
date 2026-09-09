export function ImageCaption({ caption }: { caption?: string }) {
  if (!caption) return null;

  return (
    <p className="absolute inset-x-0 bottom-0 bg-background/80 px-3 py-1.5 text-xs backdrop-blur-sm">
      {caption}
    </p>
  );
}
