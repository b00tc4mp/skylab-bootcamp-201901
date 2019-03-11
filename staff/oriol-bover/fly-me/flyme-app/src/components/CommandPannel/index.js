import React from 'react'
import logic from '../../logic'

function CommandPannel() {


    function startDrone(e) {
        e.preventDefault()

        logic.startDrone()
    }

    function sendCommand(e, command) {
        e.preventDefault()

        logic.sendDroneCommand(command)
    }

    function stopDrone(e) {
        e.preventDefault()

        logic.stopDrone()
    }

    return (<section className="section">
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
    </section>)
}

export default CommandPannel