(()=>{'use strict';
const key='complex-theme',root=document.documentElement;
let dark=false;try{dark=localStorage.getItem(key)==='dark';}catch{}
function apply(){root.dataset.theme=dark?'dark':'light';const button=document.getElementById('theme-toggle');if(button){button.textContent=dark?'☀ عادي':'☾ داكن';button.setAttribute('aria-pressed',String(dark));button.setAttribute('aria-label',dark?'تفعيل الوضع العادي':'تفعيل الوضع الداكن');}}
apply();document.addEventListener('DOMContentLoaded',()=>{apply();document.getElementById('theme-toggle').addEventListener('click',()=>{dark=!dark;apply();try{localStorage.setItem(key,dark?'dark':'light');}catch{}});});
})();
