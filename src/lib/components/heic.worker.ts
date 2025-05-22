// heic.worker.ts
import { avif, heic } from "icodec";

import { worker } from 'workerpool'
// importScripts('workerpool.js');
// importScripts('https://cdn.jsdelivr.net/gh/hpp2334/elheif@main/pkg/elheif.js');
//
import AVIFEncWASM from "icodec/avif-enc.wasm?url";
import AvifDecWASM from "icodec/avif-dec.wasm?url";
import HeicEncWASM from "icodec/heic-enc.wasm?url";
import HeicDecWASM from "icodec/heic-dec.wasm?url";

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

async function jsEncodeImage(buffer: Uint8ClampedArray, width: number, height: number) {
    console.log("worker jsEncodeImage", buffer, width, height);
    try {
            await initIfNeeded();
    } catch (e) {
        console.error("worker jsEncodeImage initIfNeeded error", e);
        throw e;
    }
    console.log("worker jsEncodeImage inputs", buffer, width, height);

    const result =     heic.encode({
        data: buffer,
        width: width,
        height: height,
        depth:8
    });
    // if (result.err) throw new Error(result.err);
    console.log("worker jsEncodeImage send",result);
    return result;
}

async function jsDecodeImage(buffer: Uint8Array) {
    try {
            await initIfNeeded();
    } catch (e) {
        console.error("worker jsDecodeImage initIfNeeded error", e);
        throw e;
    }
    const result = heic.decode(buffer)
    // if (result.err) throw new Error(result.err);
    console.log("worker jsDecodeImage send",result);
    return result;
}

worker({ jsEncodeImage, jsDecodeImage });