import React, { Fragment, useState, useEffect } from 'react'
import './index.sass'
import { withRouter, Route, Redirect } from 'react-router-dom'
import EventsNav from '../EventsNav'
import NavBar from '../NavBar'
import logic from '../../logic'
import InfoWindow from '../InfoWindow'
import MapFilter from '../MapFilter'

export default function EventsMap () {
    const [userLocation, setUserLocation] = useState({ lat: 41.390356499999996, lng: 2.1941694})
    const [events, setEvents] = useState()
    const [eventInfo, setEventInfo] = useState(false)
    const [participants, setParticipants] = useState()
    const [restaurantId, setRestaurantIs] = useState()
    const [eventTime, setEventTime] = useState()
    const [eventDate, setEventDate] = useState()
    const [reservationName, setReservationName] = useState()
    const [restaurantCategory, setRestaurantCategory] = useState()
    const [mapInGrid, setMapInGrid] = useState('__no-info')
    const [preferedTime, setPreferedTime] = useState()
    const [preferedDate, setPreferedDate] = useState()

    useEffect(() => {
        logic.geolocation()
            .then(geolocation => setUserLocation(geolocation)) //googles geolocation is not totally accurate
        
        logic.findEventsNearMe()
            .then(events => setEvents(events.events))
    }, [])

    useEffect(() => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: userLocation,
            zoom: 13
        })

        const marker = new window.google.maps.Marker({ position: userLocation, icon: 'images/user-location-medium.png', map: map })

        eventMarkers(map)

    }, [userLocation, events])

    function eventMarkers (map) {
        events && events.map(({ eventLocation, restaurantCategory, participants, eventDate, eventTime, restaurantId, reservationName }) => {
            const location = {lat: eventLocation[0], lng: eventLocation[1]}

            let icon = undefined

            if (restaurantCategory === 'Spanish') {
                icon = 'images/event-red-45.png'

            } else if (restaurantCategory === 'South American') {
                icon = 'images/event-yellow-45.png'

            } else if (restaurantCategory === 'Thai') {
                icon = 'images/event-green-45.png'

            } else if (restaurantCategory === 'Mexican') {
                icon = 'images/event-orange-45.png'

            } else if (restaurantCategory === 'Indian') {
                icon = 'images/event-purple-45.png'

            } else {
                icon = 'images/event-blue-45.png' 
            } 

            const marker = new window.google.maps.Marker({ position: location, icon: icon, map: map })

            marker.addListener('click', function() {
                setMapInGrid('__info')
                setEventInfo(true)
                setParticipants(participants)
                setEventDate(eventDate)
                setEventTime(eventTime)
                setRestaurantIs(restaurantId)
                setReservationName(reservationName)
                setRestaurantCategory(restaurantCategory)
            })  
        })
    }

    return (
        <Fragment>
            <NavBar/>
            <EventsNav/>
            <p>map</p>
            <div className='map-panel'>
                {eventInfo && <InfoWindow className='info-window' setMapInGrid={setMapInGrid} setEventInfo={setEventInfo} participants={participants} eventDate={eventDate} eventTime={eventTime} restaurantId={restaurantId} reservationName={reservationName} restaurantCategory={restaurantCategory}/>}
                <div id='map' className={'map-in-grid' + mapInGrid}></div>
                <MapFilter setPreferedDate={setPreferedDate} setPreferedTime={setPreferedTime}/>
            </div>
        </Fragment>
    )
}