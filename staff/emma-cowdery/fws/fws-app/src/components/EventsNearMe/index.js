import React, { Fragment, useState, useEffect } from 'react'
import './index.sass'
import { withRouter, Route, Redirect } from 'react-router-dom'
import EventsNav from '../EventsNav'
import NavBar from '../NavBar'
import logic from '../../logic'
import BouncingLoader from '../BouncingLoader'

export default function EventsNearMe() {
    const [eventsNearme, setEventsNearme] = useState()
    const [distance, setDistance] = useState(20)

    useEffect(() => {
        logic.findEventsNearMe(distance)
            .then(events => setEventsNearme(events.events))
    }, [])

    console.log(eventsNearme)

    return (
        <Fragment>
            <NavBar/>
            <EventsNav/>
            <p>Near me</p>
            {eventsNearme ? eventsNearme.map(({ eventDate, eventTime, id, participants, reservationName, restaurantCategory, restaurantId, totalDist }) => {
                return <div>
                    <p>{eventDate}</p>
                    <p>{eventTime}</p>
                </div>
            }) : <BouncingLoader/>}
        </Fragment>
    )
}