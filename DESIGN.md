---
name: GDS – Gürkan Digital Services
description: Ein Schwarzwald-Baar-Wegweiser – dunstblaue Pfeilschilder mit Schieferschrift auf Schiefer und Himmel, ganz ohne Akzentfarbe.
colors:
  slate: "#1c2a33"
  slate-deep: "#121c23"
  slate-line: "#364853"
  mist: "#9fb3bf"
  mist-soft: "#b7c6d0"
  sky: "#dfe7ec"
  paper: "#eef2f5"
  white: "#ffffff"
  gray-100: "#cdd7dd"
  gray-300: "#c3d0d8"
  gray-400: "#a9bac4"
  gray-700: "#3f4e57"
  post: "#5d7584"
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
    backgroundColor: "{colors.slate}"
    textColor: "{colors.sky}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "13px 26px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.slate-line}"
  button-primary-on-dark:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.slate}"
    rounded: "{rounded.sm}"
    padding: "13px 26px"
    height: "44px"
  button-primary-on-dark-hover:
    backgroundColor: "{colors.white}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "11.5px 25px"
    height: "44px"
  sign-board:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.slate}"
    typography: "{typography.title}"
    padding: "11px 42px 11px 20px"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.gray-700}"
    rounded: "{rounded.md}"
    padding: "34px 32px"
  plan-card:
    backgroundColor: "{colors.slate}"
    textColor: "{colors.gray-300}"
    rounded: "{rounded.md}"
    padding: "40px 32px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.slate}"
    rounded: "{rounded.sm}"
    padding: "13px 16px"
---

# Design System: GDS – Gürkan Digital Services

## Overview

**Creative North Star: "Der Wegweiser"**

The site is a Schwarzwald-Baar hiking signpost: it points a local business owner to the next step. Flat Schiefer grounds carry Dunst arrow boards lettered in slate ink; Himmel sections give the reading rhythm in between. The world stays recognisable with all content removed: mist-blue arrow boards on a slate field.

The tone is calm and precise. Sign lettering is condensed, uppercase where it is a sign, and reading text is plain Barlow. Every board is flat, with one pointed end and a thin ink rule top and bottom; depth comes from colour blocks, not effects. There is no accent colour: the owner chose "only slate", so hierarchy comes from value and shape, never from a second hue. A person and a place come before decoration.

**Key Characteristics:**
- Slate ground, mist signal boards, sky reading sections, slate ink; one cool blue-gray hue family throughout.
- Arrow-shaped boards (clip-path point) with 2–3px ink rules inside top and bottom edges.
- Barlow Condensed for sign lettering and headings, Barlow for reading.
- Flat at rest; motion is small fades and 6–14px slides, all disabled under reduced motion.
- One owner-fixed exception: the "GDS." wordmark.

## Colors

A restrained cool palette of one hue family at different values: slate for authority, sky and paper for reading, mist reserved for signs and markers. There is no accent colour.

### Primary
- **Schiefer** (`slate`): hero, dark sections, contact card, plan cards, primary button on light grounds, active-nav underline, focus outline on light grounds, and all text ink (the ink value equals slate; there is no separate black). Deeper `slate-deep` for footer, preview gate and mobile menu; `slate-line` for rules, borders and the primary button hover on slate-toned surfaces.
- **Dunst** (`mist`): arrow boards, the closing board, trail dots, the featured plan's border and badge, check icons on plans, focus outline on dark grounds, selection. `mist-soft` is its hover state only.

### Neutral
- **Himmel** (`sky`): page background and light sections. **Paper** (`paper`): header, area strip, cards, form fields, FAQ panel; one step lighter than sky.
- **Text grays** (`gray-700` on light, `gray-300`/`gray-400` on slate, tinted toward the blue): secondary copy. `gray-100` is the hairline border on light grounds.
- **Post** (`post`): only the signpost pole in the hero.

