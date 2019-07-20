const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const Node = require('./node');
const { CHANNELS, SCANTIME } = require('./environments');
const STATIONS = require('../data/stations');

const Store = require('electron-store');
const store = new Store();

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const intervals = [];

module.exports = (mainWindow) => {
    const connections = {}; // Hold nodes connection

    // Private functions
    const _addToReadList = () => {
        const node = connections[STATIONS[0].id];
        const dateTime = STATIONS[0].dateTime;
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


        node.conn.addItems(STATIONS[0].bits.ll1On);
        node.conn.addItems(STATIONS[0].bits.ll1isOn)
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
        const station = STATIONS[0];
        const node = connections[station.id];
        const keys =  STATIONS[0].storedKeys;

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
        intervals.push(datetimeInterval);
    };

    const _getStreamOnlineStatus = () => {
        const station = STATIONS[0];
        const node = connections[station.id];
    
        const onlineStatusInterval = setInterval(() => {
            // console.log('is online ', node.id, node.isOnline);
            mainWindow.webContents.send(CHANNELS.onlineStatus, node.id, node.isOnline);
        }, SCANTIME);
        intervals.push(onlineStatusInterval);
    }

    const _streamDateTime = () => {
        // Run program
        setInterval(() => {
            mainWindow.webContents.send(CHANNELS.datetime, _getHrMin());
        }, SCANTIME);
    }

    let canEdit = false;
    store.set(STATIONS[0].storedKeys.canEdit, false);
    const _getCanEditStream = () => {
        const station = STATIONS[0];
        const node = connections[station.id];
        const dateTime = STATIONS[0].dateTime;
        const step1 = dateTime.step1;

        const canEditInterval = setInterval(() => {
            // Check if M300.3 is on or not
            node.conn.readAllItems((err, value) => { // Read all
                if (err) console.log('Cannot read');
                this.doneReading = true;
                // console.log(value[step1.canEdit]);
                // console.log(store.get(STATIONS[0].storedKeys.canEdit));
                const canEditResult = value[step1.canEdit];
                if (canEdit !== canEditResult) {
                    canEdit = canEditResult;
                    store.set(STATIONS[0].storedKeys.canEdit, canEditResult);
                    mainWindow.webContents.send(CHANNELS.canEdit, canEdit);
                }
            });
        }, SCANTIME);
        intervals.push(canEditInterval);
    };

    // Main Program
    const _initNodes = () => {
        const node = new Node(STATIONS[0].id, STATIONS[0].ip);
        connections[STATIONS[0].id] = node;

        intervals.forEach(clearInterval);

        _addToReadList();
        _getSteamDateTime();
        _getStreamOnlineStatus();
        _getCanEditStream();
        // _streamDateTime();
    };
    _initNodes();

    // Receive click callls
    require('./clickHandler')(connections, mainWindow);
};