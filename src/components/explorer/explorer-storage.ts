import { del, get, set } from 'idb-keyval';

// Utility to detect Electron
function isElectron() {
  return typeof window !== 'undefined' && window.api?.isElectron === true;
}

// Helper to read/write all data in Electron
async function readAllData(): Promise<Record<string, unknown>> {
  if (isElectron()) {
    return window.api!.readAllData();
  }
  return {};
}
async function writeAllData(data: Record<string, unknown>): Promise<void> {
  if (isElectron()) {
    await window.api!.writeAllData(data);
    return;
  }
}

export async function getExplorerItem<T>(key: string, fallback: T): Promise<T> {
  if (isElectron()) {
    const all = await readAllData();
    if (Object.prototype.hasOwnProperty.call(all, key)) {
      return all[key] as T;
    }
    return fallback;
  }
  try {
    const value = await get<T>(key);
    return value !== undefined ? value : fallback;
  } catch {
    return fallback;
  }
}

export async function setExplorerItem<T>(key: string, value: T): Promise<void> {
  if (isElectron()) {
    const all = await readAllData();
    all[key] = value;
    await writeAllData(all);
    return;
  }
  try {
    await set(key, value);
  } catch {
    // Optionally handle error
  }
}

export async function removeExplorerItem(key: string): Promise<void> {
  if (isElectron()) {
    const all = await readAllData();
    delete all[key];
    await writeAllData(all);
    return;
  }
  try {
    await del(key);
  } catch {
    // Optionally handle error
  }
}
