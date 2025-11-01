
/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

// https://kit.svelte.dev/docs/service-workers#type-safety
const sw = self as unknown as ServiceWorkerGlobalScope;

import { build, files, version } from '$service-worker';

const CACHE = `aj-cache-${version}`;

const ASSETS = [
	...build, // the app itself
	...files // everything in `static`
];

const coepCredentialless = true;

sw.addEventListener("install", () => sw.skipWaiting());
sw.addEventListener("activate", (event) => event.waitUntil(sw.clients.claim()));

sw.addEventListener("message", (ev) => {
    if (!ev.data) {
        return;
    } else if (ev.data.type === "coepCredentialless") {
        // coepCredentialless = ev.data.value;
    }
});

sw.addEventListener("fetch", function (event) {
    const r = event.request;
    if (r.cache === "only-if-cached" && r.mode !== "same-origin") {
        return;
    }
    if (r.url.includes(".wasm")) {
        return;
    }
    // console.log("fetch", r.url, r.mode, r.cache);
    // if (r.mode == "navigate") {
    //     return;
    // }
    const request = (coepCredentialless && r.mode === "no-cors")
        ? new Request(r, {
            credentials: "omit",
        })
        : r;

    const chain = fetch(request, {
        signal: AbortSignal.timeout(5000),
    })
    .catch((error) => {

        console.error("Fetch failed; returning offline page instead.", error);
        return new Response("<h1>Offline</h1>", {
            status: 503,
            statusText: "Service Unavailable",
            headers: {
                "Content-Type": "text/html",
                "Cache-Control": "no-store",
                "Cross-Origin-Embedder-Policy": coepCredentialless ? "credentialless" : "require-corp",
                "Cross-Origin-Resource-Policy": coepCredentialless ? "cross-origin" : "same-origin",
                "Cross-Origin-Opener-Policy": "same-origin",
            },
        });
    })
    .then((response) => {
        if (response.status === 0) {
            return response;
        }

        const newHeaders = new Headers(response.headers);
        newHeaders.set("Cross-Origin-Embedder-Policy",
            coepCredentialless ? "credentialless" : "require-corp"
        );
        if (!coepCredentialless) {
            newHeaders.set("Cross-Origin-Resource-Policy", "cross-origin");
        }
        newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders,
        });
    })

    event.respondWith(chain);
});