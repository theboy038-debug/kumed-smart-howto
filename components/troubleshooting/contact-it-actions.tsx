"use client";

import { useState } from "react";

import { Icon } from "@/components/ui/icon";
import { getContactForRoom } from "@/lib/utils";
import type { Room } from "@/lib/types";

/**
 * Phase 5 §10/§16 — only ever renders a channel whose Fact is
 * `"confirmed"` (via getContactForRoom). A `"pending"` contact value
 * must never reach this component as if it were real.
 *
 * Phase 5 §11 CONTEXT-AWARE CONTACT — when a room/problem context is
 * known, offers a one-tap "copy" of a short message the user can paste
 * into a call/LINE chat with IT, e.g. "ห้อง 703 — Wireless เชื่อมต่อไม่ได้".
 * Purely client-side (clipboard API); no backend added for this.
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

      <div className="flex flex-wrap gap-2">
        {contact.phone && (
          <a
            href={`tel:${contact.phone}`}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Icon name="Phone" className="h-4 w-4" />
            โทร {contact.phone}
          </a>
        )}
        {contact.lineUrl && (
          <a
            href={contact.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 py-2.5 text-sm font-medium transition-colors hover:bg-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Icon name="MessageCircle" className="h-4 w-4" />
            LINE
          </a>
        )}
        {contact.helpdeskUrl && (
          <a
            href={contact.helpdeskUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 py-2.5 text-sm font-medium transition-colors hover:bg-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Icon name="LifeBuoy" className="h-4 w-4" />
            Helpdesk
          </a>
        )}
      </div>
    </div>
  );
}
