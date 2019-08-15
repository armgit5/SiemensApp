const { ipcMain } = require('electron');
const Node = require('./node');
const { CHANNELS, SCANTIME } = require('./environments');
const STATION1 = require('../data/station1');
const STATION2 = require('../data/station2');
const STATION3 = require('../data/station3');
const STATION4 = require('../data/station4');
const initHelper = require('./initHelper');

let NODE; // Hold node connection
let STATION_ID = 0;
let aNodeIsOnline = false;

module.exports = (mainWindow) => {

    const _initNode = () => {
        if (aNodeIsOnline) {
            console.log('kill the existing node', NODE);
            NODE.conn.dropConnection((cb) => {
                console.log('drop connection', cb);
            });
            NODE = null; // Clear node to kill old connection
        }

        // Init station 1
        if (STATION_ID === 1) {
            NODE = new Node(STATION1.id, STATION1.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S1 is online ', isOnline, NODE);
                if (isOnline) {
                    aNodeIsOnline = true;
                    require('./station1-process/readingHandler')(NODE, mainWindow);
                    require('./station1-process/clickHandler')(NODE, mainWindow);
                }
            });
        }

        if (STATION_ID === 2) {
            NODE = new Node(STATION2.id, STATION2.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S2 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 2 sucessfully');
                    require('./station1-process/readingHandler')(NODE, mainWindow);
                    require('./station1-process/clickHandler')(NODE, mainWindow);
                }
            });
        }

        if (STATION_ID === 3) {
            NODE = new Node(STATION3.id, STATION3.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S3 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 3 sucessfully');
                    require('./station1-process/readingHandler')(NODE, mainWindow);
                    require('./station1-process/clickHandler')(NODE, mainWindow);
                }
            });
        }

        if (STATION_ID === 4) {
            NODE = new Node(STATION4.id, STATION4.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S4 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 4 sucessfully');
                    require('./station1-process/readingHandler')(NODE, mainWindow);
                    require('./station1-process/clickHandler')(NODE, mainWindow);
                }
            });
        }


    };

    // Main Program
    const main = () => {
        // Get station id when page changes
        ipcMain.on(CHANNELS.onNewStation, (e, id) => {
            // If new id comes in then kills old connection and start 
            // new connection to new plc
            console.log(id);
            if (id !== STATION_ID) {
                STATION_ID = id;
                _initNode();
            }
        });
    }

    main();
};