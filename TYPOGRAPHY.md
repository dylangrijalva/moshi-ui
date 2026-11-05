# Moshi UI — Typography

> Version: v0.1 · Status: approved and implemented as source design tokens.  
> Scope: six semantic text styles on web, iOS, and Android. Component-specific typography is deferred.

Typography tokens define **font family, font size, font weight, line height, and letter spacing**. Text color is **not** embedded: pair typography with the existing `color.foreground.*` semantic color tokens in [COLORS.md](COLORS.md).

## Source files

| File | Purpose |
| --- | --- |
| [`tokens/typography/primitives.tokens.json`](tokens/typography/primitives.tokens.json) | Font families, platform baseline sizes and absolute line heights, four weights, tracking, optional numeric features |
| [`semantic.web.tokens.json`](tokens/typography/semantic.web.tokens.json) | Six semantic styles for web |
| [`semantic.ios.tokens.json`](tokens/typography/semantic.ios.tokens.json) | Six semantic styles for iOS; Dynamic Type curve metadata |
| [`semantic.android.tokens.json`](tokens/typography/semantic.android.tokens.json) | Six semantic styles for Android |
| [`scripts/validate-typography.mjs`](scripts/validate-typography.mjs) | Approved-value, token-reference and schema-shape validator |

Load the primitive file and **one** platform-specific semantic file at a time. The public API always consists of `typography.display`, `typography.heading`, `typography.subheading`, `typography.body`, `typography.small`, and `typography.caption`. No button, label, or code-specific semantic styles are defined.

## Approved scale

Measurements below are `font size / baseline line height`. Weights and tracking are shared across platforms.

| Semantic style | Web (px) | iOS (pt) | Android (sp) | Weight | Tracking |
| --- | ---: | ---: | ---: | ---: | ---: |
| `typography.display` | 30 / 38 | 32 / 40 | 32 / 40 | 600 | `-0.02em` |
| `typography.heading` | 24 / 32 | 24 / 32 | 24 / 32 | 600 | `-0.01em` |
| `typography.subheading` | 18 / 26 | 20 / 28 | 20 / 28 | 500 | `0` |
| `typography.body` | 16 / 24 | 17 / 26 | 16 / 24 | 400 | `0` |
| `typography.small` | 14 / 20 | 15 / 22 | 14 / 20 | 400 | `0` |
| `typography.caption` | 12 / 16 | 12 / 16 | 12 / 16 | 400 | `0` |

These are **baseline** metrics, not maximum permitted values. On web, the six baseline metrics do not change at breakpoints; responsive containers and layout may change. Respect browser zoom and user text settings.

### Role guidance

- **Display:** Rare high-level introductions; avoid for routine UI labels.
- **Heading:** Page titles and major sections.
- **Subheading:** Section headers.
- **Body:** Reading text, forms, and default prose.
- **Small:** Compact controls, table cells, and dense desktop labels when legible.
- **Caption:** Supplementary, nonessential metadata. Never force critical content into a 12px-only treatment.

Weights of **400 regular**, **500 medium**, and **600 semibold** provide the defaults. **700 bold** is available sparingly as an approved primitive. Components may apply **controlled weight overrides** from these four primitives; do not invent extra semantic typography styles for weight differences.

### Family primitives

| Platform | Sans family | Monospace family |
| --- | --- | --- |
| Web | `Inter, system-ui, sans-serif` | `ui-monospace` with platform monospace fallbacks |
| iOS | Native system sans-serif | Native system monospace |
| Android | Native sans-serif | Native monospace |

For web, **Inter is preferred, not bundled**. Consuming applications may load it themselves; the system stack remains valid if Inter is unavailable.

On iOS, the family identifiers `system` and `system-monospace` are **symbolic adapters**, not literal font face names. Resolve through the appropriate UIKit or SwiftUI system-font APIs. On Android, map `sans-serif` to the system/default family and `monospace` to the platform monospace family, such as Compose `FontFamily.Monospace`.

Monospace is an **opt-in primitive family choice** for code, commands, keyboard shortcuts, file paths, and other technical content. It is not a seventh semantic style.

### Optional tabular numerals

The default is proportional numerals (`font.feature.numerals.proportional` = `normal`). For aligned financial data, counters, measurements, timestamps, or data tables, consumers can opt into the OpenType **`tnum`** feature using `font.feature.numerals.tabular`. This stays independent of the six semantic styles and does not require monospace.

