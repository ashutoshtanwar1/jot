import { del, get, set } from 'idb-keyval';

export async function getExplorerItem<T>(key: string, fallback: T): Promise<T> {
  try {
    const value = await get<T>(key);
    return value !== undefined ? value : fallback;
  } catch {
    return fallback;
  }
}

export async function setExplorerItem<T>(key: string, value: T): Promise<void> {
  try {
    await set(key, value);
  } catch {
    // Optionally handle error
  }
}

export async function removeExplorerItem(key: string): Promise<void> {
  try {
    await del(key);
  } catch {
    // Optionally handle error
  }
}
