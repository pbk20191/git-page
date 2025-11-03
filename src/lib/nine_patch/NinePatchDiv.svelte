<script module lang="ts">
    import type { XcodeAsset } from '../XcodeAsset';
    import { tick } from 'svelte';

    export type Props  = {
          // 원본 이미지 URL (Blob URL OK)
        src:string,
        naturalW:number,
        naturalH:number,
        sourceScale:1|2|3,
        insets:XcodeAsset.HorizontalInset & XcodeAsset.VerticalInset,
        centerMode:XcodeAsset.NinePatch.CenterMode,
        mode:XcodeAsset.NinePatch.ResizingMode
    }
</script>
<script lang="ts">
//   import type { CenterSliceWorker } from '$lib/workers/center-slice.worker';
  const props:Props = $props()

  // 내부 상태
let host: HTMLDivElement;
  let centerCanvas: HTMLCanvasElement;
  let centerCtx: CanvasRenderingContext2D | null = null;
  let htmlImg: HTMLImageElement | null = null;
  const tile = new OffscreenCanvas(10, 10)
//   let workerProxy = $state<Comlink.Remote<CenterSliceWorker> | null>(null);
//   let centerURL = $state<string>(''); // Blob URL (센터 타일/스트레치 전용)

  // border-image에 들어갈 이미지 세트 (1x/2x/3x 자동 선택)
  const borderImageSource = $derived(props.src === '' ? 'none' : `url(${props.src})`);

  const w1 = $derived(Math.max(1, Math.round(props.naturalW / (props.sourceScale || 1))));
  const h1 = $derived(Math.max(1, Math.round(props.naturalH / (props.sourceScale || 1))));
  const cw1 = $derived(Math.max(1, w1 - props.insets.left - props.insets.right));
  const ch1 = $derived(Math.max(1, h1 - props.insets.top - props.insets.bottom));

  // 3-part 모드에 따라 수직/수평 엣지 비활성화를 border-width로 처리
  const bwTop    = $derived(props.mode === '3-part-horizontal' ? 0 : props.insets.top);
  const bwBottom = $derived(props.mode === '3-part-horizontal' ? 0 : props.insets.bottom);
  const bwLeft   = $derived(props.mode === '3-part-vertical'   ? 0 : props.insets.left);
  const bwRight  = $derived(props.mode === '3-part-vertical'   ? 0 : props.insets.right);

  // 워커 준비
