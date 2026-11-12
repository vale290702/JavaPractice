'use client';
import { useCallback, useSyncExternalStore } from 'react';
const memory = new Map<string, string>();
const listeners = new Set<() => void>();
const failedKeys = new Set<string>();
function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}
const serverSnapshot = () => null;
/** Server-safe storage subscription with an in-memory fallback when storage is blocked. */
export function useLocalStorage(key: string) {
  const snapshot = useCallback(() => {
    try {
      return failedKeys.has(key)
        ? (memory.get(key) ?? null)
        : localStorage.getItem(key);
    } catch {
      failedKeys.add(key);
      return memory.get(key) ?? null;
    }
  }, [key]);
  const raw = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const set = useCallback(
    (value: string) => {
      memory.set(key, value);
      try {
        localStorage.setItem(key, value);
        failedKeys.delete(key);
      } catch {
        failedKeys.add(key);
      }
      listeners.forEach((listener) => listener());
    },
    [key],
  );
  return { raw, set, failed: failedKeys.has(key) };
}