Apply only when supported by the current font. Web may use `font-variant-numeric: tabular-nums`; iOS/Android should use supported native typographic features and graceful fallback.

## Alias example

The platform-specific semantic object `typography.body` contains five references; here is the web version:

```json
{
  "typography": {
    "body": {
      "$type": "typography",
      "$value": {
        "fontFamily": "{font.family.web.sans}",
        "fontSize": "{font.size.web.16}",
        "fontWeight": "{font.weight.regular}",
        "lineHeight": "{font.lineHeight.web.24}",
        "letterSpacing": "{font.letterSpacing.normal}"
      }
    }
  }
}
```

The resolved web definition is **Inter/system fallback, 16px size, weight 400, 24px line height, tracking 0**. Corresponding iOS and Android aliases resolve to their approved sizes and units. Text foreground color is supplied independently from `color.foreground.*`.

## Platform accessibility requirements

### Web

Use semantic markup, relative or otherwise user-scalable font handling where appropriate, preserve browser zoom, and never pin containers to heights that clip enlarged text. The token source lists approved baseline **px** metrics, not fixed rendering caps. Text reflow and translations must be tested in the consuming application.

### iOS

Use native system fonts and **Dynamic Type**. Each semantic style records a suggested **UIFontMetrics / SwiftUI relative-to scaling curve**:

| Moshi style | iOS scaling text style |
| --- | --- |
| Display | `largeTitle` |
| Heading | `title2` |
| Subheading | `title3` |
| Body | `body` |
| Small | `subheadline` |
| Caption | `caption1` |

The approved point sizes remain Moshi's baseline, even if they differ from the platform preset's nominal font size. Scale **once**, using `UIFontMetrics(forTextStyle: ...).scaledFont(for:)` for a baseline system font or SwiftUI's corresponding relative font scaling. Recompute or scale line height/tracking consistently, and let containers reflow at accessibility sizes. Do not apply a second manual global multiplier or cap accessibility categories for visual compactness.

### Android

Use native system font families. Interpret approved **sp** sizes and line heights as baseline scalable text measures in the chosen Android text API (for example, Jetpack Compose's `sp` size/lineHeight values). Let Android handle user font settings, including **nonlinear scaling** on supported versions. Do not pre-multiply an `sp` token by `fontScale`. Make layouts flexible and test at enlarged font settings.

### Tracking

Negative `em` tracking is proportional to the **rendered, scaled font size**, not a fixed point/pixel offset. At large accessibility sizes, validate that letter spacing and line height remain legible. The exact approved defaults are `-0.02em`, `-0.01em`, and `0`.

## Approved composition and behavior

- Typography and text color remain independent. Use existing semantic foreground colors.
- Style defaults may be overridden **only with approved weight primitives** when the component's purpose requires it.
- Existing `FOUNDATIONS.md` guidance remains: left-aligned body/dense UI text; right-align numeric table columns where useful; sentence case for headings, labels, tabs, and buttons.
- A narrow browser viewport changes the layout, **not** the six web baseline typography sizes.
- Never rely solely on font size to express hierarchy. Use weight, color, spacing, structure, and semantics appropriately.
- Avoid clipped text, truncated essential labels, broken reflow, or disabled OS font scaling.

## Token format and portability

The JSON is a deliberately **DTCG-inspired internal format**, aligned with the existing Moshi color-token convention. It uses `$type`, `$value`, and brace references, but **is not fully compliant with DTCG 2025.10**: the `dimension` primitives are absolute strings such as `17pt`, `24sp`, and `-0.02em`; line height is absolute rather than a unitless multiplier; `fontFeature` and symbolic native family values are custom conventions.

This is intentional: preserve the approved platform units and exact baseline line heights without silently rounding or substituting a different scale. Consumers need platform-aware normalization/export adapters; do not hand these files to a strict DTCG validator and expect them to pass without transformation. A future token build/export milestone can generate strict DTCG representations or platform-native formats.

## Validation

Run:

```sh
node scripts/validate-typography.mjs
node scripts/validate-colors.mjs
```

The typography script checks all 18 semantic definitions, approved metrics, family and weight primitives, alias resolution, tracking, optional numeric feature tokens, no embedded colors, and the iOS Dynamic Type style metadata. GitHub Actions runs static checks when typography sources or the validator change.

**Static checks cannot verify Dynamic Type, nonlinear Android font scaling, actual font availability/rendering, browser zoom or reflow.** Those require integration and visual accessibility tests in real web/iOS/Android applications before shipping components.
