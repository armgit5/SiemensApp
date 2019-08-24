
const { CHANNELS, SCANTIME } = require('./environments');
const readHelper = require('./readHelper');


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
                        n.conn.addItems('M217.0');
                        n.conn.addItems('M218.2');
                        n.conn.addItems('M218.3');

                        if (n.id === 'N1') {
                            readHelper(n).then(data => {
                                console.log(data);
                                if (data['M217.0']) {
                                    mainWindow.webContents.send(CHANNELS.onStation1, true);
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation1, false);
                                }
                            });
                        }

                        if (n.id === 'N2') {
                            readHelper(n).then(data => {
                                console.log(data);
                                if (data['M218.2']) {
                                    mainWindow.webContents.send(CHANNELS.onStation2, true);
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation2, false);
                                }
                            });
                        }

                        if (n.id === 'N3') {
                            readHelper(n).then(data => {
                                console.log(data);
                                if (data['M217.0']) {
                                    mainWindow.webContents.send(CHANNELS.onStation3, true);
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation3, false);
                                }
                            });
                        }

                        if (n.id === 'N4') {
                            readHelper(n).then(data => {
                                console.log(data);
                                if (data['M218.2']) {
                                    mainWindow.webContents.send(CHANNELS.onStation4, true);
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation4, false);
                                }
                            });
                        }

                        if (n.id === 'N5') {
                            readHelper(n).then(data => {
                                console.log(data);
                                if (data['M218.3']) {
                                    mainWindow.webContents.send(CHANNELS.onStation5, true);
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation5, false);
                                }
                            });
                        }

                        if (n.id === 'N6') {
                            readHelper(n).then(data => {
                                console.log(data);
                                if (data['M218.3']) {
                                    mainWindow.webContents.send(CHANNELS.onStation6, true);
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation6, false);
                                }
                            });
                        }

                        if (n.id === 'N7') {
                            readHelper(n).then(data => {
                                console.log(data);
                                if (data['M218.3']) {
                                    mainWindow.webContents.send(CHANNELS.onStation7, true);
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation7, false);
                                }
                            });
                        }

                        if (n.id === 'N8') {
                            readHelper(n).then(data => {
                                console.log(data);
                                if (data['M218.3']) {
                                    mainWindow.webContents.send(CHANNELS.onStation8, true);
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation8, false);
                                }
                            });
                        }

                        if (n.id === 'N9') {
                            readHelper(n).then(data => {
                                console.log(data);
                                if (data['M218.3']) {
                                    mainWindow.webContents.send(CHANNELS.onStation9, true);
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation9, false);
                                }
                            });
                        }

                        if (n.id === 'N10') {
                            readHelper(n).then(data => {
                                console.log(data);
                                if (data['M218.3']) {
                                    mainWindow.webContents.send(CHANNELS.onStation10, true);
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation10, false);
                                }
                            });
                        }

                        if (n.id === 'N11') {
                            readHelper(n).then(data => {
                                console.log(data);
                                if (data['M218.3']) {
                                    mainWindow.webContents.send(CHANNELS.onStation11, true);
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation11, false);
                                }
                            });
                        }

                        if (n.id === 'N12') {
                            readHelper(n).then(data => {
                                console.log(data);
                                if (data['M218.3']) {
                                    mainWindow.webContents.send(CHANNELS.onStation12, true);
                                } else {
                                    mainWindow.webContents.send(CHANNELS.onStation12, false);
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



