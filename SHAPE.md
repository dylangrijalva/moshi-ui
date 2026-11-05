# Moshi UI — Shape, Surfaces & Elevation

> Version: v0.1 · Status: implemented as source tokens.
> Scope: six approved radii, ordinary border width, restrained surface hierarchy, and two optional shadow elevations across web, iOS and Android.

Moshi is **flat by default**. Express hierarchy using the previously approved semantic surface colors and borders before using shadows. The present specification implements the approved values in [FOUNDATIONS.md](FOUNDATIONS.md), without changing any Color, Typography, or Spacing tokens.

## Sources

| File | Responsibility |
| --- | --- |
| [Shape primitives](tokens/shape/primitives.tokens.json) | Six radii, ordinary 1-unit border width |
| [Light elevation semantics](tokens/shape/elevation.light.tokens.json) | Two optional shadow levels for light theme |
| [Dark elevation semantics](tokens/shape/elevation.dark.tokens.json) | The same two levels with appropriate existing dark alpha colors |
| [Validator](scripts/validate-shape.mjs) | Exact value, alias resolution, theme and policy checks |

Load the shape primitives with the existing [spacing primitives](tokens/spacing/primitives.tokens.json), [extended color primitives](tokens/colors/extended.tokens.json), and **one** elevation theme file for the active color theme. Keep shape primitives shared across all three platforms; use platform-specific code when rendering shadows.

### Approved radii

| Primitive | Web | iOS | Android | Common example |
| --- | ---: | ---: | ---: | --- |
| `radius.none` | 0px | 0pt | 0dp | Tables and flush dividers |
| `radius.sm` | 4px | 4pt | 4dp | Small badges |
| `radius.md` | 8px | 8pt | 8dp | Buttons, inputs, compact cards |
| `radius.lg` | 12px | 12pt | 12dp | Panels, cards, dialogs |
| `radius.xl` | 16px | 16pt | 16dp | Large surfaces when justified |
| `radius.full` | 9999px | Fully rounded | Fully rounded | Pills and circular controls |

The `radius.full` source value stays **9999**, exactly as approved. It is a fully-rounded **sentinel**, not a requirement that a native platform create a gigantic 9999pt/9999dp physical radius. CSS can use `border-radius: 9999px`; SwiftUI, UIKit, and Compose may use the appropriate capsule/circle shape while preserving the same intent.

Radius values are primitive choices, not automatically assigned to all components. A component specification selects its radius explicitly; do not add redundant component-radius aliases before components exist.

### Borders

`border.width.default = 1` is the standard border or divider thickness: **1 CSS px, 1 iOS pt, or 1 Android dp** as a logical layout unit. This deliberately sits outside the 4px *spacing* grid because stroke widths are not spacing increments.

Use the already approved semantic border colors such as `color.border.default`, `color.border.strong` and `color.border.interactive`. Do not introduce or copy new shape-specific color values. A 1-unit default border is **not** a complete focus-indicator prescription: focus visibility and contrast still follow the approved `color.border.focus` and its contextual contrasting-band guidance. Fine hairlines or platform pixel-snapping require explicit component-level review; they are not new v0.1 tokens.

## Surface hierarchy

The canonical surface colors are part of [Colors v0.1](COLORS.md); do **not** reproduce their HEX values in shape token files.

| Existing semantic role | Use |
| --- | --- |
| `color.background.canvas` | Base application background |
| `color.background.surface` | Standard content surfaces, panels and controls |
| `color.background.elevated` | Floating or layered surfaces when differentiation is needed |
| `color.border.default` | Subtle boundaries and separators |
| `color.border.strong` | Higher-contrast boundaries where needed |
| `color.background.overlay` | Modal scrim behind overlays; **not** a drop shadow |

Most cards and panels should remain **shadow-free**. Prefer a suitable surface tone or a subtle border. Do not automatically apply both a strong border and a shadow.

## Optional elevation levels

Only **two** shadow levels are exposed, and neither is the default. They share geometry across themes and platforms and reuse the **existing** `color.moshi.alpha.black.*` palette.

| Token | Offset X / Y | Blur | Spread | Light color alias | Dark color alias |
| --- | --- | --- | --- | --- | --- |
| `elevation.level1` | 0 / 4 | 12 | 0 | `{color.moshi.alpha.black.12}` | `{color.moshi.alpha.black.20}` |
| `elevation.level2` | 0 / 8 | 24 | 0 | `{color.moshi.alpha.black.20}` | `{color.moshi.alpha.black.40}` |

