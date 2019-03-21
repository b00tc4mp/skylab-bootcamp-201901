import React, { Fragment, useEffect, useState } from 'react'
import './index.sass'
import { withRouter, Route, Redirect } from 'react-router-dom'
import logic from '../../logic'
import BouncingLoader from '../BouncingLoader'
import JoinEvent from '../JoinEvent'
import NavBar from '../NavBar'
import EventsNav from '../EventsNav'
import EventsNearMeEvent from '../EventsNearMeEvent'
import Feedback from '../Feedback'

export default withRouter(function SelectedCategory ({ selectedCategory, setViewCategory, match, setShowDropdown, setShowRightBar, history }) {
    const [events, setEvents] = useState()
    const [reservationName, setReservationName] = useState()
    const [joinEvent, setJoinEvent] = useState(false)
    const [userInEvent, setUserInEvent] = useState()
    const [selectedEvent, setSelectedEvent] = useState()
    const [phone, setPhone] = useState()
    const [feedback, setFeedback] = useState()
    const [level, setLevel] = useState()
    const [type, setType] = useState() 

    useEffect(() => {
        const { category } = match.params

        try {
            logic.findEventsByCategory(category)
            .then(foundEvents => setEvents(foundEvents.events))
            .catch(err => {
                setFeedback(err.message)
                setLevel('warning')
                setType('normal')
            })
        } catch ({message}) {
            setFeedback(message)
            setLevel('alert')
            setType('normal')
        }
            
    }, [feedback])

    return (
        <Fragment>
            <NavBar setShowDropdown={setShowDropdown} setShowRightBar={setShowRightBar}/>
            <div className='selected-category'>
                <EventsNav/>
                <div className='selected-category__elements'>
                    <div className='selected-category__header'>
                        <button className='selected-category__header-back'  onClick={e => {e.preventDefault(); history.push('/event-categories')}}><i className="fas fa-arrow-left selected-category__header-arrow"></i> back</button>
                        <p className='selected-category__header-cat'>{match.params.category}</p>
                    </div>
                    {events && events.length ? events.map(({ eventDate, eventTime, id, participants, reservationName, restaurantCategory, restaurantId, totalDist, restaurantName }) => {
                        return <div key={id} className='selected-category__event'><EventsNearMeEvent reservationName={reservationName} restaurantId={restaurantId} eventDate={eventDate} eventTime={eventTime} participants={participants} totalDist={totalDist} setJoinEvent={setJoinEvent} restaurantName={restaurantName} restaurantCategory={restaurantCategory} setUserInEvent={setUserInEvent} id={id} setSelectedEvent={setSelectedEvent} setReservationName={setReservationName} setPhone={setPhone}/></div>
                        }
                    ) : <div className='selected-category__no-event'><p className='selected-category__no-event-txt'>There are no events in this category, check out the other categories or create an event of your own!</p></div>}
                </div>      
            </div>
            {joinEvent && <JoinEvent setFeedback={setFeedback} setLevel={setLevel} setType={setType} selectedCategory={selectedCategory} reservationName={reservationName} setJoinEvent={setJoinEvent} userInEvent={userInEvent} selectedEvent={selectedEvent} phone={phone}/>}
            {feedback && <Feedback feedback={feedback} level={level} type={type} setFeedback={setFeedback}/>}
        </Fragment>
    )
})