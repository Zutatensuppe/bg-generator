import{d as S,r as u,c as g,a as r,n as U,o as f,b as D,e as $,w as p,v as m,F as z,f as I,g as C,h as F}from"./vendor.c1d06252.js";const k=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}};k();var b=(e,t)=>{const s=e.__vccOpts||e;for(const[l,n]of t)s[l]=n;return s};const O=S({setup(){const e=u([]),t=u(!1);return{previewUrls:e,droppable:t}},methods:{reset(){this.previewUrls=[],this.droppable=!1},onFileSelect(e){const t=e.target;if(!t.files)return;const s=[];for(let l=0;l<t.files.length;l++)s.push(t.files[l]);this.preview(s)},async preview(e){let t=[];for(let s of e)t.push(new Promise(l=>{const n=new FileReader;n.readAsDataURL(s),n.onload=i=>{l(i.target.result)}}));this.previewUrls=await Promise.all(t),this.$emit("selected",this.previewUrls)},imagesFromDragEvt(e){var l;const t=(l=e.dataTransfer)==null?void 0:l.items;if(!t||t.length===0)return[];const s=[];for(let n=0;n<t.length;n++)t[n].type.startsWith("image/")&&s.push(t[n]);return s},onDrop(e){this.droppable=!1;const t=this.imagesFromDragEvt(e);if(t.length===0)return!1;const s=[];for(const l of t){const n=l.getAsFile();n&&s.push(n)}return s.length===0||(this.preview(s),e.preventDefault()),!1},onDragover(e){return this.imagesFromDragEvt(e).length===0||(this.droppable=!0,e.preventDefault()),!1},onDragleave(){this.droppable=!1}}}),L=r("div",{class:"drop-target"},null,-1),V=r("span",{class:"button is-small"},"Add File",-1);function A(e,t,s,l,n,i){return f(),g("div",{class:U(["image-select",{"has-image":e.previewUrls.length,"no-image":!e.previewUrls.length,droppable:e.droppable}]),onDrop:t[1]||(t[1]=(...o)=>e.onDrop&&e.onDrop(...o)),onDragover:t[2]||(t[2]=(...o)=>e.onDragover&&e.onDragover(...o)),onDragleave:t[3]||(t[3]=(...o)=>e.onDragleave&&e.onDragleave(...o))},[L,r("div",null,[r("label",null,[r("input",{type:"file",style:{display:"none"},onChange:t[0]||(t[0]=(...o)=>e.onFileSelect&&e.onFileSelect(...o)),accept:"image/*"},null,32),V])])],34)}var M=b(O,[["render",A]]);const R=async e=>new Promise(t=>{const s=new Image;s.crossOrigin="anonymous",s.onload=()=>{t(s)},s.src=e}),E=e=>{var t=Math.PI;return e*(t/180)};function P(e){for(let t=e.length-1;t>0;t--){const s=Math.floor(Math.random()*(t+1));[e[t],e[s]]=[e[s],e[t]]}return e}const N=S({components:{ImageSelect:M},setup(){const e=u([]),t=u(""),s=u("#000"),l=u(150),n=u(450),i=u(40),o=u(!0);return{urls:e,inputUrl:t,bgColor:s,spacing:l,canvasSize:n,imagesSize:i,randomizeOrder:o}},methods:{removeUrl(e){this.urls=this.urls.filter((t,s)=>e!==s)},addUrlsStr(){const e=this.inputUrl.split(/[\n\r]+/).filter(t=>!!t);this.urls.push(...e)},onImageSelected(e){this.urls.push(...e),this.$refs.imageSelect.reset()},async generate(){const e=parseInt(`${this.spacing}`,10),t=document.createElement("canvas");t.width=parseInt(`${this.canvasSize}`,10),t.height=parseInt(`${this.canvasSize}`,10);const s=t.getContext("2d");if(!s)return;s.fillStyle=this.bgColor,s.fillRect(0,0,t.width,t.height);const l=[];for(let o of this.urls)l.push(await R(o));let n=0,i=0;for(let o=0;o<t.height;o+=e){for(let a=0;a<t.width;a+=e){const d=a+(i%2===0?e/4+e/2:e/4),c=o+e/4;n%this.urls.length===0&&this.randomizeOrder&&P(l);const w=l[n%this.urls.length],h=parseInt(`${this.imagesSize}`,10),v=parseInt(`${this.imagesSize}`,10),y=E(Math.random()*360);s.save(),s.translate(d,c),s.rotate(y),s.drawImage(w,-h/2,-v/2,h,v),s.rotate(-y),s.translate(-d,-c),s.restore(),n++}i++}console.log(t.toDataURL()),document.body.style.backgroundImage=`url(${t.toDataURL()})`}}}),B=["src","onClick"],T=r("td",null,"bgColor",-1),j=r("td",null,"imagesSize",-1),q=r("td",null,"spacing",-1),G=r("td",null,"canvasSize",-1),K=r("td",null,"randomizeOrder",-1);function W(e,t,s,l,n,i){const o=D("image-select");return f(),g("div",null,[$(o,{onSelected:e.onImageSelected,ref:"imageSelect"},null,8,["onSelected"]),p(r("textarea",{class:"textarea","onUpdate:modelValue":t[0]||(t[0]=a=>e.inputUrl=a)},null,512),[[m,e.inputUrl]]),r("span",{class:"button is-small",onClick:t[1]||(t[1]=(...a)=>e.addUrlsStr&&e.addUrlsStr(...a))},"Add URL(s)"),(f(!0),g(z,null,I(e.urls,(a,d)=>(f(),g("img",{key:d,width:"100",src:e.urls[d],onClick:c=>e.removeUrl(d)},null,8,B))),128)),r("table",null,[r("tr",null,[T,r("td",null,[p(r("input",{class:"input is-small","onUpdate:modelValue":t[2]||(t[2]=a=>e.bgColor=a)},null,512),[[m,e.bgColor]])])]),r("tr",null,[j,r("td",null,[p(r("input",{class:"input is-small","onUpdate:modelValue":t[3]||(t[3]=a=>e.imagesSize=a)},null,512),[[m,e.imagesSize]])])]),r("tr",null,[q,r("td",null,[p(r("input",{class:"input is-small","onUpdate:modelValue":t[4]||(t[4]=a=>e.spacing=a)},null,512),[[m,e.spacing]])])]),r("tr",null,[G,r("td",null,[p(r("input",{class:"input is-small","onUpdate:modelValue":t[5]||(t[5]=a=>e.canvasSize=a)},null,512),[[m,e.canvasSize]])])]),r("tr",null,[K,r("td",null,[p(r("input",{type:"checkbox","onUpdate:modelValue":t[6]||(t[6]=a=>e.randomizeOrder=a)},null,512),[[C,e.randomizeOrder]])])])]),r("div",null,[r("span",{class:"button is-small",onClick:t[7]||(t[7]=(...a)=>e.generate&&e.generate(...a))},"Generate!!!!")])])}var X=b(N,[["render",W]]);const Y=async()=>{F(X).mount("#app")};Y();
