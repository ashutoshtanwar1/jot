import { app, BrowserWindow, ipcMain } from 'electron';
import fs from 'fs';
import * as path from 'path';

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

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
