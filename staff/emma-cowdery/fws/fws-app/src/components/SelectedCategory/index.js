import React, { Fragment, useEffect, useState } from 'react'
import './index.sass'
import { withRouter, Route, Redirect } from 'react-router-dom'
import logic from '../../logic'
import BouncingLoader from '../BouncingLoader'
import JoinEvent from '../JoinEvent'
import NavBar from '../NavBar'
import EventsNav from '../EventsNav'
import EventsNearMeEvent from '../EventsNearMeEvent'

export default withRouter(function SelectedCategory ({ selectedCategory, setViewCategory, match, setShowDrowdown, setShowRightBar }) {
    const [events, setEvents] = useState()
    const [reservationName, setReservationName] = useState()
    const [joinEvent, setJoinEvent] = useState(false)
    const [userInEvent, setUserInEvent] = useState()
    const [selectedEvent, setSelectedEvent] = useState()
    const [phone, setPhone] = useState()

    useEffect(() => {
        const { category } = match.params

        logic.findEventsByCategory(category)
            .then(foundEvents => setEvents(foundEvents.events))
            
    }, [joinEvent])

    return (
        <Fragment>
            <NavBar setShowDrowdown={setShowDrowdown} setShowRightBar={setShowRightBar}/>
            <div className='selected-category'>
                <EventsNav/>
                <div className='selected-category__elements'>
                    {events && events.length ? events.map(({ eventDate, eventTime, id, participants, reservationName, restaurantCategory, restaurantId, totalDist, restaurantName }) => {
                        return <div className='selected-category__event'><EventsNearMeEvent reservationName={reservationName} restaurantId={restaurantId} eventDate={eventDate} eventTime={eventTime} participants={participants} totalDist={totalDist} setJoinEvent={setJoinEvent} restaurantName={restaurantName} restaurantCategory={restaurantCategory} setUserInEvent={setUserInEvent} id={id} setSelectedEvent={setSelectedEvent} setReservationName={setReservationName} setPhone={setPhone}/></div>
                        }
                    ) : <div className='selected-category__no-event'><p className='selected-category__no-event-txt'>There are no events in this category, check out the other categories or create an event of your own!</p></div>}
                </div>      
            </div>
            {joinEvent && <JoinEvent selectedCategory={selectedCategory} reservationName={reservationName} setJoinEvent={setJoinEvent} userInEvent={userInEvent} selectedEvent={selectedEvent} phone={phone}/>}
        </Fragment>
    )
})