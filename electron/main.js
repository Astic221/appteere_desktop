const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
    },
  });

  win.loadURL("https://desktop.appteere.com"); // ou localhost:PORT
}

app.whenReady().then(createWindow);
