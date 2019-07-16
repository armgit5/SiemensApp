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
        node.conn.addItems('M4.0');
        node.conn.readAllItems(node.valuesReady);
        node.conn.writeItems('M6.0', true, node.valuesWritten);

        // Read M Items
        node.conn.addItems('M4.0');
        node.conn.addItems('M4.0');
        node.conn.addItems('MW80');
        node.conn.addItems('MW82');

        // Read Data Blocks
        node.conn.addItems('DB8,INT6.4');

        node.conn.readAllItems(node.valuesReady);
        mainWindow.webContents.send('get:connections', connections);

        // Assign read to M4
        const M4 = node.conn.readAllItems(node.valuesReady);
    });

    ipcMain.on('m4:clickoff', (e, id, status) => {
        console.log(status);
        const node = connections[id];
        node.conn.addItems('M4.0');
        node.conn.readAllItems(node.valuesReady);
        node.conn.writeItems('M6.0', false, node.valuesWritten);
        node.conn.addItems('M4.0');
        node.conn.readAllItems(node.valuesReady);


    });
}