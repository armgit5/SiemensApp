
const { CHANNELS, SCANTIME } = require('./environments');
const readHelper = require('./readHelper');
const Store = require('electron-store');
const store = new Store();

const M217_0 = 'M217.0';
const M217_2 = 'M217.2';
const M217_3 = 'M217.3';
const M217_4 = 'M217.4';
const M217_5 = 'M217.5';
const M217_6 = 'M217.6';
const M217_7 = 'M217.7';

const M218_0 = 'M218.0';
const M218_1 = 'M218.1';
const M218_2 = 'M218.2';
const M218_3 = 'M218.3';

// Cache
let cnt = 0;
// Station1
let S1_M217_0 = false;
store.set('S1_M217_0', false);

// Station2
let S2_M218_2 = false;
store.set('S2_M218_2', false);
let S2_M217_2 = false;
store.set('S2_M217_2', false);
let S2_M217_3 = false;
store.set('S2_M217_3', false);
let S2_M217_4 = false;
store.set('S2_M217_4', false);

// Station3
let S3_M217_0 = false;
store.set('S3_M217_0', false);

// Station 4
let S4_M218_2 = false;
store.set('S4_M218_2', false);
let S4_M217_2 = false;
store.set('S4_M217_2', false);
let S4_M217_3 = false;
store.set('S4_M217_3', false);
let S4_M217_4 = false;
store.set('S4_M217_4', false);

// Station 5
let S5_M218_3 = false;
store.set('S5_M218_3', false);
let S5_M217_5 = false;
store.set('S5_M217_5', false);
let S5_M217_6 = false;
store.set('S5_M217_6', false);
let S5_M217_7 = false;
store.set('S5_M217_7', false);
let S5_M218_0 = false;
store.set('S5_M218_0', false);
let S5_M218_1 = false;
store.set('S5_M218_1', false);

// Station 6
let S6_M218_3 = false;
store.set('S6_M218_3', false);
let S6_M217_5 = false;
store.set('S6_M217_5', false);
let S6_M217_6 = false;
store.set('S6_M217_6', false);
let S6_M217_7 = false;
store.set('S6_M217_7', false);
let S6_M218_0 = false;
store.set('S6_M218_0', false);
let S6_M218_1 = false;
store.set('S6_M218_1', false);

// Station 7
let S7_M218_3 = false;
store.set('S7_M218_3', false);
let S7_M217_5 = false;
store.set('S7_M217_5', false);
let S7_M217_6 = false;
store.set('S7_M217_6', false);
let S7_M217_7 = false;
store.set('S7_M217_7', false);
let S7_M218_0 = false;
store.set('S7_M218_0', false);
let S7_M218_1 = false;
store.set('S7_M218_1', false);

// Station 8
let S8_M218_3 = false;
store.set('S8_M218_3', false);
let S8_M217_5 = false;
store.set('S8_M217_5', false);
let S8_M217_6 = false;
store.set('S8_M217_6', false);
let S8_M217_7 = false;
store.set('S8_M217_7', false);
let S8_M218_0 = false;
store.set('S8_M218_0', false);
let S8_M218_1 = false;
store.set('S8_M218_1', false);

// Station 9
let S9_M218_3 = false;
store.set('S9_M218_3', false);
let S9_M217_5 = false;
store.set('S9_M217_5', false);
let S9_M217_6 = false;
store.set('S9_M217_6', false);
let S9_M217_7 = false;
store.set('S9_M217_7', false);
let S9_M218_0 = false;
store.set('S9_M218_0', false);
let S9_M218_1 = false;
store.set('S9_M218_1', false);

// Station 10
let S10_M218_3 = false;
store.set('S10_M218_3', false);
let S10_M217_5 = false;
store.set('S10_M217_5', false);
let S10_M217_6 = false;
store.set('S10_M217_6', false);
let S10_M217_7 = false;
store.set('S10_M217_7', false);
let S10_M218_0 = false;
store.set('S10_M218_0', false);
let S10_M218_1 = false;
store.set('S10_M218_1', false);

