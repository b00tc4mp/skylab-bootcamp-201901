import React, { Fragment, useEffect, useState } from 'react'
import './index.sass'
import logic from '../../logic'
import BouncingLoader from '../BouncingLoader'
import JoinEvent from '../JoinEvent'

export default function SelectedCategory ({ selectedCategory, setViewCategory}) {
    const [events, setEvents] = useState()
    const [joinEventPanel, setJoinEventPanel] = useState()
    const [eventTime, setEventTime] = useState()
    const [eventDate, setEventDate] = useState()
    const [reservationName, setReservationName] = useState()
    const [eventId, setEventId] = useState()

    useEffect(() => {
        logic.findEventsByCategory(selectedCategory)
            .then(foundEvents => setEvents(foundEvents.events))
    }, [])

    return (
        <Fragment>
            <button onClick={e => {e.preventDefault(); setViewCategory(false)}}>back</button>
            <h2>{selectedCategory}</h2>
            {events ? events.map(({ participants, restaurantId, eventTime, eventDate, reservationName, id }) => {
                return <div key={id}>
                    <p>{participants}</p>
                    <p>{restaurantId}</p>
                    <p>{eventTime}</p>
                    <p>{eventDate}</p>
                    <p>{reservationName}</p>
                    <button onClick={e => {e.preventDefault(); setEventTime(eventTime); setEventDate(eventDate); setReservationName(reservationName); setJoinEventPanel(true); setEventId(id)}}>join event</button>
                </div>
            }) : <BouncingLoader/>}
            {joinEventPanel && <div className='joinEvent'><JoinEvent eventDate={eventDate} eventTime={eventTime} reservationName={reservationName} setJoinEventPanel={setJoinEventPanel} eventId={eventId}/></div>}
        </Fragment>
    )
}