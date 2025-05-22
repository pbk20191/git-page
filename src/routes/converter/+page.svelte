<svelte:head>
    <title>About</title>
    <meta name="description" content="Converter for heif" />
</svelte:head>

<script lang="ts">
    import { pool as workerPool } from "workerpool"
    // import type { EncodeImageResult, DecodeImageResult } from "elheif"
    import HEICWorker from '$lib/components/heic.worker?worker&url'

    // const pool = workerPool(HEICWorker, { workerOpts: { type: 'module' } })
    
import { avif, heic } from "icodec";

import { worker } from 'workerpool'
// importScripts('workerpool.js');
// importScripts('https://cdn.jsdelivr.net/gh/hpp2334/elheif@main/pkg/elheif.js');
//
import AVIFEncWASM from "icodec/avif-enc.wasm?url";
import AvifDecWASM from "icodec/avif-dec.wasm?url";
import HeicEncWASM from "icodec/heic-enc.wasm?url";
import HeicDecWASM from "icodec/heic-dec.wasm?url";
// var k = import("icodec/dist")
// console.log("k", k)
// console.log("p", p)
// import AVIFEncjs from "icodec/avif-enc.js?url";
// import AvifDecjs from "icodec/avif-dec.js?url";
// import HeicEncjs from "icodec/heic-enc.js?url";
// import HeicDecjs from "icodec/heic-dec.js?url";

let initialized = false;
async function initIfNeeded() {
    if (!initialized) {
        // elheif가 전역으로 등록되었을 것
        await Promise.all(
            [
                // avif.loadDecoder(AvifDecWASM),
                // avif.loadEncoder(AVIFEncWASM),
                heic.loadDecoder(HeicDecWASM),
                heic.loadEncoder(HeicEncWASM),
            ]
        )
        initialized = true;
    }
}


    let file: File | null = null
    let downloadUrl: string | null = null
    let previewCanvas: HTMLCanvasElement
    let previewState: 'original' | 'encoded' | null = null

    function base64ToArrayBuffer(base64: string) {
        const binary = atob(base64)
        const bytes = new Uint8Array(binary.length)
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
        return bytes
    }


    async function decodeHeif(buffer: BufferSource) {
        await initIfNeeded()
        return heic.decode(buffer)
        // const result: ImageData = await pool.exec('jsDecodeImage', [buffer])
        // return result
    }

    async function encodeToHeif(buffer: Uint8ClampedArray, width: number, height: number) {
        await initIfNeeded()
        return await heic.encode({
            data: buffer,
            width, height,  depth: 8,
        })
        
        // const result: Uint8Array = await pool.exec('jsEncodeImage', [buffer, width, height])
        // return result
    }

    async function drawImageDataOnCanvas(data: ImageData) {
        previewCanvas.width = data.width
        previewCanvas.height = data.height
        const ctx = previewCanvas.getContext('2d')!
        ctx.putImageData(data, 0, 0)
    }

    async function handleFileChange(e: Event) {
        file = (e.target as HTMLInputElement).files?.[0] ?? null
        if (!file) return

        const bitmap = await createImageBitmap(file)
        const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(bitmap, 0, 0)
        const imageData = ctx.getImageData(0, 0, bitmap.width, bitmap.height)

        // 원본 미리보기
        await drawImageDataOnCanvas(imageData)
        previewState = 'original'

        const result = await encodeToHeif(
            imageData.data,
            imageData.width,
            imageData.height
        )
        console.log("received result", result)
        const blob = new Blob([result], { type: 'image/heic' })
        downloadUrl = URL.createObjectURL(blob)

        // 디코딩해서 다시 표시
        const redecoded = await decodeHeif(result)
        // const img = redecoded.data[0]
        await drawImageDataOnCanvas(redecoded)
        previewState = 'encoded'
    }

    async function decodeSampleImage() {
        // const buffer = loadHeicImage()
        // const result = await decodeHeif(buffer)
        // const img = result.data[0]
        // await drawImageDataOnCanvas(img.data, img.width, img.height)
        // previewState = 'original'
    }
</script>

<div class="text-column">
    <h1>HEIC 변환기</h1>
    <input type="file" accept="image/*" on:change={handleFileChange} />
    <button on:click={decodeSampleImage}>샘플 HEIC 디코딩</button>

    <canvas bind:this={previewCanvas} style="border: 1px solid #ccc; margin-top: 1rem;" />

    {#if previewState}
        <p>현재 상태: {previewState === 'original' ? '원본 이미지' : '변환된 HEIC 결과'}</p>
    {/if}

    {#if downloadUrl}
        <p><a href={downloadUrl} download="converted.heic">Download HEIC</a></p>
    {/if}
</div>