<svelte:head>
    <title>About</title>
    <meta name="description" content="Converter for heif" />
</svelte:head>
<script lang="ts">
	import { onDestroy } from 'svelte';
    import * as Comlink from "comlink"
    import ICODEC from '$workers/icodecs?worker&url'
    import JSZip from 'jszip';
    import saveAs from 'file-saver';
    import "icodec"

    const worker =  new Worker(ICODEC, { type: "module"})
    const pool = Comlink.wrap<typeof import("$workers/icodecs")>(
       worker
    )
    
    onDestroy(() => {
        worker.terminate()
    })

    async function handleMultipleFilesChange(event: Event) {
        const files = Array.from((event.target as HTMLInputElement).files ?? []);
                if (!files.length) return;

        const zip = new JSZip();

        const tasks = files.map(async (file) => {
            try {
                if (file.type === 'image/heic' || file.type === 'image/heif') {
                    console.warn(`Skipping ${file.name} as it is already in HEIC format.`);
                    // const buffer = await file.arrayBuffer();
                    zip.file(file.name, file);
                    return;
                }
                let bitmap = await createImageBitmap(file)
                const result = await pool.bitmapToHEIC(
                    Comlink.transfer(bitmap, [bitmap])
                )
            
                const outputName = file.name.replace(/\.[^/.]+$/, '') + '.heic';
                zip.file(outputName, result);
            } catch (err) {
                console.error(`Error processing file ${file.name}:`, err);
            }
        });

        await Promise.all(tasks);

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(zipBlob, 'converted_images.zip');

    }
</script>

<div>   

        <input type="file" multiple accept="image/*" on:change={handleMultipleFilesChange} />


</div>