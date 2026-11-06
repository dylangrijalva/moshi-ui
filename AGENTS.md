# Instructions for coding agents — Moshi UI

Moshi UI is an open-source, agent-first design system, not yet a production React, SwiftUI or Compose component package.

1. Read [DESIGN.md](DESIGN.md) first for the compact, machine-readable **web-compatible** snapshot and essential visual rules.
2. Treat [FOUNDATIONS.md](FOUNDATIONS.md), [COLORS.md](COLORS.md), [TYPOGRAPHY.md](TYPOGRAPHY.md), [SPACING.md](SPACING.md), [SHAPE.md](SHAPE.md), [COMPONENTS.md](COMPONENTS.md), plus `tokens/` and `components/` JSON as **canonical sources**. If the alpha format omits details, follow the canonical documents.
3. Preserve approved tokens and component contracts. Propose documented changes instead of inventing new colors, font styles, spacing scales, radii, or interactions.
4. To edit design decisions, change the **canonical source first**, then regenerate DESIGN.md with `node scripts/build-design-md.mjs`. Verify with `node scripts/build-design-md.mjs --check` and the existing foundation validators.
5. When creating components, use accessible native semantics, correct focus behavior and adequate hit areas; test both themes, responsive reflow and native accessibility text scaling.
6. Run `npx @google/design.md lint DESIGN.md` when network/npm is available; do not claim that static validation proves runtime behavior. GitHub Actions has previously failed before runner allocation; verify whether jobs actually ran before interpreting a status.

The `DESIGN.md` spec is an alpha **projection**, not an override of the existing Moshi system. Use web CSS px values only for web; read native pt/sp/dp rules from canonical platform tokens.
