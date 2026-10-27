# Moshi UI — Foundations

> Version: 0.1 (initial specification)
> Status: Active foundation; values may evolve through documented revisions
> Scope: Web-first, with shared principles for mobile and future branding work

## 1. Purpose

Moshi is a lightweight, agent-first design system for creating consistent, accessible, high-quality product interfaces. It provides shared design decisions that developers and coding agents can apply without inventing a new visual language for every screen.

Moshi defines **how interfaces should feel and behave**, independent of a particular framework or component library. Implementation tokens and component specifications must follow this document.

### Design direction

**Technical, precise, calm, and efficient.**

Moshi takes inspiration from the clarity, information hierarchy, and restrained visual density of tools such as Linear. This is inspiration, **not a mandate to reproduce Linear's interface, branding, or exact design assets**.

Moshi should feel:
- **Focused:** the primary task is immediately obvious.
- **Structured:** spacing, typography, and alignment reveal hierarchy.
- **Compact, not cramped:** show useful information without sacrificing legibility or touch access.
- **Quiet:** neutral surfaces, subtle borders, and minimal decoration.
- **Responsive:** layouts adapt to the screen and input method.
- **Reliable:** clear feedback, predictable behaviors, and accessible controls.

## 2. Design principles

These principles apply in order when a design decision is ambiguous.

1. **Clarity over decoration.** Every visual element must support comprehension or action.
2. **Hierarchy over uniform emphasis.** Primary content is prominent; navigation and metadata recede.
3. **Consistency over novelty.** Reuse approved tokens, components, and interaction patterns.
4. **Density with restraint.** Favor efficient desktop layouts, but never compress content beyond usability.
5. **Accessibility by default.** Keyboard, screen reader, color contrast, and touch requirements are part of the design, not later enhancements.
6. **Native where it matters.** Keep shared intent and visual semantics across platforms, while respecting web and mobile interaction conventions.

### Anti-patterns

Avoid gratuitous gradients, excessive shadows, glassmorphism, oversized cards, inconsistent corner radii, distracting motion, decorative icons with no purpose, and color used as the sole indicator of meaning.

## 3. Color foundations

Use **semantic color roles** rather than hardcoded colors in product UI code. The hex values below are the v0.1 source decisions; implementation in tokens/ will follow.

Light is the default theme for the first implementation. Dark tokens are defined now to keep the system coherent; a product does not need to ship dark mode until it is implemented and tested.

| Semantic role | Light | Dark | Usage |
| --- | --- | --- | --- |
| color.bg.canvas | #F8FAFC | #0B0D12 | Main application background |
| color.bg.surface | #FFFFFF | #121720 | Cards, menus, dialogs, panels |
| color.bg.muted | #F1F5F9 | #1E293B | Subtle regions and selected backgrounds |
| color.text.primary | #0F172A | #F8FAFC | Main text and headings |
| color.text.secondary | #475569 | #CBD5E1 | Supporting text and metadata |
| color.border.subtle | #CBD5E1 | #334155 | Dividers and low-emphasis boundaries |
| color.border.interactive | #64748B | #94A3B8 | Borders needed to identify controls |
| color.action.primary | #4F46E5 | #4F46E5 | Primary action background |
| color.action.onPrimary | #FFFFFF | #FFFFFF | Text/icons on primary actions |
| color.focus.ring | #4F46E5 | #A5B4FC | Visible keyboard focus |
| color.status.success | #166534 | #86EFAC | Success text and icons |
| color.status.warning | #92400E | #FCD34D | Warning text and icons |
| color.status.error | #B91C1C | #FCA5A5 | Error text and icons |

### Color rules

- Prefer the neutral palette for most of the interface. Reserve the accent for meaningful actions, selection, and focus.
- Use **color.action.onPrimary** only on **color.action.primary** or on a separately contrast-validated equivalent; it is not a general-purpose inverse text token.
- The status colors above are intended for text and icons on the documented neutral surfaces, not automatically for filled buttons or badges.
- Subtle borders are decorative separators. Where a control's boundary must be perceivable, use **color.border.interactive** or another contrast-validated treatment.
- Do not communicate success, warning, error, or selection through color alone.
- Check foreground/background contrast for every new combination, including hover, disabled, and selected states. A listed token does not automatically make every pairing accessible.
- Products may introduce additional brand colors only as explicitly documented theme overrides, not as arbitrary local hex values.

## 4. Typography

