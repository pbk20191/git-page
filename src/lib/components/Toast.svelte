<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	export let open = false;
	export let title = '';
	export let message = '';
	export let duration = 3000;
	export let type: 'info' | 'success' | 'warning' | 'error' = 'info';

	const dispatch = createEventDispatcher();
	let notification: Notification | null = null;

	onMount(() => {
		// Request permission for notifications
		if ('Notification' in window) {
			Notification.requestPermission();
		}
	});

	$: if (open) {
		showNotification();
	}

	function showNotification() {
		if (!('Notification' in window)) {
			console.warn('Notifications are not supported in this browser');
			return;
		}

		if (Notification.permission === 'granted') {
			notification = new Notification(title, {
				body: message,
				icon: getIconForType(),
				requireInteraction: false
			});

			notification.onclick = () => {
				dispatch('click');
			};

			notification.onclose = () => {
				open = false;
				dispatch('close');
			};

			// Auto-close after duration
			setTimeout(() => {
				if (notification) {
					notification.close();
				}
			}, duration);
		} else if (Notification.permission !== 'denied') {
			Notification.requestPermission().then((permission) => {
				if (permission === 'granted') {
					showNotification();
				}
			});
		}
	}

	function getIconForType() {
		// You can provide different icons based on the type
		switch (type) {
			case 'success':
				return '/icons/success.svg';
			case 'warning':
				return '/icons/warning.svg';
			case 'error':
				return '/icons/error.svg';
			default:
				return '/icons/info.svg';
		}
	}

	function handleClose() {
		if (notification) {
			notification.close();
		}
		open = false;
		dispatch('close');
	}
</script>

<div
	class="fixed bottom-4 right-4 z-50"
	transition:fade={{ duration: 150 }}
>
	{#if open}
		<div
			class="bg-surface-50 dark:bg-surface-800 rounded-lg shadow-lg border border-surface-200 dark:border-surface-700 p-4 min-w-[300px] max-w-[400px]"
			class:border-success-500={type === 'success'}
			class:border-warning-500={type === 'warning'}
			class:border-error-500={type === 'error'}
		>
			<div class="flex items-start gap-3">
				<div class="flex-shrink-0">
					<slot name="icon">
						{#if type === 'success'}
							<svg
								class="w-5 h-5 text-success-500"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clip-rule="evenodd"
								/>
							</svg>
						{:else if type === 'warning'}
							<svg
								class="w-5 h-5 text-warning-500"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
									clip-rule="evenodd"
								/>
							</svg>
						{:else if type === 'error'}
							<svg
								class="w-5 h-5 text-error-500"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clip-rule="evenodd"
								/>
							</svg>
						{:else}
							<svg
								class="w-5 h-5 text-primary-500"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
									clip-rule="evenodd"
								/>
							</svg>
						{/if}
					</slot>
				</div>
				<div class="flex-1">
					<h3 class="text-sm font-medium text-surface-900 dark:text-surface-50">
						{title}
					</h3>
					<p class="mt-1 text-sm text-surface-500 dark:text-surface-400">
						{message}
					</p>
				</div>
				<button
					class="flex-shrink-0 text-surface-400 hover:text-surface-500 dark:text-surface-500 dark:hover:text-surface-400"
					on:click={handleClose}
				>
					<svg
						class="w-4 h-4"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</div>
		</div>
	{/if}
</div> 