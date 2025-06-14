import { fork } from 'child_process';
import { app, BrowserWindow, ipcMain } from 'electron';
import fs from 'fs';
import * as path from 'path';
import {
  ExplorerNode,
  exportAll,
  getAllNodes,
  getNode,
  getState,
  importAll,
  removeNode,
  removeState,
  setNode,
  setState,
} from './explorer-sqlite-storage';

const isDev = !app.isPackaged;

function createWindow() {
  const preloadPath = isDev
    ? path.resolve(__dirname, '../preload/preload.cjs')
    : path.join(__dirname, '../preload/preload.cjs');

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: preloadPath,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../out/renderer/index.html'));
  }
}

function getDataPath() {
  const home = process.env.HOME || process.env.USERPROFILE || '';
  return path.join(home, 'jot-explorer-data.json');
}

ipcMain.handle('readAllData', async () => {
  const dataPath = getDataPath();
  if (fs.existsSync(dataPath)) {
    try {
      const raw = fs.readFileSync(dataPath, 'utf-8');
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
  return {};
});

ipcMain.handle('writeAllData', async (_event, data) => {
  const dataPath = getDataPath();
  fs.writeFileSync(dataPath, JSON.stringify(data), 'utf-8');
  return true;
});

// --- IPC handlers for explorer storage ---
ipcMain.handle('explorer:getNode', (_event, id: string) => getNode(id));
ipcMain.handle('explorer:getAllNodes', () => getAllNodes());
ipcMain.handle('explorer:setNode', (_event, node: ExplorerNode) => {
  setNode(node);
  // Notify all renderer windows
  BrowserWindow.getAllWindows().forEach(win => {
    win.webContents.send('explorer:dataChanged', { id: node.id });
  });
  return true;
});
ipcMain.handle('explorer:removeNode', (_event, id: string) => {
  removeNode(id);
  BrowserWindow.getAllWindows().forEach(win => {
    win.webContents.send('explorer:dataChanged', { id });
  });
  return true;
});
ipcMain.handle('explorer:getState', (_event, key: string, fallback: unknown) =>
  getState(key, fallback),
);
ipcMain.handle('explorer:setState', (_event, key: string, value: unknown) => {
  setState(key, value);
  BrowserWindow.getAllWindows().forEach(win => {
    win.webContents.send('explorer:dataChanged', { key });
  });
  return true;
});
ipcMain.handle('explorer:removeState', (_event, key: string) => {
  removeState(key);
  BrowserWindow.getAllWindows().forEach(win => {
    win.webContents.send('explorer:dataChanged', { key });
  });
  return true;
});
ipcMain.handle('explorer:exportAll', () => exportAll());
ipcMain.handle('explorer:importAll', (_event, data) => {
  importAll(data);
  BrowserWindow.getAllWindows().forEach(win => {
    win.webContents.send('explorer:dataChanged', { all: true });
  });
  return true;
});

let mcpServerProcess: ReturnType<typeof fork> | null = null;

app.whenReady().then(() => {
  createWindow();

  // Start MCP server in background
  mcpServerProcess = fork(path.join(__dirname, '../main/mcp.js'));

  // Add handler for messages from MCP server
  if (mcpServerProcess) {
    mcpServerProcess.on('message', async msg => {
      // Type guard: ensure msg is an object with action and requestId
      if (typeof msg !== 'object' || msg === null || !('action' in msg) || !('requestId' in msg)) {
        return;
      }

      if (msg.action === 'listDocuments') {
        try {
          const documents = await getAllNodes();
          mcpServerProcess?.send({
            requestId: msg.requestId,
            result: documents,
          });
        } catch (error) {
          mcpServerProcess?.send({
            requestId: msg.requestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      }
      // Add more actions as needed
    });
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (mcpServerProcess) {
    mcpServerProcess.kill();
    mcpServerProcess = null;
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
