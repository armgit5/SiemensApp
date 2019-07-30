const { ipcMain } = require('electron');
const { CHANNELS, SCANTIME } = require('../environments');
const STATION1 = require('../../data/station1');

const Store = require('electron-store');
const store = new Store();

const writeHelper = require('../writeHelper');
const readHelper = require('../readHelper');

module.exports = (NODE, mainWindow) => {

    // ll1
    ipcMain.on(CHANNELS.ll1On, (e, _) => {

        writeHelper(NODE, STATION1.bits.ll1On, true)
            .then(_ => {
                readHelper(NODE).then(data => {
                    console.log(data);
                });
                return writeHelper(NODE, STATION1.bits.ll1On, false);
            })
            .then(_ => {
                readHelper(NODE).then(data => {
                    console.log(data);
                });
            })
            .catch(err => {
                console.log(err);
            });     
    });

    // ll2
    ipcMain.on(CHANNELS.ll1Off, (e, status) => {
        writeHelper(NODE, STATION1.bits.ll1Off, true)
            .then(_ => {
                return writeHelper(NODE, STATION1.bits.ll1Off, false);
            })
            .then(_ => {
            })
            .catch(err => {
                console.log(err);
            });
    });

    // ll3
    ipcMain.on(CHANNELS.ll2On, (e, status) => {
        writeHelper(NODE, STATION1.bits.ll2On, true)
            .then(_ => {
                return writeHelper(NODE, STATION1.bits.ll2On, false);
            })
            .then(_ => {
            })
            .catch(err => {
                console.log(err);
            });
    });

    // ll4
    ipcMain.on(CHANNELS.ll2Off, (e, status) => {
        writeHelper(NODE, STATION1.bits.ll2Off, true)
            .then(_ => {
                return writeHelper(NODE, STATION1.bits.ll2Off, false);
            })
            .then(_ => {
            })
            .catch(err => {
                console.log(err);
            });
    });
    
    // ll5
    ipcMain.on(CHANNELS.ll3On, (e, status) => {
        writeHelper(NODE, STATION1.bits.ll3On, true)
            .then(_ => {
                return writeHelper(NODE, STATION1.bits.ll3On, false);
            })
            .then(_ => {
            })
            .catch(err => {
                console.log(err);
            });
    });

    // ll6
    ipcMain.on(CHANNELS.ll3Off, (e, status) => {
        writeHelper(NODE, STATION1.bits.ll3Off, true)
            .then(_ => {
                return writeHelper(NODE, STATION1.bits.ll3Off, false);
            })
            .then(_ => {
            })
            .catch(err => {
                console.log(err);
            });
    });
 
    // Set automanual
    ipcMain.on(CHANNELS.autoManual, (e, autoManual) => {
        writeHelper(NODE, STATION1.datetime.header.setAutoManual, true)
            .then(_ => {
                return writeHelper(NODE, STATION1.datetime.header.setAutoManual, false);
            })
            .then(_ => {
            });
    }); 


    // LL1 clicks
    // Step 1
    require('./clickll1step1')(NODE);
}
