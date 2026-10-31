---
name: GDS – Gürkan Digital Services
description: Ein Schwarzwald-Baar-Wegweiser – gelbe Pfeilschilder mit schwarzer Schrift auf Tannengrün und Kalkstein.
colors:
  fir: "#1e3a2f"
  fir-deep: "#14271f"
  fir-line: "#35574a"
  signal: "#f2c230"
  signal-soft: "#f6d462"
  stone: "#e3e8e2"
  paper: "#f3f6f2"
  white: "#ffffff"
  ink: "#151a16"
  gray-700: "#46504a"
  gray-300: "#c5d0c8"
  gray-400: "#b3c2b8"
  gray-100: "#d2d9d0"
  wood: "#5b4330"
  logo-indigo: "#7a7ae0"
typography:
  display:
    fontFamily: "Barlow Condensed, Barlow, Arial Narrow, sans-serif"
    fontSize: "clamp(42px, 5vw, 72px)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Barlow Condensed, Barlow, Arial Narrow, sans-serif"
    fontSize: "clamp(36px, 4.6vw, 56px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "0"
  title:
    fontFamily: "Barlow Condensed, Barlow, Arial Narrow, sans-serif"
    fontSize: "clamp(30px, 3.6vw, 44px)"
    fontWeight: 700
    lineHeight: 1.05
  body:
    fontFamily: "Barlow, Segoe UI, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Barlow, Segoe UI, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  sm: "4px"
  md: "6px"
  full: "50%"
spacing:
  xs: "8px"
  sm: "14px"
  md: "24px"
  lg: "32px"
  xl: "64px"
  section: "100px"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "13px 26px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.signal-soft}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "11.5px 25px"
    height: "44px"
  sign-board:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    padding: "11px 42px 11px 20px"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.gray-700}"
    rounded: "{rounded.md}"
    padding: "34px 32px"
  plan-card:
    backgroundColor: "{colors.fir}"
    textColor: "{colors.gray-300}"
    rounded: "{rounded.md}"
    padding: "40px 32px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "13px 16px"
---

# Design System: GDS – Gürkan Digital Services

## Overview

**Creative North Star: "Der Wegweiser"**

The site is a Schwarzwald-Baar hiking signpost: it points a local business owner to the next step. Flat Tannengrün grounds carry Wegweiser-Gelb arrow boards lettered in black ink; Kalkstein sections give the reading rhythm in between. The world stays recognisable with all content removed: yellow arrow boards on a green field.

The tone is calm and precise. Sign lettering is condensed, uppercase where it is a sign, and reading text is plain Barlow. Every board is flat, with one pointed end and a thin ink rule top and bottom; depth comes from colour blocks, not effects. A person and a place come before decoration.

**Key Characteristics:**
- Fir-green ground, yellow signal boards, limestone reading sections, warm-black ink.
- Arrow-shaped boards (clip-path point) with 2–3px ink rules inside top and bottom edges.
- Barlow Condensed for sign lettering and headings, Barlow for reading.
- Flat at rest; motion is small fades and 6–14px slides, all disabled under reduced motion.
- One owner-fixed exception: the "GDS." wordmark.

## Colors

A restrained three-ground palette: green for authority, limestone for reading, yellow reserved for signs and the primary action.

### Primary
- **Tannengrün** (`fir`): hero, dark sections, contact card, plan cards, focus outline on light grounds. Deeper `fir-deep` for footer, preview gate and mobile menu; `fir-line` for rules and borders on green.
- **Wegweiser-Gelb** (`signal`): arrow boards, the primary button, active-nav underline, trail dots, featured price, selection. `signal-soft` is its hover state only.

### Neutral
- **Kalkstein** (`stone`): page background and light sections. **Paper** (`paper`): header, cards, form fields, FAQ panel; one step lighter than stone.
- **Warm Black Ink** (`ink`): all text on light and yellow grounds, board rules, service-list rules.
- **Text grays** (`gray-700` on light, `gray-300`/`gray-400` on green, tinted toward the green): secondary copy. `gray-100` is the hairline border on light grounds.
- **Wood** (`wood`): only the signpost pole in the hero.

