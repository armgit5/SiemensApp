
const STATION1 = require('../../data/station1');
const Store = require('electron-store');
const store = new Store();

module.exports = (mainWindow, data) => {
    let step1OnHH = 0;
    let step1OnMM = 0;
    let step1OnSS = 0;
    let step1OffHH = 0;
    let step1OffMM = 0;
    let step1OffSS = 0;
    const LL1 = STATION1.datetime.ll1;
 
     // STEP 1
     const step1OnHHResult = data[LL1.step1.onHH];
     if (step1OnHHResult !== step1OnHH) {
         step1OnHH = step1OnHHResult;
         store.set(step1OnHH, step1OffHH); // Store result
         mainWindow.webContents.send(LL1.step1.onHH, step1OnHH);
     }
     const step1OnMMResult = data[LL1.step1.onMM];
     if (step1OnMMResult !== step1OnMM) {
         step1OnMM = step1OnMMResult;
         mainWindow.webContents.send(LL1.step1.onMM, step1OnMM);
     }
     const step1OnSSResult = data[LL1.step1.onSS];
     if (step1OnSSResult !== step1OnSS) {
         step1OnSS = step1OnSSResult;
         mainWindow.webContents.send(LL1.step1.onSS, step1OnSS);
     }
     const step1OffHHResult = data[LL1.step1.offHH];
     if (step1OffHHResult !== step1OffHH) {
         step1OffHH = step1OffHHResult;
         mainWindow.webContents.send(LL1.step1.offHH, step1OffHH);
     }
     const step1OffMMResult = data[LL1.step1.offMM];
     if (step1OffMMResult !== step1OffMM) {
         step1OffMM = step1OffMMResult;
         mainWindow.webContents.send(LL1.step1.offMM, step1OffMM);
     }
     const step1OffSSResult = data[LL1.step1.offSS];
     if (step1OffSSResult !== step1OffSS) {
         step1OffSS = step1OffSSResult;
         mainWindow.webContents.send(LL1.step1.offSS, step1OffSS);
     }
};