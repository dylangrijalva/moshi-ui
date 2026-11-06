---
version: alpha
name: Moshi UI
description: "Agent-first minimalist cross-platform design system; web-compatible projection of canonical Moshi v0.1 tokens."
colors:
  light-background-canvas: "#F0F0F2"
  light-background-surface: "#FFFFFF"
  light-background-elevated: "#FFFFFF"
  light-background-selected: "#F7F7F7"
  light-background-disabled: "#F0F0F0"
  light-background-inverse: "#252525"
  light-background-overlay: "#00000066"
  light-background-brand: "#FF4C00"
  light-background-action-primary-default: "#2B4FB9"
  light-background-action-primary-hover: "#002182"
  light-background-action-secondary-hover: "#E7EAF6"
  light-background-action-destructive-default: "#CA244D"
  light-background-action-destructive-hover: "#64172B"
  light-background-status-success: "#E9F6E9"
  light-background-status-warning: "#FFF7C2"
  light-background-status-error: "#FEEAED"
  light-background-status-info: "#E6F4FE"
  light-foreground-primary: "#252525"
  light-foreground-secondary: "#666666"
  light-foreground-disabled: "#7A7A7A"
  light-foreground-inverse: "#FFFFFF"
  light-foreground-link: "#2B4FB9"
  light-foreground-on-action-primary: "#FFFFFF"
  light-foreground-on-action-destructive: "#FFFFFF"
  light-foreground-action-secondary: "#2B4FB9"
  light-foreground-action-destructive: "#CA244D"
  light-foreground-status-success: "#2A7E3B"
  light-foreground-status-warning: "#4F3422"
  light-foreground-status-error: "#CA244D"
  light-foreground-status-info: "#113264"
  light-border-default: "#0000001F"
  light-border-strong: "#00000033"
  light-border-interactive: "#5069C3"
  light-border-focus: "#558EDD"
  light-border-status-success: "#B2DDB5"
  light-border-status-warning: "#F3D673"
  light-border-status-error: "#F8BFC8"
  light-border-status-info: "#ACD8FC"
  dark-background-canvas: "#131419"
  dark-background-surface: "#262A34"
  dark-background-elevated: "#32353F"
  dark-background-selected: "#32353F"
  dark-background-disabled: "#1E222C"
  dark-background-inverse: "#FFFFFF"
  dark-background-overlay: "#00000099"
  dark-background-brand: "#FF4C00"
  dark-background-action-primary-default: "#2B4FB9"
  dark-background-action-primary-hover: "#5069C3"
  dark-background-action-secondary-hover: "#213554"
  dark-background-action-destructive-default: "#B3445A"
  dark-background-action-destructive-hover: "#883447"
  dark-background-status-success: "#182A1D"
  dark-background-status-warning: "#302008"
  dark-background-status-error: "#3B121E"
  dark-background-status-info: "#0D2847"
  dark-foreground-primary: "#FFFFFF"
  dark-foreground-secondary: "#FFFFFFCC"
  dark-foreground-disabled: "#FFFFFF80"
  dark-foreground-inverse: "#252525"
  dark-foreground-link: "#9DA9CA"
  dark-foreground-on-action-primary: "#FFFFFF"
  dark-foreground-on-action-destructive: "#FFFFFF"
  dark-foreground-action-secondary: "#9DA9CA"
  dark-foreground-action-destructive: "#FF949D"
  dark-foreground-status-success: "#71D083"
  dark-foreground-status-warning: "#FFCA16"
  dark-foreground-status-error: "#FF949D"
  dark-foreground-status-info: "#70B8FF"
  dark-border-default: "#FFFFFF1F"
  dark-border-strong: "#FFFFFF33"
  dark-border-interactive: "#9DA9CA"
  dark-border-focus: "#558EDD"
  dark-border-status-success: "#2D5637"
  dark-border-status-warning: "#5C3D05"
  dark-border-status-error: "#6F2539"
  dark-border-status-info: "#104D87"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "30px"
    fontWeight: 600
    lineHeight: "38px"
    letterSpacing: "-0.02em"
  heading:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: "32px"
    letterSpacing: "-0.01em"
  subheading:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: "26px"
    letterSpacing: "0px"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
    letterSpacing: "0px"
  small:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
    letterSpacing: "0px"
  caption:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
    letterSpacing: "0px"
