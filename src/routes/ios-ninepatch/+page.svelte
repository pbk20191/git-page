<script lang="ts">
    import * as Comlink from "comlink";
    import WORKER_URL from "$workers/XcodeNinePatchRenderer?worker&url";
    import type { XocdeNinePatchWorker } from "$workers/XcodeNinePatchRenderer";
    import { onDestroy } from "svelte";
    import JSZip from "jszip";
    import { saveAs } from "file-saver";
    let canvasEl: HTMLCanvasElement;
    import type { ChangeEventHandler } from "svelte/elements";

    // UI state
    let scale: 1 | 2 | 3 = $state(3);
    let mode: "9-part" | "3-part-horizontal" | "3-part-vertical" =
        $state("9-part");
    let centerMode: "tile" | "stretch" = $state("stretch");
    let fileName: null | string = null;
    let insets = $state({ left: 0, right: 0, top: 0, bottom: 0 });
    let dragging = false as false | keyof typeof insets;
    let worker: Worker | null = null;
    let workerProxy: Comlink.Remote<XocdeNinePatchWorker> | null = null;
    onDestroy(() => {
        worker?.terminate();
        worker = null;
        workerProxy = null;
    });
    async function ensureWorker() {
        if (workerProxy) return workerProxy;
        const _worker = new Worker(WORKER_URL, { type: "module" });
        worker = _worker;
        workerProxy = Comlink.wrap(_worker);

        // transfer the canvas
        const off = canvasEl.transferControlToOffscreen();
        await workerProxy.attach(Comlink.transfer(off, [off]));
        return workerProxy;
    }

    async function onFile(e: Event) {
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;
        if (file.type !== "image/png") {
            alert("Please select a PNG file");
            return;
        }
        fileName = file.name.replace(/@[\dx]+(?=\.png$)|\.png$/g, "");
        if (file.name.endsWith("@3x.png")) {
            scale = 3;
        } else if (file.name.endsWith("@2x.png")) {
            scale = 2;
        } else if (file.name.endsWith("@1x.png")) {
            scale = 1;
        }
        // Decode to ImageBitmap for efficient transfer
        const bmp = await createImageBitmap(file, {
            colorSpaceConversion: "none",
            premultiplyAlpha: "premultiply",
        });

        const wp = await ensureWorker();

        await wp.setSource(Comlink.transfer(bmp, [bmp]), scale);

        // Initialize default insets (center area non-zero)
        const st = await wp.getState();
        insets = {
            left: Math.round(st.canvasW * 0.2),
            right: Math.round(st.canvasW * 0.2),
            top: Math.round(st.canvasH * 0.2),
            bottom: Math.round(st.canvasH * 0.2),
        };

        await wp.setInsets($state.snapshot(insets), "right", "bottom");
    }

    async function onScaleChange() {
        if (!workerProxy) return;
        await workerProxy.setScale(scale);
        const st = await workerProxy.getState();
        // re-clamp current insets relative to new canvas size
        insets.left = Math.min(insets.left, st.canvasW - 1);
        insets.right = Math.min(insets.right, st.canvasW - 1);
        insets.top = Math.min(insets.top, st.canvasH - 1);
        insets.bottom = Math.min(insets.bottom, st.canvasH - 1);

        await workerProxy.setInsets($state.snapshot(insets), "right", "bottom");
    }

    function canvasPoint(ev: MouseEvent) {
        const rect = canvasEl.getBoundingClientRect();
        const x = Math.max(0, Math.min(ev.clientX - rect.left, rect.width));
        const y = Math.max(0, Math.min(ev.clientY - rect.top, rect.height));
        // canvas is pixel-perfect scaled in CSS (no scaling). If you scale via CSS, convert to backing store:
        const scaleX = canvasEl.width / rect.width;
        const scaleY = canvasEl.height / rect.height;
        return { x: Math.round(x * scaleX), y: Math.round(y * scaleY) };
    }

    async function onDown(ev: MouseEvent) {
        if (!workerProxy) return;
        const { x, y } = canvasPoint(ev);

        // ask worker which edge is closest
        const edge = await workerProxy.queryNearestEdge(x, y);
        if (
            mode == "3-part-horizontal" &&
            (edge === "top" || edge === "bottom")
        ) {
            return;
        }
        if (
            mode == "3-part-vertical" &&
            (edge === "left" || edge === "right")
        ) {
            return;
        }
        dragging = edge;
        await onMove(ev); // update immediately
    }

    async function onMove(ev: MouseEvent) {
        if (!dragging || !workerProxy) return;
        const { x, y } = canvasPoint(ev);
        const st = await workerProxy.getState();

        if (dragging === "left") {
            insets.left = Math.max(0, Math.min(x, st.canvasW - 1));
        } else if (dragging === "right") {
            insets.right = Math.max(
                0,
                Math.min(st.canvasW - x, st.canvasW - 1),
            );
        } else if (dragging === "top") {
            insets.top = Math.max(0, Math.min(y, st.canvasH - 1));
        } else if (dragging === "bottom") {
            insets.bottom = Math.max(
                0,
                Math.min(st.canvasH - y, st.canvasH - 1),
            );
        }

        // Keep center positive
        if (insets.left + insets.right >= st.canvasW) {
            insets.right = Math.max(0, st.canvasW - insets.left - 1);
        }
        if (insets.top + insets.bottom >= st.canvasH) {
            insets.bottom = Math.max(0, st.canvasH - insets.top - 1);
        }

        await workerProxy.setInsets($state.snapshot(insets));
    }

    function onUp() {
        dragging = false;
    }

    async function exportResizingInfo() {
        if (!workerProxy) return;
        if (!fileName) return;
        const filename = fileName!;
        const info = await workerProxy.exportAsset(filename);
        const zip = new JSZip();
        const folder = zip.folder(`${filename}.imageset`)!;
        folder.file(`${filename}@3x.png`, info.image3x);
        folder.file(`${filename}@2x.png`, info.image2x);
        folder.file(`${filename}@1x.png`, info.image1x);
        folder.file("Contents.json", JSON.stringify(info.contents));
        const outfile = await zip.generateAsync({ type: "blob" });
        saveAs(outfile, "Demo.zip");
        // alert('ResizingInfo copied to clipboard!');
    }

    function validInsetDescription() {
        if (mode === "3-part-horizontal") {
            return `
        left:${insets.left}, right:${insets.right}
        `;
        } else if (mode === "3-part-vertical") {
            return `
        top:${insets.top}, bottom:${insets.bottom}
        `;
        }
        return `
    left:${insets.left}, right:${insets.right}
    top:${insets.top}, bottom:${insets.bottom}
    `;
    }

    $effect(() => {
        if (workerProxy) {
            workerProxy.setMode(mode, centerMode);
        }
    });
    async function onChangeInsetByInput(
        event: Parameters<ChangeEventHandler<HTMLInputElement>>[0],
        mode: "left" | "right" | "top" | "bottom",
    ) {
        console.log(
            "onChangeInsetByInput",
            insets.left,
            event.currentTarget.value,
            mode,
        );
        if (!workerProxy) {
            return;
        }
        if (mode === "left") {
            await workerProxy.setInsets(
                { left: insets.left },
                "right",
                "bottom",
            );
        } else if (mode === "right") {
            await workerProxy.setInsets(
                { right: insets.right },
                "left",
                "bottom",
            );
        } else if (mode === "bottom") {
            await workerProxy.setInsets(
                { bottom: insets.bottom },
                "right",
                "top",
            );
        } else if (mode === "top") {
            await workerProxy.setInsets({ top: insets.top }, "right", "bottom");
        }
        insets = (await workerProxy.getState()).insets;
    }
