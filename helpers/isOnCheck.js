
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
const S1_M217_0 = false;
store.set('S1_M217_0', false);

// Station2
const S2_M218_2 = false;
store.set('S2_M218_2', false);

const S2_M217_2 = false;
store.set('S2_M217_2', false);

const S2_M217_3 = false;
store.set('S2_M217_3', false);

const S2_M217_4 = false;
store.set('S2_M217_4', false);

// Station3
const S3_M217_0 = false;
store.set('S3_M217_0', false);

// Station 4
const S4_M218_2 = false;
store.set('S4_M218_2', false);

const S4_M217_2 = false;
store.set('S4_M217_2', false);

const S4_M217_3 = false;
store.set('S4_M217_3', false);

const S4_M217_4 = false;
store.set('S4_M217_4', false);

// store.set('S2_M218_2', true);
// console.log('s2 ', store.get('S2_M218_2'));


// const M217_2 = 'M217.2';
// const M217_3 = 'M217.3';
// const M217_4 = 'M217.4';
// const M217_5 = 'M217.5';
// const M217_6 = 'M217.6';
// const M217_7 = 'M217.7';

// const M218_0 = 'M218.0';
// const M218_1 = 'M218.1';
// const M218_2 = 'M218.2';
// const M218_3 = 'M218.3';

