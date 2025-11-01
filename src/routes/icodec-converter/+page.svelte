<script module lang="ts">
    import { onDestroy, onMount } from "svelte";
    import * as Comlink from "comlink";
    import ICODEC from "$workers/icodecs?worker&url";
    import JSZip from "jszip";
    import saveAs from "file-saver";
    import "icodec";
    import Heic, { type HeicOption } from "$lib/encoderUI/heic.svelte";
    import Webp, { type WebpOption } from "$lib/encoderUI/webp.svelte";
    import Avif, {type AvifOption} from "$lib/encoderUI/avif.svelte";
    import { avif, heic, webp } from "icodec";
    import { writable } from "svelte/store";


    const store_key = "icodec_encoder_options"
</script>
<script lang="ts">

    let store = $state({
        webp: {...webp.defaultOptions},
        avif: { ...avif.defaultOptions},
        heic: {...heic.defaultOptions}
    } as {
        webp:webp.Options,
        avif:avif.Options,
        heic:heic.Options
    })
    onMount(() => {
        let value = window.localStorage.getItem(store_key)
        if (value) {
            store = JSON.parse(value)
        }
    })
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
                    Comlink.transfer(bitmap, [bitmap]), $state.snapshot(store)
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

    async function handleMultipleFilesChange(event: Event & { currentTarget: EventTarget & HTMLInputElement; }) {
        const files = Array.from(
            (event.currentTarget as HTMLInputElement).files ?? [],
        );
        processFiles(files)
      
    }

    let a = $state({...avif.defaultOptions})

    function onApply(e:MouseEvent ) {
        window.localStorage.setItem("icodec_encoder_options",JSON.stringify($state.snapshot(store)))
    }
</script>

<svelte:head>
    <title>About</title>
    <meta name="description" content="Converter for heif" />
</svelte:head>

<div>  
    <span>  상당히 느립니다.</span>
    <label for="images">images</label>
    <input
        type="file"
        name="images"
        multiple
        accept="image/png, image/jpeg"
        onchange={handleMultipleFilesChange}
    />
    <Webp bind:value={store.webp} />
    <Heic bind:value={store.heic}/>
    <Avif bind:value={store.avif}/>
    <button onclick={onApply}>save config in local</button>
</div>
