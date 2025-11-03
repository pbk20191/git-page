/// <reference no-default-lib="true"/>
/// <reference types="@sveltejs/kit" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

// https://kit.svelte.dev/docs/service-workers#type-safety
const self = globalThis.self as unknown as DedicatedWorkerGlobalScope;

import type { XcodeAsset } from "$lib/XcodeAsset";

import * as Comlink from "comlink"

type SourceScale = 1 | 2 | 3;
type ResizingMode = XcodeAsset.NinePatch.ResizingMode
type CenterMode = XcodeAsset.NinePatch.CenterMode

type Insets = XcodeAsset.HorizontalInset & XcodeAsset.VerticalInset

interface State {
  canvas?: OffscreenCanvas;
  ctx?: OffscreenCanvasRenderingContext2D;
  img?: ImageBitmap;
  naturalW: number;
  naturalH: number;
  scale: SourceScale; // input source scale (1x/2x/3x)
  canvasW: number;    // natural/scale
  canvasH: number;
  insets: Insets;     // canvas-space (i.e., 1x units visually)
  mode: ResizingMode;
  centerMode: CenterMode;
}

const st: State = {
  naturalW: 0,
  naturalH: 0,
  scale: 1,
  canvasW: 0,
  canvasH: 0,
  insets: { top: 0, right: 0, bottom: 0, left: 0 },
  mode: '9-part',
  centerMode: 'stretch'
};

function ensureCtx() {
  if (!st.canvas) throw new Error('Canvas not attached');
  if (!st.ctx) {
    const ctx = st.canvas.getContext('2d', { alpha: true });
    if (!ctx) throw new Error('2D context unavailable');
    st.ctx = ctx;
  }
  return st.ctx!;
}

function resizeForScale() {
  if (!st.img) return;
  st.canvasW = Math.max(1, Math.round(st.naturalW / st.scale));
  st.canvasH = Math.max(1, Math.round(st.naturalH / st.scale));
  if (st.canvas) {
    st.canvas.width = st.canvasW;
    st.canvas.height = st.canvasH;
  }
  clampInsets();
}

function clampInsets(horizontal:'left'|'right' = 'right', vertical:'top' | 'bottom' = 'bottom') {
  st.insets.left = Math.max(0, Math.min(st.insets.left, st.canvasW - 1));
  st.insets.right = Math.max(0, Math.min(st.insets.right, st.canvasW - 1));
  st.insets.top = Math.max(0, Math.min(st.insets.top, st.canvasH - 1));
  st.insets.bottom = Math.max(0, Math.min(st.insets.bottom, st.canvasH - 1));

  // Keep center non-negative

  if (st.insets.left + st.insets.right >= st.canvasW) {
    if (horizontal !== 'left') {
        st.insets.right = Math.max(0, st.canvasW - st.insets.left - 1);
    } else {
        st.insets.left = Math.max(0, st.canvasW - st.insets.right - 1);
    }
    
  }
  if (st.insets.top + st.insets.bottom >= st.canvasH) {
    if (vertical !== 'bottom') {
        st.insets.top = Math.max(0, st.canvasH - st.insets.bottom - 1);
    } else {
        st.insets.bottom = Math.max(0, st.canvasH - st.insets.top - 1);
    }
  }
}


function drawChecker(ctx: OffscreenCanvasRenderingContext2D, w: number, h: number) {
  const size = 8;
  for (let y = 0; y < h; y += size) {
    for (let x = 0; x < w; x += size) {
      ctx.fillStyle = ((x / size + y / size) % 2 === 0) ? '#eee' : '#ddd';
      ctx.fillRect(x, y, size, size);
    }
  }
}

