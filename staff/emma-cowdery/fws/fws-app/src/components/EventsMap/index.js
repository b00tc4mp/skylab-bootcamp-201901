import React, { Fragment, useState, useEffect } from 'react'
import './index.sass'
import EventsNav from '../EventsNav'
import NavBar from '../NavBar'
import logic from '../../logic'
import InfoWindow from '../InfoWindow'
import MapFilter from '../MapFilter'
import JoinEvent from '../JoinEvent'
import UnjoinEvent from '../UnjoinEvent'

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
    const [restaurantName, setRestaurantName] = useState()
    const [mapInGrid, setMapInGrid] = useState('-no-info')
    const [mobile, setMobile] = useState(false)
    const [joinEvent, setJoinEvent] = useState(false)
    const [userId, setUserId] = useState()
    const [selectedEvent, setSelectedEvent] = useState()
    const [id, setId] = useState()
    const [phone, setPhone] = useState()


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
        
        if (window.innerWidth < 1200) setMobile(true)

        logic.retrieveUser()
            .then(({user}) => setUserId(user.id))
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

        if (priceRange) Object.defineProperty(filters, 'priceRange', { value: priceRange, configurable: true, enumerable: true, writable: true })

        if (timeRange) Object.defineProperty(filters, 'timeRange', { value: timeRange, configurable: true, enumerable: true, writable: true })

        if (preferedDate) Object.defineProperty(filters, 'date', { value: preferedDate, configurable: true, enumerable: true, writable: true })

        if (rating) Object.defineProperty(filters, 'rating', { value: rating, configurable: true, enumerable: true, writable: true })

        if (filteredCategory) Object.defineProperty(filters, 'restaurantCategory', { value: filteredCategory, configurable: true, enumerable: true, writable: true })

        logic.filterEvents(filters)
            .then(events => setEvents(events))

    }, [distance, timeRange, preferedDate, rating, priceRange, filteredCategory, joinEvent])

    function eventMarkers (map) {
        events && events.map(({ eventLocation, restaurantCategory, participants, eventDate, eventTime, restaurantId, reservationName, restaurantName, id }) => {
            const location = {lat: eventLocation[0], lng: eventLocation[1]}

            let icon = undefined

            if (participants.includes(userId)) icon = 'images/event-gray-45.png'
            else icon = 'images/event-yellow-45.png'

            const marker = new window.google.maps.Marker({ position: location, icon: icon, map: map })

            marker.addListener('click', function() {
                setParticipants(participants)
                setEventDate(eventDate)
                setEventTime(eventTime)
                setRestaurantIs(restaurantId)
                setReservationName(reservationName)
                setRestaurantCategory(restaurantCategory)
                setRestaurantName(restaurantName)
                setMapInGrid('-info')
                setEventInfo(true)
                setId(id)
            })
        })
    }

    return (
        <Fragment>
            <NavBar setShowDropdown={setShowDropdown} setShowRightBar={setShowRightBar}/>
            <div className='events-map'>
                <EventsNav/>
                <div className='events-map__elements'>
                    <div className='events-map__map-panel'>
                        {eventInfo && <InfoWindow className='events-map__map-panel-info' id={id} setMapInGrid={setMapInGrid} setEventInfo={setEventInfo} participants={participants} eventDate={eventDate} eventTime={eventTime} restaurantId={restaurantId} reservationName={reservationName} restaurantCategory={restaurantCategory} mobile={mobile} restaurantName={restaurantName} setJoinEvent={setJoinEvent} setSelectedEvent={setSelectedEvent} setPhone={setPhone}/>}
                        <div id='map' className={`events-map__map-panel-map${mapInGrid} events-map__map-panel-map`}></div>
                        {/* <div alt='Legend' id='legend'>
                            <img alt='legend icon' src='images/event-yellow-45.png'></img>
                            <img alt='legend icon' src='images/event-gray-45.png'></img>
                        </div> */}
                        {mobile ? <div className='events-map__map-panel-filters'>
                            <div className='events-map__map-panel-arrow'>
                                <i className="fas fa-chevron-up events-map__map-panel-icon"></i>
                                <p className='events-map__map-panel-title'>filter</p>
                            </div>
                            <MapFilter setPreferedDate={setPreferedDate} setTimeRange={setTimeRange} setDistance={setDistance} setRating={setRating} setPriceRange={setPriceRange} setFilteredCategory={setFilteredCategory}/>
                        </div> : <div className='events-map__map-filter'><p className='events-map__map-filter-title'>filter</p><MapFilter setPreferedDate={setPreferedDate} setTimeRange={setTimeRange} setDistance={setDistance} setRating={setRating} setPriceRange={setPriceRange} setFilteredCategory={setFilteredCategory}/></div>}
                    </div>
                </div>
            </div>
    {joinEvent && <div><JoinEvent selectedEvent={selectedEvent} setJoinEvent={setJoinEvent} phone={phone} reservationName={reservationName} userInEvent={participants} setEventInfo={setEventInfo}/></div>}
        </Fragment>
    )
}