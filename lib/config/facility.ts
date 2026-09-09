/**
 * facility.ts (config)
 *
 * Application identity and branding — the one place to edit product
 * name, organization name, and default theme (Bible §31 app.config.ts).
 */

export const APP_CONFIG = {
  productName: "KUMED SMART HOW-TO",
  shortName: "KUMED IT GUIDE",
  organization: {
    name: "คณะแพทยศาสตร์ มหาวิทยาลัยเกษตรศาสตร์",
    shortName: "Faculty of Medicine, Kasetsart University",
  },
  version: "1.0.0",
  /** "light" | "dark" | "system" — passed to next-themes' defaultTheme. */
  defaultTheme: "system" as const,
} as const;
