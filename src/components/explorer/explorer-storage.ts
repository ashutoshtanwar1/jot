import type { Table } from 'dexie';
import Dexie from 'dexie';
import type { ExplorerNode } from './explorer-context';

/**
 * ExplorerDexieDB is the modular Dexie.js database for explorer data.
 * It contains tables for explorer nodes and key-value state.
 */
export class ExplorerDexieDB extends Dexie {
  /**
   * Table for storing ExplorerNode objects, indexed by id.
   */
  explorer_nodes!: Table<ExplorerNode, string>; // id is string
  /**
   * Table for storing key-value state (openFileIds, activeId, etc).
   */
  explorer_state!: Table<{ key: string; value: unknown }, string>; // key-value pairs for state

  constructor() {
    super('ExplorerDB');
    this.version(1).stores({
      explorer_nodes: 'id',
      explorer_state: 'key',
    });
  }
}

/**
 * The singleton Dexie database instance for explorer data.
 */
export const explorerDB = new ExplorerDexieDB();

// ExplorerNode CRUD
/**
 * Returns a single ExplorerNode by id, or undefined if not found.
 */
export async function getExplorerNode(id: string): Promise<ExplorerNode | undefined> {
  return explorerDB.explorer_nodes.get(id);
}

/**
 * Inserts or updates an ExplorerNode in the database.
 */
export async function setExplorerNode(node: ExplorerNode): Promise<void> {
  await explorerDB.explorer_nodes.put(node);
}

/**
 * Removes an ExplorerNode by id from the database.
 */
export async function removeExplorerNode(id: string): Promise<void> {
  await explorerDB.explorer_nodes.delete(id);
}

/**
 * Returns all ExplorerNodes in the database as an array.
 */
export async function getAllExplorerNodes(): Promise<ExplorerNode[]> {
  return explorerDB.explorer_nodes.toArray();
}

// State (openFileIds, activeId, etc)
/**
 * Gets a value from the explorer_state table by key, or returns fallback if not found.
 */
export async function getExplorerState<T>(key: string, fallback: T): Promise<T> {
  const entry = await explorerDB.explorer_state.get(key);
  return entry ? (entry.value as T) : fallback;
}

/**
 * Sets a value in the explorer_state table by key.
 */
export async function setExplorerState<T>(key: string, value: T): Promise<void> {
  await explorerDB.explorer_state.put({ key, value });
}

/**
 * Removes a value from the explorer_state table by key.
 */
export async function removeExplorerState(key: string): Promise<void> {
  await explorerDB.explorer_state.delete(key);
}
