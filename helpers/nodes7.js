const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const nodes7 = require('nodes7');  // This is the package name, if the repository is cloned you may need to require 'nodeS7' with uppercase S

class Node {
    constructor(id, ip) {
        this.id = id;
        this.ip = ip;
        this.doneReading = false;
        this.doneWriting = false;
        this.conn = new nodes7;
        this.initConnection();
        this.variables = {
           TEST1: 'M4.0'
        };
    }

    initConnection() {
        this.conn.initiateConnection({ port: 102, host: this.ip, rack: 0, slot: 1 }, this.connected); // slot 2 for 300/400, slot 1 for 1200/1500
    }

    connected(err) {
        if (typeof (err) !== "undefined") {
            // We have an error.  Maybe the PLC is not reachable.
            console.log(err);
        } else {
            this.conn.setTranslationCB((tag) => { return this.variables[tag]; }); 	// This sets the "translation" to allow us to work with object names
        }
    }

    valuesReady(anythingBad, values) {
        if (anythingBad) { console.log("SOMETHING WENT WRONG READING VALUES!!!!"); }
        console.log(values);
        this.doneReading = true;
        if (this.doneWriting) { process.exit(); }
    }

    valuesWritten(anythingBad) {
        if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
        console.log("Done writing.");
        this.doneWriting = true;
        if (this.doneReading) { process.exit(); }
    }

}

module.exports = () => {
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
    });
   
    // IPC calls
    // Catch item:add
    ipcMain.on('m4:click', (e, id, status) => {
        console.log(id, status);
        const node = connections[id];
        node.conn.writeItems('M4.0', true, node.valuesWritten);
    });

    ipcMain.on('m4:clickoff', (e, id, status) => {
        console.log(status);
        const node = connections[id];
        node.conn.writeItems('M4.0', false, node.valuesWritten);
    });
}