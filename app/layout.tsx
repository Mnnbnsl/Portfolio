import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://mananbansal.dev'),
  title: {
    default: "Manan Bansal — AI & Full-Stack Developer",
    template: "%s | Manan Bansal",
  },
  description: "Personal portfolio, selected work, writing, and engineering notes.",
  authors: [{ name: "Manan Bansal" }],
  creator: "Manan Bansal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mananbansal.dev",
    title: "Manan Bansal — AI & Full-Stack Developer",
    description: "Personal portfolio, selected work, writing, and engineering notes.",
    siteName: "Manan Bansal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manan Bansal — AI & Full-Stack Developer",
    description: "Personal portfolio, selected work, writing, and engineering notes.",
    creator: "@mnnbnsl",
  },
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
