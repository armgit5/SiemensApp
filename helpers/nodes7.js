const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const Node = require('./node');
const { CHANNELS, SCANTIME } = require('./environments');
const STATIONS = require('../data/stations');

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const intervals = [];

module.exports = (mainWindow) => {
    const connections = {}; // Hold nodes connection

    // Private functions
    const _addToReadList = () => {
        const node = connections[STATIONS[0].id];
        const dateTimeHeader = STATIONS[0].dateTime.header;

        // Add Header Datetime
        node.conn.addItems(dateTimeHeader.date);
        node.conn.addItems(dateTimeHeader.month);
        node.conn.addItems(dateTimeHeader.year);
        node.conn.addItems(dateTimeHeader.minute);
        node.conn.addItems(dateTimeHeader.hour);
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

                    const outputDatetime = `${date} ${monthNames[month]} ${year} ${hour}:${minute}`;
                    mainWindow.webContents.send(CHANNELS.datetime, outputDatetime);
                }
            });
        }, SCANTIME);
        intervals.push(datetimeInterval);
    };

    const _getStreamOnlineStatus = () => {
        const station = STATIONS[0];
        const node = connections[station.id];

        const onlineStatusInterval = setInterval(() => {
            console.log('is online ', node.id, node.isOnline);
        }, SCANTIME);
        intervals.push(onlineStatusInterval);
    }

    const _streamDateTime = () => {
        // Run program
        setInterval(() => {
            mainWindow.webContents.send(CHANNELS.datetime, _getHrMin());
        }, SCANTIME);
    }

    // Main Program
    const _initNodes = () => {
        const node = new Node(STATIONS[0].id, STATIONS[0].ip);
        connections[STATIONS[0].id] = node;

        intervals.forEach(clearInterval);

        _addToReadList();
        _getSteamDateTime();
        _getStreamOnlineStatus();
        // _streamDateTime();
    };
    _initNodes();
};