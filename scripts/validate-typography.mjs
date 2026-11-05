#!/usr/bin/env node
/**
 * Moshi Typography v0.1 — dependency-free source-token validation.
 * Checks approved baseline metrics and aliases. Native Dynamic Type/font scaling,
 * reflow, zoom and actual font rendering require integration tests in consuming apps.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../tokens/typography");
const read = name => JSON.parse(readFileSync(join(root, name), "utf8"));
const primitives = read("primitives.tokens.json");
const expected = {
  web: {
    display:[30,38], heading:[24,32], subheading:[18,26],
    body:[16,24], small:[14,20], caption:[12,16]
  },
  ios: {
    display:[32,40], heading:[24,32], subheading:[20,28],
    body:[17,26], small:[15,22], caption:[12,16]
  },
  android: {
    display:[32,40], heading:[24,32], subheading:[20,28],
    body:[16,24], small:[14,20], caption:[12,16]
  }
};
const unit = { web:"px", ios:"pt", android:"sp" };
const roles = ["display","heading","subheading","body","small","caption"];
const weights = {display:600,heading:600,subheading:500,body:400,small:400,caption:400};
const weightAliases = {display:"semibold",heading:"semibold",subheading:"medium",body:"regular",small:"regular",caption:"regular"};
const tracking = {display:"-0.02em",heading:"-0.01em",subheading:"0",body:"0",small:"0",caption:"0"};
const trackingAliases = {display:"display",heading:"heading",subheading:"normal",body:"normal",small:"normal",caption:"normal"};
const iosCurve = {display:"largeTitle",heading:"title2",subheading:"title3",body:"body",small:"subheadline",caption:"caption1"};
const get = (object, path) => path.split(".").reduce((value,segment) => value?.[segment], object);
const equalKeys = (actual, allowed, label) =>
  assert.deepEqual(Object.keys(actual).sort(), allowed.slice().sort(),label);
const token = (path,type) => {
  const result = get(primitives,path);
  assert.ok(result && typeof result === "object" && "$value" in result,"Missing primitive: " + path);
  assert.equal(result.$type,type,"Incorrect primitive type: " + path);
  return result.$value;
};
const resolve = (alias,type) => {
  assert.equal(typeof alias,"string");
  assert.match(alias,/^\{font\.[A-Za-z0-9_.]+\}$/,"Invalid alias: " + alias);
  return token(alias.slice(1,-1),type);
};
assert.equal(primitives.$extensions["moshi.version"],"0.1");
assert.equal(primitives.$extensions["moshi.format"],"internal-typography-v0.1");

equalKeys(primitives.font.family,["web","ios","android"],"Font platforms");
for (const platform of Object.keys(expected)) {
  equalKeys(primitives.font.family[platform],["sans","mono"],platform+" font families");
  for (const kind of ["sans","mono"]) {
    const family = token("font.family."+platform+"."+kind,"fontFamily");
    assert.ok(typeof family === "string" || (Array.isArray(family) && family.every(x=>typeof x==="string")));
  }
}
assert.deepEqual(token("font.family.web.sans","fontFamily"),["Inter","system-ui","sans-serif"]);
assert.equal(token("font.family.web.mono","fontFamily")[0],"ui-monospace");
assert.equal(token("font.family.ios.sans","fontFamily"),"system");
assert.equal(token("font.family.ios.mono","fontFamily"),"system-monospace");
assert.equal(token("font.family.android.sans","fontFamily"),"sans-serif");
assert.equal(token("font.family.android.mono","fontFamily"),"monospace");

equalKeys(primitives.font.weight,["regular","medium","semibold","bold"],"Weight primitives");
for (const [name,weight] of Object.entries({regular:400,medium:500,semibold:600,bold:700}))
  assert.equal(token("font.weight."+name,"fontWeight"),weight);
equalKeys(primitives.font.letterSpacing,["display","heading","normal"],"Letter spacing primitives");
for(const [name,value] of Object.entries({display:"-0.02em",heading:"-0.01em",normal:"0"}))
  assert.equal(token("font.letterSpacing."+name,"dimension"),value);
equalKeys(primitives.font.feature,["numerals"],"Font features");
equalKeys(primitives.font.feature.numerals,["proportional","tabular"],"Numeric features");
assert.equal(token("font.feature.numerals.proportional","fontFeature"),"normal");
assert.equal(token("font.feature.numerals.tabular","fontFeature"),"tnum");

equalKeys(primitives.font.size,["web","ios","android"],"Size platform sets");
equalKeys(primitives.font.lineHeight,["web","ios","android"],"Line height platform sets");
let validated = 0;
for (const [platform,scale] of Object.entries(expected)) {
  const sizes = new Set(),lines = new Set();
  for (const [role,[size,line]] of Object.entries(scale)) {
    sizes.add(String(size));
    lines.add(String(line));
  }
  equalKeys(primitives.font.size[platform],[...sizes],platform+" primitive sizes");
  equalKeys(primitives.font.lineHeight[platform],[...lines],platform+" primitive line heights");
  for (const size of sizes)
    assert.equal(token("font.size."+platform+"."+size,"dimension"),size+unit[platform]);
  for (const line of lines)
    assert.equal(token("font.lineHeight."+platform+"."+line,"dimension"),line+unit[platform]);

  const file = read("semantic."+platform+".tokens.json");
  equalKeys(file,["$description","typography"],platform+" document root");
  equalKeys(file.typography,roles,platform+" semantic roles");
  for (const role of roles) {
    const t=file.typography[role];
    equalKeys(t,platform==="ios"?["$type","$value","$extensions"]:["$type","$value"],platform+" "+role+" token keys");
    assert.equal(t.$type,"typography");
    equalKeys(t.$value,["fontFamily","fontSize","fontWeight","lineHeight","letterSpacing"],platform+" "+role+" properties");
    // Exact aliases prevent accidental bypassing of the approved primitive layer.
    const [size,line]=scale[role];
    assert.deepEqual(t.$value,{
      fontFamily:"{font.family."+platform+".sans}",
      fontSize:"{font.size."+platform+"."+size+"}",
      fontWeight:"{font.weight."+weightAliases[role]+"}",
      lineHeight:"{font.lineHeight."+platform+"."+line+"}",
      letterSpacing:"{font.letterSpacing."+trackingAliases[role]+"}"
    },platform+" "+role+" alias mapping differs from approved scale");
    assert.deepEqual(resolve(t.$value.fontFamily,"fontFamily"),token("font.family."+platform+".sans","fontFamily"));
    assert.equal(resolve(t.$value.fontSize,"dimension"),size+unit[platform]);
    assert.equal(resolve(t.$value.fontWeight,"fontWeight"),weights[role]);
    assert.equal(resolve(t.$value.lineHeight,"dimension"),line+unit[platform]);
    assert.equal(resolve(t.$value.letterSpacing,"dimension"),tracking[role]);
    assert.ok(line>size,platform+" "+role+" lineHeight must exceed fontSize at baseline");
    if(platform==="ios") {
      equalKeys(t.$extensions,["moshi.ios.dynamicTypeStyle"],role+" iOS scaling metadata");
      assert.equal(t.$extensions["moshi.ios.dynamicTypeStyle"],iosCurve[role]);
    }
    // No color, background, fontFeature or component-only properties in the six styles.
    validated++;
  }
}
console.log("PASS Moshi Typography v0.1: "+validated+" styles across 3 platforms (6 roles each).");
console.log("PASS font families, weights, tracking, baseline sizes, line heights, references, iOS Dynamic Type style metadata, optional numeric feature.");
console.log("Note: native scaling, browser zoom, text reflow, and font rendering require consuming-app integration tests.");
