<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { scale } from 'svelte/transition';

	export let open = false;
	export let placement: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

	const dispatch = createEventDispatcher();
	let popoverElement: HTMLDivElement;
	let triggerElement: HTMLButtonElement;

	function handleToggle(event: ToggleEvent) {
		// Only update state if the new state is different from the current open state
		if ((event.newState === 'open') !== open) {
			open = event.newState === 'open';
			
			// Dispatch close event when popover is closed
			if (event.newState === 'closed') {
				dispatch('close');
			}
		}
	}

	// Only call show/hide if the current state doesn't match the desired state
	$: if (open && popoverElement?.matches(':not(:popover-open)')) {
		popoverElement?.showPopover();
	} else if (!open && popoverElement?.matches(':popover-open')) {
		popoverElement?.hidePopover();
	}

	$: placementClasses = {
		top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
		right: 'left-full top-1/2 -translate-y-1/2 ml-2',
		bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
		left: 'right-full top-1/2 -translate-y-1/2 mr-2'
	}[placement];
</script>

<div class="relative">
	<button
		bind:this={triggerElement}
		popovertarget="popover-content"
		class="contents"
	>
		<slot name="trigger" />
	</button>

	<div
		bind:this={popoverElement}
		id="popover-content"
		popover="auto"
		class="absolute z-50 {placementClasses}"
		transition:scale={{ duration: 150 }}
		on:toggle={handleToggle}
	>
		<div
			class="bg-surface-50 dark:bg-surface-800 rounded-lg shadow-lg border border-surface-200 dark:border-surface-700 p-4"
		>
			<slot />
		</div>
	</div>
</div>

<style>
	[popover] {
		margin: 0;
		padding: 0;
		border: none;
	}

	[popover]::backdrop {
		background-color: transparent;
	}
</style> 