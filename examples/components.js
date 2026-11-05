"use strict";
const body=document.body;
const toggle=document.getElementById("theme-toggle");
toggle.addEventListener("click",()=>{
  const dark=body.dataset.theme!=="dark";
  body.dataset.theme=dark?"dark":"light";
  toggle.setAttribute("aria-pressed",String(dark));
  toggle.textContent=dark?"Switch to light theme":"Switch to dark theme";
});
const trigger=document.getElementById("open-dialog");
const dialog=document.getElementById("project-dialog");
const cancel=document.getElementById("dialog-cancel");
const result=document.getElementById("dialog-result");
trigger.addEventListener("click",()=>{
  dialog.showModal();
  cancel.focus();
});
dialog.addEventListener("close",()=>{
  result.textContent=dialog.returnValue==="archive"?"Archive selected (demo only; no data changed).":"Dialog dismissed.";
  trigger.focus({preventScroll:true});
});
