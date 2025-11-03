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
        if (errorArrays.length > 0) {
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

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-family: system-ui, sans-serif;
    font-size: 0.95rem;
  }
  .section {
    padding: 1rem;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    background: #fafafa;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  details {
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
    padding: 0.6rem 0.8rem;
  }
  details + details { margin-top: 0.6rem; }
  details summary {
    cursor: pointer;
    list-style: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  details summary::after {
    content: "▸";
    font-size: 0.8rem;
    transition: transform 0.2s;
  }
  details[open] summary::after { transform: rotate(90deg); }
  .body { margin-top: 0.6rem; }
  button {
    padding: 0.5rem 0.9rem;
    border: none;
    border-radius: 6px;
    background: #2d7ef7;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
  }
</style>

<div class="container">
  <!-- 경고 -->
  <div class="section">⚠️ 상당히 느립니다.</div>

  <!-- 업로드 -->
  <div class="section">
    <div class="field">
      <label for="icodec-images">images</label>
      <input
        type="file"
        id="icodec-images"
        multiple
        accept="image/png, image/jpeg"
        onchange={handleMultipleFilesChange}
      />
    </div>
  </div>

  <!-- 포맷 섹션들: 접기만 -->
  <div class="section">
    <details>
      <summary>WEBP</summary>
      <div class="body">
        <Webp bind:value={store.webp} />
      </div>
    </details>

    <details>
      <summary>HEIC</summary>
      <div class="body">
        <Heic bind:value={store.heic} />
      </div>
    </details>

    <details>
      <summary>AVIF</summary>
      <div class="body">
        <Avif bind:value={store.avif} />
      </div>
    </details>
  </div>

  <!-- 전역 저장 -->
  <div class="section">
    <button onclick={onApply}>save config in local</button>
  </div>
</div>