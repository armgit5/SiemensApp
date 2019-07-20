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
            ll2On: 'M150.2',
            ll2Off: 'M150.3',
            ll3On: 'M150.4',
            ll3Off: 'M150.5',
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
                onHH: 'MW110',
                onMM: 'MW112',
                offHH: 'MW114',
                offMM: 'MW116',
                setOnHH: 'MW310',
                setOnMM: 'MW312',
                setOffHH: 'MW314',
                setOffMM: 'MW316'
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
        },
        storedKeys: {
            headerDatetime: 'headerDatetime'
        }
    },
]