// Station 11
let S11_M218_3 = false;
store.set('S11_M218_3', false);
let S11_M217_5 = false;
store.set('S11_M217_5', false);
let S11_M217_6 = false;
store.set('S11_M217_6', false);
let S11_M217_7 = false;
store.set('S11_M217_7', false);
let S11_M218_0 = false;
store.set('S11_M218_0', false);
let S11_M218_1 = false;
store.set('S11_M218_1', false);

// Station 12
let S12_M218_3 = false;
store.set('S12_M218_3', false);
let S12_M217_5 = false;
store.set('S12_M217_5', false);
let S12_M217_6 = false;
store.set('S12_M217_6', false);
let S12_M217_7 = false;
store.set('S12_M217_7', false);
let S12_M218_0 = false;
store.set('S12_M218_0', false);
let S12_M218_1 = false;
store.set('S12_M218_1', false);

let STATION_ID = 0;


module.exports = (NODES, mainWindow, startLoop, PINGINTERVALS) => {

    const _connect = () => {
        // Init station 1
        if (STATION_ID === 1) {
            // NODE = null;
            NODE = new Node(STATION1.id, STATION1.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S1 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 1 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
                }
            });
        }

        if (STATION_ID === 2) {
            // NODE = null;
            NODE = new Node(STATION2.id, STATION2.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S2 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 2 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    // require('./reInit')(mainWindow, STATION2.id, false);
                    // _sendDefaultDatetime();
                }
            });
        }

        if (STATION_ID === 3) {
            // NODE = null;
            NODE = new Node(STATION3.id, STATION3.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S3 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 3 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
                }
            });
        }

        if (STATION_ID === 4) {
            NODE = new Node(STATION4.id, STATION4.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S4 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 4 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
                }
            });
        }

        if (STATION_ID === 5) {
            NODE = new Node(STATION5.id, STATION5.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S5 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 5 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
                }
            });
        }

        if (STATION_ID === 6) {
            NODE = new Node(STATION6.id, STATION6.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S6 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 6 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
                }
            });
        }

        if (STATION_ID === 7) {
            NODE = new Node(STATION7.id, STATION7.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S7 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 7 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
                }
            });
        }

        if (STATION_ID === 8) {
            NODE = new Node(STATION8.id, STATION8.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S8 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 8 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
                }
            });
        }

        if (STATION_ID === 9) {
            NODE = new Node(STATION9.id, STATION9.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S9 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 9 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
                }
            });
        }

        if (STATION_ID === 10) {
            NODE = new Node(STATION10.id, STATION10.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S10 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 10 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
                }
            });
        }

        if (STATION_ID === 11) {
            NODE = new Node(STATION11.id, STATION11.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S11 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 11 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
                }
            });
        }

        if (STATION_ID === 12) {
            NODE = new Node(STATION12.id, STATION12.ip);
            initHelper(NODE).then(isOnline => {
                console.log('S12 is online ', isOnline);
                if (isOnline) {
                    aNodeIsOnline = true;
                    console.log('init station 12 sucessfully');
                    _initReadWrite(NODE);
                } else {
                    _sendDefaultDatetime();
                }
            });
        }
    };


    if (cnt === 0) {

        // Station 1
        mainWindow.webContents.send(CHANNELS.onStation1, { M217_0: S1_M217_0 });

        // Station 2
        mainWindow.webContents.send(CHANNELS.onStation2, { M218_2: S2_M218_2 });
        mainWindow.webContents.send(CHANNELS.onStation2, { M217_2: S2_M217_2 });
        mainWindow.webContents.send(CHANNELS.onStation2, { M217_3: S2_M217_3 });
        mainWindow.webContents.send(CHANNELS.onStation2, { M217_4: S2_M217_4 });

        // Station 3
        mainWindow.webContents.send(CHANNELS.onStation3, { M217_0: S3_M217_0 });

        // Station 4
        mainWindow.webContents.send(CHANNELS.onStation4, { M218_2: S4_M218_2 });
        mainWindow.webContents.send(CHANNELS.onStation4, { M217_2: S4_M217_2 });
        mainWindow.webContents.send(CHANNELS.onStation4, { M217_3: S4_M217_3 });
        mainWindow.webContents.send(CHANNELS.onStation4, { M217_4: S4_M217_4 });

        cnt = 1;
    }

    console.log('cnt ', cnt);

    // Ping Test
    const _stopPingIntervals = () => {
        PINGINTERVALS.forEach(clearInterval); // Clear interval
    }
    const _startPingLoop = () => {
        const _pingLoopInterval = setInterval(() => {
            console.log(startLoop);

            if (NODES.length > 0) {
                console.log('there is new node coming');

                NODES.forEach(n => {

                    if (n.conn) {

                        // Add to readlist
                        n.conn.addItems(M217_0);
                        n.conn.addItems(M217_2);
                        n.conn.addItems(M217_3);
                        n.conn.addItems(M217_4);
                        n.conn.addItems(M217_5);
                        n.conn.addItems(M217_6);
                        n.conn.addItems(M217_7);

                        n.conn.addItems(M218_0);
                        n.conn.addItems(M218_1);
                        n.conn.addItems(M218_2);
                        n.conn.addItems(M218_3);

                        if (n.id === 'N1') {
                            readHelper(n).then(data => {
                                console.log('data ', 'N1');
                                const dM217_0 = data[M217_0];
                                if (S1_M217_0 !== dM217_0) {
                                    S1_M217_0 = dM217_0;
                                    store.set('S1_M217_0', dM217_0);
                                    mainWindow.webContents.send(CHANNELS.onStation1, { M217_0: dM217_0 });
                                }
                            })
                            .catch(err => {
                                require('./reInit')(mainWindow, n.id, false);
                            });
                        }

                        if (n.id === 'N2') {
                            readHelper(n).then(data => {
                                // console.log(data, 'N2');
                                const data1 = data[M218_2];
                                const data2 = data[M217_2];
                                const data3 = data[M217_3];
                                const data4 = data[M217_4];

                                // console.log(data2, S2_M218_2, 'N2');

                                if (S2_M218_2 !== data1) {

                                    S2_M218_2 = data1;
                                    store.set('S2_M218_2', data1);
                                    mainWindow.webContents.send(CHANNELS.onStation2, { M218_2: data1 });
                                }

                                if (S2_M217_2 !== data2) {
                                    console.log(data2, S2_M218_2, 'N2 inside');
                                    S2_M217_2 = data2;
                                    store.set('S2_M217_2', data2);
                                    mainWindow.webContents.send(CHANNELS.onStation2, { M217_2: data2 });
                                }

                                if (S2_M217_3 !== data3) {
                                    S2_M217_3 = data3;
                                    store.set('S2_M217_3', data3);
                                    mainWindow.webContents.send(CHANNELS.onStation2, { M217_3: data3 });
                                }

                                if (S2_M217_4 !== data4) {
                                    S2_M217_4 = data4;
                                    store.set('S2_M217_4', data4);
                                    mainWindow.webContents.send(CHANNELS.onStation2, { M217_4: data4 });
                                }
                            })
                            .catch(err => {
                                require('./reInit')(mainWindow, n.id, false);
                            });
                        }

                        if (n.id === 'N3') {
                            readHelper(n).then(data => {
                                console.log(data, 'N3');
                                const data1 = data[M217_0];
                                if (S3_M217_0 !== data1) {
                                    S3_M217_0 = data1;
                                    store.set('S3_M217_0', data1);
                                    mainWindow.webContents.send(CHANNELS.onStation3, { M217_0: data1 });
                                }
                            })
                            .catch(err => {
                                require('./reInit')(mainWindow, n.id, false);
                            });
                        }

                        if (n.id === 'N4') {
                            readHelper(n).then(data => {
                                console.log(data, 'N4');
                                const data1 = data[M218_2];
                                const data2 = data[M217_2];
                                const data3 = data[M217_3];
                                const data4 = data[M217_4];

                                if (S4_M218_2 !== data1) {
                                    S4_M218_2 = data1;
                                    store.set('S4_M218_2', data1);
                                    mainWindow.webContents.send(CHANNELS.onStation4, { M218_2: data1 });
                                }

                                if (S4_M217_2 !== data2) {
                                    S4_M217_2 = data2;
                                    store.set('S4_M217_2', data2);
                                    mainWindow.webContents.send(CHANNELS.onStation4, { M217_2: data2 });
                                }

                                if (S4_M217_3 !== data3) {
                                    S4_M217_3 = data3;
                                    store.set('S4_M217_3', data3);
                                    mainWindow.webContents.send(CHANNELS.onStation4, { M217_3: data3 });
                                }

                                if (S4_M217_4 !== data4) {
                                    S4_M217_4 = data4;
                                    store.set('S4_M217_4', data4);
                                    mainWindow.webContents.send(CHANNELS.onStation4, { M217_4: data4 });
                                }
                            }).catch(err => {
                                require('./reInit')(mainWindow, n.id, false);
                            });
                        }

                        if (n.id === 'N5') {
                            readHelper(n).then(data => {
                                console.log(data, 'N5');

                                const data1 = data[M218_3];
                                const data2 = data[M217_5];
                                const data3 = data[M217_6];
                                const data4 = data[M217_7];
                                const data5 = data[M218_0];
                                const data6 = data[M218_1];

                                if (S5_M218_3 !== data1) {
                                    S5_M218_3 = data1;
                                    store.set('S5_M218_3', data1);
                                    mainWindow.webContents.send(CHANNELS.onStation5, { M218_3: data1 });
                                }

                                if (S5_M217_5 !== data2) {
                                    S5_M217_5 = data2;
                                    store.set('S5_M217_5', data2);
                                    mainWindow.webContents.send(CHANNELS.onStation5, { M217_5: data2 });
                                }

                                if (S5_M217_6 !== data3) {
                                    S5_M217_6 = data3;
                                    store.set('S5_M217_6', data3)
                                    mainWindow.webContents.send(CHANNELS.onStation5, { M217_6: data3 });
                                }

                                if (S5_M217_7 !== data4) {
                                    S5_M217_7 = data4;
                                    store.set('S5_M217_7', data4);
                                    mainWindow.webContents.send(CHANNELS.onStation5, { M217_7: data4 });
                                }

                                if (S5_M218_0 !== data5) {
                                    S5_M218_0 = data5;
                                    store.set('S5_M218_0', data5);
                                    mainWindow.webContents.send(CHANNELS.onStation5, { M218_0: data5 });
                                }

                                if (S5_M218_1 !== data6) {
                                    S5_M218_1 = data6;
                                    store.set('S5_M218_1', data6);
                                    mainWindow.webContents.send(CHANNELS.onStation5, { M218_1: data6 });
                                }
                            }).catch(err => {
                                require('./reInit')(mainWindow, n.id, false);
                            });
                        }

                        if (n.id === 'N6') {
                            readHelper(n).then(data => {
                                console.log(data, 'N6');

                                const data1 = data[M218_3];
                                const data2 = data[M217_5];
                                const data3 = data[M217_6];
                                const data4 = data[M217_7];
                                const data5 = data[M218_0];
                                const data6 = data[M218_1];

                                if (S6_M218_3 !== data1) {
                                    S6_M218_3 = data1;
                                    store.set('S6_M218_3', data1);
                                    mainWindow.webContents.send(CHANNELS.onStation6, { M218_3: data1 });
                                }

                                if (S6_M217_5 !== data2) {
                                    S6_M217_5 = data2;
                                    store.set('S6_M217_5', data2);
                                    mainWindow.webContents.send(CHANNELS.onStation6, { M217_5: data2 });
                                }

                                if (S6_M217_6 !== data3) {
                                    S6_M217_6 = data3;
                                    store.set('S6_M217_6', data3)
                                    mainWindow.webContents.send(CHANNELS.onStation6, { M217_6: data3 });
                                }

                                if (S6_M217_7 !== data4) {
                                    S6_M217_7 = data4;
                                    store.set('S6_M217_7', data4);
                                    mainWindow.webContents.send(CHANNELS.onStation6, { M217_7: data4 });
                                }

                                if (S6_M218_0 !== data5) {
                                    S6_M218_0 = data5;
                                    store.set('S6_M218_0', data5);
                                    mainWindow.webContents.send(CHANNELS.onStation6, { M218_0: data5 });
                                }

                                if (S6_M218_1 !== data6) {
                                    S6_M218_1 = data6;
                                    store.set('S6_M218_1', data6);
                                    mainWindow.webContents.send(CHANNELS.onStation6, { M218_1: data6 });
                                }

                            }).catch(err => {
                                require('./reInit')(mainWindow, n.id, false);
                            });
                        }

                        if (n.id === 'N7') {
                            readHelper(n).then(data => {
                                console.log(data, 'N7');

                                const data1 = data[M218_3];
                                const data2 = data[M217_5];
                                const data3 = data[M217_6];
                                const data4 = data[M217_7];
                                const data5 = data[M218_0];
                                const data6 = data[M218_1];

                                if (S7_M218_3 !== data1) {
                                    S7_M218_3 = data1;
                                    store.set('S7_M218_3', data1);
                                    mainWindow.webContents.send(CHANNELS.onStation7, { M218_3: data1 });
                                }

                                if (S7_M217_5 !== data2) {
                                    S7_M217_5 = data2;
                                    store.set('S7_M217_5', data2);
                                    mainWindow.webContents.send(CHANNELS.onStation7, { M217_5: data2 });
                                }

                                if (S7_M217_6 !== data3) {
                                    S7_M217_6 = data3;
                                    store.set('S7_M217_6', data3)
                                    mainWindow.webContents.send(CHANNELS.onStation7, { M217_6: data3 });
                                }

                                if (S7_M217_7 !== data4) {
                                    S7_M217_7 = data4;
                                    store.set('S7_M217_7', data4);
                                    mainWindow.webContents.send(CHANNELS.onStation7, { M217_7: data4 });
                                }

                                if (S7_M218_0 !== data5) {
                                    S7_M218_0 = data5;
                                    store.set('S7_M218_0', data5);
                                    mainWindow.webContents.send(CHANNELS.onStation7, { M218_0: data5 });
                                }

                                if (S7_M218_1 !== data6) {
                                    S7_M218_1 = data6;
                                    store.set('S7_M218_1', data6);
                                    mainWindow.webContents.send(CHANNELS.onStation7, { M218_1: data6 });
                                }
                            }).catch(err => {
                                require('./reInit')(mainWindow, n.id, false);
                            });
                        }

                        if (n.id === 'N8') {
                            readHelper(n).then(data => {
                                console.log(data, 'N8');

                                const data1 = data[M218_3];
                                const data2 = data[M217_5];
                                const data3 = data[M217_6];
                                const data4 = data[M217_7];
                                const data5 = data[M218_0];
                                const data6 = data[M218_1];

                                if (S8_M218_3 !== data1) {
                                    S8_M218_3 = data1;
                                    store.set('S8_M218_3', data1);
                                    mainWindow.webContents.send(CHANNELS.onStation8, { M218_3: data1 });
                                }

                                if (S8_M217_5 !== data2) {
                                    S8_M217_5 = data2;
                                    store.set('S8_M217_5', data2);
                                    mainWindow.webContents.send(CHANNELS.onStation8, { M217_5: data2 });
                                }

                                if (S8_M217_6 !== data3) {
                                    S8_M217_6 = data3;
                                    store.set('S8_M217_6', data3)
                                    mainWindow.webContents.send(CHANNELS.onStation8, { M217_6: data3 });
                                }

                                if (S8_M217_7 !== data4) {
                                    S8_M217_7 = data4;
                                    store.set('S8_M217_7', data4);
                                    mainWindow.webContents.send(CHANNELS.onStation8, { M217_7: data4 });
                                }

                                if (S8_M218_0 !== data5) {
                                    S8_M218_0 = data5;
                                    store.set('S8_M218_0', data5);
                                    mainWindow.webContents.send(CHANNELS.onStation8, { M218_0: data5 });
                                }

                                if (S8_M218_1 !== data6) {
                                    S8_M218_1 = data6;
                                    store.set('S8_M218_1', data6);
                                    mainWindow.webContents.send(CHANNELS.onStation8, { M218_1: data6 });
                                }

                            }).catch(err => {
                                require('./reInit')(mainWindow, n.id, false);
                            });
                        }

                        if (n.id === 'N9') {
                            readHelper(n).then(data => {
                                console.log(data, 'N9');

                                const data1 = data[M218_3];
                                const data2 = data[M217_5];
                                const data3 = data[M217_6];
                                const data4 = data[M217_7];
                                const data5 = data[M218_0];
                                const data6 = data[M218_1];

                                if (S9_M218_3 !== data1) {
                                    S9_M218_3 = data1;
                                    store.set('S9_M218_3', data1);
                                    mainWindow.webContents.send(CHANNELS.onStation9, { M218_3: data1 });
                                }

                                if (S9_M217_5 !== data2) {
                                    S9_M217_5 = data2;
                                    store.set('S9_M217_5', data2);
                                    mainWindow.webContents.send(CHANNELS.onStation9, { M217_5: data2 });
                                }

                                if (S9_M217_6 !== data3) {
                                    S9_M217_6 = data3;
                                    store.set('S9_M217_6', data3)
                                    mainWindow.webContents.send(CHANNELS.onStation9, { M217_6: data3 });
                                }

                                if (S9_M217_7 !== data4) {
                                    S9_M217_7 = data4;
                                    store.set('S9_M217_7', data4);
                                    mainWindow.webContents.send(CHANNELS.onStation9, { M217_7: data4 });
                                }

                                if (S9_M218_0 !== data5) {
                                    S9_M218_0 = data5;
                                    store.set('S9_M218_0', data5);
                                    mainWindow.webContents.send(CHANNELS.onStation9, { M218_0: data5 });
                                }

                                if (S9_M218_1 !== data6) {
                                    S9_M218_1 = data6;
                                    store.set('S9_M218_1', data6);
                                    mainWindow.webContents.send(CHANNELS.onStation9, { M218_1: data6 });
                                }

                            }).catch(err => {
                                require('./reInit')(mainWindow, n.id, false);
                            });
                        }

                        if (n.id === 'N10') {
                            readHelper(n).then(data => {
                                console.log(data, 'N10');



                                const data1 = data[M218_3];
                                const data2 = data[M217_5];
                                const data3 = data[M217_6];
                                const data4 = data[M217_7];
                                const data5 = data[M218_0];
                                const data6 = data[M218_1];

                                if (S10_M218_3 !== data1) {
                                    S10_M218_3 = data1;
                                    store.set('S10_M218_3', data1);
                                    mainWindow.webContents.send(CHANNELS.onStation10, { M218_3: data1 });
                                }

                                if (S10_M217_5 !== data2) {
                                    S10_M217_5 = data2;
                                    store.set('S10_M217_5', data2);
                                    mainWindow.webContents.send(CHANNELS.onStation10, { M217_5: data2 });
                                }

                                if (S10_M217_6 !== data3) {
                                    S10_M217_6 = data3;
                                    store.set('S10_M217_6', data3)
                                    mainWindow.webContents.send(CHANNELS.onStation10, { M217_6: data3 });
                                }

                                if (S10_M217_7 !== data4) {
                                    S10_M217_7 = data4;
                                    store.set('S10_M217_7', data4);
                                    mainWindow.webContents.send(CHANNELS.onStation10, { M217_7: data4 });
                                }

                                if (S10_M218_0 !== data5) {
                                    S10_M218_0 = data5;
                                    store.set('S10_M218_0', data5);
                                    mainWindow.webContents.send(CHANNELS.onStation10, { M218_0: data5 });
                                }

                                if (S10_M218_1 !== data6) {
                                    S10_M218_1 = data6;
                                    store.set('S10_M218_1', data6);
                                    mainWindow.webContents.send(CHANNELS.onStation10, { M218_1: data6 });
                                }

                            }).catch(err => {
                                require('./reInit')(mainWindow, n.id, false);
                            });
                        }

                        if (n.id === 'N11') {
                            readHelper(n).then(data => {
                                console.log(data, 'N11');

                                const data1 = data[M218_3];
                                const data2 = data[M217_5];
                                const data3 = data[M217_6];
                                const data4 = data[M217_7];
                                const data5 = data[M218_0];
                                const data6 = data[M218_1];

                                if (S11_M218_3 !== data1) {
                                    S11_M218_3 = data1;
                                    store.set('S11_M218_3', data1);
                                    mainWindow.webContents.send(CHANNELS.onStation11, { M218_3: data1 });
                                }

                                if (S11_M217_5 !== data2) {
                                    S11_M217_5 = data2;
                                    store.set('S11_M217_5', data2);
                                    mainWindow.webContents.send(CHANNELS.onStation11, { M217_5: data2 });
                                }

                                if (S11_M217_6 !== data3) {
                                    S11_M217_6 = data3;
                                    store.set('S11_M217_6', data3)
                                    mainWindow.webContents.send(CHANNELS.onStation11, { M217_6: data3 });
                                }

                                if (S11_M217_7 !== data4) {
                                    S11_M217_7 = data4;
                                    store.set('S11_M217_7', data4);
                                    mainWindow.webContents.send(CHANNELS.onStation11, { M217_7: data4 });
                                }

                                if (S11_M218_0 !== data5) {
                                    S11_M218_0 = data5;
                                    store.set('S11_M218_0', data5);
                                    mainWindow.webContents.send(CHANNELS.onStation11, { M218_0: data5 });
                                }

                                if (S11_M218_1 !== data6) {
                                    S11_M218_1 = data6;
                                    store.set('S11_M218_1', data6);
                                    mainWindow.webContents.send(CHANNELS.onStation11, { M218_1: data6 });
                                }

                            }).catch(err => {
                                require('./reInit')(mainWindow, n.id, false);
                            });
                        }

                        if (n.id === 'N12') {
                            readHelper(n).then(data => {
                                console.log(data, 'N12');


                                const data1 = data[M218_3];
                                const data2 = data[M217_5];
                                const data3 = data[M217_6];
                                const data4 = data[M217_7];
                                const data5 = data[M218_0];
                                const data6 = data[M218_1];

                                if (S12_M218_3 !== data1) {
                                    S12_M218_3 = data1;
                                    store.set('S12_M218_3', data1);
                                    mainWindow.webContents.send(CHANNELS.onStation12, { M218_3: data1 });
                                }

                                if (S12_M217_5 !== data2) {
                                    S12_M217_5 = data2;
                                    store.set('S12_M217_5', data2);
                                    mainWindow.webContents.send(CHANNELS.onStation12, { M217_5: data2 });
                                }

                                if (S12_M217_6 !== data3) {
                                    S12_M217_6 = data3;
                                    store.set('S12_M217_6', data3)
                                    mainWindow.webContents.send(CHANNELS.onStation12, { M217_6: data3 });
                                }

                                if (S12_M217_7 !== data4) {
                                    S12_M217_7 = data4;
                                    store.set('S12_M217_7', data4);
                                    mainWindow.webContents.send(CHANNELS.onStation12, { M217_7: data4 });
                                }

                                if (S12_M218_0 !== data5) {
                                    S12_M218_0 = data5;
                                    store.set('S12_M218_0', data5);
                                    mainWindow.webContents.send(CHANNELS.onStation12, { M218_0: data5 });
                                }

                                if (S12_M218_1 !== data6) {
                                    S12_M218_1 = data6;
                                    store.set('S12_M218_1', data6);
                                    mainWindow.webContents.send(CHANNELS.onStation12, { M218_1: data6 });
                                }


                            }).catch(err => {
                                require('./reInit')(mainWindow, n.id, false);
                            });
                        }

                        // Remove to readlist

                        n.conn.removeItems(M217_0);
                        n.conn.removeItems(M217_2);
                        n.conn.removeItems(M217_3);
                        n.conn.removeItems(M217_4);
                        n.conn.removeItems(M217_5);
                        n.conn.removeItems(M217_6);
                        n.conn.removeItems(M217_7);

                        n.conn.removeItems(M218_0);
                        n.conn.removeItems(M218_1);
                        n.conn.removeItems(M218_2);
                        n.conn.removeItems(M218_3);

                    } else {
                        console.log(n, 'not connected');
                    }

                });

            } else {
                console.log('waiting for a node');
            }

        }, 1000);

        PINGINTERVALS.push(_pingLoopInterval);
    }

    const main = () => {

        console.log('connecting inside ', startLoop);

        if (startLoop[0]) {
            _stopPingIntervals();
            _startPingLoop();
        } else {
            _stopPingIntervals();
        }

    };

    main();

};



