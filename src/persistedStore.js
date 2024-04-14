import { writable, get } from 'svelte/store';

export function createPersistedStore(key, startValue) {
    // Initialization with default values
    let data = startValue;

    // Only access localStorage in client-side code
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(key);
        data = stored ? JSON.parse(stored) : startValue;
    }

    const store = writable(data);

    // Ensure we subscribe and update localStorage only if it exists
    if (typeof window !== 'undefined') {
        store.subscribe(value => {
            localStorage.setItem(key, JSON.stringify(value));
        });
    }

    return store;
}
