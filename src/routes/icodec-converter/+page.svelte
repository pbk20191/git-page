<script module lang="ts">
  import { onDestroy, onMount, untrack } from "svelte";
  import * as Comlink from "comlink";
  import ICODEC from "$workers/icodecs?worker&url";
  import JSZip, { folder } from "jszip";
  import saveAs from "file-saver";
  import "@pbk20191/icodec";
  import Heic, { type HeicOption } from "$lib/encoderUI/heic.svelte";
  import Webp, { type WebpOption } from "$lib/encoderUI/webp.svelte";
  import Avif, { type AvifOption } from "$lib/encoderUI/avif.svelte";
  import { avif, heic, webp } from "@pbk20191/icodec";
  import { writable } from "svelte/store";
  import WEBPEncWASM from "@pbk20191/icodec/webp-enc.wasm?url";
  import AVIFEncWASM from "@pbk20191/icodec/avif-enc.wasm?url";
  import HEIFEncWASM from "@pbk20191/icodec/heic-enc.wasm?url";

  type ICodecWorker = Comlink.Remote<typeof import("$workers/icodecs")>;
  type FileIterator = AsyncGenerator<
    {
      fullPath: string;
      file: File;
    },
    void,
    unknown
  >;
  const store_key = "icodec_encoder_options";
</script>

