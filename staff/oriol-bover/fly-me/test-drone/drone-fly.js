'use strict'
const commandDelays = require('./commands-delay')
const wait = require('waait')

const dgram = require('dgram')

const PORT = 8889
const PORTVIDEO = 11111
const HOST = '192.168.10.1'

const drone = dgram.createSocket('udp4')
drone.bind(PORT)

const video = dgram.createSocket('udp4')
video.bind(PORTVIDEO)

drone.on('message', message => {
    console.log(`DRONE: ${message}`)
})

video.on('message', message => {
    console.log(`VIDEO: ${message}`)
})


function handleError(error) {
    if (error) {
        console.log(`ERROR: ${error}`)
    }
}

const commands = ['command', 'battery?', 'streamon'] //'takeoff', 'land'

let i = 0

async function go() {
    const command = commands[i]
    const delay = commandDelays[command]
    console.log(`running command: ${command}`)
    drone.send(command, 0, command.length, PORT, HOST, handleError)
    await wait(delay)
    i += 1
    if (i < commands.length) {
        return go()
    }
    console.log('all commands done!')
}

go()


// drone.send('command', 0, 7, PORT, HOST, handleError)
// drone.send('battery?', 0, 8, PORT, HOST, handleError)