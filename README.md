# Moshi UI

**Moshi** is an open-source, agent-first design system for building consistent, accessible, and reusable user interfaces across web and mobile applications.

It serves as a single source of truth for design decisions, helping developers and AI agents create cohesive product experiences.

## Core Pillars

- **Foundations** — Design principles, colors, typography, spacing, and design tokens.
- **Components** — Reusable UI building blocks with consistent styles and behaviors.
- **Agent Guidelines** — Clear instructions for AI agents to build interfaces following Moshi's standards.

## Philosophy

Keep interfaces simple, purposeful, and consistent. Prioritize usability, accessibility, and reusability over unnecessary complexity.

## Color tokens

Moshi v0.1 defines **38 semantic color roles** organized under `color.background`, `color.foreground`, and `color.border`, with shared light/dark sRGB HEX mappings for web and mobile.

- [Color specification and HEX mappings](COLORS.md)
- [Light theme](tokens/colors/semantic.light.tokens.json) and [dark theme](tokens/colors/semantic.dark.tokens.json)
- [Original Figma primitives](tokens/colors/primitives.tokens.json), [Radix 3.0.0 primitives](tokens/colors/radix.tokens.json), and [Moshi extensions](tokens/colors/extended.tokens.json)

Validate with `node scripts/validate-colors.mjs`.

## Typography tokens

Moshi Typography v0.1 provides **six semantic text styles** (`display`, `heading`, `subheading`, `body`, `small`, `caption`) with approved platform-specific baseline metrics, weights, and letter spacing.

- [Typography specification, accessibility rules and token architecture](TYPOGRAPHY.md)
- [Typography primitives](tokens/typography/primitives.tokens.json)
- Semantic mappings: [Web](tokens/typography/semantic.web.tokens.json) · [iOS](tokens/typography/semantic.ios.tokens.json) · [Android](tokens/typography/semantic.android.tokens.json)

Validate with `node scripts/validate-typography.mjs`. The system uses platform-native mobile font scaling and keeps typography independent of semantic text colors.

## Spacing & layout tokens

Moshi Spacing & Layout v0.1 publishes the approved 11-step numeric spacing scale and focused page/grid layout semantics, preserving content-driven grids and responsive platform behavior.

- [Complete spacing and layout specification](SPACING.md)
- [Numeric spacing primitives](tokens/spacing/primitives.tokens.json)
- Semantic aliases: [Web](tokens/spacing/semantic.web.tokens.json) · [iOS](tokens/spacing/semantic.ios.tokens.json) · [Android](tokens/spacing/semantic.android.tokens.json)

Validate with `node scripts/validate-spacing.mjs`. Native safe areas, accessible text growth and actual grid reflow require integration tests.

## Status

🚧 **Work in progress** — Moshi is in its early development stage.

## License

To be determined.