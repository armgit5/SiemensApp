const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const Node = require('./node');

module.exports = (mainWindow) => {
    const connections = {}; // Hold nodes connection

    // Read json file
    const p = path.join(
        path.dirname(process.mainModule.filename),
        'data',
        'stations.json'
    );
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            console.log('error reading file');
        }
        const data = JSON.parse(fileContent);
        console.log(data);
        const node = new Node(data[0].id, data[0].ip);
        connections[data[0].id] = node;

        mainWindow.webContents.send('get:data', data); // Send data to front end
    });
   
    // IPC calls
    // Catch item:add
    ipcMain.on('m4:click', (e, id, status) => {
        console.log(id, status);
        const node = connections[id];
        node.conn.writeItems('M4.0', true, node.valuesWritten);
        mainWindow.webContents.send('get:connections', connections);
    });

    ipcMain.on('m4:clickoff', (e, id, status) => {
        console.log(status);
        const node = connections[id];
        node.conn.writeItems('M4.0', false, node.valuesWritten);
    });
}