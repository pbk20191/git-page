<script lang="ts">
    import { onDestroy } from "svelte";
    import * as Comlink from "comlink";
    import ICODEC from "$workers/icodecs?worker&url";
    import JSZip from "jszip";
    import saveAs from "file-saver";
    import "icodec";
    import Heic, { type HeicOption } from "$lib/encoderUI/heic.svelte";
    import Webp, { type WebpOption } from "$lib/encoderUI/webp.svelte";
    import Avif, {type AvifOption} from "$lib/encoderUI/avif.svelte";
    import { avif, heic, webp } from "icodec";
    type HeicEvent = {
        type:"heic",
        option:HeicOption
    }
    type WebpEvent = {
        type:"webp",
        option:WebpOption
    }
    type AvifEvent = {
        type:"avif",
        option:AvifOption
    }
    type ConfigEvent = HeicEvent|WebpEvent|AvifEvent

    let store = {

    } as {
        webp?:webp.Options,
        avif?:avif.Options,
        heic?:heic.Options
    }

    async function processFiles(files:File[]) {
        if (!files.length) return;
        const worker = new Worker(ICODEC, { type: "module" });
        const pool = Comlink.wrap<typeof import("$workers/icodecs")>(worker);
        const zip = new JSZip();
        const heicFolder = zip.folder("heic")
        const webpFolder = zip.folder("webp")
        const avifFolder = zip.folder("avif")
        try {
            const tasks = files.map(async (file) => {
                let bitmap = await createImageBitmap(file);
                const heicResult = await pool.bitmapToHEIC(
                    Comlink.transfer(bitmap, [bitmap]), store.heic
                );
                const webpResult = await pool.bitmapToWEBP(
                    Comlink.transfer(heicResult.bitmap, [heicResult?.bitmap]), store.webp
                )
                const avifResult = await pool.bitmapToAVIF(
                    Comlink.transfer(webpResult.bitmap, [webpResult.bitmap]), store.avif
                )
                const outputName = file.name.replace(/\.[^/.]+$/, "");
                heicFolder?.file(outputName + ".heic", heicResult.data)
                webpFolder?.file(outputName + ".webp", webpResult.data)
                avifFolder?.file(outputName + ".avif", avifResult.data)
            })
            await Promise.all(tasks);
            const zipBlob = await zip.generateAsync({ type: "blob" });
            saveAs(zipBlob, "converted_images.zip");
        } finally {
            worker.terminate()
        }
    }

    async function handleMultipleFilesChange(event: Event) {
        const files = Array.from(
            (event.target as HTMLInputElement).files ?? [],
        );
        processFiles(files)
      
    }


    function onApply(e:ConfigEvent) {
        if (e.type === 'avif') {
            store.avif = e.option
        } else if (e.type === 'webp') {
            store.webp = e.option
        } else if (e.type === 'heic') {
            store.heic = e.option
        }
        console.log(e, store)
    }
    function onChange(e:ConfigEvent) {
        
    }
</script>

<svelte:head>
    <title>About</title>
    <meta name="description" content="Converter for heif" />
</svelte:head>

<div>
    <Webp value={store.webp} onApply={(option) => onApply({ type:"webp", option})} onChange={(option) => onChange({ type:'webp', option })}/>
    <Heic value={store.heic} onApply={(option) => onApply({ type:"heic", option})} onChange={(option) => onChange({ type:'heic', option })}/>
    <Avif value={store.avif} onApply={(option) => onApply({ type:"avif", option})} onChange={(option) => onChange({ type:'avif', option })}/>
    <span>  상당히 느립니다.</span>

    <label for="heic">HEIC</label>
    <input
        type="file"
        name="heif"
        multiple
        accept="image/png"
        on:change={handleMultipleFilesChange}
    />

</div>
