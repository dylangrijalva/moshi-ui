# Moshi UI — Components

> Version: v0.1 · Status: six framework-neutral component contracts, machine-readable and validated.
> Scope: first core component family for web, iOS, and Android. This is not yet a published React/SwiftUI/Compose component package.

Moshi components assemble the **approved Colors, Typography, Spacing & Layout, and Shape & Elevation foundations**. Components must not invent new global color, typography, or spacing primitives. Use existing semantic colors, existing typography roles, and component-owned sizing and padding. The source contracts below are intended for developers and coding agents; platform-native implementations should retain the same purpose and state semantics, not pretend every platform has identical APIs.

## First component batch

| Component | Machine-readable contract | Role |
| --- | --- | --- |
| Button | [button.json](components/button.json) | Labeled actions |
| Icon Button | [icon-button.json](components/icon-button.json) | Named icon-only actions |
| Text Field | [text-field.json](components/text-field.json) | Labeled single-line input |
| Checkbox | [checkbox.json](components/checkbox.json) | Binary/mixed selection |
| Card | [card.json](components/card.json) | Quiet grouped surface |
| Dialog | [dialog.json](components/dialog.json) | Accessible modal task or decision |

[Control primitives](tokens/components/primitives.tokens.json) encode the already approved 32/36/40px desktop control-height presets and the 24px web, 44pt iOS, and 48dp Android minimum interactive target guidance. **Height is a minimum, not a maximum**; content, browser zoom, large text, and locale growth may enlarge controls. The 24px web baseline comes from WCAG 2.2 AA, but **larger targets are preferred**, especially for touch input. Native 44/48 are minimum touch targets; they are not requirements to squeeze all text into a fixed-height rectangle.

Every contract defines anatomy, variants, sizes, supported states, token references, behavior, accessibility requirements and cross-platform application notes. Contract paths such as `typography.small` refer to **existing** tokens; `transparent` and `none` represent explicit absence of a fill/border/elevation and are not newly invented design tokens.

## Component sizing and density

| Web preset | Minimum visual height | Typical context |
| --- | ---: | --- |
| Compact | 32px | Dense desktop toolbars |
| Default | 36px | General desktop controls |
| Comfortable | 40px | Spacious forms and actions |

Buttons and text fields provide the three visual presets on web. Touch target minimums and text reflow take precedence over aesthetic compactness. Labels and captions use the six existing `typography.*` roles; the optional approved `font.weight.medium` primitive is allowed when extra control emphasis is useful. No `typography.button`, label, or code style is added.

Component padding and internal gaps use the existing `space.*` primitives directly. There is no global `layout.component.padding.*` semantic role. Card padding is explicitly component-owned: default `space.4` (16) or comfortable `space.6` (24).

## 1. Button

**Anatomy:** root, visible label, optional leading/trailing icon, optional progress indicator.

**Variants:** primary, secondary, destructive. **Sizes:** compact, default, comfortable.

| Variant | Default fill | Default text | Boundary | Hover/pressed fill |
| --- | --- | --- | --- | --- |
| Primary | `color.background.action.primary.default` | `color.foreground.onAction.primary` | Contextual; not mandatory | `color.background.action.primary.hover` |
| Secondary | Transparent | `color.foreground.action.secondary` | `color.border.interactive` | `color.background.action.secondary.hover` |
| Destructive | `color.background.action.destructive.default` | `color.foreground.onAction.destructive` | Contextual; not mandatory | `color.background.action.destructive.hover` |

**States:** default, hover, focus-visible, pressed, disabled, loading. Pressed reuses the existing hover fill—no new pressed semantic colors. A disabled action is noninteractive and uses the approved disabled colors; loading prevents duplicate activation, preserves control footprint, and communicates status programmatically. No product operation should be marked successful merely when loading starts.

Web: use a real `button` with an explicit `type`. Keep keyboard Space/Enter activation, visible focus, and accessible naming. Optional icons do not replace the visible label.

## 2. Icon Button

Inherits Button variants, sizing logic, state behavior and theme color semantics. The default visible glyph sizes come from the existing icon guidance: 16px compact and 20px default/comfortable on web. This does not shrink the hit area: enforce 24 CSS px on web and 44pt/48dp native, preferring larger touch targets.

**A programmatic accessible name is mandatory** even when the button shows only an icon. A tooltip may help sighted users but is not an accessible-name substitute. Use a native button/control with keyboard or native activation semantics.

