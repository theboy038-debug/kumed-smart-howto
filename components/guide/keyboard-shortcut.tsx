export function KeyboardShortcut({ keys }: { keys?: string[] }) {
  if (!keys || keys.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5">
      {keys.map((key, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <kbd className="rounded-md border border-border bg-surface-elevated px-2 py-1 text-xs font-medium shadow-sm">
            {key}
          </kbd>
          {i < keys.length - 1 && (
            <span className="text-xs text-muted">+</span>
          )}
        </span>
      ))}
    </div>
  );
}
