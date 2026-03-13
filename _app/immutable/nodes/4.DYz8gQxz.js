var $t=Object.defineProperty;var Ot=(t,i,e)=>i in t?$t(t,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[i]=e;var Ce=(t,i,e)=>Ot(t,typeof i!="symbol"?i+"":i,e);import{t as ve,a as ee,e as St}from"../chunks/a5WjkIqk.js";import{z as Gt,b as Wt,i as st,h as xe,C as Jt,d as Ht,K as u,a2 as Kt,e as jt,g as zt,j as lt,n as Ve,ac as Qt,k as Ut,l as Yt,m as Zt,aA as it,ag as Vt,ai as Tt,aB as Xt,V as ea,aC as kt,aD as ta,aE as aa,af as sa,aF as la,az as ia,aG as ra,aH as oa,B as na,w as va,p as Pe,c as s,t as pe,a as $e,s as l,r as a,T as ie,ap as rt,Y as ua,$ as pa,W as Re}from"../chunks/Dbtdn9f7.js";import{d as Oe,e as Lt}from"../chunks/xKwX_C3Q.js";import{h as da}from"../chunks/BcMQNMkF.js";import{s as Dt}from"../chunks/DAD-lUWQ.js";import{i as ca}from"../chunks/Dt9NjwHj.js";import{a as At}from"../chunks/i5uILAt2.js";import{w as Ct,t as fa}from"../chunks/4eif3qM-.js";import{a as N,b as ne,J as ma}from"../chunks/BzzBhkj3.js";import{b as ge,s as ha}from"../chunks/DizoNBs4.js";import{s as q}from"../chunks/gfzC0wA8.js";import{r as _,s as d}from"../chunks/DCfzdB8P.js";import{p as ct}from"../chunks/BIPL7g2D.js";function Se(t,i){return i}function ga(t,i,e,v){for(var T=[],r=i.length,y=0;y<r;y++)aa(i[y].e,T,!0);var I=r>0&&T.length===0&&e!==null;if(I){var z=e.parentNode;sa(z),z.append(e),v.clear(),he(t,i[0].prev,i[r-1].next)}la(T,()=>{for(var w=0;w<r;w++){var p=i[w];I||(v.delete(p.k),he(t,p.prev,p.next)),ia(p.e,!I)}})}function ze(t,i,e,v,T,r=null){var y=t,I={flags:i,items:new Map,first:null};{var z=t;y=xe?st(Jt(z)):z.appendChild(Gt())}xe&&Ht();var w=null,p=!1,R=Kt(()=>{var c=e();return va(c)?c:c==null?[]:Vt(c)});Wt(()=>{var c=u(R),m=c.length;if(p&&m===0)return;p=m===0;let h=!1;if(xe){var E=y.data===jt;E!==(m===0)&&(y=zt(),st(y),lt(!1),h=!0)}if(xe){for(var Y=null,g,C=0;C<m;C++){if(Ve.nodeType===8&&Ve.data===Qt){y=Ve,h=!0,lt(!1);break}var O=c[C],V=v(O,C);g=Nt(Ve,I,Y,null,O,V,C,T,i,e),I.items.set(V,g),Y=g}m>0&&st(zt())}xe||ba(c,I,y,T,i,v,e),r!==null&&(m===0?w?Ut(w):w=Yt(()=>r(y)):w!==null&&Zt(w,()=>{w=null})),h&&lt(!0),u(R)}),xe&&(y=Ve)}function ba(t,i,e,v,T,r,y){var I=t.length,z=i.items,w=i.first,p=w,R,c=null,m=[],h=[],E,Y,g,C;for(C=0;C<I;C+=1){if(E=t[C],Y=r(E,C),g=z.get(Y),g===void 0){var O=p?p.e.nodes_start:e;c=Nt(O,i,c,c===null?i.first:c.next,E,Y,C,v,T,y),z.set(Y,c),m=[],h=[],p=c.next;continue}if(_a(g,E,C),(g.e.f&it)!==0&&Ut(g.e),g!==p){if(R!==void 0&&R.has(g)){if(m.length<h.length){var V=h[0],U;c=V.prev;var H=m[0],te=m[m.length-1];for(U=0;U<m.length;U+=1)Rt(m[U],V,e);for(U=0;U<h.length;U+=1)R.delete(h[U]);he(i,H.prev,te.next),he(i,c,H),he(i,te,V),p=V,c=te,C-=1,m=[],h=[]}else R.delete(g),Rt(g,p,e),he(i,g.prev,g.next),he(i,g,c===null?i.first:c.next),he(i,c,g),c=g;continue}for(m=[],h=[];p!==null&&p.k!==Y;)(p.e.f&it)===0&&(R??(R=new Set)).add(p),h.push(p),p=p.next;if(p===null)continue;g=p}m.push(g),c=g,p=g.next}if(p!==null||R!==void 0){for(var K=R===void 0?[]:Vt(R);p!==null;)(p.e.f&it)===0&&K.push(p),p=p.next;var j=K.length;if(j>0){var ae=I===0?e:null;ga(i,K,ae,z)}}Tt.first=i.first&&i.first.e,Tt.last=c&&c.e}function _a(t,i,e,v){Xt(t.v,i),t.i=e}function Nt(t,i,e,v,T,r,y,I,z,w){var p=(z&ra)!==0,R=(z&oa)===0,c=p?R?ea(T):kt(T):T,m=(z&ta)===0?y:kt(y),h={i:m,v:c,k:r,a:null,e:null,prev:e,next:v};try{return h.e=Yt(()=>I(t,c,m,w),xe),h.e.prev=e&&e.e,h.e.next=v&&v.e,e===null?i.first=h:(e.next=h,e.e.next=h.e),v!==null&&(v.prev=h,v.e.prev=h.e),h}finally{}}function Rt(t,i,e){for(var v=t.next?t.next.e.nodes_start:e,T=i?i.e.nodes_start:e,r=t.e.nodes_start;r!==v;){var y=na(r);T.before(r),r=y}}function he(t,i,e){i===null?t.first=e:(i.next=e,i.e.next=e&&e.e),e!==null&&(e.prev=i,e.e.prev=i&&i.e)}const qt=""+new URL("../workers/icodecs-azOgJBjz.js",import.meta.url).href;class Et{constructor(i,e,v,T=8){Ce(this,"data");Ce(this,"width");Ce(this,"height");Ce(this,"depth");this.data=i,this.width=e,this.height=v,this.depth=T}}Et.prototype.colorSpace="srgb";var De;(function(t){t[t.YUV444=1]="YUV444",t[t.YUV422=2]="YUV422",t[t.YUV420=3]="YUV420",t[t.YUV400=4]="YUV400"})(De||(De={}));var Ne;(function(t){t[t.Auto=0]="Auto",t[t.PSNR=1]="PSNR",t[t.SSIM=2]="SSIM"})(Ne||(Ne={}));const Bt={quality:50,qualityAlpha:-1,speed:6,subsample:De.YUV420,autoTiling:!1,tileColsLog2:0,tileRowsLog2:0,chromaDeltaQ:!1,sharpness:0,denoiseLevel:0,tune:Ne.Auto,sharpYUV:!1};let ya=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});ya.decode();const ot=new TextEncoder;"encodeInto"in ot||(ot.encodeInto=function(t,i){const e=ot.encode(t);return i.set(e),{read:t.length,written:e.length}});var nt;(function(t){t[t.GRAYSCALE=1]="GRAYSCALE",t[t.RGB=2]="RGB",t[t.YCbCr=3]="YCbCr"})(nt||(nt={}));var vt;(function(t){t[t.JPEG_Annex_K=0]="JPEG_Annex_K",t[t.Flat=1]="Flat",t[t.MSSIM_Tuned_Kodak=2]="MSSIM_Tuned_Kodak",t[t.ImageMagick=3]="ImageMagick",t[t.PSNR_HVS_M_Tuned_Kodak=4]="PSNR_HVS_M_Tuned_Kodak",t[t.Klein_Silverstein_Carney=5]="Klein_Silverstein_Carney",t[t.Watson_Taylor_Borthwick=6]="Watson_Taylor_Borthwick",t[t.Ahumada_Watson_Peterson=7]="Ahumada_Watson_Peterson",t[t.Peterson_Ahumada_Watson=8]="Peterson_Ahumada_Watson"})(vt||(vt={}));nt.YCbCr,vt.ImageMagick;var It;(function(t){t[t.Default=-1]="Default",t[t.False=0]="False",t[t.True=1]="True"})(It||(It={}));var ut;(function(t){t[t.Default=-1]="Default",t[t.Zero=0]="Zero",t[t.Left=1]="Left",t[t.Top=2]="Top",t[t.Average0=3]="Average0",t[t.Select=4]="Select",t[t.Gradient=5]="Gradient",t[t.Weighted=6]="Weighted",t[t.TopRight=7]="TopRight",t[t.TopLeft=8]="TopLeft",t[t.LeftLeft=9]="LeftLeft",t[t.Average1=10]="Average1",t[t.Average2=11]="Average2",t[t.Average3=12]="Average3",t[t.Average4=13]="Average4",t[t.Best=14]="Best",t[t.Variable=15]="Variable"})(ut||(ut={}));ut.Default;var Fe;(function(t){t[t.None=0]="None",t[t.SegmentSmooth=1]="SegmentSmooth",t[t.Dithering=2]="Dithering"})(Fe||(Fe={}));var qe;(function(t){t[t.None=0]="None",t[t.Fast=1]="Fast",t[t.Best=2]="Best"})(qe||(qe={}));const Mt={lossless:!1,nearLossless:100,quality:75,targetSize:0,targetPSNR:0,method:4,snsStrength:50,filterStrength:60,filterSharpness:0,filterType:!0,segments:4,pass:1,sharpYUV:!1,preprocessing:Fe.None,autofilter:!1,partitionLimit:0,alphaCompression:1,alphaFiltering:qe.Fast,alphaQuality:100,exact:!1,emulateJpegSize:!1,lowMemory:!1,partitions:0,showCompressed:0,imageHint:0,threadLevel:0,useDeltaPalette:0},wa=["ultrafast","superfast","veryfast","faster","fast","medium","slow","slower","veryslow","placebo"],xa=["420","422","444"],Sa=["psnr","ssim","grain","fastdecode"],Ft={quality:50,lossless:!1,preset:"slow",tune:"ssim",tuIntraDepth:2,complexity:50,chroma:"420",sharpYUV:!1};var pt;(function(t){t[t.UVAdapt=0]="UVAdapt",t[t.UV420=1]="UV420",t[t.UV444=2]="UV444",t[t.UVAuto=3]="UVAuto"})(pt||(pt={}));var dt;(function(t){t[t.YCoCg=0]="YCoCg",t[t.YCbCr=1]="YCbCr",t[t.Custom=2]="Custom",t[t.YIQ=3]="YIQ"})(dt||(dt={}));pt.UVAuto,dt.YCoCg;globalThis._icodec_ImageData=(t,i,e,v)=>v===8?new za(t,i,e):new Et(t,i,e,v);class za extends ImageData{constructor(){super(...arguments);Ce(this,"depth",8)}}function Ta(t,i){i({...Ft})}var ka=ve("<option> </option>"),La=ve("<option> </option>"),Aa=ve("<option> </option>"),Ca=ve('<div class="card svelte-1dgh8ms"><div class="title svelte-1dgh8ms">HEIC  (x265,HEVC) Options</div> <div class="grid svelte-1dgh8ms"><div><div class="row svelte-1dgh8ms"><label for="heic-quality">Quality <span class="muted svelte-1dgh8ms"> </span></label></div> <div class="row svelte-1dgh8ms"><input id="heic-quality" type="range" min="0" max="100"></div> <div class="row svelte-1dgh8ms"><label><input name="heic-lossless" type="checkbox"> Lossless</label></div> <div class="row svelte-1dgh8ms"><label for="heic-preset">Preset</label> <select id="heic-preset"></select></div> <div class="row svelte-1dgh8ms"><label for="heic-tune">Tune</label> <select id="heic-tune"></select></div> <div class="row svelte-1dgh8ms"><label for="heic-tuIntraDepth">TU Intra Depth <span class="muted svelte-1dgh8ms"> </span></label></div> <div class="row svelte-1dgh8ms"><input id="heic-tuIntraDepth" type="range" min="1" max="4"></div></div> <div><div class="row svelte-1dgh8ms"><label for="heic-complexity">Complexity <span class="muted svelte-1dgh8ms"> </span></label></div> <div class="row svelte-1dgh8ms"><input id="heic-complexity" type="range" min="0" max="100"></div> <div class="row svelte-1dgh8ms"><label for="heic-chroma">Chroma</label> <select id="heic-chroma"></select></div> <div class="row svelte-1dgh8ms"><label><input name="heic-sharpYUV" type="checkbox"> Sharp YUV</label></div> <div class="row svelte-1dgh8ms"><button>Reset</button></div></div></div></div>');function Ra(t,i){Pe(i,!0);let e=ct(i,"value",15);const v={quality:`
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
     */`};var T=Ca(),r=l(s(T),2),y=s(r),I=s(y),z=s(I),w=l(s(z)),p=s(w,!0);a(w),a(z),a(I);var R=l(I,2),c=s(R);_(c),a(R);var m=l(R,2),h=s(m),E=s(h);_(E),ie(),a(h),a(m);var Y=l(m,2),g=s(Y),C=l(g,2);ze(C,21,()=>wa,Se,(n,S)=>{var A=ka(),$={},W=s(A,!0);a(A),pe(()=>{$!==($=u(S))&&(A.value=(A.__value=u(S))==null?"":u(S)),q(W,u(S))}),ee(n,A)}),a(C),a(Y);var O=l(Y,2),V=s(O),U=l(V,2);ze(U,21,()=>Sa,Se,(n,S)=>{var A=La(),$={},W=s(A,!0);a(A),pe(()=>{$!==($=u(S))&&(A.value=(A.__value=u(S))==null?"":u(S)),q(W,u(S))}),ee(n,A)}),a(U),a(O);var H=l(O,2),te=s(H),K=l(s(te)),j=s(K,!0);a(K),a(te),a(H);var ae=l(H,2),Q=s(ae);_(Q),a(ae),a(y);var re=l(y,2),b=s(re),k=s(b),B=l(s(k)),X=s(B,!0);a(B),a(k),a(b);var Z=l(b,2),M=s(Z);_(M),a(Z);var D=l(Z,2),L=s(D),F=l(L,2);ze(F,21,()=>xa,Se,(n,S)=>{var A=Aa(),$={},W=s(A,!0);a(A),pe(()=>{$!==($=u(S))&&(A.value=(A.__value=u(S))==null?"":u(S)),q(W,u(S))}),ee(n,A)}),a(F),a(D);var x=l(D,2),P=s(x),G=s(P);_(G),ie(),a(P),a(x);var se=l(x,2),oe=s(se);oe.__click=[Ta,e],a(se),a(re),a(r),a(T),pe(()=>{d(z,"title",v.quality),q(p,e().quality??50),d(h,"title",v.lossless),d(g,"title",v.preset),d(V,"title",v.tune),d(te,"title",v.tuIntraDepth),q(j,e().tuIntraDepth),d(k,"title",v.complexity),q(X,e().complexity),d(L,"title",v.chroma),d(P,"title",v.sharpYUV)}),N(c,()=>e().quality,n=>e(e().quality=n,!0)),ne(E,()=>e().lossless,n=>e(e().lossless=n,!0)),ge(C,()=>e().preset,n=>e(e().preset=n,!0)),ge(U,()=>e().tune,n=>e(e().tune=n,!0)),N(Q,()=>e().tuIntraDepth,n=>e(e().tuIntraDepth=n,!0)),N(M,()=>e().complexity,n=>e(e().complexity=n,!0)),ge(F,()=>e().chroma,n=>e(e().chroma=n,!0)),ne(G,()=>e().sharpYUV,n=>e(e().sharpYUV=n,!0)),ee(t,T),$e()}Oe(["click"]);function qa(t,i){i({...Mt})}var Ia=ve("<option> </option>"),Ua=ve("<option> </option>"),Ya=ve(`<div class="card svelte-1c6geua" aria-label="WebP Encoder Options"><div class="grid svelte-1c6geua"><div class="row svelte-1c6geua"><strong>WebP Encoder Options</strong></div> <div class="row svelte-1c6geua"><label class="svelte-1c6geua"><input name="webp-lossless" type="checkbox"> Lossless</label> <span class="muted svelte-1c6geua">(may change transparent pixels)</span></div> <div class="row svelte-1c6geua"><div style="flex:1"><label for="webp-nearLossless" class="small svelte-1c6geua">nearLossless: <span class="muted svelte-1c6geua"> </span></label> <input type="range" id="webp-nearLossless" min="0" max="100" class="svelte-1c6geua"></div> <div style="width:120px"><label for="webp-quality" class="small svelte-1c6geua">quality</label> <input class="num svelte-1c6geua" type="number" min="0" id="webp-quality" max="100"></div></div> <div class="row svelte-1c6geua"><div style="flex:1"><label class="small svelte-1c6geua" for="webp-alphaQuality">alphaQuality: <span class="muted svelte-1c6geua"> </span></label> <input type="range" id="webp-alphaQuality" min="0" max="100" class="svelte-1c6geua"></div> <div style="width:120px"><label for="webp-method" class="small svelte-1c6geua">method</label> <input class="num svelte-1c6geua" id="webp-method" type="number" min="0" max="6"></div></div> <div class="row svelte-1c6geua"><label for="webp-snsStrength" class="small svelte-1c6geua"> </label> <input type="range" id="webp-snsStrength" min="0" max="100" class="svelte-1c6geua"></div> <div class="row svelte-1c6geua"><label for="webp-filterStrength" class="small svelte-1c6geua"> </label> <input type="range" id="webp-filterStrength" min="0" max="100" class="svelte-1c6geua"></div> <div class="row two svelte-1c6geua"><div style="flex:1"><label for="webp-filterSharpness" class="small svelte-1c6geua"> </label> <input type="range" id="webp-filterSharpness" min="0" max="7" class="svelte-1c6geua"></div> <div style="width:160px"><label class="svelte-1c6geua"><input name="webp-filterType" type="checkbox"> filterType
                    (strong)</label></div></div> <div class="row svelte-1c6geua"><label for="webp-segments" class="small svelte-1c6geua"> </label> <input id="webp-segments" type="range" min="1" max="4" class="svelte-1c6geua"></div> <div class="row two svelte-1c6geua"><div style="flex:1"><label for="webp-preprocessing" class="svelte-1c6geua">preprocessing</label> <select id="webp-preprocessing"></select></div> <div style="width:160px"><label class="svelte-1c6geua"><input name="webp-autofilter" type="checkbox"> autofilter</label></div></div> <div class="row two svelte-1c6geua"><div style="flex:1"><label for="webp-partitionLimit" class="small svelte-1c6geua"> </label> <input type="range" id="webp-partitionLimit" min="0" max="100" class="svelte-1c6geua"></div> <div style="width:160px"><label for="webp-pass" class="small svelte-1c6geua"> </label> <input class="num svelte-1c6geua" id="webp-pass" type="number" min="1" max="10"></div></div> <div class="row two svelte-1c6geua"><div><label for="webp-alphaCompression" class="svelte-1c6geua">alphaCompression</label> <select id="webp-alphaCompression"><option>0 (none)</option><option>1 (webp lossless)</option></select></div> <div><label for="webp-alphaFiltering" class="svelte-1c6geua">alphaFiltering</label> <select id="webp-alphaFiltering"></select></div></div> <div class="row svelte-1c6geua"><label class="svelte-1c6geua"><input name="webp-sharpYUV" type="checkbox"> sharpYUV</label> <label style="margin-left:12px" class="svelte-1c6geua"><input name="webp-exact" type="checkbox"> exact (preserve
                RGB in transparent)</label></div> <div class="row two svelte-1c6geua"><div style="flex:1"><label for="webp-targetSize" class="svelte-1c6geua">targetSize (bytes)</label> <input id="webp-targetSize" type="number" min="0"></div> <div style="width:160px"><label for="webp-targetPSNR" class="svelte-1c6geua">targetPSNR (dB)</label> <input class="num svelte-1c6geua" id="webp-targetPSNR" type="number" min="0"></div></div> <div class="row two svelte-1c6geua"><div><label class="svelte-1c6geua"><input name="webp-lowMemory" type="checkbox"> lowMemory</label></div> <div><label class="svelte-1c6geua"><input name="webp-emulateJpegSize" type="checkbox"> emulateJpegSize</label></div></div> <div class="actions svelte-1c6geua"><button type="button">Reset</button></div></div></div>`);function Va(t,i){Pe(i,!0);let e=ct(i,"value",15);const v=Object.values(Fe).filter(o=>typeof o=="number").map(o=>({label:qe[o],v:o})),T=Object.values(qe).filter(o=>typeof o=="number").map(o=>({label:qe[o],v:o})),r={lossless:`/**
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
    */`};var y=Ya(),I=s(y),z=l(s(I),2),w=s(z),p=s(w);_(p),ie(),a(w),ie(2),a(z);var R=l(z,2),c=s(R),m=s(c),h=l(s(m)),E=s(h,!0);a(h),a(m);var Y=l(m,2);_(Y),a(c);var g=l(c,2),C=l(s(g),2);_(C),a(g),a(R);var O=l(R,2),V=s(O),U=s(V),H=l(s(U)),te=s(H,!0);a(H),a(U);var K=l(U,2);_(K),a(V);var j=l(V,2),ae=l(s(j),2);_(ae),a(j),a(O);var Q=l(O,2),re=s(Q),b=s(re);a(re);var k=l(re,2);_(k),a(Q);var B=l(Q,2),X=s(B),Z=s(X);a(X);var M=l(X,2);_(M),a(B);var D=l(B,2),L=s(D),F=s(L),x=s(F);a(F);var P=l(F,2);_(P),a(L);var G=l(L,2),se=s(G),oe=s(se);_(oe),ie(),a(se),a(G),a(D);var n=l(D,2),S=s(n),A=s(S);a(S);var $=l(S,2);_($),a(n);var W=l(n,2),be=s(W),me=l(s(be),2);ze(me,21,()=>v,Se,(o,fe)=>{var ue=Ia(),Ye={},at=s(ue,!0);a(ue),pe(()=>{Ye!==(Ye=u(fe).v)&&(ue.value=(ue.__value=u(fe).v)==null?"":u(fe).v),q(at,u(fe).label)}),ee(o,ue)}),a(me),a(be);var _e=l(be,2),Ie=s(_e),Ee=s(Ie);_(Ee),ie(),a(Ie),a(_e),a(W);var Te=l(W,2),de=s(Te),ye=s(de),ke=s(ye);a(ye);var Ue=l(ye,2);_(Ue),a(de);var Le=l(de,2),Ae=s(Le),Ge=s(Ae);a(Ae);var f=l(Ae,2);_(f),a(Le),a(Te);var le=l(Te,2),J=s(le),ce=l(s(J),2),we=s(ce);we.value=(we.__value=0)==null?"":0;var ft=l(we);ft.value=(ft.__value=1)==null?"":1,a(ce),a(J);var We=l(J,2),Je=l(s(We),2);ze(Je,21,()=>T,Se,(o,fe)=>{var ue=Ua(),Ye={},at=s(ue,!0);a(ue),pe(()=>{Ye!==(Ye=u(fe).v)&&(ue.value=(ue.__value=u(fe).v)==null?"":u(fe).v),q(at,u(fe).label)}),ee(o,ue)}),a(Je),a(We),a(le);var He=l(le,2),Be=s(He),mt=s(Be);_(mt),ie(),a(Be);var Ke=l(Be,2),ht=s(Ke);_(ht),ie(),a(Ke),a(He);var je=l(He,2),Me=s(je),gt=l(s(Me),2);_(gt),a(Me);var Qe=l(Me,2),bt=l(s(Qe),2);_(bt),a(Qe),a(je);var Ze=l(je,2),Xe=s(Ze),et=s(Xe),_t=s(et);_(_t),ie(),a(et),a(Xe);var yt=l(Xe,2),tt=s(yt),wt=s(tt);_(wt),ie(),a(tt),a(yt),a(Ze);var xt=l(Ze,2),Pt=s(xt);Pt.__click=[qa,e],a(xt),a(I),a(y),pe(()=>{d(w,"title",r.lossless),d(c,"title",r.nearLossless),q(E,e().nearLossless),d(g,"title",r.quality),d(V,"title",r.alphaQuality),q(te,e().alphaQuality),d(j,"title",r.method),d(Q,"title",r.snsStrength),q(b,`snsStrength: ${e().snsStrength??""}`),d(B,"title",r.filterStrength),q(Z,`filterStrength: ${e().filterStrength??""}`),d(L,"title",r.filterSharpness),q(x,`filterSharpness: ${e().filterSharpness??""}`),d(G,"title",r.filterType),d(n,"title",r.segments),q(A,`segments: ${e().segments??""}`),d(be,"title",r.preprocessing),d(_e,"title",r.autofilter),d(de,"title",r.partitionLimit),q(ke,`partitionLimit: ${e().partitionLimit??""}`),d(Le,"title",r.pass),q(Ge,`pass: ${e().pass??""}`),d(J,"title",r.alphaCompression),d(We,"title",r.alphaFiltering),d(Be,"title",r.sharpYUV),d(Ke,"title",r.exact),d(Me,"title",r.targetSize),d(Qe,"title",r.targetPSNR),d(et,"title",r.lowMemory),d(tt,"title",r.emulateJpegSize)}),ne(p,()=>e().lossless,o=>e(e().lossless=o,!0)),N(Y,()=>e().nearLossless,o=>e(e().nearLossless=o,!0)),N(C,()=>e().quality,o=>e(e().quality=o,!0)),N(K,()=>e().alphaQuality,o=>e(e().alphaQuality=o,!0)),N(ae,()=>e().method,o=>e(e().method=o,!0)),N(k,()=>e().snsStrength,o=>e(e().snsStrength=o,!0)),N(M,()=>e().filterStrength,o=>e(e().filterStrength=o,!0)),N(P,()=>e().filterSharpness,o=>e(e().filterSharpness=o,!0)),ne(oe,()=>e().filterType,o=>e(e().filterType=o,!0)),N($,()=>e().segments,o=>e(e().segments=o,!0)),ge(me,()=>e().preprocessing,o=>e(e().preprocessing=o,!0)),ne(Ee,()=>e().autofilter,o=>e(e().autofilter=o,!0)),N(Ue,()=>e().partitionLimit,o=>e(e().partitionLimit=o,!0)),N(f,()=>e().pass,o=>e(e().pass=o,!0)),ge(ce,()=>e().alphaCompression,o=>e(e().alphaCompression=o,!0)),ge(Je,()=>e().alphaFiltering,o=>e(e().alphaFiltering=o,!0)),ne(mt,()=>e().sharpYUV,o=>e(e().sharpYUV=o,!0)),ne(ht,()=>e().exact,o=>e(e().exact=o,!0)),N(gt,()=>e().targetSize,o=>e(e().targetSize=o,!0)),N(bt,()=>e().targetPSNR,o=>e(e().targetPSNR=o,!0)),ne(_t,()=>e().lowMemory,o=>e(e().lowMemory=o,!0)),ne(wt,()=>e().emulateJpegSize,o=>e(e().emulateJpegSize=o,!0)),ee(t,y),$e()}Oe(["click"]);function Da(t,i){i({...Bt})}var Na=ve("<option> </option>"),Ea=ve("<option> </option>"),Ba=ve('<div class="card svelte-1iuoinz" aria-label="AVIF Encoder Options"><div class="title" style="font-weight:600; margin-bottom:8px">AVIF Options</div> <div class="grid svelte-1iuoinz"><div><div class="row svelte-1iuoinz"><label for="avif-quality" class="svelte-1iuoinz">Quality <span class="muted svelte-1iuoinz"> </span></label></div> <div class="row svelte-1iuoinz"><input id="avif-quality" type="range" min="0" max="100" class="svelte-1iuoinz"></div> <div class="row svelte-1iuoinz"><label for="avif-qualityAlpha" class="svelte-1iuoinz">Quality Alpha <span class="muted svelte-1iuoinz"> </span></label> <input id="avif-qualityAlpha" class="num svelte-1iuoinz" type="number" min="-1" max="100"></div> <div class="row svelte-1iuoinz"><label for="avif-speed" class="svelte-1iuoinz">Speed <span class="muted svelte-1iuoinz"> </span></label> <input id="avif-speed" type="range" min="-1" max="10" class="svelte-1iuoinz"></div> <div class="row svelte-1iuoinz"><label for="avif-subsample" class="svelte-1iuoinz">Subsample</label> <select id="avif-subsample"></select></div> <div class="row svelte-1iuoinz"><label class="svelte-1iuoinz"><input name="avif-autoTiling" type="checkbox"> Auto Tiling</label></div> <div class="row svelte-1iuoinz"><label for="avif-tileRowsLog2" class="svelte-1iuoinz">TileRows (log2) <span class="muted svelte-1iuoinz"> </span></label> <input id="avif-tileRowsLog2" type="range" min="0" max="6" class="svelte-1iuoinz"></div> <div class="row svelte-1iuoinz"><label for="avif-tileColsLog2" class="svelte-1iuoinz">TileCols (log2) <span class="muted svelte-1iuoinz"> </span></label> <input id="avif-tileColsLog2" type="range" min="0" max="6" class="svelte-1iuoinz"></div></div> <div><div class="row svelte-1iuoinz"><label class="svelte-1iuoinz"><input name="avif-chromaDeltaQ" type="checkbox"> Chroma Delta Q</label></div> <div class="row svelte-1iuoinz"><label for="avif-sharpness" class="svelte-1iuoinz">Sharpness <span class="muted svelte-1iuoinz"> </span></label> <input id="avif-sharpness" type="range" min="0" max="7" class="svelte-1iuoinz"></div> <div class="row svelte-1iuoinz"><label for="avif-denoiseLevel" class="svelte-1iuoinz">Denoise Level <span class="muted svelte-1iuoinz"> </span></label> <input id="avif-denoiseLevel" type="range" min="0" max="50" class="svelte-1iuoinz"></div> <div class="row svelte-1iuoinz"><label for="avif-tune" class="svelte-1iuoinz">Tune</label> <select id="avif-tune"></select></div> <div class="row svelte-1iuoinz"><label class="svelte-1iuoinz"><input name="avif-sharpYUV" type="checkbox"> Sharp YUV</label></div> <div class="actions svelte-1iuoinz"><button type="button">Reset</button></div></div></div></div>');function Ma(t,i){Pe(i,!0);let e=ct(i,"value",15);const v=Object.values(De).filter(f=>typeof f=="number").map(f=>({label:De[f],v:f})),T=Object.values(Ne).filter(f=>typeof f=="number").map(f=>({label:Ne[f],v:f})),r={quality:`/**
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
 */`};var y=Ba(),I=l(s(y),2),z=s(I),w=s(z),p=s(w),R=l(s(p)),c=s(R,!0);a(R),a(p),a(w);var m=l(w,2),h=s(m);_(h),a(m);var E=l(m,2),Y=s(E),g=l(s(Y)),C=s(g,!0);a(g),a(Y);var O=l(Y,2);_(O),a(E);var V=l(E,2),U=s(V),H=l(s(U)),te=s(H,!0);a(H),a(U);var K=l(U,2);_(K),a(V);var j=l(V,2),ae=l(s(j),2);ze(ae,21,()=>v,Se,(f,le)=>{var J=Na(),ce={},we=s(J,!0);a(J),pe(()=>{ce!==(ce=u(le).v)&&(J.value=(J.__value=u(le).v)==null?"":u(le).v),q(we,u(le).label)}),ee(f,J)}),a(ae),a(j);var Q=l(j,2),re=s(Q),b=s(re);_(b),ie(),a(re),a(Q);var k=l(Q,2),B=s(k),X=l(s(B)),Z=s(X,!0);a(X),a(B);var M=l(B,2);_(M),a(k);var D=l(k,2),L=s(D),F=l(s(L)),x=s(F,!0);a(F),a(L);var P=l(L,2);_(P),a(D),a(z);var G=l(z,2),se=s(G),oe=s(se),n=s(oe);_(n),ie(),a(oe),a(se);var S=l(se,2),A=s(S),$=l(s(A)),W=s($,!0);a($),a(A);var be=l(A,2);_(be),a(S);var me=l(S,2),_e=s(me),Ie=l(s(_e)),Ee=s(Ie,!0);a(Ie),a(_e);var Te=l(_e,2);_(Te),a(me);var de=l(me,2),ye=l(s(de),2);ze(ye,21,()=>T,Se,(f,le)=>{var J=Ea(),ce={},we=s(J,!0);a(J),pe(()=>{ce!==(ce=u(le).v)&&(J.value=(J.__value=u(le).v)==null?"":u(le).v),q(we,u(le).label)}),ee(f,J)}),a(ye),a(de);var ke=l(de,2),Ue=s(ke),Le=s(Ue);_(Le),ie(),a(Ue),a(ke);var Ae=l(ke,2),Ge=s(Ae);Ge.__click=[Da,e],a(Ae),a(G),a(I),a(y),pe(()=>{d(w,"title",r.quality),q(c,e().quality),d(E,"title",r.qualityAlpha),q(C,e().qualityAlpha),d(V,"title",r.speed),q(te,e().speed),d(j,"title",r.subsample),d(Q,"title",r.autoTiling),d(k,"title",r.tileColsLog2),q(Z,e().tileRowsLog2),d(D,"title",r.tileColsLog2),q(x,e().tileColsLog2),d(se,"title",r.chromaDeltaQ),d(S,"title",r.sharpness),q(W,e().sharpness),d(me,"title",r.denoiseLevel),q(Ee,e().denoiseLevel),d(de,"title",r.tune),d(ke,"title",r.sharpYUV)}),N(h,()=>e().quality,f=>e(e().quality=f,!0)),N(O,()=>e().qualityAlpha,f=>e(e().qualityAlpha=f,!0)),N(K,()=>e().speed,f=>e(e().speed=f,!0)),ge(ae,()=>e().subsample,f=>e(e().subsample=f,!0)),ne(b,()=>e().autoTiling,f=>e(e().autoTiling=f,!0)),N(M,()=>e().tileRowsLog2,f=>e(e().tileRowsLog2=f,!0)),N(P,()=>e().tileColsLog2,f=>e(e().tileColsLog2=f,!0)),ne(n,()=>e().chromaDeltaQ,f=>e(e().chromaDeltaQ=f,!0)),N(be,()=>e().sharpness,f=>e(e().sharpness=f,!0)),N(Te,()=>e().denoiseLevel,f=>e(e().denoiseLevel=f,!0)),ge(ye,()=>e().tune,f=>e(e().tune=f,!0)),ne(Le,()=>e().sharpYUV,f=>e(e().sharpYUV=f,!0)),ee(t,y),$e()}Oe(["click"]);const Fa="icodec_encoder_options";async function Pa(t,i,e){const v=Array.from(t.currentTarget.files??[]),T=async function*(){for(const r of v)yield{file:r,fullPath:r.name}}();try{Re(i,!0),await e(T)}finally{Re(i,!1)}}function $a(t,i){window.localStorage.setItem("icodec_encoder_options",JSON.stringify(Dt(u(i))))}var Oa=ve('<meta name="description" content="Converter for heif">'),Ga=ve('<div class="container svelte-l4mzdf"><div class="section svelte-l4mzdf"><!></div> <div class="drop-zone svelte-l4mzdf" role="region" aria-label="file-drop-zone"></div> <div class="section svelte-l4mzdf"><div class="field svelte-l4mzdf"><label for="icodec-images">images</label> <input type="file" id="icodec-images" multiple accept="image/png, image/jpeg"></div></div> <div class="section svelte-l4mzdf"><details class="svelte-l4mzdf"><summary class="svelte-l4mzdf">WEBP</summary> <div class="body svelte-l4mzdf"><!></div></details> <details class="svelte-l4mzdf"><summary class="svelte-l4mzdf">HEIC</summary> <div class="body svelte-l4mzdf"><!></div></details> <details class="svelte-l4mzdf"><summary class="svelte-l4mzdf">AVIF</summary> <div class="body svelte-l4mzdf"><!></div></details></div> <div class="section svelte-l4mzdf"><button class="svelte-l4mzdf">save config in local</button></div></div>');function rs(t,i){Pe(i,!0);let e=rt(!1),v=rt(ua({webp:{...Mt},avif:{...Bt},heic:{...Ft}}));At(()=>{let b=window.localStorage.getItem(Fa);b&&Re(v,JSON.parse(b),!0)});let T=rt(!1);At(()=>{Re(T,window.crossOriginIsolated,!0)});async function r(b){let k=new Worker(qt,{type:"module"});const B=navigator.hardwareConcurrency-1||4,X=[];X.push(k);const Z=[];Z.push(Ct(k));const M=[],D=new ma;let L=[],F=0;try{for await(const x of b){F+=1;const P=F;if(M.length>=B){const oe=await Promise.race(M.map(S=>S.promise)),n=M.findIndex(S=>S.id===oe.idx);n!=-1&&M.splice(n,1),Z.push(oe.worker)}else M.length<B&&Z.length===0&&(k=new Worker(qt,{type:"module"}),X.push(k),Z.push(Ct(k)));let G=Z.pop();const se=Promise.try(async()=>{let oe=x.file;try{const n=await G.encodeBitmap(fa(oe,[]),Dt(u(v))),S=x.fullPath.replace(/\.[^/.]+$/,""),A=S.split("/"),$=A.slice(0,-1).join("/"),W=A[A.length-1];console.log({fileBaseName:W,folderPath:$,outputName:S,components:A}),n.avif.status==="fulfilled"?D.file(`${$}/avif/${W}.avif`,n.avif.value):(console.error(n.avif.reason),L.push({type:"avif",reason:n.avif.reason,fileName:x.fullPath})),n.heic.status==="fulfilled"?D.file(`${$}/heic/${W}.heic`,n.heic.value):(console.error(n.heic.reason),L.push({type:"heic",reason:n.heic.reason,fileName:x.fullPath})),n.webp.status==="fulfilled"?D.file(`${$}/webp/${W}.webp`,n.webp.value):(console.error(n.webp.reason),L.push({type:"webp",reason:n.webp.reason,fileName:x.fullPath}))}catch(n){console.error(n),L.push({reason:n,fileName:x.fullPath})}return{idx:P,worker:G}});M.push({id:P,promise:se})}await Promise.allSettled(M.map(x=>x.promise))}finally{for(const x of X)x.terminate()}if(F!=0){const x=await D.generateAsync({type:"blob"});ha(x,"converted_images.zip")}L.length>0&&alert(JSON.stringify(L))}function y(b){!u(e)&&b.dataTransfer&&b.dataTransfer.types.length>0&&b.dataTransfer.types[0]==="Files"&&b.preventDefault()}async function I(b){var M;const k=(M=b.dataTransfer)==null?void 0:M.items;if(!k||k.length==0||u(e))return;b.preventDefault();let B=[];const X=async function*(){let D=[];for(let L=0;L<k.length;L++){const x=k[L].webkitGetAsEntry();x&&(x.isDirectory?B.push(x):x.isFile&&D.push(x))}for(const L of D)yield L;for(;B.length>0;){let F=B.pop().createReader();const x=await new Promise((P,G)=>{F.readEntries(P,G)});for(const P of x){const G=P.isDirectory;P.isFile===!0?yield P:G===!0&&B.push(P)}}}(),Z=async function*(){for await(const D of X){const L=await new Promise((F,x)=>{D.file(F,x)});L.type.startsWith("image/")&&(yield{fullPath:D.fullPath.substring(1),file:L})}}();Re(e,!0);try{await r(Z)}finally{Re(e,!1)}}var z=Ga();da(b=>{var k=Oa();pa.title="About",ee(b,k)});var w=s(z),p=s(w);{var R=b=>{var k=St("Processing");ee(b,k)},c=b=>{var k=St("⚠️ This is pretty slow");ee(b,k)};ca(p,b=>{u(e)?b(R):b(c,!1)})}a(w);var m=l(w,2),h=l(m,2),E=s(h),Y=l(s(E),2);Y.__change=[Pa,e,r],a(E),a(h);var g=l(h,2),C=s(g),O=l(s(C),2),V=s(O);Va(V,{get value(){return u(v).webp},set value(b){u(v).webp=b}}),a(O),a(C);var U=l(C,2),H=l(s(U),2),te=s(H);Ra(te,{get value(){return u(v).heic},set value(b){u(v).heic=b}}),a(H),a(U);var K=l(U,2),j=l(s(K),2),ae=s(j);Ma(ae,{get value(){return u(v).avif},set value(b){u(v).avif=b}}),a(j),a(K),a(g);var Q=l(g,2),re=s(Q);re.__click=[$a,v],a(Q),a(z),pe(()=>{Y.disabled=u(e),re.disabled=u(e)}),Lt("drop",m,I),Lt("dragover",m,y),ee(t,z),$e()}Oe(["change","click"]);export{rs as component};
