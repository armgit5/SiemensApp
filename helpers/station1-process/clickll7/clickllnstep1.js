const STATION1 = require('../../../data/station1');
const { ipcMain } = require('electron');
const writeHelper = require('../../writeHelper');

module.exports = (NODE) => {

    // On
    const onHH = STATION1.datetime.ll7.step1.onHH;
    const onHHTimer = STATION1.datetime.ll7.step1.onHHTimer;
    ipcMain.on(onHH, (e, data) => {
        // console.log('ll7 ', data);
        writeHelper(NODE, onHH, data);
        setTimeout(() => {
            writeHelper(NODE, onHHTimer, true)
            .then(_ => {
                writeHelper(NODE, onHHTimer, false);
            });
        }, 1000);

            
    }); 

    const onMM = STATION1.datetime.ll7.step1.onMM;
    const onMMTimer = STATION1.datetime.ll7.step1.onMMTimer;
    ipcMain.on(onMM, (e, data) => {
        writeHelper(NODE, onMM, data);
        setTimeout(() => {
            writeHelper(NODE, onMMTimer, true)
            .then(_ => {
                writeHelper(NODE, onMMTimer, false);
            });
        }, 1000);
    }); 

    const onSS = STATION1.datetime.ll7.step1.onSS;
    const onSSTimer = STATION1.datetime.ll7.step1.onSSTimer;
    ipcMain.on(onSS, (e, data) => {
        writeHelper(NODE, onSS, data);
        setTimeout(() => {
            writeHelper(NODE, onSSTimer, true)
            .then(_ => {
                writeHelper(NODE, onSSTimer, false);
            });
        }, 1000);    
    }); 

    // Off
    const offHH = STATION1.datetime.ll7.step1.offHH;
    const offHHTimer = STATION1.datetime.ll7.step1.offHHTimer;
    ipcMain.on(offHH, (e, data) => {
        writeHelper(NODE, offHH, data)
            .then(_ => {
                setTimeout(() => {
                    return writeHelper(NODE, offHHTimer, true);
                }, 1000);
            })
            .then(_ => {
                writeHelper(NODE, offHHTimer, false);
            });
    }); 

    const offMM = STATION1.datetime.ll7.step1.offMM;
    const offMMTimer = STATION1.datetime.ll7.step1.offMMTimer;
    ipcMain.on(offMM, (e, data) => {
        writeHelper(NODE, offMM, data)
            .then(_ => {
                setTimeout(() => {
                    return writeHelper(NODE, offMMTimer, true);
                }, 1000);        
            })
            .then(_ => {
                writeHelper(NODE, offMMTimer, false);
            });
    }); 

    const offSS = STATION1.datetime.ll7.step1.offSS;
    const offSSTimer = STATION1.datetime.ll7.step1.offSSTimer;
    ipcMain.on(offSS, (e, data) => {
        writeHelper(NODE, offSS, data)
            .then(_ => {
                setTimeout(() => {
                    return writeHelper(NODE, offSSTimer, true);
                }, 1000);
            })
            .then(_ => {
                writeHelper(NODE, offSSTimer, false);
            });
    }); 


};