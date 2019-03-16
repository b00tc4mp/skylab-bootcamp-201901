import React, { Fragment, useState, useEffect } from 'react'
import logic from '../../logic'
import './index.sass'
import BouncingLoader from '../BouncingLoader'

export default function EventsNearMeEvent ({ restaurantId, eventDate, eventTime, participants, totalDist, setJoinEvent, restaurantName, setUnjoinEvent, restaurantCategory }) {
    const [details, setDetails] = useState()
    const [eventStyle, setEventStyle] = useState()
    const [counter, setCounter] = useState(0)
    const [userId, setUserId] = useState()

    if (counter === 10) setCounter(0)
    if (counter === -1) setCounter(9)

    useEffect(() => {
        logic.restaurantDetails(restaurantId)
            .then(({result}) => {
                setDetails(result)

                logic.retrievePhoto(result.photos[0].photo_reference)
                    .then(url => {
                        setEventStyle({backgroundImage: `url(${url})`})
                    })
            })

        logic.retrieveUser()
            .then(({user}) => setUserId(user._id))
    }, [])

    useEffect(() => {
        details && logic.retrievePhoto(details.photos[counter].photo_reference)
            .then(url => {
                setEventStyle({backgroundImage: `url(${url})`})
            })
    }, [counter])

    console.log(details)

    return (
        <Fragment>
            {details ? 
                <div className='event-nearme'>
                    <div style={ eventStyle } className='event-nearme__background'>
                        <div className='event-nearme__background-center'>
                            <i onClick={e => {e.preventDefault(); setCounter(counter - 1)}} className="fas fa-chevron-circle-left event-nearme__background-arrow"></i>
                            <i onClick={e => {e.preventDefault(); setCounter(counter + 1)}} className="fas fa-chevron-circle-right event-nearme__background-arrow"></i>
                        </div>
                        <div className='event-nearme__background-distance'>
                            <p className='event-nearme__background-distance-text'>{totalDist}km</p>
                        </div>
                    </div>
                    <div className='event-nearme__info'>
                        <div className='event-nearme__info-text'>
                            <p className='event-nearme__info-name'>{restaurantName}</p>
                            <a className='event-nearme__info-phone' href={`tel:${details.international_phone_number}`}>{details.international_phone_number}</a>
                        </div>
                        <p className='event-nearme__info-category'>{restaurantCategory}</p>
                        <div className='event-nearme__info-links'>
                            <a className='event-nearme__info-link event-nearme__info-link-one' href={details.url} target="_blank"><i class="fas fa-map-marked-alt event-nearme__info-link-icon"/> open in maps</a>
                            <a className='event-nearme__info-link event-nearme__info-link-two' href={details.website} target="_blank"><i class="fas fa-desktop event-nearme__info-link-icon"></i> website</a>
                        </div>
                    </div>
                    {participants.includes(userId) ?  
                        <div className='event-nearme__unjoin'>
                            <button className='event-nearme__unjoin-button' onClick={e => {e.preventDefault(); setUnjoinEvent(true)}}>leave event</button>
                        </div>
                        :
                        <div className='event-nearme__join'>
                            <button className='event-nearme__join-button' onClick={e => {e.preventDefault(); setJoinEvent(true)}}>join event</button>
                    </div>}
                </div>
            : <BouncingLoader/>}
        </Fragment>
    )
}