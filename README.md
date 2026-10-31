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

## Status

🚧 **Work in progress** — Moshi is in its early development stage.

## License

To be determined.