import Database from 'better-sqlite3';
import fs from 'fs';
import * as os from 'os';
import * as path from 'path';

// Types
export type ExplorerNode = {
  id: string;
  name: string;
  isFolder: boolean;
  items: ExplorerNode[];
  content?: string;
  createDate?: string;
  lastUpdatedDate?: string;
  lastOpenedDate?: string;
};

// DB location: user data dir
const dbPath = path.join(os.homedir(), '.jot-explorer', 'explorer.db');
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

// Open DB
const db = new Database(dbPath);

// Schema versioning
const SCHEMA_VERSION = 1;

db.exec(`
  CREATE TABLE IF NOT EXISTS meta (
    key TEXT PRIMARY KEY,
    value TEXT
  );
  CREATE TABLE IF NOT EXISTS explorer_nodes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    isFolder INTEGER NOT NULL,
    items TEXT NOT NULL,
    content TEXT,
    createDate TEXT,
    lastUpdatedDate TEXT,
    lastOpenedDate TEXT
  );
  CREATE TABLE IF NOT EXISTS explorer_state (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

// Set schema version if not set
const versionRow = db.prepare('SELECT value FROM meta WHERE key = ?').get('schema_version');
if (!versionRow) {
  db.prepare('INSERT INTO meta (key, value) VALUES (?, ?)').run(
    'schema_version',
    String(SCHEMA_VERSION),
  );
}

// --- CRUD for ExplorerNode ---
export function getNode(id: string): ExplorerNode | undefined {
  try {
    const row = db.prepare('SELECT * FROM explorer_nodes WHERE id = ?').get(id) as
      | {
          id: string;
          name: string;
          isFolder: number;
          items: string;
          content?: string;
          createDate?: string;
          lastUpdatedDate?: string;
          lastOpenedDate?: string;
        }
      | undefined;
    if (!row) return undefined;
    return {
      id: row.id,
      name: row.name,
      isFolder: !!row.isFolder,
      items: JSON.parse(row.items),
      content: row.content,
      createDate: row.createDate,
      lastUpdatedDate: row.lastUpdatedDate,
      lastOpenedDate: row.lastOpenedDate,
    };
  } catch (e) {
    console.error('getNode error', e);
    return undefined;
  }
}

export function getAllNodes(): ExplorerNode[] {
  try {
    const rows = db.prepare('SELECT * FROM explorer_nodes').all() as Array<{
      id: string;
      name: string;
      isFolder: number;
      items: string;
      content?: string;
      createDate?: string;
      lastUpdatedDate?: string;
      lastOpenedDate?: string;
    }>;
    return rows.map(row => ({
      id: row.id,
      name: row.name,
      isFolder: !!row.isFolder,
      items: JSON.parse(row.items),
      content: row.content,
      createDate: row.createDate,
      lastUpdatedDate: row.lastUpdatedDate,
      lastOpenedDate: row.lastOpenedDate,
    }));
  } catch (e) {
    console.error('getAllNodes error', e);
    return [];
  }
}

export function setNode(node: ExplorerNode): void {
  try {
    db.prepare(
      `REPLACE INTO explorer_nodes (id, name, isFolder, items, content, createDate, lastUpdatedDate, lastOpenedDate)
      VALUES (@id, @name, @isFolder, @items, @content, @createDate, @lastUpdatedDate, @lastOpenedDate)`,
    ).run({
      ...node,
      isFolder: node.isFolder ? 1 : 0,
      items: JSON.stringify(node.items || []),
    });
  } catch (e) {
    console.error('setNode error', e);
    throw e;
  }
}

export function removeNode(id: string): void {
  try {
    db.prepare('DELETE FROM explorer_nodes WHERE id = ?').run(id);
  } catch (e) {
    console.error('removeNode error', e);
    throw e;
  }
}

// --- State (openFileIds, activeId, etc) ---
export function getState<T>(key: string, fallback: T): T {
  try {
    const row = db.prepare('SELECT value FROM explorer_state WHERE key = ?').get(key) as
      | { value: string }
      | undefined;
    return row ? (JSON.parse(row.value) as T) : fallback;
  } catch (e) {
    console.error('getState error', e);
    return fallback;
  }
}

export function setState<T>(key: string, value: T): void {
  try {
    db.prepare('REPLACE INTO explorer_state (key, value) VALUES (?, ?)').run(
      key,
      JSON.stringify(value),
    );
  } catch (e) {
    console.error('setState error', e);
    throw e;
  }
}

export function removeState(key: string): void {
  try {
    db.prepare('DELETE FROM explorer_state WHERE key = ?').run(key);
  } catch (e) {
    console.error('removeState error', e);
    throw e;
  }
}

// --- Backup/Restore ---
export function exportAll(): object {
  return {
    nodes: getAllNodes(),
    state: db.prepare('SELECT * FROM explorer_state').all(),
    meta: db.prepare('SELECT * FROM meta').all(),
  };
}

type ImportData = {
  nodes: ExplorerNode[];
  state: { key: string; value: string }[];
  meta: { key: string; value: string }[];
};

export function importAll(data: ImportData): void {
  const { nodes, state, meta } = data;
  const tx = db.transaction(() => {
    db.prepare('DELETE FROM explorer_nodes').run();
    db.prepare('DELETE FROM explorer_state').run();
    db.prepare('DELETE FROM meta').run();
    for (const n of nodes) setNode(n);
    for (const s of state)
      db.prepare('REPLACE INTO explorer_state (key, value) VALUES (?, ?)').run(s.key, s.value);
    for (const m of meta)
      db.prepare('REPLACE INTO meta (key, value) VALUES (?, ?)').run(m.key, m.value);
  });
  tx();
}
