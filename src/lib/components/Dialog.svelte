<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let open = false;
	export let title = '';
	export let size: 'sm' | 'md' | 'lg' = 'md';

	const dispatch = createEventDispatcher();
	let dialogElement: HTMLDialogElement;

	function handleClose() {
		dialogElement.close();
		open = false;
		dispatch('close');
	}

	$: if (open) {
		dialogElement?.showModal();
	} else {
		dialogElement?.close();
	}

	$: sizeClasses = {
		sm: 'max-w-sm',
		md: 'max-w-md',
		lg: 'max-w-lg'
	}[size];
</script>

<dialog
	bind:this={dialogElement}
	class="backdrop:bg-black/50 backdrop:backdrop-blur-sm p-0 rounded-lg bg-surface-50 dark:bg-surface-800 shadow-xl {sizeClasses}"
	on:cancel={() => {
		open = false;
		dispatch('close');
	}}
>
	<div class="px-4 pt-5 pb-4 sm:p-6">
		<div class="flex items-start justify-between">
			<h3 class="text-lg font-medium text-surface-900 dark:text-surface-100">
				{title}
			</h3>
			<button
				type="button"
				class="rounded-md text-surface-400 hover:text-surface-500 dark:hover:text-surface-300"
				on:click={handleClose}
			>
				<span class="sr-only">Close</span>
				<svg
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>

		<div class="mt-2">
			<slot />
		</div>
	</div>

	<div class="bg-surface-50 dark:bg-surface-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
		<slot name="actions" />
	</div>
</dialog>

<style>
	dialog {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		margin: 0;
		padding: 0;
		border: none;
	}

	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
	}
</style> 