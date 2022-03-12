import{d as z,r as d,c as m,a as s,n as F,o as f,b as O,e as V,w as c,v as g,f as D,F as C,g as L,h as U,i as w,j as E}from"./vendor.07388c62.js";const N=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerpolicy&&(i.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?i.credentials="include":l.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(l){if(l.ep)return;l.ep=!0;const i=n(l);fetch(l.href,i)}};N();var I=(e,t)=>{const n=e.__vccOpts||e;for(const[r,l]of t)n[r]=l;return n};const M=z({setup(){const e=d([]),t=d(!1);return{previewUrls:e,droppable:t}},mounted(){window.addEventListener("dragover",this.onDragover),window.addEventListener("drop",this.onDrop)},unmounted(){window.removeEventListener("dragover",this.onDragover),window.removeEventListener("drop",this.onDrop)},methods:{reset(){this.previewUrls=[],this.droppable=!1},onFileSelect(e){const t=e.target;if(!t.files)return;const n=[];for(let r=0;r<t.files.length;r++)n.push(t.files[r]);this.preview(n)},async preview(e){let t=[];for(let n of e)t.push(new Promise(r=>{const l=new FileReader;l.readAsDataURL(n),l.onload=i=>{r(i.target.result)}}));this.previewUrls=await Promise.all(t),this.$emit("selected",this.previewUrls)},imagesFromDragEvt(e){var r;const t=(r=e.dataTransfer)==null?void 0:r.items;if(!t||t.length===0)return[];const n=[];for(let l=0;l<t.length;l++)t[l].type.startsWith("image/")&&n.push(t[l]);return n},onDrop(e){console.log("onDrop"),this.droppable=!1;const t=this.imagesFromDragEvt(e);if(t.length===0)return!1;const n=[];for(const r of t){const l=r.getAsFile();l&&n.push(l)}return n.length===0||(this.preview(n),e.preventDefault()),!1},onDragover(e){return console.log("onDragover"),this.imagesFromDragEvt(e).length===0||(this.droppable=!0,e.preventDefault()),!1},onDragleave(){console.log("onDragleave"),this.droppable=!1}}}),H=s("span",{class:"button is-small"},"Add File",-1);function P(e,t,n,r,l,i){return f(),m("div",{class:F(["image-select",{droppable:e.droppable}])},[s("div",{class:"drop-target",onDragleave:t[0]||(t[0]=(...a)=>e.onDragleave&&e.onDragleave(...a))},null,32),s("div",null,[s("label",null,[s("input",{type:"file",style:{display:"none"},onChange:t[1]||(t[1]=(...a)=>e.onFileSelect&&e.onFileSelect(...a)),accept:"image/*"},null,32),H])])],2)}var R=I(M,[["render",P]]);const X=async e=>new Promise(t=>{const n=new Image;n.crossOrigin="anonymous",n.onload=()=>{t(n)},n.src=e}),B=e=>{var t=Math.PI;return e*(t/180)};function Y(e){for(let t=e.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}return e}const j=z({components:{ImageSelect:R},setup(){const e=d([]),t=d(!1),n=d(""),r=d("#000000"),l=d(150),i=d(1280),a=d(720),o=d(50),h=d(!0),b=d(!0),y=d(!1);return{urls:e,wantToAddUrls:t,inputUrl:n,bgColor:r,spacing:l,canvasWidth:i,canvasHeight:a,imagesSize:o,randomizeOrder:h,randomizeAngle:b,tryToWrapAround:y}},methods:{removeUrl(e){this.urls=this.urls.filter((t,n)=>e!==n)},addUrlsStr(){const e=this.inputUrl.split(/[\n\r]+/).filter(t=>!!t);this.urls.push(...e)},onImageSelected(e){this.urls.push(...e),this.$refs.imageSelect.reset()},async generate(){const e=this.$refs.canvas;if(!e)return;const t=e.getContext("2d");if(!t)return;const n=parseInt(`${this.spacing}`,10),r=parseInt(`${this.imagesSize}`,10),l=parseInt(`${this.imagesSize}`,10);e.width=parseInt(`${this.canvasWidth}`,10),e.height=parseInt(`${this.canvasHeight}`,10),t.fillStyle=this.bgColor,t.fillRect(0,0,e.width,e.height);const i=[];for(let v of this.urls)i.push(await X(v));let a=0,o=0;const h=n/4;let b=this.tryToWrapAround?0:-n,y=this.tryToWrapAround?0:-n;for(let v=b;v<e.height;v+=n){const u=v+h,T=o%2===0?n/2:0;for(let k=y;k<e.width;k+=n){const p=k+T+h;a%this.urls.length===0&&this.randomizeOrder&&Y(i);const W=i[a%this.urls.length],A=this.randomizeAngle?B(Math.random()*360):0,_=[[p,u]];this.tryToWrapAround&&_.push([p+e.width,u],[p-e.width,u],[p,u+e.height],[p,u-e.height],[p+e.width,u+e.height],[p-e.width,u-e.height],[p+e.width,u-e.height],[p-e.width,u+e.height]);for(let[S,$]of _)t.save(),t.translate(S,$),t.rotate(A),t.drawImage(W,-r/2,-l/2,r,l),t.rotate(-A),t.translate(-S,-$),t.restore();a++}o++}}}}),q={class:"card"},G={class:"panel-block"},K=w(" Add files by clicking "),J=w(", dragging images on the browser, or by "),Q=w(". "),Z={key:0,class:"fake-panel-block"},x=w(" Note: This may not always work for all external urls. "),ee=s("br",null,null,-1),te={key:1,class:"fake-panel-block"},se=w(" Click on an image to remove it. "),ne=s("br",null,null,-1),le=["src","onClick"],oe={class:"panel-block"},re={class:"table"},ie=s("td",null,"bgColor",-1),ae=s("td",null,null,-1),de=s("td",null,"imagesSize",-1),ue=s("td",null,null,-1),pe=s("td",null,"spacing",-1),ce=s("td",null,null,-1),he=s("td",null,"canvasWidth",-1),ge=s("td",null,null,-1),me=s("td",null,"canvasHeight",-1),fe=s("td",null,null,-1),ve=s("td",null,"randomizeOrder",-1),we=s("td",null,null,-1),be=s("td",null,"randomizeAngle",-1),ye=s("td",null,null,-1),ke=s("td",null,"tryToWrapAround",-1),Ue=s("td",null," Create a background that can be repeated forever. For this to work, the canvas width/height should be equal, and a multiple of the spacing.",-1),Ae={class:"panel-block"},_e={ref:"canvas"};function Se(e,t,n,r,l,i){const a=O("image-select");return f(),m(C,null,[s("div",q,[s("div",G,[K,V(a,{onSelected:e.onImageSelected,ref:"imageSelect"},null,8,["onSelected"]),J,s("span",{class:"button is-small",onClick:t[0]||(t[0]=o=>e.wantToAddUrls=!e.wantToAddUrls)},"adding urls"),Q]),e.wantToAddUrls?(f(),m("div",Z,[x,ee,c(s("textarea",{class:"textarea is-small mb-1","onUpdate:modelValue":t[1]||(t[1]=o=>e.inputUrl=o)},null,512),[[g,e.inputUrl]]),s("span",{class:"button is-small",onClick:t[2]||(t[2]=(...o)=>e.addUrlsStr&&e.addUrlsStr(...o))},"Add URL(s)")])):D("",!0),e.urls.length?(f(),m("div",te,[se,ne,(f(!0),m(C,null,L(e.urls,(o,h)=>(f(),m("img",{key:h,width:"100",src:e.urls[h],onClick:b=>e.removeUrl(h),class:"is-clickable mr-1"},null,8,le))),128))])):D("",!0),s("div",oe,[s("table",re,[s("tr",null,[ie,s("td",null,[c(s("input",{class:"input is-small",type:"color","onUpdate:modelValue":t[3]||(t[3]=o=>e.bgColor=o)},null,512),[[g,e.bgColor]])]),ae]),s("tr",null,[de,s("td",null,[c(s("input",{class:"input is-small","onUpdate:modelValue":t[4]||(t[4]=o=>e.imagesSize=o)},null,512),[[g,e.imagesSize]])]),ue]),s("tr",null,[pe,s("td",null,[c(s("input",{class:"input is-small","onUpdate:modelValue":t[5]||(t[5]=o=>e.spacing=o)},null,512),[[g,e.spacing]])]),ce]),s("tr",null,[he,s("td",null,[c(s("input",{class:"input is-small","onUpdate:modelValue":t[6]||(t[6]=o=>e.canvasWidth=o)},null,512),[[g,e.canvasWidth]])]),ge]),s("tr",null,[me,s("td",null,[c(s("input",{class:"input is-small","onUpdate:modelValue":t[7]||(t[7]=o=>e.canvasHeight=o)},null,512),[[g,e.canvasHeight]])]),fe]),s("tr",null,[ve,s("td",null,[c(s("input",{type:"checkbox","onUpdate:modelValue":t[8]||(t[8]=o=>e.randomizeOrder=o)},null,512),[[U,e.randomizeOrder]])]),we]),s("tr",null,[be,s("td",null,[c(s("input",{type:"checkbox","onUpdate:modelValue":t[9]||(t[9]=o=>e.randomizeAngle=o)},null,512),[[U,e.randomizeAngle]])]),ye]),s("tr",null,[ke,s("td",null,[c(s("input",{type:"checkbox","onUpdate:modelValue":t[10]||(t[10]=o=>e.tryToWrapAround=o)},null,512),[[U,e.tryToWrapAround]])]),Ue])])]),s("div",Ae,[s("span",{class:"button is-small",onClick:t[11]||(t[11]=(...o)=>e.generate&&e.generate(...o))},"Generate!!!!")])]),s("canvas",_e,null,512)],64)}var $e=I(j,[["render",Se]]);const De=async()=>{E($e).mount("#app")};De();
