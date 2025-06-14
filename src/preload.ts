import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  isElectron: true,
  readAllData: () => ipcRenderer.invoke('readAllData'),
  writeAllData: (data: Record<string, unknown>) => ipcRenderer.invoke('writeAllData', data),
  explorer: {
    getNode: (id: string) => ipcRenderer.invoke('explorer:getNode', id),
    getAllNodes: () => ipcRenderer.invoke('explorer:getAllNodes'),
    setNode: (node: Record<string, unknown>) => ipcRenderer.invoke('explorer:setNode', node),
    removeNode: (id: string) => ipcRenderer.invoke('explorer:removeNode', id),
    getState: (key: string, fallback: unknown) =>
      ipcRenderer.invoke('explorer:getState', key, fallback),
    setState: (key: string, value: unknown) => ipcRenderer.invoke('explorer:setState', key, value),
    removeState: (key: string) => ipcRenderer.invoke('explorer:removeState', key),
    exportAll: () => ipcRenderer.invoke('explorer:exportAll'),
    importAll: (data: object) => ipcRenderer.invoke('explorer:importAll', data),
    onDataChanged: (callback: (payload: unknown) => void) => {
      const listener = (_event: unknown, payload: unknown) => callback(payload);
      ipcRenderer.on('explorer:dataChanged', listener);
      return () => ipcRenderer.removeListener('explorer:dataChanged', listener);
    },
  },
});
