/// <reference no-default-lib="true"/>
/// <reference types="@sveltejs/kit" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

// https://kit.svelte.dev/docs/service-workers#type-safety
const sw = self as unknown as DedicatedWorkerGlobalScope;
// heic.worker.ts
import * as elheif from 'elheif'
import MainModuleFactory from 'elheif';
import * as Comlink from "comlink"

// let block = heic.loadEncoder()

// importScripts('workerpool.js');
// importScripts('https://cdn.jsdelivr.net/gh/hpp2334/elheif@main/pkg/elheif.js');
//
var moduleHolder = {

    
} as elheif.WasmModuleProp
// console.log(elheif, MainModuleFactory)
let heifModule: Promise<elheif.MainModule> | null = null


export async function jsEncodeImages(file: File, option?: elheif.EncodingOption) {
    await ensureInitialized();
    // await block
    let bitmap = await createImageBitmap(file)
    let canvas = new OffscreenCanvas(
        bitmap.width, bitmap.height
    )
    let context = canvas.getContext("2d")!
    context.drawImage(bitmap, 0, 0)
    bitmap.close()
    let imageData = context.getImageData(0,0, canvas.width, canvas.height)
    const result = (moduleHolder as elheif.MainModule).jsEncodeImages([imageData], option);
    console.log("worker jsEncodeImage send",result);
    if (result.data) {
        return Comlink.transfer(result, [result.data])
    } else {
        return result
    }
}

export async function jsDecodeImage(file: File) {
    await ensureInitialized();
    const result = (moduleHolder as elheif.MainModule).jsDecodeImage(await file.arrayBuffer());
    // if (result.err) throw new Error(result.err);
    type Foo = typeof result;
    console.log("worker jsDecodeImage send",result);
    if (result.data) {
        return Comlink.transfer(result, [result.data]) as Foo
    } else {
        return result
    }
}

async function ensureInitialized() {
    if (!heifModule) {
        heifModule = MainModuleFactory(moduleHolder);
    }
    await heifModule;
}

export async function prune() {
    heifModule = null;
    moduleHolder = {};
}

// async function convertToHeif(
//     file: File | Blob,
//     option?: elheif.EncodingOption
// ) {
//     await heifModule;
//     if (file.type == 'image/heic' || file.type == 'image/heif') {
//         return file;
//     }
//     const decoder = new ImageDecoder({
//         type: file.type
//     })

// }

// worker({ jsEncodeImages, jsDecodeImage, prune });
Comlink.expose(
    { jsEncodeImages, jsDecodeImage, prune }
)
