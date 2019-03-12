import React, { Fragment} from 'react'
import './index.sass'
import logic from '../../logic'

export default function JoinEvent ({ eventDate, eventTime, reservationName, setJoinEventPanel, eventId}) {
    console.log(eventId)
    
    function handleJoinEvent () {
        logic.joinEvent(eventId)
            .then(event => {
                //if (event) set feedback to event joined!
            })
    }

    return (
        <Fragment>
            <button onClick={e => {e.preventDefault(); setJoinEventPanel(false)}}>x</button>
            <p>{eventDate}</p>
            <p>{eventTime}</p>
            <p>{reservationName}</p>
            <button onClick={handleJoinEvent}>join event</button>
        </Fragment>
    )
}