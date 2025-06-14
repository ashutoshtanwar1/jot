interface ExplorerIpc {
  getNode: (id: string) => Promise<unknown>;
  getAllNodes: () => Promise<unknown[]>;
  setNode: (node: Record<string, unknown>) => Promise<void>;
  removeNode: (id: string) => Promise<void>;
  getState: (key: string, fallback: unknown) => Promise<unknown>;
  setState: (key: string, value: unknown) => Promise<void>;
  removeState: (key: string) => Promise<void>;
  exportAll: () => Promise<object>;
  importAll: (data: object) => Promise<void>;
  onDataChanged: (callback: (payload: unknown) => void) => () => void;
}

interface ExplorerApi {
  isElectron: boolean;
  readAllData: () => Promise<Record<string, unknown>>;
  writeAllData: (data: Record<string, unknown>) => Promise<void>;
  explorer: ExplorerIpc;
}

interface Window {
  api?: ExplorerApi;
}
