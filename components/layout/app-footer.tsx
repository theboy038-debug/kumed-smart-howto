import { APP_CONFIG } from "@/lib/config/facility";

export function AppFooter() {
  return (
    <footer className="mx-auto w-full max-w-xl px-5 py-8 text-center text-xs text-muted">
      <p>{APP_CONFIG.organization.name}</p>
      <p className="mt-1">
        {APP_CONFIG.shortName} · v{APP_CONFIG.version}
      </p>
    </footer>
  );
}
