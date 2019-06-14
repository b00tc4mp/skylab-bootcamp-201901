import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logic from '../../logic'

export default function Drones({ user, history }) {
    const [drones, setDrones] = useState(null)
    const [feedback, setFeedback] = useState(null)

    useEffect(() => {
        (async function () {
            try {
                return logic.retrieveDrones(user.id)
                    .then(drones => {
                        setDrones(drones)
                        setFeedback(null)
                    })
                    .catch(err => setFeedback(err.message))
            } catch ({ message }) {
                setFeedback(message)
            }
        })();
    }, user);

    function addDrone() {
        history.push('/admin/drone/add')
    }

    function deleteDrone(e, droneId) {
        e.preventDefault()

        if (droneId) {
            try {
                return logic.deleteDrone(droneId)
                    .then(res => {
                        if (res.status === 'OK') window.location.reload()
                    })
                    .catch(err => setFeedback(err.message))
            } catch ({ message }) {
                setFeedback(message)
            }
        }
    }

    return (<section className="section">
        <div className="columns">
            <div className="column">
                <h1 className="title">MY DRONES</h1>
                <button className="button" onClick={() => addDrone()} >+ ADD DRONE</button>
                {feedback && <p>{feedback}</p>}
                <table className="table is-fullwidth is-hidden-mobile">
                    <thead>
                        <tr>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Host</th>
                            <th>Port</th>
                            <th>Register</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {drones && <tbody>
                        {drones.map(drone => <tr key={drone.id} >
                            <td>{drone.brand}</td>
                            <td>{drone.model}</td>
                            <td>{drone.host}</td>
                            <td>{drone.port}</td>
                            <td>{drone.createdAt}</td>
                            <td>
                                <Link to={`/admin/drone/${drone._id}/command`}><i className="fas fa-gamepad"></i></Link>&nbsp;
                                <Link to={`/admin/drone/${drone._id}/edit`} ><i className="fas fa-pen"></i></Link>&nbsp;
                                <a href="#" onClick={e => deleteDrone(e, drone._id)} ><i className="fas fa-trash-alt link"></i></a>
                            </td>
                        </tr>)}
                    </tbody>}
                </table>
            </div>
        </div>
    </section>)
}