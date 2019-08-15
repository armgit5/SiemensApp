const { ipcMain } = require('electron');
const { CHANNELS, SCANTIME } = require('../environments');
const STATION1 = require('../../data/station1');

const Store = require('electron-store');
const store = new Store();

const writeHelper = require('../writeHelper');
const readHelper = require('../readHelper');

module.exports = (NODE, mainWindow) => {

    require('./clickllOnOff')(NODE);
    
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
    require('./clickll1step1')(NODE);
    require('./clickll1step2')(NODE);
    require('./clickll1step3')(NODE);
    require('./clickll1step4')(NODE);

    // LL2 clicks
    require('./clickll2/clickllnstep1')(NODE);
    require('./clickll2/clickllnstep2')(NODE);
    require('./clickll2/clickllnstep3')(NODE);
    require('./clickll2/clickllnstep4')(NODE);

    // LL3 clicks
    require('./clickll3/clickllnstep1')(NODE);
    require('./clickll3/clickllnstep2')(NODE);
    require('./clickll3/clickllnstep3')(NODE);
    require('./clickll3/clickllnstep4')(NODE);

    // LL4 clicks
    require('./clickll4/clickllnstep1')(NODE);
    require('./clickll4/clickllnstep2')(NODE);
    require('./clickll4/clickllnstep3')(NODE);
    require('./clickll4/clickllnstep4')(NODE);

    // LL5 clicks
    require('./clickll5/clickllnstep1')(NODE);
    require('./clickll5/clickllnstep2')(NODE);
    require('./clickll5/clickllnstep3')(NODE);
    require('./clickll5/clickllnstep4')(NODE);

    // LL6 clicks
    require('./clickll6/clickllnstep1')(NODE);
    require('./clickll6/clickllnstep2')(NODE);
    require('./clickll6/clickllnstep3')(NODE);
    require('./clickll6/clickllnstep4')(NODE);
}
