<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';
	import '$lib/components/service.client.ts';
	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col">
	<Header />

	<main class="container mx-auto p-4 flex-1">
		{@render children()}
	</main>

	<footer class="text-center p-4">
		<p>
			visit <a class="text-primary-500 hover:text-primary-600" href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to learn about SvelteKit
		</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
