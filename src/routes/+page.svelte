<script lang="ts">
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcomeFallback from '$lib/images/svelte-welcome.png';
	import Dialog from '$lib/components/Dialog.svelte';
	import Popover from '$lib/components/Popover.svelte';
	import { showToast } from '$lib/stores/ui';

	let dialogOpen = false;
	let popoverOpen = false;

	function handleShowToast(type: 'success' | 'error' | 'info' | 'warning') {
		showToast({
			message: `This is a ${type} toast message!`,
			type,
			duration: 3000
		});
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="container mx-auto p-4">
	<section class="flex flex-col items-center justify-center space-y-8 py-12">
		<div class="text-center space-y-4">
			<h1 class="text-4xl font-bold text-primary-500">
				<span class="block mb-4">
					<picture>
						<source srcset={welcome} type="image/webp" />
						<img src={welcomeFallback} alt="Welcome" class="w-full max-w-2xl mx-auto" />
					</picture>
				</span>
				to your new<br />SvelteKit app
			</h1>

			<h2 class="text-xl text-surface-700 dark:text-surface-300">
				try editing <strong class="text-primary-500">src/routes/+page.svelte</strong>
			</h2>
		</div>

		<div class="bg-surface-50 dark:bg-surface-800 p-6 rounded-lg shadow-lg">
			<Counter />
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
			<div class="bg-surface-50 dark:bg-surface-800 p-6 rounded-lg shadow-lg">
				<h3 class="text-xl font-bold text-primary-500 mb-4">Features</h3>
				<ul class="space-y-2 text-surface-700 dark:text-surface-300">
					<li class="flex items-center">
						<svg class="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						SvelteKit
					</li>
					<li class="flex items-center">
						<svg class="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						TypeScript
					</li>
					<li class="flex items-center">
						<svg class="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						Skeleton UI
					</li>
				</ul>
			</div>

			<div class="bg-surface-50 dark:bg-surface-800 p-6 rounded-lg shadow-lg">
				<h3 class="text-xl font-bold text-primary-500 mb-4">UI Components</h3>
				<div class="space-y-4">
					<button
						class="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
						on:click={() => (dialogOpen = true)}
					>
						Open Dialog
					</button>

					<Popover open={popoverOpen}>
						<button
							slot="trigger"
							class="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
							on:click={() => (popoverOpen = !popoverOpen)}
						>
							Toggle Popover
						</button>
						<div class="w-64">
							<p class="text-surface-700 dark:text-surface-300">
								This is a popover with some content. Click outside to close it.
							</p>
						</div>
					</Popover>

					<div class="grid grid-cols-2 gap-2">
						<button
							class="px-4 py-2 bg-success-500 text-white rounded-lg hover:bg-success-600 transition-colors"
							on:click={() => handleShowToast('success')}
						>
							Success Toast
						</button>
						<button
							class="px-4 py-2 bg-error-500 text-white rounded-lg hover:bg-error-600 transition-colors"
							on:click={() => handleShowToast('error')}
						>
							Error Toast
						</button>
						<button
							class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
							on:click={() => handleShowToast('info')}
						>
							Info Toast
						</button>
						<button
							class="px-4 py-2 bg-warning-500 text-white rounded-lg hover:bg-warning-600 transition-colors"
							on:click={() => handleShowToast('warning')}
						>
							Warning Toast
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

<Dialog open={dialogOpen} title="Example Dialog" on:close={() => (dialogOpen = false)}>
	<p class="text-surface-700 dark:text-surface-300">
		This is an example dialog. You can put any content here.
	</p>
	<div slot="actions" class="flex justify-end space-x-2">
		<button
			class="px-4 py-2 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
			on:click={() => (dialogOpen = false)}
		>
			Cancel
		</button>
		<button
			class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
			on:click={() => (dialogOpen = false)}
		>
			Confirm
		</button>
	</div>
</Dialog>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