### Brand exception
- **Logo Indigo** (`logo-indigo`, with the Manrope gradient #191970 to #7a7ae0 in the header and white to #a5a5f5 on dark): belongs solely to the "GDS." wordmark, an owner-fixed commitment from PRODUCT.md. It is not part of the palette and must not appear elsewhere.

### Named Rules
**The No-Accent Rule.** Slate, mist and sky are values of one hue family; no yellow, green, red or indigo joins them. Emphasis comes from the dark/light flip, board shape and size.

**The Mist Board Rule.** Mist appears on boards, the closing board and small markers (dots, badge, featured border, icons). Text on mist is always slate ink, never white.

**The Button Flip Rule.** The primary button is slate with sky text on light grounds and sky with slate text on dark grounds (hero, dark sections); on the mist closing board it is slate.

## Typography

**Display Font:** Barlow Condensed 600/700 (fallback Barlow, Arial Narrow)
**Body Font:** Barlow 400/500/600 (fallback Segoe UI, Arial)
**Logo Font:** Manrope 800, wordmark only.

**Character:** Condensed sign lettering against a friendly humanist reading face, both self-hosted (woff2). Headings read like painted board text.

### Hierarchy
- **Display** (700, clamp 42–72px, 0.98, uppercase): the hero H1.
- **Headline** (700, clamp 36–56px, 1.05): section H2s; page H1s sit on a mist board at clamp 36–58px.
- **Title** (700, clamp 30–44px, 1.05): service names; 26–34px for sign arms, card and trail titles.
- **Body** (400, 17px, 1.6): reading text; lead paragraphs 18–19px; FAQ answers capped at 66ch, section intros at 60ch.
- **Label** (600, 16px): buttons, nav (500), form labels (15px).

### Named Rules
**The Sign-Or-Read Rule.** Condensed face for signs and headings, Barlow for anything read in sentences. Headings use `text-wrap: balance`.

## Layout

Container max width 1180px with 32px side padding (20px on mobile). Sections run 100px vertical padding (72px under 768px). Hero is a 1.2fr / 0.8fr grid with a 64px gap: message left, signpost right. The service list pairs a sticky intro (0.8fr) with the ruled list (1.2fr), gap 72px. The four-step trail is a 4-column grid collapsing to 2 (at 1000px) and 1 (at 768px). Pricing and card grids use 3 and 2 columns with 28px gaps and collapse to one at 900px, featured plan first. Footer is 1.4fr / 1fr / 1fr. The header is sticky, 78px high; the nav becomes a full-screen slate-deep panel under 768px.

## Elevation & Depth

Flat. Depth is conveyed by ground colour (slate against sky against paper), by 2–3px ink rules on boards, and by 1px hairlines. The only shadow is a soft header shadow (`0 6px 20px rgba(18,28,35,0.12)`) once the page is scrolled. Hover lifts are 1–3px translates.

### Named Rules
**The Flat-Board Rule.** Boards carry no drop shadows; their edge is the ink rule drawn as an inset shadow.

## Shapes

Two languages. Signs are rectangles with one pointed end cut by clip-path (22–56px point, scaled to board size); left-pointing arms mirror the cut. Everything else (buttons, fields, badges) is nearly square at 4px; cards and panels 6px. The trail dot is the one circle. Service rows are separated by 2px ink rules, not boxes.

## Components

### Buttons
- **Shape:** 4px corners, min height 44px.
- **Primary:** slate with sky text on light grounds, 13px 26px padding, 600 weight. Hover: `slate-line` and 1px lift. On dark grounds (hero, dark sections) it flips to sky with slate text, hover white.
- **Outline:** 1.5px white 55% border on slate, white text; hover brightens the border and adds an 8% white wash.
- **Focus:** 3px outline, slate on light grounds, mist on slate grounds, slate on the mist closing board.

### Sign Board (signature)
Mist arrow board with slate lettering, inset 2px (arms) or 3px (headings, phrase, closing board) ink rules top and bottom. Used for the rotating hero phrase, subpage H1s, the four signpost arms, and the closing call-to-action. Arms alternate left and right on a post-colored pole and slide in 14px.

### Service List
Rows separated by 2px ink rules; large condensed service name, gray-700 description, an inline arrow at the right that moves 6px and the row indents 14px on hover.

### Trail
Four steps on a dashed slate-line path, each marked by a 16px mist dot, on a slate ground.

### Cards and Plans
Cards: paper ground, 1px gray-100 border, 6px radius, 34px 32px padding. Plans: translucent white on slate, 1px slate-line border; the featured plan has a 2px mist border, a mist badge, a 64px white price, and sits first on mobile.

### Inputs
Paper ground, 1.5px border (#9fb0ba), 4px radius, 13px 16px padding, 17px text. Focus: 3px slate outline and slate border. Status messages use pale green or pale red panels (functional feedback only).

### Navigation
Barlow 500 16px, gray-700, slate on hover; the active page has a 3px slate underline. Mobile: burger of three 2px bars opens a slate-deep panel with condensed 26px links.

### FAQ
Paper panel with hairline-separated questions (18px 600), a plus icon rotating 45deg on open.

## Do's and Don'ts

### Do:
- **Do** keep the palette to the one blue-gray family: slate, mist, sky, paper and their tinted grays.
- **Do** put mist only on arrow boards, the closing board and small markers, with slate ink text.
- **Do** draw boards flat: one pointed end, 2–3px ink rules top and bottom.
- **Do** flip the primary button: slate on light, sky on dark.
- **Do** use Barlow Condensed for headings and sign text, Barlow for sentences.
- **Do** keep the "GDS." wordmark exactly as is (Manrope 800, indigo gradient, #7a7ae0 dot, "Webdesign & SEO" subline).
- **Do** keep 44px minimum touch height and visible 3px focus outlines; wrap all motion in reduced-motion fallbacks.
- **Do** use en dashes and formal German "Sie".

### Don't:
- **Don't** introduce an accent colour; the owner chose "only slate".
- **Don't** use gradient text, glow, particle or canvas effects, or navy and indigo outside the wordmark.
- **Don't** add drop shadows to boards or cards.
- **Don't** invent photos, references, numbers or testimonials.
- **Don't** use typewriter or counting animations.
