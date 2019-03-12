import React, { Fragment } from 'react'
import './index.sass'

export default function InfoWindow ({ setMapInGrid, setEventInfo, participants, eventDate, eventTime, restaurantId, reservationName, restaurantCategory }) {
    return (
        <div className='event-info'>
            <button onClick={e => {e.preventDefault(); setMapInGrid('__no-info'); setEventInfo(false)}}>x</button>
            <p>{participants}</p>
            <p>{eventDate}</p>
            <p>{eventTime}</p>
            <p>{restaurantId}</p>
            <p>{reservationName}</p>
            <p>{restaurantCategory}</p>
        </div>
    )
}