spacing:
  space-0: "0px"
  space-1: "4px"
  space-2: "8px"
  space-3: "12px"
  space-4: "16px"
  space-5: "20px"
  space-6: "24px"
  space-8: "32px"
  space-10: "40px"
  space-12: "48px"
  space-16: "64px"
  page-gutter-narrow: "{spacing.space-4}"
  page-gutter-medium: "{spacing.space-6}"
  page-gutter-wide: "{spacing.space-8}"
  page-section-gap-compact: "{spacing.space-8}"
  page-section-gap-comfortable: "{spacing.space-12}"
  section-header-gap: "{spacing.space-4}"
  grid-gap-compact: "{spacing.space-3}"
  grid-gap-comfortable: "{spacing.space-6}"
rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
components:
  button-primary-light:
    backgroundColor: "{colors.light-background-action-primary-default}"
    textColor: "{colors.light-foreground-on-action-primary}"
    typography: "{typography.small}"
    rounded: "{rounded.md}"
    padding: "{spacing.space-3}"
    height: "36px"
  button-primary-hover-light:
    backgroundColor: "{colors.light-background-action-primary-hover}"
    textColor: "{colors.light-foreground-on-action-primary}"
    typography: "{typography.small}"
    rounded: "{rounded.md}"
    padding: "{spacing.space-3}"
    height: "36px"
  button-destructive-light:
    backgroundColor: "{colors.light-background-action-destructive-default}"
    textColor: "{colors.light-foreground-on-action-destructive}"
    typography: "{typography.small}"
    rounded: "{rounded.md}"
    padding: "{spacing.space-3}"
    height: "36px"
  button-destructive-hover-light:
    backgroundColor: "{colors.light-background-action-destructive-hover}"
    textColor: "{colors.light-foreground-on-action-destructive}"
    typography: "{typography.small}"
    rounded: "{rounded.md}"
    padding: "{spacing.space-3}"
    height: "36px"
  button-secondary-light:
    textColor: "{colors.light-foreground-action-secondary}"
    typography: "{typography.small}"
    rounded: "{rounded.md}"
    padding: "{spacing.space-3}"
    height: "36px"
  button-secondary-hover-light:
    backgroundColor: "{colors.light-background-action-secondary-hover}"
    textColor: "{colors.light-foreground-action-secondary}"
    typography: "{typography.small}"
    rounded: "{rounded.md}"
    padding: "{spacing.space-3}"
    height: "36px"
  icon-button-secondary-light:
    textColor: "{colors.light-foreground-action-secondary}"
    rounded: "{rounded.md}"
    size: "36px"
  text-field-light:
    backgroundColor: "{colors.light-background-surface}"
    textColor: "{colors.light-foreground-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "{spacing.space-3}"
    height: "36px"
  text-field-invalid-light:
    backgroundColor: "{colors.light-background-surface}"
    textColor: "{colors.light-foreground-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "{spacing.space-3}"
    height: "36px"
  checkbox-checked-light:
    backgroundColor: "{colors.light-background-action-primary-default}"
    textColor: "{colors.light-foreground-on-action-primary}"
    rounded: "{rounded.sm}"
    size: "16px"
  card-light:
    backgroundColor: "{colors.light-background-surface}"
    textColor: "{colors.light-foreground-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "{spacing.space-4}"
  dialog-light:
    backgroundColor: "{colors.light-background-elevated}"
    textColor: "{colors.light-foreground-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "{spacing.space-6}"
  button-primary-dark:
    backgroundColor: "{colors.dark-background-action-primary-default}"
    textColor: "{colors.dark-foreground-on-action-primary}"
    typography: "{typography.small}"
    rounded: "{rounded.md}"
    padding: "{spacing.space-3}"
    height: "36px"
  button-primary-hover-dark:
    backgroundColor: "{colors.dark-background-action-primary-hover}"
    textColor: "{colors.dark-foreground-on-action-primary}"
    typography: "{typography.small}"
    rounded: "{rounded.md}"
    padding: "{spacing.space-3}"
    height: "36px"
  button-destructive-dark:
    backgroundColor: "{colors.dark-background-action-destructive-default}"
    textColor: "{colors.dark-foreground-on-action-destructive}"
    typography: "{typography.small}"
    rounded: "{rounded.md}"
    padding: "{spacing.space-3}"
    height: "36px"
  button-destructive-hover-dark:
    backgroundColor: "{colors.dark-background-action-destructive-hover}"
    textColor: "{colors.dark-foreground-on-action-destructive}"
    typography: "{typography.small}"
    rounded: "{rounded.md}"
    padding: "{spacing.space-3}"
    height: "36px"
  button-secondary-dark:
    textColor: "{colors.dark-foreground-action-secondary}"
    typography: "{typography.small}"
    rounded: "{rounded.md}"
    padding: "{spacing.space-3}"
    height: "36px"
  button-secondary-hover-dark:
    backgroundColor: "{colors.dark-background-action-secondary-hover}"
    textColor: "{colors.dark-foreground-action-secondary}"
    typography: "{typography.small}"
    rounded: "{rounded.md}"
    padding: "{spacing.space-3}"
    height: "36px"
  icon-button-secondary-dark:
    textColor: "{colors.dark-foreground-action-secondary}"
    rounded: "{rounded.md}"
    size: "36px"
  text-field-dark:
    backgroundColor: "{colors.dark-background-surface}"
    textColor: "{colors.dark-foreground-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "{spacing.space-3}"
    height: "36px"
  text-field-invalid-dark:
    backgroundColor: "{colors.dark-background-surface}"
    textColor: "{colors.dark-foreground-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "{spacing.space-3}"
    height: "36px"
  checkbox-checked-dark:
    backgroundColor: "{colors.dark-background-action-primary-default}"
    textColor: "{colors.dark-foreground-on-action-primary}"
    rounded: "{rounded.sm}"
    size: "16px"
  card-dark:
    backgroundColor: "{colors.dark-background-surface}"
    textColor: "{colors.dark-foreground-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "{spacing.space-4}"
  dialog-dark:
    backgroundColor: "{colors.dark-background-elevated}"
    textColor: "{colors.dark-foreground-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "{spacing.space-6}"
