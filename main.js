const electron = require('electron');
const url = require('url');
const path = require('path');
const { app, BrowserWindow, Menu, ipcMain } = electron;

// ----------   Node 7  -------------
const nodes7 = require('nodes7');  // This is the package name, if the repository is cloned you may need to require 'nodeS7' with uppercase S
const conn = new nodes7;
let doneReading = false;
let doneWriting = false;

var variables = { TEST1: 'MR4', 		// Memory real at MD4
		  TEST2: 'MW10', 		// Bit at M32.2
		  TEST3: 'M4.0', 		// Bit at M20.0
		  TEST4: 'DB1,DATETIME',	// Array of 20 values in DB1
		  TEST5: 'DB1,REAL4',		// Single real value
		  TEST6: 'DB1,REAL8',		// Another single real value
		  TEST7: 'DB1,INT12.2'		// Two integer value array
};

conn.initiateConnection({port: 102, host: '10.211.55.7', rack: 0, slot: 1}, connected); // slot 2 for 300/400, slot 1 for 1200/1500
//conn.initiateConnection({port: 102, host: '192.168.0.2', localTSAP: 0x0100, remoteTSAP: 0x0200, timeout: 8000}, connected); // local and remote TSAP can also be directly specified instead.  The timeout option specifies the TCP timeout.

function connected(err) {
	if (typeof(err) !== "undefined") {
		// We have an error.  Maybe the PLC is not reachable.
		console.log(err);
		// process.exit();
	}

	conn.setTranslationCB(function(tag) {return variables[tag];}); 	// This sets the "translation" to allow us to work with object names
}

function valuesReady(anythingBad, values) {
	if (anythingBad) { console.log("SOMETHING WENT WRONG READING VALUES!!!!"); }
	console.log(values);
	doneReading = true;
	if (doneWriting) { process.exit(); }
}

function valuesWritten(anythingBad) {
	if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
	console.log("Done writing.");
	doneWriting = true;
	if (doneReading) { process.exit(); }
}

// IPC calls
// Catch item:add
ipcMain.on('m4:click', (e, status) => {
    console.log(status);
    conn.writeItems('TEST3', true, valuesWritten);
});

ipcMain.on('m4:clickoff', (e, status) => {
    console.log(status);
    conn.writeItems('TEST3', false, valuesWritten);
});

// ----------  End Node 7  -------------

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
    
    // Prevent memory leak when windows is closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
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