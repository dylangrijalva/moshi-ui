# Moshi UI — Colors

> Version: v0.1 · Status: approved semantic color mapping, implemented light/dark aliases.

All colors are **sRGB encoded as HEX** (`#RRGGBB` or `#RRGGBBAA` for alpha). Web, iOS, and Android use the **same light/dark semantic values**, with platform-specific component behavior where appropriate.

## Architecture and files

| Layer | File | Responsibility |
| --- | --- | --- |
| Original primitives | [`primitives.tokens.json`](tokens/colors/primitives.tokens.json) | The 45 unchanged Figma-derived Moshi primitives (eight families) |
| Radix primitives | [`radix.tokens.json`](tokens/colors/radix.tokens.json) | 27 selected, exact Radix Colors **3.0.0** sRGB entries, local snapshot |
| Moshi extensions | [`extended.tokens.json`](tokens/colors/extended.tokens.json) | 18 additional color values, including three approved Radix deviations |
| Light semantics | [`semantic.light.tokens.json`](tokens/colors/semantic.light.tokens.json) | 38 aliases under `color.background`, `color.foreground`, `color.border` |
| Dark semantics | [`semantic.dark.tokens.json`](tokens/colors/semantic.dark.tokens.json) | The same 38 paths, with dark-theme aliases |

The semantic token names are property-first: `background` colors sit behind content, `foreground` colors apply to text/icons, and `border` colors define separation, interactive boundaries, and focus. Component tokens are deferred. Applications should use semantic aliases instead of choosing primitive HEX values directly.

Aliases use the `{color.family.step}` token reference convention. Example: `{color.radix.ruby.light.3}`. Resolve the semantic file for the active theme alongside the three primitive files; do not load both semantic theme files into the same namespace simultaneously.

## Source provenance

