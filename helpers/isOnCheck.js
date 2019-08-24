
const { CHANNELS, SCANTIME } = require('./environments');
const readHelper = require('./readHelper');


const M217_0 = 'M217.0';
const M218_2 = 'M218.2';
const M218_3 = 'M218.3';
const M217_2 = 'M217.2';
const M217_3 = 'M217.3';
const M217_4 = 'M217.4';

module.exports = (NODES, mainWindow, startLoop, PINGINTERVALS) => {

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
                        n.conn.addItems(M218_2);
                        n.conn.addItems(M218_3);

                        if (n.id === 'N1') {
                            readHelper(n).then(data => {
                                console.log('data ', 'N1');
                                if (data[M217_0]) {
                                    mainWindow.webContents.send(CHANNELS.onStation1, { M217_0: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation1, { M217_0: false });
                                }
                            });
                        }

                        if (n.id === 'N2') {
                            readHelper(n).then(data => {
                                console.log(data, 'N2');
                                if (data[M218_2]) {
                                    mainWindow.webContents.send(CHANNELS.onStation2, { M218_2: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation2, { M218_2: false });
                                }

                                if (data[M217_2]) {
                                    mainWindow.webContents.send(CHANNELS.onStation2, { M217_2: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation2, { M217_2: false });
                                }

                                if (data[M217_3]) {
                                    mainWindow.webContents.send(CHANNELS.onStation2, { M217_3: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation2, { M217_3: false });
                                }

                                if (data[M217_4]) {
                                    mainWindow.webContents.send(CHANNELS.onStation2, { M217_4: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation2, { M217_4: false });
                                }
                            });
                        }

                        if (n.id === 'N3') {
                            readHelper(n).then(data => {
                                console.log(data, 'N3');
                                if (data[M217_0]) {
                                    mainWindow.webContents.send(CHANNELS.onStation3, { M217_0: true });
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation3, { M217_0: false });
                                }
                            });
                        }

                        if (n.id === 'N4') {
                            readHelper(n).then(data => {
                                console.log(data);
                                if (data.M218_2) {
                                    mainWindow.webContents.send(CHANNELS.onStation4, {M218_2: true});
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation4, {M218_2: false});
                                }
                            });
                        }

                        if (n.id === 'N5') {
                            readHelper(n).then(data => {
                                console.log(data);
                                if (data[M218_3]) {
                                    mainWindow.webContents.send(CHANNELS.onStation5, {M218_3: true});
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation5, {M218_3: false});
                                }
                            });
                        }

                        if (n.id === 'N6') {
                            readHelper(n).then(data => {
                                console.log(data);
                                if (data[M218_3]) {
                                    mainWindow.webContents.send(CHANNELS.onStation6, {M218_3: true});
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation6, {M218_3: false});
                                }
                            });
                        }

                        if (n.id === 'N7') {
                            readHelper(n).then(data => {
                                console.log(data);
                                if (data[M218_3]) {
                                    mainWindow.webContents.send(CHANNELS.onStation7, {M218_3: true});
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation7, {M218_3: false});
                                }
                            });
                        }

                        if (n.id === 'N8') {
                            readHelper(n).then(data => {
                                console.log(data);
                                if (data[M218_3]) {
                                    mainWindow.webContents.send(CHANNELS.onStation8, {M218_3: true});
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation8, {M218_3: false});
                                }
                            });
                        }

                        if (n.id === 'N9') {
                            readHelper(n).then(data => {
                                console.log(data);
                                if (data[M218_3]) {
                                    mainWindow.webContents.send(CHANNELS.onStation9, {M218_3: true});
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation9, {M218_3: false});
                                }
                            });
                        }

                        if (n.id === 'N10') {
                            readHelper(n).then(data => {
                                console.log(data);
                                if (data[M218_3]) {
                                    mainWindow.webContents.send(CHANNELS.onStation10, {M218_3: true});
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation10, {M218_3: false});
                                }
                            });
                        }

                        if (n.id === 'N11') {
                            readHelper(n).then(data => {
                                console.log(data);
                                if (data[M218_3]) {
                                    mainWindow.webContents.send(CHANNELS.onStation11, {M218_3: true});
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation11, {M218_3: false});
                                }
                            });
                        }

                        if (n.id === 'N12') {
                            readHelper(n).then(data => {
                                console.log(data);
                                if (data[M218_3]) {
                                    mainWindow.webContents.send(CHANNELS.onStation12, {M218_3: true});
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation12, {M218_3: false});
                                }
                            });
                        }

                        // Remove to readlist
                        n.conn.removeItems('M217.0');
                        n.conn.removeItems('M218.2');
                        n.conn.removeItems('M218.3');

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



