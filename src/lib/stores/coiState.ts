// sessionStore.ts
import { writable } from 'svelte/store';

function sessionStore<T>(key: string, initialValue: T) {
  const storedValue = sessionStorage.getItem(key);
  const parsedValue = storedValue ? JSON.parse(storedValue) as T : initialValue;

  const store = writable<T>(parsedValue);

  store.subscribe((value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  });

  return store;
}


export const coiState = sessionStore('coiState', {
  
    coiReloadedBySelf: false,
    coiCoepHasFailed: false,
    coepCredentialless: false,
});