'use strict'
const dgram = require('dgram')

class Drone {
    constructor() {
        this.drone = null
        this.status = false
        this.PORT = 8889
        this.HOST = '192.168.10.1'
    }

    init() {
        console.log('iniit')
        this.drone = dgram.createSocket('udp4')
        this.drone.bind(this.PORT)
        this.drone.on('message', message => {
            console.log(`DRONE: ${message}`)
        })
        this.status = true
        console.log(' what is in the drone', this.drone)
    }

    turnOff() {
        console.log('closing')
        this.drone.close()
        this.status = false
    }

    handleError(error) {
        if (error) console.log(`DRONE ERROR: ${error}`)
    }

    sendCommand(command) {
        console.log('command in api', command)
        if (this.status) {
            console.log('this status is ', this.status)
            this.drone.send(command, 0, command.length, this.PORT, this.HOST, this.handleError)
        } else {
            return { Error: 'drone is offline' }
        }
    }
}

module.exports = new Drone()