<script module lang="ts">
    import { heic, type ImageDataLike } from "icodec" 

    export type HeicOption = heic.Options
</script>
<script lang="ts">

    let {
       value = $bindable(),
       ...props
    }: {
      value:HeicOption
    }  = $props()



  // clamp helpers
  function clamp(n: number | undefined, min: number, max: number, def: number) {
    if (n === undefined || Number.isNaN(n)) return def;
    return Math.max(min, Math.min(max, n));
  }



  function resetDefaults() {
    value = {
      ...heic.defaultOptions
    };
  }


  const tooltip = {
    quality:`
    /**
     * Quality-based VBR [0, 100], it will map to \`--crf\` parameter of x265.
     * quality=0   -> crf=50
     * quality=50  -> crf=25
     * quality=100 -> crf=0
     *
     * @default 50
     */
    `,
    lossless:`
        /**
     * If true, Bypass transform, quant and loop filters.
     *
     * Note: it does not bypass chroma subsampling, you need
     *       also to set \`chroma\` to "444" for exact lossless.
     *
     * @default false
     */
    `,
     preset:`
        /**
     * Trade off performance for compression efficiency.
     *
     * @default "slow"
     */
    `,
    tune:`    /**
     * Tune the settings for a particular type of source or situation.
     *
     * @default "ssim"
     */`,
     tuIntraDepth:`    /**
     * Max TU recursive depth for intra CUs。
     *
     * [1, 4], default 2.
     */`,
     complexity:`    /**
     * CPU effort, larger value increases encode time.
     * Range is [0, 100], but only changes at a few values.
     *
     * @default 50
     */`,
     chroma:`    /**
     * Specify chroma subsampling method.
     *
     * @default "420"
     */`,
     sharpYUV:`    /**
     * Use more accurate and sharper RGB->YUV conversion if needed.
     *
     * @default false
     */`

  }

    
</script>

<style>
  .card { border:1px solid #e6e6e6; border-radius:8px; padding:12px; background:#fff }
  .grid { display:grid; grid-template-columns: 1fr 1fr; gap:12px }
  .row { display:flex; gap:8px; align-items:center; margin-bottom:8px }
  .title { font-weight:600; margin-bottom:10px }
  .muted { color:#6b7280; font-size:12px }
</style>

<div class="card">
  <div class="title">HEIC  (x265,HEVC) Options</div>

  <div class="grid">
    <div>
      <div class="row">
        <label title={tooltip.quality}>Quality <span class="muted">{value.quality ?? 50}</span></label>
      </div>
      <div class="row">
        <input type="range" min="0" max="100" bind:value={value.quality} />
      </div>

      <div class="row">
        <label title={tooltip.lossless}><input type="checkbox" bind:checked={value.lossless}/> Lossless</label>
      </div>

      <div class="row">
        <label title={tooltip.preset} >Preset</label>
        <select bind:value={value.preset}>
          {#each heic.Presets as p}
            <option value={p}>{p}</option>
          {/each}
        </select>
      </div>

      <div class="row">
        <label title={tooltip.tune} >Tune</label>
        <select bind:value={value.tune} >
          {#each heic.Tune as t}
            <option value={t}>{t}</option>
          {/each}
        </select>
      </div>

      <div class="row">
        <label title={tooltip.tuIntraDepth} >TU Intra Depth <span class="muted">{value.tuIntraDepth}</span></label>
      </div>
      <div class="row">
        <input type="range" min="1" max="4" bind:value={value.tuIntraDepth} />
      </div>
    </div>

    <div>
      <div class="row">
        <label title={tooltip.complexity}>Complexity <span class="muted">{value.complexity}</span></label>
      </div>
      <div class="row">
        <input type="range" min="0" max="100" bind:value={value.complexity} />
      </div>

      <div class="row">
        <label title={tooltip.chroma}>Chroma</label>
        <select bind:value={value.chroma} >
          {#each heic.Subsampling as s}
            <option value={s}>{s}</option>
          {/each}
        </select>
      </div>

      <div class="row">
        <label title={tooltip.sharpYUV}><input type="checkbox" bind:checked={value.sharpYUV} /> Sharp YUV</label>
      </div>

      <div class="row">
        <button on:click={resetDefaults}>Reset</button>
      </div>


    </div>
  </div>
</div>