// heic.worker.ts
import * as elheif from 'elheif'
import { worker } from 'workerpool'
// importScripts('workerpool.js');
// importScripts('https://cdn.jsdelivr.net/gh/hpp2334/elheif@main/pkg/elheif.js');
//


let initialized = false;
async function initIfNeeded() {
    if (!initialized) {
        // elheif가 전역으로 등록되었을 것
        await elheif.ensureInitialized();
        initialized = true;
    }
}

async function jsEncodeImage(buffer: Uint8ClampedArray, width: number, height: number) {
    await initIfNeeded();
    console.log("worker jsEncodeImage inputs", buffer, width, height);
    const result = elheif.jsEncodeImage(buffer, width, height);
    // if (result.err) throw new Error(result.err);
    console.log("worker jsEncodeImage send",result);
    return result;
}

async function jsDecodeImage(buffer: Uint8Array) {
    await initIfNeeded();
    const result = elheif.jsDecodeImage(buffer);
    // if (result.err) throw new Error(result.err);
    console.log("worker jsDecodeImage send",result);
    return result;
}

worker({ jsEncodeImage, jsDecodeImage });