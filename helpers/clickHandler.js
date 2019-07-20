const { ipcMain } = require('electron');
const { CHANNELS, SCANTIME } = require('./environments');
const STATIONS = require('../data/stations');

const Store = require('electron-store');
const store = new Store();

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

module.exports = (connections, mainWindow) => {

    // Button Click
    ipcMain.on(CHANNELS.ll1On, (e, status) => {
        const node = connections[STATIONS[0].id];
        const dateTime = STATIONS[0].dateTime;
        const step1 = dateTime.step1;

        node.conn.writeItems(STATIONS[0].bits.ll1On, true, (anythingBad) => { // // Set ll1 M150 true
            if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
            this.doneWriting = true;

            node.conn.readAllItems((anythingBad, values) => { // Read all
                if (anythingBad) { console.log("SOMETHING WENT WRONG READING VALUES!!!!"); }
                console.log(values);
                this.doneReading = true;
            });

            setImmediate(() => {
                node.conn.writeItems(STATIONS[0].bits.ll1On, false, (anythingBad) => { // // Set ll1 false
                    if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
                    this.doneWriting = true;
    
                    node.conn.readAllItems((anythingBad, values) => { // Read all
                        if (anythingBad) { console.log("SOMETHING WENT WRONG READING VALUES!!!!"); }
                        console.log(values);
                        this.doneReading = true;
                    });
                });
            }, 1000);
        });

        
    });

    ipcMain.on(CHANNELS.ll1Off, (e, status) => {
        console.log(status);
        const node = connections[STATIONS[0].id];
        node.conn.writeItems(STATIONS[0].bits.ll1Off, true, node.valuesWritten);
        setTimeout(() => {
            node.conn.writeItems(STATIONS[0].bits.ll1Off, false, node.valuesWritten);
        }, 1000);
    });

    ipcMain.on(CHANNELS.ll2On, (e, status) => {
        const node = connections[STATIONS[0].id];
        node.conn.writeItems(STATIONS[0].bits.ll2On, true, node.valuesWritten);
        setTimeout(() => {
            node.conn.writeItems(STATIONS[0].bits.ll2On, false, node.valuesWritten);
        }, 1000);
    });

    ipcMain.on(CHANNELS.ll2Off, (e, status) => {
        console.log(status);
        const node = connections[STATIONS[0].id];
        node.conn.writeItems(STATIONS[0].bits.ll2Off, true, node.valuesWritten);
        setTimeout(() => {
            node.conn.writeItems(STATIONS[0].bits.ll2Off, false, node.valuesWritten);
        }, 1000);
    });
    
    ipcMain.on(CHANNELS.ll3On, (e, status) => {
        const node = connections[STATIONS[0].id];
        node.conn.writeItems(STATIONS[0].bits.ll3On, true, node.valuesWritten);
        setTimeout(() => {
            node.conn.writeItems(STATIONS[0].bits.ll3On, false, node.valuesWritten);
        }, 1000);
    });

    ipcMain.on(CHANNELS.ll3Off, (e, status) => {
        console.log(status);
        const node = connections[STATIONS[0].id];
        node.conn.writeItems(STATIONS[0].bits.ll3Off, true, node.valuesWritten);
        setTimeout(() => {
            node.conn.writeItems(STATIONS[0].bits.ll3Off, false, node.valuesWritten);
        }, 1000);
    });


    // Save
    ipcMain.on(CHANNELS.step1save, (e, step1OnHH, step1OnMM, step1OffHH, step1OffMM) => {
        const node = connections[STATIONS[0].id];
        const dateTime = STATIONS[0].dateTime;
        const step1 = dateTime.step1;

        console.log(step1OnHH, step1OnMM, step1OffHH, step1OffMM);

        // Check if M300.3 is on or not
        const canEdit = store.get(STATIONS[0].storedKeys.canEdit);

        node.conn.writeItems(step1.setPlcEdit, true, (anythingBad) => { // Set Plc Edit true
            if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
            this.doneWriting = true;

            node.conn.writeItems(step1.setOnHH, step1OnHH, (anythingBad) => { // On HH
                if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
                this.doneWriting = true;
                
                node.conn.writeItems(step1.setOnMM, step1OnMM, (anythingBad) => { // On MM
                    if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
                    this.doneWriting = true;
    
                    node.conn.writeItems(step1.setOffHH, step1OffHH, (anythingBad) => { // Off HH
                        if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
                        this.doneWriting = true;
        
                        node.conn.writeItems(step1.setOffMM, step1OffMM, (anythingBad) => { // Off MM
                            if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
                            this.doneWriting = true;
                            
                            node.conn.writeItems(step1.save, true, (anythingBad) => { // Save true
                                if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
                                this.doneWriting = true;

                                node.conn.readAllItems((err, value) => { // Read all
                                    if (err) console.log('Cannot read');
                                    this.doneReading = true;
                                    console.log(value);
                                    console.log('value ', value[step1.onHH], value[step1.onMM], value[step1.offHH], value[step1.offMM]);
                                    mainWindow.webContents.send(CHANNELS.readStep1AfterSave, value[step1.onHH], value[step1.onMM], value[step1.offHH], value[step1.offMM]);
                                });
                                
                                node.conn.writeItems(step1.save, false, (anythingBad) => { // // Set Plc Edit false
                                    if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
                                    this.doneWriting = true;
                                    
                                    node.conn.writeItems(step1.setPlcEdit, false, (anythingBad) => { // // Set Save false
                                        if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
                                        this.doneWriting = true;
                                        
                                        // node.conn.readAllItems((err, value) => { // Read all
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

        const node = connections[STATIONS[0].id];
        const dateTime = STATIONS[0].dateTime;
        const step1 = dateTime.step1;
        console.log('set can edit');
        node.conn.writeItems(step1.setCanEdit, true, (anythingBad) => { // // Set can edit true
            if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
            this.doneWriting = true;
            
            node.conn.readAllItems((anythingBad, values) => { // Read all
                if (anythingBad) { console.log("SOMETHING WENT WRONG READING VALUES!!!!"); }
                console.log(values);
                this.doneReading = true;
                mainWindow.webContents.send(CHANNELS.canEdit, values[STATIONS[0].dateTime.step1.canEdit])
            });

            node.conn.writeItems(step1.setCanEdit, false, (anythingBad) => { // // Set can edit true
                if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
                this.doneWriting = true;

            });


        });
    }); 
 
    // Set automanual
    ipcMain.on(CHANNELS.setAutoManual, (e, autoManual) => {
        console.log(autoManual);

        const node = connections[STATIONS[0].id];
        const dateTime = STATIONS[0].dateTime;
        const step1 = dateTime.step1;
        console.log('set can edit', step1.setAutoManual, autoManual);
        node.conn.writeItems(step1.setAutoManual, autoManual, (anythingBad) => { // // Set can edit true
            if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
            this.doneWriting = true;
            
            node.conn.readAllItems((anythingBad, values) => { // Read all
                if (anythingBad) { console.log("SOMETHING WENT WRONG READING VALUES!!!!"); }
                console.log(values);
                this.doneReading = true;
                const autoManualResult = values[STATIONS[0].dateTime.step1.autoManual];
                store.set(STATIONS[0].storedKeys.autoManual, autoManualResult);
                mainWindow.webContents.send(CHANNELS.autoManual, autoManualResult);
            });

            node.conn.writeItems(step1.setAutoManual, false, (anythingBad) => { // // Set can edit true
                if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
                this.doneWriting = true;

            });
        });
    }); 
   
}
