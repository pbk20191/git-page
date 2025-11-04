<script module lang="ts">
  import { onDestroy, onMount } from "svelte";
  import * as Comlink from "comlink";
  import ICODEC from "$workers/icodecs?worker&url";
  import JSZip from "jszip";
  import saveAs from "file-saver";
  import "icodec";
  import Heic, { type HeicOption } from "$lib/encoderUI/heic.svelte";
  import Webp, { type WebpOption } from "$lib/encoderUI/webp.svelte";
  import Avif, { type AvifOption } from "$lib/encoderUI/avif.svelte";
  import { avif, heic, webp } from "icodec";
  import { writable } from "svelte/store";
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
  let store = $state({
    webp: { ...webp.defaultOptions },
    avif: { ...avif.defaultOptions },
    heic: { ...heic.defaultOptions },
  } as {
    webp: webp.Options;
    avif: avif.Options;
    heic: heic.Options;
  });
  onMount(() => {
    let value = window.localStorage.getItem(store_key);
    if (value) {
      store = JSON.parse(value);
    }
  });
  async function processFiles(iterator: FileIterator) {
    // if (!files.length) return;
    const worker = new Worker(ICODEC, { type: "module" });
    const pool = Comlink.wrap<typeof import("$workers/icodecs")>(worker);
    const zip = new JSZip();
    const heicFolder = zip.folder("heic");
    const webpFolder = zip.folder("webp");
    const avifFolder = zip.folder("avif");
    let errorArrays = [] as {
      type: "avif" | "webp" | "heic";
      reason: any;
      fileName: string;
    }[];
    let jobs = 0;

    try {
      for await (const item of iterator) {
        let file = item.file;
        jobs += 1;
        let bitmap = await createImageBitmap(file);
        const result = await pool.encodeBitmap(
          Comlink.transfer(bitmap, [bitmap]),
          $state.snapshot(store),
        );

        const outputName = item.fullPath.replace(/\.[^/.]+$/, "");
        console.log(outputName, result)
        if (result.avif.status === "fulfilled") {
          avifFolder?.file(outputName + ".avif", result.avif.value);
        } else {
          console.error(result.avif.reason);
          errorArrays.push({
            type: "avif",
            reason: result.avif.reason,
            fileName: item.fullPath,
          });
        }
        if (result.heic.status === "fulfilled") {
          heicFolder?.file(outputName + ".heic", result.heic.value);
        } else {
          console.error(result.heic.reason);
          errorArrays.push({
            type: "heic",
            reason: result.heic.reason,
            fileName: item.fullPath,
          });
        }
        if (result.webp.status === "fulfilled") {
          webpFolder?.file(outputName + ".webp", result.webp.value);
        } else {
          console.error(result.webp.reason);
          errorArrays.push({
            type: "webp",
            reason: result.webp.reason,
            fileName: item.fullPath,
          });
        }
      }
    } finally {
      worker.terminate();
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
          fullPath: file.name
        }
      }
    })()
    await processFiles(iterator);
  }

  let a = $state({ ...avif.defaultOptions });

  function onApply(e: MouseEvent) {
    window.localStorage.setItem(
      "icodec_encoder_options",
      JSON.stringify($state.snapshot(store)),
    );
  }
  function dragover(e: DragEvent) {
    if (
      e.dataTransfer?.dropEffect === "copy" &&
      e.dataTransfer.types.length > 0 &&
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
    e.preventDefault();
    console.log("filedrop", itemList.length);
    for (let item in itemList) {
      itemList;
    }
    let dirEntries = [] as FileSystemDirectoryEntry[];
    const asyncIterator = (async function* () {
      for (let i = 0; i < itemList.length; i++) {
        const item = itemList[i];
        const entry = item.webkitGetAsEntry();
        if (entry) {
          if (entry.isDirectory) {
            dirEntries.push(entry as FileSystemDirectoryEntry);
          } else if (entry.isFile) {
            yield entry as FileSystemFileEntry;
          }
        }
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
        yield { fullPath:  value.fullPath.substring(1), file: prop };
      }
    })();
    await processFiles(asyncIterator2)
  }
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="Converter for heif" />
</svelte:head>

<div class="container">
  <!-- 경고 -->
  <div class="section">⚠️ 상당히 느립니다.</div>
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
