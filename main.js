const electron = require('electron');
const url = require('url');
const path = require('path');
const { app, BrowserWindow, Menu, ipcMain } = electron;

// const SerialPort = require('serialport');
// const Readline = require('@serialport/parser-readline');
// const port = new SerialPort('/dev/cu.usbmodem1411', { baudRate: 9600, 
//     dataBits: 8, 
//     parity: 'none', 
//     stopBits: 1, 
//     flowControl: false  });
// const parser = port.pipe(new Readline({ delimiter: '\n' }));

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

conn.initiateConnection({port: 102, host: '192.168.0.11', rack: 0, slot: 1}, connected); // slot 2 for 300/400, slot 1 for 1200/1500
//conn.initiateConnection({port: 102, host: '192.168.0.2', localTSAP: 0x0100, remoteTSAP: 0x0200, timeout: 8000}, connected); // local and remote TSAP can also be directly specified instead.  The timeout option specifies the TCP timeout.

function connected(err) {
	if (typeof(err) !== "undefined") {
		// We have an error.  Maybe the PLC is not reachable.
		console.log(err);
		// process.exit();
	}

	conn.setTranslationCB(function(tag) {return variables[tag];}); 	// This sets the "translation" to allow us to work with object names
	
	// conn.writeItems('M4.0', true, valuesWritten);
	// conn.addItems('M4.0');
	// conn.readAllItems(valuesReady);
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

// ----------   Node 7  -------------


let mainWindow;

// Read the port data
// port.on("open", () => {
//     console.log('serial port open');
// });

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

const _writeMessage = (message) => {
    // port.write(message, (err) => {
    //     if (err) {
    //         return console.log('Error on write: ', err.message);
    //     }
    //     console.log('message written');
    // });
}

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