### Brand exception
- **Logo Indigo** (`logo-indigo`, with the Manrope gradient #191970 to #7a7ae0 in the header): belongs solely to the "GDS." wordmark, an owner-fixed commitment from PRODUCT.md. It is not part of the palette and must not appear elsewhere.

### Named Rules
**The Signal Scarcity Rule.** Yellow appears only on boards, the primary action, and small markers (underline, dots, price). Never as a section background except the closing board.

**The Ink-On-Yellow Rule.** Text on yellow is always ink, never white or green.

## Typography

**Display Font:** Barlow Condensed 600/700 (fallback Barlow, Arial Narrow)
**Body Font:** Barlow 400/500/600 (fallback Segoe UI, Arial)
**Logo Font:** Manrope 800, wordmark only.

**Character:** Condensed sign lettering against a friendly humanist reading face, both self-hosted (woff2). Headings read like painted board text.

### Hierarchy
- **Display** (700, clamp 42–72px, 0.98, uppercase): the hero H1.
- **Headline** (700, clamp 36–56px, 1.05): section H2s; page H1s sit on a yellow board at clamp 36–58px.
- **Title** (700, clamp 30–44px, 1.05): service names; 28–34px for sign arms, card and trail titles.
- **Body** (400, 17px, 1.6): reading text; lead paragraphs 18–19px; FAQ answers capped at 66ch, section intros at 60ch.
- **Label** (600, 16px): buttons, nav (500), form labels (15px).

### Named Rules
**The Sign-Or-Read Rule.** Condensed face for signs and headings, Barlow for anything read in sentences. Headings use `text-wrap: balance`.

## Layout

Container max width 1180px with 32px side padding (20px on mobile). Sections run 100px vertical padding (72px under 768px). Hero is a 1.2fr / 0.8fr grid with a 64px gap: message left, signpost right. The service list pairs a sticky intro (0.8fr) with the ruled list (1.2fr), gap 72px. The four-step trail is a 4-column grid collapsing to 2 (at 1000px) and 1 (at 768px). Pricing and card grids use 3 and 2 columns with 28px gaps and collapse to one at 900px, featured plan first. Footer is 1.4fr / 1fr / 1fr. The header is sticky, 78px high; the nav becomes a full-screen fir-deep panel under 768px.

## Elevation & Depth

Flat. Depth is conveyed by ground colour (green against limestone against paper), by 2–3px ink rules on boards, and by 1px hairlines. The only shadow is a soft header shadow (`0 6px 20px rgba(20,39,31,0.1)`) once the page is scrolled. Hover lifts are 1–3px translates.

### Named Rules
**The Flat-Board Rule.** Boards carry no drop shadows; their edge is the ink rule drawn as an inset shadow.

## Shapes

Two languages. Signs are rectangles with one pointed end cut by clip-path (22–56px point, scaled to board size); left-pointing arms mirror the cut. Everything else (buttons, fields, badges) is nearly square at 4px; cards and panels 6px. The trail dot is the one circle. Service rows are separated by 2px ink rules, not boxes.

## Components

### Buttons
- **Shape:** 4px corners, min height 44px.
- **Primary:** yellow board colour with ink text, 13px 26px padding, 600 weight. Hover: `signal-soft` and 1px lift. On the closing yellow board it inverts to ink with white text.
- **Outline:** 1.5px white 55% border on green, white text; hover brightens the border and adds an 8% white wash.
- **Focus:** 3px outline, fir on light grounds, yellow on green, ink on the yellow board.

### Sign Board (signature)
Yellow arrow board with ink lettering, inset 2px (arms) or 3px (headings, phrase, closing board) ink rules top and bottom. Used for the rotating hero phrase, subpage H1s, the four signpost arms, and the closing call-to-action. Arms alternate left and right on a wood pole and slide in 14px.

### Service List
Rows separated by 2px ink rules; large condensed service name, gray-700 description, an inline ink arrow at the right that moves 6px and the row indents 14px on hover.

### Trail
Four steps on a dashed fir-line path, each marked by a 16px yellow dot, on a fir ground.

### Cards and Plans
Cards: paper ground, 1px gray-100 border, 6px radius, 34px 32px padding. Plans: translucent white on fir, 1px fir-line border; the featured plan has a 2px yellow border, a yellow 64px price, and sits first on mobile.

### Inputs
Paper ground, 1.5px border (#aab4a8), 4px radius, 13px 16px padding, 17px text. Focus: 3px fir outline and fir border. Status messages use pale green or pale red panels.

### Navigation
Barlow 500 16px, gray-700, ink on hover; the active page has a 3px yellow underline. Mobile: burger of three 2px ink bars opens a fir-deep panel with condensed 26px links.

### FAQ
Paper panel with hairline-separated questions (18px 600), a plus icon rotating 45deg on open.

## Do's and Don'ts

### Do:
- **Do** put yellow only on arrow boards, the primary action and small markers, with ink text.
- **Do** draw boards flat: one pointed end, 2–3px ink rules top and bottom.
- **Do** use Barlow Condensed for headings and sign text, Barlow for sentences.
- **Do** keep the "GDS." wordmark exactly as is (Manrope 800, indigo gradient, #7a7ae0 dot, "Webdesign & SEO" subline).
- **Do** keep 44px minimum touch height and visible 3px focus outlines; wrap all motion in reduced-motion fallbacks.
- **Do** use en dashes and formal German "Sie".

### Don't:
- **Don't** use gradient text, glow, particle or canvas effects, or navy and indigo outside the wordmark.
- **Don't** add drop shadows to boards or cards.
- **Don't** invent photos, references, numbers or testimonials.
- **Don't** use typewriter or counting animations.
