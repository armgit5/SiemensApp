const electron = require('electron');
const url = require('url');
const path = require('path');
const { app, BrowserWindow, Menu, ipcMain } = electron;

// Starting main window
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 650,
        height: 400,
        resizable: false,
        show: false
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/pages/mainWindow-v2.html'),
        protocol: 'file',
        slashes: true
    }));

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);

    // Prevent memory leak when windows is closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.webContents.on('did-finish-load', () => {
        // Starting Siemens Nodes7
        require('./helpers/nodes7')(mainWindow);
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    })
});


// Quit when all windows are closed.
app.on('window-all-closed', function () {
    app.quit();
});

// Create menu template
const mainMenuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: 'Quit'
            }
        ]
    }
];

// Add dev tools item
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}