const { ipcMain } = require('electron');
const Node = require('./node');
const { CHANNELS, SCANTIME } = require('./environments');
const STATION1 = require('../data/station1');
const STATION2 = require('../data/station2');
const STATION3 = require('../data/station3');
const STATION4 = require('../data/station4');
const STATION5 = require('../data/station5');
const STATION6 = require('../data/station6');
const STATION7 = require('../data/station7');
const STATION8 = require('../data/station8');
const STATION9 = require('../data/station9');
const STATION10 = require('../data/station10');
const STATION11 = require('../data/station11');
const STATION12 = require('../data/station12');
const initHelper = require('./initHelper');

let NODE; // Hold node connection
let STATION_ID = 0;
const KEYS = STATION1.storedKeys;
let aNodeIsOnline = false;
let initReadWrite = false;
const Store = require('electron-store');
const store = new Store();

module.exports = (mainWindow) => {

    const _sendDefaultDatetime = () => {
        const outputDatetime = 'Reading...';
        mainWindow.webContents.send(CHANNELS.datetime, outputDatetime); // Send to channel                        
        store.set(KEYS.headerDatetime, outputDatetime); // Save datetime
    };

    const _initReadWrite = (n) => {
        if (aNodeIsOnline) {
            require('./station1-process/readingHandler')(n, mainWindow);
            require('./station1-process/clickHandler')(n, mainWindow);
        }
    }

    const _connect = () => {
        // Init station 1
        if (STATION_ID === 1) {
            // NODE = null;
            NODE = new Node(STATION1.id, STATION1.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S1 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 2 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
                }
            });
        }

        if (STATION_ID === 2) {
            // NODE = null;
            NODE = new Node(STATION2.id, STATION2.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S2 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 2 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
                }
            });
        }

        if (STATION_ID === 3) {
            // NODE = null;
            NODE = new Node(STATION3.id, STATION3.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S3 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 3 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
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
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
                }
            });
        }

        if (STATION_ID === 5) {
            NODE = new Node(STATION5.id, STATION5.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S5 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 5 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
                }
            });
        }

        if (STATION_ID === 6) {
            NODE = new Node(STATION6.id, STATION6.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S6 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 6 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
                }
            });
        }

        if (STATION_ID === 7) {
            NODE = new Node(STATION7.id, STATION7.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S7 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 7 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
                }
            });
        }

        if (STATION_ID === 8) {
            NODE = new Node(STATION8.id, STATION8.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S8 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 8 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
                }
            });
        }

        if (STATION_ID === 9) {
            NODE = new Node(STATION9.id, STATION9.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S9 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 9 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
                }
            });
        }

        if (STATION_ID === 10) {
            NODE = new Node(STATION10.id, STATION10.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S10 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 10 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
                }
            });
        }

        if (STATION_ID === 11) {
            NODE = new Node(STATION11.id, STATION11.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S11 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 11 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
                }
            });
        }

        if (STATION_ID === 12) {
            NODE = new Node(STATION12.id, STATION12.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S12 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 12 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
                }
            });
        }
    };


    const _initNode = () => {
        if (NODE) {
            console.log('kill the existing node');
            NODE.conn.dropConnection((cb) => {
                console.log('drop connection', cb);
                NODE.conn = null; // Clear node to kill old connection
                NODE = null;
                aNodeIsOnline = false;
                _connect();
            });
        } else {
            _connect();
        };
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