- **Moshi original**: [Foundations Figma](https://www.figma.com/design/g18Ifl9ovYo0GxCIktLXBs/Foundations); the first 45 primitive values are unchanged.
- **Radix Colors**: [`@radix-ui/colors@3.0.0`](https://github.com/radix-ui/colors/tree/3.0.0/src), MIT-licensed. The exact 27 selected values are copied locally; no runtime dependency is required. Source-file Git blob SHAs and package version are recorded in `radix.tokens.json`.
- **Moshi custom**: neutrals missing from the original primitives, approved blue dark shades, alpha colors, and explicit user-approved deviations from upstream Radix.

### Three deliberately preserved Radix deviations

Our approved HEX mappings contain **three colors that differ from the upstream Radix 3.0.0 source**. They are stored under `color.moshi.adjusted.radix.*`, not falsely attributed to Radix itself.

| Semantic role (dark) | Moshi-approved HEX | Radix 3.0.0 HEX |
| --- | --- | --- |
| `background.status.success` | `#182A1D` | `grassDark3` `#1B2A1E` |
| `border.status.success` | `#2D5637` | `grassDark6` `#2D5736` |
| `background.status.error` | `#3B121E` | `rubyDark3` `#3A141E` |

These are intentional **Moshi overrides** preserving the approved specification; they are not exact Radix step values. A future change to match upstream requires an explicit revision.

## Complete v0.1 semantic token mappings

Every table below lists the full `color.*` semantic path, resolved HEX for light and dark, and its primitive alias (without `{color.` and `}`).

### `color.background`

| Semantic token | Light HEX | Dark HEX | Light primitive | Dark primitive |
| --- | --- | --- | --- | --- |
| `color.background.canvas` | `#F0F0F2` | `#131419` | `moshi.neutral.light.1` | `moshi.neutral.dark.1` |
| `color.background.surface` | `#FFFFFF` | `#262A34` | `neutral.0` | `moshi.neutral.dark.3` |
| `color.background.elevated` | `#FFFFFF` | `#32353F` | `neutral.0` | `moshi.neutral.dark.4` |
| `color.background.selected` | `#F7F7F7` | `#32353F` | `neutral.50` | `moshi.neutral.dark.4` |
| `color.background.disabled` | `#F0F0F0` | `#1E222C` | `neutral.100` | `moshi.neutral.dark.2` |
| `color.background.inverse` | `#252525` | `#FFFFFF` | `neutral.900` | `neutral.0` |
| `color.background.overlay` | `#00000066` | `#00000099` | `moshi.alpha.black.40` | `moshi.alpha.black.60` |
| `color.background.brand` | `#FF4C00` | `#FF4C00` | `orange.50` | `orange.50` |
| `color.background.action.primary.default` | `#2B4FB9` | `#2B4FB9` | `blue.75` | `blue.75` |
| `color.background.action.primary.hover` | `#002182` | `#5069C3` | `blue.100` | `blue.50` |
| `color.background.action.secondary.hover` | `#E7EAF6` | `#213554` | `blue.0` | `moshi.blue.dark.1` |
| `color.background.action.destructive.default` | `#CA244D` | `#B3445A` | `radix.ruby.light.11` | `radix.ruby.dark.8` |
| `color.background.action.destructive.hover` | `#64172B` | `#883447` | `radix.ruby.light.12` | `radix.ruby.dark.7` |
| `color.background.status.success` | `#E9F6E9` | `#182A1D` | `radix.grass.light.3` | `moshi.adjusted.radix.grass.dark.3` |
| `color.background.status.warning` | `#FFF7C2` | `#302008` | `radix.amber.light.3` | `radix.amber.dark.3` |
| `color.background.status.error` | `#FEEAED` | `#3B121E` | `radix.ruby.light.3` | `moshi.adjusted.radix.ruby.dark.3` |
| `color.background.status.info` | `#E6F4FE` | `#0D2847` | `radix.blue.light.3` | `radix.blue.dark.3` |

### `color.foreground`

| Semantic token | Light HEX | Dark HEX | Light primitive | Dark primitive |
| --- | --- | --- | --- | --- |
| `color.foreground.primary` | `#252525` | `#FFFFFF` | `neutral.900` | `neutral.0` |
| `color.foreground.secondary` | `#666666` | `#FFFFFFCC` | `neutral.600` | `moshi.alpha.white.80` |
| `color.foreground.disabled` | `#7A7A7A` | `#FFFFFF80` | `neutral.500` | `moshi.alpha.white.50` |
| `color.foreground.inverse` | `#FFFFFF` | `#252525` | `neutral.0` | `neutral.900` |
| `color.foreground.link` | `#2B4FB9` | `#9DA9CA` | `blue.75` | `moshi.blue.dark.2` |
| `color.foreground.onAction.primary` | `#FFFFFF` | `#FFFFFF` | `neutral.0` | `neutral.0` |
| `color.foreground.onAction.destructive` | `#FFFFFF` | `#FFFFFF` | `neutral.0` | `neutral.0` |
| `color.foreground.action.secondary` | `#2B4FB9` | `#9DA9CA` | `blue.75` | `moshi.blue.dark.2` |
| `color.foreground.action.destructive` | `#CA244D` | `#FF949D` | `radix.ruby.light.11` | `radix.ruby.dark.11` |
| `color.foreground.status.success` | `#2A7E3B` | `#71D083` | `radix.grass.light.11` | `radix.grass.dark.11` |
| `color.foreground.status.warning` | `#4F3422` | `#FFCA16` | `radix.amber.light.12` | `radix.amber.dark.11` |
| `color.foreground.status.error` | `#CA244D` | `#FF949D` | `radix.ruby.light.11` | `radix.ruby.dark.11` |
| `color.foreground.status.info` | `#113264` | `#70B8FF` | `radix.blue.light.12` | `radix.blue.dark.11` |

### `color.border`

| Semantic token | Light HEX | Dark HEX | Light primitive | Dark primitive |
| --- | --- | --- | --- | --- |
| `color.border.default` | `#0000001F` | `#FFFFFF1F` | `moshi.alpha.black.12` | `moshi.alpha.white.12` |
| `color.border.strong` | `#00000033` | `#FFFFFF33` | `moshi.alpha.black.20` | `moshi.alpha.white.20` |
| `color.border.interactive` | `#5069C3` | `#9DA9CA` | `blue.50` | `moshi.blue.dark.2` |
| `color.border.focus` | `#558EDD` | `#558EDD` | `info.50` | `info.50` |
| `color.border.status.success` | `#B2DDB5` | `#2D5637` | `radix.grass.light.6` | `moshi.adjusted.radix.grass.dark.6` |
| `color.border.status.warning` | `#F3D673` | `#5C3D05` | `radix.amber.light.6` | `radix.amber.dark.6` |
| `color.border.status.error` | `#F8BFC8` | `#6F2539` | `radix.ruby.light.6` | `radix.ruby.dark.6` |
| `color.border.status.info` | `#ACD8FC` | `#104D87` | `radix.blue.light.6` | `radix.blue.dark.6` |

## Color usage and interaction rules

- **Brand and actions**: orange `#FF4C00` is an identity background, not the default action fill. The primary action uses the approved blue `#2B4FB9` in both themes. No `foreground.onBrand` token is defined, so don't assume white text over orange is accessible.
- **Secondary actions**: default outlined background is transparent, foreground and outline are blue, hover is a blue-tinted background. The secondary outline reuses `color.border.interactive`, without another secondary border role.
- **Pressed states**: reuse the corresponding approved hover background token on touch-down / pointer-down; there are no dedicated `.pressed` semantic colors.
- **Destructive vs error**: separate semantic roles share portions of the Ruby palette. Destructive white-on-fill combinations were explicitly chosen with AA text contrast in mind.
- **Status**: each status exposes exactly `background`, `foreground`, and `border`. Foreground is shared by text and icons. Tinted backgrounds correspond to Radix step 3, borders to step 6, and foreground to step 11 or 12 according to AA contrast. The three preserved deviations above are exceptions to exact upstream HEX.
- **Disabled**: use `background.disabled`, `foreground.disabled`, and the existing `border.default`. Disable interactions programmatically as well as visually.
- **Placeholders**: reuse `foreground.secondary`; placeholders are not labels.
- **Selection**: neutral `background.selected` is subtle; convey selected state with additional meaningful indicators when needed.
- **Focus**: use `border.focus` blue `#558EDD` in both themes. On insufficient-contrast surroundings, add a **contextual neutral band**, without adding a new semantic token.
- **Filled action boundaries**: use content-first, contextual outlines. Don't outline every filled action automatically; provide a visible boundary wherever needed to identify the control.
- **Overlays**: `background.overlay` is a semitransparent black scrim, 40% alpha in light mode and 60% in dark mode.

## Accessibility and validation

Target **WCAG 2.2 AA** in web products, with equivalent platform-appropriate native practices. Standard text foreground/background pairs must meet **at least 4.5:1** contrast; essential non-text boundaries and focus indicators require separate checks against their actual surroundings.

Core contrast results for the approved status foregrounds over tinted backgrounds:

| Status | Light | Dark |
| --- | ---: | ---: |
| Success | 4.54:1 | 7.96:1 |
| Warning | 10.47:1 | 10.26:1 |
| Error | 4.70:1 | 7.73:1 |
| Info | 11.26:1 | 7.08:1 |

**Important**: the focus ring `#558EDD` has only ~2.93:1 contrast over the light canvas `#F0F0F2`, so the approved contextual neutral band is necessary in that context. The selected background alone is not sufficient to express selection. Transparent foregrounds must be composited over their backgrounds for contrast testing.

Run the repository's token checks:

```sh
node scripts/validate-colors.mjs
```

The validator checks all 38 semantic role paths, both themes, primitive resolution, approved HEX snapshots, the pinned Radix subset (including the three deviations), and key WCAG AA color pairs.

### Scope

This release covers **color semantics**, not typography, spacing, component appearance, code-generated CSS, or a framework-specific runtime. The source-token format keeps Moshi's existing HEX-string `$value` convention; it is **not** the object-valued color representation required for full DTCG 2025.10 color-token interoperability.
