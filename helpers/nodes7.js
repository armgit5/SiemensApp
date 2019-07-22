const { ipcMain } = require('electron');
const Node = require('./node');
const { CHANNELS, SCANTIME } = require('./environments');
const STATION1 = require('../data/station1');

const NODE; // Hold node connection
let STATION_ID = 0;

module.exports = (mainWindow) => {

    const _addStation1DatetimeReadList = () => { // Will be used on every page
        const dateTime = STATION1.dateTime;
        const dateTimeHeader = dateTime.header;

        NODE.conn.addItems(dateTimeHeader.date);
        NODE.conn.addItems(dateTimeHeader.month);
        NODE.conn.addItems(dateTimeHeader.year);
        NODE.conn.addItems(dateTimeHeader.minute);
        NODE.conn.addItems(dateTimeHeader.hour);
    }

    const _initNode = () => {
        INTERVALS.forEach(clearInterval); // Clear interval
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