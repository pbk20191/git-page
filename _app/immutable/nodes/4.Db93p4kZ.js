var $t=Object.defineProperty;var Gt=(t,i,e)=>i in t?$t(t,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[i]=e;var Ce=(t,i,e)=>Gt(t,typeof i!="symbol"?i+"":i,e);import{t as ue,a as ee,e as St}from"../chunks/a5WjkIqk.js";import{z as Ot,b as Wt,i as st,h as xe,C as Jt,d as Ht,K as v,a2 as Kt,e as jt,g as zt,j as lt,n as Ve,ac as Qt,k as Yt,l as Ut,m as Zt,aA as it,ag as Vt,ai as Tt,aB as Xt,V as ea,aC as kt,aD as ta,aE as aa,af as sa,aF as la,az as ia,aG as ra,aH as oa,B as na,w as va,p as Pe,c as s,t as de,a as $e,s as l,r as a,T as ie,ap as rt,Y as ua,$ as pa,W as Re}from"../chunks/Dbtdn9f7.js";import{d as Ge,e as Lt}from"../chunks/xKwX_C3Q.js";import{h as da}from"../chunks/BcMQNMkF.js";import{s as Dt}from"../chunks/DAD-lUWQ.js";import{i as ca}from"../chunks/Dt9NjwHj.js";import{a as At}from"../chunks/i5uILAt2.js";import{w as Ct,t as fa}from"../chunks/4eif3qM-.js";import{a as N,b as ve,J as ma}from"../chunks/BzzBhkj3.js";import{b as be,s as ha}from"../chunks/DizoNBs4.js";import{s as q}from"../chunks/gfzC0wA8.js";import{r as y,s as p}from"../chunks/DCfzdB8P.js";import{p as ct}from"../chunks/BIPL7g2D.js";function Se(t,i){return i}function ga(t,i,e,n){for(var T=[],r=i.length,w=0;w<r;w++)aa(i[w].e,T,!0);var I=r>0&&T.length===0&&e!==null;if(I){var z=e.parentNode;sa(z),z.append(e),n.clear(),ge(t,i[0].prev,i[r-1].next)}la(T,()=>{for(var x=0;x<r;x++){var u=i[x];I||(n.delete(u.k),ge(t,u.prev,u.next)),ia(u.e,!I)}})}function ze(t,i,e,n,T,r=null){var w=t,I={flags:i,items:new Map,first:null};{var z=t;w=xe?st(Jt(z)):z.appendChild(Ot())}xe&&Ht();var x=null,u=!1,C=Kt(()=>{var d=e();return va(d)?d:d==null?[]:Vt(d)});Wt(()=>{var d=v(C),h=d.length;if(u&&h===0)return;u=h===0;let g=!1;if(xe){var E=w.data===jt;E!==(h===0)&&(w=zt(),st(w),lt(!1),g=!0)}if(xe){for(var U=null,b,A=0;A<h;A++){if(Ve.nodeType===8&&Ve.data===Qt){w=Ve,g=!0,lt(!1);break}var G=d[A],V=n(G,A);b=Nt(Ve,I,U,null,G,V,A,T,i,e),I.items.set(V,b),U=b}h>0&&st(zt())}xe||ba(d,I,w,T,i,n,e),r!==null&&(h===0?x?Yt(x):x=Ut(()=>r(w)):x!==null&&Zt(x,()=>{x=null})),g&&lt(!0),v(C)}),xe&&(w=Ve)}function ba(t,i,e,n,T,r,w){var I=t.length,z=i.items,x=i.first,u=x,C,d=null,h=[],g=[],E,U,b,A;for(A=0;A<I;A+=1){if(E=t[A],U=r(E,A),b=z.get(U),b===void 0){var G=u?u.e.nodes_start:e;d=Nt(G,i,d,d===null?i.first:d.next,E,U,A,n,T,w),z.set(U,d),h=[],g=[],u=d.next;continue}if(_a(b,E,A),(b.e.f&it)!==0&&Yt(b.e),b!==u){if(C!==void 0&&C.has(b)){if(h.length<g.length){var V=g[0],Y;d=V.prev;var H=h[0],te=h[h.length-1];for(Y=0;Y<h.length;Y+=1)Rt(h[Y],V,e);for(Y=0;Y<g.length;Y+=1)C.delete(g[Y]);ge(i,H.prev,te.next),ge(i,d,H),ge(i,te,V),u=V,d=te,A-=1,h=[],g=[]}else C.delete(b),Rt(b,u,e),ge(i,b.prev,b.next),ge(i,b,d===null?i.first:d.next),ge(i,d,b),d=b;continue}for(h=[],g=[];u!==null&&u.k!==U;)(u.e.f&it)===0&&(C??(C=new Set)).add(u),g.push(u),u=u.next;if(u===null)continue;b=u}h.push(b),d=b,u=b.next}if(u!==null||C!==void 0){for(var K=C===void 0?[]:Vt(C);u!==null;)(u.e.f&it)===0&&K.push(u),u=u.next;var j=K.length;if(j>0){var ae=I===0?e:null;ga(i,K,ae,z)}}Tt.first=i.first&&i.first.e,Tt.last=d&&d.e}function _a(t,i,e,n){Xt(t.v,i),t.i=e}function Nt(t,i,e,n,T,r,w,I,z,x){var u=(z&ra)!==0,C=(z&oa)===0,d=u?C?ea(T):kt(T):T,h=(z&ta)===0?w:kt(w),g={i:h,v:d,k:r,a:null,e:null,prev:e,next:n};try{return g.e=Ut(()=>I(t,d,h,x),xe),g.e.prev=e&&e.e,g.e.next=n&&n.e,e===null?i.first=g:(e.next=g,e.e.next=g.e),n!==null&&(n.prev=g,n.e.prev=g.e),g}finally{}}function Rt(t,i,e){for(var n=t.next?t.next.e.nodes_start:e,T=i?i.e.nodes_start:e,r=t.e.nodes_start;r!==n;){var w=na(r);T.before(r),r=w}}function ge(t,i,e){i===null?t.first=e:(i.next=e,i.e.next=e&&e.e),e!==null&&(e.prev=i,e.e.prev=i&&i.e)}const qt=""+new URL("../workers/icodecs-Bt_bKGFY.js",import.meta.url).href;class Et{constructor(i,e,n,T=8){Ce(this,"data");Ce(this,"width");Ce(this,"height");Ce(this,"depth");this.data=i,this.width=e,this.height=n,this.depth=T}}Et.prototype.colorSpace="srgb";var De;(function(t){t[t.YUV444=1]="YUV444",t[t.YUV422=2]="YUV422",t[t.YUV420=3]="YUV420",t[t.YUV400=4]="YUV400"})(De||(De={}));var Ne;(function(t){t[t.Auto=0]="Auto",t[t.PSNR=1]="PSNR",t[t.SSIM=2]="SSIM"})(Ne||(Ne={}));const Bt={quality:50,qualityAlpha:-1,speed:6,subsample:De.YUV420,autoTiling:!1,tileColsLog2:0,tileRowsLog2:0,chromaDeltaQ:!1,sharpness:0,denoiseLevel:0,tune:Ne.Auto,sharpYUV:!1};let ya=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});ya.decode();const ot=new TextEncoder;"encodeInto"in ot||(ot.encodeInto=function(t,i){const e=ot.encode(t);return i.set(e),{read:t.length,written:e.length}});var nt;(function(t){t[t.GRAYSCALE=1]="GRAYSCALE",t[t.RGB=2]="RGB",t[t.YCbCr=3]="YCbCr"})(nt||(nt={}));var vt;(function(t){t[t.JPEG_Annex_K=0]="JPEG_Annex_K",t[t.Flat=1]="Flat",t[t.MSSIM_Tuned_Kodak=2]="MSSIM_Tuned_Kodak",t[t.ImageMagick=3]="ImageMagick",t[t.PSNR_HVS_M_Tuned_Kodak=4]="PSNR_HVS_M_Tuned_Kodak",t[t.Klein_Silverstein_Carney=5]="Klein_Silverstein_Carney",t[t.Watson_Taylor_Borthwick=6]="Watson_Taylor_Borthwick",t[t.Ahumada_Watson_Peterson=7]="Ahumada_Watson_Peterson",t[t.Peterson_Ahumada_Watson=8]="Peterson_Ahumada_Watson"})(vt||(vt={}));nt.YCbCr,vt.ImageMagick;var It;(function(t){t[t.Default=-1]="Default",t[t.False=0]="False",t[t.True=1]="True"})(It||(It={}));var ut;(function(t){t[t.Default=-1]="Default",t[t.Zero=0]="Zero",t[t.Left=1]="Left",t[t.Top=2]="Top",t[t.Average0=3]="Average0",t[t.Select=4]="Select",t[t.Gradient=5]="Gradient",t[t.Weighted=6]="Weighted",t[t.TopRight=7]="TopRight",t[t.TopLeft=8]="TopLeft",t[t.LeftLeft=9]="LeftLeft",t[t.Average1=10]="Average1",t[t.Average2=11]="Average2",t[t.Average3=12]="Average3",t[t.Average4=13]="Average4",t[t.Best=14]="Best",t[t.Variable=15]="Variable"})(ut||(ut={}));ut.Default;var Me;(function(t){t[t.None=0]="None",t[t.SegmentSmooth=1]="SegmentSmooth",t[t.Dithering=2]="Dithering"})(Me||(Me={}));var qe;(function(t){t[t.None=0]="None",t[t.Fast=1]="Fast",t[t.Best=2]="Best"})(qe||(qe={}));const Ft={lossless:!1,nearLossless:100,quality:75,targetSize:0,targetPSNR:0,method:4,snsStrength:50,filterStrength:60,filterSharpness:0,filterType:!0,segments:4,pass:1,sharpYUV:!1,preprocessing:Me.None,autofilter:!1,partitionLimit:0,alphaCompression:1,alphaFiltering:qe.Fast,alphaQuality:100,exact:!1,emulateJpegSize:!1,lowMemory:!1,partitions:0,showCompressed:0,imageHint:0,threadLevel:0,useDeltaPalette:0},wa=["ultrafast","superfast","veryfast","faster","fast","medium","slow","slower","veryslow","placebo"],xa=["420","422","444"],Sa=["psnr","ssim","grain","fastdecode"],Mt={quality:50,lossless:!1,preset:"slow",tune:"ssim",tuIntraDepth:2,complexity:50,chroma:"420",sharpYUV:!1};var pt;(function(t){t[t.UVAdapt=0]="UVAdapt",t[t.UV420=1]="UV420",t[t.UV444=2]="UV444",t[t.UVAuto=3]="UVAuto"})(pt||(pt={}));var dt;(function(t){t[t.YCoCg=0]="YCoCg",t[t.YCbCr=1]="YCbCr",t[t.Custom=2]="Custom",t[t.YIQ=3]="YIQ"})(dt||(dt={}));pt.UVAuto,dt.YCoCg;globalThis._icodec_ImageData=(t,i,e,n)=>n===8?new za(t,i,e):new Et(t,i,e,n);class za extends ImageData{constructor(){super(...arguments);Ce(this,"depth",8)}}function Ta(t,i){i({...Mt})}var ka=ue("<option> </option>"),La=ue("<option> </option>"),Aa=ue("<option> </option>"),Ca=ue('<div class="card svelte-1dgh8ms"><div class="title svelte-1dgh8ms">HEIC  (x265,HEVC) Options</div> <div class="grid svelte-1dgh8ms"><div><div class="row svelte-1dgh8ms"><label for="heic-quality">Quality <span class="muted svelte-1dgh8ms"> </span></label></div> <div class="row svelte-1dgh8ms"><input id="heic-quality" type="range" min="0" max="100"></div> <div class="row svelte-1dgh8ms"><label><input name="heic-lossless" type="checkbox"> Lossless</label></div> <div class="row svelte-1dgh8ms"><label for="heic-preset">Preset</label> <select id="heic-preset"></select></div> <div class="row svelte-1dgh8ms"><label for="heic-tune">Tune</label> <select id="heic-tune"></select></div> <div class="row svelte-1dgh8ms"><label for="heic-tuIntraDepth">TU Intra Depth <span class="muted svelte-1dgh8ms"> </span></label></div> <div class="row svelte-1dgh8ms"><input id="heic-tuIntraDepth" type="range" min="1" max="4"></div></div> <div><div class="row svelte-1dgh8ms"><label for="heic-complexity">Complexity <span class="muted svelte-1dgh8ms"> </span></label></div> <div class="row svelte-1dgh8ms"><input id="heic-complexity" type="range" min="0" max="100"></div> <div class="row svelte-1dgh8ms"><label for="heic-chroma">Chroma</label> <select id="heic-chroma"></select></div> <div class="row svelte-1dgh8ms"><label><input name="heic-sharpYUV" type="checkbox"> Sharp YUV</label></div> <div class="row svelte-1dgh8ms"><button>Reset</button></div></div></div></div>');function Ra(t,i){Pe(i,!0);let e=ct(i,"value",15);const n={quality:`
    /**
     * Quality-based VBR [0, 100], it will map to \`--crf\` parameter of x265.
     * quality=0   -> crf=50
     * quality=50  -> crf=25
     * quality=100 -> crf=0
     *
     * @default 50
     */
    `,lossless:`
        /**
     * If true, Bypass transform, quant and loop filters.
     *
     * Note: it does not bypass chroma subsampling, you need
     *       also to set \`chroma\` to "444" for exact lossless.
     *
     * @default false
     */
    `,preset:`
        /**
     * Trade off performance for compression efficiency.
     *
     * @default "slow"
     */
    `,tune:`    /**
     * Tune the settings for a particular type of source or situation.
     *
     * @default "ssim"
     */`,tuIntraDepth:`    /**
     * Max TU recursive depth for intra CUs。
     *
     * [1, 4], default 2.
     */`,complexity:`    /**
     * CPU effort, larger value increases encode time.
     * Range is [0, 100], but only changes at a few values.
     *
     * @default 50
     */`,chroma:`    /**
     * Specify chroma subsampling method.
     *
     * @default "420"
     */`,sharpYUV:`    /**
     * Use more accurate and sharper RGB->YUV conversion if needed.
     *
     * @default false
     */`};var T=Ca(),r=l(s(T),2),w=s(r),I=s(w),z=s(I),x=l(s(z)),u=s(x,!0);a(x),a(z),a(I);var C=l(I,2),d=s(C);y(d),a(C);var h=l(C,2),g=s(h),E=s(g);y(E),ie(),a(g),a(h);var U=l(h,2),b=s(U),A=l(b,2);ze(A,21,()=>wa,Se,(m,c)=>{var R=ka(),$={},W=s(R,!0);a(R),de(()=>{$!==($=v(c))&&(R.value=(R.__value=v(c))==null?"":v(c)),q(W,v(c))}),ee(m,R)}),a(A),a(U);var G=l(U,2),V=s(G),Y=l(V,2);ze(Y,21,()=>Sa,Se,(m,c)=>{var R=La(),$={},W=s(R,!0);a(R),de(()=>{$!==($=v(c))&&(R.value=(R.__value=v(c))==null?"":v(c)),q(W,v(c))}),ee(m,R)}),a(Y),a(G);var H=l(G,2),te=s(H),K=l(s(te)),j=s(K,!0);a(K),a(te),a(H);var ae=l(H,2),Q=s(ae);y(Q),a(ae),a(w);var re=l(w,2),_=s(re),k=s(_),B=l(s(k)),X=s(B,!0);a(B),a(k),a(_);var Z=l(_,2),F=s(Z);y(F),a(Z);var D=l(Z,2),L=s(D),M=l(L,2);ze(M,21,()=>xa,Se,(m,c)=>{var R=Aa(),$={},W=s(R,!0);a(R),de(()=>{$!==($=v(c))&&(R.value=(R.__value=v(c))==null?"":v(c)),q(W,v(c))}),ee(m,R)}),a(M),a(D);var S=l(D,2),P=s(S),O=s(P);y(O),ie(),a(P),a(S);var se=l(S,2),oe=s(se);oe.__click=[Ta,e],a(se),a(re),a(r),a(T),de(()=>{p(z,"title",n.quality),q(u,e().quality??50),p(g,"title",n.lossless),p(b,"title",n.preset),p(V,"title",n.tune),p(te,"title",n.tuIntraDepth),q(j,e().tuIntraDepth),p(k,"title",n.complexity),q(X,e().complexity),p(L,"title",n.chroma),p(P,"title",n.sharpYUV)}),N(d,()=>e().quality,m=>e(e().quality=m,!0)),ve(E,()=>e().lossless,m=>e(e().lossless=m,!0)),be(A,()=>e().preset,m=>e(e().preset=m,!0)),be(Y,()=>e().tune,m=>e(e().tune=m,!0)),N(Q,()=>e().tuIntraDepth,m=>e(e().tuIntraDepth=m,!0)),N(F,()=>e().complexity,m=>e(e().complexity=m,!0)),be(M,()=>e().chroma,m=>e(e().chroma=m,!0)),ve(O,()=>e().sharpYUV,m=>e(e().sharpYUV=m,!0)),ee(t,T),$e()}Ge(["click"]);function qa(t,i){i({...Ft})}var Ia=ue("<option> </option>"),Ya=ue("<option> </option>"),Ua=ue(`<div class="card svelte-1c6geua" aria-label="WebP Encoder Options"><div class="grid svelte-1c6geua"><div class="row svelte-1c6geua"><strong>WebP Encoder Options</strong></div> <div class="row svelte-1c6geua"><label class="svelte-1c6geua"><input name="webp-lossless" type="checkbox"> Lossless</label> <span class="muted svelte-1c6geua">(may change transparent pixels)</span></div> <div class="row svelte-1c6geua"><div style="flex:1"><label for="webp-nearLossless" class="small svelte-1c6geua">nearLossless: <span class="muted svelte-1c6geua"> </span></label> <input type="range" id="webp-nearLossless" min="0" max="100" class="svelte-1c6geua"></div> <div style="width:120px"><label for="webp-quality" class="small svelte-1c6geua">quality</label> <input class="num svelte-1c6geua" type="number" min="0" id="webp-quality" max="100"></div></div> <div class="row svelte-1c6geua"><div style="flex:1"><label class="small svelte-1c6geua" for="webp-alphaQuality">alphaQuality: <span class="muted svelte-1c6geua"> </span></label> <input type="range" id="webp-alphaQuality" min="0" max="100" class="svelte-1c6geua"></div> <div style="width:120px"><label for="webp-method" class="small svelte-1c6geua">method</label> <input class="num svelte-1c6geua" id="webp-method" type="number" min="0" max="6"></div></div> <div class="row svelte-1c6geua"><label for="webp-snsStrength" class="small svelte-1c6geua"> </label> <input type="range" id="webp-snsStrength" min="0" max="100" class="svelte-1c6geua"></div> <div class="row svelte-1c6geua"><label for="webp-filterStrength" class="small svelte-1c6geua"> </label> <input type="range" id="webp-filterStrength" min="0" max="100" class="svelte-1c6geua"></div> <div class="row two svelte-1c6geua"><div style="flex:1"><label for="webp-filterSharpness" class="small svelte-1c6geua"> </label> <input type="range" id="webp-filterSharpness" min="0" max="7" class="svelte-1c6geua"></div> <div style="width:160px"><label class="svelte-1c6geua"><input name="webp-filterType" type="checkbox"> filterType
                    (strong)</label></div></div> <div class="row svelte-1c6geua"><label for="webp-segments" class="small svelte-1c6geua"> </label> <input id="webp-segments" type="range" min="1" max="4" class="svelte-1c6geua"></div> <div class="row two svelte-1c6geua"><div style="flex:1"><label for="webp-preprocessing" class="svelte-1c6geua">preprocessing</label> <select id="webp-preprocessing"></select></div> <div style="width:160px"><label class="svelte-1c6geua"><input name="webp-autofilter" type="checkbox"> autofilter</label></div></div> <div class="row two svelte-1c6geua"><div style="flex:1"><label for="webp-partitionLimit" class="small svelte-1c6geua"> </label> <input type="range" id="webp-partitionLimit" min="0" max="100" class="svelte-1c6geua"></div> <div style="width:160px"><label for="webp-pass" class="small svelte-1c6geua"> </label> <input class="num svelte-1c6geua" id="webp-pass" type="number" min="1" max="10"></div></div> <div class="row two svelte-1c6geua"><div><label for="webp-alphaCompression" class="svelte-1c6geua">alphaCompression</label> <select id="webp-alphaCompression"><option>0 (none)</option><option>1 (webp lossless)</option></select></div> <div><label for="webp-alphaFiltering" class="svelte-1c6geua">alphaFiltering</label> <select id="webp-alphaFiltering"></select></div></div> <div class="row svelte-1c6geua"><label class="svelte-1c6geua"><input name="webp-sharpYUV" type="checkbox"> sharpYUV</label> <label style="margin-left:12px" class="svelte-1c6geua"><input name="webp-exact" type="checkbox"> exact (preserve
                RGB in transparent)</label></div> <div class="row two svelte-1c6geua"><div style="flex:1"><label for="webp-targetSize" class="svelte-1c6geua">targetSize (bytes)</label> <input id="webp-targetSize" type="number" min="0"></div> <div style="width:160px"><label for="webp-targetPSNR" class="svelte-1c6geua">targetPSNR (dB)</label> <input class="num svelte-1c6geua" id="webp-targetPSNR" type="number" min="0"></div></div> <div class="row two svelte-1c6geua"><div><label class="svelte-1c6geua"><input name="webp-lowMemory" type="checkbox"> lowMemory</label></div> <div><label class="svelte-1c6geua"><input name="webp-emulateJpegSize" type="checkbox"> emulateJpegSize</label></div></div> <div class="actions svelte-1c6geua"><button type="button">Reset</button></div></div></div>`);function Va(t,i){Pe(i,!0);let e=ct(i,"value",15);const n=Object.values(Me).filter(o=>typeof o=="number").map(o=>({label:qe[o],v:o})),T=Object.values(qe).filter(o=>typeof o=="number").map(o=>({label:qe[o],v:o})),r={lossless:`/**
    * Encode the image without any loss (pixel values of fully transparent area may different).
    *
    * @default false
    */`,nearLossless:`/**
    * Specify the level of near-lossless image preprocessing. This option adjusts pixel values
    * to help compressibility, but has minimal impact on the visual quality.
    * It triggers lossless compression mode automatically.
    *
    * The range is 0 (maximum preprocessing) to 100 (no preprocessing).
    * The typical value is around 60. Note that lossy with -q 100 can at times yield better results.
    *
    * @default 100
    */`,quality:`/**
    * Specify the compression factor for RGB channels between 0 and 100.
    *
    * In case of lossy compression (default), a small factor produces a smaller file
    * with lower quality.  Best quality is achieved by using a value of 100.
    *
    * In case of lossless compression, a small factor enables faster compression speed,
    * but produces a larger file. Maximum compression is achieved by using a value of 100.
    *
    * @default 75
    */`,alphaQuality:`/**
    * Specify the compression factor for alpha compression between 0 and 100.
    * Lossless compression of alpha is achieved using a value of 100, while the lower
    * values result in a lossy compression. The default is 100.
    *
    * @default 100
    */`,method:`/**
    * Specify the compression method to use. This parameter controls the trade off between
    * encoding speed and the compressed file size and quality.
    *
    * Possible values range from 0 to 6. When higher values are used, the encoder will spend more
    * time inspecting additional encoding possibilities and decide on the quality gain.
    *
    * Lower value can result in faster processing at the expense of larger file size and lower quality.
    *
    * @default 4
    */`,snsStrength:`/**
    * Specify the amplitude of the spatial noise shaping. Spatial noise shaping (or sns for short)
    * refers to a general collection of built-in algorithms used to decide which area of the
    * picture should use relatively less bits, and where else to better transfer these bits.
    *
    * The possible range goes from 0 (algorithm is off) to 100 (the maximal effect).
    *
    * @default 50
    */`,filterStrength:`/**
    * Specify the strength of the deblocking filter, between 0 (no filtering) and 100 (maximum filtering).
    * A value of 0 will turn off any filtering. Higher value will increase the strength of the filtering
    * process applied after decoding the picture. The higher the value the smoother the picture will appear.
    *
    * @default 60
    */`,filterSharpness:`/**
    * Specify the sharpness of the filtering (if used). Range is 0 (sharpest) to 7 (least sharp).
    *
    * @default 0
    */`,filterType:`/**
    * Use strong filtering (if filtering is being used thanks to the \`filter_strength\`).
    *
    * @default true
    */`,segments:`/**
    * Change the number of partitions to use during the segmentation of the sns algorithm.
    * Range [1, 4], this option has no effect for methods 3 and up, unless \`low_memory\` is used.
    *
    * @default 4
    */`,preprocessing:`/**
    * Specify some pre-processing steps. Using a value of 2 will trigger quality-dependent pseudo-random
    * dithering during RGBA->YUVA conversion (lossy compression only).
    *
    * @default Preprocess.None
    */`,autofilter:`/**
    * Turns auto-filter on. This algorithm will spend additional time optimizing the
    * filtering strength to reach a well-balanced quality.
    *
    * @default 0
    */`,partitionLimit:`/**
    * Degrade quality by limiting the number of bits used by some macroblocks.
    * Range is 0 (no degradation, the default) to 100 (full degradation).
    * Useful values are usually around 30-70 for moderately large images.
    *
    * In the VP8 format, the so-called control partition has a limit of 512k and is used to store
    * the following information: whether the macroblock is skipped, which segment it belongs to,
    * whether it is coded as intra 4x4 or intra 16x16 mode, and finally the prediction modes to use
    * for each of the sub-blocks.
    *
    * For a very large image, 512k only leaves room for a few bits per 16x16 macroblock.
    * The absolute minimum is 4 bits per macroblock. Skip, segment, and mode information can use up almost
    * all these 4 bits (although the case is unlikely), which is problematic for very large images.
    *
    * \`partitionLimit\` controls how frequently the most bit-costly mode (intra 4x4) will be used.
    * This is useful in case the 512k limit is reached.
    *
    * If using -partition_limit is not enough to meet the 512k constraint, one should use less segments
    * in order to save more header bits per macroblock. See the \`segments\` option.
    *
    * Note the -m and -q options also influence the encoder's decisions and ability to hit this limit.
    *
    * @default 0
    */`,alphaCompression:`/**
    * Specify the algorithm used for alpha compression: 0 or 1.
    * Algorithm 0 denotes no compression, 1 uses WebP lossless format for compression.
    *
    * @default 1
    */`,alphaFiltering:`/**
    * Specify the predictive filtering method for the alpha plane. One of none,
    * fast or best, in increasing complexity and slowness order.
    *
    * Internally, alpha filtering is performed using four possible predictions (none, horizontal, vertical, gradient).
    * The best mode will try each mode in turn and pick the one which gives the smaller size.
    *
    * The fast mode will just try to form an a priori guess without testing all modes.
    *
    * @default AlphaFiltering.Fast
    */`,sharpYUV:`/**
    * Use more accurate and sharper RGB->YUV conversion if needed.
    * Note that this process is slower than the default conversion.
    *
    * @default false
    */`,exact:`/**
    * Preserve RGB values in transparent area. The default is off, to help compressibility.
    */`,targetSize:"/**\n    * Specify a target size (in bytes) to try and reach for the compressed output.\n    * The compressor will make several passes of partial encoding in order to get as close as possible to this target.\n    * If both `target_size` and `target_PSNR` are used, `target_size` value will prevail.\n    */",targetPSNR:"/**\n    * Specify a target PSNR (in dB) to try and reach for the compressed output.\n    * The compressor will make several passes of partial encoding in order to get as close as possible to this target.\n    * If both `target_size` and `target_PSNR` are used, `target_size` value will prevail.\n    */",pass:"/**\n    * Set a maximum number of passes to use during the dichotomy used by `target_size` or `target_PSNR`.\n    *\n    * Maximum value is 10. If options `target_size` or `target_PSNR` were used, but `pass` wasn't specified,\n    * a default value of '6' passes will be used. If `pass` is specified,\n    * but neither `target_size` nor `target_PSNR` are, a target PSNR of 40dB will be used.\n    *\n    * @default 1\n    */",lowMemory:`/**
    * Reduce memory usage of lossy encoding by saving four times the compressed size (typically).
    * This will make the encoding slower and the output slightly different in size and distortion.
    *
    * This flag is only effective for methods 3 and up, and is off by default.
    *
    * Note that leaving this flag off will have some side effects on the bitstream:
    * it forces certain bitstream features like number of partitions (forced to 1).
    *
    * @default false
    */`,emulateJpegSize:`/**
    * Change the internal parameter mapping to better match the expected size of JPEG compression.
    *
    * This flag will generally produce an output file of similar size to its JPEG equivalent
    * (for the same \`quality\` setting), but with less visual distortion.
    *
    * @default false
    */`};var w=Ua(),I=s(w),z=l(s(I),2),x=s(z),u=s(x);y(u),ie(),a(x),ie(2),a(z);var C=l(z,2),d=s(C),h=s(d),g=l(s(h)),E=s(g,!0);a(g),a(h);var U=l(h,2);y(U),a(d);var b=l(d,2),A=l(s(b),2);y(A),a(b),a(C);var G=l(C,2),V=s(G),Y=s(V),H=l(s(Y)),te=s(H,!0);a(H),a(Y);var K=l(Y,2);y(K),a(V);var j=l(V,2),ae=l(s(j),2);y(ae),a(j),a(G);var Q=l(G,2),re=s(Q),_=s(re);a(re);var k=l(re,2);y(k),a(Q);var B=l(Q,2),X=s(B),Z=s(X);a(X);var F=l(X,2);y(F),a(B);var D=l(B,2),L=s(D),M=s(L),S=s(M);a(M);var P=l(M,2);y(P),a(L);var O=l(L,2),se=s(O),oe=s(se);y(oe),ie(),a(se),a(O),a(D);var m=l(D,2),c=s(m),R=s(c);a(c);var $=l(c,2);y($),a(m);var W=l(m,2),ne=s(W),he=l(s(ne),2);ze(he,21,()=>n,Se,(o,me)=>{var pe=Ia(),Ue={},at=s(pe,!0);a(pe),de(()=>{Ue!==(Ue=v(me).v)&&(pe.value=(pe.__value=v(me).v)==null?"":v(me).v),q(at,v(me).label)}),ee(o,pe)}),a(he),a(ne);var _e=l(ne,2),Ie=s(_e),Ee=s(Ie);y(Ee),ie(),a(Ie),a(_e),a(W);var Te=l(W,2),ce=s(Te),ye=s(ce),ke=s(ye);a(ye);var Ye=l(ye,2);y(Ye),a(ce);var Le=l(ce,2),Ae=s(Le),Oe=s(Ae);a(Ae);var f=l(Ae,2);y(f),a(Le),a(Te);var le=l(Te,2),J=s(le),fe=l(s(J),2),we=s(fe);we.value=(we.__value=0)==null?"":0;var ft=l(we);ft.value=(ft.__value=1)==null?"":1,a(fe),a(J);var We=l(J,2),Je=l(s(We),2);ze(Je,21,()=>T,Se,(o,me)=>{var pe=Ya(),Ue={},at=s(pe,!0);a(pe),de(()=>{Ue!==(Ue=v(me).v)&&(pe.value=(pe.__value=v(me).v)==null?"":v(me).v),q(at,v(me).label)}),ee(o,pe)}),a(Je),a(We),a(le);var He=l(le,2),Be=s(He),mt=s(Be);y(mt),ie(),a(Be);var Ke=l(Be,2),ht=s(Ke);y(ht),ie(),a(Ke),a(He);var je=l(He,2),Fe=s(je),gt=l(s(Fe),2);y(gt),a(Fe);var Qe=l(Fe,2),bt=l(s(Qe),2);y(bt),a(Qe),a(je);var Ze=l(je,2),Xe=s(Ze),et=s(Xe),_t=s(et);y(_t),ie(),a(et),a(Xe);var yt=l(Xe,2),tt=s(yt),wt=s(tt);y(wt),ie(),a(tt),a(yt),a(Ze);var xt=l(Ze,2),Pt=s(xt);Pt.__click=[qa,e],a(xt),a(I),a(w),de(()=>{p(x,"title",r.lossless),p(d,"title",r.nearLossless),q(E,e().nearLossless),p(b,"title",r.quality),p(V,"title",r.alphaQuality),q(te,e().alphaQuality),p(j,"title",r.method),p(Q,"title",r.snsStrength),q(_,`snsStrength: ${e().snsStrength??""}`),p(B,"title",r.filterStrength),q(Z,`filterStrength: ${e().filterStrength??""}`),p(L,"title",r.filterSharpness),q(S,`filterSharpness: ${e().filterSharpness??""}`),p(O,"title",r.filterType),p(m,"title",r.segments),q(R,`segments: ${e().segments??""}`),p(ne,"title",r.preprocessing),p(_e,"title",r.autofilter),p(ce,"title",r.partitionLimit),q(ke,`partitionLimit: ${e().partitionLimit??""}`),p(Le,"title",r.pass),q(Oe,`pass: ${e().pass??""}`),p(J,"title",r.alphaCompression),p(We,"title",r.alphaFiltering),p(Be,"title",r.sharpYUV),p(Ke,"title",r.exact),p(Fe,"title",r.targetSize),p(Qe,"title",r.targetPSNR),p(et,"title",r.lowMemory),p(tt,"title",r.emulateJpegSize)}),ve(u,()=>e().lossless,o=>e(e().lossless=o,!0)),N(U,()=>e().nearLossless,o=>e(e().nearLossless=o,!0)),N(A,()=>e().quality,o=>e(e().quality=o,!0)),N(K,()=>e().alphaQuality,o=>e(e().alphaQuality=o,!0)),N(ae,()=>e().method,o=>e(e().method=o,!0)),N(k,()=>e().snsStrength,o=>e(e().snsStrength=o,!0)),N(F,()=>e().filterStrength,o=>e(e().filterStrength=o,!0)),N(P,()=>e().filterSharpness,o=>e(e().filterSharpness=o,!0)),ve(oe,()=>e().filterType,o=>e(e().filterType=o,!0)),N($,()=>e().segments,o=>e(e().segments=o,!0)),be(he,()=>e().preprocessing,o=>e(e().preprocessing=o,!0)),ve(Ee,()=>e().autofilter,o=>e(e().autofilter=o,!0)),N(Ye,()=>e().partitionLimit,o=>e(e().partitionLimit=o,!0)),N(f,()=>e().pass,o=>e(e().pass=o,!0)),be(fe,()=>e().alphaCompression,o=>e(e().alphaCompression=o,!0)),be(Je,()=>e().alphaFiltering,o=>e(e().alphaFiltering=o,!0)),ve(mt,()=>e().sharpYUV,o=>e(e().sharpYUV=o,!0)),ve(ht,()=>e().exact,o=>e(e().exact=o,!0)),N(gt,()=>e().targetSize,o=>e(e().targetSize=o,!0)),N(bt,()=>e().targetPSNR,o=>e(e().targetPSNR=o,!0)),ve(_t,()=>e().lowMemory,o=>e(e().lowMemory=o,!0)),ve(wt,()=>e().emulateJpegSize,o=>e(e().emulateJpegSize=o,!0)),ee(t,w),$e()}Ge(["click"]);function Da(t,i){i({...Bt})}var Na=ue("<option> </option>"),Ea=ue("<option> </option>"),Ba=ue('<div class="card svelte-1iuoinz" aria-label="AVIF Encoder Options"><div class="title" style="font-weight:600; margin-bottom:8px">AVIF Options</div> <div class="grid svelte-1iuoinz"><div><div class="row svelte-1iuoinz"><label for="avif-quality" class="svelte-1iuoinz">Quality <span class="muted svelte-1iuoinz"> </span></label></div> <div class="row svelte-1iuoinz"><input id="avif-quality" type="range" min="0" max="100" class="svelte-1iuoinz"></div> <div class="row svelte-1iuoinz"><label for="avif-qualityAlpha" class="svelte-1iuoinz">Quality Alpha <span class="muted svelte-1iuoinz"> </span></label> <input id="avif-qualityAlpha" class="num svelte-1iuoinz" type="number" min="-1" max="100"></div> <div class="row svelte-1iuoinz"><label for="avif-speed" class="svelte-1iuoinz">Speed <span class="muted svelte-1iuoinz"> </span></label> <input id="avif-speed" type="range" min="-1" max="10" class="svelte-1iuoinz"></div> <div class="row svelte-1iuoinz"><label for="avif-subsample" class="svelte-1iuoinz">Subsample</label> <select id="avif-subsample"></select></div> <div class="row svelte-1iuoinz"><label class="svelte-1iuoinz"><input name="avif-autoTiling" type="checkbox"> Auto Tiling</label></div> <div class="row svelte-1iuoinz"><label for="avif-tileRowsLog2" class="svelte-1iuoinz">TileRows (log2) <span class="muted svelte-1iuoinz"> </span></label> <input id="avif-tileRowsLog2" type="range" min="0" max="6" class="svelte-1iuoinz"></div> <div class="row svelte-1iuoinz"><label for="avif-tileColsLog2" class="svelte-1iuoinz">TileCols (log2) <span class="muted svelte-1iuoinz"> </span></label> <input id="avif-tileColsLog2" type="range" min="0" max="6" class="svelte-1iuoinz"></div></div> <div><div class="row svelte-1iuoinz"><label class="svelte-1iuoinz"><input name="avif-chromaDeltaQ" type="checkbox"> Chroma Delta Q</label></div> <div class="row svelte-1iuoinz"><label for="avif-sharpness" class="svelte-1iuoinz">Sharpness <span class="muted svelte-1iuoinz"> </span></label> <input id="avif-sharpness" type="range" min="0" max="7" class="svelte-1iuoinz"></div> <div class="row svelte-1iuoinz"><label for="avif-denoiseLevel" class="svelte-1iuoinz">Denoise Level <span class="muted svelte-1iuoinz"> </span></label> <input id="avif-denoiseLevel" type="range" min="0" max="50" class="svelte-1iuoinz"></div> <div class="row svelte-1iuoinz"><label for="avif-tune" class="svelte-1iuoinz">Tune</label> <select id="avif-tune"></select></div> <div class="row svelte-1iuoinz"><label class="svelte-1iuoinz"><input name="avif-sharpYUV" type="checkbox"> Sharp YUV</label></div> <div class="actions svelte-1iuoinz"><button type="button">Reset</button></div></div></div></div>');function Fa(t,i){Pe(i,!0);let e=ct(i,"value",15);const n=Object.values(De).filter(f=>typeof f=="number").map(f=>({label:De[f],v:f})),T=Object.values(Ne).filter(f=>typeof f=="number").map(f=>({label:Ne[f],v:f})),r={quality:`/**
 * [0 - 100], 0 = worst quality, 100 = lossless
 *
 * @default 50
 */`,qualityAlpha:`/**
 * As above, but -1 means 'use quality'
 *
 * @default -1
 */`,speed:`/**
 * Range: [-1, 10], 0 = slowest, 10 = fastest, slower should make for a better quality image in less bytes.
 * A combination of settings are tweaked to simulate this speed range.
 *
 * @default 6
 */`,subsample:`/**
 * Chrome subsampling type.
 *
 * @default YUV420
 */`,autoTiling:"/**\n * If true, ignores `tileRowsLog2` and `tileColsLog2` and automatically chooses suitable tiling values.\n *\n * @default false\n */",tileColsLog2:`/**
 * [0 - 6], Creates 2^n tiles in that dimension
 *
 * @default 0
 */`,chromaDeltaQ:`/**
 * Extra chroma compression, cannot be used in lossless mode.
 *
 * @default false
 */`,sharpness:`/**
 * Bias towards block sharpness in rate-distortion optimization of transform coefficients [0, 7]
 *
 * @default 0
 */`,denoiseLevel:`/**
 * Amount of noise (from 0 = don't denoise, to 50)
 *
 * @default 0
 */`,tune:`/**
 * Distortion metric tuned with.
 *
 * @default AVIFTune.Auto
 */`,sharpYUV:`/**
 * Use libsharpyuv for RGB->YUV conversion if needed.
 *
 * @default false
 */`};var w=Ba(),I=l(s(w),2),z=s(I),x=s(z),u=s(x),C=l(s(u)),d=s(C,!0);a(C),a(u),a(x);var h=l(x,2),g=s(h);y(g),a(h);var E=l(h,2),U=s(E),b=l(s(U)),A=s(b,!0);a(b),a(U);var G=l(U,2);y(G),a(E);var V=l(E,2),Y=s(V),H=l(s(Y)),te=s(H,!0);a(H),a(Y);var K=l(Y,2);y(K),a(V);var j=l(V,2),ae=l(s(j),2);ze(ae,21,()=>n,Se,(f,le)=>{var J=Na(),fe={},we=s(J,!0);a(J),de(()=>{fe!==(fe=v(le).v)&&(J.value=(J.__value=v(le).v)==null?"":v(le).v),q(we,v(le).label)}),ee(f,J)}),a(ae),a(j);var Q=l(j,2),re=s(Q),_=s(re);y(_),ie(),a(re),a(Q);var k=l(Q,2),B=s(k),X=l(s(B)),Z=s(X,!0);a(X),a(B);var F=l(B,2);y(F),a(k);var D=l(k,2),L=s(D),M=l(s(L)),S=s(M,!0);a(M),a(L);var P=l(L,2);y(P),a(D),a(z);var O=l(z,2),se=s(O),oe=s(se),m=s(oe);y(m),ie(),a(oe),a(se);var c=l(se,2),R=s(c),$=l(s(R)),W=s($,!0);a($),a(R);var ne=l(R,2);y(ne),a(c);var he=l(c,2),_e=s(he),Ie=l(s(_e)),Ee=s(Ie,!0);a(Ie),a(_e);var Te=l(_e,2);y(Te),a(he);var ce=l(he,2),ye=l(s(ce),2);ze(ye,21,()=>T,Se,(f,le)=>{var J=Ea(),fe={},we=s(J,!0);a(J),de(()=>{fe!==(fe=v(le).v)&&(J.value=(J.__value=v(le).v)==null?"":v(le).v),q(we,v(le).label)}),ee(f,J)}),a(ye),a(ce);var ke=l(ce,2),Ye=s(ke),Le=s(Ye);y(Le),ie(),a(Ye),a(ke);var Ae=l(ke,2),Oe=s(Ae);Oe.__click=[Da,e],a(Ae),a(O),a(I),a(w),de(()=>{p(x,"title",r.quality),q(d,e().quality),p(E,"title",r.qualityAlpha),q(A,e().qualityAlpha),p(V,"title",r.speed),q(te,e().speed),p(j,"title",r.subsample),p(Q,"title",r.autoTiling),p(k,"title",r.tileColsLog2),q(Z,e().tileRowsLog2),p(D,"title",r.tileColsLog2),q(S,e().tileColsLog2),p(se,"title",r.chromaDeltaQ),p(c,"title",r.sharpness),q(W,e().sharpness),p(he,"title",r.denoiseLevel),q(Ee,e().denoiseLevel),p(ce,"title",r.tune),p(ke,"title",r.sharpYUV)}),N(g,()=>e().quality,f=>e(e().quality=f,!0)),N(G,()=>e().qualityAlpha,f=>e(e().qualityAlpha=f,!0)),N(K,()=>e().speed,f=>e(e().speed=f,!0)),be(ae,()=>e().subsample,f=>e(e().subsample=f,!0)),ve(_,()=>e().autoTiling,f=>e(e().autoTiling=f,!0)),N(F,()=>e().tileRowsLog2,f=>e(e().tileRowsLog2=f,!0)),N(P,()=>e().tileColsLog2,f=>e(e().tileColsLog2=f,!0)),ve(m,()=>e().chromaDeltaQ,f=>e(e().chromaDeltaQ=f,!0)),N(ne,()=>e().sharpness,f=>e(e().sharpness=f,!0)),N(Te,()=>e().denoiseLevel,f=>e(e().denoiseLevel=f,!0)),be(ye,()=>e().tune,f=>e(e().tune=f,!0)),ve(Le,()=>e().sharpYUV,f=>e(e().sharpYUV=f,!0)),ee(t,w),$e()}Ge(["click"]);const Ma="icodec_encoder_options";async function Pa(t,i,e){const n=Array.from(t.currentTarget.files??[]),T=async function*(){for(const r of n)yield{file:r,fullPath:r.name}}();try{Re(i,!0),await e(T)}finally{Re(i,!1)}}function $a(t,i){window.localStorage.setItem("icodec_encoder_options",JSON.stringify(Dt(v(i))))}var Ga=ue('<meta name="description" content="Converter for heif">'),Oa=ue('<div class="container svelte-l4mzdf"><div class="section svelte-l4mzdf"><!></div> <div class="drop-zone svelte-l4mzdf" role="region" aria-label="file-drop-zone"></div> <div class="section svelte-l4mzdf"><div class="field svelte-l4mzdf"><label for="icodec-images">images</label> <input type="file" id="icodec-images" multiple accept="image/png, image/jpeg"></div></div> <div class="section svelte-l4mzdf"><details class="svelte-l4mzdf"><summary class="svelte-l4mzdf">WEBP</summary> <div class="body svelte-l4mzdf"><!></div></details> <details class="svelte-l4mzdf"><summary class="svelte-l4mzdf">HEIC</summary> <div class="body svelte-l4mzdf"><!></div></details> <details class="svelte-l4mzdf"><summary class="svelte-l4mzdf">AVIF</summary> <div class="body svelte-l4mzdf"><!></div></details></div> <div class="section svelte-l4mzdf"><button class="svelte-l4mzdf">save config in local</button></div></div>');function rs(t,i){Pe(i,!0);let e=rt(!1),n=rt(ua({webp:{...Ft},avif:{...Bt},heic:{...Mt}}));At(()=>{let _=window.localStorage.getItem(Ma);_&&Re(n,JSON.parse(_),!0)});let T=rt(!1);At(()=>{Re(T,window.crossOriginIsolated,!0)});async function r(_){let k=new Worker(qt,{type:"module"});const B=navigator.hardwareConcurrency-1||4,X=[];X.push(k);const Z=[];Z.push(Ct(k));const F=[],D=new ma;let L=[],M=0;try{for await(const S of _){M+=1;const P=M;if(F.length>=B){const oe=await Promise.race(F.map(c=>c.promise)),m=F.findIndex(c=>c.id===oe.idx);m!=-1&&F.splice(m,1),Z.push(oe.worker)}else F.length<B&&Z.length===0&&(k=new Worker(qt,{type:"module"}),X.push(k),Z.push(Ct(k)));let O=Z.pop();const se=Promise.try(async()=>{let oe=S.file;try{let m=await createImageBitmap(oe);const c=await O.encodeBitmap(fa(m,[m]),Dt(v(n))),R=S.fullPath.replace(/\.[^/.]+$/,""),$=R.split("/"),W=$.slice(0,-1).join("/"),ne=$[$.length-1];console.log({fileBaseName:ne,folderPath:W,outputName:R,components:$}),c.avif.status==="fulfilled"?D.file(`${W}/avif/${ne}.avif`,c.avif.value):(console.error(c.avif.reason),L.push({type:"avif",reason:c.avif.reason,fileName:S.fullPath})),c.heic.status==="fulfilled"?D.file(`${W}/heic/${ne}.heic`,c.heic.value):(console.error(c.heic.reason),L.push({type:"heic",reason:c.heic.reason,fileName:S.fullPath})),c.webp.status==="fulfilled"?D.file(`${W}/webp/${ne}.webp`,c.webp.value):(console.error(c.webp.reason),L.push({type:"webp",reason:c.webp.reason,fileName:S.fullPath}))}catch(m){console.error(m),L.push({reason:m,fileName:S.fullPath})}return{idx:P,worker:O}});F.push({id:P,promise:se})}await Promise.allSettled(F.map(S=>S.promise))}finally{for(const S of X)S.terminate()}if(M!=0){const S=await D.generateAsync({type:"blob"});ha(S,"converted_images.zip")}L.length>0&&alert(JSON.stringify(L))}function w(_){!v(e)&&_.dataTransfer&&_.dataTransfer.types.length>0&&_.dataTransfer.types[0]==="Files"&&_.preventDefault()}async function I(_){var F;const k=(F=_.dataTransfer)==null?void 0:F.items;if(!k||k.length==0||v(e))return;_.preventDefault();let B=[];const X=async function*(){let D=[];for(let L=0;L<k.length;L++){const S=k[L].webkitGetAsEntry();S&&(S.isDirectory?B.push(S):S.isFile&&D.push(S))}for(const L of D)yield L;for(;B.length>0;){let M=B.pop().createReader();const S=await new Promise((P,O)=>{M.readEntries(P,O)});for(const P of S){const O=P.isDirectory;P.isFile===!0?yield P:O===!0&&B.push(P)}}}(),Z=async function*(){for await(const D of X){const L=await new Promise((M,S)=>{D.file(M,S)});L.type.startsWith("image/")&&(yield{fullPath:D.fullPath.substring(1),file:L})}}();Re(e,!0);try{await r(Z)}finally{Re(e,!1)}}var z=Oa();da(_=>{var k=Ga();pa.title="About",ee(_,k)});var x=s(z),u=s(x);{var C=_=>{var k=St("Processing");ee(_,k)},d=_=>{var k=St("⚠️ This is pretty slow");ee(_,k)};ca(u,_=>{v(e)?_(C):_(d,!1)})}a(x);var h=l(x,2),g=l(h,2),E=s(g),U=l(s(E),2);U.__change=[Pa,e,r],a(E),a(g);var b=l(g,2),A=s(b),G=l(s(A),2),V=s(G);Va(V,{get value(){return v(n).webp},set value(_){v(n).webp=_}}),a(G),a(A);var Y=l(A,2),H=l(s(Y),2),te=s(H);Ra(te,{get value(){return v(n).heic},set value(_){v(n).heic=_}}),a(H),a(Y);var K=l(Y,2),j=l(s(K),2),ae=s(j);Fa(ae,{get value(){return v(n).avif},set value(_){v(n).avif=_}}),a(j),a(K),a(b);var Q=l(b,2),re=s(Q);re.__click=[$a,n],a(Q),a(z),de(()=>{U.disabled=v(e),re.disabled=v(e)}),Lt("drop",h,I),Lt("dragover",h,w),ee(t,z),$e()}Ge(["change","click"]);export{rs as component};
