const STATION1 = require('../../data/station1');
const Store = require('electron-store');
const store = new Store();

module.exports = (mainWindow, data) => {
    let step2OnHH = -1;
    let step2OnMM = -1;
    let step2OnSS = -1;
    let step2OffHH = -1;
    let step2OffMM = -1;
    let step2OffSS = -1;
    const STEP2 = STATION1.datetime.ll1.step2;
    
     // STEP 1
     let step2OnHHResult = data[STEP2.onHH];
     if (step2OnHHResult !== step2OnHH) {
         step2OnHH = step2OnHHResult;
         mainWindow.webContents.send(STEP2.onHH, step2OnHH);
     }
     let step2OnMMResult = data[STEP2.onMM];
     if (step2OnMMResult !== step2OnMM) {
         step2OnMM = step2OnMMResult;
         mainWindow.webContents.send(STEP2.onMM, step2OnMM);
     }
     let step2OnSSResult = data[STEP2.onSS];
     if (step2OnSSResult !== step2OnSS) {
         step2OnSS = step2OnSSResult;
         mainWindow.webContents.send(STEP2.onSS, step2OnSS);
     }
     let step2OffHHResult = data[STEP2.offHH];
     if (step2OffHHResult !== step2OffHH) {
         step2OffHH = step2OffHHResult;
         mainWindow.webContents.send(STEP2.offHH, step2OffHH);
     }
     let step2OffMMResult = data[STEP2.offMM];
     if (step2OffMMResult !== step2OffMM) {
         step2OffMM = step2OffMMResult;
         mainWindow.webContents.send(STEP2.offMM, step2OffMM);
     }
     let step2OffSSResult = data[STEP2.offSS];
     if (step2OffSSResult !== step2OffSS) {
         step2OffSS = step2OffSSResult;
         mainWindow.webContents.send(STEP2.offSS, step2OffSS);
     }
}