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
    let downloadUrl: string | undefined = undefined;
    function getEncodingOptions(): EncodingOption | undefined {
        if (useDefaultOption) return undefined;
        return {
            quality,
            lossless,
            sharpYUV
        };
    }
    onDestroy(() => {
        if (downloadUrl) {
            URL.revokeObjectURL(downloadUrl);
            downloadUrl = undefined;
        }
        // Clean up any resources if needed
    });

    // async function encodeToHeif(data: File, options?: EncodingOption) {
    //     const result: ReturnType<MainModule["jsEncodeImages"]> = await pool.exec('jsEncodeImages', [
    //         data, options
    //     ])
    //     return result
    // }

    // async function decodeHeif(buffer: File) {
    //     const result:ReturnType<MainModule["jsDecodeImage"]> = await pool.exec('jsDecodeImage', [buffer])
    //     return result
    // }

    import JSZip from 'jszip';
    // import { saveAs } from 'file-saver';
    // import { on } from 'svelte/events';

    async function handleMultipleFilesChange(e: Event) {
        const files = Array.from((e.target as HTMLInputElement).files ?? []);
        if (!files.length) return;
        const pool = workerPool(HEICWorker, { workerOpts: { type: 'module' } })


        const tasks = files.map(async (file) => {
            try {
                if (file.type === 'image/heic' || file.type === 'image/heif') {
                    console.warn(`Skipping ${file.name} as it is already in HEIC format.`);
                    // const buffer = await file.arrayBuffer();
                    // zip.file(file.name, file);
                    // return;
                    return file
                }
                
                const result: ReturnType<MainModule["jsEncodeImages"]> = await pool.exec('jsEncodeImages', [file, getEncodingOptions()]);
                if (result.error) {
                    console.error(`Error encoding ${file.name}`, result.error);
                    throw result.error;
                    // return;
                }
                const outputName = file.name.replace(/\.[^/.]+$/, '') + '.heic';
                // zip.file(outputName, result.data);
                return new File([result.data! as ArrayBuffer], outputName, { type: 'image/heic' });
            } catch (err) {
                console.error(`Error processing file ${file.name}:`, err);
                throw err;
            }
        });

        try {
            const zip = new JSZip();
            await (Promise.all(tasks).then((files) => {
                files.forEach((file) => {
                    if (file instanceof File) {
                        zip.file(file.name, file);
                    }
                });
            }));
            // await Promise.all(tasks);
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            if (downloadUrl) {
                URL.revokeObjectURL(downloadUrl);
            }
            downloadUrl = URL.createObjectURL(zipBlob);
            // saveAs(zipBlob, 'converted_images.zip');
        } finally {
            pool.terminate();
        }
        
        // zipBlob
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
    <label>
      <input type="checkbox" bind:checked={sharpYUV} />
      SharpYUV
    </label>
  </div>
{/if}
    <!-- <input type="file" accept="image/*" on:change={handleFileChange} /> -->
    <!-- <button on:click={decodeSampleImage}>샘플 HEIC 디코딩 보기</button> -->
    <br />
    <input type="file" multiple accept="image/*" on:change={handleMultipleFilesChange} />
    <!-- <canvas bind:this={previewCanvas} style="border: 1px solid #ccc; margin-top: 1rem;" /> -->
    {#if downloadUrl}
        <p><a href={downloadUrl} download="converted.zip">Download zip</a></p>
    {/if}
    
</div>