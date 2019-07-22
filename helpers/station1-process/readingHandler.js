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

module.exports = (NODE) => {

    // Private functions
    const _addToReadList = () => {
        const step1 = STATION1.datetime.step1;

        // Add Header Datetime
        NODE.conn.addItems(step1.onHH);
        NODE.conn.addItems(step1.onMM);
        NODE.conn.addItems(step1.offHH);
        NODE.conn.addItems(step1.offMM);
        NODE.conn.addItems(step1.setOnHH);
        NODE.conn.addItems(step1.setOnMM);
        NODE.conn.addItems(step1.setOffHH);
        NODE.conn.addItems(step1.setOffMM);
        NODE.conn.addItems(step1.save);
        NODE.conn.addItems(step1.plcEdit);
        NODE.conn.addItems(step1.setPlcEdit);
        NODE.conn.addItems(step1.canEdit);
        NODE.conn.addItems(step1.autoManual);
        NODE.conn.addItems(step1.setAutoManual);
        NODE.conn.addItems(STATION1.bits.ll1On);
        NODE.conn.addItems(STATION1.bits.ll1isOn);
    };

    const _getSteamDateTime = () => {
        const station = STATION1;
        const keys = STATION1.storedKeys;

        let cacheData = null;
        // Run Loop
        const datetimeInterval = setInterval(() => {
            readHelper(NODE)
                .then(data => {
                    if (JSON.stringify(cacheData) !== JSON.stringify(data)) {
                        cacheData = data;
                        const header = station.datetime.header;
                        const date = data[header.date];
                        const month = data[header.month];
                        const year = data[header.year];
                        const hour = data[header.hour];
                        const minute = data[header.minute];
                        // console.log(data);
                        const outputDatetime = `${date} ${monthNames[month]} ${year} ${hour}:${minute}`;
                        mainWindow.webContents.send(CHANNELS.datetime, outputDatetime);

                        // Save datetime
                        store.set(keys.headerDatetime, outputDatetime);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }, SCANTIME);
        INTERVALS.push(datetimeInterval);
    };

    const _getStreamOnlineStatus = () => {
        const station = STATION1;
        const NODE = CONNECTION[station.id];

        const onlineStatusInterval = setInterval(() => {
            // console.log('is online ', NODE.id, NODE.isOnline);
            mainWindow.webContents.send(CHANNELS.onlineStatus, NODE.id, NODE.isOnline);
        }, SCANTIME);
        INTERVALS.push(onlineStatusInterval);
    }

    const _streamDateTime = () => {
        // Run program
        setInterval(() => {
            mainWindow.webContents.send(CHANNELS.datetime, _getHrMin());
        }, SCANTIME);
    }

    // Can Edit Status
    let canEdit = false;
    store.set(STATION1.storedKeys.canEdit, false);
    const _getCanEditStream = () => {
        const station = STATION1;
        const NODE = CONNECTION[station.id];
        const datetime = STATION1.datetime;
        const step1 = datetime.step1;

        const canEditInterval = setInterval(() => {
            // Check if M300.3 is on or not
            NODE.conn.readAllItems((err, value) => { // Read all
                if (err) console.log('Cannot read');
                this.doneReading = true;
                // console.log(value[step1.canEdit]);
                // console.log(store.get(STATION1.storedKeys.canEdit));
                const canEditResult = value[step1.canEdit];
                if (canEdit !== canEditResult) {
                    canEdit = canEditResult;
                    store.set(STATION1.storedKeys.canEdit, canEditResult);
                    mainWindow.webContents.send(CHANNELS.canEdit, canEdit);
                }
            });
        }, SCANTIME);
        INTERVALS.push(canEditInterval);
    };

    // Get auto manual
    let autoManual = false;
    store.set(STATION1.storedKeys.autoManual, false);
    const _getAutoManualStream = () => {
        const station = STATION1;
        const NODE = CONNECTION[station.id];
        const datetime = STATION1.datetime;
        const step1 = datetime.step1;

        const autoManualInterval = setInterval(() => {
            // Check if M300.3 is on or not
            NODE.conn.readAllItems((err, value) => { // Read all
                if (err) console.log('Cannot read');
                this.doneReading = true;
                const autoManualResult = value[step1.autoManual];

                if (autoManual !== autoManualResult) {
                    console.log(autoManualResult);
                    autoManual = autoManualResult;
                    store.set(STATION1.storedKeys.autoManual, autoManualResult);
                    mainWindow.webContents.send(CHANNELS.autoManual, autoManualResult);
                }
            });
        }, SCANTIME);

        INTERVALS.push(autoManualInterval);
    };

    const main = () => {
        INTERVALS.forEach(clearInterval); // Clear interval

        _addToReadList();
    };

    main();
}