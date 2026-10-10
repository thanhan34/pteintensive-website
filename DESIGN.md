---
name: PTE Intensive
description: The Guided Launch — cinematic dark-glass moments alongside clear, light educational content.
colors:
  primary: "#fc5d01"
  orange-soft: "#fd7f33"
  peach-light: "#fedac2"
  peach: "#fdbc94"
  peach-dark: "#ffac7b"
  ink: "#171717"
  white: "#ffffff"
  hero-night: "#05090d"
  shell-night: "#08111f"
  gray-100: "#f3f4f6"
  gray-600: "#4b5563"
  gray-900: "#111827"
  background-light: "hsl(0 0% 100%)"
  foreground-light: "hsl(222.2 84% 4.9%)"
  border-light: "hsl(214.3 31.8% 91.4%)"
  background-dark: "hsl(222.2 84% 4.9%)"
  foreground-dark: "hsl(210 40% 98%)"
  border-dark: "hsl(217.2 32.6% 17.5%)"
  ring: "hsl(22 100% 50%)"
  destructive-light: "hsl(0 84.2% 60.2%)"
  destructive-dark: "hsl(0 62.8% 30.6%)"
  glass: "rgba(255, 255, 255, 0.1)"
  glass-strong: "rgba(255, 255, 255, 0.14)"
  glass-border: "rgba(255, 255, 255, 0.18)"
  glass-border-strong: "rgba(255, 255, 255, 0.22)"
  glass-text: "rgba(255, 255, 255, 0.9)"
  glass-secondary: "rgba(255, 255, 255, 0.7)"
  glass-muted: "rgba(255, 255, 255, 0.55)"
typography:
  body:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.625
  body-small:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    lineHeight: 1.625
  title:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.4
  label:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.428571
  eyebrow:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "0.18em"
  display-serif:
    fontFamily: "Playfair Display, Georgia, serif"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  navigation-mobile: "12px"
  card-light: "16px"
  button-legal: "18px"
  card-glass: "24px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  base: "16px"
  lg: "24px"
  xl: "32px"
  section: "48px"
  section-large: "64px"
  section-wide: "80px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "40px"
  button-secondary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    height: "40px"
  button-outline:
    backgroundColor: "{colors.background-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "40px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "40px"
  button-destructive:
    backgroundColor: "{colors.destructive-light}"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.md}"
    height: "40px"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    height: "40px"
  button-hero:
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0px 28px"
    height: "56px"
  input:
    backgroundColor: "{colors.background-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
    height: "40px"
  card-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.gray-900}"
    rounded: "{rounded.card-light}"
    padding: "24px"
  card-glass:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.glass-text}"
    rounded: "{rounded.card-glass}"
    padding: "24px"
  chip-peach:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  navigation-home:
    textColor: "{colors.white}"
    rounded: "{rounded.card-light}"
    height: "76px"
---

# Design System: PTE Intensive

## Overview

**Creative North Star: "The Guided Launch"**

Confident, practical, and aspirational. Cinematic dark-glass moments lead into clear, light educational content. Launch Orange connects the two treatments, while existing learner, teacher, and destination imagery gives the interface its recognizable identity.

Components feel tactile and confident. Dark Glass uses ambient layered depth; Light Content uses structural shadows to separate readable cards. Admin Surfaces remain light, clear, and task-oriented rather than inheriting the cinematic hero treatment.

**Key Characteristics:**
- Launch Orange and Warm Peach unify dark and light surfaces.
- Manrope provides the shared voice; Playfair Display supports selected editorial and cinematic headings.
- Rounded cards, pill actions, and visible depth create tactile hierarchy.
- Responsive layouts preserve readable Vietnamese content and existing identity assets.

This is a source-based scan, confirmed with the user on October 10, 2026, not a redesign. No rendered screenshots or computed-style samples were available. Evidence: `app/globals.css`, `tailwind.config.ts`, `app/layout.tsx`, shared UI primitives, navigation, homepage, legal shell, and content-card implementations. Frontmatter records selected incumbent values; source code remains authoritative for the full cascade, route overrides, and unlisted variants.

