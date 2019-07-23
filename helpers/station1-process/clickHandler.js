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
                return writeHelper(NODE, STATION1.bits.ll1On, false);
            })
            .then(_ => {
            })
            .catch(err => {
                console.log(err);
            });
        // NODE.conn.writeItems(STATION1.bits.ll1Off, true, (anythingBad) => {
        //     this.doneReading = true;
        //     NODE.conn.writeItems(STATION1.bits.ll1Off, false,  (anythingBad) => {
        //         this.doneReading = true;
        //     });
        // });
    });

    // ll3
    ipcMain.on(CHANNELS.ll2On, (e, status) => {
        const NODE = NODE[STATION1.id];
        NODE.conn.writeItems(STATION1.bits.ll2On, true, NODE.valuesWritten);
        setTimeout(() => {
            NODE.conn.writeItems(STATION1.bits.ll2On, false, NODE.valuesWritten);
        }, 1000);
    });

    // ll4
    ipcMain.on(CHANNELS.ll2Off, (e, status) => {
        console.log(status);
        const NODE = NODE[STATION1.id];
        NODE.conn.writeItems(STATION1.bits.ll2Off, true, NODE.valuesWritten);
        setTimeout(() => {
            NODE.conn.writeItems(STATION1.bits.ll2Off, false, NODE.valuesWritten);
        }, 1000);
    });
    
    // ll5
    ipcMain.on(CHANNELS.ll3On, (e, status) => {
        const NODE = NODE[STATION1.id];
        NODE.conn.writeItems(STATION1.bits.ll3On, true, NODE.valuesWritten);
        setTimeout(() => {
            NODE.conn.writeItems(STATION1.bits.ll3On, false, NODE.valuesWritten);
        }, 1000);
    });

    // ll6
    ipcMain.on(CHANNELS.ll3Off, (e, status) => {
        console.log(status);
        const NODE = NODE[STATION1.id];
        NODE.conn.writeItems(STATION1.bits.ll3Off, true, NODE.valuesWritten);
        setTimeout(() => {
            NODE.conn.writeItems(STATION1.bits.ll3Off, false, NODE.valuesWritten);
        }, 1000);
    });

    // Save
    ipcMain.on(CHANNELS.step1save, (e, channel, value) => {
        console.log(channel, value);
        const step1 = STATION1.datetime.step1;

        if (channel === 'step1OnHH') {
            writeHelper(NODE, step1.onHHTimer, true)
                .then(_ => {
                    return writeHelper(NODE, step1.onHH, value);
                })
                .then(_ => {
                    return writeHelper(NODE, step1.onHHTimer, false);
                })
                .then(_ => {
                    return readHelper(NODE);
                })
                .then(data => {
                    console.log(data[step1.onHH]);
                });
        }
    });
 
    // Set automanual
    ipcMain.on(CHANNELS.setAutoManual, (e, autoManual) => {
        const step1 = STATION1.datetime.step1;
        writeHelper(NODE, step1.setAutoManual, true)
            .then(_ => {
                return writeHelper(NODE, step1.setAutoManual, false);
            })
            .then(_ => {
                readHelper(NODE).then(data => {
                    console.log(data);
                });
            });
    }); 
}
