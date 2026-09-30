'use client';

import { useSyncExternalStore } from 'react';

export const apiUrl =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
export const sessionStorageKey = 'campus-map.session-token';

export function getToken() {
  return window.localStorage.getItem(sessionStorageKey);
}

export function saveToken(token: string) {
  window.localStorage.setItem(sessionStorageKey, token);
  window.dispatchEvent(new Event('campus-session'));
}

export function clearToken() {
  window.localStorage.removeItem(sessionStorageKey);
  window.dispatchEvent(new Event('campus-session'));
}

function subscribe(listener: () => void) {
  window.addEventListener('storage', listener);
  window.addEventListener('campus-session', listener);
  return () => {
    window.removeEventListener('storage', listener);
    window.removeEventListener('campus-session', listener);
  };
}

export function useSessionToken() {
  return useSyncExternalStore(subscribe, getToken, () => null);
}
