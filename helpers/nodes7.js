const { ipcMain } = require('electron');
const Node = require('./node');
const { CHANNELS, SCANTIME } = require('./environments');
const STATION1 = require('../data/station1');

const Store = require('electron-store');
const store = new Store();

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const INTERVALS = [];

module.exports = (mainWindow) => {
    const connections = {}; // Hold nodes connection

    // Private functions
    const _addToReadList = () => {
        const node = connections[STATION1.id];
        const dateTime = STATION1.dateTime;
        const dateTimeHeader = dateTime.header;
        const step1 = dateTime.step1;

        // Add Header Datetime
        node.conn.addItems(dateTimeHeader.date);
        node.conn.addItems(dateTimeHeader.month);
        node.conn.addItems(dateTimeHeader.year);
        node.conn.addItems(dateTimeHeader.minute);
        node.conn.addItems(dateTimeHeader.hour);
        node.conn.addItems(step1.onHH);
        node.conn.addItems(step1.onMM);
        node.conn.addItems(step1.offHH);
        node.conn.addItems(step1.offMM);
        node.conn.addItems(step1.setOnHH);
        node.conn.addItems(step1.setOnMM);
        node.conn.addItems(step1.setOffHH);
        node.conn.addItems(step1.setOffMM);
        node.conn.addItems(step1.save);
        node.conn.addItems(step1.plcEdit);
        node.conn.addItems(step1.setPlcEdit);
        node.conn.addItems(step1.canEdit);
        node.conn.addItems(step1.autoManual);
        node.conn.addItems(step1.setAutoManual);


        node.conn.addItems(STATION1.bits.ll1On);
        node.conn.addItems(STATION1.bits.ll1isOn)
        // node.conn.addItems(dateTimeHeader.second);
    };

    const _getHrMin = () => {
        const date = new Date;
        const hour = date.getHours();
        const min = date.getMinutes();
        const sec = date.getSeconds()

        return time = hour + ":" + min + ":" + sec;
    };

    const _getSteamDateTime = () => {
        const station = STATION1;
        const node = connections[station.id];
        const keys = STATION1.storedKeys;

        let cacheData = null;
        // Run Loop
        const datetimeInterval = setInterval(() => {
            node.conn.readAllItems((err, data) => {

                // Check for data change
                if (JSON.stringify(cacheData) !== JSON.stringify(data)) {
                    cacheData = data;
                    const header = station.dateTime.header;
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
            });
        }, SCANTIME);
        INTERVALS.push(datetimeInterval);
    };

    const _getStreamOnlineStatus = () => {
        const station = STATION1;
        const node = connections[station.id];

        const onlineStatusInterval = setInterval(() => {
            // console.log('is online ', node.id, node.isOnline);
            mainWindow.webContents.send(CHANNELS.onlineStatus, node.id, node.isOnline);
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
        const node = connections[station.id];
        const dateTime = STATION1.dateTime;
        const step1 = dateTime.step1;

        const canEditInterval = setInterval(() => {
            // Check if M300.3 is on or not
            node.conn.readAllItems((err, value) => { // Read all
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
        const node = connections[station.id];
        const dateTime = STATION1.dateTime;
        const step1 = dateTime.step1;

        const autoManualInterval = setInterval(() => {
            // Check if M300.3 is on or not
            node.conn.readAllItems((err, value) => { // Read all
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

    // Main Program
    const _initNodes = () => {
        const node = new Node(STATION1.id, STATION1.ip);
        connections[STATION1.id] = node;

        INTERVALS.forEach(clearInterval);

        _addToReadList();
        _getSteamDateTime();
        _getStreamOnlineStatus();
        _getCanEditStream();
        _getAutoManualStream();
        _streamDateTime();
    };
    // _initNodes();

    const main = () => {
        console.log('starting main');
        // Get station id when page changes
        let oldStationId = 0;
        ipcMain.on(CHANNELS.onNewStation, (e, stationId) => {
            // If new id comes in then kills old connection and start 
            // new connection to new plc
            if (stationId !== oldStationId) {
                oldStationId = stationId;
            }
        });


    }

    main();

    // Receive click callls
    // require('./clickHandler')(connections, mainWindow);
};