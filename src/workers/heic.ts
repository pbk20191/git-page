
/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

// https://kit.svelte.dev/docs/service-workers#type-safety
const sw = self as unknown as DedicatedWorkerGlobalScope;
// heic.worker.ts
import * as elheif from 'elheif'
import MainModuleFactory from 'elheif';
import { worker } from 'workerpool'
// importScripts('workerpool.js');
// importScripts('https://cdn.jsdelivr.net/gh/hpp2334/elheif@main/pkg/elheif.js');
//
const moduleHolder = {

    
} as elheif.WasmModuleProp
// console.log(elheif, MainModuleFactory)
const heifModule = MainModuleFactory(moduleHolder)


async function jsEncodeImages(images: ImageData[], option?: elheif.EncodingOption) {
    await heifModule;
    console.log("worker jsEncodeImage inputs", images, option);
    const result = (moduleHolder as elheif.MainModule).jsEncodeImages(images, option);
    // if (result.err) throw new Error(result.err);
    console.log("worker jsEncodeImage send",result);
    return result;
}

async function jsDecodeImage(buffer: Uint8Array) {
    await heifModule;
    const result = (moduleHolder as elheif.MainModule).jsDecodeImage(buffer);
    // if (result.err) throw new Error(result.err);
    console.log("worker jsDecodeImage send",result);
    return result;
}

worker({ jsEncodeImages, jsDecodeImage });