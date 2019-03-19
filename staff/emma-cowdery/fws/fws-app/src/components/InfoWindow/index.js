import React, { Fragment, useState, useEffect } from 'react'
import './index.sass'
import logic from '../../logic'
import BouncingLoader from '../BouncingLoader'

export default function InfoWindow ({ setMapInGrid, setEventInfo, participants, eventDate, eventTime, restaurantId, reservationName, restaurantCategory, mobile, restaurantName, setJoinEvent, setUnjoinEvent, setSelectedEvent, id, setPhone }) {
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
            .then(({user}) => setUserId(user.id))
    }, [restaurantId])

    useEffect(() => {
        details && logic.retrievePhoto(details.photos[counter].photo_reference)
            .then(url => {
                setEventStyle({backgroundImage: `url(${url})`})
            })
    }, [counter])

    return (
        <Fragment>
        {details ? 
            <div className='event-info'>
                <div class='event-info__emptydiv' onClick={e => {e.preventDefault(); setEventInfo(false)}}></div>
                <div className='event-info__content'>
                    <div style={ eventStyle } className='event-info__background'>
                        {!mobile && <i className="fas fa-times event-info__background-close" onClick={e => {e.preventDefault(); setMapInGrid('-no-info'); setEventInfo(false)}}></i>}
                        <div className='event-info__background-center'>
                            <i onClick={e => {e.preventDefault(); setCounter(counter - 1)}} className="fas fa-chevron-circle-left event-info__background-arrow"></i>
                            <i onClick={e => {e.preventDefault(); setCounter(counter + 1)}} className="fas fa-chevron-circle-right event-info__background-arrow"></i>
                        </div>
                    </div>
                    <div className='event-info__info'>
                        <div className='event-info__info-text'>
                            <p className='event-info__info-name'>{restaurantName}</p>
                            <a className='event-info__info-phone' href={`tel:${details.international_phone_number}`}>{details.international_phone_number}</a>
                        </div>
                        <p className='event-info__info-category'>{restaurantCategory}</p>
                        <div className='event-info__info-when'>
                            <p><i class="far fa-calendar"></i> {eventDate.substring(0, 15)}</p>
                            <p><i class="far fa-clock"></i> {eventTime}</p>
                        </div>
                        <div className='event-info__info-links'>
                            <a className='event-info__info-link event-info__info-link-one' href={details.url} target="_blank"><i class="fas fa-map-marked-alt event-info__info-link-icon"/> directions</a>
                            <a className='event-info__info-link event-info__info-link-two' href={details.website} target="_blank"><i class="fas fa-desktop event-info__info-link-icon"></i> website</a>
                        </div>
                    </div>
                    {participants.includes(userId) ?  
                        <div className='event-info__unjoin' onClick={e => {e.preventDefault(); setJoinEvent(true); setSelectedEvent(id); setPhone(details.international_phone_number)}}>
                            <button className='event-info__unjoin-button'>leave event</button>
                        </div>
                        :
                        <div className='event-info__join' onClick={e => {e.preventDefault(); setJoinEvent(true); setSelectedEvent(id); setPhone(details.international_phone_number)}}>
                            <button className='event-info__join-button'>join event</button>
                    </div>}
                </div>
            </div>
        : <BouncingLoader/>}
        </Fragment>
    )
}