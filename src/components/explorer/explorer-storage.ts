import type { ExplorerNode } from '../../../explorer-sqlite-storage';

// Use Electron's API exposed via preload
function getExplorerApi(): NonNullable<Window['api']>['explorer'] {
  if (!window.api?.explorer) {
    throw new Error('Explorer API is not available. Are you running in Electron?');
  }
  return window.api.explorer;
}

function isExplorerNode(obj: unknown): obj is ExplorerNode {
  if (!obj || typeof obj !== 'object') return false;
  const node = obj as ExplorerNode;
  return (
    typeof node.id === 'string' &&
    typeof node.name === 'string' &&
    typeof node.isFolder === 'boolean' &&
    Array.isArray(node.items)
  );
}

export async function getExplorerNode(id: string): Promise<ExplorerNode | undefined> {
  const explorerApi = getExplorerApi();
  const result = await explorerApi.getNode(id);
  if (isExplorerNode(result)) return result;
  return undefined;
}

export async function getAllExplorerNodes(): Promise<ExplorerNode[]> {
  const explorerApi = getExplorerApi();
  const result = await explorerApi.getAllNodes();
  if (Array.isArray(result)) {
    return result.filter(isExplorerNode);
  }
  return [];
}

export async function setExplorerNode(node: ExplorerNode): Promise<void> {
  const explorerApi = getExplorerApi();
  await explorerApi.setNode(node as unknown as Record<string, unknown>);
}

export async function removeExplorerNode(id: string): Promise<void> {
  const explorerApi = getExplorerApi();
  await explorerApi.removeNode(id);
}

export async function getExplorerState<T>(key: string, fallback: T): Promise<T> {
  const explorerApi = getExplorerApi();
  const result = await explorerApi.getState(key, fallback);
  // We cannot type check T, so return as is, fallback if undefined
  return result === undefined ? fallback : (result as T);
}

export async function setExplorerState<T>(key: string, value: T): Promise<void> {
  const explorerApi = getExplorerApi();
  await explorerApi.setState(key, value);
}

export async function removeExplorerState(key: string): Promise<void> {
  const explorerApi = getExplorerApi();
  await explorerApi.removeState(key);
}

export async function exportExplorerData(): Promise<object> {
  const explorerApi = getExplorerApi();
  return await explorerApi.exportAll();
}

export async function importExplorerData(data: object): Promise<void> {
  const explorerApi = getExplorerApi();
  await explorerApi.importAll(data);
}

// Reactivity: Listen for changes from main process
export function subscribeToExplorerChanges(callback: (payload: unknown) => void): () => void {
  const explorerApi = getExplorerApi();
  return explorerApi.onDataChanged(callback);
}
