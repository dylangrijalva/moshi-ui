# Moshi UI — Spacing & Layout

> Version: v0.1 · Status: approved and implemented as source design tokens.
> Scope: web, iOS and Android; component-level details remain component-owned.

Moshi uses the approved **4px base grid**, content-driven responsive layouts, and focused semantic aliases. Preserve [FOUNDATIONS.md](FOUNDATIONS.md), Colors v0.1, and Typography v0.1.

## Token architecture

| File | Purpose |
| --- | --- |
| [Numeric primitives](tokens/spacing/primitives.tokens.json) | Eleven logical `space.*` values |
| [Web semantic layout](tokens/spacing/semantic.web.tokens.json) | Eight spacing aliases, reading width, web gutter thresholds |
| [iOS semantic layout](tokens/spacing/semantic.ios.tokens.json) | Same spacing aliases, native reading measure |
| [Android semantic layout](tokens/spacing/semantic.android.tokens.json) | Same spacing aliases, native reading measure |
| [Validator](scripts/validate-spacing.mjs) | Static approval checks |

Load the primitive file and **one** platform semantic file. Every primitive's numeric `$value` resolves to CSS **px** on web, **pt** on iOS, and **dp** on Android. These are logical layout units, not equal physical pixels. Native spacing does not scale with the fontScale/Dynamic Type multiplier; layouts themselves must reflow as text scales.

### Full approved primitive scale

| Primitive | Logical value | Web | iOS | Android |
| --- | ---: | ---: | ---: | ---: |
| `space.0` | 0 | 0px | 0pt | 0dp |
| `space.1` | 4 | 4px | 4pt | 4dp |
| `space.2` | 8 | 8px | 8pt | 8dp |
| `space.3` | 12 | 12px | 12pt | 12dp |
| `space.4` | 16 | 16px | 16pt | 16dp |
| `space.5` | 20 | 20px | 20pt | 20dp |
| `space.6` | 24 | 24px | 24pt | 24dp |
| `space.8` | 32 | 32px | 32pt | 32dp |
| `space.10` | 40 | 40px | 40pt | 40dp |
| `space.12` | 48 | 48px | 48pt | 48dp |
| `space.16` | 64 | 64px | 64pt | 64dp |

The source-token format is deliberately **internal DTCG-inspired JSON**. `$type: number` logical spacing primitives and the web `70ch` reading dimension require a platform-aware exporter; they are not fully DTCG 2025.10-compatible dimension tokens.

## Semantic roles

| Role | Primitive or value | Intended use |
| --- | --- | --- |
| `layout.page.gutter.narrow` | `{space.4}` = 16 | Narrow page gutter |
| `layout.page.gutter.medium` | `{space.6}` = 24 | Medium page gutter |
| `layout.page.gutter.wide` | `{space.8}` = 32 | Wide page gutter |
| `layout.page.sectionGap.compact` | `{space.8}` = 32 | Dense application sections |
| `layout.page.sectionGap.comfortable` | `{space.12}` = 48 | Reading and informational sections |
| `layout.section.headerGap` | `{space.4}` = 16 | Heading to section content |
| `layout.grid.gap.compact` | `{space.3}` = 12 | Dense grid, both axes |
| `layout.grid.gap.comfortable` | `{space.6}` = 24 | Spacious grid, both axes |
| `layout.content.reading.maxWidth` | 70ch web / ≈70 characters native | Typography-aware reading maximum |

All eight spacing aliases are identical across platforms. Only the reading-width representation and gutter-selection rules vary.

### Page gutters, breakpoints, and safe areas

Web **page gutters only** use these thresholds:

| Available web viewport | Gutter |
| --- | --- |
| Below 640 CSS px | Narrow = 16px |
| 640–1023 CSS px | Medium = 24px |
| At least 1024 CSS px | Wide = 32px |

Do not apply those viewport thresholds universally to grids/components. Native applications choose narrow/medium/wide according to **usable content space**, without copying the 640px/1024px thresholds.

Safe areas are **runtime operating-system insets**, not design tokens. Account for each inset **once**, at the responsible container; then apply Moshi page gutters **inside** the safe area. When an ancestor already handles safe areas, do not inset again. Decorative full-bleed surfaces may extend to an edge as allowed by the OS; interactive content remains in the usable region.

### Page and section spacing

