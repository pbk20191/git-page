var Ot=Object.defineProperty;var Gt=(t,i,e)=>i in t?Ot(t,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[i]=e;var Ce=(t,i,e)=>Gt(t,typeof i!="symbol"?i+"":i,e);import{t as re,a as j,e as zt}from"../chunks/a5WjkIqk.js";import{z as Wt,b as Jt,i as st,h as xe,C as Ht,d as Kt,K as v,a2 as jt,e as Qt,g as Tt,j as lt,n as De,ac as Zt,k as Yt,l as Dt,m as Xt,aA as it,ag as Vt,ai as kt,aB as ea,V as ta,aC as Lt,aD as aa,aE as sa,af as la,aF as ia,az as ra,aG as oa,aH as na,B as va,w as ua,p as Pe,c as s,t as fe,a as $e,s as l,r as a,T as ie,ap as rt,Y as da,$ as pa,W as Re}from"../chunks/Dbtdn9f7.js";import{d as Oe,e as At}from"../chunks/xKwX_C3Q.js";import{h as ca}from"../chunks/BcMQNMkF.js";import{s as Nt}from"../chunks/DAD-lUWQ.js";import{i as Ct}from"../chunks/Dt9NjwHj.js";import{a as Rt}from"../chunks/i5uILAt2.js";import{w as ot,t as fa}from"../chunks/4eif3qM-.js";import{a as B,b as ve,J as ma}from"../chunks/BzzBhkj3.js";import{b as _e,s as ha}from"../chunks/DizoNBs4.js";import{s as I}from"../chunks/gfzC0wA8.js";import{r as b,s as p}from"../chunks/DCfzdB8P.js";import{p as ft}from"../chunks/BIPL7g2D.js";function Se(t,i){return i}function ga(t,i,e,n){for(var T=[],r=i.length,_=0;_<r;_++)sa(i[_].e,T,!0);var q=r>0&&T.length===0&&e!==null;if(q){var k=e.parentNode;la(k),k.append(e),n.clear(),be(t,i[0].prev,i[r-1].next)}ia(T,()=>{for(var z=0;z<r;z++){var d=i[z];q||(n.delete(d.k),be(t,d.prev,d.next)),ra(d.e,!q)}})}function ze(t,i,e,n,T,r=null){var _=t,q={flags:i,items:new Map,first:null};{var k=t;_=xe?st(Ht(k)):k.appendChild(Wt())}xe&&Kt();var z=null,d=!1,C=jt(()=>{var c=e();return ua(c)?c:c==null?[]:Vt(c)});Jt(()=>{var c=v(C),m=c.length;if(d&&m===0)return;d=m===0;let g=!1;if(xe){var M=_.data===Qt;M!==(m===0)&&(_=Tt(),st(_),lt(!1),g=!0)}if(xe){for(var Y=null,h,R=0;R<m;R++){if(De.nodeType===8&&De.data===Zt){_=De,g=!0,lt(!1);break}var P=c[R],U=n(P,R);h=Et(De,q,Y,null,P,U,R,T,i,e),q.items.set(U,h),Y=h}m>0&&st(Tt())}xe||ba(c,q,_,T,i,n,e),r!==null&&(m===0?z?Yt(z):z=Dt(()=>r(_)):z!==null&&Xt(z,()=>{z=null})),g&&lt(!0),v(C)}),xe&&(_=De)}function ba(t,i,e,n,T,r,_){var q=t.length,k=i.items,z=i.first,d=z,C,c=null,m=[],g=[],M,Y,h,R;for(R=0;R<q;R+=1){if(M=t[R],Y=r(M,R),h=k.get(Y),h===void 0){var P=d?d.e.nodes_start:e;c=Et(P,i,c,c===null?i.first:c.next,M,Y,R,n,T,_),k.set(Y,c),m=[],g=[],d=c.next;continue}if(_a(h,M,R),(h.e.f&it)!==0&&Yt(h.e),h!==d){if(C!==void 0&&C.has(h)){if(m.length<g.length){var U=g[0],D;c=U.prev;var Q=m[0],W=m[m.length-1];for(D=0;D<m.length;D+=1)It(m[D],U,e);for(D=0;D<g.length;D+=1)C.delete(g[D]);be(i,Q.prev,W.next),be(i,c,Q),be(i,W,U),d=U,c=W,R-=1,m=[],g=[]}else C.delete(h),It(h,d,e),be(i,h.prev,h.next),be(i,h,c===null?i.first:c.next),be(i,c,h),c=h;continue}for(m=[],g=[];d!==null&&d.k!==Y;)(d.e.f&it)===0&&(C??(C=new Set)).add(d),g.push(d),d=d.next;if(d===null)continue;h=d}m.push(h),c=h,d=h.next}if(d!==null||C!==void 0){for(var J=C===void 0?[]:Vt(C);d!==null;)(d.e.f&it)===0&&J.push(d),d=d.next;var Z=J.length;if(Z>0){var X=q===0?e:null;ga(i,J,X,k)}}kt.first=i.first&&i.first.e,kt.last=c&&c.e}function _a(t,i,e,n){ea(t.v,i),t.i=e}function Et(t,i,e,n,T,r,_,q,k,z){var d=(k&oa)!==0,C=(k&na)===0,c=d?C?ta(T):Lt(T):T,m=(k&aa)===0?_:Lt(_),g={i:m,v:c,k:r,a:null,e:null,prev:e,next:n};try{return g.e=Dt(()=>q(t,c,m,z),xe),g.e.prev=e&&e.e,g.e.next=n&&n.e,e===null?i.first=g:(e.next=g,e.e.next=g.e),n!==null&&(n.prev=g,n.e.prev=g.e),g}finally{}}function It(t,i,e){for(var n=t.next?t.next.e.nodes_start:e,T=i?i.e.nodes_start:e,r=t.e.nodes_start;r!==n;){var _=va(r);T.before(r),r=_}}function be(t,i,e){i===null?t.first=e:(i.next=e,i.e.next=e&&e.e),e!==null&&(e.prev=i,e.e.prev=i&&i.e)}const qt=""+new URL("../workers/icodecs-J0k5jsnj.js",import.meta.url).href;class Bt{constructor(i,e,n,T=8){Ce(this,"data");Ce(this,"width");Ce(this,"height");Ce(this,"depth");this.data=i,this.width=e,this.height=n,this.depth=T}}Bt.prototype.colorSpace="srgb";var Ve;(function(t){t[t.YUV444=1]="YUV444",t[t.YUV422=2]="YUV422",t[t.YUV420=3]="YUV420",t[t.YUV400=4]="YUV400"})(Ve||(Ve={}));var Ne;(function(t){t[t.Auto=0]="Auto",t[t.PSNR=1]="PSNR",t[t.SSIM=2]="SSIM"})(Ne||(Ne={}));const Mt={quality:50,qualityAlpha:-1,speed:6,subsample:Ve.YUV420,autoTiling:!1,tileColsLog2:0,tileRowsLog2:0,chromaDeltaQ:!1,sharpness:0,denoiseLevel:0,tune:Ne.Auto,sharpYUV:!1};let ya=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});ya.decode();const nt=new TextEncoder;"encodeInto"in nt||(nt.encodeInto=function(t,i){const e=nt.encode(t);return i.set(e),{read:t.length,written:e.length}});var vt;(function(t){t[t.GRAYSCALE=1]="GRAYSCALE",t[t.RGB=2]="RGB",t[t.YCbCr=3]="YCbCr"})(vt||(vt={}));var ut;(function(t){t[t.JPEG_Annex_K=0]="JPEG_Annex_K",t[t.Flat=1]="Flat",t[t.MSSIM_Tuned_Kodak=2]="MSSIM_Tuned_Kodak",t[t.ImageMagick=3]="ImageMagick",t[t.PSNR_HVS_M_Tuned_Kodak=4]="PSNR_HVS_M_Tuned_Kodak",t[t.Klein_Silverstein_Carney=5]="Klein_Silverstein_Carney",t[t.Watson_Taylor_Borthwick=6]="Watson_Taylor_Borthwick",t[t.Ahumada_Watson_Peterson=7]="Ahumada_Watson_Peterson",t[t.Peterson_Ahumada_Watson=8]="Peterson_Ahumada_Watson"})(ut||(ut={}));vt.YCbCr,ut.ImageMagick;var Ut;(function(t){t[t.Default=-1]="Default",t[t.False=0]="False",t[t.True=1]="True"})(Ut||(Ut={}));var dt;(function(t){t[t.Default=-1]="Default",t[t.Zero=0]="Zero",t[t.Left=1]="Left",t[t.Top=2]="Top",t[t.Average0=3]="Average0",t[t.Select=4]="Select",t[t.Gradient=5]="Gradient",t[t.Weighted=6]="Weighted",t[t.TopRight=7]="TopRight",t[t.TopLeft=8]="TopLeft",t[t.LeftLeft=9]="LeftLeft",t[t.Average1=10]="Average1",t[t.Average2=11]="Average2",t[t.Average3=12]="Average3",t[t.Average4=13]="Average4",t[t.Best=14]="Best",t[t.Variable=15]="Variable"})(dt||(dt={}));dt.Default;var Fe;(function(t){t[t.None=0]="None",t[t.SegmentSmooth=1]="SegmentSmooth",t[t.Dithering=2]="Dithering"})(Fe||(Fe={}));var Ie;(function(t){t[t.None=0]="None",t[t.Fast=1]="Fast",t[t.Best=2]="Best"})(Ie||(Ie={}));const Ft={lossless:!1,nearLossless:100,quality:75,targetSize:0,targetPSNR:0,method:4,snsStrength:50,filterStrength:60,filterSharpness:0,filterType:!0,segments:4,pass:1,sharpYUV:!1,preprocessing:Fe.None,autofilter:!1,partitionLimit:0,alphaCompression:1,alphaFiltering:Ie.Fast,alphaQuality:100,exact:!1,emulateJpegSize:!1,lowMemory:!1,partitions:0,showCompressed:0,imageHint:0,threadLevel:0,useDeltaPalette:0},wa=["ultrafast","superfast","veryfast","faster","fast","medium","slow","slower","veryslow","placebo"],xa=["420","422","444"],Sa=["psnr","ssim","grain","fastdecode"],Pt={quality:50,lossless:!1,preset:"slow",tune:"ssim",tuIntraDepth:2,complexity:50,chroma:"420",sharpYUV:!1,bitDepth:8};var pt;(function(t){t[t.UVAdapt=0]="UVAdapt",t[t.UV420=1]="UV420",t[t.UV444=2]="UV444",t[t.UVAuto=3]="UVAuto"})(pt||(pt={}));var ct;(function(t){t[t.YCoCg=0]="YCoCg",t[t.YCbCr=1]="YCbCr",t[t.Custom=2]="Custom",t[t.YIQ=3]="YIQ"})(ct||(ct={}));pt.UVAuto,ct.YCoCg;globalThis._icodec_ImageData=(t,i,e,n)=>n===8?new za(t,i,e):new Bt(t,i,e,n);class za extends ImageData{constructor(){super(...arguments);Ce(this,"depth",8)}}function Ta(t,i){i({...Pt})}var ka=re("<option> </option>"),La=re("<option> </option>"),Aa=re("<option> </option>"),Ca=re('<div class="card svelte-1dgh8ms"><div class="title svelte-1dgh8ms">HEIC  (x265,HEVC) Options</div> <div class="grid svelte-1dgh8ms"><div><div class="row svelte-1dgh8ms"><label for="heic-quality">Quality <span class="muted svelte-1dgh8ms"> </span></label></div> <div class="row svelte-1dgh8ms"><input id="heic-quality" type="range" min="0" max="100"></div> <div class="row svelte-1dgh8ms"><label><input name="heic-lossless" type="checkbox"> Lossless</label></div> <div class="row svelte-1dgh8ms"><label for="heic-preset">Preset</label> <select id="heic-preset"></select></div> <div class="row svelte-1dgh8ms"><label for="heic-tune">Tune</label> <select id="heic-tune"></select></div> <div class="row svelte-1dgh8ms"><label for="heic-tuIntraDepth">TU Intra Depth <span class="muted svelte-1dgh8ms"> </span></label></div> <div class="row svelte-1dgh8ms"><input id="heic-tuIntraDepth" type="range" min="1" max="4"></div></div> <div><div class="row svelte-1dgh8ms"><label for="heic-complexity">Complexity <span class="muted svelte-1dgh8ms"> </span></label></div> <div class="row svelte-1dgh8ms"><input id="heic-complexity" type="range" min="0" max="100"></div> <div class="row svelte-1dgh8ms"><label for="heic-chroma">Chroma</label> <select id="heic-chroma"></select></div> <div class="row svelte-1dgh8ms"><label><input name="heic-sharpYUV" type="checkbox"> Sharp YUV</label></div> <div class="row svelte-1dgh8ms"><button>Reset</button></div></div></div></div>');function Ra(t,i){Pe(i,!0);let e=ft(i,"value",15);const n={quality:`
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
     */`};var T=Ca(),r=l(s(T),2),_=s(r),q=s(_),k=s(q),z=l(s(k)),d=s(z,!0);a(z),a(k),a(q);var C=l(q,2),c=s(C);b(c),a(C);var m=l(C,2),g=s(m),M=s(g);b(M),ie(),a(g),a(m);var Y=l(m,2),h=s(Y),R=l(h,2);ze(R,21,()=>wa,Se,(x,A)=>{var y=ka(),S={},ae=s(y,!0);a(y),fe(()=>{S!==(S=v(A))&&(y.value=(y.__value=v(A))==null?"":v(A)),I(ae,v(A))}),j(x,y)}),a(R),a(Y);var P=l(Y,2),U=s(P),D=l(U,2);ze(D,21,()=>Sa,Se,(x,A)=>{var y=La(),S={},ae=s(y,!0);a(y),fe(()=>{S!==(S=v(A))&&(y.value=(y.__value=v(A))==null?"":v(A)),I(ae,v(A))}),j(x,y)}),a(D),a(P);var Q=l(P,2),W=s(Q),J=l(s(W)),Z=s(J,!0);a(J),a(W),a(Q);var X=l(Q,2),H=s(X);b(H),a(X),a(_);var ue=l(_,2),de=s(ue),ee=s(de),u=l(s(ee)),L=s(u,!0);a(u),a(ee),a(de);var K=l(de,2),te=s(K);b(te),a(K);var $=l(K,2),E=s($),V=l(E,2);ze(V,21,()=>xa,Se,(x,A)=>{var y=Aa(),S={},ae=s(y,!0);a(y),fe(()=>{S!==(S=v(A))&&(y.value=(y.__value=v(A))==null?"":v(A)),I(ae,v(A))}),j(x,y)}),a(V),a($);var F=l($,2),N=s(F),w=s(N);b(w),ie(),a(N),a(F);var O=l(F,2),pe=s(O);pe.__click=[Ta,e],a(O),a(ue),a(r),a(T),fe(()=>{p(k,"title",n.quality),I(d,e().quality??50),p(g,"title",n.lossless),p(h,"title",n.preset),p(U,"title",n.tune),p(W,"title",n.tuIntraDepth),I(Z,e().tuIntraDepth),p(ee,"title",n.complexity),I(L,e().complexity),p(E,"title",n.chroma),p(N,"title",n.sharpYUV)}),B(c,()=>e().quality,x=>e(e().quality=x,!0)),ve(M,()=>e().lossless,x=>e(e().lossless=x,!0)),_e(R,()=>e().preset,x=>e(e().preset=x,!0)),_e(D,()=>e().tune,x=>e(e().tune=x,!0)),B(H,()=>e().tuIntraDepth,x=>e(e().tuIntraDepth=x,!0)),B(te,()=>e().complexity,x=>e(e().complexity=x,!0)),_e(V,()=>e().chroma,x=>e(e().chroma=x,!0)),ve(w,()=>e().sharpYUV,x=>e(e().sharpYUV=x,!0)),j(t,T),$e()}Oe(["click"]);function Ia(t,i){i({...Ft})}var qa=re("<option> </option>"),Ua=re("<option> </option>"),Ya=re(`<div class="card svelte-1c6geua" aria-label="WebP Encoder Options"><div class="grid svelte-1c6geua"><div class="row svelte-1c6geua"><strong>WebP Encoder Options</strong></div> <div class="row svelte-1c6geua"><label class="svelte-1c6geua"><input name="webp-lossless" type="checkbox"> Lossless</label> <span class="muted svelte-1c6geua">(may change transparent pixels)</span></div> <div class="row svelte-1c6geua"><div style="flex:1"><label for="webp-nearLossless" class="small svelte-1c6geua">nearLossless: <span class="muted svelte-1c6geua"> </span></label> <input type="range" id="webp-nearLossless" min="0" max="100" class="svelte-1c6geua"></div> <div style="width:120px"><label for="webp-quality" class="small svelte-1c6geua">quality</label> <input class="num svelte-1c6geua" type="number" min="0" id="webp-quality" max="100"></div></div> <div class="row svelte-1c6geua"><div style="flex:1"><label class="small svelte-1c6geua" for="webp-alphaQuality">alphaQuality: <span class="muted svelte-1c6geua"> </span></label> <input type="range" id="webp-alphaQuality" min="0" max="100" class="svelte-1c6geua"></div> <div style="width:120px"><label for="webp-method" class="small svelte-1c6geua">method</label> <input class="num svelte-1c6geua" id="webp-method" type="number" min="0" max="6"></div></div> <div class="row svelte-1c6geua"><label for="webp-snsStrength" class="small svelte-1c6geua"> </label> <input type="range" id="webp-snsStrength" min="0" max="100" class="svelte-1c6geua"></div> <div class="row svelte-1c6geua"><label for="webp-filterStrength" class="small svelte-1c6geua"> </label> <input type="range" id="webp-filterStrength" min="0" max="100" class="svelte-1c6geua"></div> <div class="row two svelte-1c6geua"><div style="flex:1"><label for="webp-filterSharpness" class="small svelte-1c6geua"> </label> <input type="range" id="webp-filterSharpness" min="0" max="7" class="svelte-1c6geua"></div> <div style="width:160px"><label class="svelte-1c6geua"><input name="webp-filterType" type="checkbox"> filterType
                    (strong)</label></div></div> <div class="row svelte-1c6geua"><label for="webp-segments" class="small svelte-1c6geua"> </label> <input id="webp-segments" type="range" min="1" max="4" class="svelte-1c6geua"></div> <div class="row two svelte-1c6geua"><div style="flex:1"><label for="webp-preprocessing" class="svelte-1c6geua">preprocessing</label> <select id="webp-preprocessing"></select></div> <div style="width:160px"><label class="svelte-1c6geua"><input name="webp-autofilter" type="checkbox"> autofilter</label></div></div> <div class="row two svelte-1c6geua"><div style="flex:1"><label for="webp-partitionLimit" class="small svelte-1c6geua"> </label> <input type="range" id="webp-partitionLimit" min="0" max="100" class="svelte-1c6geua"></div> <div style="width:160px"><label for="webp-pass" class="small svelte-1c6geua"> </label> <input class="num svelte-1c6geua" id="webp-pass" type="number" min="1" max="10"></div></div> <div class="row two svelte-1c6geua"><div><label for="webp-alphaCompression" class="svelte-1c6geua">alphaCompression</label> <select id="webp-alphaCompression"><option>0 (none)</option><option>1 (webp lossless)</option></select></div> <div><label for="webp-alphaFiltering" class="svelte-1c6geua">alphaFiltering</label> <select id="webp-alphaFiltering"></select></div></div> <div class="row svelte-1c6geua"><label class="svelte-1c6geua"><input name="webp-sharpYUV" type="checkbox"> sharpYUV</label> <label style="margin-left:12px" class="svelte-1c6geua"><input name="webp-exact" type="checkbox"> exact (preserve
                RGB in transparent)</label></div> <div class="row two svelte-1c6geua"><div style="flex:1"><label for="webp-targetSize" class="svelte-1c6geua">targetSize (bytes)</label> <input id="webp-targetSize" type="number" min="0"></div> <div style="width:160px"><label for="webp-targetPSNR" class="svelte-1c6geua">targetPSNR (dB)</label> <input class="num svelte-1c6geua" id="webp-targetPSNR" type="number" min="0"></div></div> <div class="row two svelte-1c6geua"><div><label class="svelte-1c6geua"><input name="webp-lowMemory" type="checkbox"> lowMemory</label></div> <div><label class="svelte-1c6geua"><input name="webp-emulateJpegSize" type="checkbox"> emulateJpegSize</label></div></div> <div class="actions svelte-1c6geua"><button type="button">Reset</button></div></div></div>`);function Da(t,i){Pe(i,!0);let e=ft(i,"value",15);const n=Object.values(Fe).filter(o=>typeof o=="number").map(o=>({label:Ie[o],v:o})),T=Object.values(Ie).filter(o=>typeof o=="number").map(o=>({label:Ie[o],v:o})),r={lossless:`/**
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
    */`};var _=Ya(),q=s(_),k=l(s(q),2),z=s(k),d=s(z);b(d),ie(),a(z),ie(2),a(k);var C=l(k,2),c=s(C),m=s(c),g=l(s(m)),M=s(g,!0);a(g),a(m);var Y=l(m,2);b(Y),a(c);var h=l(c,2),R=l(s(h),2);b(R),a(h),a(C);var P=l(C,2),U=s(P),D=s(U),Q=l(s(D)),W=s(Q,!0);a(Q),a(D);var J=l(D,2);b(J),a(U);var Z=l(U,2),X=l(s(Z),2);b(X),a(Z),a(P);var H=l(P,2),ue=s(H),de=s(ue);a(ue);var ee=l(ue,2);b(ee),a(H);var u=l(H,2),L=s(u),K=s(L);a(L);var te=l(L,2);b(te),a(u);var $=l(u,2),E=s($),V=s(E),F=s(V);a(V);var N=l(V,2);b(N),a(E);var w=l(E,2),O=s(w),pe=s(O);b(pe),ie(),a(O),a(w),a($);var x=l($,2),A=s(x),y=s(A);a(A);var S=l(A,2);b(S),a(x);var ae=l(x,2),oe=s(ae),se=l(s(oe),2);ze(se,21,()=>n,Se,(o,ge)=>{var ce=qa(),Ye={},at=s(ce,!0);a(ce),fe(()=>{Ye!==(Ye=v(ge).v)&&(ce.value=(ce.__value=v(ge).v)==null?"":v(ge).v),I(at,v(ge).label)}),j(o,ce)}),a(se),a(oe);var ne=l(oe,2),qe=s(ne),Ee=s(qe);b(Ee),ie(),a(qe),a(ne),a(ae);var Te=l(ae,2),me=s(Te),ye=s(me),ke=s(ye);a(ye);var Ue=l(ye,2);b(Ue),a(me);var Le=l(me,2),Ae=s(Le),Ge=s(Ae);a(Ae);var f=l(Ae,2);b(f),a(Le),a(Te);var le=l(Te,2),G=s(le),he=l(s(G),2),we=s(he);we.value=(we.__value=0)==null?"":0;var mt=l(we);mt.value=(mt.__value=1)==null?"":1,a(he),a(G);var We=l(G,2),Je=l(s(We),2);ze(Je,21,()=>T,Se,(o,ge)=>{var ce=Ua(),Ye={},at=s(ce,!0);a(ce),fe(()=>{Ye!==(Ye=v(ge).v)&&(ce.value=(ce.__value=v(ge).v)==null?"":v(ge).v),I(at,v(ge).label)}),j(o,ce)}),a(Je),a(We),a(le);var He=l(le,2),Be=s(He),ht=s(Be);b(ht),ie(),a(Be);var Ke=l(Be,2),gt=s(Ke);b(gt),ie(),a(Ke),a(He);var je=l(He,2),Me=s(je),bt=l(s(Me),2);b(bt),a(Me);var Qe=l(Me,2),_t=l(s(Qe),2);b(_t),a(Qe),a(je);var Ze=l(je,2),Xe=s(Ze),et=s(Xe),yt=s(et);b(yt),ie(),a(et),a(Xe);var wt=l(Xe,2),tt=s(wt),xt=s(tt);b(xt),ie(),a(tt),a(wt),a(Ze);var St=l(Ze,2),$t=s(St);$t.__click=[Ia,e],a(St),a(q),a(_),fe(()=>{p(z,"title",r.lossless),p(c,"title",r.nearLossless),I(M,e().nearLossless),p(h,"title",r.quality),p(U,"title",r.alphaQuality),I(W,e().alphaQuality),p(Z,"title",r.method),p(H,"title",r.snsStrength),I(de,`snsStrength: ${e().snsStrength??""}`),p(u,"title",r.filterStrength),I(K,`filterStrength: ${e().filterStrength??""}`),p(E,"title",r.filterSharpness),I(F,`filterSharpness: ${e().filterSharpness??""}`),p(w,"title",r.filterType),p(x,"title",r.segments),I(y,`segments: ${e().segments??""}`),p(oe,"title",r.preprocessing),p(ne,"title",r.autofilter),p(me,"title",r.partitionLimit),I(ke,`partitionLimit: ${e().partitionLimit??""}`),p(Le,"title",r.pass),I(Ge,`pass: ${e().pass??""}`),p(G,"title",r.alphaCompression),p(We,"title",r.alphaFiltering),p(Be,"title",r.sharpYUV),p(Ke,"title",r.exact),p(Me,"title",r.targetSize),p(Qe,"title",r.targetPSNR),p(et,"title",r.lowMemory),p(tt,"title",r.emulateJpegSize)}),ve(d,()=>e().lossless,o=>e(e().lossless=o,!0)),B(Y,()=>e().nearLossless,o=>e(e().nearLossless=o,!0)),B(R,()=>e().quality,o=>e(e().quality=o,!0)),B(J,()=>e().alphaQuality,o=>e(e().alphaQuality=o,!0)),B(X,()=>e().method,o=>e(e().method=o,!0)),B(ee,()=>e().snsStrength,o=>e(e().snsStrength=o,!0)),B(te,()=>e().filterStrength,o=>e(e().filterStrength=o,!0)),B(N,()=>e().filterSharpness,o=>e(e().filterSharpness=o,!0)),ve(pe,()=>e().filterType,o=>e(e().filterType=o,!0)),B(S,()=>e().segments,o=>e(e().segments=o,!0)),_e(se,()=>e().preprocessing,o=>e(e().preprocessing=o,!0)),ve(Ee,()=>e().autofilter,o=>e(e().autofilter=o,!0)),B(Ue,()=>e().partitionLimit,o=>e(e().partitionLimit=o,!0)),B(f,()=>e().pass,o=>e(e().pass=o,!0)),_e(he,()=>e().alphaCompression,o=>e(e().alphaCompression=o,!0)),_e(Je,()=>e().alphaFiltering,o=>e(e().alphaFiltering=o,!0)),ve(ht,()=>e().sharpYUV,o=>e(e().sharpYUV=o,!0)),ve(gt,()=>e().exact,o=>e(e().exact=o,!0)),B(bt,()=>e().targetSize,o=>e(e().targetSize=o,!0)),B(_t,()=>e().targetPSNR,o=>e(e().targetPSNR=o,!0)),ve(yt,()=>e().lowMemory,o=>e(e().lowMemory=o,!0)),ve(xt,()=>e().emulateJpegSize,o=>e(e().emulateJpegSize=o,!0)),j(t,_),$e()}Oe(["click"]);function Va(t,i){i({...Mt})}var Na=re("<option> </option>"),Ea=re("<option> </option>"),Ba=re('<div class="card svelte-1iuoinz" aria-label="AVIF Encoder Options"><div class="title" style="font-weight:600; margin-bottom:8px">AVIF Options</div> <div class="grid svelte-1iuoinz"><div><div class="row svelte-1iuoinz"><label for="avif-quality" class="svelte-1iuoinz">Quality <span class="muted svelte-1iuoinz"> </span></label></div> <div class="row svelte-1iuoinz"><input id="avif-quality" type="range" min="0" max="100" class="svelte-1iuoinz"></div> <div class="row svelte-1iuoinz"><label for="avif-qualityAlpha" class="svelte-1iuoinz">Quality Alpha <span class="muted svelte-1iuoinz"> </span></label> <input id="avif-qualityAlpha" class="num svelte-1iuoinz" type="number" min="-1" max="100"></div> <div class="row svelte-1iuoinz"><label for="avif-speed" class="svelte-1iuoinz">Speed <span class="muted svelte-1iuoinz"> </span></label> <input id="avif-speed" type="range" min="-1" max="10" class="svelte-1iuoinz"></div> <div class="row svelte-1iuoinz"><label for="avif-subsample" class="svelte-1iuoinz">Subsample</label> <select id="avif-subsample"></select></div> <div class="row svelte-1iuoinz"><label class="svelte-1iuoinz"><input name="avif-autoTiling" type="checkbox"> Auto Tiling</label></div> <div class="row svelte-1iuoinz"><label for="avif-tileRowsLog2" class="svelte-1iuoinz">TileRows (log2) <span class="muted svelte-1iuoinz"> </span></label> <input id="avif-tileRowsLog2" type="range" min="0" max="6" class="svelte-1iuoinz"></div> <div class="row svelte-1iuoinz"><label for="avif-tileColsLog2" class="svelte-1iuoinz">TileCols (log2) <span class="muted svelte-1iuoinz"> </span></label> <input id="avif-tileColsLog2" type="range" min="0" max="6" class="svelte-1iuoinz"></div></div> <div><div class="row svelte-1iuoinz"><label class="svelte-1iuoinz"><input name="avif-chromaDeltaQ" type="checkbox"> Chroma Delta Q</label></div> <div class="row svelte-1iuoinz"><label for="avif-sharpness" class="svelte-1iuoinz">Sharpness <span class="muted svelte-1iuoinz"> </span></label> <input id="avif-sharpness" type="range" min="0" max="7" class="svelte-1iuoinz"></div> <div class="row svelte-1iuoinz"><label for="avif-denoiseLevel" class="svelte-1iuoinz">Denoise Level <span class="muted svelte-1iuoinz"> </span></label> <input id="avif-denoiseLevel" type="range" min="0" max="50" class="svelte-1iuoinz"></div> <div class="row svelte-1iuoinz"><label for="avif-tune" class="svelte-1iuoinz">Tune</label> <select id="avif-tune"></select></div> <div class="row svelte-1iuoinz"><label class="svelte-1iuoinz"><input name="avif-sharpYUV" type="checkbox"> Sharp YUV</label></div> <div class="actions svelte-1iuoinz"><button type="button">Reset</button></div></div></div></div>');function Ma(t,i){Pe(i,!0);let e=ft(i,"value",15);const n=Object.values(Ve).filter(f=>typeof f=="number").map(f=>({label:Ve[f],v:f})),T=Object.values(Ne).filter(f=>typeof f=="number").map(f=>({label:Ne[f],v:f})),r={quality:`/**
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
 */`};var _=Ba(),q=l(s(_),2),k=s(q),z=s(k),d=s(z),C=l(s(d)),c=s(C,!0);a(C),a(d),a(z);var m=l(z,2),g=s(m);b(g),a(m);var M=l(m,2),Y=s(M),h=l(s(Y)),R=s(h,!0);a(h),a(Y);var P=l(Y,2);b(P),a(M);var U=l(M,2),D=s(U),Q=l(s(D)),W=s(Q,!0);a(Q),a(D);var J=l(D,2);b(J),a(U);var Z=l(U,2),X=l(s(Z),2);ze(X,21,()=>n,Se,(f,le)=>{var G=Na(),he={},we=s(G,!0);a(G),fe(()=>{he!==(he=v(le).v)&&(G.value=(G.__value=v(le).v)==null?"":v(le).v),I(we,v(le).label)}),j(f,G)}),a(X),a(Z);var H=l(Z,2),ue=s(H),de=s(ue);b(de),ie(),a(ue),a(H);var ee=l(H,2),u=s(ee),L=l(s(u)),K=s(L,!0);a(L),a(u);var te=l(u,2);b(te),a(ee);var $=l(ee,2),E=s($),V=l(s(E)),F=s(V,!0);a(V),a(E);var N=l(E,2);b(N),a($),a(k);var w=l(k,2),O=s(w),pe=s(O),x=s(pe);b(x),ie(),a(pe),a(O);var A=l(O,2),y=s(A),S=l(s(y)),ae=s(S,!0);a(S),a(y);var oe=l(y,2);b(oe),a(A);var se=l(A,2),ne=s(se),qe=l(s(ne)),Ee=s(qe,!0);a(qe),a(ne);var Te=l(ne,2);b(Te),a(se);var me=l(se,2),ye=l(s(me),2);ze(ye,21,()=>T,Se,(f,le)=>{var G=Ea(),he={},we=s(G,!0);a(G),fe(()=>{he!==(he=v(le).v)&&(G.value=(G.__value=v(le).v)==null?"":v(le).v),I(we,v(le).label)}),j(f,G)}),a(ye),a(me);var ke=l(me,2),Ue=s(ke),Le=s(Ue);b(Le),ie(),a(Ue),a(ke);var Ae=l(ke,2),Ge=s(Ae);Ge.__click=[Va,e],a(Ae),a(w),a(q),a(_),fe(()=>{p(z,"title",r.quality),I(c,e().quality),p(M,"title",r.qualityAlpha),I(R,e().qualityAlpha),p(U,"title",r.speed),I(W,e().speed),p(Z,"title",r.subsample),p(H,"title",r.autoTiling),p(ee,"title",r.tileColsLog2),I(K,e().tileRowsLog2),p($,"title",r.tileColsLog2),I(F,e().tileColsLog2),p(O,"title",r.chromaDeltaQ),p(A,"title",r.sharpness),I(ae,e().sharpness),p(se,"title",r.denoiseLevel),I(Ee,e().denoiseLevel),p(me,"title",r.tune),p(ke,"title",r.sharpYUV)}),B(g,()=>e().quality,f=>e(e().quality=f,!0)),B(P,()=>e().qualityAlpha,f=>e(e().qualityAlpha=f,!0)),B(J,()=>e().speed,f=>e(e().speed=f,!0)),_e(X,()=>e().subsample,f=>e(e().subsample=f,!0)),ve(de,()=>e().autoTiling,f=>e(e().autoTiling=f,!0)),B(te,()=>e().tileRowsLog2,f=>e(e().tileRowsLog2=f,!0)),B(N,()=>e().tileColsLog2,f=>e(e().tileColsLog2=f,!0)),ve(x,()=>e().chromaDeltaQ,f=>e(e().chromaDeltaQ=f,!0)),B(oe,()=>e().sharpness,f=>e(e().sharpness=f,!0)),B(Te,()=>e().denoiseLevel,f=>e(e().denoiseLevel=f,!0)),_e(ye,()=>e().tune,f=>e(e().tune=f,!0)),ve(Le,()=>e().sharpYUV,f=>e(e().sharpYUV=f,!0)),j(t,_),$e()}Oe(["click"]);const Fa="icodec_encoder_options";async function Pa(t,i,e){const n=Array.from(t.currentTarget.files??[]),T=async function*(){for(const r of n)yield{file:r,fullPath:r.name}}();try{Re(i,!0),await e(T)}finally{Re(i,!1)}}function $a(t,i){window.localStorage.setItem("icodec_encoder_options",JSON.stringify(Nt(v(i))))}var Oa=re('<meta name="description" content="Converter for heif">'),Ga=re(`<div class="section svelte-l4mzdf">crossOriginIsolation not validated, HEIC encoding won't work, plz refresh the page</div>`),Wa=re('<div class="container svelte-l4mzdf"><div class="section svelte-l4mzdf"><!></div> <!> <div class="drop-zone svelte-l4mzdf" role="region" aria-label="file-drop-zone"></div> <div class="section svelte-l4mzdf"><div class="field svelte-l4mzdf"><label for="icodec-images">images</label> <input type="file" id="icodec-images" multiple accept="image/png, image/jpeg"></div></div> <div class="section svelte-l4mzdf"><details class="svelte-l4mzdf"><summary class="svelte-l4mzdf">WEBP</summary> <div class="body svelte-l4mzdf"><!></div></details> <details class="svelte-l4mzdf"><summary class="svelte-l4mzdf">HEIC</summary> <div class="body svelte-l4mzdf"><!></div></details> <details class="svelte-l4mzdf"><summary class="svelte-l4mzdf">AVIF</summary> <div class="body svelte-l4mzdf"><!></div></details></div> <div class="section svelte-l4mzdf"><button class="svelte-l4mzdf">save config in local</button></div></div>');function os(t,i){Pe(i,!0);let e=rt(!1),n=rt(da({webp:{...Ft},avif:{...Mt},heic:{...Pt}}));Rt(()=>{let u=window.localStorage.getItem(Fa);u&&Re(n,JSON.parse(u),!0)});let T=rt(!1);Rt(()=>{Re(T,window.crossOriginIsolated,!0)});async function r(u){let L=new Worker(qt,{type:"module"});const K=navigator.hardwareConcurrency-1||4,te=[];te.push(L);const $=[];$.push(ot(L));const E=[];ot(L);const V=new ma;let F=[],N=0;try{for await(const w of u){N+=1;const O=N;if(E.length>=K){const A=await Promise.race(E.map(S=>S.promise)),y=E.findIndex(S=>S.id===A.idx);y!=-1&&E.splice(y,1),$.push(A.worker)}else E.length<K&&$.length===0&&(L=new Worker(qt,{type:"module"}),te.push(L),$.push(ot(L)));let pe=$.pop();const x=Promise.try(async()=>{let A=w.file;try{let y=await createImageBitmap(A);const S=await pe.encodeBitmap(fa(y,[y]),Nt(v(n))),ae=w.fullPath.replace(/\.[^/.]+$/,""),oe=ae.split("/"),se=oe.slice(0,-1).join("/"),ne=oe[oe.length-1];console.log({fileBaseName:ne,folderPath:se,outputName:ae,components:oe}),S.avif.status==="fulfilled"?V.file(`${se}/avif/${ne}.avif`,S.avif.value):(console.error(S.avif.reason),F.push({type:"avif",reason:S.avif.reason,fileName:w.fullPath})),S.heic.status==="fulfilled"?V.file(`${se}/heic/${ne}.heic`,S.heic.value):(console.error(S.heic.reason),F.push({type:"heic",reason:S.heic.reason,fileName:w.fullPath})),S.webp.status==="fulfilled"?V.file(`${se}/webp/${ne}.webp`,S.webp.value):(console.error(S.webp.reason),F.push({type:"webp",reason:S.webp.reason,fileName:w.fullPath}))}catch(y){console.error(y),F.push({reason:y,fileName:w.fullPath})}return{idx:O,worker:pe}});E.push({id:O,promise:x})}await Promise.allSettled(E.map(w=>w.promise))}finally{for(const w of te)w.terminate()}if(N!=0){const w=await V.generateAsync({type:"blob"});ha(w,"converted_images.zip")}F.length>0&&alert(JSON.stringify(F))}function _(u){!v(e)&&u.dataTransfer&&u.dataTransfer.types.length>0&&u.dataTransfer.types[0]==="Files"&&u.preventDefault()}async function q(u){var E;const L=(E=u.dataTransfer)==null?void 0:E.items;if(!L||L.length==0||v(e))return;u.preventDefault();let K=[];const te=async function*(){for(let V=0;V<L.length;V++){const N=L[V].webkitGetAsEntry();N&&(N.isDirectory?K.push(N):N.isFile&&(yield N))}for(;K.length>0;){let F=K.pop().createReader();const N=await new Promise((w,O)=>{F.readEntries(w,O)});for(const w of N){const O=w.isDirectory;w.isFile===!0?yield w:O===!0&&K.push(w)}}}(),$=async function*(){for await(const V of te){const F=await new Promise((N,w)=>{V.file(N,w)});F.type.startsWith("image/")&&(yield{fullPath:V.fullPath.substring(1),file:F})}}();Re(e,!0);try{await r($)}finally{Re(e,!1)}}var k=Wa();ca(u=>{var L=Oa();pa.title="About",j(u,L)});var z=s(k),d=s(z);{var C=u=>{var L=zt("Processing");j(u,L)},c=u=>{var L=zt("⚠️ This is pretty slow");j(u,L)};Ct(d,u=>{v(e)?u(C):u(c,!1)})}a(z);var m=l(z,2);{var g=u=>{var L=Ga();j(u,L)};Ct(m,u=>{v(T)||u(g)})}var M=l(m,2),Y=l(M,2),h=s(Y),R=l(s(h),2);R.__change=[Pa,e,r],a(h),a(Y);var P=l(Y,2),U=s(P),D=l(s(U),2),Q=s(D);Da(Q,{get value(){return v(n).webp},set value(u){v(n).webp=u}}),a(D),a(U);var W=l(U,2),J=l(s(W),2),Z=s(J);Ra(Z,{get value(){return v(n).heic},set value(u){v(n).heic=u}}),a(J),a(W);var X=l(W,2),H=l(s(X),2),ue=s(H);Ma(ue,{get value(){return v(n).avif},set value(u){v(n).avif=u}}),a(H),a(X),a(P);var de=l(P,2),ee=s(de);ee.__click=[$a,n],a(de),a(k),fe(()=>{R.disabled=v(e),ee.disabled=v(e)}),At("drop",M,q),At("dragover",M,_),j(t,k),$e()}Oe(["change","click"]);export{os as component};
