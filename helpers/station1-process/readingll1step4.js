const STATION1 = require('../../data/station1');
const Store = require('electron-store');
const store = new Store();

module.exports = (mainWindow, data) => {

    let step4OnHH = -1;
    let step4OnMM = -1;
    let step4OnSS = -1;
    let step4OffHH = -1;
    let step4OffMM = -1;
    let step4OffSS = -1;
    const STEP4 = STATION1.datetime.ll1.step4;
    // STEP 1
    let step4OnHHResult = data[STEP4.onHH];
    if (step4OnHHResult !== step4OnHH) {
        step4OnHH = step4OnHHResult;
        mainWindow.webContents.send(STEP4.onHH, step4OnHH);
    }
    let step4OnMMResult = data[STEP4.onMM];
    if (step4OnMMResult !== step4OnMM) {
        step4OnMM = step3OnMMResult;
        mainWindow.webContents.send(STEP4.onMM, step4OnMM);
    }
    let step4OnSSResult = data[STEP4.onSS];
    if (step4OnSSResult !== step4OnSS) {
        step4OnSS = step3OnSSResult;
        mainWindow.webContents.send(STEP4.onSS, step4OnSS);
    }
    let step4OffHHResult = data[STEP4.offHH];
    if (step4OffHHResult !== step4OffHH) {
        step4OffHH = step4OffHHResult;
        mainWindow.webContents.send(STEP4.offHH, step4OffHH);
    }
    let step4OffMMResult = data[STEP4.offMM];
    if (step4OffMMResult !== step4OffMM) {
        step4OffMM = step4OffMMResult;
        mainWindow.webContents.send(STEP4.offMM, step4OffMM);
    }
    let step4OffSSResult = data[STEP4.offSS];
    if (step4OffSSResult !== step4OffSS) {
        step4OffSS = step4OffSSResult;
        mainWindow.webContents.send(STEP4.offSS, step4OffSS);
    }

};