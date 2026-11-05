import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = name => JSON.parse(readFileSync(new URL("../tokens/spacing/" + name, import.meta.url), "utf8"));
const keys = (obj, expected, name) => assert.deepEqual(Object.keys(obj).sort(),expected.slice().sort(),name+" keys");
const at = (obj, path) => path.split(".").reduce((node,k)=>node?.[k],obj);
const leaves = (node,path) => Object.hasOwn(node,"$value") ? [path] :
  Object.entries(node).filter(([key])=>!key.startsWith("$")).flatMap(([key,v])=>leaves(v,path+"."+key));
const steps = {"0":0,"1":4,"2":8,"3":12,"4":16,"5":20,"6":24,"8":32,"10":40,"12":48,"16":64};
const aliases = {"layout.page.gutter.narrow":"4","layout.page.gutter.medium":"6","layout.page.gutter.wide":"8","layout.page.sectionGap.compact":"8","layout.page.sectionGap.comfortable":"12","layout.section.headerGap":"4","layout.grid.gap.compact":"3","layout.grid.gap.comfortable":"6"};
const primitives=read("primitives.tokens.json");
keys(primitives,["$description","$extensions","space"],"primitive root");
assert.equal(primitives.$extensions["moshi.version"],"0.1");
assert.equal(primitives.$extensions["moshi.format"],"internal-spacing-v0.1");
assert.deepEqual(primitives.$extensions["moshi.units"],{web:"px",ios:"pt",android:"dp"});
keys(primitives.space,Object.keys(steps),"approved steps");
for(const [step,n] of Object.entries(steps)){
  keys(primitives.space[step],["$type","$value"],"space."+step);
  assert.deepEqual(primitives.space[step],{$type:"number",$value:n},"space."+step);
}
let resolved=0;
for(const platform of ["web","ios","android"]){
  const doc=read("semantic."+platform+".tokens.json");
  keys(doc,["$description","$extensions","layout"],platform+" root");
  keys(doc.layout,["page","section","grid","content"],platform+" layout groups");
  assert.equal(doc.$extensions["moshi.version"],"0.1");
  assert.equal(doc.$extensions["moshi.platform"],platform);
  assert.equal(doc.$extensions["moshi.spacingUnit"],{web:"px",ios:"pt",android:"dp"}[platform]);
  assert.equal(doc.$extensions["moshi.pageGutterSelection"],platform==="web"?"viewport-only":"usable-content-space");
  assert.match(doc.$extensions["moshi.safeArea"],/once/);
  if(platform==="web") assert.deepEqual(doc.$extensions["moshi.pageGutterBreakpointsPx"],{mediumMin:640,wideMin:1024});
  else assert.ok(!Object.hasOwn(doc.$extensions,"moshi.pageGutterBreakpointsPx"));
  const names=leaves(doc.layout,"layout");
  assert.deepEqual(names.sort(),[...Object.keys(aliases),"layout.content.reading.maxWidth"].sort(),platform+" layout tokens");
  for(const [path,step] of Object.entries(aliases)){
    const leaf=at(doc,path);
    keys(leaf,["$type","$value"],platform+" "+path);
    assert.deepEqual(leaf,{$type:"number",$value:"{space."+step+"}"},platform+" "+path);
    assert.equal(primitives.space[step].$value,steps[step]);
    resolved++;
  }
  const reading=at(doc,"layout.content.reading.maxWidth");
  if(platform==="web"){
    keys(reading,["$type","$value","$description"],"web reading");
    assert.equal(reading.$type,"dimension");
    assert.equal(reading.$value,"70ch");
  }else{
    keys(reading,["$type","$value","$extensions"],platform+" reading");
    assert.equal(reading.$type,"number");
    assert.equal(reading.$value,70);
    assert.equal(reading.$extensions["moshi.measure"],"approximate-characters");
    assert.equal(reading.$extensions["moshi.referenceStyle"],"typography.body");
    assert.match(reading.$extensions["moshi.resolution"],/accessibility-scaled/);
  }
}
const spec=readFileSync(new URL("../SPACING.md",import.meta.url),"utf8");
for(const phrase of ["auto-fill","70ch","640","1024","safe areas","equal height","incomplete final row"]){
  assert.ok(spec.toLowerCase().includes(phrase),"Missing documented policy: "+phrase);
}
console.log("PASS Moshi Spacing & Layout v0.1: 11 primitives; "+resolved+" alias mappings across 3 platforms; 3 reading measures.");
console.log("PASS shared units, web-only gutter breakpoints, platform safe-area rules and approved layout roles.");
console.log("Note: actual accessibility reflow, native insets and grid visuals require consuming-app tests.");
