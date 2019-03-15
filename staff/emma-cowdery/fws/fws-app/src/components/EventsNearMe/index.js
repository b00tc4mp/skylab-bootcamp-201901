import React, { Fragment, useState, useEffect } from 'react'
import './index.sass'
import { withRouter, Route, Redirect } from 'react-router-dom'
import EventsNav from '../EventsNav'
import NavBar from '../NavBar'
import logic from '../../logic'
import BouncingLoader from '../BouncingLoader'
import EventsNearMeEvent from '../EventsNearMeEvent'
import JoinEvent from '../JoinEvent'
import UnjoinEvent from '../UnjoinEvent'

export default function EventsNearMe() {
    const [eventsNearme, setEventsNearme] = useState()
    const [distance, setDistance] = useState(20)
    const [joinEvent, setJoinEvent] = useState(false)
    const [unjoinEvent, setUnjoinEvent] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState()

    useEffect(() => {
        getEvents()
    }, [])

    async function getEvents () {
        const eventsArray = await logic.findEventsNearMe(distance)

        const { events } = eventsArray

        events.sort(function(a, b) {
            return a.totalDist - b.totalDist
        })

        setEventsNearme(events)
    }

    return (
        <Fragment>
            <NavBar/>
            <div className='events-nearme'>
                <EventsNav/>
                <div className='events-nearme__elements'>
                    {eventsNearme ? eventsNearme.map(({ eventDate, eventTime, id, participants, reservationName, restaurantCategory, restaurantId, totalDist, restaurantName }) => {

                        return <div className='events-nearme__event'><EventsNearMeEvent restaurantId={restaurantId} eventDate={eventDate} eventTime={eventTime} participants={participants} totalDist={totalDist} setJoinEvent={setJoinEvent} restaurantName={restaurantName} restaurantCategory={restaurantCategory}/></div>
                        
                    }) : <BouncingLoader/>}
                </div>
            </div>
            {joinEvent && <div><JoinEvent selectedEvent={selectedEvent} setJoinEvent={setJoinEvent}/></div>}
            {unjoinEvent && <div><UnjoinEvent selectedEvent={selectedEvent} setUnjoinEvent={setUnjoinEvent}/></div>}
        </Fragment>
    )
}