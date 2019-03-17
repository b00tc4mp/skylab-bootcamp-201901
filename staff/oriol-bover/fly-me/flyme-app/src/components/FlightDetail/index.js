import React, { useEffect, useState } from 'react'
import logic from '../../logic'

export default function FlightDetail({ flightId }) {
    const [flight, setFlight] = useState(null)
    const [feedback, setFeedback] = useState(null)

    useEffect(() => {
        (async function () {
            try {
                return logic.retrieveFlight(flightId)
                    // .then(flight => setFlight(flight))
                    .then(flight => console.log(flight))
                    .catch(err => console.log(err.message))
            } catch ({ message }) {
                console.log(message)
            }
        })();
    }, flightId);

    return (<div>FLIGHT DETAIL</div>)
}