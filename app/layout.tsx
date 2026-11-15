import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import {
  Instrument_Sans,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import Preloader from "./components/Preloader";
import "./globals.css";

const displayFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

const bodyFont = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

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
    <html
      lang="en"
      data-boot="pending"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body>
        <noscript>
          <style>{`
            html[data-boot='pending'] .top-header { opacity: 1; transform: translateX(-50%); }
            html[data-boot='pending'] .hero-inner > *:not(h1),
            html[data-boot='pending'] .hero h1 { opacity: 1; transform: none; }
            .preloader { display: none; }
          `}</style>
        </noscript>
        <div className="page-grid" aria-hidden="true" />
        <div className="scroll-progress" aria-hidden="true" />
        <Preloader />
        {children}
      </body>
    </html>
  );
}
