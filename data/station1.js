module.exports = {
    id: 'N1',
    ip: '192.168.0.11',
    bits: {
        ll1On: 'M150.0',
        ll1isOn: 'M210.0',
        ll1Off: 'M150.1',
        ll2On: 'M150.2',
        ll2Off: 'M150.3',
        ll3On: 'M150.4',
        ll3Off: 'M150.5',
    },
    datetime: {
        header: {
            date: 'MW200',
            month: 'MW202',
            year: 'MW204',
            hour: 'MW206',
            minute: 'MW208',
            second: 'MW210',
        },
        step1: {
            onHH: 'MW10',
            onHHTimer: 'M22.0',
            onMM: 'MW112',
            onMMTimer: 'M22.1',
            offHH: 'MW114',
            offMM: 'MW116',
            setOnHH: 'MW310',
            setOnMM: 'MW312',
            setOffHH: 'MW314',
            setOffMM: 'MW316',
            save: 'M300.0',
            setCanEdit: 'M300.1',
            canEdit: 'M300.3',
            autoManual: 'M190.1',
            setAutoManual: 'M190.0'
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
        headerDatetime: 'headerDatetime',
        canEdit: 'canEdit',
        autoManual: 'autoManual'
    }
}