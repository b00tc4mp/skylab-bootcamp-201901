import React, { useState } from 'react'
import logic from '../../logic'
import Terminal from './Terminal'
import Keyboard from './Keyboard'
import commands from './commands'

function CommandPannel() {
    const [history, setHistory] = useState([])

    function startDrone(e) {
        e.preventDefault()

        logic.startDrone()
            .then(res => {
                if (res.start === 'OK')
                    logic.historyDrone()
                        .then(res => setHistory(res.history))
            })
    }

    function sendCommand(e, command) {
        e.preventDefault()

        logic.sendDroneCommand(command)
            .then(res => {
                if (res.command === 'OK')
                    logic.historyDrone()
                        .then(res => setHistory(res.history))
            })
    }

    function test(key) {
        console.log('key from panel',key)
    }

    function stopDrone(e) {
        e.preventDefault()

        logic.stopDrone()
            .then(res => console.log(res))
    }

    return (<section className="section">
        <Terminal history={history} />
        <div className="columns">
            <div className="column">
                <a className="button is-success is-outlined" onClick={e => startDrone(e)}>ON</a>
                <a className="button is-danger is-outlined" onClick={e => stopDrone(e)}>OFF</a>
                <a className="button is-info is-outlined" onClick={e => sendCommand(e, 'battery?')}>BATTERY</a>
            </div>
        </div>
        <div className="columns">
            <div className="column">
                <a className="button is-link is-outlined" onClick={e => sendCommand(e, 'takeoff')}>TAKE OFF</a>
                <a className="button is-link is-outlined" onClick={e => sendCommand(e, 'land')}>LAND</a>
                <a className="button is-link is-outlined" onClick={e => sendCommand(e, 'up 20')}>UP</a>
                <a className="button is-link is-outlined" onClick={e => sendCommand(e, 'down 20')}>DOWN</a>
                <a className="button is-link is-outlined" onClick={e => sendCommand(e, 'forward 20')}>FORWARD</a>
                <a className="button is-link is-outlined" onClick={e => sendCommand(e, 'back 20')}>BACK</a>
                <a className="button is-link is-outlined" onClick={e => sendCommand(e, 'left 20')}>LEFT</a>
                <a className="button is-link is-outlined" onClick={e => sendCommand(e, 'right 20')}>RIGHT</a>
            </div>
        </div>
        <div className="columns">
            <div className="column">
                <a className="button is-danger is-outlined" onClick={e => sendCommand(e, 'emergency')}>EMERGENCY</a>
            </div>
        </div>
        <div className="columns is-centered is-hidden-touch">
            <div className="column is-10-desktop is-10-widescreen">
                < Keyboard />
            </div>
        </div>
    </section>)
}

export default CommandPannel