import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			fallback: undefined,
			// fallback:"404.html",

		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? process.env.BASE_PATH : '',
		}
	}
};

export default config;
