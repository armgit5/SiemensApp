const electron = require('electron');
const url = require('url');
const path = require('path');
const { app, BrowserWindow, Menu, ipcMain } = electron;

require('./helpers/nodes7')();

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow();

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
});

// Catch button:on
ipcMain.on('button:on', (e, item) => {
    _writeMessage(item);
    console.log(item);
});

// Catch button:off
ipcMain.on('button:off', (e, item) => {
    _writeMessage(item);
    console.log(item);
});

// Catch swipe left or right
ipcMain.on('swipe:left-right', (e, direction, pixel) => {
    const message = direction + ',' + pixel + '\n';
    _writeMessage(message);
    console.log(message);
});

// Create menu template
const mainMenuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: 'Add Item'
            },
            {
                label: 'Clear Items'
            },
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