import assert from "node:assert/strict";
import {readFileSync,writeFileSync} from "node:fs";
import {dirname,join} from "node:path";
import {fileURLToPath} from "node:url";

const root=join(dirname(fileURLToPath(import.meta.url)),"..");
const get=path=>JSON.parse(readFileSync(join(root,path),"utf8"));
const output=join(root,"examples/components.tokens.css");
const space=get("tokens/spacing/primitives.tokens.json");
const shape=get("tokens/shape/primitives.tokens.json");
const controls=get("tokens/components/primitives.tokens.json");
const typePrimitives=get("tokens/typography/primitives.tokens.json");
const webType=get("tokens/typography/semantic.web.tokens.json");
const allColors=Object.assign({},...["primitives","radix","extended"].map(name=>get("tokens/colors/"+name+".tokens.json").color));
const groups={color:allColors,space:space.space,font:typePrimitives.font,radius:shape.radius};
const at=(node,path)=>path.split(".").reduce((v,k)=>v?.[k],node);
const resolve=value=>{
  const match=typeof value==="string"&&/^\{([^}]+)\}$/.exec(value);
  if(!match)return value;
  const [group,...rest]=match[1].split(".");
  const leaf=at(groups[group],rest.join("."));
  assert.ok(leaf&&Object.hasOwn(leaf,"$value"),"Unresolved token: "+match[1]);
  return resolve(leaf.$value);
};
const flatten=(node,path)=>Object.hasOwn(node,"$value")?[[path,node.$value]]:
  Object.entries(node).filter(([key])=>!key.startsWith("$")).flatMap(([key,v])=>flatten(v,path?path+"."+key:key));
const dash=value=>value.replace(/[A-Z]/g,letter=>"-"+letter.toLowerCase()).replaceAll(".","-");
const block=(selector,entries)=>selector+" {\n"+entries.map(([name,value])=>"  "+name+": "+value+";").join("\n")+"\n}\n";
const base=[];
for(const [name,t] of Object.entries(space.space))base.push(["--moshi-space-"+name,t.$value+"px"]);
for(const [name,t] of Object.entries(shape.radius))base.push(["--moshi-radius-"+name,t.$value+"px"]);
base.push(["--moshi-border-width-default",shape.border.width.default.$value+"px"]);
for(const [name,t] of Object.entries(controls.control.height.web))base.push(["--moshi-control-height-"+name,t.$value+"px"]);
base.push(["--moshi-font-sans",typePrimitives.font.family.web.sans.$value.join(", ")]);
for(const name of ["body","small","subheading","heading"]){
  const props=webType.typography[name].$value;
  for(const [key,label] of [["fontSize","size"],["lineHeight","line-height"],["fontWeight","weight"],["letterSpacing","tracking"]])
    base.push(["--moshi-type-"+name+"-"+label,resolve(props[key])]);
}
const themes={};
for(const theme of ["light","dark"]){
  const tokens=flatten(get("tokens/colors/semantic."+theme+".tokens.json").color,"color");
  const entries=tokens.map(([name,value])=>["--moshi-"+dash(name),resolve(value)]);
  const elev=get("tokens/shape/elevation."+theme+".tokens.json").elevation;
  for(const [level,token] of Object.entries(elev)){
    const v=token.$value;
    const values=["offsetX","offsetY","blur","spread"].map(key=>resolve(v[key])+"px").join(" ");
    entries.push(["--moshi-elevation-"+level,values+" "+resolve(v.color)]);
  }
  themes[theme]=entries;
}
const generated="/* Generated from approved Moshi tokens. Run node scripts/build-component-reference.mjs to update. */\n"+
  block(":root",base)+block(':root, [data-theme="light"]',themes.light)+block('[data-theme="dark"]',themes.dark);
if(process.argv.includes("--check")){
  assert.equal(readFileSync(output,"utf8"),generated,"Stale token stylesheet. Run node scripts/build-component-reference.mjs");
  console.log("PASS component reference token CSS matches approved Colors, Spacing, Shape, Typography, and Controls.");
}else{
  writeFileSync(output,generated,"utf8");
  console.log("Wrote examples/components.tokens.css");
}
