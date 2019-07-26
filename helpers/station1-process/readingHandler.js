const { ipcMain } = require('electron');
const { CHANNELS, SCANTIME } = require('../environments');
const STATION1 = require('../../data/station1');
const readHelper = require('../readHelper');
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const Store = require('electron-store');
const store = new Store();

const INTERVALS = [];

const KEYS = STATION1.storedKEYS;
const DATETIME = STATION1.datetime;
let cachedDatetime = null;
store.set(KEYS.headerDatetime, 'Reading...');
let cachedAutoManual = false;
store.set(KEYS.cachedAutoManual, false);

module.exports = (NODE, mainWindow) => {

    // Private functions
    const _addLL1TimeReadList = () => {
        const step1 = STATION1.datetime.step1;

        // Add Header Datetime
        NODE.conn.addItems(step1.onHH);
        NODE.conn.addItems(step1.onMM);
        NODE.conn.addItems(step1.offHH);
        NODE.conn.addItems(step1.offMM);
        NODE.conn.addItems(step1.autoManual);
        NODE.conn.addItems(STATION1.bits.ll1On);
        NODE.conn.addItems(STATION1.bits.ll1isOn);
    };
    
    const _parseDatetime = (data) => {
        const header = DATETIME.header;
        const date = data[header.date];
        const month = data[header.month];
        const year = data[header.year];
        const hour = data[header.hour];
        const minute = data[header.minute];
        const outputDatetime = `${date} ${monthNames[month]} ${year} ${hour}:${minute}`;

        if (JSON.stringify(cachedDatetime) !== JSON.stringify(outputDatetime)) {
            cachedDatetime = outputDatetime;
            mainWindow.webContents.send(CHANNELS.datetime, outputDatetime); // Send to channel                        
            store.set(KEYS.headerDatetime, outputDatetime); // Save datetime
        }
    };

    // Will read and keep watching for data change
    const _startLoop = () => {
        const loopInterval = setInterval(() => {
            readHelper(NODE)
                .then(data => {
                    _parseDatetime(data);
                })
                .catch(err => {
                    console.log(err);
                    const errMessage = 'Reading...';
                    _parseDatetime(errMessage);
                });

        }, SCANTIME);
        INTERVALS.push(loopInterval);
    };

    const _parseAutoManual = (data) => {
        if (cachedAutoManual !== data) {
            cachedAutoManual = cachedAutoManualResult;
            store.set(STATION1.storedKEYS.cachedAutoManual, cachedAutoManualResult);
            mainWindow.webContents.send(CHANNELS.cachedAutoManual, cachedAutoManualResult);
        }
    };

    const main = () => {
        INTERVALS.forEach(clearInterval); // Clear interval

        _addLL1TimeReadList();
        _startLoop();
    };

    main();
}

// const _getStreamOnlineStatus = () => {
//     const station = STATION1;
//     const NODE = CONNECTION[station.id];

//     const onlineStatusInterval = setInterval(() => {
//         // console.log('is online ', NODE.id, NODE.isOnline);
//         mainWindow.webContents.send(CHANNELS.onlineStatus, NODE.id, NODE.isOnline);
//     }, SCANTIME);
//     INTERVALS.push(onlineStatusInterval);
// }