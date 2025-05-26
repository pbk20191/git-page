<svelte:head>
    <title>About</title>
    <meta name="description" content="Converter for heif" />
</svelte:head>
<script lang="ts">
	import { onDestroy } from 'svelte';
    import { pool as workerPool } from "workerpool"
    import HEICWorker from '$workers/heic?worker&url'
    import type { EncodingOption } from 'elheif';
    import type { MainModule }  from 'elheif';
    let useDefaultOption = true;
    let quality = 80;
    let lossless = false;
    let sharpYUV = false;

    function getEncodingOptions(): EncodingOption | undefined {
        if (useDefaultOption) return undefined;
        return {
            quality,
            lossless,
            sharpYUV
        };
    }
    const pool = workerPool(HEICWorker, { workerOpts: { type: 'module' } })
    onDestroy(() => {
        pool.terminate(true)
        .catch((e) => {
            console.error("failure",e)
        })
    })

    async function encodeToHeif(data: ImageData[], options?: EncodingOption) {
        const result: ReturnType<MainModule["jsEncodeImages"]> = await pool.exec('jsEncodeImages', [
            data, options
        ])
        return result
    }

    async function decodeHeif(buffer: Uint8Array) {
        const result:ReturnType<MainModule["jsDecodeImage"]> = await pool.exec('jsDecodeImage', [buffer])
        return result
    }

    import JSZip from 'jszip';
    import { saveAs } from 'file-saver';

    async function handleMultipleFilesChange(e: Event) {
        const files = Array.from((e.target as HTMLInputElement).files ?? []);
        if (!files.length) return;

        const zip = new JSZip();

        for (const file of files) {
            if (file.type === 'image/heic' || file.type === 'image/heif') {
                console.warn(`Skipping ${file.name} as it is already in HEIC format.`);
                
                zip.file(file.name, await file.arrayBuffer())
                continue
            }
            const bitmap = await createImageBitmap(file);
            const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(bitmap, 0, 0);
            const imageData = ctx.getImageData(0, 0, bitmap.width, bitmap.height);

            const result = await encodeToHeif([imageData], getEncodingOptions());
            if (result.error) {
                console.error(`Error encoding ${file.name}`, result.error);
                continue;
            }

            const blob = new Blob([result.data as ArrayBuffer], { type: 'image/heic' });
            const arrayBuffer = await blob.arrayBuffer();
            const fileName = file.name.replace(/\.[^/.]+$/, "") + ".heic";
            zip.file(fileName, arrayBuffer);
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });
        saveAs(zipBlob, "converted_images.zip");
    }
</script>

<div class="text-column">
<label>
  <input type="checkbox" bind:checked={useDefaultOption} />
  기본 옵션 사용
</label>

{#if !useDefaultOption}
  <div class="encoding-options">
    <label>
      Quality:
      <input type="range" min="0" max="100" bind:value={quality} />
      <span>{quality}</span>
    </label>
    <label>
      <input type="checkbox" bind:checked={lossless} />
      Lossless
    </label>
    <!-- <label>
      <input type="checkbox" bind:checked={sharpYUV} />
      SharpYUV
    </label> -->
  </div>
{/if}
    <!-- <input type="file" accept="image/*" on:change={handleFileChange} /> -->
    <!-- <button on:click={decodeSampleImage}>샘플 HEIC 디코딩 보기</button> -->
    <br />
    <input type="file" multiple accept="image/*" on:change={handleMultipleFilesChange} />
    <!-- <canvas bind:this={previewCanvas} style="border: 1px solid #ccc; margin-top: 1rem;" />
    {#if downloadUrl}
        <p><a href={downloadUrl} download="converted.heic">Download HEIC</a></p>
    {/if}
     -->
</div>