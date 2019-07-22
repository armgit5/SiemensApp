const { ipcMain } = require('electron');
const { CHANNELS, SCANTIME } = require('../environments');
const STATION1 = require('../../data/station1');

const Store = require('electron-store');
const store = new Store();

const writeHelper = require('../writeHelper');
const readHelper = require('../readHelper');

module.exports = (NODE, mainWindow) => {

    // Button Click
    ipcMain.on(CHANNELS.ll1On, (e, status) => {

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

        // NODE.conn.writeItems(STATION1.bits.ll1On, true, (anythingBad) => { // // Set ll1 M150 true
        //     if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
        //     this.doneWriting = true;

        //     NODE.conn.readAllItems((anythingBad, values) => { // Read all
        //         if (anythingBad) { console.log("SOMETHING WENT WRONG READING VALUES!!!!"); }
        //         console.log(values);
        //         this.doneReading = true;
        //     });

        //     setImmediate(() => {
        //         NODE.conn.writeItems(STATION1.bits.ll1On, false, (anythingBad) => { // // Set ll1 false
        //             if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
        //             this.doneWriting = true;
    
        //             NODE.conn.readAllItems((anythingBad, values) => { // Read all
        //                 if (anythingBad) { console.log("SOMETHING WENT WRONG READING VALUES!!!!"); }
        //                 console.log(values);
        //                 this.doneReading = true;
        //             });
        //         });
        //     }, 1000);
        // });        
    });

    ipcMain.on(CHANNELS.ll1Off, (e, status) => {
        const NODE = NODE[STATION1.id];
        NODE.conn.writeItems(STATION1.bits.ll1Off, true, (anythingBad) => {
            this.doneReading = true;
            NODE.conn.writeItems(STATION1.bits.ll1Off, false,  (anythingBad) => {
                this.doneReading = true;
            });
        });
    });

    ipcMain.on(CHANNELS.ll2On, (e, status) => {
        const NODE = NODE[STATION1.id];
        NODE.conn.writeItems(STATION1.bits.ll2On, true, NODE.valuesWritten);
        setTimeout(() => {
            NODE.conn.writeItems(STATION1.bits.ll2On, false, NODE.valuesWritten);
        }, 1000);
    });

    ipcMain.on(CHANNELS.ll2Off, (e, status) => {
        console.log(status);
        const NODE = NODE[STATION1.id];
        NODE.conn.writeItems(STATION1.bits.ll2Off, true, NODE.valuesWritten);
        setTimeout(() => {
            NODE.conn.writeItems(STATION1.bits.ll2Off, false, NODE.valuesWritten);
        }, 1000);
    });
    
    ipcMain.on(CHANNELS.ll3On, (e, status) => {
        const NODE = NODE[STATION1.id];
        NODE.conn.writeItems(STATION1.bits.ll3On, true, NODE.valuesWritten);
        setTimeout(() => {
            NODE.conn.writeItems(STATION1.bits.ll3On, false, NODE.valuesWritten);
        }, 1000);
    });

    ipcMain.on(CHANNELS.ll3Off, (e, status) => {
        console.log(status);
        const NODE = NODE[STATION1.id];
        NODE.conn.writeItems(STATION1.bits.ll3Off, true, NODE.valuesWritten);
        setTimeout(() => {
            NODE.conn.writeItems(STATION1.bits.ll3Off, false, NODE.valuesWritten);
        }, 1000);
    });

    // Save
    ipcMain.on(CHANNELS.step1save, (e, step1OnHH, step1OnMM, step1OffHH, step1OffMM) => {
        const NODE = NODE[STATION1.id];
        const dateTime = STATION1.dateTime;
        const step1 = dateTime.step1;

        console.log(step1OnHH, step1OnMM, step1OffHH, step1OffMM);

        // Check if M300.3 is on or not
        const canEdit = store.get(STATION1.storedKeys.canEdit);

        NODE.conn.writeItems(step1.setPlcEdit, true, (anythingBad) => { // Set Plc Edit true
            if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
            this.doneWriting = true;

            NODE.conn.writeItems(step1.setOnHH, step1OnHH, (anythingBad) => { // On HH
                if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
                this.doneWriting = true;
                
                NODE.conn.writeItems(step1.setOnMM, step1OnMM, (anythingBad) => { // On MM
                    if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
                    this.doneWriting = true;
    
                    NODE.conn.writeItems(step1.setOffHH, step1OffHH, (anythingBad) => { // Off HH
                        if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
                        this.doneWriting = true;
        
                        NODE.conn.writeItems(step1.setOffMM, step1OffMM, (anythingBad) => { // Off MM
                            if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
                            this.doneWriting = true;
                            
                            NODE.conn.writeItems(step1.save, true, (anythingBad) => { // Save true
                                if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
                                this.doneWriting = true;

                                NODE.conn.readAllItems((err, value) => { // Read all
                                    if (err) console.log('Cannot read');
                                    this.doneReading = true;
                                    console.log(value);
                                    console.log('value ', value[step1.onHH], value[step1.onMM], value[step1.offHH], value[step1.offMM]);
                                    mainWindow.webContents.send(CHANNELS.readStep1AfterSave, value[step1.onHH], value[step1.onMM], value[step1.offHH], value[step1.offMM]);
                                });
                                
                                NODE.conn.writeItems(step1.save, false, (anythingBad) => { // // Set Plc Edit false
                                    if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
                                    this.doneWriting = true;
                                    
                                    NODE.conn.writeItems(step1.setPlcEdit, false, (anythingBad) => { // // Set Save false
                                        if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
                                        this.doneWriting = true;
                                        
                                        // NODE.conn.readAllItems((err, value) => { // Read all
                                        //     this.doneReading = true;
                                        //     console.log(value);
                                        // });
                                    });
                                    
                                });
                
                            });
            
                        });
                    });
                });
    
            });

        });
    });

    // Set can edit on
    ipcMain.on(CHANNELS.setCanEdit, (e, status) => {
        const NODE = NODE[STATION1.id];
        const dateTime = STATION1.dateTime;
        const step1 = dateTime.step1;
        console.log('set can edit');
        NODE.conn.writeItems(step1.setCanEdit, true, (anythingBad) => { // // Set can edit true
            if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
            this.doneWriting = true;
            
            NODE.conn.readAllItems((anythingBad, values) => { // Read all
                if (anythingBad) { console.log("SOMETHING WENT WRONG READING VALUES!!!!"); }
                console.log(values);
                this.doneReading = true;
                mainWindow.webContents.send(CHANNELS.canEdit, values[STATION1.dateTime.step1.canEdit])
            });

            NODE.conn.writeItems(step1.setCanEdit, false, (anythingBad) => { // // Set can edit true
                if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
                this.doneWriting = true;
            });
        });
    }); 
 
    // Set automanual
    ipcMain.on(CHANNELS.setAutoManual, (e, autoManual) => {
        console.log(autoManual);

        const NODE = NODE[STATION1.id];
        const dateTime = STATION1.dateTime;
        const step1 = dateTime.step1;
        console.log('set can edit', step1.setAutoManual, autoManual);
        NODE.conn.writeItems(step1.setAutoManual, true, (anythingBad) => { // // Set can edit true
            if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
            this.doneWriting = true;
            
            NODE.conn.readAllItems((anythingBad, values) => { // Read all
                if (anythingBad) { console.log("SOMETHING WENT WRONG READING VALUES!!!!"); }
                console.log(values);
                this.doneReading = true;
                const autoManualResult = values[STATION1.dateTime.step1.autoManual];
                store.set(STATION1.storedKeys.autoManual, autoManualResult);
                mainWindow.webContents.send(CHANNELS.autoManual, autoManualResult);
            });

            NODE.conn.writeItems(step1.setAutoManual, false, (anythingBad) => { // // Set can edit true
                if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
                this.doneWriting = true;

            });
        });
    }); 
   
}
