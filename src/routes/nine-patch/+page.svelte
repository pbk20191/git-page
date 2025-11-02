<script module lang="ts">
    import { readNinePathFromData, generateXcodeNinePatchJson, type NinePatchInfo } from "$lib/nine_patch/NinePatch";
    import saveAs from "file-saver";
    import JSZip from "jszip";
    import type { ChangeEventHandler } from "svelte/elements";
function assetNameFromFile(fileName:string) { return fileName.replace(/\.9\.png$/i, '').replace(/\.png$/i, '') || 'Image'; }
</script>
<script lang="ts">

    let sourceScale:number = 3
    let contentMode:"stretch" | "tile" = "stretch"
    let translate_for_horizontalMode = true
    let translate_for_verticalMode = true 
    
    async function fileHandle(event: Parameters< ChangeEventHandler<HTMLInputElement>>[0]) {
        const files = event.currentTarget.files
        if (!files || files.length < 1) {
            return
        }
        const zip = new JSZip();
        async function _convert(file:File) {
            const outputName = assetNameFromFile(file.name)
            const decodedResult = await createImageBitmap(file).then((bitmap) => {
                let canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
                
                let context = canvas.getContext("2d", { willReadFrequently: true })!
                
                context.drawImage(bitmap, 0, 0)
                let imageData = context.getImageData(0,0, canvas.width, canvas.height)
                let patchInfo = readNinePathFromData(imageData)
                if (patchInfo) {
                    let contentImage = context.getImageData(1,1, canvas.width - 1, canvas.height - 1)
                    bitmap.close()
                    return {contentImage, patchInfo}
                }
                bitmap.close()
                return undefined
            })
            if (decodedResult) {
                let jsonFile = generateXcodeNinePatchJson(
                    outputName, decodedResult.patchInfo, sourceScale, contentMode, translate_for_horizontalMode, translate_for_verticalMode
                )
                console.log(jsonFile)
                const [w,h] = [decodedResult.contentImage.width/sourceScale, decodedResult.contentImage.height/sourceScale]
                const canvas = new OffscreenCanvas(w * 3, h * 3)
                const original_bitmap = await createImageBitmap(decodedResult.contentImage)
                
                let context = canvas.getContext("2d")!
                context.drawImage(original_bitmap, 0,0, w*3,h*3)
                
                let scaledImagex3 = await canvas.convertToBlob({ type:"image/png"})
                canvas.width = w * 2
                canvas.height = h * 2
                context = canvas.getContext("2d")!
                context.drawImage(original_bitmap, 0,0, w*2,h*2)
                let scaledImagex2 = await canvas.convertToBlob({ type:"image/png"})
                canvas.width = w
                canvas.height = h
                context = canvas.getContext("2d")!
                context.drawImage(original_bitmap, 0,0, w, h)
                let scaledImagex1 = await canvas.convertToBlob({ type : "image/png"})
                original_bitmap.close()

                let folder = zip.folder(`${outputName}.imageset`)!
                folder.file(`${outputName}@3x.png`, scaledImagex3)
                folder.file(`${outputName}@2x.png`, scaledImagex2)
                folder.file(`${outputName}@1x.png`, scaledImagex1)
                folder.file('Contents.json', JSON.stringify(jsonFile))

            }
        } 
        let list = Array.from(files).map((file) => {
   
            return _convert(file)
        })
        await Promise.all(list)
        const out = await zip.generateAsync({ type: 'blob' });
        saveAs(out, `NinePatch-imagesets.zip`);
       
    }
</script>
<style>
.container {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  font-family: system-ui, sans-serif;
  font-size: 0.95rem;
}

/* 일반 입력 필드 */
.container label {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.container input[type="number"],
.container select,
.container input[type="file"] {
  padding: 0.4rem 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
}

/* 체크박스 전용 행 */
.checkbox-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

/* 설명 리스트 */
.container ul {
  margin-top: 0.5rem;
  padding-left: 1.2rem;
  color: #555;
  font-size: 0.9rem;
}
</style>

<div class="container">
  <label for="nine_patch_source_scale">source scale</label>
  <input id="nine_patch_source_scale" type="number" min="1" bind:value={sourceScale} />

  <label for="nine_patch_content_mode">content mode</label>
  <select id="nine_patch_content_mode" bind:value={contentMode}>
    <option value="stretch">stretch</option>
    <option value="tile">tile</option>
  </select>

  <div class="checkbox-row">
    <input
      id="nine_patch_translate_for_horizontalMode"
      type="checkbox"
      bind:checked={translate_for_horizontalMode}
    />
    <label for="nine_patch_translate_for_horizontalMode">
      convert to 3-part-horizontal slice if possible
    </label>
  </div>

  <div class="checkbox-row">
    <input
      id="nine_patch_translate_for_verticalMode"
      type="checkbox"
      bind:checked={translate_for_verticalMode}
    />
    <label for="nine_patch_translate_for_verticalMode">
      convert to 3-part-vertical slice if possible
    </label>
  </div>

  <label for="nine_patch_images">Android nine-patch source png</label>
  <input
    type="file"
    id="nine_patch_images"
    name="images"
    multiple
    accept=".9.png"
    onchange={fileHandle}
  />

  <ul>
    <li>requires valid .9.png format android nine-patch png file</li>
    <li>content-padding and optical bind are ignored</li>
    <li>only first stretch region is recognized</li>
    <li>source png divided by source scale will be the 1x scale</li>
    <li>mdpi → 1x, xhdpi → 2x, xxhdpi → 3x, xxxhdpi → 4x</li>
  </ul>
</div>
