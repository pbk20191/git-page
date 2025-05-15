<svelte:head>
    <title>About</title>
    <meta name="description" content="Converter for heif" />
</svelte:head>
<script lang="ts">

    import { pool as workerPool } from "workerpool"
    import {type EncodeImageResult, type DecodeImageResult} from "elheif";
    import HEICWorker from '$lib/components/heic.worker?worker&url'
    const pool = workerPool(HEICWorker, { workerOpts: { type: 'module' } })
    let file: File | null = null
    let downloadUrl: string | null = null
    let previewCanvas:HTMLCanvasElement

    function base64ToArrayBuffer(base64: string) {
        var binaryString = atob(base64);
        var bytes = new Uint8Array(binaryString.length);
        for (var i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }

    function loadHeicImage() {
        const DATA =
            "AAAAHGZ0eXBoZWljAAAAAG1pZjFoZWljbWlhZgAAApRtZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAANGlsb2MAAAAAREAAAgABAAAAAAK4AAEAAAAAAAAAMgACAAAAAALqAAEAAAAAAAAAIwAAADhpaW5mAAAAAAACAAAAFWluZmUCAAAAAAEAAGh2YzEAAAAAFWluZmUCAAAAAAIAAGh2YzEAAAAB02lwcnAAAAGsaXBjbwAAAHZodmNDAQNwAAAAAAAAAAAAHvAA/P34+AAADwMgAAEAGEABDAH//wNwAAADAJAAAAMAAAMAHroCQCEAAQAqQgEBA3AAAAMAkAAAAwAAAwAeoCCBBZbqrprm4CGgwIAAAAMAgAAAAwCEIgABAAZEAcFzwYkAAAAUaXNwZQAAAAAAAABAAAAAQAAAAChjbGFwAAAACgAAAAEAAAAKAAAAAf///8oAAAAC////ygAAAAIAAAAQcGl4aQAAAAADCAgIAAAAcWh2Y0MBBAgAAAAAAAAAAAAe8AD8/Pj4AAAPAyAAAQAXQAEMAf//BAgAAAMAn/gAAAMAAB66AkAhAAEAJkIBAQQIAAADAJ/4AAADAAAewIIEFluqumubAgAAAwACAAADAAIQIgABAAZEAcFzwYkAAAAUaXNwZQAAAAAAAABAAAAAQAAAAChjbGFwAAAACgAAAAEAAAAKAAAAAf///8oAAAAC////ygAAAAIAAAAOcGl4aQAAAAABCAAAACdhdXhDAAAAAHVybjptcGVnOmhldmM6MjAxNTphdXhpZDoxAAAAAB9pcG1hAAAAAAAAAAIAAQSBAoMEAAIFhQaHCIkAAAAaaXJlZgAAAAAAAAAOYXV4bAACAAEAAQAAAF1tZGF0AAAALigBrxMhYmNA9Sci//75Mn/pHyf9QdlhZ3K6wVvy+sD2ZJvA86qRnoCHaacwFXgAAAAfKAGuJkJKJOfXDbP+G8cXYVVzU7JsIGJEKRKAY/X0rg==";
        return base64ToArrayBuffer(DATA)
    }

    async function encodeToHeif(buffer: Uint8ClampedArray, width: number, height: number) {
        const result: EncodeImageResult = await pool.exec('jsEncodeImage', [
            buffer,
            width,
            height,
        ])
        return result
    }

    async function decodeHeif(buffer: Uint8Array) {
        const result:DecodeImageResult = await pool.exec('jsDecodeImage', [buffer])
        return result
    }

    async function handleFileChange(e: Event) {
        file = (e.target as HTMLInputElement).files?.[0] ?? null
        if (!file) return

        const bitmap = await createImageBitmap(file)
        const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(bitmap, 0, 0)
        const imageData = ctx.getImageData(0, 0, bitmap.width, bitmap.height)

        const result: EncodeImageResult = await encodeToHeif(
            imageData.data,
            imageData.width,
            imageData.height,
        )
        console.log("received result", result)
        // result.data.buffer
        const blob = new Blob([result.data], { type: 'image/heic' })
        downloadUrl = URL.createObjectURL(blob)
    }
    async function decodeSampleImage() {
        // const response = await fetch("/example.heic")
        // const buffer = new Uint8Array(await response.arrayBuffer())
        
        const buffer = loadHeicImage()
        console.log("window input decodeSampleImage",buffer)
        const result: DecodeImageResult = await decodeHeif(buffer)
        console.log("decodeSampleImage" , result)
        const ctx = previewCanvas.getContext('2d')!
        // const bitmap = heif_module.decode(buffer, buffer.length, true)
        previewCanvas.width = 10
        previewCanvas.height = 10
        const imageData = new ImageData(new Uint8ClampedArray(result.data[0].data), 10, 10)
        ctx.putImageData(imageData, 0, 0)
    }
</script>

<div class="text-column">
    <h1>About this app</h1>
    <input type="file" accept="image/*" on:change={handleFileChange} />
    <button on:click={decodeSampleImage}>샘플 HEIC 디코딩 보기</button>
    <br />
    <canvas bind:this={previewCanvas} style="border: 1px solid #ccc; margin-top: 1rem;" />
    {#if downloadUrl}
        <p><a href={downloadUrl} download="converted.heic">Download HEIC</a></p>
    {/if}
</div>