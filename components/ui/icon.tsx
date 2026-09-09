"use client";

import { HelpCircle, type LucideProps } from "lucide-react";
import {
  Presentation,
  School,
  GraduationCap,
  Laptop,
  Video,
  Smartphone,
  Cable,
  Monitor,
  Wifi,
  Camera,
  Power,
  SplitSquareHorizontal,
  Phone,
  MessageCircle,
  LifeBuoy,
  ChevronRight,
  ChevronLeft,
  Sun,
  Moon,
  ImageOff,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronDown,
  X,
  Copy,
} from "lucide-react";

/**
 * Curated icon registry (Bible §31/§36 keep icon usage intentional, not
 * an open dynamic-import surface). Add an entry here whenever data
 * references a new IconName; unknown names fall back to HelpCircle
 * rather than crashing (Bible §57 ERROR HANDLING philosophy applied to
 * icons too).
 */
const ICONS = {
  Presentation,
  School,
  GraduationCap,
  Laptop,
  Video,
  Smartphone,
  Cable,
  Monitor,
  Wifi,
  Camera,
  Power,
  SplitSquareHorizontal,
  Phone,
  MessageCircle,
  LifeBuoy,
  ChevronRight,
  ChevronLeft,
  Sun,
  Moon,
  HelpCircle,
  ImageOff,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronDown,
  X,
  Copy,
} as const;

export type RegisteredIconName = keyof typeof ICONS;

export function Icon({
  name,
  ...props
}: { name?: string } & LucideProps) {
  const Resolved =
    name && name in ICONS ? ICONS[name as RegisteredIconName] : HelpCircle;
  return <Resolved {...props} />;
}
