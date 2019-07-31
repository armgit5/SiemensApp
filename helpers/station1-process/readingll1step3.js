const STATION1 = require('../../data/station1');
const Store = require('electron-store');
const store = new Store();

module.exports = (mainWindow, data) => {
    let step3OnHH = -1;
    let step3OnMM = -1;
    let step3OnSS = -1;
    let step3OffHH = -1;
    let step3OffMM = -1;
    let step3OffSS = -1;
    const STEP3 = STATION1.datetime.ll1.step3;
    
    // STEP 1
    let step3OnHHResult = data[STEP3.onHH];
    if (step3OnHHResult !== step3OnHH) {
        step3OnHH = step3OnHHResult;
        mainWindow.webContents.send(STEP3.onHH, step3OnHH);
    }
    let step3OnMMResult = data[STEP3.onMM];
    if (step3OnMMResult !== step3OnMM) {
        step3OnMM = step3OnMMResult;
        mainWindow.webContents.send(STEP3.onMM, step3OnMM);
    }
    let step3OnSSResult = data[STEP3.onSS];
    if (step3OnSSResult !== step3OnSS) {
        step3OnSS = step3OnSSResult;
        mainWindow.webContents.send(STEP3.onSS, step3OnSS);
    }
    let step3OffHHResult = data[STEP3.offHH];
    if (step3OffHHResult !== step3OffHH) {
        step3OffHH = step3OffHHResult;
        mainWindow.webContents.send(STEP3.offHH, step3OffHH);
    }
    let step3OffMMResult = data[STEP3.offMM];
    if (step3OffMMResult !== step3OffMM) {
        step3OffMM = step3OffMMResult;
        mainWindow.webContents.send(STEP3.offMM, step3OffMM);
    }
    let step3OffSSResult = data[STEP3.offSS];
    if (step3OffSSResult !== step3OffSS) {
        step3OffSS = step3OffSSResult;
        mainWindow.webContents.send(STEP3.offSS, step3OffSS);
    }
}; 