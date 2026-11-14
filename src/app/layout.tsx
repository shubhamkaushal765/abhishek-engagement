import type { Metadata, Viewport } from "next";
import { fontVars } from "@/lib/fonts";
import { COUPLE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: COUPLE, template: "%s | Abhishek & Sweta" },
  description: "Join us for the engagement of Abhishek & Sweta, 10 December 2026, Varanasi.",
};

export const viewport: Viewport = {
  themeColor: "#6E1F2B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
