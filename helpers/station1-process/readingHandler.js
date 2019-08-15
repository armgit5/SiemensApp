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
const LL2 = DATETIME.ll2;
const LL3 = DATETIME.ll3;
const LL4 = DATETIME.ll4;
const LL5 = DATETIME.ll5;
const LL6 = DATETIME.ll6;
const LL7 = DATETIME.ll7;
const LL8 = DATETIME.ll8;
const LL9 = DATETIME.ll9;
const LL10 = DATETIME.ll10;
const LL11 = DATETIME.ll11;
const LL12 = DATETIME.ll12;
const LL13 = DATETIME.ll13;
const LL14 = DATETIME.ll14;
const LL15 = DATETIME.ll15;

let storeReadLLn = [];
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
            // storeReadLLn.push(key.onHH);
            NODE.conn.addItems(key.onMM);
            // storeReadLLn.push(key.onMM);
            NODE.conn.addItems(key.onSS);
            // storeReadLLn.push(key.onSS);
            NODE.conn.addItems(key.offHH);
            // storeReadLLn.push(key.offHH);
            NODE.conn.addItems(key.offMM);
            // storeReadLLn.push(key.offMM);
            NODE.conn.addItems(key.offSS);
            // storeReadLLn.push(key.offSS);
        }

        readHelper(NODE)
            .then(data => {
                console.log(data, Object.keys(data).length);
            });

    };

    const _removeLLnTime = (lln) => {
        // Loop through 4 steps
        for (let i = 1; i <= 4; i++) {
            let key = lln[`step${i}`];
            NODE.conn.removeItems(key.onHH);
            NODE.conn.removeItems(key.onMM);
            NODE.conn.removeItems(key.onSS);
            NODE.conn.removeItems(key.offHH);
            NODE.conn.removeItems(key.offMM);
            NODE.conn.removeItems(key.offSS);
        }

        readHelper(NODE)
            .then(data => {
                console.log(data);
            });

    };

    const _removeLl1 = () => {
        ipcMain.on(CHANNELS.removeLl1, (e, _) => {
            console.log('remove ll1');
            _stopIntervals();
            _removeLLnTime(LL1);
            _startLoop(0);
        });
    };
    const _removeLl2 = () => {
        ipcMain.on(CHANNELS.removeLl2, (e, _) => {
            console.log('remove ll2');
            _stopIntervals();
            _removeLLnTime(LL2);
            _startLoop(0);
        });
    };
    const _removeLl3 = () => {
        ipcMain.on(CHANNELS.removeLl3, (e, _) => {
            console.log('remove ll3');
            _stopIntervals();
            _removeLLnTime(LL3);
            _startLoop(0);
        });
    };
    const _removeLl4 = () => {
        ipcMain.on(CHANNELS.removeLl4, (e, _) => {
            console.log('remove ll4');
            _stopIntervals();
            _removeLLnTime(LL4);
            _startLoop(0);
        });
    };
    const _removeLl5= () => {
        ipcMain.on(CHANNELS.removeLl5, (e, _) => {
            console.log('remove ll5');
            _stopIntervals();
            _removeLLnTime(LL5);
            _startLoop(0);
        });
    };
    const _removeLl6 = () => {
        ipcMain.on(CHANNELS.removeLl6, (e, _) => {
            console.log('remove ll6');
            _stopIntervals();
            _removeLLnTime(LL6);
            _startLoop(0);
        });
    };
    const _removeLl7 = () => {
        ipcMain.on(CHANNELS.removeLl7, (e, _) => {
            console.log('remove ll7');
            _stopIntervals();
            _removeLLnTime(LL7);
            _startLoop(0);
        });
    };
    const _removeLl8 = () => {
        ipcMain.on(CHANNELS.removeLl8, (e, _) => {
            console.log('remove ll8');
            _stopIntervals();
            _removeLLnTime(LL8);
            _startLoop(0);
        });
    };
    const _removeLl9 = () => {
        ipcMain.on(CHANNELS.removeLl9, (e, _) => {
            console.log('remove ll9');
            _stopIntervals();
            _removeLLnTime(LL9);
            _startLoop(0);
        });
    };
    const _removeLl10 = () => {
        ipcMain.on(CHANNELS.removeLl10, (e, _) => {
            console.log('remove ll10');
            _stopIntervals();
            _removeLLnTime(LL10);
            _startLoop(0);
        });
    };
    const _removeLl11 = () => {
        ipcMain.on(CHANNELS.removeLl11, (e, _) => {
            console.log('remove ll11');
            _stopIntervals();
            _removeLLnTime(LL11);
            _startLoop(0);
        });
    };
    const _removeLl12 = () => {
        ipcMain.on(CHANNELS.removeLl12, (e, _) => {
            console.log('remove ll12');
            _stopIntervals();
            _removeLLnTime(LL12);
            _startLoop(0);
        });
    };
    const _removeLl13 = () => {
        ipcMain.on(CHANNELS.removeLl13, (e, _) => {
            console.log('remove ll13');
            _stopIntervals();
            _removeLLnTime(LL13);
            _startLoop(0);
        });
    };
    const _removeLl14 = () => {
        ipcMain.on(CHANNELS.removeLl14, (e, _) => {
            console.log('remove ll14');
            _stopIntervals();
            _removeLLnTime(LL14);
            _startLoop(0);
        });
    };
    const _removeLl15 = () => {
        ipcMain.on(CHANNELS.removeLl15, (e, _) => {
            console.log('remove ll15');
            _stopIntervals();
            _removeLLnTime(LL15);
            _startLoop(0);
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

    let ll1On;
    let ll2On;
    let ll3On;
    const _parseLLn = (data) => {
        const ll1OnResult = data[STATION1.bits.ll1isOn];
        const ll2OnResult = data[STATION1.bits.ll2isOn];
        const ll3OnResult = data[STATION1.bits.ll3isOn];
        // console.log(ll1OnResult, ll2OnResult, ll3OnResult);

        if (ll1On !== ll1OnResult) {
            ll1On = ll1OnResult;
            store.set(CHANNELS.ll1On, ll1OnResult);
            mainWindow.webContents.send(CHANNELS.ll1On, ll1On);
        }

        if (ll2On !== ll2OnResult) {
            ll2On = ll2OnResult;
            store.set(CHANNELS.ll2On, ll2OnResult);
            mainWindow.webContents.send(CHANNELS.ll2On, ll2On);
        }

        if (ll3On !== ll3OnResult) {
            ll3On = ll3OnResult;
            store.set(CHANNELS.ll3On, ll3OnResult);
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

                    if (n === 3) {
                        require('./readingll3/readingllnstep1')(mainWindow, data);
                        require('./readingll3/readingllnstep2')(mainWindow, data);
                        require('./readingll3/readingllnstep3')(mainWindow, data);
                        require('./readingll3/readingllnstep4')(mainWindow, data);
                    }

                    if (n === 4) {
                        require('./readingll4/readingllnstep1')(mainWindow, data);
                        require('./readingll4/readingllnstep2')(mainWindow, data);
                        require('./readingll4/readingllnstep3')(mainWindow, data);
                        require('./readingll4/readingllnstep4')(mainWindow, data);
                    }

                    if (n === 5) {
                        require('./readingll5/readingllnstep1')(mainWindow, data);
                        require('./readingll5/readingllnstep2')(mainWindow, data);
                        require('./readingll5/readingllnstep3')(mainWindow, data);
                        require('./readingll5/readingllnstep4')(mainWindow, data);
                    }

                    if (n === 6) {
                        require('./readingll6/readingllnstep1')(mainWindow, data);
                        require('./readingll6/readingllnstep2')(mainWindow, data);
                        require('./readingll6/readingllnstep3')(mainWindow, data);
                        require('./readingll6/readingllnstep4')(mainWindow, data);
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

            if (lln === 3) {
                console.log('ll3');
                _stopIntervals();
                _addLLnTime(LL3);
                _startLoop(3);
                _removeLl3(); // Listen for ll1 page change
            }

            if (lln === 4) {
                console.log('ll4');
                _stopIntervals();
                _addLLnTime(LL4);
                _startLoop(4);
                _removeLl4();
            }

            if (lln === 5) {
                console.log('ll5');
                _stopIntervals();
                _addLLnTime(LL5);
                _startLoop(5);
                _removeLl5();
            }

            if (lln === 6) {
                console.log('ll6');
                _stopIntervals();
                _addLLnTime(LL6);
                _startLoop(6);
                _removeLl6();
            }
        });
    };

    main();
};