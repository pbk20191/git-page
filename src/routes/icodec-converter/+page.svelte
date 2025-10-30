<script lang="ts">
    import { onDestroy } from "svelte";
    import * as Comlink from "comlink";
    import ICODEC from "$workers/icodecs?worker&url";
    import JSZip from "jszip";
    import saveAs from "file-saver";
    import "icodec";

    async function handleMultipleFilesChange(event: Event) {
        const files = Array.from(
            (event.target as HTMLInputElement).files ?? [],
        );
        if (!files.length) return;
        const worker = new Worker(ICODEC, { type: "module" });
        const pool = Comlink.wrap<typeof import("$workers/icodecs")>(worker);
        const zip = new JSZip();
            
        try {
            const tasks = files.map(async (file) => {
                try {
                    if (
                        file.type === "image/heic" ||
                        file.type === "image/heif"
                    ) {
                        console.warn(
                            `Skipping ${file.name} as it is already in HEIC format.`,
                        );
                        // const buffer = await file.arrayBuffer();
                        zip.file(file.name, file);
                        return;
                    }
                    let bitmap = await createImageBitmap(file);
                    const result = await pool.bitmapToHEIC(
                        Comlink.transfer(bitmap, [bitmap]),
                    );

                    const outputName =
                        file.name.replace(/\.[^/.]+$/, "") + ".heic";
                    zip.file(outputName, result);
                } catch (err) {
                    console.error(`Error processing file ${file.name}:`, err);
                }
            });

            await Promise.all(tasks);

            const zipBlob = await zip.generateAsync({ type: "blob" });
            saveAs(zipBlob, "converted_images.zip");
        } finally {
            worker.terminate();
        }
    }
        async function handleMultipleFilesChange1(event: Event) {
        const files = Array.from(
            (event.target as HTMLInputElement).files ?? [],
        );
        if (!files.length) return;
        const worker = new Worker(ICODEC, { type: "module" });
        const pool = Comlink.wrap<typeof import("$workers/icodecs")>(worker);
        const zip = new JSZip();
            
        try {
            const tasks = files.map(async (file) => {
                try {
                    if (
                        file.type === "image/webp"
                    ) {
                        console.warn(
                            `Skipping ${file.name} as it is already in webp format.`,
                        );
                        // const buffer = await file.arrayBuffer();
                        zip.file(file.name, file);
                        return;
                    }
                    let bitmap = await createImageBitmap(file);
                    const result = await pool.bitmapToWEBP(
                        Comlink.transfer(bitmap, [bitmap]),
                    );

                    const outputName =
                        file.name.replace(/\.[^/.]+$/, "") + ".webp";
                    zip.file(outputName, result);
                } catch (err) {
                    console.error(`Error processing file ${file.name}:`, err);
                }
            });

            await Promise.all(tasks);

            const zipBlob = await zip.generateAsync({ type: "blob" });
            saveAs(zipBlob, "converted_images.zip");
        } finally {
            worker.terminate();
        }
    }
        async function handleMultipleFilesChange2(event: Event) {
        const files = Array.from(
            (event.target as HTMLInputElement).files ?? [],
        );
        if (!files.length) return;
        const worker = new Worker(ICODEC, { type: "module" });
        const pool = Comlink.wrap<typeof import("$workers/icodecs")>(worker);
        const zip = new JSZip();
            
        try {
            const tasks = files.map(async (file) => {
                try {
                    if (
                        file.type === "image/avif"
                    ) {
                        console.warn(
                            `Skipping ${file.name} as it is already in AVIF format.`,
                        );
                        // const buffer = await file.arrayBuffer();
                        zip.file(file.name, file);
                        return;
                    }
                    let bitmap = await createImageBitmap(file);
                    const result = await pool.bitmapToAVIF(
                        Comlink.transfer(bitmap, [bitmap]),
                    );

                    const outputName =
                        file.name.replace(/\.[^/.]+$/, "") + ".avif";
                    zip.file(outputName, result);
                } catch (err) {
                    console.error(`Error processing file ${file.name}:`, err);
                }
            });

            await Promise.all(tasks);

            const zipBlob = await zip.generateAsync({ type: "blob" });
            saveAs(zipBlob, "converted_images.zip");
        } finally {
            worker.terminate();
        }
    }
</script>

<svelte:head>
    <title>About</title>
    <meta name="description" content="Converter for heif" />
</svelte:head>

<div>
    <span>  상당히 느립니다.</span>
    <label for="heic">HEIC</label>
    <input
        type="file"
        name="heif"
        multiple
        accept="image/*"
        on:change={handleMultipleFilesChange}
    />
    <label for="webp">WEBP</label>
    <input
        type="file"
        name="webp"
        multiple
        accept="image/*"
        on:change={handleMultipleFilesChange1}
    />
    <label for="avif">AVIF</label>
    <input
        type="file"
        name="avif"
        multiple
        accept="image/*"
        on:change={handleMultipleFilesChange2}
    />
</div>
