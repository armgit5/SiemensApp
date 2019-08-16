var sys = require('sys')
var exec = require('child_process').exec;
// function puts(error, stdout, stderr) {
//     console.log('good ', stdout);
//     console.log('bad ', stderr);
//     // console.log('std err ', error);
// }
// exec("ping -c 1 localhost2", puts);

const GROUP1 = ['localhost', 'localhost2', 'localhost', 'localhost'];
const GROUP2 = ['localhost', 'localhost'];
const GROUP3 = ['localhost', 'localhost'];
const GROUP4 = ['localhost', 'localhost'];
const GROUP5 = ['localhost', 'localhost'];


const _pingIp = (ip) => {
    return new Promise((resolve, reject) => { 
        exec(`ping -c 1 ${ip}`, (error, stdout, stderr) => {
            if (stdout) {
                resolve(true);
            } else {
                resolve(false);
            }

            if (stderr) {
                reject(stderr);
            }
        });
    });
};

// _pingIp('localhost2').then(ok => {
//     console.log(ok);
// });

const INTERVALS = [];

const _stopIntervals = () => {
    INTERVALS.forEach(clearInterval); // Clear interval
}
_stopIntervals();

const loopInterval = setInterval(() => {

    let group1ok = true;
    GROUP1.forEach(ip => {
        _pingIp(ip).then(ok => {
            if (!ok) {
                group1ok = false;
            }
        });
    });
    console.log('group 1 ok ', group1ok);

}, 1000);
INTERVALS.push(loopInterval);