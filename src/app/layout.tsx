import type { Metadata, Viewport } from "next";
import { fontVars } from "@/lib/fonts";
import { COUPLE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: COUPLE, template: "%s | Sweta & Abhishek" },
  description: "Join us for the engagement of Sweta & Abhishek, 10 December 2026, Varanasi.",
  metadataBase: new URL("https://shubhamkaushal765.github.io"),
  openGraph: {
    type: "website",
    siteName: COUPLE,
    title: "You’ve got mail from Sweta & Abhishek",
    description: "Engagement · 10 December 2026 · Tree Garden And Resort, Varanasi. Tap to open your invitation.",
    url: "/abhishek-engagement/",
  },
  twitter: { card: "summary_large_image" },
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
