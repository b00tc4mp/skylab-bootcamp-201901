import React, { useState, useEffect } from 'react'
import './index.sass'
import logic from '../../logic'

export default function ProgramDetail({ programId }) {
    const [program, setProgram] = useState(null)
    const [drones, setDrones] = useState(null)
    const [droneSelected, setDroneSelected] = useState(null)
    const [feedback, setFeedback] = useState(null)

    useEffect(() => {
        (async function () {
            try {
                return logic.retrieveProgram(programId)
                    .then(program => {
                        setProgram(program)
                        return logic.retrieveDrones(program.userId)
                    })
                    .then(drones => setDrones(drones))
                    .catch(err => setFeedback(err.message))
            } catch ({ message }) {
                setFeedback(message)
            }
        })();
    }, programId);


    function playProgram() {

        try {
            return logic.playProgram(droneSelected, program.orders)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        } catch ({ message }) {
            console.log(message)
        }
    }

    return (<section className="section">
        <div className="columns is-centered">
            <div className="column is-8-tablet is-8-desktop is-8-widescreen">
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <button className="button" onClick={() => playProgram()} >Play</button>
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <div className="control">
                                <div className="select">
                                    <select onChange={e => setDroneSelected(e.target.value)}>
                                        <option value="">Select Drone</option>
                                        {drones && drones.map(drone =>
                                            <option key={drone.id} value={drone._id} >{drone.brand} {drone.model}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="columns is-centered has-text-centered">
            <div className="column t-container is-8-tablet is-8-desktop is-8-widescreen">
                <h1 className="title">{program ? program.name : 'NO PROGRAM'}</h1>
                <div className="t-tasks">
                    {program && program.orders && program.orders.map(order =>
                        <div className="t-task" key={order.id}>
                            {order.content}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </section>)
}