## 3. Text Field

**Anatomy:** persistent visible label, one-line input, optional leading/trailing content, help text and actionable error message.

**States:** default, hover, focus-visible, disabled, read-only, invalid. Input and label use existing `typography.body` / `typography.small` roles. Existing `color.background.surface` and `color.border.default` establish the neutral field. Hover may use `color.border.strong`. Invalid uses `color.border.status.error` **and** a textual error in `color.foreground.status.error`.

Never use a placeholder in place of a persistent label. Web associates `label` and `input` and connects help/error descriptions with `aria-describedby`, `aria-invalid`, and native required/disabled/read-only properties. Do not announce invalid feedback on every keystroke unnecessarily.

## 4. Checkbox

**Anatomy:** checkbox control, checkmark or mixed-state indicator, associated visible label and optional description. Native checkbox semantics should communicate unchecked/checked/indeterminate and disabled. Checked fill uses `color.background.action.primary.default` with `color.foreground.onAction.primary` for the mark; an unchecked boundary uses `color.border.default`.

Web uses a native `input type="checkbox"`. The 16px visual mark is not the whole interaction target: the label and container must remain accessible for touch. Mixed state is set programmatically when appropriate; checked/unchecked state is never identified only by color.

## 5. Card

**Anatomy:** content surface, optional header/body/footer. **Variants:** outlined (default) or plain. **Padding:** 16 or 24 from component-owned primitive choices. Surface uses `color.background.surface`, outline uses `color.border.default`, radius uses `radius.lg`, and default elevation is **none**.

A Card is not interactive by default. When it contains an action, use an explicit Button or link, rather than both a clickable card wrapper and nested controls. Cards in a grid stretch to their natural row height unless that grid intentionally opts into intrinsic item heights.

## 6. Dialog

**Anatomy:** modal surface, accessible title, optional description, body, action area and backdrop. Use `color.background.elevated` for the surface, `color.background.overlay` for the scrim, `radius.lg` for the surface, and existing Button specs for actions. `elevation.level2` is an **optional** depth cue, not a default mandatory shadow.

When open, underlying content must be unavailable for interaction. Move focus into the modal, retain keyboard focus inside it, and restore previous focus when dismissed. Support Escape/cancel where safe, with an explicit alternate exit for non-dismissible critical flows. Do not use only visual layering to express modality. Native adaptations must respect platform back navigation, accessibility services, safe areas and text scaling.

## Shared interaction and accessibility rules

- Keyboard, pointer, screen-reader and touch behavior are part of the component contract, not optional enhancements.
- Interactive hit regions use approved platform minimums. Never confuse a small visual icon with the minimum touch area.
- Disabled states must actually disable activation; loading states must not trigger duplicate actions.
- Focus indicators use `color.border.focus` and a contextual contrasting neutral band when necessary; light-canvas contrast was previously documented as insufficient without contextual help.
- Use readable error text and programmatic invalid state; placeholders and color changes are not adequate labels or error descriptions.
- Preserve semantic foreground/background contrast in **both** approved themes. Avoid adding new raw HEX values.
- Content-driven width and minimum-height controls should reflow under browser zoom, Dynamic Type, Android nonlinear font scaling and translation.
- Ordinary cards use no shadow. Use optional elevations only where the surface/tone/border hierarchy needs them.
- Do not invent component variants, names, focus rings or typography roles beyond those specified in v0.1.

## Implementation boundary

These are **framework-neutral behavioral and token contracts** plus a browser reference example. They deliberately do **not** claim to be a production-ready React, SwiftUI or Compose library. Platform adapters, full component test suites, keyboard/accessibility integration tests, animated busy states and cross-device validation belong to the implementation phase.

See [the browser component reference](examples/components.html) for a dependency-free, HTML-native demonstration. Its stylesheet is generated from the same existing semantic tokens, not a separate color system.

Run:

~~~sh
node scripts/validate-components.mjs
node scripts/build-component-reference.mjs --check
node scripts/validate-colors.mjs
node scripts/validate-typography.mjs
node scripts/validate-spacing.mjs
node scripts/validate-shape.mjs
~~~

The static validator checks the exact six component contracts, known variants and states, approved token references, control sizes and key accessibility requirements. It does not prove real screen-reader, native-platform, focus trapping, or rendered contrast behavior.

