import React, { useState, useEffect } from 'react'
import logic from '../../logic'

export default function Flights({ userId, history }) {
    const [flights, setFlights] = useState(null)
    const [feedback, setFeedback] = useState(null)

    useEffect(() => {
        (async function () {
            try {
                return logic.retrieveFlights(userId)
                    .then(flights => setFlights(flights))
                    .catch(err => setFeedback(err.message))
            } catch ({ message }) {
                setFeedback(message)
            }
        })();
    }, []);

    function onFlightDetail(flightId) {
        if (flightId)
            history.push(`/admin/${flightId}/flight`)
    }

    return (<section className="section">
        <h1 className="title">FLIGHTS</h1>
        <div className="columns">
            <div className="column">
                {flights && flights.map(flight => <div className="box" key={flight.id} onClick={() => onFlightDetail(flight._id)}>
                    <p>Flight {flight.userId.name && <span>{flight.userId.name} {flight.userId.surname}</span>}</p>
                </div>)}
            </div>
        </div>
    </section>)
}
