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

function clampInsets(horizontal: 'left' | 'right' = 'right', vertical: 'top' | 'bottom' = 'bottom') {
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
  // console.log(st.canvas, st.canvasW, st.canvasH)
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
    { e: 'left' as const, v: Math.abs(x - st.insets.left) },
    { e: 'right' as const, v: Math.abs(x - (st.canvasW - st.insets.right)) },
    { e: 'top' as const, v: Math.abs(y - st.insets.top) },
    { e: 'bottom' as const, v: Math.abs(y - (st.canvasH - st.insets.bottom)) },
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

  async setInsets(insets: Partial<Insets>, horizontal: 'left' | 'right' = 'right', vertical: 'top' | 'bottom' = 'bottom') {
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

  async exportAsset(name: string) {
    const res1x: XcodeAsset.NinePatch.ResizingInfo = await this.buildResizingInfo(1)
    const res2x: XcodeAsset.NinePatch.ResizingInfo = await this.buildResizingInfo(2)
    const res3x: XcodeAsset.NinePatch.ResizingInfo = await this.buildResizingInfo(3)
    const tool_canvas = new OffscreenCanvas(st.naturalW / st.scale * 3, st.naturalH / st.scale * 3)
    let tool_context = tool_canvas.getContext("2d")!
    tool_context.drawImage(st.img!, 0, 0, st.img!.width, st.img!.height, 0, 0, tool_canvas.width, tool_canvas.height)
    const scaledImage3x = await tool_canvas.convertToBlob({ type: "image/png" })
    tool_canvas.width = tool_canvas.width * 2 / 3
    tool_canvas.height = tool_canvas.height * 2 / 3
    tool_context = tool_canvas.getContext('2d')!
    tool_context.drawImage(st.img!, 0, 0, st.img!.width, st.img!.height, 0, 0, tool_canvas.width, tool_canvas.height)
    const scaledImage2x = await tool_canvas.convertToBlob({ type: "image/png" })
    tool_canvas.width /= 2
    tool_canvas.height /= 2
    tool_context = tool_canvas.getContext('2d')!
    tool_context.drawImage(st.img!, 0, 0, st.img!.width, st.img!.height, 0, 0, tool_canvas.width, tool_canvas.height)
    const scaledImage1x = await tool_canvas.convertToBlob({ type: "image/png" })
    type ImageElementBase = {
      filename: string,
      idiom: string,
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
      ] as [ImageElement1x, ImageElement2x, ImageElement3x],
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
  },


  async createBitmap(
    dw:number, dh:number
  ) {
    let canvas = new OffscreenCanvas(dw,dh)
    const ctx = canvas.getContext("2d", { alpha: true})!
    if (!st.img) {
      return null
    }
    const dx = 0
    const dy = 0
    await this.renderOn(canvas, dx, dy, dw, dh)
    let bitmap = canvas.transferToImageBitmap()
    return Comlink.transfer(bitmap, [bitmap])
  },

  async renderOn(canvas: OffscreenCanvas, dx: number, dy: number, dw: number, dh: number) {
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return Comlink.transfer(canvas, [canvas]);
    if (!st.img) {
      return Comlink.transfer(canvas, [canvas]);
    }
    const W1 = Math.max(1, Math.round(st.naturalW / st.scale));
    const H1 = Math.max(1, Math.round(st.naturalH / st.scale));
    let { left: L, right: R, top: T, bottom: B } = st.insets;
    if (st.mode === '3-part-horizontal') { T = 0; B = 0; }
    if (st.mode === '3-part-vertical') { L = 0; R = 0; }
    // 클램프 + 센터 영역 보장
    L = Math.max(0, Math.min(L, W1 - 1));
    R = Math.max(0, Math.min(R, W1 - 1));
    T = Math.max(0, Math.min(T, H1 - 1));
    B = Math.max(0, Math.min(B, H1 - 1));
    if (L + R >= W1) R = Math.max(0, W1 - L - 1);
    if (T + B >= H1) B = Math.max(0, H1 - T - 1);

    const CW1 = Math.max(0, W1 - L - R);
    const CH1 = Math.max(0, H1 - T - B);

    // 3) 소스 픽셀 좌표(자연 픽셀)
    const s = st.scale;
    const SL = L * s, SR = R * s, ST = T * s, SB = B * s;
    const SCW = CW1 * s, SCH = CH1 * s; // center source size
    const SWn = st.naturalW, SHn = st.naturalH;

    // 4) 대상 사각형 내에서의 두께(픽셀)
    //    1x→대상 비율: dw/W1, dh/H1
    const kx = dw / W1, ky = dh / H1;
    const Ld = Math.round(L * kx);
    const Rd = Math.round(R * kx);
    const Td = Math.round(T * ky);
    const Bd = Math.round(B * ky);
    const CWd = Math.max(0, dw - Ld - Rd);
    const CHd = Math.max(0, dh - Td - Bd);
    const draw = (
      sx: number, sy: number, sw: number, sh: number,
      x: number, y: number, w: number, h: number
    ) => {
      if (sw <= 0 || sh <= 0 || w <= 0 || h <= 0) return;
      ctx.drawImage(st.img!, sx, sy, sw, sh, dx + x, dy + y, w, h);
    };
    // ── 코너 4개
    // 좌상
    draw(0, 0, SL, ST, 0, 0, Ld, Td);
    // 우상
    draw(SWn - SR, 0, SR, ST, dw - Rd, 0, Rd, Td);
    // 좌하
    draw(0, SHn - SB, SL, SB, 0, dh - Bd, Ld, Bd);
    // 우하
    draw(SWn - SR, SHn - SB, SR, SB, dw - Rd, dh - Bd, Rd, Bd);

    // ── 엣지 4개 (모드에 따라 스킵)
// 상단 중앙 띠  → horizontal 모드에서는 그리지 않음
if (Td > 0 && CWd > 0 && st.mode !== '3-part-horizontal') {
  draw(SL, 0, SCW, ST, Ld, 0, CWd, Td);
}

// 하단 중앙 띠  → horizontal 모드에서는 그리지 않음
if (Bd > 0 && CWd > 0 && st.mode !== '3-part-horizontal') {
  draw(SL, SHn - SB, SCW, SB, Ld, dh - Bd, CWd, Bd);
}

// 좌측 중앙 띠  → vertical 모드에서는 그리지 않음
if (Ld > 0 && CHd > 0 && st.mode !== '3-part-vertical') {
  draw(0, ST, SL, SCH, 0, Td, Ld, CHd);
}

// 우측 중앙 띠  → vertical 모드에서는 그리지 않음
if (Rd > 0 && CHd > 0 && st.mode !== '3-part-vertical') {
  draw(SWn - SR, ST, SR, SCH, dw - Rd, Td, Rd, CHd);
}
    // ── 중앙
    if (CWd > 0 && CHd > 0) {
      if (st.centerMode === 'stretch') {
        // 중앙 소스 영역을 대상 중앙 전체로 스트레치
        draw(SL, ST, SCW, SCH, Ld, Td, CWd, CHd);
      } else {
        // tile: 한 타일을 대상 비율에 맞게 리샘플링 후 패턴 반복
        // 타일 크기(대상 공간): 1x center 크기 × 스케일비
        const tileW = Math.max(1, Math.round(CW1 * kx));
        const tileH = Math.max(1, Math.round(CH1 * ky));

        // 타일 캔버스
        const tile = new OffscreenCanvas(tileW, tileH);
        const tctx = tile.getContext('2d', { alpha: true })!;
        tctx.imageSmoothingEnabled = true;
        tctx.imageSmoothingQuality = 'high';
        // 소스(center) → 타일로 스케일
        tctx.drawImage(st.img!, SL, ST, SCW, SCH, 0, 0, tileW, tileH);

        const pattern = ctx.createPattern(tile, 'repeat');
        if (pattern) {
          ctx.save();
          ctx.translate(dx + Ld, dy + Td);
          // OffscreenCanvas pattern은 기본 원점(0,0)부터 반복 → 중앙 사각형만 채움
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, CWd, CHd);
          ctx.restore();
        }
      }
    }
    return Comlink.transfer(canvas, [canvas])
  }
};

export type XocdeNinePatchWorker = typeof module;

Comlink.expose(module);