## Colors

### Primary

**Launch Orange** (`primary`) is the recurring brand accent for primary actions, active navigation, links, icons, and emphasis. `orange-soft` extends existing warm gradients; the hero also has its own orange gradient stops, recorded in the sidecar preview rather than promoted to universal palette tokens.

### Secondary

**Warm Peach** (`peach-light`, `peach`, `peach-dark`) provides warm supporting fills, gradients, tags, and gentle section tinting. It is not a second competing CTA accent.

### Neutral

**Dark Glass** combines `hero-night` or `shell-night` with translucent white surfaces, subtle borders, and the three glass text roles. **Light Content** combines white cards with ink/gray text and light neutral borders. Theme-aware controls use the semantic light/dark tokens; error colors remain functional rather than decorative accents.

**The Surface Context Rule.** Reuse the target route's existing dark, light, or theme-aware treatment; do not spread the cinematic hero or glass styling across all pages.

The Tailwind brand primary is a fixed hex value, while the CSS `--primary` and focus `--ring` use an HSL value that is not identical. Likewise, Tailwind `secondary` is fixed ink while CSS `--secondary` changes with theme. Preserve these distinctions instead of silently consolidating them during documentation. The global body's later white/ink base rule can override earlier semantic theme declarations; inspect the actual route before assuming a global dark canvas.

## Typography

Manrope is loaded through Next.js with Latin and Vietnamese subsets and weights (400–800). Playfair Display is loaded with the same language coverage and weights (500–700), exposed as a separate display font variable. Sans-serif is the default; do not convert all headings to serif.

The homepage headline is a tightly tracked, extra-bold Manrope display with a fluid size (`clamp(2.8rem, 5vw, 5.15rem)`), compact line height (0.98), and negative tracking (-0.055em). Cinematic serif titles use their own fluid scale; legal titles step from (28px) to (36px). These are contextual implementations, not one global heading size.

Body copy commonly uses (14–16px); card titles use (20px); uppercase eyebrow and badge labels use (12px) with extra tracking. The frontmatter samples observed roles, not a forced uniform type ratio. Preserve Vietnamese diacritics, readable line spacing, and existing hierarchy.

## Layout

**The Responsive Continuity Rule.** Keep the same identity while stacking, scrolling, or expanding existing layout patterns for the available width.

Most light sections use centered containers up to (1280px), with responsive horizontal gutters. The hero allows a wider content frame (1440px); homepage navigation caps at (1320px). Legal content is narrower inside a nested reading column (896px). Shared padding utilities step from (16px) to (32px) to (64px) horizontally and (48px) to (64px) to (80px) vertically; individual sections also use larger spacing.

Use the existing spacing rhythm in the frontmatter, but do not claim the source uses only these values: hero gutters include (20px), and cinematic layouts have fluid padding. Light cards generally use (24–32px) internal padding; glass legal cards expand from (24px) to (32px) and sometimes (40px).

The main breakpoints follow the unmodified Tailwind scale: small (640px), medium (768px), large (1024px), extra-large (1280px), and double-extra-large (1536px). Cinematic CSS also has a local layout threshold (900px). Homepage actions stack on small screens; feature cards use horizontal scroll/snap before becoming a five-column grid at large widths. Full desktop navigation appears at extra-large widths; smaller widths use a collapsible menu.

## Elevation & Depth

Dark Glass uses translucent fills, soft multi-layer shadows, thin bright borders, and backdrop blur (20px) or stronger blur (24px). The hero uses a distinct darker glass gradient and blur (18px). Legal backgrounds add CSS gradients, subtle star points, and noise-like patterning; preserve those effects only where they already belong.

Light Content uses white surfaces with structural shadows, often strengthening on hover. Admin Surfaces explicitly retain light semantic variables even if the global theme adds a dark class. This is intentional scoped behavior, not permission to remove light surfaces.

