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
        let errorArrays = [] as {
            type: "avif" | "webp" | "heic",
            reason:any,
            fileName:string
        }[]
        try {
            const tasks = files.map(async (file) => {
                let bitmap = await createImageBitmap(file);
                const result = await pool.encodeBitmap(
                    Comlink.transfer(bitmap, [bitmap]), store
                )

                const outputName = file.name.replace(/\.[^/.]+$/, "");
                if (result.avif.status === "fulfilled") {
                    avifFolder?.file(outputName + ".avif", result.avif.value)
                } else {
                    console.error(result.avif.reason)
                    errorArrays.push({
                        type:"avif",
                        reason: result.avif.reason,
                        fileName: file.name
                    })
                }
                if (result.heic.status === "fulfilled") {
                    heicFolder?.file(outputName + ".heic", result.heic.value)
                } else {
                    console.error(result.heic.reason)
                    errorArrays.push({
                        type:"heic",
                        reason: result.heic.reason,
                        fileName: file.name
                    })
                }
                if (result.webp.status === 'fulfilled') {
                    webpFolder?.file(outputName + ".webp", result.webp.value)
                } else {
                    console.error(result.webp.reason)
                    errorArrays.push({
                        type:"webp",
                        reason: result.webp.reason,
                        fileName: file.name
                    })
                }

            })
            await Promise.all(tasks);
            const zipBlob = await zip.generateAsync({ type: "blob" });
            saveAs(zipBlob, "converted_images.zip");

        } finally {
            worker.terminate()
        }
        if (errorArrays.length > 1) {
            alert(JSON.stringify(errorArrays))
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

    <label for="images">images</label>
    <input
        type="file"
        name="images"
        multiple
        accept="image/png, image/jpeg"
        on:change={handleMultipleFilesChange}
    />

</div>
