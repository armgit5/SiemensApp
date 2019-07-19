const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const Node = require('./node');
const { CHANNELS, SCANTIME } = require('./environments');
const STATIONS = require('../data/stations');

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
        node.conn.addItems(dateTimeHeader.second);
    };

    const _getHrMin = () => {
        const date = new Date;
        const hour = date.getHours();
        const min = date.getMinutes();
        const sec = date.getSeconds()

        return time = hour + ":" + min + ":" + sec;
    };

    const _getDateTime = () => {
        const node = connections[STATIONS[0].id];

        // Run Loop
        setInterval(() => {
            node.conn.readAllItems((err, data) => {
                console.log(data);
            });
        }, SCANTIME);
    };

    const _sendDateTime = () => {
        // Run program
        setInterval(() => {
            mainWindow.webContents.send(CHANNELS.datetime, _getHrMin());
        }, SCANTIME);
    }

    // Main Program
    const _initNodes = () => {
        const node = new Node(STATIONS[0].id, STATIONS[0].ip);
        connections[STATIONS[0].id] = node;
        _addToReadList();
        // _getDateTime();
        _sendDateTime();
    };
    _initNodes();
};