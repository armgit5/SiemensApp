const STATION1 = require('../../data/station1');
const Store = require('electron-store');
const store = new Store();

module.exports = (mainWindow, data) => {
    let step2OnHH = 0;
    let step2OnMM = 0;
    let step2OnSS = 0;
    let step2OffHH = 0;
    let step2OffMM = 0;
    let step2OffSS = 0;
    const STEP2 = STATION1.datetime.ll1.step2;
    
     // STEP 1
     const step2OnHHResult = data[STEP2.onHH];
     if (step2OnHHResult !== step2OnHH) {
         step2OnHH = step2OnHHResult;
         mainWindow.webContents.send(STEP2.onHH, step2OnHH);
     }
     const step2OnMMResult = data[STEP2.onMM];
     if (step2OnMMResult !== step2OnMM) {
         step2OnMM = step2OnMMResult;
         mainWindow.webContents.send(STEP2.onMM, step2OnMM);
     }
     const step2OnSSResult = data[STEP2.onSS];
     if (step2OnSSResult !== step2OnSS) {
         step2OnSS = step2OnSSResult;
         mainWindow.webContents.send(STEP2.onSS, step2OnSS);
     }
     const step2OffHHResult = data[STEP2.offHH];
     if (step2OffHHResult !== step2OffHH) {
         step2OffHH = step2OffHHResult;
         mainWindow.webContents.send(STEP2.offHH, step2OffHH);
     }
     const step2OffMMResult = data[STEP2.offMM];
     if (step2OffMMResult !== step2OffMM) {
         step2OffMM = step2OffMMResult;
         mainWindow.webContents.send(STEP2.offMM, step2OffMM);
     }
     const step2OffSSResult = data[STEP2.offSS];
     if (step2OffSSResult !== step2OffSS) {
         step2OffSS = step2OffSSResult;
         mainWindow.webContents.send(STEP2.offSS, step2OffSS);
     }
}