Choose section-gap variants based on **content density, not viewport width**: compact (32) for dashboards and dense workspaces; comfortable (48) for reading and informational pages. `layout.section.headerGap` (16) separates a heading from its content. A 40-unit primitive (`space.10`) exists but is not the default page section gap. Use approved primitives for documented exceptions.

Stacks (vertical or horizontal) use primitives directly: `space.2` (8) and `space.3` (12) are common related-item gaps. Do **not** define `layout.stack.gap.*`. Component padding belongs to each component's specification, chosen from approved primitives; do **not** define universal `layout.component.padding.*`. Component-specific aliases can be specified later when justified.

### Page and reading widths

There is **no universal page max-width**. Dashboards, application workspaces, and dense data views may use available width. Constrain long-form reading separately to `layout.content.reading.maxWidth`.

Web reading max = **70ch**; the `ch` unit approximates the current font's zero-glyph advance, not precisely 70 literal characters. On iOS and Android the token records **70 approximate characters** with typography-aware measurement metadata. Derive a maximum from the currently rendered body font and its accessibility-scaled metrics, respecting language, text growth and container width. **Never interpret 70 as pt/dp** or clip text to a fixed line length. Allow all reading regions to shrink when space is limited. This supports the existing 60–75-character guideline.

## Content-driven grids

- **No mandatory 12-column system.** Use the container's usable width and component-defined minimum item sizes. No global `layout.grid.minItemWidth` token.
- **Equal-width flexible tracks** by default. Use intrinsic/unequal tracks for layouts that need them.
- Add as many usable columns as fit; otherwise wrap or stack. Do not force ordinary forms or navigation into horizontal scrolling.
- **Incomplete final row**: preserve the established column widths; do not stretch the remaining cards just to fill the row. Allow intentional exceptions.
- **Equal height within each row**: cards naturally stretch to the tallest content in that row; rows may differ in height. Do not set fixed card heights. Use intrinsic height when purposefully needed.
- Both grid axes use the selected compact (12) or comfortable (24) gap by default; a single axis can use another approved primitive when necessary.

Example web consumer CSS (assumes a future exporter has generated CSS variables from the logical tokens):

~~~css
:root {
  --moshi-space-3: 12px;
  --moshi-space-4: 16px;
  --moshi-space-6: 24px;
  --moshi-space-8: 32px;
  --moshi-layout-page-gutter-narrow: var(--moshi-space-4);
  --moshi-layout-page-gutter-medium: var(--moshi-space-6);
  --moshi-layout-page-gutter-wide: var(--moshi-space-8);
  --moshi-layout-grid-gap-compact: var(--moshi-space-3);
}
.page { padding-inline: var(--moshi-layout-page-gutter-narrow); }
@media (min-width: 640px) {
  .page { padding-inline: var(--moshi-layout-page-gutter-medium); }
}
@media (min-width: 1024px) {
  .page { padding-inline: var(--moshi-layout-page-gutter-wide); }
}
.reading { inline-size: 100%; max-inline-size: 70ch; }
.dashboard-grid {
  /* Local example; component supplies its own minimum, not a global token. */
  --item-min-width: 16rem;
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(min(100%, var(--item-min-width)), 1fr)
  );
  gap: var(--moshi-layout-grid-gap-compact);
  align-items: stretch;
}
.dashboard-grid > * { min-inline-size: 0; block-size: 100%; }
~~~

The example uses **`auto-fill`, not `auto-fit`**, so empty tracks remain in incomplete rows instead of stretching the last items. The page shell assumes safe-area insets were handled once by its parent. This CSS is **illustrative**, not a committed exporter or approved global minimum. Native layouts must achieve the equivalent behavior using their own framework APIs.

## Responsive and accessibility behavior

Design narrow layouts first and use content-driven layout changes rather than device-specific mockup widths. Respect browser zoom, iOS Dynamic Type, Android nonlinear font scaling, touch target guidance and translated text. Avoid clipping, arbitrary absolute positioning and routine horizontal scrolling. Intentionally scrollable data tables may scroll *inside their own region*.

All layout exceptions should be deliberate and documented. No additional semantic spacing aliases are approved in v0.1.

## Validation and limitations

Run:

~~~sh
node scripts/validate-spacing.mjs
node scripts/validate-typography.mjs
node scripts/validate-colors.mjs
~~~

Static spacing checks verify the approved eleven steps, eight alias roles per platform, reading semantics, breakpoints and policy documentation. Actual grid reflow, native safe areas, reading measures and enlarged text require consuming-application integration testing. CSS/native exporters and component-specific layout tokens remain future work.

