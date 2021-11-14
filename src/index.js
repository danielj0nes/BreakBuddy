const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const electron = require("electron");
const path = require('path');
const Logger = require('./logging.js');
const Store = require('electron-store');

Store.initRenderer();

const logger = new Logger();

const iconName = "breakbuddy_tray_icon.png"

// Restore character creation window from tray icon
function openFromContext() {
  createWindow();
  tray.destroy();
  BrowserWindow.getAllWindows()[1].close();
}

// Tray icon context menu
const contextMenu = Menu.buildFromTemplate([
  {click: () => openFromContext(), label: "Customise Character"}
])

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Character creation window
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 900,
    height: 900,
    icon: path.join(__dirname, `assets/${iconName}`),
    webPreferences: {
      nodeIntegration: true,
      // Remove this if ever loading external content
      contextIsolation: false
    }
  });
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  // mainWindow.webContents.openDevTools();
};

// Main BreakBuddy character display window
const createBreakBuddyWindow = () => {
  // console.log(screenElectron)
  const screenElectron = electron.screen.getPrimaryDisplay().size;
  const breakBuddyWindow = new BrowserWindow({
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
    icon: path.join(__dirname, `assets/${iconName}`),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
   });
  breakBuddyWindow.loadFile(path.join(__dirname, 'character_display.html'));
}

// Listen for the start break buddy button press event
ipcMain.on("startBreakbuddy", function (evt, message) {
  if (message == "start") {
    createBreakBuddyWindow();
    const iconPath = path.join(__dirname, `assets/${iconName}`)
    tray = new Tray(iconPath);
    tray.setToolTip("Breakbuddy");
    tray.setContextMenu(contextMenu);
    BrowserWindow.getAllWindows()[1].close();
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
})

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
