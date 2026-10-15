'use client';

import { useSyncExternalStore } from 'react';

function subscribe() {
  // Static snapshot subscription that does not require continuous polling
  return () => {};
}

function getClientSnapshot() {
  return new Date().getFullYear().toString();
}

function getServerSnapshot() {
  // Prerender-safe operational constant
  return '2026';
}

export function CopyrightYear() {
  const year = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  return <span>{year}</span>;
}
