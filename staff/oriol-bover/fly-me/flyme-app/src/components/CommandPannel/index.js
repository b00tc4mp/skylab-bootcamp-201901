import React, { useState } from 'react'
import logic from '../../logic'
import Modal from '../Modal'
import Terminal from './Terminal'
import Keyboard from './Keyboard'
import commands from './commands'

function CommandPannel({ droneId, historyP }) {
    const [history, setHistory] = useState([])
    const [modal, setModal] = useState(false)
    const [feedback, setFeedback] = useState('')
    const [status, setStatus] = useState(false)

    function startDrone(e) {
        e.preventDefault()

        try {
            logic.startDrone(droneId)
                .then(res => {
                    if (res.start === 'OK') setHistory(res.history)
                    if (res.error) {
                        setFeedback(res.error)
                        setModal(true)
                        return
                    }

                    setStatus(true)
                })
                .catch(err => {
                    setFeedback(err.message)
                    setModal(true)
                })
        } catch ({ message }) {
            setFeedback(message)
            setModal(true)
        }
    }

    function sendCommand(command) {
        try {
            logic.sendDroneCommand(command, droneId)
                .then(res => {
                    if (res.command === 'OK') setHistory(res.history)
                    if (res.error) {
                        setFeedback(res.error)
                        setModal(true)
                        return
                    }

                    var objDiv = document.getElementById("terminal");
                    objDiv.scrollTop = objDiv.scrollHeight;
                })
                .catch(err => {
                    setFeedback(err.message)
                    setModal(true)
                })
        } catch ({ message }) {
            setFeedback(message)
            setModal(true)
        }
    }

    function keyboard(key) {

        if (commands[key]) {
            const command = commands[key].command
            sendCommand(command)
        }
    }

    function stopDrone(e) {
        e.preventDefault()
        try {
            logic.stopDrone(droneId)
                .then(res => {
                    console.log(res)
                    if (res.error) {
                        setFeedback(res.error)
                        setModal(true)
                        return
                    }

                    setStatus(false)
                })
                .catch(err => {
                    setFeedback(err.message)
                    setModal(true)
                })
        } catch ({ message }) {
            setFeedback(message)
            setModal(true)
        }
    }

    const buttonsStyle = {
        marginLeft: '13.5em',
    }

    function closeModal() {
        setModal(false)
    }

    return (<section className="section">
        {modal && < Modal onClose={closeModal} message={feedback} />}
        <Terminal history={history} />
        <div className="columns is-centered is-hidden-touch">
            <div className="column is-10-desktop is-10-widescreen">
                STATUS: {status ? <span class="tag is-success">Online</span> : <span class="tag is-danger">Offline</span>}
            </div>
        </div>
        <div className="columns is-centered is-hidden-touch">
            <div className="column is-10-desktop is-10-widescreen">
                <div className="buttons buttons--panel" style={buttonsStyle}>
                    <button className="button is-success is-outlined" onClick={e => startDrone(e)}>ON</button>
                    <button className="button is-danger is-outlined" onClick={e => stopDrone(e)}>OFF</button>
                    <button className="button is-info is-outlined" onClick={() => sendCommand('battery?')}>BATTERY</button>
                    <button className="button is-info is-outlined" onClick={() => sendCommand('takeoff')}>TAKE OFF</button>
                    <button className="button is-info is-outlined" onClick={() => sendCommand('land')}>LAND</button>
                </div>
                {historyP && historyP.location.pathname === `/admin/drone/${droneId}/command` && < Keyboard onActiveKey={keyboard} />}
            </div>
        </div>
    </section>)
}

export default CommandPannel