import React, { useEffect, useState } from 'react'
import logic from '../../logic'

export default function FlightDetail({ flightId }) {
    const [flight, setFlight] = useState(null)
    const [feedback, setFeedback] = useState(null)

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

    return (<section className="section">
        <h1 className="title section--title">FLIGHT DETAIL</h1>
        {flight && <div className="columns">
            <div className="column is-4-desktop">
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-4by3">
                            <img src={flight.userId.image ? flight.userId.image : "https://bulma.io/images/placeholders/1280x960.png"} alt="Placeholder image" />
                        </figure>
                    </div>
                    <div className="card-content">
                        {flight.userId && <p><strong>PILOT</strong> {flight.userId.name}</p>}
                        {flight.droneId && <p><strong>DRONE</strong> {flight.droneId.brand} {flight.droneId.model}</p>}
                    </div>
                </div>
            </div>
            <div className="column t-container">
                <div className="section level">
                    <div className="level-left">
                        <strong>FLIGHT ID:</strong> {flight._id}
                        {/* <strong>MOVES:</strong> {flight.history.length} */}
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