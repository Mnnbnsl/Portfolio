---
name: "Manan Bansal Portfolio"
description: "A dark, high-contrast, technical portfolio layout highlighting AI and full-stack projects."
colors:
  canvas: "#050605"
  surface: "#0b0d0c"
  surface-raised: "#101311"
  ink: "#edf0e6"
  ink-muted: "#999f97"
  ink-faint: "#656a64"
  accent: "#b7f34a"
  accent-soft: "#182405"
typography:
  display:
    fontFamily: '"Inter", "Aptos", "Avenir Next", "Helvetica Neue", sans-serif'
    fontSize: "clamp(2.9rem, 2rem + 4.2vw, 5.25rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  headline:
    fontFamily: '"Inter", "Aptos", "Avenir Next", "Helvetica Neue", sans-serif'
    fontSize: "clamp(1.35rem, 1.14rem + 0.92vw, 1.9rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  body:
    fontFamily: '"Inter", "Aptos", "Avenir Next", "Helvetica Neue", sans-serif'
    fontSize: "clamp(1rem, 0.96rem + 0.18vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: '"JetBrains Mono", "Cascadia Mono", "SFMono-Regular", Consolas, monospace'
    fontSize: "0.8125rem"
    fontWeight: 500
    letterSpacing: "0.05em"
rounded:
  sm: "0.55rem"
  md: "1rem"
spacing:
  space-1: "0.25rem"
  space-2: "0.5rem"
  space-3: "0.75rem"
  space-4: "1rem"
  space-5: "1.5rem"
  space-6: "2rem"
  space-7: "3rem"
  space-8: "4.5rem"
  space-9: "7rem"
components:
  card:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.md}"
    padding: "2rem"
  tag-default:
    rounded: "20px"
    padding: "0.25rem 0.75rem"
    textColor: "{colors.ink-faint}"
  tag-domain:
    rounded: "20px"
    padding: "0.25rem 0.75rem"
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent}"
---

# Design System: Manan Bansal Portfolio

## 1. Overview

**Creative North Star: "The Technical Monologue"**

The Technical Monologue is a design environment structured for absolute legibility, clean spacing, and industrial precision. It treats the portfolio as a curated dashboard of selected works and tools, utilizing a dark, near-black void to frame high-contrast off-white copy. Monospace tags and indices anchor the visual weight, suggesting engineering-first craft.

This system rejects the common saturated gradients, colorful overlays, and soft blurs typical of modern SaaS sites. Every design element must serve a structural or visual division purpose. 

**Key Characteristics:**
- Dark void backdrop (#050605) providing extreme ink contrast.
- Strict typography pairing (Inter sans-serif for reading, JetBrains Mono for metadata and indices).
- High visual economy, reserving neon-green highlights strictly for interaction states and active statuses.

## 2. Colors

The color palette uses a stark near-black theme with high-contrast warm off-white and a single tactical neon green accent.

### Primary
- **Tactical Neon Green** (#b7f34a): Applied to active state badges, project domain tags, links on hover, and focused borders.

### Neutral
- **Deep Void Canvas** (#050605): The primary background color. Must remain solid with no background gradients.
- **Soot Surface** (#0b0d0c): The background color for floating layouts, nav pills, and cards.
- **Elevated Soot** (#101311): The background color for cards at rest, providing subtle structural division.
- **Ash Ink** (#edf0e6): Primary typography and line color.
- **Muted Ash** (#999f97): Secondary copy, descriptions, and passive link colors.
- **Faint Ash** (#656a64): Borders, metadata, dates, and decorative guidelines.

### Named Rules
**The Neon Constraint Rule.** The neon green accent (#b7f34a) must occupy <= 5% of any screen's layout. It is a tool for navigation and focus feedback, never a background wash or dominant visual weight.

## 3. Typography

**Display Font:** "Inter" (sans-serif)
**Body Font:** "Inter" (sans-serif)
**Label/Mono Font:** "JetBrains Mono" (monospace)

### Hierarchy
- **Display** (600, clamp(2.9rem, 2rem + 4.2vw, 5.25rem), 1.2): Big display headings for heroes or introductory remarks.
- **Headline** (600, clamp(1.35rem, 1.14rem + 0.92vw, 1.9rem), 1.2): Section titles ("Projects", "Tech Stack").
- **Title** (600, 0.8125rem, 1.2): Component-level titles, such as project names in card headers.
- **Body** (400, clamp(1rem, 0.96rem + 0.18vw, 1.125rem), 1.6): Main text column reading layout, restricted to 65–75ch for optimal reading flow.
- **Label** (500, 0.8125rem, 1.5): Metadata labels, tags, dates, and inline monospace notes.

### Named Rules
**The Monospace Accent Rule.** "JetBrains Mono" must never be used for long body text or display headings. It is strictly reserved for short identifiers, tags, and small utility outputs.

## 4. Elevation

The system is flat by default, emphasizing physical borders over drop shadows. It conveys depth through color layers (canvas vs. surface) and thin borders.

### Shadow Vocabulary
- **Interactive Glow** (0 0 20px rgba(183, 243, 74, 0.06)): Used under navigation bars and floating headers to create a soft, neon-tinted separation.

### Named Rules
**The Flat Canvas Rule.** Drop shadows and soft blur cards are prohibited as general elements. Visual elevation must be established using thin 1px lines (`--line`) and surface background steps (`--surface` and `--surface-raised`).

## 5. Components

### Navigation Header & Footer
- **Shape:** Rounded pill border radius (1.5rem / 24px)
- **Primary:** Background color rgba(0, 0, 0, 0.9) with backdrop-filter blur (12px) and 1px border (`--line`)
- **Hover:** Active links display under-border transitions to tactical neon green.

### Project Cards
- **Corner Style:** Large radius (1rem / 16px)
- **Background:** Raised soot (#101311)
- **Border:** 1px ash line (`--line`)
- **Hover:** Shifting border color to tactical neon green (#b7f34a) and moving 2px upward with transition (0.2s `var(--ease-out)`).

### Tag Badges
- **Shape:** Full pill radius (20px)
- **Default:** Background is transparent with a 1px border (`--line`) and faint ash text.
- **Domain Accent:** Border and text set to tactical neon green, with a subtle accent-soft background fill.

## 6. Do's and Don'ts

### Do:
- **Do** respect the 65–75ch width limit for body prose to keep paragraphs highly readable.
- **Do** use `text-wrap: balance` on headers h1–h3 and `text-wrap: pretty` on paragraphs to prevent orphans.
- **Do** ensure interactive triggers provide a clean focus outline on keyboard navigation (`focus-visible`).

### Don't:
- **Don't** use decorative gradients (e.g. gradient text overlays or colorful glowing background blobs).
- **Don't** use side-stripe borders (e.g. left border accents) to denote list hierarchy.
- **Don't** use uppercase tracked eyebrows as headers on every section.
- **Don't** use nested cards.