Moshi uses a modern sans-serif with a neutral, highly legible appearance.

- **Web font stack:** Inter, system-ui, sans-serif (load Inter only if the product chooses to bundle or serve it).
- **Mobile:** prefer each platform's system font and native text scaling unless a product has a documented reason not to.
- **Weights:** 400 regular, 500 medium, 600 semibold. Use 700 sparingly.
- **Alignment:** left-align body copy and dense information by default. Right-align numeric table columns where helpful.
- **Case:** use sentence case for headings, labels, tabs, and buttons. Do not use all caps for routine interface labels.

| Role | Web size / line height | Guidance |
| --- | --- | --- |
| Caption | 12px / 16px | Supplementary, noncritical metadata only |
| Small | 14px / 20px | Compact controls, table cells, secondary UI |
| Body | 16px / 24px | Reading content, forms, default prose |
| Subheading | 18px / 26px | Section titles |
| Heading | 24px / 32px | Page titles |
| Display | 30px / 38px | Rare, high-level introductions |

For dense desktop application areas, 14px / 20px is acceptable for primary UI labels when contrast and readability are maintained. On mobile, prefer 16px for body text and respect operating-system text size settings.

Do not encode hierarchy using font size alone; combine size with weight, spacing, and placement.

## 5. Spacing and layout

Use a **4px base grid**. All recurring spacing must map to an approved token.

| Token | Value |
| --- | --- |
| space.0 | 0px |
| space.1 | 4px |
| space.2 | 8px |
| space.3 | 12px |
| space.4 | 16px |
| space.5 | 20px |
| space.6 | 24px |
| space.8 | 32px |
| space.10 | 40px |
| space.12 | 48px |
| space.16 | 64px |

### Layout guidance

- Use 8–12px for compact related items, 16–24px for typical component padding or section gaps, and 32–48px between major page sections.
- Suggested page gutters: 16px on narrow screens, 24px on medium screens, 32px on wide screens. Adjust only when the actual content requires it.
- Prefer grids and consistent alignment over arbitrary absolute positioning.
- Prefer content-driven layouts and responsive containers to device-specific mockup widths.
- Dense data views may occupy available width; long-form reading content should use a comfortable line length (roughly 60–75 characters).
- Design narrow layouts first, then expand where useful. Never require horizontal scrolling for routine page navigation or forms. Exception: intentionally scrollable data tables may scroll within their region.

## 6. Shape, surfaces, and elevation

Moshi is mostly flat. Use borders and changes in surface tone before adding shadows.

| Token | Value | Example |
| --- | --- | --- |
| radius.none | 0px | Tables and flush dividers |
| radius.sm | 4px | Small badges |
| radius.md | 8px | Buttons, inputs, compact cards |
| radius.lg | 12px | Panels, cards, dialogs |
| radius.xl | 16px | Large surfaces when needed |
| radius.full | 9999px | Pills and circular controls |

- Use a 1px border for ordinary separators and boundaries.
- Keep most content on canvas or surface backgrounds.
- Use at most two subtle elevation levels when layering needs them (for example, menus and dialogs). Exact shadow tokens are deferred to the token implementation.
- Do not combine strong shadows with high-contrast borders unless needed for usability.

## 7. Controls, states, and density

Documented components will live in **COMPONENTS.md**. These are the shared rules they must follow.

- Desktop control heights: **32px compact**, **36px default**, **40px comfortable**. These are visual sizing presets, not universal target-size exemptions.
- Touch interfaces need larger hit targets: aim for at least **44pt on iOS** or **48dp on Android**, using transparent hit areas if necessary.
- Every interactive component needs defined **default, hover (where applicable), focus-visible, pressed, disabled, and loading** states as appropriate.
- The entire interactive hit region should respond, not only its icon or text.
- Icon-only buttons must have an accessible name.
- Destructive actions must be distinguishable and should confirm when consequences are difficult to reverse.
- Forms need persistent labels, clear help text when needed, and actionable inline errors. Placeholders never replace labels.
- Loading states must avoid unexpected layout shifts. Empty and error states should explain the next available action.

## 8. Accessibility baseline

**Target WCAG 2.2 Level AA for web applications**, with platform-appropriate equivalent practices for native mobile.

Minimum review checklist:

