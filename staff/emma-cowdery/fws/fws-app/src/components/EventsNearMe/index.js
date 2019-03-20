import React, { Fragment, useState, useEffect } from 'react'
import './index.sass'
import { withRouter, Route, Redirect } from 'react-router-dom'
import EventsNav from '../EventsNav'
import NavBar from '../NavBar'
import logic from '../../logic'
import BouncingLoader from '../BouncingLoader'
import EventsNearMeEvent from '../EventsNearMeEvent'
import JoinEvent from '../JoinEvent'
import Feedback from '../Feedback'

export default function EventsNearMe({setShowRightBar, setShowDropdown}) {
    const [eventsNearme, setEventsNearme] = useState()
    const [distance, setDistance] = useState(20)
    const [joinEvent, setJoinEvent] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState()
    const [userInEvent, setUserInEvent] = useState()
    const [reservationName, setReservationName] = useState()
    const [phone, setPhone] = useState()
    const [feedback, setFeedback] = useState()
    const [level, setLevel] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        getEvents()
    }, [joinEvent])

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
            <NavBar setShowDropdown={setShowDropdown} setShowRightBar={setShowRightBar}/>
            <div className='events-nearme'>
                <EventsNav/>
                <div className='events-nearme__elements'>
                    {eventsNearme ? eventsNearme.map(({ eventDate, eventTime, id, participants, reservationName, restaurantCategory, restaurantId, totalDist, restaurantName }) => {

                        return <div className='events-nearme__event'><EventsNearMeEvent reservationName={reservationName} restaurantId={restaurantId} eventDate={eventDate} eventTime={eventTime} participants={participants} totalDist={totalDist} setJoinEvent={setJoinEvent} restaurantName={restaurantName} restaurantCategory={restaurantCategory} setSelectedEvent={setSelectedEvent} setUserInEvent={setUserInEvent} id={id} setReservationName={setReservationName} setPhone={setPhone}/></div>
                        
                    }) : <BouncingLoader/>}
                </div>
            </div>
            {feedback && <Feedback feedback={feedback} level={level} type={type} setFeedback={setFeedback}/>}
            {joinEvent && <div><JoinEvent setFeedback={setFeedback} setLevel={setLevel} setType={setType} selectedEvent={selectedEvent} setJoinEvent={setJoinEvent} phone={phone} reservationName={reservationName} userInEvent={userInEvent}/></div>}
        </Fragment>
    )
}