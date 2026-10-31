#!/usr/bin/env node
// Moshi v0.1 semantic color validation: no external dependencies.
import {readFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const base=join(dirname(fileURLToPath(import.meta.url)),'../tokens/colors');
const read=n=>JSON.parse(readFileSync(join(base,n),'utf8'));
const prim=Object.assign({},...['primitives.tokens.json','radix.tokens.json','extended.tokens.json'].map(n=>read(n).color));
const expected={
  "background.canvas": [
    "#F0F0F2",
    "#131419"
  ],
  "background.surface": [
    "#FFFFFF",
    "#262A34"
  ],
  "background.elevated": [
    "#FFFFFF",
    "#32353F"
  ],
  "background.selected": [
    "#F7F7F7",
    "#32353F"
  ],
  "background.disabled": [
    "#F0F0F0",
    "#1E222C"
  ],
  "background.inverse": [
    "#252525",
    "#FFFFFF"
  ],
  "background.overlay": [
    "#00000066",
    "#00000099"
  ],
  "background.brand": [
    "#FF4C00",
    "#FF4C00"
  ],
  "background.action.primary.default": [
    "#2B4FB9",
    "#2B4FB9"
  ],
  "background.action.primary.hover": [
    "#002182",
    "#5069C3"
  ],
  "background.action.secondary.hover": [
    "#E7EAF6",
    "#213554"
  ],
  "background.action.destructive.default": [
    "#CA244D",
    "#B3445A"
  ],
  "background.action.destructive.hover": [
    "#64172B",
    "#883447"
  ],
  "background.status.success": [
    "#E9F6E9",
    "#182A1D"
  ],
  "background.status.warning": [
    "#FFF7C2",
    "#302008"
  ],
  "background.status.error": [
    "#FEEAED",
    "#3B121E"
  ],
  "background.status.info": [
    "#E6F4FE",
    "#0D2847"
  ],
  "foreground.primary": [
    "#252525",
    "#FFFFFF"
  ],
  "foreground.secondary": [
    "#666666",
    "#FFFFFFCC"
  ],
  "foreground.disabled": [
    "#7A7A7A",
    "#FFFFFF80"
  ],
  "foreground.inverse": [
    "#FFFFFF",
    "#252525"
  ],
  "foreground.link": [
    "#2B4FB9",
    "#9DA9CA"
  ],
  "foreground.onAction.primary": [
    "#FFFFFF",
    "#FFFFFF"
  ],
  "foreground.onAction.destructive": [
    "#FFFFFF",
    "#FFFFFF"
  ],
  "foreground.action.secondary": [
    "#2B4FB9",
    "#9DA9CA"
  ],
  "foreground.action.destructive": [
    "#CA244D",
    "#FF949D"
  ],
  "foreground.status.success": [
    "#2A7E3B",
    "#71D083"
  ],
  "foreground.status.warning": [
    "#4F3422",
    "#FFCA16"
  ],
  "foreground.status.error": [
    "#CA244D",
    "#FF949D"
  ],
  "foreground.status.info": [
    "#113264",
    "#70B8FF"
  ],
  "border.default": [
    "#0000001F",
    "#FFFFFF1F"
  ],
  "border.strong": [
    "#00000033",
    "#FFFFFF33"
  ],
  "border.interactive": [
    "#5069C3",
    "#9DA9CA"
  ],
  "border.focus": [
    "#558EDD",
    "#558EDD"
  ],
  "border.status.success": [
    "#B2DDB5",
    "#2D5637"
  ],
  "border.status.warning": [
    "#F3D673",
    "#5C3D05"
  ],
  "border.status.error": [
    "#F8BFC8",
    "#6F2539"
  ],
  "border.status.info": [
    "#ACD8FC",
    "#104D87"
  ]
};
const radixExpected={
  "grass.light.3": "#E9F6E9",
  "grass.light.6": "#B2DDB5",
  "grass.light.11": "#2A7E3B",
  "grass.dark.3": "#1B2A1E",
  "grass.dark.6": "#2D5736",
  "grass.dark.11": "#71D083",
  "amber.light.3": "#FFF7C2",
  "amber.light.6": "#F3D673",
  "amber.light.12": "#4F3422",
  "amber.dark.3": "#302008",
  "amber.dark.6": "#5C3D05",
  "amber.dark.11": "#FFCA16",
  "ruby.light.3": "#FEEAED",
  "ruby.light.6": "#F8BFC8",
  "ruby.light.11": "#CA244D",
  "ruby.light.12": "#64172B",
  "ruby.dark.3": "#3A141E",
  "ruby.dark.6": "#6F2539",
  "ruby.dark.7": "#883447",
  "ruby.dark.8": "#B3445A",
  "ruby.dark.11": "#FF949D",
  "blue.light.3": "#E6F4FE",
  "blue.light.6": "#ACD8FC",
  "blue.light.12": "#113264",
  "blue.dark.3": "#0D2847",
  "blue.dark.6": "#104D87",
  "blue.dark.11": "#70B8FF"
};
const get=(o,p)=>p.split('.').reduce((v,k)=>v?.[k],o);
const walk=(o,p='',r={})=>{
  for(const [k,v] of Object.entries(o)){
    if(k.startsWith('$'))continue;
    const q=p?p+'.'+k:k;
    if(v&&typeof v==='object'&&'$value' in v)r[q]=v.$value;
    else if(v&&typeof v==='object')walk(v,q,r);
  }
  return r;
};
const radix=read('radix.tokens.json');
assert.equal(radix.$extensions['moshi.version'],'3.0.0');
assert.deepEqual(walk(radix.color.radix),radixExpected,'Pinned Radix sRGB source snapshot changed');
for(const [path,hex] of Object.entries({
  'moshi.adjusted.radix.grass.dark.3':'#182A1D',
  'moshi.adjusted.radix.grass.dark.6':'#2D5637',
  'moshi.adjusted.radix.ruby.dark.3':'#3B121E'
})) assert.equal(get(prim,path)?.$value,hex,'Moshi-approved override changed: '+path);
for(const [path,hex] of Object.entries({
  'grass.dark.3':'#1B2A1E','grass.dark.6':'#2D5736','ruby.dark.3':'#3A141E'
})) assert.equal(get(radix.color.radix,path)?.$value,hex,'Pinned upstream value changed: '+path);
const resolved={};
for(const mode of ['light','dark']){
  const rows=walk(read('semantic.'+mode+'.tokens.json').color);
  assert.equal(Object.keys(rows).length,38,'Wrong role count');
  assert.deepEqual(Object.keys(rows).sort(),Object.keys(expected).sort(),'Wrong semantic paths');
  const result={};
  for(const [path,ref] of Object.entries(rows)){
    assert.match(ref,/^\{color\.[A-Za-z0-9_.]+\}$/,'Invalid alias: '+ref);
    const raw=get(prim,ref.slice(7,-1))?.$value;
    assert.match(raw??'',/^#[A-F0-9]{6}(?:[A-F0-9]{2})?$/,'Invalid primitive: '+ref);
    assert.equal(raw,expected[path][mode==='light'?0:1],'Approved HEX drift: '+mode+' '+path);
    result[path]=raw;
  }
  resolved[mode]=result;
}
const channels=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255);
const relativeLuminance=rgb=>rgb.map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4).reduce((a,v,i)=>a+v*[0.2126,0.7152,0.0722][i],0);
const composite=(foreground,background)=>{
  const fg=channels(foreground),bg=channels(background);
  if(foreground.length!==9)return fg;
  const alpha=parseInt(foreground.slice(7,9),16)/255;
  return fg.map((v,i)=>alpha*v+(1-alpha)*bg[i]);
};
const ratio=(foreground,background)=>{
  assert.equal(background.length,7,'Contrast background must be opaque');
  const x=relativeLuminance(composite(foreground,background)),y=relativeLuminance(channels(background));
  return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
};
let pairs=0;
function check(mode,f,b){
  const x=resolved[mode][f],y=resolved[mode][b];
  assert.ok(x&&y,'Missing roles '+f+' '+b);
  assert.ok(ratio(x,y)>=4.5,'WCAG AA text contrast failed ('+mode+' '+f+'/'+b+'): '+ratio(x,y).toFixed(2));
  pairs++;
}
for(const mode of ['light','dark']){
  for(const s of ['success','warning','error','info'])check(mode,'foreground.status.'+s,'background.status.'+s);
  for(const action of ['primary','destructive'])for(const state of ['default','hover'])check(mode,'foreground.onAction.'+action,'background.action.'+action+'.'+state);
  check(mode,'foreground.action.secondary','background.action.secondary.hover');
  for(const f of ['primary','secondary','link'])for(const b of ['canvas','surface'])check(mode,'foreground.'+f,'background.'+b);
  check(mode,'foreground.action.secondary','background.surface');
}
const focus=ratio(resolved.light['border.focus'],resolved.light['background.canvas']);
assert.ok(focus<3,'Review contextual contrast-band policy because focus contrast has changed');
console.log('PASS: 38 approved semantic roles × 2 themes; '+Object.keys(radixExpected).length+' pinned Radix primitives; '+pairs+' AA contrast pairs.');
console.log('3 Moshi-approved dark HEX overrides are explicitly isolated from upstream Radix.');
console.log('Focus on light canvas: '+focus.toFixed(2)+':1 — contextual neutral band required.');

