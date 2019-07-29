const STATION1 = require('../../data/station1');
const Store = require('electron-store');
const store = new Store();

module.exports = (mainWindow, data) => {
    let step3OnHH = 0;
    let step3OnMM = 0;
    let step3OnSS = 0;
    let step3OffHH = 0;
    let step3OffMM = 0;
    let step3OffSS = 0;
    const STEP3 = STATION1.datetime.ll1.step3;
    
    // STEP 1
    const step3OnHHResult = data[STEP3.onHH];
    if (step3OnHHResult !== step3OnHH) {
        step3OnHH = step3OnHHResult;
        mainWindow.webContents.send(STEP3.onHH, step3OnHH);
    }
    const step3OnMMResult = data[STEP3.onMM];
    if (step3OnMMResult !== step3OnMM) {
        step3OnMM = step3OnMMResult;
        mainWindow.webContents.send(STEP3.onMM, step3OnMM);
    }
    const step3OnSSResult = data[STEP3.onSS];
    if (step3OnSSResult !== step3OnSS) {
        step3OnSS = step3OnSSResult;
        mainWindow.webContents.send(STEP3.onSS, step3OnSS);
    }
    const step3OffHHResult = data[STEP3.offHH];
    if (step3OffHHResult !== step3OffHH) {
        step3OffHH = step3OffHHResult;
        mainWindow.webContents.send(STEP3.offHH, step3OffHH);
    }
    const step3OffMMResult = data[STEP3.offMM];
    if (step3OffMMResult !== step3OffMM) {
        step3OffMM = step3OffMMResult;
        mainWindow.webContents.send(STEP3.offMM, step3OffMM);
    }
    const step3OffSSResult = data[STEP3.offSS];
    if (step3OffSSResult !== step3OffSS) {
        step3OffSS = step3OffSSResult;
        mainWindow.webContents.send(STEP3.offSS, step3OffSS);
    }
}; 