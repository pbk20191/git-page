<script module lang="ts">
    import { avif, type ImageDataLike } from "icodec";

    export type AvifOption = avif.Options;
</script>
<script lang="ts">

    let {
       value = $bindable(),
       ...props
    }: {
      value:AvifOption
    }  = $props()




  // clamp helper
  function clamp(n: number | undefined | null, min: number, max: number, def: number) {
    if (n === undefined || n === null || Number.isNaN(n)) return def;
    return Math.max(min, Math.min(max, n));
  }



  function resetDefaults() {
    value = { ...avif.defaultOptions }
  }


    const subsampleEntries = Object.values(avif.Subsampling)
        .filter((value) => typeof value === "number")
        .map((value) => {
            return {
                label: avif.Subsampling[value],
                v: value,
            };
        });
    const tuneEntries = Object.values(avif.AVIFTune)
        .filter((value) => typeof value === "number")
        .map((value) => {
            return {
                label: avif.AVIFTune[value],
                v: value,
            };
        });

    const tooltip = {
    quality: `/**
 * [0 - 100], 0 = worst quality, 100 = lossless
 *
 * @default 50
 */`,
    qualityAlpha: `/**
 * As above, but -1 means 'use quality'
 *
 * @default -1
 */`,
    speed: `/**
 * Range: [-1, 10], 0 = slowest, 10 = fastest, slower should make for a better quality image in less bytes.
 * A combination of settings are tweaked to simulate this speed range.
 *
 * @default 6
 */`,
    subsample: `/**
 * Chrome subsampling type.
 *
 * @default YUV420
 */`,
    autoTiling: `/**
 * If true, ignores \`tileRowsLog2\` and \`tileColsLog2\` and automatically chooses suitable tiling values.
 *
 * @default false
 */`,
    tileRowsLog2: `/**
 * [0 - 6], Creates 2^n tiles in that dimension
 *
 * @default 0
 */`,
    tileColsLog2: `/**
 * [0 - 6], Creates 2^n tiles in that dimension
 *
 * @default 0
 */`,
    chromaDeltaQ: `/**
 * Extra chroma compression, cannot be used in lossless mode.
 *
 * @default false
 */`,
    sharpness: `/**
 * Bias towards block sharpness in rate-distortion optimization of transform coefficients [0, 7]
 *
 * @default 0
 */`,
    denoiseLevel: `/**
 * Amount of noise (from 0 = don't denoise, to 50)
 *
 * @default 0
 */`,
    tune: `/**
 * Distortion metric tuned with.
 *
 * @default AVIFTune.Auto
 */`,
    sharpYUV: `/**
 * Use libsharpyuv for RGB->YUV conversion if needed.
 *
 * @default false
 */`
}
</script>

<style>
  .card { border:1px solid #e6e6e6; border-radius:8px; padding:12px; background:#fff }
  .grid { display:grid; grid-template-columns: 1fr 1fr; gap:12px }
  .row { display:flex; gap:8px; align-items:center; margin-bottom:8px }
  label { font-size:13px; color:#222 }
  .muted { color:#6b7280; font-size:12px }
  input[type="range"] { width:100% }
  .num { width:110px }
  .actions { display:flex; justify-content:flex-end; gap:8px; margin-top:10px }
</style>

<div class="card" aria-label="AVIF Encoder Options">
  <div class="title" style="font-weight:600; margin-bottom:8px">AVIF Options</div>

  <div class="grid">
    <div>
      <div class="row" title={tooltip.quality}>
        <label>Quality <span class="muted">{value.quality}</span></label>
      </div>
      <div class="row">
        <input type="range" min="0" max="100" bind:value={value.quality} />
      </div>

      <div class="row" title={tooltip.qualityAlpha}>
        <label>Quality Alpha <span class="muted">{value.qualityAlpha}</span></label>
        <input class="num" type="number" min="-1" max="100" bind:value={value.qualityAlpha} />
      </div>

      <div class="row" title={tooltip.speed}>
        <label>Speed <span class="muted">{value.speed}</span></label>
        <input type="range" min="-1" max="10" bind:value={value.speed} />
      </div>

      <div class="row" title={tooltip.subsample}>
        <label>Subsample</label>
        <select bind:value={value.subsample} >
          {#each subsampleEntries as e}
            <option value={e.v}>{e.label}</option>
          {/each}
        </select>
      </div>

      <div class="row" title={tooltip.autoTiling}>
        <label><input type="checkbox" bind:checked={value.autoTiling}  /> Auto Tiling</label>
      </div>

      <div class="row" title={tooltip.tileColsLog2}>
        <label>TileRows (log2) <span class="muted">{value.tileRowsLog2}</span></label>
        <input type="range" min="0" max="6" bind:value={value.tileRowsLog2} />
      </div>

      <div class="row"  title={tooltip.tileColsLog2}>
        <label>TileCols (log2) <span class="muted">{value.tileColsLog2}</span></label>
        <input type="range" min="0" max="6" bind:value={value.tileColsLog2} />
      </div>
    </div>

    <div>
      <div class="row"  title={tooltip.chromaDeltaQ}>
        <label><input type="checkbox" bind:checked={value.chromaDeltaQ} /> Chroma Delta Q</label>
      </div>

      <div class="row"  title={tooltip.sharpness}>
        <label>Sharpness <span class="muted">{value.sharpness}</span></label>
        <input type="range" min="0" max="7" bind:value={value.sharpness} />
      </div>

      <div class="row"  title={tooltip.denoiseLevel}>
        <label>Denoise Level <span class="muted">{value.denoiseLevel}</span></label>
        <input type="range" min="0" max="50" bind:value={value.denoiseLevel}  />
      </div>

      <div class="row"  title={tooltip.tune}>
        <label>Tune</label>
        <select bind:value={value.tune}>
          {#each tuneEntries as t}
            <option value={t.v}>{t.label}</option>
          {/each}
        </select>
      </div>

      <div class="row"  title={tooltip.sharpYUV}>
        <label><input type="checkbox" bind:checked={value.sharpYUV}  /> Sharp YUV</label>
      </div>

      <div class="actions">
        <button type="button" on:click={resetDefaults}>Reset</button>
      </div>
    </div>
  </div>
</div>