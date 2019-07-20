const { ipcMain } = require('electron');
const { CHANNELS, SCANTIME } = require('./environments');
const STATIONS = require('../data/stations');

const Store = require('electron-store');
const store = new Store();

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

module.exports = (connections) => {

    // Button Click
    ipcMain.on(CHANNELS.ll1On, (e, status) => {
        const node = connections[STATIONS[0].id];
        const dateTime = STATIONS[0].dateTime;
        const step1 = dateTime.step1;

        node.conn.writeItems(STATIONS[0].bits.ll1On, true, node.valuesWritten);
        setTimeout(() => {
            node.conn.writeItems(STATIONS[0].bits.ll1On, false, node.valuesWritten);
        }, 1000);


        node.conn.writeItems(step1.setOnHH, 23, node.valuesWritten);
        node.conn.readAllItems(node.valuesReady);

    });

    ipcMain.on(CHANNELS.ll1Off, (e, status) => {
        console.log(status);
        const node = connections[STATIONS[0].id];
        node.conn.writeItems(STATIONS[0].bits.ll1Off, true, node.valuesWritten);
        setTimeout(() => {
            node.conn.writeItems(STATIONS[0].bits.ll1Off, false, node.valuesWritten);
        }, 1000);
    });

    ipcMain.on(CHANNELS.ll2On, (e, status) => {
        const node = connections[STATIONS[0].id];
        node.conn.writeItems(STATIONS[0].bits.ll2On, true, node.valuesWritten);
        setTimeout(() => {
            node.conn.writeItems(STATIONS[0].bits.ll2On, false, node.valuesWritten);
        }, 1000);
    });

    ipcMain.on(CHANNELS.ll2Off, (e, status) => {
        console.log(status);
        const node = connections[STATIONS[0].id];
        node.conn.writeItems(STATIONS[0].bits.ll2Off, true, node.valuesWritten);
        setTimeout(() => {
            node.conn.writeItems(STATIONS[0].bits.ll2Off, false, node.valuesWritten);
        }, 1000);
    });
    
    ipcMain.on(CHANNELS.ll3On, (e, status) => {
        const node = connections[STATIONS[0].id];
        node.conn.writeItems(STATIONS[0].bits.ll3On, true, node.valuesWritten);
        setTimeout(() => {
            node.conn.writeItems(STATIONS[0].bits.ll3On, false, node.valuesWritten);
        }, 1000);
    });

    ipcMain.on(CHANNELS.ll3Off, (e, status) => {
        console.log(status);
        const node = connections[STATIONS[0].id];
        node.conn.writeItems(STATIONS[0].bits.ll3Off, true, node.valuesWritten);
        setTimeout(() => {
            node.conn.writeItems(STATIONS[0].bits.ll3Off, false, node.valuesWritten);
        }, 1000);
    });

   
}