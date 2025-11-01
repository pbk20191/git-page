<script module lang="ts">
    import { heic, type ImageDataLike } from "icodec" 

    export type HeicOption = heic.Options
</script>
<script lang="ts">

  // --- CALLBACK PROPS (Svelte 5 recommended) ---
  /** optional callback called on every local change (live) */
  export let onChange: ((value: HeicOption) => void) | undefined;

  /** optional callback called when user clicks 'Apply' */
  export let onApply: ((value: HeicOption) => void) | undefined;

  /** initial controlled value (parent may pass) — read-only for this component */
  export let value: HeicOption | undefined = undefined;

  // local editable state (component owns edits)
  let local: HeicOption = {...heic.defaultOptions }
  // sync when parent provides a value (shallow/structural check)
  $: if (value) {
    try {
      if (JSON.stringify(value) !== JSON.stringify(local)) {
        local = { ...value };
      }
    } catch {
      local = { ...value };
    }
  }

  // clamp helpers
  function clamp(n: number | undefined, min: number, max: number, def: number) {
    if (n === undefined || Number.isNaN(n)) return def;
    return Math.max(min, Math.min(max, n));
  }

  // call the provided callback if exists
  function emitChange() {
    local = {
      ...local,
      quality: clamp(local.quality, 0, 100, 50),
      tuIntraDepth: clamp(local.tuIntraDepth, 1, 4, 2),
      complexity: clamp(local.complexity, 0, 100, 50)
    };
    onChange?.({ ...local });
  }

  function apply() {
    onApply?.({ ...local });
  }

  function resetDefaults() {
    local = {
      quality: 50,
      lossless: false,
      preset: 'slow',
      tune: 'ssim',
      tuIntraDepth: 2,
      complexity: 50,
      chroma: '420',
      sharpYUV: false
    };
    emitChange();
  }

  function exportJSON() {
    const json = JSON.stringify(local, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'x265-options.json';
    a.click();
    URL.revokeObjectURL(url);
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
        <label title={tooltip.quality}>Quality <span class="muted">{local.quality ?? 50}</span></label>
      </div>
      <div class="row">
        <input type="range" min="0" max="100" bind:value={local.quality} on:input={emitChange} />
      </div>

      <div class="row">
        <label title={tooltip.lossless}><input type="checkbox" bind:checked={local.lossless} on:change={emitChange} /> Lossless</label>
      </div>

      <div class="row">
        <label title={tooltip.preset} >Preset</label>
        <select bind:value={local.preset} on:change={emitChange}>
          {#each heic.Presets as p}
            <option value={p}>{p}</option>
          {/each}
        </select>
      </div>

      <div class="row">
        <label title={tooltip.tune} >Tune</label>
        <select bind:value={local.tune} on:change={emitChange}>
          {#each heic.Tune as t}
            <option value={t}>{t}</option>
          {/each}
        </select>
      </div>

      <div class="row">
        <label title={tooltip.tuIntraDepth} >TU Intra Depth <span class="muted">{local.tuIntraDepth}</span></label>
      </div>
      <div class="row">
        <input type="range" min="1" max="4" bind:value={local.tuIntraDepth} on:input={emitChange} />
      </div>
    </div>

    <div>
      <div class="row">
        <label title={tooltip.complexity}>Complexity <span class="muted">{local.complexity}</span></label>
      </div>
      <div class="row">
        <input type="range" min="0" max="100" bind:value={local.complexity} on:input={emitChange} />
      </div>

      <div class="row">
        <label title={tooltip.chroma}>Chroma</label>
        <select bind:value={local.chroma} on:change={emitChange}>
          {#each heic.Subsampling as s}
            <option value={s}>{s}</option>
          {/each}
        </select>
      </div>

      <div class="row">
        <label title={tooltip.sharpYUV}><input type="checkbox" bind:checked={local.sharpYUV} on:change={emitChange} /> Sharp YUV</label>
      </div>

      <div class="row">
        <button on:click={resetDefaults}>Reset</button>
        <div style="flex:1"></div>
        <button on:click={exportJSON}>Export</button>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:8px;">
        <button on:click={apply}>Apply</button>
      </div>
    </div>
  </div>
</div>