<script lang="ts">
	import { Spring } from 'svelte/motion';

	const count = new Spring(0);
	const offset = $derived(modulo(count.current, 1));

	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}
</script>

<div class="flex items-center justify-center space-x-4">
	<button 
		onclick={() => (count.target -= 1)} 
		aria-label="Decrease the counter by one"
		class="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
	>
		<svg class="w-6 h-6 text-surface-700 dark:text-surface-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
		</svg>
	</button>

	<div class="counter-viewport">
		<div class="counter-digits" style="transform: translate(0, {100 * offset}%)">
			<strong class="hidden" aria-hidden="true">{Math.floor(count.current + 1)}</strong>
			<strong class="text-4xl font-bold text-primary-500">{Math.floor(count.current)}</strong>
		</div>
	</div>

	<button 
		onclick={() => (count.target += 1)} 
		aria-label="Increase the counter by one"
		class="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
	>
		<svg class="w-6 h-6 text-surface-700 dark:text-surface-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
		</svg>
	</button>
</div>

<style>
	.counter-viewport {
		width: 4rem;
		height: 4rem;
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.counter-digits {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.counter-viewport strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
	}

	.hidden {
		top: -100%;
		user-select: none;
	}
</style>
