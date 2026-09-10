"use client";

import { useState } from "react";

import { Icon } from "@/components/ui/icon";
import { getContactForRoom } from "@/lib/utils";
import type { Room } from "@/lib/types";

/**
 * Phase 5 §10/§16, Phase 8 §14–§16 — only ever renders a channel whose
 * Fact is `"confirmed"` (via getContactForRoom). Each channel is a real,
 * tappable action card with its own label/description — not a raw URL
 * dumped in the page (§15: "ไม่ต้องแสดง URL ยาว ๆ ให้ผู้ใช้เห็น").
 *
 * Phase 8 §11 CONTEXT-AWARE CONTACT — when a room/problem context is
 * known, offers a one-tap "copy" of a short message the user can paste
 * into a call/LINE chat with IT. Purely client-side; no backend added.
 */
export function ContactItActions({
  room,
  contextLabel,
}: {
  room: Room;
  contextLabel?: string;
}) {
  const contact = getContactForRoom(room);
  const hasAnyChannel = contact.phone || contact.lineUrl || contact.helpdeskUrl;
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!contextLabel) return;
    try {
      await navigator.clipboard.writeText(contextLabel);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can fail (permissions, non-secure context) — non-critical, just no-op.
    }
  }

  const phoneHref = contact.phone
    ? `tel:${contact.phone.value.replace(/[^0-9+]/g, "")}${
        contact.phone.extension ? "," + contact.phone.extension : ""
      }`
    : undefined;
  const phoneDisplay = contact.phone
    ? contact.phone.value + (contact.phone.extension ? ` ต่อ ${contact.phone.extension}` : "")
    : undefined;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4">
      <p className="flex items-center gap-2 font-medium">
        <Icon name="LifeBuoy" className="h-4 w-4 text-accent" />
        ติดต่อ IT Support
      </p>

      {!hasAnyChannel && (
        <p className="text-sm text-muted">
          กรุณาติดต่อเจ้าหน้าที่ IT Support ที่ประจำอยู่ในพื้นที่ หรือช่องทางติดต่อของคณะ
        </p>
      )}

      {contextLabel && (
        <button
          type="button"
          onClick={handleCopy}
          className="flex min-h-[44px] items-center justify-between gap-2 rounded-xl bg-surface-elevated px-3.5 py-3 text-left text-sm transition-colors hover:bg-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span className="min-w-0 truncate text-muted">
            บอก IT ว่า: <span className="text-foreground">{contextLabel}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-accent">
            <Icon name={copied ? "CheckCircle2" : "Copy"} className="h-3.5 w-3.5" />
            {copied ? "คัดลอกแล้ว" : "คัดลอก"}
          </span>
        </button>
      )}

      <div className="flex flex-col gap-2">
        {contact.lineUrl && (
          <a
            href={contact.lineUrl.value}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Icon name="MessageCircle" className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium">
                💬 {contact.lineUrl.label ?? "LINE IT Support"}
              </span>
              {contact.lineUrl.description && (
                <span className="block truncate text-sm text-muted">
                  {contact.lineUrl.description}
                </span>
              )}
            </span>
            <Icon name="ChevronRight" className="h-4 w-4 shrink-0 text-muted" />
          </a>
        )}

        {contact.phone && phoneHref && (
          <a
            href={phoneHref}
            className="flex min-h-[44px] items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Icon name="Phone" className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium">
                ☎️ {contact.phone.label ?? "โทร IT Support"}
              </span>
              <span className="block truncate text-sm text-muted">{phoneDisplay}</span>
            </span>
            <Icon name="ChevronRight" className="h-4 w-4 shrink-0 text-muted" />
          </a>
        )}

        {contact.helpdeskUrl && (
          <a
            href={contact.helpdeskUrl.value}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Icon name="LifeBuoy" className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium">
                🛠️ {contact.helpdeskUrl.label ?? "แจ้งซ่อมระบบ"}
              </span>
              {contact.helpdeskUrl.description && (
                <span className="block truncate text-sm text-muted">
                  {contact.helpdeskUrl.description}
                </span>
              )}
            </span>
            <Icon name="ChevronRight" className="h-4 w-4 shrink-0 text-muted" />
          </a>
        )}
      </div>
    </div>
  );
}