</script>

<main
    class="container"
    style="max-width: 980px; margin: 24px auto; padding: 16px;"
>
    <h1
        style="font: 600 20px/1.2 system-ui, -apple-system, sans-serif; margin-bottom: 16px;"
    >
        iOS Nine-Patch Resizer (OffscreenCanvas + Comlink)
    </h1>

    <section
        style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 12px;"
    >
        <label>
            PNG File
            <input
                name="xcode_png_ninepatch_input"
                type="file"
                accept="image/png"
                onchange={onFile}
            />
        </label>

        <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <label>
                Source Scale
                <select
                    name="source_scale"
                    bind:value={scale}
                    onchange={onScaleChange}
                >
                    <option value={1}>1x</option>
                    <option value={2}>2x</option>
                    <option value={3}>3x</option>
                </select>
            </label>

            <label>
                Resizing Mode
                <select name="resizing_mode" bind:value={mode}>
                    <option value="9-part">9-part</option>
                    <option value="3-part-horizontal">3-part-horizontal</option>
                    <option value="3-part-vertical">3-part-vertical</option>
                </select>
            </label>

            <label>
                Center Mode
                <select name="center_mode" bind:value={centerMode}>
                    <option value="stretch">stretch</option>
                    <option value="tile">tile</option>
                </select>
            </label>

            <button onclick={exportResizingInfo}>Export ResizingInfo</button>
        </div>
    </section>

    <section>
        <canvas
            bind:this={canvasEl}
            width="1"
            height="1"
            style="width: 100%; height: auto; image-rendering: crisp-edges; border: 1px solid #ddd; border-radius: 8px;"
            onmousedown={onDown}
            onmousemove={onMove}
            onmouseup={onUp}
            onmouseleave={onUp}
        ></canvas>

        <div
            style="margin-top:8px; font: 12px/1.3 ui-monospace, SFMono-Regular, Menlo, monospace;"
        >
            insets: {validInsetDescription()}
        </div>

        <fieldset
            style="
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 8px 12px;
  "
        >
            <label style="display: flex; flex-direction: column;">
                Left
                <input
                    name="left_inset"
                    type="number"
                    min="0"
                    step="1"
                    disabled={mode == "3-part-vertical"}
                    onchange={(e) => onChangeInsetByInput(e, "left")}
                    bind:value={insets.left}
                />
            </label>

            <label style="display: flex; flex-direction: column;">
                Right
                <input
                    name="right_inset"
                    type="number"
                    min="0"
                    step="1"
                    disabled={mode == "3-part-vertical"}
                    onchange={(e) => onChangeInsetByInput(e, "right")}
                    bind:value={insets.right}
                />
            </label>

            <label style="display: flex; flex-direction: column;">
                Top
                <input
                    name="top_inset"
                    type="number"
                    min="0"
                    step="1"
                    onchange={(e) => onChangeInsetByInput(e, "top")}
                    disabled={mode == "3-part-horizontal"}
                    bind:value={insets.top}
                />
            </label>

            <label style="display: flex; flex-direction: column;">
                Bottom
                <input
                    name="bottom_inset"
                    type="number"
                    min="0"
                    step="1"
                    onchange={(e) => onChangeInsetByInput(e, "bottom")}
                    disabled={mode == "3-part-horizontal"}
                    bind:value={insets.bottom}
                />
            </label>
        </fieldset>
    </section>
</main>
