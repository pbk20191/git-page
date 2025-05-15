import { writable } from 'svelte/store';

interface Toast {
	id: string;
	message: string;
	type: 'success' | 'error' | 'info' | 'warning';
	duration?: number;
}

export const toasts = writable<Toast[]>([]);

export function showToast(toast: Omit<Toast, 'id'>) {
	const id = Math.random().toString(36).substring(2, 9);
	toasts.update((current) => [...current, { ...toast, id }]);

	if (toast.duration !== 0) {
		setTimeout(() => {
			toasts.update((current) => current.filter((t) => t.id !== id));
		}, toast.duration || 3000);
	}
}

export function removeToast(id: string) {
	toasts.update((current) => current.filter((t) => t.id !== id));
} 