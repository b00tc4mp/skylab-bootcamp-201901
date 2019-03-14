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
            .then(({events}) => {
                return events.sort(function(a, b) {
                    return a.totalDist - b.totalDist
                })
            })
            .then(events => setEventsNearme(events))
    }, [])

    console.log(eventsNearme)

    return (
        <Fragment>
            <NavBar/>
            <div className='events-nearme'>
                <EventsNav/>
                <div className='events-nearme__elements'>
                    {eventsNearme ? eventsNearme.map(({ eventDate, eventTime, id, participants, reservationName, restaurantCategory, restaurantId, totalDist }) => {
                        let color = ''
                        if (restaurantCategory === 'American') color = 'yellow'
                        if (restaurantCategory === 'Arabian') color = 'green'
                        if (restaurantCategory === 'Bar' || restaurantCategory === 'Breakfast' || restaurantCategory === 'Healty' || restaurantCategory === 'Kebab' || restaurantCategory === 'Thai' || restaurantCategory === 'Vegetarian' || restaurantCategory === 'Vegan') color = 'dark-gray'
                        if (restaurantCategory === 'Chinese') color = 'orange'
                        if (restaurantCategory === 'Indian') color = 'red'
                        if (restaurantCategory === 'Mexican') color = 'purple'
                        if (restaurantCategory === 'South American') color = 'blue'
                        if (restaurantCategory === 'Spanish') color = 'dark-green'

                        return <div className={`events-nearme__event events-nearme__event-${color}`}>
                            <p>{eventDate}</p>
                            <p>{eventTime}</p>
                        </div>
                    }) : <BouncingLoader/>}
                </div>
            </div>
        </Fragment>
    )
}