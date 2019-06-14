require('dotenv').config()
const net = require('net')
const port = 5000
const server = net.createServer()
const call = require('./call')

server.listen(port, function () {
    console.log('Server listening on port: ' + port)
})

server.on('connection', function (socket) {
    socket.on('data', function (chunk) {
        const infoSplit = (chunk.toString()).split(',')

        const __url__ = 'https://vast-gorge-68373.herokuapp.com/api'
        const __timeout__ = 0

        if (infoSplit.length >= 1 && infoSplit[5] && infoSplit[7] && infoSplit[12]) {
            let status
            const latDegrees = Number(infoSplit[5].slice(0, 2))
            const latMinutes = (Number(infoSplit[5].slice(2)) / 60)
            const lngDegrees = Number(infoSplit[7].slice(0, 3))
            const lngMinutes = (Number(infoSplit[7].slice(3)) / 60)
            const latitude = (latDegrees + latMinutes).toFixed(6)
            const longitude = (lngDegrees + lngMinutes).toFixed(6)
            if (infoSplit[12].slice(4, 6) == '9F') {
                status = 'ON'
            }
            else {
                status = 'OFF'
            }
            const gpsData = {
                serialNumber: infoSplit[1],
                validState: infoSplit[4],
                lat: latitude * 1,
                hemisfere: infoSplit[6],
                lng: longitude * 1,
                orientation: infoSplit[8],
                speed: Number(infoSplit[9]),
                status: status
            }
            if (gpsData.validState == 'A') {
                if (gpsData.hemisfere == 'S') { gpsData.lat = gpsData.lat * (-1) }
                if (gpsData.orientation == 'W') { gpsData.lng = gpsData.lng * (-1) }
            }
            else {
                console.log('Invalid chunck')
            }

            try {
                call(`${__url__}/tracks/TCP/add`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    data: { serialNumber: gpsData.serialNumber, latitude: gpsData.lat, longitude: gpsData.lng, speed: gpsData.speed, status: gpsData.status },
                    timeout: __timeout__
                }).then(() => console.log("-> OK")).catch(() => console.log("KO ->"))
            }
            catch (err) {
                console.log(err)
            }
        } else {
            console.log('Invalid GPS Coords, status V recieved')
        }
    })

    server.on('close', function () {
        console.log('Server Closed !')
    })
})


