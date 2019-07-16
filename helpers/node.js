const nodes7 = require('nodes7');  // This is the package name, if the repository is cloned you may need to require 'nodeS7' with uppercase S
const variables = require('./variables');

module.exports = class Node {
    constructor(id, ip) {
        this.id = id;
        this.ip = ip;
        this.doneReading = false;
        this.doneWriting = false;
        this.conn = new nodes7;
        this.variables = {
            TEST1: 'M4.0'
        };
        this.initConnection();
    }

    initConnection() {
        this.conn.initiateConnection({ port: 102, host: this.ip, rack: 0, slot: 1 }, this.connected); // slot 2 for 300/400, slot 1 for 1200/1500
    }

    connected(err) {
        if (typeof (err) !== "undefined") {
            // We have an error.  Maybe the PLC is not reachable.
            console.log(err);
        } else {
            if (this.conn) {
                this.conn.setTranslationCB((tag) => { return this.variables[tag]; }); 	// This sets the "translation" to allow us to work with object names
            }
        }
    }

    valuesReady(anythingBad, values) {
        if (anythingBad) { console.log("SOMETHING WENT WRONG READING VALUES!!!!"); }
        console.log(values);
        this.doneReading = true;
        // if (this.doneWriting) { process.exit(); }
    }

    valuesWritten(anythingBad) {
        if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
        console.log("Done writing.");
        this.doneWriting = true;
        // if (this.doneReading) { process.exit(); }
    }

};