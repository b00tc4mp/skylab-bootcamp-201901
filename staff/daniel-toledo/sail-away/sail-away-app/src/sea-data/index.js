'use strict'

const seas = [
    {
        name: 'North Pacific Ocean',
        center: {
            lat: 35.468199,
            lng: -148.519270
        },
        zoom: 3
    },
    {
        name: 'South Pacific Ocean',
        center: {
            lat: -30.45719314,
            lng: -82.45477945
        },
        zoom: 3
    },
    {
        name: 'North Atlantic Ocean',
        center: {
            lat: 23.96239409,
            lng: -40.15744051
        },
        zoom: 3
    },
    {
        name: 'South Atlantic Ocean',
        center: {
            lat: -33.73239551,
            lng: -18.80876716
        },
        zoom: 3
    },
    {
        name: 'Indian Ocean',
        center: {
            lat: -32.72458381,
            lng: 79.20858601
        },
        zoom: 3
    },
    {
        name: 'Southern Ocean',
        center: {
            lat: -68.03981889,
            lng: -26.63285801
        },
        zoom: 2
    },
    {
        name: 'Arctic Ocean',
        center: {
            lat: 84.86488603,
            lng: -5.20258346
        },
        zoom: 2
    },
    {
        name: 'Mediterranean Sea',
        center: {
            lat: 38.02360535,
            lng: 15.09230423
        },
        zoom: 4
    },
    {
        name: 'Caribean Sea',
        center: {
            lat: 15.31030446,
            lng: -74.6780113
        },
        zoom: 5
    },
    {
        name: 'South China Sea',
        center: {
            lat: 11.77674997,
            lng: 112.30802222
        },
        zoom: 4
    },
    {
        name: 'Berin Sea',
        center: {
            lat: 54.393203,
            lng: -172.369927
        },
        zoom: 4
    },
    {
        name: 'Gulf of Mexico',
        center: {
            lat: 24.94231563,
            lng: -90.37958525
        },
        zoom: 5
    },
    {
        name: 'Okhotsk Sea',
        center: {
            lat: 53.23385899,
            lng: 148.92540465
        },
        zoom: 4
    },
    {
        name: 'Eastern Sea',
        center: {
            lat: 29.13089135,
            lng: 125.21708986
        },
        zoom: 4
    },
    {
        name: 'Hudson Sea',
        center: {
            lat: 59.03587571,
            lng: -84.8891196
        },
        zoom: 4
    },
    {
        name: 'Japan Sea',
        center: {
            lat: 40.50843024,
            lng: 135.13274501
        },
        zoom: 5
    },
    {
        name: 'Andaman Sea',
        center: {
            lat: 11.20149397,
            lng: 95.66173151
        },
        zoom: 6
    },
    {
        name: 'Red Sea',
        center: {
            lat: 20.31573096,
            lng: 38.73504211
        },
        zoom: 6
    },
    {
        name: 'Persian Gulf',
        center: {
            lat: 26.8033073,
            lng: 52.04671763
        },
        zoom: 6
    },
    {
        name: 'Arabian Sea',
        center: {
            lat: 13.33512866,
            lng: 63.99431793
        },
        zoom: 4
    },
    {
        name: 'Arafura Sea',
        center: {
            lat: -10.51841719,
            lng: 136.9556614
        },
        zoom: 5
    },
    {
        name: 'Banda Sea',
        center: {
            lat: -5.46594965,
            lng: 126.41786957
        },
        zoom: 6
    },
    {
        name: 'Barents Sea',
        center: {
            lat: 74.72392506,
            lng: 42.11782661
        },
        zoom: 3
    },
    {
        name: 'Bay of Bangal',
        center: {
            lat: 13.17322167,
            lng: 87.45442549
        },
        zoom: 5
    },
    {
        name: 'Bay of Biscay',
        center: {
            lat: 45.2244286,
            lng: -3.93513546
        },
        zoom: 6
    },
    {
        name: 'Black Sea',
        center: {
            lat: 43.27652404,
            lng: 34.17513341
        },
        zoom: 5.5
    },
    {
        name: 'Gulf of Bothnia',
        center: {
            lat: 62.63224634,
            lng: 20.77188093
        },
        zoom: 5
    },
    {
        name: 'Celebes Sea',
        center: {
            lat: 3.71432642,
            lng: 121.93858112
        },
        zoom: 6
    },
    {
        name: 'Celtic Sea',
        center: {
            lat: 49.58987684,
            lng: -7.68357444
        },
        zoom: 5.5
    },
    {
        name: 'English Chanel',
        center: {
            lat: 49.86121795,
            lng: -2.06339506
        },
        zoom: 6
    },
    {
        name: 'Greenland Sea',
        center: {
            lat: 74.25027165,
            lng: -8.30316422
        },
        zoom: 3
    },
    {
        name: 'Gulf of California',
        center: {
            lat: 26.88455783,
            lng: -110.97470758
        },
        zoom: 5.5
    },
    {
        name: 'Gulf of Siam',
        center: {
            lat: 9.71989293,
            lng: 101.84485132
        },
        zoom: 5.5
    },
    {
        name: 'Yellow Sea',
        center: {
            lat: 36.69709686,
            lng: 122.70217135
        },
        zoom: 5
    },
    {
        name: 'Molukka Sea',
        center: {
            lat: 0.67433267,
            lng: 126.05651723
        },
        zoom: 6
    },
    {
        name: 'Mozambique Channel',
        center: {
            lat: -19.30409503,
            lng: 40.87724447
        },
        zoom: 6
    },
    {
        name: 'North Western Passages',
        center: {
            lat: 72.60748207,
            lng: -98.5238404
        },
        zoom: 3.5
    },
    {
        name: 'Sawu Sea',
        center: {
            lat: -9.48015052,
            lng: 122.02723655
        },
        zoom: 6
    },
    {
        name: 'Coral Sea',
        center: {
            lat:-18.22433055,
            lng: 156.76782488
        },
        zoom: 4
    },
    {
        name: 'North Sea',
        center: {
            lat: 56.4239952,
            lng: 2.73786024
        },
        zoom: 5
    },
    {
        name: 'Baltic Sea',
        center: {
            lat: 56.66584338,
            lng: 18.07523543
        },
        zoom: 5
    }
]

export default seas