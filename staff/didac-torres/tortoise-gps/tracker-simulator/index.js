const net = require('net')
const port = 5000
const interval = 1000 //miliseconds


const client = new net.Socket();
client.connect(port, '138.68.99.222', function () {
    console.log('Connected');

    setInterval(() => client.write(randomGPS()), interval)

});

client.on('close', function () {
    console.log('Connection closed');
});

randomGPS = () => {
    const baseLatitudeDegrees = [Math.floor(Math.random() * (91 - 0) + 0)] //0 to 90
    const baseLongitudeDegrees = [Math.floor(Math.random() * (181 - 0) + 0)] //0 to 180
    const baseLatitude = (Math.random() * (59.9999 - 0) + 0).toFixed(4) //00.0000 to 59.9999
    const baseLongitude = (Math.random() * (59.999 - 0) + 0).toFixed(4) //00.0000 to 59.9999

    const manufacturer = '*HQ'
    const serialNumber = ['9900110011', '9900220022', '9900330033', '9900440044'] //TRACKER SERIAL NUMBER 
    const version = 'V1'
    const clock = () => {
        const d = new Date()
        let hour = (d.getHours()).toString()
        let minute = (d.getMinutes()).toString()
        let second = (d.getSeconds()).toString()
        if (hour.length < 2) hour = '0' + hour
        if (minute.length < 2) minute = '0' + minute
        if (second.length < 2) second = '0' + second
        return hour + minute + second //HHMMSS
    }
    const gpsSignal = ['A','A','A','A','A','V','A'] // 1/7 possibilities to fail [V]
    const latitude = baseLatitudeDegrees.toString() + baseLatitude.toString()
    const hemisfere = ['N', 'S'] //NORTH / SUD
    const longitude = baseLongitudeDegrees.toString() + baseLongitude.toString()
    const orient = ['E', 'W'] //EAST / WEST
    const speed = '090.80' //KM/H
    const direction = '208' //DEGREES
    const date = () => {
        const d = new Date()
        let day = (d.getDate()).toString()
        let month = (d.getMonth() + 1).toString()
        let year = ((d.getFullYear()).toString()).slice(2)
        if (day.length < 2) day = '0' + day
        if (month.length < 2) month = '0' + month
        return day + month + year //DDMMYY
    }
    const vehicle_status = 'FFFFBBFF'
    const net_mcc = '214'
    const net_mnc = '03'
    const net_lac = '2126'
    const net_cellid = '1860'
    const closer = '#'

    const message = `${manufacturer},${serialNumber[Math.floor(Math.random() * (4 - 0) + 0)]},${version},${clock()},${gpsSignal[[Math.floor(Math.random() * (7 - 0) + 0)]]},${latitude},${hemisfere[Math.floor(Math.random() * (2 - 0) + 0)]},${longitude},${orient[Math.floor(Math.random() * (2 - 0) + 0)]},${speed},${direction},${date()},${vehicle_status},${net_mcc},${net_mnc},${net_lac},${net_cellid}${closer}`

    return message

}