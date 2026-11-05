import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root=join(dirname(fileURLToPath(import.meta.url)),"..");
const readJson=path=>JSON.parse(readFileSync(join(root,path),"utf8"));
const keys=(obj,expect,context)=>assert.deepEqual(Object.keys(obj).sort(),expect.slice().sort(),context+" keys differ");
const at=(obj,path)=>path.split(".").reduce((x,key)=>x?.[key],obj);
const leafNames=(obj,prefix)=>obj&&typeof obj==="object"&&Object.hasOwn(obj,"$value")?[prefix]:
  Object.entries(obj).filter(([key])=>!key.startsWith("$")).flatMap(([key,val])=>leafNames(val,prefix?prefix+"."+key:key));
const control=readJson("tokens/components/primitives.tokens.json");
keys(control,["$description","$extensions","control"],"control primitives root");
assert.equal(control.$extensions["moshi.version"],"0.1");
assert.deepEqual(control.$extensions["moshi.units"],{web:"px",ios:"pt",android:"dp"});
keys(control.control,["height","hitTarget"],"control");
keys(control.control.height,["web"],"control.height");
keys(control.control.height.web,["compact","default","comfortable"],"control.height.web");
for(const [name,value] of Object.entries({compact:32,default:36,comfortable:40})){
  assert.deepEqual(control.control.height.web[name],{$type:"number",$value:value});
}
keys(control.control.hitTarget,["minimum"],"control.hitTarget");
keys(control.control.hitTarget.minimum,["web","ios","android"],"minimum targets");
for(const [platform,n] of Object.entries({web:24,ios:44,android:48})){
  assert.deepEqual(control.control.hitTarget.minimum[platform],{$type:"number",$value:n});
}
const spacing=readJson("tokens/spacing/primitives.tokens.json");
const shape=readJson("tokens/shape/primitives.tokens.json");
const typography=readJson("tokens/typography/primitives.tokens.json");
const fontNames=new Set(["typography.display","typography.heading","typography.subheading","typography.body","typography.small","typography.caption"]);
const colorsByTheme={};
for(const theme of ["light","dark"]){
  const color=readJson("tokens/colors/semantic."+theme+".tokens.json");
  colorsByTheme[theme]=new Set(leafNames(color.color,"color"));
}
const checkToken=name=>{
  if(name==="transparent"||name==="none")return;
  if(name.startsWith("color.")){
    for(const theme of ["light","dark"])assert.ok(colorsByTheme[theme].has(name),"Color unavailable in "+theme+": "+name);
  }else if(name.startsWith("space.")){
    assert.ok(at(spacing,name)?.$type==="number","Unknown spacing: "+name);
  }else if(name.startsWith("radius.")||name.startsWith("border.width.")){
    assert.ok(at(shape,name)?.$type==="number","Unknown shape: "+name);
  }else if(name.startsWith("typography.")){
    assert.ok(fontNames.has(name),"New typography role unapproved: "+name);
  }else if(name.startsWith("font.weight.")){
    assert.ok(at(typography,name)?.$type==="fontWeight","Unknown font weight: "+name);
  }else if(name.startsWith("elevation.")){
    assert.ok(["elevation.level1","elevation.level2"].includes(name),"Unknown elevation: "+name);
  }else if(name.startsWith("control.")){
    assert.ok(at(control,name)?.$type==="number","Unknown control size: "+name);
  }else throw new Error("Unexpected token reference: "+name);
};
let refs=0;
const scan=(obj)=>{
  if(typeof obj==="string"){
    if(/^(color\.|space\.|radius\.|border\.width\.|typography\.|font\.weight\.|elevation\.|control\.)/.test(obj)||obj==="transparent"||obj==="none"){
      checkToken(obj);refs++;
    }
    assert.ok(!/^#[0-9a-f]{3,8}$/i.test(obj),"Unapproved raw color in component contract: "+obj);
  }else if(Array.isArray(obj))obj.forEach(scan);
  else if(obj&&typeof obj==="object")Object.values(obj).forEach(scan);
};
const expected={
  "button":{variants:["primary","secondary","destructive"],sizes:["compact","default","comfortable"],states:["default","hover","focus-visible","pressed","disabled","loading"]},
  "icon-button":{variants:["primary","secondary","destructive"],sizes:["compact","default","comfortable"],states:["default","hover","focus-visible","pressed","disabled","loading"]},
  "text-field":{variants:["default"],sizes:["compact","default","comfortable"],states:["default","hover","focus-visible","disabled","read-only","invalid"]},
  "checkbox":{variants:["default"],sizes:["default"],states:["unchecked","checked","indeterminate","focus-visible","disabled"]},
  "card":{variants:["outlined","plain"],sizes:["default","comfortable"],states:["default"]},
  "dialog":{variants:["standard"],sizes:["content"],states:["closed","open","loading"]}
};
for(const [id,config] of Object.entries(expected)){
  const c=readJson("components/"+id+".json");
  keys(c,["$description","id","name","version","status","role","anatomy","variants","sizes","states","tokens","behavior","accessibility","platforms"],id);
  assert.equal(c.id,id);
  assert.equal(c.version,"0.1");
  assert.equal(c.status,"specified");
  for(const key of ["variants","sizes","states"])assert.deepEqual(c[key],config[key],id+" "+key);
  for(const key of ["anatomy","accessibility"])assert.ok(Array.isArray(c[key])&&c[key].length>=2,id+" "+key);
  keys(c.platforms,["web","ios","android"],id+" platforms");
  for(const platform of ["web","ios","android"])assert.ok(c.platforms[platform].length>=1,id+" "+platform+" rules");
  scan(c.tokens);
}
const btn=readJson("components/button.json");
assert.equal(btn.tokens.appearance.secondary.default.border,"color.border.interactive");
assert.equal(btn.tokens.appearance.secondary.default.background,"transparent");
for(const variant of btn.variants){
  assert.equal(btn.tokens.appearance[variant].pressed.background,btn.tokens.appearance[variant].hover.background);
}
assert.equal(btn.tokens.appearance.primary.default.background,"color.background.action.primary.default");
assert.equal(btn.tokens.appearance.destructive.default.background,"color.background.action.destructive.default");
assert.equal(readJson("components/icon-button.json").tokens.inheritsAppearanceFrom,"button");
assert.equal(readJson("components/text-field.json").tokens.colors.invalidMessage,"color.foreground.status.error");
assert.equal(readJson("components/checkbox.json").tokens.visualSize,16);
assert.equal(readJson("components/card.json").tokens.elevation,"none");
assert.equal(readJson("components/dialog.json").tokens.colors.backdrop,"color.background.overlay");
assert.equal(readJson("components/dialog.json").tokens.elevation,"elevation.level2");
const docs=readFileSync(join(root,"COMPONENTS.md"),"utf8");
for(const word of ["Button","Icon Button","Text Field","Checkbox","Card","Dialog","focus","loading","44pt","48dp"]){
  assert.ok(docs.includes(word),"Documentation missing "+word);
}
console.log("PASS Moshi Components v0.1: 6 portable component contracts, "+refs+" approved design-token references.");
console.log("PASS web sizing, native target minima, variants, states, accessibility contracts, no invented semantic colors.");
console.log("Note: component runtime behavior and assistive-technology results require platform integration tests.");
