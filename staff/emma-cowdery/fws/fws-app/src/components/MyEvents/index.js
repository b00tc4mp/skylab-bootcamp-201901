import React,  { Fragment, useState, useEffect} from 'react'
import { withRouter, Route, Redirect } from 'react-router-dom'
import NavBar from '../NavBar'
import './index.sass'
import logic from '../../logic'
import EventsNearMeEvent from '../EventsNearMeEvent'
import BouncingLoader from '../BouncingLoader'
import JoinEvent from '../JoinEvent'

export default withRouter(function MyEvents ({ setShowRightBar, setShowDropdown }) {
    const [events, setEvents] = useState()
    const [reservationName, setReservationName] = useState()
    const [joinEvent, setJoinEvent] = useState(false)
    const [userInEvent, setUserInEvent] = useState()
    const [selectedEvent, setSelectedEvent] = useState()
    const [phone, setPhone] = useState()

    useEffect(() => {
        try {
            logic.userEvents()
            .then(events => {setEvents(events.events)})
            .catch(err => console.log(err)) //set feedback
        } catch {
            //set feedback
        }
        
    })
    return (
        <Fragment>
            <NavBar setShowRightBar={setShowRightBar} setShowDropdown={setShowDropdown}/>
            <div className='my-events'>
                <h2 className='my-events__title'>My events:</h2>
                {events && events.length ? <div className='my-events__grid'>{events.map(({ eventDate, eventTime, id, participants, reservationName, restaurantCategory, restaurantId, totalDist, restaurantName }) => {
                    return <div className='my-events__event'><EventsNearMeEvent reservationName={reservationName} restaurantId={restaurantId} eventDate={eventDate} eventTime={eventTime} participants={participants} totalDist={totalDist} setJoinEvent={setJoinEvent} restaurantName={restaurantName} restaurantCategory={restaurantCategory} setUserInEvent={setUserInEvent} id={id} setSelectedEvent={setSelectedEvent} setReservationName={setReservationName} setPhone={setPhone}/></div>
                })}</div> : <p className='my-events__none'>you haven't joined any events</p>}
            </div>
            {joinEvent && <JoinEvent reservationName={reservationName} setJoinEvent={setJoinEvent} userInEvent={userInEvent} selectedEvent={selectedEvent} phone={phone}/>}
        </Fragment>
    )
})