//   $effect(async () => {
//     if (workerProxy) return;
//     const worker = new Worker(new URL('$lib/workers/center-slice.worker.ts', import.meta.url), { type: 'module' });
//     workerProxy = Comlink.wrap<CenterSliceWorker>(worker);
//   });

  // center 전용 이미지 갱신
  $effect(() => {
        if (!props.src) 
            return;
        const src = props.src;
        (async () => {

            htmlImg = new Image();
            htmlImg.decoding = 'async';
            htmlImg.src = src;
            await htmlImg.decode().catch(() => {});
            // center canvas ctx 준비
            centerCtx = centerCanvas?.getContext('2d', { alpha: true }) ?? null;
            tick().then(() => drawCenter())
        })()
  });

  // 2) 상태 바뀔 때마다 중앙 캔버스만 리드로우
  $effect(() => {
    drawCenter();
  });

  function drawCenter() {
    if (!centerCanvas || !centerCtx || !htmlImg) return;

    // 화면 CSS 픽셀 → 캔버스 해상도(HiDPI) 맞추기
    const dpr = window.devicePixelRatio || 1;

    // center 캔버스를 부모(컨테이너)의 현재 렌더 크기에 맞추기
    // - host는 border-image 때문에 실제 컨텐츠 영역이 (insets) 만큼 안쪽
    const hostRect = host.getBoundingClientRect();
    // host는 aspect-ratio로 w1:h1 비율. 여기에 보더 폭을 실제 CSS px로 환산
    // content-box 크기:
    const contentW = Math.max(1, hostRect.width  - cssPx(bwLeft) - cssPx(bwRight));
    const contentH = Math.max(1, hostRect.height - cssPx(bwTop)  - cssPx(bwBottom));

    // 캔버스의 CSS 크기와 백킹 스토어 크기 세팅
    centerCanvas.style.width = `${contentW}px`;
    centerCanvas.style.height = `${contentH}px`;
    centerCanvas.width  = Math.max(1, Math.round(contentW * dpr));
    centerCanvas.height = Math.max(1, Math.round(contentH * dpr));

    centerCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    centerCtx.imageSmoothingEnabled = true;
    centerCtx.imageSmoothingQuality = 'high';
    centerCtx.clearRect(0, 0, contentW, contentH);

    // 소스에서 "센터 서브영역" 픽셀 좌표 계산 (소스 픽셀 기준)
    const sx = props.insets.left   * props.sourceScale;
    const sy = props.insets.top    * props.sourceScale;
    const sw = cw1           * props.sourceScale;
    const sh = ch1           * props.sourceScale;

    if (sw <= 0 || sh <= 0) return;

    if (props.centerMode === 'tile') {
      // 타일링: 패턴 크기 조정 위해 임시 캔버스로 1타일 생성 (URL 불필요)
      if (tile.width !== sw) {
        tile.width = sw
      }
      if (tile.height !== sh) {
        tile.height = sh
      }
      const tctx = tile.getContext('2d')!;
      tctx.imageSmoothingEnabled = true;
      tctx.imageSmoothingQuality = 'high';
      tctx.drawImage(htmlImg, sx, sy, sw, sh, 0, 0, sw, sh);

      const pattern = centerCtx.createPattern(tile, 'repeat');
      if (!pattern) return;
      centerCtx.fillStyle = pattern;
      centerCtx.fillRect(0, 0, contentW, contentH);
    } else {
      // 스트레치: drawImage로 대상 영역 전체 채움
      centerCtx.drawImage(htmlImg, sx, sy, sw, sh, 0, 0, contentW, contentH);
    }
  }

  function cssPx(v: number) {
    // v는 1x 단위(=viewBox 기준). hostRect.width는 CSS px.
    // host의 contentBox와 w1/h1가 같은 비율이므로, bwLeft(1x)를 CSS px로 변환:
    const hostRect = host?.getBoundingClientRect();
    if (!hostRect) return v;
    // 보더 포함 전체 너비 hostRect.width가 w1(1x)와 비례 관계:
    // content css width ≈ hostRect.width * (cw1/w1), 이걸로 정확히 나누는 건 복잡.
    // 여기서는 단순 비례: 1x → CSS px : hostRect.width / w1
    const kx = hostRect.width  / w1;
    return v * kx;
  }
</script>

<!--
  스타일 원칙:
  - wrapper는 border-image로 엣지/코너를 그림
  - center는 그 안쪽 영역에 position:absolute로 배치, background로 타일/스트레치
-->
<div
bind:this={host}
  class="wrap"
  style:aspect-ratio="{w1} / {h1}"
  style:border-image-slice="{props.insets.top} {props.insets.right} {props.insets.bottom} {props.insets.left} fill"
  style:border-image-source={borderImageSource}
  style:--t="{bwTop}px"
  style:--r="{bwRight}px"
  style:--b="{bwBottom}px"
  style:--l="{bwLeft}px"
  style:--w1="{w1}px"
  style:--h1="{h1}px"
  style="
    border-style: solid;
    border-width: var(--t) var(--r) var(--b) var(--l);
    border-image-repeat: stretch stretch; /* 엣지는 반복/라운드로 변경 가능 */
    border-image-width: 1;
    /* 프리뷰 크기: 1x 공간으로 맞추고 CSS로 스케일링 */
    width: min(100%, 640px);
    position: relative;
    background-color: transparent;
  "
>
  <!-- 중앙 영역 -->
  <canvas
    bind:this={centerCanvas}
    class="center"
    style="
      position: absolute;
      inset: var(--t) var(--r) var(--b) var(--l);
      display: block;
    "
  ></canvas>
</div>

<style>
  .wrap { border-radius: 8px; }
</style>
