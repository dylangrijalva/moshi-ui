import assert from "node:assert/strict";
import {readFileSync,writeFileSync} from "node:fs";
import {dirname,join} from "node:path";
import {fileURLToPath} from "node:url";
const root=join(dirname(fileURLToPath(import.meta.url)),"..");
const source=p=>JSON.parse(readFileSync(join(root,p),"utf8"));
const body="## Overview\n\n**Moshi UI** is an open-source, agent-first design system for consistent web, iOS and Android applications. Its visual direction is **technical, precise, calm, efficient, compact without becoming cramped**. Prioritize clarity, information hierarchy, accessible controls, quiet neutral surfaces, and content-responsive layouts. Inspiration from Linear is conceptual, not permission to replicate its designs or brand assets.\n\n**Authority:** This file is a **generated, web-compatible DESIGN.md projection**, not the primary source of approved design decisions. Canonical sources are [FOUNDATIONS.md](FOUNDATIONS.md), [COLORS.md](COLORS.md), [TYPOGRAPHY.md](TYPOGRAPHY.md), [SPACING.md](SPACING.md), [SHAPE.md](SHAPE.md), [COMPONENTS.md](COMPONENTS.md), and their `tokens/` and `components/` JSON files. When a detail is absent from this alpha format, follow those sources; do not improvise new tokens. To update this file after an approved foundation change, run `node scripts/build-design-md.mjs`.\n\n## Colors\n\nThe YAML `colors` map contains **all 38 approved semantic roles, resolved for both light and dark themes** (76 values). Names are flattened for this specification: `light-background-canvas` corresponds to source `color.background.canvas` in the light theme, `dark-foreground-primary` to `color.foreground.primary` in dark. They are **not a separate palette**. The authoritative alias provenance and contrast guidance are in [COLORS.md](COLORS.md).\n\nThe identity accent is **brand orange** (`light-background-brand` / `dark-background-brand`, #FF4C00). Primary actions are **blue** (`light-background-action-primary-default` / `dark-background-action-primary-default`, #2B4FB9); never confuse brand orange with the default call to action. Use approved surface tones and semantic foreground/border roles, rather than hardcoded hex colors.\n\nResolve **one color theme at a time**. A component with a `-light` suffix uses light roles; `-dark` uses dark roles. Secondary action default background is transparent with `color.border.interactive`; hover and pressed share the approved secondary-hover surface. Disabled controls use existing disabled roles; this is not a text-contrast promise for disabled content. Status backgrounds, text and outlines are separate semantic roles; error and destructive action use distinct roles even where palette values overlap.\n\nAim for **WCAG 2.2 AA** on actual combinations, checking normal text ≥4.5:1 and non-text contrast ≥3:1 where applicable. The approved focus blue (`color.border.focus`, #558EDD) has insufficient standalone contrast against some light surfaces; add the specified **contextual neutral contrasting band**, not a new focus color. Never rely on background, color or shadow alone to communicate state. There is **no approved on-brand foreground color** for text over orange; validate any such use separately.\n\n## Typography\n\nThe six YAML `typography` entries exactly reproduce the approved **web baseline** styles: `display`, `heading`, `subheading`, `body`, `small` and `caption`. Font is **Inter, system-ui, sans-serif**, with Inter optional and not bundled. Preserve the approved font size, absolute line height, weight and tracking; a zero-tracking source value is expressed as `0px` to satisfy the DESIGN.md alpha dimension syntax. Monospace is an opt-in family for technical content, not a seventh semantic style.\n\nFor **iOS and Android**, do not reuse web baseline sizes blindly: use [native typography tokens](tokens/typography/) with iOS pt/Dynamic Type and Android sp/nonlinear font scaling. The alpha schema does not encode those native units or scaling curves. Adapt controls to text growth and browser zoom; never cap accessibility text scaling. Keep foreground color independent of typography. Use sentence case; reserve captions for supplementary information.\n\n## Layout\n\nThe `spacing` map contains the complete approved **11-step 4px-based scale** (`space-0` through `space-16`) and the **eight focused semantic layout aliases** for page gutters, section gaps and grid gaps. All YAML distances are web CSS px. In native implementations, the same numeric values use **iOS pt** or **Android dp**, not physical pixels; do not scale layout spacing by a text font multiplier.\n\nPage gutters are `page-gutter-narrow` = 16px, `page-gutter-medium` = 24px and `page-gutter-wide` = 32px. Web page-gutter breakpoints only: viewport <640px narrow; 640–1023px medium; ≥1024px wide. These breakpoints are **not** universal grid or component breakpoints. Native gutter selection depends on usable content space. Apply OS safe-area insets **once at the correct boundary** and then apply Moshi gutters inside.\n\nChoose `page-section-gap-compact` (32px) for dense workspaces and `page-section-gap-comfortable` (48px) for reading-oriented sections **by content density**, not viewport. Heading-to-section-body uses `section-header-gap` (16px). One-dimensional stacks use primitives directly (typically `space-2` or `space-3`); component padding is component-owned. No global stack gap, component padding, grid item minimum width or universal page maximum width tokens are approved.\n\nUse **content-driven grids**, not a mandatory 12-column system. Items provide their own minimum usable width; tracks distribute width equally and wrap or stack when necessary. Incomplete final rows preserve established column width. Items stretch to the natural maximum height **within their row**, not to fixed heights or across rows. Grid gaps are compact 12px or comfortable 24px, symmetric by default; justify per-axis exceptions.\n\nLong-form reading content uses **70ch maximum on web**, shrinking to available width. Native implementations approximate a 70-character reading measure using current typography metrics and accessibility scaling. Dashboards and tables may use full available width; routine forms and navigation should not require horizontal scrolling.\n\n## Elevation & Depth\n\nMoshi is **flat by default**. Prefer existing semantic canvas, surface, elevated surface and border color roles for hierarchy. Normal cards have **no shadow**. There are exactly two optional, mutually exclusive shadow levels (see [SHAPE.md](SHAPE.md)): `elevation.level1` offset 0/4, blur 12, spread 0; `elevation.level2` offset 0/8, blur 24, spread 0, using approved light/dark alpha-black colors. The DESIGN.md alpha schema has no shadow group, so shadow geometry remains authoritative in [the elevation tokens](tokens/shape/).\n\nUse level1 only for suitable small floating surfaces; level2 optionally for dialogs and prominent overlays if borders and tone are insufficient. Do not stack both shadows. A modal scrim uses `color.background.overlay`, **not** a drop shadow. Neither elevation nor borders alone establish accessible focus.\n\n## Shapes\n\nThe `rounded` map reproduces every approved `radius.*` primitive: none 0px, sm 4px, md 8px, lg 12px, xl 16px, full 9999px. `full` is a **fully rounded pill/circle sentinel**, not a requirement to measure 9999 physical pt/dp on native platforms.\n\nStandard separators and boundaries use `border.width.default` = **1 CSS px / 1 iOS pt / 1 Android dp**. Border colors come from the canonical semantic color family. Radius choices are component-owned: typically md for buttons and text fields, sm for checkbox, lg for cards and dialogs. Avoid pill styling everywhere or strong borders combined with strong shadows.\n\n## Components\n\nThe `components` YAML map is an **alpha-schema style projection** of the six approved contracts, flattened into light/dark variants and significant visual states. It is **not** a runtime implementation or a substitute for the machine-readable [component contracts](components/) and [COMPONENTS.md](COMPONENTS.md).\n\n- **Button:** primary (blue fill, on-action text), secondary (transparent fill, interactive blue border and blue foreground), destructive (destructive fill/on-action). Hover/pressed reuse the existing hover fills. Compact/default/comfortable web minimum visual heights: 32/36/40px, with content growth and proper hit targets. Disabled and loading are programmatic behavior as well as visual states.\n- **Icon Button:** Button semantics and variants, but a nonempty **accessible name** is mandatory even when a tooltip is displayed. Visual glyph size is not hit-target size.\n- **Text Field:** persistent visible label; help and error text; use semantic field border and explicit invalid indication. Placeholders are not labels. Connect labels and error descriptions to the input.\n- **Checkbox:** support checked, unchecked, programmatic indeterminate and disabled. The 16px visual indicator is not the full target; selection needs a check or mixed mark, not only a fill color.\n- **Card:** quiet surface with optional border, radius lg, 16px default padding (24px comfortable), **no default shadow**. A card is not automatically an interactive wrapper.\n- **Dialog:** modal elevated surface and scrim, radius lg, internal padding 24px. Correct modal focus entry, containment and restoration, cancellation/back behavior, and titled semantics are required. Level2 shadow is optional.\n\nFor interaction hit areas, follow the minimums documented in [COMPONENTS.md](COMPONENTS.md): **24 CSS px web** subject to WCAG exceptions (larger preferred), **44pt iOS**, **48dp Android**. This alpha YAML representation does not encode complete native interaction semantics. Do not invent unapproved variants or change component anatomy to fit YAML limitations.\n\n## Do's and Don'ts\n\n- **Do** read this file plus the canonical source specifications before generating or reviewing UI. **Don't** treat this generated projection as a replacement source of truth.\n- **Do** reuse exactly the approved semantic color roles, typography roles, spacing primitives, radius values and component contracts. **Don't** invent new HEX colors, type styles, gap aliases or decorative elevation.\n- **Do** prefer functional layouts and accessible feedback. **Don't** copy another product's brand or protected assets.\n- **Do** test both themes, keyboard navigation, visible focus, screen reader labels, zoom, contrast and native Dynamic Type/Android scaling. **Don't** assume static validation proves rendering or accessibility compliance.\n- **Do** use content-driven widths, safe areas, touch targets and thoughtful state feedback. **Don't** use horizontal scrolling for routine forms, fixed card heights, placeholder-only labels or color-only error states.\n- **Do** propose documented extensions when a genuinely new design decision is necessary. **Don't** silently change the approved canonical files.\n\n**Validation:** `node scripts/build-design-md.mjs --check` verifies this file exactly matches approved source tokens and this approved guidance. The official alpha format can also be linted with `npx @google/design.md lint DESIGN.md`. GitHub Actions has previously failed before runner allocation; a workflow failure with zero executed steps is not a token validation result.\n";
const originalColors=Object.assign({}, ...["primitives","radix","extended"].map(name=>source("tokens/colors/"+name+".tokens.json").color));
const at=(obj,path)=>path.split(".").reduce((o,k)=>o?.[k],obj);
const resolve=(value,groups)=>{
  if(typeof value!=="string")return value;
  const m=/^\{([^}]+)\}$/.exec(value);
  if(!m)return value;
  const [group,...rest]=m[1].split(".");
  const token=at(groups[group],rest.join("."));
  assert.ok(token&&Object.hasOwn(token,"$value"),"Missing primitive "+m[1]);
  return resolve(token.$value,groups);
};
const groups={color:originalColors,font:source("tokens/typography/primitives.tokens.json").font};
const flat=(obj,path="")=>Object.hasOwn(obj,"$value")?[[path,obj.$value]]:
  Object.entries(obj).filter(([k])=>!k.startsWith("$")).flatMap(([k,v])=>flat(v,path?path+"."+k:k));
