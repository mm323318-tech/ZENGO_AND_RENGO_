(function(root){
 'use strict';
 const CARDS=[{id:'qh',label:'بنت الكبة',symbol:'Q♥',value:25,red:true},{id:'qd',label:'بنت الديناري',symbol:'Q♦',value:25,red:true},{id:'qc',label:'بنت السباتي',symbol:'Q♣',value:25},{id:'qs',label:'بنت البستوني',symbol:'Q♠',value:25},{id:'kh',label:'شيخ الكبة',symbol:'K♥',value:75,red:true}];
 const empty=()=>({tricks:0,diamonds:0,cards:CARDS.map(()=>({taken:false,double:false}))});
 function score(d){let a=-15*d.tricks-10*d.diamonds;CARDS.forEach((c,i)=>{const s=d.cards[i];if(i===1&&s.taken)a-=10;if(s.taken)a-=c.value*(s.double?2:1);if(s.double&&!s.taken)a+=c.value;});return [a===0?0:a,-500-a];}
 function validate(d){const errors=[];if(!Number.isInteger(d.tricks)||d.tricks<0||d.tricks>13)errors.push('عدد اللطوش لازم يكون من 0 إلى 13.');if(!Number.isInteger(d.diamonds)||d.diamonds<0||d.diamonds>12)errors.push('الديناري بدون البنت لازم يكون من 0 إلى 12.');const diamonds=d.diamonds+(d.cards[1].taken?1:0);const penalties=diamonds+d.cards.filter((s,i)=>i!==1&&s.taken).length;const theirs=17-penalties;if(penalties>4*d.tricks)errors.push('الأوراق اللي أكلناها أكثر من سعة اللطوش المسجّلة.');if(theirs>4*(13-d.tricks))errors.push('الأوراق المتبقية للخصم أكثر من سعة لطوشه.');if(diamonds>4*d.tricks||13-diamonds>4*(13-d.tricks))errors.push('عدد الديناري لا يتناسب مع اللطوش.');return [...new Set(errors)];}
 // Exact attainable score bounds: enumerate allocations of all penalty cards,
 // retaining trick capacity for both teams. Unknown future deals allow all doubles.
 function bounds(cards){let lo=Infinity,hi=-Infinity;for(let mask=0;mask<32;mask++){let n=0,extraDiamond=0,v=0;CARDS.forEach((c,i)=>{const taken=!!(mask&(1<<i));if(taken){n++;v-=c.value*(cards?cards[i].double?2:1:2);if(i===1)extraDiamond=1;}if(!taken&&(!cards||cards[i].double))v+=c.value;});for(let d=0;d<=12;d++){const count=n+d;for(let t=0;t<=13;t++){if(count>4*t||17-count>4*(13-t))continue;const s=v-10*(d+extraDiamond)-15*t;lo=Math.min(lo,s);hi=Math.max(hi,s);}}}return {min:lo,max:hi,minSwing:2*lo+500,maxSwing:2*hi+500};}
 const api={CARDS,empty,score,validate,bounds};if(typeof module!=='undefined')module.exports=api;root.ComplexEngine=api;
})(typeof globalThis!=='undefined'?globalThis:this);

