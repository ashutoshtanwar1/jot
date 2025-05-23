interface ExplorerApi {
  isElectron: boolean;
  readAllData: () => Promise<Record<string, unknown>>;
  writeAllData: (data: Record<string, unknown>) => Promise<void>;
}

interface Window {
  api?: ExplorerApi;
}
