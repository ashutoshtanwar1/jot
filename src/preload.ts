import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  isElectron: true,
  readAllData: () => ipcRenderer.invoke('readAllData'),
  writeAllData: (data: Record<string, unknown>) => ipcRenderer.invoke('writeAllData', data),
});
