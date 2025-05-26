import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: [
			 "../dist/heic-enc.js",  "../dist/heic-dec.js",
			 "elheif", "icodec"
		]
	},
	worker: {
		format: "es"
	}
});
