---
version: alpha
name: Andrei Popescu Portfolio
description: Business-automation freelance portfolio — calm neutral canvas, one warm accent, glass surfaces over a fixed photographic backdrop.
colors:
  primary: "#171a2b"
  secondary: "#4d5170"
  tertiary: "#e2793d"
  tertiary-bright: "#d96a29"
  tertiary-dim: "#b8622e"
  neutral: "#f3f4fa"
  surface: "#ffffff"
  surface-alt: "#eceefa"
  ink: "#14161f"
  success: "#2f9d63"
typography:
  eyebrow:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.12em
  headline-lg:
    fontFamily: Outfit
    fontSize: 54px
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 38px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Outfit
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.4
rounded:
  sm: 10px
  md: 16px
  lg: 24px
  full: 999px
spacing:
  xs: 8px
  sm: 14px
  md: 24px
  lg: 32px
  xl: 64px
  section-y: 108px
  container: 1180px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "#171008"
    rounded: "{rounded.full}"
    padding: "13px 24px"
  button-primary-hover:
    backgroundColor: "{colors.tertiary-bright}"
  button-secondary:
    backgroundColor: "rgba(255,255,255,0.35)"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "13px 24px"
  button-secondary-hover:
    backgroundColor: "rgba(255,255,255,0.95)"
  card:
    backgroundColor: "rgba(255,255,255,0.25)"
    rounded: "{rounded.md}"
    padding: "32px"
  card-hover:
    backgroundColor: "rgba(255,255,255,0.95)"
  pill:
    backgroundColor: "rgba(255,255,255,0.28)"
    rounded: "{rounded.full}"
    padding: "11px 24px"
  input:
    backgroundColor: "rgba(255,255,255,0.32)"
    rounded: "{rounded.md}"
    padding: "13px 16px"
  input-focus:
    backgroundColor: "rgba(255,255,255,0.95)"
  status-dot:
    backgroundColor: "{colors.success}"
    rounded: "{rounded.full}"
  canvas:
    backgroundColor: "{colors.neutral}"
  panel-alt:
    backgroundColor: "{colors.surface-alt}"
  terminal:
    backgroundColor: "{colors.ink}"
    rounded: "{rounded.md}"
---

# DESIGN.md — Andrei Popescu Portfolio

## Overview

A one-page freelance portfolio for business automation and web development work. The tone is calm, competent, and slightly technical — closer to a developer's product page than a typical agency site. It should feel light and airy (soft neutral canvas, generous whitespace, translucent glass surfaces) while staying grounded and readable: this is someone who builds real systems, not a hype page.

The signature move is a fixed photographic backdrop (soft pastel 3D shapes) that stays still while the page scrolls over it, combined with a persistent rotating 3D cube sitting *behind* all content. Surfaces (cards, buttons, inputs, pills) are deliberately translucent at rest so that backdrop bleeds through, then snap to fully opaque on hover or focus — transparency is a resting state, not a permanent one, and it never applies to text itself.

## Colors

The palette is a near-monochrome ink-on-mist base with a single warm accent doing all the interactive work.

