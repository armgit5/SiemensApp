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
            p1: 'M4.0',
            p2: 'M4.1',
            p3: 'M4.2',
            p4: 'M4.3'
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