Glass hover utilities lift by (2px), brighten the border, and deepen the shadow; press states move down by (2px). Hero feature cards have a stronger (8px) lift and an animated orange border, with a dedicated reduced-motion path. UI transitions commonly take (200–300ms); hero transitions can take (500ms). Shadow and motion values live in the sidecar, not unsupported frontmatter groups.

## Shapes

The system has contextual corner sizes: shared compact controls derive small/medium/large radii from a base (8px), producing (4px), (6px), and (8px). Light content cards and homepage navigation use (16px); large glass cards use (24px). Legal actions use (18px). CTA links and tags commonly use fully rounded pills. Do not force every component to the same radius.

Thin borders define inputs and translucent glass surfaces. Cards clip imagery to their rounded silhouette. The homepage feature border is a signature animated treatment, not a default for ordinary cards.

## Components

### Buttons

Shared Button supports primary/default, destructive, outline, secondary, ghost, and link variants plus default, small, large, and icon sizes. Default controls are (40px) tall; small buttons are (36px), large buttons (44px), and icons (40px square). The primitive uses color transitions, a visible two-pixel focus ring with offset, and disabled opacity (50%) with pointer events suppressed. It does not implement a universal press translation.

Homepage CTA links are separate, bolder components: pill shape, orange gradient, (56px) minimum height, extra-bold uppercase text, glow, and slight hover lift. Homepage navigation CTA links are (48px) minimum height. Legal actions use rounded rectangular shapes with explicit hover, press, and focus states. Preserve these variants rather than replacing them all with the shared primitive.

### Cards / Containers

Light benefit and blog cards use white fills, rounded corners, image clipping where relevant, and increasing shadow on hover. Blog cards use peach tags and orange title/link emphasis. Glass containers use the shared surface tokens and larger corners; hero commitment and feature cards have their own darker surfaces. There is no generic `components/ui/card.tsx` in the current repository: these are existing patterns, not a documented reusable Card API.

### Inputs / Fields

Shared Input uses a theme-aware background, thin input border, compact radius, (40px) height, muted placeholder, visible ring and offset on keyboard focus, and disabled cursor/opacity treatment. Admin inputs can override it with white fills, gray borders, (44px) minimum height, and orange focus. Cinematic form fields instead use translucent dark fills, (14px) corners, and (46px) minimum height. Error presentation is controlled by the host form; do not invent a universal Input error API.

### Chips

Peach blog tags use pill shapes, small text, peach gradients, and a peach border. Glass chips use translucent fills and subtle borders, sometimes orange, with muted variants. Static tags are not buttons and do not need invented press states.

### Navigation

Homepage navigation is fixed, inset, translucent dark glass with rounded corners and a shadow. Other routes use a full-width white header with dark text and shadow. Active links have orange emphasis and an underline; mobile menus use rounded rows and tinted active backgrounds. The existing menu declares its expanded state and the active page. Focus behavior is not uniformly explicit across every navigation link; this document does not certify accessibility compliance.

### Signature Patterns and Gaps

The homepage combines existing destination/learner artwork, directional dark overlays, glowing CTAs, commitment glass, and horizontal feature cards. The world map and cinematic surfaces have dedicated implementations and should not become generic background replacements. No shared Tabs component exists, so do not assume a universal pill-tab API or claim that one was extracted.

## Do's and Don'ts

### Do:
- **Do** preserve the target route's dark, light, or theme-aware surface context.
- **Do** reuse Launch Orange, Warm Peach, the loaded fonts, and existing imagery.
- **Do** keep Admin Surfaces light, clear, and task-oriented.
- **Do** distinguish shared compact controls from hero and legal CTA variants.
- **Do** preserve existing reduced-motion paths when extending animated components.

### Don't:
- **Don't** turn the entire product into dark glass because the hero uses it.
- **Don't** add unrelated accents, replacement fonts, or a rebrand without explicit direction.
- **Don't** present missing Card or Tabs primitives as existing reusable APIs.
- **Don't** silently normalize conflicting CSS/Tailwind tokens during documentation.
- **Don't** claim rendered verification or accessibility compliance from this source scan.