Geometry comes from approved spacing primitives: level 1 uses `space.0`, `space.1`, `space.3` and `space.0`; level 2 uses `space.0`, `space.2`, `space.6` and `space.0`. The source numeric values are interpreted as px/pt/dp using the same shared unit convention as Spacing & Layout.

**Usage:** `level1` may help menus, popovers and small floating surfaces; `level2` may help dialogs or more prominent transient overlays. If surface tone and borders sufficiently distinguish the layer, use **no shadow**. Shadow levels are alternative choices, **not additive layers to stack together**. Do not invent a third elevation level or treat height as a mandatory measure of z-order.

The dark theme uses approved black alpha primitives to maintain separation without changing the fixed color palette. When rendering on dark backgrounds, the approved `color.background.elevated` often provides clearer hierarchy than shadow alone. Shadows are **not** a substitute for a visible control boundary or accessible focus ring.

### Web consumption example

The following illustrates an adapter-generated CSS layer (Moshi v0.1 does not yet ship a CSS/token exporter):

~~~css
:root {
  --moshi-radius-md: 8px;
  --moshi-radius-lg: 12px;
  --moshi-radius-full: 9999px;
  --moshi-border-width-default: 1px;
  --moshi-elevation-level1: 0 4px 12px 0 #0000001F;
  --moshi-elevation-level2: 0 8px 24px 0 #00000033;
}
[data-theme="dark"] {
  --moshi-elevation-level1: 0 4px 12px 0 #00000033;
  --moshi-elevation-level2: 0 8px 24px 0 #00000066;
}
.card {
  border: var(--moshi-border-width-default) solid var(--moshi-color-border-default);
  border-radius: var(--moshi-radius-lg);
  background: var(--moshi-color-background-surface);
  /* Deliberately no default box shadow. */
}
.popover {
  background: var(--moshi-color-background-elevated);
  box-shadow: var(--moshi-elevation-level1);
}
.dialog {
  background: var(--moshi-color-background-elevated);
  box-shadow: var(--moshi-elevation-level2);
}
~~~

The sample alpha HEX values are **resolved from existing Moshi color primitives**; they are not newly approved color tokens. The CSS variable names are illustrative exporter output, not an existing library API.

### Native rendering

- **iOS:** Resolve radii in pt and ordinary borders in pt; use native corner clipping/shape APIs. If opting into elevation, map offsets, blur intent, and alpha to appropriate UIKit/SwiftUI shadow properties. Native shadow radius is not guaranteed to match CSS blur one-for-one.
- **Android:** Resolve radii and border widths in dp. Jetpack Compose or Android View elevation/shadow rendering may differ in spread, blur, and ambient-light assumptions. Choose the closest restrained native appearance without requiring exact raster parity.
- **Both:** Theme-select the shadow color alias. Respect safe areas, touch targets, large text and rendering performance. If shadow APIs cannot reproduce an approved visual subtly, rely on the already-approved surfaces/borders rather than inventing strong shadows.

## Accessibility and agent rules

- Reuse semantic background and border colors from the active color theme; do not hardcode surface colors.
- Do not use elevation alone to communicate selected, focused, disabled, error, or interactive state.
- Verify visible focus and boundary contrast against the actual surrounding colors, especially in the light canvas where `color.border.focus` needs a contextual neutral band.
- Choose the smallest radius appropriate to the documented component; do not apply pills to everything.
- Shadows should never obscure content, form labels or hit targets.
- Do not confuse `color.background.overlay` (scrim) with `elevation.level2` (surface shadow).
- Let component specifications establish padding, dimensions, and state behavior independently.

## Validation

Run:

~~~sh
node scripts/validate-shape.mjs
node scripts/validate-colors.mjs
node scripts/validate-typography.mjs
node scripts/validate-spacing.mjs
~~~

The shape validator verifies all seven numeric shape/border primitives, the two theme-specific elevation definitions, exact spacing and existing color references, and the absence of extra shadow roles. It also checks for core documentation rules.

**Static checks do not prove** actual rendering equivalence, accessibility contrast, shadow appearance, or component behavior. Review representative light and dark components across real web/iOS/Android implementations before publishing production UI.

