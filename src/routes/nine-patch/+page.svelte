<script module lang="ts">
    import { readNinePathFromData, NinePatchParser } from "$lib/nine_patch/NinePatch";
    import type { ChangeEventHandler } from "svelte/elements";
    
</script>
<script lang="ts">
    async function fileHandle(event: Parameters< ChangeEventHandler<HTMLInputElement>>[0]) {
        const files = event.currentTarget.files
        if (!files || files.length < 1) {
            return
        }
        const file = files[0]
        
        const bitmap = await createImageBitmap(file)
        let canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
        let context = canvas.getContext("2d")!
        context.drawImage(bitmap, 0, 0)
        let imageData = context.getImageData(0,0, canvas.width, canvas.height)
        bitmap.close()

        let value = readNinePathFromData(imageData)   
        console.log(value)
    }
</script>
<div>
        <label for="images">images</label>
    <input
        type="file"
        name="images"
        accept="image/png, image/jpeg"
        onchange={fileHandle}
    />

</div>