function render() {
  const ctx = ensureCtx();
  const { canvasW: w, canvasH: h } = st;
  ctx.clearRect(0, 0, w, h);

  // background checkerboard
  drawChecker(ctx, w, h);

  if (st.img) {
    // draw source into canvas-space (downscale by source scale)
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(st.img, 0, 0, st.naturalW, st.naturalH, 0, 0, w, h);
  }

  // guide lines
  ctx.save();
  ctx.setLineDash([6, 4]);
  ctx.lineWidth = 1;
  if (st.mode !== '3-part-vertical') {
      // different colors to hint vertical/horizontal
    ctx.strokeStyle = '#007aff'; // iOS blue for vertical lines
    ctx.beginPath();
    ctx.moveTo(st.insets.left, 0); ctx.lineTo(st.insets.left, h);
    ctx.moveTo(w - st.insets.right, 0); ctx.lineTo(w - st.insets.right, h);
    ctx.stroke();
  }


  if (st.mode !== '3-part-horizontal') {
    ctx.strokeStyle = '#ff3b30'; // iOS red for horizontal lines
    ctx.beginPath();
    ctx.moveTo(0, st.insets.top); ctx.lineTo(w, st.insets.top);
    ctx.moveTo(0, h - st.insets.bottom); ctx.lineTo(w, h - st.insets.bottom);
    ctx.stroke();
  }

  // center region overlay (subtle)
  const cx = st.insets.left;
  const cy = st.insets.top;
  const cw = Math.max(0, w - st.insets.left - st.insets.right);
  const ch = Math.max(0, h - st.insets.top - st.insets.bottom);
  ctx.fillStyle = 'rgba(0, 122, 255, 0.08)';
  ctx.fillRect(cx, cy, cw, ch);

  // mode labels
  ctx.fillStyle = '#000';
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(`mode=${st.mode}, center=${st.centerMode}, scale=${st.scale}x`, 6, 6);
  ctx.restore();
}

// (Optional) helper for main thread drag logic
function nearestEdge(x: number, y: number): keyof Insets {
  const d = [
    { e: 'left' as const,    v: Math.abs(x - st.insets.left) },
    { e: 'right' as const,   v: Math.abs(x - (st.canvasW - st.insets.right)) },
    { e: 'top' as const,     v: Math.abs(y - st.insets.top) },
    { e: 'bottom' as const,  v: Math.abs(y - (st.canvasH - st.insets.bottom)) },
  ].sort((a, b) => a.v - b.v);
  return d[0].e;
}

