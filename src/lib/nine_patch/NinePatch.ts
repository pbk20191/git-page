
export interface NinePatchInfo {
    sourceWidth: number;   // 전체 원본 (테두리 포함)
    sourceHeight: number;
    innerWidth: number;    // 내부 비트맵 (테두리 제외)
    innerHeight: number;
    // 스트레치 구간(내부 좌표계, [start, end) )
    stretchX: Array<[number, number]>;
    stretchY: Array<[number, number]>;
    // 컨텐츠 패딩(내부 좌표계, 없으면 내부 전체)
    content: { left: number; top: number; right: number; bottom: number };
}

function _isBlack(rgba: [number, number, number, number]): boolean {
    const [r, g, b, a] = rgba
    return a > 0 && r === 0 && g === 0 && b === 0;
}

    // 채널 읽기
function _rgbaPxAt(imageData: ImageData, xy: [number, number]): { rgba: [number, number, number, number] } {
    const w = imageData.width;
    const h = imageData.height;
    const [x, y] = xy;
    const i = (y * w + x) * 4;
    const isFloat = !(imageData.data instanceof Uint8ClampedArray);
    if (!isFloat) {
        let sub_array = imageData.data.subarray(i + 0, i + 4)
        return {
            rgba: [
                sub_array[0],
                sub_array[1],
                sub_array[2],
                sub_array[3]
            ]
        }
    } else {
        let sub_array = (imageData.data as Float16Array).subarray(i + 0, i + 4)
        return {
            rgba: [
                sub_array[0] * 255,
                sub_array[1] * 255,
                sub_array[2] * 255,
                sub_array[3] * 255,
            ]
        }
    }
}

// 연속 구간 스캔: predicate(true/false)로 [start,end) 구간 나열
const _scanSegments = (n: number, predicate: (i: number) => boolean) => {
    const segs: Array<[number, number]> = [];
    let i = 0;
    while (i < n) {
        while (i < n && !predicate(i)) i++;
        if (i >= n) break;
        const start = i;
        while (i < n && predicate(i)) i++;
        segs.push([start, i]);
    }
    return segs;
};

function _scanRuns(start: number, end: number, isOn: (x: number) => boolean) {
    // return array of [beginDrawable, endDrawable] inclusive; drawable index is (coord-1)
    const runs = [] as [number, number][];
    let inRun = false, s = 0;
    for (let i = start; i <= end; i++) {
        const on = isOn(i);
        if (on && !inRun) { inRun = true; s = i - 1; }
        if ((!on || i === end) && inRun) {
            const e = on && i === end ? i - 1 : i - 2; // last drawable index when turning off / at end
            runs.push([Math.max(0, s), Math.max(s, e)]);
            inRun = false;
        }
    }
    return runs;
}

  // ── 상단 라인: y=0, x=1..w-2 → 내부 좌표계 x=0..w-3
function _topIsBlack(imageData:ImageData, ix:number) {
    return _isBlack(_rgbaPxAt(imageData, [ ix + 1, 0]).rgba)
}

// ── 좌측 라인: x=0, y=1..h-2 → 내부 좌표계 y=0..h-3
function _leftIsBlack(imageData:ImageData, iy:number) {
    return _isBlack(_rgbaPxAt(imageData, [0, iy+1]).rgba)
}

function _bottomIsBlack(imageData:ImageData, ix:number) {
    return _isBlack(_rgbaPxAt(imageData, [ix+1, imageData.height - 1]).rgba)
}

function _rightIsBlack(imageData:ImageData, iy:number) {
    return _isBlack(_rgbaPxAt(imageData, [imageData.width - 1, iy + 1]).rgba)
}

export class NinePatchParser {
    _trimmedCanvas: OffscreenCanvas;
    _stretch: { l: number, r: number, t: number, b: number };
    _content: { l: number, r: number, t: number, b: number };
    _size: { w: number, h: number };

    constructor(trimmedCanvas: OffscreenCanvas, stretch: { l: number, r: number, t: number, b: number }, content: { l: number, r: number, t: number, b: number }) {
        this._trimmedCanvas = trimmedCanvas;
        this._stretch = stretch;   // 1x drawable-space insets
        this._content = content;   // 1x drawable-space paddings
        this._size = { w: trimmedCanvas.width, h: trimmedCanvas.height };
    }

