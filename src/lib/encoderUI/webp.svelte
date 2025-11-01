<script module lang="ts">
    import { webp, type ImageDataLike } from "icodec";

    export type WebpOption = webp.Options;
</script>

<script lang="ts">
    // WebPOptions.svelte — Svelte 5 + TypeScript
    // Props: value?: Options, onChange?: (opts)=>void, onApply?: (opts)=>void

    // CALLBACK PROPS (Svelte 5 style)
    let {
        value = $bindable(),
        ...props
    }: {
        value: WebpOption;
    } = $props();



    function clamp(
        n: number | undefined | null,
        min: number,
        max: number,
        def: number,
    ) {
        if (n === undefined || n === null || Number.isNaN(n)) return def;
        return Math.max(min, Math.min(max, n));
    }



    function resetDefaults() {
        value = { ...webp.defaultOptions };
    }


    // helpers for UI labels
    const preprocessEntries = Object.values(webp.Preprocess)
        .filter((value) => typeof value === "number")
        .map((value) => {
            return {
                label: webp.AlphaFiltering[value],
                v: value,
            };
        });
    const alphaFilteringEntries = Object.values(webp.AlphaFiltering)
        .filter((value) => typeof value === "number")
        .map((value) => {
            return {
                label: webp.AlphaFiltering[value],
                v: value,
            };
        });

    const tooltip = {
        lossless: `/**
    * Encode the image without any loss (pixel values of fully transparent area may different).
    *
    * @default false
    */`,
        nearLossless: `/**
    * Specify the level of near-lossless image preprocessing. This option adjusts pixel values
    * to help compressibility, but has minimal impact on the visual quality.
    * It triggers lossless compression mode automatically.
    *
    * The range is 0 (maximum preprocessing) to 100 (no preprocessing).
    * The typical value is around 60. Note that lossy with -q 100 can at times yield better results.
    *
    * @default 100
    */`,
        quality: `/**
    * Specify the compression factor for RGB channels between 0 and 100.
    *
    * In case of lossy compression (default), a small factor produces a smaller file
    * with lower quality.  Best quality is achieved by using a value of 100.
    *
    * In case of lossless compression, a small factor enables faster compression speed,
    * but produces a larger file. Maximum compression is achieved by using a value of 100.
    *
    * @default 75
    */`,
        alphaQuality: `/**
    * Specify the compression factor for alpha compression between 0 and 100.
    * Lossless compression of alpha is achieved using a value of 100, while the lower
    * values result in a lossy compression. The default is 100.
    *
    * @default 100
    */`,
        method: `/**
    * Specify the compression method to use. This parameter controls the trade off between
    * encoding speed and the compressed file size and quality.
    *
    * Possible values range from 0 to 6. When higher values are used, the encoder will spend more
    * time inspecting additional encoding possibilities and decide on the quality gain.
    *
    * Lower value can result in faster processing at the expense of larger file size and lower quality.
    *
    * @default 4
    */`,
        snsStrength: `/**
    * Specify the amplitude of the spatial noise shaping. Spatial noise shaping (or sns for short)
    * refers to a general collection of built-in algorithms used to decide which area of the
    * picture should use relatively less bits, and where else to better transfer these bits.
    *
    * The possible range goes from 0 (algorithm is off) to 100 (the maximal effect).
    *
    * @default 50
    */`,
        filterStrength: `/**
    * Specify the strength of the deblocking filter, between 0 (no filtering) and 100 (maximum filtering).
    * A value of 0 will turn off any filtering. Higher value will increase the strength of the filtering
    * process applied after decoding the picture. The higher the value the smoother the picture will appear.
    *
    * @default 60
    */`,
        filterSharpness: `/**
    * Specify the sharpness of the filtering (if used). Range is 0 (sharpest) to 7 (least sharp).
    *
    * @default 0
    */`,
        filterType: `/**
    * Use strong filtering (if filtering is being used thanks to the \`filter_strength\`).
    *
    * @default true
    */`,
        segments: `/**
    * Change the number of partitions to use during the segmentation of the sns algorithm.
    * Range [1, 4], this option has no effect for methods 3 and up, unless \`low_memory\` is used.
    *
    * @default 4
    */`,
        preprocessing: `/**
    * Specify some pre-processing steps. Using a value of 2 will trigger quality-dependent pseudo-random
    * dithering during RGBA->YUVA conversion (lossy compression only).
    *
    * @default Preprocess.None
    */`,
        autofilter: `/**
    * Turns auto-filter on. This algorithm will spend additional time optimizing the
    * filtering strength to reach a well-balanced quality.
    *
    * @default 0
    */`,
        partitionLimit: `/**
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
    */`,
        alphaCompression: `/**
    * Specify the algorithm used for alpha compression: 0 or 1.
    * Algorithm 0 denotes no compression, 1 uses WebP lossless format for compression.
    *
    * @default 1
    */`,
        alphaFiltering: `/**
    * Specify the predictive filtering method for the alpha plane. One of none,
    * fast or best, in increasing complexity and slowness order.
    *
    * Internally, alpha filtering is performed using four possible predictions (none, horizontal, vertical, gradient).
    * The best mode will try each mode in turn and pick the one which gives the smaller size.
    *
    * The fast mode will just try to form an a priori guess without testing all modes.
    *
    * @default AlphaFiltering.Fast
    */`,
        sharpYUV: `/**
    * Use more accurate and sharper RGB->YUV conversion if needed.
    * Note that this process is slower than the default conversion.
    *
    * @default false
    */`,
        exact: `/**
    * Preserve RGB values in transparent area. The default is off, to help compressibility.
    */`,
        targetSize: `/**
    * Specify a target size (in bytes) to try and reach for the compressed output.
    * The compressor will make several passes of partial encoding in order to get as close as possible to this target.
    * If both \`target_size\` and \`target_PSNR\` are used, \`target_size\` value will prevail.
    */`,
        targetPSNR: `/**
    * Specify a target PSNR (in dB) to try and reach for the compressed output.
    * The compressor will make several passes of partial encoding in order to get as close as possible to this target.
    * If both \`target_size\` and \`target_PSNR\` are used, \`target_size\` value will prevail.
    */`,
        pass: `/**
    * Set a maximum number of passes to use during the dichotomy used by \`target_size\` or \`target_PSNR\`.
    *
    * Maximum value is 10. If options \`target_size\` or \`target_PSNR\` were used, but \`pass\` wasn't specified,
    * a default value of '6' passes will be used. If \`pass\` is specified,
    * but neither \`target_size\` nor \`target_PSNR\` are, a target PSNR of 40dB will be used.
    *
    * @default 1
    */`,
        lowMemory: `/**
    * Reduce memory usage of lossy encoding by saving four times the compressed size (typically).
    * This will make the encoding slower and the output slightly different in size and distortion.
    *
    * This flag is only effective for methods 3 and up, and is off by default.
    *
    * Note that leaving this flag off will have some side effects on the bitstream:
    * it forces certain bitstream features like number of partitions (forced to 1).
    *
    * @default false
    */`,
        emulateJpegSize: `/**
    * Change the internal parameter mapping to better match the expected size of JPEG compression.
    *
    * This flag will generally produce an output file of similar size to its JPEG equivalent
    * (for the same \`quality\` setting), but with less visual distortion.
    *
    * @default false
    */`,
    };
