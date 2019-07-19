module.exports = [
    {
        id: 'N1',
        ip: '192.168.0.11',
        status: {
            main: false,
            p1: false,
            p2: false,
            p3: false,
            p4: false
        },
        bits: {
            ll1On: 'M150.0',
            ll1Off: 'M150.1',
            
        },
        dateTime: {
            header: {
                date: 'MW80',
                month: 'MW82',
                year: 'MW84',
                hour: 'MW86',
                minute: 'MW88',
                second: 'MW90',
            },
            step1: {
                fromHH: 'MW10',
                fromMM: 'MW12',
                toHH: 'MW14',
                toMM: 'MW16'
            },
            step2: {
                fromHH: 'MW20',
                fromMM: 'MW22',
                toHH: 'MW24',
                toMM: 'MW26'
            },
            step3: {
                fromHH: 'MW30',
                fromMM: 'MW32',
                toHH: 'MW34',
                toMM: 'MW36'
            },
            step4: {
                fromHH: 'MW40',
                fromMM: 'MW42',
                toHH: 'MW44',
                toMM: 'MW46'
            }
        }
    },
]