    static async fromFile(file: File) {
        let bitmap = await createImageBitmap(file)
        console.log(bitmap)
        return await NinePatchParser.fromImage(bitmap);
    }

    static async fromURL(url: string) {
        const img = await NinePatchParser._loadImage(url);
        return NinePatchParser.fromImage(img);
    }

    static async fromImage(img: ImageBitmap) {
        const { canvas, ctx, data } = NinePatchParser._getImageData(img);
        const W = canvas.width, H = canvas.height;
        if (W < 3 || H < 3) throw new Error('NinePatch image is too small (must be ≥ 3×3).');

        const px = (x: number, y: number) => {
           return _rgbaPxAt(data, [x,y]).rgba
        };
        const isBlack = (r: number, g: number, b: number, a: number) => _isBlack([r,g,b,a])

        // Scan border lines
        const scanTop = () => _scanRuns(1, W - 2, (x) => isBlack(...px(x, 0)));
        const scanLeft = () => _scanRuns(1, H - 2, (y) => isBlack(...px(0, y)));
        const scanBottom = () => _scanRuns(1, W - 2, (x) => isBlack(...px(x, H - 1)));
        const scanRight = () => _scanRuns(1, H - 2, (y) => isBlack(...px(W - 1, y)));

        const topRuns = scanTop();     // horizontal stretch (x runs)
        const leftRuns = scanLeft();   // vertical stretch (y runs)
        const bottomRuns = scanBottom(); // horizontal content (x runs)
        const rightRuns = scanRight();   // vertical content (y runs)

        // Merge-runs => min..max (inclusive) in drawable coords (0..W-3 or 0..H-3)
        const merge = (runs: number[][]) => {
            if (!runs.length) return null;
            let min = runs[0][0], max = runs[0][1];
            for (const [a, b] of runs) { if (a < min) min = a; if (b > max) max = b; }
            return [min, max];
        };

        const top = merge(topRuns);     // along X
        const left = merge(leftRuns);   // along Y
        const bottom = merge(bottomRuns);
        const right = merge(rightRuns);

        // Trim 1px border → drawable area
        const tCanvas = new OffscreenCanvas(W - 2, H - 2)
        tCanvas.width = W - 2; tCanvas.height = H - 2;
        tCanvas.getContext('2d')!.drawImage(img, 1, 1, W - 2, H - 2, 0, 0, W - 2, H - 2);

        const tW = tCanvas.width, tH = tCanvas.height;

        // Compute insets: if unspecified, provide sensible defaults (thirds)
        const fallbackX = [Math.floor(tW / 3), tW - 1 - Math.floor(tW / 3)];
        const fallbackY = [Math.floor(tH / 3), tH - 1 - Math.floor(tH / 3)];

        const stretch = {
            // FIX: top row (x-range) => LEFT/RIGHT insets, left column (y-range) => TOP/BOTTOM insets
            l: top ? top[0] : fallbackX[0],
            r: top ? (tW - 1 - top[1]) : fallbackX[1],
            t: left ? left[0] : fallbackY[0],
            b: left ? (tH - 1 - left[1]) : fallbackY[1],
        };

        const content = {
            // Android bottom line defines LEFT/RIGHT padding in X; right line defines TOP/BOTTOM in Y
            l: bottom ? bottom[0] : stretch.l,
            r: bottom ? (tW - 1 - bottom[1]) : stretch.r,
            t: right ? right[0] : stretch.t,
            b: right ? (tH - 1 - right[1]) : stretch.b,
        };

        return new NinePatchParser(tCanvas, stretch, content);
    }


    static _getImageData(img: ImageBitmap) {
        const c = new OffscreenCanvas(img.width, img.height)
        c.width = img.width; c.height = img.height;
        const ctx = c.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        // img.close()
        return { canvas: c, ctx, data: ctx.getImageData(0, 0, c.width, c.height) };
    }

    static async _loadImage(url: string) {
        // createImageBitmap(url)
        const resp = await fetch(url)
        const blob = await resp.blob()
        const bitmap = await createImageBitmap(blob)
        return bitmap
    }

    /** Size of drawable (without border) */
    get size() { return { ...this._size }; }

    /** Returns deep copy of metrics */
    getMetrics() {
        const { l, r, t, b } = this._stretch;
        const { l: cl, r: cr, t: ct, b: cb } = this._content;
        return {
            size: { ...this._size },
            stretch: { l, r, t, b },
            content: { l: cl, r: cr, t: ct, b: cb },
        };
    }