<script lang="ts">
  let processing = $state(false);
  let store = $state({
    webp: { ...webp.defaultOptions },
    webpPreset: webp.WebPPreset.Default,
    avif: { ...avif.defaultOptions },
    heic: { ...heic.defaultOptions },
  } as {
    webp: webp.Options;
    avif: avif.Options;
    heic: heic.Options;
    webpPreset: webp.WebPPreset;
  });
  let readonlyWebpPreset = $derived(store.webpPreset);
  let lock_webpPreset = $state(true);
  let modules:Promise<[PromiseSettledResult<WebAssembly.Module>, PromiseSettledResult<WebAssembly.Module>, PromiseSettledResult<WebAssembly.Module>]>
  let wasmError = $state<string[]>([]);

  const WASM_MODULE_NAMES = ["WebP", "AVIF", "HEIC"];

  onMount(() => {

    modules = Promise.allSettled(
      [
    WebAssembly.compileStreaming(fetch(WEBPEncWASM)),
    WebAssembly.compileStreaming(fetch(AVIFEncWASM)),
    WebAssembly.compileStreaming(fetch(HEIFEncWASM)),
      ]
    )
    modules.then((a) => {
      const failed = a
        .map((result, i) => result.status === "rejected" ? WASM_MODULE_NAMES[i] : null)
        .filter((name): name is string => name !== null);
      if (failed.length > 0) {
        wasmError = failed;
      }

      if (a[0].status === "fulfilled") {
        const module = a[0].value;
        webp.loadEncoder(undefined, {
          instantiateWasm: (imports, callback) => {
            const instance = new WebAssembly.Instance(module, imports);
            callback(instance);
            return instance.exports;
          }
        });
      } 
    })


    // webp.loadEncoder(WEBPEncWASM);
    let value = window.localStorage.getItem(store_key);
    // lock_webpPreset = true;

    if (value) {
      let t = JSON.parse(value)

      store = t;

      lock_webpPreset = true;
    } else {
      lock_webpPreset = false;
    }
  });

    $effect(() => {
      const preset = readonlyWebpPreset;

      if (untrack(() => lock_webpPreset)) {
        untrack(() => {
          lock_webpPreset = false;
        });
        // console.log("preset locked, skipping webp config update");
        return;
      }
      // console.log("preset changed, updating webp config", preset, lock_webpPreset);
      const prop = untrack(() => $state.snapshot(store.webp));
      webp.loadEncoder(WEBPEncWASM).then(() => {
        const webpConfig = webp.preset(prop, preset);
        untrack(() => {
          store.webp = webpConfig || webp.defaultOptions;
        });

      })
  });
  async function processFiles(iterator: FileIterator) {
    // if (!files.length) return;
    const CONCURRENCY = navigator.hardwareConcurrency - 1 || 4;
    const total_workers = [] as Worker[];
    const total_interfaces = new Set() as Set<ICodecWorker>;
    const idle_interfaces = [] as ICodecWorker[];
    const wasmModules = await modules;
    let token:Promise<void> | null = null;
    if (true) {    
      let worker = new Worker(ICODEC, { type: "module" });
      total_workers.push(worker);
      const workerInterface = Comlink.wrap(worker) as ICodecWorker;
      idle_interfaces.push(workerInterface);
      total_interfaces.add(workerInterface);
       token  =  workerInterface.loadExternalWASM(
        (wasmModules[0] as PromiseFulfilledResult<WebAssembly.Module>).value,
        (wasmModules[1] as PromiseFulfilledResult<WebAssembly.Module>).value,
        (wasmModules[2] as PromiseFulfilledResult<WebAssembly.Module>).value,
      )
    }
    const pending_queue = [] as {
      id: number;
      promise: Promise<{ idx: number; worker: ICodecWorker }>;
    }[];

    const zip = new JSZip();
    // const heicFolder = zip.folder("heic");
    // const webpFolder = zip.folder("webp");
    // const avifFolder = zip.folder("avif");
    // const rootFolder = zip.folder("root");
    let errorArrays = [] as {
      type?: "avif" | "webp" | "heic";
      reason: any;
      fileName: string;
    }[];
    let jobs = 0;
    try {
      for await (const item of iterator) {
        if (token) {
          await token;
          token = null;
        }
        jobs += 1;
        const job_id = jobs;
        if (pending_queue.length >= CONCURRENCY) {
          const idleWorker = await Promise.race(
            pending_queue.map((x) => x.promise),
          );

          const fastestPending = pending_queue.findIndex(
            (x) => x.id === idleWorker.idx,
          );
          if (fastestPending != -1) {
            pending_queue.splice(fastestPending, 1);
          }
          idle_interfaces.push(idleWorker.worker);
        } else if (
          pending_queue.length < CONCURRENCY &&
          idle_interfaces.length === 0
        ) {
          let worker = new Worker(ICODEC, { type: "module" });
          const workerInterface = Comlink.wrap(worker) as ICodecWorker;
          await workerInterface.loadExternalWASM(
            (wasmModules[0] as PromiseFulfilledResult<WebAssembly.Module>).value,
            (wasmModules[1] as PromiseFulfilledResult<WebAssembly.Module>).value,
            (wasmModules[2] as PromiseFulfilledResult<WebAssembly.Module>).value,
          )
          total_interfaces.add(workerInterface);
          total_workers.push(worker);
          idle_interfaces.push(workerInterface);
        }

        let workerProxy = idle_interfaces.pop()!;
        const job = Promise.try(async () => {
          let file = item.file;

          try {
            const result = await workerProxy.encodeBitmap(
              Comlink.transfer(file, []),
              $state.snapshot(store),
            );

            const outputName = item.fullPath.replace(/\.[^/.]+$/, "");
            const components = outputName.split("/");
            // path to parent folder of outputName
            let folderPath = components.slice(0, -1).join("/") + "/";
            if (folderPath === '/') {
              folderPath = "";
            }
            const fileBaseName = components[components.length - 1];
            // console.log({ fileBaseName, folderPath, outputName, components });
            if (result.avif.status === "fulfilled") {
              zip.file(
                `${folderPath}avif/${fileBaseName}.avif`,
                result.avif.value,
              );
            } else {
              console.error(result.avif.reason);
              errorArrays.push({
                type: "avif",
                reason: result.avif.reason,
                fileName: item.fullPath,
              });
            }
            if (result.heic.status === "fulfilled") {
              zip.file(
                `${folderPath}heic/${fileBaseName}.heic`,
                result.heic.value,
              );
            } else {
              console.error(result.heic.reason);
              errorArrays.push({
                type: "heic",
                reason: result.heic.reason,
                fileName: item.fullPath,
              });
            }
            if (result.webp.status === "fulfilled") {
              zip.file(
                `${folderPath}webp/${fileBaseName}.webp`,
                result.webp.value,
              );
            } else {
              console.error(result.webp.reason);
              errorArrays.push({
                type: "webp",
                reason: result.webp.reason,
                fileName: item.fullPath,
              });
            }
          } catch (error) {
            console.error(error);
            errorArrays.push({
              reason: error,
              fileName: item.fullPath,
            });
          }

          return { idx: job_id, worker: workerProxy };
        });
        pending_queue.push({
          id: job_id,
          promise: job,
        });
      }
      await Promise.allSettled(pending_queue.map((x) => x.promise));
    } finally {
      // console.log(total_interfaces, total_workers)
      for (const proxy of total_interfaces) {
        proxy[Comlink.releaseProxy]();
      }
      await new Promise((a, b) => {
        setTimeout(a);
      })
      for (const worker of total_workers) {
        worker.terminate();
      }
      // worker.terminate();
    }
    if (jobs != 0) {
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, "converted_images.zip");
    }
    if (errorArrays.length > 0) {
      alert(JSON.stringify(errorArrays));
    }
  }

  async function handleMultipleFilesChange(
    event: Event & { currentTarget: EventTarget & HTMLInputElement },
  ) {
    const files = Array.from(
      (event.currentTarget as HTMLInputElement).files ?? [],
    );
    const iterator = (async function* () {
      for (const file of files) {
        yield {
          file,
          fullPath: file.name,
        };
      }
    })();
    try {
      processing = true;

      await processFiles(iterator);
    } finally {
      processing = false;
    }
  }

  function onApply(e: MouseEvent) {
    window.localStorage.setItem(
      "icodec_encoder_options",
      JSON.stringify($state.snapshot(store)),
    );
  }
  function dragover(e: DragEvent) {
    if (
      !processing && e.dataTransfer && e.dataTransfer.types.length > 0 &&
      e.dataTransfer.types[0] === "Files"
    ) {
      e.preventDefault();
    }
  }
  async function filedrop(e: DragEvent) {
    const itemList = e.dataTransfer?.items;
    if (!itemList || itemList.length == 0) {
      return;
    }
    if (processing) {
      return;
    }
    e.preventDefault();

    let dirEntries = [] as FileSystemDirectoryEntry[];
    const asyncIterator = (async function* () {
      let buffer = [] as FileSystemFileEntry[];
      for (let i = 0; i < itemList.length; i++) {
        const item = itemList[i];
        const entry = item.webkitGetAsEntry();
        if (entry) {
          if (entry.isDirectory) {
            dirEntries.push(entry as FileSystemDirectoryEntry);
          } else if (entry.isFile) {
            buffer.push(entry as FileSystemFileEntry);
          }
        }
      }
      for (const fileEntry of buffer) {
        yield fileEntry;
      }
      while (dirEntries.length > 0) {
        const entry2 = dirEntries.pop()!;
        let reader = entry2.createReader();
        const result = await new Promise<FileSystemEntry[]>(
          (resolve, reject) => {
            reader.readEntries(resolve, reject);
          },
        );
        for (const child of result) {
          const isDirectory = child.isDirectory;
          const isFile = child.isFile;
          if (isFile === true) {
            yield child as FileSystemFileEntry;
          } else if (isDirectory === true) {
            dirEntries.push(child as FileSystemDirectoryEntry);
          }
        }
      }
    })();
    const asyncIterator2 = (async function* () {
      for await (const value of asyncIterator) {
        const prop = await new Promise<File>((resolve, reject) => {
          value.file(resolve, reject);
        });
        if (!prop.type.startsWith("image/")) {
          continue;
        }
        yield { fullPath: value.fullPath.substring(1), file: prop };
      }
    })();
    processing = true;
    try {
      await processFiles(asyncIterator2);
    } finally {
      processing = false;
    }
  }
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="Converter for heif" />
</svelte:head>

