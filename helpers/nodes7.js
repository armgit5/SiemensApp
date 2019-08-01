const { ipcMain } = require('electron');
const Node = require('./node');
const { CHANNELS, SCANTIME } = require('./environments');
const STATION1 = require('../data/station1');
const initHelper = require('./initHelper');

let NODE; // Hold node connection
let STATION_ID = 0;

module.exports = (mainWindow) => {

    const _initNode = () => {
        NODE = null; // Clear node to kill old connection

        // Init station 1
        if (STATION_ID === 1) {
            NODE = new Node(STATION1.id, STATION1.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S1 is online ', isOnline);
                if (isOnline) {
                    require('./station1-process/readingHandler')(NODE, mainWindow);
                    require('./station1-process/clickHandler')(NODE, mainWindow);
                }
            });

            // const _removeLl1 = () => {
            //     ipcMain.on(CHANNELS.removeLl1, (e, _) => {
            //         console.log('remove ll1');
            //     });
            // };
            // _removeLl1();
        }
    };

    // Main Program
    const main = () => {
        // Get station id when page changes
        ipcMain.on(CHANNELS.onNewStation, (e, id) => {
            // If new id comes in then kills old connection and start 
            // new connection to new plc
            if (id !== STATION_ID) {
                STATION_ID = id;
                _initNode();
            }
        });
    }

    main();
};