module.exports = (NODES, mainWindow, startLoop, PINGINTERVALS) => {

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
                                if (dM217_0 && S1_M217_0 !== dM217_0) {
                                    S1_M217_0 = dM217_0;
                                    store.set('S1_M217_0', dM217_0);
                                    mainWindow.webContents.send(CHANNELS.onStation1, { M217_0: dM217_0 });
                                }
                            });
                        }

                        if (n.id === 'N2') {
                            readHelper(n).then(data => {
                                console.log(data, 'N2');
                                const data1 = data[M218_2];
                                const data2 = data[M217_2];
                                const data3 = data[M217_3];
                                const data4 = data[M217_4];

                                if (data1 && S2_M218_2 !== data1) {
                                    S2_M218_2 = data1;
                                    store.set('S2_M218_2', data1);
                                    mainWindow.webContents.send(CHANNELS.onStation2, { M218_2: data1 });
                                }

                                if (data2 && S2_M217_2 !== data2) {
                                    S2_M217_2 = data2;
                                    store.set('S2_M217_2', data2);
                                    mainWindow.webContents.send(CHANNELS.onStation2, { M217_2: data2 });
                                }

                                if (data3 && S2_M217_3 !== data3) {
                                    S2_M217_3 = data3;
                                    store.set('S2_M217_3', data3);
                                    mainWindow.webContents.send(CHANNELS.onStation2, { M217_3: data3 });
                                }

                                if (data4 && S2_M217_4 !== data4) {
                                    S2_M217_4 = data4;
                                    store.set('S2_M217_4', data4);
                                    mainWindow.webContents.send(CHANNELS.onStation2, { M217_4: data4 });
                                }
                            });
                        }

                        if (n.id === 'N3') {
                            readHelper(n).then(data => {
                                console.log(data, 'N3');
                                const data1 = data[M217_0];
                                if (data1 && S3_M217_0 !== data1) {
                                    S3_M217_0 = data1;
                                    store.set('S3_M217_0', data1);
                                    mainWindow.webContents.send(CHANNELS.onStation3, { M217_0: data1 });
                                }
                            });
                        }

                        if (n.id === 'N4') {
                            readHelper(n).then(data => {
                                console.log(data, 'N4');
                                const data1 = data[M218_2];
                                const data2 = data[M217_2];
                                const data3 = data[M217_3];
                                const data4 = data[M217_4];

                                if (data1 && S4_M218_2 !== data1) {
                                    S4_M218_2 = data1;
                                    store.set('S4_M218_2', data1);
                                    mainWindow.webContents.send(CHANNELS.onStation4, { M218_2: data1 });
                                }

                                if (data2 && S4_M217_2 !== data2) {
                                    S4_M217_2 = data2;
                                    store.set('S4_M217_2', data2);
                                    mainWindow.webContents.send(CHANNELS.onStation4, { M217_2: data2 });
                                }

                                if (data3 && S4_M217_3 !== data3) {
                                    S4_M217_3 = data3;
                                    store.set('S4_M217_3', data3);
                                    mainWindow.webContents.send(CHANNELS.onStation4, { M217_3: data3 });
                                }

                                if (data4 && S4_M217_4 !== data4) {
                                    S4_M217_4 = data4;
                                    store.set('S4_M217_4', data4);
                                    mainWindow.webContents.send(CHANNELS.onStation4, { M217_4: data4 });
                                }
                            });
                        }

                        if (n.id === 'N5') {
                            readHelper(n).then(data => {
                                console.log(data, 'N5');
                                if (data[M218_3]) {
                                    mainWindow.webContents.send(CHANNELS.onStation5, { M218_3: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation5, { M218_3: false });
                                }

                                if (data[M217_5]) {
                                    mainWindow.webContents.send(CHANNELS.onStation5, { M217_5: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation5, { M217_5: false });
                                }

                                if (data[M217_6]) {
                                    mainWindow.webContents.send(CHANNELS.onStation5, { M217_6: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation5, { M217_6: false });
                                }

                                if (data[M217_7]) {
                                    mainWindow.webContents.send(CHANNELS.onStation5, { M217_7: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation5, { M217_7: false });
                                }

                                if (data[M218_0]) {
                                    mainWindow.webContents.send(CHANNELS.onStation5, { M218_0: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation5, { M218_0: false });
                                }

                                if (data[M218_1]) {
                                    mainWindow.webContents.send(CHANNELS.onStation5, { M218_1: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation5, { M218_1: false });
                                }
                            });
                        }

                        if (n.id === 'N6') {
                            readHelper(n).then(data => {
                                console.log(data, 'N6');
                                if (data[M218_3]) {
                                    mainWindow.webContents.send(CHANNELS.onStation6, { M218_3: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation6, { M218_3: false });
                                }

                                if (data[M217_5]) {
                                    mainWindow.webContents.send(CHANNELS.onStation6, { M217_5: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation6, { M217_5: false });
                                }

                                if (data[M217_6]) {
                                    mainWindow.webContents.send(CHANNELS.onStation6, { M217_6: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation6, { M217_6: false });
                                }

                                if (data[M217_7]) {
                                    mainWindow.webContents.send(CHANNELS.onStation6, { M217_7: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation6, { M217_7: false });
                                }

                                if (data[M218_0]) {
                                    mainWindow.webContents.send(CHANNELS.onStation6, { M218_0: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation6, { M218_0: false });
                                }

                                if (data[M218_1]) {
                                    mainWindow.webContents.send(CHANNELS.onStation6, { M218_1: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation6, { M218_1: false });
                                }
                            });
                        }

                        if (n.id === 'N7') {
                            readHelper(n).then(data => {
                                console.log(data, 'N7');
                                if (data[M218_3]) {
                                    mainWindow.webContents.send(CHANNELS.onStation7, { M218_3: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation7, { M218_3: false });
                                }

                                if (data[M217_5]) {
                                    mainWindow.webContents.send(CHANNELS.onStation7, { M217_5: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation7, { M217_5: false });
                                }

                                if (data[M217_6]) {
                                    mainWindow.webContents.send(CHANNELS.onStation7, { M217_6: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation7, { M217_6: false });
                                }

                                if (data[M217_7]) {
                                    mainWindow.webContents.send(CHANNELS.onStation7, { M217_7: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation7, { M217_7: false });
                                }

                                if (data[M218_0]) {
                                    mainWindow.webContents.send(CHANNELS.onStation7, { M218_0: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation7, { M218_0: false });
                                }

                                if (data[M218_1]) {
                                    mainWindow.webContents.send(CHANNELS.onStation7, { M218_1: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation7, { M218_1: false });
                                }
                            });
                        }

                        if (n.id === 'N8') {
                            readHelper(n).then(data => {
                                console.log(data, 'N8');
                                if (data[M218_3]) {
                                    mainWindow.webContents.send(CHANNELS.onStation8, { M218_3: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation8, { M218_3: false });
                                }

                                if (data[M217_5]) {
                                    mainWindow.webContents.send(CHANNELS.onStation8, { M217_5: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation8, { M217_5: false });
                                }

                                if (data[M217_6]) {
                                    mainWindow.webContents.send(CHANNELS.onStation8, { M217_6: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation8, { M217_6: false });
                                }

                                if (data[M217_7]) {
                                    mainWindow.webContents.send(CHANNELS.onStation8, { M217_7: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation8, { M217_7: false });
                                }

                                if (data[M218_0]) {
                                    mainWindow.webContents.send(CHANNELS.onStation8, { M218_0: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation8, { M218_0: false });
                                }

                                if (data[M218_1]) {
                                    mainWindow.webContents.send(CHANNELS.onStation8, { M218_1: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation8, { M218_1: false });
                                }
                            });
                        }

                        if (n.id === 'N9') {
                            readHelper(n).then(data => {
                                console.log(data, 'N9');
                                if (data[M218_3]) {
                                    mainWindow.webContents.send(CHANNELS.onStation9, { M218_3: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation9, { M218_3: false });
                                }

                                if (data[M217_5]) {
                                    mainWindow.webContents.send(CHANNELS.onStation9, { M217_5: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation9, { M217_5: false });
                                }

                                if (data[M217_6]) {
                                    mainWindow.webContents.send(CHANNELS.onStation9, { M217_6: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation9, { M217_6: false });
                                }

                                if (data[M217_7]) {
                                    mainWindow.webContents.send(CHANNELS.onStation9, { M217_7: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation9, { M217_7: false });
                                }

                                if (data[M218_0]) {
                                    mainWindow.webContents.send(CHANNELS.onStation9, { M218_0: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation9, { M218_0: false });
                                }

                                if (data[M218_1]) {
                                    mainWindow.webContents.send(CHANNELS.onStation9, { M218_1: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation9, { M218_1: false });
                                }
                            });
                        }

                        if (n.id === 'N10') {
                            readHelper(n).then(data => {
                                console.log(data, 'N10');
                                if (data[M218_3]) {
                                    mainWindow.webContents.send(CHANNELS.onStation10, { M218_3: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation10, { M218_3: false });
                                }

                                if (data[M217_5]) {
                                    mainWindow.webContents.send(CHANNELS.onStation10, { M217_5: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation10, { M217_5: false });
                                }

                                if (data[M217_6]) {
                                    mainWindow.webContents.send(CHANNELS.onStation10, { M217_6: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation10, { M217_6: false });
                                }

                                if (data[M217_7]) {
                                    mainWindow.webContents.send(CHANNELS.onStation10, { M217_7: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation10, { M217_7: false });
                                }

                                if (data[M218_0]) {
                                    mainWindow.webContents.send(CHANNELS.onStation10, { M218_0: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation10, { M218_0: false });
                                }

                                if (data[M218_1]) {
                                    mainWindow.webContents.send(CHANNELS.onStation10, { M218_1: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation10, { M218_1: false });
                                }
                            });
                        }

                        if (n.id === 'N11') {
                            readHelper(n).then(data => {
                                console.log(data, 'N11');
                                if (data[M218_3]) {
                                    mainWindow.webContents.send(CHANNELS.onStation11, { M218_3: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation11, { M218_3: false });
                                }

                                if (data[M217_5]) {
                                    mainWindow.webContents.send(CHANNELS.onStation11, { M217_5: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation11, { M217_5: false });
                                }

                                if (data[M217_6]) {
                                    mainWindow.webContents.send(CHANNELS.onStation11, { M217_6: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation11, { M217_6: false });
                                }

                                if (data[M217_7]) {
                                    mainWindow.webContents.send(CHANNELS.onStation11, { M217_7: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation11, { M217_7: false });
                                }

                                if (data[M218_0]) {
                                    mainWindow.webContents.send(CHANNELS.onStation11, { M218_0: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation11, { M218_0: false });
                                }

                                if (data[M218_1]) {
                                    mainWindow.webContents.send(CHANNELS.onStation11, { M218_1: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation11, { M218_1: false });
                                }
                            });
                        }

                        if (n.id === 'N12') {
                            readHelper(n).then(data => {
                                console.log(data, 'N12');
                                if (data[M218_3]) {
                                    mainWindow.webContents.send(CHANNELS.onStation12, { M218_3: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation12, { M218_3: false });
                                }

                                if (data[M217_5]) {
                                    mainWindow.webContents.send(CHANNELS.onStation12, { M217_5: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation12, { M217_5: false });
                                }

                                if (data[M217_6]) {
                                    mainWindow.webContents.send(CHANNELS.onStation12, { M217_6: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation12, { M217_6: false });
                                }

                                if (data[M217_7]) {
                                    mainWindow.webContents.send(CHANNELS.onStation12, { M217_7: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation12, { M217_7: false });
                                }

                                if (data[M218_0]) {
                                    mainWindow.webContents.send(CHANNELS.onStation12, { M218_0: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation12, { M218_0: false });
                                }

                                if (data[M218_1]) {
                                    mainWindow.webContents.send(CHANNELS.onStation12, { M218_1: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation12, { M218_1: false });
                                }
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