const kebab=word=>word.replace(/([a-z])([A-Z])/g,"$1-$2").replaceAll(".","-").toLowerCase();
const quote=v=>JSON.stringify(String(v));
const lines=[
  "---",
  "version: alpha",
  "name: Moshi UI",
  "description: "+quote("Agent-first minimalist cross-platform design system; web-compatible projection of canonical Moshi v0.1 tokens."),
  "colors:"
];
const roleCount={};
for(const theme of ["light","dark"]){
  const sourceDoc=source("tokens/colors/semantic."+theme+".tokens.json");
  const entries=flat(sourceDoc.color);
  assert.equal(entries.length,38,"Moshi must keep the approved 38 roles per theme");
  roleCount[theme]=entries.length;
  for(const [name,ref] of entries){
    const value=resolve(ref,groups);
    assert.match(value,/^#[0-9A-F]{6}(?:[0-9A-F]{2})?$/i,"Invalid color "+name);
    lines.push("  "+theme+"-"+kebab(name)+": "+quote(value));
  }
}
const web=source("tokens/typography/semantic.web.tokens.json").typography;
const typeRoles=["display","heading","subheading","body","small","caption"];
assert.deepEqual(Object.keys(web),typeRoles,"Six approved typography roles required");
lines.push("typography:");
for(const role of typeRoles){
  const token=web[role].$value;
  const size=resolve(token.fontSize,groups);
  const height=resolve(token.lineHeight,groups);
  const weight=resolve(token.fontWeight,groups);
  const tracking=resolve(token.letterSpacing,groups);
  const family=resolve(token.fontFamily,groups);
  assert.ok(Array.isArray(family),"Expected web font fallback stack");
  lines.push("  "+role+":");
  lines.push("    fontFamily: "+quote(family.join(", ")));
  lines.push("    fontSize: "+quote(size));
  lines.push("    fontWeight: "+weight);
  lines.push("    lineHeight: "+quote(height));
  lines.push("    letterSpacing: "+quote(tracking==="0"?"0px":tracking));
}
const spacing=source("tokens/spacing/primitives.tokens.json").space;
const expectSpace={"0":0,"1":4,"2":8,"3":12,"4":16,"5":20,"6":24,"8":32,"10":40,"12":48,"16":64};
assert.deepEqual(Object.keys(spacing),Object.keys(expectSpace),"Spacing scale changed");
lines.push("spacing:");
for(const [step,n] of Object.entries(expectSpace)){
  assert.equal(spacing[step].$value,n,"Spacing primitive changed "+step);
  lines.push("  space-"+step+": "+quote(n+"px"));
}
const layout=source("tokens/spacing/semantic.web.tokens.json").layout;
const layoutRoles={
  "page-gutter-narrow":["page","gutter","narrow"],
  "page-gutter-medium":["page","gutter","medium"],
  "page-gutter-wide":["page","gutter","wide"],
  "page-section-gap-compact":["page","sectionGap","compact"],
  "page-section-gap-comfortable":["page","sectionGap","comfortable"],
  "section-header-gap":["section","headerGap"],
  "grid-gap-compact":["grid","gap","compact"],
  "grid-gap-comfortable":["grid","gap","comfortable"]
};
for(const [name,path] of Object.entries(layoutRoles)){
  const ref=path.reduce((v,k)=>v[k],layout).$value;
  const match=/^\{space\.(\d+)\}$/.exec(ref);
  assert.ok(match&&Object.hasOwn(spacing,match[1]),"Unresolved semantic layout alias "+name);
  lines.push("  "+name+": "+quote("{spacing.space-"+match[1]+"}"));
}
const radii=source("tokens/shape/primitives.tokens.json").radius;
const expectRadii={none:0,sm:4,md:8,lg:12,xl:16,full:9999};
assert.deepEqual(Object.keys(radii),Object.keys(expectRadii));
lines.push("rounded:");
for(const [name,n] of Object.entries(expectRadii)){
  assert.equal(radii[name].$value,n);
  lines.push("  "+name+": "+quote(n+"px"));
}
const control=source("tokens/components/primitives.tokens.json").control;
assert.deepEqual(Object.fromEntries(Object.entries(control.height.web).map(([k,v])=>[k,v.$value])),{compact:32,default:36,comfortable:40});
const components={};
const c=(theme,name,props)=>{components[name+"-"+theme]=props};
const cr=(theme,role)=>"{colors."+theme+"-"+kebab(role)+"}";
const tr=role=>"{typography."+role+"}";
const sr=step=>"{spacing.space-"+step+"}";
const rr=name=>"{rounded."+name+"}";
const make=(theme)=>{
  const small={typography:tr("small"),rounded:rr("md"),padding:sr("3"),height:"36px"};
  for(const variant of ["primary","destructive"]){
    c(theme,"button-"+variant,{
      backgroundColor:cr(theme,"background.action."+variant+".default"),
      textColor:cr(theme,"foreground.onAction."+variant),
      ...small
    });
    c(theme,"button-"+variant+"-hover",{
      backgroundColor:cr(theme,"background.action."+variant+".hover"),
      textColor:cr(theme,"foreground.onAction."+variant),
      ...small
    });
  }
  c(theme,"button-secondary",{textColor:cr(theme,"foreground.action.secondary"),...small});
  c(theme,"button-secondary-hover",{backgroundColor:cr(theme,"background.action.secondary.hover"),textColor:cr(theme,"foreground.action.secondary"),...small});
  c(theme,"icon-button-secondary",{textColor:cr(theme,"foreground.action.secondary"),rounded:rr("md"),size:"36px"});
  c(theme,"text-field",{backgroundColor:cr(theme,"background.surface"),textColor:cr(theme,"foreground.primary"),typography:tr("body"),rounded:rr("md"),padding:sr("3"),height:"36px"});
  c(theme,"text-field-invalid",{backgroundColor:cr(theme,"background.surface"),textColor:cr(theme,"foreground.primary"),typography:tr("body"),rounded:rr("md"),padding:sr("3"),height:"36px"});
  c(theme,"checkbox-checked",{backgroundColor:cr(theme,"background.action.primary.default"),textColor:cr(theme,"foreground.onAction.primary"),rounded:rr("sm"),size:"16px"});
  c(theme,"card",{backgroundColor:cr(theme,"background.surface"),textColor:cr(theme,"foreground.primary"),typography:tr("body"),rounded:rr("lg"),padding:sr("4")});
  c(theme,"dialog",{backgroundColor:cr(theme,"background.elevated"),textColor:cr(theme,"foreground.primary"),typography:tr("body"),rounded:rr("lg"),padding:sr("6")});
};
make("light");make("dark");
lines.push("components:");
for(const [name,properties] of Object.entries(components)){
  lines.push("  "+name+":");
  for(const [key,value] of Object.entries(properties))lines.push("    "+key+": "+quote(value));
}
lines.push("---","","# Moshi UI — DESIGN.md","",body.trimEnd(),"");
const output=lines.join("\n");
const path=join(root,"DESIGN.md");
if(process.argv.includes("--check")){
  assert.equal(readFileSync(path,"utf8"),output,"DESIGN.md is stale. Run node scripts/build-design-md.mjs");
  console.log("PASS DESIGN.md mirrors 38 approved semantic colors x 2 themes, six web typography roles, 11 spacing steps, eight aliases, six radii and "+Object.keys(components).length+" theme/state projections.");
}else{
  writeFileSync(path,output,"utf8");
  console.log("Wrote DESIGN.md from canonical Moshi design tokens.");
}
