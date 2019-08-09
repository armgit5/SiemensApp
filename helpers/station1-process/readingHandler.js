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
const LL1 = DATETIME.ll1;
const ll2 = DATETIME.ll2;
const ll3 = DATETIME.ll3;
let LLN = 0;

module.exports = (NODE, mainWindow) => {

    // Private functions
    const _stopIntervals = () => {
        INTERVALS.forEach(clearInterval); // Clear interval
    }

    // ---- Add to read list ----- //
    const _addAutoManual = () => {
        NODE.conn.addItems(DATETIME.header.autoManual);
    }

    const _addllnBits = () => {
        NODE.conn.addItems(STATION1.bits.ll1isOn);
        NODE.conn.addItems(STATION1.bits.ll2isOn);
        NODE.conn.addItems(STATION1.bits.ll3isOn);
    };

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
        // Loop through 4 steps
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

    // Remove if exists
    const _removeAllLLn = (data) => {
        // Loop through 3 lln
        for (const i = 1; i <= 3; i++) {
            const lln = DATETIME[`ll${i}`];
            if (data[lln].step1.onHH) {
                _removeLLnTime(lln);
            }
        }
    }

    const _removeLl1 = () => {
        ipcMain.on(CHANNELS.removeLl1, (e, _) => {
            console.log('remove ll1');
            _removeLLnTime(LL1);
        });
    };

    const _removeLl2 = () => {
        ipcMain.on(CHANNELS.removeLl2, (e, _) => {
            console.log('remove ll2');
            _removeLLnTime(LL2);
        });
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
    // let cachedDatetime = null;
    // store.set(KEYS.headerDatetime, 'Reading...');
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

    let cachedAutoManual = store.get(CHANNELS.autoManual);
    const _parseAutoManual = (data) => {
        const autoManual = data[DATETIME.header.autoManual];

        if (cachedAutoManual !== autoManual) {
            cachedAutoManual = autoManual;
            store.set(CHANNELS.autoManual, autoManual);
            mainWindow.webContents.send(CHANNELS.autoManual, autoManual);
        }
    };

    let ll1On = false;
    let ll2On = false;
    let ll3On = false;
    const _parseLLn = (data) => {
        const ll1OnResult = data[STATION1.bits.ll1isOn];
        const ll2OnResult = data[STATION1.bits.ll2isOn];
        const ll3OnResult = data[STATION1.bits.ll3isOn];

        if (ll1On !== ll1OnResult) {
            ll1On = ll1OnResult;
            store.set(CHANNELS.ll1On, ll1On);
            mainWindow.webContents.send(CHANNELS.ll1On, ll1On);
        }

        if (ll2On !== ll2OnResult) {
            ll2On = ll2OnResult;
            store.set(CHANNELS.ll2On, ll2On);
            mainWindow.webContents.send(CHANNELS.ll2On, ll2On);
        }

        if (ll3On !== ll3OnResult) {
            ll3On = ll3OnResult;
            store.set(CHANNELS.ll3On, ll3On);
            mainWindow.webContents.send(CHANNELS.ll3On, ll3On);
        }
    }

    // ---- Loop Watch ---- //
    // Will read and keep watching for data change
    const _startLoop = (n) => {
        const loopInterval = setInterval(() => {
            readHelper(NODE)
                .then(data => {
                    _parseDatetime(data);
                    // console.log(data);
                    _parseAutoManual(data);
                    _parseLLn(data);
                    if (n === 1) {
                        // console.log('reading step1', data);
                        require('./readingll1step1')(mainWindow, data);
                        require('./readingll1step2')(mainWindow, data);
                        require('./readingll1step3')(mainWindow, data);
                        require('./readingll1step4')(mainWindow, data);
                    }

                    if (n === 2) {
                        require('./readingll2/readingllnstep1')(mainWindow, data);
                        require('./readingll2/readingllnstep2')(mainWindow, data);
                        require('./readingll2/readingllnstep3')(mainWindow, data);
                        require('./readingll2/readingllnstep4')(mainWindow, data);
                    }
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

        _stopIntervals();
        _addDatetime();
        _addAutoManual();
        _addllnBits();
        _startLoop(0);

        console.log('starting reading main');
        //  ----  Catch page ---  //
        ipcMain.on(CHANNELS.onLLn, (e, lln) => {
            console.log(lln);
            if (lln === 1) {
                console.log('ll1');
                _stopIntervals();
                _addLLnTime(LL1);
                _startLoop(1);
                _removeLl1(); // Listen for ll1 page change
            }

            if (lln === 2) {
                console.log('ll2');
                _stopIntervals();
                _addLLnTime(LL2);
                _startLoop(2);
                _removeLl2(); // Listen for ll1 page change
            }
        });
    };

    main();
};