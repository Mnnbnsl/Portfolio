import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Manan Bansal — AI & Full-Stack Developer",
    template: "%s | Manan Bansal",
  },
  description: "Personal portfolio, selected work, writing, and notes.",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#080a09",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