---

# Moshi UI — DESIGN.md

## Overview

**Moshi UI** is an open-source, agent-first design system for consistent web, iOS and Android applications. Its visual direction is **technical, precise, calm, efficient, compact without becoming cramped**. Prioritize clarity, information hierarchy, accessible controls, quiet neutral surfaces, and content-responsive layouts. Inspiration from Linear is conceptual, not permission to replicate its designs or brand assets.

**Authority:** This file is a **generated, web-compatible DESIGN.md projection**, not the primary source of approved design decisions. Canonical sources are [FOUNDATIONS.md](FOUNDATIONS.md), [COLORS.md](COLORS.md), [TYPOGRAPHY.md](TYPOGRAPHY.md), [SPACING.md](SPACING.md), [SHAPE.md](SHAPE.md), [COMPONENTS.md](COMPONENTS.md), and their `tokens/` and `components/` JSON files. When a detail is absent from this alpha format, follow those sources; do not improvise new tokens. To update this file after an approved foundation change, run `node scripts/build-design-md.mjs`.

## Colors

The YAML `colors` map contains **all 38 approved semantic roles, resolved for both light and dark themes** (76 values). Names are flattened for this specification: `light-background-canvas` corresponds to source `color.background.canvas` in the light theme, `dark-foreground-primary` to `color.foreground.primary` in dark. They are **not a separate palette**. The authoritative alias provenance and contrast guidance are in [COLORS.md](COLORS.md).

