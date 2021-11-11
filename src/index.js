const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');
const electron = require("electron");
const path = require('path');
const Logger = require('./logging.js');
const Store = require('electron-store');


Store.initRenderer();

// Start logging functionality
const logger = new Logger();


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  const screenElectron = electron.screen.getPrimaryDisplay().size;
  // console.log(screenElectron)
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      // Remove this if loading external content
      contextIsolation: false
    }
  });
  const secondWindow = new BrowserWindow({
    width: 75,
    height: 75,
    maximizable: false,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    hasShadow: false,
    resizable: false,
    x: screenElectron.width - 100,
    y: screenElectron.height - 200,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
   });
  // Load windows
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  secondWindow.loadFile(path.join(__dirname, 'character_display.html'));
  // Open the DevTools. Comment this out when building a distribution.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
