import React, { Fragment, useState, useEffect } from 'react'
import './index.sass'
import { withRouter, Route, Redirect } from 'react-router-dom'
import EventsNav from '../EventsNav'
import NavBar from '../NavBar'
import logic from '../../logic'
import InfoWindow from '../InfoWindow'
import MapFilter from '../MapFilter'

export default function EventsMap ({setShowRightBar, setShowDropdown}) {
    const [userLocation, setUserLocation] = useState({ lat: 41.390356499999996, lng: 2.1941694})
    const [events, setEvents] = useState()
    const [eventInfo, setEventInfo] = useState(false)
    const [participants, setParticipants] = useState()
    const [restaurantId, setRestaurantIs] = useState()
    const [eventTime, setEventTime] = useState()
    const [eventDate, setEventDate] = useState()
    const [reservationName, setReservationName] = useState()
    const [restaurantCategory, setRestaurantCategory] = useState()
    const [mapInGrid, setMapInGrid] = useState('-no-info')
    const [mobile, setMobile] = useState(false)

    //filter
    const [timeRange, setTimeRange] = useState()
    const [preferedDate, setPreferedDate] = useState()
    const [distance, setDistance] = useState(60)
    const [rating, setRating] = useState()
    const [priceRange, setPriceRange] = useState()
    const [filteredCategory, setFilteredCategory] = useState()

    useEffect(() => {
        logic.geolocation()
            .then(geolocation => setUserLocation(geolocation)) //googles geolocation is not totally accurate
        
        if (window.screen.width < 1200) setMobile(true)
    }, [])

    useEffect(() => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: userLocation,
            zoom: 13
        })

        const marker = new window.google.maps.Marker({ position: userLocation, icon: 'images/user-location-medium.png', map: map })

        eventMarkers(map)

    }, [userLocation, events])

    useEffect(() => {
        let filters = {'distance': distance}

        console.log(priceRange)

        if (priceRange) Object.defineProperty(filters, 'priceRange', { value: priceRange, configurable: true, enumerable: true, writable: true })

        if (timeRange) Object.defineProperty(filters, 'timeRange', { value: timeRange, configurable: true, enumerable: true, writable: true })

        if (preferedDate) Object.defineProperty(filters, 'date', { value: preferedDate, configurable: true, enumerable: true, writable: true })

        if (rating) Object.defineProperty(filters, 'rating', { value: rating, configurable: true, enumerable: true, writable: true })

        if (filteredCategory) Object.defineProperty(filters, 'restaurantCategory', { value: filteredCategory, configurable: true, enumerable: true, writable: true })

        console.log(filters)

        logic.filterEvents(filters)
            .then(events => setEvents(events))

    }, [distance, timeRange, preferedDate, rating, priceRange, filteredCategory])

    console.log(timeRange)

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
                setMapInGrid('-info')
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

    console.log(mobile)

    return (
        <Fragment>
            <NavBar setShowDropdown={setShowDropdown} setShowRightBar={setShowRightBar}/>
            <div className='events-map'>
                <EventsNav/>
                <div className='events-map__elements'>
                    <div className='events-map__map-panel'>
                        {eventInfo && <InfoWindow className='events-map__map-panel-info' setMapInGrid={setMapInGrid} setEventInfo={setEventInfo} participants={participants} eventDate={eventDate} eventTime={eventTime} restaurantId={restaurantId} reservationName={reservationName} restaurantCategory={restaurantCategory}/>}
                        <div id='map' className={`events-map__map-panel-map${mapInGrid} events-map__map-panel-map`}></div>
                        {mobile ? <div className='events-map__map-panel-filters'>
                            <div className='events-map__map-panel-arrow'>
                                <i className="fas fa-chevron-up events-map__map-panel-icon"></i>
                                <p className='events-map__map-panel-title'>filter</p>
                            </div>
                            <MapFilter setPreferedDate={setPreferedDate} setTimeRange={setTimeRange} setDistance={setDistance} setRating={setRating} setPriceRange={setPriceRange} setFilteredCategory={setFilteredCategory}/>
                        </div> : <MapFilter setPreferedDate={setPreferedDate} setTimeRange={setTimeRange} setDistance={setDistance} setRating={setRating} setPriceRange={setPriceRange} setFilteredCategory={setFilteredCategory}/>}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}