import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import './index.sass'

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
        <h1 className="title section--title">YOUR FLIGHTS</h1>
        <div className="columns is-multiline">
            {flights && flights.map(flight => <div key={flight.id} className="column is-4-desktop">
                <div className="box flight" onClick={() => onFlightDetail(flight._id)}>
                    <article className="media">
                        {!userId && <figure className="media-left">
                            <p className="image is-64x64">
                                <img src={flight.userId.image ? flight.userId.image : "http://bcnnow.decodeproject.eu/img/users/no-image.jpg"} />
                            </p>
                        </figure>}
                        <div className="media-content">
                            <div className="content">
                                <p><strong>Flight</strong> <small>{flight.userId.name} {flight.userId.surname}</small></p>
                                <p className="flight--date"><small>{flight.start}</small></p>
                                <p className="flight--content">This flight was made in <strong>{flight.history.length}</strong> moves</p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>)}
        </div>
    </section>)
}
