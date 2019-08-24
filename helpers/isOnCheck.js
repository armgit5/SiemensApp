
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

                    // Add to readlist
                    n.conn.addItems('M217.0');
                    n.conn.addItems('M218.2');

                    if (n.id === 'N1') {
                        readHelper(n).then(data => {
                            console.log(data);
                        });
                    }

                    if (n.id === 'N2') {
                        readHelper(n).then(data => {
                            console.log(data);
                        });
                    }

                    // Remove to readlist
                    n.conn.removeItems('M217.0');
                    n.conn.removeItems('M218.2');

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



