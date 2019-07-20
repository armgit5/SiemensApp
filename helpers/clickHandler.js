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

        // node.conn.writeItems(STATIONS[0].bits.ll1On, true, node.valuesWritten);
        // setTimeout(() => {
        //     node.conn.writeItems(STATIONS[0].bits.ll1On, false, node.valuesWritten);

        //     node.conn.readAllItems(node.valuesReady);
        // }, 1000);

        node.conn.writeItems(step1.setPlcEdit, false, (anythingBad) => {
            if (anythingBad) { console.log("CANNOT WRITE SET PLC EDIT!!!!"); }
            console.log("Done writing.");
            this.doneWriting = true;
            
            node.conn.writeItems('MW310', 19, (anythingBad) => {
                if (anythingBad) { console.log("CANNOT WRITE MW310!!!!"); }
                console.log("Done writing.");
                this.doneWriting = true;
                node.conn.readAllItems(node.valuesReady);
            });

        });

        

        // node.conn.writeItems('MW310', 21, node.valuesWritten);
        // node.conn.readAllItems(node.valuesReady);

        // setTimeout(() => {
        //     node.conn.writeItems(step1.setPlcEdit, false, node.valuesWritten);
        //     node.conn.readAllItems(node.valuesReady);
        // }, 1000);
        

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
                                    console.log(value[step1.onHH], value[step1.onMM], value[step1.offHH], value[step1.offMM]);
                                    mainWindow.webContents.send(CHANNELS.readStep1AfterSave, value[step1.onHH], value[step1.onMM], value[step1.offHH], value[step1.offMM]);
                                });
                                
                                node.conn.writeItems(step1.save, false, (anythingBad) => { // // Set Plc Edit false
                                    if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
                                    this.doneWriting = true;
                                    
                                    node.conn.writeItems(step1.setPlcEdit, false, (anythingBad) => { // // Set Save false
                                        if (anythingBad) { console.log("CANNOT WRITE!!!!"); }
                                        this.doneWriting = true;
                                        
                                        node.conn.readAllItems((err, value) => {
                                            this.doneReading = true;
                                            console.log(value);
                                        });
                                    });
                                    
                                });
                
                            });
            
                        });
                    });
                });
    
            });

        });

        

    });

   
}