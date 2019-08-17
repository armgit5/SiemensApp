module.exports = {
    id: 'N1',
    ip: '192.168.0.13',
    bits: {
        ll1On: 'M212.0',
        ll1Off: 'M212.1',
        ll2On: 'M212.2',
        ll2Off: 'M212.3',
        ll3On: 'M212.4',
        ll3Off: 'M212.5',

        ll4On: 'M145.0',
        ll4Off: 'M145.1',
        ll5On: 'M145.2',
        ll5Off: 'M145.3',
        ll6On: 'M145.4',
        ll6Off: 'M145.5',
        
        ll7On: 'M145.6',
        ll7Off: 'M145.7',
        ll8On: 'M146.0',
        ll8Off: 'M146.1',

        ll9On: 'M146.2',
        ll9Off: 'M146.3',
        ll10On: 'M146.4',
        ll10Off: 'M146.5',
        ll11On: 'M146.6',
        ll11Off: 'M146.7',

        ll12On: 'M147.0',
        ll12Off: 'M147.1',
        ll13On: 'M147.2',
        ll13Off: 'M147.3',
        ll14On: 'M147.4',
        ll14Off: 'M147.5',
        ll15On: 'M147.6',
        ll15Off: 'M147.7',

        ll1isOn: 'Q0.0',
        ll2isOn: 'Q0.1',
        ll3isOn: 'Q0.2',
        ll4isOn: 'Q0.3',
        ll5isOn: 'Q0.4',
        ll6isOn: 'Q0.5',
        ll7isOn: 'Q9.0',
        ll8isOn: 'Q9.1',
        ll9isOn: 'Q9.2',
        ll10isOn: 'Q9.3',
        ll11isOn: 'Q9.4',
        ll12isOn: 'Q9.5',
        ll13isOn: 'Q9.6',
        ll14isOn: 'Q9.7',
        ll15isOn: 'Q8.0',
    },
    datetime: {
        header: {
            date: 'MW200',
            month: 'MW202',
            year: 'MW204',
            hour: 'MW206',
            minute: 'MW208',
            second: 'MW210',
            autoManual: 'M190.1',
            setAutoManual: 'M190.0'
        },
        ll1: {
            step1: {
                onHH: 'MW10',
                onMM: 'MW12',
                onSS: 'MW14',
                onHHTimer: 'M22.0',
                onMMTimer: 'M22.1',
                onSSTimer: 'M22.2',
                offHH: 'MW16',
                offMM: 'MW18',
                offSS: 'MW20',
                offHHTimer: 'M22.3',
                offMMTimer: 'M22.4',
                offSSTimer: 'M22.5',
            },
            step2: {
                onHH: 'MW30',
                onMM: 'MW32',
                onSS: 'MW34',
                onHHTimer: 'M42.0',
                onMMTimer: 'M42.1',
                onSSTimer: 'M42.2',
                offHH: 'MW36',
                offMM: 'MW38',
                offSS: 'MW40',
                offHHTimer: 'M42.3',
                offMMTimer: 'M42.4',
                offSSTimer: 'M42.5',
            },
            step3: {
                onHH: 'MW50',
                onMM: 'MW52',
                onSS: 'MW54',
                onHHTimer: 'M62.0',
                onMMTimer: 'M62.1',
                onSSTimer: 'M62.2',
                offHH: 'MW56',
                offMM: 'MW58',
                offSS: 'MW60',
                offHHTimer: 'M62.3',
                offMMTimer: 'M62.4',
                offSSTimer: 'M62.5',
            },
            step4: {
                onHH: 'MW70',
                onMM: 'MW72',
                onSS: 'MW74',
                onHHTimer: 'M82.0',
                onMMTimer: 'M82.1',
                onSSTimer: 'M82.2',
                offHH: 'MW76',
                offMM: 'MW78',
                offSS: 'MW80',
                offHHTimer: 'M82.3',
                offMMTimer: 'M82.4',
                offSSTimer: 'M82.5',
            },
        },
        ll2: {
            step1: {
                onHH: 'MW230',
                onMM: 'MW232',
                onSS: 'MW234',
                onHHTimer: 'M242.0',
                onMMTimer: 'M242.1',
                onSSTimer: 'M242.2',
                offHH: 'MW236',
                offMM: 'MW238',
                offSS: 'MW240',
                offHHTimer: 'M242.3',
                offMMTimer: 'M242.4',
                offSSTimer: 'M242.5',
            },
            step2: {
                onHH: 'MW250',
                onMM: 'MW252',
                onSS: 'MW254',
                onHHTimer: 'M262.0',
                onMMTimer: 'M262.1',
                onSSTimer: 'M262.2',
                offHH: 'MW256',
                offMM: 'MW258',
                offSS: 'MW260',
                offHHTimer: 'M262.3',
                offMMTimer: 'M262.4',
                offSSTimer: 'M262.5',
            },
            step3: {
                onHH: 'MW270',
                onMM: 'MW272',
                onSS: 'MW274',
                onHHTimer: 'M282.0',
                onMMTimer: 'M282.1',
                onSSTimer: 'M282.2',
                offHH: 'MW276',
                offMM: 'MW278',
                offSS: 'MW280',
                offHHTimer: 'M282.3',
                offMMTimer: 'M282.4',
                offSSTimer: 'M282.5',
            },
            step4: {
                onHH: 'MW290',
                onMM: 'MW292',
                onSS: 'MW294',
                onHHTimer: 'M302.0',
                onMMTimer: 'M302.1',
                onSSTimer: 'M302.2',
                offHH: 'MW296',
                offMM: 'MW298',
                offSS: 'MW300',
                offHHTimer: 'M302.3',
                offMMTimer: 'M302.4',
                offSSTimer: 'M302.5',
            },
        },
        ll3: {
            step1: {
                onHH: 'MW410',
                onMM: 'MW412',
                onSS: 'MW414',
                onHHTimer: 'M422.0',
                onMMTimer: 'M422.1',
                onSSTimer: 'M422.2',
                offHH: 'MW416',
                offMM: 'MW418',
                offSS: 'MW420',
                offHHTimer: 'M422.3',
                offMMTimer: 'M422.4',
                offSSTimer: 'M422.5',
            },
            step2: {
                onHH: 'MW430',
                onMM: 'MW432',
                onSS: 'MW434',
                onHHTimer: 'M442.0',
                onMMTimer: 'M442.1',
                onSSTimer: 'M442.2',
                offHH: 'MW436',
                offMM: 'MW438',
                offSS: 'MW440',
                offHHTimer: 'M442.3',
                offMMTimer: 'M442.4',
                offSSTimer: 'M442.5',
            },
            step3: {
                onHH: 'MW450',
                onMM: 'MW452',
                onSS: 'MW454',
                onHHTimer: 'M462.0',
                onMMTimer: 'M462.1',
                onSSTimer: 'M462.2',
                offHH: 'MW456',
                offMM: 'MW458',
                offSS: 'MW460',
                offHHTimer: 'M462.3',
                offMMTimer: 'M462.4',
                offSSTimer: 'M462.5',
            },
            step4: {
                onHH: 'MW470',
                onMM: 'MW472',
                onSS: 'MW474',
                onHHTimer: 'M482.0',
                onMMTimer: 'M482.1',
                onSSTimer: 'M482.2',
                offHH: 'MW476',
                offMM: 'MW478',
                offSS: 'MW480',
                offHHTimer: 'M482.3',
                offMMTimer: 'M482.4',
                offSSTimer: 'M482.5',
            },
        },
        ll4: require('./lln/ll4'),
        ll5: require('./lln/ll5'),
        ll6: require('./lln/ll6'),
        ll7: require('./lln/ll7'),
        ll8: require('./lln/ll8'),
        ll9: require('./lln/ll9'),
        ll10: require('./lln/ll10'),
        ll11: require('./lln/ll11'),
        ll12: require('./lln/ll12'),
        ll13: require('./lln/ll13'),
        ll14: require('./lln/ll14'),
        ll15: require('./lln/ll15')
    },
    storedKeys: {
        headerDatetime: 'headerDatetime',
        canEdit: 'canEdit',
        autoManual: 'autoManual',
    }
}