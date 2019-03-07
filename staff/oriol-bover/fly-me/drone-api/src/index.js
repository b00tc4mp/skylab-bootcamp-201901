'use strict'
const dgram = require('dgram')

class Drone {
    constructor(host, port) {
        this.host = host
        this.port = port
    }

    start() {
        this.socket = dgram.createSocket('udp4')

        this.socket.bind(this.port)

        this.__on__ = true
    }

    stop() {
        this.socket.close()

        this.__on__ = false
    }

    onMessage(callback) {
        this.socket.on('message', callback)
    }

    sendCommand(command) {
        if (this.__on__) {
            this.socket.send(command, 0, command.length, this.port, this.host, error => {
                if (error) throw new DroneError(error)
            })
        } else {
            throw new DroneError(`drone at ${this.host}:${this.port} is offline`)
        }
    }
}

class DroneError extends Error {
    constructor(messageOrError) {
        super(messageOrError)
    }
}

module.exports = Drone