- **Primary (#171a2b):** Near-black navy ink. Used for all headline and body text — it is the only text color that needs to guarantee full readability over a busy photographic background, so it is never used at reduced opacity.
- **Secondary (#4d5170):** A muted slate-navy for supporting copy (sub-headlines, descriptions) — one step down in emphasis from primary text.
- **Tertiary / Accent (#e2793d), bright (#d96a29), dim (#b8622e):** A warm burnt-orange. This is the *only* color used for interactive intent — primary CTAs, links, active states, the eyebrow labels, and the brand dot in the logo. It never appears as a body-text color.
- **Neutral (#f3f4fa):** A cool lavender-white base canvas color, visible wherever the fixed backdrop photo doesn't reach.
- **Surface (#ffffff) / Surface-alt (#eceefa):** The two card-surface tones, used at full opacity only in hover/focus states (see Components).
- **Ink (#14161f):** A near-black used exclusively for a small number of intentionally opaque dark UI objects that are meant to read as "hardware" rather than "paper" — the terminal-style code widget and the top face of the 3D cube.
- **Success (#2f9d63):** Reserved for the single "available for work" status dot. Not used anywhere else.

## Typography

Two families carry the whole page: **Outfit** for anything that needs presence, **Inter** for anything meant to be read at length, and **JetBrains Mono** for anything that should feel like data or system output.

- **Eyebrow labels:** JetBrains Mono, uppercase, wide letter-spacing (0.12em), always in the accent color. Used above every section heading and in stat/meta rows — this is the page's recurring "system label" motif.
- **Headlines:** Outfit at 700 weight, tight letter-spacing (-0.01em). Three sizes cover the hierarchy: a large hero/section-title size (~54px, fluid down to ~35px on small screens), a mid size for section headings (~38px), and a small size for card titles (~22px).
- **Body text:** Inter at 400 weight, generous line-height (1.6) for long-form readability. Slightly larger (17px) for section intros, standard (16px) everywhere else.
- **Mono labels:** JetBrains Mono at 600 weight for anything that should look like a tag, a stat, or a piece of UI chrome (nav links styling aside, badges, pills, terminal text).

## Layout

A single centered column, capped at a 1180px container, with generous vertical rhythm: full sections get 108px of top/bottom padding, cards and grids use a 24px gap, and card interiors use 32px of padding. The scale is loosely built on an 8px rhythm (8 / 14 / 24 / 32 / 64) rather than a strict grid — the priority is breathing room over pixel-perfect alignment. On narrow viewports the same scale compresses (roughly 80px section padding, tighter grid gaps) rather than switching to a different system.

## Elevation & Depth

Depth comes from three layered effects rather than heavy drop shadows:

1. A **fixed photographic backdrop** (pastel 3D geometry) and a **fixed, slowly-rotating 3D cube**, both pinned to the viewport behind all page content (negative stacking order) so they stay still while the page scrolls over them.
2. **Glass surfaces**: every card, button, pill, and input is translucent white (25–35% opacity) with a backdrop blur, letting the fixed backdrop show through. On `:hover` (or `:focus` for inputs) they jump to ~95–100% opaque, which is the page's primary "this is now active" signal.
3. Soft, colored (indigo-tinted, not pure black) drop shadows on raised surfaces — subtle enough to separate a card from the canvas without competing with the backdrop.

## Shapes

Everything is soft-cornered. Buttons and pills are fully rounded (999px / capsule shape). Cards use a 16px radius; the largest containers (contact form, lightbox) use 24px. Avatars, icon badges, and status dots are perfect circles. The one deliberate exception is the 3D cube and the "AI Agent" glass card, which use sharp, angular facets on purpose — they're meant to read as distinct objects, not UI surfaces.

## Components

- **Buttons:** Primary is solid accent-orange at rest (35% opacity, glass) and jumps to full-opacity bright-orange on hover; secondary is a translucent white pill with a border that also goes opaque on hover. Both are capsule-shaped with 13px/24px padding.
- **Cards:** Service and work cards are translucent white glass at rest, snapping to ~95% opaque white on hover, always paired with a subtle lift (`translateY(-4px)`) and a border-color shift to signal interactivity.
- **Pills / tags:** Small capsule badges (tool logos, capability tags) — same translucent-at-rest, opaque-on-hover pattern as cards, just smaller.
- **Inputs:** Translucent glass fields that become fully opaque white on focus, with the accent color taking over the border — this is the only focus indicator, there is no separate outline.

## Do's and Don'ts

- Do keep the accent orange exclusive to interactive/attention elements — never use it for large blocks of body text or backgrounds.
- Do keep text itself at 100% opacity at all times, even when its container is translucent glass.
- Do snap glass surfaces to fully opaque on hover/focus — a translucent element that never becomes opaque reads as broken, not stylish.
- Don't stack more than one heavy background effect at once (e.g. don't add a second animated backdrop on top of the fixed cube + photo — the page already has its "signature" depth effect).
- Don't introduce a second accent color; contrast comes from the ink/slate/orange triad, not from more hues.
- Don't mix sharp and rounded corners on the same UI surface — sharp facets are reserved for the cube and the AI Agent card specifically, everything else stays soft-rounded.
