
/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

// https://kit.svelte.dev/docs/service-workers#type-safety
const self = globalThis.self as unknown as DedicatedWorkerGlobalScope;
import { heic, webp, avif, type ImageDataLike } from "icodec"
import * as Comlink from "comlink"

import AVIFEncWASM from "icodec/avif-enc.wasm?url";
import HEIFEncWASM from "icodec/heic-enc.wasm?url";
import WEBPEncWASM from "icodec/webp-enc.wasm?url";

export type * from "icodec"

async function encodeToHEIC(
    image:ImageDataLike,
    option?:heic.Options
) {
    await heic.loadEncoder(HEIFEncWASM)
    let data = heic.encode(image, option)
    return data
} 

async function encodeToWEPB(
    image:ImageDataLike,
    option?:webp.Options
) {
    await webp.loadEncoder(WEBPEncWASM)
    let data = webp.encode(image, option)
    return data
}

async function encodeToAVIF(
    image:ImageDataLike,
    option?:avif.Options
) {
    await avif.loadEncoder(AVIFEncWASM)
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


Comlink.expose({
    bitmapToHEIC, bitmapToAVIF, bitmapToWEBP
})