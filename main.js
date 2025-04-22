const { app, BrowserWindow } = require('electron');
const path = require('path');
let mainWindow;
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  const dev = process.env.NODE_ENV !== 'production';
  const url = dev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '.next/server/pages/index.html')}`;
  mainWindow.loadURL(url);
  if (dev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
app.on('ready', createMainWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});