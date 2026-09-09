import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import { APP_CONFIG } from "@/lib/config/facility";
import "./globals.css";

export const metadata: Metadata = {
  title: APP_CONFIG.productName,
  description: `${APP_CONFIG.shortName} — ${APP_CONFIG.organization.name}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme={APP_CONFIG.defaultTheme}
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
