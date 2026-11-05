import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const load = (relative) => JSON.parse(readFileSync(new URL("../" + relative, import.meta.url), "utf8"));
const keys = (node, expected, where) => {
  assert.deepEqual(Object.keys(node).sort(), expected.slice().sort(), where + " keys differ");
};
const resolvePath = (node, path) => path.split(".").reduce((value, segment) => value?.[segment], node);
const primitiveValues = {none:0,sm:4,md:8,lg:12,xl:16,full:9999};
const geometry = {
  level1:{offsetX:"0",offsetY:"1",blur:"3",spread:"0"},
  level2:{offsetX:"0",offsetY:"2",blur:"6",spread:"0"}
};
const shade = {light:{level1:"12",level2:"20"},dark:{level1:"20",level2:"40"}};
const alphaValue = {"12":"#0000001F","20":"#00000033","40":"#00000066"};
const shape = load("tokens/shape/primitives.tokens.json");
const spacing = load("tokens/spacing/primitives.tokens.json");
const colors = load("tokens/colors/extended.tokens.json");

keys(shape,["$description","$extensions","radius","border"],"shape root");
assert.equal(shape.$extensions["moshi.version"],"0.1");
assert.equal(shape.$extensions["moshi.format"],"internal-shape-v0.1");
assert.deepEqual(shape.$extensions["moshi.units"],{web:"px",ios:"pt",android:"dp"});
assert.match(shape.$extensions["moshi.fullRadius"],/sentinel/);
keys(shape.radius,Object.keys(primitiveValues),"radius");
for (const [key,value] of Object.entries(primitiveValues)) {
  keys(shape.radius[key],["$type","$value"],"radius."+key);
  assert.deepEqual(shape.radius[key],{$type:"number",$value:value});
}
keys(shape.border,["width"],"border");
keys(shape.border.width,["default"],"border.width");
keys(shape.border.width.default,["$type","$value","$description"],"border.width.default");
assert.equal(shape.border.width.default.$type,"number");
assert.equal(shape.border.width.default.$value,1);
assert.equal(spacing.space["1"].$value,4);
for (const [key,value] of Object.entries(alphaValue)) {
  assert.equal(resolvePath(colors,"color.moshi.alpha.black."+key).$value,value);
}

let checked = 0;
for (const theme of ["light","dark"]) {
  const doc=load("tokens/shape/elevation."+theme+".tokens.json");
  keys(doc,["$description","$extensions","elevation"],theme+" elevation root");
  assert.equal(doc.$extensions["moshi.version"],"0.1");
  assert.equal(doc.$extensions["moshi.theme"],theme);
  assert.equal(doc.$extensions["moshi.default"],"none");
  assert.deepEqual(doc.$extensions["moshi.unitResolution"],{web:"px",ios:"pt",android:"dp"});
  keys(doc.elevation,["level1","level2"],theme+" elevation roles");
  for (const level of ["level1","level2"]) {
    const token=doc.elevation[level];
    keys(token,["$type","$value","$description"],theme+" "+level);
    assert.equal(token.$type,"shadow");
    keys(token.$value,["offsetX","offsetY","blur","spread","color"],theme+" "+level+" fields");
    for (const [part,step] of Object.entries(geometry[level])) {
      assert.equal(token.$value[part],"{space."+step+"}",theme+" "+level+"."+part);
      assert.equal(spacing.space[step].$type,"number");
      assert.ok(Number.isInteger(spacing.space[step].$value));
    }
    const alpha=shade[theme][level];
    assert.equal(token.$value.color,"{color.moshi.alpha.black."+alpha+"}");
    assert.equal(resolvePath(colors,"color.moshi.alpha.black."+alpha).$value,alphaValue[alpha]);
    assert.equal(spacing.space["0"].$value,0);
    assert.ok(spacing.space[geometry[level].blur].$value > 0);
    checked++;
  }
}
const documentation=readFileSync(new URL("../SHAPE.md",import.meta.url),"utf8");
for(const phrase of ["flat by default","radius.full","border.width.default","color.background.elevated","color.border.focus","two","level1","level2","9999","native"]) {
  assert.ok(documentation.toLowerCase().includes(phrase.toLowerCase()),"Missing rule in SHAPE.md: "+phrase);
}
console.log("PASS Moshi Shape, Surfaces & Elevation v0.1: 6 radii + 1 border width, "+checked+" theme-specific shadow roles.");
console.log("PASS exact geometry, approved color and spacing aliases, two-level maximum, theme metadata and key documentation rules.");
console.log("Note: native shadow parity, accessible contrast, and component rendering need consuming-app visual tests.");