const module = {
  async attach(off: OffscreenCanvas) {
    st.canvas = off;
    st.ctx = undefined;
    ensureCtx();
  },

  async setSource(img: ImageBitmap, sourceScale: SourceScale) {
    if (st.img) {
        st.img.close()
    }
    st.img = img;
    st.naturalW = img.width;
    st.naturalH = img.height;
    st.scale = sourceScale;
    resizeForScale();
    render();
  },

  async setScale(sourceScale: SourceScale) {
    st.scale = sourceScale;
    resizeForScale();
    render();
  },

  async setMode(mode: ResizingMode, centerMode: CenterMode) {
    st.mode = mode;
    st.centerMode = centerMode;
    render();
  },

  async setInsets(insets: Partial<Insets>, horizontal:'left'|'right' = 'right', vertical:'top'|'bottom' = 'bottom') {
    st.insets = { ...st.insets, ...insets };
    clampInsets(horizontal, vertical);
    render();
  },

  // For drag support in main thread
  async queryNearestEdge(x: number, y: number) {
    return nearestEdge(x, y);
  },

  async getState() {
    return {
      canvasW: st.canvasW,
      canvasH: st.canvasH,
      insets: st.insets,
      scale: st.scale,
      mode: st.mode,
      centerMode: st.centerMode,
      naturalW: st.naturalW,
      naturalH: st.naturalH
    };
  },

  // Build contents.json-like resizing block in 1x units
  async buildResizingInfo(targetScale: 1 | 2 | 3) {
    const w1 = Math.round(st.naturalW / st.scale) * targetScale;
    const h1 = Math.round(st.naturalH / st.scale) * targetScale;
    const cap = st.insets; // canvas units = 1x visual units

    const centerW = Math.max(0, w1 - cap.left * targetScale - cap.right * targetScale);
    const centerH = Math.max(0, h1 - cap.top * targetScale - cap.bottom * targetScale);

    if (st.mode === '3-part-horizontal') {
      return {
        mode: '3-part-horizontal',
        center: { mode: st.centerMode, width: centerW },
        'cap-insets': { left: cap.left * targetScale, right: cap.right * targetScale }
      } as XcodeAsset.NinePatch.HorizontalResizingInfo;
    }
    if (st.mode === '3-part-vertical') {
      return {
        mode: '3-part-vertical',
        center: { mode: st.centerMode, height: centerH },
        'cap-insets': { top: cap.top * targetScale, bottom: cap.bottom * targetScale }
      } as XcodeAsset.NinePatch.VerticalResizingInfo;
    }
    return {
      mode: '9-part',
      center: { mode: st.centerMode, width: centerW, height: centerH },
      'cap-insets': { left: cap.left * targetScale, right: cap.right * targetScale, top: cap.top * targetScale, bottom: cap.bottom * targetScale }
    } as XcodeAsset.NinePatch.NineResizingInfo;
  },

  async exportAsset(name:string) {
    const res1x:XcodeAsset.NinePatch.ResizingInfo = await this.buildResizingInfo(1)
    const res2x:XcodeAsset.NinePatch.ResizingInfo = await this.buildResizingInfo(2)
    const res3x:XcodeAsset.NinePatch.ResizingInfo = await this.buildResizingInfo(3)
    const tool_canvas = new OffscreenCanvas(st.naturalW/st.scale * 3, st.naturalH/st.scale * 3)
    let tool_context = tool_canvas.getContext("2d")!
    tool_context.drawImage(st.img!, 0,0, st.img!.width, st.img!.height ,0,0, tool_canvas.width, tool_canvas.height)
    const scaledImage3x = await tool_canvas.convertToBlob({ type: "image/png"})
    tool_canvas.width = tool_canvas.width * 2/3
    tool_canvas.height = tool_canvas.height * 2 / 3
    tool_context = tool_canvas.getContext('2d')!
    tool_context.drawImage(st.img!, 0,0, st.img!.width, st.img!.height ,0,0, tool_canvas.width, tool_canvas.height)
    const scaledImage2x = await tool_canvas.convertToBlob({ type: "image/png"})
    tool_canvas.width /= 2
    tool_canvas.height /= 2
    tool_context = tool_canvas.getContext('2d')!
    tool_context.drawImage(st.img!, 0,0, st.img!.width, st.img!.height ,0,0, tool_canvas.width, tool_canvas.height)
    const scaledImage1x = await tool_canvas.convertToBlob({ type: "image/png"})
    type ImageElementBase = {
        filename:string,
        idiom:string,
        resizing: XcodeAsset.NinePatch.ResizingInfo
    }
    type ImageElement1x = ImageElementBase & { scale: "1x" }
    type ImageElement2x = ImageElementBase & { scale: "2x" }
    type ImageElement3x = ImageElementBase & { scale: "3x" }

    const contents = {
        images: [
            {
                filename: `${name}@1x.png`, 
                idiom: 'universal',
                scale: '1x',
                resizing: res1x
            },
            {
                filename: `${name}@2x.png`, 
                idiom: 'universal',
                scale: '2x',
                resizing: res2x
            },
            {
                filename: `${name}@3x.png`, 
                idiom: 'universal',
                scale: '3x',
                resizing: res3x
            }
        ] as [ImageElement1x,ImageElement2x,ImageElement3x],
        info: {
            version: 1,
            author: 'pbk'
        }
    }
    return {
        contents,
        image1x: scaledImage1x,
        image2x: scaledImage2x,
        image3x: scaledImage3x
    }
  } 
};

export type XocdeNinePatchWorker = typeof module;

Comlink.expose(module);