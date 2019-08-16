var sys = require('sys')
var exec = require('child_process').exec;
// function puts(error, stdout, stderr) {
//     console.log('good ', stdout);
//     console.log('bad ', stderr);
//     // console.log('std err ', error);
// }
// exec("ping -c 1 localhost2", puts);

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

_pingIp('localhost2').then(ok => {
    console.log(ok);
});