</script>

<div class="card" aria-label="WebP Encoder Options">
    <div class="grid">
        <div class="row"><strong>WebP Encoder Options</strong></div>

        <div class="row">
            <label title={tooltip.lossless}
                ><input type="checkbox" bind:checked={value.lossless} /> Lossless</label
            >
            <span class="muted"> (may change transparent pixels)</span>
        </div>

        <div class="row">
            <div style="flex:1" title={tooltip.nearLossless}>
                <label class="small"
                    >nearLossless: <span class="muted"
                        >{value.nearLossless}</span
                    ></label
                >
                <input
                    type="range"
                    min="0"
                    max="100"
                    bind:value={value.nearLossless}
                />
            </div>
            <div style="width:120px" title={tooltip.quality}>
                <label class="small">quality</label>
                <input
                    class="num"
                    type="number"
                    min="0"
                    max="100"
                    bind:value={value.quality}
                />
            </div>
        </div>

        <div class="row">
            <div style="flex:1" title={tooltip.alphaQuality}>
                <label class="small"
                    >alphaQuality: <span class="muted"
                        >{value.alphaQuality}</span
                    ></label
                >
                <input
                    type="range"
                    min="0"
                    max="100"
                    bind:value={value.alphaQuality}
                />
            </div>
            <div style="width:120px" title={tooltip.method}>
                <label class="small">method</label>
                <input
                    class="num"
                    type="number"
                    min="0"
                    max="6"
                    bind:value={value.method}
                />
            </div>
        </div>

        <div class="row" title={tooltip.snsStrength}>
            <label class="small">snsStrength: {value.snsStrength}</label>
            <input
                type="range"
                min="0"
                max="100"
                bind:value={value.snsStrength}
            />
        </div>

        <div class="row" title={tooltip.filterStrength}>
            <label class="small">filterStrength: {value.filterStrength}</label>
            <input
                type="range"
                min="0"
                max="100"
                bind:value={value.filterStrength}
            />
        </div>

        <div class="row two">
            <div style="flex:1" title={tooltip.filterSharpness}>
                <label class="small"
                    >filterSharpness: {value.filterSharpness}</label
                >
                <input
                    type="range"
                    min="0"
                    max="7"
                    bind:value={value.filterSharpness}
                />
            </div>
            <div style="width:160px" title={tooltip.filterType}>
                <label
                    ><input type="checkbox" bind:checked={value.filterType} /> filterType
                    (strong)</label
                >
            </div>
        </div>

        <div class="row" title={tooltip.segments}>
            <label class="small">segments: {value.segments}</label>
            <input type="range" min="1" max="4" bind:value={value.segments} />
        </div>

        <div class="row two">
            <div style="flex:1" title={tooltip.preprocessing}>
                <label>preprocessing</label>
                <select bind:value={value.preprocessing}>
                    {#each preprocessEntries as e}
                        <option value={e.v}>{e.label}</option>
                    {/each}
                </select>
            </div>
            <div style="width:160px" title={tooltip.autofilter}>
                <label
                    ><input type="checkbox" bind:checked={value.autofilter} /> autofilter</label
                >
            </div>
        </div>

        <div class="row two">
            <div style="flex:1" title={tooltip.partitionLimit}>
                <label class="small"
                    >partitionLimit: {value.partitionLimit}</label
                >
                <input
                    type="range"
                    min="0"
                    max="100"
                    bind:value={value.partitionLimit}
                />
            </div>
            <div style="width:160px" title={tooltip.pass}>
                <label class="small">pass: {value.pass}</label>
                <input
                    class="num"
                    type="number"
                    min="1"
                    max="10"
                    bind:value={value.pass}
                />
            </div>
        </div>

        <div class="row two">
            <div title={tooltip.alphaCompression}>
                <label>alphaCompression</label>
                <select bind:value={value.alphaCompression}>
                    <option value={0}>0 (none)</option>
                    <option value={1}>1 (webp lossless)</option>
                </select>
            </div>
            <div title={tooltip.alphaFiltering}>
                <label>alphaFiltering</label>
                <select bind:value={value.alphaFiltering}>
                    {#each alphaFilteringEntries as a}
                        <option value={a.v}>{a.label}</option>
                    {/each}
                </select>
            </div>
        </div>

        <div class="row">
            <label title={tooltip.sharpYUV}
                ><input type="checkbox" bind:checked={value.sharpYUV} /> sharpYUV</label
            >
            <label style="margin-left:12px" title={tooltip.exact}
                ><input type="checkbox" bind:checked={value.exact} /> exact (preserve
                RGB in transparent)</label
            >
        </div>

        <div class="row two">
            <div style="flex:1" title={tooltip.targetSize}>
                <label>targetSize (bytes)</label>
                <input type="number" min="0" bind:value={value.targetSize} />
            </div>
            <div style="width:160px" title={tooltip.targetPSNR}>
                <label>targetPSNR (dB)</label>
                <input
                    class="num"
                    type="number"
                    min="0"
                    bind:value={value.targetPSNR}
                />
            </div>
        </div>

        <div class="row two">
            <div>
                <label title={tooltip.lowMemory}
                    ><input type="checkbox" bind:checked={value.lowMemory} /> lowMemory</label
                >
            </div>
            <div>
                <label title={tooltip.emulateJpegSize}
                    ><input
                        type="checkbox"
                        bind:checked={value.emulateJpegSize}
                    /> emulateJpegSize</label
                >
            </div>
        </div>

        <div class="actions">
            <button type="button" on:click={resetDefaults}>Reset</button>
        </div>
    </div>
</div>

<style>
    .card {
        border: 1px solid #e6e6e6;
        border-radius: 8px;
        padding: 12px;
        background: #fff;
    }
    .grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;
    }
    .row {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-bottom: 8px;
    }
    label {
        font-size: 13px;
        color: #222;
    }
    .muted {
        color: #6b7280;
        font-size: 12px;
    }
    input[type="range"] {
        width: 100%;
    }
    .actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 8px;
    }
    .two {
        display: flex;
        gap: 8px;
    }
    .small {
        font-size: 12px;
        color: #444;
    }
    .num {
        width: 110px;
    }
</style>
