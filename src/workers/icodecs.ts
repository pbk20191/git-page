/// <reference no-default-lib="true"/>
/// <reference types="@sveltejs/kit" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

// https://kit.svelte.dev/docs/service-workers#type-safety
const self = globalThis.self as unknown as DedicatedWorkerGlobalScope;
import { heic, webp, avif, type ImageDataLike } from "@pbk20191/icodec"
import * as Comlink from "comlink"

// import AVIFEncWASM from "@pbk20191/icodec/avif-enc.wasm?url";
// import HEIFEncWASM from "@pbk20191/icodec/heic-enc.wasm?url";
// import WEBPEncWASM from "@pbk20191/icodec/webp-enc.wasm?url";

export type * from "@pbk20191/icodec"

async function encodeToHEIC(
    image:ImageDataLike,
    option?:heic.Options
) {
    // await heic.loadEncoder()
    let data = heic.encode(image, option)
    return data
} 

async function encodeToWEPB(
    image:ImageDataLike,
    option?:webp.Options
) {
    // await webp.loadEncoder()
    let data = webp.encode(image, option)
    return data
}

async function encodeToAVIF(
    image:ImageDataLike,
    option?:avif.Options
) {
    // await avif.loadEncoder()
    let data = avif.encode(image, option)
    return data
}

export async function bitmapToHEIC(
    bitmap: ImageBitmap,
    option?:heic.Options
) {
    try {
        const canvas = new OffscreenCanvas(
            bitmap.width, bitmap.height
        )
        const ctx = canvas.getContext("2d")!
        ctx.drawImage(bitmap, 0,0)
        const imageData = ctx.getImageData(0,0, bitmap.width, bitmap.height)
        const result:ImageDataLike = {
            width: imageData.width,
            height: imageData.height,
            depth: 8,
            data: imageData.data
        }
        let data = await encodeToHEIC(result, option)
        return Comlink.transfer({
            data, bitmap
        }, [data.buffer, bitmap])
    }  catch (error) {
        bitmap.close()
        throw error
    }
}

export async function bitmapToAVIF(
    bitmap: ImageBitmap,
    option?:avif.Options
) {
    try {
        const canvas = new OffscreenCanvas(
            bitmap.width, bitmap.height
        )
        const ctx = canvas.getContext("2d")!
        ctx.drawImage(bitmap, 0,0)
        const imageData = ctx.getImageData(0,0, bitmap.width, bitmap.height)
        const result:ImageDataLike = {
            width: imageData.width,
            height: imageData.height,
            depth: 8,
            data: imageData.data
        }
        let data =  await encodeToAVIF(result, option)
        return Comlink.transfer({
            data, bitmap
        }, [data.buffer, bitmap])
    }  catch (error) {
        bitmap.close()
        throw error
    }
}

export async function bitmapToWEBP(
    bitmap: ImageBitmap,
    option?:webp.Options
) {
    try {
        const canvas = new OffscreenCanvas(
            bitmap.width, bitmap.height
        )
        const ctx = canvas.getContext("2d")!
        ctx.drawImage(bitmap, 0,0)
        const imageData = ctx.getImageData(0,0, bitmap.width, bitmap.height)
        const result:ImageDataLike = {
            width: imageData.width,
            height: imageData.height,
            depth: 8,
            data: imageData.data
        }
        let data =  await encodeToWEPB(result, option)
        return Comlink.transfer({
            data, bitmap
        }, [data.buffer, bitmap])
    } catch (error) {
        bitmap.close()
        throw error
    }
}

export async function encodeBitmap(
    file: File,
    option?: {
        webp?:webp.Options,
        avif?:avif.Options,
        heic?:heic.Options
    }
) {
    const bitmap = await createImageBitmap(file)
    const canvas = new OffscreenCanvas(
        bitmap.width, bitmap.height
    )
    const ctx = canvas.getContext("2d")!
    ctx.drawImage(bitmap, 0,0)
    const imageData = ctx.getImageData(0,0, bitmap.width, bitmap.height)
    const result:ImageDataLike = {
        width: imageData.width,
        height: imageData.height,
        depth: 8,
        data: imageData.data
    }
    bitmap.close()

    let batchResult = await Promise.allSettled(
        [
            encodeToWEPB(result, option?.webp),
            encodeToAVIF(result, option?.avif),
            encodeToHEIC(result, option?.heic),
            // globalThis.crossOriginIsolated ? encodeToHEIC(result, option?.heic): Promise.reject(new Error("heic encoding is possible only in crossOriginIsolated"))
        ]
    )
    const returnValue = {
        webp: batchResult[0],
        avif: batchResult[1],
        heic: batchResult[2],
    }
    // console.log("Batch encoding result:", returnValue)
    let list: Transferable[] = batchResult.flatMap(item => {
        if (item.status === "fulfilled") {
            return [item.value.buffer]
        } else {
            return []
        }
    })
    return Comlink.transfer(returnValue,list)
}

export async function WebPPreset(options: webp.Options, preset: webp.WebPPreset) {
    // await webp.loadEncoder()
    let data = webp.preset(options, preset)
    return data
}

export async function loadExternalWASM(
    webpEncoder:WebAssembly.Module,
    avifEncoder:WebAssembly.Module,
    heicEncoder:WebAssembly.Module
) {
    let a =   webp.loadEncoder(undefined, {
        instantiateWasm: (importObject, receive) => {
            WebAssembly.instantiate(webpEncoder, importObject).then(receive)
            // const instance = new WebAssembly.Instance(webpEncoder, importObject)
            // receive(instance)
            // // console.log("WebP WASM loaded in worker")
            // return instance.exports
            return undefined
        }
    })
    let b = avif.loadEncoder(undefined, {
        instantiateWasm: (importObject, receive) => {
            // const instance = new WebAssembly.Instance(avifEncoder, importObject)
            // receive(instance)
            WebAssembly.instantiate(avifEncoder, importObject).then(receive)
                // console.log("AVIF WASM loaded in worker")
            return undefined
        }
    })
    let c = heic.loadEncoder(undefined, {
        instantiateWasm: (importObject, receive) => {
            // const instance = new WebAssembly.Instance(heicEncoder, importObject)
            // receive(instance)
            WebAssembly.instantiate(heicEncoder, importObject).then(
               receive
            )
                // console.log("HEIC WASM loaded in worker")
            return undefined
        }
    })  
    // console.log(a,b,c)
    let t = await Promise.allSettled([a,b,c])
    // console.log("WASM loading results:", t)
    // if (t[0].status === 'fulfilled') {
    //     console.log("WebP encoder loaded successfully", t[0].value)
    // }
    // if (t[1].status === 'fulfilled') {
    //     console.log("AVIF encoder loaded successfully", t[1].value)
    // }
    // if (t[2].status === 'fulfilled') {
    //     console.log("HEIC encoder loaded successfully", t[2].value)
    // }
    // // console.log(t[0].status, t[1].status, t[2].status)
    // return []
}

Comlink.expose({
    bitmapToHEIC, bitmapToAVIF, bitmapToWEBP, encodeBitmap, WebPPreset, loadExternalWASM
})