<div class="container">
  <!-- 경고 -->
  <div class="section">
    {#if wasmError.length > 0}
      ❌ WebAssembly module compile failed: {wasmError.join(", ")}. File processing is unavailable.
    {:else if processing}
      Processing
    {:else}
      ⚠️ This is pretty slow
    {/if}
  </div>
    
    <!-- {#if !_crossOriginIsolated}
    <div class="section">
      crossOriginIsolation not validated, HEIC encoding won't work, plz refresh the page
      </div>
    {/if} -->
  

  <div
    class="drop-zone"
    role="region"
    ondrop={filedrop}
    ondragover={dragover}
    aria-label="file-drop-zone"
  ></div>
  <!-- 업로드 -->
  <div class="section">
    <div class="field">
      <label for="icodec-images">images</label>
      <input
        disabled={processing}
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
        <Webp bind:value={store.webp} bind:preset={store.webpPreset} />
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
    <button disabled={processing} onclick={onApply}>save config in local</button
    >
  </div>
</div>

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
  details + details {
    margin-top: 0.6rem;
  }
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
  details[open] summary::after {
    transform: rotate(90deg);
  }
  .body {
    margin-top: 0.6rem;
  }
  button {
    padding: 0.5rem 0.9rem;
    border: none;
    border-radius: 6px;
    background: #2d7ef7;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
  }

  .drop-zone {
    border: 3px dashed #aaa;
    border-radius: 12px;
    padding: 40px;
    text-align: center;
    color: #666;
    transition: background 0.2s;
  }
  .drop-zone:hover {
    background: #f8f8f8;
  }
</style>
