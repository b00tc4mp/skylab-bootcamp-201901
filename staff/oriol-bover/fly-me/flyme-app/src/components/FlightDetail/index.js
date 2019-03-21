import React, { useEffect, useState } from 'react'
import Modal from '../Modal'
import logic from '../../logic'

export default function FlightDetail({ flightId, user, history }) {
    const [flight, setFlight] = useState(null)
    const [feedback, setFeedback] = useState(null)
    const [modal, setModal] = useState(false)

    useEffect(() => {
        (async function () {
            try {
                return logic.retrieveFlight(flightId)
                    .then(flight => setFlight(flight))
                    .catch(err => console.log(err.message))
            } catch ({ message }) {
                console.log(message)
            }
        })();
    }, flightId);

    function deleteFlight() {
        try {
            logic.deleteFlight(flightId)
                .then(res => {
                    if (res.status == 'OK') history.push(`/admin/user/${user.id}/flights`)
                })
                .catch(err => setFeedback(err))
        } catch ({ message }) {
            setFeedback(message)
        }

    }

    function showModal() {
        setModal(true)
    }

    function closeModal() {
        setModal(false)
    }

    return (<section className="section">
        {modal && <Modal message="Do you want to delete this flgiht?" onClose={closeModal} showButtons={true} onAccept={deleteFlight} onCancel={closeModal} />}
        <h1 className="title section--title">FLIGHT DETAIL</h1>
        {flight && <div className="columns">
            <div className="column is-4-desktop">
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-4by3">
                            <img src={flight.userId.image ? flight.userId.image : "http://bcnnow.decodeproject.eu/img/users/no-image.jpg"} alt="Placeholder image" />
                        </figure>
                    </div>
                    <div className="card-content">
                        {flight.userId && <p><strong>PILOT</strong> {flight.userId.name}</p>}
                        {flight.droneId && <p><strong>DRONE</strong> {flight.droneId.brand} {flight.droneId.model}</p>}
                    </div>
                </div>
                {user && user.id == flight.userId._id.toString() && <div className="card">
                    <div className="card-content has-text-centered">
                        <button onClick={() => showModal()} className="button is-danger">Delete flight</button>
                    </div>
                </div>}
            </div>
            <div className="column t-container">
                <div className="section level">
                    <div className="level-left">
                        <strong>FLIGHT ID:</strong> {flight._id}
                    </div>
                    <div className="level-right">{flight.start}</div>
                </div>
                <div className="t-tasks">
                    {flight.history && flight.history.map(history => <div key={Math.random()} className="level t-task">
                        <div className="level-left">
                            <div className="level-item">
                                <p><strong>ORDER: </strong>{history.command}</p>
                            </div>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <p><strong>RESPONSE: </strong>{history.response ? history.response : 'no response'}</p>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>}
    </section>)
}