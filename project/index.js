//create variables from electron
const {app, BrowserWindow, globalShortcut} = require('electron');


function boot() {
    //create a new window and add attributes
    win = new BrowserWindow({
        width: 600,
        height: 400,
        icon: "icon.png"
    })

    //create window url as file path
    win.loadURL(`file://${__dirname}/index.html`)
    win.on('closed', () => {
        win = null
    })

    //template to create shortcuts
    globalShortcut.register('CommandOrControl+1', () =>{
        win.isMaximized() ? win.unmaximize() : win.maximize() 
    })
}

app.on('ready', boot);

