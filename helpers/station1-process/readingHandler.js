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
const KEYS = STATION1.storedKeys;
const DATETIME = STATION1.datetime;

module.exports = (NODE, mainWindow) => {

    // Private functions
    
    // ---- Add to read list ----- //
    const _addAutoManual = () => {
        NODE.conn.addItems(DATETIME.header.autoManual);
    }

    const _addLLnTime = (lln) => {
        for (let i = 1; i <= 4; i++) {
            let key = lln[`step${i}`];
            NODE.conn.addItems(key.onHH);
            NODE.conn.addItems(key.onMM);
            NODE.conn.addItems(key.onSS);
            NODE.conn.addItems(key.offHH);
            NODE.conn.addItems(key.offMM);
            NODE.conn.addItems(key.offSS);
        }
    };

    const _removeLLnTime = (lln) => {
        for (const i = 1; i <= 4; i++) {
            const key = lln[`step${i}`];
            NODE.conn.removeItems(key.onHH);
            NODE.conn.removeItems(key.onMM);
            NODE.conn.removeItems(key.onSS);
            NODE.conn.removeItems(key.offHH);
            NODE.conn.removeItems(key.offMM);
            NODE.conn.removeItems(key.offSS);
        }
    };

    const _addDatetime = () => { // Will be used on every page
        const datetime = STATION1.datetime;
        const datetimeHeader = datetime.header;

        NODE.conn.addItems(datetimeHeader.date);
        NODE.conn.addItems(datetimeHeader.month);
        NODE.conn.addItems(datetimeHeader.year);
        NODE.conn.addItems(datetimeHeader.minute);
        NODE.conn.addItems(datetimeHeader.hour);
        NODE.conn.addItems(datetimeHeader.second);
    }

    // ----- Parse data ------- //
    let cachedDatetime = null;
    store.set(KEYS.headerDatetime, 'Reading...');
    const _parseDatetime = (data) => {
        let outputDatetime = 'Reading...';

        if (data !== 'Reading...') {
            const header = DATETIME.header;
            const date = data[header.date];
            const month = data[header.month];
            const year = data[header.year];
            const hour = data[header.hour];
            const minute = data[header.minute];
            const second = data[header.second];
            outputDatetime = `${date} ${monthNames[month]} ${year} ${hour}:${minute}:${second}`;
        }

        mainWindow.webContents.send(CHANNELS.datetime, outputDatetime); // Send to channel                        
        store.set(KEYS.headerDatetime, outputDatetime); // Save datetime
        
    };



    const _parseLLnTime = (lln) => {


    }; 

    let cachedAutoManual = false;
    store.set(KEYS.autoManual, false);
    const _parseAutoManual = (data) => {
        const autoManual = data[DATETIME.header.autoManual];

        if (cachedAutoManual !== autoManual) {
            cachedAutoManual = autoManual;
            store.set(STATION1.storedKEYS.AutoManual, autoManual);
            mainWindow.webContents.send(CHANNELS.cachedAutoManual, autoManual);
        }
    };


    // ---- Loop Watch ---- //
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

    



    // ---- Main Program ---- //
    const main = () => {
        INTERVALS.forEach(clearInterval); // Clear interval

        const ll1 = DATETIME.ll1;

        //  ----  Catch page ---  //
        ipcMain.on(CHANNELS.onLLn, (e, lln) => {
            if (lln !== 'll1') {
                console.log('ll1');
            }
        });

        _addDatetime();
        _addAutoManual();
        _addLLnTime(ll1);
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