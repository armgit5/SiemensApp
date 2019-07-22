const { ipcMain } = require('electron');
const Node = require('./node');
const { CHANNELS, SCANTIME } = require('./environments');
const STATION1 = require('../data/station1');

let NODE; // Hold node connection
let STATION_ID = 0;

module.exports = (mainWindow) => {

    const _addStation1DatetimeReadList = () => { // Will be used on every page
        const datetime = STATION1.datetime;
        const datetimeHeader = datetime.header;

        NODE.conn.addItems(datetimeHeader.date);
        NODE.conn.addItems(datetimeHeader.month);
        NODE.conn.addItems(datetimeHeader.year);
        NODE.conn.addItems(datetimeHeader.minute);
        NODE.conn.addItems(datetimeHeader.hour);
    }

    const _initNode = () => {
        NODE = null; // Clear node to kill old connection

        // Init station 1
        if (STATION_ID === 1) {
            NODE = new Node(STATION1.id, STATION1.ip);
            _addStation1DatetimeReadList();
            require('./station1-process/readingHandler')(NODE, mainWindow);
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