The identity accent is **brand orange** (`light-background-brand` / `dark-background-brand`, #FF4C00). Primary actions are **blue** (`light-background-action-primary-default` / `dark-background-action-primary-default`, #2B4FB9); never confuse brand orange with the default call to action. Use approved surface tones and semantic foreground/border roles, rather than hardcoded hex colors.

Resolve **one color theme at a time**. A component with a `-light` suffix uses light roles; `-dark` uses dark roles. Secondary action default background is transparent with `color.border.interactive`; hover and pressed share the approved secondary-hover surface. Disabled controls use existing disabled roles; this is not a text-contrast promise for disabled content. Status backgrounds, text and outlines are separate semantic roles; error and destructive action use distinct roles even where palette values overlap.

Aim for **WCAG 2.2 AA** on actual combinations, checking normal text ≥4.5:1 and non-text contrast ≥3:1 where applicable. The approved focus blue (`color.border.focus`, #558EDD) has insufficient standalone contrast against some light surfaces; add the specified **contextual neutral contrasting band**, not a new focus color. Never rely on background, color or shadow alone to communicate state. There is **no approved on-brand foreground color** for text over orange; validate any such use separately.

## Typography

The six YAML `typography` entries exactly reproduce the approved **web baseline** styles: `display`, `heading`, `subheading`, `body`, `small` and `caption`. Font is **Inter, system-ui, sans-serif**, with Inter optional and not bundled. Preserve the approved font size, absolute line height, weight and tracking; a zero-tracking source value is expressed as `0px` to satisfy the DESIGN.md alpha dimension syntax. Monospace is an opt-in family for technical content, not a seventh semantic style.

For **iOS and Android**, do not reuse web baseline sizes blindly: use [native typography tokens](tokens/typography/) with iOS pt/Dynamic Type and Android sp/nonlinear font scaling. The alpha schema does not encode those native units or scaling curves. Adapt controls to text growth and browser zoom; never cap accessibility text scaling. Keep foreground color independent of typography. Use sentence case; reserve captions for supplementary information.

## Layout

The `spacing` map contains the complete approved **11-step 4px-based scale** (`space-0` through `space-16`) and the **eight focused semantic layout aliases** for page gutters, section gaps and grid gaps. All YAML distances are web CSS px. In native implementations, the same numeric values use **iOS pt** or **Android dp**, not physical pixels; do not scale layout spacing by a text font multiplier.

Page gutters are `page-gutter-narrow` = 16px, `page-gutter-medium` = 24px and `page-gutter-wide` = 32px. Web page-gutter breakpoints only: viewport <640px narrow; 640–1023px medium; ≥1024px wide. These breakpoints are **not** universal grid or component breakpoints. Native gutter selection depends on usable content space. Apply OS safe-area insets **once at the correct boundary** and then apply Moshi gutters inside.

Choose `page-section-gap-compact` (32px) for dense workspaces and `page-section-gap-comfortable` (48px) for reading-oriented sections **by content density**, not viewport. Heading-to-section-body uses `section-header-gap` (16px). One-dimensional stacks use primitives directly (typically `space-2` or `space-3`); component padding is component-owned. No global stack gap, component padding, grid item minimum width or universal page maximum width tokens are approved.

Use **content-driven grids**, not a mandatory 12-column system. Items provide their own minimum usable width; tracks distribute width equally and wrap or stack when necessary. Incomplete final rows preserve established column width. Items stretch to the natural maximum height **within their row**, not to fixed heights or across rows. Grid gaps are compact 12px or comfortable 24px, symmetric by default; justify per-axis exceptions.

Long-form reading content uses **70ch maximum on web**, shrinking to available width. Native implementations approximate a 70-character reading measure using current typography metrics and accessibility scaling. Dashboards and tables may use full available width; routine forms and navigation should not require horizontal scrolling.

## Elevation & Depth

Moshi is **flat by default**. Prefer existing semantic canvas, surface, elevated surface and border color roles for hierarchy. Normal cards have **no shadow**. There are exactly two optional, mutually exclusive shadow levels (see [SHAPE.md](SHAPE.md)): `elevation.level1` offset 0/4, blur 12, spread 0; `elevation.level2` offset 0/8, blur 24, spread 0, using approved light/dark alpha-black colors. The DESIGN.md alpha schema has no shadow group, so shadow geometry remains authoritative in [the elevation tokens](tokens/shape/).

Use level1 only for suitable small floating surfaces; level2 optionally for dialogs and prominent overlays if borders and tone are insufficient. Do not stack both shadows. A modal scrim uses `color.background.overlay`, **not** a drop shadow. Neither elevation nor borders alone establish accessible focus.

## Shapes

The `rounded` map reproduces every approved `radius.*` primitive: none 0px, sm 4px, md 8px, lg 12px, xl 16px, full 9999px. `full` is a **fully rounded pill/circle sentinel**, not a requirement to measure 9999 physical pt/dp on native platforms.

Standard separators and boundaries use `border.width.default` = **1 CSS px / 1 iOS pt / 1 Android dp**. Border colors come from the canonical semantic color family. Radius choices are component-owned: typically md for buttons and text fields, sm for checkbox, lg for cards and dialogs. Avoid pill styling everywhere or strong borders combined with strong shadows.

## Components

The `components` YAML map is an **alpha-schema style projection** of the six approved contracts, flattened into light/dark variants and significant visual states. It is **not** a runtime implementation or a substitute for the machine-readable [component contracts](components/) and [COMPONENTS.md](COMPONENTS.md).

- **Button:** primary (blue fill, on-action text), secondary (transparent fill, interactive blue border and blue foreground), destructive (destructive fill/on-action). Hover/pressed reuse the existing hover fills. Compact/default/comfortable web minimum visual heights: 32/36/40px, with content growth and proper hit targets. Disabled and loading are programmatic behavior as well as visual states.
- **Icon Button:** Button semantics and variants, but a nonempty **accessible name** is mandatory even when a tooltip is displayed. Visual glyph size is not hit-target size.
- **Text Field:** persistent visible label; help and error text; use semantic field border and explicit invalid indication. Placeholders are not labels. Connect labels and error descriptions to the input.
- **Checkbox:** support checked, unchecked, programmatic indeterminate and disabled. The 16px visual indicator is not the full target; selection needs a check or mixed mark, not only a fill color.
- **Card:** quiet surface with optional border, radius lg, 16px default padding (24px comfortable), **no default shadow**. A card is not automatically an interactive wrapper.
- **Dialog:** modal elevated surface and scrim, radius lg, internal padding 24px. Correct modal focus entry, containment and restoration, cancellation/back behavior, and titled semantics are required. Level2 shadow is optional.

For interaction hit areas, follow the minimums documented in [COMPONENTS.md](COMPONENTS.md): **24 CSS px web** subject to WCAG exceptions (larger preferred), **44pt iOS**, **48dp Android**. This alpha YAML representation does not encode complete native interaction semantics. Do not invent unapproved variants or change component anatomy to fit YAML limitations.

## Do's and Don'ts

- **Do** read this file plus the canonical source specifications before generating or reviewing UI. **Don't** treat this generated projection as a replacement source of truth.
- **Do** reuse exactly the approved semantic color roles, typography roles, spacing primitives, radius values and component contracts. **Don't** invent new HEX colors, type styles, gap aliases or decorative elevation.
- **Do** prefer functional layouts and accessible feedback. **Don't** copy another product's brand or protected assets.
- **Do** test both themes, keyboard navigation, visible focus, screen reader labels, zoom, contrast and native Dynamic Type/Android scaling. **Don't** assume static validation proves rendering or accessibility compliance.
- **Do** use content-driven widths, safe areas, touch targets and thoughtful state feedback. **Don't** use horizontal scrolling for routine forms, fixed card heights, placeholder-only labels or color-only error states.
- **Do** propose documented extensions when a genuinely new design decision is necessary. **Don't** silently change the approved canonical files.

**Validation:** `node scripts/build-design-md.mjs --check` verifies this file exactly matches approved source tokens and this approved guidance. The official alpha format can also be linted with `npx @google/design.md lint DESIGN.md`. GitHub Actions has previously failed before runner allocation; a workflow failure with zero executed steps is not a token validation result.