    /** Returns a cloned trimmed canvas */
    getTrimmedCanvas() {
        const out = document.createElement('canvas');
        out.width = this._trimmedCanvas.width; out.height = this._trimmedCanvas.height;
        out.getContext('2d')!.drawImage(this._trimmedCanvas, 0, 0);
        return out;
    }

    /**
     * Generate Xcode Asset Catalog `resizing` object for given scale.
     */
    toXcodeResizing(scale: 2 | 3, systemScale: 3 = 3, opts: { centerMode: 'stretch' | 'tile' }) {
        const { w, h } = this._size;
        const s = scale / systemScale
        const centerMode = opts.centerMode || 'stretch';

        const cap = {
            top: this._stretch.t * s,
            left: this._stretch.l * s,
            bottom: this._stretch.b * s,
            right: this._stretch.r * s,
        };

        const cw = Math.max(0, (w * s) - cap.left - cap.right);
        const ch = Math.max(0, (h * s) - cap.top - cap.bottom);

        return {
            'cap-insets': cap,
            center: { mode: centerMode, width: cw, height: ch },
            mode: '9-part',
        };
    }


    drawPreview(ctx: CanvasRenderingContext2D, width: number, height: number, opts: { centerMode: 'stretch' | 'tile' } = { centerMode: "stretch" }) {
        const centerMode = opts.centerMode || 'stretch';
        const img = this._trimmedCanvas;
        const L = this._stretch.l, R = this._stretch.r, T = this._stretch.t, B = this._stretch.b;
        const W = img.width, H = img.height;
        const cw = W - L - R, ch = H - T - B;
        const dw = width - L - R, dh = height - T - B;

        ctx.clearRect(0, 0, width, height);

        const sx = [0, L, L + cw];
        const sy = [0, T, T + ch];
        const sw = [L, cw, R];
        const sh = [T, ch, B];

        for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
            const dwc = (c === 1 ? dw : sw[c]);
            const dhc = (r === 1 ? dh : sh[r]);
            const dx = (c === 0 ? 0 : (c === 1 ? L : L + dw));
            const dy = (r === 0 ? 0 : (r === 1 ? T : T + dh));
            if (dwc <= 0 || dhc <= 0) continue;
            if (centerMode === 'tile' && r === 1 && c === 1) {
                for (let tx = dx; tx < dx + dwc; tx += sw[c]) {
                    for (let ty = dy; ty < dy + dhc; ty += sh[r]) {
                        const tw = Math.min(sw[c], dx + dwc - tx);
                        const th = Math.min(sh[r], dy + dhc - ty);
                        ctx.drawImage(img, sx[c], sy[r], tw, th, tx, ty, tw, th);
                    }
                }
            } else {
                ctx.drawImage(img, sx[c], sy[r], sw[c], sh[r], dx, dy, dwc, dhc);
            }
        }
    }
}





export function readNinePathFromData(imageData: ImageData): NinePatchInfo | null {
  const w = imageData.width;
  const h = imageData.height;
  if (w < 3 || h < 3) return null; // 1px 프레임 + 최소 1px 내부

  const innerW = w - 2;
  const innerH = h - 2;

  const stretchX = _scanSegments(innerW, (ix) => _topIsBlack(imageData, ix));
  const stretchY = _scanSegments(innerH, (iy) => _leftIsBlack(imageData, iy));
  const contentX = _scanSegments(innerW, (ix) => _bottomIsBlack(imageData, ix));
  const contentY = _scanSegments(innerH, (iy) => _rightIsBlack(imageData, iy));

  // 최소 하나의 스트레치 마커가 있어야 유효
  if (stretchX.length === 0 && stretchY.length === 0) return null;

  // 컨텐츠 패딩: 일반적으로 각 방향당 1개 구간만 사용 (없으면 내부 전체)
  const cx = contentX.length ? contentX[0] : ([0, innerW] as [number, number]);
  const cy = contentY.length ? contentY[0] : ([0, innerH] as [number, number]);

  return {
    sourceWidth: w,
    sourceHeight: h,
    innerWidth: innerW,
    innerHeight: innerH,
    stretchX,
    stretchY,
    content: {
      left: cx[0],
      right: innerW - cx[1],
      top: cy[0],
      bottom: innerH - cy[1]
    }
  };
}