- Standard text contrast: **at least 4.5:1**; large text: **at least 3:1**, subject to WCAG definitions and exceptions.
- Essential non-text graphics and component boundaries: **at least 3:1** where WCAG requires it.
- Keyboard-accessible operation, logical focus order, and visible focus indicators.
- Web pointer targets meet WCAG 2.2 AA **24 × 24 CSS px minimum**, or satisfy a documented exception; prefer larger targets, especially on touch.
- Inputs expose programmatic labels, error text, and appropriate roles/states.
- Motion respects reduced-motion preferences. Do not make animation necessary to understand a task.
- Interfaces accommodate text zoom, dynamic type, and reflow without losing essential functionality.
- Test contrast and focus in **both** themes if both are implemented.

Reference: https://www.w3.org/TR/WCAG22/

## 9. Motion and interaction feedback

Motion should clarify cause and effect, not draw attention to itself.

- Micro-interaction transitions: **120–160ms**.
- State changes, small disclosures: **160–200ms**.
- Larger overlays: **200–240ms**, only when animation improves orientation.
- Prefer opacity and transform to layout-moving effects.
- Avoid bouncing, dramatic easing, unnecessary parallax, and looping decoration.
- With reduced-motion settings, remove nonessential transitions or use immediate state changes.
- Feedback must remain understandable without motion.

These durations are guidance until corresponding motion tokens are added.

## 10. Icons and imagery

- Choose one coherent icon style per product; prefer simple, recognizable outlines.
- Recommended web icon sizes: **16px, 20px, 24px**, based on context.
- Keep stroke weight visually consistent; icons support text rather than replacing meaningful labels by default.
- Avoid generic illustrations or ornamental images in dense product screens.
- Product photography and marketing imagery should be handled separately by future branding guidance.

## 11. Platform-specific application

### Web

- Use semantic HTML and reusable accessible components.
- Support keyboard and pointer interaction, responsive layouts, and visible focus.
- A compact information density is acceptable on desktop; preserve space around critical actions.
- Do not assume a mouse is present.

### Mobile

- Preserve semantic color roles, typographic hierarchy, spacing rhythm, and component purpose.
- Use native navigation, touch, and accessibility conventions appropriate to the mobile framework.
- Adapt density and targets for touch instead of shrinking web layouts.
- Respect safe areas, system appearance, dynamic type, and platform back navigation.

### Branding

Moshi's v0.1 brand direction is **restrained, professional, and precise**. Logo, wordmark, illustration style, marketing color palette, and product-specific brand identities are **not yet defined**. Do not fabricate those assets or claim they are approved.

## 12. Rules for developers and AI agents

When implementing UI with Moshi:

1. Read this document before building a screen.
2. Use the semantic roles, typography scale, spacing scale, and radius scale defined here.
3. Prefer existing project components and documented patterns; do not introduce a parallel component library without justification.
4. Do not use arbitrary hex colors, magic spacing numbers, or inconsistent corner radii.
5. Follow accessibility and platform conventions even when an inspiration screenshot does not.
6. For missing tokens or components, propose a documented extension rather than silently inventing a new standard.
7. Treat reference interfaces as inspiration; never duplicate their logos, protected assets, or product identity.
8. Validate responsive behavior, interaction states, keyboard navigation, and contrast before considering a screen finished.

### UI review checklist

- [ ] Clear primary task and visual hierarchy
- [ ] Uses Moshi semantic colors and spacing
- [ ] Typography and radii follow the defined scales
- [ ] Approved components reused where available
- [ ] Responsive layout and touch targets reviewed
- [ ] Keyboard focus, accessible names, and form feedback reviewed
- [ ] Light and dark themes validated where supported
- [ ] Exceptions documented rather than hidden in implementation

## 13. Scope and evolution

This is **Moshi v0.1**, intentionally small. It defines shared visual foundations, not a finished design library.

**Next artifacts:**
1. **tokens/** — machine-readable tokens and theme mappings derived from these values.
2. **COMPONENTS.md** — approved component anatomy, variants, interaction states, and usage.
3. **AGENTS.md** — a short operational entry point telling agents where to read Moshi rules.
4. **examples/** — one real screen used to validate and refine the system.

Do not add tooling, packages, or abstraction layers until a real product needs them. Changes to a foundation should update this document first, then the corresponding tokens, components, and examples.

### References

- [Linear — A calmer interface for a product in motion](https://linear.app/now/behind-the-latest-design-refresh) (design inspiration, not a specification)
- [W3C — WCAG 2.2](https://www.w3.org/TR/WCAG22/)
