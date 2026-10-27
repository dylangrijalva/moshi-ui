# Moshi UI — Colors

> Version: 0.1 · Status: Primitive palettes adopted; semantic theme mappings to be defined next.

This document explains the **Moshi primitive color palette**, drawn from the [Foundations Figma reference](https://www.figma.com/design/g18Ifl9ovYo0GxCIktLXBs/Foundations). The machine-readable, canonical values are in [`tokens/colors/primitives.tokens.json`](tokens/colors/primitives.tokens.json). If the two differ, the JSON token file is authoritative.

## Architecture

Colors have three levels:

1. **Primitives (defined now):** raw, named swatches, such as `color.orange.50` and `color.neutral.900`.
2. **Semantic theme tokens (next):** purpose-based aliases, such as `color.background`, `color.text.primary`, `color.action.primary`, and `color.status.error`, resolved separately for light/dark and where necessary for web/native.
3. **Component tokens (later):** component-specific aliases, e.g. `button.primary.background`, only when reusable components need them.

**Agents should not choose primitive colors directly for product components.** Before a semantic theme is published, retain a product's existing accessible color roles or propose a mapping for review. Never choose a brand or action color solely because it is available in this palette.

## Core palette

### Orange — brand family

| Step | Hex |
| --- | --- |
| 0 | `#FCE8E5` |
| 25 | `#FFA788` |
| 50 | `#FF4C00` |
| 75 | `#DB3B11` |
| 100 | `#C12700` |

The source uses orange as a **brand** family. The 50 step is a vivid identity accent, **not automatically the default button color**.

### Blue — interactive web family

| Step | Hex |
| --- | --- |
| 0 | `#E7EAF6` |
| 25 | `#9AA6DB` |
| 50 | `#5069C3` |
| 75 | `#2B4FB9` |
| 100 | `#002182` |

The reference's web semantic tokens use **blue 75 (`#2B4FB9`)** for primary actions, and **blue 100 (`#002182`)** for hover. These source conventions are candidates for Moshi, not yet universally mandated for all products and platforms.

### Yellow — supplementary family

| Step | Hex |
| --- | --- |
| 0 | `#FEEDB4` |
| 25 | `#FED850` |
| 50 | `#FFB700` |
| 75 | `#FF9300` |
| 100 | `#F76600` |

Use sparingly; do not substitute yellow for warning tokens without an explicit semantic mapping.

### Neutral — shared grayscale

| Moshi step | Hex |
| --- | --- |
| 0 | `#FFFFFF` |
| 50 | `#F7F7F7` |
| 100 | `#F0F0F0` |
| 200 | `#E5E5E5` |
| 400 | `#C0C0C0` |
| 500 | `#7A7A7A` |
| 600 | `#666666` |
| 700 | `#474747` |
| 900 | `#252525` |
| 1000 | `#000000` |

**Neutral step numbers are Moshi-normalized labels**, not a claim that Figma uses the same step names. They represent the extracted neutral swatches ordered from white to black. For example, `neutral.900` is the near-black `#252525`.

## Status palettes

These palette values come from the reference's semantic status ramps. Colors within a ramp are not necessarily interchangeable: usage must be confirmed against contrast, theme, and background.

### Success
| Step | Hex |
| --- | --- |
| 0 | `#E8F7D4` |
| 25 | `#AFE26C` |
| 50 | `#71B314` |
| 75 | `#227800` |
| 100 | `#006400` |

### Warning
| Step | Hex |
| --- | --- |
| 0 | `#FEF6D9` |
| 25 | `#FED850` |
| 50 | `#FFA400` |
| 75 | `#FF6A00` |
| 100 | `#C54300` |

### Error
| Step | Hex |
| --- | --- |
| 0 | `#FFE6E9` |
| 25 | `#EFA49F` |
| 50 | `#EE6868` |
| 75 | `#D40023` |
| 100 | `#B4001E` |

### Information
| Step | Hex |
| --- | --- |
| 0 | `#E3F0FB` |
| 25 | `#9FC5F0` |
| 50 | `#558EDD` |
| 75 | `#3D4089` |
| 100 | `#002182` |

## Theme observations from the source Figma file

The reference contains three semantic modes: **Restaurant Web**, **Restaurant Native Light**, and **Restaurant Native Dark**. Its main surface and action choices differ by platform.

| Role | Web | Native light | Native dark |
| --- | --- | --- | --- |
| Base surface | `#F0F0F2` | `#F0F0F0` | `#131419` |
| Container surface | `#FFFFFF` | `#FFFFFF` | `#262A34` |
| Primary text | `#252525` | `#252525` | `#FFFFFF` |
| Secondary text | `#666666` | `#666666` | `#FFFFFFCC` |
| Primary action background | `#2B4FB9` | `#252525` | `#F7F7F7` |
| Action highlight | `#002182` | `#474747` | `#E5E5E5` |

These are **reference theme mappings, not approved Moshi semantic tokens**. Some theme colors are outside the common primitive swatches, and alpha colors must be modeled explicitly when adopted. Do not silently equate the Web mode with a generic light theme or invent a web dark theme.

## Usage and accessibility rules

- Favor neutral surfaces and readable text. Let color communicate emphasis or state, rather than decorate.
- Brand orange and action blue are different concepts; preserving that distinction supports multiple product identities.
- For ordinary text, require **at least 4.5:1** contrast, and **3:1** for large text as defined by WCAG 2.2. Essential component boundaries also require appropriate non-text contrast.
- **Do not use white normal-sized text on orange `#FF4C00`**: its contrast is below the normal-text AA threshold. Use it for accents or define an accessible combination.
- Never rely on color alone to convey status.
- Status ramps should map separately to text, subtle fills, borders, and icons after verifying contrast for each theme.
- Define hover, selected, disabled, focus, and error colors via semantic aliases, not by inventing local hex values.
- Preserve clear platform conventions; web and mobile may share primitives without sharing the same action treatment.

## Deferred palettes

The Figma file also names secondary **Grass, Sky, Lavender, Orchid, Terra-Cotta, and Quince Yellow** families and additional data-visualization palettes. Their complete values have not been verified. They are intentionally **not** included in the canonical Moshi primitive tokens yet; do not fabricate missing steps.

## Next decision

Define **Moshi semantic light and dark themes**: map the primitives to canvas, surface, primary text, secondary text, borders, interactive actions, focus, and status roles. Validate representative UI samples and contrast before approving component color usage.
