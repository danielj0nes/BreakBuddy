const { app, BrowserWindow, ipcMain, Tray, Menu } = require("electron");
const electron = require("electron");
const path = require("path");
const Store = require("electron-store");
const ioHook = require("iohook");
const store = new Store();
Store.initRenderer();

const iconName = "icon.ico";
const timeMultiplier = 60000;
const nuisanceTimer = 2; // Minutes between character moving around
let screenElectron;
let tray;
let stopTimer;
let nuisanceInterval;
let bbWidth = 90;
let bbHeight = 90;

// Restore character creation window from tray icon
function openFromContext() {
    createWindow();
    tray.destroy();
    BrowserWindow.getAllWindows()[1].close();
}

// Tray icon context menu
const contextMenu = Menu.buildFromTemplate([
    {click: () => openFromContext(), label: "Customise Character"},
    {click: () => BrowserWindow.getAllWindows()[0].close(), label: "Close"}
]);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) { // eslint-disable-line global-require
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
    mainWindow.loadFile(path.join(__dirname, "index.html"));
    // mainWindow.webContents.openDevTools();
};

// Main BreakBuddy character display window
const createBreakBuddyWindow = () => {
    // console.log(screenElectron)
    const breakBuddyWindow = new BrowserWindow({
        width: bbWidth,
        height: bbHeight,
        maximizable: false,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        hasShadow: false,
        resizable: false,
        skipTaskbar: true,
        x: screenElectron.width - 200,
        y: screenElectron.height - 300,
        icon: path.join(__dirname, `assets/${iconName}`),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    breakBuddyWindow.loadFile(path.join(__dirname, "character_display.html"));
    // breakBuddyWindow.webContents.openDevTools();
};

// Listen for the start break buddy button press event
ipcMain.on("startBreakbuddy", function (evt, message) {
    if (message == "start") {
        let breakDuration = store.get("breakDuration") * timeMultiplier;
        createBreakBuddyWindow();
        const iconPath = path.join(__dirname, `assets/${iconName}`);
        tray = new Tray(iconPath);
        tray.setToolTip("BreakBuddy");
        tray.setContextMenu(contextMenu);
        if (process.platform == "darwin") console.log("Check")
        else BrowserWindow.getAllWindows()[1].close();
        
        // Start logging movements to track idle time (i.e., if break taken)
        // This doesn't work on certain applications (so far only LoL client...)
        ioHook.on("mousemove", (ev) => {
            clearTimeout(stopTimer);
            stopTimer = setTimeout(() => {BrowserWindow.getAllWindows()[0].webContents.send("stopTimer");}, breakDuration);
        });
        ioHook.on("keydown", (ev) => {
            clearTimeout(stopTimer);
            stopTimer = setTimeout(() => {BrowserWindow.getAllWindows()[0].webContents.send("stopTimer");}, breakDuration);
        });
        ioHook.start();
    }
});

ipcMain.on("nuisance", function (evt, message) {
    if (message == "start") {
        nuisanceInterval = setInterval(() => {
            let randBBX = Math.floor(Math.random() * (screenElectron.width - 200));
            let randBBY = Math.floor(Math.random() * (screenElectron.height - 200));
            BrowserWindow.getAllWindows()[0].setPosition(randBBX, randBBY);
            // To do: convert this to a chat bubble from the character
        }, timeMultiplier * nuisanceTimer);
    }
    if (message == "stop") {
        clearInterval(nuisanceInterval);
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
    screenElectron = electron.screen.getPrimaryDisplay().size;
    createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
